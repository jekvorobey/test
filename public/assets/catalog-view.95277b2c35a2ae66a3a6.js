(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{"/Rcj":function(t,e,r){"use strict";r.r(e);var n=r("NDiG"),i=r("i2Ud"),a=r("o3vK"),o=r("+gqB"),c=r("nuHk"),s=r("pFko"),u=r("ze5i"),l=r("cpWO"),d=r("2/Mz"),f=r("obii"),p=r("zfPd"),m=r("KLyl"),g=r("tHOl"),h=r("L2JU"),v=r("3bB/"),b=r("zUOt"),y=r("W6hq");r("x3SC");function _(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function C(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?_(Object(r),!0).forEach((function(e){O(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function O(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var w={name:"category-tree-item",props:{item:{type:Object,required:!0},depth:{type:Number,default:0},disabled:{type:Boolean,default:!0}},data:function(){return{isHover:!1}},computed:C(C(C({},Object(h.d)("route",{type:function(t){return t.params.type},entityCode:function(t){return t.params.entityCode}})),Object(h.c)(v.NAME,[b.h,b.a])),{},{isActive:function(){var t=this;return(this[b.a]||[]).some((function(e){return e.code===t.item.code}))},isRoot:function(){var t=this.item.code,e=this.depth,r=this.rootCategory;return r?t===r.code:0===e},isInteractive:function(){this.type;var t=this.item.code,e=this.rootCategory,r=this.isRoot,n=this.disabled;return e?t&&(r||!n):t},url:function(){var t=this.entityCode,e=this.type,r=this.item.code,n=this.isRoot,i=(this.disabled,this.rootCategory);return{path:Object(y.f)(e,t,i?!n&&r:r),query:C({},this.$route.query)}},hasChildren:function(){this.entityCode,this.type,this.item.items;return Array.isArray(this.item.items)}}),methods:{onMouseOver:function(t){this.isHover=t}}},E=r("KHd+"),S=Object(E.a)(w,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"category-tree-item",class:[{"category-tree-item--root":0===t.depth},{"category-tree-item--active":t.isActive}],on:{mouseover:function(e){return t.onMouseOver(!0)},mouseleave:function(e){return t.onMouseOver(!1)}}},[r("div",{staticClass:"category-tree-item__label"},[t.isInteractive?r("router-link",{staticClass:"category-tree-item__link",attrs:{to:t.url,exact:""===t.item.code}},[t._v("\n            "+t._s(t.item.name)+"\n        ")]):r("span",{staticClass:"category-tree-item__link"},[t._v("\n            "+t._s(t.item.name)+"\n        ")])],1),t._v(" "),r("transition",{attrs:{name:"slide-right-catalog"}},[t.hasChildren&&(t.isHover||t.isActive)?r("ul",{staticClass:"category-tree-item__list"},t._l(t.item.items,(function(e,n){return r("category-tree-item",{key:e.id||n,staticClass:"category-tree-item__item",attrs:{item:e,depth:t.depth+1,disabled:!t.isInteractive}})})),1):t._e()])],1)}),[],!1,null,null,null).exports,j=r("MhNv"),k=r("7cXU"),P=r("sEfC"),T=r.n(P);r("Xtz6");function R(t){return function(t){if(Array.isArray(t))return A(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return A(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return A(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function x(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function D(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?x(Object(r),!0).forEach((function(e){M(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function M(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var F={name:"catalog-filter",components:{VButton:i.a,VCheck:a.a,VRange:c.a,VAccordion:j.a,VLink:k.a},data:function(){return{format:{to:function(t){return Math.round(t)},from:function(t){return Number(t)}},maxCountFilters:8,showMore:[],isExpanded:[]}},computed:D(D(D(D({},Object(h.c)(v.NAME,[b.f,b.i])),Object(h.d)(v.NAME,[v.FILTERS])),Object(h.d)("route",{type:function(t){return t.params.type},code:function(t){return t.params.code},entityCode:function(t){return t.params.entityCode}})),{},{accordionFilters:function(){var t=this;return this.filters?this.filters.map((function(e,r){return{id:e.id,item:e,title:e.title,isExpanded:t.isExpanded.find((function(t){return t.id===e.id})).state,showMore:t.showMore.find((function(t){return t.id===e.id})).state,moreMax:!!e.items&&e.items.length>=t.maxCountFilters}})):[]}}),created:function(){this.initFiltersOptions()},methods:{onRadioChange:function(t,e){var r=this.type,n=this.entityCode,i=this.code,a=this.routeSegments;a.includes(e)||a.push(e),function(t){throw new Error('"'+t+'" is read-only')}("routeSegments"),a=a.filter((function(t){return t===e}));var o=Object(y.c)(r,n,i,a);this.$router.replace({path:o})},initFiltersOptions:function(){var t=this;this.showMore=R(this.filters.map((function(e){var r=e.type,n=e.items;return{id:e.id,state:!!("check"===r&&n&&n.length>=t.maxCountFilters)}}))),this.isExpanded=R(this.filters.map((function(t){return{id:t.id,state:!0}}))),this.isExpanded.forEach((function(e){var r=e.id;t.$refs["check"+r]&&t.$refs["check"+r].parentNode.removeAttribute("style")}))},onCheckChange:function(t,e){var r=this.type,n=this.entityCode,i=this.code,a=this.routeSegments;if(t){if(a.includes(e))return;a.push(e)}else{if(!a.includes(e))return;var o=a.indexOf(e);-1!==o&&a.splice(o,1)}var c=Object(y.c)(r,n,i,a);this.$router.replace({path:c})},onShowMoreClick:function(t){var e=this.showMore.findIndex((function(e){return e.id===t})),r=this.showMore.find((function(e){return e.id===t}));this.showMore.splice(e,1,D(D({},r),{},{state:!r.state})),this.$emit("updateSticky"),this.$refs["check"+t].parentNode.removeAttribute("style")},onIsExpandedClick:function(t){var e=this.isExpanded.findIndex((function(e){return e.id===t})),r=this.isExpanded.find((function(e){return e.id===t}));this.isExpanded.splice(e,1,D(D({},r),{},{state:!r.state})),this.$emit("updateSticky")},onRangeChange:function(t,e){this.debounce_rangeChange(t,e)}},beforeMount:function(){var t=this;this.debounce_rangeChange=T()((function(e,r){for(var n=t.type,i=t.entityCode,a=t.code,o=t.routeSegments,c="".concat(r,"-from_").concat(e[0],"_to_").concat(e[1]),s=new RegExp("^".concat(r,"-")),u=-1,l=0;l<o.length;l++)if(o[l].match(s)){u=l;break}if(-1!==u){if(o[u]===c)return;o.splice(u,1,c)}else o.push(c);var d=Object(y.c)(n,i,a,o);t.$router.replace({path:d})}),500)},watch:{filters:function(){this.initFiltersOptions()},sortValue:function(t,e){t!==e&&this.$router.replace({path:this.$route.path,query:{orderField:t.field,orderDirection:t.direction}})}}},I=Object(E.a)(F,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.accordionFilters&&t.accordionFilters.length>0?r("div",{staticClass:"catalog-filter"},[r("v-accordion",{staticClass:"catalog-filter__filters",attrs:{"key-field":"id",items:t.accordionFilters,"item-show-header":function(t){return!!t.title},"item-expanded":function(t){return t.isExpanded},"item-toggled":function(e){return t.onIsExpandedClick(e.id)}},scopedSlots:t._u([{key:"content",fn:function(e){var n=e.item;return["range"===n.item.type?r("div",{staticClass:"catalog-filter__filters-range"},[r("v-range",{key:n.item.min+"-"+n.item.max,attrs:{initialValue:[n.item.min,n.item.max],value:t.filterSegments[n.item.name]||[n.item.min,n.item.max],max:n.item.max,min:n.item.min,format:t.format},on:{input:function(e){return t.onRangeChange(e,n.item.name)}}})],1):"check"===n.item.type?r("div",{ref:"check"+n.item.id,staticClass:"catalog-filter__filters-check"},[t._l(n.showMore?n.item.items.filter((function(e,r){return r<t.maxCountFilters})):n.item.items,(function(e){return r("v-check",{key:e.id,attrs:{id:n.item.name+"-"+e.id,name:n.item.name,checked:t.filterSegments[n.item.name]&&t.filterSegments[n.item.name][e.code],disabled:!!e.disabled},on:{change:function(r){return t.onCheckChange(r,n.item.name+"-"+e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])})),t._v(" "),n.moreMax?r("button",{staticClass:"catalog-filter__filters-more",on:{click:function(){return t.onShowMoreClick(n.item.id)}}},[t._v("\n                    "+t._s(n.showMore?"Показать все":"Свернуть")+"\n                ")]):t._e()],2):"radio"===n.item.type?r("div",{staticClass:"catalog-filter__filters-check"},t._l(n.item.items,(function(e){return r("v-check",{key:e.id,attrs:{id:n.item.name+"-"+e.id,type:"radio",name:n.item.name,checked:t.filterSegments[n.item.name]&&t.filterSegments[n.item.name][e.code]},on:{change:function(r){return t.onRadioChange(r,n.item.name+"-"+e.code)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])})),1):t._e()]}}],null,!1,1357290210)})],1):t._e()}),[],!1,null,null,null).exports,N=r("LqtR"),$=r("NkcL"),G=r("6AGh"),U=r("3eXy"),H=r("Q2AE"),L=r("8TZ/"),B=r("0CxO"),q=r("55Sm"),V=r("jDKC"),W=r("pZQa"),z=r("QmAe"),Q=r("aXGN"),J=(r("48TQ"),r("aWaK")),K=r("fhPv"),Y=r("CLHG"),X=r("2JJK"),Z=r("4mC1"),tt=r("Kw5r"),et=r("GN+Y");tt.default.use(et);r("4eDr"),r("+in6"),r("9bRU");function rt(t,e,r,n,i,a,o){try{var c=t[a](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,i)}function nt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function it(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?nt(Object(r),!0).forEach((function(e){at(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):nt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function at(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var ot={name:"catalog",components:{VSvg:n.a,VButton:i.a,VSelect:s.a,VPagination:o.a,VSticky:u.a,VExpander:l.a,Modal:d.a,Breadcrumbs:f.a,BreadcrumbItem:p.a,FilterButton:m.a,TagItem:g.a,CategoryTreeItem:S,CatalogFilter:I,CatalogProductList:$.a,CatalogBannerCard:N.a,ShowMoreButton:G.a},data:function(){var t=[{id:1,title:"Сначала подороже",field:Y.c.PRICE,direction:X.sortDirections.DESC},{id:2,title:"Сначала подешевле",field:Y.c.PRICE,direction:X.sortDirections.ASC}];return{sortValue:t[0],sortOptions:t,filterModal:!1,showMore:!1,stickyOptions:{topSpacing:60,bottomSpacing:0,containerSelector:"[data-v-sticky-container]",innerWrapperSelector:"[data-v-sticky-inner]"}}},computed:it(it(it(it(it({},Object(h.d)([H.i])),Object(h.c)(v.NAME,[b.d,b.b,b.c,b.g,b.i,b.e])),Object(h.d)(v.NAME,[v.ITEMS,v.BANNER,v.CATEGORIES,v.PRODUCT_GROUP,v.TYPE,v.RANGE])),Object(h.d)("route",{code:function(t){return t.params.code},entityCode:function(t){return t.params.entityCode},searchQuery:function(t){return t.query.search_string}})),{},{isBrandPage:function(){return this.type===K.e.BRANDS},isFiltersPage:function(){return this.$route.path.includes("filters")},breadcrumbRootUrl:function(){var t=this.type;switch(t){case K.e.CATALOG:case K.e.NEW:case K.e.BESTSELLERS:case K.e.SEARCH:return{name:"Catalog",params:{type:t},query:it({},this.$route.query)};default:return{name:"ProductGroups",parmas:{type:t}}}return{name:"",params:{type:t}}},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet},mobileImg:function(){var t=this[v.PRODUCT_GROUP][v.BANNER]||{},e=t.mobileImage||t.tabletImage||t.desktopImage;if(e)return{webp:Object(Q.c)(320,240,e.id,X.fileExtension.image.WEBP),orig:Object(Q.c)(320,240,e.id)}},tabletImg:function(){var t=this[v.PRODUCT_GROUP][v.BANNER]||{},e=t.tabletImage||t.desktopImage;if(e)return{webp:Object(Q.c)(768,240,e.id,X.fileExtension.image.WEBP),orig:Object(Q.c)(768,240,e.id)}},desktopImg:function(){var t=this[v.PRODUCT_GROUP][v.BANNER]||{},e=t.desktopImage||t.tabletImage;if(e)return{webp:Object(Q.c)(1224,240,e.id,X.fileExtension.image.WEBP),orig:Object(Q.c)(1224,240,e.id)}},defaultImg:function(t){var e=this[v.PRODUCT_GROUP][v.BANNER]||{},r=e.desktopImage||e.tabletImage||e.mobileImage;if(r)return Object(Q.c)(1224,240,r.id)},clearFilterUrl:function(){var t=this.type,e=this.entityCode,r=this.code;return{path:Object(y.f)(t,e,r),query:it({},this.$route.query)}},productName:function(){return Object(z.h)(this.range,["продукт","продукта","продуктов"])},searchTitle:function(){var t=this.range,e=this.searchQuery;return t&&e?"По запросу «".concat(e,"» найдено ").concat(t," продуктов"):t&&!e?"По запросу найдено ".concat(t," продуктов"):"По запросу «".concat(e,"» ничего не найдено")}}),watch:{code:function(t){var e=this[b.b];e&&U.$retailRocket.addCategoryView(e.id),this.updateSticky()},sortValue:function(t,e){t!==e&&this.$router.replace({path:this.$route.path,query:it(it({},this.$route.query),{},{orderField:t.field,orderDirection:t.direction})})}},methods:it(it(it(it({},Object(h.b)(v.NAME,[W.a,W.b])),Object(h.b)(L.c,[B.b])),Object(h.b)(q.b,[V.a])),{},{scrollTo:function(t){this.$isServer||window.scrollTo(t)},updateSticky:function(){var t=this;this.$refs.sticky._stickySidebar.updateSticky(),setTimeout((function(){t.$refs.sticky._stickySidebar.updateSticky()}),500)},generateBreadcrumbUrl:function(t){var e=this.type,r=this.entityCode;return{path:Object(y.f)(e,r,t)}},setSortValue:function(t,e){this.sortValue=this.sortOptions.find((function(r){return r.field===t&&r.direction===e}))||this.sortOptions[0]},onClickDeleteTag:function(t){var e=this.type,r=this.code,n=this.entityCode,i=this.routeSegments;if(i.includes(t)){var a=i.indexOf(t);-1!==a&&i.splice(a,1);var o=Object(y.c)(e,n,r,i);this.$router.replace({path:o})}},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:it(it({},this.$route.query),{},{page:this.activePage+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:it(it({},this.$route.query),{},{page:t})})},fetchCatalog:function(t,e,r,n){var i,a=this;return(i=regeneratorRuntime.mark((function i(){var o,c,s,u,l,d,f,p,m,g,h,v,b,_,C,O,w,E,S,j,k,P,T;return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,o=t.params,c=o.code,s=o.entityCode,u=o.type,l=o.pathMatch,d=t.query,f=d.page,p=void 0===f?1:f,m=d.orderField,g=void 0===m?Y.c.PRICE:m,h=d.orderDirection,v=void 0===h?X.sortDirections.DESC:h,b=d.search_string,C=(_=void 0===b?null:b)&&u===K.e.SEARCH?encodeURI(_):void 0,(O=e.params).code,O.entityCode,O.type,w=e.query,E=(w=void 0===w?{page:1}:w).page,S=void 0===E?1:E,j=Object(y.a)(l,c,C),k=j.filter,P=j.routeSegments,T=j.filterSegments,a.$progress.start(),i.next=11,a[W.a]({type:u,entityCode:s,code:c,filter:k,routeSegments:P,filterSegments:T,page:p,orderField:g,orderDirection:v,showMore:n});case 11:a.setSortValue(g,v),a.$progress.finish(),r(),n||p===S||a.scrollTo({top:a.$refs.catalogHeader.offsetHeight,behavior:"smooth"}),n&&setTimeout((function(){return a.showMore=!1}),200),i.next=23;break;case 18:if(i.prev=18,i.t0=i.catch(0),!i.t0||!0!==i.t0.isCancel){i.next=22;break}return i.abrupt("return");case 22:a.$progress.fail();case 23:case"end":return i.stop()}}),i,null,[[0,18]])})),function(){var t=this,e=arguments;return new Promise((function(r,n){var a=i.apply(t,e);function o(t){rt(a,r,n,o,c,"next",t)}function c(t){rt(a,r,n,o,c,"throw",t)}o(void 0)}))})()}}),beforeRouteEnter:function(t,e,r){var n=t.fullPath,i=t.params,a=i.code,o=void 0===a?null:a,c=i.entityCode,s=void 0===c?null:c,u=i.type,l=i.pathMatch,d=t.query,f=(d=void 0===d?{page:1,orderField:Y.c.PRICE,orderDirection:X.sortDirections.DESC}:d).page,p=void 0===f?1:f,m=d.orderField,g=void 0===m?Y.c.PRICE:m,h=d.orderDirection,b=void 0===h?X.sortDirections.DESC:h,_=d.search_string,C=_&&u===K.e.SEARCH?encodeURI(_):void 0,O=U.$store.state[v.NAME],w=O.loadPath,E=O.categoryCode,S=O.entityCode,j=O.type;if(w===n&&u===j&&o===E&&s===S)r((function(t){return t.setSortValue(g,b)}));else{var k=Object(y.a)(l,o,C),P=k.filter,T=k.routeSegments,R=k.filterSegments;U.$progress.start(),U.$store.dispatch("".concat(v.NAME,"/").concat(W.a),{type:u,entityCode:s,code:o,filter:P,routeSegments:T,filterSegments:R,page:p,orderField:g,orderDirection:b}).then((function(t){U.$store.dispatch("".concat(v.NAME,"/").concat(W.b),n),r((function(t){U.$progress.finish(),t.setSortValue(g,b),t[H.i]&&t.scrollTo({top:Z.e+1,behavior:"smooth"})}))})).catch((function(e){return e&&!0===e.isCancel?r():(U.$progress.fail(),e&&e.status===X.httpCodes.NOT_FOUND?r(Object(J.b)(t)):void r())}))}},beforeRouteUpdate:function(t,e,r){var n=t.params,i=n.code,a=n.entityCode,o=n.type,c=n.pathMatch,s=t.query,u=s.page,l=void 0===u?1:u,d=s.orderField,f=void 0===d?Y.c.PRICE:d,p=s.orderDirection,m=void 0===p?X.sortDirections.DESC:p,g=s.search_string,h=g&&o===K.e.SEARCH?encodeURI(g):void 0,v=Object(y.a)(c,i,h),b=v.filter,_=v.routeSegments,C=v.filterSegments,O=e.params,w=O.code,E=O.entityCode,S=O.type,j=O.pathMatch,k=e.query,P=k.page,T=void 0===P?1:P,R=k.orderField,A=void 0===R?Y.c.PRICE:R,x=k.orderDirection,D=void 0===x?X.sortDirections.DESC:x,M=k.search_string;if(o===S&&a===E&&i===w&&c===j&&l===T&&f===A&&m===D&&g===M)return r();this[W.a]({type:o,entityCode:a,code:i,filter:b,routeSegments:_,filterSegments:C,toPage:b.search_string?void 0:l,toOrderField:f,toOrderDirection:m}),this.showMore?this.fetchCatalog(t,e,r,this.showMore):this.debounce_fetchCatalog(t,e,r)},beforeRouteLeave:function(t,e,r){this.debounce_fetchCatalog.cancel(),r()},beforeMount:function(){var t=this[b.b]||null;t&&U.$retailRocket.addCategoryView(t.id),this.debounce_fetchCatalog=T()(this.fetchCatalog,500)},created:function(){this.productGroupTypes=K.e}},ct=Object(E.a)(ot,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section catalog-view"},[r("div",{ref:"catalogHeader",staticClass:"container catalog-view__header"},[r("breadcrumbs",{staticClass:"catalog-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t.isTablet?r("v-svg",{attrs:{name:"home",width:"10",height:"10"}}):r("span",[t._v("Главная")])],1),t._v(" "),r("breadcrumb-item",{key:t.type,attrs:{to:t.breadcrumbRootUrl}},[t._v(t._s(t.$t("productGroups.title."+t.type)))]),t._v(" "),t.entityCode?r("breadcrumb-item",{key:t.entityCode,attrs:{to:t.generateBreadcrumbUrl(null)}},[t._v(t._s(t.productGroup&&t.productGroup.name))]):t._e(),t._v(" "),t._l(t.breadcrumbs,(function(e){return r("breadcrumb-item",{key:e.id,attrs:{to:t.generateBreadcrumbUrl(e.code)}},[t._v(t._s(e.name))])}))],2)],1),t._v(" "),r("section",{staticClass:"section"},[r("div",{staticClass:"container catalog-view__grid",attrs:{"data-v-sticky-container":""}},[!t.isTabletLg&&t.categories.length>0?r("div",{directives:[{name:"sticky",rawName:"v-sticky",value:t.stickyOptions,expression:"stickyOptions"}],ref:"sticky",staticClass:"catalog-view__side-panel"},[r("div",{attrs:{"data-v-sticky-inner":""}},[r("ul",{staticClass:"catalog-view__side-panel-categories"},t._l(t.categories,(function(t){return r("category-tree-item",{key:t.id,staticClass:"catalog-view__side-panel-categories-item",attrs:{item:t}})})),1),t._v(" "),r("catalog-filter",{staticClass:"catalog-view__side-panel-filters",on:{updateSticky:t.updateSticky}}),t._v(" "),r("v-button",{directives:[{name:"show",rawName:"v-show",value:t.isFiltersPage,expression:"isFiltersPage"}],staticClass:"btn--outline catalog-view__side-panel-clear-btn",class:!t.isFiltersPage&&"is-disabled",attrs:{to:t.clearFilterUrl,replace:""}},[t._v("\n                        Очистить фильтры\n                    ")])],1)]):t._e(),t._v(" "),r("div",{staticClass:"catalog-view__main"},[r("div",{staticClass:"catalog-view__main-header"},[r("div",{staticClass:"catalog-view__main-header-title"},[t.type!==t.productGroupTypes.SEARCH?[r("h1",{staticClass:"catalog-view__main-header-hl"},[t._v("\n                                "+t._s(t.activeCategory?t.activeCategory.name:"Все категории")+"\n                            ")]),t._v(" "),r("p",{staticClass:"text-grey catalog-view__main-header-text"},[t._v(t._s(t.range)+" "+t._s(t.productName))])]:[r("h1",{staticClass:"catalog-view__main-header-hl"},[t._v("\n                                "+t._s(t.searchTitle)+"\n                            ")])]],2),t._v(" "),r("v-select",{staticClass:"catalog-view__main-header-sort",attrs:{label:"title","track-by":"id",options:t.sortOptions,searchable:!1,"allow-empty":!1,"show-labels":!1},model:{value:t.sortValue,callback:function(e){t.sortValue=e},expression:"sortValue"}}),t._v(" "),r("filter-button",{staticClass:"catalog-view__main-header-btn",on:{click:function(e){t.filterModal=!t.filterModal}}},[t._v("\n                        Фильтр и сортировка  \n                        "),r("span",{staticClass:"text-grey"},[t._v(t._s(t.activeTags.length))])])],1),t._v(" "),t.isTabletLg?t._e():r("transition-group",{staticClass:"catalog-view__main-tags",attrs:{tag:"ul",name:"tag-item"}},t._l(t.activeTags,(function(e,n){return r("tag-item",{key:e.code,attrs:{"data-index":n,text:e.name},on:{delete:function(r){return t.onClickDeleteTag(e.segment)}}})})),1),t._v(" "),r("catalog-product-list",{key:t.type,staticClass:"catalog-view__main-grid",attrs:{items:t.items,animation:!t.isTablet,fullscreen:t.categories&&0===t.categories.length}}),t._v(" "),t.pagesCount>1?r("div",{staticClass:"catalog-view__main-controls"},[t.activePage<t.pagesCount?r("show-more-button",{attrs:{"btn-class":"btn--outline catalog-view__main-controls-btn","show-preloader":t.showMore},on:{click:t.onShowMore}},[t._v("\n                        Показать ещё\n                    ")]):t._e(),t._v(" "),r("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e(),t._v(" "),t.isBrandPage?r("div",{attrs:{"data-retailrocket-markup-block":"5efdc55a97a52833a0d00baa","data-vendor":t.entityCode}}):r("div",{attrs:{"data-retailrocket-markup-block":"5efda10697a52833a0d006df","data-category-id":t.activeCategory&&t.activeCategory.id}})],1)])]),t._v(" "),r("transition",{attrs:{name:"fade-in"}},[t.filterModal&&t.isTabletLg?r("modal",{staticClass:"catalog-view__modal-filter",attrs:{"show-close-btn":!1,type:"fullscreen"},scopedSlots:t._u([{key:"body",fn:function(){return[r("v-sticky",{staticClass:"catalog-view__modal-filter-sticky",scopedSlots:t._u([{key:"sticky",fn:function(){return[r("div",{staticClass:"catalog-view__modal-filter-header"},[r("button",{staticClass:"catalog-view__modal-filter-header-btn",on:{click:function(e){t.filterModal=!1}}},[r("v-svg",{attrs:{name:"cross-small",width:"14",height:"14"}}),t._v("Фильтр\n                            ")],1)])]},proxy:!0}],null,!1,219555529)},[t._v(" "),r("div",{staticClass:"catalog-view__modal-filter-sort"},[r("div",{staticClass:"catalog-view__modal-filter-sort-title"},[t._v("Сортировка")]),t._v(" "),r("ul",{staticClass:"catalog-view__modal-filter-sort-list"},t._l(t.sortOptions,(function(e){return r("li",{key:e.title,staticClass:"catalog-view__modal-filter-sort-item",class:{"catalog-view__modal-filter-sort-item--active":e===t.sortValue}},[r("button",{staticClass:"catalog-view__modal-filter-sort-btn",on:{click:function(r){t.sortValue=e}}},[t._v("\n                                    "+t._s(e.title)+"\n                                ")])])})),0)]),t._v(" "),r("catalog-filter",{staticClass:"catalog-view__modal-filter-panel"}),t._v(" "),r("div",{staticClass:"catalog-view__modal-filter-controls"},[r("v-button",{staticClass:"btn--outline catalog-view__modal-filter-clear-btn",attrs:{to:t.clearFilterUrl,replace:""}},[t._v("\n                            Очистить\n                        ")]),t._v(" "),r("v-button",{staticClass:"catalog-view__modal-filter-close-btn",on:{click:function(e){t.filterModal=!t.filterModal}}},[t._v("\n                            Показать "+t._s(t.range)+"\n                        ")])],1)],1)]},proxy:!0}],null,!1,2120702659)}):t._e()],1)],1)}),[],!1,null,null,null);e.default=ct.exports},"3bB/":function(t,e,r){"use strict";r.r(e),r.d(e,"NAME",(function(){return s})),r.d(e,"LOAD_PATH",(function(){return u})),r.d(e,"TYPE",(function(){return l})),r.d(e,"ENTITY_CODE",(function(){return d})),r.d(e,"CATEGORY_CODE",(function(){return f})),r.d(e,"BASE_CATEGORY_CODE",(function(){return p})),r.d(e,"CATEGORIES",(function(){return m})),r.d(e,"FILTERS",(function(){return g})),r.d(e,"BANNER",(function(){return h})),r.d(e,"ITEMS",(function(){return v})),r.d(e,"RANGE",(function(){return b})),r.d(e,"PRODUCT_GROUP",(function(){return y})),r.d(e,"ROUTE_SEGMENTS",(function(){return _})),r.d(e,"FILTER_SEGMENTS",(function(){return C})),r.d(e,"default",(function(){return O}));var n=r("fhPv"),i=r("pZQa"),a=r("45sr"),o=r("zUOt");function c(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var s="catalog",u="loadPath",l="type",d="entityCode",f="categoryCode",p="baseCategoryCode",m="categories",g="filters",h="banner",v="items",b="range",y="productGroup",_="routeSegments",C="filterSegments";function O(){var t;return{name:s,namespaced:!0,state:(t={},c(t,u,null),c(t,l,null),c(t,d,null),c(t,f,null),c(t,p,null),c(t,y,c({type:n.e.CATALOG,base:n.d.FILTERS,excluded_filters:[],filters:{}},h,{})),c(t,m,[]),c(t,g,[]),c(t,v,[]),c(t,b,0),c(t,_,[]),c(t,C,{}),t),actions:i.c,mutations:a.c,getters:o.j}}},"45sr":function(t,e,r){"use strict";var n;function i(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"b",(function(){return a})),r.d(e,"a",(function(){return o}));var a="SET_LOAD_PATH",o="APPLY_DATA";e.c=(i(n={},a,(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t.loadPath=e})),i(n,o,(function(t,e){Object.assign(t,e)})),n)},"9bRU":function(t,e,r){},Xtz6:function(t,e,r){},pZQa:function(t,e,r){"use strict";r.d(e,"b",(function(){return b})),r.d(e,"a",(function(){return y}));var n,i=r("JBE3"),a=r.n(i),o=(r("3eXy"),r("fhPv")),c=r("48TQ"),s=(r("W6hq"),r("Nlzp")),u=r("45sr");function l(t){return function(t){if(Array.isArray(t))return d(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return d(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return d(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){m(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function m(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function g(t,e,r,n,i,a,o){try{var c=t[a](o),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,i)}function h(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var a=t.apply(e,r);function o(t){g(a,n,i,o,c,"next",t)}function c(t){g(a,n,i,o,c,"throw",t)}o(void 0)}))}}function v(t,e){return Array.isArray(t)?t.concat(e):e}var b="SET_LOAD_PATH",y="FETCH_CATALOG_DATA";e.c=(m(n={},b,(function(t,e){(0,t.commit)(u.b,e)})),m(n,"FETCH_BANNER",(function(t,e){return h(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.commit,e.prev=1,e.next=4,Object(s.W)();case 4:return r=e.sent,e.abrupt("return",r[6]);case 8:e.prev=8,e.t0=e.catch(1),Object(c.b)("FETCH_BANNER",!0)(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))()})),m(n,"FETCH_CATEGORIES",(function(t){var e=arguments;return h(regeneratorRuntime.mark((function r(){var n,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.commit,n=e.length>1&&void 0!==e[1]?e[1]:{},i=n.code,r.prev=2,r.next=5,Object(s.gb)(i);case 5:return r.abrupt("return",r.sent);case 8:return r.prev=8,r.t0=r.catch(2),Object(c.b)("FETCH_CATEGORIES")(r.t0),r.abrupt("return",[]);case 12:case"end":return r.stop()}}),r,null,[[2,8]])})))()})),m(n,"FETCH_FILTERS",(function(t,e){return h(regeneratorRuntime.mark((function r(){var n,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.commit,n=e.appliedFilters,i=e.excludedFilters,r.prev=2,r.next=5,Object(s.mb)(n,i);case 5:return r.abrupt("return",r.sent);case 8:return r.prev=8,r.t0=r.catch(2),Object(c.b)("FETCH_FILTERS")(r.t0),r.abrupt("return",[]);case 12:case"end":return r.stop()}}),r,null,[[2,8]])})))()})),m(n,"FETCH_ITEMS",(function(t,e){return h(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.commit,t.state,r.prev=1,r.next=4,Object(s.db)(e);case 4:return r.abrupt("return",r.sent);case 7:return r.prev=7,r.t0=r.catch(1),Object(c.b)("FETCH_ITEMS")(r.t0),r.abrupt("return",[]);case 11:case"end":return r.stop()}}),r,null,[[1,7]])})))()})),m(n,"FETCH_PRODUCT_GROUP",(function(t,e){return h(regeneratorRuntime.mark((function r(){var n,i,a;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.commit,n=e.type,i=e.entityCode,r.prev=2,r.next=5,Object(s.wb)(n,i||void 0);case 5:return a=r.sent,r.abrupt("return",a);case 9:r.prev=9,r.t0=r.catch(2),Object(c.b)("FETCH_PRODUCT_GROUP",!0)(r.t0);case 12:case"end":return r.stop()}}),r,null,[[2,9]])})))()})),m(n,y,(function(t,e){return h(regeneratorRuntime.mark((function r(){var n,i,c,s,d,f,m,g,h,b,y,_,C,O,w,E,S,j,k,P,T,R,A,x,D,M,F,I;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n=t.state,i=t.dispatch,c=t.commit,s=e.type,d=void 0===s?null:s,f=e.entityCode,m=void 0===f?null:f,g=e.filter,h=e.routeSegments,b=e.filterSegments,y=e.page,_=e.orderField,C=e.orderDirection,O=e.showMore,w={},E=[],S=g,j=null,k=null,P=null,n.type===d&&n.entityCode===m){r.next=20;break}return r.next=11,i("FETCH_PRODUCT_GROUP",{type:d,entityCode:m});case 11:w.productGroup=r.sent,w.entityCode=m,w.type=d,j=w.productGroup.based,k=w.productGroup.excluded_filters,P=w.productGroup.filters,j===o.d.FILTERS?E.push({action:"FETCH_CATEGORIES",payload:{code:P.category}}):(w.categories=[],w.activeCategories=[]),r.next=25;break;case 20:w.productGroup=n.productGroup,w.categories=n.categories,j=n.productGroup.based,k=n.productGroup.excluded_filters,P=n.productGroup.filters;case 25:return S=p(p({},a()(g,P,v)),{},{category:g.category||P.category||void 0}),j===o.d.FILTERS?(w.baseCategoryCode=P.category,w.categoryCode=g.category,E.push({action:"FETCH_FILTERS",payload:{appliedFilters:S,excludedFilters:k}})):(w.baseCategoryCode=null,w.categoryCode=null,w.filters=[]),w.routeSegments=h,w.filterSegments=b,w.page=y,E.push({action:"FETCH_ITEMS",payload:{filter:S,page:y,orderField:_,orderDirection:C}}),r.next=33,Promise.all(E.map((function(t){return i(t.action,t.payload)})));case 33:T=r.sent,R=0;case 35:if(!(R<E.length)){r.next=53;break}A=E[R],x=T[R],r.t0=A.action,r.next="FETCH_CATEGORIES"===r.t0?41:"FETCH_FILTERS"===r.t0?43:"FETCH_ITEMS"===r.t0?45:49;break;case 41:return w.categories=x,r.abrupt("break",50);case 43:return w.filters=x,r.abrupt("break",50);case 45:return D=x.items,M=void 0===D?[]:D,F=x.range,I=void 0===F?0:F,w.items=O?[].concat(l(n.items),l(M)):M,w.range=I,r.abrupt("break",50);case 49:return r.abrupt("break",50);case 50:R++,r.next=35;break;case 53:c(u.a,w);case 54:case"end":return r.stop()}}),r)})))()})),n)},x3SC:function(t,e,r){},zUOt:function(t,e,r){"use strict";r.d(e,"i",(function(){return s})),r.d(e,"f",(function(){return u})),r.d(e,"d",(function(){return l})),r.d(e,"b",(function(){return d})),r.d(e,"c",(function(){return f})),r.d(e,"g",(function(){return p})),r.d(e,"a",(function(){return m})),r.d(e,"h",(function(){return g})),r.d(e,"e",(function(){return h}));var n,i=r("W6hq");r("2JJK");function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var s="routeSegments",u="filterSegments",l="activeTags",d="activeCategory",f="activePage",p="pagesCount",m="activeCategories",g="rootCategory",h="breadcrumbs";e.j=(c(n={},m,(function(t){var e=t.categories,r=t.baseCategoryCode,n=t.categoryCode;return Object(i.i)(e,n||r)})),c(n,g,(function(t,e){var r=t.baseCategoryCode;return e.activeCategories.find((function(t){return t.code===r}))})),c(n,h,(function(t,e){var r=e.rootCategory,n=e.activeCategories,i=n.indexOf(r);return-1!==i?n.slice(i+1):n})),c(n,f,(function(t,e,r){var n=r.route;return n.query.page?Number(n.query.page):1})),c(n,p,(function(t){return Math.ceil(t.range/12)})),c(n,d,(function(t,e){var r=e.activeCategories;return r[r.length-1]})),c(n,s,(function(t,e,r){var n=r.route.params.pathMatch;return n?n.split("/"):[]})),c(n,u,(function(t,e){var r=e[s];return Object(i.j)(r)})),c(n,l,(function(t,e){for(var r=[],n=t.filters.filter((function(t){return"range"!==t.type})),i=e.filterSegments,a=0;a<n.length;a++){var c=n[a];if(c.items)for(var s=0;s<c.items.length;s++){var u=c.items[s];i[c.name]&&i[c.name][u.code]&&r.push(o(o({},u),{},{segment:"".concat(c.name,"-").concat(u.code)}))}}return r})),n)}}]);