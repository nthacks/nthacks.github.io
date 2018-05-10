var CACHE='pwabuilder-precache';var precacheFiles=['/','/index.html','/LinkDrive/','/LinkDrive/index.html',];self.addEventListener('install',function(evt)
{if(e.request.cache==='only-if-cached'&&e.request.mode!=='same-origin')
{return;}
console.log('The service worker is being installed.');evt.waitUntil(precache().then(function()
{console.log('[ServiceWorker] Skip waiting on install');return self.skipWaiting();}));});self.addEventListener('activate',function(event)
{console.log('[ServiceWorker] Claiming clients for current page');return self.clients.claim();});self.addEventListener('fetch',function(evt)
{if(e.request.cache==='only-if-cached'&&e.request.mode!=='same-origin')
{return;}
console.log('The service worker is serving the asset.'+evt.request.url);evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));evt.waitUntil(update(evt.request));});function precache()
{return caches.open(CACHE).then(function(cache)
{return cache.addAll(precacheFiles);});}
function fromCache(request)
{return caches.open(CACHE).then(function(cache)
{return cache.match(request).then(function(matching)
{return matching||Promise.reject('no-match');});});}
function update(request)
{return caches.open(CACHE).then(function(cache)
{return fetch(request).then(function(response)
{return cache.put(request,response);});});}
function fromServer(request)
{return fetch(request).then(function(response)
{return response})}