const FILES_TO_CACHE = [
'/',
 '/index.html',
            '/src/css/app.css',
            '/src/js/app.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
            'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
            'https://code.jquery.com/jquery-3.5.1.slim.min.js',
            'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js'
];
evt.waitUntil(
caches.open(CACHE_NAME).then((cache) => {
console.log('[ServiceWorker] Pre-caching offline page');
return cache.addAll(FILES_TO_CACHE);
})
);
evt.waitUntil(
caches.keys().then((keyList) => {
return Promise.all(keyList.map((key) => {
if (key !== CACHE_NAME) {
console.log('[ServiceWorker] Removing old cache', key);
return caches.delete(key);
}
}));
})
);
if (evt.request.mode !== 'navigate') {
// Not a page navigation, bail.
return;
}
evt.respondWith(
fetch(evt.request)
.catch(() => {
return caches.open(CACHE_NAME)
.then((cache) => {
return cache.match('index.html');
});
})
);
