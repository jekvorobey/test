(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{"/Rcj":function(t,e,r){"use strict";r.r(e);var a,n=r("NDiG"),i=r("i2Ud"),o=r("o3vK"),c=r("+gqB"),s=r("nuHk"),u=r("pFko"),l=r("ze5i"),d=r("cpWO"),p=r("2/Mz"),m=r("obii"),g=r("zfPd"),f=r("KLyl"),b=r("tHOl"),h=r("L2JU"),v=r("fhPv"),_=r("3eXy"),y=r("48TQ"),C=r("W6hq"),O=r("Nlzp");function w(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var j,T=(w(a={},"SET_LOAD_PATH",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t.loadPath=e})),w(a,"APPLY_DATA",(function(t,e){Object.assign(t,e)})),a);function k(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function E(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function P(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?E(Object(r),!0).forEach((function(e){I(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function I(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function x(t,e,r,a,n,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(a,n)}function S(t){return function(){var e=this,r=arguments;return new Promise((function(a,n){var i=t.apply(e,r);function o(t){x(i,a,n,o,c,"next",t)}function c(t){x(i,a,n,o,c,"throw",t)}o(void 0)}))}}var A,R=(I(j={},"SET_LOAD_PATH",(function(t,e){(0,t.commit)("SET_LOAD_PATH",e)})),I(j,"FETCH_BANNER",(function(t,e){t.commit;return S(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(O.A)();case 3:return e=t.sent,t.abrupt("return",e[6]);case 7:t.prev=7,t.t0=t.catch(0),Object(y.b)("FETCH_BANNER",!0)(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()})),I(j,"FETCH_CATEGORIES",(function(t){t.commit;var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e.code;return S(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(O.F)(r);case 3:return t.abrupt("return",t.sent);case 6:return t.prev=6,t.t0=t.catch(0),Object(y.b)("FETCH_CATEGORIES")(t.t0),t.abrupt("return",[]);case 10:case"end":return t.stop()}}),t,null,[[0,6]])})))()})),I(j,"FETCH_FILTERS",(function(t,e){t.commit;var r=e.categoryCode,a=e.excludedFilters;return S(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(O.H)(r||void 0,a||void 0);case 3:return t.abrupt("return",t.sent);case 6:return t.prev=6,t.t0=t.catch(0),Object(y.b)("FETCH_FILTERS")(t.t0),t.abrupt("return",[]);case 10:case"end":return t.stop()}}),t,null,[[0,6]])})))()})),I(j,"FETCH_ITEMS",(function(t,e){t.commit,t.state;return S(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(O.E)(e);case 3:return t.abrupt("return",t.sent);case 6:return t.prev=6,t.t0=t.catch(0),Object(y.b)("FETCH_ITEMS")(t.t0),t.abrupt("return",[]);case 10:case"end":return t.stop()}}),t,null,[[0,6]])})))()})),I(j,"FETCH_PRODUCT_GROUP",(function(t,e){t.commit;var r=e.type,a=e.entityCode;return S(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(O.N)(r,a||void 0);case 3:return t.abrupt("return",t.sent);case 6:t.prev=6,t.t0=t.catch(0),Object(y.b)("FETCH_PRODUCT_GROUP",!0)(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()})),I(j,"FETCH_CATALOG_DATA",(function(t,e){var r=t.state,a=t.dispatch,n=t.commit;return S(regeneratorRuntime.mark((function t(){var i,o,c,s,u,l,d,p,m,g,f,b,h,_,y,C,O,w,j,T,E,I,x;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=e.type,o=e.entityCode,c=e.filter,s=e.routeSegments,u=e.filterSegments,l=e.page,d=e.orderField,p=e.orderDirection,m=e.showMore,g={},f=[],b=c,h=null,_=null,y=null,r.type===i&&r.entityCode===o){t.next=19;break}return t.next=10,a("FETCH_PRODUCT_GROUP",{type:i,entityCode:o});case 10:g.productGroup=t.sent,g.entityCode=o,g.type=i,h=g.productGroup.based,_=g.productGroup.excluded_filters,y=g.productGroup.filters,h===v.c.FILTERS?f.push({action:"FETCH_CATEGORIES",payload:{code:y.category}}):(g.categories=[],g.activeCategories=[]),t.next=24;break;case 19:g.productGroup=r.productGroup,g.categories=r.categories,h=r.productGroup.based,_=r.productGroup.excluded_filters,y=r.productGroup.filters;case 24:return b=P({},c,{},y,{category:c.category||y.category||null}),r.baseCategoryCode!==y.category||r.categoryCode!==c.category?h===v.c.FILTERS?(g.baseCategoryCode=y.category,g.categoryCode=c.category,f.push({action:"FETCH_FILTERS",payload:{categoryCode:b.category,excludedFilters:_}})):(g.baseCategoryCode=null,g.categoryCode=null,g.filters=[]):(g.categoryCode=r.categoryCode,g.baseCategoryCode=r.baseCategoryCode),g.routeSegments=s,g.filterSegments=u,g.page=l,f.push({action:"FETCH_ITEMS",payload:{filter:P({},b,{category:b.category||void 0}),page:l,orderField:d,orderDirection:p}}),t.next=32,Promise.all(f.map((function(t){return a(t.action,t.payload)})));case 32:C=t.sent,O=0;case 34:if(!(O<f.length)){t.next=52;break}w=f[O],j=C[O],t.t0=w.action,t.next="FETCH_CATEGORIES"===t.t0?40:"FETCH_FILTERS"===t.t0?42:"FETCH_ITEMS"===t.t0?44:48;break;case 40:return g.categories=j,t.abrupt("break",49);case 42:return g.filters=j,t.abrupt("break",49);case 44:return T=j.items,E=void 0===T?[]:T,I=j.range,x=void 0===I?0:I,g.items=m?[].concat(k(r.items),k(E)):E,g.range=x,t.abrupt("break",49);case 48:return t.abrupt("break",49);case 49:O++,t.next=34;break;case 52:n("APPLY_DATA",g);case 53:case"end":return t.stop()}}),t)})))()})),j);r("2JJK");function F(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function D(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?F(Object(r),!0).forEach((function(e){L(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):F(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function L(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var B=(L(A={},"activeCategories",(function(t){var e=t.categories,r=t.baseCategoryCode,a=t.categoryCode;return Object(C.e)(e,a||r)})),L(A,"rootCategory",(function(t,e){var r=t.baseCategoryCode;return e.activeCategories.find((function(t){return t.code===r}))})),L(A,"breadcrumbs",(function(t,e){var r=e.rootCategory,a=e.activeCategories,n=a.indexOf(r);return-1!==n?a.slice(n+1):a})),L(A,"activePage",(function(t,e,r){var a=r.route;return a.query.page?Number(a.query.page):1})),L(A,"pagesCount",(function(t){return Math.ceil(t.range/12)})),L(A,"activeCategory",(function(t,e){var r=e.activeCategories;return r[r.length-1]})),L(A,"routeSegments",(function(t,e,r){var a=r.route.params.pathMatch;return a?a.split("/"):[]})),L(A,"filterSegments",(function(t,e){var r=e.routeSegments;return Object(C.f)(r)})),L(A,"activeTags",(function(t,e){for(var r=[],a=t.filters.filter((function(t){return"range"!==t.type})),n=e.filterSegments,i=0;i<a.length;i++)for(var o=a[i],c=0;c<o.items.length;c++){var s=o.items[c];n[o.name]&&n[o.name][s.code]&&r.push(D({},s,{segment:"".concat(o.name,"-").concat(s.code)}))}return r})),A);function H(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var $="catalog";function G(){var t;return{name:$,namespaced:!0,state:(t={},H(t,"loadPath",null),H(t,"type",null),H(t,"entityCode",null),H(t,"categoryCode",null),H(t,"baseCategoryCode",null),H(t,"productGroup",H({type:v.d.CATALOG,base:v.c.FILTERS,excluded_filters:[],filters:{}},"banner",{})),H(t,"categories",[]),H(t,"filters",[]),H(t,"items",[]),H(t,"range",0),H(t,"routeSegments",[]),H(t,"filterSegments",{}),t),actions:R,mutations:T,getters:B}}r("x3SC");function M(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function V(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var q={name:"category-tree-item",props:{item:{type:Object,required:!0},depth:{type:Number,default:0},disabled:{type:Boolean,default:!0}},data:function(){return{isHover:!1}},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?M(Object(r),!0).forEach((function(e){V(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(h.d)("route",{type:function(t){return t.params.type},entityCode:function(t){return t.params.entityCode}}),{},Object(h.c)($,["rootCategory","activeCategories"]),{isActive:function(){var t=this;return(this.activeCategories||[]).some((function(e){return e.code===t.item.code}))},isRoot:function(){var t=this.item.code,e=this.depth,r=this.rootCategory;return r?t===r.code:0===e},isInteractive:function(){this.type;var t=this.item.code,e=this.rootCategory,r=this.isRoot,a=this.disabled;return e?t&&(r||!a):t},url:function(){var t=this.entityCode,e=this.type,r=this.item.code,a=this.isRoot,n=(this.disabled,this.rootCategory);return{path:Object(C.c)(e,t,n?!a&&r:r)}},hasChildren:function(){this.entityCode,this.type,this.item.items;return Array.isArray(this.item.items)}}),methods:{onMouseOver:function(t){this.isHover=t}}},U=r("KHd+"),N=Object(U.a)(q,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"category-tree-item",class:[{"category-tree-item--root":0===t.depth},{"category-tree-item--active":t.isActive}],on:{mouseover:function(e){return t.onMouseOver(!0)},mouseleave:function(e){return t.onMouseOver(!1)}}},[r("div",{staticClass:"category-tree-item__label"},[t.isInteractive?r("router-link",{staticClass:"category-tree-item__link",attrs:{to:t.url,exact:""===t.item.code}},[t._v("\n            "+t._s(t.item.name)+"\n        ")]):r("span",{staticClass:"category-tree-item__link"},[t._v("\n            "+t._s(t.item.name)+"\n        ")])],1),t._v(" "),r("transition",{attrs:{name:"slide-right"}},[t.hasChildren&&(t.isHover||t.isActive)?r("ul",{staticClass:"category-tree-item__list"},t._l(t.item.items,(function(e,a){return r("category-tree-item",{key:e.id||a,staticClass:"category-tree-item__item",attrs:{item:e,depth:t.depth+1,disabled:!t.isInteractive}})})),1):t._e()])],1)}),[],!1,null,null,null).exports,z=r("MhNv"),W=r("sEfC"),K=r.n(W);r("Xtz6");function Y(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function J(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var X={name:"catalog-filter",components:{VButton:i.a,VCheck:o.a,VRange:s.a,VAccordion:z.a},props:{btnText:{type:String,default:"Очистить фильтры"}},data:function(){return{format:{to:function(t){return Math.round(t)},from:function(t){return Number(t)}}}},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Y(Object(r),!0).forEach((function(e){J(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Y(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(h.c)($,["filterSegments","routeSegments"]),{},Object(h.d)($,["filters"]),{},Object(h.d)("route",{type:function(t){return t.params.type},code:function(t){return t.params.code},entityCode:function(t){return t.params.entityCode}}),{accordionFilters:function(){return this.filters?this.filters.map((function(t){return{id:t.id,item:t,title:t.title,isExpanded:!0}})):[]},clearFilterUrl:function(){var t=this.type,e=this.entityCode,r=this.code;return Object(C.c)(t,e,r)}}),methods:{onRadioChange:function(t,e){var r=this.type,a=this.entityCode,n=this.code,i=this.routeSegments;i.includes(e)||i.push(e),function(t){throw new Error('"'+t+'" is read-only')}("routeSegments"),i=i.filter((function(t){return t===e}));var o=Object(C.b)(r,a,n,i);this.$router.replace({path:o})},onCheckChange:function(t,e){var r=this.type,a=this.entityCode,n=this.code,i=this.routeSegments;if(t){if(i.includes(e))return;i.push(e)}else{if(!i.includes(e))return;var o=i.indexOf(e);-1!==o&&i.splice(o,1)}var c=Object(C.b)(r,a,n,i);this.$router.replace({path:c})},onRangeChange:function(t,e){this.debounce_rangeChange(t,e)}},beforeMount:function(){var t=this;this.debounce_rangeChange=K()((function(e,r){for(var a=t.type,n=t.entityCode,i=t.code,o=t.routeSegments,c="".concat(r,"-from_").concat(e[0],"_to_").concat(e[1]),s=new RegExp("^".concat(r,"-")),u=-1,l=0;l<o.length;l++)if(o[l].match(s)){u=l;break}if(-1!==u){if(o[u]===c)return;o.splice(u,1,c)}else o.push(c);var d=Object(C.b)(a,n,i,o);t.$router.replace({path:d})}),500)}},Q=Object(U.a)(X,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.accordionFilters&&t.accordionFilters.length>0?r("div",{staticClass:"catalog-filter"},[r("v-accordion",{staticClass:"catalog-filter__filters",attrs:{"key-field":"id",items:t.accordionFilters,"item-expanded":function(t){return t.isExpanded},"item-toggled":function(t){return t.isExpanded=!t.isExpanded}},scopedSlots:t._u([{key:"content",fn:function(e){var a=e.item;return["range"===a.item.type?r("div",{staticClass:"catalog-filter__filters-range"},[r("v-range",{attrs:{initialValue:[a.item.min,a.item.max],value:t.filterSegments[a.item.name]||[a.item.min,a.item.max],max:a.item.max,min:a.item.min,format:t.format},on:{input:function(e){return t.onRangeChange(e,a.item.name)}}})],1):"check"===a.item.type?r("div",{staticClass:"catalog-filter__filters-check"},t._l(a.item.items,(function(e){return r("v-check",{key:e.id,attrs:{id:a.item.name+"-"+e.id,name:a.item.name,checked:t.filterSegments[a.item.name]&&t.filterSegments[a.item.name][e.code]},on:{change:function(r){return t.onCheckChange(r,a.item.name+"-"+e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])})),1):"radio"===a.item.type?r("div",{staticClass:"catalog-filter__filters-check"},t._l(a.item.items,(function(e){return r("v-check",{key:e.id,attrs:{id:a.item.name+"-"+e.id,type:"radio",name:a.item.name,checked:t.filterSegments[a.item.name]&&t.filterSegments[a.item.name][e.code]},on:{change:function(r){return t.onRadioChange(r,a.item.name+"-"+e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])})),1):t._e()]}}],null,!1,1429883620)}),t._v(" "),r("v-button",{staticClass:"btn--outline catalog-filter__clear-btn",attrs:{to:t.clearFilterUrl,replace:""}},[t._v("\n        "+t._s(t.btnText)+"\n    ")])],1):t._e()}),[],!1,null,null,null).exports,Z=r("LqtR"),tt=r("jYNS"),et=r("aXGN"),rt=(r("hqjE"),Object.freeze({WHITE:"white",BLACK:"black",OUTLINE_BLACK:"outline_black",OUTLINE_WHITE:"outline_white"})),at=Object.freeze({TOP:"top",BOTTOM:"bottom",LEFT:"left",RIGHT:"right",TOP_LEFT:"top_left",TOP_RIGHT:"top_right",BOTTOM_LEFT:"bottom_left",BOTTOM_RIGHT:"bottom_right"}),nt={name:"catalog-banner-list-card",components:{VButton:i.a,VPicture:tt.a},props:{item:{type:Object,default:function(){return{}}}},computed:{mobileImg:function(){var t=this.item.mobileImage||this.item.tabletImage||this.item.desktopImage;return Object(et.c)(320,320,t.id,"webp")},tabletImg:function(){var t=this.item.tabletImage||this.item.desktopImage;return Object(et.c)(540,360,t.id,"webp")},desktopImg:function(){var t=this.item.desktopImage||this.item.tabletImage;return Object(et.c)(600,400,t.id,"webp")},defaultImg:function(){var t=this.item.desktopImage||this.item.tabletImage||this.item.mobileImage.id;return Object(et.c)(600,400,t.id,t.sourceExt)},btnClasses:function(){var t=[];switch(this.item.button.type){case rt.WHITE:t.push("btn--white");break;case rt.OUTLINE_WHITE:t.push("btn--white"),t.push("btn--outline");break;case rt.OUTLINE_BLACK:t.push("btn--outline")}return t},panelClasses:function(){var t=[];switch(this.item.button.location){case at.LEFT:t.push("catalog-banner-list-card__panel--left");break;case at.RIGHT:t.push("catalog-banner-list-card__panel--right");break;case at.TOP:t.push("catalog-banner-list-card__panel--top");break;case at.TOP_LEFT:t.push("catalog-banner-list-card__panel--top-left");break;case at.TOP_RIGHT:t.push("catalog-banner-list-card__panel--top-right");break;case at.BOTTOM:t.push("catalog-banner-list-card__panel--bottom");break;case at.BOTTOM_LEFT:t.push("catalog-banner-list-card__panel--bottom-left");break;case at.BOTTOM_RIGHT:t.push("catalog-banner-list-card__panel--bottom-right")}return t}}},it=Object(U.a)(nt,(function(){var t=this.$createElement;return(this._self._c||t)("li",{staticClass:"catalog-banner-list-card"},[this._m(0),this._v(" "),this.item.button?this._m(1):this._e()])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"catalog-banner-list-card__img"},[e("v-picture",[e("source",{attrs:{"data-srcset":this.desktopImg,type:"image/webp",media:"(min-width: 1024px)"}}),this._v(" "),e("source",{attrs:{"data-srcset":this.tabletImg,type:"image/webp",media:"(min-width: 480px)"}}),this._v(" "),e("source",{attrs:{"data-srcset":this.mobileImg,type:"image/webp",media:"(max-width: 479px)"}}),this._v(" "),e("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":this.defaultImg,alt:""}})])],1)},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"catalog-banner-list-card__panel",class:this.panelClasses},[e("v-button",{staticClass:"catalog-banner-list-card__panel-btn",class:this.btnClasses,attrs:{to:this.item.button.url||"/"}},[this._v("\n            "+this._s(this.item.button.text)+"\n        ")])],1)}],!1,null,null,null).exports,ot=r("7cXU"),ct=r("7bnD"),st=r("fB3W"),ut=r("YNzt"),lt=(r("nhva"),r("CxEY"),r("iHux"),r("gB8C"),r("FIks"),{name:"catalog-product-list-card",components:{VSvg:n.a,VLink:ot.a,VButton:i.a,VRating:ct.a,VPicture:tt.a,Tag:st.a,Price:ut.a},props:{item:{type:Object,default:function(){return{categoryCodes:[],tags:[],stocks:{qty:0}}}},isSmall:{type:Boolean,default:!1},showWishlistBtn:{type:Boolean,default:!0}},computed:{showBuyBtn:function(){var t=this.item.stock,e=(t=void 0===t?{qty:0}:t).qty;return(void 0===e?0:e)>0},bigImg:function(){return Object(et.c)(300,300,this.item.image.id,"webp")},smallImg:function(){return Object(et.c)(200,200,this.item.image.id,"webp")},defaultImg:function(){return Object(et.c)(200,200,this.item.image.id,this.item.image.sourceExt)},href:function(){return this.item.categoryCodes&&0!==this.item.categoryCodes.length?"/catalog/".concat(this.item.categoryCodes[this.item.categoryCodes.length-1],"/").concat(this.item.code):"/catalog"}},methods:{onBuyButtonClick:function(){this.$emit("addItem",{id:this.item.id,storeId:this.item.stock.storeId,type:this.item.type})},onPreview:function(){this.$emit("preview",{id:this.item.id,type:this.item.type})}}}),dt=Object(U.a)(lt,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("router-link",{staticClass:"catalog-product-list-card",class:{"catalog-product-list-card--small":t.isSmall},attrs:{tag:"li",to:t.href}},[t._m(0),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t.showWishlistBtn?r("v-link",{staticClass:"catalog-product-list-card__wishlist-btn",attrs:{tag:"button"},on:{click:function(t){t.preventDefault()}}},[r("v-svg",{attrs:{name:"wishlist-middle",width:"24",height:"24"}})],1):t._e()],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__img"},[t.item.image&&t.item.image.id?r("v-picture",[r("source",{attrs:{"data-srcset":t.bigImg,type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),r("source",{attrs:{"data-srcset":t.smallImg,type:"image/webp",media:"(max-width: 479px)"}}),t._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})]):r("v-svg",{attrs:{id:"catalog-product-list-card-empty",name:"logo",width:"48",height:"48"}}),t._v(" "),r("div",{staticClass:"catalog-product-list-card__controls"},[t.showBuyBtn?r("v-button",{staticClass:"btn--outline catalog-product-list-card__controls-btn",on:{click:function(e){return e.preventDefault(),t.onBuyButtonClick(e)}}},[t._v("\n                Купить\n            ")]):t._e(),t._v(" "),r("v-link",{staticClass:"catalog-product-list-card__controls-link",attrs:{tag:"button"},on:{click:function(e){return e.preventDefault(),t.onPreview(e)}}},[t._v("\n                Быстрый просмотр\n            ")])],1)],1)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__rating"},t._l(5,(function(e){return r("span",{key:e,staticClass:"catalog-product-list-card__rating-star",class:{"catalog-product-list-card__rating-star--empty":e>t.item.rating}})})),0)},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"catalog-product-list-card__body"},[r("div",{staticClass:"catalog-product-list-card__prices"},[t.item.price?r("price",t._b({staticClass:"text-bold catalog-product-list-card__price"},"price",t.item.price,!1)):t._e(),t._v(" "),t.item.oldPrice?r("price",t._b({staticClass:"text-sm text-grey text-strike catalog-product-list-card__price"},"price",t.item.oldPrice,!1)):t._e()],1),t._v(" "),r("div",{staticClass:"link--sm catalog-product-list-card__link"},[t._v(t._s(t.item.name))]),t._v(" "),t._m(1)])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"catalog-product-list-card__tags"},this._l(this.item.tags,(function(t){return e("tag",{key:t.id,staticClass:"catalog-product-list-card__tags-item",attrs:{text:t.name}})})),1)}],!1,null,null,null).exports,pt=r("/Qa0"),mt=r("Jtxo"),gt=r("55Sm"),ft=r("jDKC");r("bhYy");function bt(t,e,r,a,n,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(a,n)}function ht(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function vt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ht(Object(r),!0).forEach((function(e){_t(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ht(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function _t(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var yt=0,Ct={name:"catalog-product-list",props:{animation:{type:Boolean,default:!0}},components:{CatalogBannerListCard:it,CatalogProductListCard:dt},computed:vt({},Object(h.d)($,["items","categories"])),methods:vt({},Object(h.b)(gt.b,[ft.a]),{getComponent:function(t){switch(t){case v.b.PRODUCT:return dt.name;case v.b.BANNER:return it.name}},getClass:function(t){return{"catalog-product-list__item--banner":t===v.b.BANNER}},onBeforeEnterItems:function(t){t.dataset.index=yt,yt+=1,t.style.opacity=0},itemAnimation:function(t,e){return new Promise((function(r,a){try{setTimeout((function(){requestAnimationFrame((function(){t.style.opacity=1,r()}))}),e)}catch(t){a(t)}}))},onEnterItems:function(t,e){var r,a=this;return(r=regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=100*t.dataset.index,r.next=3,a.itemAnimation(t,n);case 3:e();case 4:case"end":return r.stop()}}),r)})),function(){var t=this,e=arguments;return new Promise((function(a,n){var i=r.apply(t,e);function o(t){bt(i,a,n,o,c,"next",t)}function c(t){bt(i,a,n,o,c,"throw",t)}o(void 0)}))})()},onAfterEnterItems:function(t){delete t.dataset.index,yt=0},onLeaveItems:function(t,e){requestAnimationFrame((function(){t.style.opacity=0,e()}))},onPreview:function(t){this[ft.a]({name:pt.a,open:!0,state:{code:t}})},onAddToCart:function(t){this[ft.a]({name:mt.a,open:!0,state:{offerId:t.id,storeId:t.stock.storeId,type:t.type}})}})},Ot=Object(U.a)(Ct,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.animation?r("transition-group",{staticClass:"catalog-product-list",class:{"catalog-product-list--no-category":0===t.categories.length},attrs:{tag:"ul",name:"catalog-item"},on:{"before-enter":t.onBeforeEnterItems,enter:t.onEnterItems,"after-enter":t.onAfterEnterItems,leave:t.onLeaveItems}},t._l(t.items,(function(e){return r(t.getComponent(e.type),{key:e.id,tag:"component",staticClass:"catalog-product-list__item",class:t.getClass(e.type),attrs:{item:e},on:{addItem:function(r){return t.onAddToCart(e)},preview:function(r){return t.onPreview(e.code)}}})})),1):r("ul",{staticClass:"catalog-product-list"},t._l(t.items,(function(e){return r(t.getComponent(e.type),{key:e.id,tag:"component",staticClass:"catalog-product-list__item",class:t.getClass(e.type),attrs:{item:e},on:{addItem:function(r){return t.onAddToCart(e)},preview:function(r){return t.onPreview(e.code)}}})})),1)}),[],!1,null,null,null).exports,wt=r("8TZ/"),jt=r("0CxO"),Tt=r("4mC1");r("4eDr"),r("9bRU");function kt(t,e,r,a,n,i,o){try{var c=t[i](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(a,n)}function Et(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function Pt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Et(Object(r),!0).forEach((function(e){It(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Et(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function It(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var xt={name:"catalog",components:{VSvg:n.a,VButton:i.a,VSelect:u.a,VPagination:c.a,VSticky:l.a,VExpander:d.a,Modal:p.a,Breadcrumbs:m.a,BreadcrumbItem:g.a,FilterButton:f.a,TagItem:b.a,CategoryTreeItem:N,CatalogFilter:Q,CatalogProductList:Ot,CatalogBannerCard:Z.a},data:function(){var t=[{id:1,title:"Сначала подороже",field:"price",direction:"desc"},{id:2,title:"Сначала подешевле",field:"price",direction:"asc"}];return{sortValue:t[0],sortOptions:t,filterModal:!1,showMore:!1}},computed:Pt({},Object(h.c)($,["activeTags","activeCategory","activePage","pagesCount","routeSegments","breadcrumbs"]),{},Object(h.d)($,["items","banner","categories","productGroup","type"]),{},Object(h.d)(gt.b,{isQuickViewOpen:function(t){return t[gt.a][pt.a]&&t[gt.a][pt.a].open},isAddToCartOpen:function(t){return t[gt.a][mt.a]&&t[gt.a][mt.a].open}}),{},Object(h.d)("route",{code:function(t){return t.params.code},entityCode:function(t){return t.params.entityCode}}),{breadcrumbRootUrl:function(){var t=this.type,e="";switch(t){case v.d.CATALOG:case v.d.NEW:e="Catalog";break;default:e="ProductGroups"}return{name:e,params:{type:t}}},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet},mobileImg:function(){var t=this.productGroup.banner,e=t.mobileImage||t.tabletImage||t.desktopImage;if(e)return Object(et.c)(320,240,e.id,"webp")},tabletImg:function(){var t=this.productGroup.banner,e=t.tabletImage||t.desktopImage;if(e)return Object(et.c)(768,240,e.id,"webp")},desktopImg:function(){var t=this.productGroup.banner,e=t.desktopImage||t.tabletImage;if(e)return Object(et.c)(1224,240,e.id,"webp")},defaultImg:function(){var t=this.productGroup.banner,e=t.desktopImage||t.tabletImage||t.mobileImage;if(e)return Object(et.c)(1224,240,e.id,e.sourceExt)}}),watch:{sortValue:function(t,e){t!==e&&this.$router.replace({path:this.$route.path,query:{orderField:t.field,orderDirection:t.direction}})}},methods:Pt({},Object(h.b)($,["FETCH_CATALOG_DATA","SET_LOAD_PATH"]),{},Object(h.b)(wt.c,[jt.a]),{},Object(h.b)(gt.b,[ft.a]),{generateBreadcrumbUrl:function(t){var e=this.type,r=this.entityCode;return{path:Object(C.c)(e,r,t)}},setSortValue:function(t,e){this.sortValue=this.sortOptions.find((function(r){return r.field===t&&r.direction===e}))||this.sortOptions[0]},onClickDeleteTag:function(t){var e=this.type,r=this.code,a=this.entityCode,n=this.routeSegments;if(n.includes(t)){var i=n.indexOf(t);-1!==i&&n.splice(i,1);var o=Object(C.b)(e,a,r,n);this.$router.replace({path:o})}},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:Pt({},this.$route.query,{page:this.activePage+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:Pt({},this.$route.query,{page:t})})},fetchCatalog:function(t,e,r){var a,n=this;return(a=regeneratorRuntime.mark((function a(){var i,o,c,s,u,l,d,p,m,g,f,b,h,v,y,O,w,j,T,k;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,i=t.params,o=i.code,c=i.entityCode,s=i.type,u=i.pathMatch,l=t.query,d=l.page,p=void 0===d?1:d,m=l.orderField,g=void 0===m?"price":m,f=l.orderDirection,b=void 0===f?"desc":f,(h=e.params).code,h.entityCode,h.type,v=e.query,y=(v=void 0===v?{page:1}:v).page,O=void 0===y?1:y,w=Object(C.a)(u,o),j=w.filter,T=w.routeSegments,k=w.filterSegments,n.$progress.start(),a.next=10,n.FETCH_CATALOG_DATA({type:s,entityCode:c,code:o,filter:j,routeSegments:T,filterSegments:k,page:p,orderField:g,orderDirection:b,showMore:r});case 10:n.setSortValue(g,b),n.$progress.finish(),r||p===O||window.scrollTo({top:Tt.c+1,behavior:"smooth"}),r&&setTimeout((function(){return n.showMore=!1}),200),a.next=23;break;case 16:if(a.prev=16,a.t0=a.catch(0),!a.t0||!0!==a.t0.isCancel){a.next=20;break}return a.abrupt("return");case 20:n.$progress.fail(),_.$logger.error("fetchCatalog",a.t0),n.$progress.finish();case 23:case"end":return a.stop()}}),a,null,[[0,16]])})),function(){var t=this,e=arguments;return new Promise((function(r,n){var i=a.apply(t,e);function o(t){kt(i,r,n,o,c,"next",t)}function c(t){kt(i,r,n,o,c,"throw",t)}o(void 0)}))})()}}),beforeRouteEnter:function(t,e,r){var a=t.fullPath,n=t.params,i=n.code,o=void 0===i?null:i,c=n.entityCode,s=void 0===c?null:c,u=n.type,l=n.pathMatch,d=t.query,p=(d=void 0===d?{page:1,orderField:"price",orderDirection:"desc"}:d).page,m=void 0===p?1:p,g=d.orderField,f=void 0===g?"price":g,b=d.orderDirection,h=void 0===b?"desc":b;Object(y.a)(_.$store,$,G);var v=_.$store.state[$],O=v.loadPath,w=v.categoryCode,j=v.entityCode,T=v.type;if(O===a&&u===T&&o===w&&s===j)r((function(t){return t.setSortValue(f,h)}));else{var k=Object(C.a)(l,o),E=k.filter,P=k.routeSegments,I=k.filterSegments;_.$progress.start(),_.$store.dispatch("".concat($,"/").concat("FETCH_CATALOG_DATA"),{type:u,entityCode:s,code:o,filter:E,routeSegments:P,filterSegments:I,page:m,orderField:f,orderDirection:h}).then((function(t){_.$store.dispatch("".concat($,"/").concat("SET_LOAD_PATH"),a),r((function(t){t.setSortValue(f,h),_.$progress.finish()}))})).catch((function(t){if(t&&!0===t.isCancel)return r();_.$progress.fail(),_.$logger.error("beforeRouteEnter",t),_.$progress.finish(),r()}))}},beforeRouteUpdate:function(t,e,r){var a=t.params,n=a.code,i=a.entityCode,o=a.type,c=a.pathMatch,s=t.query,u=s.page,l=void 0===u?1:u,d=s.orderField,p=void 0===d?"price":d,m=s.orderDirection,g=void 0===m?"desc":m,f=e.params,b=f.code,h=f.entityCode,v=f.type,_=f.pathMatch,y=e.query,C=y.page,O=void 0===C?1:C,w=y.orderField,j=void 0===w?"price":w,T=y.orderDirection;if(o===v&&i===h&&n===b&&c===_&&l===O&&p===j&&g===(void 0===T?"desc":T))return r();this.showMore?this.fetchCatalog(t,e,this.showMore):this.debounce_fetchCatalog(t,e),r()},beforeRouteLeave:function(t,e,r){this.debounce_fetchCatalog.cancel(),r()},beforeMount:function(){this.debounce_fetchCatalog=K()(this.fetchCatalog,500)}},St=Object(U.a)(xt,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section catalog-view"},[r("div",{staticClass:"container catalog-view__header"},[r("breadcrumbs",{staticClass:"catalog-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t._v("\n                Главная\n            ")]),t._v(" "),r("breadcrumb-item",{key:t.type,attrs:{to:t.breadcrumbRootUrl}},[t._v("\n                "+t._s(t.$t("productGroups.title."+t.type))+"\n            ")]),t._v(" "),t.entityCode?r("breadcrumb-item",{key:t.entityCode,attrs:{to:t.generateBreadcrumbUrl(null)}},[t._v("\n                "+t._s(t.productGroup&&t.productGroup.name)+"\n            ")]):t._e(),t._v(" "),t._l(t.breadcrumbs,(function(e){return r("breadcrumb-item",{key:e.id,attrs:{to:t.generateBreadcrumbUrl(e.code)}},[t._v("\n                "+t._s(e.name)+"\n            ")])}))],2),t._v(" "),t.productGroup.banner?r("catalog-banner-card",{staticClass:"catalog-view__banner",attrs:{item:t.productGroup.banner}},[t.desktopImg?r("source",{attrs:{"data-srcset":t.desktopImg,type:"image/webp",media:"(min-width: 1024px)"}}):t._e(),t._v(" "),t.tabletImg?r("source",{attrs:{"data-srcset":t.tabletImg,type:"image/webp",media:"(min-width: 480px)"}}):t._e(),t._v(" "),t.mobileImg?r("source",{attrs:{"data-srcset":t.mobileImg,type:"image/webp",media:"(max-width: 479px)"}}):t._e(),t._v(" "),t.defaultImg?r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}}):t._e()]):t._e()],1),t._v(" "),r("section",{staticClass:"section"},[r("div",{staticClass:"container catalog-view__grid"},[!t.isTabletLg&&t.categories.length>0?r("div",{staticClass:"catalog-view__side-panel"},[r("ul",{staticClass:"catalog-view__side-panel-categories"},t._l(t.categories,(function(t){return r("category-tree-item",{key:t.id,staticClass:"catalog-view__side-panel-categories-item",attrs:{item:t}})})),1),t._v(" "),r("catalog-filter",{staticClass:"catalog-view__side-panel-filters"})],1):t._e(),t._v(" "),r("div",{staticClass:"catalog-view__main"},[r("div",{staticClass:"catalog-view__main-header"},[r("div",{staticClass:"catalog-view__main-header-title"},[r("h1",{staticClass:"catalog-view__main-header-hl"},[t._v("\n                            "+t._s(t.activeCategory?t.activeCategory.name:"Все категории")+"\n                        ")]),t._v(" "),r("p",{staticClass:"text-grey catalog-view__main-header-text"},[t._v("489 продуктов")])]),t._v(" "),r("v-select",{staticClass:"catalog-view__main-header-sort",attrs:{label:"title","track-by":"id",options:t.sortOptions,searchable:!1,"allow-empty":!1,"show-labels":!1},model:{value:t.sortValue,callback:function(e){t.sortValue=e},expression:"sortValue"}}),t._v(" "),r("filter-button",{staticClass:"catalog-view__main-header-btn",on:{click:function(e){t.filterModal=!t.filterModal}}},[t._v("\n                        Фильтр и сортировка  \n                        "),r("span",{staticClass:"text-grey"},[t._v(t._s(t.activeTags.length))])])],1),t._v(" "),t.isTabletLg?t._e():r("transition-group",{staticClass:"catalog-view__main-tags",attrs:{tag:"ul",name:"tag-item"}},t._l(t.activeTags,(function(e,a){return r("tag-item",{key:e.code,attrs:{"data-index":a,text:e.name},on:{delete:function(r){return t.onClickDeleteTag(e.segment)}}})})),1),t._v(" "),r("catalog-product-list",{key:t.type,staticClass:"catalog-view__main-grid",attrs:{animation:!t.isTablet}}),t._v(" "),t.pagesCount>1?r("div",{staticClass:"catalog-view__main-controls"},[t.activePage<t.pagesCount?r("v-button",{staticClass:"btn--outline catalog-view__main-controls-btn",attrs:{disabled:t.showMore},on:{click:t.onShowMore}},[t._v("\n                        Показать ещё\n                    ")]):t._e(),t._v(" "),r("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e()],1)])]),t._v(" "),r("transition",{attrs:{name:"fade-in"}},[t.filterModal&&t.isTabletLg?r("modal",{staticClass:"catalog-view__modal-filter",attrs:{"show-close-btn":!1,type:"fullscreen"},scopedSlots:t._u([{key:"body",fn:function(){return[r("v-sticky",{staticClass:"catalog-view__modal-filter-sticky",scopedSlots:t._u([{key:"sticky",fn:function(){return[r("div",{staticClass:"catalog-view__modal-filter-header"},[r("button",{staticClass:"catalog-view__modal-filter-header-btn",on:{click:function(e){t.filterModal=!1}}},[r("v-svg",{attrs:{name:"cross-small",width:"14",height:"14"}}),t._v("Фильтр\n                            ")],1)])]},proxy:!0}],null,!1,219555529)},[t._v(" "),r("div",{staticClass:"catalog-view__modal-filter-sort"},[r("div",{staticClass:"catalog-view__modal-filter-sort-title"},[t._v("Сортировка")]),t._v(" "),r("ul",{staticClass:"catalog-view__modal-filter-sort-list"},t._l(t.sortOptions,(function(e){return r("li",{key:e.title,staticClass:"catalog-view__modal-filter-sort-item",class:{"catalog-view__modal-filter-sort-item--active":e===t.sortValue}},[r("button",{staticClass:"catalog-view__modal-filter-sort-btn",on:{click:function(r){t.sortValue=e}}},[t._v("\n                                    "+t._s(e.title)+"\n                                ")])])})),0)]),t._v(" "),r("catalog-filter",{staticClass:"catalog-view__modal-filter-panel"})],1)]},proxy:!0}],null,!1,2324292678)}):t._e()],1),t._v(" "),r("section",{staticClass:"section catalog-view__section catalog-view__seo"},[r("div",{staticClass:"container catalog-view__seo-container"},[r("h2",{staticClass:"catalog-view__section-hl catalog-view__seo-hl"},[t._v("Блок SEO текста")]),t._v(" "),r("v-expander",{staticClass:"catalog-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:t._u([{key:"btn",fn:function(e){var r=e.isExpanded;return[t._v("\n                    "+t._s(r?"Скрыть":"Показать больше")+"\n                ")]}}])},[t._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)])],1)}),[],!1,null,null,null);e.default=St.exports},"9bRU":function(t,e,r){},FIks:function(t,e,r){},Xtz6:function(t,e,r){},bhYy:function(t,e,r){},hqjE:function(t,e,r){},x3SC:function(t,e,r){}}]);