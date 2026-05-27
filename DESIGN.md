---
name: 2026 福岡周家旅遊
description: 家族手帖風格的旅程查詢工具——米色紙感 + 煤墨 + 赭紅。
colors:
  paper: "oklch(97% 0.005 70)"
  paper-deep: "oklch(94% 0.008 70)"
  paper-soft: "oklch(91% 0.008 70)"
  paper-edge: "oklch(86% 0.008 70)"
  ink: "oklch(28% 0.01 70)"
  ink-soft: "oklch(48% 0.008 70)"
  ink-faint: "oklch(65% 0.008 70)"
  ink-ghost: "oklch(78% 0.008 70)"
  vermilion: "oklch(55% 0.13 28)"
  vermilion-deep: "oklch(45% 0.13 28)"
  vermilion-tint: "oklch(94% 0.025 28)"
  overlay: "oklch(15% 0.01 70 / 0.55)"
typography:
  display:
    fontFamily: "'Noto Serif TC', 'Source Han Serif TC', Georgia, serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Noto Sans TC', system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Noto Sans TC', system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
    fontFeature: "'tnum' 1"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Noto Sans TC', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  supporting:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Noto Sans TC', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Noto Sans TC', system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "10px"
  lg: "20px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "20px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.vermilion-deep}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.vermilion}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  button-ghost-hover:
    backgroundColor: "{colors.paper-soft}"
  chip-info:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  link-action:
    backgroundColor: "{colors.vermilion-tint}"
    textColor: "{colors.vermilion-deep}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  link-action-hover:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper}"
  card-notes:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "16px"
  sheet-surface:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "20px"
  item-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px"
  item-row-active:
    backgroundColor: "{colors.paper-soft}"
  day-header:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    padding: "16px 20px"
---

# Design System: 2026 福岡周家旅遊

## 1. Overview

**Creative North Star: "九州家族手帖"**

把這份系統想像成一本由家人為家人手工裝訂的旅遊手帳：米色紙、煤墨書寫、偶爾用赭紅圈出當下重要的一站。它不模仿手寫感（那會變廉價），而是借用紙本手帳的氣質：克制、有溫度、可信、密度恰到好處。每一頁是一天，每一行是一站，色彩用得保留，靠**字級與留白**而非裝飾把資訊排好。

這份系統明確拒絕「乾淨白底 + 一排彩色玩具感 icon」的入門級旅遊 App 樣板（這是目前狀態，要刻意離開），也拒絕 SaaS 偽精緻（深藍 + 黃金、hero metric、Stripe 仿冒款）、過度漸層 / 玻璃 / gradient text / 重型動畫、以及都會生冷霓虹風。它服務的是一個含長輩的家庭、在福岡旅程中、單手操作、光線多變的真實場景。

**Key Characteristics:**
- 暖中性 paper 紙感背景，唯一強調色是赭紅 vermilion
- 字級從 body 16px 起跳，長輩可讀的硬底線
- 完全 flat，沒有 box-shadow（除 bottom sheet 的 overlay）
- Icon 全部 outline 單色 + 形狀區分，色盲友善
- 每個元素的留白與層次靠 typography 與背景階梯，不靠卡片堆疊

## 2. Colors: The Paper-and-Ink Palette

調色盤只有兩個語意角色：**紙**與**墨**，外加一個赭紅作為唯一的強調色。所有顏色都向 hue 70（米色暖調）輕微偏移，沒有純黑純白，沒有第二個飽和色。

### Primary
- **Vermilion 赭紅** (`oklch(55% 0.13 28)`)：當下重要性的唯一視覺信號。用於「下一個 / 當前」item 標示、主要 CTA、CTA hover 後的色號。在任一畫面上 **不得超過 10% 面積**。
- **Vermilion Deep** (`oklch(45% 0.13 28)`)：時間文字、小尺寸 vermilion 文字（保證 WCAG AA Small 對比）、按鈕 default 態。
- **Vermilion Tint** (`oklch(94% 0.025 28)`)：link-action 與 detail 區塊的底色，赭紅的 ≤6% 薄霧。

