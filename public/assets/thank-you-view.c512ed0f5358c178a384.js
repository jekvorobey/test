(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{X4eb:function(t,e,a){},"zP/w":function(t,e,a){"use strict";a.r(e);var n=a("i2Ud"),r=a("45Ux"),s=a("PZpB"),i=a("Z14j"),o=a("YlJd"),l=a("tH0B"),c=a("SRo2"),u=(a("AYSG"),a("QudU"),a("L2JU")),d=a("tCqp"),v=a("fhPv");a("X4eb");function _(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?_(Object(a),!0).forEach((function(e){h(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):_(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function h(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var y={name:"thank-you",components:{VButton:n.a,InfoRow:r.a,InfoPanel:s.a,AttentionPanel:i.a,MasterClassCard:o.a},data:function(){return{order:{id:1234567,user:{firstName:"Евгений",lastName:"Лукашин",phone:"+7 905 123-45-67",email:"lukashin@gmail.com"},delivery:{address:"ул. Юности, д. 12, кв. 88, г. Москва, Россия, 124482",deliveryMethod:d.e.DELIVERY,dates:["24 июня, понедельник, с 10:00 до 18:00","28 июня, пятница, с 10:00 до 18:00","2 июля, вторник, с 10:00 до 18:00"]}},masterClasses:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:l.a,price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:c.a,price:{value:6e3,currency:"RUB"}}]}},computed:p(p({},Object(u.d)("route",{type:function(t){return t.params.type}})),{},{items:function(){switch(this.type){case v.a.PRODUCT:return this.masterClasses;case v.a.MASTERCLASS:return this.products;default:return[]}},title:function(){switch(this.type){case v.a.PRODUCT:return"Заказ успешно оформлен";case v.a.MASTERCLASS:return"Билеты успешно оформлены";default:return"Заказ"}},isMasterClass:function(){return this.type===v.a.MASTERCLASS},isTabletLg:function(){return this.$mq.tabletLg},orderDelivery:function(){return this.$t("deliveryMethod.".concat(this.order.delivery.deliveryMethod))},fullUserInfo:function(){if(!this.order||!this.order.user)return"";var t=this.order.user,e=t.firstName,a=t.lastName,n=t.phone,r=t.email;return"".concat(e," ").concat(a,", ").concat(n,", ").concat(r)}}),methods:{}},f=a("KHd+"),m=Object(f.a)(y,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section thank-you-view"},[a("div",{staticClass:"container"},[a("h1",{staticClass:"thank-you-view__hl"},[t._v("\n            "+t._s(t.title)+"\n        ")])]),t._v(" "),a("div",{staticClass:"container thank-you-view__container"},[a("info-panel",{staticClass:"thank-you-view__panel",attrs:{header:"Информация о заказе"}},[a("div",{staticClass:"container container--tablet"},[t.isMasterClass?[a("ul",{staticClass:"thank-you-view__panel-list"},[a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Номер заказа",value:t.order.id}}),t._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Получатель",value:t.order.user.email}})],1),t._v(" "),a("attention-panel",{staticClass:"thank-you-view__panel-attention"},[t._v("\n                        Посмотреть информацию о дате и месте проведения мастер-классов можно в письме, отправленном\n                        на ваш email\n                    ")])]:a("ul",{staticClass:"thank-you-view__panel-list"},[a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Номер заказа",value:t.order.id}}),t._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Получатель",value:t.fullUserInfo}}),t._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Способ получения",value:t.orderDelivery}}),t._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Адрес доставки",value:t.order.delivery.address}}),t._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Даты доставки"}},[a("ul",t._l(t.order.delivery.dates,(function(e){return a("li",{key:e},[t._v("\n                                "+t._s(e)+"\n                            ")])})),0)])],1),t._v(" "),a("v-button",{staticClass:"thank-you-view__panel-btn",attrs:{to:"/"}},[t._v("На главную страницу")])],2)]),t._v(" "),t.items&&t.items.length>0?a("info-panel",{staticClass:"thank-you-view__panel",attrs:{header:"В корзине остались неоформленные позиции"}},[a("div",{staticClass:"container container--tablet"},[t.isMasterClass?t._e():a("ul",{staticClass:"thank-you-view__panel-list"},t._l(t.items,(function(e){return a("master-class-card",t._b({key:e.id,staticClass:"thank-you-view__panel-card"},"master-class-card",e,!1))})),1),t._v(" "),a("v-button",{staticClass:"thank-you-view__panel-btn"},[t._v("Оформить заказ")])],1)]):t._e()],1)])}),[],!1,null,null,null);e.default=m.exports}}]);