(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{"/Rcj":function(e,t,a){"use strict";a.r(t);var r,n=a("NDiG"),i=a("i2Ud"),o=a("o3vK"),c=a("+gqB"),s=a("nuHk"),l=a("pFko"),u=a("ze5i"),d=a("wo+G"),g=a("2/Mz"),m=a("tHOl"),f=(a("x3SC"),a("W6hq"));function v(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var p=(v(r={},"activeCategories",(function(e,t,a){for(var r=e.categories,n=a.route.params.code,i=[],o=null,c=0;c<r.length;c++){var s=r[c];if(o=Object(f.b)(n,s,i)){i.unshift(o);break}}return i})),v(r,"activePage",(function(e,t,a){var r=a.route;return r.query.page?Number(r.query.page):1})),v(r,"pagesCount",(function(e){return Math.ceil(e.range/12)})),v(r,"activeCategory",(function(e,t){var a=t.activeCategories;return a[a.length-1]})),v(r,"routeSegments",(function(e,t,a){var r=a.route.params.pathMatch;return r?r.split("/"):[]})),v(r,"filterSegments",(function(e,t){var a=t.routeSegments;return Object(f.c)(a)})),v(r,"activeTags",(function(e,t){for(var a=[],r=e.filters.filter((function(e){return"range"!==e.type})),n=t.filterSegments,i=0;i<r.length;i++)for(var o=r[i],c=0;c<o.items.length;c++){var s=o.items[c];n[o.name]&&n[o.name][s.code]&&a.push(s)}return a})),r),_=a("L2JU");function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var C={name:"category-tree-item",components:{},props:{item:{type:Object,required:!0},depth:{type:Number,default:0}},data:function(){return{isHover:!1}},computed:function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(Object(a),!0).forEach((function(t){b(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},Object(_.c)("catalog",["activeCategories"]),{isActive:function(){return this.activeCategories.includes(this.item)},url:function(){return this.item.code?"/catalog/".concat(this.item.code):"/catalog"},hasChildren:function(){return this.item&&Array.isArray(this.item.items)}}),methods:{onMouseOver:function(e){this.isHover=e}}},y=a("KHd+"),w=Object(y.a)(C,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",{staticClass:"category-tree-item",class:[{"category-tree-item--root":0===e.depth},{"category-tree-item--active":e.isActive}],on:{mouseover:function(t){return e.onMouseOver(!0)},mouseleave:function(t){return e.onMouseOver(!1)}}},[a("div",{staticClass:"category-tree-item__label"},[void 0!==e.item.code?a("router-link",{staticClass:"category-tree-item__link",attrs:{to:e.url,exact:""===e.item.code}},[e._v("\n            "+e._s(e.item.name)+"\n        ")]):a("span",{staticClass:"category-tree-item__link"},[e._v("\n            "+e._s(e.item.name)+"\n        ")])],1),e._v(" "),a("transition",{attrs:{name:"slide-right"}},[e.hasChildren&&(e.isHover||e.isActive)?a("ul",{staticClass:"category-tree-item__list"},e._l(e.item.items,(function(t,r){return a("category-tree-item",{key:t.id||r,staticClass:"category-tree-item__item",attrs:{item:t,depth:e.depth+1}})})),1):e._e()])],1)}),[],!1,null,null,null).exports,O=a("MhNv"),E=a("sEfC"),T=a.n(E);a("Xtz6");function S(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function k(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var j,x={name:"catalog-filter",components:{VButton:i.a,VCheck:o.a,VRange:s.a,VAccordion:O.a},props:{btnText:{type:String,default:"Очистить фильтры"}},data:function(){return{format:{to:function(e){return Math.round(e)},from:function(e){return Number(e)}}}},methods:{onRadioChange:function(e,t,a){var r=this.routeSegments;r.includes(a)||r.push(a);var n=new RegExp("^".concat(t,"-"));r=r.filter((function(e){return e===a||!e.match(n)})),this.$router.replace({path:Object(f.a)(this.code,r)})},onCheckChange:function(e,t,a){var r=this.routeSegments;if(e){if(r.includes(a))return;r.push(a)}else{if(!r.includes(a))return;var n=r.indexOf(a);-1!==n&&r.splice(n,1)}this.$router.replace({path:Object(f.a)(this.code,r)})},onRangeChange:function(e,t){this.debounce_rangeChange(e,t)}},computed:function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?S(Object(a),!0).forEach((function(t){k(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):S(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},Object(_.c)("catalog",["filterSegments","routeSegments"]),{},Object(_.d)("catalog",["filters"]),{},Object(_.d)("route",{code:function(e){return e.params.code}}),{accordionFilters:function(){return this.filters?this.filters.map((function(e){return{id:e.id,item:e,title:e.title,isExpanded:!0}})):[]}}),beforeMount:function(){var e=this;this.debounce_rangeChange=T()((function(t,a){for(var r=e.routeSegments,n="".concat(a,"-from_").concat(t[0],"_to_").concat(t[1]),i=new RegExp("^".concat(a,"-")),o=-1,c=0;c<r.length;c++)if(r[c].match(i)){o=c;break}if(-1!==o){if(r[o]===n)return;r.splice(o,1,n)}else r.push(n);e.$router.replace({path:Object(f.a)(e.code,r)})}),500)}},P=Object(y.a)(x,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.accordionFilters&&e.accordionFilters.length>0?a("div",{staticClass:"catalog-filter"},[a("v-accordion",{staticClass:"catalog-filter__filters",attrs:{"key-field":"id",items:e.accordionFilters,"item-expanded":function(e){return e.isExpanded},"item-toggled":function(e){return e.isExpanded=!e.isExpanded}},scopedSlots:e._u([{key:"content",fn:function(t){var r=t.item;return["range"===r.item.type?a("div",{staticClass:"catalog-filter__filters-range"},[a("v-range",{attrs:{initialValue:[r.item.min,r.item.max],value:e.filterSegments[r.item.name]||[r.item.min,r.item.max],max:r.item.max,min:r.item.min,format:e.format},on:{input:function(t){return e.onRangeChange(t,r.item.name)}}})],1):"check"===r.item.type?a("div",{staticClass:"catalog-filter__filters-check"},e._l(r.item.items,(function(t){return a("v-check",{key:t.id,attrs:{id:r.item.name+"-"+t.id,value:t.code,name:r.item.name,checked:e.filterSegments[r.item.name]&&e.filterSegments[r.item.name][t.code]},on:{change:function(a){return e.onCheckChange(a,r.item.name,t.code)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")])})),1):"radio"===r.item.type?a("div",{staticClass:"catalog-filter__filters-check"},e._l(r.item.items,(function(t){return a("v-check",{key:t.id,attrs:{id:r.item.name+"-"+t.id,type:"radio",value:t.code,name:r.item.name,checked:e.filterSegments[r.item.name]&&e.filterSegments[r.item.name][t.code]},on:{change:function(a){return e.onRadioChange(a,r.item.name,t.code)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")])})),1):e._e()]}}],null,!1,3280378372)}),e._v(" "),a("v-button",{staticClass:"btn--outline catalog-filter__clear-btn",attrs:{to:{path:e.code?"/catalog/"+e.code:"/catalog"}}},[e._v("\n        "+e._s(e.btnText)+"\n    ")])],1):e._e()}),[],!1,null,null,null).exports,A=a("/Q9p"),M=a("LqtR"),L=a("BZIu"),D=a("8TZ/"),R=a("0CxO"),$=a("Nlzp");function F(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var I,V=(F(j={},"SET_LOAD",(function(e,t){e.load=t})),F(j,"SET_BANNER",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.banner=t})),F(j,"SET_ITEMS",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{items:[],range:0},a=t.items,r=t.range;e.items=a||[],e.range=r||0})),F(j,"SET_CATEGORY_CODE",(function(e,t){e.categoryCode=t})),F(j,"SET_CATEGORIES",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e.categories=t})),j);function H(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function N(e,t,a,r,n,i,o){try{var c=e[i](o),s=c.value}catch(e){return void a(e)}c.done?t(s):Promise.resolve(s).then(r,n)}var q,B,G,z=(H(I={},"FETCH_BANNER",(function(e){var t=e.commit;return Object($.l)().then((function(e){return t("SET_BANNER",e[6])})).catch((function(e){return L.$logger.error("FETCH_BANNER error: ".concat(e)),[]}))})),H(I,"FETCH_CATEGORIES",(function(e){var t=e.commit;return Object($.p)().then((function(e){return t("SET_CATEGORIES",e)})).catch((function(e){return L.$logger.error("FETCH_CATEGORIES error: ".concat(e)),[]}))})),H(I,"FETCH_ITEMS",(function(e,t){var a=e.commit,r=e.state;return Object($.o)(t).then((function(e){t.showMore?a("SET_ITEMS",{items:r.items.concat(e.items),range:e.range}):a("SET_ITEMS",e),a("SET_CATEGORY_CODE",t.filter&&t.filter.category)})).catch((function(e){return L.$logger.error("FETCH_ITEMS error: ".concat(e)),[]}))})),H(I,"SET_LOAD",(function(e){var t=e.commit,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t("SET_LOAD",a)})),H(I,"FETCH_CATALOG_DATA",(q=regeneratorRuntime.mark((function e(t,a){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.dispatch,n=t.commit,e.next=3,Promise.all([r("FETCH_CATEGORIES"),r("FETCH_BANNER")]);case 3:return e.abrupt("return",r("FETCH_ITEMS",a).then((function(){return n("SET_LOAD",!0)})));case 4:case"end":return e.stop()}}),e)})),B=function(){var e=this,t=arguments;return new Promise((function(a,r){var n=q.apply(e,t);function i(e){N(n,a,r,i,o,"next",e)}function o(e){N(n,a,r,i,o,"throw",e)}i(void 0)}))},function(e,t){return B.apply(this,arguments)})),I);function U(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var Z="catalog",J={name:Z,namespaced:!0,state:(G={},U(G,"load",!1),U(G,"banner",{}),U(G,"categoryId",null),U(G,"categoryCode",null),U(G,"categories",[]),U(G,"items",[]),U(G,"range",0),U(G,"filters",[{id:1,title:"Цена, ₽",name:"price",type:"range",max:1e3,min:0},{id:2,title:"Бренды",name:"brand",type:"check",items:[{id:1,name:"L’Oreal Paris",code:"brand-loreal"},{id:2,name:"Maybelline",code:"brand-maybelline"},{id:3,name:"Pupa",code:"brand-pupa"}]},{id:3,title:"Средства",name:"tool",type:"check",values:[],items:[{id:1,name:"Жидкая помада для губ",code:"tool-zhidkaya_pomada_dlya_gub"},{id:2,name:"Помада для губ",code:"tool-pomada_dlya_gub"},{id:3,name:"Гигиеническая помада для губ",code:"tool-gigienicheskaya_pomada_dlya_gub"}]},{id:4,title:"Эффекты",name:"effect",type:"radio",items:[{id:1,name:"Глянцевая",code:"effect-glyancevaya"},{id:2,name:"Матовая",code:"effect-matovaya"},{id:3,name:"Перламутровая",code:"effect-perlamutrovaya"}]}]),G),actions:z,mutations:V,getters:p},Y=a("AlLH"),K=a("4BeY"),X=a.n(K),Q=a("IaFt"),W=a.n(Q),ee=new X.a({id:"icon-filter",use:"icon-filter-usage",viewBox:"0 0 18 14",content:'<symbol viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg" id="icon-filter">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 10C0.447715 10 -1.55275e-07 10.4477 -1.31134e-07 11C-1.06993e-07 11.5523 0.447715 12 1 12L13 12L13 13C13 13.5523 13.4477 14 14 14C14.5523 14 15 13.5523 15 13L15 12L17 12C17.5523 12 18 11.5523 18 11C18 10.4477 17.5523 10 17 10L15 10L15 9C15 8.44771 14.5523 8 14 8C13.4477 8 13 8.44771 13 9L13 10L1 10ZM1 2C0.447715 2 -5.04966e-07 2.44771 -4.80825e-07 3C-4.56684e-07 3.55228 0.447715 4 1 4L3 4L3 5C3 5.55228 3.44772 6 4 6C4.55228 6 5 5.55228 5 5L5 4L17 4C17.5523 4 18 3.55228 18 3C18 2.44771 17.5523 2 17 2L5 2L5 0.999999C5 0.447715 4.55228 -1.15266e-06 4 -1.12852e-06C3.44772 -1.10438e-06 3 0.447715 3 0.999999L3 2L1 2Z" />\n</symbol>'});W.a.add(ee),a("4eDr"),a("9bRU");function te(e,t,a,r,n,i,o){try{var c=e[i](o),s=c.value}catch(e){return void a(e)}c.done?t(s):Promise.resolve(s).then(r,n)}function ae(e){return function(){var t=this,a=arguments;return new Promise((function(r,n){var i=e.apply(t,a);function o(e){te(i,r,n,o,c,"next",e)}function c(e){te(i,r,n,o,c,"throw",e)}o(void 0)}))}}function re(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function ne(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?re(Object(a),!0).forEach((function(t){ie(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):re(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function ie(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var oe,ce,se=0,le={name:"catalog",components:{VSvg:n.a,VButton:i.a,VSelect:l.a,VPagination:c.a,VSticky:u.a,VExpander:d.a,Modal:g.a,TagItem:m.a,CategoryTreeItem:w,CatalogFilter:P,CatalogProductCard:A.a,CatalogBannerCard:M.a},data:function(){var e=[{id:1,title:"Сначала подороже",field:"price",direction:"desc"},{id:2,title:"Сначала подешевле",field:"price",direction:"asc"}];return{sortValue:e[0],sortOptions:e,filterModal:!1,showMore:!1}},computed:ne({},Object(_.c)(Z,["activeTags","activeCategory","activePage","pagesCount","routeSegments","activeCategories"]),{},Object(_.d)(Z,["items","banner","categories"]),{},Object(_.d)("route",{code:function(e){return e.params.code}}),{isTabletLg:function(){return this.$mq.tabletLg}}),watch:{sortValue:function(e,t){e!==t&&this.$router.replace({path:this.$route.path,query:{orderField:e.field,orderDirection:e.direction}})}},methods:ne({},Object(_.b)(Z,["FETCH_ITEMS","FETCH_CATALOG_DATA"]),{},Object(_.b)(D.c,[R.a]),{setSortValue:function(e,t){this.sortValue=this.sortOptions.find((function(a){return a.field===e&&a.direction===t}))||this.sortOptions[0]},onBeforeEnterItems:function(e){e.dataset.index=se,se+=1,e.style.opacity=0},itemAnimation:function(e,t){return new Promise((function(a,r){try{setTimeout((function(){requestAnimationFrame((function(){e.style.opacity=1,a()}))}),t)}catch(e){r(e)}}))},onEnterItems:(ce=ae(regeneratorRuntime.mark((function e(t,a){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=100*t.dataset.index,e.next=3,this.itemAnimation(t,r);case 3:a();case 4:case"end":return e.stop()}}),e,this)}))),function(e,t){return ce.apply(this,arguments)}),onAfterEnterItems:function(e){delete e.dataset.index,se=0},onLeaveItems:function(e,t){requestAnimationFrame((function(){e.style.opacity=0,t()}))},onClickDeleteTag:function(e){var t=this.routeSegments,a=this.code;if(t.includes(e)){var r=t.indexOf(e);-1!==r&&t.splice(r,1),this.$router.replace({path:Object(f.a)(a,t)})}},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:ne({},this.$route.query,{page:this.activePage+1})})},onPageChanged:function(e){this.showMore=!1,this.$router.push({path:this.$route.path,query:ne({},this.$route.query,{page:e})})},fetchCatalog:(oe=ae(regeneratorRuntime.mark((function e(t,a,r){var n,i,o,c,s,l,u,d,g,m,f,v;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=t.params.code,i=t.query,o=(i=void 0===i?{page:1,orderField:"price",orderDirection:"desc"}:i).page,c=void 0===o?1:o,s=i.orderField,l=void 0===s?"price":s,u=i.orderDirection,d=void 0===u?"desc":u,g=a.query,m=(g=void 0===g?{page:1}:g).page,f=void 0===m?1:m,v=n&&{category:n},this.$progress.start(),e.next=11,this.FETCH_ITEMS({filter:v,orderField:l,orderDirection:d,page:c,showMore:r});case 11:this.setSortValue(l,d),this.$progress.finish(),r||c===f||window.scrollTo({top:Y.MIN_SCROLL_VALUE+1,behavior:"smooth"}),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(0),L.$logger.error("debounce_fetchCatalog",e.t0),this.$progress.fail();case 20:case"end":return e.stop()}}),e,this,[[0,16]])}))),function(e,t,a){return oe.apply(this,arguments)})}),beforeRouteEnter:function(e,t,a){var r=e.params.code,n=e.query,i=(n=void 0===n?{page:1,orderField:"price",orderDirection:"desc"}:n).page,o=void 0===i?1:i,c=n.orderField,s=void 0===c?"price":c,l=n.orderDirection,u=void 0===l?"desc":l;!!L.$store._modulesNamespaceMap["".concat(Z,"/")]||L.$store.registerModule(Z,J,{preserveState:!!L.$store.state.catalog});var d=L.$store.state.catalog,g=d.categoryCode;if(d.load&&g===r)a((function(e){return e.$store.dispatch("".concat(Z,"/").concat("SET_LOAD"),!1)}));else{var m=r&&{category:r};L.$progress.start(),L.$store.dispatch("".concat(Z,"/").concat("FETCH_CATALOG_DATA"),{filter:m,page:o,orderField:s,orderDirection:u}).then((function(){return a((function(e){e.setSortValue(s,u),L.$progress.finish()}))})).catch((function(e){L.$progress.fail(),L.$logger.error(e)}))}},beforeRouteUpdate:function(e,t,a){this.showMore?(this.fetchCatalog(e,t,this.showMore),this.showMore=!1):this.debounce_fetchCatalog(e,t),a()},beforeMount:function(){this.debounce_fetchCatalog=T()(this.fetchCatalog,500)}},ue=Object(y.a)(le,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"section catalog-view"},[a("div",{staticClass:"container catalog-view__header"},[a("transition-group",{staticClass:"section catalog-view__breadcrumbs",attrs:{tag:"ol",name:"fade-in"}},[a("li",{key:"main",staticClass:"catalog-view__breadcrumbs-item"},[a("router-link",{staticClass:"catalog-view__breadcrumbs-link",attrs:{to:"/"}},[e._v("\n                    Главная\n                ")])],1),e._v(" "),a("li",{key:"all",staticClass:"catalog-view__breadcrumbs-item"},[a("router-link",{staticClass:"catalog-view__breadcrumbs-link",attrs:{to:"/catalog"}},[e._v("\n                    Каталог\n                ")])],1),e._v(" "),e._l(e.activeCategories,(function(t){return a("li",{key:t.id,staticClass:"catalog-view__breadcrumbs-item"},[a("router-link",{staticClass:"catalog-view__breadcrumbs-link",attrs:{to:"/catalog/"+t.code}},[e._v("\n                    "+e._s(t.name)+"\n                ")])],1)}))],2),e._v(" "),a("catalog-banner-card",{staticClass:"catalog-view__banner",attrs:{"banner-id":e.banner.id,image:e.banner.image,"upper-text":e.banner.upperText,"bottom-text":e.banner.bottomText,title:e.banner.title,"btn-text":e.banner.btnText}})],1),e._v(" "),a("section",{staticClass:"section"},[a("div",{staticClass:"container catalog-view__grid"},[a("div",{staticClass:"catalog-view__side-panel"},[a("ul",{staticClass:"catalog-view__side-panel-categories"},e._l(e.categories,(function(e){return a("category-tree-item",{key:e.id,staticClass:"catalog-view__side-panel-categories-item",attrs:{item:e}})})),1),e._v(" "),a("catalog-filter",{staticClass:"catalog-view__side-panel-filters"})],1),e._v(" "),a("div",{staticClass:"catalog-view__main"},[a("div",{staticClass:"catalog-view__main-header"},[a("div",{staticClass:"catalog-view__main-header-title"},[a("h1",{staticClass:"catalog-view__main-header-hl"},[e._v("\n                            "+e._s(e.activeCategory?e.activeCategory.name:"Каталог")+"\n                        ")]),e._v(" "),a("p",{staticClass:"text-grey catalog-view__main-header-text"},[e._v("489 продуктов")])]),e._v(" "),a("v-select",{staticClass:"catalog-view__main-header-sort",attrs:{label:"title","track-by":"id",options:e.sortOptions,searchable:!1,"allow-empty":!1,"show-labels":!1},model:{value:e.sortValue,callback:function(t){e.sortValue=t},expression:"sortValue"}}),e._v(" "),a("v-button",{staticClass:"catalog-view__main-header-btn",on:{click:function(t){e.filterModal=!e.filterModal}}},[a("span",[e._v("\n                            Фильтр и сортировка  \n                            "),a("span",{staticClass:"text-grey"},[e._v(e._s(e.activeTags.length))])]),e._v(" "),a("v-svg",{attrs:{id:"catalog-filter-icon",name:"filter",width:"18",height:"14"}})],1)],1),e._v(" "),a("transition-group",{staticClass:"catalog-view__main-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.activeTags,(function(t,r){return a("tag-item",{key:t.code,attrs:{"data-index":r,text:t.name},on:{delete:function(a){return e.onClickDeleteTag(t.code)}}})})),1),e._v(" "),a("transition-group",{staticClass:"catalog-view__main-grid",attrs:{tag:"ul",name:"catalog-item"},on:{"before-enter":e.onBeforeEnterItems,enter:e.onEnterItems,"after-enter":e.onAfterEnterItems,leave:e.onLeaveItems}},e._l(e.items,(function(t){var r;return a("li",{key:t.id+"-"+t.type,staticClass:"catalog-view__main-grid-item",class:(r={},r["catalog-view__main-grid-item--"+t.type]=t.type,r)},["product"===t.type?a("catalog-product-card",{staticClass:"catalog-view__main-grid-card",attrs:{"product-id":t.id,name:t.name,type:t.type,href:"/catalog/"+t.categoryCodes[t.categoryCodes.length-1]+"/"+t.code,image:t.image,price:t.price,"old-price":t.oldPrice,tags:t.tags,rating:t.rating},on:{addItem:function(a){return e.ADD_CART_ITEM({offerId:t.id})}}}):"banner"===t.type?a("catalog-banner-card",{staticClass:"catalog-view__main-grid-card",attrs:{"banner-id":t.id,title:t.title,image:t.image,"upper-text":t.upperText,"btn-text":t.btnText}}):e._e()],1)})),0),e._v(" "),e.pagesCount>1?a("div",{staticClass:"catalog-view__main-controls"},[e.activePage<e.pagesCount?a("v-button",{staticClass:"btn--outline catalog-view__main-controls-btn",on:{click:e.onShowMore}},[e._v("\n                        Показать ещё\n                    ")]):e._e(),e._v(" "),a("v-pagination",{attrs:{value:e.activePage,"page-count":e.pagesCount},on:{input:e.onPageChanged}})],1):e._e()],1)])]),e._v(" "),a("transition",{attrs:{name:"fade-in"}},[e.filterModal&&e.isTabletLg?a("modal",{staticClass:"catalog-view__modal-filter",attrs:{"show-close-btn":!1,type:"fullscreen"},scopedSlots:e._u([{key:"body",fn:function(){return[a("v-sticky",{staticClass:"catalog-view__modal-filter-sticky",scopedSlots:e._u([{key:"sticky",fn:function(){return[a("div",{staticClass:"catalog-view__modal-filter-header"},[a("button",{staticClass:"catalog-view__modal-filter-header-btn",on:{click:function(t){e.filterModal=!1}}},[a("v-svg",{attrs:{name:"cross-small",width:"14",height:"14"}}),e._v("Фильтр\n                            ")],1)])]},proxy:!0}],null,!1,219555529)},[e._v(" "),a("div",{staticClass:"catalog-view__modal-filter-sort"},[a("div",{staticClass:"catalog-view__modal-filter-sort-title"},[e._v("Сортировка")]),e._v(" "),a("ul",{staticClass:"catalog-view__modal-filter-sort-list"},e._l(e.sortOptions,(function(t){return a("li",{key:t.title,staticClass:"catalog-view__modal-filter-sort-item",class:{"catalog-view__modal-filter-sort-item--active":t===e.sortValue}},[a("button",{staticClass:"catalog-view__modal-filter-sort-btn",on:{click:function(a){e.sortValue=t}}},[e._v("\n                                    "+e._s(t.title)+"\n                                ")])])})),0)]),e._v(" "),a("catalog-filter",{staticClass:"catalog-view__modal-filter-panel"})],1)]},proxy:!0}],null,!1,2324292678)}):e._e()],1),e._v(" "),a("section",{staticClass:"section catalog-view__section catalog-view__seo"},[a("div",{staticClass:"container catalog-view__seo-container"},[a("h2",{staticClass:"catalog-view__section-hl catalog-view__seo-hl"},[e._v("Блок SEO текста")]),e._v(" "),a("v-expander",{staticClass:"catalog-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:e._u([{key:"btn",fn:function(t){var a=t.isExpanded;return[e._v("\n                    "+e._s(a?"Скрыть":"Показать больше")+"\n                ")]}}])},[e._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)])],1)}),[],!1,null,null,null);t.default=ue.exports},"9bRU":function(e,t,a){},Xtz6:function(e,t,a){},x3SC:function(e,t,a){}}]);