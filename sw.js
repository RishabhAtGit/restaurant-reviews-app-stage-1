 console.log("Service worked registered");

 // list of cached files

const cachedFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

// listening for install event

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open('cache-v1').then(function(cache){
        return cache.addAll(cachedFiles);
    })
  );
});

//listening for fetch event
self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request).then( function(response){
      if(response){
        console.log(event.request+" found in cache");
        return response;
      }
      else{
        console.log(event.request+" not found....fetching....");
        return fetch(event.request)
        .then(function(response){
          const clonedResponse = response.clone();
          caches.open('cache-v1').then( function(cache){
            cache.put(event.request,clonedResponse);
          })
          return response;
        })
        .catch( function(error){
          console.log(error);
        });
      }
    })
  );
});
