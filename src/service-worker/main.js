import { registerRoute } from 'workbox-routing';
import { v4 as uuidv4 } from 'uuid';

const CACHE_NAME = 'pseudoserver-data';
const CACHE_DATA_KEY = '/pseudoserver/';

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

registerRoute('/pseudoserver/', async () => {
    const cache = await caches.open(CACHE_NAME);
    const match = await cache.match(CACHE_DATA_KEY, { ignoreMethod: true, ignoreSearch: true, ignoreVary: true })
    return match === undefined ? new Response('[]') : match;
}, 'GET');

registerRoute('/pseudoserver/', async ({ request }) => {
    const cache = await caches.open(CACHE_NAME);

    const data = await request.formData();
    const values = {};
    for (const [key, value] of data.entries()) {
        console.log(key, typeof value, value);
        if (typeof value === 'string') {
            values[key] = value;
        } else {
            const fileName = uuidv4();
            cache.put(fileName, new Response(value));
            values[key] = `/pseudoserver/${fileName}/`;
        }
    }

    const allValuesCached = await cache.match(CACHE_DATA_KEY, { ignoreMethod: true, ignoreSearch: true, ignoreVary: true });
    let allValues;
    if (allValuesCached === undefined) {
        allValues = [values];
    } else {
        allValues = await allValuesCached.json();
        allValues.push(values);
    }
    console.log(allValues);
    cache.put(CACHE_DATA_KEY, new Response(JSON.stringify(allValues)));

    return new Response(JSON.stringify(values));
}, 'POST');

registerRoute(/\/pseudoserver\/(.*)\//, async ({ params: [name] }) => {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match(name, { ignoreMethod: true, ignoreSearch: true, ignoreVary: true })
}, 'GET');