### Neutral
- **Paper 米紙** (`oklch(97% 0.005 70)`)：body / surface 主背景。不是白，是極微暖調的米色，模擬紙質。
- **Paper Deep 深紙** (`oklch(94% 0.008 70)`)：day-header、card-notes、chip-info 底色。比 paper 深一階用於區隔，不靠 shadow。
- **Paper Soft 軟紙** (`oklch(91% 0.008 70)`)：item hover / pressed、touch feedback。
- **Paper Edge 紙緣** (`oklch(86% 0.008 70)`)：1px 分隔線、grab handle。**不做 box-shadow**。
- **Ink 墨** (`oklch(28% 0.01 70)`)：title、headline、display 的主字色。
- **Ink Soft 淡墨** (`oklch(48% 0.008 70)`)：body 內文、地址、備註。
- **Ink Faint 灰墨** (`oklch(65% 0.008 70)`)：subtitle、輔助文字。
- **Ink Ghost 影墨** (`oklch(78% 0.008 70)`)：chevron、disabled、極次要視覺元素。

### Overlay
- **Overlay** (`oklch(15% 0.01 70 / 0.55)`)：bottom sheet 開啟時遮罩。比預設 `rgba(0,0,0,0.5)` 更暖、更不死硬。

### Named Rules

**The One Voice Rule.** 赭紅是這個系統唯一的「強調色」。每個畫面上它的覆蓋面積不得超過 10%。如果一個畫面上同時有兩個以上的赭紅元素在搶注意力，刪到剩一個。

**The No-Pure Rule.** 禁止 `#fff` / `#000` / 任何 chroma=0 的純灰。所有中性色都向 hue 70 偏一點 chroma（0.005–0.01）。檢查方法：把任何顏色貼到 OKLCH 拾色器，如果 chroma 是 0，是錯的。

**The Type-Driven Palette Rule.** 任一新元素的預設顏色是 `ink-soft`，不是其他。要從這個 baseline 主動論證為什麼需要更深（ink）、更淺（ink-faint / ink-ghost）或加色（vermilion）。

## 3. Typography

**Display Font:** `'Noto Serif TC'`（with `Source Han Serif TC`, `Georgia`, `serif` fallback）—只用於 `DAY N` 大標。
**Body Font:** `-apple-system / BlinkMacSystemFont / 'Noto Sans TC'`—iOS/macOS 用 SF Pro，Android 用 Roboto，繁體中文用 Noto Sans TC。
**Numeric:** `font-feature-settings: 'tnum' 1`—時間數字必須等寬，垂直對齊。

**Character:** 系統字搭配 Noto Serif TC 的對比就是這個系統的個性——serif 的「day」與 sans 的「行程內容」並置，模擬手帳分頁標題與內文的關係。沒有第三套字體。

### Hierarchy
- **Display** (Noto Serif TC, 600, 28px, line-height 1.15)：`DAY 3` 之類的日期大標，每個 day-card 頂端唯一。
- **Headline** (sans, 600, 22px, line-height 1.2)：bottom sheet 的 detail-title、二級頁面標題。
- **Title** (sans, 600, 18px, line-height 1.3, `tnum`)：item 的時間欄、強調 title。`tnum` 讓 `09:00` 與 `18:30` 的數字寬度一致。
- **Body** (sans, 400, 16px, line-height 1.5)：item 主標題、detail-notes 內文。**16px 是長輩友善的硬底線，禁止小於此。**
- **Supporting** (sans, 400, 14px, line-height 1.5)：subtitle、地址、次要資訊。最大 65–75ch line-length。
- **Label** (sans, 700, 12px, line-height 1.2, letter-spacing 0.08em, UPPERCASE)：區段標題（「地圖位置」「備註」「菜單」）。letter-spacing 給漢字用無效，所以這個 label 主要承載拉丁字（`DAY` / `MENU` / `MAP`）；中文 label 改用 14px supporting 加粗。

### Named Rules

**The 16px Floor Rule.** Body 與 item 主標題不得小於 16px。長輩在福岡街頭日光下要讀得到。Subtitle 可降至 14px，但不可降至 12px 以下——12px 只留給標籤型 label，且必須大寫拉丁字 + 0.08em tracking。

**The Tabular Time Rule.** 所有時間（08:00、13:30、19:00）強制 `font-variant-numeric: tabular-nums`。垂直排列時數字必須對齊，這是手帳氣質的關鍵——不對齊就掉一個層級。

**The Serif-Only-For-Day Rule.** Noto Serif TC 只用在 `DAY N` 一處。serif 出現第二次就是裝飾，立刻刪。

## 4. Elevation

