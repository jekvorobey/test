(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{"/Rcj":function(t,e,r){"use strict";r.r(e);var n,a=r("NDiG"),i=r("i2Ud"),o=r("o3vK"),c=r("+gqB"),s=r("nuHk"),u=r("pFko"),l=r("ze5i"),d=r("wo+G"),p=r("2/Mz"),m=r("obii"),f=r("zfPd"),g=r("KLyl"),v=r("tHOl"),_=r("BZIu"),b=r("oxRU"),h=r("48TQ"),y=r("Nlzp");function C(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function O(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var T,w=(C(n={},"SET_LOAD_PATH",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t.loadPath=e})),C(n,"SET_BANNER",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.banner=e})),C(n,"SET_ITEMS_MORE",(function(t,e){var r,n=e.items,a=e.range;(r=t.items).push.apply(r,O(n)),t.range=a||0})),C(n,"SET_ITEMS",(function(t,e){var r=e.items,n=e.range;t.items=r,t.range=n||0})),C(n,"SET_CATEGORY_CODE",(function(t,e){t.categoryCode=e})),C(n,"SET_CATEGORIES",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.categories=e})),C(n,"SET_FILTERS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.filters=e})),C(n,"SET_PRODUCT_GROUP",(function(t,e){t.productGroup=e})),C(n,"SET_TYPE",(function(t,e){t.type=e})),C(n,"SET_ENTITY_CODE",(function(t,e){t.entityCode=e})),n);function E(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function j(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?E(Object(r),!0).forEach((function(e){P(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function P(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function x(t,e,r,n,a,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,a)}function S(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var i=t.apply(e,r);function o(t){x(i,n,a,o,c,"next",t)}function c(t){x(i,n,a,o,c,"throw",t)}o(void 0)}))}}var k,R=(P(T={},"SET_LOAD_PATH",(function(t,e){(0,t.commit)("SET_LOAD_PATH",e)})),P(T,"FETCH_BANNER",(function(t,e){var r=t.commit;return S(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(y.m)();case 3:e=t.sent,r("SET_BANNER",e[6]),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),Object(h.b)("FETCH_BANNER",!0)(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()})),P(T,"FETCH_CATEGORIES",(function(t,e){var r=t.commit;return S(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(y.q)(e);case 3:n=t.sent,r("SET_CATEGORIES",n),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),Object(h.b)("FETCH_CATEGORIES",!0)(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()})),P(T,"FETCH_FILTERS",(function(t,e){var r=t.commit;return S(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(y.s)(e);case 3:n=t.sent,r("SET_FILTERS",n),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),Object(h.b)("FETCH_FILTERS",!0)(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()})),P(T,"FETCH_ITEMS",(function(t,e){var r=t.commit,n=t.state;return S(regeneratorRuntime.mark((function t(){var a,i,o,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=n.productGroup||{},i=a.filters,o=j({},e.filter,{},i),t.next=5,Object(y.p)(j({},e,{filter:o}));case 5:c=t.sent,e.showMore?r("SET_ITEMS_MORE",c):r("SET_ITEMS",c),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),Object(h.b)("FETCH_ITEMS",!0)(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()})),P(T,"FETCH_PRODUCT_GROUP",(function(t,e){var r=t.commit,n=e.type,a=e.entityCode;return S(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(y.x)(n,a);case 3:return e=t.sent,r("SET_PRODUCT_GROUP",e),t.abrupt("return",e);case 8:t.prev=8,t.t0=t.catch(0),Object(h.b)("FETCH_PRODUCT_GROUP",!0)(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()})),P(T,"FETCH_PRODUCT_GROUP_DATA",(function(t){var e=t.dispatch,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return S(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e("FETCH_PRODUCT_GROUP",{type:r.type,entityCode:r.entityCode});case 3:return t.next=5,Promise.all([e("FETCH_CATEGORIES",r),e("FETCH_FILTERS",r.filter.category)]);case 5:return t.abrupt("return",e("FETCH_ITEMS",r));case 8:t.prev=8,t.t0=t.catch(0),Object(h.b)("FETCH_PRODUCT_GROUP_DATA")(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()})),P(T,"FETCH_CATALOG_DATA",(function(t){var e=t.dispatch,r=t.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return S(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Promise.all([e("FETCH_BANNER",n),e("FETCH_CATEGORIES",n),e("FETCH_FILTERS",n.filter.category)]);case 3:return r("SET_PRODUCT_GROUP",null),t.abrupt("return",e("FETCH_ITEMS",n));case 7:t.prev=7,t.t0=t.catch(0),Object(h.b)("FETCH_CATALOG_DATA")(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()})),P(T,"FETCH_DATA_BY_TYPE",(function(t){var e=t.dispatch,r=t.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{type:b.productGroupTypes.CATALOG};return S(regeneratorRuntime.mark((function t(){var a,i,o,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=n.type,i=n.entityCode,n.code,o=n.filter,c=null,t.t0=n.type,t.next=t.t0===b.productGroupTypes.CATALOG?5:t.t0===b.productGroupTypes.BRANDS?7:t.t0===b.productGroupTypes.PROMO?7:t.t0===b.productGroupTypes.SETS?7:9;break;case 5:return c="FETCH_CATALOG_DATA",t.abrupt("break",10);case 7:return c="FETCH_PRODUCT_GROUP_DATA",t.abrupt("break",10);case 9:return t.abrupt("return",Promise.reject(new Error("Wrong catalog type ".concat(n.type))));case 10:return t.abrupt("return",e(c,n).then((function(){r("SET_TYPE",a),r("SET_CATEGORY_CODE",o.category),r("SET_ENTITY_CODE",i)})));case 11:case"end":return t.stop()}}),t)})))()})),T),A=r("W6hq");function D(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function F(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?D(Object(r),!0).forEach((function(e){I(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function I(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var M,G=(I(k={},"activeCategories",(function(t,e,r){for(var n=t.categories,a=r.route.params.code,i=[],o=null,c=0;c<n.length;c++){var s=n[c];if(o=Object(A.d)(a,s,i)){i.unshift(o);break}}return i})),I(k,"activePage",(function(t,e,r){var n=r.route;return n.query.page?Number(n.query.page):1})),I(k,"pagesCount",(function(t){return Math.ceil(t.range/12)})),I(k,"activeCategory",(function(t,e){var r=e.activeCategories;return r[r.length-1]})),I(k,"routeSegments",(function(t,e,r){var n=r.route.params.pathMatch;return n?n.split("/"):[]})),I(k,"filterSegments",(function(t,e){var r=e.routeSegments;return Object(A.e)(r)})),I(k,"activeTags",(function(t,e){for(var r=[],n=t.filters.filter((function(t){return"range"!==t.type})),a=e.filterSegments,i=0;i<n.length;i++)for(var o=n[i],c=0;c<o.items.length;c++){var s=o.items[c];a[o.name]&&a[o.name][s.code]&&r.push(F({},s,{segment:"".concat(o.name,"-").concat(s.code)}))}return r})),k);function H(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var $="catalog",B={name:$,namespaced:!0,state:(M={},H(M,"loadPath",""),H(M,"productGroup",null),H(M,"entityCode",null),H(M,"type",null),H(M,"banner",{}),H(M,"categoryId",null),H(M,"categoryCode",null),H(M,"categories",[]),H(M,"items",[]),H(M,"range",0),H(M,"filters",[]),M),actions:R,mutations:w,getters:G},L=r("L2JU");r("x3SC");function U(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function V(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var N={name:"category-tree-item",components:{},props:{item:{type:Object,required:!0},depth:{type:Number,default:0}},data:function(){return{isHover:!1}},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?U(Object(r),!0).forEach((function(e){V(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(L.c)($,["activeCategories"]),{},Object(L.d)("route",{type:function(t){return t.params.type},entityCode:function(t){return t.params.entityCode}}),{isActive:function(){return this.activeCategories.includes(this.item)},url:function(){var t=this.entityCode,e=this.type,r=this.item.code;return{path:Object(A.c)(e,t,r)}},hasChildren:function(){this.entityCode,this.type,this.item.items;return Array.isArray(this.item.items)}}),methods:{onMouseOver:function(t){this.isHover=t}}},q=r("KHd+"),Y=Object(q.a)(N,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"category-tree-item",class:[{"category-tree-item--root":0===t.depth},{"category-tree-item--active":t.isActive}],on:{mouseover:function(e){return t.onMouseOver(!0)},mouseleave:function(e){return t.onMouseOver(!1)}}},[r("div",{staticClass:"category-tree-item__label"},[void 0!==t.item.code?r("router-link",{staticClass:"category-tree-item__link",attrs:{to:t.url,exact:""===t.item.code}},[t._v("\n            "+t._s(t.item.name)+"\n        ")]):r("span",{staticClass:"category-tree-item__link"},[t._v("\n            "+t._s(t.item.name)+"\n        ")])],1),t._v(" "),r("transition",{attrs:{name:"slide-right"}},[t.hasChildren&&(t.isHover||t.isActive)?r("ul",{staticClass:"category-tree-item__list"},t._l(t.item.items,(function(e,n){return r("category-tree-item",{key:e.id||n,staticClass:"category-tree-item__item",attrs:{item:e,depth:t.depth+1}})})),1):t._e()])],1)}),[],!1,null,null,null).exports,z=r("MhNv"),Q=r("sEfC"),W=r.n(Q);r("Xtz6");function J(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function K(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var X={name:"catalog-filter",components:{VButton:i.a,VCheck:o.a,VRange:s.a,VAccordion:z.a},props:{btnText:{type:String,default:"Очистить фильтры"}},data:function(){return{format:{to:function(t){return Math.round(t)},from:function(t){return Number(t)}}}},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?J(Object(r),!0).forEach((function(e){K(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):J(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(L.c)($,["filterSegments","routeSegments"]),{},Object(L.d)($,["filters"]),{},Object(L.d)("route",{type:function(t){return t.params.type},code:function(t){return t.params.code},entityCode:function(t){return t.params.entityCode}}),{accordionFilters:function(){return this.filters?this.filters.map((function(t){return{id:t.id,item:t,title:t.title,isExpanded:!0}})):[]},clearFilterUrl:function(){var t=this.type,e=this.entityCode,r=this.code;return Object(A.c)(t,e,r)}}),methods:{onRadioChange:function(t,e){var r=this.type,n=this.entityCode,a=this.code,i=this.routeSegments;i.includes(e)||i.push(e),function(t){throw new Error('"'+t+'" is read-only')}("routeSegments"),i=i.filter((function(t){return t===e}));var o=Object(A.b)(r,n,a,i);this.$router.replace({path:o})},onCheckChange:function(t,e){var r=this.type,n=this.entityCode,a=this.code,i=this.routeSegments;if(t){if(i.includes(e))return;i.push(e)}else{if(!i.includes(e))return;var o=i.indexOf(e);-1!==o&&i.splice(o,1)}var c=Object(A.b)(r,n,a,i);this.$router.replace({path:c})},onRangeChange:function(t,e){this.debounce_rangeChange(t,e)}},beforeMount:function(){var t=this;this.debounce_rangeChange=W()((function(e,r){for(var n=t.type,a=t.entityCode,i=t.code,o=t.routeSegments,c="".concat(r,"-from_").concat(e[0],"_to_").concat(e[1]),s=new RegExp("^".concat(r,"-")),u=-1,l=0;l<o.length;l++)if(o[l].match(s)){u=l;break}if(-1!==u){if(o[u]===c)return;o.splice(u,1,c)}else o.push(c);var d=Object(A.b)(n,a,i,o);t.$router.replace({path:d})}),500)}},Z=Object(q.a)(X,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.accordionFilters&&t.accordionFilters.length>0?r("div",{staticClass:"catalog-filter"},[r("v-accordion",{staticClass:"catalog-filter__filters",attrs:{"key-field":"id",items:t.accordionFilters,"item-expanded":function(t){return t.isExpanded},"item-toggled":function(t){return t.isExpanded=!t.isExpanded}},scopedSlots:t._u([{key:"content",fn:function(e){var n=e.item;return["range"===n.item.type?r("div",{staticClass:"catalog-filter__filters-range"},[r("v-range",{attrs:{initialValue:[n.item.min,n.item.max],value:t.filterSegments[n.item.name]||[n.item.min,n.item.max],max:n.item.max,min:n.item.min,format:t.format},on:{input:function(e){return t.onRangeChange(e,n.item.name)}}})],1):"check"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},t._l(n.item.items,(function(e){return r("v-check",{key:e.id,attrs:{id:n.item.name+"-"+e.id,name:n.item.name,checked:t.filterSegments[n.item.name]&&t.filterSegments[n.item.name][e.code]},on:{change:function(r){return t.onCheckChange(r,n.item.name+"-"+e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])})),1):"radio"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},t._l(n.item.items,(function(e){return r("v-check",{key:e.id,attrs:{id:n.item.name+"-"+e.id,type:"radio",name:n.item.name,checked:t.filterSegments[n.item.name]&&t.filterSegments[n.item.name][e.code]},on:{change:function(r){return t.onRadioChange(r,n.item.name+"-"+e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])})),1):t._e()]}}],null,!1,1429883620)}),t._v(" "),r("v-button",{staticClass:"btn--outline catalog-filter__clear-btn",attrs:{to:t.clearFilterUrl,replace:""}},[t._v("\n        "+t._s(t.btnText)+"\n    ")])],1):t._e()}),[],!1,null,null,null).exports,tt=r("LqtR"),et=r("jYNS"),rt=r("OvCi"),nt=(r("hqjE"),{name:"catalog-banner-list-card",components:{VButton:i.a,VPicture:et.a},props:{item:{type:Object,default:function(){return{}}}},computed:{img:function(){return Object(rt.a)(300,300,this.item.image.id,"webp")},defaultImg:function(){return Object(rt.a)(300,300,this.item.image.id,this.item.image.sourceExt)},isObject:function(){return this.item.image instanceof Object}}}),at=Object(q.a)(nt,(function(){var t=this.$createElement;return(this._self._c||t)("li",{staticClass:"catalog-banner-list-card"},[this._m(0),this._v(" "),this._m(1)])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-banner-list-card__img"},[t.item.image&&t.item.image.id?r("v-picture",[t.isObject?[r("source",{attrs:{"data-srcset":t.img,type:"image/webp",media:"(min-width: 1024px)"}}),t._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})]:[r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.item.image,alt:""}})]],2):t._e()],1)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-banner-list-card__panel"},[t.item.upperText?r("div",{staticClass:"catalog-banner-list-card__panel-upper-text"},[t._v("\n            "+t._s(t.item.upperText)+"\n        ")]):t._e(),t._v(" "),r("div",{staticClass:"catalog-banner-list-card__panel-title"},[t._v("\n            "+t._s(t.item.title)+"\n        ")]),t._v(" "),t.item.bottomText?r("div",{staticClass:"catalog-banner-list-card__panel-bottom-text"},[t._v("\n            "+t._s(t.item.bottomText)+"\n        ")]):t._e(),t._v(" "),t.item.btnText?r("v-button",{staticClass:"btn--outline catalog-banner-list-card__panel-btn"},[t._v("\n            "+t._s(t.item.btnText)+"\n        ")]):t._e()],1)}],!1,null,null,null).exports,it=r("7cXU"),ot=r("7bnD"),ct=r("fB3W"),st=(r("nhva"),r("CxEY"),r("iHux"),r("gB8C"),r("FIks"),{name:"catalog-product-list-card",components:{VSvg:a.a,VLink:it.a,VButton:i.a,VRating:ot.a,VPicture:et.a,Tag:ct.a},props:{item:{type:Object,default:function(){return{categoryCodes:[],tags:[]}}},isSmall:{type:Boolean,default:!1},showWishlistBtn:{type:Boolean,default:!0}},computed:{bigImg:function(){return Object(rt.a)(300,300,this.item.image.id,"webp")},smallImg:function(){return Object(rt.a)(200,200,this.item.image.id,"webp")},defaultImg:function(){return Object(rt.a)(200,200,this.item.image.id,this.item.image.sourceExt)},href:function(){return this.item.categoryCodes&&0!==this.item.categoryCodes.length?"/catalog/".concat(this.item.categoryCodes[this.item.categoryCodes.length-1],"/").concat(this.item.code):"/catalog"}},methods:{onBuyButtonClick:function(){this.$emit("addItem",{id:this.item.id,type:this.item.type})},onPreview:function(){this.$emit("preview",{id:this.item.id,type:this.item.type})}}}),ut=Object(q.a)(st,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("router-link",{staticClass:"catalog-product-list-card",class:{"catalog-product-list-card--small":t.isSmall},attrs:{tag:"li",to:t.href}},[t._m(0),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t.showWishlistBtn?r("v-link",{staticClass:"catalog-product-list-card__wishlist-btn",attrs:{tag:"button"},on:{click:function(t){t.preventDefault()}}},[r("v-svg",{attrs:{name:"wishlist-middle",width:"24",height:"24"}})],1):t._e()],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__img"},[t.item.image&&t.item.image.id?r("v-picture",{attrs:{alt:""}},[r("source",{attrs:{"data-srcset":t.bigImg,type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),r("source",{attrs:{"data-srcset":t.smallImg,type:"image/webp",media:"(max-width: 479px)"}}),t._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})]):r("v-svg",{attrs:{id:"catalog-product-list-card-empty",name:"logo",width:"48",height:"48"}}),t._v(" "),r("div",{staticClass:"catalog-product-list-card__controls"},[r("v-button",{staticClass:"btn--outline catalog-product-list-card__controls-btn",on:{click:function(e){return e.preventDefault(),t.onBuyButtonClick(e)}}},[t._v("\n                Купить\n            ")]),t._v(" "),r("v-link",{staticClass:"catalog-product-list-card__controls-link",attrs:{tag:"button"},on:{click:function(e){return e.preventDefault(),t.onPreview(e)}}},[t._v("\n                Быстрый просмотр\n            ")])],1)],1)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__rating"},t._l(5,(function(e){return r("span",{key:e,staticClass:"catalog-product-list-card__rating-star",class:{"catalog-product-list-card__rating-star--empty":e>t.item.rating}})})),0)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__body"},[r("div",{staticClass:"catalog-product-list-card__prices"},[t.item.price?r("div",{staticClass:"text-bold catalog-product-list-card__price"},[t._v("\n                "+t._s(t.item.oldPrice?"от "+t.item.price:t.item.price)+"\n            ")]):t._e(),t._v(" "),t.item.oldPrice?r("div",{staticClass:"text-sm text-grey text-strike catalog-product-list-card__price"},[t._v("\n                от "+t._s(t.item.oldPrice)+"\n            ")]):t._e()]),t._v(" "),r("div",{staticClass:"link--sm catalog-product-list-card__link"},[t._v(t._s(t.item.name))]),t._v(" "),t._m(1)])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"catalog-product-list-card__tags"},this._l(this.item.tags,(function(t){return e("tag",{key:t,staticClass:"catalog-product-list-card__tags-item",attrs:{text:t}})})),1)}],!1,null,null,null).exports,lt=r("/Qa0"),dt=r("Jtxo"),pt=r("55Sm"),mt=r("jDKC");r("bhYy");function ft(t,e,r,n,a,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,a)}function gt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function vt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?gt(Object(r),!0).forEach((function(e){_t(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):gt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function _t(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var bt=0,ht={name:"catalog-product-list",props:{animation:{type:Boolean,default:!0}},components:{CatalogBannerListCard:at,CatalogProductListCard:ut},computed:vt({},Object(L.d)($,["items"])),methods:vt({},Object(L.b)(pt.b,[mt.a]),{getComponent:function(t){switch(t){case b.catalogItemTypes.PRODUCT:return ut.name;case b.catalogItemTypes.BANNER:return at.name}},getClass:function(t){return{"catalog-product-list__item--banner":t===b.catalogItemTypes.BANNER}},onBeforeEnterItems:function(t){t.dataset.index=bt,bt+=1,t.style.opacity=0},itemAnimation:function(t,e){return new Promise((function(r,n){try{setTimeout((function(){requestAnimationFrame((function(){t.style.opacity=1,r()}))}),e)}catch(t){n(t)}}))},onEnterItems:function(t,e){var r,n=this;return(r=regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a=100*t.dataset.index,r.next=3,n.itemAnimation(t,a);case 3:e();case 4:case"end":return r.stop()}}),r)})),function(){var t=this,e=arguments;return new Promise((function(n,a){var i=r.apply(t,e);function o(t){ft(i,n,a,o,c,"next",t)}function c(t){ft(i,n,a,o,c,"throw",t)}o(void 0)}))})()},onAfterEnterItems:function(t){delete t.dataset.index,bt=0},onLeaveItems:function(t,e){requestAnimationFrame((function(){t.style.opacity=0,e()}))},onPreview:function(t){this[mt.a]({name:lt.a,open:!0,state:{code:t}})},onAddToCart:function(t){this[mt.a]({name:dt.a,open:!0,state:{offerId:t.id,type:t.type}})}})},yt=Object(q.a)(ht,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.animation?r("transition-group",{staticClass:"catalog-product-list",attrs:{tag:"ul",name:"catalog-item"},on:{"before-enter":t.onBeforeEnterItems,enter:t.onEnterItems,"after-enter":t.onAfterEnterItems,leave:t.onLeaveItems}},t._l(t.items,(function(e){return r(t.getComponent(e.type),{key:e.id,tag:"component",staticClass:"catalog-product-list__item",class:t.getClass(e.type),attrs:{item:e},on:{addItem:function(e){return t.onAddToCart(e)},preview:function(r){return t.onPreview(e.code)}}})})),1):r("ul",{staticClass:"catalog-product-list"},t._l(t.items,(function(e){return r(t.getComponent(e.type),{key:e.id,tag:"component",staticClass:"catalog-product-list__item",class:t.getClass(e.type),attrs:{item:e},on:{addItem:function(e){return t.onAddToCart(e)},preview:function(r){return t.onPreview(e.code)}}})})),1)}),[],!1,null,null,null).exports,Ct=r("8TZ/"),Ot=r("0CxO"),Tt=r("AlLH");r("4eDr"),r("9bRU");function wt(t,e,r,n,a,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,a)}function Et(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function jt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Et(Object(r),!0).forEach((function(e){Pt(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Et(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function Pt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var xt={name:"catalog",components:{VSvg:a.a,VButton:i.a,VSelect:u.a,VPagination:c.a,VSticky:l.a,VExpander:d.a,Modal:p.a,Breadcrumbs:m.a,BreadcrumbItem:f.a,FilterButton:g.a,TagItem:v.a,CategoryTreeItem:Y,CatalogFilter:Z,CatalogProductList:yt,CatalogBannerCard:tt.a,AddToCartModal:dt.b,QuickViewModal:lt.b},data:function(){var t=[{id:1,title:"Сначала подороже",field:"price",direction:"desc"},{id:2,title:"Сначала подешевле",field:"price",direction:"asc"}];return{sortValue:t[0],sortOptions:t,filterModal:!1,showMore:!1}},computed:jt({},Object(L.c)($,["activeTags","activeCategory","activePage","pagesCount","routeSegments","activeCategories"]),{},Object(L.d)($,["items","banner","categories","productGroup"]),{},Object(L.d)(pt.b,{isQuickViewOpen:function(t){return t[pt.a][lt.a]&&t[pt.a][lt.a].open},isAddToCartOpen:function(t){return t[pt.a][dt.a]&&t[pt.a][dt.a].open}}),{},Object(L.d)("route",{type:function(t){return t.params.type},code:function(t){return t.params.code},entityCode:function(t){return t.params.entityCode}}),{breadcrumbRootUrl:function(){var t=this.type;return{name:t===b.productGroupTypes.CATALOG?"Catalog":"ProductGroups",params:{type:t}}},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:{sortValue:function(t,e){t!==e&&this.$router.replace({path:this.$route.path,query:{orderField:t.field,orderDirection:t.direction}})}},methods:jt({},Object(L.b)($,["FETCH_ITEMS","FETCH_DATA_BY_TYPE","SET_LOAD_PATH"]),{},Object(L.b)(Ct.c,[Ot.a]),{},Object(L.b)(pt.b,[mt.a]),{generateBreadcrumbUrl:function(t){var e=this.type,r=this.entityCode;return{path:Object(A.c)(e,r,t)}},setSortValue:function(t,e){this.sortValue=this.sortOptions.find((function(r){return r.field===t&&r.direction===e}))||this.sortOptions[0]},onClickDeleteTag:function(t){var e=this.type,r=this.code,n=this.entityCode,a=this.routeSegments;if(a.includes(t)){var i=a.indexOf(t);-1!==i&&a.splice(i,1);var o=Object(A.b)(e,n,r,a);this.$router.replace({path:o})}},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:jt({},this.$route.query,{page:this.activePage+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:jt({},this.$route.query,{page:t})})},fetchCatalog:function(t,e,r){var n,a=this;return(n=regeneratorRuntime.mark((function n(){var i,o,c,s,u,l,d,p,m,f,g,v,b,h,y,C,O,T,w,E;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,i=t.params,o=i.code,c=i.entityCode,s=i.type,u=i.pathMatch,l=t.query,d=(l=void 0===l?{page:1,orderField:"price",orderDirection:"desc"}:l).page,p=void 0===d?1:d,m=l.orderField,f=void 0===m?"price":m,g=l.orderDirection,v=void 0===g?"desc":g,b=e.params,h=b.code,y=b.entityCode,C=b.type,O=e.query,T=(O=void 0===O?{page:1}:O).page,w=void 0===T?1:T,E=Object(A.a)(u,o),a.$progress.start(),s!==C||o!==h||c!==y){n.next=15;break}return n.next=13,a.FETCH_ITEMS({filter:E,orderField:f,orderDirection:v,page:p,showMore:r});case 13:n.next=17;break;case 15:return n.next=17,a.FETCH_DATA_BY_TYPE({type:s,entityCode:c,filter:E,orderField:f,orderDirection:v,page:p});case 17:a.setSortValue(f,v),a.$progress.finish(),r||p===w||window.scrollTo({top:Tt.a+1,behavior:"smooth"}),r&&setTimeout((function(){return a.showMore=!1}),200),n.next=30;break;case 23:if(n.prev=23,n.t0=n.catch(0),!n.t0||!0!==n.t0.isCancel){n.next=27;break}return n.abrupt("return");case 27:a.$progress.fail(),_.$logger.error("fetchCatalog",n.t0),a.$progress.finish();case 30:case"end":return n.stop()}}),n,null,[[0,23]])})),function(){var t=this,e=arguments;return new Promise((function(r,a){var i=n.apply(t,e);function o(t){wt(i,r,a,o,c,"next",t)}function c(t){wt(i,r,a,o,c,"throw",t)}o(void 0)}))})()}}),beforeRouteEnter:function(t,e,r){var n=t.fullPath,a=t.params,i=a.code,o=void 0===i?null:i,c=a.entityCode,s=void 0===c?null:c,u=a.type,l=a.pathMatch,d=t.query,p=(d=void 0===d?{page:1,orderField:"price",orderDirection:"desc"}:d).page,m=void 0===p?1:p,f=d.orderField,g=void 0===f?"price":f,v=d.orderDirection,b=void 0===v?"desc":v;Object(h.a)(_.$store,$,B);var y=_.$store.state[$],C=y.loadPath,O=y.categoryCode,T=y.entityCode,w=y.type;if(C===n&&u===w&&o===O&&s===T)r();else{var E=Object(A.a)(l,o),j=null;j=u===w&&o===O&&s===T?"".concat($,"/").concat("FETCH_ITEMS"):"".concat($,"/").concat("FETCH_DATA_BY_TYPE"),_.$progress.start(),_.$store.dispatch(j,{type:u,entityCode:s,filter:E,page:m,orderField:g,orderDirection:b}).then((function(){_.$store.dispatch("".concat($,"/").concat("SET_LOAD_PATH"),n),r((function(t){t.setSortValue(g,b),_.$progress.finish()}))})).catch((function(t){if(t&&!0===t.isCancel)return r();_.$progress.fail(),_.$logger.error("beforeRouteEnter",t),_.$progress.finish(),r()}))}},beforeRouteUpdate:function(t,e,r){this.showMore?this.fetchCatalog(t,e,this.showMore):this.debounce_fetchCatalog(t,e),r()},beforeRouteLeave:function(t,e,r){this.debounce_fetchCatalog.cancel(),r()},beforeMount:function(){this.debounce_fetchCatalog=W()(this.fetchCatalog,500)}},St=Object(q.a)(xt,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section catalog-view"},[r("div",{staticClass:"container catalog-view__header"},[r("breadcrumbs",{staticClass:"catalog-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t._v("\n                Главная\n            ")]),t._v(" "),r("breadcrumb-item",{key:t.type,attrs:{to:t.breadcrumbRootUrl}},[t._v("\n                "+t._s(t.$t("productGroups.title."+t.type))+"\n            ")]),t._v(" "),t.entityCode?r("breadcrumb-item",{key:t.entityCode,attrs:{to:t.generateBreadcrumbUrl(null)}},[t._v("\n                "+t._s(t.productGroup&&t.productGroup.name)+"\n            ")]):t._e(),t._v(" "),t._l(t.activeCategories,(function(e){return r("breadcrumb-item",{key:e.id,attrs:{to:t.generateBreadcrumbUrl(e.code)}},[t._v("\n                "+t._s(e.name)+"\n            ")])}))],2),t._v(" "),t.entityCode&&t.productGroup?r("catalog-banner-card",{staticClass:"catalog-view__brand",attrs:{"banner-id":t.productGroup.id,"bottom-text":t.productGroup.description,title:t.productGroup.name,image:t.productGroup.image}}):r("catalog-banner-card",{staticClass:"catalog-view__banner",attrs:{"banner-id":t.banner.id,image:t.banner.image,"upper-text":t.banner.upperText,"bottom-text":t.banner.bottomText,title:t.banner.title,"btn-text":t.banner.btnText}})],1),t._v(" "),r("section",{staticClass:"section"},[r("div",{staticClass:"container catalog-view__grid"},[t.isTabletLg?t._e():r("div",{staticClass:"catalog-view__side-panel"},[r("ul",{staticClass:"catalog-view__side-panel-categories"},t._l(t.categories,(function(t){return r("category-tree-item",{key:t.id,staticClass:"catalog-view__side-panel-categories-item",attrs:{item:t}})})),1),t._v(" "),r("catalog-filter",{staticClass:"catalog-view__side-panel-filters"})],1),t._v(" "),r("div",{staticClass:"catalog-view__main"},[r("div",{staticClass:"catalog-view__main-header"},[r("div",{staticClass:"catalog-view__main-header-title"},[r("h1",{staticClass:"catalog-view__main-header-hl"},[t._v("\n                            "+t._s(t.activeCategory?t.activeCategory.name:"Все категории")+"\n                        ")]),t._v(" "),r("p",{staticClass:"text-grey catalog-view__main-header-text"},[t._v("489 продуктов")])]),t._v(" "),r("v-select",{staticClass:"catalog-view__main-header-sort",attrs:{label:"title","track-by":"id",options:t.sortOptions,searchable:!1,"allow-empty":!1,"show-labels":!1},model:{value:t.sortValue,callback:function(e){t.sortValue=e},expression:"sortValue"}}),t._v(" "),r("filter-button",{staticClass:"catalog-view__main-header-btn",on:{click:function(e){t.filterModal=!t.filterModal}}},[t._v("\n                        Фильтр и сортировка  \n                        "),r("span",{staticClass:"text-grey"},[t._v(t._s(t.activeTags.length))])])],1),t._v(" "),t.isTabletLg?t._e():r("transition-group",{staticClass:"catalog-view__main-tags",attrs:{tag:"ul",name:"tag-item"}},t._l(t.activeTags,(function(e,n){return r("tag-item",{key:e.code,attrs:{"data-index":n,text:e.name},on:{delete:function(r){return t.onClickDeleteTag(e.segment)}}})})),1),t._v(" "),r("catalog-product-list",{staticClass:"catalog-view__main-grid",attrs:{animation:!t.isTablet}}),t._v(" "),t.pagesCount>1?r("div",{staticClass:"catalog-view__main-controls"},[t.activePage<t.pagesCount?r("v-button",{staticClass:"btn--outline catalog-view__main-controls-btn",attrs:{disabled:t.showMore},on:{click:t.onShowMore}},[t._v("\n                        Показать ещё\n                    ")]):t._e(),t._v(" "),r("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e()],1)])]),t._v(" "),r("transition",{attrs:{name:"fade-in"}},[t.filterModal&&t.isTabletLg?r("modal",{staticClass:"catalog-view__modal-filter",attrs:{"show-close-btn":!1,type:"fullscreen"},scopedSlots:t._u([{key:"body",fn:function(){return[r("v-sticky",{staticClass:"catalog-view__modal-filter-sticky",scopedSlots:t._u([{key:"sticky",fn:function(){return[r("div",{staticClass:"catalog-view__modal-filter-header"},[r("button",{staticClass:"catalog-view__modal-filter-header-btn",on:{click:function(e){t.filterModal=!1}}},[r("v-svg",{attrs:{name:"cross-small",width:"14",height:"14"}}),t._v("Фильтр\n                            ")],1)])]},proxy:!0}],null,!1,219555529)},[t._v(" "),r("div",{staticClass:"catalog-view__modal-filter-sort"},[r("div",{staticClass:"catalog-view__modal-filter-sort-title"},[t._v("Сортировка")]),t._v(" "),r("ul",{staticClass:"catalog-view__modal-filter-sort-list"},t._l(t.sortOptions,(function(e){return r("li",{key:e.title,staticClass:"catalog-view__modal-filter-sort-item",class:{"catalog-view__modal-filter-sort-item--active":e===t.sortValue}},[r("button",{staticClass:"catalog-view__modal-filter-sort-btn",on:{click:function(r){t.sortValue=e}}},[t._v("\n                                    "+t._s(e.title)+"\n                                ")])])})),0)]),t._v(" "),r("catalog-filter",{staticClass:"catalog-view__modal-filter-panel"})],1)]},proxy:!0}],null,!1,2324292678)}):t._e()],1),t._v(" "),r("section",{staticClass:"section catalog-view__section catalog-view__seo"},[r("div",{staticClass:"container catalog-view__seo-container"},[r("h2",{staticClass:"catalog-view__section-hl catalog-view__seo-hl"},[t._v("Блок SEO текста")]),t._v(" "),r("v-expander",{staticClass:"catalog-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:t._u([{key:"btn",fn:function(e){var r=e.isExpanded;return[t._v("\n                    "+t._s(r?"Скрыть":"Показать больше")+"\n                ")]}}])},[t._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)]),t._v(" "),r("transition",{attrs:{name:"fade-in"}},[t.isQuickViewOpen&&!t.isTabletLg?r("quick-view-modal"):t.isAddToCartOpen?r("add-to-cart-modal"):t._e()],1)],1)}),[],!1,null,null,null);e.default=St.exports},"9bRU":function(t,e,r){},FIks:function(t,e,r){},Xtz6:function(t,e,r){},bhYy:function(t,e,r){},hqjE:function(t,e,r){},x3SC:function(t,e,r){}}]);