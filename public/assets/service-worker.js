"use strict";var precacheConfig=[["/assets/app.d9fb0e40202b3acbd4fe.css","ea02d93f1b468a0d5d95050625afe9c3"],["/assets/app.d9fb0e40202b3acbd4fe.css.br","8c0d35cc9767aaf2de63dcce1b89774a"],["/assets/app.d9fb0e40202b3acbd4fe.css.gz","42fa2f40013708883ced6c156b4fc425"],["/assets/app.d9fb0e40202b3acbd4fe.js","48574eddc47e8000e0b5b46c0682cc7d"],["/assets/app.d9fb0e40202b3acbd4fe.js.br","b0140ada47a83a75e2c900253b87f263"],["/assets/app.d9fb0e40202b3acbd4fe.js.gz","1b977794a9e8b78c20aafa100b619506"],["/assets/brand-view.c38e2453e0ecedd9ed5b.css","c0d5e869da7437caa1ad20ccedce77dc"],["/assets/brand-view.c38e2453e0ecedd9ed5b.css.br","51b729a1b4efff419b389292496a2be2"],["/assets/brand-view.c38e2453e0ecedd9ed5b.css.gz","186adbe71d8ddb8b166c851cb9e332b2"],["/assets/brand-view.c38e2453e0ecedd9ed5b.js","eeaf54f402a34fbac9a9cdc051ed7b89"],["/assets/brand-view.c38e2453e0ecedd9ed5b.js.br","841ffd5356a3e8b04b9ce4022f955952"],["/assets/brand-view.c38e2453e0ecedd9ed5b.js.gz","694a159f655869d410663fd4ed8fba2f"],["/assets/brand-view~catalog-view.06f119c07c55442d6d65.css","dfce536be0a0eb02bb74e78cb7e502b7"],["/assets/brand-view~catalog-view.06f119c07c55442d6d65.css.br","2a2918a4f6f2d03b7c0f5f42bed0fc2e"],["/assets/brand-view~catalog-view.06f119c07c55442d6d65.css.gz","bd5c4de9b66b596d2a263217914ccc3e"],["/assets/brand-view~catalog-view.06f119c07c55442d6d65.js","1355000a29ec4b2b836723704480a4ad"],["/assets/brand-view~catalog-view.06f119c07c55442d6d65.js.br","d18d83cf29eae6c55abcea7e5f925b85"],["/assets/brand-view~catalog-view.06f119c07c55442d6d65.js.gz","2d461c68e144d9def3950a5fa1617a1f"],["/assets/brand-view~catalog-view~ui-kit.705e46d66adfe147b5ac.css","3af7694924f19ca6fd37299b85738266"],["/assets/brand-view~catalog-view~ui-kit.705e46d66adfe147b5ac.css.br","abef38b02382100858e50f6248c0db6c"],["/assets/brand-view~catalog-view~ui-kit.705e46d66adfe147b5ac.css.gz","74324783ba9db41123819d68f00ba7cd"],["/assets/brand-view~catalog-view~ui-kit.705e46d66adfe147b5ac.js","d6cd5cb2ab6f8d77bd48df41f40a80ba"],["/assets/brand-view~catalog-view~ui-kit.705e46d66adfe147b5ac.js.br","fbc23ade05b39f10cc67a0dab9fd97bd"],["/assets/brand-view~catalog-view~ui-kit.705e46d66adfe147b5ac.js.gz","df7fc71731dca6db9ad80ee7fa19933b"],["/assets/catalog-view.4662dfb7bc3464f27428.css","8b156e9614283b8ea3ddd9ff5fb138a5"],["/assets/catalog-view.4662dfb7bc3464f27428.css.br","1e11e061e6a96d03df1ab7aaaf538b45"],["/assets/catalog-view.4662dfb7bc3464f27428.css.gz","5c52d20000cb8dc2ee2c9a78549b3b2c"],["/assets/catalog-view.4662dfb7bc3464f27428.js","e5dd9bd2e5e973a08ab802f4d468cf60"],["/assets/catalog-view.4662dfb7bc3464f27428.js.br","fda45cf2a0ec51b34726deda2c9cf811"],["/assets/catalog-view.4662dfb7bc3464f27428.js.gz","a36543afd8eae560b0cd2100d229bce2"],["/assets/create-list-view.bf0eea0e352e4e3c4957.js","5baa78d8ae022b09ba6cb8c65fda2acf"],["/assets/create-list-view.bf0eea0e352e4e3c4957.js.br","95af36f21ef9c549fdcf59842f2e047d"],["/assets/create-list-view.bf0eea0e352e4e3c4957.js.gz","3c3c93012c8940555aedb7e4466c351e"],["/assets/favicon.ico","20686540fcbdf63d7874c9a748db6a82"],["/assets/fonts/FuturaPT-Bold.6dddddc0b4726becc525.ttf","6dddddc0b4726becc525fc7794cfcf6b"],["/assets/fonts/FuturaPT-Bold.7c7bef4cdb04fba6a9ec.woff2","7c7bef4cdb04fba6a9ecca71046ae5fd"],["/assets/fonts/FuturaPT-Bold.9d2b3b49fdbaf67b82b3.woff","9d2b3b49fdbaf67b82b3bdfb098479a7"],["/assets/fonts/FuturaPT-Book.0d987efe9bc0b858a7bc.ttf","0d987efe9bc0b858a7bc0367c2d5922c"],["/assets/fonts/FuturaPT-Book.8cd2ddc4f8da5b39b573.woff2","8cd2ddc4f8da5b39b5736f3d5025a640"],["/assets/fonts/FuturaPT-Book.c431096955795da262fc.woff","c431096955795da262fc32297d7bfa8f"],["/assets/fonts/FuturaPT-Light.0588623b3256c750187b.woff2","0588623b3256c750187b94b426cc8afc"],["/assets/fonts/FuturaPT-Light.92aa0d7878fe4d8d55da.woff","92aa0d7878fe4d8d55dab98aae0796e5"],["/assets/fonts/FuturaPT-Light.c7f1106be884b5027c6d.ttf","c7f1106be884b5027c6d93deec8ca00a"],["/assets/fonts/FuturaPT-Medium.540c81bc4ca37ae1efe4.ttf","540c81bc4ca37ae1efe4b60de51e753f"],["/assets/fonts/FuturaPT-Medium.5fbd70c5077087b45add.woff2","5fbd70c5077087b45add01329ea35620"],["/assets/fonts/FuturaPT-Medium.995c64e152e8dc077222.woff","995c64e152e8dc077222766889194951"],["/assets/images/banner1.c667d0f7bf2fdfe5c36e.png","f5d9b8260a558cdb38ad510d278f947c"],["/assets/images/banner1.c667d0f7bf2fdfe5c36e.webp","46f3c69b0049e86f8b2ae5d601ff9366"],["/assets/images/banner2.651ed3c742ab96cb5792.png","386be5249f09fd6502d68d62ce6fdeb9"],["/assets/images/banner2.651ed3c742ab96cb5792.webp","346d55b514f23b7a3159e3b48b9003ad"],["/assets/images/banner3.824169d7f6ef0645a796.png","d57431c652eaa768c5f0eda20b93228b"],["/assets/images/banner3.824169d7f6ef0645a796.webp","ce862e4476421c3bcd00c23b852d285b"],["/assets/images/banner4.7f695634c2711200d296.png","6021d1aebc5eb58d04377be37e94980b"],["/assets/images/banner4.7f695634c2711200d296.webp","131446303bc3c204296106416fcf34d8"],["/assets/images/banner5.94adb7f9a69ce7f53ee8.png","b544a98786c4074bee2c98e04d2f1f07"],["/assets/images/banner5.94adb7f9a69ce7f53ee8.webp","4ee0565fc25d9af4dcc2e3c7615beac1"],["/assets/images/icons/logo-120.png","fb85cfaf029c5fd8dc2068e16a316bf7"],["/assets/images/icons/logo-120.webp","f4ce313325b435ca06c4bb5450446a97"],["/assets/images/icons/logo-144.png","6aab40f57eaad22a4b8fe7f85e353577"],["/assets/images/icons/logo-144.webp","be46f9ebb8423ae07c670f562e34283b"],["/assets/images/icons/logo-152.png","00d75f29b262c03399c86cc04c5278d1"],["/assets/images/icons/logo-152.webp","8a4ea9b5d789aa8e73efd76d6c037e21"],["/assets/images/icons/logo-192.png","94acfd467d8d98d8efe77d8ebe04f14c"],["/assets/images/icons/logo-192.webp","7db62b0326546c21ad02d4feb8fc8887"],["/assets/images/icons/logo-256.png","a97de8ec35de770a1ca15c291a261493"],["/assets/images/icons/logo-256.webp","40728b31c41b6117ba9ef2445af4cde3"],["/assets/images/icons/logo-384.png","35d949a905d92e9d97d38f9dee02b4fa"],["/assets/images/icons/logo-384.webp","db798fce06b2d63d831d255a6bdc6e4c"],["/assets/images/icons/logo-48.png","05dcd7e143ee1ced705145d820001e09"],["/assets/images/icons/logo-48.webp","f217c0ed350e12ce888c2547b493109c"],["/assets/images/icons/logo-512.png","6d111bac28fe8ddb522d64ef0c259c80"],["/assets/images/icons/logo-512.webp","fbc65521b0c2aea624a0fb26574b0225"],["/assets/images/insta1.39e8acfa1709b04b3dc6.png","5c16fd2166b86469710cde49e6eb8f0a"],["/assets/images/insta1.39e8acfa1709b04b3dc6.webp","42af3893846d29b848d08f8c70acd438"],["/assets/images/insta2.8243cd744f1218ea8b32.png","104f28ee95b59ef9789979cdde1795e8"],["/assets/images/insta2.8243cd744f1218ea8b32.webp","895c4e274af575241a26c36dc6cbe07d"],["/assets/images/insta3.8359eb12ff5e3de5c00d.png","b9472b19af5b8a6ad338236492c6e4b5"],["/assets/images/insta3.8359eb12ff5e3de5c00d.webp","b693859b7425f3069d6f21fd2e587ede"],["/assets/images/insta4.97142e47a052194d00fc.png","7c04d2afc7c1eef8cb2591a68d6d29bc"],["/assets/images/insta4.97142e47a052194d00fc.webp","ca6b6acf961745f483d6503f09ffa1da"],["/assets/images/insta5.80358f152f49325a95bd.png","1ccfea9e09e8025e10fcc671a2109687"],["/assets/images/insta5.80358f152f49325a95bd.webp","4ce67ac4a898a60baf11ea63b60e4f82"],["/assets/images/insta6.be709453b62ae0de3c9d.png","4e0c8224b1131fe49652e72ecb27ebef"],["/assets/images/insta6.be709453b62ae0de3c9d.webp","05ce226592204960123d60ac05793f11"],["/assets/images/insta7.05d4482585ffad6a253a.png","b0e80963cb89b47944df1c99d3be59c6"],["/assets/images/insta7.05d4482585ffad6a253a.webp","e0dfee2d6de7750c8a402812e5cb7aa1"],["/assets/images/insta8.aa48ea93388142bfbc56.png","a5d68c8e4ebead0414186184464ea147"],["/assets/images/insta8.aa48ea93388142bfbc56.webp","b4bc61bd6ba77397d8b459dbb6672e01"],["/assets/images/product1.fa26eb2f70dff039f023.png","9d2f0873d59755d7b43b8dd1d54b9b1a"],["/assets/images/product1.fa26eb2f70dff039f023.webp","2e8e0679adad688b629304ca80a3bfbb"],["/assets/images/product10.fe68b548bfafb8f860f1.png","6b4df952bac5a5765cc3cefd5179147d"],["/assets/images/product10.fe68b548bfafb8f860f1.webp","54a6f94ff35c7a02cf8ebbddd25d21d7"],["/assets/images/product11.77f9997685b06db5a6ec.png","850807b77eb0f5834717fac39c873adb"],["/assets/images/product11.77f9997685b06db5a6ec.webp","3117dc0b5061ad0b7f4633e740f70e5f"],["/assets/images/product12.1bbfaa38dcfeb7566703.png","bca6816b5ad104b9e2b362801ac8ef9f"],["/assets/images/product12.1bbfaa38dcfeb7566703.webp","3f8c2971cc6b4db3959160cfa7353623"],["/assets/images/product2.401ee41288d9b80dbd03.png","a3b3c0a54d95d4ea3d62575eb2302d61"],["/assets/images/product2.401ee41288d9b80dbd03.webp","0497222ae93a9175663ad1cf6a5acd37"],["/assets/images/product3.60b6fb47de4862cc99c4.png","6fd60fef1f273e7e86e61c9173eeb46a"],["/assets/images/product3.60b6fb47de4862cc99c4.webp","335c8c82a4b0e9052842473a66880272"],["/assets/images/product4.b33283fc1cedee0762d5.png","60edc434b35896572176f22d63f839f2"],["/assets/images/product4.b33283fc1cedee0762d5.webp","acc5472b1acbef90ac1105e1a12a3aba"],["/assets/images/product5.28ae04489d14662c5bdc.png","85d7ac669f8f2c0db280be02d9547891"],["/assets/images/product5.28ae04489d14662c5bdc.webp","877c19e754a39379ba09c408250064be"],["/assets/images/product6.2b68d3f967dc411e0909.png","154ba7144de3932067474583f5ef1647"],["/assets/images/product6.2b68d3f967dc411e0909.webp","85dc90f5d7c0a94536fe1a98843a4130"],["/assets/images/product7.0186bc38dc59724f0ead.png","7dce475dd51314686751a2c6faac04c4"],["/assets/images/product7.0186bc38dc59724f0ead.webp","38b53dbea5b44138ba7a3ed4efcbbefe"],["/assets/images/product8.7c8924ab261abbdc5610.png","6d5126b30c7f1c43cbc6f989b0a47027"],["/assets/images/product8.7c8924ab261abbdc5610.webp","587bb35a0fe9b891ea49c1c63d585410"],["/assets/images/product9.d66de5f5c3e1876946b8.png","c0c6655e3078d6b39fcc7f9de367fd20"],["/assets/images/product9.d66de5f5c3e1876946b8.webp","0bca395f17e24c44e96beab44431e98f"],["/assets/item-detail.4cab0389da8bc8553e89.css","56aefccd3f7af17bda0daa33ab59b4fc"],["/assets/item-detail.4cab0389da8bc8553e89.css.br","f711f1e9377d5bfe69c4ea43de2b43a8"],["/assets/item-detail.4cab0389da8bc8553e89.css.gz","a6147b9f5f1bd7eb58be4c1b6027c1d6"],["/assets/item-detail.4cab0389da8bc8553e89.js","c9b61e68c811520c0f7ec7d1b59ac51e"],["/assets/item-detail.4cab0389da8bc8553e89.js.br","48a41f50816328593cb9a697fdb7804c"],["/assets/item-detail.4cab0389da8bc8553e89.js.gz","b6c46ab08775d70ea63ff4bf2cbb48b4"],["/assets/item-list.01c78dd66435248eb346.css","c9d0cab3a428484a6f8aac07d77c6473"],["/assets/item-list.01c78dd66435248eb346.css.br","c79e9b276e8ee8e8322f40a4aed75422"],["/assets/item-list.01c78dd66435248eb346.css.gz","8944177eca3c97013141fa7dfbef5f0c"],["/assets/item-list.01c78dd66435248eb346.js","69d4046f993b7d2fe59cabf20c04f69c"],["/assets/item-list.01c78dd66435248eb346.js.br","496fc2f967b5b26c970db745867eaf9d"],["/assets/item-list.01c78dd66435248eb346.js.gz","721e30bc4df20c58adbc763d44543d9c"],["/assets/landing-view.bc1c5e93b8204bf341f1.css","fecff537b8a591cd872a329c0c2fecb2"],["/assets/landing-view.bc1c5e93b8204bf341f1.css.br","18546ab494e61f93e351b449c1e58337"],["/assets/landing-view.bc1c5e93b8204bf341f1.css.gz","ac5261ec661a1188d3c9e5fb39c7f470"],["/assets/landing-view.bc1c5e93b8204bf341f1.js","3ff3c85d1372908c3cc3ce9341ca393e"],["/assets/landing-view.bc1c5e93b8204bf341f1.js.br","538db87d17a3254e5f3fa562267fb4ed"],["/assets/landing-view.bc1c5e93b8204bf341f1.js.gz","39ecb8d78060031c43a30243f02cbb0e"],["/assets/not-found-view.e3534422fe7447c37457.css","d0ac8d4461cc5f6227c3ea083329ef21"],["/assets/not-found-view.e3534422fe7447c37457.css.br","77e7f712ca07bdc0b5ad4cad59f21041"],["/assets/not-found-view.e3534422fe7447c37457.css.gz","8d589d4dd3b46bc6f13e7d4b38b0d232"],["/assets/not-found-view.e3534422fe7447c37457.js","f6557175442cfaa2112c3c3d87f3fd89"],["/assets/ui-kit.6fd631ffb8689614b304.css","ad85429722f203727c3eaa4dec2e8004"],["/assets/ui-kit.6fd631ffb8689614b304.css.br","8b0e1d1278740e4de34fd9eb5367d6d1"],["/assets/ui-kit.6fd631ffb8689614b304.css.gz","69f85d09fe3cb9a72ffee70acba7934f"],["/assets/ui-kit.6fd631ffb8689614b304.js","8be432f99fcbd3eacf18059697ba28dd"],["/assets/ui-kit.6fd631ffb8689614b304.js.br","c56599f2a4d6a5d5af63c5afb104fec4"],["/assets/ui-kit.6fd631ffb8689614b304.js.gz","a1eacab5bbbec54a4376535f31e3c5e3"],["/assets/user-detail.3103b5785a8a771150ef.css","39bf11b9bc02a6903807c751962a3221"],["/assets/user-detail.3103b5785a8a771150ef.js","f569614fa97965fc36773ace8e44816c"],["/assets/user-detail.3103b5785a8a771150ef.js.br","0f60df16f867c48640ddb9eef100164e"],["/assets/user-detail.3103b5785a8a771150ef.js.gz","1286c6fe274660ada0d3f53a08bc120a"],["/assets/vendors~app.03958ceb6b1e73b4cc6c.css","84563df0cbcfa7a70b3a2b7f194a6232"],["/assets/vendors~app.03958ceb6b1e73b4cc6c.css.br","56e3120ad6a0494d8bccce411b4d88d6"],["/assets/vendors~app.03958ceb6b1e73b4cc6c.css.gz","942eeba18aa4c652533cafcc99912b3c"],["/assets/vendors~app.03958ceb6b1e73b4cc6c.js","328711855e1bd60c85888c8ecc0f0f1a"],["/assets/vendors~app.03958ceb6b1e73b4cc6c.js.br","ee92ee552e49c68837c48535f40b46ab"],["/assets/vendors~app.03958ceb6b1e73b4cc6c.js.gz","31d36ecdaab6bc581a74da5cbfb158b6"],["/assets/vendors~brand-view~catalog-view~ui-kit.d260287e4d902f1892d3.js","b2b126d4aa0c607ccf1c57b1b80c589a"],["/assets/vendors~brand-view~catalog-view~ui-kit.d260287e4d902f1892d3.js.br","dab695d7b0bf72f7c1e3fba5cf4eb246"],["/assets/vendors~brand-view~catalog-view~ui-kit.d260287e4d902f1892d3.js.gz","aff7b62d0aac7304686c74f36d46ba8a"],["/assets/vendors~ui-kit.d88a94e5861b6b1ceef8.js","273d81c0aff757afb891bb4c8fd64080"],["/assets/vendors~ui-kit.d88a94e5861b6b1ceef8.js.br","88547e87f7ea6863607e35be4edb9478"],["/assets/vendors~ui-kit.d88a94e5861b6b1ceef8.js.gz","dd365304311a674ee830fbcb4e6a2fc8"]],cacheName="sw-precache-v3-vue-ibt-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,s){var c=new URL(e);return s&&c.pathname.match(s)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],s=new URL(t,self.location),c=createCacheKey(s,hashParamName,a,/./);return[s.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var s=new Request(a,{credentials:"same-origin"});return fetch(s).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).toolbox=e()}}(function(){return function e(t,a,s){function c(r,o){if(!a[r]){if(!t[r]){var f="function"==typeof require&&require;if(!o&&f)return f(r,!0);if(n)return n(r,!0);var i=new Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}var d=a[r]={exports:{}};t[r][0].call(d.exports,function(e){var a=t[r][1][e];return c(a||e)},d,d.exports,e,t,a,s)}return a[r].exports}for(var n="function"==typeof require&&require,r=0;r<s.length;r++)c(s[r]);return c}({1:[function(e,t,a){function s(e,t){((t=t||{}).debug||f.debug)&&console.log("[sw-toolbox] "+e)}function c(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||f.cache.name,caches.open(t)}function n(e,t,a){var c=e.url,n=a.maxAgeSeconds,r=a.maxEntries,o=a.name,f=Date.now();return s("Updating LRU order for "+c+". Max entries is "+r+", max age is "+n),i.getDb(o).then(function(e){return i.setTimestampForUrl(e,c,f)}).then(function(e){return i.expireEntries(e,r,n,f)}).then(function(e){s("Successfully updated IDB.");var a=e.map(function(e){return t.delete(e)});return Promise.all(a).then(function(){s("Done with cache cleanup.")})}).catch(function(e){s(e)})}function r(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var o,f=e("./options"),i=e("./idb-cache-expiration");t.exports={debug:s,fetchAndCache:function(e,t){var a=(t=t||{}).successResponses||f.successResponses;return fetch(e.clone()).then(function(s){return"GET"===e.method&&a.test(s.status)&&c(t).then(function(a){a.put(e,s).then(function(){var s=t.cache||f.cache;(s.maxEntries||s.maxAgeSeconds)&&s.name&&function(e,t,a){var s=n.bind(null,e,t,a);o=o?o.then(s):s()}(e,a,s)})}),s.clone()})},openCache:c,renameCache:function(e,t,a){return s("Renaming cache: ["+e+"] to ["+t+"]",a),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var a=t[0],s=t[1];return a.keys().then(function(e){return Promise.all(e.map(function(e){return a.match(e).then(function(t){return s.put(e,t)})}))}).then(function(){return caches.delete(e)})})})},cache:function(e,t){return c(t).then(function(t){return t.add(e)})},uncache:function(e,t){return c(t).then(function(t){return t.delete(e)})},precache:function(e){e instanceof Promise||r(e),f.preCacheItems=f.preCacheItems.concat(e)},validatePrecacheInput:r,isResponseFresh:function(e,t,a){if(!e)return!1;if(t){var s=e.headers.get("date");if(s&&new Date(s).getTime()+1e3*t<a)return!1}return!0}}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,a){var s="sw-toolbox-",c=1,n="store",r="url",o="timestamp",f={};t.exports={getDb:function(e){return e in f||(f[e]=function(e){return new Promise(function(t,a){var f=indexedDB.open(s+e,c);f.onupgradeneeded=function(){f.result.createObjectStore(n,{keyPath:r}).createIndex(o,o,{unique:!1})},f.onsuccess=function(){t(f.result)},f.onerror=function(){a(f.error)}})}(e)),f[e]},setTimestampForUrl:function(e,t,a){return new Promise(function(s,c){var r=e.transaction(n,"readwrite");r.objectStore(n).put({url:t,timestamp:a}),r.oncomplete=function(){s(e)},r.onabort=function(){c(r.error)}})},expireEntries:function(e,t,a,s){return function(e,t,a){return t?new Promise(function(s,c){var f=1e3*t,i=[],d=e.transaction(n,"readwrite"),b=d.objectStore(n);b.index(o).openCursor().onsuccess=function(e){var t=e.target.result;if(t&&a-f>t.value[o]){var s=t.value[r];i.push(s),b.delete(s),t.continue()}},d.oncomplete=function(){s(i)},d.onabort=c}):Promise.resolve([])}(e,a,s).then(function(a){return function(e,t){return t?new Promise(function(a,s){var c=[],f=e.transaction(n,"readwrite"),i=f.objectStore(n),d=i.index(o),b=d.count();d.count().onsuccess=function(){var e=b.result;e>t&&(d.openCursor().onsuccess=function(a){var s=a.target.result;if(s){var n=s.value[r];c.push(n),i.delete(n),e-c.length>t&&s.continue()}})},f.oncomplete=function(){a(c)},f.onabort=s}):Promise.resolve([])}(e,t).then(function(e){return a.concat(e)})})}}},{}],3:[function(e,t,a){function s(e){return e.reduce(function(e,t){return e.concat(t)},[])}e("serviceworker-cache-polyfill");var c=e("./helpers"),n=e("./router"),r=e("./options");t.exports={fetchListener:function(e){var t=n.match(e.request);t?e.respondWith(t(e.request)):n.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(n.default(e.request))},activateListener:function(e){c.debug("activate event fired");var t=r.cache.name+"$$$inactive$$$";e.waitUntil(c.renameCache(t,r.cache.name))},installListener:function(e){var t=r.cache.name+"$$$inactive$$$";c.debug("install event fired"),c.debug("creating cache ["+t+"]"),e.waitUntil(c.openCache({cache:{name:t}}).then(function(e){return Promise.all(r.preCacheItems).then(s).then(c.validatePrecacheInput).then(function(t){return c.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,a){var s;s=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+s+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,a){var s=new URL("./",self.location).pathname,c=e("path-to-regexp"),n=function(e,t,a,n){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=s+t),this.keys=[],this.regexp=c(t,this.keys)),this.method=e,this.options=n,this.handler=a};n.prototype.makeHandler=function(e){var t;if(this.regexp){var a=this.regexp.exec(e);t={},this.keys.forEach(function(e,s){t[e.name]=a[s+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=n},{"path-to-regexp":15}],6:[function(e,t,a){var s=e("./route"),c=e("./helpers"),n=function(e,t){for(var a=e.entries(),s=a.next(),c=[];!s.done;){new RegExp(s.value[0]).test(t)&&c.push(s.value[1]),s=a.next()}return c},r=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){r.prototype[e]=function(t,a,s){return this.add(e,t,a,s)}}),r.prototype.add=function(e,t,a,n){var r;n=n||{},t instanceof RegExp?r=RegExp:r=(r=n.origin||self.location.origin)instanceof RegExp?r.source:function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}(r),e=e.toLowerCase();var o=new s(e,t,a,n);this.routes.has(r)||this.routes.set(r,new Map);var f=this.routes.get(r);f.has(e)||f.set(e,new Map);var i=f.get(e),d=o.regexp||o.fullUrlRegExp;i.has(d.source)&&c.debug('"'+t+'" resolves to same regex as existing route.'),i.set(d.source,o)},r.prototype.matchMethod=function(e,t){var a=new URL(t),s=a.origin,c=a.pathname;return this._match(e,n(this.routes,s),c)||this._match(e,[this.routes.get(RegExp)],t)},r.prototype._match=function(e,t,a){if(0===t.length)return null;for(var s=0;s<t.length;s++){var c=t[s],r=c&&c.get(e.toLowerCase());if(r){var o=n(r,a);if(o.length>0)return o[0].makeHandler(a)}}return null},r.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new r},{"./helpers":1,"./route":5}],7:[function(e,t,a){var s=e("../options"),c=e("../helpers");t.exports=function(e,t,a){return a=a||{},c.debug("Strategy: cache first ["+e.url+"]",a),c.openCache(a).then(function(t){return t.match(e).then(function(t){var n=a.cache||s.cache,r=Date.now();return c.isResponseFresh(t,n.maxAgeSeconds,r)?t:c.fetchAndCache(e,a)})})}},{"../helpers":1,"../options":4}],8:[function(e,t,a){var s=e("../options"),c=e("../helpers");t.exports=function(e,t,a){return a=a||{},c.debug("Strategy: cache only ["+e.url+"]",a),c.openCache(a).then(function(t){return t.match(e).then(function(e){var t=a.cache||s.cache,n=Date.now();if(c.isResponseFresh(e,t.maxAgeSeconds,n))return e})})}},{"../helpers":1,"../options":4}],9:[function(e,t,a){var s=e("../helpers"),c=e("./cacheOnly");t.exports=function(e,t,a){return s.debug("Strategy: fastest ["+e.url+"]",a),new Promise(function(n,r){var o=!1,f=[],i=function(e){f.push(e.toString()),o?r(new Error('Both cache and network failed: "'+f.join('", "')+'"')):o=!0},d=function(e){e instanceof Response?n(e):i("No result returned")};s.fetchAndCache(e.clone(),a).then(d,i),c(e,t,a).then(d,i)})}},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,a){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,a){var s=e("../options"),c=e("../helpers");t.exports=function(e,t,a){var n=(a=a||{}).successResponses||s.successResponses,r=a.networkTimeoutSeconds||s.networkTimeoutSeconds;return c.debug("Strategy: network first ["+e.url+"]",a),c.openCache(a).then(function(t){var o,f,i=[];if(r){var d=new Promise(function(n){o=setTimeout(function(){t.match(e).then(function(e){var t=a.cache||s.cache,r=Date.now(),o=t.maxAgeSeconds;c.isResponseFresh(e,o,r)&&n(e)})},1e3*r)});i.push(d)}var b=c.fetchAndCache(e,a).then(function(e){if(o&&clearTimeout(o),n.test(e.status))return e;throw c.debug("Response was an HTTP error: "+e.statusText,a),f=e,new Error("Bad response")}).catch(function(s){return c.debug("Network or response error, fallback to cache ["+e.url+"]",a),t.match(e).then(function(e){if(e)return e;if(f)return f;throw s})});return i.push(b),Promise.race(i)})}},{"../helpers":1,"../options":4}],12:[function(e,t,a){var s=e("../helpers");t.exports=function(e,t,a){return s.debug("Strategy: network only ["+e.url+"]",a),fetch(e)}},{"../helpers":1}],13:[function(e,t,a){var s=e("./options"),c=e("./router"),n=e("./helpers"),r=e("./strategies"),o=e("./listeners");n.debug("Service Worker Toolbox is loading"),self.addEventListener("install",o.installListener),self.addEventListener("activate",o.activateListener),self.addEventListener("fetch",o.fetchListener),t.exports={networkOnly:r.networkOnly,networkFirst:r.networkFirst,cacheOnly:r.cacheOnly,cacheFirst:r.cacheFirst,fastest:r.fastest,router:c,options:s,cache:n.cache,uncache:n.uncache,precache:n.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,a){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,a){function s(e,t){for(var a,s=[],c=0,n=0,r="",i=t&&t.delimiter||"/";null!=(a=l.exec(e));){var d=a[0],b=a[1],u=a.index;if(r+=e.slice(n,u),n=u+d.length,b)r+=b[1];else{var p=e[n],h=a[2],g=a[3],m=a[4],w=a[5],v=a[6],x=a[7];r&&(s.push(r),r="");var y=null!=h&&null!=p&&p!==h,k="+"===v||"*"===v,j="?"===v||"*"===v,E=a[2]||i,R=m||w;s.push({name:g||c++,prefix:h||"",delimiter:E,optional:j,repeat:k,partial:y,asterisk:!!x,pattern:R?f(R):x?".*":"[^"+o(E)+"]+?"})}}return n<e.length&&(r+=e.substr(n)),r&&s.push(r),s}function c(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function n(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function r(e){for(var t=new Array(e.length),a=0;a<e.length;a++)"object"==typeof e[a]&&(t[a]=new RegExp("^(?:"+e[a].pattern+")$"));return function(a,s){for(var r="",o=a||{},f=(s||{}).pretty?c:encodeURIComponent,i=0;i<e.length;i++){var d=e[i];if("string"!=typeof d){var b,u=o[d.name];if(null==u){if(d.optional){d.partial&&(r+=d.prefix);continue}throw new TypeError('Expected "'+d.name+'" to be defined')}if(p(u)){if(!d.repeat)throw new TypeError('Expected "'+d.name+'" to not repeat, but received `'+JSON.stringify(u)+"`");if(0===u.length){if(d.optional)continue;throw new TypeError('Expected "'+d.name+'" to not be empty')}for(var l=0;l<u.length;l++){if(b=f(u[l]),!t[i].test(b))throw new TypeError('Expected all "'+d.name+'" to match "'+d.pattern+'", but received `'+JSON.stringify(b)+"`");r+=(0===l?d.prefix:d.delimiter)+b}}else{if(b=d.asterisk?n(u):f(u),!t[i].test(b))throw new TypeError('Expected "'+d.name+'" to match "'+d.pattern+'", but received "'+b+'"');r+=d.prefix+b}}else r+=d}return r}}function o(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function f(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function i(e,t){return e.keys=t,e}function d(e){return e.sensitive?"":"i"}function b(e,t,a){p(t)||(a=t||a,t=[]);for(var s=(a=a||{}).strict,c=!1!==a.end,n="",r=0;r<e.length;r++){var f=e[r];if("string"==typeof f)n+=o(f);else{var b=o(f.prefix),u="(?:"+f.pattern+")";t.push(f),f.repeat&&(u+="(?:"+b+u+")*"),n+=u=f.optional?f.partial?b+"("+u+")?":"(?:"+b+"("+u+"))?":b+"("+u+")"}}var l=o(a.delimiter||"/"),h=n.slice(-l.length)===l;return s||(n=(h?n.slice(0,-l.length):n)+"(?:"+l+"(?=$))?"),n+=c?"$":s&&h?"":"(?="+l+"|$)",i(new RegExp("^"+n,d(a)),t)}function u(e,t,a){return p(t)||(a=t||a,t=[]),a=a||{},e instanceof RegExp?function(e,t){var a=e.source.match(/\((?!\?)/g);if(a)for(var s=0;s<a.length;s++)t.push({name:s,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return i(e,t)}(e,t):p(e)?function(e,t,a){for(var s=[],c=0;c<e.length;c++)s.push(u(e[c],t,a).source);return i(new RegExp("(?:"+s.join("|")+")",d(a)),t)}(e,t,a):function(e,t,a){return b(s(e,a),t,a)}(e,t,a)}var p=e("isarray");t.exports=u,t.exports.parse=s,t.exports.compile=function(e,t){return r(s(e,t))},t.exports.tokensToFunction=r,t.exports.tokensToRegExp=b;var l=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,a){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var a=t[1],s=parseInt(t[2]);e&&(!t||"Firefox"===a&&s>=46||"Chrome"===a&&s>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var a=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var a=new URL(e.url).protocol;if("http:"!==a&&"https:"!==a)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(s){if(s.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(s.map(function(t,s){return a.put(e[s],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)}),toolbox.router.get("/",toolbox.networkFirst,{}),toolbox.router.get(/\/(top|new|show|ask|job)/,toolbox.networkFirst,{}),toolbox.router.get("/item/:id",toolbox.networkFirst,{}),toolbox.router.get("/user/:id",toolbox.networkFirst,{});