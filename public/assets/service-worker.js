"use strict";var precacheConfig=[["/assets/app.eb1584d21e9f8d7f716f.css","c28f37a683373df0b3709bf4d4491df8"],["/assets/app.eb1584d21e9f8d7f716f.css.br","f08741c644655a59f4bcca6084a4bdf3"],["/assets/app.eb1584d21e9f8d7f716f.css.gz","a7ddb9286ef6cacab582c16dd9f7345f"],["/assets/app.eb1584d21e9f8d7f716f.js","6431183a0d416180a3d7fad286a3613d"],["/assets/app.eb1584d21e9f8d7f716f.js.br","c742adb1a6c69756896894118c194a2e"],["/assets/app.eb1584d21e9f8d7f716f.js.gz","17834038ecf7fa44c7dbcde37eea8d77"],["/assets/catalog-view.2f89adcff9adb0286df5.css","7b57bdbacdae6d2f723be7ff69e4f90e"],["/assets/catalog-view.2f89adcff9adb0286df5.css.br","e307299dc368399539d385b096c24db3"],["/assets/catalog-view.2f89adcff9adb0286df5.css.gz","97a69f67ceaa3eb7c2d121ffc8ae584f"],["/assets/catalog-view.2f89adcff9adb0286df5.js","7667ab177c3ffcfc912ce74ea31804fc"],["/assets/catalog-view.2f89adcff9adb0286df5.js.br","b26fa86d5785a5276cee33e02334dbbb"],["/assets/catalog-view.2f89adcff9adb0286df5.js.gz","48a8aed0b10b2333b23741ff49f8809e"],["/assets/catalog-view~ui-kit.cd44cf16696b890a793c.css","78ef875e1e7fe8abfe52cdb774e32cd1"],["/assets/catalog-view~ui-kit.cd44cf16696b890a793c.css.br","146119493660a05992821e28f6986b2e"],["/assets/catalog-view~ui-kit.cd44cf16696b890a793c.css.gz","3b3f52cbe5528c09375df068b22ec112"],["/assets/catalog-view~ui-kit.cd44cf16696b890a793c.js","c7ea20189d2b0d72d12c983b68d48c96"],["/assets/catalog-view~ui-kit.cd44cf16696b890a793c.js.br","fc5916358c7c820b79079de53466e008"],["/assets/catalog-view~ui-kit.cd44cf16696b890a793c.js.gz","f27698ac35d3297cb732c350c2309e7c"],["/assets/create-list-view.e00684fafb60996dcc26.js","c6d0f0f85a5aa23634764726c96a4418"],["/assets/create-list-view.e00684fafb60996dcc26.js.br","be43c5c077496f3af4232b813084f715"],["/assets/create-list-view.e00684fafb60996dcc26.js.gz","48cacb6d049a87fc3fcbb0db3135f3a9"],["/assets/favicon.ico","20686540fcbdf63d7874c9a748db6a82"],["/assets/fonts/Roboto-Bold.824d6cf793c3db8c0bbd.woff","824d6cf793c3db8c0bbd98120e1f4f32"],["/assets/fonts/Roboto-Bold.a5d5af1b3e4b457805e4.woff2","a5d5af1b3e4b457805e468ae06865c2b"],["/assets/fonts/Roboto-Bold.afa7a91dadd77b23634a.ttf","afa7a91dadd77b23634a0fdf18c148f3"],["/assets/fonts/Roboto-Light.6bd3eb4c208213cc8a72.woff","6bd3eb4c208213cc8a721dd421a7bb02"],["/assets/fonts/Roboto-Light.8b66a8ee62cf05f658c5.woff2","8b66a8ee62cf05f658c569d0e1a18ee2"],["/assets/fonts/Roboto-Light.e22062b3188c8199283e.ttf","e22062b3188c8199283ef2aa835d4653"],["/assets/fonts/Roboto-Medium.6a8fa741e8050dd5c035.woff","6a8fa741e8050dd5c035868ef3b52b52"],["/assets/fonts/Roboto-Medium.99fc0816a09395454061.ttf","99fc0816a09395454061301fefa42bf1"],["/assets/fonts/Roboto-Medium.e8861fcfea6f13a3d714.woff2","e8861fcfea6f13a3d714f0bc573360cd"],["/assets/fonts/Roboto-Regular.0849134af1124509f917.woff","0849134af1124509f917f15d1b6a831c"],["/assets/fonts/Roboto-Regular.54a91b0619ccf9373d52.ttf","54a91b0619ccf9373d525109268219dc"],["/assets/fonts/Roboto-Regular.a4a7fd2a43bce238de65.woff2","a4a7fd2a43bce238de65284d22f127c6"],["/assets/images/icons/logo-120.png","fb85cfaf029c5fd8dc2068e16a316bf7"],["/assets/images/icons/logo-120.webp","f4ce313325b435ca06c4bb5450446a97"],["/assets/images/icons/logo-144.png","6aab40f57eaad22a4b8fe7f85e353577"],["/assets/images/icons/logo-144.webp","be46f9ebb8423ae07c670f562e34283b"],["/assets/images/icons/logo-152.png","00d75f29b262c03399c86cc04c5278d1"],["/assets/images/icons/logo-152.webp","8a4ea9b5d789aa8e73efd76d6c037e21"],["/assets/images/icons/logo-192.png","94acfd467d8d98d8efe77d8ebe04f14c"],["/assets/images/icons/logo-192.webp","7db62b0326546c21ad02d4feb8fc8887"],["/assets/images/icons/logo-256.png","a97de8ec35de770a1ca15c291a261493"],["/assets/images/icons/logo-256.webp","40728b31c41b6117ba9ef2445af4cde3"],["/assets/images/icons/logo-384.png","35d949a905d92e9d97d38f9dee02b4fa"],["/assets/images/icons/logo-384.webp","db798fce06b2d63d831d255a6bdc6e4c"],["/assets/images/icons/logo-48.png","05dcd7e143ee1ced705145d820001e09"],["/assets/images/icons/logo-48.webp","f217c0ed350e12ce888c2547b493109c"],["/assets/images/icons/logo-512.png","6d111bac28fe8ddb522d64ef0c259c80"],["/assets/images/icons/logo-512.webp","fbc65521b0c2aea624a0fb26574b0225"],["/assets/images/insta1.39e8acfa1709b04b3dc6.png","5c16fd2166b86469710cde49e6eb8f0a"],["/assets/images/insta1.39e8acfa1709b04b3dc6.webp","42af3893846d29b848d08f8c70acd438"],["/assets/images/insta2.8243cd744f1218ea8b32.png","104f28ee95b59ef9789979cdde1795e8"],["/assets/images/insta2.8243cd744f1218ea8b32.webp","895c4e274af575241a26c36dc6cbe07d"],["/assets/images/insta3.8359eb12ff5e3de5c00d.png","b9472b19af5b8a6ad338236492c6e4b5"],["/assets/images/insta3.8359eb12ff5e3de5c00d.webp","b693859b7425f3069d6f21fd2e587ede"],["/assets/images/insta4.97142e47a052194d00fc.png","7c04d2afc7c1eef8cb2591a68d6d29bc"],["/assets/images/insta4.97142e47a052194d00fc.webp","ca6b6acf961745f483d6503f09ffa1da"],["/assets/images/insta5.80358f152f49325a95bd.png","1ccfea9e09e8025e10fcc671a2109687"],["/assets/images/insta5.80358f152f49325a95bd.webp","4ce67ac4a898a60baf11ea63b60e4f82"],["/assets/images/insta6.be709453b62ae0de3c9d.png","4e0c8224b1131fe49652e72ecb27ebef"],["/assets/images/insta6.be709453b62ae0de3c9d.webp","05ce226592204960123d60ac05793f11"],["/assets/images/insta7.05d4482585ffad6a253a.png","b0e80963cb89b47944df1c99d3be59c6"],["/assets/images/insta7.05d4482585ffad6a253a.webp","e0dfee2d6de7750c8a402812e5cb7aa1"],["/assets/images/insta8.aa48ea93388142bfbc56.png","a5d68c8e4ebead0414186184464ea147"],["/assets/images/insta8.aa48ea93388142bfbc56.webp","b4bc61bd6ba77397d8b459dbb6672e01"],["/assets/images/product1.fa26eb2f70dff039f023.png","9d2f0873d59755d7b43b8dd1d54b9b1a"],["/assets/images/product1.fa26eb2f70dff039f023.webp","2e8e0679adad688b629304ca80a3bfbb"],["/assets/images/product10.fe68b548bfafb8f860f1.png","6b4df952bac5a5765cc3cefd5179147d"],["/assets/images/product10.fe68b548bfafb8f860f1.webp","54a6f94ff35c7a02cf8ebbddd25d21d7"],["/assets/images/product11.77f9997685b06db5a6ec.png","850807b77eb0f5834717fac39c873adb"],["/assets/images/product11.77f9997685b06db5a6ec.webp","3117dc0b5061ad0b7f4633e740f70e5f"],["/assets/images/product12.1bbfaa38dcfeb7566703.png","bca6816b5ad104b9e2b362801ac8ef9f"],["/assets/images/product12.1bbfaa38dcfeb7566703.webp","3f8c2971cc6b4db3959160cfa7353623"],["/assets/images/product2.401ee41288d9b80dbd03.png","a3b3c0a54d95d4ea3d62575eb2302d61"],["/assets/images/product2.401ee41288d9b80dbd03.webp","0497222ae93a9175663ad1cf6a5acd37"],["/assets/images/product3.60b6fb47de4862cc99c4.png","6fd60fef1f273e7e86e61c9173eeb46a"],["/assets/images/product3.60b6fb47de4862cc99c4.webp","335c8c82a4b0e9052842473a66880272"],["/assets/images/product4.b33283fc1cedee0762d5.png","60edc434b35896572176f22d63f839f2"],["/assets/images/product4.b33283fc1cedee0762d5.webp","acc5472b1acbef90ac1105e1a12a3aba"],["/assets/images/product5.28ae04489d14662c5bdc.png","85d7ac669f8f2c0db280be02d9547891"],["/assets/images/product5.28ae04489d14662c5bdc.webp","877c19e754a39379ba09c408250064be"],["/assets/images/product6.2b68d3f967dc411e0909.png","154ba7144de3932067474583f5ef1647"],["/assets/images/product6.2b68d3f967dc411e0909.webp","85dc90f5d7c0a94536fe1a98843a4130"],["/assets/images/product7.0186bc38dc59724f0ead.png","7dce475dd51314686751a2c6faac04c4"],["/assets/images/product7.0186bc38dc59724f0ead.webp","38b53dbea5b44138ba7a3ed4efcbbefe"],["/assets/images/product8.7c8924ab261abbdc5610.png","6d5126b30c7f1c43cbc6f989b0a47027"],["/assets/images/product8.7c8924ab261abbdc5610.webp","587bb35a0fe9b891ea49c1c63d585410"],["/assets/images/product9.d66de5f5c3e1876946b8.png","c0c6655e3078d6b39fcc7f9de367fd20"],["/assets/images/product9.d66de5f5c3e1876946b8.webp","0bca395f17e24c44e96beab44431e98f"],["/assets/item-detail.6b5978ab307cfb4cad1e.css","56aefccd3f7af17bda0daa33ab59b4fc"],["/assets/item-detail.6b5978ab307cfb4cad1e.css.br","f711f1e9377d5bfe69c4ea43de2b43a8"],["/assets/item-detail.6b5978ab307cfb4cad1e.css.gz","a6147b9f5f1bd7eb58be4c1b6027c1d6"],["/assets/item-detail.6b5978ab307cfb4cad1e.js","ec89012915dd5ecac4f2107eab8806c1"],["/assets/item-detail.6b5978ab307cfb4cad1e.js.br","240bff4b4de6272c8046551b7a3ea1c0"],["/assets/item-detail.6b5978ab307cfb4cad1e.js.gz","87ed7bd1758d6a652dab40ddd1a1334c"],["/assets/item-list.98710fbc74d1763f5304.css","c9d0cab3a428484a6f8aac07d77c6473"],["/assets/item-list.98710fbc74d1763f5304.css.br","c79e9b276e8ee8e8322f40a4aed75422"],["/assets/item-list.98710fbc74d1763f5304.css.gz","8944177eca3c97013141fa7dfbef5f0c"],["/assets/item-list.98710fbc74d1763f5304.js","652f04cb66454e2ed4423640b63e744f"],["/assets/item-list.98710fbc74d1763f5304.js.br","00b7000f5e7e6f7cf7592486ec31b1e5"],["/assets/item-list.98710fbc74d1763f5304.js.gz","cc14f193321f4e7f5c829c23a72eea4f"],["/assets/landing-view.2141b55180299bdb040c.css","34fbcdf1ce34d9c3a900094c4a348e87"],["/assets/landing-view.2141b55180299bdb040c.css.br","ab9e385d83bf536697855eeaa89078ba"],["/assets/landing-view.2141b55180299bdb040c.css.gz","668044640b02e05f9194cd35f64929f0"],["/assets/landing-view.2141b55180299bdb040c.js","c72654e160db08563bc967e7ff2f29b4"],["/assets/landing-view.2141b55180299bdb040c.js.br","455c88ddc7367eae9fe7e804310b5130"],["/assets/landing-view.2141b55180299bdb040c.js.gz","65556fc8e3822bb5a5d7a524ee040c53"],["/assets/not-found-view.bf9ae65212706423bf4e.css","d0ac8d4461cc5f6227c3ea083329ef21"],["/assets/not-found-view.bf9ae65212706423bf4e.css.br","77e7f712ca07bdc0b5ad4cad59f21041"],["/assets/not-found-view.bf9ae65212706423bf4e.css.gz","8d589d4dd3b46bc6f13e7d4b38b0d232"],["/assets/not-found-view.bf9ae65212706423bf4e.js","58dc0d15e160c4f7dc590bd083cbb55a"],["/assets/ui-kit.a85839149f68ab39d825.css","05607de6aad66e0d3aec6e742309ae16"],["/assets/ui-kit.a85839149f68ab39d825.css.br","ed7784ab4e1562a8056f8f52f0148007"],["/assets/ui-kit.a85839149f68ab39d825.css.gz","fd1cf1b7ef0eef2608c88fd84d563a69"],["/assets/ui-kit.a85839149f68ab39d825.js","476da867f0c710905551451da2ef7235"],["/assets/ui-kit.a85839149f68ab39d825.js.br","0523673153b980e2277341c3efb62d7f"],["/assets/ui-kit.a85839149f68ab39d825.js.gz","d301c6e949a4ff72d77028d920d71b53"],["/assets/user-detail.b648fb497f9762371658.css","39bf11b9bc02a6903807c751962a3221"],["/assets/user-detail.b648fb497f9762371658.js","c761bbd561b0d3bbbb10c35be3b681b4"],["/assets/user-detail.b648fb497f9762371658.js.br","61a3575e5255bcfbedd12861b7ac1a24"],["/assets/user-detail.b648fb497f9762371658.js.gz","2e43287dc927b7e9f2d952b2b4247fe0"],["/assets/vendors~app.729c4c815d9cf4ea225d.css","84563df0cbcfa7a70b3a2b7f194a6232"],["/assets/vendors~app.729c4c815d9cf4ea225d.css.br","56e3120ad6a0494d8bccce411b4d88d6"],["/assets/vendors~app.729c4c815d9cf4ea225d.css.gz","942eeba18aa4c652533cafcc99912b3c"],["/assets/vendors~app.729c4c815d9cf4ea225d.js","7a37cf49daf59a45a5dce50a722feabb"],["/assets/vendors~app.729c4c815d9cf4ea225d.js.br","3f98a1a79eaf7686d74247de3e45117b"],["/assets/vendors~app.729c4c815d9cf4ea225d.js.gz","aa81b8f590ac7555aefcffa7c3c7cb3f"],["/assets/vendors~catalog-view.66a71fd217307d735535.js","d3c294251515e3406afda180eae30ad4"],["/assets/vendors~catalog-view.66a71fd217307d735535.js.br","352ca11cec9cf2d7e0b7a305656f37c0"],["/assets/vendors~catalog-view.66a71fd217307d735535.js.gz","43e7e3c8754b83b7eff50c9026c717b1"],["/assets/vendors~catalog-view~ui-kit.a45e84d942a203698821.js","b2b126d4aa0c607ccf1c57b1b80c589a"],["/assets/vendors~catalog-view~ui-kit.a45e84d942a203698821.js.br","dab695d7b0bf72f7c1e3fba5cf4eb246"],["/assets/vendors~catalog-view~ui-kit.a45e84d942a203698821.js.gz","aff7b62d0aac7304686c74f36d46ba8a"],["/assets/vendors~ui-kit.b4e4a7c6d1e4bbd0885f.js","d452d7c0a251f28833d5f98b9215d1b5"],["/assets/vendors~ui-kit.b4e4a7c6d1e4bbd0885f.js.br","59f529d3a98d7285dae3ad8de276bcda"],["/assets/vendors~ui-kit.b4e4a7c6d1e4bbd0885f.js.gz","ede861ed022c11bda02f059746d68c82"]],cacheName="sw-precache-v3-vue-ibt-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,s){var n=new URL(e);return s&&n.pathname.match(s)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],s=new URL(t,self.location),n=createCacheKey(s,hashParamName,a,/./);return[s.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var s=new Request(a,{credentials:"same-origin"});return fetch(s).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).toolbox=e()}}(function(){return function e(t,a,s){function n(r,o){if(!a[r]){if(!t[r]){var f="function"==typeof require&&require;if(!o&&f)return f(r,!0);if(c)return c(r,!0);var i=new Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}var d=a[r]={exports:{}};t[r][0].call(d.exports,function(e){var a=t[r][1][e];return n(a||e)},d,d.exports,e,t,a,s)}return a[r].exports}for(var c="function"==typeof require&&require,r=0;r<s.length;r++)n(s[r]);return n}({1:[function(e,t,a){function s(e,t){((t=t||{}).debug||f.debug)&&console.log("[sw-toolbox] "+e)}function n(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||f.cache.name,caches.open(t)}function c(e,t,a){var n=e.url,c=a.maxAgeSeconds,r=a.maxEntries,o=a.name,f=Date.now();return s("Updating LRU order for "+n+". Max entries is "+r+", max age is "+c),i.getDb(o).then(function(e){return i.setTimestampForUrl(e,n,f)}).then(function(e){return i.expireEntries(e,r,c,f)}).then(function(e){s("Successfully updated IDB.");var a=e.map(function(e){return t.delete(e)});return Promise.all(a).then(function(){s("Done with cache cleanup.")})}).catch(function(e){s(e)})}function r(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var o,f=e("./options"),i=e("./idb-cache-expiration");t.exports={debug:s,fetchAndCache:function(e,t){var a=(t=t||{}).successResponses||f.successResponses;return fetch(e.clone()).then(function(s){return"GET"===e.method&&a.test(s.status)&&n(t).then(function(a){a.put(e,s).then(function(){var s=t.cache||f.cache;(s.maxEntries||s.maxAgeSeconds)&&s.name&&function(e,t,a){var s=c.bind(null,e,t,a);o=o?o.then(s):s()}(e,a,s)})}),s.clone()})},openCache:n,renameCache:function(e,t,a){return s("Renaming cache: ["+e+"] to ["+t+"]",a),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var a=t[0],s=t[1];return a.keys().then(function(e){return Promise.all(e.map(function(e){return a.match(e).then(function(t){return s.put(e,t)})}))}).then(function(){return caches.delete(e)})})})},cache:function(e,t){return n(t).then(function(t){return t.add(e)})},uncache:function(e,t){return n(t).then(function(t){return t.delete(e)})},precache:function(e){e instanceof Promise||r(e),f.preCacheItems=f.preCacheItems.concat(e)},validatePrecacheInput:r,isResponseFresh:function(e,t,a){if(!e)return!1;if(t){var s=e.headers.get("date");if(s&&new Date(s).getTime()+1e3*t<a)return!1}return!0}}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,a){var s="sw-toolbox-",n=1,c="store",r="url",o="timestamp",f={};t.exports={getDb:function(e){return e in f||(f[e]=function(e){return new Promise(function(t,a){var f=indexedDB.open(s+e,n);f.onupgradeneeded=function(){f.result.createObjectStore(c,{keyPath:r}).createIndex(o,o,{unique:!1})},f.onsuccess=function(){t(f.result)},f.onerror=function(){a(f.error)}})}(e)),f[e]},setTimestampForUrl:function(e,t,a){return new Promise(function(s,n){var r=e.transaction(c,"readwrite");r.objectStore(c).put({url:t,timestamp:a}),r.oncomplete=function(){s(e)},r.onabort=function(){n(r.error)}})},expireEntries:function(e,t,a,s){return function(e,t,a){return t?new Promise(function(s,n){var f=1e3*t,i=[],d=e.transaction(c,"readwrite"),b=d.objectStore(c);b.index(o).openCursor().onsuccess=function(e){var t=e.target.result;if(t&&a-f>t.value[o]){var s=t.value[r];i.push(s),b.delete(s),t.continue()}},d.oncomplete=function(){s(i)},d.onabort=n}):Promise.resolve([])}(e,a,s).then(function(a){return function(e,t){return t?new Promise(function(a,s){var n=[],f=e.transaction(c,"readwrite"),i=f.objectStore(c),d=i.index(o),b=d.count();d.count().onsuccess=function(){var e=b.result;e>t&&(d.openCursor().onsuccess=function(a){var s=a.target.result;if(s){var c=s.value[r];n.push(c),i.delete(c),e-n.length>t&&s.continue()}})},f.oncomplete=function(){a(n)},f.onabort=s}):Promise.resolve([])}(e,t).then(function(e){return a.concat(e)})})}}},{}],3:[function(e,t,a){function s(e){return e.reduce(function(e,t){return e.concat(t)},[])}e("serviceworker-cache-polyfill");var n=e("./helpers"),c=e("./router"),r=e("./options");t.exports={fetchListener:function(e){var t=c.match(e.request);t?e.respondWith(t(e.request)):c.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(c.default(e.request))},activateListener:function(e){n.debug("activate event fired");var t=r.cache.name+"$$$inactive$$$";e.waitUntil(n.renameCache(t,r.cache.name))},installListener:function(e){var t=r.cache.name+"$$$inactive$$$";n.debug("install event fired"),n.debug("creating cache ["+t+"]"),e.waitUntil(n.openCache({cache:{name:t}}).then(function(e){return Promise.all(r.preCacheItems).then(s).then(n.validatePrecacheInput).then(function(t){return n.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,a){var s;s=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+s+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,a){var s=new URL("./",self.location).pathname,n=e("path-to-regexp"),c=function(e,t,a,c){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=s+t),this.keys=[],this.regexp=n(t,this.keys)),this.method=e,this.options=c,this.handler=a};c.prototype.makeHandler=function(e){var t;if(this.regexp){var a=this.regexp.exec(e);t={},this.keys.forEach(function(e,s){t[e.name]=a[s+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,a){var s=e("./route"),n=e("./helpers"),c=function(e,t){for(var a=e.entries(),s=a.next(),n=[];!s.done;){new RegExp(s.value[0]).test(t)&&n.push(s.value[1]),s=a.next()}return n},r=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){r.prototype[e]=function(t,a,s){return this.add(e,t,a,s)}}),r.prototype.add=function(e,t,a,c){var r;c=c||{},t instanceof RegExp?r=RegExp:r=(r=c.origin||self.location.origin)instanceof RegExp?r.source:function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}(r),e=e.toLowerCase();var o=new s(e,t,a,c);this.routes.has(r)||this.routes.set(r,new Map);var f=this.routes.get(r);f.has(e)||f.set(e,new Map);var i=f.get(e),d=o.regexp||o.fullUrlRegExp;i.has(d.source)&&n.debug('"'+t+'" resolves to same regex as existing route.'),i.set(d.source,o)},r.prototype.matchMethod=function(e,t){var a=new URL(t),s=a.origin,n=a.pathname;return this._match(e,c(this.routes,s),n)||this._match(e,[this.routes.get(RegExp)],t)},r.prototype._match=function(e,t,a){if(0===t.length)return null;for(var s=0;s<t.length;s++){var n=t[s],r=n&&n.get(e.toLowerCase());if(r){var o=c(r,a);if(o.length>0)return o[0].makeHandler(a)}}return null},r.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new r},{"./helpers":1,"./route":5}],7:[function(e,t,a){var s=e("../options"),n=e("../helpers");t.exports=function(e,t,a){return a=a||{},n.debug("Strategy: cache first ["+e.url+"]",a),n.openCache(a).then(function(t){return t.match(e).then(function(t){var c=a.cache||s.cache,r=Date.now();return n.isResponseFresh(t,c.maxAgeSeconds,r)?t:n.fetchAndCache(e,a)})})}},{"../helpers":1,"../options":4}],8:[function(e,t,a){var s=e("../options"),n=e("../helpers");t.exports=function(e,t,a){return a=a||{},n.debug("Strategy: cache only ["+e.url+"]",a),n.openCache(a).then(function(t){return t.match(e).then(function(e){var t=a.cache||s.cache,c=Date.now();if(n.isResponseFresh(e,t.maxAgeSeconds,c))return e})})}},{"../helpers":1,"../options":4}],9:[function(e,t,a){var s=e("../helpers"),n=e("./cacheOnly");t.exports=function(e,t,a){return s.debug("Strategy: fastest ["+e.url+"]",a),new Promise(function(c,r){var o=!1,f=[],i=function(e){f.push(e.toString()),o?r(new Error('Both cache and network failed: "'+f.join('", "')+'"')):o=!0},d=function(e){e instanceof Response?c(e):i("No result returned")};s.fetchAndCache(e.clone(),a).then(d,i),n(e,t,a).then(d,i)})}},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,a){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,a){var s=e("../options"),n=e("../helpers");t.exports=function(e,t,a){var c=(a=a||{}).successResponses||s.successResponses,r=a.networkTimeoutSeconds||s.networkTimeoutSeconds;return n.debug("Strategy: network first ["+e.url+"]",a),n.openCache(a).then(function(t){var o,f,i=[];if(r){var d=new Promise(function(c){o=setTimeout(function(){t.match(e).then(function(e){var t=a.cache||s.cache,r=Date.now(),o=t.maxAgeSeconds;n.isResponseFresh(e,o,r)&&c(e)})},1e3*r)});i.push(d)}var b=n.fetchAndCache(e,a).then(function(e){if(o&&clearTimeout(o),c.test(e.status))return e;throw n.debug("Response was an HTTP error: "+e.statusText,a),f=e,new Error("Bad response")}).catch(function(s){return n.debug("Network or response error, fallback to cache ["+e.url+"]",a),t.match(e).then(function(e){if(e)return e;if(f)return f;throw s})});return i.push(b),Promise.race(i)})}},{"../helpers":1,"../options":4}],12:[function(e,t,a){var s=e("../helpers");t.exports=function(e,t,a){return s.debug("Strategy: network only ["+e.url+"]",a),fetch(e)}},{"../helpers":1}],13:[function(e,t,a){var s=e("./options"),n=e("./router"),c=e("./helpers"),r=e("./strategies"),o=e("./listeners");c.debug("Service Worker Toolbox is loading"),self.addEventListener("install",o.installListener),self.addEventListener("activate",o.activateListener),self.addEventListener("fetch",o.fetchListener),t.exports={networkOnly:r.networkOnly,networkFirst:r.networkFirst,cacheOnly:r.cacheOnly,cacheFirst:r.cacheFirst,fastest:r.fastest,router:n,options:s,cache:c.cache,uncache:c.uncache,precache:c.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,a){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,a){function s(e,t){for(var a,s=[],n=0,c=0,r="",i=t&&t.delimiter||"/";null!=(a=l.exec(e));){var d=a[0],b=a[1],u=a.index;if(r+=e.slice(c,u),c=u+d.length,b)r+=b[1];else{var p=e[c],h=a[2],g=a[3],m=a[4],w=a[5],v=a[6],x=a[7];r&&(s.push(r),r="");var y=null!=h&&null!=p&&p!==h,R="+"===v||"*"===v,k="?"===v||"*"===v,j=a[2]||i,E=m||w;s.push({name:g||n++,prefix:h||"",delimiter:j,optional:k,repeat:R,partial:y,asterisk:!!x,pattern:E?f(E):x?".*":"[^"+o(j)+"]+?"})}}return c<e.length&&(r+=e.substr(c)),r&&s.push(r),s}function n(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function r(e){for(var t=new Array(e.length),a=0;a<e.length;a++)"object"==typeof e[a]&&(t[a]=new RegExp("^(?:"+e[a].pattern+")$"));return function(a,s){for(var r="",o=a||{},f=(s||{}).pretty?n:encodeURIComponent,i=0;i<e.length;i++){var d=e[i];if("string"!=typeof d){var b,u=o[d.name];if(null==u){if(d.optional){d.partial&&(r+=d.prefix);continue}throw new TypeError('Expected "'+d.name+'" to be defined')}if(p(u)){if(!d.repeat)throw new TypeError('Expected "'+d.name+'" to not repeat, but received `'+JSON.stringify(u)+"`");if(0===u.length){if(d.optional)continue;throw new TypeError('Expected "'+d.name+'" to not be empty')}for(var l=0;l<u.length;l++){if(b=f(u[l]),!t[i].test(b))throw new TypeError('Expected all "'+d.name+'" to match "'+d.pattern+'", but received `'+JSON.stringify(b)+"`");r+=(0===l?d.prefix:d.delimiter)+b}}else{if(b=d.asterisk?c(u):f(u),!t[i].test(b))throw new TypeError('Expected "'+d.name+'" to match "'+d.pattern+'", but received "'+b+'"');r+=d.prefix+b}}else r+=d}return r}}function o(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function f(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function i(e,t){return e.keys=t,e}function d(e){return e.sensitive?"":"i"}function b(e,t,a){p(t)||(a=t||a,t=[]);for(var s=(a=a||{}).strict,n=!1!==a.end,c="",r=0;r<e.length;r++){var f=e[r];if("string"==typeof f)c+=o(f);else{var b=o(f.prefix),u="(?:"+f.pattern+")";t.push(f),f.repeat&&(u+="(?:"+b+u+")*"),c+=u=f.optional?f.partial?b+"("+u+")?":"(?:"+b+"("+u+"))?":b+"("+u+")"}}var l=o(a.delimiter||"/"),h=c.slice(-l.length)===l;return s||(c=(h?c.slice(0,-l.length):c)+"(?:"+l+"(?=$))?"),c+=n?"$":s&&h?"":"(?="+l+"|$)",i(new RegExp("^"+c,d(a)),t)}function u(e,t,a){return p(t)||(a=t||a,t=[]),a=a||{},e instanceof RegExp?function(e,t){var a=e.source.match(/\((?!\?)/g);if(a)for(var s=0;s<a.length;s++)t.push({name:s,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return i(e,t)}(e,t):p(e)?function(e,t,a){for(var s=[],n=0;n<e.length;n++)s.push(u(e[n],t,a).source);return i(new RegExp("(?:"+s.join("|")+")",d(a)),t)}(e,t,a):function(e,t,a){return b(s(e,a),t,a)}(e,t,a)}var p=e("isarray");t.exports=u,t.exports.parse=s,t.exports.compile=function(e,t){return r(s(e,t))},t.exports.tokensToFunction=r,t.exports.tokensToRegExp=b;var l=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,a){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var a=t[1],s=parseInt(t[2]);e&&(!t||"Firefox"===a&&s>=46||"Chrome"===a&&s>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var a=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var a=new URL(e.url).protocol;if("http:"!==a&&"https:"!==a)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(s){if(s.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(s.map(function(t,s){return a.put(e[s],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)}),toolbox.router.get("/",toolbox.networkFirst,{}),toolbox.router.get(/\/(top|new|show|ask|job)/,toolbox.networkFirst,{}),toolbox.router.get("/item/:id",toolbox.networkFirst,{}),toolbox.router.get("/user/:id",toolbox.networkFirst,{});