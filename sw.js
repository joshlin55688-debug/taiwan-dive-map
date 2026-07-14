/* Service Worker：離線快取
   - App 本體（同源檔案）：cache-first，離線也開得起來
   - Leaflet／地圖圖磚（unpkg、CARTO）：cache-first，去過的區域離線可看
   - 海況 API（open-meteo）：不攔截，交給網路＋App 內建的 localStorage 快取 */
const CACHE = 'tdm-cache-v2';
const SHELL = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // 天氣 API 走網路，不快取（App 自己有 6 小時 localStorage 快取，離線時會優雅降級）
  if (url.hostname.endsWith('open-meteo.com')) return;

  const cacheable =
    url.origin === self.location.origin ||
    url.hostname === 'unpkg.com' ||
    url.hostname.endsWith('basemaps.cartocdn.com') ||
    url.hostname.endsWith('arcgisonline.com');
  if (!cacheable) return;

  // stale-while-revalidate：先回快取（若有），同時背景更新
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req);
      const network = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
