(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{qdMr:function(t,e,n){"use strict";n.r(e);var a=n("NDiG"),i=n("7cXU"),o=n("i2Ud"),s=n("jYNS"),r=n("kO0/"),c=n("+gqB"),u=n("nurM"),l=n("PZpB"),v=n("sEfC"),p=n.n(v),d=n("L2JU"),h=n("YPqg"),f=n("rBTT"),b=n("bjym"),_=n("//bM"),g=n("CkK0"),w=n("3eXy"),m=n("2JJK"),C=n("4mC1"),y=(n("48TQ"),n("aXGN")),k=n("W6hq"),P=(n("2+mq"),n("L52N"),n("4BeY")),O=n.n(P),S=n("IaFt"),j=n.n(S),$=new O.a({id:"icon-download",use:"icon-download-usage",viewBox:"0 0 16 16",content:'<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="icon-download">\r\n    <path d="M4.19526 7.13808C3.93491 6.87773 3.93491 6.45562 4.19526 6.19527C4.45561 5.93492 4.87772 5.93492 5.13807 6.19527L7.33333 8.39053L7.33333 2.00001C7.33333 1.63182 7.63181 1.33334 8 1.33334C8.36819 1.33334 8.66667 1.63182 8.66667 2.00001L8.66667 8.39053L10.8619 6.19527C11.1223 5.93492 11.5444 5.93492 11.8047 6.19527C12.0651 6.45562 12.0651 6.87773 11.8047 7.13808L8.4714 10.4714C8.21105 10.7318 7.78894 10.7318 7.52859 10.4714L4.19526 7.13808Z" />\r\n    <path d="M3.33333 11.3333C3.33333 10.9652 3.03486 10.6667 2.66667 10.6667C2.29848 10.6667 2 10.9652 2 11.3333L2 14C2 14.3682 2.29848 14.6667 2.66667 14.6667L13.3333 14.6667C13.7015 14.6667 14 14.3682 14 14V11.3333C14 10.9652 13.7015 10.6667 13.3333 10.6667C12.9651 10.6667 12.6667 10.9652 12.6667 11.3333V13.3333L3.33333 13.3333L3.33333 11.3333Z" />\r\n</symbol>'}),q=(j.a.add($),n("Mii2"),n("ZTSR"),n("uRg5"),n("QmAe"));function M(t,e,n,a,i,o,s){try{var r=t[o](s),c=r.value}catch(t){return void n(t)}r.done?e(c):Promise.resolve(c).then(a,i)}function x(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function A(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?x(Object(n),!0).forEach((function(e){L(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function L(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var T="".concat(f.b,"/").concat(b.c),B={name:"seo",components:{VSvg:a.a,VLink:i.a,VButton:o.a,VHtml:r.a,VPicture:s.a,VPagination:c.a,RadioSwitch:u.a,InfoPanel:l.a},data:function(){var t=[{value:1,title:"Действующие"},{value:0,title:"Архив"}];return{selectedActiveStatus:t[0].value,activeStatus:t,showMore:!1}},computed:A({},Object(d.d)(T,[b.b,b.a]),{},Object(d.c)(T,[_.a]),{},Object(d.d)(h.c,L({},h.d,(function(t){return t[h.f]&&t[h.f][h.d]||null}))),{seoProducts:function(){var t=this[b.b]||[],e=this[h.d];return t.map((function(t){return A({},t,{link:Object(k.c)(t.category_code,t.product_code,e),files:t.files.map((function(t){return{id:t.id,image:Object(y.c)(null,null,t.id,m.fileExtension.image.WEBP),defaultImage:Object(y.c)(null,null,t.id,t.sourceExt)}}))})}))},isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16}}),watch:{selectedActiveStatus:function(t){this.$router.replace({path:this.$route.path,query:A({},this.$route.query,{isActive:t})})}},methods:A({},Object(d.b)(T,[g.a]),{setStatus:function(t){this.selectedActiveStatus=Number(t)},onCopyToClipboard:function(t,e){var n=Object(q.h)(e);alert(n?"Успешно скопировано":"Не удается скопировать"),t.target.focus()},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:A({},this.$route.query,{page:this[b.a]+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:A({},this.$route.query,{page:t})})},fetchProducts:function(t,e,n){var a,i=this;return(a=regeneratorRuntime.mark((function e(){var a,o,s,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=t.query,o=a.page,s=a.isActive,r=t.query.page,i.$progress.start(),e.next=6,i[g.a]({page:o,isActive:s,showMore:n});case 6:i.$progress.finish(),n||o===r||window.scrollTo({top:C.c+1,behavior:"smooth"}),n&&setTimeout((function(){return i.showMore=!1}),200),e.next=17;break;case 11:if(e.prev=11,e.t0=e.catch(0),!e.t0||!0!==e.t0.isCancel){e.next=15;break}return e.abrupt("return");case 15:console.log(e.t0.message),i.$progress.fail();case 17:case"end":return e.stop()}}),e,null,[[0,11]])})),function(){var t=this,e=arguments;return new Promise((function(n,i){var o=a.apply(t,e);function s(t){M(o,n,i,s,r,"next",t)}function r(t){M(o,n,i,s,r,"throw",t)}s(void 0)}))})()}}),beforeRouteEnter:function(t,e,n){var a=t.fullPath,i=t.query,o=i.isActive,s=void 0===o?1:o,r=i.page,c=void 0===r?1:r;w.$store.state[f.b][b.c].loadPath===a?n((function(t){return t.setStatus(s)})):w.$store.dispatch("".concat(T,"/").concat(g.a),{page:c,isActive:s}).then((function(){w.$store.dispatch("".concat(T,"/").concat(g.b),a),n((function(t){return t.setStatus(s)}))})).catch((function(t){$progress.fail(),n()}))},beforeRouteUpdate:function(t,e,n){var a=t.query,i=a.page,o=a.isActive,s=e.query,r=s.page,c=s.isActive;i===r&&o==c?n():(this.debounce_fetchProducts(t,e,this.showMore),n())},beforeMount:function(){this.debounce_fetchProducts=p()(this.fetchProducts,500)}},E=n("KHd+"),R=Object(E.a)(B,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section seo-view"},[n("div",{staticClass:"container container--tablet-lg seo-view__header"},[n("h2",{staticClass:"seo-view__hl"},[t._v(t._s(t.$t("profile.routes."+t.$route.name)))]),t._v(" "),n("radio-switch",{staticClass:"seo-view__switch",attrs:{items:t.activeStatus,id:"seo-switch","key-field":"value",name:"activeStatus"},model:{value:t.selectedActiveStatus,callback:function(e){t.selectedActiveStatus=e},expression:"selectedActiveStatus"}})],1),t._v(" "),t._l(t.seoProducts,(function(e,a){return n("info-panel",{key:e.id,staticClass:"seo-view__panel",attrs:{header:e.product_name},scopedSlots:t._u([{key:"controls",fn:function(){return[n("div",{staticClass:"seo-view__panel-links"},[n("v-link",{staticClass:"seo-view__panel-link",attrs:{tag:"button"},on:{click:function(n){return t.onCopyToClipboard(n,e.description)}}},[n("v-svg",{attrs:{name:"copy",width:t.iconSize,height:t.iconSize}}),t._v(" "),n("span",[t._v("  Скопировать текст")])],1),t._v(" "),n("v-link",{staticClass:"seo-view__panel-link",attrs:{tag:"button"},on:{click:function(n){return t.onCopyToClipboard(n,e.link)}}},[n("v-svg",{attrs:{name:"link",width:t.iconSize,height:t.iconSize}}),t._v(" "),n("span",[t._v("  Скопировать ссылку")])],1)],1)]},proxy:!0}],null,!0)},[t._v(" "),n("div",{staticClass:"container container--tablet-lg"},[n("div",{staticClass:"seo-view__panel-referal"},[n("span",{staticClass:"text-bold seo-view__panel-referal-text"},[t._v("Ссылка")]),t._v(" "),n("a",{staticClass:"seo-view__panel-referal-link",attrs:{href:e.link}},[t._v("\n                    "+t._s(e.link)+"\n                ")])]),t._v(" "),n("v-html",{staticClass:"seo-view__panel-content",domProps:{innerHTML:t._s(e.description)}}),t._v(" "),n("ul",{staticClass:"seo-view__panel-list"},t._l(e.files,(function(e){return n("li",{key:e.id,staticClass:"seo-view__panel-item"},[n("v-picture",[n("source",{attrs:{"data-srcset":e.image,type:"image/webp"}}),t._v(" "),n("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImage,alt:""}})])],1)})),0),t._v(" "),n("div",{staticClass:"text-bold seo-view__panel-share"},[t._v("\n                Поделиться\n                "),n("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}}),t._v(" "),n("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}})],1)],1)])})),t._v(" "),t.pagesCount>1?n("div",{staticClass:"container container--tablet-lg seo-view__controls"},[t.activePage<t.pagesCount?n("v-button",{staticClass:"btn--outline seo-view__controls-btn",attrs:{disabled:t.showMore},on:{click:t.onShowMore}},[t._v("\n            Показать ещё\n        ")]):t._e(),t._v(" "),n("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e()],2)}),[],!1,null,null,null);e.default=R.exports},uRg5:function(t,e,n){}}]);