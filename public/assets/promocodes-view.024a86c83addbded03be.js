(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{HT8i:function(e,t,s){"use strict";s.r(t);var o=s("NDiG"),n=s("7cXU"),a=s("i2Ud"),r=s("nurM"),i=s("45Ux"),c=s("Yt4v"),l=s("uy7R"),_=s("L2JU"),d=s("Q2AE"),v=s("55Sm"),p=s("jDKC"),u=s("rBTT"),m=s("8d0O"),h=s("GsIJ"),f=s("fpWb"),g=s("2JJK"),w=s("tCqp"),b=(s("GyY8"),s("QmAe")),y=s("3eXy");s("Mii2"),s("2CE6"),s("LZ6J"),s("Uh29");function C(e,t,s,o,n,a,r){try{var i=e[a](r),c=i.value}catch(e){return void s(e)}i.done?t(c):Promise.resolve(c).then(o,n)}function O(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,o)}return s}function k(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?O(Object(s),!0).forEach((function(t){D(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):O(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function D(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var j="".concat(u.NAME,"/").concat(m.a),T={name:"promocodes",components:{VSvg:o.a,VLink:n.a,VButton:a.a,RadioSwitch:r.a,InfoRow:i.a,EmptyPlaceholderPanel:c.a,MessageModal:l.a},data:function(){var e=[{value:0,title:"Действующие"},{value:1,title:"Архив"}];return{selectedStatus:e[0].value,promocodeStatus:e,items:[]}},computed:k(k(k(k({},Object(_.d)([d.f])),Object(_.c)(j,[h.a])),Object(_.d)(v.b,{isMessageOpen:function(e){return e[v.a][g.modalName.profile.MESSAGE]&&e[v.a][g.modalName.profile.MESSAGE].open}})),{},{isArchive:function(){var e=this.$route.query.isArchive,t=void 0===e?0:e;return 1===Number(t)},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),methods:k(k(k({},Object(_.b)(v.b,[p.a])),Object(_.b)(j,[f.a])),{},{onStatusChanged:function(e){this.$router.replace({path:this.$route.path,query:{isArchive:e}})},setFilterValue:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.selectedStatus=Number(e)},onCopyCode:function(e,t){var s=Object(b.i)(t)?"Успешно скопировано":"Не удается скопировать";this[p.a]({name:g.modalName.general.NOTIFICATION,open:!0,state:{message:s}}),e.target.focus()},onToggleIsOpen:function(e){e.isOpen=!e.isOpen},onPromocodeRequest:function(){this[p.a]({name:g.modalName.profile.MESSAGE,open:!0,state:{themeCode:g.themeCodes.PROMOCODE}})}}),watch:D({},h.a,(function(e){this.items=e||[]})),beforeRouteEnter:function(e,t,s){var o=e.fullPath,n=e.query.isArchive,a=void 0===n?0:n,r=y.$store.state[u.NAME][m.a].loadPath;o===r?s((function(e){return e.setFilterValue(a)})):(y.$progress.start(),y.$store.dispatch("".concat(j,"/").concat(f.a),a).then((function(){y.$store.dispatch("".concat(j,"/").concat(f.b),o),s((function(e){e.setFilterValue(a),y.$progress.finish()}))})).catch((function(e){return s((function(e){y.$progress.fail()}))})))},beforeRouteUpdate:function(e,t,s){var o,n=this;return(o=regeneratorRuntime.mark((function o(){var a,r,i;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(a=e.query.isArchive,r=void 0===a?0:a,i=t.query.isArchive,r!=i){o.next=4;break}return o.abrupt("return",s());case 4:return o.prev=4,n.$progress.start(),o.next=8,n[f.a](r);case 8:n.$progress.finish(),s(),o.next=16;break;case 12:o.prev=12,o.t0=o.catch(4),n.$progress.fail(),s(!1);case 16:case"end":return o.stop()}}),o,null,[[4,12]])})),function(){var e=this,t=arguments;return new Promise((function(s,n){var a=o.apply(e,t);function r(e){C(a,s,n,r,i,"next",e)}function i(e){C(a,s,n,r,i,"throw",e)}r(void 0)}))})()},created:function(){this.promocodeType=w.d,this.items=this[h.a],this.setFilterValue(this.$route.query.isArchive)}},P=s("KHd+"),S=Object(P.a)(T,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"section promocodes-view"},[s("div",{staticClass:"container container--tablet-lg promocodes-view__header"},[s("h2",{staticClass:"promocodes-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),s("div",{staticClass:"promocodes-view__header-controls"},[s("radio-switch",{staticClass:"promocodes-view__header-switch",attrs:{value:e.selectedStatus,items:e.promocodeStatus,id:"promocode-switch","key-field":"value",name:"promocodeStatus"},on:{input:e.onStatusChanged}}),e._v(" "),s("button",{staticClass:"btn btn--outline promocodes-view__header-btn",on:{click:e.onPromocodeRequest}},[e._v("\n                Запрос промокода\n            ")])],1)]),e._v(" "),e.items&&e.items.length?[s("div",{staticClass:"container container--tablet-lg"},[e.isTabletLg?e._e():s("table",{staticClass:"promocodes-view__table"},[e._m(0),e._v(" "),e._m(1),e._v(" "),s("transition-group",{staticClass:"promocodes-view__table-body",attrs:{tag:"tbody",name:"fade-in",appear:""}},e._l(e.items,(function(t){return s("tr",{key:t.code,staticClass:"promocodes-view__table-tr"},[s("td",{staticClass:"promocodes-view__table-td"},[e._v("\n                            "+e._s(t.code)+"  \n                            "),s("button",{staticClass:"promocodes-view__table-btn",on:{click:function(s){return e.onCopyCode(s,t.code)}}},[s("v-svg",{attrs:{name:"copy",width:"16",height:"16"}})],1)]),e._v(" "),s("td",{staticClass:"promocodes-view__table-td"},[!t.endDate&&t.startDate?[e._v("c")]:e._e(),e._v("\n                            "+e._s(t.startDate)+"\n                            "),t.startDate&&t.endDate||!t.startDate&&!t.endDate?[e._v("\n                                –\n                            ")]:e._e(),e._v(" "),!t.startDate&&t.endDate?[e._v("по")]:e._e(),e._v("\n                            "+e._s(t.endDate)+"\n                        ")],2),e._v(" "),s("td",{staticClass:"promocodes-view__table-td"},[t.discount?[e._v("\n                                "+e._s(t.discount)+"\n                            ")]:[e._v(" – ")]],2),e._v(" "),s("td",{staticClass:"promocodes-view__table-td"},[t.type!==e.promocodeType.PRODUCT?[e._v("Все товары")]:t.brands&&t.brands.items.length>0?s("div",{staticClass:"promocodes-view__category-panel"},[s("div",{staticClass:"promocodes-view__category-panel-header"},[s("button",{staticClass:"promocodes-view__category-panel-btn",on:{click:function(s){return e.onToggleIsOpen(t.brands)}}},[e._v("\n                                        Бренды:\n                                    ")]),e._v("\n                                     "),s("v-svg",{class:{"icon--rotate-deg180":t.brands.isOpen},attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.brands.isOpen?s("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.brands.items,(function(t){return s("li",{key:t.id},[e._v("\n                                        - "+e._s(t.name)+"\n                                    ")])})),0):e._e()]):t.categories&&t.categories.items.length>0?s("div",{staticClass:"promocodes-view__category-panel"},[s("div",{staticClass:"promocodes-view__category-panel-header"},[s("button",{staticClass:"promocodes-view__category-panel-btn",on:{click:function(s){return e.onToggleIsOpen(t.categories)}}},[e._v("\n                                        Категории:\n                                    ")]),e._v("\n                                     "),s("v-svg",{attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.categories.isOpen?s("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.categories.items,(function(t){return s("li",{key:t.id},[e._v("\n                                        - "+e._s(t.name)+"\n                                    ")])})),0):e._e()]):t.offers?e._l(Object.keys(t.offers),(function(o){return s("div",{key:o,staticClass:"promocodes-view__category-panel"},[s("div",{staticClass:"promocodes-view__category-panel-header"},[s("button",{staticClass:"promocodes-view__category-panel-btn",on:{click:function(s){return e.onToggleIsOpen(t.offers[o])}}},[e._v("\n                                        "+e._s(o)+":\n                                    ")]),e._v("\n                                     "),s("v-svg",{class:{"icon--rotate-deg180":t.offers[o].isOpen},attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.offers[o].isOpen?s("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.offers[o].items,(function(t){return s("li",{key:t.name},[e._v("\n                                        - "+e._s(t.name)+"\n                                    ")])})),0):e._e()])})):e._e()],2)])})),0)],1)]),e._v(" "),e.isTabletLg?s("ul",{staticClass:"promocodes-view__list"},e._l(e.promocodes,(function(t){return s("li",{key:t.id,staticClass:"container container--tablet-lg promocodes-view__list-item"},[s("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Промокод"}},[e._v("\n                    "+e._s(t.code)+"  \n                    "),s("button",{staticClass:"promocodes-view__table-btn",on:{click:function(s){return e.onCopyCode(s,t.code)}}},[s("v-svg",{attrs:{name:"copy",width:"16",height:"16"}})],1)]),e._v(" "),s("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Срок действия"}},[!t.endDate&&t.startDate?[e._v("c")]:e._e(),e._v("\n                    "+e._s(t.startDate)+"\n                    "),t.startDate&&t.endDate?[e._v("–")]:e._e(),e._v(" "),!t.startDate&&t.endDate?[e._v("по")]:e._e(),e._v("\n                    "+e._s(t.endDate)+"\n                ")],2),e._v(" "),s("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Скидка",value:t.discount}}),e._v(" "),s("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Категория товаров"}},[t.type!==e.promocodeType.PRODUCT?[e._v("Все товары")]:t.brands&&t.brands.items.length>0?s("div",{staticClass:"promocodes-view__category-panel"},[s("div",{staticClass:"promocodes-view__category-panel-header"},[s("button",{staticClass:"promocodes-view__category-panel-btn",on:{click:function(s){return e.onToggleIsOpen(t.brands)}}},[e._v("\n                                Бренды:\n                            ")]),e._v("\n                             "),s("v-svg",{class:{"icon--rotate-deg180":t.brands.isOpen},attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.brands.isOpen?s("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.brands.items,(function(t){return s("li",{key:t.id},[e._v("- "+e._s(t.name))])})),0):e._e()]):t.categories&&t.categories.items.length>0?s("div",{staticClass:"promocodes-view__category-panel"},[s("div",{staticClass:"promocodes-view__category-panel-header"},[s("button",{staticClass:"promocodes-view__category-panel-btn",on:{click:function(s){return e.onToggleIsOpen(t.categories)}}},[e._v("\n                                Категории:\n                            ")]),e._v("\n                             "),s("v-svg",{attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.categories.isOpen?s("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.categories.items,(function(t){return s("li",{key:t.id},[e._v("\n                                - "+e._s(t.name)+"\n                            ")])})),0):e._e()]):t.offers?e._l(Object.keys(t.offers),(function(o){return s("div",{key:o,staticClass:"promocodes-view__category-panel"},[s("div",{staticClass:"promocodes-view__category-panel-header"},[s("button",{staticClass:"promocodes-view__category-panel-btn",on:{click:function(s){return e.onToggleIsOpen(t.offers[o])}}},[e._v("\n                                "+e._s(o)+":\n                            ")]),e._v("\n                             "),s("v-svg",{class:{"icon--rotate-deg180":t.offers[o].isOpen},attrs:{name:"arrow-down",width:"16",height:"16"}})],1),e._v(" "),t.offers[o].isOpen?s("ul",{staticClass:"promocodes-view__category-panel-list"},e._l(t.offers[o].items,(function(t){return s("li",{key:t.name},[e._v("\n                                - "+e._s(t.name)+"\n                            ")])})),0):e._e()])})):e._e()],2)],1)})),0):e._e()]:s("empty-placeholder-panel",{staticClass:"promocodes-view__attention",attrs:{"show-btn":!e.isTablet},on:{"btn-click":e.onPromocodeRequest},scopedSlots:e._u([{key:"btn",fn:function(){return[e._v("\n            Запрос промокода\n        ")]},proxy:!0}])},[e.isArchive?[e._v("\n            Архив ваших промо-кодов пуст.\n        ")]:[e._v("\n            У вас пока нет активных промо-кодов."),s("br"),e._v("\n            Воспользуйтесь функцией «Запросить промо-код» для привлечения аудитории к определенным продуктам или\n            категориям товаров.\n        ")]],2),e._v(" "),s("transition",{attrs:{name:"fade"}},[e.$isServer||e.isMessageOpen?s("message-modal"):e._e()],1)],2)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("colgroup",[t("col",{attrs:{width:"25%"}}),this._v(" "),t("col",{attrs:{width:"25%"}}),this._v(" "),t("col",{attrs:{width:"15%"}}),this._v(" "),t("col",{attrs:{width:"35%"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("thead",{staticClass:"promocodes-view__table-head"},[t("tr",{staticClass:"promocodes-view__table-tr promocodes-view__table-tr--header"},[t("th",{staticClass:"promocodes-view__table-th"},[this._v("Промокод")]),this._v(" "),t("th",{staticClass:"promocodes-view__table-th"},[this._v("Срок действия")]),this._v(" "),t("th",{staticClass:"promocodes-view__table-th"},[this._v("Скидка")]),this._v(" "),t("th",{staticClass:"promocodes-view__table-th"},[this._v("Категория товаров")])])])}],!1,null,null,null);t.default=S.exports},Uh29:function(e,t,s){}}]);