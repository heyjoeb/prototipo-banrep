//These resources are cached during the install event; waitUntil ensures that the pages are cached before installation is completed:
// A list of paths to cache
  var paths = [
    'index.html',
    'datos.csv',
    'styles/main.css',
    'scripts/main.js',
    'scripts/vendor.js',
    'fonts/fontawesome-webfont.ttf',
    'images/icon01.png',
    'images/icon02.png',
    'images/icon03.png',
    'images/layers.png',
    'images/layers-2x.png',
    'images/marker-icon.png',
    'images/marker-icon-2x.png',
    'images/marker-shadow.png',
    'images/hoyoSoplador.jpg'
  ];
  // Open the cache (and name it)
  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('offline-v1')
        .then(function(cache) {
          return cache.addAll(paths);
        })
    );
    event.waitUntil(self.skipWaiting());
  });

  // listen out for messages from the web page, using the message event:
  self.addEventListener('message', function(event) {
    //do something with the message event.data
  })

  // For each URL we cache, we’ll want to cache its image assets, or it will look broken when served from cache, so we must take a look at the response, and also add any images included in the content to the cache:
  function fetchAndCache(url, cache) {
    return fetch(url).then(function (response) {
        if (response.status < 400) {
            console.log('got '+url);
            cache.put(url, response.clone());
        }
        return response.text();
    })
  }

  self.addEventListener('message', function(event) {
    console.log('SW got message:'+event.data.command);
    switch (event.data.command) {
      case 'offline-opt-in':
    
        // Cache homepage
        caches.open('static-v1').then(function(cache) {
          fetch('/').then(function(response) {
              fetchAndCache('/', cache);
              return response.text();
            })
            .then(function(text) {
              var pattern = /a href="([^'"]+)" class="item-title"/g;
              var urls = getMatches(text, pattern, 1);
              console.log('caching: ' + urls);
              
              for(var i=0;i<urls.length;i++) {
                console.log('fetching '+urls[i]);
                fetchAndCache(urls[i], cache);
              }
 
            })
        });
        break;
    } 
  });

  //helper
function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
}

  // intercept requests by listening to fetch event
  self.addEventListener('fetch', function(event) {
 
  // Cache, then network, then fallback for other urls
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function() {
      return caches.match('/page/content-not-available-offline');
    })
  );
});


