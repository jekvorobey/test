(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{"/Rcj":function(t,e,r){"use strict";r.r(e);var n,a=r("NDiG"),i=r("i2Ud"),o=r("o3vK"),c=r("+gqB"),s=r("nuHk"),u=r("pFko"),l=r("ze5i"),d=r("wo+G"),p=r("2/Mz"),m=r("obii"),g=r("zfPd"),f=r("KLyl"),v=r("tHOl"),b=r("BZIu"),_=r("oxRU"),h=r("48TQ"),y=r("W6hq"),C=r("Nlzp");function O(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function w(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var j,T=(O(n={},"SET_LOAD_PATH",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t.loadPath=e})),O(n,"SET_BANNER",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.banner=e})),O(n,"SET_ITEMS_MORE",(function(t,e){var r,n=e.items,a=e.range;(r=t.items).push.apply(r,w(n)),t.range=a||0})),O(n,"SET_ITEMS",(function(t,e){var r=e.items,n=e.range;t.items=r,t.range=n||0})),O(n,"SET_CATEGORY_CODE",(function(t,e){t.categoryCode=e})),O(n,"SET_CATEGORIES",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.categories=e})),O(n,"SET_FILTERS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.filters=e})),O(n,"SET_PRODUCT_GROUP",(function(t,e){t.productGroup=e})),O(n,"SET_TYPE",(function(t,e){t.type=e})),O(n,"SET_ENTITY_CODE",(function(t,e){t.entityCode=e})),O(n,"APPLY_DATA",(function(t,e){Object.assign(t,e)})),n);function E(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function x(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?E(Object(r),!0).forEach((function(e){P(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function P(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function S(t,e,r,n,a,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,a)}function k(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var i=t.apply(e,r);function o(t){S(i,n,a,o,c,"next",t)}function c(t){S(i,n,a,o,c,"throw",t)}o(void 0)}))}}var A,R="filters",D=(P(j={},"SET_LOAD_PATH",(function(t,e){(0,t.commit)("SET_LOAD_PATH",e)})),P(j,"FETCH_BANNER",(function(t,e){t.commit;return k(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(C.z)();case 3:return e=t.sent,t.abrupt("return",e[6]);case 7:t.prev=7,t.t0=t.catch(0),Object(h.b)("FETCH_BANNER",!0)(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()})),P(j,"FETCH_CATEGORIES",(function(t){t.commit;var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e.code;return k(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(C.D)(r);case 3:return t.abrupt("return",t.sent);case 6:t.prev=6,t.t0=t.catch(0),Object(h.b)("FETCH_CATEGORIES",!0)(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()})),P(j,"FETCH_FILTERS",(function(t,e){t.commit;var r=e.categoryCode,n=e.excludedFilters;return k(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(C.F)(r||void 0,n||void 0);case 3:return t.abrupt("return",t.sent);case 6:t.prev=6,t.t0=t.catch(0),Object(h.b)("FETCH_FILTERS",!0)(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()})),P(j,"FETCH_ITEMS",(function(t,e){t.commit,t.state;return k(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(C.C)(e);case 3:return t.abrupt("return",t.sent);case 6:t.prev=6,t.t0=t.catch(0),Object(h.b)("FETCH_ITEMS",!0)(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()})),P(j,"FETCH_PRODUCT_GROUP",(function(t,e){t.commit;var r=e.type,n=e.entityCode;return k(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(C.L)(r,n);case 3:return t.abrupt("return",t.sent);case 6:t.prev=6,t.t0=t.catch(0),Object(h.b)("FETCH_PRODUCT_GROUP",!0)(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()})),P(j,"FETCH_CATALOG_DATA",(function(t,e){var r=t.state,n=t.dispatch,a=t.commit;return k(regeneratorRuntime.mark((function t(){var i,o,c,s,u,l,d,p,m,g,f,v,b,h,C,O,w,j,T,E;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=e.type,o=e.entityCode,c=e.filter,s=e.routeSegments,u=e.filterSegments,l=e.page,d=e.orderField,p=e.orderDirection,m=e.showMore,g={},f=null,v=c,i===_.productGroupTypes.NEW&&(v=x({},c,{is_new:!0})),!o){t.next=39;break}if(r.entityCode===o){t.next=20;break}return t.next=9,n("FETCH_PRODUCT_GROUP",{type:i,entityCode:o});case 9:if(g.productGroup=t.sent,b=g.productGroup,h=b.based,C=b.filters,h!==R){t.next=17;break}return t.next=14,n("FETCH_CATEGORIES",{code:C.category});case 14:g.categories=t.sent,t.next=18;break;case 17:g.categories=[];case 18:t.next=22;break;case 20:g.productGroup=r.productGroup,g.categories=r.categories;case 22:if(O=g.productGroup,w=O.excluded_filters,j=O.based,T=O.filters,f=w,v=x({},c,{},T,{category:c.category||T.category||null}),r.categoryCode===v.category){t.next=37;break}if(j!==R){t.next=34;break}return g.categoryCode=v.category,g.activeCategories=Object(y.d)(g.categories,v.category),t.next=31,n("FETCH_FILTERS",{categoryCode:v.category,excludedFilters:f});case 31:g.filters=t.sent,t.next=37;break;case 34:g.categoryCode="",g.activeCategories=[],g.filters=[];case 37:t.next=56;break;case 39:if(g.productGroup=null,r.type===i){t.next=49;break}return t.next=43,n("FETCH_CATEGORIES");case 43:return g.categories=t.sent,t.next=46,n("FETCH_BANNER");case 46:g.banner=t.sent,t.next=50;break;case 49:g.categories=r.categories;case 50:if(r.categoryCode===v.category){t.next=56;break}return g.categoryCode=v.category,g.activeCategories=Object(y.d)(g.categories,v.category),t.next=55,n("FETCH_FILTERS",{categoryCode:v.category,excludedFilters:f});case 55:g.filters=t.sent;case 56:return g.entityCode=o,g.type=i,g.routeSegments=s,g.filterSegments=u,g.page=l,t.next=63,n("FETCH_ITEMS",{filter:x({},v,{category:v.category||void 0}),page:l,orderField:d,orderDirection:p});case 63:E=t.sent,a("APPLY_DATA",g),a(m?"SET_ITEMS_MORE":"SET_ITEMS",E);case 66:case"end":return t.stop()}}),t)})))()})),j);function F(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function I(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?F(Object(r),!0).forEach((function(e){$(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):F(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function $(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var M,G=($(A={},"rootCategory",(function(t){var e=t.activeCategories,r=(t.productGroup||{}).filters;return r?e.find((function(t){return t.code===r.category})):null})),$(A,"breadcrumbs",(function(t,e){var r=t.activeCategories,n=e.rootCategory,a=r.indexOf(n);return-1!==a?r.slice(a+1):r})),$(A,"activePage",(function(t,e,r){var n=r.route;return n.query.page?Number(n.query.page):1})),$(A,"pagesCount",(function(t){return Math.ceil(t.range/12)})),$(A,"activeCategory",(function(t){var e=t.activeCategories;return e[e.length-1]})),$(A,"routeSegments",(function(t,e,r){var n=r.route.params.pathMatch;return n?n.split("/"):[]})),$(A,"filterSegments",(function(t,e){var r=e.routeSegments;return Object(y.e)(r)})),$(A,"activeTags",(function(t,e){for(var r=[],n=t.filters.filter((function(t){return"range"!==t.type})),a=e.filterSegments,i=0;i<n.length;i++)for(var o=n[i],c=0;c<o.items.length;c++){var s=o.items[c];a[o.name]&&a[o.name][s.code]&&r.push(I({},s,{segment:"".concat(o.name,"-").concat(s.code)}))}return r})),A);function L(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var B="catalog",H={name:B,namespaced:!0,state:(M={},L(M,"loadPath",""),L(M,"type",""),L(M,"entityCode",""),L(M,"categoryCode",""),L(M,"productGroup",null),L(M,"banner",{}),L(M,"categories",[]),L(M,"filters",[]),L(M,"items",[]),L(M,"range",0),L(M,"routeSegments",[]),L(M,"filterSegments",{}),L(M,"activeCategories",[]),M),actions:D,mutations:T,getters:G},V=r("L2JU");r("x3SC");function N(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function U(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var q={name:"category-tree-item",components:{},props:{item:{type:Object,required:!0},depth:{type:Number,default:0},disabled:{type:Boolean,default:!0}},data:function(){return{isHover:!1}},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?N(Object(r),!0).forEach((function(e){U(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):N(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(V.d)("route",{type:function(t){return t.params.type},entityCode:function(t){return t.params.entityCode}}),{},Object(V.d)(B,["activeCategories"]),{},Object(V.c)(B,["rootCategory"]),{isActive:function(){var t=this;return this.activeCategories.some((function(e){return e.code===t.item.code}))},isRoot:function(){var t=this.item.code,e=this.depth,r=this.rootCategory;return r?t===r.code:0===e},isInteractive:function(){this.type;var t=this.item.code,e=this.rootCategory,r=this.isRoot,n=this.disabled;return e?t&&(r||!n):t},url:function(){var t=this.entityCode,e=this.type,r=this.item.code,n=this.isRoot,a=(this.disabled,this.rootCategory);return{path:Object(y.c)(e,t,a?!n&&r:r)}},hasChildren:function(){this.entityCode,this.type,this.item.items;return Array.isArray(this.item.items)}}),methods:{onMouseOver:function(t){this.isHover=t}}},z=r("KHd+"),Y=Object(z.a)(q,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"category-tree-item",class:[{"category-tree-item--root":0===t.depth},{"category-tree-item--active":t.isActive}],on:{mouseover:function(e){return t.onMouseOver(!0)},mouseleave:function(e){return t.onMouseOver(!1)}}},[r("div",{staticClass:"category-tree-item__label"},[t.isInteractive?r("router-link",{staticClass:"category-tree-item__link",attrs:{to:t.url,exact:""===t.item.code}},[t._v("\n            "+t._s(t.item.name)+"\n        ")]):r("span",{staticClass:"category-tree-item__link"},[t._v("\n            "+t._s(t.item.name)+"\n        ")])],1),t._v(" "),r("transition",{attrs:{name:"slide-right"}},[t.hasChildren&&(t.isHover||t.isActive)?r("ul",{staticClass:"category-tree-item__list"},t._l(t.item.items,(function(e,n){return r("category-tree-item",{key:e.id||n,staticClass:"category-tree-item__item",attrs:{item:e,depth:t.depth+1,disabled:!t.isRoot}})})),1):t._e()])],1)}),[],!1,null,null,null).exports,W=r("MhNv"),Q=r("sEfC"),J=r.n(Q);r("Xtz6");function K(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function X(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var Z={name:"catalog-filter",components:{VButton:i.a,VCheck:o.a,VRange:s.a,VAccordion:W.a},props:{btnText:{type:String,default:"Очистить фильтры"}},data:function(){return{format:{to:function(t){return Math.round(t)},from:function(t){return Number(t)}}}},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?K(Object(r),!0).forEach((function(e){X(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(V.c)(B,["filterSegments","routeSegments"]),{},Object(V.d)(B,["filters"]),{},Object(V.d)("route",{type:function(t){return t.params.type},code:function(t){return t.params.code},entityCode:function(t){return t.params.entityCode}}),{accordionFilters:function(){return this.filters?this.filters.map((function(t){return{id:t.id,item:t,title:t.title,isExpanded:!0}})):[]},clearFilterUrl:function(){var t=this.type,e=this.entityCode,r=this.code;return Object(y.c)(t,e,r)}}),methods:{onRadioChange:function(t,e){var r=this.type,n=this.entityCode,a=this.code,i=this.routeSegments;i.includes(e)||i.push(e),function(t){throw new Error('"'+t+'" is read-only')}("routeSegments"),i=i.filter((function(t){return t===e}));var o=Object(y.b)(r,n,a,i);this.$router.replace({path:o})},onCheckChange:function(t,e){var r=this.type,n=this.entityCode,a=this.code,i=this.routeSegments;if(t){if(i.includes(e))return;i.push(e)}else{if(!i.includes(e))return;var o=i.indexOf(e);-1!==o&&i.splice(o,1)}var c=Object(y.b)(r,n,a,i);this.$router.replace({path:c})},onRangeChange:function(t,e){this.debounce_rangeChange(t,e)}},beforeMount:function(){var t=this;this.debounce_rangeChange=J()((function(e,r){for(var n=t.type,a=t.entityCode,i=t.code,o=t.routeSegments,c="".concat(r,"-from_").concat(e[0],"_to_").concat(e[1]),s=new RegExp("^".concat(r,"-")),u=-1,l=0;l<o.length;l++)if(o[l].match(s)){u=l;break}if(-1!==u){if(o[u]===c)return;o.splice(u,1,c)}else o.push(c);var d=Object(y.b)(n,a,i,o);t.$router.replace({path:d})}),500)}},tt=Object(z.a)(Z,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.accordionFilters&&t.accordionFilters.length>0?r("div",{staticClass:"catalog-filter"},[r("v-accordion",{staticClass:"catalog-filter__filters",attrs:{"key-field":"id",items:t.accordionFilters,"item-expanded":function(t){return t.isExpanded},"item-toggled":function(t){return t.isExpanded=!t.isExpanded}},scopedSlots:t._u([{key:"content",fn:function(e){var n=e.item;return["range"===n.item.type?r("div",{staticClass:"catalog-filter__filters-range"},[r("v-range",{attrs:{initialValue:[n.item.min,n.item.max],value:t.filterSegments[n.item.name]||[n.item.min,n.item.max],max:n.item.max,min:n.item.min,format:t.format},on:{input:function(e){return t.onRangeChange(e,n.item.name)}}})],1):"check"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},t._l(n.item.items,(function(e){return r("v-check",{key:e.id,attrs:{id:n.item.name+"-"+e.id,name:n.item.name,checked:t.filterSegments[n.item.name]&&t.filterSegments[n.item.name][e.code]},on:{change:function(r){return t.onCheckChange(r,n.item.name+"-"+e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])})),1):"radio"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},t._l(n.item.items,(function(e){return r("v-check",{key:e.id,attrs:{id:n.item.name+"-"+e.id,type:"radio",name:n.item.name,checked:t.filterSegments[n.item.name]&&t.filterSegments[n.item.name][e.code]},on:{change:function(r){return t.onRadioChange(r,n.item.name+"-"+e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])})),1):t._e()]}}],null,!1,1429883620)}),t._v(" "),r("v-button",{staticClass:"btn--outline catalog-filter__clear-btn",attrs:{to:t.clearFilterUrl,replace:""}},[t._v("\n        "+t._s(t.btnText)+"\n    ")])],1):t._e()}),[],!1,null,null,null).exports,et=r("LqtR"),rt=r("jYNS"),nt=r("OvCi"),at=(r("hqjE"),{name:"catalog-banner-list-card",components:{VButton:i.a,VPicture:rt.a},props:{item:{type:Object,default:function(){return{}}}},computed:{img:function(){return Object(nt.a)(300,300,this.item.image.id,"webp")},defaultImg:function(){return Object(nt.a)(300,300,this.item.image.id,this.item.image.sourceExt)},isObject:function(){return this.item.image instanceof Object}}}),it=Object(z.a)(at,(function(){var t=this.$createElement;return(this._self._c||t)("li",{staticClass:"catalog-banner-list-card"},[this._m(0),this._v(" "),this._m(1)])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-banner-list-card__img"},[t.item.image&&t.item.image.id?r("v-picture",[t.isObject?[r("source",{attrs:{"data-srcset":t.img,type:"image/webp",media:"(min-width: 1024px)"}}),t._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})]:[r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.item.image,alt:""}})]],2):t._e()],1)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-banner-list-card__panel"},[t.item.upperText?r("div",{staticClass:"catalog-banner-list-card__panel-upper-text"},[t._v("\n            "+t._s(t.item.upperText)+"\n        ")]):t._e(),t._v(" "),r("div",{staticClass:"catalog-banner-list-card__panel-title"},[t._v("\n            "+t._s(t.item.title)+"\n        ")]),t._v(" "),t.item.bottomText?r("div",{staticClass:"catalog-banner-list-card__panel-bottom-text"},[t._v("\n            "+t._s(t.item.bottomText)+"\n        ")]):t._e(),t._v(" "),t.item.btnText?r("v-button",{staticClass:"btn--outline catalog-banner-list-card__panel-btn"},[t._v("\n            "+t._s(t.item.btnText)+"\n        ")]):t._e()],1)}],!1,null,null,null).exports,ot=r("7cXU"),ct=r("7bnD"),st=r("fB3W"),ut=r("YNzt"),lt=(r("nhva"),r("CxEY"),r("iHux"),r("gB8C"),r("FIks"),{name:"catalog-product-list-card",components:{VSvg:a.a,VLink:ot.a,VButton:i.a,VRating:ct.a,VPicture:rt.a,Tag:st.a,Price:ut.a},props:{item:{type:Object,default:function(){return{categoryCodes:[],tags:[]}}},isSmall:{type:Boolean,default:!1},showWishlistBtn:{type:Boolean,default:!0}},computed:{bigImg:function(){return Object(nt.a)(300,300,this.item.image.id,"webp")},smallImg:function(){return Object(nt.a)(200,200,this.item.image.id,"webp")},defaultImg:function(){return Object(nt.a)(200,200,this.item.image.id,this.item.image.sourceExt)},href:function(){return this.item.categoryCodes&&0!==this.item.categoryCodes.length?"/catalog/".concat(this.item.categoryCodes[this.item.categoryCodes.length-1],"/").concat(this.item.code):"/catalog"}},methods:{onBuyButtonClick:function(){this.$emit("addItem",{id:this.item.id,type:this.item.type})},onPreview:function(){this.$emit("preview",{id:this.item.id,type:this.item.type})}}}),dt=Object(z.a)(lt,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("router-link",{staticClass:"catalog-product-list-card",class:{"catalog-product-list-card--small":t.isSmall},attrs:{tag:"li",to:t.href}},[t._m(0),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t.showWishlistBtn?r("v-link",{staticClass:"catalog-product-list-card__wishlist-btn",attrs:{tag:"button"},on:{click:function(t){t.preventDefault()}}},[r("v-svg",{attrs:{name:"wishlist-middle",width:"24",height:"24"}})],1):t._e()],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__img"},[t.item.image&&t.item.image.id?r("v-picture",{attrs:{alt:""}},[r("source",{attrs:{"data-srcset":t.bigImg,type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),r("source",{attrs:{"data-srcset":t.smallImg,type:"image/webp",media:"(max-width: 479px)"}}),t._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})]):r("v-svg",{attrs:{id:"catalog-product-list-card-empty",name:"logo",width:"48",height:"48"}}),t._v(" "),r("div",{staticClass:"catalog-product-list-card__controls"},[r("v-button",{staticClass:"btn--outline catalog-product-list-card__controls-btn",on:{click:function(e){return e.preventDefault(),t.onBuyButtonClick(e)}}},[t._v("\n                Купить\n            ")]),t._v(" "),r("v-link",{staticClass:"catalog-product-list-card__controls-link",attrs:{tag:"button"},on:{click:function(e){return e.preventDefault(),t.onPreview(e)}}},[t._v("\n                Быстрый просмотр\n            ")])],1)],1)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__rating"},t._l(5,(function(e){return r("span",{key:e,staticClass:"catalog-product-list-card__rating-star",class:{"catalog-product-list-card__rating-star--empty":e>t.item.rating}})})),0)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__body"},[r("div",{staticClass:"catalog-product-list-card__prices"},[t.item.price?r("price",t._b({staticClass:"text-bold catalog-product-list-card__price"},"price",t.item.price,!1)):t._e(),t._v(" "),t.item.oldPrice?r("price",t._b({staticClass:"text-sm text-grey text-strike catalog-product-list-card__price"},"price",t.item.oldPrice,!1)):t._e()],1),t._v(" "),r("div",{staticClass:"link--sm catalog-product-list-card__link"},[t._v(t._s(t.item.name))]),t._v(" "),t._m(1)])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"catalog-product-list-card__tags"},this._l(this.item.tags,(function(t){return e("tag",{key:t.id,staticClass:"catalog-product-list-card__tags-item",attrs:{text:t.name}})})),1)}],!1,null,null,null).exports,pt=r("/Qa0"),mt=r("Jtxo"),gt=r("55Sm"),ft=r("jDKC");r("bhYy");function vt(t,e,r,n,a,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,a)}function bt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function _t(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?bt(Object(r),!0).forEach((function(e){ht(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):bt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function ht(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var yt=0,Ct={name:"catalog-product-list",props:{animation:{type:Boolean,default:!0}},components:{CatalogBannerListCard:it,CatalogProductListCard:dt},computed:_t({},Object(V.d)(B,["items","categories"])),methods:_t({},Object(V.b)(gt.b,[ft.a]),{getComponent:function(t){switch(t){case _.catalogItemTypes.PRODUCT:return dt.name;case _.catalogItemTypes.BANNER:return it.name}},getClass:function(t){return{"catalog-product-list__item--banner":t===_.catalogItemTypes.BANNER}},onBeforeEnterItems:function(t){t.dataset.index=yt,yt+=1,t.style.opacity=0},itemAnimation:function(t,e){return new Promise((function(r,n){try{setTimeout((function(){requestAnimationFrame((function(){t.style.opacity=1,r()}))}),e)}catch(t){n(t)}}))},onEnterItems:function(t,e){var r,n=this;return(r=regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a=100*t.dataset.index,r.next=3,n.itemAnimation(t,a);case 3:e();case 4:case"end":return r.stop()}}),r)})),function(){var t=this,e=arguments;return new Promise((function(n,a){var i=r.apply(t,e);function o(t){vt(i,n,a,o,c,"next",t)}function c(t){vt(i,n,a,o,c,"throw",t)}o(void 0)}))})()},onAfterEnterItems:function(t){delete t.dataset.index,yt=0},onLeaveItems:function(t,e){requestAnimationFrame((function(){t.style.opacity=0,e()}))},onPreview:function(t){this[ft.a]({name:pt.a,open:!0,state:{code:t}})},onAddToCart:function(t){this[ft.a]({name:mt.a,open:!0,state:{offerId:t.id,type:t.type}})}})},Ot=Object(z.a)(Ct,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.animation?r("transition-group",{staticClass:"catalog-product-list",class:{"catalog-product-list--no-category":0===t.categories.length},attrs:{tag:"ul",name:"catalog-item"},on:{"before-enter":t.onBeforeEnterItems,enter:t.onEnterItems,"after-enter":t.onAfterEnterItems,leave:t.onLeaveItems}},t._l(t.items,(function(e){return r(t.getComponent(e.type),{key:e.id,tag:"component",staticClass:"catalog-product-list__item",class:t.getClass(e.type),attrs:{item:e},on:{addItem:function(e){return t.onAddToCart(e)},preview:function(r){return t.onPreview(e.code)}}})})),1):r("ul",{staticClass:"catalog-product-list"},t._l(t.items,(function(e){return r(t.getComponent(e.type),{key:e.id,tag:"component",staticClass:"catalog-product-list__item",class:t.getClass(e.type),attrs:{item:e},on:{addItem:function(e){return t.onAddToCart(e)},preview:function(r){return t.onPreview(e.code)}}})})),1)}),[],!1,null,null,null).exports,wt=r("8TZ/"),jt=r("0CxO"),Tt=r("AlLH");r("4eDr"),r("9bRU");function Et(t,e,r,n,a,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,a)}function xt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function Pt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?xt(Object(r),!0).forEach((function(e){St(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):xt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function St(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var kt={name:"catalog",components:{VSvg:a.a,VButton:i.a,VSelect:u.a,VPagination:c.a,VSticky:l.a,VExpander:d.a,Modal:p.a,Breadcrumbs:m.a,BreadcrumbItem:g.a,FilterButton:f.a,TagItem:v.a,CategoryTreeItem:Y,CatalogFilter:tt,CatalogProductList:Ot,CatalogBannerCard:et.a,AddToCartModal:mt.b,QuickViewModal:pt.b},data:function(){var t=[{id:1,title:"Сначала подороже",field:"price",direction:"desc"},{id:2,title:"Сначала подешевле",field:"price",direction:"asc"}];return{sortValue:t[0],sortOptions:t,filterModal:!1,showMore:!1}},computed:Pt({},Object(V.c)(B,["activeTags","activeCategory","activePage","pagesCount","routeSegments","breadcrumbs"]),{},Object(V.d)(B,["items","banner","categories","productGroup","type"]),{},Object(V.d)(gt.b,{isQuickViewOpen:function(t){return t[gt.a][pt.a]&&t[gt.a][pt.a].open},isAddToCartOpen:function(t){return t[gt.a][mt.a]&&t[gt.a][mt.a].open}}),{},Object(V.d)("route",{code:function(t){return t.params.code},entityCode:function(t){return t.params.entityCode}}),{breadcrumbRootUrl:function(){var t=this.type,e="";switch(t){case _.productGroupTypes.CATALOG:case _.productGroupTypes.NEW:e="Catalog";break;default:e="ProductGroups"}return{name:e,params:{type:t}}},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:{sortValue:function(t,e){t!==e&&this.$router.replace({path:this.$route.path,query:{orderField:t.field,orderDirection:t.direction}})}},methods:Pt({},Object(V.b)(B,["FETCH_CATALOG_DATA","SET_LOAD_PATH"]),{},Object(V.b)(wt.c,[jt.a]),{},Object(V.b)(gt.b,[ft.a]),{generateBreadcrumbUrl:function(t){var e=this.type,r=this.entityCode;return{path:Object(y.c)(e,r,t)}},setSortValue:function(t,e){this.sortValue=this.sortOptions.find((function(r){return r.field===t&&r.direction===e}))||this.sortOptions[0]},onClickDeleteTag:function(t){var e=this.type,r=this.code,n=this.entityCode,a=this.routeSegments;if(a.includes(t)){var i=a.indexOf(t);-1!==i&&a.splice(i,1);var o=Object(y.b)(e,n,r,a);this.$router.replace({path:o})}},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:Pt({},this.$route.query,{page:this.activePage+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:Pt({},this.$route.query,{page:t})})},fetchCatalog:function(t,e,r){var n,a=this;return(n=regeneratorRuntime.mark((function n(){var i,o,c,s,u,l,d,p,m,g,f,v,_,h,C,O,w,j,T,E;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,i=t.params,o=i.code,c=i.entityCode,s=i.type,u=i.pathMatch,l=t.query,d=l.page,p=void 0===d?1:d,m=l.orderField,g=void 0===m?"price":m,f=l.orderDirection,v=void 0===f?"desc":f,(_=e.params).code,_.entityCode,_.type,h=e.query,C=(h=void 0===h?{page:1}:h).page,O=void 0===C?1:C,w=Object(y.a)(u,o),j=w.filter,T=w.routeSegments,E=w.filterSegments,a.$progress.start(),n.next=10,a.FETCH_CATALOG_DATA({type:s,entityCode:c,code:o,filter:j,routeSegments:T,filterSegments:E,page:p,orderField:g,orderDirection:v,showMore:r});case 10:a.setSortValue(g,v),a.$progress.finish(),r||p===O||window.scrollTo({top:Tt.b+1,behavior:"smooth"}),r&&setTimeout((function(){return a.showMore=!1}),200),n.next=23;break;case 16:if(n.prev=16,n.t0=n.catch(0),!n.t0||!0!==n.t0.isCancel){n.next=20;break}return n.abrupt("return");case 20:a.$progress.fail(),b.$logger.error("fetchCatalog",n.t0),a.$progress.finish();case 23:case"end":return n.stop()}}),n,null,[[0,16]])})),function(){var t=this,e=arguments;return new Promise((function(r,a){var i=n.apply(t,e);function o(t){Et(i,r,a,o,c,"next",t)}function c(t){Et(i,r,a,o,c,"throw",t)}o(void 0)}))})()}}),beforeRouteEnter:function(t,e,r){var n=t.fullPath,a=t.params,i=a.code,o=void 0===i?null:i,c=a.entityCode,s=void 0===c?null:c,u=a.type,l=a.pathMatch,d=t.query,p=(d=void 0===d?{page:1,orderField:"price",orderDirection:"desc"}:d).page,m=void 0===p?1:p,g=d.orderField,f=void 0===g?"price":g,v=d.orderDirection,_=void 0===v?"desc":v;Object(h.a)(b.$store,B,H);var C=b.$store.state[B],O=C.loadPath,w=C.categoryCode,j=C.entityCode,T=C.type;if(O===n&&u===T&&o===w&&s===j)r((function(t){return t.setSortValue(f,_)}));else{var E=Object(y.a)(l,o),x=E.filter,P=E.routeSegments,S=E.filterSegments;b.$progress.start(),b.$store.dispatch("".concat(B,"/").concat("FETCH_CATALOG_DATA"),{type:u,entityCode:s,code:o,filter:x,routeSegments:P,filterSegments:S,page:m,orderField:f,orderDirection:_}).then((function(t){b.$store.dispatch("".concat(B,"/").concat("SET_LOAD_PATH"),n),r((function(t){t.setSortValue(f,_),b.$progress.finish()}))})).catch((function(t){if(t&&!0===t.isCancel)return r();b.$progress.fail(),b.$logger.error("beforeRouteEnter",t),b.$progress.finish(),r()}))}},beforeRouteUpdate:function(t,e,r){this.showMore?this.fetchCatalog(t,e,this.showMore):this.debounce_fetchCatalog(t,e),r()},beforeRouteLeave:function(t,e,r){this.debounce_fetchCatalog.cancel(),r()},beforeMount:function(){this.debounce_fetchCatalog=J()(this.fetchCatalog,500)}},At=Object(z.a)(kt,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section catalog-view"},[r("div",{staticClass:"container catalog-view__header"},[r("breadcrumbs",{staticClass:"catalog-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t._v("\n                Главная\n            ")]),t._v(" "),r("breadcrumb-item",{key:t.type,attrs:{to:t.breadcrumbRootUrl}},[t._v("\n                "+t._s(t.$t("productGroups.title."+t.type))+"\n            ")]),t._v(" "),t.entityCode?r("breadcrumb-item",{key:t.entityCode,attrs:{to:t.generateBreadcrumbUrl(null)}},[t._v("\n                "+t._s(t.productGroup&&t.productGroup.name)+"\n            ")]):t._e(),t._v(" "),t._l(t.breadcrumbs,(function(e){return r("breadcrumb-item",{key:e.id,attrs:{to:t.generateBreadcrumbUrl(e.code)}},[t._v("\n                "+t._s(e.name)+"\n            ")])}))],2),t._v(" "),t.entityCode&&t.productGroup?r("catalog-banner-card",{staticClass:"catalog-view__brand",attrs:{"banner-id":t.productGroup.id,"bottom-text":t.productGroup.description,title:t.productGroup.name,image:t.productGroup.preview_photo}}):r("catalog-banner-card",{staticClass:"catalog-view__banner",attrs:{"banner-id":t.banner.id,image:t.banner.image,"upper-text":t.banner.upperText,"bottom-text":t.banner.bottomText,title:t.banner.title,"btn-text":t.banner.btnText}})],1),t._v(" "),r("section",{staticClass:"section"},[r("div",{staticClass:"container catalog-view__grid"},[!t.isTabletLg&&t.categories.length>0?r("div",{staticClass:"catalog-view__side-panel"},[r("ul",{staticClass:"catalog-view__side-panel-categories"},t._l(t.categories,(function(t){return r("category-tree-item",{key:t.id,staticClass:"catalog-view__side-panel-categories-item",attrs:{item:t}})})),1),t._v(" "),r("catalog-filter",{staticClass:"catalog-view__side-panel-filters"})],1):t._e(),t._v(" "),r("div",{staticClass:"catalog-view__main"},[r("div",{staticClass:"catalog-view__main-header"},[r("div",{staticClass:"catalog-view__main-header-title"},[r("h1",{staticClass:"catalog-view__main-header-hl"},[t._v("\n                            "+t._s(t.activeCategory?t.activeCategory.name:"Все категории")+"\n                        ")]),t._v(" "),r("p",{staticClass:"text-grey catalog-view__main-header-text"},[t._v("489 продуктов")])]),t._v(" "),r("v-select",{staticClass:"catalog-view__main-header-sort",attrs:{label:"title","track-by":"id",options:t.sortOptions,searchable:!1,"allow-empty":!1,"show-labels":!1},model:{value:t.sortValue,callback:function(e){t.sortValue=e},expression:"sortValue"}}),t._v(" "),r("filter-button",{staticClass:"catalog-view__main-header-btn",on:{click:function(e){t.filterModal=!t.filterModal}}},[t._v("\n                        Фильтр и сортировка  \n                        "),r("span",{staticClass:"text-grey"},[t._v(t._s(t.activeTags.length))])])],1),t._v(" "),t.isTabletLg?t._e():r("transition-group",{staticClass:"catalog-view__main-tags",attrs:{tag:"ul",name:"tag-item"}},t._l(t.activeTags,(function(e,n){return r("tag-item",{key:e.code,attrs:{"data-index":n,text:e.name},on:{delete:function(r){return t.onClickDeleteTag(e.segment)}}})})),1),t._v(" "),r("catalog-product-list",{key:t.type,staticClass:"catalog-view__main-grid",attrs:{animation:!t.isTablet}}),t._v(" "),t.pagesCount>1?r("div",{staticClass:"catalog-view__main-controls"},[t.activePage<t.pagesCount?r("v-button",{staticClass:"btn--outline catalog-view__main-controls-btn",attrs:{disabled:t.showMore},on:{click:t.onShowMore}},[t._v("\n                        Показать ещё\n                    ")]):t._e(),t._v(" "),r("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e()],1)])]),t._v(" "),r("transition",{attrs:{name:"fade-in"}},[t.filterModal&&t.isTabletLg?r("modal",{staticClass:"catalog-view__modal-filter",attrs:{"show-close-btn":!1,type:"fullscreen"},scopedSlots:t._u([{key:"body",fn:function(){return[r("v-sticky",{staticClass:"catalog-view__modal-filter-sticky",scopedSlots:t._u([{key:"sticky",fn:function(){return[r("div",{staticClass:"catalog-view__modal-filter-header"},[r("button",{staticClass:"catalog-view__modal-filter-header-btn",on:{click:function(e){t.filterModal=!1}}},[r("v-svg",{attrs:{name:"cross-small",width:"14",height:"14"}}),t._v("Фильтр\n                            ")],1)])]},proxy:!0}],null,!1,219555529)},[t._v(" "),r("div",{staticClass:"catalog-view__modal-filter-sort"},[r("div",{staticClass:"catalog-view__modal-filter-sort-title"},[t._v("Сортировка")]),t._v(" "),r("ul",{staticClass:"catalog-view__modal-filter-sort-list"},t._l(t.sortOptions,(function(e){return r("li",{key:e.title,staticClass:"catalog-view__modal-filter-sort-item",class:{"catalog-view__modal-filter-sort-item--active":e===t.sortValue}},[r("button",{staticClass:"catalog-view__modal-filter-sort-btn",on:{click:function(r){t.sortValue=e}}},[t._v("\n                                    "+t._s(e.title)+"\n                                ")])])})),0)]),t._v(" "),r("catalog-filter",{staticClass:"catalog-view__modal-filter-panel"})],1)]},proxy:!0}],null,!1,2324292678)}):t._e()],1),t._v(" "),r("section",{staticClass:"section catalog-view__section catalog-view__seo"},[r("div",{staticClass:"container catalog-view__seo-container"},[r("h2",{staticClass:"catalog-view__section-hl catalog-view__seo-hl"},[t._v("Блок SEO текста")]),t._v(" "),r("v-expander",{staticClass:"catalog-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:t._u([{key:"btn",fn:function(e){var r=e.isExpanded;return[t._v("\n                    "+t._s(r?"Скрыть":"Показать больше")+"\n                ")]}}])},[t._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)]),t._v(" "),r("transition",{attrs:{name:"fade-in"}},[t.isQuickViewOpen&&!t.isTabletLg?r("quick-view-modal"):t.isAddToCartOpen?r("add-to-cart-modal"):t._e()],1)],1)}),[],!1,null,null,null);e.default=At.exports},"9bRU":function(t,e,r){},FIks:function(t,e,r){},Xtz6:function(t,e,r){},bhYy:function(t,e,r){},hqjE:function(t,e,r){},x3SC:function(t,e,r){}}]);