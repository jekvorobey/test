(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{qdMr:function(t,e,n){"use strict";n.r(e);var r=n("NDiG"),a=n("7cXU"),i=n("i2Ud"),o=n("jYNS"),s=n("kO0/"),c=n("+gqB"),l=n("iFKA"),u=n("nurM"),f=n("PZpB"),v=n("6AGh"),p=n("sEfC"),h=n.n(p),d=n("L2JU"),b=n("YPqg"),g=n("rBTT"),_=n("bjym"),m=n("//bM"),w=n("CkK0"),y=n("55Sm"),k=n("jDKC"),C=n("3eXy"),O=n("2JJK"),S=n("4mC1"),A=n("QmAe"),j=(n("48TQ"),n("aXGN")),$=n("W6hq"),P=n("nfjx");n("2+mq"),n("L52N"),n("X/ob"),n("Mii2"),n("ZTSR"),n("uRg5");function M(t,e,n,r,a,i,o){try{var s=t[i](o),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,a)}function q(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return T(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return T(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,o=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return o=t.done,t},e:function(t){s=!0,i=t},f:function(){try{o||null==n.return||n.return()}finally{if(s)throw i}}}}function T(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function E(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function N(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?E(Object(n),!0).forEach((function(e){x(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function x(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var L="".concat(g.NAME,"/").concat(_.d),R={name:"seo",mixins:[P.a],components:{VSvg:r.a,VLink:a.a,VButton:i.a,VHtml:s.a,VPicture:o.a,VPagination:c.a,RadioSwitch:u.a,InfoPanel:f.a,ShowMoreButton:v.a,GalleryModal:l.a},metaInfo:function(){var t=this.pageTitle,e=this.activePage;return{title:e>1?"".concat(t," – страница ").concat(e):t}},data:function(){var t=[{value:1,title:"Действующие"},{value:0,title:"Архив"}];return{selectedActiveStatus:t[0].value,activeStatus:t,showMore:!1}},computed:N(N(N(N(N({},Object(d.d)(L,[_.c,_.a,_.b])),Object(d.c)(L,[m.a])),Object(d.d)(b.c,x({},b.d,(function(t){return t[b.h]&&t[b.h][b.d]||null})))),Object(d.d)(y.b,{isGalleryOpen:function(t){return t[y.a][O.modalName.product.GALLERY]&&t[y.a][O.modalName.product.GALLERY].open}})),{},{seoProducts:function(){var t=this[_.c]||[],e=this[b.d];return t.map((function(t){return N(N({},t),{},{link:Object($.f)(t.category_code,t.product_code,e),files:t.files.map((function(t){return Object($.r)(t)}))})}))},pageTitle:function(){return this.$t("profile.routes.".concat(this.$route.name))},iconSize:function(){return this.$mq.tablet?24:16},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:{selectedActiveStatus:function(t){this.$router.replace({path:this.$route.path,query:N(N({},this.$route.query),{},{isActive:t})})}},methods:N(N(N({},Object(d.b)(L,[w.a,w.b])),Object(d.b)(y.b,[k.a])),{},{setStatus:function(t){this.selectedActiveStatus=Number(t)},onOpenGallery:function(t){this[w.b](t),this[k.a]({name:O.modalName.product.GALLERY,open:!0})},onDownloadFiles:function(t){if(Array.isArray(t)){var e,n=q(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;Object(A.e)(Object(j.c)(null,null,r.id,r.sourceExt))}}catch(t){n.e(t)}finally{n.f()}}},onCopyToClipboard:function(t,e){var n=Object(A.o)(e)?"Успешно скопировано":"Не удается скопировать";this[k.a]({name:O.modalName.general.NOTIFICATION,open:!0,state:{message:n}}),t.target.focus()},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:N(N({},this.$route.query),{},{page:this[_.a]+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:N(N({},this.$route.query),{},{page:t>S.b?t:void 0})})},fetchProducts:function(t,e,n){var r,a=this;return(r=regeneratorRuntime.mark((function e(){var r,i,o,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=t.query,i=r.page,o=r.isActive,s=t.query.page,a.$progress.start(),e.next=6,a[w.a]({page:i,isActive:o,showMore:n});case 6:a.$progress.finish(),n||i===s||window.scrollTo({top:S.e+1,behavior:"smooth"}),n&&setTimeout((function(){return a.showMore=!1}),200),e.next=16;break;case 11:if(e.prev=11,e.t0=e.catch(0),!e.t0||!0!==e.t0.isCancel){e.next=15;break}return e.abrupt("return");case 15:a.$progress.fail();case 16:case"end":return e.stop()}}),e,null,[[0,11]])})),function(){var t=this,e=arguments;return new Promise((function(n,a){var i=r.apply(t,e);function o(t){M(i,n,a,o,s,"next",t)}function s(t){M(i,n,a,o,s,"throw",t)}o(void 0)}))})()}}),beforeRouteEnter:function(t,e,n){var r=t.fullPath,a=t.query,i=a.isActive,o=void 0===i?1:i,s=a.page,c=void 0===s?S.b:s;function l(){C.$store.state[g.NAME]&&C.$store.state[g.NAME][_.d]&&(C.$store.state[g.NAME][_.d].loadPath===r?n((function(t){return t.setStatus(o)})):C.$store.dispatch("".concat(L,"/").concat(w.a),{page:c,isActive:o}).then((function(){C.$store.dispatch("".concat(L,"/").concat(w.c),r),n((function(t){return t.setStatus(o)}))})).catch((function(t){C.$progress.fail(),n()})))}C.$store.state[g.NAME]&&C.$store.state[g.NAME][_.d]?l():C.$store.watch((function(t){return t[g.NAME][_.d]}),(function(t){t&&l()}))},beforeRouteUpdate:function(t,e,n){var r=t.query,a=r.page,i=r.isActive,o=e.query,s=o.page,c=o.isActive;a===s&&i==c||this.debounce_fetchProducts(t,e,this.showMore),n()},beforeMount:function(){this.debounce_fetchProducts=h()(this.fetchProducts,500)}},G=n("KHd+"),z=Object(G.a)(R,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section seo-view"},[n("div",{staticClass:"container container--tablet-lg seo-view__header"},[n("h2",{staticClass:"seo-view__hl"},[t._v("\n            "+t._s(t.pageTitle)+"\n        ")]),t._v(" "),n("radio-switch",{staticClass:"seo-view__switch",attrs:{items:t.activeStatus,id:"seo-switch","key-field":"value",name:"activeStatus"},model:{value:t.selectedActiveStatus,callback:function(e){t.selectedActiveStatus=e},expression:"selectedActiveStatus"}})],1),t._v(" "),t._l(t.seoProducts,(function(e){return n("info-panel",{key:e.id,staticClass:"seo-view__panel",attrs:{header:e.product_name},scopedSlots:t._u([{key:"controls",fn:function(){return[n("div",{staticClass:"seo-view__panel-links"},[e.files&&e.files.length>0?n("v-link",{staticClass:"seo-view__panel-link",attrs:{tag:"button"},on:{click:function(n){return t.onDownloadFiles(e.files)}}},[n("v-svg",{attrs:{name:"download",width:t.iconSize,height:t.iconSize}}),t._v(" "),n("span",[t._v("  Скачать всё")])],1):t._e(),t._v(" "),n("v-link",{staticClass:"seo-view__panel-link",attrs:{tag:"button"},on:{click:function(n){return t.onCopyToClipboard(n,e.description)}}},[n("v-svg",{attrs:{name:"copy",width:t.iconSize,height:t.iconSize}}),t._v(" "),n("span",[t._v("  Скопировать текст")])],1),t._v(" "),n("v-link",{staticClass:"seo-view__panel-link",attrs:{tag:"button"},on:{click:function(n){return t.onCopyToClipboard(n,e.link)}}},[n("v-svg",{attrs:{name:"link",width:t.iconSize,height:t.iconSize}}),t._v(" "),n("span",[t._v("  Скопировать ссылку")])],1)],1)]},proxy:!0}],null,!0)},[t._v(" "),n("div",{staticClass:"container container--tablet-lg"},[n("div",{staticClass:"seo-view__panel-referal"},[n("span",{staticClass:"text-bold seo-view__panel-referal-text"},[t._v("Ссылка")]),t._v(" "),n("a",{staticClass:"seo-view__panel-referal-link",attrs:{href:e.link}},[t._v("\n                    "+t._s(e.link)+"\n                ")])]),t._v(" "),n("p",{staticClass:"seo-view__panel-content"},[t._v("\n                "+t._s(e.description)+"\n            ")]),t._v(" "),e.files&&e.files.length>0?n("ul",{staticClass:"seo-view__panel-list",on:{click:function(n){return t.onOpenGallery(e.files)}}},t._l(e.files,(function(t){return n("li",{key:t.id,staticClass:"seo-view__panel-item"},[n("v-picture",[n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.default,alt:""}})])],1)})),0):t._e(),t._v(" "),n("div",{staticClass:"text-bold seo-view__panel-share"},[t._v("\n                Поделиться\n                "),n("social-sharing",{attrs:{url:e.link,title:e.product_name,description:e.description},inlineTemplate:{render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{style:{display:"flex"}},[e("network",{staticClass:"network",attrs:{network:"vk"}},[e("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}})],1),this._v(" "),e("network",{staticClass:"network",attrs:{network:"facebook"}},[e("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}})],1)],1)},staticRenderFns:[]}})],1)])])})),t._v(" "),t.pagesCount>1?n("div",{staticClass:"container container--tablet-lg seo-view__controls"},[t.activePage<t.pagesCount?n("show-more-button",{attrs:{"btn-class":"btn--outline seo-view__controls-btn","show-preloader":t.showMore},on:{click:t.onShowMore}},[t._v("\n            Показать ещё\n        ")]):t._e(),t._v(" "),n("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e(),t._v(" "),n("transition",{attrs:{name:"fade-in"}},[t.$isServer||t.isGalleryOpen&&!t.isTabletLg?n("gallery-modal",{attrs:{images:t.galleryImages},scopedSlots:t._u([{key:"image",fn:function(t){var e=t.image;return[n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.default,alt:""}})]}}],null,!1,885551202)}):t._e()],1)],2)}),[],!1,null,null,null);e.default=z.exports},uRg5:function(t,e,n){}}]);