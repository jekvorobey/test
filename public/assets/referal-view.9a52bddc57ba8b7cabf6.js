(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{pt7z:function(e,t,r){"use strict";r.r(t);var a=r("NDiG"),i=r("i2Ud"),s=r("jYNS"),l=r("+gqB"),n=r("WYKX"),o=r("7cXU"),c=r("pFko"),_=r("a6oV"),v=r("YNzt"),d=r("45Ux"),u=r("KLyl"),f=r("6AGh"),m=r("Z14j"),p=r("uy7R"),h=(r("obii"),r("zfPd"),r("L2JU")),w=r("Q2AE"),g=r("rBTT"),b=r("sJxq"),C=r("iggl"),y=r("AoUT"),O=r("YPqg"),D=r("55Sm"),F=r("jDKC"),S=r("2JJK"),k=r("q5Zp"),M=r("DpYB"),P=r("4mC1"),$=r("GyY8"),j=r("zVjp"),A=r("QmAe"),V=r("aXGN"),x=r("v6zc"),N=r("P1RU"),E=r("3eXy");r("gB8C"),r("/MYE"),r("yXCv");function q(e,t,r,a,i,s,l){try{var n=e[s](l),o=n.value}catch(e){return void r(e)}n.done?t(o):Promise.resolve(o).then(a,i)}function T(e){return function(){var t=this,r=arguments;return new Promise((function(a,i){var s=e.apply(t,r);function l(e){q(s,a,i,l,n,"next",e)}function n(e){q(s,a,i,l,n,"throw",e)}l(void 0)}))}}function I(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function R(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?I(Object(r),!0).forEach((function(t){L(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):I(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function L(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var U="".concat(g.NAME,"/").concat(b.c),B={name:"referal",components:{VSvg:a.a,VButton:i.a,VPicture:s.a,VPagination:l.a,VLink:o.a,VSelect:c.a,VArcCounter:n.a,VChart:function(){return Promise.all([r.e(100),r.e(95)]).then(r.bind(null,"OtNm"))},GeneralModal:_.a,Price:v.a,InfoRow:d.a,FilterButton:u.a,ShowMoreButton:f.a,AttentionPanel:m.a,MessageModal:p.a},data:function(){var e=[{id:1,title:"Все время",field:M.b.ALL_TIME},{id:2,title:"За год",field:M.b.YEAR},{id:3,title:"За месяц",field:M.b.MONTH},{id:4,title:"За день",field:M.b.DAY}],t=[{id:1,title:"Товар",field:k.g.NAME},{id:2,title:"Количество",field:k.g.QTY},{id:3,title:"ID реферала",field:k.g.CUSTOMER_ID},{id:4,title:"Источник",field:k.g.SOURCE},{id:5,title:"Дата заказа",field:k.g.ORDER_DATE},{id:6,title:"Сумма",field:k.g.PRICE_PRODUCT},{id:7,title:"Сумма вознаграждения",field:k.g.PRICE_COMMISSION}];return{orderFilterValue:e[0],orderFilterOptions:e,sortFields:t,sortValue:t[0],sortDirection:S.sortDirections.ASC,isMounted:!1,showMore:!1,filterModal:!1,chartOptions:R({},j.a)}},computed:R(R(R(R(R(R({},Object(h.d)([w.g])),Object(h.d)(U,[b.b,b.a,b.d])),Object(h.d)(O.c,L({},O.d,(function(e){return e[O.g]&&e[O.g][O.d]||!1})))),Object(h.d)(D.b,{isMessageOpen:function(e){return e[D.a][S.modalName.profile.MESSAGE]&&e[D.a][S.modalName.profile.MESSAGE].open}})),Object(h.c)(U,[y.e,y.f,y.b,y.c,y.d,y.a])),{},{arcSettings:function(){return{start:-120,end:120,activeWidth:16,strokeWidth:16,stroke:"#BDBDBD",activeStroke:"#141116",dashCount:100}},series:function(){return[{name:"Новые рефералы",data:this[y.d]||[]}]},orders:function(){var e=this;return(this[b.b]||[]).map((function(t){var r=t.image&&Object(V.c)(40,40,t.image.id,S.fileExtension.image.WEBP),a=t.image&&Object(V.c)(40,40,t.image.id),i=t.order_date&&new Date(t.order_date).toLocaleDateString(e[w.g],$.c),s=e.$t("referralSource.".concat(t.source));return R(R({},t),{},{qty:Number(t.qty),sourceString:s,date:i,defaultImage:a,desktopImage:r})}))},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:{orderFilterValue:function(e,t){e!==t&&this.$router.replace({path:this.$route.path,query:R(R({},this.$route.query),{},{orderFilterField:e.field})})},sortValue:function(e,t){e!==t&&this.$router.replace({path:this.$route.path,query:R(R({},this.$route.query),{},{orderField:e.field})})},sortDirection:function(e,t){e!==t&&this.$router.replace({path:this.$route.path,query:R(R({},this.$route.query),{},{orderDirection:e})})}},methods:R(R(R({},Object(h.b)(U,[C.b,C.a,C.d])),Object(h.b)(D.b,[F.a])),{},{onOpenOrder:function(e){this.$router.push({name:"ReferalOrderDetails",params:{referalId:e}})},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:R(R({},this.$route.query),{},{page:this[b.a]+1})})},onPageChanged:function(e){this.showMore=!1,this.$router.push({path:this.$route.path,query:R(R({},this.$route.query),{},{page:e})})},formatArcSum:function(e){return"".concat(Object(A.i)(e)," ₽")},shortNumberFormat:function(e){return Object(A.l)(e)},onCopyToClipboard:function(e){var t=Object(x.a)(this[O.d]),r=Object(A.k)(t)?"Успешно скопировано":"Не удается скопировать";this[F.a]({name:S.modalName.general.NOTIFICATION,open:!0,state:{message:r}}),e.target.focus()},onPromocodeRequest:function(){this[F.a]({name:S.modalName.profile.MESSAGE,open:!0,state:{themeCode:S.themeCodes.PROMOCODE}})},onChatCreated:function(){this[F.a]({name:S.modalName.general.NOTIFICATION,open:!0,state:{title:"Уведомление",message:"Запрос отправлен, администратор свяжется с вами в ближайшее время."}})},setOrderFilterValue:function(e){this.orderFilterValue=this.orderFilterOptions.find((function(t){return t.field===e}))||this.orderFilterOptions[0]},setSortValue:function(e){void 0!==e&&(this.sortValue.field!==e?(this.sortValue=this.sortFields.find((function(t){return t.field===e})),this.sortDirection=S.sortDirections.ASC):this.setSortDirection())},setSortDirection:function(){this.sortDirection===S.sortDirections.ASC?this.sortDirection=S.sortDirections.DESC:this.sortDirection=S.sortDirections.ASC},clearFilterUrl:function(){this.$router.replace({path:this.$route.path})}}),serverPrefetch:function(){var e=this;return T(regeneratorRuntime.mark((function t(){var r,a,i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{r=e.$route,r.fullPath,a=r.query,i=a.page,void 0===i?P.b:i,a.orderField,a.orderDirection,a.orderFilterField}catch(e){E.$logger.error(e)}case 1:case"end":return t.stop()}}),t)})))()},beforeRouteEnter:function(e,t,r){var a=e.fullPath,i=e.query,s=i.page,l=void 0===s?P.b:s,n=i.orderField,o=i.orderDirection,c=i.orderFilterField,_=E.$store.state[g.NAME][b.c].loadPath,v=Object(N.b)(c);_===a?r():(E.$progress.start(),E.$store.dispatch("".concat(U,"/").concat(C.b),{page:l,orderField:n,orderDirection:o,orderFilterField:c,date:v}).then((function(){r((function(e){E.$progress.finish(),e.setOrderFilterValue(c),e.setSortValue(n)}))})).catch((function(e){E.$progress.fail(),r()})))},beforeRouteUpdate:function(e,t,r){var a=this;return T(regeneratorRuntime.mark((function t(){var i,s,l,n,o,c,_;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.fullPath,i=e.query,s=i.page,l=void 0===s?P.b:s,n=i.orderField,o=i.orderDirection,c=i.orderFilterField,_=Object(N.b)(c),t.prev=2,a.$progress.start(),t.next=6,a[C.a]({page:l,orderField:n,orderDirection:o,showMore:a.showMore,orderFilterField:c,date:_});case 6:a.$progress.finish(),r(),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(2),a.$progress.fail(),r(!1);case 14:a.showMore=!1;case 15:case"end":return t.stop()}}),t,null,[[2,10]])})))()},beforeMount:function(){var e=this.$route.query,t=e.orderFilterField,r=e.orderField,a=e.orderDirection;this.setOrderFilterValue(t),this.setSortValue(r),"desc"===a&&(this.sortDirection=a)},mounted:function(){this.isMounted=!0}},Y=r("KHd+"),G=Object(Y.a)(B,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section referal-view"},[r("h2",{staticClass:"referal-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),e.referralData&&e.level?r("div",{staticClass:"referal-view__panels"},[r("div",{staticClass:"referal-view__panel"},[r("div",{staticClass:"referal-view__panel-item"},[r("div",{staticClass:"text-grey referal-view__panel-name"},[e._v("Ваш уровень")]),e._v(" "),r("div",{staticClass:"referal-view__panel-level"},[e._v(e._s(e.levelData.currentLevelName))])]),e._v(" "),e.levelData.nextLevelName||!e.levelData.nextLevelName&&e.isTabletLg&&!e.isTablet?r("div",{staticClass:"referal-view__panel-item",style:{visibility:e.levelData.nextLevelName?"visible":"hidden"}},[r("div",{staticClass:"text-grey referal-view__panel-name"},[e._v("\n                    Следующий уровень\n                ")]),e._v(" "),r("div",{staticClass:"text-grey referal-view__panel-level"},[e._v(e._s(e.levelData.nextLevelName))])]):e._e(),e._v(" "),r("a",{staticClass:"referal-view__panel-link"},[e._v("Подробнее о реферальной программе")])]),e._v(" "),r("div",{staticClass:"referal-view__panel",class:{"referal-view__panel--empty":!e.levelData.nextLevelName}},[e.levelData.nextLevelName?[r("div",{staticClass:"referal-view__panel-item"},[r("div",{staticClass:"referal-view__panel-item-counter"},[r("v-arc-counter",e._b({attrs:{text:e.referralArcData.value,"active-count":e.referralArcData.currentPercent}},"v-arc-counter",e.arcSettings,!1)),e._v(" "),r("div",{staticClass:"text-grey referal-view__panel-item-label"},[r("span",[e._v("0")]),e._v(" "),r("span",[e._v(e._s(e.referralArcData.next))])])],1),e._v(" "),r("div",{staticClass:"text-grey"},[e._v("Новых рефералов")])]),e._v(" "),r("div",{staticClass:"referal-view__panel-item"},[r("div",{staticClass:"referal-view__panel-item-counter"},[r("v-arc-counter",e._b({attrs:{text:e.formatArcSum(e.sumArcData.value),"active-count":e.sumArcData.currentPercent}},"v-arc-counter",e.arcSettings,!1)),e._v(" "),r("div",{staticClass:"text-grey referal-view__panel-item-label"},[r("span",[e._v("0")]),e._v(" "),r("span",[e._v(e._s(e.shortNumberFormat(e.sumArcData.next)))])])],1),e._v(" "),r("div",{staticClass:"text-grey"},[e._v("Сумма заказов")])])]:r("div",{staticClass:"referal-view__panel-item"},[r("h2",[e._v("Поздравляем!")]),e._v("\n                Вы достигли максимального уровня!\n            ")])],2)]):e._e(),e._v(" "),e.orders&&e.orders.length||e.sumArcData.value?[r("section",{staticClass:"referal-view__section referal-view__graph"},[r("h3",{staticClass:"container container--tablet-lg referal-view__section-hl"},[e._v("Новые рефералы")]),e._v(" "),e.isMounted?r("v-chart",{attrs:{type:"line",options:e.chartOptions,series:e.series,height:"350px"}}):e._e()],1),e._v(" "),r("div",{staticClass:"container container--tablet-lg"},[r("section",{staticClass:"referal-view__section"},[r("div",{staticClass:"referal-view__section-header"},[r("h3",{staticClass:"referal-view__section-hl"},[e._v("История заказов рефералов")]),e._v(" "),e.isTabletLg?e._e():r("v-select",{staticClass:"referal-view__section-filter",attrs:{label:"title","track-by":"id",options:e.orderFilterOptions,searchable:!1,"allow-empty":!1,"show-labels":!1},model:{value:e.orderFilterValue,callback:function(t){e.orderFilterValue=t},expression:"orderFilterValue"}})],1),e._v(" "),!e.isTabletLg&&e.orders&&e.orders.length?r("table",{staticClass:"referal-view__table"},[e._m(0),e._v(" "),r("thead",{staticClass:"referal-view__table-head"},[r("tr",{staticClass:"referal-view__table-tr referal-view__table-tr--header"},e._l(e.sortFields,(function(t){return r("th",{key:t.id,staticClass:"referal-view__table-th",class:[{"is-active":t.field===e.sortValue.field},{"is-rotate":t.field===e.sortValue.field&&"desc"===e.sortDirection}],attrs:{id:"order-sort-item-"+t.id}},[r("div",{staticClass:"referal-view__table-sort",on:{click:function(r){return e.setSortValue(t.field)}}},[e._v("\n                                    "+e._s(t.title)+"\n                                    "),r("v-svg",{attrs:{name:"arrow-down-small",width:"24",height:"24"}})],1)])})),0)]),e._v(" "),r("transition-group",{staticClass:"referal-view__table-body",attrs:{tag:"tbody",name:"fade-in",appear:""}},e._l(e.orders,(function(t){return r("tr",{key:t.id,staticClass:"referal-view__table-tr"},[r("td",{staticClass:"referal-view__table-td"},[r("div",{staticClass:"referal-view__table-img",class:{"referal-view__table-img--empty":!t.image||!t.image.id}},[t.image&&t.image.id?r("v-picture",{key:t.image.id},[r("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp"}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage}})]):r("v-svg",{attrs:{name:"logo",width:"32",height:"32"}})],1),e._v(" "),r("div",{staticClass:"referal-view__table-title"},[e._v("\n                                    "+e._s(t.name)+"\n                                ")])]),e._v(" "),r("td",{staticClass:"referal-view__table-td"},[e._v(e._s(t.qty)+" шт")]),e._v(" "),r("td",{staticClass:"referal-view__table-td"},[r("router-link",{attrs:{to:{name:"ReferalOrderDetails",params:{referalId:t.customer_id}}}},[e._v("\n                                    "+e._s(t.customer_id)+"\n                                ")])],1),e._v(" "),r("td",{staticClass:"referal-view__table-td"},[e._v("\n                                "+e._s(t.sourceString)+"\n                            ")]),e._v(" "),r("td",{staticClass:"referal-view__table-td"},[e._v(e._s(t.date))]),e._v(" "),r("td",{staticClass:"referal-view__table-td"},[r("price",e._b({},"price",t.price_product,!1))],1),e._v(" "),r("td",{staticClass:"referal-view__table-td"},[r("price",e._b({},"price",t.price_commission,!1))],1)])})),0)],1):e._e()]),e._v(" "),e.isTabletLg?r("filter-button",{staticClass:"referal-view__filter-btn",on:{click:function(t){e.filterModal=!e.filterModal}}},[e._v("\n                Фильтр и сортировка  \n                ")]):e._e()],1),e._v(" "),e.isTabletLg?r("ul",{staticClass:"referal-view__list"},e._l(e.orders,(function(t){return r("li",{key:t.id,staticClass:"referal-view__list-item"},[r("info-row",{staticClass:"referal-view__list-item-row",attrs:{name:"Товар"}},[r("div",{staticClass:"referal-view__table-img",class:{"referal-view__table-img--empty":!t.image||!t.image.id}},[t.image&&t.image.id?r("v-picture",{key:t.image.id},[r("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp"}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage}})]):r("v-svg",{attrs:{name:"logo",width:"32",height:"32"}})],1),e._v(" "),r("div",{staticClass:"referal-view__table-title"},[e._v("\n                        "+e._s(t.name)+"\n                    ")])]),e._v(" "),r("info-row",{staticClass:"referal-view__list-item-row",attrs:{name:"Количество"}},[e._v(" "+e._s(t.qty)+" шт. ")]),e._v(" "),r("info-row",{staticClass:"referal-view__list-item-row",attrs:{name:"ID реферала"}},[r("router-link",{attrs:{to:{name:"ReferalOrderDetails",params:{referalId:t.customer_id}}}},[e._v("\n                        "+e._s(t.customer_id)+"\n                    ")])],1),e._v(" "),r("info-row",{staticClass:"referal-view__list-item-row",attrs:{name:"Источник",value:t.sourceString}}),e._v(" "),r("info-row",{staticClass:"referal-view__list-item-row",attrs:{name:"Дата заказа",value:t.date}}),e._v(" "),r("info-row",{staticClass:"referal-view__list-item-row",attrs:{name:"Сумма"}},[r("price",e._b({},"price",t.price_product,!1))],1),e._v(" "),r("info-row",{staticClass:"referal-view__list-item-row",attrs:{name:"Сумма вознаграждения"}},[r("price",e._b({},"price",t.price_commission,!1))],1)],1)})),0):e._e()]:r("attention-panel",{staticClass:"referal-view__attention-panel"},[r("div",{staticClass:"referal-view__attention-section"},[r("p",{staticClass:"referal-view__attention-text"},[e._v("\n                Вам еще не начислялись вознаграждения за покупки рефералов. Воспользуйтесь одним из маркетинговых\n                инструменов для привлечения аудитории:\n            ")]),e._v(" "),r("ul",{staticClass:"list list--dashed referal-view__attention-list"},[r("li",{staticClass:"referal-view__attention-list-item"},[r("v-link",{staticClass:"referal-view__attention-link",attrs:{tag:"button"},on:{click:function(t){return e.onCopyToClipboard(t)}}},[e._v("\n                        скопировать\n                    ")]),e._v("\n                    реферальную ссылку и разместить её в соцсетях\n                ")],1),e._v(" "),r("li",{staticClass:"referal-view__attention-list-item"},[e._v("\n                    собрать собственную\n                    "),r("v-link",{staticClass:"referal-view__attention-link",attrs:{tag:"button",to:{name:"Promopage"}}},[e._v("\n                        промо-страницу\n                    ")]),e._v("\n                    с товарами\n                ")],1),e._v(" "),r("li",{staticClass:"referal-view__attention-list-item"},[r("button",{staticClass:"referal-view__attention-link",on:{click:e.onPromocodeRequest}},[e._v("\n                        запросить\n                    ")]),e._v("\n                    промо-код\n                ")]),e._v(" "),r("li",{staticClass:"referal-view__attention-list-item"},[r("v-link",{staticClass:"referal-view__attention-link",attrs:{tag:"button",to:{name:"Seo"}}},[e._v("\n                        расшарить\n                    ")]),e._v("\n                    товары для продвижения\n                ")],1)])])]),e._v(" "),e.orders&&e.orders.length?e._e():r("div",{staticClass:"referal-view__orders-null container container--tablet-lg"},[e._v("\n        Заказов в этот перод времени не было\n    ")]),e._v(" "),e.pagesCount>1?r("div",{staticClass:"container container--tablet-lg referal-view__controls"},[e.activePage<e.pagesCount?r("show-more-button",{attrs:{"btn-class":"btn--outline referal-view__controls-btn","show-preloader":e.showMore},on:{click:function(t){return t.preventDefault(),e.onShowMore(t)}}},[e._v("\n            Показать ещё\n        ")]):e._e(),e._v(" "),r("v-pagination",{attrs:{value:e.activePage,"page-count":e.pagesCount},on:{input:e.onPageChanged}})],1):e._e(),e._v(" "),r("transition",{attrs:{name:"fade"}},[e.filterModal&&e.isTabletLg?r("general-modal",{staticClass:"referal-view__modal-filter",attrs:{type:"fullscreen","is-mobile":e.isTabletLg,header:"Фильтр и сортировка"},on:{close:function(t){e.filterModal=!1}},scopedSlots:e._u([{key:"content",fn:function(){return[r("transition",{attrs:{name:"fade-in",mode:"out-in"}},[r("div",{staticClass:"referal-view__modal-filter-sort"},[r("div",{staticClass:"referal-view__modal-filter-sort-title"},[e._v("Сортировка")]),e._v(" "),r("ul",{staticClass:"referal-view__modal-filter-sort-list"},e._l(e.orderFilterOptions,(function(t){return r("li",{key:t.title,staticClass:"referal-view__modal-filter-sort-item",class:{"referal-view__modal-filter-sort-item--active":t===e.orderFilterValue}},[r("button",{staticClass:"referal-view__modal-filter-sort-btn",on:{click:function(r){return e.setOrderFilterValue(t.field)}}},[e._v("\n                                    "+e._s(t.title)+"\n                                ")])])})),0),e._v(" "),r("div",{staticClass:"referal-view__modal-filter-controls"},[r("v-button",{staticClass:"btn--outline referal-view__modal-filter-clear-btn",attrs:{replace:""},on:{click:e.clearFilterUrl}},[e._v("Очистить")]),e._v(" "),r("v-button",{staticClass:"referal-view__modal-filter-close-btn",on:{click:function(t){e.filterModal=!e.filterModal}}},[e._v("Показать")])],1)])])]},proxy:!0}],null,!1,3590802123)}):e._e()],1),e._v(" "),r("transition",{attrs:{name:"fade"}},[e.$isServer||e.isMessageOpen?r("message-modal",{on:{created:e.onChatCreated}}):e._e()],1)],2)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("colgroup",[t("col",{attrs:{width:"40%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}})])}],!1,null,null,null);t.default=G.exports},yXCv:function(e,t,r){}}]);