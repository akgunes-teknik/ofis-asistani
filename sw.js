// Ofis Asistanı kabuğu – yalnız kabuk dosyalarını saklar (uygulama verisi buraya girmez; iş kayıtları Google'da).
const AD = 'oa-kabuk-v3', UYG = 'oa-uygulama';   // v3: UYG = uygulama sayfasının telefonda saklanan kopyası (index.html yazar) – SİLİNMEZ
const DOSYALAR = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(AD).then(c => c.addAll(DOSYALAR))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(l => Promise.all(l.filter(x => x !== AD && x !== UYG).map(x => caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (new URL(e.request.url).origin !== location.origin) return;   // Google adreslerine karışmaz
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
