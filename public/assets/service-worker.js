"use strict";var precacheConfig=[["/assets/app.f0000d5157a9071c1958.css","bacdc1011eac6e72eb27b1522c40b762"],["/assets/app.f0000d5157a9071c1958.css.br","49ada8a5efe677981c316113d5496b33"],["/assets/app.f0000d5157a9071c1958.css.gz","13b83d6770cf8b656f480b9daa12a344"],["/assets/app.f0000d5157a9071c1958.js","5b5e4d5997a9a42f1db8e971efacc2b2"],["/assets/app.f0000d5157a9071c1958.js.br","a33451ca0d3436be36e6242178df3135"],["/assets/app.f0000d5157a9071c1958.js.gz","aef31a44505e9d318ba97b46c1af1b9c"],["/assets/brand-view.ebd702081e0ac082e810.css","c0d5e869da7437caa1ad20ccedce77dc"],["/assets/brand-view.ebd702081e0ac082e810.css.br","51b729a1b4efff419b389292496a2be2"],["/assets/brand-view.ebd702081e0ac082e810.css.gz","186adbe71d8ddb8b166c851cb9e332b2"],["/assets/brand-view.ebd702081e0ac082e810.js","4631afd8b0f1d136bdc2b57d45750a6e"],["/assets/brand-view.ebd702081e0ac082e810.js.br","5709f67b154b5fa731d5cea1ac73df45"],["/assets/brand-view.ebd702081e0ac082e810.js.gz","e7864ef7b600981ea27176080354a5d2"],["/assets/brand-view~catalog-view.7a2e12537877ddbab690.css","1b3631f02c8e4f438a6936c20231f615"],["/assets/brand-view~catalog-view.7a2e12537877ddbab690.css.br","415c3e92ad014eaa11f7dae7b1050cdf"],["/assets/brand-view~catalog-view.7a2e12537877ddbab690.css.gz","cb2b373c4975245c91cf0e3b31398602"],["/assets/brand-view~catalog-view.7a2e12537877ddbab690.js","2b0bbd74f3688fa92ebea5b38104816f"],["/assets/brand-view~catalog-view.7a2e12537877ddbab690.js.br","50331e8464e9be4108995a3de8b2deb0"],["/assets/brand-view~catalog-view.7a2e12537877ddbab690.js.gz","b5d419e65c6780749bc78c419a937f0b"],["/assets/brand-view~catalog-view~ui-kit.5c2e686d6cf99e00d60b.css","92e8772dd284fb5a86568d3b40b7c074"],["/assets/brand-view~catalog-view~ui-kit.5c2e686d6cf99e00d60b.css.br","c6924374c1c4ee3d6dc8c24e53da4192"],["/assets/brand-view~catalog-view~ui-kit.5c2e686d6cf99e00d60b.css.gz","bb343e7a8b230ea20388d3f388f4c0e9"],["/assets/brand-view~catalog-view~ui-kit.5c2e686d6cf99e00d60b.js","d6cd5cb2ab6f8d77bd48df41f40a80ba"],["/assets/brand-view~catalog-view~ui-kit.5c2e686d6cf99e00d60b.js.br","fbc23ade05b39f10cc67a0dab9fd97bd"],["/assets/brand-view~catalog-view~ui-kit.5c2e686d6cf99e00d60b.js.gz","df7fc71731dca6db9ad80ee7fa19933b"],["/assets/catalog-view.d7a05664faf65de47ee0.css","8b156e9614283b8ea3ddd9ff5fb138a5"],["/assets/catalog-view.d7a05664faf65de47ee0.css.br","1e11e061e6a96d03df1ab7aaaf538b45"],["/assets/catalog-view.d7a05664faf65de47ee0.css.gz","5c52d20000cb8dc2ee2c9a78549b3b2c"],["/assets/catalog-view.d7a05664faf65de47ee0.js","d9156c491f948d5fa78f981ac0b6efcf"],["/assets/catalog-view.d7a05664faf65de47ee0.js.br","a050e0bde2b0188af0ff08521bbd7355"],["/assets/catalog-view.d7a05664faf65de47ee0.js.gz","965697a86f6b21ef5fb770d60ed0cd41"],["/assets/favicon.ico","20686540fcbdf63d7874c9a748db6a82"],["/assets/fonts/FuturaPT-Book.0d987efe9bc0b858a7bc.ttf","0d987efe9bc0b858a7bc0367c2d5922c"],["/assets/fonts/FuturaPT-Book.8cd2ddc4f8da5b39b573.woff2","8cd2ddc4f8da5b39b5736f3d5025a640"],["/assets/fonts/FuturaPT-Book.c431096955795da262fc.woff","c431096955795da262fc32297d7bfa8f"],["/assets/fonts/FuturaPT-Demi.57b3d1b6401b8c8fbebe.woff2","57b3d1b6401b8c8fbebe606d2a202474"],["/assets/fonts/FuturaPT-Demi.65ee0094094ad87a4684.woff","65ee0094094ad87a468482025e755626"],["/assets/fonts/FuturaPT-Demi.cc2af0787cb4b6579c8d.ttf","cc2af0787cb4b6579c8de6cdb7e0ec19"],["/assets/fonts/FuturaPT-Light.0588623b3256c750187b.woff2","0588623b3256c750187b94b426cc8afc"],["/assets/fonts/FuturaPT-Light.92aa0d7878fe4d8d55da.woff","92aa0d7878fe4d8d55dab98aae0796e5"],["/assets/fonts/FuturaPT-Light.c7f1106be884b5027c6d.ttf","c7f1106be884b5027c6d93deec8ca00a"],["/assets/fonts/FuturaPT-Medium.540c81bc4ca37ae1efe4.ttf","540c81bc4ca37ae1efe4b60de51e753f"],["/assets/fonts/FuturaPT-Medium.5fbd70c5077087b45add.woff2","5fbd70c5077087b45add01329ea35620"],["/assets/fonts/FuturaPT-Medium.995c64e152e8dc077222.woff","995c64e152e8dc077222766889194951"],["/assets/images/banner1.c667d0f7bf2fdfe5c36e.png","f5d9b8260a558cdb38ad510d278f947c"],["/assets/images/banner1.c667d0f7bf2fdfe5c36e.webp","46f3c69b0049e86f8b2ae5d601ff9366"],["/assets/images/banner2.651ed3c742ab96cb5792.png","386be5249f09fd6502d68d62ce6fdeb9"],["/assets/images/banner2.651ed3c742ab96cb5792.webp","346d55b514f23b7a3159e3b48b9003ad"],["/assets/images/banner3.824169d7f6ef0645a796.png","d57431c652eaa768c5f0eda20b93228b"],["/assets/images/banner3.824169d7f6ef0645a796.webp","ce862e4476421c3bcd00c23b852d285b"],["/assets/images/banner4.7f695634c2711200d296.png","6021d1aebc5eb58d04377be37e94980b"],["/assets/images/banner4.7f695634c2711200d296.webp","131446303bc3c204296106416fcf34d8"],["/assets/images/banner5.94adb7f9a69ce7f53ee8.png","b544a98786c4074bee2c98e04d2f1f07"],["/assets/images/banner5.94adb7f9a69ce7f53ee8.webp","4ee0565fc25d9af4dcc2e3c7615beac1"],["/assets/images/icons/logo-120.png","fb85cfaf029c5fd8dc2068e16a316bf7"],["/assets/images/icons/logo-120.webp","f4ce313325b435ca06c4bb5450446a97"],["/assets/images/icons/logo-144.png","6aab40f57eaad22a4b8fe7f85e353577"],["/assets/images/icons/logo-144.webp","be46f9ebb8423ae07c670f562e34283b"],["/assets/images/icons/logo-152.png","00d75f29b262c03399c86cc04c5278d1"],["/assets/images/icons/logo-152.webp","8a4ea9b5d789aa8e73efd76d6c037e21"],["/assets/images/icons/logo-192.png","94acfd467d8d98d8efe77d8ebe04f14c"],["/assets/images/icons/logo-192.webp","7db62b0326546c21ad02d4feb8fc8887"],["/assets/images/icons/logo-256.png","a97de8ec35de770a1ca15c291a261493"],["/assets/images/icons/logo-256.webp","40728b31c41b6117ba9ef2445af4cde3"],["/assets/images/icons/logo-384.png","35d949a905d92e9d97d38f9dee02b4fa"],["/assets/images/icons/logo-384.webp","db798fce06b2d63d831d255a6bdc6e4c"],["/assets/images/icons/logo-48.png","05dcd7e143ee1ced705145d820001e09"],["/assets/images/icons/logo-48.webp","f217c0ed350e12ce888c2547b493109c"],["/assets/images/icons/logo-512.png","6d111bac28fe8ddb522d64ef0c259c80"],["/assets/images/icons/logo-512.webp","fbc65521b0c2aea624a0fb26574b0225"],["/assets/images/insta1.39e8acfa1709b04b3dc6.png","5c16fd2166b86469710cde49e6eb8f0a"],["/assets/images/insta1.39e8acfa1709b04b3dc6.webp","42af3893846d29b848d08f8c70acd438"],["/assets/images/insta2.1f9f80a01c7d931edb05.png","9df919dda055095ff890cc890a3ddc31"],["/assets/images/insta2.1f9f80a01c7d931edb05.webp","80ebe5db6a1769a4071b79ed51d49bab"],["/assets/images/insta3.8359eb12ff5e3de5c00d.png","b9472b19af5b8a6ad338236492c6e4b5"],["/assets/images/insta3.8359eb12ff5e3de5c00d.webp","b693859b7425f3069d6f21fd2e587ede"],["/assets/images/insta4.e1e85bd76de456e017d6.png","6f24abc03b3a56b99fe31e606f11dcaf"],["/assets/images/insta4.e1e85bd76de456e017d6.webp","bf6390935d9ccc42f3bf5ef0f9d04001"],["/assets/images/insta5.80358f152f49325a95bd.png","1ccfea9e09e8025e10fcc671a2109687"],["/assets/images/insta5.80358f152f49325a95bd.webp","4ce67ac4a898a60baf11ea63b60e4f82"],["/assets/images/insta6.be709453b62ae0de3c9d.png","4e0c8224b1131fe49652e72ecb27ebef"],["/assets/images/insta6.be709453b62ae0de3c9d.webp","05ce226592204960123d60ac05793f11"],["/assets/images/insta7.05d4482585ffad6a253a.png","b0e80963cb89b47944df1c99d3be59c6"],["/assets/images/insta7.05d4482585ffad6a253a.webp","e0dfee2d6de7750c8a402812e5cb7aa1"],["/assets/images/insta8.ea6fb91ddeb0ccd4501c.png","22c595e0e4153b7bb4850c890913c872"],["/assets/images/insta8.ea6fb91ddeb0ccd4501c.webp","fdba7d1ec8212ffd77423f790566d1f5"],["/assets/images/product1.fa26eb2f70dff039f023.png","9d2f0873d59755d7b43b8dd1d54b9b1a"],["/assets/images/product1.fa26eb2f70dff039f023.webp","2e8e0679adad688b629304ca80a3bfbb"],["/assets/images/product10.fe68b548bfafb8f860f1.png","6b4df952bac5a5765cc3cefd5179147d"],["/assets/images/product10.fe68b548bfafb8f860f1.webp","54a6f94ff35c7a02cf8ebbddd25d21d7"],["/assets/images/product11.77f9997685b06db5a6ec.png","850807b77eb0f5834717fac39c873adb"],["/assets/images/product11.77f9997685b06db5a6ec.webp","3117dc0b5061ad0b7f4633e740f70e5f"],["/assets/images/product12.1bbfaa38dcfeb7566703.png","bca6816b5ad104b9e2b362801ac8ef9f"],["/assets/images/product12.1bbfaa38dcfeb7566703.webp","3f8c2971cc6b4db3959160cfa7353623"],["/assets/images/product2.401ee41288d9b80dbd03.png","a3b3c0a54d95d4ea3d62575eb2302d61"],["/assets/images/product2.401ee41288d9b80dbd03.webp","0497222ae93a9175663ad1cf6a5acd37"],["/assets/images/product3.60b6fb47de4862cc99c4.png","6fd60fef1f273e7e86e61c9173eeb46a"],["/assets/images/product3.60b6fb47de4862cc99c4.webp","335c8c82a4b0e9052842473a66880272"],["/assets/images/product4.b33283fc1cedee0762d5.png","60edc434b35896572176f22d63f839f2"],["/assets/images/product4.b33283fc1cedee0762d5.webp","acc5472b1acbef90ac1105e1a12a3aba"],["/assets/images/product5.28ae04489d14662c5bdc.png","85d7ac669f8f2c0db280be02d9547891"],["/assets/images/product5.28ae04489d14662c5bdc.webp","877c19e754a39379ba09c408250064be"],["/assets/images/product6.2b68d3f967dc411e0909.png","154ba7144de3932067474583f5ef1647"],["/assets/images/product6.2b68d3f967dc411e0909.webp","85dc90f5d7c0a94536fe1a98843a4130"],["/assets/images/product7.0186bc38dc59724f0ead.png","7dce475dd51314686751a2c6faac04c4"],["/assets/images/product7.0186bc38dc59724f0ead.webp","38b53dbea5b44138ba7a3ed4efcbbefe"],["/assets/images/product8.7c8924ab261abbdc5610.png","6d5126b30c7f1c43cbc6f989b0a47027"],["/assets/images/product8.7c8924ab261abbdc5610.webp","587bb35a0fe9b891ea49c1c63d585410"],["/assets/images/product9.d66de5f5c3e1876946b8.png","c0c6655e3078d6b39fcc7f9de367fd20"],["/assets/images/product9.d66de5f5c3e1876946b8.webp","0bca395f17e24c44e96beab44431e98f"],["/assets/landing-view.28cc763240968025b15f.css","38807a62d4140a64e3832357639b5525"],["/assets/landing-view.28cc763240968025b15f.css.br","3fccfe56f9017d567b7a20e3130b8f08"],["/assets/landing-view.28cc763240968025b15f.css.gz","9e4b1ee54cd528d9b7da5f7b81dbba7b"],["/assets/landing-view.28cc763240968025b15f.js","84ac361284ff116187ef816a2f8db1e5"],["/assets/landing-view.28cc763240968025b15f.js.br","6c051e7a26271a67369b6f3e3997c04c"],["/assets/landing-view.28cc763240968025b15f.js.gz","1e8cdec437ee5534662b15e0fee9091f"],["/assets/not-found-view.d076deaaa20a2fe4532c.css","d0ac8d4461cc5f6227c3ea083329ef21"],["/assets/not-found-view.d076deaaa20a2fe4532c.css.br","77e7f712ca07bdc0b5ad4cad59f21041"],["/assets/not-found-view.d076deaaa20a2fe4532c.css.gz","8d589d4dd3b46bc6f13e7d4b38b0d232"],["/assets/not-found-view.d076deaaa20a2fe4532c.js","309807a9fac79d3135b6d5b030ee6ba5"],["/assets/ui-kit.b90ddd88b269df8cecc7.css","67247a2e290f69ff08914a3d0e21e235"],["/assets/ui-kit.b90ddd88b269df8cecc7.css.br","1d57a3375d9d403c6f8fac11bae792b2"],["/assets/ui-kit.b90ddd88b269df8cecc7.css.gz","e6b95f1c1714d23f95c30021ba3e8915"],["/assets/ui-kit.b90ddd88b269df8cecc7.js","e027f15915f6586912218b732d4c8dd9"],["/assets/ui-kit.b90ddd88b269df8cecc7.js.br","d7759f50d6e15ebd030f77ed2dff5782"],["/assets/ui-kit.b90ddd88b269df8cecc7.js.gz","6cbb059e971e6bec4308a9625167d64d"],["/assets/vendors~app.730a9d3caac1d526a1c1.css","84563df0cbcfa7a70b3a2b7f194a6232"],["/assets/vendors~app.730a9d3caac1d526a1c1.css.br","56e3120ad6a0494d8bccce411b4d88d6"],["/assets/vendors~app.730a9d3caac1d526a1c1.css.gz","942eeba18aa4c652533cafcc99912b3c"],["/assets/vendors~app.730a9d3caac1d526a1c1.js","234fc69d7151bb64b0365fae9ef7b951"],["/assets/vendors~app.730a9d3caac1d526a1c1.js.br","49cc34d131f70687bc954d89c60a6e74"],["/assets/vendors~app.730a9d3caac1d526a1c1.js.gz","85bca947d51f89e7ad3cac2dd2e0b979"],["/assets/vendors~brand-view~catalog-view~ui-kit.06befd1360f8c9d528e3.js","d993140f315c76f1a24f52af6e82c0d4"],["/assets/vendors~brand-view~catalog-view~ui-kit.06befd1360f8c9d528e3.js.br","d0494ce613e9b28e9237f10bdc68123a"],["/assets/vendors~brand-view~catalog-view~ui-kit.06befd1360f8c9d528e3.js.gz","2a3c4d6cb7f2a8e493159b13d9ffeba1"],["/assets/vendors~ui-kit.2ca46c5f328267ad06a0.js","926b74ce9e14fb702023a635a58748a1"],["/assets/vendors~ui-kit.2ca46c5f328267ad06a0.js.br","7cbd60b16df25f917848d745bfea4833"],["/assets/vendors~ui-kit.2ca46c5f328267ad06a0.js.gz","d0c59b33d62eba68a3daf647aa037b28"]],cacheName="sw-precache-v3-vue-ibt-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,s){var n=new URL(e);return s&&n.pathname.match(s)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],s=new URL(t,self.location),n=createCacheKey(s,hashParamName,a,/./);return[s.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var s=new Request(a,{credentials:"same-origin"});return fetch(s).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).toolbox=e()}}(function(){return function e(t,a,s){function n(r,o){if(!a[r]){if(!t[r]){var i="function"==typeof require&&require;if(!o&&i)return i(r,!0);if(c)return c(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var f=a[r]={exports:{}};t[r][0].call(f.exports,function(e){var a=t[r][1][e];return n(a||e)},f,f.exports,e,t,a,s)}return a[r].exports}for(var c="function"==typeof require&&require,r=0;r<s.length;r++)n(s[r]);return n}({1:[function(e,t,a){function s(e,t){((t=t||{}).debug||i.debug)&&console.log("[sw-toolbox] "+e)}function n(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||i.cache.name,caches.open(t)}function c(e,t,a){var n=e.url,c=a.maxAgeSeconds,r=a.maxEntries,o=a.name,i=Date.now();return s("Updating LRU order for "+n+". Max entries is "+r+", max age is "+c),d.getDb(o).then(function(e){return d.setTimestampForUrl(e,n,i)}).then(function(e){return d.expireEntries(e,r,c,i)}).then(function(e){s("Successfully updated IDB.");var a=e.map(function(e){return t.delete(e)});return Promise.all(a).then(function(){s("Done with cache cleanup.")})}).catch(function(e){s(e)})}function r(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var o,i=e("./options"),d=e("./idb-cache-expiration");t.exports={debug:s,fetchAndCache:function(e,t){var a=(t=t||{}).successResponses||i.successResponses;return fetch(e.clone()).then(function(s){return"GET"===e.method&&a.test(s.status)&&n(t).then(function(a){a.put(e,s).then(function(){var s=t.cache||i.cache;(s.maxEntries||s.maxAgeSeconds)&&s.name&&function(e,t,a){var s=c.bind(null,e,t,a);o=o?o.then(s):s()}(e,a,s)})}),s.clone()})},openCache:n,renameCache:function(e,t,a){return s("Renaming cache: ["+e+"] to ["+t+"]",a),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var a=t[0],s=t[1];return a.keys().then(function(e){return Promise.all(e.map(function(e){return a.match(e).then(function(t){return s.put(e,t)})}))}).then(function(){return caches.delete(e)})})})},cache:function(e,t){return n(t).then(function(t){return t.add(e)})},uncache:function(e,t){return n(t).then(function(t){return t.delete(e)})},precache:function(e){e instanceof Promise||r(e),i.preCacheItems=i.preCacheItems.concat(e)},validatePrecacheInput:r,isResponseFresh:function(e,t,a){if(!e)return!1;if(t){var s=e.headers.get("date");if(s&&new Date(s).getTime()+1e3*t<a)return!1}return!0}}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,a){var s="sw-toolbox-",n=1,c="store",r="url",o="timestamp",i={};t.exports={getDb:function(e){return e in i||(i[e]=function(e){return new Promise(function(t,a){var i=indexedDB.open(s+e,n);i.onupgradeneeded=function(){i.result.createObjectStore(c,{keyPath:r}).createIndex(o,o,{unique:!1})},i.onsuccess=function(){t(i.result)},i.onerror=function(){a(i.error)}})}(e)),i[e]},setTimestampForUrl:function(e,t,a){return new Promise(function(s,n){var r=e.transaction(c,"readwrite");r.objectStore(c).put({url:t,timestamp:a}),r.oncomplete=function(){s(e)},r.onabort=function(){n(r.error)}})},expireEntries:function(e,t,a,s){return function(e,t,a){return t?new Promise(function(s,n){var i=1e3*t,d=[],f=e.transaction(c,"readwrite"),b=f.objectStore(c);b.index(o).openCursor().onsuccess=function(e){var t=e.target.result;if(t&&a-i>t.value[o]){var s=t.value[r];d.push(s),b.delete(s),t.continue()}},f.oncomplete=function(){s(d)},f.onabort=n}):Promise.resolve([])}(e,a,s).then(function(a){return function(e,t){return t?new Promise(function(a,s){var n=[],i=e.transaction(c,"readwrite"),d=i.objectStore(c),f=d.index(o),b=f.count();f.count().onsuccess=function(){var e=b.result;e>t&&(f.openCursor().onsuccess=function(a){var s=a.target.result;if(s){var c=s.value[r];n.push(c),d.delete(c),e-n.length>t&&s.continue()}})},i.oncomplete=function(){a(n)},i.onabort=s}):Promise.resolve([])}(e,t).then(function(e){return a.concat(e)})})}}},{}],3:[function(e,t,a){function s(e){return e.reduce(function(e,t){return e.concat(t)},[])}e("serviceworker-cache-polyfill");var n=e("./helpers"),c=e("./router"),r=e("./options");t.exports={fetchListener:function(e){var t=c.match(e.request);t?e.respondWith(t(e.request)):c.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(c.default(e.request))},activateListener:function(e){n.debug("activate event fired");var t=r.cache.name+"$$$inactive$$$";e.waitUntil(n.renameCache(t,r.cache.name))},installListener:function(e){var t=r.cache.name+"$$$inactive$$$";n.debug("install event fired"),n.debug("creating cache ["+t+"]"),e.waitUntil(n.openCache({cache:{name:t}}).then(function(e){return Promise.all(r.preCacheItems).then(s).then(n.validatePrecacheInput).then(function(t){return n.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,a){var s;s=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+s+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,a){var s=new URL("./",self.location).pathname,n=e("path-to-regexp"),c=function(e,t,a,c){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=s+t),this.keys=[],this.regexp=n(t,this.keys)),this.method=e,this.options=c,this.handler=a};c.prototype.makeHandler=function(e){var t;if(this.regexp){var a=this.regexp.exec(e);t={},this.keys.forEach(function(e,s){t[e.name]=a[s+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,a){var s=e("./route"),n=e("./helpers"),c=function(e,t){for(var a=e.entries(),s=a.next(),n=[];!s.done;){new RegExp(s.value[0]).test(t)&&n.push(s.value[1]),s=a.next()}return n},r=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){r.prototype[e]=function(t,a,s){return this.add(e,t,a,s)}}),r.prototype.add=function(e,t,a,c){var r;c=c||{},t instanceof RegExp?r=RegExp:r=(r=c.origin||self.location.origin)instanceof RegExp?r.source:function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}(r),e=e.toLowerCase();var o=new s(e,t,a,c);this.routes.has(r)||this.routes.set(r,new Map);var i=this.routes.get(r);i.has(e)||i.set(e,new Map);var d=i.get(e),f=o.regexp||o.fullUrlRegExp;d.has(f.source)&&n.debug('"'+t+'" resolves to same regex as existing route.'),d.set(f.source,o)},r.prototype.matchMethod=function(e,t){var a=new URL(t),s=a.origin,n=a.pathname;return this._match(e,c(this.routes,s),n)||this._match(e,[this.routes.get(RegExp)],t)},r.prototype._match=function(e,t,a){if(0===t.length)return null;for(var s=0;s<t.length;s++){var n=t[s],r=n&&n.get(e.toLowerCase());if(r){var o=c(r,a);if(o.length>0)return o[0].makeHandler(a)}}return null},r.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new r},{"./helpers":1,"./route":5}],7:[function(e,t,a){var s=e("../options"),n=e("../helpers");t.exports=function(e,t,a){return a=a||{},n.debug("Strategy: cache first ["+e.url+"]",a),n.openCache(a).then(function(t){return t.match(e).then(function(t){var c=a.cache||s.cache,r=Date.now();return n.isResponseFresh(t,c.maxAgeSeconds,r)?t:n.fetchAndCache(e,a)})})}},{"../helpers":1,"../options":4}],8:[function(e,t,a){var s=e("../options"),n=e("../helpers");t.exports=function(e,t,a){return a=a||{},n.debug("Strategy: cache only ["+e.url+"]",a),n.openCache(a).then(function(t){return t.match(e).then(function(e){var t=a.cache||s.cache,c=Date.now();if(n.isResponseFresh(e,t.maxAgeSeconds,c))return e})})}},{"../helpers":1,"../options":4}],9:[function(e,t,a){var s=e("../helpers"),n=e("./cacheOnly");t.exports=function(e,t,a){return s.debug("Strategy: fastest ["+e.url+"]",a),new Promise(function(c,r){var o=!1,i=[],d=function(e){i.push(e.toString()),o?r(new Error('Both cache and network failed: "'+i.join('", "')+'"')):o=!0},f=function(e){e instanceof Response?c(e):d("No result returned")};s.fetchAndCache(e.clone(),a).then(f,d),n(e,t,a).then(f,d)})}},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,a){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,a){var s=e("../options"),n=e("../helpers");t.exports=function(e,t,a){var c=(a=a||{}).successResponses||s.successResponses,r=a.networkTimeoutSeconds||s.networkTimeoutSeconds;return n.debug("Strategy: network first ["+e.url+"]",a),n.openCache(a).then(function(t){var o,i,d=[];if(r){var f=new Promise(function(c){o=setTimeout(function(){t.match(e).then(function(e){var t=a.cache||s.cache,r=Date.now(),o=t.maxAgeSeconds;n.isResponseFresh(e,o,r)&&c(e)})},1e3*r)});d.push(f)}var b=n.fetchAndCache(e,a).then(function(e){if(o&&clearTimeout(o),c.test(e.status))return e;throw n.debug("Response was an HTTP error: "+e.statusText,a),i=e,new Error("Bad response")}).catch(function(s){return n.debug("Network or response error, fallback to cache ["+e.url+"]",a),t.match(e).then(function(e){if(e)return e;if(i)return i;throw s})});return d.push(b),Promise.race(d)})}},{"../helpers":1,"../options":4}],12:[function(e,t,a){var s=e("../helpers");t.exports=function(e,t,a){return s.debug("Strategy: network only ["+e.url+"]",a),fetch(e)}},{"../helpers":1}],13:[function(e,t,a){var s=e("./options"),n=e("./router"),c=e("./helpers"),r=e("./strategies"),o=e("./listeners");c.debug("Service Worker Toolbox is loading"),self.addEventListener("install",o.installListener),self.addEventListener("activate",o.activateListener),self.addEventListener("fetch",o.fetchListener),t.exports={networkOnly:r.networkOnly,networkFirst:r.networkFirst,cacheOnly:r.cacheOnly,cacheFirst:r.cacheFirst,fastest:r.fastest,router:n,options:s,cache:c.cache,uncache:c.uncache,precache:c.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,a){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,a){function s(e,t){for(var a,s=[],n=0,c=0,r="",d=t&&t.delimiter||"/";null!=(a=l.exec(e));){var f=a[0],b=a[1],u=a.index;if(r+=e.slice(c,u),c=u+f.length,b)r+=b[1];else{var p=e[c],h=a[2],g=a[3],m=a[4],w=a[5],v=a[6],x=a[7];r&&(s.push(r),r="");var y=null!=h&&null!=p&&p!==h,k="+"===v||"*"===v,E="?"===v||"*"===v,R=a[2]||d,j=m||w;s.push({name:g||n++,prefix:h||"",delimiter:R,optional:E,repeat:k,partial:y,asterisk:!!x,pattern:j?i(j):x?".*":"[^"+o(R)+"]+?"})}}return c<e.length&&(r+=e.substr(c)),r&&s.push(r),s}function n(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function r(e){for(var t=new Array(e.length),a=0;a<e.length;a++)"object"==typeof e[a]&&(t[a]=new RegExp("^(?:"+e[a].pattern+")$"));return function(a,s){for(var r="",o=a||{},i=(s||{}).pretty?n:encodeURIComponent,d=0;d<e.length;d++){var f=e[d];if("string"!=typeof f){var b,u=o[f.name];if(null==u){if(f.optional){f.partial&&(r+=f.prefix);continue}throw new TypeError('Expected "'+f.name+'" to be defined')}if(p(u)){if(!f.repeat)throw new TypeError('Expected "'+f.name+'" to not repeat, but received `'+JSON.stringify(u)+"`");if(0===u.length){if(f.optional)continue;throw new TypeError('Expected "'+f.name+'" to not be empty')}for(var l=0;l<u.length;l++){if(b=i(u[l]),!t[d].test(b))throw new TypeError('Expected all "'+f.name+'" to match "'+f.pattern+'", but received `'+JSON.stringify(b)+"`");r+=(0===l?f.prefix:f.delimiter)+b}}else{if(b=f.asterisk?c(u):i(u),!t[d].test(b))throw new TypeError('Expected "'+f.name+'" to match "'+f.pattern+'", but received "'+b+'"');r+=f.prefix+b}}else r+=f}return r}}function o(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function i(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function d(e,t){return e.keys=t,e}function f(e){return e.sensitive?"":"i"}function b(e,t,a){p(t)||(a=t||a,t=[]);for(var s=(a=a||{}).strict,n=!1!==a.end,c="",r=0;r<e.length;r++){var i=e[r];if("string"==typeof i)c+=o(i);else{var b=o(i.prefix),u="(?:"+i.pattern+")";t.push(i),i.repeat&&(u+="(?:"+b+u+")*"),c+=u=i.optional?i.partial?b+"("+u+")?":"(?:"+b+"("+u+"))?":b+"("+u+")"}}var l=o(a.delimiter||"/"),h=c.slice(-l.length)===l;return s||(c=(h?c.slice(0,-l.length):c)+"(?:"+l+"(?=$))?"),c+=n?"$":s&&h?"":"(?="+l+"|$)",d(new RegExp("^"+c,f(a)),t)}function u(e,t,a){return p(t)||(a=t||a,t=[]),a=a||{},e instanceof RegExp?function(e,t){var a=e.source.match(/\((?!\?)/g);if(a)for(var s=0;s<a.length;s++)t.push({name:s,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return d(e,t)}(e,t):p(e)?function(e,t,a){for(var s=[],n=0;n<e.length;n++)s.push(u(e[n],t,a).source);return d(new RegExp("(?:"+s.join("|")+")",f(a)),t)}(e,t,a):function(e,t,a){return b(s(e,a),t,a)}(e,t,a)}var p=e("isarray");t.exports=u,t.exports.parse=s,t.exports.compile=function(e,t){return r(s(e,t))},t.exports.tokensToFunction=r,t.exports.tokensToRegExp=b;var l=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,a){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var a=t[1],s=parseInt(t[2]);e&&(!t||"Firefox"===a&&s>=46||"Chrome"===a&&s>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var a=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var a=new URL(e.url).protocol;if("http:"!==a&&"https:"!==a)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(s){if(s.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(s.map(function(t,s){return a.put(e[s],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)}),toolbox.router.get("/",toolbox.networkFirst,{}),toolbox.router.get(/\/(top|new|show|ask|job)/,toolbox.networkFirst,{}),toolbox.router.get("/item/:id",toolbox.networkFirst,{}),toolbox.router.get("/user/:id",toolbox.networkFirst,{});