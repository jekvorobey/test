(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{HT8i:function(t,e,s){"use strict";s.r(e);var o=s("NDiG"),a=s("7cXU"),i=s("nurM"),r=s("45Ux"),n=(s("Mii2"),s("eZRa"),s("Uh29"),{name:"promocodes",components:{VSvg:o.a,VLink:a.a,RadioSwitch:i.a,InfoRow:r.a},data:function(){var t=[{value:"active",title:"Действующие"},{value:"archive",title:"Архив"}];return{selectedStatus:t[0].value,promocodeStatus:t,promocodes:[{id:1,name:"SOKOLOV",startDate:"1.07.2019",endDate:"31.08.2019",discount:"5%",allow:"Все товары"},{id:2,name:"SOKOLOV777",startDate:"8.07.2019",endDate:"13.08.2019",discount:"10%",allow:[{id:1,name:"Товары для волос Aveda",items:["Шампуни","Кондиционеры","Маски"]}]}]}},computed:{isTabletLg:function(){return this.$mq.tabletLg}},watch:{},methods:{isString:function(t){return"string"==typeof t}},beforeRouteEnter:function(t,e,s){s()},beforeRouteUpdate:function(t,e,s){s()},beforeMount:function(){}}),l=s("KHd+"),c=Object(l.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"section promocodes-view"},[s("div",{staticClass:"container container--tablet-lg promocodes-view__header"},[s("h2",{staticClass:"promocodes-view__hl"},[t._v(t._s(t.$t("profile.routes."+t.$route.name)))]),t._v(" "),s("radio-switch",{staticClass:"promocodes-view__switch",attrs:{items:t.promocodeStatus,id:"promocode-switch","key-field":"value",name:"promocodeStatus"},model:{value:t.selectedStatus,callback:function(e){t.selectedStatus=e},expression:"selectedStatus"}})],1),t._v(" "),s("div",{staticClass:"container container--tablet-lg"},[t.isTabletLg?t._e():s("table",{staticClass:"promocodes-view__table"},[t._m(0),t._v(" "),t._m(1),t._v(" "),s("transition-group",{staticClass:"promocodes-view__table-body",attrs:{tag:"tbody",name:"fade-in",appear:""}},t._l(t.promocodes,(function(e){return s("tr",{key:e.id,staticClass:"promocodes-view__table-tr"},[s("td",{staticClass:"promocodes-view__table-td"},[t._v("\n                        "+t._s(e.name)+"  \n                        "),s("button",{staticClass:"promocodes-view__table-btn"},[s("v-svg",{attrs:{name:"copy",width:"16",height:"16"}})],1)]),t._v(" "),s("td",{staticClass:"promocodes-view__table-td"},[t._v(t._s(e.startDate)+" – "+t._s(e.endDate))]),t._v(" "),s("td",{staticClass:"promocodes-view__table-td"},[t._v(t._s(e.discount))]),t._v(" "),s("td",{staticClass:"promocodes-view__table-td"},[e.allow&&t.isString(e.allow)?[t._v("\n                            "+t._s(e.allow)+"\n                        ")]:e.allow&&Array.isArray(e.allow)?t._l(e.allow,(function(e){var o=e.name,a=e.items;return[t._v("\n                            "+t._s(o)+":\n                            "),t._l(a,(function(e){return s("div",{key:e},[t._v("- "+t._s(e))])}))]})):t._e()],2)])})),0)],1)]),t._v(" "),t.isTabletLg?s("ul",{staticClass:"promocodes-view__list"},t._l(t.promocodes,(function(e){return s("li",{key:e.id,staticClass:"container container--tablet-lg promocodes-view__list-item"},[s("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Промокод"}},[t._v("\n                "+t._s(e.name)+"  \n                "),s("button",{staticClass:"promocodes-view__table-btn"},[s("v-svg",{attrs:{name:"copy",width:"16",height:"16"}})],1)]),t._v(" "),s("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Срок действия"}},[t._v("\n                "+t._s(e.startDate)+" – "+t._s(e.endDate)+"\n            ")]),t._v(" "),s("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Скидка",value:e.discount}}),t._v(" "),s("info-row",{staticClass:"promocodes-view__list-item-row",attrs:{name:"Категория товаров"}},[e.allow&&t.isString(e.allow)?[t._v("\n                    "+t._s(e.allow)+"\n                ")]:e.allow&&Array.isArray(e.allow)?t._l(e.allow,(function(e){var o=e.name,a=e.items;return s("div",{key:o},[s("div",[t._v(t._s(o)+":")]),t._v(" "),t._l(a,(function(e){return s("div",{key:e},[t._v("- "+t._s(e))])}))],2)})):t._e()],2)],1)})),0):t._e()])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("colgroup",[e("col",{attrs:{width:"20%"}}),this._v(" "),e("col",{attrs:{width:"25%"}}),this._v(" "),e("col",{attrs:{width:"15%"}}),this._v(" "),e("col",{attrs:{width:"40%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",{staticClass:"promocodes-view__table-head"},[e("tr",{staticClass:"promocodes-view__table-tr promocodes-view__table-tr--header"},[e("th",{staticClass:"promocodes-view__table-th"},[this._v("Промокод")]),this._v(" "),e("th",{staticClass:"promocodes-view__table-th"},[this._v("Срок действия")]),this._v(" "),e("th",{staticClass:"promocodes-view__table-th"},[this._v("Скидка")]),this._v(" "),e("th",{staticClass:"promocodes-view__table-th"},[this._v("Категория товаров")])])])}],!1,null,null,null);e.default=c.exports},Uh29:function(t,e,s){}}]);