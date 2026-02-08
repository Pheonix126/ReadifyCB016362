// Service Worker - Readify PWA 

const CACHE_NAME = "readify-v2";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/explorer.html",
  "/tracker.html",
  "/recommender.html",
  "/reading-flow.html",
  "/feedback.html",

  "/index.css",
  "/explorer.css",
  "/tracker.css",
  "/recommender.css",
  "/reading-flow.css",
  "/feedback.css",

  "/index.js",
  "/explorer.js",
  "/tracker.js",
  "/recommender.js",
  "/reading-flow.js",
  "/feedback.js",

  "/manifest.json",
  "/images/favicon.png"
];

// Install: cache the main app files
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate: remove old caches
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheKeys) {
      const deletePromises = [];

      for (let i = 0; i < cacheKeys.length; i++) {
        const key = cacheKeys[i];

        if (key !== CACHE_NAME) {
          deletePromises.push(caches.delete(key));
        }
      }

      return Promise.all(deletePromises);
    })
  );
});

// Fetch: cache-first strategy
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then(function (networkResponse) {
          const responseCopy = networkResponse.clone();
          const url = event.request.url;
          const isHttp = url.indexOf("http://") === 0 || url.indexOf("https://") === 0;

          if (isHttp) {
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, responseCopy);
            });
          }

          return networkResponse;
        })
        .catch(function () {
          return caches.match("/index.html");
        });
    })
  );
});
