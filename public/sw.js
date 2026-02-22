const CACHE_NAME = 'she-innovates-v1'
const ASSETS = [
  '/',
  '/index.html',
  '/vite.svg',
]

// Install: pre-cache shell
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  )
  self.skipWaiting()
})

// Activate: clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch: cache-first for same-origin, network-first for fonts
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)

  // Google Fonts: cache with network-first
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    e.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        fetch(e.request)
          .then((res) => {
            cache.put(e.request, res.clone())
            return res
          })
          .catch(() => cache.match(e.request))
      )
    )
    return
  }

  // Same-origin: cache-first
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached
      return fetch(e.request).then((res) => {
        if (res.ok && url.origin === self.location.origin) {
          const clone = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone))
        }
        return res
      })
    })
  )
})
