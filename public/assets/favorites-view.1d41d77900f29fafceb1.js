(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{"0Bec":function(t,e,r){},fPNc:function(t,e,r){"use strict";r.r(e);var o=r("i2Ud"),i=r("+gqB"),a=r("pFko"),n=r("NDiG"),s=r("/Q9p"),c=r("6AGh"),l=r("obii"),u=r("zfPd"),f=r("L2JU"),d=r("3eXy"),v=r("Cv2f"),p=r("xm1V"),h=r("LCOE"),g=r("55Sm"),b=r("jDKC"),_=r("QmAe"),w=r("4mC1"),m=r("2JJK"),C=r("RiBg"),y=r("nfjx");r("+in6"),r("0Bec");function O(t,e,r,o,i,a,n){try{var s=t[a](n),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(o,i)}function P(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function $(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?P(Object(r),!0).forEach((function(e){j(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function j(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var D={name:"favorites",mixins:[y.a],components:{VButton:o.a,VPagination:i.a,VSelect:a.a,VSvg:n.a,CatalogProductCard:s.a,ShowMoreButton:c.a,Breadcrumbs:l.a,BreadcrumbItem:u.a},metaInfo:function(){var t=this.catalogTitle,e=this.activePage;return{title:e>1?"".concat(t," – страница ").concat(e):t}},data:function(){var t=[{id:1,title:"Сначала дороже",field:C.a.PRICE,direction:m.sortDirections.DESC},{id:2,title:"Сначала дешевле",field:C.a.PRICE,direction:m.sortDirections.ASC}];return{sortValue:t[0],sortOptions:t,showMore:!1}},computed:$($($({},Object(f.d)(v.f,[v.b,v.c,v.d,v.e,v.a])),Object(f.c)(v.f,[p.c])),{},{productName:function(){return Object(_.l)(this.favoritesAll.length,["продукт","продукта","продуктов"])},catalogTitle:function(){return"Избранное"},isTablet:function(){return this.$mq.tablet}}),watch:{sortValue:function(t,e){t!==e&&this.$router.replace({path:this.$route.path,query:{orderField:t.field,orderDirection:t.direction}})}},methods:$($($({},Object(f.b)(v.f,[h.e,h.g,h.h,h.c])),Object(f.b)(g.b,[b.a])),{},{onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:$($({},this.$route.query),{},{page:this[v.a]+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:$($({},this.$route.query),{},{page:t>w.b?t:void 0})})},onToggleFavorite:function(t){var e=t.productId;this[h.h](e)},onAddToCart:function(t){t.code;var e=t.type,r=t.stock,o=t.id;this[b.a]({name:m.modalName.general.ADD_TO_CART,open:!0,state:{offerId:o,storeId:r&&r.storeId,type:e}})},onPreview:function(t){this[b.a]({name:m.modalName.general.QUICK_VIEW,open:!0,state:{code:t}})},onClearFavorites:function(){this[h.c]()},setSortValue:function(t,e){this.sortValue=this.sortOptions.find((function(r){return r.field===t&&r.direction===e}))||this.sortOptions[0]}}),beforeRouteEnter:function(t,e,r){var o=t.fullPath,i=t.query,a=i.page,n=void 0===a?w.b:a,s=i.orderField,c=void 0===s?C.a.PRICE:s,l=i.orderDirection,u=void 0===l?m.sortDirections.DESC:l;function f(){if(d.$store.state[v.f]){d.$store.state[v.f].loadPath;d.$progress.start(),d.$store.dispatch("".concat(v.f,"/").concat(h.e),{page:n,orderField:c,orderDirection:u}).then((function(t){d.$store.dispatch("".concat(v.f,"/").concat(h.g),o),r((function(t){t.setSortValue(c,u),d.$progress.finish()}))})).catch((function(t){if(t&&!0===t.isCancel)return!0;r((function(t){d.$progress.fail()}))}))}}d.$store.state[v.f]?f():d.$store.watch((function(t){return t[v.f]}),(function(t){t&&f()}))},beforeRouteUpdate:function(t,e,r){var o,i=this;return(o=regeneratorRuntime.mark((function e(){var o,a,n,s,c,l,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.query,a=o.page,n=void 0===a?w.b:a,s=o.orderField,c=void 0===s?C.a.PRICE:s,l=o.orderDirection,u=void 0===l?m.sortDirections.DESC:l,e.prev=1,i.$progress.start(),e.next=5,i[h.e]({page:n,orderField:c,orderDirection:u,showMore:i.showMore});case 5:i.setSortValue(c,u),i.$progress.finish(),r(),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),i.$progress.fail(),r(!1);case 14:i.showMore=!1;case 15:case"end":return e.stop()}}),e,null,[[1,10]])})),function(){var t=this,e=arguments;return new Promise((function(r,i){var a=o.apply(t,e);function n(t){O(a,r,i,n,s,"next",t)}function s(t){O(a,r,i,n,s,"throw",t)}n(void 0)}))})()}},k=r("KHd+"),S=Object(k.a)(D,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section favorites-view"},[r("div",{staticClass:"container"},[r("breadcrumbs",{staticClass:"favorites-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t.isTablet?r("v-svg",{attrs:{name:"home",width:"10",height:"10"}}):r("span",[t._v("Главная")])],1),t._v(" "),r("breadcrumb-item",{key:"Favorites",attrs:{to:t.$route.path}},[t._v(t._s(t.catalogTitle))])],1)],1),t._v(" "),r("section",{staticClass:"section favorites-view__section"},[r("div",{staticClass:"container favorites-view__header"},[r("h1",{staticClass:"favorites-view__header-hl"},[t._v("\n                "+t._s(t.catalogTitle)+"\n                "),t.favoritesAll.length>0?r("span",{staticClass:"favorites-view__header-counter"},[t._v("\n                    "+t._s(t.favoritesAll.length)+"\n                    "+t._s(t.productName)+"\n                ")]):t._e()]),t._v(" "),t.favorites.length>0?r("div",{staticClass:"favorites-view__filters"},[r("v-button",{staticClass:"btn--transparent favorites-view__filters-btn",on:{click:t.onClearFavorites}},[r("v-svg",{staticClass:"favorites-view__filters-icon",attrs:{name:"cross",width:"24",height:"24"}}),t._v("\n                    Очистить все\n                ")],1),t._v(" "),r("v-select",{staticClass:"favorites-view__filters-sort",attrs:{label:"title","track-by":"id",options:t.sortOptions,searchable:!1,"allow-empty":!1,"show-labels":!1},model:{value:t.sortValue,callback:function(e){t.sortValue=e},expression:"sortValue"}})],1):t._e()]),t._v(" "),t.favorites.length>0?r("div",{staticClass:"container favorites-view__section-container"},[r("ul",{staticClass:"favorites-view__list"},t._l(t.favorites,(function(e){return r("catalog-product-card",{key:e.id,staticClass:"favorites-view__list-item",attrs:{"offer-id":e.id,"product-id":e.productId,name:e.name,type:e.type,href:"/catalog/"+e.categoryCodes[e.categoryCodes.length-1]+"/"+e.code,image:e.image,price:e.price,"old-price":e.oldPrice,badges:e.badges,rating:e.rating,"show-buy-btn":e.stock.qty>0},on:{"add-item":function(r){return t.onAddToCart(e)},preview:function(r){return t.onPreview(e.code)},"toggle-favorite-item":function(r){return t.onToggleFavorite(e)}}})})),1)]):r("p",{staticClass:"container"},[t._v("Ничего не найдено")]),t._v(" "),t.pagesCount>1?r("div",{staticClass:"container favorites-view__main-controls"},[t.activePage<t.pagesCount?r("show-more-button",{attrs:{"btn-class":"btn--outline favorites-view__main-controls-btn","preloader-class":"favorites-view__preloader","show-preloader":t.showMore},on:{click:t.onShowMore}},[t._v("\n                Показать ещё\n            ")]):t._e(),t._v(" "),r("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e()])])}),[],!1,null,null,null);e.default=S.exports}}]);