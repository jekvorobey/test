(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{"/Rcj":function(t,e,r){"use strict";r.r(e);var n,a=r("NDiG"),i=r("i2Ud"),o=r("o3vK"),c=r("+gqB"),s=r("nuHk"),l=r("pFko"),u=r("ze5i"),d=r("wo+G"),m=r("2/Mz"),f=r("obii"),g=r("zfPd"),p=r("KLyl"),_=r("tHOl"),v=r("BZIu"),b=r("Nlzp");function h(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function C(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var y,O=(h(n={},"SET_LOAD_PATH",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t.loadPath=e})),h(n,"SET_BANNER",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.banner=e})),h(n,"SET_ITEMS_MORE",(function(t,e){var r,n=e.items,a=e.range;(r=t.items).push.apply(r,C(n)),t.range=a||0})),h(n,"SET_ITEMS",(function(t,e){var r=e.items,n=e.range;t.items=r,t.range=n||0})),h(n,"SET_CATEGORY_CODE",(function(t,e){t.categoryCode=e})),h(n,"SET_BRAND_CODE",(function(t,e){t.brandCode=e})),h(n,"SET_CATEGORIES",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.categories=e})),h(n,"SET_BRAND",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.brand=e})),h(n,"SET_FILTERS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.filters=e})),n);function w(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function E(t,e,r,n,a,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,a)}function T(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var i=t.apply(e,r);function o(t){E(i,n,a,o,c,"next",t)}function c(t){E(i,n,a,o,c,"throw",t)}o(void 0)}))}}var j,S,P,x=(w(y={},"FETCH_BANNER",(function(t,e){var r=t.commit;return Object(b.m)().then((function(t){r("SET_BANNER",t[6])})).catch((function(t){return v.$logger.error("".concat("FETCH_BANNER"," ").concat(t)),[]}))})),w(y,"FETCH_CATEGORIES",(function(t,e){var r=t.commit;return Object(b.r)().then((function(t){r("SET_CATEGORIES",t)})).catch((function(t){return v.$logger.error("".concat("FETCH_CATEGORIES"," ").concat(t)),[]}))})),w(y,"FETCH_FILTERS",(function(t,e){var r=t.commit;return Object(b.t)({categoryCode:e.filter.category,needBrands:Number(!e.brandCode)}).then((function(t){r("SET_FILTERS",t)})).catch((function(t){return v.$logger.error("".concat("FETCH_FILTERS"," ").concat(t)),[]}))})),w(y,"FETCH_ITEMS",(function(t,e){var r=t.commit;t.state;return Object(b.q)(e).then((function(t){e.showMore?r("SET_ITEMS_MORE",t):r("SET_ITEMS",t)})).catch((function(t){return v.$logger.error("".concat("FETCH_ITEMS"," ").concat(t)),[]}))})),w(y,"SET_LOAD_PATH",(function(t,e){(0,t.commit)("SET_LOAD_PATH",e)})),w(y,"FETCH_BRAND",(function(t,e){var r=t.commit;return Object(b.n)(e).then((function(t){return r("SET_BRAND",t)}))})),w(y,"FETCH_BRAND_DATA",(S=T(regeneratorRuntime.mark((function t(e,r){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.dispatch,t.abrupt("return",Promise.all([n("FETCH_CATEGORIES"),n("FETCH_BRAND",r)]));case 2:case"end":return t.stop()}}),t)}))),function(t,e){return S.apply(this,arguments)})),w(y,"FETCH_CATALOG_DATA",(j=T(regeneratorRuntime.mark((function t(e){var r,n,a,i=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.dispatch,n=e.commit,!(a=i.length>1&&void 0!==i[1]?i[1]:{}).brandCode){t.next=7;break}return t.next=5,Promise.all([r("FETCH_CATEGORIES"),r("FETCH_BRAND",{brandCode:a.brandCode})]);case 5:t.next=9;break;case 7:return t.next=9,Promise.all([r("FETCH_CATEGORIES"),r("FETCH_BANNER")]);case 9:return t.next=11,r("FETCH_FILTERS",a);case 11:return t.abrupt("return",r("FETCH_ITEMS",a).then((function(){n("SET_BRAND_CODE",a.brandCode),n("SET_CATEGORY_CODE",a.filter&&a.filter.category)})));case 12:case"end":return t.stop()}}),t)}))),function(t){return j.apply(this,arguments)})),y),k=r("W6hq");function A(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function D(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?A(Object(r),!0).forEach((function(e){R(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function R(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var I,F=(R(P={},"activeCategories",(function(t,e,r){for(var n=t.categories,a=r.route.params.code,i=[],o=null,c=0;c<n.length;c++){var s=n[c];if(o=Object(k.e)(a,s,i)){i.unshift(o);break}}return i})),R(P,"activePage",(function(t,e,r){var n=r.route;return n.query.page?Number(n.query.page):1})),R(P,"pagesCount",(function(t){return Math.ceil(t.range/12)})),R(P,"activeCategory",(function(t,e){var r=e.activeCategories;return r[r.length-1]})),R(P,"routeSegments",(function(t,e,r){var n=r.route.params.pathMatch;return n?n.split("/"):[]})),R(P,"filterSegments",(function(t,e){var r=e.routeSegments;return Object(k.f)(r)})),R(P,"activeTags",(function(t,e){for(var r=[],n=t.filters.filter((function(t){return"range"!==t.type})),a=e.filterSegments,i=0;i<n.length;i++)for(var o=n[i],c=0;c<o.items.length;c++){var s=o.items[c];a[o.name]&&a[o.name][s.code]&&r.push(D({},s,{segment:"".concat(o.name,"-").concat(s.code)}))}return r})),P);function $(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var M="catalog",B={name:M,namespaced:!0,state:(I={},$(I,"loadPath",""),$(I,"brand",{}),$(I,"brandCode",null),$(I,"banner",{}),$(I,"categoryId",null),$(I,"categoryCode",null),$(I,"categories",[]),$(I,"items",[]),$(I,"range",0),$(I,"filters",[]),I),actions:x,mutations:O,getters:F},H=r("L2JU");r("x3SC");function L(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function V(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var N={name:"category-tree-item",components:{},props:{item:{type:Object,required:!0},depth:{type:Number,default:0}},data:function(){return{isHover:!1}},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?L(Object(r),!0).forEach((function(e){V(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):L(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(H.c)(M,["activeCategories"]),{},Object(H.d)("route",{brandCode:function(t){return t.params.brandCode}}),{isActive:function(){return this.activeCategories.includes(this.item)},url:function(){var t=this.brandCode;return this.item&&{path:Object(k.d)(t,this.item.code)}},hasChildren:function(){return this.item&&Array.isArray(this.item.items)}}),methods:{onMouseOver:function(t){this.isHover=t}}},q=r("KHd+"),G=Object(q.a)(N,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"category-tree-item",class:[{"category-tree-item--root":0===t.depth},{"category-tree-item--active":t.isActive}],on:{mouseover:function(e){return t.onMouseOver(!0)},mouseleave:function(e){return t.onMouseOver(!1)}}},[r("div",{staticClass:"category-tree-item__label"},[void 0!==t.item.code?r("router-link",{staticClass:"category-tree-item__link",attrs:{to:t.url,exact:""===t.item.code}},[t._v("\n            "+t._s(t.item.name)+"\n        ")]):r("span",{staticClass:"category-tree-item__link"},[t._v("\n            "+t._s(t.item.name)+"\n        ")])],1),t._v(" "),r("transition",{attrs:{name:"slide-right"}},[t.hasChildren&&(t.isHover||t.isActive)?r("ul",{staticClass:"category-tree-item__list"},t._l(t.item.items,(function(e,n){return r("category-tree-item",{key:e.id||n,staticClass:"category-tree-item__item",attrs:{item:e,depth:t.depth+1}})})),1):t._e()])],1)}),[],!1,null,null,null).exports,U=r("MhNv"),z=r("sEfC"),Y=r.n(z);r("Xtz6");function Q(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function J(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var K={name:"catalog-filter",components:{VButton:i.a,VCheck:o.a,VRange:s.a,VAccordion:U.a},props:{btnText:{type:String,default:"Очистить фильтры"}},data:function(){return{format:{to:function(t){return Math.round(t)},from:function(t){return Number(t)}}}},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Q(Object(r),!0).forEach((function(e){J(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Q(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(H.c)(M,["filterSegments","routeSegments"]),{},Object(H.d)(M,["filters"]),{},Object(H.d)("route",{code:function(t){return t.params.code},brandCode:function(t){return t.params.brandCode}}),{accordionFilters:function(){return this.filters?this.filters.map((function(t){return{id:t.id,item:t,title:t.title,isExpanded:!0}})):[]},clearFilterUrl:function(){var t=this.code,e=this.brandCode;return e?{path:t?"/brand/".concat(e,"/").concat(t):"/brand/".concat(e)}:{path:t?"/catalog/".concat(t):"/catalog"}}}),methods:{onRadioChange:function(t,e){var r=this.routeSegments,n=this.code,a=this.brandCode;r.includes(e)||r.push(e),r=r.filter((function(t){return t===e}));var i=a?Object(k.b)(a,n,r):Object(k.c)(n,r);this.$router.replace({path:i})},onCheckChange:function(t,e){var r=this.routeSegments,n=this.code,a=this.brandCode;if(t){if(r.includes(e))return;r.push(e)}else{if(!r.includes(e))return;var i=r.indexOf(e);-1!==i&&r.splice(i,1)}var o=a?Object(k.b)(a,n,r):Object(k.c)(n,r);this.$router.replace({path:o})},onRangeChange:function(t,e){this.debounce_rangeChange(t,e)}},beforeMount:function(){var t=this;this.debounce_rangeChange=Y()((function(e,r){for(var n=t.routeSegments,a=t.brandCode,i=t.code,o="".concat(r,"-from_").concat(e[0],"_to_").concat(e[1]),c=new RegExp("^".concat(r,"-")),s=-1,l=0;l<n.length;l++)if(n[l].match(c)){s=l;break}if(-1!==s){if(n[s]===o)return;n.splice(s,1,o)}else n.push(o);var u=a?Object(k.b)(a,i,n):Object(k.c)(i,n);t.$router.replace({path:u})}),500)}},W=Object(q.a)(K,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.accordionFilters&&t.accordionFilters.length>0?r("div",{staticClass:"catalog-filter"},[r("v-accordion",{staticClass:"catalog-filter__filters",attrs:{"key-field":"id",items:t.accordionFilters,"item-expanded":function(t){return t.isExpanded},"item-toggled":function(t){return t.isExpanded=!t.isExpanded}},scopedSlots:t._u([{key:"content",fn:function(e){var n=e.item;return["range"===n.item.type?r("div",{staticClass:"catalog-filter__filters-range"},[r("v-range",{attrs:{initialValue:[n.item.min,n.item.max],value:t.filterSegments[n.item.name]||[n.item.min,n.item.max],max:n.item.max,min:n.item.min,format:t.format},on:{input:function(e){return t.onRangeChange(e,n.item.name)}}})],1):"check"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},t._l(n.item.items,(function(e){return r("v-check",{key:e.id,attrs:{id:n.item.name+"-"+e.id,name:n.item.name,checked:t.filterSegments[n.item.name]&&t.filterSegments[n.item.name][e.code]},on:{change:function(r){return t.onCheckChange(r,n.item.name+"-"+e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])})),1):"radio"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},t._l(n.item.items,(function(e){return r("v-check",{key:e.id,attrs:{id:n.item.name+"-"+e.id,type:"radio",name:n.item.name,checked:t.filterSegments[n.item.name]&&t.filterSegments[n.item.name][e.code]},on:{change:function(r){return t.onRadioChange(r,n.item.name+"-"+e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])})),1):t._e()]}}],null,!1,1429883620)}),t._v(" "),r("v-button",{staticClass:"btn--outline catalog-filter__clear-btn",attrs:{to:t.clearFilterUrl,replace:""}},[t._v("\n        "+t._s(t.btnText)+"\n    ")])],1):t._e()}),[],!1,null,null,null).exports,X=r("LqtR"),Z=r("jYNS"),tt=r("OvCi"),et=(r("hqjE"),{name:"catalog-banner-list-card",components:{VButton:i.a,VPicture:Z.a},props:{item:{type:Object,default:function(){return{}}}},computed:{img:function(){return Object(tt.a)(300,300,this.item.image.id,"webp")},defaultImg:function(){return Object(tt.a)(300,300,this.item.image.id,this.item.image.sourceExt)},isObject:function(){return this.item.image instanceof Object}}}),rt=Object(q.a)(et,(function(){var t=this.$createElement;return(this._self._c||t)("li",{staticClass:"catalog-banner-list-card"},[this._m(0),this._v(" "),this._m(1)])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-banner-list-card__img"},[t.item.image&&t.item.image.id?r("v-picture",[t.isObject?[r("source",{attrs:{"data-srcset":t.img,type:"image/webp",media:"(min-width: 1024px)"}}),t._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})]:[r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.item.image,alt:""}})]],2):t._e()],1)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-banner-list-card__panel"},[t.item.upperText?r("div",{staticClass:"catalog-banner-list-card__panel-upper-text"},[t._v("\n            "+t._s(t.item.upperText)+"\n        ")]):t._e(),t._v(" "),r("div",{staticClass:"catalog-banner-list-card__panel-title"},[t._v("\n            "+t._s(t.item.title)+"\n        ")]),t._v(" "),t.item.bottomText?r("div",{staticClass:"catalog-banner-list-card__panel-bottom-text"},[t._v("\n            "+t._s(t.item.bottomText)+"\n        ")]):t._e(),t._v(" "),t.item.btnText?r("v-button",{staticClass:"btn--outline catalog-banner-list-card__panel-btn"},[t._v("\n            "+t._s(t.item.btnText)+"\n        ")]):t._e()],1)}],!1,null,null,null).exports,nt=r("7cXU"),at=r("7bnD"),it=r("fB3W"),ot=(r("nhva"),r("CxEY"),r("iHux"),r("gB8C"),r("FIks"),{name:"catalog-product-list-card",components:{VSvg:a.a,VLink:nt.a,VButton:i.a,VRating:at.a,VPicture:Z.a,Tag:it.a},props:{item:{type:Object,default:function(){return{categoryCodes:[],tags:[]}}},isSmall:{type:Boolean,default:!1},showWishlistBtn:{type:Boolean,default:!0}},computed:{bigImg:function(){return Object(tt.a)(300,300,this.item.image.id,"webp")},smallImg:function(){return Object(tt.a)(200,200,this.item.image.id,"webp")},defaultImg:function(){return Object(tt.a)(200,200,this.item.image.id,this.item.image.sourceExt)},href:function(){return this.item.categoryCodes&&0!==this.item.categoryCodes.length?"/catalog/".concat(this.item.categoryCodes[this.item.categoryCodes.length-1],"/").concat(this.item.code):"/catalog"}},methods:{onBuyButtonClick:function(){this.$emit("addItem",{id:this.item.id,type:this.item.type})},onPreview:function(){this.$emit("preview",{id:this.item.id,type:this.item.type})}}}),ct=Object(q.a)(ot,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("router-link",{staticClass:"catalog-product-list-card",class:{"catalog-product-list-card--small":t.isSmall},attrs:{tag:"li",to:t.href}},[t._m(0),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t.showWishlistBtn?r("v-link",{staticClass:"catalog-product-list-card__wishlist-btn",attrs:{tag:"button"},on:{click:function(t){t.preventDefault()}}},[r("v-svg",{attrs:{name:"wishlist-middle",width:"24",height:"24"}})],1):t._e()],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__img"},[t.item.image&&t.item.image.id?r("v-picture",{attrs:{alt:""}},[r("source",{attrs:{"data-srcset":t.bigImg,type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),r("source",{attrs:{"data-srcset":t.smallImg,type:"image/webp",media:"(max-width: 479px)"}}),t._v(" "),r("img",{staticClass:"v-picture__img",attrs:{src:t.defaultImg,alt:""}})]):r("v-svg",{attrs:{id:"catalog-product-list-card-empty",name:"logo",width:"48",height:"48"}}),t._v(" "),r("div",{staticClass:"catalog-product-list-card__controls"},[r("v-button",{staticClass:"btn--outline catalog-product-list-card__controls-btn",on:{click:function(e){return e.preventDefault(),t.onBuyButtonClick(e)}}},[t._v("\n                Купить\n            ")]),t._v(" "),r("v-link",{staticClass:"catalog-product-list-card__controls-link",attrs:{tag:"button"},on:{click:function(e){return e.preventDefault(),t.onPreview(e)}}},[t._v("\n                Быстрый просмотр\n            ")])],1)],1)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__rating"},t._l(5,(function(e){return r("span",{key:e,staticClass:"catalog-product-list-card__rating-star",class:{"catalog-product-list-card__rating-star--empty":e>t.item.rating}})})),0)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__body"},[r("div",{staticClass:"catalog-product-list-card__prices"},[t.item.price?r("div",{staticClass:"text-bold catalog-product-list-card__price"},[t._v("\n                "+t._s(t.item.oldPrice?"от "+t.item.price:t.item.price)+"\n            ")]):t._e(),t._v(" "),t.item.oldPrice?r("div",{staticClass:"text-sm text-grey text-strike catalog-product-list-card__price"},[t._v("\n                от "+t._s(t.item.oldPrice)+"\n            ")]):t._e()]),t._v(" "),r("div",{staticClass:"link--sm catalog-product-list-card__link"},[t._v(t._s(t.item.name))]),t._v(" "),t._m(1)])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"catalog-product-list-card__tags"},this._l(this.item.tags,(function(t){return e("tag",{key:t,staticClass:"catalog-product-list-card__tags-item",attrs:{text:t}})})),1)}],!1,null,null,null).exports,st=r("/Qa0"),lt=r("Jtxo"),ut=r("55Sm"),dt=r("jDKC"),mt=r("AlLH");r("bhYy");function ft(t,e,r,n,a,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,a)}function gt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function pt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?gt(Object(r),!0).forEach((function(e){_t(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):gt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function _t(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var vt,bt,ht=0,Ct={name:"catalog-product-list",props:{animation:{type:Boolean,default:!0}},components:{CatalogBannerListCard:rt,CatalogProductListCard:ct},computed:pt({},Object(H.d)(M,["items"])),methods:pt({},Object(H.b)(ut.b,[dt.a]),{getComponent:function(t){switch(t){case mt.catalogItemTypes.PRODUCT:return ct.name;case mt.catalogItemTypes.BANNER:return rt.name}},getClass:function(t){return{"catalog-product-list__item--banner":t===mt.catalogItemTypes.BANNER}},onBeforeEnterItems:function(t){t.dataset.index=ht,ht+=1,t.style.opacity=0},itemAnimation:function(t,e){return new Promise((function(r,n){try{setTimeout((function(){requestAnimationFrame((function(){t.style.opacity=1,r()}))}),e)}catch(t){n(t)}}))},onEnterItems:(vt=regeneratorRuntime.mark((function t(e,r){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=100*e.dataset.index,t.next=3,this.itemAnimation(e,n);case 3:r();case 4:case"end":return t.stop()}}),t,this)})),bt=function(){var t=this,e=arguments;return new Promise((function(r,n){var a=vt.apply(t,e);function i(t){ft(a,r,n,i,o,"next",t)}function o(t){ft(a,r,n,i,o,"throw",t)}i(void 0)}))},function(t,e){return bt.apply(this,arguments)}),onAfterEnterItems:function(t){delete t.dataset.index,ht=0},onLeaveItems:function(t,e){requestAnimationFrame((function(){t.style.opacity=0,e()}))},onPreview:function(t){this[dt.a]({name:st.a,open:!0,state:{code:t}})},onAddToCart:function(t){this[dt.a]({name:lt.a,open:!0,state:{offerId:t.id,type:t.type}})}})},yt=Object(q.a)(Ct,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.animation?r("transition-group",{staticClass:"catalog-product-list",attrs:{tag:"ul",name:"catalog-item"},on:{"before-enter":t.onBeforeEnterItems,enter:t.onEnterItems,"after-enter":t.onAfterEnterItems,leave:t.onLeaveItems}},t._l(t.items,(function(e){return r(t.getComponent(e.type),{key:e.id,tag:"component",staticClass:"catalog-product-list__item",class:t.getClass(e.type),attrs:{item:e},on:{addItem:function(e){return t.onAddToCart(e)},preview:function(r){return t.onPreview(e.code)}}})})),1):r("ul",{staticClass:"catalog-product-list"},t._l(t.items,(function(e){return r(t.getComponent(e.type),{key:e.id,tag:"component",staticClass:"catalog-product-list__item",class:t.getClass(e.type),attrs:{item:e},on:{addItem:function(e){return t.onAddToCart(e)},preview:function(r){return t.onPreview(e.code)}}})})),1)}),[],!1,null,null,null).exports,Ot=r("8TZ/"),wt=r("0CxO"),Et=r("48TQ");r("4eDr"),r("9bRU");function Tt(t,e,r,n,a,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,a)}function jt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function St(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?jt(Object(r),!0).forEach((function(e){Pt(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):jt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function Pt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var xt,kt={name:"catalog",components:{VSvg:a.a,VButton:i.a,VSelect:l.a,VPagination:c.a,VSticky:u.a,VExpander:d.a,Modal:m.a,Breadcrumbs:f.a,BreadcrumbItem:g.a,FilterButton:p.a,TagItem:_.a,CategoryTreeItem:G,CatalogFilter:W,CatalogProductList:yt,CatalogBannerCard:X.a,AddToCartModal:lt.b,QuickViewModal:st.b},data:function(){var t=[{id:1,title:"Сначала подороже",field:"price",direction:"desc"},{id:2,title:"Сначала подешевле",field:"price",direction:"asc"}];return{sortValue:t[0],sortOptions:t,filterModal:!1,showMore:!1}},computed:St({},Object(H.c)(M,["activeTags","activeCategory","activePage","pagesCount","routeSegments","activeCategories"]),{},Object(H.d)(M,["items","banner","categories","brand"]),{},Object(H.d)(ut.b,{isQuickViewOpen:function(t){return t[ut.a][st.a]&&t[ut.a][st.a].open},isAddToCartOpen:function(t){return t[ut.a][lt.a]&&t[ut.a][lt.a].open}}),{},Object(H.d)("route",{code:function(t){return t.params.code},brandCode:function(t){return t.params.brandCode}}),{isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:{sortValue:function(t,e){t!==e&&this.$router.replace({path:this.$route.path,query:{orderField:t.field,orderDirection:t.direction}})}},methods:St({},Object(H.b)(M,["FETCH_ITEMS","FETCH_CATALOG_DATA","SET_LOAD_PATH"]),{},Object(H.b)(Ot.c,[wt.a]),{},Object(H.b)(ut.b,[dt.a]),{generateBreadcrumbUrl:function(t){var e=this.brandCode;return{path:Object(k.d)(e,t)}},setSortValue:function(t,e){this.sortValue=this.sortOptions.find((function(r){return r.field===t&&r.direction===e}))||this.sortOptions[0]},onClickDeleteTag:function(t){var e=this.routeSegments,r=this.code,n=this.brandCode;if(e.includes(t)){var a=e.indexOf(t);-1!==a&&e.splice(a,1);var i=n?Object(k.b)(n,r,e):Object(k.c)(r,e);this.$router.replace({path:i})}},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:St({},this.$route.query,{page:this.activePage+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:St({},this.$route.query,{page:t})})},fetchCatalog:(xt=function(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var i=t.apply(e,r);function o(t){Tt(i,n,a,o,c,"next",t)}function c(t){Tt(i,n,a,o,c,"throw",t)}o(void 0)}))}}(regeneratorRuntime.mark((function t(e,r,n){var a,i,o,c,s,l,u,d,m,f,g,p,_,b,h,C,y,O,w=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,a=e.params,i=a.code,o=a.brandCode,c=a.pathMatch,s=e.query,l=(s=void 0===s?{page:1,orderField:"price",orderDirection:"desc"}:s).page,u=void 0===l?1:l,d=s.orderField,m=void 0===d?"price":d,f=s.orderDirection,g=void 0===f?"desc":f,p=r.params,_=p.code,b=p.brandCode,h=r.query,C=(h=void 0===h?{page:1}:h).page,y=void 0===C?1:C,O=Object(k.a)(c,i,o),this.$progress.start(),i!==_||b!==o){t.next=15;break}return t.next=13,this.FETCH_ITEMS({filter:O,orderField:m,orderDirection:g,page:u,showMore:n});case 13:t.next=17;break;case 15:return t.next=17,this.FETCH_CATALOG_DATA({brandCode:o,filter:O,orderField:m,orderDirection:g,page:u});case 17:this.setSortValue(m,g),this.$progress.finish(),n||u===y||window.scrollTo({top:mt.MIN_SCROLL_VALUE+1,behavior:"smooth"}),n&&setTimeout((function(){return w.showMore=!1}),200),t.next=29;break;case 23:t.prev=23,t.t0=t.catch(0),this.$progress.fail(),v.$logger.error("debounce_fetchCatalog",t.t0),this.$router.replace({name:"404"}),this.$progress.finish();case 29:case"end":return t.stop()}}),t,this,[[0,23]])}))),function(t,e,r){return xt.apply(this,arguments)})}),beforeRouteEnter:function(t,e,r){var n=t.fullPath,a=t.params,i=a.code,o=a.brandCode,c=a.pathMatch,s=t.query,l=(s=void 0===s?{page:1,orderField:"price",orderDirection:"desc"}:s).page,u=void 0===l?1:l,d=s.orderField,m=void 0===d?"price":d,f=s.orderDirection,g=void 0===f?"desc":f,p=e.params;p.code,p.brandCode;Object(Et.a)(v.$store,M,B);var _=v.$store.state[M],b=_.loadPath,h=_.brandCode,C=_.categoryCode;if(b===n&&i===C&&o===h)r();else{var y=Object(k.a)(c,i,o),O=null;O=i===C&&o===h?"".concat(M,"/").concat("FETCH_ITEMS"):"".concat(M,"/").concat("FETCH_CATALOG_DATA"),v.$progress.start(),v.$store.dispatch(O,{brandCode:o,filter:y,page:u,orderField:m,orderDirection:g}).then((function(){v.$store.dispatch("".concat(M,"/").concat("SET_LOAD_PATH"),n),r((function(t){t.setSortValue(m,g),v.$progress.finish()}))})).catch((function(t){v.$progress.fail(),v.$logger.error(t),r({name:"404",replace:!0}),v.$progress.finish()}))}},beforeRouteUpdate:function(t,e,r){this.showMore?this.fetchCatalog(t,e,this.showMore):this.debounce_fetchCatalog(t,e),r()},beforeMount:function(){this.debounce_fetchCatalog=Y()(this.fetchCatalog,500)}},At=Object(q.a)(kt,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section catalog-view"},[r("div",{staticClass:"container catalog-view__header"},[r("breadcrumbs",{staticClass:"catalog-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t._v("\n                Главная\n            ")]),t._v(" "),r("breadcrumb-item",{key:"catalog",attrs:{to:{path:t.brandCode?"/brands":"/catalog"}}},[t._v("\n                "+t._s(t.brandCode?"Бренды":"Каталог")+"\n            ")]),t._v(" "),t.brandCode?r("breadcrumb-item",{key:t.brandCode,attrs:{to:t.generateBreadcrumbUrl(null)}},[t._v("\n                "+t._s(t.brand&&t.brand.name)+"\n            ")]):t._e(),t._v(" "),t._l(t.activeCategories,(function(e){return r("breadcrumb-item",{key:e.id,attrs:{to:t.generateBreadcrumbUrl(e.code)}},[t._v("\n                "+t._s(e.name)+"\n            ")])}))],2),t._v(" "),t.brandCode&&t.brand?r("catalog-banner-card",{staticClass:"catalog-view__brand",attrs:{"banner-id":t.brand.id,"bottom-text":t.brand.description,title:t.brand.name,image:t.brand.image}}):r("catalog-banner-card",{staticClass:"catalog-view__banner",attrs:{"banner-id":t.banner.id,image:t.banner.image,"upper-text":t.banner.upperText,"bottom-text":t.banner.bottomText,title:t.banner.title,"btn-text":t.banner.btnText}})],1),t._v(" "),r("section",{staticClass:"section"},[r("div",{staticClass:"container catalog-view__grid"},[t.isTabletLg?t._e():r("div",{staticClass:"catalog-view__side-panel"},[r("ul",{staticClass:"catalog-view__side-panel-categories"},t._l(t.categories,(function(t){return r("category-tree-item",{key:t.id,staticClass:"catalog-view__side-panel-categories-item",attrs:{item:t}})})),1),t._v(" "),r("catalog-filter",{staticClass:"catalog-view__side-panel-filters"})],1),t._v(" "),r("div",{staticClass:"catalog-view__main"},[r("div",{staticClass:"catalog-view__main-header"},[r("div",{staticClass:"catalog-view__main-header-title"},[r("h1",{staticClass:"catalog-view__main-header-hl"},[t._v("\n                            "+t._s(t.activeCategory?t.activeCategory.name:"Все категории")+"\n                        ")]),t._v(" "),r("p",{staticClass:"text-grey catalog-view__main-header-text"},[t._v("489 продуктов")])]),t._v(" "),r("v-select",{staticClass:"catalog-view__main-header-sort",attrs:{label:"title","track-by":"id",options:t.sortOptions,searchable:!1,"allow-empty":!1,"show-labels":!1},model:{value:t.sortValue,callback:function(e){t.sortValue=e},expression:"sortValue"}}),t._v(" "),r("filter-button",{staticClass:"catalog-view__main-header-btn",on:{click:function(e){t.filterModal=!t.filterModal}}},[t._v("\n                        Фильтр и сортировка  \n                        "),r("span",{staticClass:"text-grey"},[t._v(t._s(t.activeTags.length))])])],1),t._v(" "),t.isTabletLg?t._e():r("transition-group",{staticClass:"catalog-view__main-tags",attrs:{tag:"ul",name:"tag-item"}},t._l(t.activeTags,(function(e,n){return r("tag-item",{key:e.code,attrs:{"data-index":n,text:e.name},on:{delete:function(r){return t.onClickDeleteTag(e.segment)}}})})),1),t._v(" "),r("catalog-product-list",{staticClass:"catalog-view__main-grid",attrs:{animation:!t.isTablet}}),t._v(" "),t.pagesCount>1?r("div",{staticClass:"catalog-view__main-controls"},[t.activePage<t.pagesCount?r("v-button",{staticClass:"btn--outline catalog-view__main-controls-btn",attrs:{disabled:t.showMore},on:{click:t.onShowMore}},[t._v("\n                        Показать ещё\n                    ")]):t._e(),t._v(" "),r("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e()],1)])]),t._v(" "),r("transition",{attrs:{name:"fade-in"}},[t.filterModal&&t.isTabletLg?r("modal",{staticClass:"catalog-view__modal-filter",attrs:{"show-close-btn":!1,type:"fullscreen"},scopedSlots:t._u([{key:"body",fn:function(){return[r("v-sticky",{staticClass:"catalog-view__modal-filter-sticky",scopedSlots:t._u([{key:"sticky",fn:function(){return[r("div",{staticClass:"catalog-view__modal-filter-header"},[r("button",{staticClass:"catalog-view__modal-filter-header-btn",on:{click:function(e){t.filterModal=!1}}},[r("v-svg",{attrs:{name:"cross-small",width:"14",height:"14"}}),t._v("Фильтр\n                            ")],1)])]},proxy:!0}],null,!1,219555529)},[t._v(" "),r("div",{staticClass:"catalog-view__modal-filter-sort"},[r("div",{staticClass:"catalog-view__modal-filter-sort-title"},[t._v("Сортировка")]),t._v(" "),r("ul",{staticClass:"catalog-view__modal-filter-sort-list"},t._l(t.sortOptions,(function(e){return r("li",{key:e.title,staticClass:"catalog-view__modal-filter-sort-item",class:{"catalog-view__modal-filter-sort-item--active":e===t.sortValue}},[r("button",{staticClass:"catalog-view__modal-filter-sort-btn",on:{click:function(r){t.sortValue=e}}},[t._v("\n                                    "+t._s(e.title)+"\n                                ")])])})),0)]),t._v(" "),r("catalog-filter",{staticClass:"catalog-view__modal-filter-panel"})],1)]},proxy:!0}],null,!1,2324292678)}):t._e()],1),t._v(" "),r("section",{staticClass:"section catalog-view__section catalog-view__seo"},[r("div",{staticClass:"container catalog-view__seo-container"},[r("h2",{staticClass:"catalog-view__section-hl catalog-view__seo-hl"},[t._v("Блок SEO текста")]),t._v(" "),r("v-expander",{staticClass:"catalog-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:t._u([{key:"btn",fn:function(e){var r=e.isExpanded;return[t._v("\n                    "+t._s(r?"Скрыть":"Показать больше")+"\n                ")]}}])},[t._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)]),t._v(" "),r("transition",{attrs:{name:"fade-in"}},[t.isQuickViewOpen&&!t.isTabletLg?r("quick-view-modal"):t.isAddToCartOpen?r("add-to-cart-modal"):t._e()],1)],1)}),[],!1,null,null,null);e.default=At.exports},"9bRU":function(t,e,r){},FIks:function(t,e,r){},Xtz6:function(t,e,r){},bhYy:function(t,e,r){},hqjE:function(t,e,r){},x3SC:function(t,e,r){}}]);