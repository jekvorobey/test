(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{jGXi:function(t,e,n){"use strict";n.r(e);var i,o=n("i2Ud"),r=n("YSwA"),s=n("/Q9p"),a=n("L2JU"),c=n("55Sm"),d=n("jDKC"),u=n("Cvmm"),l=n("MJWm"),f=n("Cv2f"),p=n("LCOE"),v=n("2JJK");n("ySlP");function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){w(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function w(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var m={spaceBetween:24,slidesPerView:4,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:(i={},w(i,v.breakpoints.tabletLg-1,{slidesPerView:2.5,spaceBetween:24,slidesOffsetBefore:24,slidesOffsetAfter:24}),w(i,v.breakpoints.tablet-1,{slidesPerView:2,spaceBetween:12,slidesOffsetBefore:0,slidesOffsetAfter:0}),i)},g={name:"not-found",components:{VButton:o.a,VSlider:r.a,CatalogProductCard:s.a},computed:_(_({},Object(a.d)(u.b,[u.a])),{},{isTabletLg:function(){return this.$mq.tabletLg},sliderOptions:function(){return m}}),methods:_(_(_(_({},Object(a.b)(c.b,[d.a])),Object(a.b)(u.b,[l.a])),Object(a.b)(f.f,[p.e])),{},{onToggleFavorite:function(t){var e=t.productId;this[p.e](e)},onPreview:function(t){this[d.a]({name:v.modalName.general.QUICK_VIEW,open:!0,state:{code:t}})},onAddToCart:function(t){this[d.a]({name:v.modalName.general.ADD_TO_CART,open:!0,state:{offerId:t.id,storeId:t.stock.storeId,type:t.type}})}}),beforeMount:function(){this[l.a]()}},h=n("KHd+"),O=Object(h.a)(g,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section not-found-view"},[n("div",{staticClass:"container not-found-view__main"},[n("div",{staticClass:"not-found-view__main-body"},[n("h1",{staticClass:"not-found-view__hl"},[t._v("404")]),t._v(" "),n("p",[t._v("\n                К сожалению, неправильно набран адрес, или такой страницы больше не существует.\n            ")]),t._v(" "),t._m(0),t._v(" "),n("v-button",{staticClass:"not-found-view__main-btn",attrs:{to:"/"}},[t._v("На главную страницу")])],1)]),t._v(" "),t._m(1),t._v(" "),t.featuredProducts&&t.featuredProducts.length>0?n("section",{staticClass:"section not-found-view__featured"},[n("div",{staticClass:"container not-found-view__featured-container"},[n("h2",{staticClass:"not-found-view__section-hl not-found-view__featured-hl"},[t._v(t._s(t.$t("cart.title.like")))]),t._v(" "),n("v-slider",{staticClass:"not-found-view__featured-slider",attrs:{name:"404-featured",options:t.sliderOptions}},t._l(t.featuredProducts,(function(e){return n("catalog-product-card",{key:e.id,staticClass:"swiper-slide not-found-view__featured-card",attrs:{"offer-id":e.id,"product-id":e.productId,type:e.type,name:e.name,href:"/catalog/"+e.categoryCodes[e.categoryCodes.length-1]+"/"+e.code,image:e.image,price:e.price,"old-price":e.oldPrice,tags:e.tags,rating:e.rating,"show-buy-btn":e.stock.qty>0},on:{"add-item":function(n){return t.onAddToCart(e)},preview:function(n){return t.onPreview(e.code)},"toggle-favorite-item":function(n){return t.onToggleFavorite(e)}}})})),1)],1)]):t._e()])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"not-found-view__main-info"},[e("p",[this._v("Если у вас возникли вопросы, обратитесь в службу поддержки:")]),this._v(" "),e("p",[e("a",{staticClass:"text-bold",attrs:{href:"tel:88007079070"}},[this._v("8 800 707-90-70")]),this._v("\n                     (звонок бесплатный)\n                ")]),this._v("\n                Или напишите нам на почту "),e("a",{attrs:{href:"mailto:support@ibt.studio"}},[this._v("support@ibt.studio")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"section"},[e("div",{staticClass:"container"},[e("div",{attrs:{"data-retailrocket-markup-block":"5efda11c97a52833a0d006e7"}})])])}],!1,null,null,null);e.default=O.exports},ySlP:function(t,e,n){}}]);