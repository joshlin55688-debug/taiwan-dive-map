# 台灣潛點迷霧地圖 (Taiwan Dive Fog Map)

潛水版迷霧探索地圖：標記去過的台灣潛點解鎖迷霧，累積潛水日誌（心得＋照片），
用探索度與成就驅動探索循環。

- 設計文件：[DESIGN.md](DESIGN.md)
- 主程式：`index.html`（單檔 HTML，開瀏覽器即用）
- 資料全存本機（localStorage + IndexedDB），支援 JSON 匯出備份

## 開發狀態

- [x] Phase 1 (MVP)：地圖＋迷霧解鎖、內建潛點庫（網路彙整全台 119 點）、日誌（心得＋照片）、區域進度、匯出/匯入備份、長按新增自訂潛點
- [ ] Phase 2：成就徽章、統計熱力圖、生物圖鑑
- [ ] Phase 3：Firebase 同步、探索地圖分享圖
