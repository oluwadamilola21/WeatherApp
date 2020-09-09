const staticCacheName = "site-static"
const assets = [
    "/",
    "/index.html",
    "/js/app.js",
    "/js/utils.js",
    "/main.css",
    "https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap",
];
//cache size limit
// const limitCacheSize = (name, size) => {
//     caches.open(name).then(cache => {
//         cache.keys().then(keys => {
//             if(keys.length > size){
//                 cache.delete(keys[0]).then(limitCacheSize(name,size));
//             }
//         })
//     })
// }
//install sw
self.addEventListener("install", evt => {
    //console.log("service worker has been installed")
    evt.waitUntil(
        caches.open(staticCacheName).then(cache=>{
            console.log("caching shell assets");
            cache.addAll(assets);
        })
    );
    
});
//activate sw
self.addEventListener("activate", evt => {
    //console.log("service worker has been activated")
    evt.waitUntil(
        caches.keys().then(keys=>{
            //console.log(keys)
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key =>caches.delete(key))
            )
        })
    );
});
//fetch event
self.addEventListener("fetch", evt => {
    //console.log("fetch event", evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});