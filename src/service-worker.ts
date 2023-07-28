/// <reference lib="webworker" />

const CACHE_NAME = ""; // Will be modified during build. DO NOT EDIT!
const RESOURCES = [] satisfies string[]; // This will be populated during build. DO NOT EDIT!

const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(RESOURCES));
});

sw.addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function addResourcesToCache(resources: string[]) {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
}

async function handleRequest(request: Request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  return fetch(request);
}
