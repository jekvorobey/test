"use strict";var precacheConfig=[["/assets/app.c8c1ccf1fff8892fa7b5.css","3de4b2e749dc4d35eb9e67a2f9463bf5"],["/assets/app.c8c1ccf1fff8892fa7b5.css.br","4b2e8bf43a5d1bf79410a5bdcd8bf394"],["/assets/app.c8c1ccf1fff8892fa7b5.css.gz","c1f41f688ecd4b588698402430dae706"],["/assets/app.c8c1ccf1fff8892fa7b5.js","625861220bbb272b954533ab0976bd0b"],["/assets/app.c8c1ccf1fff8892fa7b5.js.br","c8b74fb243d413d22afa39116ef5461f"],["/assets/app.c8c1ccf1fff8892fa7b5.js.gz","ed19dd28d922d8b40177df1ce0250dbc"],["/assets/create-list-view.d52cddd9f9b2ed0ed3b3.js","5889e501e55ba48541338a19ea5e6755"],["/assets/create-list-view.d52cddd9f9b2ed0ed3b3.js.br","6ce3ac4529b98c1f0490886a019e638c"],["/assets/create-list-view.d52cddd9f9b2ed0ed3b3.js.gz","ff61fe8650457f39504d14c5b9d90754"],["/assets/favicon.ico","20686540fcbdf63d7874c9a748db6a82"],["/assets/fonts/Roboto-Bold.824d6cf793c3db8c0bbd.woff","824d6cf793c3db8c0bbd98120e1f4f32"],["/assets/fonts/Roboto-Bold.a5d5af1b3e4b457805e4.woff2","a5d5af1b3e4b457805e468ae06865c2b"],["/assets/fonts/Roboto-Bold.afa7a91dadd77b23634a.ttf","afa7a91dadd77b23634a0fdf18c148f3"],["/assets/fonts/Roboto-Light.6bd3eb4c208213cc8a72.woff","6bd3eb4c208213cc8a721dd421a7bb02"],["/assets/fonts/Roboto-Light.8b66a8ee62cf05f658c5.woff2","8b66a8ee62cf05f658c569d0e1a18ee2"],["/assets/fonts/Roboto-Light.e22062b3188c8199283e.ttf","e22062b3188c8199283ef2aa835d4653"],["/assets/fonts/Roboto-Medium.6a8fa741e8050dd5c035.woff","6a8fa741e8050dd5c035868ef3b52b52"],["/assets/fonts/Roboto-Medium.99fc0816a09395454061.ttf","99fc0816a09395454061301fefa42bf1"],["/assets/fonts/Roboto-Medium.e8861fcfea6f13a3d714.woff2","e8861fcfea6f13a3d714f0bc573360cd"],["/assets/fonts/Roboto-Regular.0849134af1124509f917.woff","0849134af1124509f917f15d1b6a831c"],["/assets/fonts/Roboto-Regular.54a91b0619ccf9373d52.ttf","54a91b0619ccf9373d525109268219dc"],["/assets/fonts/Roboto-Regular.a4a7fd2a43bce238de65.woff2","a4a7fd2a43bce238de65284d22f127c6"],["/assets/images/icons/logo-120.png","fb85cfaf029c5fd8dc2068e16a316bf7"],["/assets/images/icons/logo-120.webp","f4ce313325b435ca06c4bb5450446a97"],["/assets/images/icons/logo-144.png","6aab40f57eaad22a4b8fe7f85e353577"],["/assets/images/icons/logo-144.webp","be46f9ebb8423ae07c670f562e34283b"],["/assets/images/icons/logo-152.png","00d75f29b262c03399c86cc04c5278d1"],["/assets/images/icons/logo-152.webp","8a4ea9b5d789aa8e73efd76d6c037e21"],["/assets/images/icons/logo-192.png","94acfd467d8d98d8efe77d8ebe04f14c"],["/assets/images/icons/logo-192.webp","7db62b0326546c21ad02d4feb8fc8887"],["/assets/images/icons/logo-256.png","a97de8ec35de770a1ca15c291a261493"],["/assets/images/icons/logo-256.webp","40728b31c41b6117ba9ef2445af4cde3"],["/assets/images/icons/logo-384.png","35d949a905d92e9d97d38f9dee02b4fa"],["/assets/images/icons/logo-384.webp","db798fce06b2d63d831d255a6bdc6e4c"],["/assets/images/icons/logo-48.png","05dcd7e143ee1ced705145d820001e09"],["/assets/images/icons/logo-48.webp","f217c0ed350e12ce888c2547b493109c"],["/assets/images/icons/logo-512.png","6d111bac28fe8ddb522d64ef0c259c80"],["/assets/images/icons/logo-512.webp","fbc65521b0c2aea624a0fb26574b0225"],["/assets/item-detail.be052a0fc6078e60760f.css","b1d21bfe6a7f637047b0cd631010fd82"],["/assets/item-detail.be052a0fc6078e60760f.css.br","be85892457bec3744865507da2974558"],["/assets/item-detail.be052a0fc6078e60760f.css.gz","e83c365298574081b0dcdcd879342bba"],["/assets/item-detail.be052a0fc6078e60760f.js","daa244f82c655ef231885603769f593b"],["/assets/item-detail.be052a0fc6078e60760f.js.br","4515028db3aeb2413fcc36ccb7dd6180"],["/assets/item-detail.be052a0fc6078e60760f.js.gz","3dc84d0c87e9bc134602c949bed176de"],["/assets/item-list.2419f2d3f6c6c2b84a8e.css","c9d0cab3a428484a6f8aac07d77c6473"],["/assets/item-list.2419f2d3f6c6c2b84a8e.css.br","c79e9b276e8ee8e8322f40a4aed75422"],["/assets/item-list.2419f2d3f6c6c2b84a8e.css.gz","8944177eca3c97013141fa7dfbef5f0c"],["/assets/item-list.2419f2d3f6c6c2b84a8e.js","8402108774aade6ccdf98632272a97c8"],["/assets/item-list.2419f2d3f6c6c2b84a8e.js.br","6b41f977ed5a76a7325ecb50c642ef0e"],["/assets/item-list.2419f2d3f6c6c2b84a8e.js.gz","e43c249e0f923b9d819c333f4634934b"],["/assets/ui-kit.aaa200c0e5ca83a13168.css","18680422fc15a65e1db25e4e1e8beb99"],["/assets/ui-kit.aaa200c0e5ca83a13168.css.br","c846a8c5c8702dff3135d44f0049095c"],["/assets/ui-kit.aaa200c0e5ca83a13168.css.gz","ec44a45655c417a01f18a6876bd9af15"],["/assets/ui-kit.aaa200c0e5ca83a13168.js","46ccf0a7a4feff87ab031143f0d7dd4c"],["/assets/ui-kit.aaa200c0e5ca83a13168.js.br","708b357fcf2d1558c2b21d82bfe8f5c4"],["/assets/ui-kit.aaa200c0e5ca83a13168.js.gz","ac7525e1f9eda29207920f069a682988"],["/assets/user-detail.fd7c12f1ad7f7d3ef4c4.css","39bf11b9bc02a6903807c751962a3221"],["/assets/user-detail.fd7c12f1ad7f7d3ef4c4.js","0c164ddd0929c912716780dd26f398f5"],["/assets/user-detail.fd7c12f1ad7f7d3ef4c4.js.br","c890946f2038d78b83a85820960350f3"],["/assets/user-detail.fd7c12f1ad7f7d3ef4c4.js.gz","460deff0da581f495e5ef7b16bcc5b58"],["/assets/vendors~app.f966c908c9cdc4ae68f9.css","84563df0cbcfa7a70b3a2b7f194a6232"],["/assets/vendors~app.f966c908c9cdc4ae68f9.css.br","56e3120ad6a0494d8bccce411b4d88d6"],["/assets/vendors~app.f966c908c9cdc4ae68f9.css.gz","942eeba18aa4c652533cafcc99912b3c"],["/assets/vendors~app.f966c908c9cdc4ae68f9.js","b6f52e98fc4bac775bcfa2fe730d9ac4"],["/assets/vendors~app.f966c908c9cdc4ae68f9.js.br","a8716a941ab1c9fd5f905616ff45b641"],["/assets/vendors~app.f966c908c9cdc4ae68f9.js.gz","bdc204c678af205f19d87ef980e6dc23"],["/assets/vendors~create-list-view~item-detail~user-detail.709fdb583bd428bef79f.js","183b1aa4a9464693ec1f597b4cfdb29c"],["/assets/vendors~create-list-view~item-detail~user-detail.709fdb583bd428bef79f.js.br","98f52eb97be4406f86eb531e7d87ae92"],["/assets/vendors~create-list-view~item-detail~user-detail.709fdb583bd428bef79f.js.gz","47af246d0f52d648784aefc9815aa440"],["/assets/vendors~ui-kit.cb6c871567c910d00d3f.js","d5ba801db15e33b45164ea2688364bb4"],["/assets/vendors~ui-kit.cb6c871567c910d00d3f.js.br","dcaf722ae4017bddf514ebf313841b21"],["/assets/vendors~ui-kit.cb6c871567c910d00d3f.js.gz","998fa2f66272a30bdeacd8ca81d3bf5c"]],cacheName="sw-precache-v3-vue-ibt-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,r){var a=new URL(e);return r&&a.pathname.match(r)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],r=new URL(t,self.location),a=createCacheKey(r,hashParamName,n,/./);return[r.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var r=new Request(n,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).toolbox=e()}}(function(){return function e(t,n,r){function a(c,o){if(!n[c]){if(!t[c]){var i="function"==typeof require&&require;if(!o&&i)return i(c,!0);if(s)return s(c,!0);var f=new Error("Cannot find module '"+c+"'");throw f.code="MODULE_NOT_FOUND",f}var u=n[c]={exports:{}};t[c][0].call(u.exports,function(e){var n=t[c][1][e];return a(n||e)},u,u.exports,e,t,n,r)}return n[c].exports}for(var s="function"==typeof require&&require,c=0;c<r.length;c++)a(r[c]);return a}({1:[function(e,t,n){function r(e,t){((t=t||{}).debug||i.debug)&&console.log("[sw-toolbox] "+e)}function a(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||i.cache.name,caches.open(t)}function s(e,t,n){var a=e.url,s=n.maxAgeSeconds,c=n.maxEntries,o=n.name,i=Date.now();return r("Updating LRU order for "+a+". Max entries is "+c+", max age is "+s),f.getDb(o).then(function(e){return f.setTimestampForUrl(e,a,i)}).then(function(e){return f.expireEntries(e,c,s,i)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function c(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var o,i=e("./options"),f=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:function(e,t){var n=(t=t||{}).successResponses||i.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&a(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||i.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&function(e,t,n){var r=s.bind(null,e,t,n);o=o?o.then(r):r()}(e,n,r)})}),r.clone()})},openCache:a,renameCache:function(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})},cache:function(e,t){return a(t).then(function(t){return t.add(e)})},uncache:function(e,t){return a(t).then(function(t){return t.delete(e)})},precache:function(e){e instanceof Promise||c(e),i.preCacheItems=i.preCacheItems.concat(e)},validatePrecacheInput:c,isResponseFresh:function(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r&&new Date(r).getTime()+1e3*t<n)return!1}return!0}}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){var r="sw-toolbox-",a=1,s="store",c="url",o="timestamp",i={};t.exports={getDb:function(e){return e in i||(i[e]=function(e){return new Promise(function(t,n){var i=indexedDB.open(r+e,a);i.onupgradeneeded=function(){i.result.createObjectStore(s,{keyPath:c}).createIndex(o,o,{unique:!1})},i.onsuccess=function(){t(i.result)},i.onerror=function(){n(i.error)}})}(e)),i[e]},setTimestampForUrl:function(e,t,n){return new Promise(function(r,a){var c=e.transaction(s,"readwrite");c.objectStore(s).put({url:t,timestamp:n}),c.oncomplete=function(){r(e)},c.onabort=function(){a(c.error)}})},expireEntries:function(e,t,n,r){return function(e,t,n){return t?new Promise(function(r,a){var i=1e3*t,f=[],u=e.transaction(s,"readwrite"),d=u.objectStore(s);d.index(o).openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[o]){var r=t.value[c];f.push(r),d.delete(r),t.continue()}},u.oncomplete=function(){r(f)},u.onabort=a}):Promise.resolve([])}(e,n,r).then(function(n){return function(e,t){return t?new Promise(function(n,r){var a=[],i=e.transaction(s,"readwrite"),f=i.objectStore(s),u=f.index(o),d=u.count();u.count().onsuccess=function(){var e=d.result;e>t&&(u.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var s=r.value[c];a.push(s),f.delete(s),e-a.length>t&&r.continue()}})},i.oncomplete=function(){n(a)},i.onabort=r}):Promise.resolve([])}(e,t).then(function(e){return n.concat(e)})})}}},{}],3:[function(e,t,n){function r(e){return e.reduce(function(e,t){return e.concat(t)},[])}e("serviceworker-cache-polyfill");var a=e("./helpers"),s=e("./router"),c=e("./options");t.exports={fetchListener:function(e){var t=s.match(e.request);t?e.respondWith(t(e.request)):s.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(s.default(e.request))},activateListener:function(e){a.debug("activate event fired");var t=c.cache.name+"$$$inactive$$$";e.waitUntil(a.renameCache(t,c.cache.name))},installListener:function(e){var t=c.cache.name+"$$$inactive$$$";a.debug("install event fired"),a.debug("creating cache ["+t+"]"),e.waitUntil(a.openCache({cache:{name:t}}).then(function(e){return Promise.all(c.preCacheItems).then(r).then(a.validatePrecacheInput).then(function(t){return a.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){var r=new URL("./",self.location).pathname,a=e("path-to-regexp"),s=function(e,t,n,s){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=r+t),this.keys=[],this.regexp=a(t,this.keys)),this.method=e,this.options=s,this.handler=n};s.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=s},{"path-to-regexp":15}],6:[function(e,t,n){var r=e("./route"),a=e("./helpers"),s=function(e,t){for(var n=e.entries(),r=n.next(),a=[];!r.done;){new RegExp(r.value[0]).test(t)&&a.push(r.value[1]),r=n.next()}return a},c=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){c.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),c.prototype.add=function(e,t,n,s){var c;s=s||{},t instanceof RegExp?c=RegExp:c=(c=s.origin||self.location.origin)instanceof RegExp?c.source:function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}(c),e=e.toLowerCase();var o=new r(e,t,n,s);this.routes.has(c)||this.routes.set(c,new Map);var i=this.routes.get(c);i.has(e)||i.set(e,new Map);var f=i.get(e),u=o.regexp||o.fullUrlRegExp;f.has(u.source)&&a.debug('"'+t+'" resolves to same regex as existing route.'),f.set(u.source,o)},c.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,a=n.pathname;return this._match(e,s(this.routes,r),a)||this._match(e,[this.routes.get(RegExp)],t)},c.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var a=t[r],c=a&&a.get(e.toLowerCase());if(c){var o=s(c,n);if(o.length>0)return o[0].makeHandler(n)}}return null},c.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new c},{"./helpers":1,"./route":5}],7:[function(e,t,n){var r=e("../options"),a=e("../helpers");t.exports=function(e,t,n){return n=n||{},a.debug("Strategy: cache first ["+e.url+"]",n),a.openCache(n).then(function(t){return t.match(e).then(function(t){var s=n.cache||r.cache,c=Date.now();return a.isResponseFresh(t,s.maxAgeSeconds,c)?t:a.fetchAndCache(e,n)})})}},{"../helpers":1,"../options":4}],8:[function(e,t,n){var r=e("../options"),a=e("../helpers");t.exports=function(e,t,n){return n=n||{},a.debug("Strategy: cache only ["+e.url+"]",n),a.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||r.cache,s=Date.now();if(a.isResponseFresh(e,t.maxAgeSeconds,s))return e})})}},{"../helpers":1,"../options":4}],9:[function(e,t,n){var r=e("../helpers"),a=e("./cacheOnly");t.exports=function(e,t,n){return r.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(s,c){var o=!1,i=[],f=function(e){i.push(e.toString()),o?c(new Error('Both cache and network failed: "'+i.join('", "')+'"')):o=!0},u=function(e){e instanceof Response?s(e):f("No result returned")};r.fetchAndCache(e.clone(),n).then(u,f),a(e,t,n).then(u,f)})}},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){var r=e("../options"),a=e("../helpers");t.exports=function(e,t,n){var s=(n=n||{}).successResponses||r.successResponses,c=n.networkTimeoutSeconds||r.networkTimeoutSeconds;return a.debug("Strategy: network first ["+e.url+"]",n),a.openCache(n).then(function(t){var o,i,f=[];if(c){var u=new Promise(function(s){o=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||r.cache,c=Date.now(),o=t.maxAgeSeconds;a.isResponseFresh(e,o,c)&&s(e)})},1e3*c)});f.push(u)}var d=a.fetchAndCache(e,n).then(function(e){if(o&&clearTimeout(o),s.test(e.status))return e;throw a.debug("Response was an HTTP error: "+e.statusText,n),i=e,new Error("Bad response")}).catch(function(r){return a.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(i)return i;throw r})});return f.push(d),Promise.race(f)})}},{"../helpers":1,"../options":4}],12:[function(e,t,n){var r=e("../helpers");t.exports=function(e,t,n){return r.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}},{"../helpers":1}],13:[function(e,t,n){var r=e("./options"),a=e("./router"),s=e("./helpers"),c=e("./strategies"),o=e("./listeners");s.debug("Service Worker Toolbox is loading"),self.addEventListener("install",o.installListener),self.addEventListener("activate",o.activateListener),self.addEventListener("fetch",o.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:a,options:r,cache:s.cache,uncache:s.uncache,precache:s.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],a=0,s=0,c="",f=t&&t.delimiter||"/";null!=(n=p.exec(e));){var u=n[0],d=n[1],l=n.index;if(c+=e.slice(s,l),s=l+u.length,d)c+=d[1];else{var h=e[s],b=n[2],g=n[3],m=n[4],v=n[5],w=n[6],x=n[7];c&&(r.push(c),c="");var y=null!=b&&null!=h&&h!==b,R="+"===w||"*"===w,k="?"===w||"*"===w,E=n[2]||f,C=m||v;r.push({name:g||a++,prefix:b||"",delimiter:E,optional:k,repeat:R,partial:y,asterisk:!!x,pattern:C?i(C):x?".*":"[^"+o(E)+"]+?"})}}return s<e.length&&(c+=e.substr(s)),c&&r.push(c),r}function a(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var c="",o=n||{},i=(r||{}).pretty?a:encodeURIComponent,f=0;f<e.length;f++){var u=e[f];if("string"!=typeof u){var d,l=o[u.name];if(null==l){if(u.optional){u.partial&&(c+=u.prefix);continue}throw new TypeError('Expected "'+u.name+'" to be defined')}if(h(l)){if(!u.repeat)throw new TypeError('Expected "'+u.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(u.optional)continue;throw new TypeError('Expected "'+u.name+'" to not be empty')}for(var p=0;p<l.length;p++){if(d=i(l[p]),!t[f].test(d))throw new TypeError('Expected all "'+u.name+'" to match "'+u.pattern+'", but received `'+JSON.stringify(d)+"`");c+=(0===p?u.prefix:u.delimiter)+d}}else{if(d=u.asterisk?s(l):i(l),!t[f].test(d))throw new TypeError('Expected "'+u.name+'" to match "'+u.pattern+'", but received "'+d+'"');c+=u.prefix+d}}else c+=u}return c}}function o(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function i(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function u(e){return e.sensitive?"":"i"}function d(e,t,n){h(t)||(n=t||n,t=[]);for(var r=(n=n||{}).strict,a=!1!==n.end,s="",c=0;c<e.length;c++){var i=e[c];if("string"==typeof i)s+=o(i);else{var d=o(i.prefix),l="(?:"+i.pattern+")";t.push(i),i.repeat&&(l+="(?:"+d+l+")*"),s+=l=i.optional?i.partial?d+"("+l+")?":"(?:"+d+"("+l+"))?":d+"("+l+")"}}var p=o(n.delimiter||"/"),b=s.slice(-p.length)===p;return r||(s=(b?s.slice(0,-p.length):s)+"(?:"+p+"(?=$))?"),s+=a?"$":r&&b?"":"(?="+p+"|$)",f(new RegExp("^"+s,u(n)),t)}function l(e,t,n){return h(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?function(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}(e,t):h(e)?function(e,t,n){for(var r=[],a=0;a<e.length;a++)r.push(l(e[a],t,n).source);return f(new RegExp("(?:"+r.join("|")+")",u(n)),t)}(e,t,n):function(e,t,n){return d(r(e,n),t,n)}(e,t,n)}var h=e("isarray");t.exports=l,t.exports.parse=r,t.exports.compile=function(e,t){return c(r(e,t))},t.exports.tokensToFunction=c,t.exports.tokensToRegExp=d;var p=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)}),toolbox.router.get("/",toolbox.networkFirst,{}),toolbox.router.get(/\/(top|new|show|ask|job)/,toolbox.networkFirst,{}),toolbox.router.get("/item/:id",toolbox.networkFirst,{}),toolbox.router.get("/user/:id",toolbox.networkFirst,{});