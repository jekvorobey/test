(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"0PnJ":function(e,t,n){},esnV:function(e,t,n){"use strict";n.r(t);var r,o=n("BZIu"),c=n("Nlzp");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(n,!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=(s(r={},"SET_INSTAGRAM",(function(e,t){e.instagramItems=t})),s(r,"SET_BRANDS",(function(e,t){e.brands=t})),s(r,"SET_MIDDLE_BANNERS",(function(e,t){e.middleBanners=t})),s(r,"SET_BANNERS",(function(e,t){e.banners=t})),s(r,"SET_NEW_PRODUCTS",(function(e,t){e.newProducts=t})),s(r,"SET_BESTSELLER_PRODUCTS",(function(e,t){e.bestsellerProducts=t})),s(r,"SET_FEATURED_PRODUCTS",(function(e,t){e.featuredProducts=t})),s(r,"SET_CATEGORIES",(function(e,t){e.categories=t})),s(r,"SET_LOAD",(function(e,t){e.load=t,e.renderData=[{id:1,component:"banners-section",data:{banners:e.banners}},{id:2,component:"categories-section",data:{categories:e.categories}},{id:3,component:"products-section",data:a({titleText:"Новинки"},e.newProducts)},{id:4,component:"products-section",data:a({titleText:"Бестселлеры",inverse:!0},e.bestsellerProducts)},{id:7,component:"brands-section",data:{titleText:"Популярные бренды",items:e.brands,restCount:10,btnText:"Показать"}},{id:8,component:"instagram-section",data:{titleText:"Instabeauty",items:e.instagramItems,btnText:"Подписаться на нас"}}]})),r),E={name:"landing",namespaced:!0,state:{renderData:[],load:!1,banners:[],middleBanners:[],brands:[],categories:[],newProducts:{banner:{},items:[]},bestsellerProducts:{banner:{},items:[]},featuredProducts:{banner:{},items:[]},instagramItems:[]},actions:{FETCH_INSTAGRAM:function(e){var t=e.commit;return Object(c.e)().then((function(e){return t("SET_INSTAGRAM",e)})).catch((function(e){return o.$logger.error("FETCH_INSTAGRAM error: ".concat(e)),[]}))},FETCH_BRANDS:function(e){var t=e.commit;return Object(c.b)().then((function(e){return t("SET_BRANDS",e)})).catch((function(e){return o.$logger.error("FETCH_BRANDS error: ".concat(e)),[]}))},FETCH_BANNERS:function(e){var t=e.commit;return Object(c.a)().then((function(e){t("SET_BANNERS",[e[7],e[8],e[9]]),t("SET_MIDDLE_BANNERS",e.slice(3,6))})).catch((function(e){return o.$logger.error("FETCH_BANNERS error: ".concat(e)),[]}))},FETCH_CATEGORIES:function(e){var t=e.commit;return Object(c.d)().then((function(e){return t("SET_CATEGORIES",e)})).catch((function(e){return o.$logger.error("FETCH_CATEGORIES error: ".concat(e)),[]}))},FETCH_FEATURED_PRODUCTS:function(e){var t=e.commit;return Promise.all([Object(c.g)(),Object(c.a)()]).then((function(e){t("SET_FEATURED_PRODUCTS",{items:e[0]?e[0].items.slice(8,12):[],banner:e[1][2]?e[1][2]:{}})})).catch((function(e){return o.$logger.error("FETCH_FEATURED_PRODUCTS error: ".concat(e)),[]}))},FETCH_NEW_PRODUCTS:function(e){var t=e.commit;return Promise.all([Object(c.g)(),Object(c.a)()]).then((function(e){t("SET_NEW_PRODUCTS",{items:e[0]?e[0].items.slice(0,4):[],banner:e[1][0]?e[1][0]:{}})})).catch((function(e){return o.$logger.error("FETCH_NEW_PRODUCTS error: ".concat(e)),[]}))},FETCH_BESTSELLER_PRODUCTS:function(e){var t=e.commit;return Promise.all([Object(c.g)(),Object(c.a)()]).then((function(e){t("SET_BESTSELLER_PRODUCTS",{items:e[0]?e[0].items.slice(4,8):[],banner:e[1][1]?e[1][1]:{}})})).catch((function(e){return o.$logger.error("FETCH_BESTSELLER_PRODUCTS error: ".concat(e)),[]}))},FETCH_LANDING_DATA:function(e){var t=e.dispatch,n=e.commit;return Promise.all([t("FETCH_NEW_PRODUCTS"),t("FETCH_BESTSELLER_PRODUCTS"),t("FETCH_FEATURED_PRODUCTS"),t("FETCH_CATEGORIES"),t("FETCH_BANNERS"),t("FETCH_BRANDS"),t("FETCH_INSTAGRAM")]).then((function(){return n("SET_LOAD",!0)}))}},mutations:u,getters:{}},T=n("L2JU");n("0PnJ");function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m={name:"landing",head:{title:{inner:"landing",separator:"-",complement:" Welcome!"}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(n,!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},Object(T.d)("landing",["renderData"])),beforeRouteEnter:function(e,t,n){!!o.$store._modulesNamespaceMap["".concat(E.name,"/")]||o.$store.registerModule(E.name,E,{preserveState:!!o.$store.state.landing}),o.$store.state.landing.load?n():(o.$progress.start(),o.$store.dispatch("".concat(E.name,"/FETCH_LANDING_DATA")).then((function(){return n((function(e){return o.$progress.finish()}))})))},beforeRouteUpdate:function(e,t,n){var r=this;this.$progress.start(),this.$store.dispatch("".concat(E.name,"/FETCH_LANDING_DATA")).then((function(){return n((function(e){return r.$progress.finish()}))}))}},b=n("KHd+"),S=Object(b.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section landing-view"},e._l(e.renderData,(function(t){return n(t.component,e._b({key:t.id,tag:"component"},"component",t.data,!1))})),1)}),[],!1,null,null,null);t.default=S.exports}}]);