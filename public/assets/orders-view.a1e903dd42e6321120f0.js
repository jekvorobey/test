(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{"6JD8":function(t,e,r){},"9KOc":function(t,e,r){"use strict";r.r(e);var s=r("NDiG"),a=r("7cXU"),i=r("i2Ud"),n=r("pFko"),o=r("ze5i"),l=r("+gqB"),c=r("WYKX"),d=r("2/Mz"),v=r("KLyl"),u=r("YNzt"),_=r("45Ux"),f=r("6AGh"),p=r("3eXy"),h=r("L2JU"),m=r("Q2AE"),w=r("rBTT"),b=r("JM0x"),C=r("55Sm"),g=r("jDKC"),y=r("YPqg"),D=r("5GyW"),k=r("pAo5"),O=r("4kxs"),x=r("QmAe"),E=r("P1RU"),M=r("DpYB"),$=r("zVjp"),S=r("2JJK"),P=r("4mC1"),A=r("nfjx");r("g0Ed"),r("2CE6"),r("VW5v"),r("6JD8");function N(t,e,r,s,a,i,n){try{var o=t[i](n),l=o.value}catch(t){return void r(t)}o.done?e(l):Promise.resolve(l).then(s,a)}function F(t){return function(){var e=this,r=arguments;return new Promise((function(s,a){var i=t.apply(e,r);function n(t){N(i,s,a,n,o,"next",t)}function o(t){N(i,s,a,n,o,"throw",t)}n(void 0)}))}}function T(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function j(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?T(Object(r),!0).forEach((function(e){R(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):T(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function R(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var B="".concat(w.NAME,"/").concat(D.d);function q(t){t[b.a]([])}var L={name:"orders",mixins:[A.a],components:{VSvg:s.a,VLink:a.a,VButton:i.a,VSelect:n.a,VPagination:l.a,VArcCounter:c.a,VSticky:o.a,modal:d.a,FilterButton:v.a,Price:u.a,InfoRow:_.a,ShowMoreButton:f.a},metaInfo:function(){var t=this.pageTitle,e=this.activePage;return{title:e>1?"".concat(t," – страница ").concat(e):t}},data:function(){return{showMore:!1,filterModal:!1,isDisabled:!1}},computed:j(j(j(j(j({},Object(h.d)([m.g,m.j])),Object(h.d)(B,[D.f,D.c,D.h,D.i,D.a,D.j])),Object(h.c)(B,[k.c,k.d,k.e,k.b,k.a])),Object(h.d)(y.c,R({},y.e,(function(t){return t[y.h]&&t[y.h][y.e]||!1})))),{},{filterCount:function(){var t=this.filters,e=this.$route.query,r=this.orderField,s=void 0===r?M.e.NUMBER:r,a=t.reduce((function(t,r){var s=r.name,a=r.items,i=e[s],n=i&&a.find((function(t){return t.code===i}));return n&&n!==a[0]&&(t+=1),t}),0);return s!==M.e.NUMBER&&(a+=1),a},filterValueMap:function(){var t=this.filters,e=this.$route.query;return t.reduce((function(t,r){var s=r.name,a=r.items,i=e[s];return t[s]=i&&a.find((function(t){return t.code===i}))||a[0],t}),{})},arcSettings:function(){return{start:-120,end:120,activeWidth:16,strokeWidth:16,stroke:"#BDBDBD",activeStroke:"#141116",dashCount:100}},pageTitle:function(){return this.$t("profile.routes.".concat(this.$route.name))},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),methods:j(j(j(j({},Object(h.b)(B,[O.a,O.f,O.d,O.e])),Object(h.b)(w.NAME,[b.a])),Object(h.b)(C.b,[g.a])),{},{formatDate:function(t){if("string"==typeof t)return new Date(t.split(" ")[0]).toLocaleDateString(this[m.g],$.b)},formatArcSum:function(t){return"".concat(Object(x.m)(t)," ₽")},shortNumberFormat:function(t){return Object(x.p)(t)},getOrderStatusClass:function(t){return Object(E.d)(t.status,t.canceled)},onContinuePayment:function(t,e){var r=this;return F(regeneratorRuntime.mark((function s(){var a,i,n;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,a=Object(E.a)(t),s.next=4,r[O.d]({orderId:t,paymentId:e,backUrl:a});case 4:i=s.sent,n=i.url,window.history.replaceState(null,"",a),document.location.href=n,s.next=13;break;case 10:s.prev=10,s.t0=s.catch(0),alert("Ошибка при переходе на оплату");case 13:case"end":return s.stop()}}),s,null,[[0,10]])})))()},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:j(j({},this.$route.query),{},{page:this[D.a]+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:j(j({},this.$route.query),{},{page:t>P.b?t:void 0})})},scrollTo:function(t){this.$isServer||window.scrollTo(t)},onChangeSort:function(t){var e=t,r=null;r=this[D.i]!==t?S.sortDirections.DESC:this[D.h]===S.sortDirections.DESC?S.sortDirections.ASC:S.sortDirections.DESC,this.$router.replace({name:"Orders",query:j(j({},this.$route.query),{},{orderField:e,orderDirection:r,page:P.b})})},onOpenOrder:function(t){this.$router.push({name:"OrderDetails",params:{orderId:t}})},onRepeatOrder:function(t){var e=this;return F(regeneratorRuntime.mark((function r(){var s,a,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(s=t.id,a=t.can_repeat,i=t.has_bad_offers,a){r.next=3;break}return r.abrupt("return",e[g.a]({name:S.modalName.general.NOTIFICATION,open:!0,state:{title:"Уведомление",message:"Невозможно повторить заказ"}}));case 3:return i&&e[g.a]({name:S.modalName.general.NOTIFICATION,open:!0,state:{title:"Уведомление",message:"Невозможно оформить заказ на некоторые выбранные товары"}}),r.prev=4,e.isDisabled=!0,r.next=8,e[O.e](s);case 8:return r.next=10,e.$router.push({name:"Cart"});case 10:e.isDisabled=!1,r.next=16;break;case 13:r.prev=13,r.t0=r.catch(4),e.isDisabled=!1;case 16:case"end":return r.stop()}}),r,null,[[4,13]])})))()},onChangeFilter:function(t,e){var r=e.code,s=j(j({},this.$route.query),{},R({},t,r));delete s.page,this.$router.replace({path:this.$route.path,query:s})}}),beforeRouteEnter:function(t,e,r){var s=t.fullPath,a=t.query,i=a.page,n=void 0===i?P.b:i,o=a.orderField,l=void 0===o?M.e.NUMBER:o,c=a.orderDirection,d=void 0===c?S.sortDirections.DESC:c;function v(){if(p.$store.state[w.NAME]&&p.$store.state[w.NAME][D.d]){var t=p.$store.state[w.NAME][D.d].loadPath,e=j(j({},a),{},{page:void 0,orderField:void 0,orderDirection:void 0});t===s?r((function(t){q(t)})):(p.$progress.start(),p.$store.dispatch("".concat(B,"/").concat(O.b),{page:n,orderField:l,orderDirection:d,filter:e}).then((function(){p.$store.dispatch("".concat(B,"/").concat(O.f),s),r((function(t){p.$progress.finish(),q(t)}))})).catch((function(t){if(t&&!0===t.isCancel)return r((function(t){return q(t)}));r((function(t){p.$progress.fail(),q(t)}))})))}}p.$store.state[w.NAME]&&p.$store.state[w.NAME][D.d]?v():p.$store.watch((function(t){return t[w.NAME][D.d]}),(function(t){t&&v()}))},beforeRouteUpdate:function(t,e,r){var s=this;return F(regeneratorRuntime.mark((function a(){var i,n,o,l,c,d,v,u,_;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return i=t.query,n=i.page,o=void 0===n?P.b:n,l=i.orderField,c=void 0===l?M.e.NUMBER:l,d=i.orderDirection,v=void 0===d?S.sortDirections.DESC:d,u=j(j({},i),{},{page:void 0,orderField:void 0,orderDirection:void 0}),_=e.query.page,a.prev=4,s[m.j]&&!s.showMore&&o!==_&&s.scrollTo({top:s.$refs.hook.offsetTop,behavior:"smooth"}),s.$progress.start(),a.next=9,s[O.a]({page:o,orderField:c,orderDirection:v,filter:u,showMore:s.showMore});case 9:s.$progress.finish(),r(),a.next=17;break;case 13:a.prev=13,a.t0=a.catch(4),s.$progress.fail(),r(!1);case 17:s.showMore=!1;case 18:case"end":return a.stop()}}),a,null,[[4,13]])})))()},beforeCreate:function(){this.sortFields=M.e,this.sortDirections=S.sortDirections,this.orderPaymentStatus=M.c}},U=r("KHd+"),I=Object(U.a)(L,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section orders-view"},[r("div",{staticClass:"container container--tablet-lg orders-view__header"},[r("h2",{staticClass:"orders-view__hl"},[t._v("\n            "+t._s(t.pageTitle)+"\n        ")]),t._v(" "),t._l(t.filters,(function(e){return r("v-select",{key:e.id,staticClass:"orders-view__filters-sort",attrs:{label:"name","track-by":"id",value:t.filterValueMap[e.name],options:e.items,searchable:!1,"allow-empty":!1,"show-labels":!1},on:{input:function(r){return t.onChangeFilter(e.name,r)}}})}))],2),t._v(" "),t.referralPartner&&t.referralData&&t.level?r("div",{staticClass:"orders-view__panels"},[r("div",{staticClass:"orders-view__panel"},[r("div",{staticClass:"orders-view__panel-item"},[r("div",{staticClass:"text-grey orders-view__panel-name"},[t._v("Ваш уровень")]),t._v(" "),r("div",{staticClass:"orders-view__panel-level"},[t._v(t._s(t.levelData.currentLevelName))])]),t._v(" "),t.levelData.nextLevelName||!t.levelData.nextLevelName&&t.isTabletLg&&!t.isTablet?r("div",{staticClass:"orders-view__panel-item",style:{visibility:t.levelData.nextLevelName?"visible":"hidden"}},[r("div",{staticClass:"text-grey orders-view__panel-name"},[t._v("Следующий уровень")]),t._v(" "),r("div",{staticClass:"text-grey orders-view__panel-level"},[t._v(t._s(t.levelData.nextLevelName))])]):t._e(),t._v(" "),r("a",{staticClass:"orders-view__panel-link"},[t._v("Подробнее о реферальной программе")])]),t._v(" "),r("div",{staticClass:"orders-view__panel",class:{"orders-view__panel--empty":!t.levelData.nextLevelName}},[t.levelData.nextLevelName?[r("div",{staticClass:"orders-view__panel-item"},[r("div",{staticClass:"orders-view__panel-item-counter"},[r("v-arc-counter",t._b({attrs:{text:t.referralArcData.current,activeCount:t.referralArcData.currentPercent}},"v-arc-counter",t.arcSettings,!1)),t._v(" "),r("div",{staticClass:"text-grey orders-view__panel-item-label"},[r("span",[t._v("0")]),t._v(" "),r("span",[t._v(t._s(t.referralArcData.next))])])],1),t._v(" "),r("div",{staticClass:"text-grey"},[t._v("Новых заказов")])]),t._v(" "),r("div",{staticClass:"orders-view__panel-item"},[r("div",{staticClass:"orders-view__panel-item-counter"},[r("v-arc-counter",t._b({attrs:{text:t.formatArcSum(t.sumArcData.current),activeCount:t.sumArcData.currentPercent}},"v-arc-counter",t.arcSettings,!1)),t._v(" "),r("div",{staticClass:"text-grey orders-view__panel-item-label"},[r("span",[t._v("0")]),t._v(" "),r("span",[t._v(t._s(t.shortNumberFormat(t.sumArcData.next)))])])],1),t._v(" "),r("div",{staticClass:"text-grey"},[t._v("Сумма моих заказов")])])]:r("div",{staticClass:"orders-view__panel-item"},[r("h2",[t._v("Поздравляем!")]),t._v("\n                Вы достигли максимального уровня!\n            ")])],2)]):t._e(),t._v(" "),r("div",{ref:"hook"}),t._v(" "),t.isTabletLg?r("div",{staticClass:"container"},[r("filter-button",{staticClass:"orders-view__filter-btn",on:{click:function(e){t.filterModal=!t.filterModal}}},[t._v("\n            Фильтр и сортировка  \n            "),r("span",{staticClass:"text-grey"},[t._v(t._s(t.filterCount))])])],1):t._e(),t._v(" "),t.orders.length>0?[t.isTabletLg?r("ul",{staticClass:"orders-view__list"},t._l(t.orders,(function(e){return r("li",{key:e.id,staticClass:"orders-view__list-item",attrs:{tabindex:"0"},on:{click:function(r){return t.onOpenOrder(e.id)}}},[r("info-row",{staticClass:"orders-view__list-item-row",attrs:{name:"Номер заказа"}},[r("div",{staticClass:"text-underline"},[t._v(t._s(e.number))]),t._v(" "),r("div",[t._v(t._s(t.$t("profile.productType."+e.type)))])]),t._v(" "),r("info-row",{staticClass:"orders-view__list-item-row",attrs:{name:"Сумма"}},[r("price",t._b({},"price",e.price,!1))],1),t._v(" "),r("info-row",{staticClass:"orders-view__list-item-row",attrs:{name:"Дата заказа",value:t.formatDate(e.created_at)}}),t._v(" "),r("info-row",{staticClass:"orders-view__list-item-row",attrs:{name:"Дата доставки",value:e.deliveryDate}}),t._v(" "),e.payment_status===t.orderPaymentStatus.NOT_PAID&&0!==e.payments.length?[r("info-row",{staticClass:"orders-view__list-item-row"},t._l(e.payments,(function(s){return r("v-button",{key:s.id,staticClass:"btn--outline",attrs:{disabled:t.isDisabled},on:{click:function(r){return r.stopPropagation(),t.onContinuePayment(e.id,s.id)}}},[t._v("\n                            Оплатить\n                        ")])})),1)]:[r("info-row",{staticClass:"orders-view__list-item-row",attrs:{name:"Cтатус"}},[t._v("\n                        "+t._s(t.$t("orderStatus."+e.status))+"\n                    ")]),t._v(" "),r("info-row",{staticClass:"orders-view__list-item-row"},[r("v-link",{attrs:{tag:"button",disabled:t.isDisabled},on:{click:function(r){return r.stopPropagation(),t.onRepeatOrder(e)}}},[t._v("\n                            Повторить\n                        ")])],1)]],2)})),0):r("table",{staticClass:"container container--tablet-lg orders-view__table"},[t._m(0),t._v(" "),r("thead",{staticClass:"orders-view__table-head"},[r("tr",{staticClass:"orders-view__table-tr orders-view__table-tr--header"},[r("th",{staticClass:"orders-view__table-th"},[r("v-link",{staticClass:"orders-view__table-th-link",attrs:{tag:"button"},on:{click:function(e){return t.onChangeSort(t.sortFields.NUMBER)}}},[t._v("\n                            Номер заказа \n                            "),t.orderField!==t.sortFields.NUMBER?r("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}}):t.orderDirection===t.sortDirections.DESC?r("v-svg",{attrs:{name:"arrow-down",width:"16",height:"16"}}):r("v-svg",{staticClass:"icon--rotate-deg180",attrs:{name:"arrow-down",width:"16",height:"16"}})],1)],1),t._v(" "),r("th",{staticClass:"orders-view__table-th"},[r("v-link",{staticClass:"orders-view__table-th-link",attrs:{tag:"button"},on:{click:function(e){return t.onChangeSort(t.sortFields.CREATED_AT)}}},[t._v("\n                            Дата заказа \n                            "),t.orderField!==t.sortFields.CREATED_AT?r("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}}):t.orderDirection===t.sortDirections.DESC?r("v-svg",{attrs:{name:"arrow-down",width:"16",height:"16"}}):r("v-svg",{staticClass:"icon--rotate-deg180",attrs:{name:"arrow-down",width:"16",height:"16"}})],1)],1),t._v(" "),r("th",{staticClass:"orders-view__table-th"},[t._v("Сумма")]),t._v(" "),r("th",{staticClass:"orders-view__table-th"},[t._v("Статус заказа")]),t._v(" "),r("th",{staticClass:"orders-view__table-th"})])]),t._v(" "),r("tbody",{staticClass:"orders-view__table-body"},t._l(t.orders,(function(e){return r("tr",{key:e.id,staticClass:"orders-view__table-tr",on:{click:function(r){return t.onOpenOrder(e.id)}}},[r("td",{staticClass:"orders-view__table-td"},[r("div",{staticClass:"text-underline"},[t._v(t._s(e.number))]),t._v(" "),r("div",[t._v(t._s(t.$t("profile.productType."+e.type)))])]),t._v(" "),r("td",{staticClass:"orders-view__table-td"},[t._v(t._s(t.formatDate(e.created_at)))]),t._v(" "),r("td",{staticClass:"orders-view__table-td"},[r("price",t._b({},"price",e.price,!1))],1),t._v(" "),r("td",{staticClass:"orders-view__table-td"},[e.payment_status===t.orderPaymentStatus.NOT_PAID&&0!==e.payments.length?t._l(e.payments,(function(s){return r("v-button",{key:s.id,staticClass:"btn--outline",attrs:{disabled:t.isDisabled},on:{click:function(r){return r.stopPropagation(),t.onContinuePayment(e.id,s.id)}}},[t._v("\n                                Оплатить\n                            ")])})):r("span",{class:t.getOrderStatusClass(e)},[t._v("\n                            "+t._s(t.$t("orderStatus."+e.status))+"\n                        ")])],2),t._v(" "),r("td",{staticClass:"orders-view__table-td"},["created"===e.status?r("v-link",{staticClass:"orders-view__table-td-link",attrs:{tag:"button",disabled:t.isDisabled},on:{click:function(t){t.stopPropagation()}}},[t._v("\n                            Отменить\n                        ")]):r("v-link",{staticClass:"orders-view__table-td-link",attrs:{tag:"button",disabled:t.isDisabled},on:{click:function(r){return r.stopPropagation(),t.onRepeatOrder(e)}}},[t._v("\n                            Повторить\n                        ")])],1)])})),0)]),t._v(" "),t.pagesCount>1?r("div",{staticClass:"container container--tablet-lg orders-view__controls"},[t.activePage<t.pagesCount?r("show-more-button",{attrs:{"btn-class":"btn--outline orders-view__controls-btn","show-preloader":t.showMore},on:{click:function(e){return e.preventDefault(),t.onShowMore(e)}}},[t._v("\n                Показать ещё\n            ")]):t._e(),t._v(" "),r("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e()]:r("div",{staticClass:"container container--tablet-lg orders-view__empty-container"},[r("v-svg",{attrs:{name:"alert",width:"24",height:"24"}}),t._v(" "),r("span",{staticClass:"orders-view__empty-text"},[t._v("У вас еще нет заказов")]),t._v(" "),r("v-button",{staticClass:"btn--outline",attrs:{to:"/catalog"}},[t._v("перейти к покупкам")])],1),t._v(" "),r("transition",{attrs:{name:"fade-in"}},[t.filterModal&&t.isTabletLg?r("modal",{staticClass:"orders-view__modal-filter",attrs:{"show-close-btn":!1,type:"fullscreen"},scopedSlots:t._u([{key:"body",fn:function(){return[r("v-sticky",{staticClass:"orders-view__modal-filter-sticky",scopedSlots:t._u([{key:"sticky",fn:function(){return[r("div",{staticClass:"orders-view__modal-filter-header"},[r("button",{staticClass:"orders-view__modal-filter-header-btn",on:{click:function(e){t.filterModal=!1}}},[r("v-svg",{attrs:{name:"cross-small",width:"14",height:"14"}}),t._v("Фильтр\n                            ")],1)])]},proxy:!0}],null,!1,1861583049)},[t._v(" "),r("div",{staticClass:"orders-view__modal-filter-sort"},[r("div",{staticClass:"container container--tablet-lg orders-view__modal-filter-sort-title"},[t._v("\n                            Сортировка\n                        ")]),t._v(" "),t._l(t.filters,(function(e){return r("ul",{key:e.name,staticClass:"orders-view__modal-filter-sort-list"},t._l(e.items,(function(s){return r("li",{key:s.name,staticClass:"orders-view__modal-filter-sort-item",class:{"orders-view__modal-filter-sort-item--active":s===t.filterValueMap[e.name]}},[r("button",{staticClass:"orders-view__modal-filter-sort-item-btn",attrs:{disabled:s===t.filterValueMap[e.name]},on:{click:function(r){return t.onChangeFilter(e.name,s)}}},[t._v("\n                                    "+t._s(s.name)+"\n                                ")])])})),0)})),t._v(" "),r("ul",{staticClass:"orders-view__modal-filter-sort-list"},[r("li",{staticClass:"orders-view__modal-filter-sort-item",class:{"orders-view__modal-filter-sort-item--active":t.orderField===t.sortFields.NUMBER}},[r("button",{staticClass:"orders-view__modal-filter-sort-item-btn",attrs:{disabled:t.orderField===t.sortFields.NUMBER},on:{click:function(e){return t.onChangeSort(t.sortFields.NUMBER)}}},[t._v("\n                                    Номер заказа\n                                ")])]),t._v(" "),r("li",{staticClass:"orders-view__modal-filter-sort-item",class:{"orders-view__modal-filter-sort-item--active":t.orderField===t.sortFields.CREATED_AT}},[r("button",{staticClass:"orders-view__modal-filter-sort-item-btn",attrs:{disabled:t.orderField===t.sortFields.CREATED_AT},on:{click:function(e){return t.onChangeSort(t.sortFields.CREATED_AT)}}},[t._v("\n                                    Дата заказа\n                                ")])])])],2),t._v(" "),r("div",{staticClass:"orders-view__modal-filter-controls"},[r("v-button",{staticClass:"orders-view__modal-filter-close-btn",on:{click:function(e){t.filterModal=!t.filterModal}}},[t._v("\n                            Показать\n                        ")])],1)])]},proxy:!0}],null,!1,2057824151)}):t._e()],1)],2)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("colgroup",[e("col",{attrs:{width:"15%"}}),this._v(" "),e("col",{attrs:{width:"20%"}}),this._v(" "),e("col",{attrs:{width:"20%"}}),this._v(" "),e("col",{attrs:{width:"20%"}}),this._v(" "),e("col",{attrs:{width:"15%"}})])}],!1,null,null,null);e.default=I.exports}}]);