(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{E0W9:function(e,t,r){"use strict";r.r(t);var a=r("i2Ud"),s=r("pFko"),l=r("+gqB"),i=r("hFpD"),_=r("5JRZ"),d=r("xrX0"),v=(r("g0Ed"),r("TGsm"),{name:"referal-orders",components:{VButton:a.a,VSelect:s.a,VPagination:l.a},data:function(){var e=["Всё время"];return{page:1,selectedSortType:e[0],sortTypes:e,referalProduct1:i.a,referalProduct2:_.a,referalProduct3:d.a}},computed:{},watch:{},methods:{onOpenOrder:function(e){this.$router.push({name:"ReferalOrderDetails",params:{referalId:e}})}}}),o=r("KHd+"),c=Object(o.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section referal-orders-view"},[r("h2",{staticClass:"referal-orders-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),r("section",{staticClass:"referal-orders-view__section"},[r("div",{staticClass:"referal-orders-view__section-header"},[r("h3",{staticClass:"referal-orders-view__section-hl"},[e._v("История заказов реферала")]),e._v(" "),r("v-select",{staticClass:"referal-orders-view__sort",attrs:{options:e.sortTypes,searchable:!1,"show-labels":!1},model:{value:e.selectedSortType,callback:function(t){e.selectedSortType=t},expression:"selectedSortType"}})],1),e._v(" "),r("table",{staticClass:"referal-orders-view__table"},[e._m(0),e._v(" "),e._m(1),e._v(" "),r("transition-group",{staticClass:"referal-orders-view__table-body",attrs:{tag:"tbody",name:"fade-in",appear:""}},[r("tr",{key:"1",staticClass:"referal-orders-view__table-tr"},[r("td",{staticClass:"referal-orders-view__table-td"},[r("div",{staticClass:"referal-orders-view__table-img"},[r("img",{attrs:{src:e.referalProduct1}})]),e._v(" "),r("div",{staticClass:"referal-orders-view__table-title"},[e._v("\n                            Губная помада L'Oreal Paris Color Riche Collection Privee by J'Lo's увлажняющая\n                        ")])]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("2 шт")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[r("router-link",{attrs:{to:{name:"ReferalOrderDetails",params:{referalId:154}}}},[e._v("\n                            154\n                        ")])],1),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("Промокод SOKOLOV")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("18.08.19")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("3 374 ₽")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("337 ₽")])]),e._v(" "),r("tr",{key:"2",staticClass:"referal-orders-view__table-tr"},[r("td",{staticClass:"referal-orders-view__table-td"},[r("div",{staticClass:"referal-orders-view__table-img"},[r("img",{attrs:{src:e.referalProduct2}})]),e._v(" "),r("div",{staticClass:"referal-orders-view__table-title"},[e._v("\n                            Matrix Спрей для укладки волос Total results Wonder boost, 250 мл\n                        ")])]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("1 шт")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[r("router-link",{attrs:{to:{name:"ReferalOrderDetails",params:{referalId:154}}}},[e._v("\n                            154\n                        ")])],1),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("Промокод SOKOLOV")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("17.08.19")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("1 124 ₽")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("112 ₽")])]),e._v(" "),r("tr",{key:"3",staticClass:"referal-orders-view__table-tr"},[r("td",{staticClass:"referal-orders-view__table-td"},[r("div",{staticClass:"referal-orders-view__table-img"},[r("img",{attrs:{src:e.referalProduct3}})]),e._v(" "),r("div",{staticClass:"referal-orders-view__table-title"},[e._v("\n                            Лосьон для волос Matrix Total Results Keep Me Vivid Color Velvetizer 100 мл\n                        ")])]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("3 шт")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[r("router-link",{attrs:{to:{name:"ReferalOrderDetails",params:{referalId:469}}}},[e._v("\n                            469\n                        ")])],1),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("Реферальная ссылка")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("16.08.19")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("2 789 ₽")]),e._v(" "),r("td",{staticClass:"referal-orders-view__table-td"},[e._v("278 ₽")])])])],1)]),e._v(" "),r("div",{staticClass:"referal-orders-view__controls"},[r("v-button",{staticClass:"btn--outline referal-orders-view__controls-btn"},[e._v("\n            Показать ещё\n        ")]),e._v(" "),r("v-pagination",{attrs:{"page-count":10},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1)])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("colgroup",[t("col",{attrs:{width:"40%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("thead",{staticClass:"referal-orders-view__table-head"},[r("tr",{staticClass:"referal-orders-view__table-tr referal-orders-view__table-tr--header"},[r("th",{staticClass:"referal-orders-view__table-th"},[e._v("Товар")]),e._v(" "),r("th",{staticClass:"referal-orders-view__table-th"},[e._v("Количество")]),e._v(" "),r("th",{staticClass:"referal-orders-view__table-th"},[e._v("ID реферала")]),e._v(" "),r("th",{staticClass:"referal-orders-view__table-th"},[e._v("Источник")]),e._v(" "),r("th",{staticClass:"referal-orders-view__table-th"},[e._v("Дата заказа")]),e._v(" "),r("th",{staticClass:"referal-orders-view__table-th"},[e._v("Сумма")]),e._v(" "),r("th",{staticClass:"referal-orders-view__table-th"},[e._v("Сумма вознаграждения")])])])}],!1,null,null,null);t.default=c.exports},TGsm:function(e,t,r){}}]);