**完全 flat。** 系統不使用 `box-shadow` 在任何 surface 上製造抬升。分層完全靠**背景色階梯**（paper / paper-deep / paper-soft / paper-edge）與 **1px 邊線**（paper-edge 色）達成。手帳是平面紙質，沒有立體陰影。

唯一的例外是 bottom sheet 開啟時的 `overlay`——但那是「另一個世界」的遮罩，不是 sheet 自身的 elevation。Sheet 本體浮在 overlay 之上，本體仍是 flat。

### Named Rules

**The Flat Forever Rule.** 任何元素都不准加 `box-shadow`。Hover 不加陰影、focus 不加陰影、card 不加陰影、bottom sheet 自身不加陰影。如果一個元素「看起來需要 shadow 才有層次」，先檢查背景色是否該降一階、或邊線是否該補上。99% 情況用背景階梯能解決。

**The Border Is The Edge Rule.** 區隔元素的方法只有兩種：背景色換階、或一條 1px paper-edge 邊線。不要兩種同時用（會變成卡片中的卡片）。

## 5. Components

### Day Card
- **形狀**：full viewport (100vw × 100dvh)，無圓角。
- **背景**：`paper`。
- **結構**：頂部 `day-header`（headline 字級 + day indicator chip），下方 scrollable item list。
- **切換**：水平 `scroll-snap-type: x mandatory`，**必須補 day indicator**（例如「DAY 3 / 6」+ 點選可跳轉）。目前缺這個 affordance，是 UX 漏洞。

### Day Header
- **背景**：`paper-deep`。
- **底線**：1px `paper-edge`。
- **內邊距**：`16px 20px`（含 safe-area-inset-top）。
- **內容**：左側 Display 「`DAY 3 │ 6/01 (一) 門司港`」，右側兩個 chip-info（通用 / 地鐵）。
- **Chip 字級**：14px（中文）或 12px label（拉丁字）。**不准用 24px 圓 + 拉丁/漢字混用**——目前的「i / 鐵」必須改成 「ⓘ 通用」「🚇 地鐵」之類有 label 的 chip，且 touch target 補到 44pt。

### Item Row
- **形狀**：`padding: 12px`、`rounded: md (10px)`、無背景。
- **網格**：`[icon 24px] [time 60px] [content 1fr] [chevron 16px]`，gap 12px。Time 與 icon 縱向對齊基線。
- **預設**：背景 transparent。
- **Hover / Active**：背景變 `paper-soft`。
- **當前 / 下一個**：背景 `vermilion-tint` + 左側 4px circle (vermilion) 而**非** side-stripe border（被 absolute bans 禁了）。
- **過去項目**：text color 降至 `ink-faint`、icon 也降階。
- **Icon**：24px、stroke 1.5、`ink-soft` 單色 outline。**絕不**填滿 + 上色。

### Icons (Outline System)
- **尺寸**：24×24px，`stroke: 1.5px`。
- **顏色**：永遠 `ink-soft`，活動中項目可升到 `vermilion-deep`。
- **形狀庫**：
  - `plane`：紙飛機 outline
  - `location`：地標 pin outline
  - `restaurant`：刀叉 outline
  - `hotel`：床或建築 outline
  - `shopping`：購物袋 outline
- **絕對禁止**：圓形彩色背景 + 白色填滿 icon。這是目前狀態，要全部清掉。

### Bottom Sheet
- **形狀**：頂部 `rounded: lg (20px)`，底部直角貼底邊。
- **背景**：`paper`。
- **Max-height**：`80vh`（目前 65vh 太小，菜單圖一張就爆）。
- **Grab handle**：頂部 36×4px `paper-edge` 色橫條，居中，距頂 8px。視覺暗示可下滑關閉。
- **內邊距**：20px（含 safe-area-inset 處理）。
- **Overlay**：`overlay` 色（不是純黑）。
- **動畫**：`transform: translateY()` + `cubic-bezier(0.4, 0, 0.2, 1)`，0.3s。`prefers-reduced-motion: reduce` 時降為 opacity 1↔0、無 translate。

### Card Notes (`.detail-notes` 重生)
- **背景**：`paper-deep`（不是現在的灰白）。
- **內邊距**：16px。
- **Rounded**：md (10px)。
- **字色**：`ink-soft`，body 字級。
- **List**：`<ul>` 使用 disc + 16px padding-left。**禁止用 `<br>` 拼接換行**——資料層要餵 array 或 markdown。

