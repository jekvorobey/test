(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{qdMr:function(t,e,n){"use strict";n.r(e);var r=n("NDiG"),a=n("7cXU"),o=n("i2Ud"),i=n("jYNS"),s=n("kO0/"),c=n("+gqB"),l=n("nurM"),u=n("PZpB"),p=n("6AGh"),v=n("iFKA"),d=n("sEfC"),f=n.n(d),h=n("L2JU"),b=n("YPqg"),g=n("rBTT"),w=n("bjym"),_=n("//bM"),m=n("CkK0"),y=n("55Sm"),C=n("jDKC"),k=n("3eXy"),O=n("2JJK"),S=n("4mC1"),j=n("QmAe"),A=(n("48TQ"),n("aXGN")),P=n("W6hq"),$=(n("2+mq"),n("L52N"),n("4BeY")),L=n.n($),M=n("IaFt"),q=n.n(M),x=new L.a({id:"icon-download",use:"icon-download-usage",viewBox:"0 0 16 16",content:'<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="icon-download">\r\n    <path d="M4.19526 7.13808C3.93491 6.87773 3.93491 6.45562 4.19526 6.19527C4.45561 5.93492 4.87772 5.93492 5.13807 6.19527L7.33333 8.39053L7.33333 2.00001C7.33333 1.63182 7.63181 1.33334 8 1.33334C8.36819 1.33334 8.66667 1.63182 8.66667 2.00001L8.66667 8.39053L10.8619 6.19527C11.1223 5.93492 11.5444 5.93492 11.8047 6.19527C12.0651 6.45562 12.0651 6.87773 11.8047 7.13808L8.4714 10.4714C8.21105 10.7318 7.78894 10.7318 7.52859 10.4714L4.19526 7.13808Z" />\r\n    <path d="M3.33333 11.3333C3.33333 10.9652 3.03486 10.6667 2.66667 10.6667C2.29848 10.6667 2 10.9652 2 11.3333L2 14C2 14.3682 2.29848 14.6667 2.66667 14.6667L13.3333 14.6667C13.7015 14.6667 14 14.3682 14 14V11.3333C14 10.9652 13.7015 10.6667 13.3333 10.6667C12.9651 10.6667 12.6667 10.9652 12.6667 11.3333V13.3333L3.33333 13.3333L3.33333 11.3333Z" />\r\n</symbol>'});q.a.add(x),n("Mii2"),n("ZTSR"),n("uRg5");function T(t,e,n,r,a,o,i){try{var s=t[o](i),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,a)}function N(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return E(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return E(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return i=t.done,t},e:function(t){s=!0,o=t},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw o}}}}function E(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function R(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function G(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?R(Object(n),!0).forEach((function(e){z(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function z(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var I="".concat(g.NAME,"/").concat(w.d),B={name:"seo",components:{VSvg:r.a,VLink:a.a,VButton:o.a,VHtml:s.a,VPicture:i.a,VPagination:c.a,RadioSwitch:l.a,InfoPanel:u.a,ShowMoreButton:p.a,GalleryModal:v.a},data:function(){var t=[{value:1,title:"Действующие"},{value:0,title:"Архив"}];return{selectedActiveStatus:t[0].value,activeStatus:t,showMore:!1}},computed:G(G(G(G(G({},Object(h.d)(I,[w.c,w.a,w.b])),Object(h.c)(I,[_.a])),Object(h.d)(b.c,z({},b.d,(function(t){return t[b.g]&&t[b.g][b.d]||null})))),Object(h.d)(y.b,{isGalleryOpen:function(t){return t[y.a][O.modalName.product.GALLERY]&&t[y.a][O.modalName.product.GALLERY].open}})),{},{seoProducts:function(){var t=this[w.c]||[],e=this[b.d];return t.map((function(t){return G(G({},t),{},{link:Object(P.c)(t.category_code,t.product_code,e),files:t.files.map((function(t){return Object(P.i)(t)}))})}))},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16}}),watch:{selectedActiveStatus:function(t){this.$router.replace({path:this.$route.path,query:G(G({},this.$route.query),{},{isActive:t})})}},methods:G(G(G({},Object(h.b)(I,[m.a,m.b])),Object(h.b)(y.b,[C.a])),{},{setStatus:function(t){this.selectedActiveStatus=Number(t)},onOpenGallery:function(t){this[m.b](t),this[C.a]({name:O.modalName.product.GALLERY,open:!0})},onDownloadFiles:function(t){if(Array.isArray(t)){var e,n=N(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;Object(j.b)(Object(A.c)(null,null,r.id))}}catch(t){n.e(t)}finally{n.f()}}},onCopyToClipboard:function(t,e){var n=Object(j.i)(e)?"Успешно скопировано":"Не удается скопировать";this[C.a]({name:O.modalName.general.NOTIFICATION,open:!0,state:{message:n}}),t.target.focus()},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:G(G({},this.$route.query),{},{page:this[w.a]+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:G(G({},this.$route.query),{},{page:t})})},fetchProducts:function(t,e,n){var r,a=this;return(r=regeneratorRuntime.mark((function e(){var r,o,i,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=t.query,o=r.page,i=r.isActive,s=t.query.page,a.$progress.start(),e.next=6,a[m.a]({page:o,isActive:i,showMore:n});case 6:a.$progress.finish(),n||o===s||window.scrollTo({top:S.d+1,behavior:"smooth"}),n&&setTimeout((function(){return a.showMore=!1}),200),e.next=17;break;case 11:if(e.prev=11,e.t0=e.catch(0),!e.t0||!0!==e.t0.isCancel){e.next=15;break}return e.abrupt("return");case 15:console.log(e.t0.message),a.$progress.fail();case 17:case"end":return e.stop()}}),e,null,[[0,11]])})),function(){var t=this,e=arguments;return new Promise((function(n,a){var o=r.apply(t,e);function i(t){T(o,n,a,i,s,"next",t)}function s(t){T(o,n,a,i,s,"throw",t)}i(void 0)}))})()}}),beforeRouteEnter:function(t,e,n){var r=t.fullPath,a=t.query,o=a.isActive,i=void 0===o?1:o,s=a.page,c=void 0===s?1:s;k.$store.state[g.NAME][w.d].loadPath===r?n((function(t){return t.setStatus(i)})):k.$store.dispatch("".concat(I,"/").concat(m.a),{page:c,isActive:i}).then((function(){k.$store.dispatch("".concat(I,"/").concat(m.c),r),n((function(t){return t.setStatus(i)}))})).catch((function(t){k.$progress.fail(),n()}))},beforeRouteUpdate:function(t,e,n){var r=t.query,a=r.page,o=r.isActive,i=e.query,s=i.page,c=i.isActive;a===s&&o==c?n():(this.debounce_fetchProducts(t,e,this.showMore),n())},beforeMount:function(){this.debounce_fetchProducts=f()(this.fetchProducts,500)}},D=n("KHd+"),V=Object(D.a)(B,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section seo-view"},[n("div",{staticClass:"container container--tablet-lg seo-view__header"},[n("h2",{staticClass:"seo-view__hl"},[t._v(t._s(t.$t("profile.routes."+t.$route.name)))]),t._v(" "),n("radio-switch",{staticClass:"seo-view__switch",attrs:{items:t.activeStatus,id:"seo-switch","key-field":"value",name:"activeStatus"},model:{value:t.selectedActiveStatus,callback:function(e){t.selectedActiveStatus=e},expression:"selectedActiveStatus"}})],1),t._v(" "),t._l(t.seoProducts,(function(e){return n("info-panel",{key:e.id,staticClass:"seo-view__panel",attrs:{header:e.product_name},scopedSlots:t._u([{key:"controls",fn:function(){return[n("div",{staticClass:"seo-view__panel-links"},[e.files&&e.files.length>0?n("v-link",{staticClass:"seo-view__panel-link",attrs:{tag:"button"},on:{click:function(n){return t.onDownloadFiles(e.files)}}},[n("v-svg",{attrs:{name:"download",width:t.iconSize,height:t.iconSize}}),t._v(" "),n("span",[t._v("  Скачать всё")])],1):t._e(),t._v(" "),n("v-link",{staticClass:"seo-view__panel-link",attrs:{tag:"button"},on:{click:function(n){return t.onCopyToClipboard(n,e.description)}}},[n("v-svg",{attrs:{name:"copy",width:t.iconSize,height:t.iconSize}}),t._v(" "),n("span",[t._v("  Скопировать текст")])],1),t._v(" "),n("v-link",{staticClass:"seo-view__panel-link",attrs:{tag:"button"},on:{click:function(n){return t.onCopyToClipboard(n,e.link)}}},[n("v-svg",{attrs:{name:"link",width:t.iconSize,height:t.iconSize}}),t._v(" "),n("span",[t._v("  Скопировать ссылку")])],1)],1)]},proxy:!0}],null,!0)},[t._v(" "),n("div",{staticClass:"container container--tablet-lg"},[n("div",{staticClass:"seo-view__panel-referal"},[n("span",{staticClass:"text-bold seo-view__panel-referal-text"},[t._v("Ссылка")]),t._v(" "),n("a",{staticClass:"seo-view__panel-referal-link",attrs:{href:e.link}},[t._v("\n                    "+t._s(e.link)+"\n                ")])]),t._v(" "),n("p",{staticClass:"seo-view__panel-content"},[t._v("\n                "+t._s(e.description)+"\n            ")]),t._v(" "),e.files&&e.files.length>0?n("ul",{staticClass:"seo-view__panel-list",on:{click:function(n){return t.onOpenGallery(e.files)}}},t._l(e.files,(function(e){return n("li",{key:e.id,staticClass:"seo-view__panel-item"},[n("v-picture",[n("source",{attrs:{"data-srcset":e.desktop.webp,type:"image/webp"}}),t._v(" "),n("source",{attrs:{"data-srcset":e.desktop.orig}}),t._v(" "),n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.default,alt:""}})])],1)})),0):t._e(),t._v(" "),n("div",{staticClass:"text-bold seo-view__panel-share"},[t._v("\n                Поделиться\n                "),n("social-sharing",{attrs:{url:e.link,title:e.product_name,description:e.description},inlineTemplate:{render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{style:{display:"flex"}},[e("network",{staticClass:"network",attrs:{network:"vk"}},[e("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}})],1),this._v(" "),e("network",{staticClass:"network",attrs:{network:"facebook"}},[e("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}})],1)],1)},staticRenderFns:[]}})],1)])])})),t._v(" "),t.pagesCount>1?n("div",{staticClass:"container container--tablet-lg seo-view__controls"},[t.activePage<t.pagesCount?n("show-more-button",{attrs:{"btn-class":"btn--outline seo-view__controls-btn","show-preloader":t.showMore},on:{click:t.onShowMore}},[t._v("\n            Показать ещё\n        ")]):t._e(),t._v(" "),n("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e(),t._v(" "),n("transition",{attrs:{name:"fade-in"}},[t.$isServer||t.isGalleryOpen&&!t.isTabletLg?n("gallery-modal",{attrs:{images:t.galleryImages},scopedSlots:t._u([{key:"image",fn:function(e){var r=e.image;return[n("source",{attrs:{"data-srcset":r.desktop.webp,type:"image/webp"}}),t._v(" "),n("source",{attrs:{"data-srcset":r.desktop.orig}}),t._v(" "),n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":r.default,alt:""}})]}}],null,!1,3331325239)}):t._e()],1)],2)}),[],!1,null,null,null);e.default=V.exports},uRg5:function(t,e,n){}}]);