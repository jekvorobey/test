(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{"/Rcj":function(e,t,r){"use strict";r.r(t);var n,a=r("NDiG"),i=r("i2Ud"),o=r("o3vK"),c=r("+gqB"),s=r("nuHk"),l=r("pFko"),u=r("ze5i"),d=r("wo+G"),f=r("2/Mz"),g=r("KLyl"),m=r("tHOl"),p=r("BZIu"),v=r("Nlzp");function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var _,h=(b(n={},"SET_LOAD",(function(e,t){e.load=t})),b(n,"SET_BANNER",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.banner=t})),b(n,"SET_ITEMS",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{items:[],range:0},r=t.items,n=t.range;e.items=r||[],e.range=n||0})),b(n,"SET_CATEGORY_CODE",(function(e,t){e.categoryCode=t})),b(n,"SET_BRAND_CODE",(function(e,t){e.brandCode=t})),b(n,"SET_CATEGORIES",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e.categories=t})),b(n,"SET_BRAND",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.brand=t})),b(n,"SET_FILTERS",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e.filters=t})),n);r("VgBE");function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function O(e,t,r,n,a,i,o){try{var c=e[i](o),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,a)}function y(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function o(e){O(i,n,a,o,c,"next",e)}function c(e){O(i,n,a,o,c,"throw",e)}o(void 0)}))}}var w,E,T,j=(C(_={},"FETCH_BANNER",(function(e,t){var r=e.commit;return Object(v.l)().then((function(e){r("SET_BANNER",e[6])})).catch((function(e){return p.$logger.error("".concat("FETCH_BANNER"," ").concat(e)),[]}))})),C(_,"FETCH_CATEGORIES",(function(e,t){var r=e.commit;return Object(v.q)().then((function(e){r("SET_CATEGORIES",e)})).catch((function(e){return p.$logger.error("".concat("FETCH_CATEGORIES"," ").concat(e)),[]}))})),C(_,"FETCH_FILTERS",(function(e,t){var r=e.commit;return Object(v.s)({categoryCode:t.filter.category,needBrands:Number(!t.brandCode)}).then((function(e){r("SET_FILTERS",e)})).catch((function(e){return p.$logger.error("".concat("FETCH_FILTERS"," ").concat(e)),[]}))})),C(_,"FETCH_ITEMS",(function(e,t){var r=e.commit,n=e.state;return Object(v.p)(t).then((function(e){t.showMore?r("SET_ITEMS",{items:n.items.concat(e.items),range:e.range}):r("SET_ITEMS",e)})).catch((function(e){return p.$logger.error("".concat("FETCH_ITEMS"," ").concat(e)),[]}))})),C(_,"SET_LOAD",(function(e){var t=e.commit,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t("SET_LOAD",r)})),C(_,"FETCH_BRAND",(function(e,t){var r=e.commit;return Object(v.m)(t).then((function(e){return r("SET_BRAND",e)}))})),C(_,"FETCH_BRAND_DATA",(E=y(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.dispatch,e.abrupt("return",Promise.all([n("FETCH_CATEGORIES"),n("FETCH_BRAND",r)]));case 2:case"end":return e.stop()}}),e)}))),function(e,t){return E.apply(this,arguments)})),C(_,"FETCH_CATALOG_DATA",(w=y(regeneratorRuntime.mark((function e(t){var r,n,a,i=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.dispatch,n=t.commit,!(a=i.length>1&&void 0!==i[1]?i[1]:{}).brandCode){e.next=7;break}return e.next=5,Promise.all([r("FETCH_CATEGORIES"),r("FETCH_BRAND",{brandCode:a.brandCode})]);case 5:e.next=9;break;case 7:return e.next=9,Promise.all([r("FETCH_CATEGORIES"),r("FETCH_BANNER")]);case 9:return e.next=11,r("FETCH_FILTERS",a);case 11:return e.abrupt("return",r("FETCH_ITEMS",a).then((function(){n("SET_BRAND_CODE",a.brandCode),n("SET_CATEGORY_CODE",a.filter&&a.filter.category),n("SET_LOAD",!0)})));case 12:case"end":return e.stop()}}),e)}))),function(e){return w.apply(this,arguments)})),_),S=r("W6hq");function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function x(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){A(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function A(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var P,D=(A(T={},"activeCategories",(function(e,t,r){for(var n=e.categories,a=r.route.params.code,i=[],o=null,c=0;c<n.length;c++){var s=n[c];if(o=Object(S.e)(a,s,i)){i.unshift(o);break}}return i})),A(T,"activePage",(function(e,t,r){var n=r.route;return n.query.page?Number(n.query.page):1})),A(T,"pagesCount",(function(e){return Math.ceil(e.range/12)})),A(T,"activeCategory",(function(e,t){var r=t.activeCategories;return r[r.length-1]})),A(T,"routeSegments",(function(e,t,r){var n=r.route.params.pathMatch;return n?n.split("/"):[]})),A(T,"filterSegments",(function(e,t){var r=t.routeSegments;return Object(S.f)(r)})),A(T,"activeTags",(function(e,t){for(var r=[],n=e.filters.filter((function(e){return"range"!==e.type})),a=t.filterSegments,i=0;i<n.length;i++)for(var o=n[i],c=0;c<o.items.length;c++){var s=o.items[c];a[o.name]&&a[o.name][s.code]&&r.push(x({},s,{segment:"".concat(o.name,"-").concat(s.code)}))}return r})),T);function R(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var F="catalog",M={name:F,namespaced:!0,state:(P={},R(P,"load",!1),R(P,"brand",{}),R(P,"brandCode",null),R(P,"banner",{}),R(P,"categoryId",null),R(P,"categoryCode",null),R(P,"categories",[]),R(P,"items",[]),R(P,"range",0),R(P,"filters",[]),P),actions:j,mutations:h,getters:D},I=r("L2JU");r("x3SC");function $(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function H(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var L={name:"category-tree-item",components:{},props:{item:{type:Object,required:!0},depth:{type:Number,default:0}},data:function(){return{isHover:!1}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?$(Object(r),!0).forEach((function(t){H(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):$(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(I.c)(F,["activeCategories"]),{},Object(I.d)("route",{brandCode:function(e){return e.params.brandCode}}),{isActive:function(){return this.activeCategories.includes(this.item)},url:function(){var e=this.brandCode;return this.item&&{path:Object(S.d)(e,this.item.code)}},hasChildren:function(){return this.item&&Array.isArray(this.item.items)}}),methods:{onMouseOver:function(e){this.isHover=e}}},V=r("KHd+"),N=Object(V.a)(L,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",{staticClass:"category-tree-item",class:[{"category-tree-item--root":0===e.depth},{"category-tree-item--active":e.isActive}],on:{mouseover:function(t){return e.onMouseOver(!0)},mouseleave:function(t){return e.onMouseOver(!1)}}},[r("div",{staticClass:"category-tree-item__label"},[void 0!==e.item.code?r("router-link",{staticClass:"category-tree-item__link",attrs:{to:e.url,exact:""===e.item.code}},[e._v("\n            "+e._s(e.item.name)+"\n        ")]):r("span",{staticClass:"category-tree-item__link"},[e._v("\n            "+e._s(e.item.name)+"\n        ")])],1),e._v(" "),r("transition",{attrs:{name:"slide-right"}},[e.hasChildren&&(e.isHover||e.isActive)?r("ul",{staticClass:"category-tree-item__list"},e._l(e.item.items,(function(t,n){return r("category-tree-item",{key:t.id||n,staticClass:"category-tree-item__item",attrs:{item:t,depth:e.depth+1}})})),1):e._e()])],1)}),[],!1,null,null,null).exports,B=r("MhNv"),q=r("sEfC"),G=r.n(q);r("Xtz6");function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Q(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var z={name:"catalog-filter",components:{VButton:i.a,VCheck:o.a,VRange:s.a,VAccordion:B.a},props:{btnText:{type:String,default:"Очистить фильтры"}},data:function(){return{format:{to:function(e){return Math.round(e)},from:function(e){return Number(e)}}}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach((function(t){Q(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(I.c)(F,["filterSegments","routeSegments"]),{},Object(I.d)(F,["filters"]),{},Object(I.d)("route",{code:function(e){return e.params.code},brandCode:function(e){return e.params.brandCode}}),{accordionFilters:function(){return this.filters?this.filters.map((function(e){return{id:e.id,item:e,title:e.title,isExpanded:!0}})):[]},clearFilterUrl:function(){var e=this.code,t=this.brandCode;return t?{path:e?"/brand/".concat(t,"/").concat(e):"/brand/".concat(t)}:{path:e?"/catalog/".concat(e):"/catalog"}}}),methods:{onRadioChange:function(e,t){var r=this.routeSegments,n=this.code,a=this.brandCode;r.includes(t)||r.push(t),r=r.filter((function(e){return e===t}));var i=a?Object(S.b)(a,n,r):Object(S.c)(n,r);this.$router.replace({path:i})},onCheckChange:function(e,t){var r=this.routeSegments,n=this.code,a=this.brandCode;if(e){if(r.includes(t))return;r.push(t)}else{if(!r.includes(t))return;var i=r.indexOf(t);-1!==i&&r.splice(i,1)}var o=a?Object(S.b)(a,n,r):Object(S.c)(n,r);this.$router.replace({path:o})},onRangeChange:function(e,t){this.debounce_rangeChange(e,t)}},beforeMount:function(){var e=this;this.debounce_rangeChange=G()((function(t,r){for(var n=e.routeSegments,a=e.brandCode,i=e.code,o="".concat(r,"-from_").concat(t[0],"_to_").concat(t[1]),c=new RegExp("^".concat(r,"-")),s=-1,l=0;l<n.length;l++)if(n[l].match(c)){s=l;break}if(-1!==s){if(n[s]===o)return;n.splice(s,1,o)}else n.push(o);var u=a?Object(S.b)(a,i,n):Object(S.c)(i,n);e.$router.replace({path:u})}),500)}},J=Object(V.a)(z,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.accordionFilters&&e.accordionFilters.length>0?r("div",{staticClass:"catalog-filter"},[r("v-accordion",{staticClass:"catalog-filter__filters",attrs:{"key-field":"id",items:e.accordionFilters,"item-expanded":function(e){return e.isExpanded},"item-toggled":function(e){return e.isExpanded=!e.isExpanded}},scopedSlots:e._u([{key:"content",fn:function(t){var n=t.item;return["range"===n.item.type?r("div",{staticClass:"catalog-filter__filters-range"},[r("v-range",{attrs:{initialValue:[n.item.min,n.item.max],value:e.filterSegments[n.item.name]||[n.item.min,n.item.max],max:n.item.max,min:n.item.min,format:e.format},on:{input:function(t){return e.onRangeChange(t,n.item.name)}}})],1):"check"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},e._l(n.item.items,(function(t){return r("v-check",{key:t.id,attrs:{id:n.item.name+"-"+t.id,name:n.item.name,checked:e.filterSegments[n.item.name]&&e.filterSegments[n.item.name][t.code]},on:{change:function(r){return e.onCheckChange(r,n.item.name+"-"+t.code)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")])})),1):"radio"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},e._l(n.item.items,(function(t){return r("v-check",{key:t.id,attrs:{id:n.item.name+"-"+t.id,type:"radio",name:n.item.name,checked:e.filterSegments[n.item.name]&&e.filterSegments[n.item.name][t.code]},on:{change:function(r){return e.onRadioChange(r,n.item.name+"-"+t.code)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")])})),1):e._e()]}}],null,!1,1429883620)}),e._v(" "),r("v-button",{staticClass:"btn--outline catalog-filter__clear-btn",attrs:{to:e.clearFilterUrl,replace:""}},[e._v("\n        "+e._s(e.btnText)+"\n    ")])],1):e._e()}),[],!1,null,null,null).exports,K=r("/Q9p"),X=r("LqtR"),Y=r("/Qa0"),Z=r("Jtxo"),W=r("8TZ/"),ee=r("0CxO"),te=r("55Sm"),re=r("jDKC"),ne=r("48TQ"),ae=r("AlLH");r("4eDr"),r("9bRU");function ie(e,t,r,n,a,i,o){try{var c=e[i](o),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,a)}function oe(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function o(e){ie(i,n,a,o,c,"next",e)}function c(e){ie(i,n,a,o,c,"throw",e)}o(void 0)}))}}function ce(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function se(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ce(Object(r),!0).forEach((function(t){le(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ce(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function le(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var ue,de,fe=0,ge={name:"catalog",components:{VSvg:a.a,VButton:i.a,VSelect:l.a,VPagination:c.a,VSticky:u.a,VExpander:d.a,Modal:f.a,FilterButton:g.a,TagItem:m.a,CategoryTreeItem:N,CatalogFilter:J,CatalogProductCard:K.a,CatalogBannerCard:X.a,AddToCartModal:Z.b,QuickViewModal:Y.b},data:function(){var e=[{id:1,title:"Сначала подороже",field:"price",direction:"desc"},{id:2,title:"Сначала подешевле",field:"price",direction:"asc"}];return{sortValue:e[0],sortOptions:e,filterModal:!1,showMore:!1}},computed:se({},Object(I.c)(F,["activeTags","activeCategory","activePage","pagesCount","routeSegments","activeCategories"]),{},Object(I.d)(F,["items","banner","categories","brand"]),{},Object(I.d)(te.b,{isQuickViewOpen:function(e){return e[te.a][Y.a]&&e[te.a][Y.a].open},isAddToCartOpen:function(e){return e[te.a][Z.a]&&e[te.a][Z.a].open}}),{},Object(I.d)("route",{code:function(e){return e.params.code},brandCode:function(e){return e.params.brandCode}}),{isTabletLg:function(){return this.$mq.tabletLg}}),watch:{sortValue:function(e,t){e!==t&&this.$router.replace({path:this.$route.path,query:{orderField:e.field,orderDirection:e.direction}})}},methods:se({},Object(I.b)(F,["FETCH_ITEMS","FETCH_CATALOG_DATA"]),{},Object(I.b)(W.c,[ee.a]),{},Object(I.b)(te.b,[re.a]),{generateBreadcrumbUrl:function(e){var t=this.brandCode;return{path:Object(S.d)(t,e)}},setSortValue:function(e,t){this.sortValue=this.sortOptions.find((function(r){return r.field===e&&r.direction===t}))||this.sortOptions[0]},onBeforeEnterItems:function(e){e.dataset.index=fe,fe+=1,e.style.opacity=0},itemAnimation:function(e,t){return new Promise((function(r,n){try{setTimeout((function(){requestAnimationFrame((function(){e.style.opacity=1,r()}))}),t)}catch(e){n(e)}}))},onEnterItems:(de=oe(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=100*t.dataset.index,e.next=3,this.itemAnimation(t,n);case 3:r();case 4:case"end":return e.stop()}}),e,this)}))),function(e,t){return de.apply(this,arguments)}),onAfterEnterItems:function(e){delete e.dataset.index,fe=0},onLeaveItems:function(e,t){requestAnimationFrame((function(){e.style.opacity=0,t()}))},onClickDeleteTag:function(e){var t=this.routeSegments,r=this.code,n=this.brandCode;if(t.includes(e)){var a=t.indexOf(e);-1!==a&&t.splice(a,1);var i=n?Object(S.b)(n,r,t):Object(S.c)(r,t);this.$router.replace({path:i})}},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:se({},this.$route.query,{page:this.activePage+1})})},onPreview:function(e){this[re.a]({name:Y.a,open:!0,state:{code:e}})},onAddToCart:function(e){this[re.a]({name:Z.a,open:!0,state:{offerId:e.id,type:e.type}})},onPageChanged:function(e){this.showMore=!1,this.$router.push({path:this.$route.path,query:se({},this.$route.query,{page:e})})},fetchCatalog:(ue=oe(regeneratorRuntime.mark((function e(t,r,n){var a,i,o,c,s,l,u,d,f,g,m,v,b,_,h,C,O,y;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,a=t.params,i=a.code,o=a.brandCode,c=a.pathMatch,s=t.query,l=(s=void 0===s?{page:1,orderField:"price",orderDirection:"desc"}:s).page,u=void 0===l?1:l,d=s.orderField,f=void 0===d?"price":d,g=s.orderDirection,m=void 0===g?"desc":g,v=r.params,b=v.code,_=v.brandCode,h=r.query,C=(h=void 0===h?{page:1}:h).page,O=void 0===C?1:C,y=Object(S.a)(c,i,o),this.$progress.start(),b!==i||_!==o){e.next=15;break}return e.next=13,this.FETCH_ITEMS({filter:y,orderField:f,orderDirection:m,page:u,showMore:n});case 13:e.next=17;break;case 15:return e.next=17,this.FETCH_CATALOG_DATA({brandCode:o,filter:y,orderField:f,orderDirection:m,page:u});case 17:this.setSortValue(f,m),this.$progress.finish(),n||u===O||window.scrollTo({top:ae.MIN_SCROLL_VALUE+1,behavior:"smooth"}),e.next=28;break;case 22:e.prev=22,e.t0=e.catch(0),this.$progress.fail(),p.$logger.error("debounce_fetchCatalog",e.t0),this.$router.replace({name:"404"}),this.$progress.finish();case 28:case"end":return e.stop()}}),e,this,[[0,22]])}))),function(e,t,r){return ue.apply(this,arguments)})}),beforeRouteEnter:function(e,t,r){var n=e.params,a=n.code,i=n.brandCode,o=n.pathMatch,c=e.query,s=(c=void 0===c?{page:1,orderField:"price",orderDirection:"desc"}:c).page,l=void 0===s?1:s,u=c.orderField,d=void 0===u?"price":u,f=c.orderDirection,g=void 0===f?"desc":f,m=t.params;m.code,m.brandCode;Object(ne.a)(p.$store,F,M);var v=p.$store.state[F],b=v.load,_=v.brandCode,h=v.categoryCode;if(b&&a===h&&i===_)r((function(e){return e.$store.dispatch("".concat(F,"/").concat("SET_LOAD"),!1)}));else{var C=Object(S.a)(o,a,i),O=null;O=a===h&&i===_?"".concat(F,"/").concat("FETCH_ITEMS"):"".concat(F,"/").concat("FETCH_CATALOG_DATA"),p.$progress.start(),p.$store.dispatch(O,{brandCode:i,filter:C,page:l,orderField:d,orderDirection:g}).then((function(){return r((function(e){e.setSortValue(d,g),p.$progress.finish()}))})).catch((function(e){p.$progress.fail(),p.$logger.error(e),r({name:"404",replace:!0}),p.$progress.finish()}))}},beforeRouteUpdate:function(e,t,r){this.showMore?(this.fetchCatalog(e,t,this.showMore),this.showMore=!1):this.debounce_fetchCatalog(e,t),r()},beforeMount:function(){this.debounce_fetchCatalog=G()(this.fetchCatalog,500)}},me=Object(V.a)(ge,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section catalog-view"},[r("div",{staticClass:"container catalog-view__header"},[r("transition-group",{staticClass:"section catalog-view__breadcrumbs",attrs:{tag:"ol",name:"fade-in"}},[r("li",{key:"main",staticClass:"catalog-view__breadcrumbs-item"},[r("router-link",{staticClass:"catalog-view__breadcrumbs-link",attrs:{to:"/"}},[e._v("\n                    Главная\n                ")])],1),e._v(" "),r("li",{key:"all",staticClass:"catalog-view__breadcrumbs-item"},[e.brandCode?[e._v("Бренды")]:r("router-link",{staticClass:"catalog-view__breadcrumbs-link",attrs:{to:"/catalog"}},[e._v("\n                    Каталог\n                ")])],2),e._v(" "),e.brandCode?r("li",{key:e.brandCode,staticClass:"catalog-view__breadcrumbs-item"},[r("router-link",{staticClass:"catalog-view__breadcrumbs-link",attrs:{to:"/brand/"+e.brandCode}},[e._v("\n                    "+e._s(e.brand&&e.brand.name)+"\n                ")])],1):e._e(),e._v(" "),e._l(e.activeCategories,(function(t){return r("li",{key:t.id,staticClass:"catalog-view__breadcrumbs-item"},[r("router-link",{staticClass:"catalog-view__breadcrumbs-link",attrs:{to:e.generateBreadcrumbUrl(t.code)}},[e._v("\n                    "+e._s(t.name)+"\n                ")])],1)}))],2),e._v(" "),e.brandCode&&e.brand?r("catalog-banner-card",{staticClass:"catalog-view__brand",attrs:{"banner-id":e.brand.id,"bottom-text":e.brand.description,title:e.brand.name,image:e.brand.image}}):r("catalog-banner-card",{staticClass:"catalog-view__banner",attrs:{"banner-id":e.banner.id,image:e.banner.image,"upper-text":e.banner.upperText,"bottom-text":e.banner.bottomText,title:e.banner.title,"btn-text":e.banner.btnText}})],1),e._v(" "),r("section",{staticClass:"section"},[r("div",{staticClass:"container catalog-view__grid"},[r("div",{staticClass:"catalog-view__side-panel"},[r("ul",{staticClass:"catalog-view__side-panel-categories"},e._l(e.categories,(function(e){return r("category-tree-item",{key:e.id,staticClass:"catalog-view__side-panel-categories-item",attrs:{item:e}})})),1),e._v(" "),r("catalog-filter",{staticClass:"catalog-view__side-panel-filters"})],1),e._v(" "),r("div",{staticClass:"catalog-view__main"},[r("div",{staticClass:"catalog-view__main-header"},[r("div",{staticClass:"catalog-view__main-header-title"},[r("h1",{staticClass:"catalog-view__main-header-hl"},[e._v("\n                            "+e._s(e.activeCategory?e.activeCategory.name:"Все категории")+"\n                        ")]),e._v(" "),r("p",{staticClass:"text-grey catalog-view__main-header-text"},[e._v("489 продуктов")])]),e._v(" "),r("v-select",{staticClass:"catalog-view__main-header-sort",attrs:{label:"title","track-by":"id",options:e.sortOptions,searchable:!1,"allow-empty":!1,"show-labels":!1},model:{value:e.sortValue,callback:function(t){e.sortValue=t},expression:"sortValue"}}),e._v(" "),r("filter-button",{staticClass:"catalog-view__main-header-btn",on:{click:function(t){e.filterModal=!e.filterModal}}},[e._v("\n                        Фильтр и сортировка  \n                        "),r("span",{staticClass:"text-grey"},[e._v(e._s(e.activeTags.length))])])],1),e._v(" "),r("transition-group",{staticClass:"catalog-view__main-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.activeTags,(function(t,n){return r("tag-item",{key:t.code,attrs:{"data-index":n,text:t.name},on:{delete:function(r){return e.onClickDeleteTag(t.segment)}}})})),1),e._v(" "),r("transition-group",{staticClass:"catalog-view__main-grid",attrs:{tag:"ul",name:"catalog-item"},on:{"before-enter":e.onBeforeEnterItems,enter:e.onEnterItems,"after-enter":e.onAfterEnterItems,leave:e.onLeaveItems}},e._l(e.items,(function(t){var n;return r("li",{key:t.id+"-"+t.type,staticClass:"catalog-view__main-grid-item",class:(n={},n["catalog-view__main-grid-item--"+t.type]=t.type,n)},["product"===t.type?r("catalog-product-card",{staticClass:"catalog-view__main-grid-card",attrs:{"product-id":t.id,name:t.name,type:t.type,href:"/catalog/"+t.categoryCodes[t.categoryCodes.length-1]+"/"+t.code,image:t.image,price:t.price,"old-price":t.oldPrice,tags:t.tags,rating:t.rating},on:{addItem:function(t){return e.onAddToCart(t)},preview:function(r){return e.onPreview(t.code)}}}):"banner"===t.type?r("catalog-banner-card",{staticClass:"catalog-view__main-grid-card",attrs:{"banner-id":t.id,title:t.title,image:t.image,"upper-text":t.upperText,"btn-text":t.btnText}}):e._e()],1)})),0),e._v(" "),e.pagesCount>1?r("div",{staticClass:"catalog-view__main-controls"},[e.activePage<e.pagesCount?r("v-button",{staticClass:"btn--outline catalog-view__main-controls-btn",on:{click:e.onShowMore}},[e._v("\n                        Показать ещё\n                    ")]):e._e(),e._v(" "),r("v-pagination",{attrs:{value:e.activePage,"page-count":e.pagesCount},on:{input:e.onPageChanged}})],1):e._e()],1)])]),e._v(" "),r("transition",{attrs:{name:"fade-in"}},[e.filterModal&&e.isTabletLg?r("modal",{staticClass:"catalog-view__modal-filter",attrs:{"show-close-btn":!1,type:"fullscreen"},scopedSlots:e._u([{key:"body",fn:function(){return[r("v-sticky",{staticClass:"catalog-view__modal-filter-sticky",scopedSlots:e._u([{key:"sticky",fn:function(){return[r("div",{staticClass:"catalog-view__modal-filter-header"},[r("button",{staticClass:"catalog-view__modal-filter-header-btn",on:{click:function(t){e.filterModal=!1}}},[r("v-svg",{attrs:{name:"cross-small",width:"14",height:"14"}}),e._v("Фильтр\n                            ")],1)])]},proxy:!0}],null,!1,219555529)},[e._v(" "),r("div",{staticClass:"catalog-view__modal-filter-sort"},[r("div",{staticClass:"catalog-view__modal-filter-sort-title"},[e._v("Сортировка")]),e._v(" "),r("ul",{staticClass:"catalog-view__modal-filter-sort-list"},e._l(e.sortOptions,(function(t){return r("li",{key:t.title,staticClass:"catalog-view__modal-filter-sort-item",class:{"catalog-view__modal-filter-sort-item--active":t===e.sortValue}},[r("button",{staticClass:"catalog-view__modal-filter-sort-btn",on:{click:function(r){e.sortValue=t}}},[e._v("\n                                    "+e._s(t.title)+"\n                                ")])])})),0)]),e._v(" "),r("catalog-filter",{staticClass:"catalog-view__modal-filter-panel"})],1)]},proxy:!0}],null,!1,2324292678)}):e._e()],1),e._v(" "),r("section",{staticClass:"section catalog-view__section catalog-view__seo"},[r("div",{staticClass:"container catalog-view__seo-container"},[r("h2",{staticClass:"catalog-view__section-hl catalog-view__seo-hl"},[e._v("Блок SEO текста")]),e._v(" "),r("v-expander",{staticClass:"catalog-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:e._u([{key:"btn",fn:function(t){var r=t.isExpanded;return[e._v("\n                    "+e._s(r?"Скрыть":"Показать больше")+"\n                ")]}}])},[e._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)]),e._v(" "),r("transition",{attrs:{name:"fade-in"}},[e.isQuickViewOpen&&!e.isTabletLg?r("quick-view-modal"):e.isAddToCartOpen?r("add-to-cart-modal"):e._e()],1)],1)}),[],!1,null,null,null);t.default=me.exports},"9bRU":function(e,t,r){},Xtz6:function(e,t,r){},x3SC:function(e,t,r){}}]);