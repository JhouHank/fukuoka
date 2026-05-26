import fs from 'node:fs';
import path from 'node:path';

const NOTION_DIR = './notion';
const OUTPUT = './itinerary.json';
const START_DATE = '2026-05-29';

const WEEK_ZH = ['日', '一', '二', '三', '四', '五', '六'];

function parseCsv(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
        continue;
      }
      if (c === '"') {
        inQuotes = false;
        continue;
      }
      field += c;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      continue;
    }
    if (c === ',') {
      row.push(field);
      field = '';
      continue;
    }
    if (c === '\r') continue;
    if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      continue;
    }
    field += c;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows[0];
  return rows
    .slice(1)
    .filter((r) => r.some((cell) => cell && cell.trim()))
    .map((r) => {
      const obj = {};
      for (let i = 0; i < headers.length; i++) {
        obj[headers[i]] = (r[i] ?? '').trim();
      }
      return obj;
    });
}

function parseDayKey(dayField) {
  const match = dayField.match(/Day\s*(\d+)\s*(.*)/i);
  if (!match) return null;
  return {
    dayNumber: parseInt(match[1], 10),
    city: match[2].trim(),
  };
}

function parseChineseTime(zh) {
  if (!zh) return null;
  const match = zh.match(/(早上|上午|中午|下午|晚上|凌晨)?\s*(\d{1,2}):(\d{2})/);
  if (!match) return null;
  let h = parseInt(match[2], 10);
  const period = match[1];
  if (period === '下午' && h < 12) h += 12;
  if (period === '晚上' && h < 12) h += 12;
  if (period === '中午' && h !== 12) h = 12;
  if (period === '凌晨' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${match[3]}`;
}

function timeToMinutes(t) {
  if (!t) return Number.POSITIVE_INFINITY;
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function buildDateLabel(startDate, dayNumber, city) {
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayNumber - 1);
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = WEEK_ZH[date.getDay()];
  const base = `${m}/${String(d).padStart(2, '0')}（${w}）`;
  return city ? `${base} ${city}` : base;
}

function findItineraryCsvRecursive(dir) {
  if (!fs.existsSync(dir)) return null;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '行程') continue;
      const found = findItineraryCsvRecursive(fullPath);
      if (found) return found;
      continue;
    }
    if (entry.name.startsWith('行程') && entry.name.endsWith('_all.csv')) {
      return fullPath;
    }
  }
  return null;
}

function findRowFolder(csvPath) {
  const folderPath = path.join(path.dirname(csvPath), '行程');
  if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
    return folderPath;
  }
  return null;
}

function parseRowMarkdown(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const lines = text.split(/\r?\n/);

  let title = '';
  let i = 0;
  while (i < lines.length && !lines[i].startsWith('# ')) i++;
  if (i < lines.length) {
    title = lines[i].slice(2).trim();
    i++;
  }
  while (i < lines.length && lines[i].trim() === '') i++;
  while (i < lines.length && /^[^\s:：]+:\s/.test(lines[i])) i++;
  while (i < lines.length && lines[i].trim() === '') i++;

  const bodyLines = lines.slice(i);
  while (bodyLines.length > 0 && bodyLines[bodyLines.length - 1].trim() === '') {
    bodyLines.pop();
  }
  return { title, body: bodyLines.join('\n') };
}

function markdownToHtml(md) {
  if (!md) return '';
  let text = md.replace(/\\n/g, '\n');

  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');

  const lines = text.split('\n');
  const out = [];
  let inList = false;
  for (const line of lines) {
    const bullet = line.match(/^- (.*)$/);
    if (bullet) {
      if (!inList) {
        out.push('<ul>');
        inList = true;
      }
      out.push(`<li>${bullet[1]}</li>`);
      continue;
    }
    if (inList) {
      out.push('</ul>');
      inList = false;
    }
    out.push(line);
  }
  if (inList) out.push('</ul>');

  let html = out.join('<br/>');
  html = html.replace(/<ul><br\/>/g, '<ul>');
  html = html.replace(/<\/li><br\/>/g, '</li>');
  html = html.replace(/<br\/><\/ul>/g, '</ul>');
  html = html.replace(/<\/ul><br\/>/g, '</ul>');
  return html;
}

function loadPageBodies(rowFolder) {
  const map = new Map();
  if (!rowFolder) return map;
  const files = fs.readdirSync(rowFolder).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const text = fs.readFileSync(path.join(rowFolder, file), 'utf8');
    const { title, body } = parseRowMarkdown(text);
    if (title && body) map.set(title, body);
  }
  return map;
}

function rowToItem(row, pageBodies) {
  const title = (row['Details'] || '').replace(/\s*\n\s*/g, ' ').trim();
  const time = parseChineseTime(row['時間']);
  const businessHours = (row['營業時間'] || '').trim();

  const item = {
    time,
    icon: 'location',
    title,
    subtitle: businessHours || null,
    mapCode: null,
    hasDetails: false,
  };

  const details = {};
  const googleMap = (row['Google地圖'] || '').trim();
  const notes = (row['備註'] || '').trim();
  const website = (row['官方網站'] || '').trim();
  const parking = (row['停車場'] || '').trim();
  const parkingMap = (row['停車場Google地圖'] || '').trim();
  const transitTime = (row['移動時間'] || '').trim();

  const isUrl = (s) => /^https?:\/\//i.test(s);

  if (googleMap && isUrl(googleMap)) details.googleMapUrl = googleMap;
  if (website) details.website = website;

  const noteParts = [];
  if (notes) noteParts.push(notes);

  const pageBody = pageBodies.get(title);
  if (pageBody) {
    const bodyHtml = markdownToHtml(pageBody);
    if (bodyHtml) noteParts.push(bodyHtml);
  }

  if (googleMap && !isUrl(googleMap)) noteParts.push(`【地址】${googleMap}`);
  if (parking) noteParts.push(`【停車場】${parking}`);
  if (parkingMap && isUrl(parkingMap)) noteParts.push(`【停車場地圖】<a href="${parkingMap}" target="_blank">連結</a>`);
  else if (parkingMap) noteParts.push(`【停車場地圖】${parkingMap}`);
  if (transitTime) noteParts.push(`【移動時間】${transitTime}`);

  if (noteParts.length > 0) {
    details.notes = noteParts.join('<br/><br/>').replace(/\n/g, '<br/>');
  }

  if (Object.keys(details).length > 0) {
    item.hasDetails = true;
    item.details = details;
  }

  return item;
}

function main() {
  const csvPath = findItineraryCsvRecursive(NOTION_DIR);
  if (!csvPath) {
    throw new Error(`找不到行程 CSV（${NOTION_DIR}/ 底下任何地方都沒有「行程*_all.csv」）`);
  }
  console.log(`使用 CSV：${csvPath}`);

  const rowFolder = findRowFolder(csvPath);
  if (rowFolder) console.log(`使用頁面內文資料夾：${rowFolder}`);

  const pageBodies = loadPageBodies(rowFolder);
  console.log(`讀取到 ${pageBodies.size} 個有內文的頁面`);

  const text = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCsv(text);

  const dayMap = new Map();
  for (const row of rows) {
    const title = (row['Details'] || '').trim();
    if (!title) continue;
    const dayInfo = parseDayKey(row['Day'] || '');
    if (!dayInfo) continue;
    const key = `Day ${dayInfo.dayNumber}`;
    if (!dayMap.has(key)) dayMap.set(key, { ...dayInfo, rows: [] });
    dayMap.get(key).rows.push(row);
  }

  const sortedKeys = [...dayMap.keys()].sort((a, b) => {
    return dayMap.get(a).dayNumber - dayMap.get(b).dayNumber;
  });

  const days = sortedKeys.map((key) => {
    const { dayNumber, city, rows: dayRows } = dayMap.get(key);
    const items = dayRows.map((r) => rowToItem(r, pageBodies));
    items.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
    return {
      date: buildDateLabel(START_DATE, dayNumber, city),
      dayNumber,
      items,
    };
  });

  fs.writeFileSync(OUTPUT, JSON.stringify({ days }, null, 2), 'utf8');
  console.log(`已輸出 ${OUTPUT}（${days.length} 天、共 ${days.reduce((s, d) => s + d.items.length, 0)} 個行程項目）`);
}

main();
