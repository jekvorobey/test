(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{"0Dmj":function(e,t,n){"use strict";n.r(t),n.d(t,"NAME",(function(){return o})),n.d(t,"RENDER_DATA",(function(){return s})),n.d(t,"default",(function(){return c}));var r=n("cg9J"),a=n("RC+Y"),i={},o="landing",s="renderData";function c(){return{name:o,namespaced:!0,state:{renderData:[],load:!1,banners:[],middleBanners:[],brands:[],categories:[],newProducts:{banner:{},items:[]},bestsellerProducts:{banner:{},items:[]},featuredProducts:{banner:{},items:[]},instagramItems:[]},actions:r.b,mutations:a.i,getters:i}}},"0PnJ":function(e,t,n){},"1LSg":function(e,t,n){},"2WIk":function(e,t,n){},"6RBQ":function(e,t,n){},"8/Tu":function(e,t,n){},C63v:function(e,t,n){},"RC+Y":function(e,t,n){"use strict";var r;function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"h",(function(){return s})),n.d(t,"b",(function(){return c})),n.d(t,"e",(function(){return u})),n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return d})),n.d(t,"c",(function(){return b})),n.d(t,"f",(function(){return p})),n.d(t,"g",(function(){return m}));var s="SET_NEW_PRODUCTS",c="SET_BESTSELLER_PRODUCTS",u="SET_FEATURED_PRODUCTS",l="SET_CATEGORIES",d="SET_BANNERS",b="SET_BRANDS",p="SET_INSTAGRAM",m="SET_LOAD";t.i=(o(r={},p,(function(e,t){e.instagramItems=t})),o(r,b,(function(e,t){e.brands=t})),o(r,d,(function(e,t){e.banners=t})),o(r,s,(function(e,t){e.newProducts=t})),o(r,c,(function(e,t){e.bestsellerProducts=t})),o(r,u,(function(e,t){e.featuredProducts=t})),o(r,l,(function(e,t){e.categories=t})),o(r,m,(function(e,t){e.load=t,e.renderData=[{id:1,component:"slider-banners-section",data:{banners:e.banners.filter((function(e){return"mainBanner"===e.id}))}},{id:2,component:"categories-section",data:{categories:e.categories}},{id:3,component:"separator-section"},{id:4,component:"products-section",data:i({titleText:"Новинки",inverse:!0},e.newProducts)},{id:5,component:"separator-section"},{id:6,component:"single-banner-section",data:{banner:e.banners.find((function(e){return"middleBanner"===e.id}))}},{id:7,component:"separator-section"},{id:8,component:"products-section",data:i({titleText:"Бестселлеры"},e.bestsellerProducts)},{id:9,component:"separator-section"},{id:10,component:"list-banners-section",data:{banners:e.banners.slice(3,6)}},{id:11,component:"separator-section"},{id:13,component:"brands-section",data:{titleText:"Популярные бренды",items:e.brands,restCount:10,btnText:"Показать"}},{id:14,component:"instagram-section",data:{titleText:"Instabeauty",items:e.instagramItems,btnText:"Подписаться на нас"}}]})),r)},XWJA:function(e,t,n){},cg9J:function(e,t,n){"use strict";n.d(t,"a",(function(){return j}));var r,a=n.p+"images/bDesktop3.464be6f379d1fde74018.jpg",i=n.p+"images/bTablet3.64ec92ffb60c4d601087.jpg",o=n.p+"images/bMobile3.aa50448bb903e8c8470a.jpg",s=n.p+"images/newDesktop3.eed427b768b6753a0685.jpg",c=n.p+"images/newTablet3.f2f04500d98489916556.jpg",u=n.p+"images/newMobile3.9c7fef5a458f06f8df40.jpg",l=n.p+"images/middleDesktop3.d3d9e39bd7b27946764b.jpg",d=n.p+"images/middleTablet3.a1268b9cbce1430e182a.jpg",b=n.p+"images/middleMobile3.ac725c8ac98bc4300bf5.jpg",p=n.p+"images/mainDesktop3.f426ba5497e8dbeda169.jpg",m=n.p+"images/mainTablet3.10daacc07775012277ad.jpg",g=n.p+"images/mainMobile3.10e8523e8d311e23c066.jpg",f=n("3eXy"),_=n("Nlzp"),v=n("RC+Y"),h=n("48TQ");function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e){return function(e){if(Array.isArray(e))return w(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return w(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return w(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function I(e,t,n,r,a,i,o){try{var s=e[i](o),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,a)}function C(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function o(e){I(i,r,a,o,s,"next",e)}function s(e){I(i,r,a,o,s,"throw",e)}o(void 0)}))}}var j="FETCH_LANDING_DATA";t.b=(O(r={},"FETCH_INSTAGRAM",(function(e){var t=e.commit;return Object(_.db)().then((function(e){return t(v.f,e)})).catch((function(e){return f.$logger.error("FETCH_INSTAGRAM error: ".concat(e)),[]}))})),O(r,"FETCH_BRANDS",(function(e){var t=e.commit;return Object(_.T)().then((function(e){return t(v.c,e)})).catch((function(e){return f.$logger.error("FETCH_BRANDS error: ".concat(e)),[]}))})),O(r,"FETCH_BANNERS",(function(e){return C(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.commit,t.prev=1,t.next=4,Object(_.O)();case 4:r=t.sent,n(v.a,[].concat(y(r),[{id:"middleBanner",name:"",type:"banner",button:{id:2,url:"/404",text:"Подписаться",location:"bottom_left",type:"white"},desktopImage:l,tabletImage:d,mobileImage:b},{id:"mainBanner",name:"",type:"banner",button:{id:2,url:"/?registration=true",text:"Присоединиться",location:"bottom_right",type:"white"},desktopImage:p,tabletImage:m,mobileImage:g}])),t.next=12;break;case 8:return t.prev=8,t.t0=t.catch(1),Object(h.b)("FETCH_BANNERS")(t.t0),t.abrupt("return",[]);case 12:case"end":return t.stop()}}),t,null,[[1,8]])})))()})),O(r,"FETCH_CATEGORIES",(function(e){var t=e.commit;return Object(_.W)().then((function(e){return t(v.d,e)})).catch((function(e){return f.$logger.error("FETCH_CATEGORIES error: ".concat(e)),[]}))})),O(r,"FETCH_FEATURED_PRODUCTS",(function(e){var t=e.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Promise.all([Object(_.ob)(n),Object(_.P)("header",!0)]).then((function(e){t(v.e,{items:e[0]?e[0].items.slice(8,12):[],banner:{id:"middleBanner",name:"",type:"banner",button:{id:2,url:"/404",text:"Подписаться",location:"bottom",type:"white"},desktopImage:l,tabletImage:d,mobileImage:b}})})).catch((function(e){return f.$logger.error("FETCH_FEATURED_PRODUCTS error: ".concat(e)),[]}))})),O(r,"FETCH_NEW_PRODUCTS",(function(e){var t=arguments;return C(regeneratorRuntime.mark((function n(){var r,a,i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,a=t.length>1&&void 0!==t[1]?t[1]:{},n.prev=2,n.next=5,Object(_.ob)(a);case 5:i=n.sent,r(v.h,{items:i?i.items.slice(4,8):[],banner:{id:"newBanner",name:"",type:"banner",button:{id:2,url:"/sets/hair_20/",text:"Посмотреть",location:"bottom",type:"white"},desktopImage:s,tabletImage:c,mobileImage:u}}),n.next=13;break;case 9:return n.prev=9,n.t0=n.catch(2),Object(h.b)("FETCH_NEW_PRODUCTS")(n.t0),n.abrupt("return",[]);case 13:case"end":return n.stop()}}),n,null,[[2,9]])})))()})),O(r,"FETCH_BESTSELLER_PRODUCTS",(function(e){var t=arguments;return C(regeneratorRuntime.mark((function n(){var r,s,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.commit,s=t.length>1&&void 0!==t[1]?t[1]:{},n.prev=2,n.next=5,Object(_.ob)(s);case 5:c=n.sent,r(v.b,{items:c?c.items.slice(4,8):[],banner:{id:"newBanner",name:"",type:"banner",button:{id:2,url:"/sets/hair_best/",text:"Посмотреть",location:"bottom",type:"white"},desktopImage:a,tabletImage:i,mobileImage:o}}),n.next=13;break;case 9:return n.prev=9,n.t0=n.catch(2),Object(h.b)("FETCH_BESTSELLER_PRODUCTS")(n.t0),n.abrupt("return",[]);case 13:case"end":return n.stop()}}),n,null,[[2,9]])})))()})),O(r,j,(function(e){var t=e.dispatch,n=e.commit;return Promise.all([t("FETCH_NEW_PRODUCTS"),t("FETCH_BESTSELLER_PRODUCTS"),t("FETCH_CATEGORIES"),t("FETCH_BANNERS"),t("FETCH_BRANDS"),t("FETCH_INSTAGRAM")]).then((function(){return n(v.g,!0)}))})),r)},esnV:function(e,t,n){"use strict";n.r(t);var r=n("5P1y"),a=n("jYNS"),i=n("YSwA"),o=n("LqtR"),s=n("aXGN");n("2WIk");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d={slidesPerView:1},b={name:"slider-banners-section",components:{VPicture:a.a,VSlider:i.a,CatalogBannerCard:o.a},props:{banners:{type:Array,default:function(){return[]}},backgroundColor:{type:String,default:"#E6E6F0"}},computed:{sliderOptions:function(){return d},items:function(){var e=this;return this.banners.map((function(t){return u(u({},t),{},{mobileImage:e.mobileImage(t),tabletImage:e.tabletImage(t),desktopImage:e.desktopImage(t),defaultImage:e.defaultImage(t)})}))}},methods:{mobileImage:function(e){var t=e.mobileImage||e.tabletImage||e.desktopImage;return"string"==typeof t?{webp:t,orig:t}:t?{webp:Object(s.c)(320,320,t.id,fileExtension.image.WEBP),orig:Object(s.c)(320,320,t.id)}:void 0},tabletImage:function(e){var t=e.tabletImage||e.desktopImage;return"string"==typeof t?{webp:t,orig:t}:t?{webp:Object(s.c)(472,352,t.id,fileExtension.image.WEBP),orig:Object(s.c)(472,352,t.id)}:void 0},desktopImage:function(e){var t=e.desktopImage||e.tabletImage;return"string"==typeof t?{webp:t,orig:t}:t?{webp:Object(s.c)(600,888,t.id,fileExtension.image.WEBP),orig:Object(s.c)(600,888,t.id)}:void 0},defaultImage:function(e){var t=e.desktopImage||e.tabletImage||e.mobileImage;if(t)return Object(s.c)(600,888,t.id)}}},p=n("KHd+"),m=Object(p.a)(b,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section"},[n("div",{staticClass:"slider-banners-section",style:{"background-color":e.backgroundColor}},[n("v-slider",{staticClass:"container slider-banners-section__slider",attrs:{name:"banners",options:e.sliderOptions}},[e._l(e.items,(function(t){return[e._t("item",[n("catalog-banner-card",{key:t.id,staticClass:"swiper-slide slider-banners-section__card",attrs:{item:t}},[t.desktopImage?[n("source",{attrs:{"data-srcset":t.desktopImage.webp,type:"image/webp",media:"(min-width: 1024px)"}}),e._v(" "),n("source",{attrs:{"data-srcset":t.desktopImage.orig,media:"(min-width: 1024px)"}})]:e._e(),e._v(" "),t.tabletImage?[n("source",{attrs:{"data-srcset":t.tabletImage.webp,type:"image/webp",media:"(min-width: 768px)"}}),e._v(" "),n("source",{attrs:{"data-srcset":t.tabletImage.orig,media:"(min-width: 768px)"}})]:e._e(),e._v(" "),t.mobileImage?[n("source",{attrs:{"data-srcset":t.mobileImage.webp,type:"image/webp",media:"(min-width: 320px)"}}),e._v(" "),n("source",{attrs:{"data-srcset":t.mobileImage.orig,media:"(min-width: 320px)"}})]:e._e(),e._v(" "),n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage,alt:""}})],2)],{item:t})]}))],2)],1)])}),[],!1,null,null,null).exports,g=n("ENRa"),f=(n("8/Tu"),{name:"list-banners-section",components:{BannerCard:g.a},props:{banners:{type:Array,default:function(){return[]}}}}),_=Object(p.a)(f,(function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"section"},[t("div",{staticClass:"container list-banners-section"},[t("div",{staticClass:"list-banners-section__list"},this._l(this.banners,(function(e){return t("banner-card",{key:e.id,staticClass:"list-banners-section__list-item",attrs:{image:e.image,title:e.title,"button-text":e.btnText}})})),1)])])}),[],!1,null,null,null).exports,v=n("i2Ud"),h=n("eOVz"),O=n("2JJK");n("C63v");var y,w,I,C={spaceBetween:24,slidesOffsetBefore:24,slidesOffsetAfter:24,slidesPerView:2.5,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:(y={},w=O.breakpoints.tablet-1,I={slidesPerView:1.5,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16},w in y?Object.defineProperty(y,w,{value:I,enumerable:!0,configurable:!0,writable:!0}):y[w]=I,y)},j={name:"instagram-section",components:{VButton:v.a,VSlider:i.a,InstagramCard:h.a},props:{titleText:{type:String,default:"Title"},items:{type:Array},btnText:{type:String}},computed:{sliderOptions:function(){return C},isTabletLg:function(){return this.$mq.tabletLg}}},E=Object(p.a)(j,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section"},[n("div",{staticClass:"container instagram-section"},[n("h2",{staticClass:"instagram-section__hl"},[e._v(e._s(e.titleText))]),e._v(" "),e.isTabletLg?n("v-slider",{staticClass:"instagram-section__slider",attrs:{name:"instagram",options:e.sliderOptions}},e._l(e.items,(function(e){return n("instagram-card",{key:e.id,staticClass:"swiper-slide instagram-section__card",attrs:{"instagram-card-id":e.id,image:e.image}})})),1):e._e(),e._v(" "),e.isTabletLg?e._e():n("div",{staticClass:"instagram-section__grid instagram-section__grid--initialized"},e._l(e.items,(function(e){return n("instagram-card",{key:e.id,staticClass:"instagram-section__card",attrs:{"instagram-card-id":e.id,image:e.image}})})),1)],1)])}),[],!1,null,null,null).exports,T=(n("6RBQ"),{name:"single-banner-section",components:{CatalogBannerCard:o.a},props:{banner:{type:Object,default:function(){return{}}}},computed:{mobileImage:function(){var e=this.banner.mobileImage||this.banner.tabletImage||this.banner.desktopImage;return"string"==typeof e?{webp:e,orig:e}:e?{webp:Object(s.c)(320,240,e.id,O.fileExtension.image.WEBP),orig:Object(s.c)(320,240,e.id)}:void 0},tabletImage:function(){var e=this.banner.tabletImage||this.banner.desktopImage;return"string"==typeof e?{webp:e,orig:e}:e?{webp:Object(s.c)(768,240,e.id,O.fileExtension.image.WEBP),orig:Object(s.c)(768,240,e.id)}:void 0},desktopImage:function(){var e=this.banner.desktopImage||this.banner.tabletImage;return"string"==typeof e?{webp:e,orig:e}:e?{webp:Object(s.c)(1224,240,e.id,O.fileExtension.image.WEBP),orig:Object(s.c)(1224,240,e.id)}:void 0},defaultImage:function(e){var t=this.banner.desktopImage||this.banner.tabletImage||this.banner.mobileImage;return"string"==typeof t?t:t?Object(s.c)(1224,240,t.id):void 0}}}),P=Object(p.a)(T,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section"},[n("div",{staticClass:"container single-banner-section"},[n("div",{staticClass:"single-banner-section__inner"},[n("catalog-banner-card",{staticClass:"single-banner-section__banner",attrs:{item:e.banner}},[e.desktopImage?[n("source",{attrs:{"data-srcset":e.desktopImage.webp,type:"image/webp",media:"(min-width: 1024px)"}}),e._v(" "),n("source",{attrs:{"data-srcset":e.desktopImage.orig,media:"(min-width: 1024px)"}})]:e._e(),e._v(" "),e.tabletImage?[n("source",{attrs:{"data-srcset":e.tabletImage.webp,type:"image/webp",media:"(min-width: 768px)"}}),e._v(" "),n("source",{attrs:{"data-srcset":e.tabletImage.orig,media:"(min-width: 768px)"}})]:e._e(),e._v(" "),e.mobileImage?[n("source",{attrs:{"data-srcset":e.mobileImage.webp,type:"image/webp",media:"(min-width: 320px)"}}),e._v(" "),n("source",{attrs:{"data-srcset":e.mobileImage.orig,media:"(min-width: 320px)"}})]:e._e(),e._v(" "),n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImage,alt:""}})],2)],1)])])}),[],!1,null,null,null).exports,S=n("eFfy"),x=n("/Q9p"),k=n("L2JU"),A=n("8TZ/"),D=n("0CxO"),R=n("Cv2f"),B=n("LCOE"),N=n("55Sm"),F=n("jDKC");n("XWJA");function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){$(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function $(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var W={name:"products-section",components:{VButton:v.a,CatalogProductCard:x.a,CatalogBannerCard:o.a},props:{titleText:{type:String,default:"Title"},btnText:{type:String,default:"Посмотреть все"},btnLink:{type:String,default:"/"},inverse:{type:Boolean,default:!1},items:{type:Array,default:function(){return[]}},banner:{type:Object,default:function(){return{}}}},computed:{mobileImage:function(){var e=this.banner.mobileImage||this.banner.tabletImage||this.banner.desktopImage;return"string"==typeof e?{webp:e,orig:e}:e?{webp:Object(s.c)(320,320,e.id,O.fileExtension.image.WEBP),orig:Object(s.c)(320,320,e.id)}:void 0},tabletImage:function(){var e=this.banner.tabletImage||this.banner.desktopImage;return"string"==typeof e?{webp:e,orig:e}:e?{webp:Object(s.c)(472,352,e.id,O.fileExtension.image.WEBP),orig:Object(s.c)(472,352,e.id)}:void 0},desktopImage:function(){var e=this.banner.desktopImage||this.banner.tabletImage;return"string"==typeof e?{webp:e,orig:e}:e?{webp:Object(s.c)(600,888,e.id,O.fileExtension.image.WEBP),orig:Object(s.c)(600,888,e.id)}:void 0},defaultImage:function(e){var t=this.banner.desktopImage||this.banner.tabletImage||this.banner.mobileImage;if(t)return Object(s.c)(600,888,t.id)}},methods:H(H(H(H({},Object(k.b)(A.c,[D.b])),Object(k.b)(N.b,[F.a])),Object(k.b)(R.f,[B.e])),{},{onPreview:function(e){this[F.a]({name:"quick-view-modal",open:!0,state:{code:e}})},onAddToCart:function(e){this[F.a]({name:O.modalName.general.ADD_TO_CART,open:!0,state:{offerId:e.id,storeId:e.stock.storeId,type:e.type}})},onToggleFavorite:function(e){var t=e.productId;this[B.e](t)}})},U=Object(p.a)(W,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section"},[n("div",{staticClass:"container products-section",class:{"products-section--inverse":e.inverse}},[n("h2",{staticClass:"products-section__hl"},[e._v(e._s(e.titleText))]),e._v(" "),n("div",{staticClass:"products-section__grid"},[e._l(e.items,(function(t){return n("catalog-product-card",{key:t.id,staticClass:"products-section__card",attrs:{"offer-id":t.id,"product-id":t.productId,name:t.name,type:t.type,href:"/catalog/"+t.categoryCodes[t.categoryCodes.length-1]+"/"+t.code,image:t.image,price:t.price,"old-price":t.oldPrice,tags:t.tags,rating:t.rating,"show-buy-btn":t.stock.qty>0},on:{"add-item":function(n){return e.onAddToCart(t)},preview:function(n){return e.onPreview(t.code)},"toggle-favorite-item":function(n){return e.onToggleFavorite(t)}}})})),e._v(" "),n("catalog-banner-card",{staticClass:"products-section__banner",attrs:{item:e.banner}},[e.desktopImage?[n("source",{attrs:{"data-srcset":e.desktopImage.webp,type:"image/webp",media:"(min-width: 1024px)"}}),e._v(" "),n("source",{attrs:{"data-srcset":e.desktopImage.orig,media:"(min-width: 1024px)"}})]:e._e(),e._v(" "),e.tabletImage?[n("source",{attrs:{"data-srcset":e.tabletImage.webp,type:"image/webp",media:"(min-width: 768px)"}}),e._v(" "),n("source",{attrs:{"data-srcset":e.tabletImage.orig,media:"(min-width: 768px)"}})]:e._e(),e._v(" "),e.mobileImage?[n("source",{attrs:{"data-srcset":e.mobileImage.webp,type:"image/webp",media:"(min-width: 320px)"}}),e._v(" "),n("source",{attrs:{"data-srcset":e.mobileImage.orig,media:"(min-width: 320px)"}})]:e._e(),e._v(" "),n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImage,alt:""}})],2)],2)])])}),[],!1,null,null,null).exports,M=(n("tZek"),{name:"popular-brands",components:{VPicture:a.a},props:{items:{type:Array,default:function(){return[]}},popularCount:{type:Number,default:6},restCount:{type:Number,default:18},btnText:{type:String,default:"Показать все"}},data:function(){return{showAll:!1}},computed:{mostPopularBrands:function(){return this.items.slice(0,this.popularCount)},restBrands:function(){return this.showAll?this.items.slice(this.popularCount,this.items.length):this.items.slice(this.popularCount,this.restCount)},canShowAll:function(){return this.items.length<=this.popularCount+this.restCount&&!this.showAll}},methods:{onShowAll:function(){this.showAll=!this.showAll}}}),J=Object(p.a)(M,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"popular-brands"},[n("div",{staticClass:"popular-brands__most-popular"},e._l(e.mostPopularBrands,(function(e,t){return n("div",{key:e.id||t,staticClass:"popular-brands__most-popular-img"},[n("v-picture",{attrs:{image:e.image}})],1)})),0),e._v(" "),n("ul",{staticClass:"popular-brands__list"},[e._l(e.restBrands,(function(t,r){return n("li",{key:t.id||r,staticClass:"popular-brands__list-item"},[e._v("\n            "+e._s(t.name)+"\n        ")])})),e._v(" "),e.canShowAll?n("li",{staticClass:"popular-brands__list-item"},[n("button",{staticClass:"popular-brands__list-btn",on:{click:e.onShowAll}},[e._v(e._s(e.btnText))])]):e._e()],2)])}),[],!1,null,null,null).exports,V=(n("1LSg"),{name:"brands-section",components:{PopularBrands:J},props:{titleText:{type:String,default:"Title"},items:{type:Array},popularCount:{type:Number},restCount:{type:Number},btnText:{type:String}}}),G=Object(p.a)(V,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section brands-section"},[n("div",{staticClass:"container"},[n("h2",{staticClass:"brands-section__hl"},[e._v("\n            "+e._s(e.titleText)+"\n        ")]),e._v(" "),n("popular-brands",{staticClass:"brands-section__list",attrs:{items:e.items,"popular-count":e.popularCount,"rest-count":e.restCount,"btn-text":e.btnText}})],1)])}),[],!1,null,null,null).exports,z=n("3eXy"),q=n("0Dmj"),X=n("cg9J");n("0PnJ");function Y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(n),!0).forEach((function(t){K(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function K(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Z={name:"landing",components:{SeparatorSection:r.a,SliderBannersSection:m,ListBannersSection:_,SingleBannerSection:P,BrandsSection:G,CategoriesSection:S.a,ProductsSection:U,InstagramSection:E},computed:Q(Q({},Object(k.d)(q.NAME,[q.RENDER_DATA])),{},{isTabletLg:function(){return this.$mq.tabletLg}}),methods:Q({},Object(k.b)(q.NAME,[X.a])),beforeRouteEnter:function(e,t,n){z.$store.state[q.NAME].load?n():(z.$progress.start(),z.$store.dispatch("".concat(q.NAME,"/").concat(X.a)).then((function(){z.$progress.finish(),n()})).catch((function(){z.$progress.fail(),n()})))}},ee=Object(p.a)(Z,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section landing-view"},e._l(e.renderData,(function(t){return n(t.component,e._b({key:t.id,tag:"component"},"component",t.data,!1))})),1)}),[],!1,null,null,null);t.default=ee.exports},tZek:function(e,t,n){}}]);