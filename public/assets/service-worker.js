"use strict";var precacheConfig=[["/assets/app.3953e0ec4e9ef2a3e379.css","c28f37a683373df0b3709bf4d4491df8"],["/assets/app.3953e0ec4e9ef2a3e379.css.br","f08741c644655a59f4bcca6084a4bdf3"],["/assets/app.3953e0ec4e9ef2a3e379.css.gz","a7ddb9286ef6cacab582c16dd9f7345f"],["/assets/app.3953e0ec4e9ef2a3e379.js","76e3ec858f97603e6a08c77d44eab009"],["/assets/app.3953e0ec4e9ef2a3e379.js.br","39b06d699362e3c14a6e7b4892f765d0"],["/assets/app.3953e0ec4e9ef2a3e379.js.gz","92786f5ee452522a505d01d65b5314d4"],["/assets/create-list-view.6244bdb4058b9208ab8d.js","255ff07a73c32d0dbaa43d9b82cad0d0"],["/assets/create-list-view.6244bdb4058b9208ab8d.js.br","c1a00d2540d25553ffecf0347259252e"],["/assets/create-list-view.6244bdb4058b9208ab8d.js.gz","0df7d1e38adf066e3a094a6f37ede5e4"],["/assets/favicon.ico","20686540fcbdf63d7874c9a748db6a82"],["/assets/fonts/Roboto-Bold.824d6cf793c3db8c0bbd.woff","824d6cf793c3db8c0bbd98120e1f4f32"],["/assets/fonts/Roboto-Bold.a5d5af1b3e4b457805e4.woff2","a5d5af1b3e4b457805e468ae06865c2b"],["/assets/fonts/Roboto-Bold.afa7a91dadd77b23634a.ttf","afa7a91dadd77b23634a0fdf18c148f3"],["/assets/fonts/Roboto-Light.6bd3eb4c208213cc8a72.woff","6bd3eb4c208213cc8a721dd421a7bb02"],["/assets/fonts/Roboto-Light.8b66a8ee62cf05f658c5.woff2","8b66a8ee62cf05f658c569d0e1a18ee2"],["/assets/fonts/Roboto-Light.e22062b3188c8199283e.ttf","e22062b3188c8199283ef2aa835d4653"],["/assets/fonts/Roboto-Medium.6a8fa741e8050dd5c035.woff","6a8fa741e8050dd5c035868ef3b52b52"],["/assets/fonts/Roboto-Medium.99fc0816a09395454061.ttf","99fc0816a09395454061301fefa42bf1"],["/assets/fonts/Roboto-Medium.e8861fcfea6f13a3d714.woff2","e8861fcfea6f13a3d714f0bc573360cd"],["/assets/fonts/Roboto-Regular.0849134af1124509f917.woff","0849134af1124509f917f15d1b6a831c"],["/assets/fonts/Roboto-Regular.54a91b0619ccf9373d52.ttf","54a91b0619ccf9373d525109268219dc"],["/assets/fonts/Roboto-Regular.a4a7fd2a43bce238de65.woff2","a4a7fd2a43bce238de65284d22f127c6"],["/assets/images/icons/logo-120.png","fb85cfaf029c5fd8dc2068e16a316bf7"],["/assets/images/icons/logo-120.webp","f4ce313325b435ca06c4bb5450446a97"],["/assets/images/icons/logo-144.png","6aab40f57eaad22a4b8fe7f85e353577"],["/assets/images/icons/logo-144.webp","be46f9ebb8423ae07c670f562e34283b"],["/assets/images/icons/logo-152.png","00d75f29b262c03399c86cc04c5278d1"],["/assets/images/icons/logo-152.webp","8a4ea9b5d789aa8e73efd76d6c037e21"],["/assets/images/icons/logo-192.png","94acfd467d8d98d8efe77d8ebe04f14c"],["/assets/images/icons/logo-192.webp","7db62b0326546c21ad02d4feb8fc8887"],["/assets/images/icons/logo-256.png","a97de8ec35de770a1ca15c291a261493"],["/assets/images/icons/logo-256.webp","40728b31c41b6117ba9ef2445af4cde3"],["/assets/images/icons/logo-384.png","35d949a905d92e9d97d38f9dee02b4fa"],["/assets/images/icons/logo-384.webp","db798fce06b2d63d831d255a6bdc6e4c"],["/assets/images/icons/logo-48.png","05dcd7e143ee1ced705145d820001e09"],["/assets/images/icons/logo-48.webp","f217c0ed350e12ce888c2547b493109c"],["/assets/images/icons/logo-512.png","6d111bac28fe8ddb522d64ef0c259c80"],["/assets/images/icons/logo-512.webp","fbc65521b0c2aea624a0fb26574b0225"],["/assets/images/insta1.39e8acfa1709b04b3dc6.png","5c16fd2166b86469710cde49e6eb8f0a"],["/assets/images/insta1.39e8acfa1709b04b3dc6.webp","42af3893846d29b848d08f8c70acd438"],["/assets/images/insta2.8243cd744f1218ea8b32.png","104f28ee95b59ef9789979cdde1795e8"],["/assets/images/insta2.8243cd744f1218ea8b32.webp","895c4e274af575241a26c36dc6cbe07d"],["/assets/images/insta3.8359eb12ff5e3de5c00d.png","b9472b19af5b8a6ad338236492c6e4b5"],["/assets/images/insta3.8359eb12ff5e3de5c00d.webp","b693859b7425f3069d6f21fd2e587ede"],["/assets/images/insta4.97142e47a052194d00fc.png","7c04d2afc7c1eef8cb2591a68d6d29bc"],["/assets/images/insta4.97142e47a052194d00fc.webp","ca6b6acf961745f483d6503f09ffa1da"],["/assets/images/insta5.80358f152f49325a95bd.png","1ccfea9e09e8025e10fcc671a2109687"],["/assets/images/insta5.80358f152f49325a95bd.webp","4ce67ac4a898a60baf11ea63b60e4f82"],["/assets/images/insta6.be709453b62ae0de3c9d.png","4e0c8224b1131fe49652e72ecb27ebef"],["/assets/images/insta6.be709453b62ae0de3c9d.webp","05ce226592204960123d60ac05793f11"],["/assets/images/insta7.05d4482585ffad6a253a.png","b0e80963cb89b47944df1c99d3be59c6"],["/assets/images/insta7.05d4482585ffad6a253a.webp","e0dfee2d6de7750c8a402812e5cb7aa1"],["/assets/images/insta8.aa48ea93388142bfbc56.png","a5d68c8e4ebead0414186184464ea147"],["/assets/images/insta8.aa48ea93388142bfbc56.webp","b4bc61bd6ba77397d8b459dbb6672e01"],["/assets/images/product1.fa26eb2f70dff039f023.png","9d2f0873d59755d7b43b8dd1d54b9b1a"],["/assets/images/product1.fa26eb2f70dff039f023.webp","2e8e0679adad688b629304ca80a3bfbb"],["/assets/images/product10.fe68b548bfafb8f860f1.png","6b4df952bac5a5765cc3cefd5179147d"],["/assets/images/product10.fe68b548bfafb8f860f1.webp","54a6f94ff35c7a02cf8ebbddd25d21d7"],["/assets/images/product11.77f9997685b06db5a6ec.png","850807b77eb0f5834717fac39c873adb"],["/assets/images/product11.77f9997685b06db5a6ec.webp","3117dc0b5061ad0b7f4633e740f70e5f"],["/assets/images/product12.1bbfaa38dcfeb7566703.png","bca6816b5ad104b9e2b362801ac8ef9f"],["/assets/images/product12.1bbfaa38dcfeb7566703.webp","3f8c2971cc6b4db3959160cfa7353623"],["/assets/images/product2.401ee41288d9b80dbd03.png","a3b3c0a54d95d4ea3d62575eb2302d61"],["/assets/images/product2.401ee41288d9b80dbd03.webp","0497222ae93a9175663ad1cf6a5acd37"],["/assets/images/product3.60b6fb47de4862cc99c4.png","6fd60fef1f273e7e86e61c9173eeb46a"],["/assets/images/product3.60b6fb47de4862cc99c4.webp","335c8c82a4b0e9052842473a66880272"],["/assets/images/product4.b33283fc1cedee0762d5.png","60edc434b35896572176f22d63f839f2"],["/assets/images/product4.b33283fc1cedee0762d5.webp","acc5472b1acbef90ac1105e1a12a3aba"],["/assets/images/product5.28ae04489d14662c5bdc.png","85d7ac669f8f2c0db280be02d9547891"],["/assets/images/product5.28ae04489d14662c5bdc.webp","877c19e754a39379ba09c408250064be"],["/assets/images/product6.2b68d3f967dc411e0909.png","154ba7144de3932067474583f5ef1647"],["/assets/images/product6.2b68d3f967dc411e0909.webp","85dc90f5d7c0a94536fe1a98843a4130"],["/assets/images/product7.0186bc38dc59724f0ead.png","7dce475dd51314686751a2c6faac04c4"],["/assets/images/product7.0186bc38dc59724f0ead.webp","38b53dbea5b44138ba7a3ed4efcbbefe"],["/assets/images/product8.7c8924ab261abbdc5610.png","6d5126b30c7f1c43cbc6f989b0a47027"],["/assets/images/product8.7c8924ab261abbdc5610.webp","587bb35a0fe9b891ea49c1c63d585410"],["/assets/images/product9.d66de5f5c3e1876946b8.png","c0c6655e3078d6b39fcc7f9de367fd20"],["/assets/images/product9.d66de5f5c3e1876946b8.webp","0bca395f17e24c44e96beab44431e98f"],["/assets/item-detail.f19561ffdd50e3452d45.css","56aefccd3f7af17bda0daa33ab59b4fc"],["/assets/item-detail.f19561ffdd50e3452d45.css.br","f711f1e9377d5bfe69c4ea43de2b43a8"],["/assets/item-detail.f19561ffdd50e3452d45.css.gz","a6147b9f5f1bd7eb58be4c1b6027c1d6"],["/assets/item-detail.f19561ffdd50e3452d45.js","37cdc77a90362e8656a0d8af1eea34a9"],["/assets/item-detail.f19561ffdd50e3452d45.js.br","56dd18e2306d74936fcce30d483b7aef"],["/assets/item-detail.f19561ffdd50e3452d45.js.gz","269c8b63ba88a4fe93720f38dfcb838a"],["/assets/item-list.7de0af394f3292d6f0c6.css","c9d0cab3a428484a6f8aac07d77c6473"],["/assets/item-list.7de0af394f3292d6f0c6.css.br","c79e9b276e8ee8e8322f40a4aed75422"],["/assets/item-list.7de0af394f3292d6f0c6.css.gz","8944177eca3c97013141fa7dfbef5f0c"],["/assets/item-list.7de0af394f3292d6f0c6.js","cead344da8c9168d3f3de76f14c06ebc"],["/assets/item-list.7de0af394f3292d6f0c6.js.br","ea198f38c8a3eb343a46a607dc9e3673"],["/assets/item-list.7de0af394f3292d6f0c6.js.gz","e65bc64d7034c27d715f139aa9b3b62e"],["/assets/landing-view.d810bcb46624a56c4c14.css","44733b9641ea6f766402238c6747f256"],["/assets/landing-view.d810bcb46624a56c4c14.css.br","5e304b7f3835e63a8128c00760a999e8"],["/assets/landing-view.d810bcb46624a56c4c14.css.gz","7179e96ea79f3f873329c1ddeb322151"],["/assets/landing-view.d810bcb46624a56c4c14.js","39a6e2e0474f5eef43c427e03615fa6c"],["/assets/landing-view.d810bcb46624a56c4c14.js.br","24aece50bf4b8bb5f6010a2042c78fc2"],["/assets/landing-view.d810bcb46624a56c4c14.js.gz","46b83e70dafb169c35d7cf2cccab6bad"],["/assets/ui-kit.cd2aa89898386e5b6e61.css","69af439036903bacff8e183daffad418"],["/assets/ui-kit.cd2aa89898386e5b6e61.css.br","2c4facd1bc7ade1d53c6f6311e0ec5b4"],["/assets/ui-kit.cd2aa89898386e5b6e61.css.gz","b27c0ac8a570e0c7d19ef3c0b6780fe9"],["/assets/ui-kit.cd2aa89898386e5b6e61.js","6339d7defb2cf3b3351433c85d9585e6"],["/assets/ui-kit.cd2aa89898386e5b6e61.js.br","ece3a9912eab2b0969e2ec71aa1a45af"],["/assets/ui-kit.cd2aa89898386e5b6e61.js.gz","bedac9965287823e8787ea11d627b00c"],["/assets/user-detail.f70ea98c0eb813d16ef9.css","39bf11b9bc02a6903807c751962a3221"],["/assets/user-detail.f70ea98c0eb813d16ef9.js","1748e4d285f5d31512a336696c365a41"],["/assets/user-detail.f70ea98c0eb813d16ef9.js.br","36ffa678b8af41846a8e9cd743d59cf6"],["/assets/user-detail.f70ea98c0eb813d16ef9.js.gz","2e456f142db76638e687467610fb0084"],["/assets/vendors~app.14b13c6c20da2d329944.css","84563df0cbcfa7a70b3a2b7f194a6232"],["/assets/vendors~app.14b13c6c20da2d329944.css.br","56e3120ad6a0494d8bccce411b4d88d6"],["/assets/vendors~app.14b13c6c20da2d329944.css.gz","942eeba18aa4c652533cafcc99912b3c"],["/assets/vendors~app.14b13c6c20da2d329944.js","31f178e25cad5df17207b7bfdad4c852"],["/assets/vendors~app.14b13c6c20da2d329944.js.br","0f110104bcb53189ce60e0c1f0c0c3c9"],["/assets/vendors~app.14b13c6c20da2d329944.js.gz","48898d37e00610ac3ae6a69699236d36"],["/assets/vendors~ui-kit.5214f9d3c14b12c02a7e.js","41df66f15368017a2b46768f381a7bbe"],["/assets/vendors~ui-kit.5214f9d3c14b12c02a7e.js.br","248de359de97e6356eead839ad037976"],["/assets/vendors~ui-kit.5214f9d3c14b12c02a7e.js.gz","335cd53e5d2c0843c0e3e262037f023a"]],cacheName="sw-precache-v3-vue-ibt-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,s){var n=new URL(e);return s&&n.pathname.match(s)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],s=new URL(t,self.location),n=createCacheKey(s,hashParamName,a,/./);return[s.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var s=new Request(a,{credentials:"same-origin"});return fetch(s).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).toolbox=e()}}(function(){return function e(t,a,s){function n(r,o){if(!a[r]){if(!t[r]){var i="function"==typeof require&&require;if(!o&&i)return i(r,!0);if(c)return c(r,!0);var f=new Error("Cannot find module '"+r+"'");throw f.code="MODULE_NOT_FOUND",f}var d=a[r]={exports:{}};t[r][0].call(d.exports,function(e){var a=t[r][1][e];return n(a||e)},d,d.exports,e,t,a,s)}return a[r].exports}for(var c="function"==typeof require&&require,r=0;r<s.length;r++)n(s[r]);return n}({1:[function(e,t,a){function s(e,t){((t=t||{}).debug||i.debug)&&console.log("[sw-toolbox] "+e)}function n(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||i.cache.name,caches.open(t)}function c(e,t,a){var n=e.url,c=a.maxAgeSeconds,r=a.maxEntries,o=a.name,i=Date.now();return s("Updating LRU order for "+n+". Max entries is "+r+", max age is "+c),f.getDb(o).then(function(e){return f.setTimestampForUrl(e,n,i)}).then(function(e){return f.expireEntries(e,r,c,i)}).then(function(e){s("Successfully updated IDB.");var a=e.map(function(e){return t.delete(e)});return Promise.all(a).then(function(){s("Done with cache cleanup.")})}).catch(function(e){s(e)})}function r(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var o,i=e("./options"),f=e("./idb-cache-expiration");t.exports={debug:s,fetchAndCache:function(e,t){var a=(t=t||{}).successResponses||i.successResponses;return fetch(e.clone()).then(function(s){return"GET"===e.method&&a.test(s.status)&&n(t).then(function(a){a.put(e,s).then(function(){var s=t.cache||i.cache;(s.maxEntries||s.maxAgeSeconds)&&s.name&&function(e,t,a){var s=c.bind(null,e,t,a);o=o?o.then(s):s()}(e,a,s)})}),s.clone()})},openCache:n,renameCache:function(e,t,a){return s("Renaming cache: ["+e+"] to ["+t+"]",a),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var a=t[0],s=t[1];return a.keys().then(function(e){return Promise.all(e.map(function(e){return a.match(e).then(function(t){return s.put(e,t)})}))}).then(function(){return caches.delete(e)})})})},cache:function(e,t){return n(t).then(function(t){return t.add(e)})},uncache:function(e,t){return n(t).then(function(t){return t.delete(e)})},precache:function(e){e instanceof Promise||r(e),i.preCacheItems=i.preCacheItems.concat(e)},validatePrecacheInput:r,isResponseFresh:function(e,t,a){if(!e)return!1;if(t){var s=e.headers.get("date");if(s&&new Date(s).getTime()+1e3*t<a)return!1}return!0}}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,a){var s="sw-toolbox-",n=1,c="store",r="url",o="timestamp",i={};t.exports={getDb:function(e){return e in i||(i[e]=function(e){return new Promise(function(t,a){var i=indexedDB.open(s+e,n);i.onupgradeneeded=function(){i.result.createObjectStore(c,{keyPath:r}).createIndex(o,o,{unique:!1})},i.onsuccess=function(){t(i.result)},i.onerror=function(){a(i.error)}})}(e)),i[e]},setTimestampForUrl:function(e,t,a){return new Promise(function(s,n){var r=e.transaction(c,"readwrite");r.objectStore(c).put({url:t,timestamp:a}),r.oncomplete=function(){s(e)},r.onabort=function(){n(r.error)}})},expireEntries:function(e,t,a,s){return function(e,t,a){return t?new Promise(function(s,n){var i=1e3*t,f=[],d=e.transaction(c,"readwrite"),u=d.objectStore(c);u.index(o).openCursor().onsuccess=function(e){var t=e.target.result;if(t&&a-i>t.value[o]){var s=t.value[r];f.push(s),u.delete(s),t.continue()}},d.oncomplete=function(){s(f)},d.onabort=n}):Promise.resolve([])}(e,a,s).then(function(a){return function(e,t){return t?new Promise(function(a,s){var n=[],i=e.transaction(c,"readwrite"),f=i.objectStore(c),d=f.index(o),u=d.count();d.count().onsuccess=function(){var e=u.result;e>t&&(d.openCursor().onsuccess=function(a){var s=a.target.result;if(s){var c=s.value[r];n.push(c),f.delete(c),e-n.length>t&&s.continue()}})},i.oncomplete=function(){a(n)},i.onabort=s}):Promise.resolve([])}(e,t).then(function(e){return a.concat(e)})})}}},{}],3:[function(e,t,a){function s(e){return e.reduce(function(e,t){return e.concat(t)},[])}e("serviceworker-cache-polyfill");var n=e("./helpers"),c=e("./router"),r=e("./options");t.exports={fetchListener:function(e){var t=c.match(e.request);t?e.respondWith(t(e.request)):c.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(c.default(e.request))},activateListener:function(e){n.debug("activate event fired");var t=r.cache.name+"$$$inactive$$$";e.waitUntil(n.renameCache(t,r.cache.name))},installListener:function(e){var t=r.cache.name+"$$$inactive$$$";n.debug("install event fired"),n.debug("creating cache ["+t+"]"),e.waitUntil(n.openCache({cache:{name:t}}).then(function(e){return Promise.all(r.preCacheItems).then(s).then(n.validatePrecacheInput).then(function(t){return n.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,a){var s;s=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+s+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,a){var s=new URL("./",self.location).pathname,n=e("path-to-regexp"),c=function(e,t,a,c){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=s+t),this.keys=[],this.regexp=n(t,this.keys)),this.method=e,this.options=c,this.handler=a};c.prototype.makeHandler=function(e){var t;if(this.regexp){var a=this.regexp.exec(e);t={},this.keys.forEach(function(e,s){t[e.name]=a[s+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,a){var s=e("./route"),n=e("./helpers"),c=function(e,t){for(var a=e.entries(),s=a.next(),n=[];!s.done;){new RegExp(s.value[0]).test(t)&&n.push(s.value[1]),s=a.next()}return n},r=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){r.prototype[e]=function(t,a,s){return this.add(e,t,a,s)}}),r.prototype.add=function(e,t,a,c){var r;c=c||{},t instanceof RegExp?r=RegExp:r=(r=c.origin||self.location.origin)instanceof RegExp?r.source:function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}(r),e=e.toLowerCase();var o=new s(e,t,a,c);this.routes.has(r)||this.routes.set(r,new Map);var i=this.routes.get(r);i.has(e)||i.set(e,new Map);var f=i.get(e),d=o.regexp||o.fullUrlRegExp;f.has(d.source)&&n.debug('"'+t+'" resolves to same regex as existing route.'),f.set(d.source,o)},r.prototype.matchMethod=function(e,t){var a=new URL(t),s=a.origin,n=a.pathname;return this._match(e,c(this.routes,s),n)||this._match(e,[this.routes.get(RegExp)],t)},r.prototype._match=function(e,t,a){if(0===t.length)return null;for(var s=0;s<t.length;s++){var n=t[s],r=n&&n.get(e.toLowerCase());if(r){var o=c(r,a);if(o.length>0)return o[0].makeHandler(a)}}return null},r.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new r},{"./helpers":1,"./route":5}],7:[function(e,t,a){var s=e("../options"),n=e("../helpers");t.exports=function(e,t,a){return a=a||{},n.debug("Strategy: cache first ["+e.url+"]",a),n.openCache(a).then(function(t){return t.match(e).then(function(t){var c=a.cache||s.cache,r=Date.now();return n.isResponseFresh(t,c.maxAgeSeconds,r)?t:n.fetchAndCache(e,a)})})}},{"../helpers":1,"../options":4}],8:[function(e,t,a){var s=e("../options"),n=e("../helpers");t.exports=function(e,t,a){return a=a||{},n.debug("Strategy: cache only ["+e.url+"]",a),n.openCache(a).then(function(t){return t.match(e).then(function(e){var t=a.cache||s.cache,c=Date.now();if(n.isResponseFresh(e,t.maxAgeSeconds,c))return e})})}},{"../helpers":1,"../options":4}],9:[function(e,t,a){var s=e("../helpers"),n=e("./cacheOnly");t.exports=function(e,t,a){return s.debug("Strategy: fastest ["+e.url+"]",a),new Promise(function(c,r){var o=!1,i=[],f=function(e){i.push(e.toString()),o?r(new Error('Both cache and network failed: "'+i.join('", "')+'"')):o=!0},d=function(e){e instanceof Response?c(e):f("No result returned")};s.fetchAndCache(e.clone(),a).then(d,f),n(e,t,a).then(d,f)})}},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,a){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,a){var s=e("../options"),n=e("../helpers");t.exports=function(e,t,a){var c=(a=a||{}).successResponses||s.successResponses,r=a.networkTimeoutSeconds||s.networkTimeoutSeconds;return n.debug("Strategy: network first ["+e.url+"]",a),n.openCache(a).then(function(t){var o,i,f=[];if(r){var d=new Promise(function(c){o=setTimeout(function(){t.match(e).then(function(e){var t=a.cache||s.cache,r=Date.now(),o=t.maxAgeSeconds;n.isResponseFresh(e,o,r)&&c(e)})},1e3*r)});f.push(d)}var u=n.fetchAndCache(e,a).then(function(e){if(o&&clearTimeout(o),c.test(e.status))return e;throw n.debug("Response was an HTTP error: "+e.statusText,a),i=e,new Error("Bad response")}).catch(function(s){return n.debug("Network or response error, fallback to cache ["+e.url+"]",a),t.match(e).then(function(e){if(e)return e;if(i)return i;throw s})});return f.push(u),Promise.race(f)})}},{"../helpers":1,"../options":4}],12:[function(e,t,a){var s=e("../helpers");t.exports=function(e,t,a){return s.debug("Strategy: network only ["+e.url+"]",a),fetch(e)}},{"../helpers":1}],13:[function(e,t,a){var s=e("./options"),n=e("./router"),c=e("./helpers"),r=e("./strategies"),o=e("./listeners");c.debug("Service Worker Toolbox is loading"),self.addEventListener("install",o.installListener),self.addEventListener("activate",o.activateListener),self.addEventListener("fetch",o.fetchListener),t.exports={networkOnly:r.networkOnly,networkFirst:r.networkFirst,cacheOnly:r.cacheOnly,cacheFirst:r.cacheFirst,fastest:r.fastest,router:n,options:s,cache:c.cache,uncache:c.uncache,precache:c.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,a){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,a){function s(e,t){for(var a,s=[],n=0,c=0,r="",f=t&&t.delimiter||"/";null!=(a=l.exec(e));){var d=a[0],u=a[1],b=a.index;if(r+=e.slice(c,b),c=b+d.length,u)r+=u[1];else{var p=e[c],h=a[2],g=a[3],m=a[4],w=a[5],v=a[6],x=a[7];r&&(s.push(r),r="");var y=null!=h&&null!=p&&p!==h,R="+"===v||"*"===v,k="?"===v||"*"===v,E=a[2]||f,C=m||w;s.push({name:g||n++,prefix:h||"",delimiter:E,optional:k,repeat:R,partial:y,asterisk:!!x,pattern:C?i(C):x?".*":"[^"+o(E)+"]+?"})}}return c<e.length&&(r+=e.substr(c)),r&&s.push(r),s}function n(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function r(e){for(var t=new Array(e.length),a=0;a<e.length;a++)"object"==typeof e[a]&&(t[a]=new RegExp("^(?:"+e[a].pattern+")$"));return function(a,s){for(var r="",o=a||{},i=(s||{}).pretty?n:encodeURIComponent,f=0;f<e.length;f++){var d=e[f];if("string"!=typeof d){var u,b=o[d.name];if(null==b){if(d.optional){d.partial&&(r+=d.prefix);continue}throw new TypeError('Expected "'+d.name+'" to be defined')}if(p(b)){if(!d.repeat)throw new TypeError('Expected "'+d.name+'" to not repeat, but received `'+JSON.stringify(b)+"`");if(0===b.length){if(d.optional)continue;throw new TypeError('Expected "'+d.name+'" to not be empty')}for(var l=0;l<b.length;l++){if(u=i(b[l]),!t[f].test(u))throw new TypeError('Expected all "'+d.name+'" to match "'+d.pattern+'", but received `'+JSON.stringify(u)+"`");r+=(0===l?d.prefix:d.delimiter)+u}}else{if(u=d.asterisk?c(b):i(b),!t[f].test(u))throw new TypeError('Expected "'+d.name+'" to match "'+d.pattern+'", but received "'+u+'"');r+=d.prefix+u}}else r+=d}return r}}function o(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function i(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function d(e){return e.sensitive?"":"i"}function u(e,t,a){p(t)||(a=t||a,t=[]);for(var s=(a=a||{}).strict,n=!1!==a.end,c="",r=0;r<e.length;r++){var i=e[r];if("string"==typeof i)c+=o(i);else{var u=o(i.prefix),b="(?:"+i.pattern+")";t.push(i),i.repeat&&(b+="(?:"+u+b+")*"),c+=b=i.optional?i.partial?u+"("+b+")?":"(?:"+u+"("+b+"))?":u+"("+b+")"}}var l=o(a.delimiter||"/"),h=c.slice(-l.length)===l;return s||(c=(h?c.slice(0,-l.length):c)+"(?:"+l+"(?=$))?"),c+=n?"$":s&&h?"":"(?="+l+"|$)",f(new RegExp("^"+c,d(a)),t)}function b(e,t,a){return p(t)||(a=t||a,t=[]),a=a||{},e instanceof RegExp?function(e,t){var a=e.source.match(/\((?!\?)/g);if(a)for(var s=0;s<a.length;s++)t.push({name:s,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}(e,t):p(e)?function(e,t,a){for(var s=[],n=0;n<e.length;n++)s.push(b(e[n],t,a).source);return f(new RegExp("(?:"+s.join("|")+")",d(a)),t)}(e,t,a):function(e,t,a){return u(s(e,a),t,a)}(e,t,a)}var p=e("isarray");t.exports=b,t.exports.parse=s,t.exports.compile=function(e,t){return r(s(e,t))},t.exports.tokensToFunction=r,t.exports.tokensToRegExp=u;var l=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,a){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var a=t[1],s=parseInt(t[2]);e&&(!t||"Firefox"===a&&s>=46||"Chrome"===a&&s>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var a=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var a=new URL(e.url).protocol;if("http:"!==a&&"https:"!==a)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(s){if(s.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(s.map(function(t,s){return a.put(e[s],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)}),toolbox.router.get("/",toolbox.networkFirst,{}),toolbox.router.get(/\/(top|new|show|ask|job)/,toolbox.networkFirst,{}),toolbox.router.get("/item/:id",toolbox.networkFirst,{}),toolbox.router.get("/user/:id",toolbox.networkFirst,{});