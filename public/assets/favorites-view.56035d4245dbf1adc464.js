(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{"0Bec":function(e,t,r){},fPNc:function(e,t,r){"use strict";r.r(t);var o=r("i2Ud"),n=r("+gqB"),a=r("/Q9p"),i=r("L2JU"),s=r("3eXy"),c=r("Cv2f"),u=r("xm1V"),p=r("LCOE"),f=r("55Sm"),d=r("jDKC"),v=r("/Qa0"),l=r("Jtxo"),h=r("4mC1");r("0Bec");function g(e,t,r,o,n,a,i){try{var s=e[a](i),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(o,n)}function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var m={name:"favorites",components:{VButton:o.a,VPagination:n.a,CatalogProductCard:a.a},data:function(){return{showMore:!1}},computed:w({},Object(i.d)(c.e,[c.b,c.c,c.d,c.a]),{},Object(i.c)(c.e,[u.a])),methods:w({},Object(i.b)(c.e,[p.a,p.b]),{},Object(i.b)(f.b,[d.a]),{onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:w({},this.$route.query,{page:this[c.a]+1})})},onPageChanged:function(e){this.showMore=!1,this.$router.push({path:this.$route.path,query:w({},this.$route.query,{page:e})})},onPreview:function(e){this[d.a]({name:v.a,open:!0,state:{code:e}})},onAddToCart:function(e){this[d.a]({name:l.a,open:!0,state:{offerId:e.id,storeId:e.stock.storeId,type:e.type}})}}),beforeRouteEnter:function(e,t,r){var o=e.fullPath,n=e.query.page,a=void 0===n?h.a:n;s.$store.state[c.e].loadPath!==o&&(s.$progress.start(),s.$store.dispatch("".concat(c.e,"/").concat(p.a),{page:a}).then((function(e){s.$store.dispatch("".concat(c.e,"/").concat(p.b),o),r((function(e){s.$progress.finish()}))})).catch((function(e){if(e&&!0===e.isCancel)return!0;r((function(e){s.$progress.fail()}))})))},beforeRouteUpdate:function(e,t,r){var o,n=this;return(o=regeneratorRuntime.mark((function t(){var o,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=e.query.page,a=void 0===o?h.a:o,t.prev=1,n.$progress.start(),t.next=5,n[p.a]({page:a,showMore:n.showMore});case 5:n.$progress.finish(),r(),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(1),n.$progress.fail(),r(!1);case 13:n.showMore=!1;case 14:case"end":return t.stop()}}),t,null,[[1,9]])})),function(){var e=this,t=arguments;return new Promise((function(r,n){var a=o.apply(e,t);function i(e){g(a,r,n,i,s,"next",e)}function s(e){g(a,r,n,i,s,"throw",e)}i(void 0)}))})()}},C=r("KHd+"),_=Object(C.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section favorites-view"},[r("div",{staticClass:"container favorites-view__header"},[r("h1",{staticClass:"favorites-view__header-h1"},[e._v("Избранное\n            "),e.pagesCount>0?r("span",{staticClass:"favorites-view__header-counter"},[e._v(e._s(e.pagesCount)+" продуктов")]):e._e()])]),e._v(" "),e.pagesCount>0?r("div",{staticClass:"container favorites-container"},[r("ul",{staticClass:"favorites-product-list"},e._l(e.favorites.items,(function(t){return r("catalog-product-card",{key:t.id,staticClass:"favorites-product-list__item",attrs:{"product-id":t.id,name:t.name,type:t.type,href:"/catalog/"+t.categoryCodes[t.categoryCodes.length-1]+"/"+t.code,image:t.image,price:t.price,"old-price":t.oldPrice,tags:t.tags,rating:t.rating,"show-buy-btn":t.stock.qty>0},on:{"add-item":function(r){return e.onAddToCart(t)},preview:function(r){return e.onPreview(t.code)}}})})),1),e._v(" "),r("div",{staticClass:"favorites-view__main-controls"},[e.activePage<e.pagesCount?r("v-button",{staticClass:"btn--outline favorites-view__main-controls-btn",attrs:{disabled:e.showMore},on:{click:e.onShowMore}},[e._v("\n                Показать ещё\n            ")]):e._e(),e._v(" "),r("v-pagination",{attrs:{value:e.activePage,"page-count":e.pagesCount},on:{input:e.onPageChanged}})],1)]):r("div",{staticClass:"container"},[r("p",[e._v("Ничего не найдено")])])])}),[],!1,null,null,null);t.default=_.exports}}]);