(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{"0PnJ":function(t,e,n){},"1LSg":function(t,e,n){},"2WIk":function(t,e,n){},"6RBQ":function(t,e,n){},"8/Tu":function(t,e,n){},C63v:function(t,e,n){},XWJA:function(t,e,n){},esnV:function(t,e,n){"use strict";n.r(e);var r=n("5P1y"),a=n("jYNS"),i=n("YSwA"),s=n("i2Ud"),o=n("aXGN"),c=(n("n4H4"),{name:"landing-banner-card",components:{VButton:s.a,VPicture:a.a},props:{bannerId:{type:[Number,String]},upperText:{type:String},bottomText:{type:String},title:{type:String},image:{type:[Object,String]},btnText:{type:String}},methods:{generateSourcePath:function(t,e,n,r){return Object(o.c)(t,e,n,r)}}}),l=n("KHd+"),u=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"landing-banner-card"},[n("div",{staticClass:"landing-banner-card__img"},[t.image?n("v-picture",{attrs:{image:t.image,alt:"",lazy:!1},scopedSlots:t._u([{key:"source",fn:function(e){var r=e.image;e.lazy;return[n("source",{attrs:{"data-srcset":t.generateSourcePath(300,300,r.id,"webp"),type:"image/webp",media:"(min-width: 1024px)"}})]}},{key:"fallback",fn:function(e){var r=e.image,a=(e.lazy,e.alt);return[n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(300,300,r.id,r.sourceExt),alt:a}})]}}],null,!1,3057140998)}):t._e()],1),t._v(" "),n("div",{staticClass:"landing-banner-card__panel"},[n("div",{staticClass:"landing-banner-card__panel-container"},[n("div",{staticClass:"landing-banner-card__panel-title"},[n("div",{staticClass:"landing-banner-card__panel-title-text"},[t._v(t._s(t.title))]),t._v(" "),n("v-button",{staticClass:"landing-banner-card__panel-btn",attrs:{to:"/?registration=true"}},[t._v("\n                    "+t._s(t.btnText)+"\n                ")])],1),t._v(" "),t.bottomText?n("div",{staticClass:"landing-banner-card__panel-bottom-text"},[t._m(0)]):t._e()])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("span",{staticStyle:{"font-size":"24px","line-height":"32px"}},[t._v("01")]),t._v(" "),n("p",[t._v("Регистрируйся и укажи ссылку на свой профиль в социальных сетях")]),t._v(" "),n("span",{staticStyle:{"font-size":"24px","line-height":"32px"}},[t._v("02")]),t._v(" "),n("p",[t._v("В течение 24 часов мы проверим твоё портфолио")]),t._v(" "),n("span",{staticStyle:{"font-size":"24px","line-height":"32px"}},[t._v("03")]),t._v(" "),n("p",[t._v("Ты получишь доступ к тысячам товаров по специальным ценам")])])}],!1,null,null,null).exports,d=(n("2WIk"),{slidesPerView:1}),p={name:"slider-banners-section",components:{VPicture:a.a,VSlider:i.a,LandingBannerCard:u},props:{banners:{type:Array,default:function(){return[]}},backgroundColor:{type:String,default:"#8CA9BE"}},computed:{sliderOptions:function(){return d}}},b=Object(l.a)(p,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("div",{staticClass:"slider-banners-section",style:{"background-color":t.backgroundColor}},[n("v-slider",{staticClass:"container slider-banners-section__slider",attrs:{name:"banners",options:t.sliderOptions}},[t._l(t.banners,(function(e){return[t._t("item",[n("landing-banner-card",{key:e.id,staticClass:"swiper-slide slider-banners-section__card",attrs:{"banner-id":e.id,image:e.image,"upper-text":e.upperText,"bottom-text":e.bottomText,title:e.title,"btn-text":e.btnText}})],{item:e})]}))],2)],1)])}),[],!1,null,null,null).exports,m=n("ENRa"),g=(n("8/Tu"),{name:"list-banners-section",components:{BannerCard:m.a},props:{banners:{type:Array,default:function(){return[]}}}}),f=Object(l.a)(g,(function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"section"},[e("div",{staticClass:"container list-banners-section"},[e("div",{staticClass:"list-banners-section__list"},this._l(this.banners,(function(t){return e("banner-card",{key:t.id,staticClass:"list-banners-section__list-item",attrs:{image:t.image,title:t.title,"button-text":t.btnText}})})),1)])])}),[],!1,null,null,null).exports,_=n("eOVz"),v=n("2JJK");n("C63v");var C,h,T,O={spaceBetween:24,slidesOffsetBefore:24,slidesOffsetAfter:24,slidesPerView:2.5,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:(C={},h=v.breakpoints.tablet-1,T={slidesPerView:1.5,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16},h in C?Object.defineProperty(C,h,{value:T,enumerable:!0,configurable:!0,writable:!0}):C[h]=T,C)},S={name:"instagram-section",components:{VButton:s.a,VSlider:i.a,InstagramCard:_.a},props:{titleText:{type:String,default:"Title"},items:{type:Array},btnText:{type:String}},computed:{sliderOptions:function(){return O},isTabletLg:function(){return this.$mq.tabletLg}}},y=Object(l.a)(S,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("div",{staticClass:"container instagram-section"},[n("h2",{staticClass:"instagram-section__hl"},[t._v(t._s(t.titleText))]),t._v(" "),t.isTabletLg?n("v-slider",{staticClass:"instagram-section__slider",attrs:{name:"instagram",options:t.sliderOptions}},t._l(t.items,(function(t){return n("instagram-card",{key:t.id,staticClass:"swiper-slide instagram-section__card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1):t._e(),t._v(" "),t.isTabletLg?t._e():n("div",{staticClass:"instagram-section__grid instagram-section__grid--initialized"},t._l(t.items,(function(t){return n("instagram-card",{key:t.id,staticClass:"instagram-section__card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1)],1)])}),[],!1,null,null,null).exports,E=n("LqtR"),P=(n("6RBQ"),{name:"single-banner-section",components:{CatalogBannerCard:E.a},props:{banner:{type:Object,default:function(){return{}}}},computed:{mobileImg:function(){var t=this.banner.mobileImage||this.banner.tabletImage||this.banner.desktopImage;if(t)return generatePictureSourcePath(320,240,t.id,"webp")},tabletImg:function(){var t=this.banner.tabletImage||this.banner.desktopImage;if(t)return generatePictureSourcePath(768,240,t.id,"webp")},desktopImg:function(){var t=this.banner.desktopImage||this.banner.tabletImage;if(t)return generatePictureSourcePath(1224,240,t.id,"webp")},defaultImg:function(){var t=this.banner.desktopImage||this.banner.tabletImage||this.banner.mobileImage;if(t)return generatePictureSourcePath(1224,240,t.id,t.sourceExt)}}}),w=Object(l.a)(P,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("div",{staticClass:"container single-banner-section"},[n("div",{staticClass:"single-banner-section__inner"},[n("catalog-banner-card",{staticClass:"single-banner-section__banner",attrs:{item:t.banner}},[t.desktopImg?n("source",{attrs:{"data-srcset":t.desktopImg,type:"image/webp",media:"(min-width: 1024px)"}}):t._e(),t._v(" "),t.tabletImg?n("source",{attrs:{"data-srcset":t.tabletImg,type:"image/webp",media:"(min-width: 480px)"}}):t._e(),t._v(" "),t.mobileImg?n("source",{attrs:{"data-srcset":t.mobileImg,type:"image/webp",media:"(max-width: 479px)"}}):t._e(),t._v(" "),t.defaultImg?n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}}):t._e()])],1)])])}),[],!1,null,null,null).exports,j=n("eFfy"),I=n("/Q9p"),x=n("L2JU"),A=n("8TZ/"),D=n("0CxO"),R=n("55Sm"),k=n("jDKC");n("XWJA");function B(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function N(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var F,L={name:"products-section",components:{VButton:s.a,CatalogProductCard:I.a,CatalogBannerCard:E.a},props:{titleText:{type:String,default:"Title"},btnText:{type:String,default:"Посмотреть все"},btnLink:{type:String,default:"/"},inverse:{type:Boolean,default:!1},items:{type:Array,default:function(){return[]}},banner:{type:Object,default:function(){return{}}}},methods:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?B(Object(n),!0).forEach((function(e){N(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):B(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},Object(x.b)(A.c,[D.a]),{},Object(x.b)(R.b,[k.a]),{onPreview:function(t){this[k.a]({name:"quick-view-modal",open:!0,state:{code:t}})},getMobileImg:function(t){var e=t.mobileImage||t.tabletImage||t.desktopImage;if(e)return Object(o.c)(320,320,e.id,"webp")},getTabletImg:function(t){var e=t.tabletImage||t.desktopImage;if(e)return Object(o.c)(720,720,e.id,"webp")},getDesktopImg:function(t){var e=t.desktopImage||t.tabletImage;if(e)return Object(o.c)(600,900,e.id,"webp")},getDefaultImg:function(t){var e=t.desktopImage||t.tabletImage||t.mobileImage;if(e)return Object(o.c)(600,900,e.id,e.sourceExt)},onAddToCart:function(t){this[k.a]({name:"add-to-cart-modal",open:!0,state:{offerId:t.id,storeId:t.stock.storeId,type:t.type}})}})},H=Object(l.a)(L,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("div",{staticClass:"container products-section",class:{"products-section--inverse":t.inverse}},[n("h2",{staticClass:"products-section__hl"},[t._v(t._s(t.titleText))]),t._v(" "),n("div",{staticClass:"products-section__grid"},[n("div",{staticClass:"products-section__cards"},t._l(t.items,(function(e){return n("catalog-product-card",{key:e.id,staticClass:"products-section__card",attrs:{"product-id":e.id,name:e.name,type:e.type,href:"/catalog/"+e.categoryCodes[e.categoryCodes.length-1]+"/"+e.code,image:e.image,price:e.price,"old-price":e.oldPrice,tags:e.tags,rating:e.rating,"show-buy-btn":e.stock.qty>0},on:{addItem:function(n){return t.onAddToCart(e)},preview:function(n){return t.onPreview(e.code)}}})})),1),t._v(" "),n("catalog-banner-card",{staticClass:"products-section__banner",attrs:{item:t.banner}},[n("source",{attrs:{"data-srcset":t.getDesktopImg(t.banner),type:"image/webp",media:"(min-width: 1024px)"}}),t._v(" "),n("source",{attrs:{"data-srcset":t.getTabletImg(t.banner),type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),n("source",{attrs:{"data-srcset":t.getMobileImg(t.banner),type:"image/webp",media:"(max-width: 479px)"}}),t._v(" "),n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.getDefaultImg(t.banner),alt:""}})])],1)])])}),[],!1,null,null,null).exports,$=(n("tZek"),{name:"popular-brands",components:{VPicture:a.a},props:{items:{type:Array,default:function(){return[]}},popularCount:{type:Number,default:6},restCount:{type:Number,default:18},btnText:{type:String,default:"Показать все"}},data:function(){return{showAll:!1}},computed:{mostPopularBrands:function(){return this.items.slice(0,this.popularCount)},restBrands:function(){return this.showAll?this.items.slice(this.popularCount,this.items.length):this.items.slice(this.popularCount,this.restCount)},canShowAll:function(){return this.items.length<=this.popularCount+this.restCount&&!this.showAll}},methods:{onShowAll:function(){this.showAll=!this.showAll}}}),U=Object(l.a)($,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"popular-brands"},[n("div",{staticClass:"popular-brands__most-popular"},t._l(t.mostPopularBrands,(function(t,e){return n("div",{key:t.id||e,staticClass:"popular-brands__most-popular-img"},[n("v-picture",{attrs:{image:t.image}})],1)})),0),t._v(" "),n("ul",{staticClass:"popular-brands__list"},[t._l(t.restBrands,(function(e,r){return n("li",{key:e.id||r,staticClass:"popular-brands__list-item"},[t._v("\n            "+t._s(e.name)+"\n        ")])})),t._v(" "),t.canShowAll?n("li",{staticClass:"popular-brands__list-item"},[n("button",{staticClass:"popular-brands__list-btn",on:{click:t.onShowAll}},[t._v(t._s(t.btnText))])]):t._e()],2)])}),[],!1,null,null,null).exports,G=(n("1LSg"),{name:"brands-section",components:{PopularBrands:U},props:{titleText:{type:String,default:"Title"},items:{type:Array},popularCount:{type:Number},restCount:{type:Number},btnText:{type:String}}}),V=Object(l.a)(G,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section brands-section"},[n("div",{staticClass:"container"},[n("h2",{staticClass:"brands-section__hl"},[t._v("\n            "+t._s(t.titleText)+"\n        ")]),t._v(" "),n("popular-brands",{staticClass:"brands-section__list",attrs:{items:t.items,"popular-count":t.popularCount,"rest-count":t.restCount,"btn-text":t.btnText}})],1)])}),[],!1,null,null,null).exports,z=n("3eXy"),W=n("Nlzp");function J(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function M(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?J(Object(n),!0).forEach((function(e){q(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):J(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function q(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Q,X=(q(F={},"SET_INSTAGRAM",(function(t,e){t.instagramItems=e})),q(F,"SET_BRANDS",(function(t,e){t.brands=e})),q(F,"SET_BANNERS",(function(t,e){t.banners=e})),q(F,"SET_NEW_PRODUCTS",(function(t,e){t.newProducts=e})),q(F,"SET_BESTSELLER_PRODUCTS",(function(t,e){t.bestsellerProducts=e})),q(F,"SET_FEATURED_PRODUCTS",(function(t,e){t.featuredProducts=e})),q(F,"SET_CATEGORIES",(function(t,e){t.categories=e})),q(F,"SET_LOAD",(function(t,e){t.load=e,t.renderData=[{id:1,component:"slider-banners-section",data:{banners:t.banners.slice(7,8)}},{id:2,component:"categories-section",data:{categories:t.categories}},{id:3,component:"separator-section"},{id:4,component:"products-section",data:M({titleText:"Новинки"},t.newProducts)},{id:5,component:"separator-section"},{id:6,component:"single-banner-section",data:{banner:t.banners[10]}},{id:7,component:"separator-section"},{id:8,component:"products-section",data:M({titleText:"Бестселлеры",inverse:!0},t.bestsellerProducts)},{id:9,component:"separator-section"},{id:10,component:"list-banners-section",data:{banners:t.banners.slice(3,6)}},{id:11,component:"separator-section"},{id:12,component:"products-section",data:M({titleText:"Смотрят на сайте сейчас"},t.featuredProducts)},{id:13,component:"brands-section",data:{titleText:"Популярные бренды",items:t.brands,restCount:10,btnText:"Показать"}},{id:14,component:"instagram-section",data:{titleText:"Instabeauty",items:t.instagramItems,btnText:"Подписаться на нас"}}]})),F);function K(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Z=(K(Q={},"FETCH_INSTAGRAM",(function(t){var e=t.commit;return Object(W.I)().then((function(t){return e("SET_INSTAGRAM",t)})).catch((function(t){return z.$logger.error("FETCH_INSTAGRAM error: ".concat(t)),[]}))})),K(Q,"FETCH_BRANDS",(function(t){var e=t.commit;return Object(W.C)().then((function(t){return e("SET_BRANDS",t)})).catch((function(t){return z.$logger.error("FETCH_BRANDS error: ".concat(t)),[]}))})),K(Q,"FETCH_BANNERS",(function(t){var e=t.commit;return Object(W.A)().then((function(t){return e("SET_BANNERS",t)})).catch((function(t){return z.$logger.error("FETCH_BANNERS error: ".concat(t)),[]}))})),K(Q,"FETCH_CATEGORIES",(function(t){var e=t.commit;return Object(W.F)().then((function(t){return e("SET_CATEGORIES",t)})).catch((function(t){return z.$logger.error("FETCH_CATEGORIES error: ".concat(t)),[]}))})),K(Q,"FETCH_FEATURED_PRODUCTS",(function(t){var e=t.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Promise.all([Object(W.R)(n),Object(W.B)("header",!0)]).then((function(t){e("SET_FEATURED_PRODUCTS",{items:t[0]?t[0].items.slice(8,12):[],banner:t[1]})})).catch((function(t){return z.$logger.error("FETCH_FEATURED_PRODUCTS error: ".concat(t)),[]}))})),K(Q,"FETCH_NEW_PRODUCTS",(function(t){var e=t.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Promise.all([Object(W.R)(n),Object(W.B)("header",!0)]).then((function(t){e("SET_NEW_PRODUCTS",{items:t[0]?t[0].items.slice(0,4):[],banner:t[1]})})).catch((function(t){return z.$logger.error("FETCH_NEW_PRODUCTS error: ".concat(t)),[]}))})),K(Q,"FETCH_BESTSELLER_PRODUCTS",(function(t){var e=t.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Promise.all([Object(W.R)(n),Object(W.B)("header",!0)]).then((function(t){e("SET_BESTSELLER_PRODUCTS",{items:t[0]?t[0].items.slice(4,8):[],banner:t[1]})})).catch((function(t){return z.$logger.error("FETCH_BESTSELLER_PRODUCTS error: ".concat(t)),[]}))})),K(Q,"FETCH_LANDING_DATA",(function(t){var e=t.dispatch,n=t.commit;return Promise.all([e("FETCH_NEW_PRODUCTS"),e("FETCH_BESTSELLER_PRODUCTS"),e("FETCH_FEATURED_PRODUCTS"),e("FETCH_CATEGORIES"),e("FETCH_BANNERS"),e("FETCH_BRANDS"),e("FETCH_INSTAGRAM")]).then((function(){return n("SET_LOAD",!0)}))})),Q),Y={},tt="landing";function et(){return{name:tt,namespaced:!0,state:{renderData:[],load:!1,banners:[],middleBanners:[],brands:[],categories:[],newProducts:{banner:{},items:[]},bestsellerProducts:{banner:{},items:[]},featuredProducts:{banner:{},items:[]},instagramItems:[]},actions:Z,mutations:X,getters:Y}}var nt=n("48TQ");n("0PnJ");function rt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function at(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?rt(Object(n),!0).forEach((function(e){it(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):rt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function it(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var st={name:"landing",components:{SeparatorSection:r.a,SliderBannersSection:b,ListBannersSection:f,SingleBannerSection:w,BrandsSection:V,CategoriesSection:j.a,ProductsSection:H,InstagramSection:y},head:{title:{inner:"landing",separator:"-",complement:" Welcome!"}},computed:at({},Object(x.d)(tt,["renderData"]),{isTabletLg:function(){return this.$mq.tabletLg}}),methods:at({},Object(x.b)(tt,["FETCH_LANDING_DATA"])),beforeRouteEnter:function(t,e,n){Object(nt.a)(z.$store,tt,et),z.$store.state[tt].load?n():(z.$progress.start(),z.$store.dispatch("".concat(tt,"/").concat("FETCH_LANDING_DATA")).then((function(){z.$progress.finish(),n()})).catch((function(){z.$progress.fail(),n()})))}},ot=Object(l.a)(st,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section landing-view"},t._l(t.renderData,(function(e){return n(e.component,t._b({key:e.id,tag:"component"},"component",e.data,!1))})),1)}),[],!1,null,null,null);e.default=ot.exports},n4H4:function(t,e,n){},tZek:function(t,e,n){}}]);