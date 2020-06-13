self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('first-app')
        .then(function(cache) {
          cache.addAll([
            '/',
            '/index.html',
            '/src/css/app.css',
            '/src/js/app.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
            'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
            'https://fonts.googleapis.com/css?family=Bungee|Hind|PT+Sans|Pacifico|Poppins|Lobster'
          ])
        })
    );
    return self.clients.claim();
  });
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(res) {
          return res;
        })
    );
  });
  
