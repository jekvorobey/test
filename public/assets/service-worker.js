"use strict";var precacheConfig=[["/assets/2cb23b8860e4d2e1445b.js","06eae63c5199b4066a82a2316eece369"],["/assets/2cb23b8860e4d2e1445b.js.br","2c98c03b9459358efc278d76c0544a74"],["/assets/2cb23b8860e4d2e1445b.js.gz","db105060135f8dd94811f04b0cfdc47d"],["/assets/62017ed85cba8ba38a86.css","56e36447db45a29a424a024735757e2f"],["/assets/62017ed85cba8ba38a86.css.br","0c9d11d22a89f9865b49bb0755e00851"],["/assets/62017ed85cba8ba38a86.css.gz","c9c42bc52cfab0434c74675977f94aab"],["/assets/62017ed85cba8ba38a86.js","dd72ee05f06ef7d9713195f83207908c"],["/assets/62017ed85cba8ba38a86.js.br","7f2525a46b89fa1fde6ee16346e482bc"],["/assets/62017ed85cba8ba38a86.js.gz","21aa2792a8cb3ce2d41978eb8ba0f364"],["/assets/66f13c8b04b367684f6e.css","b1d21bfe6a7f637047b0cd631010fd82"],["/assets/66f13c8b04b367684f6e.css.br","be85892457bec3744865507da2974558"],["/assets/66f13c8b04b367684f6e.css.gz","e83c365298574081b0dcdcd879342bba"],["/assets/66f13c8b04b367684f6e.js","deb58004b4ab43a92ff70c4f5da5ae25"],["/assets/66f13c8b04b367684f6e.js.br","ef965fb21c02048ac04030a04a6c83fa"],["/assets/66f13c8b04b367684f6e.js.gz","871f87a614427f4cbcfe3dfff93b070a"],["/assets/9b2df3be3a46bea740e5.js","fe7621f9f50ee541e33888b979804f0d"],["/assets/9b2df3be3a46bea740e5.js.br","c4f088b9c9018d73c1c17379e4c5c6aa"],["/assets/9b2df3be3a46bea740e5.js.gz","ef7996ac6db4cf96ea1ea5e5ed4c7b16"],["/assets/a112d8dbbf9d010f847f.js","bdd08bcdd2553d3fe7bb18a169326599"],["/assets/a112d8dbbf9d010f847f.js.br","91a5da8fb2cb25866bdcdf2391fcc2dd"],["/assets/a112d8dbbf9d010f847f.js.gz","297b53da19d526e9ddd89610d7e3b85c"],["/assets/ad5ed02604e8b413802a.css","39bf11b9bc02a6903807c751962a3221"],["/assets/ad5ed02604e8b413802a.js","d9bd92ac2a4ea7c755671ec283b0bfca"],["/assets/ad5ed02604e8b413802a.js.br","af4dedd2e71d5f3e5a762f642fe3cccd"],["/assets/ad5ed02604e8b413802a.js.gz","495536e12ceab90bf0a2cfdc6ef71828"],["/assets/b4324f329330ee05e358.js","10793cec024c95ba05869885faa1a6a0"],["/assets/b4324f329330ee05e358.js.br","d36851f598164aff058802729165634e"],["/assets/b4324f329330ee05e358.js.gz","b90e1d2383f177efbd2558c1fdf80cd2"],["/assets/favicon.ico","20686540fcbdf63d7874c9a748db6a82"],["/assets/fce2879ef94fe8c5a7b6.css","c9d0cab3a428484a6f8aac07d77c6473"],["/assets/fce2879ef94fe8c5a7b6.css.br","c79e9b276e8ee8e8322f40a4aed75422"],["/assets/fce2879ef94fe8c5a7b6.css.gz","8944177eca3c97013141fa7dfbef5f0c"],["/assets/fce2879ef94fe8c5a7b6.js","3cf7a29d46a034ea35354a67b20c7fb4"],["/assets/fce2879ef94fe8c5a7b6.js.br","eb93814974ebda0b46db6e380a3fabfd"],["/assets/fce2879ef94fe8c5a7b6.js.gz","c961e25885c580faa9678bc18b2b1ab0"],["/assets/fe7710a25e110264b56f.css","6f757c45abd73cae5600c5f2bd56c252"],["/assets/fe7710a25e110264b56f.css.br","fa56e2c584e011b96bb9d6bf5b5979bc"],["/assets/fe7710a25e110264b56f.css.gz","caaf5ce3eb92cbe69c08d78d0aed44cb"],["/assets/fe7710a25e110264b56f.js","48d9b599eca1238b8f606554041fe4d8"],["/assets/fe7710a25e110264b56f.js.br","6f1794985f486f043b9148fc80e0d8ce"],["/assets/fe7710a25e110264b56f.js.gz","4275bfd24b1aebe61fbb00641b7cf00e"],["/assets/fonts/0849134af1124509f917.woff","0849134af1124509f917f15d1b6a831c"],["/assets/fonts/54a91b0619ccf9373d52.ttf","54a91b0619ccf9373d525109268219dc"],["/assets/fonts/6a8fa741e8050dd5c035.woff","6a8fa741e8050dd5c035868ef3b52b52"],["/assets/fonts/6bd3eb4c208213cc8a72.woff","6bd3eb4c208213cc8a721dd421a7bb02"],["/assets/fonts/824d6cf793c3db8c0bbd.woff","824d6cf793c3db8c0bbd98120e1f4f32"],["/assets/fonts/8b66a8ee62cf05f658c5.woff2","8b66a8ee62cf05f658c569d0e1a18ee2"],["/assets/fonts/99fc0816a09395454061.ttf","99fc0816a09395454061301fefa42bf1"],["/assets/fonts/a4a7fd2a43bce238de65.woff2","a4a7fd2a43bce238de65284d22f127c6"],["/assets/fonts/a5d5af1b3e4b457805e4.woff2","a5d5af1b3e4b457805e468ae06865c2b"],["/assets/fonts/afa7a91dadd77b23634a.ttf","afa7a91dadd77b23634a0fdf18c148f3"],["/assets/fonts/e22062b3188c8199283e.ttf","e22062b3188c8199283ef2aa835d4653"],["/assets/fonts/e8861fcfea6f13a3d714.woff2","e8861fcfea6f13a3d714f0bc573360cd"],["/assets/images/icons/logo-120.png","ebffe9b11621cd01e43b689d1545ddde"],["/assets/images/icons/logo-120.webp","0cb255d284bf4bd9275f32ebdd06c19f"],["/assets/images/icons/logo-144.png","1aa6b7c93b90b93d01f0c144af0530c2"],["/assets/images/icons/logo-144.webp","9250a59e3b4d45ff32bc03a62944490b"],["/assets/images/icons/logo-152.png","8784f5cd364789ceeb87018cad1f4fa7"],["/assets/images/icons/logo-152.webp","406bf0cd68cfd1c725f2ba844bd08f43"],["/assets/images/icons/logo-192.png","b6cce9283bd80ad14dd047df93473e9f"],["/assets/images/icons/logo-192.webp","8e59d6c2a399af55e0b9da4ceec44f66"],["/assets/images/icons/logo-256.png","fee8df94db8d07281efc07d8d3b5a2ff"],["/assets/images/icons/logo-256.webp","1c3f065c1b9adf5fbddc9873f7c250f2"],["/assets/images/icons/logo-384.png","39966f526929c132ce27badd3e764cb9"],["/assets/images/icons/logo-384.webp","144e1d4abea9ab8ad8010e2f2eeb0cee"],["/assets/images/icons/logo-48.png","445152be06ac08d0d2585c844ecb3082"],["/assets/images/icons/logo-48.webp","558d77f00debd4a8f1da904239c3b573"],["/assets/images/icons/logo-512.png","e94746c2f5d0fbc3c455cbea1cfe5c4c"],["/assets/images/icons/logo-512.webp","4e1c828644c284d0396ec0590b7c7e8e"]],cacheName="sw-precache-v3-vue-ibt-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,r){var s=new URL(e);return r&&s.pathname.match(r)||(s.search+=(s.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),s.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],r=new URL(t,self.location),s=createCacheKey(r,hashParamName,n,/./);return[r.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var r=new Request(n,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).toolbox=e()}}(function(){return function e(t,n,r){function s(o,c){if(!n[o]){if(!t[o]){var i="function"==typeof require&&require;if(!c&&i)return i(o,!0);if(a)return a(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var u=n[o]={exports:{}};t[o][0].call(u.exports,function(e){var n=t[o][1][e];return s(n||e)},u,u.exports,e,t,n,r)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(e,t,n){function r(e,t){((t=t||{}).debug||i.debug)&&console.log("[sw-toolbox] "+e)}function s(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||i.cache.name,caches.open(t)}function a(e,t,n){var s=e.url,a=n.maxAgeSeconds,o=n.maxEntries,c=n.name,i=Date.now();return r("Updating LRU order for "+s+". Max entries is "+o+", max age is "+a),f.getDb(c).then(function(e){return f.setTimestampForUrl(e,s,i)}).then(function(e){return f.expireEntries(e,o,a,i)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function o(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var c,i=e("./options"),f=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:function(e,t){var n=(t=t||{}).successResponses||i.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&s(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||i.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&function(e,t,n){var r=a.bind(null,e,t,n);c=c?c.then(r):r()}(e,n,r)})}),r.clone()})},openCache:s,renameCache:function(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})},cache:function(e,t){return s(t).then(function(t){return t.add(e)})},uncache:function(e,t){return s(t).then(function(t){return t.delete(e)})},precache:function(e){e instanceof Promise||o(e),i.preCacheItems=i.preCacheItems.concat(e)},validatePrecacheInput:o,isResponseFresh:function(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r&&new Date(r).getTime()+1e3*t<n)return!1}return!0}}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){var r="sw-toolbox-",s=1,a="store",o="url",c="timestamp",i={};t.exports={getDb:function(e){return e in i||(i[e]=function(e){return new Promise(function(t,n){var i=indexedDB.open(r+e,s);i.onupgradeneeded=function(){i.result.createObjectStore(a,{keyPath:o}).createIndex(c,c,{unique:!1})},i.onsuccess=function(){t(i.result)},i.onerror=function(){n(i.error)}})}(e)),i[e]},setTimestampForUrl:function(e,t,n){return new Promise(function(r,s){var o=e.transaction(a,"readwrite");o.objectStore(a).put({url:t,timestamp:n}),o.oncomplete=function(){r(e)},o.onabort=function(){s(o.error)}})},expireEntries:function(e,t,n,r){return function(e,t,n){return t?new Promise(function(r,s){var i=1e3*t,f=[],u=e.transaction(a,"readwrite"),d=u.objectStore(a);d.index(c).openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[c]){var r=t.value[o];f.push(r),d.delete(r),t.continue()}},u.oncomplete=function(){r(f)},u.onabort=s}):Promise.resolve([])}(e,n,r).then(function(n){return function(e,t){return t?new Promise(function(n,r){var s=[],i=e.transaction(a,"readwrite"),f=i.objectStore(a),u=f.index(c),d=u.count();u.count().onsuccess=function(){var e=d.result;e>t&&(u.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var a=r.value[o];s.push(a),f.delete(a),e-s.length>t&&r.continue()}})},i.oncomplete=function(){n(s)},i.onabort=r}):Promise.resolve([])}(e,t).then(function(e){return n.concat(e)})})}}},{}],3:[function(e,t,n){function r(e){return e.reduce(function(e,t){return e.concat(t)},[])}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),o=e("./options");t.exports={fetchListener:function(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))},activateListener:function(e){s.debug("activate event fired");var t=o.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,o.cache.name))},installListener:function(e){var t=o.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(o.preCacheItems).then(r).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){var r=new URL("./",self.location).pathname,s=e("path-to-regexp"),a=function(e,t,n,a){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=r+t),this.keys=[],this.regexp=s(t,this.keys)),this.method=e,this.options=a,this.handler=n};a.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=a},{"path-to-regexp":15}],6:[function(e,t,n){var r=e("./route"),s=e("./helpers"),a=function(e,t){for(var n=e.entries(),r=n.next(),s=[];!r.done;){new RegExp(r.value[0]).test(t)&&s.push(r.value[1]),r=n.next()}return s},o=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){o.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),o.prototype.add=function(e,t,n,a){var o;a=a||{},t instanceof RegExp?o=RegExp:o=(o=a.origin||self.location.origin)instanceof RegExp?o.source:function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}(o),e=e.toLowerCase();var c=new r(e,t,n,a);this.routes.has(o)||this.routes.set(o,new Map);var i=this.routes.get(o);i.has(e)||i.set(e,new Map);var f=i.get(e),u=c.regexp||c.fullUrlRegExp;f.has(u.source)&&s.debug('"'+t+'" resolves to same regex as existing route.'),f.set(u.source,c)},o.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,s=n.pathname;return this._match(e,a(this.routes,r),s)||this._match(e,[this.routes.get(RegExp)],t)},o.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var s=t[r],o=s&&s.get(e.toLowerCase());if(o){var c=a(o,n);if(c.length>0)return c[0].makeHandler(n)}}return null},o.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new o},{"./helpers":1,"./route":5}],7:[function(e,t,n){var r=e("../options"),s=e("../helpers");t.exports=function(e,t,n){return n=n||{},s.debug("Strategy: cache first ["+e.url+"]",n),s.openCache(n).then(function(t){return t.match(e).then(function(t){var a=n.cache||r.cache,o=Date.now();return s.isResponseFresh(t,a.maxAgeSeconds,o)?t:s.fetchAndCache(e,n)})})}},{"../helpers":1,"../options":4}],8:[function(e,t,n){var r=e("../options"),s=e("../helpers");t.exports=function(e,t,n){return n=n||{},s.debug("Strategy: cache only ["+e.url+"]",n),s.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||r.cache,a=Date.now();if(s.isResponseFresh(e,t.maxAgeSeconds,a))return e})})}},{"../helpers":1,"../options":4}],9:[function(e,t,n){var r=e("../helpers"),s=e("./cacheOnly");t.exports=function(e,t,n){return r.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(a,o){var c=!1,i=[],f=function(e){i.push(e.toString()),c?o(new Error('Both cache and network failed: "'+i.join('", "')+'"')):c=!0},u=function(e){e instanceof Response?a(e):f("No result returned")};r.fetchAndCache(e.clone(),n).then(u,f),s(e,t,n).then(u,f)})}},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){var r=e("../options"),s=e("../helpers");t.exports=function(e,t,n){var a=(n=n||{}).successResponses||r.successResponses,o=n.networkTimeoutSeconds||r.networkTimeoutSeconds;return s.debug("Strategy: network first ["+e.url+"]",n),s.openCache(n).then(function(t){var c,i,f=[];if(o){var u=new Promise(function(a){c=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||r.cache,o=Date.now(),c=t.maxAgeSeconds;s.isResponseFresh(e,c,o)&&a(e)})},1e3*o)});f.push(u)}var d=s.fetchAndCache(e,n).then(function(e){if(c&&clearTimeout(c),a.test(e.status))return e;throw s.debug("Response was an HTTP error: "+e.statusText,n),i=e,new Error("Bad response")}).catch(function(r){return s.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(i)return i;throw r})});return f.push(d),Promise.race(f)})}},{"../helpers":1,"../options":4}],12:[function(e,t,n){var r=e("../helpers");t.exports=function(e,t,n){return r.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}},{"../helpers":1}],13:[function(e,t,n){var r=e("./options"),s=e("./router"),a=e("./helpers"),o=e("./strategies"),c=e("./listeners");a.debug("Service Worker Toolbox is loading"),self.addEventListener("install",c.installListener),self.addEventListener("activate",c.activateListener),self.addEventListener("fetch",c.fetchListener),t.exports={networkOnly:o.networkOnly,networkFirst:o.networkFirst,cacheOnly:o.cacheOnly,cacheFirst:o.cacheFirst,fastest:o.fastest,router:s,options:r,cache:a.cache,uncache:a.uncache,precache:a.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],s=0,a=0,o="",f=t&&t.delimiter||"/";null!=(n=p.exec(e));){var u=n[0],d=n[1],h=n.index;if(o+=e.slice(a,h),a=h+u.length,d)o+=d[1];else{var l=e[a],b=n[2],g=n[3],m=n[4],v=n[5],w=n[6],x=n[7];o&&(r.push(o),o="");var y=null!=b&&null!=l&&l!==b,E="+"===w||"*"===w,R="?"===w||"*"===w,C=n[2]||f,k=m||v;r.push({name:g||s++,prefix:b||"",delimiter:C,optional:R,repeat:E,partial:y,asterisk:!!x,pattern:k?i(k):x?".*":"[^"+c(C)+"]+?"})}}return a<e.length&&(o+=e.substr(a)),o&&r.push(o),r}function s(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function a(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function o(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",c=n||{},i=(r||{}).pretty?s:encodeURIComponent,f=0;f<e.length;f++){var u=e[f];if("string"!=typeof u){var d,h=c[u.name];if(null==h){if(u.optional){u.partial&&(o+=u.prefix);continue}throw new TypeError('Expected "'+u.name+'" to be defined')}if(l(h)){if(!u.repeat)throw new TypeError('Expected "'+u.name+'" to not repeat, but received `'+JSON.stringify(h)+"`");if(0===h.length){if(u.optional)continue;throw new TypeError('Expected "'+u.name+'" to not be empty')}for(var p=0;p<h.length;p++){if(d=i(h[p]),!t[f].test(d))throw new TypeError('Expected all "'+u.name+'" to match "'+u.pattern+'", but received `'+JSON.stringify(d)+"`");o+=(0===p?u.prefix:u.delimiter)+d}}else{if(d=u.asterisk?a(h):i(h),!t[f].test(d))throw new TypeError('Expected "'+u.name+'" to match "'+u.pattern+'", but received "'+d+'"');o+=u.prefix+d}}else o+=u}return o}}function c(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function i(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function u(e){return e.sensitive?"":"i"}function d(e,t,n){l(t)||(n=t||n,t=[]);for(var r=(n=n||{}).strict,s=!1!==n.end,a="",o=0;o<e.length;o++){var i=e[o];if("string"==typeof i)a+=c(i);else{var d=c(i.prefix),h="(?:"+i.pattern+")";t.push(i),i.repeat&&(h+="(?:"+d+h+")*"),a+=h=i.optional?i.partial?d+"("+h+")?":"(?:"+d+"("+h+"))?":d+"("+h+")"}}var p=c(n.delimiter||"/"),b=a.slice(-p.length)===p;return r||(a=(b?a.slice(0,-p.length):a)+"(?:"+p+"(?=$))?"),a+=s?"$":r&&b?"":"(?="+p+"|$)",f(new RegExp("^"+a,u(n)),t)}function h(e,t,n){return l(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?function(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}(e,t):l(e)?function(e,t,n){for(var r=[],s=0;s<e.length;s++)r.push(h(e[s],t,n).source);return f(new RegExp("(?:"+r.join("|")+")",u(n)),t)}(e,t,n):function(e,t,n){return d(r(e,n),t,n)}(e,t,n)}var l=e("isarray");t.exports=h,t.exports.parse=r,t.exports.compile=function(e,t){return o(r(e,t))},t.exports.tokensToFunction=o,t.exports.tokensToRegExp=d;var p=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)}),toolbox.router.get("/",toolbox.networkFirst,{}),toolbox.router.get(/\/(top|new|show|ask|job)/,toolbox.networkFirst,{}),toolbox.router.get("/item/:id",toolbox.networkFirst,{}),toolbox.router.get("/user/:id",toolbox.networkFirst,{});