(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{"6JD8":function(t,s,e){},"9KOc":function(t,s,e){"use strict";e.r(s);var a=e("NDiG"),i=e("7cXU"),r=e("i2Ud"),_=e("KQVR"),v=e("WYKX"),l=(e("g0Ed"),e("6JD8"),{name:"orders",components:{VSvg:a.a,VLink:i.a,VButton:r.a,VInput:_.a,VArcCounter:v.a},data:function(){return{}},computed:{},watch:{},methods:{onOpenOrder:function(t){this.$router.push({name:"OrderDetails",params:{orderId:t}})}}}),d=e("KHd+"),o=Object(d.a)(l,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("section",{staticClass:"section orders-view"},[e("h2",{staticClass:"orders-view__hl"},[t._v(t._s(t.$t("profile.routes."+t.$route.name)))]),t._v(" "),e("div",{staticClass:"orders-view__panels"},[t._m(0),t._v(" "),e("div",{staticClass:"orders-view__panel"},[e("div",{staticClass:"orders-view__panel-item"},[e("div",{staticClass:"orders-view__panel-item-counter"},[e("v-arc-counter",{attrs:{stroke:"#BDBDBD",activeStroke:"#141116",text:"2",start:-120,end:120,activeWidth:16,strokeWidth:16,dashCount:10,activeCount:2}}),t._v(" "),t._m(1)],1),t._v(" "),e("div",{staticClass:"text-grey"},[t._v("Новых заказов")])]),t._v(" "),e("div",{staticClass:"orders-view__panel-item"},[e("div",{staticClass:"orders-view__panel-item-counter"},[e("v-arc-counter",{attrs:{stroke:"#BDBDBD",activeStroke:"#141116",text:"15 780 ₽",start:-120,end:120,activeWidth:16,strokeWidth:16,dashCount:10,activeCount:1}}),t._v(" "),t._m(2)],1),t._v(" "),e("div",{staticClass:"text-grey"},[t._v("Сумма моих заказов")])])])]),t._v(" "),e("table",{staticClass:"orders-view__table"},[t._m(3),t._v(" "),e("thead",{staticClass:"orders-view__table-head"},[e("tr",{staticClass:"orders-view__table-tr orders-view__table-tr--header"},[e("th",{staticClass:"orders-view__table-th"},[e("v-link",{staticClass:"orders-view__table-th-link",attrs:{tag:"button"}},[t._v("\n                        Номер заказа "),e("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)],1),t._v(" "),e("th",{staticClass:"orders-view__table-th"},[e("v-link",{staticClass:"orders-view__table-th-link",attrs:{tag:"button"}},[t._v("\n                        Дата заказа "),e("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)],1),t._v(" "),e("th",{staticClass:"orders-view__table-th"},[e("v-link",{staticClass:"orders-view__table-th-link",attrs:{tag:"button"}},[t._v("\n                        Дата доставки "),e("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)],1),t._v(" "),e("th",{staticClass:"orders-view__table-th"},[t._v("\n                    Сумма\n                ")]),t._v(" "),e("th",{staticClass:"orders-view__table-th"},[e("v-link",{staticClass:"orders-view__table-th-link",attrs:{tag:"button"}},[t._v("\n                        Статус заказа "),e("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)],1),t._v(" "),e("th",{staticClass:"orders-view__table-th"})])]),t._v(" "),e("transition-group",{staticClass:"orders-view__table-body",attrs:{tag:"tbody",name:"fade-in",appear:""}},[e("tr",{key:"1",staticClass:"orders-view__table-tr",on:{click:function(s){return t.onOpenOrder(124589524)}}},[e("td",{staticClass:"orders-view__table-td"},[t._v("124589524")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("18.08.2019")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("20.08.2019")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("15 780 ₽")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[e("v-button",{staticClass:"btn--outline",on:{click:function(t){t.stopPropagation()}}},[t._v("Оплатить")])],1),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[e("v-link",{staticClass:"orders-view__table-td-link",attrs:{tag:"button"},on:{click:function(t){t.stopPropagation()}}},[t._v("Отменить")])],1)]),t._v(" "),e("tr",{key:"2",staticClass:"orders-view__table-tr",on:{click:function(s){return t.onOpenOrder(454654545)}}},[e("td",{staticClass:"orders-view__table-td"},[t._v("454654545")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("27.07.2019")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("28.07.2019")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("12 788 ₽")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("Передан в доставку")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[e("v-link",{staticClass:"orders-view__table-td-link",attrs:{tag:"button"},on:{click:function(t){t.stopPropagation()}}},[t._v("Повторить")])],1)]),t._v(" "),e("tr",{key:"3",staticClass:"orders-view__table-tr",on:{click:function(s){return t.onOpenOrder(24823875)}}},[e("td",{staticClass:"orders-view__table-td"},[t._v("24823875")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("6.07.2019")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("8.07.2019")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("25 478 ₽")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("Доставлен")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[e("v-link",{staticClass:"orders-view__table-td-link",attrs:{tag:"button"},on:{click:function(t){t.stopPropagation()}}},[t._v("Повторить")])],1)]),t._v(" "),e("tr",{key:"4",staticClass:"orders-view__table-tr",on:{click:function(s){return t.onOpenOrder(123547899)}}},[e("td",{staticClass:"orders-view__table-td"},[t._v("123547899")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("6.07.2019")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("-")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("22 365 ₽")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[t._v("Отменён")]),t._v(" "),e("td",{staticClass:"orders-view__table-td"},[e("v-link",{staticClass:"orders-view__table-td-link",attrs:{tag:"button"},on:{click:function(t){t.stopPropagation()}}},[t._v("Повторить")])],1)])])],1)])}),[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"orders-view__panel"},[e("div",{staticClass:"orders-view__panel-item"},[e("div",{staticClass:"text-grey orders-view__panel-name"},[t._v("Ваш уровень")]),t._v(" "),e("div",{staticClass:"orders-view__panel-level"},[t._v("Золотой")])]),t._v(" "),e("div",{staticClass:"orders-view__panel-item"},[e("div",{staticClass:"text-grey orders-view__panel-name"},[t._v("Следующий уровень")]),t._v(" "),e("div",{staticClass:"text-grey orders-view__panel-level"},[t._v("Платиновый")])]),t._v(" "),e("a",{staticClass:"orders-view__panel-link"},[t._v("Подробнее о реферальной программе")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"text-grey orders-view__panel-item-label"},[s("span",[this._v("2")]),this._v(" "),s("span",[this._v("10")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"text-grey orders-view__panel-item-label"},[s("span",[this._v("0")]),this._v(" "),s("span",[this._v("300к")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("colgroup",[s("col",{attrs:{width:"20%"}}),this._v(" "),s("col",{attrs:{width:"15%"}}),this._v(" "),s("col",{attrs:{width:"20%"}}),this._v(" "),s("col",{attrs:{width:"15%"}}),this._v(" "),s("col",{attrs:{width:"15%"}}),this._v(" "),s("col",{attrs:{width:"15%"}})])}],!1,null,null,null);s.default=o.exports}}]);