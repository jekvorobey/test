(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{LUyO:function(e,t,r){"use strict";r.r(t);var a=r("NDiG"),i=r("7cXU"),s=r("i2Ud"),n=r("KQVR"),o=r("YNzt"),d=r("45Ux"),c=r("PZpB"),l=r("XJM6"),u=r("jYNS"),v=r("4BeY"),_=r.n(v),m=r("IaFt"),p=r.n(m),f=new _.a({id:"icon-ticket",use:"icon-ticket-usage",viewBox:"0 0 16 16",content:'<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="icon-ticket">\r\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3.33335C0 2.96516 0.298477 2.66669 0.666667 2.66669H15.3333C15.7015 2.66669 16 2.96516 16 3.33335V6.66669C16 7.03488 15.7015 7.33335 15.3333 7.33335C14.9651 7.33335 14.6667 7.63183 14.6667 8.00002C14.6667 8.36821 14.9651 8.66669 15.3333 8.66669C15.7015 8.66669 16 8.96516 16 9.33335V12.6667C16 13.0349 15.7015 13.3334 15.3333 13.3334H0.666667C0.298477 13.3334 0 13.0349 0 12.6667L0 9.33335C0 8.96516 0.298477 8.66669 0.666667 8.66669C1.03486 8.66669 1.33333 8.36821 1.33333 8.00002C1.33333 7.63183 1.03486 7.33335 0.666667 7.33335C0.298477 7.33335 0 7.03488 0 6.66669L0 3.33335ZM1.33333 6.11382C2.11013 6.38838 2.66667 7.12921 2.66667 8.00002C2.66667 8.87083 2.11013 9.61166 1.33333 9.88622V12H9.33333V4.00002H1.33333V6.11382ZM14.6667 4.00002V6.11382C13.8899 6.38838 13.3333 7.12921 13.3333 8.00002C13.3333 8.87083 13.8899 9.61166 14.6667 9.88622V12H10.6667V4.00002H14.6667Z" />\r\n</symbol>'}),y=(p.a.add(f),r("gB8C"),r("kTJR"),{name:"order-masterclass-card",components:{VSvg:a.a,VLink:i.a,VPicture:u.a,Price:o.a},props:{name:{type:String,required:!0},type:{type:String,required:!0},note:{type:String},url:{type:String},downloadUrl:{type:String},image:{type:[String,Object]},date:{type:[String,Date]},author:{type:String},additions:{type:String},price:{type:Object},oldPrice:{type:Object},qty:{type:Number,default:1},qtyReturned:{type:Number,default:0},isComplete:{type:Boolean,default:!1},isSmall:{type:Boolean,default:!1}},computed:{isTablet:function(){return this.$mq.tablet}}}),h=r("KHd+"),w=Object(h.a)(y,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",{staticClass:"order-masterclass-card",class:[{"order-masterclass-card--small":e.isSmall},{"order-masterclass-card--returned":e.qty===e.qtyReturned}]},[r("router-link",{staticClass:"order-masterclass-card__img",attrs:{to:e.url}},[e.image?r("v-picture",[e._t("default")],2):r("v-svg",{attrs:{id:"order-masterclass-card-empty",name:"logo",width:"48",height:"48"}})],1),e._v(" "),r("div",{staticClass:"order-masterclass-card__body"},[r("v-link",{staticClass:"order-masterclass-card__body-name",attrs:{to:e.url}},[r("div",[e._v(e._s(e.name))]),e._v(" "),e.note?r("div",[e._v("("+e._s(e.note)+")")]):e._e()]),e._v(" "),r("div",{staticClass:"order-masterclass-card__body-download"},[!e.isComplete&&e.qtyReturned!==e.qty&&e.downloadUrl?r("v-link",{staticClass:"order-masterclass-card__body-download-link",attrs:{href:e.downloadUrl,download:""}},[r("v-svg",{attrs:{name:"ticket",width:"16",height:"16"}}),e._v(" \n                "),r("span",[e._v("Скачать")])],1):e._e(),e._v(" "),e.isComplete?r("div",[e._v("\n                Завершен\n            ")]):e.qtyReturned>0?r("div",[e.qtyReturned<e.qty?[e._v(" Оформлен возврат "+e._s(e.qtyReturned)+" шт. ")]:[e._v("\n                    Оформлен возврат\n                ")]],2):e._e()],1),e._v(" "),r("div",{staticClass:"order-masterclass-card__body-count"},[e._v(e._s(e.qty)+" шт.")]),e._v(" "),r("div",{staticClass:"order-masterclass-card__body-prices"},[r("price",e._b({staticClass:"text-bold order-masterclass-card__body-price"},"price",e.price,!1)),e._v(" "),r("price",e._b({directives:[{name:"show",rawName:"v-show",value:e.oldPrice,expression:"oldPrice"}],staticClass:"text-grey text-strike order-masterclass-card__body-price order-masterclass-card__body-price--old"},"price",e.oldPrice,!1))],1),e._v(" "),r("div",{staticClass:"text-grey text-sm order-masterclass-card__body-info"},[r("div",[e._v(e._s(e.additions))]),e._v(" "),r("div",[e._v(e._s(e.date)+", "+e._s(e.author))])])],1)],1)}),[],!1,null,null,null).exports,b=r("3eXy"),g=r("L2JU"),C=r("Q2AE"),k=r("rBTT"),P=r("JM0x"),O=r("5GyW"),j=r("4kxs"),D=r("8TZ/"),S=r("0CxO"),x=r("2JJK"),R=r("tCqp"),q=r("DpYB"),M=r("GyY8"),I=r("zVjp");function $(e,t,r,a){return t?e+function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:", ";return t?"".concat(e).concat(r):e}(t,r,a):e}var E,U=r("W6hq"),V=r("aXGN"),N=r("P1RU");r("PnIt"),r("SRJT");function T(e,t,r,a,i,s,n){try{var o=e[s](n),d=o.value}catch(e){return void r(e)}o.done?t(d):Promise.resolve(d).then(a,i)}function A(e){return function(){var t=this,r=arguments;return new Promise((function(a,i){var s=e.apply(t,r);function n(e){T(s,a,i,n,o,"next",e)}function o(e){T(s,a,i,n,o,"throw",e)}n(void 0)}))}}function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function J(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(Object(r),!0).forEach((function(t){L(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function L(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var H="".concat(k.NAME,"/").concat(O.c);function K(e,t,r,a){e[P.a]([{name:e.$t("profile.routes.Orders"),to:{name:"Orders"}},{name:e.$t("profile.format.order",{id:a}),to:{name:t,params:r}}])}var Y={name:"order-details",components:{VSvg:a.a,VLink:i.a,VButton:s.a,VInput:n.a,Price:o.a,InfoPanel:c.a,InfoRow:d.a,PackageProductCard:l.a,OrderMasterclassCard:w},data:function(){return{isDisabled:!1}},computed:J(J(J({},Object(g.d)([C.g])),Object(g.d)(H,(E={},L(E,O.d,(function(e){return e[O.f]&&e[O.f][O.d]||{}})),L(E,O.b,(function(e){return e[O.f]&&e[O.f][O.b]||[]})),L(E,O.j,(function(e){return e[O.f]&&e[O.f][O.j]||[]})),E))),{},{receiverEmail:function(){return(this[O.d]||{}).receiver_email},items:function(){var e=this,t=this[O.d]||{},r=t.id,a=t.payment_status;return(this[O.j]||[]).map((function(t){var i=new Date("".concat(t.nearestDate," ").concat(t.nearestTimeFrom)),s=i.toLocaleString(e[C.g],M.b),n=i.toLocaleString(e[C.g],M.d),o="".concat(s,", ").concat(n),d=Object(U.g)(t.code),c=a===q.c.PAID?Object(U.i)(r,t.basketItemId):null,l="Входной билет ".concat(t.ticketTypeName),u=t.speakers&&t.speakers[0],v=u&&"".concat(u.firstName," ").concat(u.lastName,", ").concat(u.profession),_=t.participants||[],m="Участники: ".concat(_.map((function(e){return"".concat(e.firstName," ").concat(e.lastName)})).join(", ")),p=t.image&&Object(V.c)(400,240,t.image.id),f=t.image&&{webp:Object(V.c)(400,240,t.image.id,x.fileExtension.image.WEBP),orig:Object(V.c)(400,240,t.image.id)},y=t.image&&{webp:Object(V.c)(425,320,t.image.id,x.fileExtension.image.WEBP),orig:Object(V.c)(425,320,t.image.id)};return J(J({},t),{},{note:l,author:v,additions:m,url:d,downloadUrl:c,dateTime:o,desktopImg:f,mobileImg:y,defaultImg:p})}))},canPay:function(){var e=this[O.d],t=e.payment_status,r=void 0===t?3:t,a=e.payments,i=void 0===a?[]:a;return r===q.c.NOT_PAID&&0!==i.length},orderStatusClass:function(){return Object(N.c)(this.order.status,this.order.canceled)},deliveryMethod:function(){var e=this[O.b];if(1===e.length){var t=e[0].delivery_method;return this.formatDeliveryMethod(t)}},deliveryMethodId:function(){var e=this[O.b];if(1===e.length)return e[0].delivery_method},deliveryDate:function(){var e=this[O.b];if(1===e.length){var t=e[0].delivery_at;return this.formatDate(t)}},deliveryAddress:function(){var e=this[O.b];if(1===e.length)return this.formatAddress(e[0])},deliveryPoint:function(){var e=this[O.b];if(1===e.length)return e[0].point},orderStatus:function(){var e=this[O.d].status;return this.$t("orderStatus.".concat(e))},backUrl:function(){return{name:"Orders"}},isTablet:function(){return this.$mq.tablet}}),methods:J(J(J(J({},Object(g.b)(k.NAME,[P.a])),Object(g.b)(H,[j.c,j.f,j.d,j.e])),Object(g.b)(D.c,[S.k])),{},{onContinuePayment:function(e){var t=this;return A(regeneratorRuntime.mark((function r(){var a,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a="".concat(document.location.origin,"/thank-you"),r.next=3,t[j.d]({id:e,backUrl:a});case 3:i=r.sent,document.location.href=i;case 5:case"end":return r.stop()}}),r)})))()},onRepeatOrder:function(e){var t=this;return A(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,t.isDisabled=!0,r.next=4,t[j.e](e);case 4:return r.next=6,t[S.k]();case 6:t.$router.push({path:"/cart"}),t.isDisabled=!1,r.next=13;break;case 10:r.prev=10,r.t0=r.catch(0),t.isDisabled=!1;case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},getDeliveryStatusClass:function(e){return Object(N.a)(e)},formatDeliveryStatus:function(e){return this.$t("deliveryStatus.".concat(e))},formatAddress:function(e){var t=e.delivery_address,r=e.point;return t&&function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.area,r=e.city,a=(e.flat,e.block),i=(e.floor,e.house),s=(e.porch,e.region),n=e.street,o="";return o=$(o,s),o=$(o,t),r!==s&&(o=$(o,r)),o=$(o,n),o=$(o,i,a||!1),o=$(o,a,!1)}(t)||r.address.address_string},formatDate:function(e){if("string"==typeof e)return new Date(e.split(" ")[0]).toLocaleDateString(this[C.g],I.b)},formatPackageCount:function(e){return this.$t("profile.format.packageCount",{n:e})},formatDeliveryMethod:function(e){return this.$t("deliveryMethod.".concat(e))}}),beforeRouteEnter:function(e,t,r){var a=e.fullPath,i=e.name,s=e.params,n=b.$store.state[k.NAME][O.c],o=n.loadPath,d=n.orderDetails;o===a?r((function(e){return K(e,i,s,d.order.number)})):(b.$progress.start(),b.$store.dispatch("".concat(H,"/").concat(j.c),s.orderId).then((function(e){var t=e.number;b.$store.dispatch("".concat(H,"/").concat(j.f),a),r((function(e){b.$progress.finish(),K(e,i,s,t)}))})).catch((function(e){return r((function(e){b.$progress.fail(),K(e,i,s)}))})))},beforeRouteUpdate:function(e,t,r){var a=this,i=e.name,s=e.params;this.$progress.start(),this[j.c](s.orderId).then((function(e){var t=e.number;a.$progress.finish(),K(a,i,s,t)})).catch((function(e){a.$progress.fail(),K(a,i,s)})),r()},beforeRouteLeave:function(e,t,r){this[P.a]([]),r()},beforeMount:function(){this.deliveryMethods=R.e}},Z=Object(h.a)(Y,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section order-details-view"},[r("div",{staticClass:"container container--tablet-lg"},[r("v-link",{staticClass:"order-details-view__back-link",attrs:{to:e.backUrl}},[r("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),e._v(" Назад ко всем\n            заказам\n        ")],1),e._v(" "),r("h2",{staticClass:"order-details-view__hl"},[e._v(e._s(e.$t("profile.format.order",{id:e.order.number})))]),e._v(" "),r("div",{staticClass:"order-details-view__details"},[r("div",{staticClass:"order-details-view__details-info"},[r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Сумма"}},[r("price",e._b({staticClass:"text-medium"},"price",e.order.price,!1))],1),e._v(" "),e.order.delivery_price?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Доставка"}},[r("price",e._b({staticClass:"text-medium"},"price",e.order.delivery_price,!1))],1):e._e(),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",class:e.orderStatusClass,attrs:{name:"Статус заказа",value:e.orderStatus}}),e._v(" "),e.deliveryMethod?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Способ доставки",value:e.deliveryMethod}}):e._e(),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Дата заказа",value:e.formatDate(e.order.created_at)}}),e._v(" "),e.deliveryDate?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Дата доставки",value:e.deliveryDate}}):e._e(),e._v(" "),e.deliveryPoint&&e.deliveryMethodId===e.deliveryMethods.PICKUP?[r("br"),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Наименование ПВЗ",value:e.deliveryPoint.name}}),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Телефон",value:e.deliveryPoint.phone}}),e._v(" "),e.deliveryPoint.schedule?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Время работы"}},e._l(e.deliveryPoint.schedule,(function(t,a){return r("div",{key:t.id},[e._v("\n                            "+e._s(t.title)+"\n                            "+e._s(t.time)),a!==e.deliveryPoint.schedule.length-1?[e._v(", ")]:e._e()],2)})),0):e._e()]:e._e(),e._v(" "),e.deliveryAddress?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Адрес доставки",value:e.deliveryAddress}}):e._e(),e._v(" "),e.receiverEmail?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Email",value:e.receiverEmail}}):e._e()],2),e._v(" "),r("div",{staticClass:"order-details-view__details-controls"},[e.canPay?e._l(e.order.payments,(function(t){return r("v-button",{key:t.id,staticClass:"order-details-view__details-controls-btn",attrs:{disabled:e.isDisabled},on:{click:function(r){return e.onContinuePayment(e.order.id,t.id)}}},[e._v("\n                        Оплатить заказ\n                    ")])})):e._e(),e._v(" "),r("v-button",{staticClass:"btn--outline order-details-view__details-controls-btn",attrs:{disabled:e.isDisabled},on:{click:function(t){return t.stopPropagation(),e.onRepeatOrder(e.order.id)}}},[e._v("\n                    Повторить заказ\n                ")])],2)])],1),e._v(" "),e._l(e.deliveries,(function(t){return r("info-panel",{key:t.number,staticClass:"order-details-view__panel",attrs:{header:"Доставка №"+t.number}},[r("div",{staticClass:"container container--tablet-lg"},[e.deliveries.length>1?[r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Способ доставки",value:e.formatDeliveryMethod(t.delivery_method)}}),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Дата доставки",value:e.formatDate(t.delivery_at)}}),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",class:e.getDeliveryStatusClass(t.status),attrs:{name:"Статус доставки",value:e.formatDeliveryStatus(t.status)}}),e._v(" "),t.point&&t.delivery_method===e.deliveryMethods.PICKUP?[r("br"),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Наименование ПВЗ",value:t.point.name}}),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Телефон",value:t.point.phone}}),e._v(" "),t.point.schedule?r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Время работы"}},e._l(t.point.schedule,(function(a,i){return r("div",{key:a.id},[e._v("\n                            "+e._s(a.title)+"\n                            "+e._s(a.time)),i!==t.point.schedule.length-1?[e._v(", ")]:e._e()],2)})),0):e._e()]:e._e(),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Адрес доставки",value:e.formatAddress(t)}})]:e._e(),e._v(" "),t.package_count?r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Количество коробок",value:e.formatPackageCount(t.package_count)}}):e._e(),e._v(" "),r("ul",{staticClass:"order-details-view__panel-list"},e._l(t.products,(function(e){return r("package-product-card",{key:e.id,staticClass:"order-details-view__panel-item",attrs:{name:e.name,image:e.image,price:e.price,"old-price":e.cost,count:e.qty}})})),1)],2)])})),e._v(" "),e.items&&e.items.length>0?r("info-panel",{staticClass:"order-details-view__panel",attrs:{header:"Билеты"}},[r("div",{staticClass:"container container--tablet-lg"},[r("ul",{staticClass:"order-details-view__panel-list"},e._l(e.items,(function(t){return r("order-masterclass-card",{key:t.id,staticClass:"order-details-view__panel-item",attrs:{type:"masterclass",name:t.name,note:t.note,image:t.image,price:t.price,"old-price":t.oldPrice,date:t.dateTime,author:t.author,additions:t.additions,qty:t.qty,"qty-returned":t.qtyReturned,"is-complete":t.isComplete,url:t.url,"download-url":t.downloadUrl,"is-small":e.isTablet}},[r("source",{attrs:{"data-srcset":t.desktopImg.webp,type:"image/webp"}}),e._v(" "),r("source",{attrs:{"data-srcset":t.desktopImg.orig}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})])})),1)])]):e._e()],2)}),[],!1,null,null,null);t.default=Z.exports},SRJT:function(e,t,r){},kTJR:function(e,t,r){}}]);