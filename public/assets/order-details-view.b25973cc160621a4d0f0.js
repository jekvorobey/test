(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{LUyO:function(e,t,r){"use strict";r.r(t);var a,s=r("NDiG"),i=r("7cXU"),n=r("i2Ud"),o=r("KQVR"),d=r("YNzt"),l=r("45Ux"),c=r("PZpB"),u=r("XJM6"),v=r("jYNS"),_=r("4BeY"),m=r.n(_),p=r("IaFt"),f=r.n(p),y=new m.a({id:"icon-ticket",use:"icon-ticket-usage",viewBox:"0 0 16 16",content:'<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="icon-ticket">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3.33335C0 2.96516 0.298477 2.66669 0.666667 2.66669H15.3333C15.7015 2.66669 16 2.96516 16 3.33335V6.66669C16 7.03488 15.7015 7.33335 15.3333 7.33335C14.9651 7.33335 14.6667 7.63183 14.6667 8.00002C14.6667 8.36821 14.9651 8.66669 15.3333 8.66669C15.7015 8.66669 16 8.96516 16 9.33335V12.6667C16 13.0349 15.7015 13.3334 15.3333 13.3334H0.666667C0.298477 13.3334 0 13.0349 0 12.6667L0 9.33335C0 8.96516 0.298477 8.66669 0.666667 8.66669C1.03486 8.66669 1.33333 8.36821 1.33333 8.00002C1.33333 7.63183 1.03486 7.33335 0.666667 7.33335C0.298477 7.33335 0 7.03488 0 6.66669L0 3.33335ZM1.33333 6.11382C2.11013 6.38838 2.66667 7.12921 2.66667 8.00002C2.66667 8.87083 2.11013 9.61166 1.33333 9.88622V12H9.33333V4.00002H1.33333V6.11382ZM14.6667 4.00002V6.11382C13.8899 6.38838 13.3333 7.12921 13.3333 8.00002C13.3333 8.87083 13.8899 9.61166 14.6667 9.88622V12H10.6667V4.00002H14.6667Z" />\n</symbol>'}),b=(f.a.add(y),r("gB8C"),r("kTJR"),{name:"order-masterclass-card",components:{VSvg:s.a,VLink:i.a,VPicture:v.a,Price:d.a},props:{name:{type:String,required:!0},type:{type:String,required:!0},note:{type:String},url:{type:String},downloadUrl:{type:String},image:{type:[String,Object]},date:{type:[String,Date]},author:{type:String},additions:{type:String},price:{type:Object},oldPrice:{type:Object},qty:{type:Number,default:1},qtyReturned:{type:Number,default:0},isComplete:{type:Boolean,default:!1},isSmall:{type:Boolean,default:!1}},computed:{isTablet:function(){return this.$mq.tablet}}}),h=r("KHd+"),w=Object(h.a)(b,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",{staticClass:"order-masterclass-card",class:[{"order-masterclass-card--small":e.isSmall},{"order-masterclass-card--returned":e.qty===e.qtyReturned}]},[r("div",{staticClass:"order-masterclass-card__container"},[r("router-link",{staticClass:"order-masterclass-card__img",attrs:{to:e.url}},[e.image?r("v-picture",[e._t("default")],2):r("v-svg",{attrs:{id:"order-masterclass-card-empty",name:"logo",width:"48",height:"48"}})],1),e._v(" "),r("div",{staticClass:"order-masterclass-card__body"},[r("v-link",{staticClass:"order-masterclass-card__body-name",attrs:{to:e.url}},[r("div",[e._v(e._s(e.name))]),e._v(" "),e.note?r("div",[e._v("("+e._s(e.note)+")")]):e._e()]),e._v(" "),e.isSmall?e._e():[r("div",{staticClass:"order-masterclass-card__body-download"},[!e.isComplete&&e.qtyReturned!==e.qty&&e.downloadUrl?r("v-link",{staticClass:"order-masterclass-card__body-download-link",attrs:{href:e.downloadUrl,download:""}},[r("v-svg",{attrs:{name:"ticket",width:"16",height:"16"}}),e._v(" \n                        "),r("span",[e._v("Скачать")])],1):e._e(),e._v(" "),e.isComplete?r("div",[e._v("\n                        Завершен\n                    ")]):e.qtyReturned>0?r("div",[e.qtyReturned<e.qty?[e._v(" Оформлен возврат "+e._s(e.qtyReturned)+" шт ")]:[e._v("\n                            Оформлен возврат\n                        ")]],2):e._e()],1),e._v(" "),r("div",{staticClass:"order-masterclass-card__body-count"},[e._v(e._s(e.qty)+" шт")]),e._v(" "),r("div",{staticClass:"order-masterclass-card__body-prices"},[r("price",e._b({staticClass:"text-bold order-masterclass-card__body-price"},"price",e.price,!1)),e._v(" "),r("price",e._b({directives:[{name:"show",rawName:"v-show",value:e.oldPrice,expression:"oldPrice"}],staticClass:"text-grey text-strike order-masterclass-card__body-price order-masterclass-card__body-price--old"},"price",e.oldPrice,!1))],1)],e._v(" "),r("div",{staticClass:"text-grey text-sm order-masterclass-card__body-info"},[r("div",[e._v(e._s(e.additions))]),e._v(" "),r("div",[e._v(e._s(e.date)+", "+e._s(e.author))])])],2)],1),e._v(" "),e.isSmall||e.isTablet?r("div",{staticClass:"order-masterclass-card__bottom"},[r("div",{staticClass:"order-masterclass-card__body-download"},[!e.isComplete&&e.qtyReturned!==e.qty&&e.downloadUrl?r("v-link",{staticClass:"order-masterclass-card__body-download-link",attrs:{href:e.downloadUrl,download:""}},[r("v-svg",{attrs:{name:"ticket",width:"16",height:"16"}}),e._v(" \n                "),r("span",[e._v("Скачать")])],1):e._e(),e._v(" "),e.isComplete?r("div",[e._v("\n                Завершен\n            ")]):e._e()],1),e._v(" "),r("div",{staticClass:"order-masterclass-card__bottom-info"},[r("div",{staticClass:"order-masterclass-card__body-count"},[e._v(e._s(e.qty)+" шт")]),e._v(" "),r("div",{staticClass:"order-masterclass-card__body-prices"},[r("price",e._b({staticClass:"text-bold order-masterclass-card__body-price"},"price",e.price,!1)),e._v(" "),r("price",e._b({directives:[{name:"show",rawName:"v-show",value:e.oldPrice,expression:"oldPrice"}],staticClass:"text-grey text-strike order-masterclass-card__body-price order-masterclass-card__body-price--old"},"price",e.oldPrice,!1))],1),e._v(" "),e.qtyReturned>0?r("div",{staticClass:"order-masterclass-card__body-return"},[e.qtyReturned<e.qty?[e._v(" Оформлен возврат "+e._s(e.qtyReturned)+" шт. ")]:[e._v("\n                    Оформлен возврат\n                ")]],2):e._e()])]):e._e()])}),[],!1,null,null,null).exports,g=r("3eXy"),C=r("L2JU"),k=r("Q2AE"),O=r("rBTT"),P=r("JM0x"),j=r("55Sm"),D=r("jDKC"),I=r("5GyW"),S=r("4kxs"),x=r("2JJK"),q=r("tCqp"),R=r("DpYB"),T=r("GyY8"),N=r("zVjp"),M=r("oEqv"),$=r("W6hq"),E=r("aXGN"),U=r("P1RU"),V=r("nfjx");r("PnIt"),r("SRJT");function A(e,t,r,a,s,i,n){try{var o=e[i](n),d=o.value}catch(e){return void r(e)}o.done?t(d):Promise.resolve(d).then(a,s)}function L(e){return function(){var t=this,r=arguments;return new Promise((function(a,s){var i=e.apply(t,r);function n(e){A(i,a,s,n,o,"next",e)}function o(e){A(i,a,s,n,o,"throw",e)}n(void 0)}))}}function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function J(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(Object(r),!0).forEach((function(t){H(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function H(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var K="".concat(O.NAME,"/").concat(I.d);function Y(e,t,r,a){var s=e.$router.resolve({name:"Orders"}).href,i=e.$router.resolve({name:t,params:r}).href;e[P.a]([{name:e.$t("profile.routes.Orders"),to:s},{name:e.$t("profile.format.order",{id:a}),to:i}])}var F={name:"order-details",mixins:[V.a],components:{VSvg:s.a,VLink:i.a,VButton:n.a,VInput:o.a,Price:d.a,InfoPanel:c.a,InfoRow:l.a,PackageProductCard:u.a,OrderMasterclassCard:w},metaInfo:function(){return{title:this.pageTitle}},data:function(){return{isDisabled:!1}},computed:J(J(J({},Object(C.d)([k.g])),Object(C.d)(K,(a={},H(a,I.e,(function(e){return e[I.g]&&e[I.g][I.e]||{}})),H(a,I.b,(function(e){return e[I.g]&&e[I.g][I.b]||[]})),H(a,I.k,(function(e){return e[I.g]&&e[I.g][I.k]||[]})),a))),{},{receiverEmail:function(){return(this[I.e]||{}).receiver_email},deliveryItems:function(){var e=this,t=this[I.e]||{};t.id,t.payment_status;return(this[I.b]||[]).map((function(t){return J(J({},t),{},{method:e.formatDeliveryMethod(t.delivery_method),deliveryAt:e.formatDate(t.delivery_at),statusClass:e.getDeliveryStatusClass(t.status),status:e.formatDeliveryStatus(t.status),address:e.formatAddress(t),packageCount:e.formatPackageCount(t.package_count),products:t.products&&t.products.map((function(e){return J(J({},e),{},{url:Object($.j)(e.category_code,e.code)})}))})}))},ticketItems:function(){var e=this,t=this[I.e]||{},r=t.id,a=t.payment_status;return(this[I.k]||[]).map((function(t){var s=new Date("".concat(t.nearestDate," ").concat(t.nearestTimeFrom)),i=s.toLocaleString(e[k.g],T.b),n=s.toLocaleString(e[k.g],T.d),o="".concat(i,", ").concat(n),d=Object($.h)(t.code),l=a===R.c.PAID?Object($.m)(r,t.basketItemId):null,c=t.ticketTypeName,u=t.speakers&&t.speakers[0],v=u&&"".concat(u.firstName," ").concat(u.lastName,", ").concat(u.profession),_=t.participants||[],m="Участники: ".concat(_.map((function(e){return"".concat(e.firstName," ").concat(e.lastName)})).join(", ")),p=t.image&&Object(E.c)(400,240,t.image.id),f=t.image&&{webp:Object(E.c)(400,240,t.image.id,x.fileExtension.image.WEBP),orig:Object(E.c)(400,240,t.image.id)},y=t.image&&{webp:Object(E.c)(425,320,t.image.id,x.fileExtension.image.WEBP),orig:Object(E.c)(425,320,t.image.id)};return J(J({},t),{},{note:c,author:v,additions:m,url:d,downloadUrl:l,dateTime:o,desktopImg:f,mobileImg:y,defaultImg:p})}))},canPay:function(){var e=this[I.e]||{},t=e.payment_status,r=void 0===t?3:t,a=e.payments,s=void 0===a?[]:a;return r===R.c.NOT_PAID&&0!==s.length},orderStatusClass:function(){return Object(U.d)(this.order.status,this.order.canceled)},deliveryMethod:function(){var e=this[I.b]||[];if(1===e.length){var t=e[0].delivery_method;return this.formatDeliveryMethod(t)}},deliveryMethodId:function(){var e=this[I.b]||[];if(1===e.length)return e[0].delivery_method},deliveryDate:function(){var e=this[I.b]||[];if(1===e.length){var t=e[0].delivery_at;return this.formatDate(t)}},deliveryAddress:function(){var e=this[I.b]||[];return e[0]&&this.formatAddress(e[0])},deliveryPoint:function(){var e=this[I.b]||[];if(1===e.length)return e[0].point},createDate:function(){var e=(this[I.e]||{}).created_at;return this.formatDate(e)},orderStatus:function(){var e=(this[I.e]||{}).status;return this.$t("orderStatus.".concat(e))},pageTitle:function(){var e=(this[I.e]||{}).number;return this.$t("profile.format.order",{id:e||"000000"})},backUrl:function(){return{name:"Orders"}},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),methods:J(J(J(J({},Object(C.b)(O.NAME,[P.a])),Object(C.b)(K,[S.c,S.f,S.d,S.e])),Object(C.b)(j.b,[D.a])),{},{onContinuePayment:function(e){var t=this;return L(regeneratorRuntime.mark((function r(){var a,s,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,a=Object(U.a)(e),r.next=4,t[S.d]({orderId:e,paymentId:paymentId,backUrl:a});case 4:s=r.sent,i=s.url,window.history.replaceState(null,"",a),document.location.href=i,r.next=13;break;case 10:r.prev=10,r.t0=r.catch(0),alert("Ошибка при переходе на оплату");case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},onRepeatOrder:function(e){var t=this;return L(regeneratorRuntime.mark((function r(){var a,s,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a=e.id,s=e.can_repeat,i=e.has_bad_offers,s){r.next=3;break}return r.abrupt("return",t[D.a]({name:x.modalName.general.NOTIFICATION,open:!0,state:{title:"Уведомление",message:"Невозможно повторить заказ"}}));case 3:return i&&t[D.a]({name:x.modalName.general.NOTIFICATION,open:!0,state:{title:"Уведомление",message:"Невозможно оформить заказ на некоторые выбранные товары"}}),r.prev=4,t.isDisabled=!0,r.next=8,t[S.e](a);case 8:return r.next=10,t.$router.push({name:"Cart"});case 10:t.isDisabled=!1,r.next=16;break;case 13:r.prev=13,r.t0=r.catch(4),t.isDisabled=!1;case 16:case"end":return r.stop()}}),r,null,[[4,13]])})))()},getDeliveryStatusClass:function(e){return Object(U.b)(e)},formatDeliveryStatus:function(e){return this.$t("deliveryStatus.".concat(e))},formatAddress:function(e){var t=e.delivery_address,r=e.point;return t&&Object(M.a)(t)||r.address.address_string},formatDate:function(e){if("string"==typeof e)return new Date(e.split(" ")[0]).toLocaleDateString(this[k.g],N.b)},formatPackageCount:function(e){return this.$t("profile.format.packageCount",{n:e})},formatDeliveryMethod:function(e){return this.$t("deliveryMethod.".concat(e))}}),beforeRouteEnter:function(e,t,r){var a=e.fullPath,s=e.name,i=e.params,n=g.$store.state[O.NAME][I.d],o=n.loadPath,d=n.orderDetails;o===a?r((function(e){return Y(e,s,i,d.order.number)})):(g.$progress.start(),g.$store.dispatch("".concat(K,"/").concat(S.c),i.orderId).then((function(e){var t=e.number;g.$store.dispatch("".concat(K,"/").concat(S.f),a),r((function(e){g.$progress.finish(),Y(e,s,i,t)}))})).catch((function(e){return r((function(e){g.$progress.fail(),Y(e,s,i)}))})))},beforeRouteLeave:function(e,t,r){this[P.a]([]),r()},created:function(){this.deliveryMethods=q.f}},G=Object(h.a)(F,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section order-details-view"},[r("div",{staticClass:"container container--tablet-lg"},[r("v-link",{staticClass:"order-details-view__back-link",attrs:{to:e.backUrl}},[r("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),e._v(" Назад ко всем\n            заказам\n        ")],1),e._v(" "),r("h2",{staticClass:"order-details-view__hl"},[e._v("\n            "+e._s(e.pageTitle)+"\n        ")]),e._v(" "),r("div",{staticClass:"order-details-view__details"},[r("div",{staticClass:"order-details-view__details-info"},[r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Сумма"}},[r("price",e._b({staticClass:"text-medium"},"price",e.order.price,!1))],1),e._v(" "),e.order.delivery_price?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Доставка"}},[r("price",e._b({staticClass:"text-medium"},"price",e.order.delivery_price,!1))],1):e._e(),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",class:e.orderStatusClass,attrs:{name:"Статус заказа",value:e.orderStatus}}),e._v(" "),e.deliveryMethod?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Способ доставки",value:e.deliveryMethod}}):e._e(),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Дата заказа",value:e.createDate}}),e._v(" "),e.deliveryDate?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Дата доставки",value:e.deliveryDate}}):e._e(),e._v(" "),e.deliveryPoint&&e.deliveryMethodId===e.deliveryMethods.PICKUP?[r("br"),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Наименование ПВЗ",value:e.deliveryPoint.name}}),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Телефон",value:e.deliveryPoint.phone}}),e._v(" "),e.deliveryPoint.schedule?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Время работы"}},e._l(e.deliveryPoint.schedule,(function(t,a){return r("div",{key:t.id},[e._v("\n                            "+e._s(t.title)+"\n                            "+e._s(t.time)),a!==e.deliveryPoint.schedule.length-1?[e._v(", ")]:e._e()],2)})),0):e._e()]:e._e(),e._v(" "),e.deliveryAddress?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Адрес доставки",value:e.deliveryAddress}}):e._e(),e._v(" "),e.receiverEmail?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Email",value:e.receiverEmail}}):e._e()],2),e._v(" "),r("div",{staticClass:"order-details-view__details-controls"},[e.canPay?e._l(e.order.payments,(function(t){return r("v-button",{key:t.id,staticClass:"order-details-view__details-controls-btn",attrs:{disabled:e.isDisabled},on:{click:function(r){return e.onContinuePayment(e.order.id,t.id)}}},[e._v("\n                        Оплатить заказ\n                    ")])})):e._e(),e._v(" "),r("v-button",{staticClass:"btn--outline order-details-view__details-controls-btn",attrs:{disabled:e.isDisabled},on:{click:function(t){return t.stopPropagation(),e.onRepeatOrder(e.order)}}},[e._v("\n                    Повторить заказ\n                ")])],2)])],1),e._v(" "),e._l(e.deliveryItems,(function(t){return r("info-panel",{key:t.number,staticClass:"order-details-view__panel",attrs:{header:"Доставка №"+t.number}},[r("div",{staticClass:"container container--tablet-lg"},[e.deliveries.length>1?[r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Способ доставки",value:t.method}}),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Дата доставки",value:t.deliveryAt}}),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",class:t.statusClass,attrs:{name:"Статус доставки",value:t.status}}),e._v(" "),t.point&&t.delivery_method===e.deliveryMethods.PICKUP?[r("br"),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Наименование ПВЗ",value:t.point.name}}),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Телефон",value:t.point.phone}}),e._v(" "),t.point.schedule?r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Время работы"}},e._l(t.point.schedule,(function(a,s){return r("div",{key:a.id},[e._v("\n                            "+e._s(a.title)+"\n                            "+e._s(a.time)),s!==t.point.schedule.length-1?[e._v(", ")]:e._e()],2)})),0):e._e()]:e._e()]:e._e(),e._v(" "),t.packageCount>0?r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Количество коробок",value:t.packageCount}}):e._e(),e._v(" "),r("ul",{staticClass:"order-details-view__panel-list"},e._l(t.products,(function(e){return r("package-product-card",{key:e.id,staticClass:"order-details-view__panel-item",attrs:{name:e.name,image:e.image,price:e.price,"old-price":e.cost,count:e.qty,href:e.url}})})),1)],2)])})),e._v(" "),e.ticketItems&&e.ticketItems.length>0?r("info-panel",{staticClass:"order-details-view__panel",attrs:{header:"Билеты"}},[r("div",{class:{"container container--tablet-lg":e.isTabletLg&&!e.isTablet}},[r("ul",{staticClass:"order-details-view__panel-list"},e._l(e.ticketItems,(function(t){return r("order-masterclass-card",{key:t.id,staticClass:"order-details-view__panel-item",attrs:{type:"masterclass",name:t.name,note:t.note,image:t.image,price:t.price,"old-price":t.oldPrice,date:t.dateTime,author:t.author,additions:t.additions,qty:t.qty,"qty-returned":t.qtyReturned,"is-complete":t.isComplete,url:t.url,"download-url":t.downloadUrl,"is-small":e.isTablet}},[r("source",{attrs:{"data-srcset":t.desktopImg.webp,type:"image/webp"}}),e._v(" "),r("source",{attrs:{"data-srcset":t.desktopImg.orig}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})])})),1)])]):e._e()],2)}),[],!1,null,null,null);t.default=G.exports},SRJT:function(e,t,r){},kTJR:function(e,t,r){}}]);