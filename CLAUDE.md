# taiwan-dive-map

台灣潛點迷霧地圖：單檔 HTML 專案，設計規格全部在 DESIGN.md — 動工前先讀它。

## 開發守則

- 全部功能寫在單一 `index.html`（HTML+CSS+JS），外部依賴只允許 CDN（Leaflet 等）
- 介面文字用繁體中文；與使用者溝通也用繁體中文
- 手機直式是主要使用情境，所有 UI 先以手機版思考，再適配桌面
- 使用者資料只存本機（localStorage + IndexedDB），不接後端；照片入庫前先壓縮
- 潛點資料庫以 JS 常數陣列內嵌在 index.html，欄位見 DESIGN.md 第三節
- 完成功能後更新 README.md 的開發狀態勾選清單
