(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{HT8i:function(e,t,o){"use strict";o.r(t);var n=o("NDiG"),s=o("7cXU"),a=o("i2Ud"),r=o("nurM"),i=o("45Ux"),c=o("Yt4v"),l=o("uy7R"),_=o("L2JU"),d=o("Q2AE"),p=o("55Sm"),u=o("jDKC"),v=o("rBTT"),m=o("8d0O"),h=o("GsIJ"),f=o("fpWb"),b=o("2JJK"),y=o("tCqp"),w=(o("GyY8"),o("QmAe")),g=o("3eXy");o("Mii2"),o("2CE6"),o("LZ6J"),o("Uh29");function C(e,t,o,n,s,a,r){try{var i=e[a](r),c=i.value}catch(e){return void o(e)}i.done?t(c):Promise.resolve(c).then(n,s)}function O(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function T(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?O(Object(o),!0).forEach((function(t){D(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):O(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function D(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var k="".concat(v.NAME,"/").concat(m.a),E={name:"promocodes",components:{VSvg:n.a,VLink:s.a,VButton:a.a,RadioSwitch:r.a,InfoRow:i.a,EmptyPlaceholderPanel:c.a,MessageModal:l.a},data:function(){var e=[{value:0,title:"Действующие"},{value:1,title:"Архив"}];return{selectedStatus:e[0].value,promocodeStatus:e,items:[]}},computed:T(T(T(T({},Object(_.d)([d.g])),Object(_.c)(k,[h.a])),Object(_.d)(p.b,{isMessageOpen:function(e){return e[p.a][b.modalName.profile.MESSAGE]&&e[p.a][b.modalName.profile.MESSAGE].open}})),{},{isArchive:function(){var e=this.$route.query.isArchive,t=void 0===e?0:e;return 1===Number(t)},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),methods:T(T(T({},Object(_.b)(p.b,[u.a])),Object(_.b)(k,[f.a])),{},{onStatusChanged:function(e){this.$router.replace({path:this.$route.path,query:{isArchive:e}})},setFilterValue:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.selectedStatus=Number(e)},onCopyCode:function(e,t){var o=Object(w.l)(t)?"Успешно скопировано":"Не удается скопировать";this[u.a]({name:b.modalName.general.NOTIFICATION,open:!0,state:{message:o}}),e.target.focus()},onToggleIsOpen:function(e){e.isOpen=!e.isOpen},onChatCreated:function(){this[u.a]({name:b.modalName.general.NOTIFICATION,open:!0,state:{title:"Уведомление",message:"Запрос отправлен, администратор свяжется с вами в ближайшее время."}})},onPromocodeRequest:function(){this[u.a]({name:b.modalName.profile.MESSAGE,open:!0,state:{themeCode:b.themeCodes.PROMOCODE}})}}),watch:D({},h.a,(function(e){this.items=e||[]})),beforeRouteEnter:function(e,t,o){var n=e.fullPath,s=e.query.isArchive,a=void 0===s?0:s,r=g.$store.state[v.NAME][m.a].loadPath;n===r?o((function(e){return e.setFilterValue(a)})):(g.$progress.start(),g.$store.dispatch("".concat(k,"/").concat(f.a),a).then((function(){g.$store.dispatch("".concat(k,"/").concat(f.b),n),o((function(e){e.setFilterValue(a),g.$progress.finish()}))})).catch((function(e){return o((function(e){g.$progress.fail()}))})))},beforeRouteUpdate:function(e,t,o){var n,s=this;return(n=regeneratorRuntime.mark((function n(){var a,r,i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(a=e.query.isArchive,r=void 0===a?0:a,i=t.query.isArchive,r!=i){n.next=4;break}return n.abrupt("return",o());case 4:return n.prev=4,s.$progress.start(),n.next=8,s[f.a](r);case 8:s.$progress.finish(),o(),n.next=16;break;case 12:n.prev=12,n.t0=n.catch(4),s.$progress.fail(),o(!1);case 16:case"end":return n.stop()}}),n,null,[[4,12]])})),function(){var e=this,t=arguments;return new Promise((function(o,s){var a=n.apply(e,t);function r(e){C(a,o,s,r,i,"next",e)}function i(e){C(a,o,s,r,i,"throw",e)}r(void 0)}))})()},beforeCreate:function(){this.promocodeType=y.e,this.promocodeDiscountType=y.d},created:function(){this.items=this[h.a],this.setFilterValue(this.$route.query.isArchive)}},R=o("KHd+"),A=Object(R.a)(E,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",{staticClass:"section promocodes-view"},[o("div",{staticClass:"container container--tablet-lg promocodes-view__header"},[o("h2",{staticClass:"promocodes-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),o("div",{staticClass:"promocodes-view__header-controls"},[e.items&&e.items.length?o("radio-switch",{staticClass:"promocodes-view__header-switch",attrs:{value:e.selectedStatus,items:e.promocodeStatus,id:"promocode-switch","key-field":"value",name:"promocodeStatus"},on:{input:e.onStatusChanged}}):e._e(),e._v(" "),o("button",{staticClass:"btn btn--outline promocodes-view__header-btn",on:{click:e.onPromocodeRequest}},[e._v("\n                Запрос промокода\n            ")])],1)]),e._v(" "),e.items&&e.items.length?[o("div",{staticClass:"container container--tablet-lg"},[e.isTabletLg?e._e():o("table",{staticClass:"promocodes-view__table"},[e._m(0),e._v(" "),e._m(1),e._v(" "),o("transition-group",{staticClass:"promocodes-view__table-body",attrs:{tag:"tbody",name:"fade-in",appear:""}},e._l(e.items,(function(t){return o("tr",{key:t.code,staticClass:"promocodes-view__table-tr"},[o("td",{staticClass:"promocodes-view__table-td"},[e._v("\n                            "+e._s(t.code)+"  \n                            "),o("button",{staticClass:"promocodes-view__table-btn promocodes-view__copy-btn",on:{click:function(o){return e.onCopyCode(o,t.code)}}},[o("v-svg",{attrs:{name:"copy",width:"16",height:"16"}}),e._v(" "),e.isTablet?e._e():o("span",[e._v("Скопировать")])],1)]),e._v(" "),o("td",{staticClass:"promocodes-view__table-td"},[!t.endDate&&t.startDate?[e._v("c")]:e._e(),e._v("\n                            "+e._s(t.startDate)+"\n                            "),t.startDate&&t.endDate?[e._v("\n                                -\n                            ")]:t.startDate||t.endDate?e._e():[e._v("\n                                Бессрочный\n                            ")],e._v(" "),!t.startDate&&t.endDate?[e._v("по")]:e._e(),e._v("\n                            "+e._s(t.endDate)+"\n                        ")],2),e._v(" "),o("td",{staticClass:"promocodes-view__table-td"},[t.discount?[e._v("\n                                "+e._s(t.discount)+"\n                            ")]:[e._v(" – ")]],2),e._v(" "),o("td",{staticClass:"promocodes-view__table-td"},[t.type===e.promocodeType.DELIVERY?[e._v("\n                                Бесплатная доставка\n                            ")]:e._e(),e._v(" "),t.type===e.promocodeType.GIFT?[e._v("\n                                Подарок\n                            ")]:t.type===e.promocodeType.BONUS?[e._v("\n                                Бонусы\n                            ")]:t.type===e.promocodeType.PRODUCT?[t.discountType===e.promocodeDiscountType.DELIVERY?[e._v("\n                                    Скидка на доставку\n                                ")]:t.discountType===e.promocodeDiscountType.CART?[e._v("\n                                    Скидка на сумму корзины\n                                ")]:t.discountType===e.promocodeDiscountType.BUNDLE?[e._v("\n                                    Скидка на комплект\n                                ")]:t.discountType===e.promocodeDiscountType.OFFER?e._l(Object.keys(t.offers),(function(n){return o("div",{key:n,staticClass:"promocodes-view__category-panel"},[o("button",{staticClass:"promocodes-view__category-panel-header-btn",on:{click:function(o){return e.onToggleIsOpen(t.offers[n])}}},[e._v("\n                                        "+e._s(n)+":  "),o("v-svg",{class:{"icon--rotate-deg180":t.offers[n].isOpen},attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.offers[n].isOpen?o("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.offers[n].items,(function(t){return o("li",{key:t.name},[e._v("\n                                            - "+e._s(t.name)+"\n                                        ")])})),0):e._e()])})):o("div",{staticClass:"promocodes-view__category-panel"},[t.discountType===e.promocodeDiscountType.BRAND?[o("button",{staticClass:"promocodes-view__category-panel-header-btn",on:{click:function(o){return e.onToggleIsOpen(t.brands)}}},[e._v("\n                                            Бренды:  "),o("v-svg",{class:{"icon--rotate-deg180":t.brands.isOpen},attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.brands.isOpen?o("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.brands.items,(function(t){return o("li",{key:t.id},[e._v("\n                                                - "+e._s(t.name)+"\n                                            ")])})),0):e._e()]:t.discountType===e.promocodeDiscountType.CATEGORY?[o("button",{staticClass:"promocodes-view__category-panel-header-btn",on:{click:function(o){return e.onToggleIsOpen(t.categories)}}},[e._v("\n                                            Категории:  "),o("v-svg",{attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.categories.isOpen?o("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.categories.items,(function(t){return o("li",{key:t.id},[e._v("\n                                                - "+e._s(t.name)+"\n                                            ")])})),0):e._e()]:e._e()],2)]:e._e()],2)])})),0)],1)]),e._v(" "),e.isTabletLg?o("ul",{staticClass:"promocodes-view__list"},e._l(e.promocodes,(function(t){return o("li",{key:t.id,staticClass:"container container--tablet-lg promocodes-view__list-item"},[o("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Промокод"}},[e._v("\n                    "+e._s(t.code)+"  \n                    "),o("button",{staticClass:"promocodes-view__table-btn promocodes-view__copy-btn",on:{click:function(o){return e.onCopyCode(o,t.code)}}},[o("v-svg",{attrs:{name:"copy",width:"16",height:"16"}}),e._v("\n                        Скопировать\n                    ")],1)]),e._v(" "),o("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Срок действия"}},[!t.endDate&&t.startDate?[e._v("c")]:e._e(),e._v("\n                    "+e._s(t.startDate)+"\n                    "),t.startDate&&t.endDate?[e._v("–")]:t.startDate||t.endDate?e._e():[e._v("Бессрочный")],e._v(" "),!t.startDate&&t.endDate?[e._v("по")]:e._e(),e._v("\n                    "+e._s(t.endDate)+"\n                ")],2),e._v(" "),o("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Скидка",value:t.discount}}),e._v(" "),o("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Категория товаров/услуг"}},[t.type===e.promocodeType.DELIVERY?[e._v("\n                        Бесплатная доставка\n                    ")]:e._e(),e._v(" "),t.type===e.promocodeType.GIFT?[e._v("\n                        Подарок\n                    ")]:t.type===e.promocodeType.BONUS?[e._v("\n                        Бонусы\n                    ")]:t.type===e.promocodeType.PRODUCT?[t.discountType===e.promocodeDiscountType.DELIVERY?[e._v("\n                            Скидка на доставку\n                        ")]:t.discountType===e.promocodeDiscountType.CART?[e._v("\n                            Скидка на сумму корзины\n                        ")]:t.discountType===e.promocodeDiscountType.OFFER?e._l(Object.keys(t.offers),(function(n){return o("div",{key:n,staticClass:"promocodes-view__category-panel"},[o("button",{staticClass:"promocodes-view__category-panel-header-btn",on:{click:function(o){return e.onToggleIsOpen(t.offers[n])}}},[e._v("\n                                "+e._s(n)+":  "),o("v-svg",{class:{"icon--rotate-deg180":t.offers[n].isOpen},attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.offers[n].isOpen?o("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.offers[n].items,(function(t){return o("li",{key:t.name},[e._v("\n                                    - "+e._s(t.name)+"\n                                ")])})),0):e._e()])})):o("div",{staticClass:"promocodes-view__category-panel"},[t.discountType===e.promocodeDiscountType.BRAND?[o("button",{staticClass:"promocodes-view__category-panel-header-btn",on:{click:function(o){return e.onToggleIsOpen(t.brands)}}},[e._v("\n                                    Бренды:  "),o("v-svg",{class:{"icon--rotate-deg180":t.brands.isOpen},attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.brands.isOpen?o("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.brands.items,(function(t){return o("li",{key:t.id},[e._v("\n                                        - "+e._s(t.name)+"\n                                    ")])})),0):e._e()]:t.discountType===e.promocodeDiscountType.CATEGORY?[o("button",{staticClass:"promocodes-view__category-panel-header-btn",on:{click:function(o){return e.onToggleIsOpen(t.categories)}}},[e._v("\n                                    Категории:  "),o("v-svg",{attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.categories.isOpen?o("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.categories.items,(function(t){return o("li",{key:t.id},[e._v("\n                                        - "+e._s(t.name)+"\n                                    ")])})),0):e._e()]:e._e()],2)]:e._e()],2)],1)})),0):e._e()]:o("empty-placeholder-panel",{staticClass:"promocodes-view__attention",attrs:{"show-btn":!e.isTablet},on:{"btn-click":e.onPromocodeRequest},scopedSlots:e._u([{key:"btn",fn:function(){return[e._v("\n            Запрос промокода\n        ")]},proxy:!0}])},[e.isArchive?[e._v("\n            Архив ваших промо-кодов пуст.\n        ")]:[e._v("\n            У вас пока нет активных промо-кодов."),o("br"),e._v("\n            Воспользуйтесь функцией «Запросить промо-код» для привлечения аудитории к определенным продуктам или\n            категориям товаров.\n        ")]],2),e._v(" "),o("transition",{attrs:{name:"fade"}},[e.$isServer||e.isMessageOpen?o("message-modal",{on:{created:e.onChatCreated}}):e._e()],1)],2)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("colgroup",[t("col",{attrs:{width:"35%"}}),this._v(" "),t("col",{attrs:{width:"20%"}}),this._v(" "),t("col",{attrs:{width:"15%"}}),this._v(" "),t("col",{attrs:{width:"30%"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("thead",{staticClass:"promocodes-view__table-head"},[t("tr",{staticClass:"promocodes-view__table-tr promocodes-view__table-tr--header"},[t("th",{staticClass:"promocodes-view__table-th"},[this._v("Промокод")]),this._v(" "),t("th",{staticClass:"promocodes-view__table-th"},[this._v("Срок действия")]),this._v(" "),t("th",{staticClass:"promocodes-view__table-th"},[this._v("Скидка")]),this._v(" "),t("th",{staticClass:"promocodes-view__table-th"},[this._v("Категория товаров/услуг")])])])}],!1,null,null,null);t.default=A.exports},Uh29:function(e,t,o){}}]);