(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{"/Rcj":function(e,t,r){"use strict";r.r(t);var n,a=r("NDiG"),i=r("i2Ud"),o=r("o3vK"),c=r("+gqB"),s=r("nuHk"),l=r("pFko"),u=r("ze5i"),d=r("wo+G"),f=r("2/Mz"),m=r("obii"),g=r("zfPd"),p=r("KLyl"),b=r("tHOl"),v=r("BZIu"),_=r("Nlzp");function h(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var C,O=(h(n={},"SET_LOAD",(function(e,t){e.load=t})),h(n,"SET_BANNER",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.banner=t})),h(n,"SET_ITEMS_MORE",(function(e,t){e.items.push(t),e.range=t.range||0})),h(n,"SET_ITEMS",(function(e,t){e.items=[t],e.range=t.range||0})),h(n,"SET_CATEGORY_CODE",(function(e,t){e.categoryCode=t})),h(n,"SET_BRAND_CODE",(function(e,t){e.brandCode=t})),h(n,"SET_CATEGORIES",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e.categories=t})),h(n,"SET_BRAND",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.brand=t})),h(n,"SET_FILTERS",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e.filters=t})),n);r("VgBE");function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function w(e,t,r,n,a,i,o){try{var c=e[i](o),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,a)}function E(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function o(e){w(i,n,a,o,c,"next",e)}function c(e){w(i,n,a,o,c,"throw",e)}o(void 0)}))}}var T,j,S,k=(y(C={},"FETCH_BANNER",(function(e,t){var r=e.commit;return Object(_.n)().then((function(e){r("SET_BANNER",e[6])})).catch((function(e){return v.$logger.error("".concat("FETCH_BANNER"," ").concat(e)),[]}))})),y(C,"FETCH_CATEGORIES",(function(e,t){var r=e.commit;return Object(_.t)().then((function(e){r("SET_CATEGORIES",e)})).catch((function(e){return v.$logger.error("".concat("FETCH_CATEGORIES"," ").concat(e)),[]}))})),y(C,"FETCH_FILTERS",(function(e,t){var r=e.commit;return Object(_.v)({categoryCode:t.filter.category,needBrands:Number(!t.brandCode)}).then((function(e){r("SET_FILTERS",e)})).catch((function(e){return v.$logger.error("".concat("FETCH_FILTERS"," ").concat(e)),[]}))})),y(C,"FETCH_ITEMS",(function(e,t){var r=e.commit;e.state;return Object(_.s)(t).then((function(e){t.showMore?r("SET_ITEMS_MORE",{id:t.page,items:e.items,range:e.range}):r("SET_ITEMS",{id:t.page,items:e.items,range:e.range})})).catch((function(e){return v.$logger.error("".concat("FETCH_ITEMS"," ").concat(e)),[]}))})),y(C,"SET_LOAD",(function(e){var t=e.commit,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t("SET_LOAD",r)})),y(C,"FETCH_BRAND",(function(e,t){var r=e.commit;return Object(_.o)(t).then((function(e){return r("SET_BRAND",e)}))})),y(C,"FETCH_BRAND_DATA",(j=E(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.dispatch,e.abrupt("return",Promise.all([n("FETCH_CATEGORIES"),n("FETCH_BRAND",r)]));case 2:case"end":return e.stop()}}),e)}))),function(e,t){return j.apply(this,arguments)})),y(C,"FETCH_CATALOG_DATA",(T=E(regeneratorRuntime.mark((function e(t){var r,n,a,i=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.dispatch,n=t.commit,!(a=i.length>1&&void 0!==i[1]?i[1]:{}).brandCode){e.next=7;break}return e.next=5,Promise.all([r("FETCH_CATEGORIES"),r("FETCH_BRAND",{brandCode:a.brandCode})]);case 5:e.next=9;break;case 7:return e.next=9,Promise.all([r("FETCH_CATEGORIES"),r("FETCH_BANNER")]);case 9:return e.next=11,r("FETCH_FILTERS",a);case 11:return e.abrupt("return",r("FETCH_ITEMS",a).then((function(){n("SET_BRAND_CODE",a.brandCode),n("SET_CATEGORY_CODE",a.filter&&a.filter.category),n("SET_LOAD",!0)})));case 12:case"end":return e.stop()}}),e)}))),function(e){return T.apply(this,arguments)})),C),x=r("W6hq");function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(Object(r),!0).forEach((function(t){R(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function R(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var D,F=(R(S={},"activeCategories",(function(e,t,r){for(var n=e.categories,a=r.route.params.code,i=[],o=null,c=0;c<n.length;c++){var s=n[c];if(o=Object(x.e)(a,s,i)){i.unshift(o);break}}return i})),R(S,"activePage",(function(e,t,r){var n=r.route;return n.query.page?Number(n.query.page):1})),R(S,"pagesCount",(function(e){return Math.ceil(e.range/12)})),R(S,"activeCategory",(function(e,t){var r=t.activeCategories;return r[r.length-1]})),R(S,"routeSegments",(function(e,t,r){var n=r.route.params.pathMatch;return n?n.split("/"):[]})),R(S,"filterSegments",(function(e,t){var r=t.routeSegments;return Object(x.f)(r)})),R(S,"activeTags",(function(e,t){for(var r=[],n=e.filters.filter((function(e){return"range"!==e.type})),a=t.filterSegments,i=0;i<n.length;i++)for(var o=n[i],c=0;c<o.items.length;c++){var s=o.items[c];a[o.name]&&a[o.name][s.code]&&r.push(P({},s,{segment:"".concat(o.name,"-").concat(s.code)}))}return r})),S);function M(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var $="catalog",I={name:$,namespaced:!0,state:(D={},M(D,"load",!1),M(D,"brand",{}),M(D,"brandCode",null),M(D,"banner",{}),M(D,"categoryId",null),M(D,"categoryCode",null),M(D,"categories",[]),M(D,"items",[]),M(D,"range",0),M(D,"filters",[]),D),actions:k,mutations:O,getters:F},H=r("L2JU");r("x3SC");function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function L(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var V={name:"category-tree-item",components:{},props:{item:{type:Object,required:!0},depth:{type:Number,default:0}},data:function(){return{isHover:!1}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(Object(r),!0).forEach((function(t){L(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(H.c)($,["activeCategories"]),{},Object(H.d)("route",{brandCode:function(e){return e.params.brandCode}}),{isActive:function(){return this.activeCategories.includes(this.item)},url:function(){var e=this.brandCode;return this.item&&{path:Object(x.d)(e,this.item.code)}},hasChildren:function(){return this.item&&Array.isArray(this.item.items)}}),methods:{onMouseOver:function(e){this.isHover=e}}},N=r("KHd+"),q=Object(N.a)(V,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",{staticClass:"category-tree-item",class:[{"category-tree-item--root":0===e.depth},{"category-tree-item--active":e.isActive}],on:{mouseover:function(t){return e.onMouseOver(!0)},mouseleave:function(t){return e.onMouseOver(!1)}}},[r("div",{staticClass:"category-tree-item__label"},[void 0!==e.item.code?r("router-link",{staticClass:"category-tree-item__link",attrs:{to:e.url,exact:""===e.item.code}},[e._v("\n            "+e._s(e.item.name)+"\n        ")]):r("span",{staticClass:"category-tree-item__link"},[e._v("\n            "+e._s(e.item.name)+"\n        ")])],1),e._v(" "),r("transition",{attrs:{name:"slide-right"}},[e.hasChildren&&(e.isHover||e.isActive)?r("ul",{staticClass:"category-tree-item__list"},e._l(e.item.items,(function(t,n){return r("category-tree-item",{key:t.id||n,staticClass:"category-tree-item__item",attrs:{item:t,depth:e.depth+1}})})),1):e._e()])],1)}),[],!1,null,null,null).exports,G=r("MhNv"),U=r("sEfC"),z=r.n(U);r("Xtz6");function Q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function J(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var K={name:"catalog-filter",components:{VButton:i.a,VCheck:o.a,VRange:s.a,VAccordion:G.a},props:{btnText:{type:String,default:"Очистить фильтры"}},data:function(){return{format:{to:function(e){return Math.round(e)},from:function(e){return Number(e)}}}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Q(Object(r),!0).forEach((function(t){J(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Q(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(H.c)($,["filterSegments","routeSegments"]),{},Object(H.d)($,["filters"]),{},Object(H.d)("route",{code:function(e){return e.params.code},brandCode:function(e){return e.params.brandCode}}),{accordionFilters:function(){return this.filters?this.filters.map((function(e){return{id:e.id,item:e,title:e.title,isExpanded:!0}})):[]},clearFilterUrl:function(){var e=this.code,t=this.brandCode;return t?{path:e?"/brand/".concat(t,"/").concat(e):"/brand/".concat(t)}:{path:e?"/catalog/".concat(e):"/catalog"}}}),methods:{onRadioChange:function(e,t){var r=this.routeSegments,n=this.code,a=this.brandCode;r.includes(t)||r.push(t),r=r.filter((function(e){return e===t}));var i=a?Object(x.b)(a,n,r):Object(x.c)(n,r);this.$router.replace({path:i})},onCheckChange:function(e,t){var r=this.routeSegments,n=this.code,a=this.brandCode;if(e){if(r.includes(t))return;r.push(t)}else{if(!r.includes(t))return;var i=r.indexOf(t);-1!==i&&r.splice(i,1)}var o=a?Object(x.b)(a,n,r):Object(x.c)(n,r);this.$router.replace({path:o})},onRangeChange:function(e,t){this.debounce_rangeChange(e,t)}},beforeMount:function(){var e=this;this.debounce_rangeChange=z()((function(t,r){for(var n=e.routeSegments,a=e.brandCode,i=e.code,o="".concat(r,"-from_").concat(t[0],"_to_").concat(t[1]),c=new RegExp("^".concat(r,"-")),s=-1,l=0;l<n.length;l++)if(n[l].match(c)){s=l;break}if(-1!==s){if(n[s]===o)return;n.splice(s,1,o)}else n.push(o);var u=a?Object(x.b)(a,i,n):Object(x.c)(i,n);e.$router.replace({path:u})}),500)}},X=Object(N.a)(K,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.accordionFilters&&e.accordionFilters.length>0?r("div",{staticClass:"catalog-filter"},[r("v-accordion",{staticClass:"catalog-filter__filters",attrs:{"key-field":"id",items:e.accordionFilters,"item-expanded":function(e){return e.isExpanded},"item-toggled":function(e){return e.isExpanded=!e.isExpanded}},scopedSlots:e._u([{key:"content",fn:function(t){var n=t.item;return["range"===n.item.type?r("div",{staticClass:"catalog-filter__filters-range"},[r("v-range",{attrs:{initialValue:[n.item.min,n.item.max],value:e.filterSegments[n.item.name]||[n.item.min,n.item.max],max:n.item.max,min:n.item.min,format:e.format},on:{input:function(t){return e.onRangeChange(t,n.item.name)}}})],1):"check"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},e._l(n.item.items,(function(t){return r("v-check",{key:t.id,attrs:{id:n.item.name+"-"+t.id,name:n.item.name,checked:e.filterSegments[n.item.name]&&e.filterSegments[n.item.name][t.code]},on:{change:function(r){return e.onCheckChange(r,n.item.name+"-"+t.code)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")])})),1):"radio"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},e._l(n.item.items,(function(t){return r("v-check",{key:t.id,attrs:{id:n.item.name+"-"+t.id,type:"radio",name:n.item.name,checked:e.filterSegments[n.item.name]&&e.filterSegments[n.item.name][t.code]},on:{change:function(r){return e.onRadioChange(r,n.item.name+"-"+t.code)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")])})),1):e._e()]}}],null,!1,1429883620)}),e._v(" "),r("v-button",{staticClass:"btn--outline catalog-filter__clear-btn",attrs:{to:e.clearFilterUrl,replace:""}},[e._v("\n        "+e._s(e.btnText)+"\n    ")])],1):e._e()}),[],!1,null,null,null).exports,Y=r("/Q9p"),Z=r("LqtR"),W=r("/Qa0"),ee=r("Jtxo"),te=r("8TZ/"),re=r("0CxO"),ne=r("55Sm"),ae=r("jDKC"),ie=r("48TQ"),oe=r("AlLH");r("4eDr"),r("9bRU");function ce(e,t,r,n,a,i,o){try{var c=e[i](o),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,a)}function se(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function o(e){ce(i,n,a,o,c,"next",e)}function c(e){ce(i,n,a,o,c,"throw",e)}o(void 0)}))}}function le(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ue(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?le(Object(r),!0).forEach((function(t){de(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):le(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function de(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var fe,me,ge=0,pe={name:"catalog",components:{VSvg:a.a,VButton:i.a,VSelect:l.a,VPagination:c.a,VSticky:u.a,VExpander:d.a,Modal:f.a,Breadcrumbs:m.a,BreadcrumbItem:g.a,FilterButton:p.a,TagItem:b.a,CategoryTreeItem:q,CatalogFilter:X,CatalogProductCard:Y.a,CatalogBannerCard:Z.a,AddToCartModal:ee.b,QuickViewModal:W.b},data:function(){var e=[{id:1,title:"Сначала подороже",field:"price",direction:"desc"},{id:2,title:"Сначала подешевле",field:"price",direction:"asc"}];return{sortValue:e[0],sortOptions:e,filterModal:!1,showMore:!1}},computed:ue({},Object(H.c)($,["activeTags","activeCategory","activePage","pagesCount","routeSegments","activeCategories"]),{},Object(H.d)($,["items","banner","categories","brand"]),{},Object(H.d)(ne.b,{isQuickViewOpen:function(e){return e[ne.a][W.a]&&e[ne.a][W.a].open},isAddToCartOpen:function(e){return e[ne.a][ee.a]&&e[ne.a][ee.a].open}}),{},Object(H.d)("route",{code:function(e){return e.params.code},brandCode:function(e){return e.params.brandCode}}),{isTabletLg:function(){return this.$mq.tabletLg}}),watch:{sortValue:function(e,t){e!==t&&this.$router.replace({path:this.$route.path,query:{orderField:e.field,orderDirection:e.direction}})}},methods:ue({},Object(H.b)($,["FETCH_ITEMS","FETCH_CATALOG_DATA"]),{},Object(H.b)(te.c,[re.a]),{},Object(H.b)(ne.b,[ae.a]),{generateBreadcrumbUrl:function(e){var t=this.brandCode;return{path:Object(x.d)(t,e)}},setSortValue:function(e,t){this.sortValue=this.sortOptions.find((function(r){return r.field===e&&r.direction===t}))||this.sortOptions[0]},onBeforeEnterItems:function(e){e.dataset.index=ge,ge+=1,e.style.opacity=0},itemAnimation:function(e,t){return new Promise((function(r,n){try{setTimeout((function(){requestAnimationFrame((function(){e.style.opacity=1,r()}))}),t)}catch(e){n(e)}}))},onEnterItems:(me=se(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=100*t.dataset.index,e.next=3,this.itemAnimation(t,n);case 3:r();case 4:case"end":return e.stop()}}),e,this)}))),function(e,t){return me.apply(this,arguments)}),onAfterEnterItems:function(e){delete e.dataset.index,ge=0},onLeaveItems:function(e,t){requestAnimationFrame((function(){e.style.opacity=0,t()}))},onClickDeleteTag:function(e){var t=this.routeSegments,r=this.code,n=this.brandCode;if(t.includes(e)){var a=t.indexOf(e);-1!==a&&t.splice(a,1);var i=n?Object(x.b)(n,r,t):Object(x.c)(r,t);this.$router.replace({path:i})}},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:ue({},this.$route.query,{page:this.activePage+1})})},onPreview:function(e){this[ae.a]({name:W.a,open:!0,state:{code:e}})},onAddToCart:function(e){this[ae.a]({name:ee.a,open:!0,state:{offerId:e.id,type:e.type}})},onPageChanged:function(e){this.showMore=!1,this.$router.push({path:this.$route.path,query:ue({},this.$route.query,{page:e})})},fetchCatalog:(fe=se(regeneratorRuntime.mark((function e(t,r,n){var a,i,o,c,s,l,u,d,f,m,g,p,b,_,h,C,O,y;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,a=t.params,i=a.code,o=a.brandCode,c=a.pathMatch,s=t.query,l=(s=void 0===s?{page:1,orderField:"price",orderDirection:"desc"}:s).page,u=void 0===l?1:l,d=s.orderField,f=void 0===d?"price":d,m=s.orderDirection,g=void 0===m?"desc":m,p=r.params,b=p.code,_=p.brandCode,h=r.query,C=(h=void 0===h?{page:1}:h).page,O=void 0===C?1:C,y=Object(x.a)(c,i,o),this.$progress.start(),i!==b||_!==o){e.next=15;break}return e.next=13,this.FETCH_ITEMS({filter:y,orderField:f,orderDirection:g,page:u,showMore:n});case 13:e.next=17;break;case 15:return e.next=17,this.FETCH_CATALOG_DATA({brandCode:o,filter:y,orderField:f,orderDirection:g,page:u});case 17:this.setSortValue(f,g),this.$progress.finish(),n||u===O||window.scrollTo({top:oe.MIN_SCROLL_VALUE+1,behavior:"smooth"}),e.next=28;break;case 22:e.prev=22,e.t0=e.catch(0),this.$progress.fail(),v.$logger.error("debounce_fetchCatalog",e.t0),this.$router.replace({name:"404"}),this.$progress.finish();case 28:case"end":return e.stop()}}),e,this,[[0,22]])}))),function(e,t,r){return fe.apply(this,arguments)})}),beforeRouteEnter:function(e,t,r){var n=e.params,a=n.code,i=n.brandCode,o=n.pathMatch,c=e.query,s=(c=void 0===c?{page:1,orderField:"price",orderDirection:"desc"}:c).page,l=void 0===s?1:s,u=c.orderField,d=void 0===u?"price":u,f=c.orderDirection,m=void 0===f?"desc":f,g=t.params;g.code,g.brandCode;Object(ie.a)(v.$store,$,I);var p=v.$store.state[$],b=p.load,_=p.brandCode,h=p.categoryCode;if(b&&a===h&&i===_)r((function(e){return e.$store.dispatch("".concat($,"/").concat("SET_LOAD"),!1)}));else{var C=Object(x.a)(o,a,i),O=null;O=a===h&&i===_?"".concat($,"/").concat("FETCH_ITEMS"):"".concat($,"/").concat("FETCH_CATALOG_DATA"),v.$progress.start(),v.$store.dispatch(O,{brandCode:i,filter:C,page:l,orderField:d,orderDirection:m}).then((function(){return r((function(e){e.setSortValue(d,m),v.$progress.finish()}))})).catch((function(e){v.$progress.fail(),v.$logger.error(e),r({name:"404",replace:!0}),v.$progress.finish()}))}},beforeRouteUpdate:function(e,t,r){this.showMore?(this.fetchCatalog(e,t,this.showMore),this.showMore=!1):this.debounce_fetchCatalog(e,t),r()},beforeMount:function(){this.debounce_fetchCatalog=z()(this.fetchCatalog,500)}},be=Object(N.a)(pe,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section catalog-view"},[r("div",{staticClass:"container catalog-view__header"},[r("breadcrumbs",{staticClass:"catalog-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e._v("\n                Главная\n            ")]),e._v(" "),r("breadcrumb-item",{key:"Cabinet",attrs:{to:{name:e.brandCode?"Brands":"Catalog"}}},[e._v("\n                "+e._s(e.brandCode?"Бренды":"Каталог")+"\n            ")]),e._v(" "),e.brandCode?r("breadcrumb-item",{key:e.brandCode,attrs:{to:e.generateBreadcrumbUrl(null)}},[e._v("\n                "+e._s(e.brand&&e.brand.name)+"\n            ")]):e._e(),e._v(" "),e._l(e.activeCategories,(function(t){return r("breadcrumb-item",{key:t.id,attrs:{to:e.generateBreadcrumbUrl(t.code)}},[e._v("\n                "+e._s(t.name)+"\n            ")])}))],2),e._v(" "),e.brandCode&&e.brand?r("catalog-banner-card",{staticClass:"catalog-view__brand",attrs:{"banner-id":e.brand.id,"bottom-text":e.brand.description,title:e.brand.name,image:e.brand.image}}):r("catalog-banner-card",{staticClass:"catalog-view__banner",attrs:{"banner-id":e.banner.id,image:e.banner.image,"upper-text":e.banner.upperText,"bottom-text":e.banner.bottomText,title:e.banner.title,"btn-text":e.banner.btnText}})],1),e._v(" "),r("section",{staticClass:"section"},[r("div",{staticClass:"container catalog-view__grid"},[r("div",{staticClass:"catalog-view__side-panel"},[r("ul",{staticClass:"catalog-view__side-panel-categories"},e._l(e.categories,(function(e){return r("category-tree-item",{key:e.id,staticClass:"catalog-view__side-panel-categories-item",attrs:{item:e}})})),1),e._v(" "),r("catalog-filter",{staticClass:"catalog-view__side-panel-filters"})],1),e._v(" "),r("div",{staticClass:"catalog-view__main"},[r("div",{staticClass:"catalog-view__main-header"},[r("div",{staticClass:"catalog-view__main-header-title"},[r("h1",{staticClass:"catalog-view__main-header-hl"},[e._v("\n                            "+e._s(e.activeCategory?e.activeCategory.name:"Все категории")+"\n                        ")]),e._v(" "),r("p",{staticClass:"text-grey catalog-view__main-header-text"},[e._v("489 продуктов")])]),e._v(" "),r("v-select",{staticClass:"catalog-view__main-header-sort",attrs:{label:"title","track-by":"id",options:e.sortOptions,searchable:!1,"allow-empty":!1,"show-labels":!1},model:{value:e.sortValue,callback:function(t){e.sortValue=t},expression:"sortValue"}}),e._v(" "),r("filter-button",{staticClass:"catalog-view__main-header-btn",on:{click:function(t){e.filterModal=!e.filterModal}}},[e._v("\n                        Фильтр и сортировка  \n                        "),r("span",{staticClass:"text-grey"},[e._v(e._s(e.activeTags.length))])])],1),e._v(" "),r("ul",{staticClass:"catalog-view__main-tags"},e._l(e.activeTags,(function(t,n){return r("tag-item",{key:t.code,attrs:{"data-index":n,text:t.name},on:{delete:function(r){return e.onClickDeleteTag(t.segment)}}})})),1),e._v(" "),e._l(e.items,(function(t){return r("ul",{key:t.id,staticClass:"catalog-view__main-grid"},e._l(t.items,(function(t){var n;return r("li",{key:t.id+"-"+t.type,staticClass:"catalog-view__main-grid-item",class:(n={},n["catalog-view__main-grid-item--"+t.type]=t.type,n)},["product"===t.type?r("catalog-product-card",{staticClass:"catalog-view__main-grid-card",attrs:{"product-id":t.id,name:t.name,type:t.type,href:"/catalog/"+t.categoryCodes[t.categoryCodes.length-1]+"/"+t.code,image:t.image,price:t.price,"old-price":t.oldPrice,tags:t.tags,rating:t.rating},on:{addItem:function(t){return e.onAddToCart(t)},preview:function(r){return e.onPreview(t.code)}}}):"banner"===t.type?r("catalog-banner-card",{staticClass:"catalog-view__main-grid-card",attrs:{"banner-id":t.id,title:t.title,image:t.image,"upper-text":t.upperText,"btn-text":t.btnText}}):e._e()],1)})),0)})),e._v(" "),e.pagesCount>1?r("div",{staticClass:"catalog-view__main-controls"},[e.activePage<e.pagesCount?r("v-button",{staticClass:"btn--outline catalog-view__main-controls-btn",on:{click:e.onShowMore}},[e._v("\n                        Показать ещё\n                    ")]):e._e(),e._v(" "),r("v-pagination",{attrs:{value:e.activePage,"page-count":e.pagesCount},on:{input:e.onPageChanged}})],1):e._e()],2)])]),e._v(" "),r("transition",{attrs:{name:"fade-in"}},[e.filterModal&&e.isTabletLg?r("modal",{staticClass:"catalog-view__modal-filter",attrs:{"show-close-btn":!1,type:"fullscreen"},scopedSlots:e._u([{key:"body",fn:function(){return[r("v-sticky",{staticClass:"catalog-view__modal-filter-sticky",scopedSlots:e._u([{key:"sticky",fn:function(){return[r("div",{staticClass:"catalog-view__modal-filter-header"},[r("button",{staticClass:"catalog-view__modal-filter-header-btn",on:{click:function(t){e.filterModal=!1}}},[r("v-svg",{attrs:{name:"cross-small",width:"14",height:"14"}}),e._v("Фильтр\n                            ")],1)])]},proxy:!0}],null,!1,219555529)},[e._v(" "),r("div",{staticClass:"catalog-view__modal-filter-sort"},[r("div",{staticClass:"catalog-view__modal-filter-sort-title"},[e._v("Сортировка")]),e._v(" "),r("ul",{staticClass:"catalog-view__modal-filter-sort-list"},e._l(e.sortOptions,(function(t){return r("li",{key:t.title,staticClass:"catalog-view__modal-filter-sort-item",class:{"catalog-view__modal-filter-sort-item--active":t===e.sortValue}},[r("button",{staticClass:"catalog-view__modal-filter-sort-btn",on:{click:function(r){e.sortValue=t}}},[e._v("\n                                    "+e._s(t.title)+"\n                                ")])])})),0)]),e._v(" "),r("catalog-filter",{staticClass:"catalog-view__modal-filter-panel"})],1)]},proxy:!0}],null,!1,2324292678)}):e._e()],1),e._v(" "),r("section",{staticClass:"section catalog-view__section catalog-view__seo"},[r("div",{staticClass:"container catalog-view__seo-container"},[r("h2",{staticClass:"catalog-view__section-hl catalog-view__seo-hl"},[e._v("Блок SEO текста")]),e._v(" "),r("v-expander",{staticClass:"catalog-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:e._u([{key:"btn",fn:function(t){var r=t.isExpanded;return[e._v("\n                    "+e._s(r?"Скрыть":"Показать больше")+"\n                ")]}}])},[e._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)]),e._v(" "),r("transition",{attrs:{name:"fade-in"}},[e.isQuickViewOpen&&!e.isTabletLg?r("quick-view-modal"):e.isAddToCartOpen?r("add-to-cart-modal"):e._e()],1)],1)}),[],!1,null,null,null);t.default=be.exports},"9bRU":function(e,t,r){},Xtz6:function(e,t,r){},x3SC:function(e,t,r){}}]);