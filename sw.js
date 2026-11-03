// Minimal service worker: caches the app shell so it still opens after the first visit,
// even with no connection. No camera, model, or network calls are used anywhere in
// this app — everything (tap-menu, activities, check-ins) runs from this cached shell.
// The avatar/logo is drawn as inline SVG in index.html now, not a separate image file,
// so there's nothing extra to cache for it.
const CACHE_NAME = "saathi-shell-v7";
const SHELL_FILES = [
  "./index.html",
  "./manifest.json",
  "./icon-192-pencil2.png",
  "./icon-512-pencil2.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // cache.addAll() is all-or-nothing — if even one file in the list fails
      // to fetch (a typo'd filename, a file that didn't actually deploy, a
      // flaky connection during install), NOTHING gets cached, including
      // index.html itself. That silently breaks offline mode completely,
      // which is exactly what happened. Caching each file individually with
      // its own error handling means one bad file can't sink the rest.
      Promise.all(
        SHELL_FILES.map((url) =>
          cache.add(url).catch((err) => console.warn("Could not cache", url, err))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Only handle same-origin requests ourselves. Cross-origin requests (the
  // Google Fonts stylesheet/font files) are left to the browser's normal
  // handling — if one of those fails while offline, it shouldn't be able to
  // take down the page navigation itself, which is the more important thing
  // to keep working offline.
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => {
        // Offline and this exact file wasn't cached — for a page navigation,
        // fall back to the cached shell page rather than letting the whole
        // load fail with a browser-level error screen.
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
        return new Response("", { status: 503, statusText: "Offline" });
      });
    })
  );
});
