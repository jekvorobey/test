(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"6JD8":function(t,s,a){},"9KOc":function(t,s,a){"use strict";a.r(s);var e=a("NDiG"),r=a("7cXU"),i=a("i2Ud"),_=a("KQVR"),o=a("4BeY"),l=a.n(o),d=a("IaFt"),v=a.n(d),n=new l.a({id:"icon-arrow-updown",use:"icon-arrow-updown-usage",viewBox:"0 0 16 16",content:'<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="icon-arrow-updown">\n   <path fill-rule="evenodd" clip-rule="evenodd" d="M3.43558 5.99387C3.70834 6.3056 4.18216 6.33718 4.49389 6.06442L8.00001 2.99657L11.5061 6.06442C11.8179 6.33718 12.2917 6.3056 12.5644 5.99387C12.8372 5.68214 12.8056 5.20832 12.4939 4.93556L8.49389 1.43556C8.21112 1.18813 7.7889 1.18813 7.50613 1.43556L3.50613 4.93556C3.1944 5.20832 3.16282 5.68214 3.43558 5.99387Z" />\n   <path fill-rule="evenodd" clip-rule="evenodd" d="M3.43558 10.0061C3.70834 9.6944 4.18216 9.66282 4.49389 9.93558L8.00001 13.0034L11.5061 9.93558C11.8179 9.66282 12.2917 9.6944 12.5644 10.0061C12.8372 10.3179 12.8056 10.7917 12.4939 11.0644L8.49389 14.5644C8.21112 14.8119 7.7889 14.8119 7.50613 14.5644L3.50613 11.0644C3.1944 10.7917 3.16282 10.3179 3.43558 10.0061Z" />\n</symbol>'}),c=(v.a.add(n),a("6JD8"),{name:"orders",components:{VSvg:e.a,VLink:r.a,VButton:i.a,VInput:_.a},data:function(){return{}},computed:{},watch:{},methods:{onOpenOrder:function(){this.$router.push({name:"OrderDetails",params:{orderId:"1"}})}}}),w=a("KHd+"),b=Object(w.a)(c,(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("section",{staticClass:"section orders-view"},[a("h2",{staticClass:"orders-view__hl"},[t._v(t._s(t.$t("profile.routes."+t.$route.name)))]),t._v(" "),a("table",{staticClass:"orders-view__table"},[t._m(0),t._v(" "),a("thead",{staticClass:"orders-view__table-head"},[a("tr",{staticClass:"orders-view__table-tr orders-view__table-tr--header"},[a("th",{staticClass:"orders-view__table-th"},[a("v-link",{staticClass:"orders-view__table-th-link",attrs:{tag:"button"}},[t._v("\n                        Номер заказа "),a("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)],1),t._v(" "),a("th",{staticClass:"orders-view__table-th"},[a("v-link",{staticClass:"orders-view__table-th-link",attrs:{tag:"button"}},[t._v("\n                        Дата заказа "),a("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)],1),t._v(" "),a("th",{staticClass:"orders-view__table-th"},[a("v-link",{staticClass:"orders-view__table-th-link",attrs:{tag:"button"}},[t._v("\n                        Дата доставки "),a("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)],1),t._v(" "),a("th",{staticClass:"orders-view__table-th"},[t._v("\n                    Сумма\n                ")]),t._v(" "),a("th",{staticClass:"orders-view__table-th"},[a("v-link",{staticClass:"orders-view__table-th-link",attrs:{tag:"button"}},[t._v("\n                        Статус заказа "),a("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)],1),t._v(" "),a("th",{staticClass:"orders-view__table-th"})])]),t._v(" "),a("transition-group",{staticClass:"orders-view__table-body",attrs:{tag:"tbody",name:"fade-in",appear:""}},[a("tr",{key:"1",staticClass:"orders-view__table-tr",on:{click:t.onOpenOrder}},[a("td",{staticClass:"orders-view__table-td"},[t._v("124589524")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("18.08.2019")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("20.08.2019")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("15 780 ₽")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[a("v-button",{staticClass:"btn--outline",on:{click:function(t){t.stopPropagation()}}},[t._v("Оплатить")])],1),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[a("v-link",{staticClass:"orders-view__table-td-link",attrs:{tag:"button"},on:{click:function(t){t.stopPropagation()}}},[t._v("Отменить")])],1)]),t._v(" "),a("tr",{key:"2",staticClass:"orders-view__table-tr",on:{click:function(s){return s.stopPropagation(),t.onOpenOrder(s)}}},[a("td",{staticClass:"orders-view__table-td"},[t._v("454654545")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("27.07.2019")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("28.07.2019")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("12 788 ₽")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("Передан в доставку")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[a("v-link",{staticClass:"orders-view__table-td-link",attrs:{tag:"button"},on:{click:function(t){t.stopPropagation()}}},[t._v("Повторить")])],1)]),t._v(" "),a("tr",{key:"3",staticClass:"orders-view__table-tr",on:{click:t.onOpenOrder}},[a("td",{staticClass:"orders-view__table-td"},[t._v("24823875")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("6.07.2019")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("8.07.2019")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("25 478 ₽")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("Доставлен")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[a("v-link",{staticClass:"orders-view__table-td-link",attrs:{tag:"button"},on:{click:function(t){t.stopPropagation()}}},[t._v("Повторить")])],1)]),t._v(" "),a("tr",{key:"4",staticClass:"orders-view__table-tr",on:{click:function(s){return s.stopPropagation(),t.onOpenOrder(s)}}},[a("td",{staticClass:"orders-view__table-td"},[t._v("123547899")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("6.07.2019")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("-")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("22 365 ₽")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[t._v("Отменён")]),t._v(" "),a("td",{staticClass:"orders-view__table-td"},[a("v-link",{staticClass:"orders-view__table-td-link",attrs:{tag:"button"},on:{click:function(t){t.stopPropagation()}}},[t._v("Повторить")])],1)])])],1)])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("colgroup",[s("col",{attrs:{width:"20%"}}),this._v(" "),s("col",{attrs:{width:"15%"}}),this._v(" "),s("col",{attrs:{width:"20%"}}),this._v(" "),s("col",{attrs:{width:"15%"}}),this._v(" "),s("col",{attrs:{width:"15%"}}),this._v(" "),s("col",{attrs:{width:"15%"}})])}],!1,null,null,null);s.default=b.exports}}]);