### Link Action (`.detail-link` 重生)
- **背景**：`vermilion-tint`。
- **字色**：`vermilion-deep`。
- **Rounded**：md (10px)。
- **內邊距**：12px 16px。
- **Hover**：背景變 `vermilion`、字色變 `paper`。
- **不准加 emoji**——`📍` `🔗` 拿掉，用 inline SVG 24px outline 圖示（locate-fixed / external-link），與 row icon 同套。

### Chip Info (header 上的「通用 / 地鐵」)
- **背景**：`paper-soft`。
- **字色**：`ink-soft`。
- **Rounded**：pill (999px)。
- **內邊距**：6px 12px。
- **內容**：12px outline icon + 14px label。**Touch target 必須 ≥44pt**，可加透明 padding 達成。
- **Active / Hover**：背景變 `paper-edge`。

### Day Indicator (新元件，必加)
- **位置**：scroll container 底部固定，距底 16px（含 safe-area-inset）。
- **樣式**：6 個 4px circle pill 橫排，gap 6px。當前那一個是 `vermilion`，其餘 `ink-ghost`。
- **互動**：點擊可跳轉到對應 day-card（`container.scrollTo`）。
- **Hover label**：長按或 hover 浮現「DAY 3」label（mobile 主用，但 mouse 也要 work）。

### Map Code (`.map-code` 重生)
- **背景**：`paper-deep`。
- **字色**：`ink-soft`。
- **Rounded**：sm (4px)。
- **字體**：**不再 `Courier New`**——改為 body sans + `font-variant-numeric: tabular-nums`。「地點代碼」不是 code，是「分類標籤」。

## 6. Do's and Don'ts

### Do:
- **Do** 用 OKLCH 定義所有顏色。`#hex` 只在不得已時備援（Stitch linter 相容）。
- **Do** body 字級從 16px 起跳。長輩友善是硬底線。
- **Do** time、價格、編號等表格型數字加 `font-variant-numeric: tabular-nums`。
- **Do** 用背景階梯（paper → paper-deep → paper-soft）製造分層。
- **Do** Icon 一律 outline 單色，形狀承載語意，色盲也能用。
- **Do** 給 `prefers-reduced-motion: reduce` 一條備援路徑——transition 降為 opacity 或直接無動畫。
- **Do** Touch target ≥44pt，header 的小 chip 要靠透明 padding 達標。
- **Do** 加 day indicator（dots + 可跳轉）。沒這個使用者在第 4 天會迷路。

### Don't:
- **Don't** 用 `#fff` 或 `#000`。所有中性色向 hue 70 偏 chroma 0.005–0.01。
- **Don't** 同時出現兩個以上飽和色——「乾淨白底 + 一排彩色圓形 icon」是這份 PRODUCT.md 明訂的 anti-reference，是這個系統存在的原因。
- **Don't** 加 `box-shadow`。任何 surface、任何狀態。完全 flat。
- **Don't** 用 SaaS 仿精緻——深藍 + 黃金、hero metric 大數字、Stripe 仿冒款，全部禁止。
- **Don't** 用 gradient text（`background-clip: text` + gradient）。完全禁止。
- **Don't** 用 glassmorphism / backdrop-filter blur 做卡片。
- **Don't** 用 side-stripe border（`border-left: ≥2px` 上色作為點綴）——絕對 ban。
- **Don't** 用 `Courier New` 或任何裝飾型字。serif 僅留給 `DAY N` 大標。
- **Don't** 在 JSON 用 `<br>` 拼接 detail-notes 換行——餵結構化資料（array 或 markdown），render 時轉成 `<ul>` / `<p>`。
- **Don't** 用 emoji 當 icon（📍 🔗 🚇）。改成 inline SVG outline，與 row icon 同套。
- **Don't** 拷貝「i / 鐵」這種拉丁字 + 漢字混用的圓鈕。每個 chip 要有 label，touch target ≥44pt。
- **Don't** 用顏色當唯一語意載體。Icon 必須有形狀差異，狀態（過去/當前/未來）必須有非顏色標記（例如透明度 + 位置）。
- **Don't** 為 bottom sheet 自身加 shadow。它的「浮起」感來自 overlay 遮罩 + 圓角頂緣，不是 shadow。
