(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"/Rcj":function(e,t,r){"use strict";r.r(t);var a,n=r("NDiG"),i=r("i2Ud"),o=r("o3vK"),c=r("+gqB"),s=r("nuHk"),l=r("pFko"),u=r("ze5i"),g=r("2/Mz"),d=(r("x3SC"),r("W6hq"));function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var f=(m(a={},"activeCategories",(function(e,t,r){for(var a=e.categories,n=r.route.params.code,i=[],o=null,c=0;c<a.length;c++){var s=a[c];if(o=Object(d.b)(n,s,i)){i.unshift(o);break}}return i})),m(a,"activePage",(function(e,t,r){var a=r.route;return a.query.page?Number(a.query.page):1})),m(a,"pagesCount",(function(e){return Math.ceil(e.range/12)})),m(a,"activeCategory",(function(e,t){var r=t.activeCategories;return r[r.length-1]})),m(a,"routeSegments",(function(e,t,r){var a=r.route.params.pathMatch;return a?a.split("/"):[]})),m(a,"filterSegments",(function(e,t){var r=t.routeSegments;return Object(d.c)(r)})),m(a,"activeTags",(function(e,t){for(var r=[],a=e.filters.filter((function(e){return"range"!==e.type})),n=t.filterSegments,i=0;i<a.length;i++)for(var o=a[i],c=0;c<o.items.length;c++){var s=o.items[c];n[o.name]&&n[o.name][s.code]&&r.push(s)}return r})),a),v=r("L2JU");function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function _(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var h={name:"category-tree-item",components:{},props:{item:{type:Object,required:!0},depth:{type:Number,default:0}},data:function(){return{isHover:!1}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){_(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(v.c)("catalog",["activeCategories"]),{isActive:function(){return this.activeCategories.includes(this.item)},url:function(){return this.item.code?"/catalog/".concat(this.item.code):"/catalog"},hasChildren:function(){return this.item&&Array.isArray(this.item.items)}}),methods:{onMouseOver:function(e){this.isHover=e}}},b=r("KHd+"),C=Object(b.a)(h,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",{staticClass:"category-tree-item",class:[{"category-tree-item--root":0===e.depth},{"category-tree-item--active":e.isActive}],on:{mouseover:function(t){return e.onMouseOver(!0)},mouseleave:function(t){return e.onMouseOver(!1)}}},[r("div",{staticClass:"category-tree-item__label"},[void 0!==e.item.code?r("router-link",{staticClass:"category-tree-item__link",attrs:{to:e.url,exact:""===e.item.code}},[e._v("\n            "+e._s(e.item.name)+"\n        ")]):r("span",{staticClass:"category-tree-item__link"},[e._v("\n            "+e._s(e.item.name)+"\n        ")])],1),e._v(" "),r("transition",{attrs:{name:"slide-right"}},[e.hasChildren&&(e.isHover||e.isActive)?r("ul",{staticClass:"category-tree-item__list"},e._l(e.item.items,(function(t,a){return r("category-tree-item",{key:t.id||a,staticClass:"category-tree-item__item",attrs:{item:t,depth:e.depth+1}})})),1):e._e()])],1)}),[],!1,null,null,null).exports,y=r("MhNv"),O=r("sEfC"),w=r.n(O);r("Xtz6");function E(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function T(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var S,j={name:"catalog-filter",components:{VButton:i.a,VCheck:o.a,VRange:s.a,VAccordion:y.a},props:{btnText:{type:String,default:"Очистить фильтры"}},data:function(){return{format:{to:function(e){return Math.round(e)},from:function(e){return Number(e)}}}},methods:{onRadioChange:function(e,t,r){var a=this.routeSegments;a.includes(r)||a.push(r);var n=new RegExp("^".concat(t,"-"));a=a.filter((function(e){return e===r||!e.match(n)})),this.$router.replace({path:Object(d.a)(this.code,a)})},onCheckChange:function(e,t,r){var a=this.routeSegments;if(e){if(a.includes(r))return;a.push(r)}else{if(!a.includes(r))return;var n=a.indexOf(r);-1!==n&&a.splice(n,1)}this.$router.replace({path:Object(d.a)(this.code,a)})},onRangeChange:function(e,t){this.debounce_rangeChange(e,t)}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?E(Object(r),!0).forEach((function(t){T(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(v.c)("catalog",["filterSegments","routeSegments"]),{},Object(v.d)("catalog",["filters"]),{},Object(v.d)("route",{code:function(e){return e.params.code}}),{accordionFilters:function(){return this.filters?this.filters.map((function(e){return{id:e.id,item:e,title:e.title,isExpanded:!0}})):[]}}),beforeMount:function(){var e=this;this.debounce_rangeChange=w()((function(t,r){for(var a=e.routeSegments,n="".concat(r,"-from_").concat(t[0],"_to_").concat(t[1]),i=new RegExp("^".concat(r,"-")),o=-1,c=0;c<a.length;c++)if(a[c].match(i)){o=c;break}if(-1!==o){if(a[o]===n)return;a.splice(o,1,n)}else a.push(n);e.$router.replace({path:Object(d.a)(e.code,a)})}),500)}},k=Object(b.a)(j,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.accordionFilters&&e.accordionFilters.length>0?r("div",{staticClass:"catalog-filter"},[r("v-accordion",{staticClass:"catalog-filter__filters",attrs:{"key-field":"id",items:e.accordionFilters,"item-expanded":function(e){return e.isExpanded},"item-toggled":function(e){return e.isExpanded=!e.isExpanded}},scopedSlots:e._u([{key:"content",fn:function(t){var a=t.item;return["range"===a.item.type?r("div",{staticClass:"catalog-filter__filters-range"},[r("v-range",{attrs:{initialValue:[a.item.min,a.item.max],value:e.filterSegments[a.item.name]||[a.item.min,a.item.max],max:a.item.max,min:a.item.min,format:e.format},on:{input:function(t){return e.onRangeChange(t,a.item.name)}}})],1):"check"===a.item.type?r("div",{staticClass:"catalog-filter__filters-check"},e._l(a.item.items,(function(t){return r("v-check",{key:t.id,attrs:{id:a.item.name+"-"+t.id,value:t.code,name:a.item.name,checked:e.filterSegments[a.item.name]&&e.filterSegments[a.item.name][t.code]},on:{change:function(r){return e.onCheckChange(r,a.item.name,t.code)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")])})),1):"radio"===a.item.type?r("div",{staticClass:"catalog-filter__filters-check"},e._l(a.item.items,(function(t){return r("v-check",{key:t.id,attrs:{id:a.item.name+"-"+t.id,type:"radio",value:t.code,name:a.item.name,checked:e.filterSegments[a.item.name]&&e.filterSegments[a.item.name][t.code]},on:{change:function(r){return e.onRadioChange(r,a.item.name,t.code)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")])})),1):e._e()]}}],null,!1,3280378372)}),e._v(" "),r("v-button",{staticClass:"btn--outline catalog-filter__clear-btn",attrs:{to:{path:e.code?"/catalog/"+e.code:"/catalog"}}},[e._v("\n        "+e._s(e.btnText)+"\n    ")])],1):e._e()}),[],!1,null,null,null).exports,x=r("/Q9p"),A=r("LqtR"),P=r("BZIu"),M=r("8TZ/"),D=r("0CxO"),$=r("Nlzp");function R(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var L,F=(R(S={},"SET_LOAD",(function(e,t){e.load=t})),R(S,"SET_BANNER",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.banner=t})),R(S,"SET_ITEMS",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{items:[],range:0},r=t.items,a=t.range;e.items=r||[],e.range=a||0})),R(S,"SET_CATEGORY_CODE",(function(e,t){e.categoryCode=t})),R(S,"SET_CATEGORIES",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e.categories=t})),S);function I(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var V,H=(I(L={},"FETCH_BANNER",(function(e){var t=e.commit;return Object($.l)().then((function(e){return t("SET_BANNER",e[6])})).catch((function(e){return P.$logger.error("FETCH_BANNER error: ".concat(e)),[]}))})),I(L,"FETCH_CATEGORIES",(function(e){var t=e.commit;return Object($.p)().then((function(e){return t("SET_CATEGORIES",e)})).catch((function(e){return P.$logger.error("FETCH_CATEGORIES error: ".concat(e)),[]}))})),I(L,"FETCH_ITEMS",(function(e,t){var r=e.commit,a=e.state;return Object($.o)(t).then((function(e){t.showMore?r("SET_ITEMS",{items:a.items.concat(e.items),range:e.range}):r("SET_ITEMS",e),r("SET_CATEGORY_CODE",t.filter&&t.filter.category)})).catch((function(e){return P.$logger.error("FETCH_ITEMS error: ".concat(e)),[]}))})),I(L,"SET_LOAD",(function(e){var t=e.commit,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t("SET_LOAD",r)})),I(L,"FETCH_CATALOG_DATA",(function(e,t){var r,a;return regeneratorRuntime.async((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.dispatch,a=e.commit,n.next=3,regeneratorRuntime.awrap(Promise.all([r("FETCH_CATEGORIES"),r("FETCH_BANNER")]));case 3:return n.abrupt("return",r("FETCH_ITEMS",t).then((function(){return a("SET_LOAD",!0)})));case 4:case"end":return n.stop()}}))})),L);function N(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var q="catalog",B={name:q,namespaced:!0,state:(V={},N(V,"load",!1),N(V,"banner",{}),N(V,"categoryId",null),N(V,"categoryCode",null),N(V,"categories",[]),N(V,"items",[]),N(V,"range",0),N(V,"filters",[]),V),actions:H,mutations:F,getters:f},G=r("4BeY"),z=r.n(G),U=r("IaFt"),Z=r.n(U),J=new z.a({id:"icon-filter",use:"icon-filter-usage",viewBox:"0 0 18 14",content:'<symbol viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg" id="icon-filter">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 10C0.447715 10 -1.55275e-07 10.4477 -1.31134e-07 11C-1.06993e-07 11.5523 0.447715 12 1 12L13 12L13 13C13 13.5523 13.4477 14 14 14C14.5523 14 15 13.5523 15 13L15 12L17 12C17.5523 12 18 11.5523 18 11C18 10.4477 17.5523 10 17 10L15 10L15 9C15 8.44771 14.5523 8 14 8C13.4477 8 13 8.44771 13 9L13 10L1 10ZM1 2C0.447715 2 -5.04966e-07 2.44771 -4.80825e-07 3C-4.56684e-07 3.55228 0.447715 4 1 4L3 4L3 5C3 5.55228 3.44772 6 4 6C4.55228 6 5 5.55228 5 5L5 4L17 4C17.5523 4 18 3.55228 18 3C18 2.44771 17.5523 2 17 2L5 2L5 0.999999C5 0.447715 4.55228 -1.15266e-06 4 -1.12852e-06C3.44772 -1.10438e-06 3 0.447715 3 0.999999L3 2L1 2Z" />\n</symbol>'});Z.a.add(J),r("4eDr"),r("9bRU");function Y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function K(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(r),!0).forEach((function(t){X(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function X(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Q=0,W={name:"catalog",components:{VSvg:n.a,VButton:i.a,VSelect:l.a,VPagination:c.a,VSticky:u.a,Modal:g.a,CategoryTreeItem:C,CatalogFilter:k,CatalogProductCard:x.a,CatalogBannerCard:A.a},data:function(){var e=[{id:1,title:"Сначала подороже",field:"price",direction:"desc"},{id:2,title:"Сначала подешевле",field:"price",direction:"asc"}];return{sortValue:e[0],sortOptions:e,filterModal:!1,showMore:!1}},computed:K({},Object(v.c)(q,["activeTags","activeCategory","activePage","pagesCount","routeSegments","activeCategories"]),{},Object(v.d)(q,["items","banner","categories"]),{},Object(v.d)("route",{code:function(e){return e.params.code}}),{isTabletLg:function(){return this.$mq.tabletLg}}),watch:{sortValue:function(e,t){e!==t&&this.$router.replace({path:this.$route.path,query:{orderField:e.field,orderDirection:e.direction}})}},methods:K({},Object(v.b)(q,["FETCH_ITEMS","FETCH_CATALOG_DATA"]),{},Object(v.b)(M.c,[D.a]),{setSortValue:function(e,t){this.sortValue=this.sortOptions.find((function(r){return r.field===e&&r.direction===t}))||this.sortOptions[0]},onBeforeEnterItems:function(e){e.dataset.index=Q,Q+=1,e.style.opacity=0},itemAnimation:function(e,t){return new Promise((function(r,a){try{setTimeout((function(){requestAnimationFrame((function(){e.style.opacity=1,r()}))}),t)}catch(e){a(e)}}))},onEnterItems:function(e,t){var r;return regeneratorRuntime.async((function(a){for(;;)switch(a.prev=a.next){case 0:return r=100*e.dataset.index,a.next=3,regeneratorRuntime.awrap(this.itemAnimation(e,r));case 3:t();case 4:case"end":return a.stop()}}),null,this)},onAfterEnterItems:function(e){delete e.dataset.index,Q=0},onLeaveItems:function(e,t){requestAnimationFrame((function(){e.style.opacity=0,t()}))},onClickDeleteTag:function(e){var t=this.routeSegments,r=this.code;if(t.includes(e)){var a=t.indexOf(e);-1!==a&&t.splice(a,1),this.$router.replace({path:Object(d.a)(r,t)})}},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:K({},this.$route.query,{page:this.activePage+1})})},onPageChanged:function(e){this.showMore=!1,this.$router.push({path:this.$route.path,query:K({},this.$route.query,{page:e})})},fetchCatalog:function(e,t,r){var a,n,i,o,c,s,l,u,g;return regeneratorRuntime.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=e.params.code,n=e.query,i=(n=void 0===n?{page:1,orderField:"price",orderDirection:"desc"}:n).page,o=void 0===i?1:i,c=n.orderField,s=void 0===c?"price":c,l=n.orderDirection,u=void 0===l?"desc":l,g=a&&{category:a},this.$progress.start(),t.next=8,regeneratorRuntime.awrap(this.FETCH_ITEMS({filter:g,orderField:s,orderDirection:u,page:o,showMore:r}));case 8:this.setSortValue(s,u),this.$progress.finish(),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(0),P.$logger.error("debounce_fetchCatalog",t.t0),this.$progress.fail();case 16:case"end":return t.stop()}}),null,this,[[0,12]])}}),beforeRouteEnter:function(e,t,r){var a=e.params.code,n=e.query,i=(n=void 0===n?{page:1,orderField:"price",orderDirection:"desc"}:n).page,o=void 0===i?1:i,c=n.orderField,s=void 0===c?"price":c,l=n.orderDirection,u=void 0===l?"desc":l;!!P.$store._modulesNamespaceMap["".concat(q,"/")]||P.$store.registerModule(q,B,{preserveState:!!P.$store.state.catalog});var g=P.$store.state.catalog,d=g.categoryCode;if(g.load&&d===a)r((function(e){return e.$store.dispatch("".concat(q,"/").concat("SET_LOAD"),!1)}));else{var m=a&&{category:a};P.$progress.start(),P.$store.dispatch("".concat(q,"/").concat("FETCH_CATALOG_DATA"),{filter:m,page:o,orderField:s,orderDirection:u}).then((function(){return r((function(e){e.setSortValue(s,u),P.$progress.finish()}))})).catch((function(e){P.$progress.fail(),P.$logger.error(e)}))}},beforeRouteUpdate:function(e,t,r){this.showMore?(this.fetchCatalog(e,t,this.showMore),this.showMore=!1):this.debounce_fetchCatalog(e,t),r()},beforeMount:function(){this.debounce_fetchCatalog=w()(this.fetchCatalog,500)}},ee=Object(b.a)(W,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section catalog-view"},[r("div",{staticClass:"container catalog-view__header"},[r("transition-group",{staticClass:"section catalog-view__breadcrumbs",attrs:{tag:"ol",name:"fade-in"}},[r("li",{key:"main",staticClass:"catalog-view__breadcrumbs-item"},[r("router-link",{staticClass:"catalog-view__breadcrumbs-link",attrs:{to:"/"}},[e._v("\n                    Главная\n                ")])],1),e._v(" "),r("li",{key:"all",staticClass:"catalog-view__breadcrumbs-item"},[r("router-link",{staticClass:"catalog-view__breadcrumbs-link",attrs:{to:"/catalog"}},[e._v("\n                    Каталог\n                ")])],1),e._v(" "),e._l(e.activeCategories,(function(t){return r("li",{key:t.id,staticClass:"catalog-view__breadcrumbs-item"},[r("router-link",{staticClass:"catalog-view__breadcrumbs-link",attrs:{to:"/catalog/"+t.code}},[e._v("\n                    "+e._s(t.name)+"\n                ")])],1)}))],2),e._v(" "),r("catalog-banner-card",{staticClass:"catalog-view__banner",attrs:{"banner-id":e.banner.id,image:e.banner.image,"upper-text":e.banner.upperText,"bottom-text":e.banner.bottomText,title:e.banner.title,"btn-text":e.banner.btnText}})],1),e._v(" "),r("section",{staticClass:"section"},[r("div",{staticClass:"container catalog-view__grid"},[r("div",{staticClass:"catalog-view__side-panel"},[r("ul",{staticClass:"catalog-view__side-panel-categories"},e._l(e.categories,(function(e){return r("category-tree-item",{key:e.id,staticClass:"catalog-view__side-panel-categories-item",attrs:{item:e}})})),1),e._v(" "),r("catalog-filter",{staticClass:"catalog-view__side-panel-filters"})],1),e._v(" "),r("div",{staticClass:"catalog-view__main"},[r("div",{staticClass:"catalog-view__main-header"},[r("div",{staticClass:"catalog-view__main-header-title"},[r("h1",{staticClass:"catalog-view__main-header-hl"},[e._v("\n                            "+e._s(e.activeCategory?e.activeCategory.name:"Каталог")+"\n                        ")]),e._v(" "),r("p",{staticClass:"text-grey catalog-view__main-header-text"},[e._v("489 товаров")])]),e._v(" "),r("v-select",{staticClass:"catalog-view__main-header-sort",attrs:{label:"title","track-by":"id",options:e.sortOptions,searchable:!1,"allow-empty":!1},model:{value:e.sortValue,callback:function(t){e.sortValue=t},expression:"sortValue"}}),e._v(" "),r("v-button",{staticClass:"catalog-view__main-header-btn",on:{click:function(t){e.filterModal=!e.filterModal}}},[r("span",[e._v("\n                            Фильтр и сортировка  \n                            "),r("span",{staticClass:"text-grey"},[e._v(e._s(e.activeTags.length))])]),e._v(" "),r("v-svg",{attrs:{id:"catalog-filter-icon",name:"filter",width:"18",height:"14"}})],1)],1),e._v(" "),r("transition-group",{staticClass:"catalog-view__main-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.activeTags,(function(t,a){return r("li",{key:t.code,staticClass:"catalog-view__main-tags-item",attrs:{"data-index":a}},[e._v("\n                        "+e._s(t.name)+" \n                        "),r("button",{staticClass:"catalog-view__main-tags-delete-btn",on:{click:function(r){return e.onClickDeleteTag(t.code)}}},[r("v-svg",{attrs:{name:"cross-small",width:"10",height:"10"}})],1)])})),0),e._v(" "),r("transition-group",{staticClass:"catalog-view__main-grid",attrs:{tag:"ul",name:"catalog-item"},on:{"before-enter":e.onBeforeEnterItems,enter:e.onEnterItems,"after-enter":e.onAfterEnterItems,leave:e.onLeaveItems}},e._l(e.items,(function(t){var a;return r("li",{key:t.id+"-"+t.type,staticClass:"catalog-view__main-grid-item",class:(a={},a["catalog-view__main-grid-item--"+t.type]=t.type,a)},["product"===t.type?r("catalog-product-card",{staticClass:"catalog-view__main-grid-card",attrs:{"product-id":t.id,name:t.name,type:t.type,href:"/catalog/"+t.categoryCodes[t.categoryCodes.length-1]+"/"+t.code,image:t.image,price:t.price,"old-price":t.oldPrice,tags:t.tags,rating:t.rating},on:{addItem:function(r){return e.ADD_CART_ITEM({offerId:t.id})}}}):"banner"===t.type?r("catalog-banner-card",{staticClass:"catalog-view__main-grid-card",attrs:{"banner-id":t.id,title:t.title,image:t.image,"upper-text":t.upperText,"btn-text":t.btnText}}):e._e()],1)})),0),e._v(" "),e.pagesCount>1?r("div",{staticClass:"catalog-view__main-controls"},[e.activePage<e.pagesCount?r("v-button",{staticClass:"btn--outline catalog-view__main-controls-btn",on:{click:e.onShowMore}},[e._v("\n                        Показать ещё\n                    ")]):e._e(),e._v(" "),r("v-pagination",{attrs:{value:e.activePage,"page-count":e.pagesCount},on:{input:e.onPageChanged}})],1):e._e()],1)])]),e._v(" "),r("transition",{attrs:{name:"fade-in"}},[e.filterModal&&e.isTabletLg?r("modal",{staticClass:"catalog-view__modal-filter",attrs:{"show-close-btn":!1,type:"fullscreen"},scopedSlots:e._u([{key:"body",fn:function(){return[r("v-sticky",{staticClass:"catalog-view__modal-filter-sticky",scopedSlots:e._u([{key:"sticky",fn:function(){return[r("div",{staticClass:"catalog-view__modal-filter-header"},[r("button",{staticClass:"catalog-view__modal-filter-header-btn",on:{click:function(t){e.filterModal=!1}}},[r("v-svg",{attrs:{name:"cross-small",width:"14",height:"14"}}),e._v("Фильтр\n                            ")],1)])]},proxy:!0}],null,!1,219555529)},[e._v(" "),r("div",{staticClass:"catalog-view__modal-filter-sort"},[r("div",{staticClass:"catalog-view__modal-filter-sort-title"},[e._v("Сортировка")]),e._v(" "),r("ul",{staticClass:"catalog-view__modal-filter-sort-list"},e._l(e.sortOptions,(function(t){return r("li",{key:t,staticClass:"catalog-view__modal-filter-sort-item",class:{"catalog-view__modal-filter-sort-item--active":t===e.sortValue}},[r("button",{staticClass:"catalog-view__modal-filter-sort-btn",on:{click:function(r){e.sortValue=t}}},[e._v("\n                                    "+e._s(t.title)+"\n                                ")])])})),0)]),e._v(" "),r("catalog-filter",{staticClass:"catalog-view__modal-filter-panel"})],1)]},proxy:!0}],null,!1,2132586024)}):e._e()],1)],1)}),[],!1,null,null,null);t.default=ee.exports},"9bRU":function(e,t,r){},Xtz6:function(e,t,r){},x3SC:function(e,t,r){}}]);