(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{X4eb:function(e,t,a){},"zP/w":function(e,t,a){"use strict";a.r(t);var n=a("i2Ud"),r=a("45Ux"),s=a("PZpB"),i=a("Z14j"),o=a("YlJd"),l=a("tH0B"),c=a("SRo2"),u=(a("AYSG"),a("QudU"),a("L2JU")),d=a("oxRU");a("X4eb");function v(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var _={name:"thank-you",components:{VButton:n.a,InfoRow:r.a,InfoPanel:s.a,AttentionPanel:i.a,MasterClassCard:o.a},data:function(){return{order:{id:1234567,user:{firstName:"Евгений",lastName:"Лукашин",phone:"+7 905 123-45-67",email:"lukashin@gmail.com"},delivery:{address:"ул. Юности, д. 12, кв. 88, г. Москва, Россия, 124482",deliveryMethod:d.receiveMethods.DELIVERY,dates:["24 июня, понедельник, с 10:00 до 18:00","28 июня, пятница, с 10:00 до 18:00","2 июля, вторник, с 10:00 до 18:00"]}},masterClasses:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:l.a,price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:c.a,price:{value:6e3,currency:"RUB"}}]}},computed:function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?v(Object(a),!0).forEach((function(t){p(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):v(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},Object(u.d)("route",{type:function(e){return e.params.type}}),{items:function(){switch(this.type){case d.cartItemTypes.PRODUCT:return this.masterClasses;case d.cartItemTypes.MASTERCLASS:return this.products;default:return[]}},title:function(){switch(this.type){case d.cartItemTypes.PRODUCT:return"Заказ успешно оформлен";case d.cartItemTypes.MASTERCLASS:return"Билеты успешно оформлены";default:return[]}},isMasterClass:function(){return this.type===d.cartItemTypes.MASTERCLASS},isTabletLg:function(){return this.$mq.tabletLg},orderDelivery:function(){return this.$t("deliveryMethod.".concat(this.order.delivery.deliveryMethod))},fullUserInfo:function(){if(!this.order||!this.order.user)return"";var e=this.order.user,t=e.firstName,a=e.lastName,n=e.phone,r=e.email;return"".concat(t," ").concat(a,", ").concat(n,", ").concat(r)}}),methods:{}},y=a("KHd+"),h=Object(y.a)(_,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"section thank-you-view"},[a("div",{staticClass:"container"},[a("h1",{staticClass:"thank-you-view__hl"},[e._v("\n            "+e._s(e.title)+"\n        ")])]),e._v(" "),a("div",{staticClass:"container thank-you-view__container"},[a("info-panel",{staticClass:"thank-you-view__panel",attrs:{header:"Информация о заказе"}},[a("div",{staticClass:"container container--tablet"},[e.isMasterClass?[a("ul",{staticClass:"thank-you-view__panel-list"},[a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Номер заказа",value:e.order.id}}),e._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Получатель",value:e.order.user.email}})],1),e._v(" "),a("attention-panel",{staticClass:"thank-you-view__panel-attention"},[e._v("\n                        Посмотреть информацию о дате и месте проведения мастер-классов можно в письме, отправленном\n                        на ваш email\n                    ")])]:a("ul",{staticClass:"thank-you-view__panel-list"},[a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Номер заказа",value:e.order.id}}),e._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Получатель",value:e.fullUserInfo}}),e._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Способ получения",value:e.orderDelivery}}),e._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Адрес доставки",value:e.order.delivery.address}}),e._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Даты доставки"}},[a("ul",e._l(e.order.delivery.dates,(function(t){return a("li",{key:t},[e._v("\n                                "+e._s(t)+"\n                            ")])})),0)])],1),e._v(" "),a("v-button",{staticClass:"thank-you-view__panel-btn",attrs:{to:"/"}},[e._v("На главную страницу")])],2)]),e._v(" "),e.items&&e.items.length>0?a("info-panel",{staticClass:"thank-you-view__panel",attrs:{header:"В корзине остались неоформленные позиции"}},[a("div",{staticClass:"container container--tablet"},[e.isMasterClass?e._e():a("ul",{staticClass:"thank-you-view__panel-list"},e._l(e.items,(function(t){return a("master-class-card",e._b({key:t.id,staticClass:"thank-you-view__panel-card"},"master-class-card",t,!1))})),1),e._v(" "),a("v-button",{staticClass:"thank-you-view__panel-btn"},[e._v("Оформить заказ")])],1)]):e._e()],1)])}),[],!1,null,null,null);t.default=h.exports}}]);