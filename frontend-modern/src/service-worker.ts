/// <reference lib="webworker" />

// import { Queue } from "workbox-background-sync";
import { build, files, version } from "$service-worker";

declare const self: ServiceWorkerGlobalScope;

// Create a unique cache name for this deployment
const CACHE = `cached-${version}`;

// const queue = new Queue("api-mutations");

const ASSETS = [...build, ...files];

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("install", (event) => {
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);

    // don't keep showing update prompt on non production
    // if (!import.meta.env.PROD) self.skipWaiting();
  }
  event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (event) => {
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key);
    }
  }

  event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (event) => {
  // disable caching on non production environment
  if (!import.meta.env.PROD) return;

  const url = new URL(event.request.url);

  // don't handle other urls accept http/https
  if (!url.protocol.startsWith("http")) return;

  async function respond() {
    // don't cache api routes
    if (url.pathname.startsWith("/api")) {
      return fetch(event.request);
    }

    const cache = await caches.open(CACHE);

    // `build`/`files` can always be served from the cache
    const preCached = ASSETS.includes(url.pathname) && (await cache.match(event.request));
    if (preCached) return preCached;

    // for everything else, try the network first, but
    // fall back to the cache if we're offline
    try {
      const response = await fetch(event.request);

      if (response.status === 200) {
        cache.put(event.request, response.clone());
      }

      return response;
    } catch (err) {
      const cached = await cache.match(event.request);
      if (cached) return cached;
      throw err;
    }
  }

  // const bgSyncLogic = () => {
  //   return fetch(event.request.clone()).catch(async (err) => {
  //     await queue.pushRequest({ request: event.request });
  //     return err;
  //   });
  // };

  if (event.request.method === "GET") {
    return event.respondWith(respond());
  }
});

self.addEventListener("push", (event) => {
  async function showNotification() {
    try {
      const json = event.data?.json();
      if (!json) return;

      return self.registration.showNotification(json.title, {
        body: json.body,
        data: json.custom,
        icon: "/app-logo.svg",
        vibrate: [100, 50, 100]
      });
    } catch {
      return;
    }
  }

  event.waitUntil(showNotification());
});

self.addEventListener("notificationclick", function (event) {
  const url = event.notification.data?.url || "/";
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((windowClients) => {
      if (windowClients.length) {
        const windowClient = windowClients[0];
        windowClients[0].postMessage({ command: "navigate", url });
        return windowClient.focus();
      } else {
        return self.clients.openWindow(url);
      }
    })
  );
});
