(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{LUyO:function(e,t,r){"use strict";r.r(t);var a,s=r("NDiG"),i=r("7cXU"),n=r("i2Ud"),o=r("YNzt"),d=r("45Ux"),c=r("PZpB"),l=r("XJM6"),u=r("jYNS"),v=r("4BeY"),_=r.n(v),m=r("IaFt"),p=r.n(m),f=new _.a({id:"icon-ticket",use:"icon-ticket-usage",viewBox:"0 0 16 16",content:'<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="icon-ticket">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3.33335C0 2.96516 0.298477 2.66669 0.666667 2.66669H15.3333C15.7015 2.66669 16 2.96516 16 3.33335V6.66669C16 7.03488 15.7015 7.33335 15.3333 7.33335C14.9651 7.33335 14.6667 7.63183 14.6667 8.00002C14.6667 8.36821 14.9651 8.66669 15.3333 8.66669C15.7015 8.66669 16 8.96516 16 9.33335V12.6667C16 13.0349 15.7015 13.3334 15.3333 13.3334H0.666667C0.298477 13.3334 0 13.0349 0 12.6667L0 9.33335C0 8.96516 0.298477 8.66669 0.666667 8.66669C1.03486 8.66669 1.33333 8.36821 1.33333 8.00002C1.33333 7.63183 1.03486 7.33335 0.666667 7.33335C0.298477 7.33335 0 7.03488 0 6.66669L0 3.33335ZM1.33333 6.11382C2.11013 6.38838 2.66667 7.12921 2.66667 8.00002C2.66667 8.87083 2.11013 9.61166 1.33333 9.88622V12H9.33333V4.00002H1.33333V6.11382ZM14.6667 4.00002V6.11382C13.8899 6.38838 13.3333 7.12921 13.3333 8.00002C13.3333 8.87083 13.8899 9.61166 14.6667 9.88622V12H10.6667V4.00002H14.6667Z" />\n</symbol>'}),y=(p.a.add(f),r("gB8C"),r("kTJR"),{name:"order-masterclass-card",components:{VSvg:s.a,VLink:i.a,VPicture:u.a,Price:o.a},props:{name:{type:String,required:!0},type:{type:String,required:!0},note:{type:String},url:{type:String},downloadUrl:{type:String},image:{type:[String,Object]},date:{type:[String,Date]},author:{type:String},additions:{type:String},price:{type:Object},oldPrice:{type:Object},qty:{type:Number,default:1},qtyReturned:{type:Number,default:0},isComplete:{type:Boolean,default:!1},isSmall:{type:Boolean,default:!1}},computed:{isTablet:function(){return this.$mq.tablet}}}),b=r("KHd+"),h=Object(b.a)(y,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",{staticClass:"order-masterclass-card",class:[{"order-masterclass-card--small":e.isSmall},{"order-masterclass-card--returned":e.qty===e.qtyReturned}]},[r("div",{staticClass:"order-masterclass-card__container"},[r("router-link",{staticClass:"order-masterclass-card__img",attrs:{to:e.url}},[e.image?r("v-picture",[e._t("default")],2):r("v-svg",{attrs:{id:"order-masterclass-card-empty",name:"logo",width:"48",height:"48"}})],1),e._v(" "),r("div",{staticClass:"order-masterclass-card__body"},[r("v-link",{staticClass:"order-masterclass-card__body-name",attrs:{to:e.url}},[r("div",[e._v(e._s(e.name))]),e._v(" "),e.note?r("div",[e._v("("+e._s(e.note)+")")]):e._e()]),e._v(" "),e.isSmall?e._e():[r("div",{staticClass:"order-masterclass-card__body-download"},[!e.isComplete&&e.qtyReturned!==e.qty&&e.downloadUrl?r("v-link",{staticClass:"order-masterclass-card__body-download-link",attrs:{href:e.downloadUrl,download:""}},[r("v-svg",{attrs:{name:"ticket",width:"16",height:"16"}}),e._v(" \n                        "),r("span",[e._v("Скачать")])],1):e._e(),e._v(" "),e.isComplete?r("div",[e._v("Завершен")]):e.qtyReturned>0?r("div",[e.qtyReturned<e.qty?[e._v(" Оформлен возврат "+e._s(e.qtyReturned)+" шт ")]:[e._v("Оформлен возврат")]],2):e._e()],1),e._v(" "),r("div",{staticClass:"order-masterclass-card__body-count"},[e._v(e._s(e.qty)+" шт")]),e._v(" "),r("div",{staticClass:"order-masterclass-card__body-prices"},[r("price",e._b({staticClass:"text-bold order-masterclass-card__body-price"},"price",e.price,!1)),e._v(" "),r("price",e._b({directives:[{name:"show",rawName:"v-show",value:e.oldPrice,expression:"oldPrice"}],staticClass:"text-grey text-strike order-masterclass-card__body-price order-masterclass-card__body-price--old"},"price",e.oldPrice,!1))],1)],e._v(" "),r("div",{staticClass:"text-grey text-sm order-masterclass-card__body-info"},[r("div",[e._v(e._s(e.additions))]),e._v(" "),r("div",[e._v(e._s(e.date)+", "+e._s(e.author))])])],2)],1),e._v(" "),e.isSmall||e.isTablet?r("div",{staticClass:"order-masterclass-card__bottom"},[r("div",{staticClass:"order-masterclass-card__body-download"},[!e.isComplete&&e.qtyReturned!==e.qty&&e.downloadUrl?r("v-link",{staticClass:"order-masterclass-card__body-download-link",attrs:{href:e.downloadUrl,download:""}},[r("v-svg",{attrs:{name:"ticket",width:"16",height:"16"}}),e._v(" \n                "),r("span",[e._v("Скачать")])],1):e._e(),e._v(" "),e.isComplete?r("div",[e._v("Завершен")]):e._e()],1),e._v(" "),r("div",{staticClass:"order-masterclass-card__bottom-info"},[r("div",{staticClass:"order-masterclass-card__body-count"},[e._v(e._s(e.qty)+" шт")]),e._v(" "),r("div",{staticClass:"order-masterclass-card__body-prices"},[r("price",e._b({staticClass:"text-bold order-masterclass-card__body-price"},"price",e.price,!1)),e._v(" "),r("price",e._b({directives:[{name:"show",rawName:"v-show",value:e.oldPrice,expression:"oldPrice"}],staticClass:"text-grey text-strike order-masterclass-card__body-price order-masterclass-card__body-price--old"},"price",e.oldPrice,!1))],1),e._v(" "),e.qtyReturned>0?r("div",{staticClass:"order-masterclass-card__body-return"},[e.qtyReturned<e.qty?[e._v(" Оформлен возврат "+e._s(e.qtyReturned)+" шт. ")]:[e._v("Оформлен возврат")]],2):e._e()])]):e._e()])}),[],!1,null,null,null).exports,w=r("3eXy"),g=r("L2JU"),C=r("Q2AE"),k=r("rBTT"),P=r("JM0x"),O=r("55Sm"),j=r("jDKC"),D=r("5GyW"),S=r("4kxs"),x=r("2JJK"),I=r("tCqp"),q=r("DpYB"),N=r("GyY8"),M=r("zVjp"),T=r("oEqv"),$=r("W6hq"),R=r("aXGN"),E=r("P1RU"),A=r("nfjx");r("PnIt"),r("SRJT");function U(e,t,r,a,s,i,n){try{var o=e[i](n),d=o.value}catch(e){return void r(e)}o.done?t(d):Promise.resolve(d).then(a,s)}function V(e){return function(){var t=this,r=arguments;return new Promise((function(a,s){var i=e.apply(t,r);function n(e){U(i,a,s,n,o,"next",e)}function o(e){U(i,a,s,n,o,"throw",e)}n(void 0)}))}}function L(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function B(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?L(Object(r),!0).forEach((function(t){J(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):L(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function J(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var H="".concat(k.NAME,"/").concat(D.d);function G(e,t,r,a){var s=e.$router.resolve({name:"Orders"}).href,i=e.$router.resolve({name:t,params:r}).href;e[P.a]([{name:e.$t("profile.routes.Orders"),to:s},{name:e.$t("profile.format.order",{id:a}),to:i}])}var K={name:"order-details",mixins:[A.a],components:{VSvg:s.a,VLink:i.a,VButton:n.a,Price:o.a,InfoPanel:c.a,InfoRow:d.a,PackageProductCard:l.a,OrderMasterclassCard:h},metaInfo:function(){return{title:this.pageTitle}},data:function(){return{isDisabled:!1}},computed:B(B(B({},Object(g.d)([C.g])),Object(g.d)(H,(a={},J(a,D.e,(function(e){return e[D.g]&&e[D.g][D.e]||{}})),J(a,D.b,(function(e){return e[D.g]&&e[D.g][D.b]||[]})),J(a,D.k,(function(e){return e[D.g]&&e[D.g][D.k]||[]})),a))),{},{receiverEmail:function(){return(this[D.e]||{}).receiver_email},deliveryItems:function(){var e=this;return(this[D.b]||[]).map((function(t){return B(B({},t),{},{method:e.formatDeliveryMethod(t.delivery_method),deliveryAt:e.formatDate(t.delivery_at),statusClass:e.getDeliveryStatusClass(t.status),status:e.formatDeliveryStatus(t.status),address:e.formatAddress(t),packageCount:e.formatPackageCount(t.package_count),products:t.products&&t.products.map(e.prepareProduct)})}))},ticketItems:function(){var e=this,t=this[D.e]||{},r=t.id,a=t.payment_status;return(this[D.k]||[]).map((function(t){var s=new Date("".concat(t.nearestDate," ").concat(t.nearestTimeFrom)),i=s.toLocaleString(e[C.g],N.b),n=s.toLocaleString(e[C.g],N.d),o="".concat(i,", ").concat(n),d=Object($.h)(t.code),c=a===q.c.PAID?Object($.m)(r,t.basketItemId):null,l=t.ticketTypeName,u=t.speakers&&t.speakers[0],v=u&&"".concat(u.firstName," ").concat(u.lastName,", ").concat(u.profession),_=t.participants||[],m="Участники: ".concat(_.map((function(e){return"".concat(e.firstName," ").concat(e.lastName)})).join(", ")),p=t.image&&Object(R.c)(400,240,t.image.id),f=t.image&&{webp:Object(R.c)(400,240,t.image.id,x.fileExtension.image.WEBP),orig:Object(R.c)(400,240,t.image.id)},y=t.image&&{webp:Object(R.c)(425,320,t.image.id,x.fileExtension.image.WEBP),orig:Object(R.c)(425,320,t.image.id)};return B(B({},t),{},{note:l,author:v,additions:m,url:d,downloadUrl:c,dateTime:o,desktopImg:f,mobileImg:y,defaultImg:p})}))},canPay:function(){var e=this[D.e]||{},t=e.payment_status,r=void 0===t?3:t,a=e.payments,s=void 0===a?[]:a;return r===q.c.NOT_PAID&&0!==s.length},orderStatusClass:function(){return Object(E.d)(this.order.status,this.order.canceled)},deliveryMethod:function(){var e=this[D.b]||[];if(1===e.length){var t=e[0].delivery_method;return this.formatDeliveryMethod(t)}return null},deliveryMethodId:function(){var e=this[D.b]||[];return 1===e.length?e[0].delivery_method:null},deliveryDate:function(){var e=this[D.b]||[];if(1===e.length){var t=e[0].delivery_at;return this.formatDate(t)}return null},deliveryAddress:function(){var e=this[D.b]||[];return e[0]&&this.formatAddress(e[0])},deliveryPoint:function(){var e=this[D.b]||[];return 1===e.length?e[0].point:null},createDate:function(){var e=(this[D.e]||{}).created_at;return this.formatDate(e)},orderStatus:function(){var e=(this[D.e]||{}).status;return this.$t("orderStatus.".concat(e))},pageTitle:function(){var e=(this[D.e]||{}).number;return this.$t("profile.format.order",{id:e||"000000"})},backUrl:function(){return{name:"Orders"}},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),methods:B(B(B(B({},Object(g.b)(k.NAME,[P.a])),Object(g.b)(H,[S.c,S.f,S.d,S.e])),Object(g.b)(O.b,[j.a])),{},{onContinuePayment:function(e){var t=this;return V(regeneratorRuntime.mark((function r(){var a,s,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,a=Object(E.a)(e),r.next=4,t[S.d]({orderId:e,backUrl:a});case 4:s=r.sent,i=s.url,window.history.replaceState(null,"",a),document.location.href=i,r.next=13;break;case 10:r.prev=10,r.t0=r.catch(0),alert("Ошибка при переходе на оплату");case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},onRepeatOrder:function(e){var t=this;return V(regeneratorRuntime.mark((function r(){var a,s,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a=e.id,s=e.can_repeat,i=e.has_bad_offers,s){r.next=3;break}return r.abrupt("return",t[j.a]({name:x.modalName.general.NOTIFICATION,open:!0,state:{title:"Уведомление",message:"Невозможно повторить заказ"}}));case 3:return i&&t[j.a]({name:x.modalName.general.NOTIFICATION,open:!0,state:{title:"Уведомление",message:"Невозможно оформить заказ на некоторые выбранные товары"}}),r.prev=4,t.isDisabled=!0,r.next=8,t[S.e](a);case 8:return r.next=10,t.$router.push({name:"Cart"});case 10:t.isDisabled=!1,r.next=16;break;case 13:r.prev=13,r.t0=r.catch(4),t.isDisabled=!1;case 16:case"end":return r.stop()}}),r,null,[[4,13]])})))()},getDeliveryStatusClass:function(e){return Object(E.b)(e)},formatDeliveryStatus:function(e){return this.$t("deliveryStatus.".concat(e))},formatAddress:function(e){var t=e.delivery_address,r=e.point;return t&&Object(T.a)(t)||r.address.address_string},formatDate:function(e){if("string"==typeof e)return new Date(e.split(" ")[0]).toLocaleDateString(this[C.g],M.b)},formatPackageCount:function(e){return this.$t("profile.format.packageCount",{n:e})},formatDeliveryMethod:function(e){return this.$t("deliveryMethod.".concat(e))},prepareProduct:function(e){var t=e.category_code,r=e.code,a=e.variantGroup,s=null;if(a){var i=a.characteristics,n=void 0===i?[]:i,o=a.combinations,d=(void 0===o?[]:o).find((function(e){return e.code===r})).props;s=Object.keys(d).map((function(e){var t=n.find((function(t){return t.code===e})),r=t.options,a=t.name,s=r.find((function(t){return t.value===d[e]}));return"".concat(a,": ").concat(s.name)}))}var c=s&&s.join(", ");return B(B({},e),{},{note:c,url:Object($.j)(t,r)})}}),beforeRouteEnter:function(e,t,r){function a(){if(w.$store.state[k.NAME]&&w.$store.state[k.NAME][D.d]){var t=e.fullPath,a=e.name,s=e.params,i=w.$store.state[k.NAME][D.d],n=i.loadPath,o=i.orderDetails;n===t?r((function(e){return G(e,a,s,o.order.number)})):(w.$progress.start(),w.$store.dispatch("".concat(H,"/").concat(S.c),s.orderId).then((function(e){var i=e.number;w.$store.dispatch("".concat(H,"/").concat(S.f),t),r((function(e){w.$progress.finish(),G(e,a,s,i)}))})).catch((function(){return r((function(e){w.$progress.fail(),G(e,a,s)}))})))}}w.$store.state[k.NAME]&&w.$store.state[k.NAME][D.d]?a():w.$store.watch((function(e){return e[k.NAME][D.d]}),(function(e){e&&a()}))},beforeRouteLeave:function(e,t,r){this[P.a]([]),r()},created:function(){this.deliveryMethods=I.f}},Y=Object(b.a)(K,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section order-details-view"},[r("div",{staticClass:"container container--tablet-lg"},[r("v-link",{staticClass:"order-details-view__back-link",attrs:{to:e.backUrl}},[r("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),e._v(" Назад ко всем\n            заказам\n        ")],1),e._v(" "),r("h2",{staticClass:"order-details-view__hl"},[e._v("\n            "+e._s(e.pageTitle)+"\n        ")]),e._v(" "),r("div",{staticClass:"order-details-view__details"},[r("div",{staticClass:"order-details-view__details-info"},[r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Сумма"}},[r("price",e._b({staticClass:"text-medium"},"price",e.order.price,!1))],1),e._v(" "),e.order.delivery_price?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Доставка"}},[r("price",e._b({staticClass:"text-medium"},"price",e.order.delivery_price,!1))],1):e._e(),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",class:e.orderStatusClass,attrs:{name:"Статус заказа",value:e.orderStatus}}),e._v(" "),e.deliveryMethod?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Способ доставки",value:e.deliveryMethod}}):e._e(),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Дата заказа",value:e.createDate}}),e._v(" "),e.deliveryDate?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Дата доставки",value:e.deliveryDate}}):e._e(),e._v(" "),e.deliveryPoint&&e.deliveryMethodId===e.deliveryMethods.PICKUP?[r("br"),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Наименование ПВЗ",value:e.deliveryPoint.name}}),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Телефон",value:e.deliveryPoint.phone}}),e._v(" "),e.deliveryPoint.schedule?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Время работы"}},e._l(e.deliveryPoint.schedule,(function(t,a){return r("div",{key:t.id},[e._v("\n                            "+e._s(t.title)+"\n                            "+e._s(t.time)),a!==e.deliveryPoint.schedule.length-1?[e._v(", ")]:e._e()],2)})),0):e._e()]:e._e(),e._v(" "),e.deliveryAddress?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Адрес доставки",value:e.deliveryAddress}}):e._e(),e._v(" "),e.receiverEmail?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Email",value:e.receiverEmail}}):e._e()],2),e._v(" "),r("div",{staticClass:"order-details-view__details-controls"},[e.canPay?e._l(e.order.payments,(function(t){return r("v-button",{key:t.id,staticClass:"order-details-view__details-controls-btn",attrs:{disabled:e.isDisabled},on:{click:function(r){return e.onContinuePayment(e.order.id,t.id)}}},[e._v("\n                        Оплатить заказ\n                    ")])})):e._e(),e._v(" "),r("v-button",{staticClass:"btn--outline order-details-view__details-controls-btn",attrs:{disabled:e.isDisabled},on:{click:function(t){return t.stopPropagation(),e.onRepeatOrder(e.order)}}},[e._v("\n                    Повторить заказ\n                ")])],2)])],1),e._v(" "),e._l(e.deliveryItems,(function(t){return r("info-panel",{key:t.number,staticClass:"order-details-view__panel",attrs:{header:"Доставка №"+t.number}},[r("div",{class:{"container container--tablet-lg":!e.isTablet}},[e.deliveries.length>1?[r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Способ доставки",value:t.method}}),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Дата доставки",value:t.deliveryAt}}),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",class:t.statusClass,attrs:{name:"Статус доставки",value:t.status}}),e._v(" "),t.point&&t.delivery_method===e.deliveryMethods.PICKUP?[r("br"),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Наименование ПВЗ",value:t.point.name}}),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Телефон",value:t.point.phone}}),e._v(" "),t.point.schedule?r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Время работы"}},e._l(t.point.schedule,(function(a,s){return r("div",{key:a.id},[e._v("\n                            "+e._s(a.title)+"\n                            "+e._s(a.time)),s!==t.point.schedule.length-1?[e._v(", ")]:e._e()],2)})),0):e._e()]:e._e()]:e._e(),e._v(" "),t.packageCount>0?r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Количество коробок",value:t.packageCount}}):e._e(),e._v(" "),r("ul",{staticClass:"order-details-view__panel-list"},e._l(t.products,(function(e){return r("package-product-card",{key:e.id,staticClass:"order-details-view__panel-item",attrs:{name:e.name,note:e.note,image:e.image,price:e.price,"old-price":e.cost,count:e.qty,href:e.url}})})),1)],2)])})),e._v(" "),e.ticketItems&&e.ticketItems.length>0?r("info-panel",{staticClass:"order-details-view__panel",attrs:{header:"Билеты"}},[r("div",{class:{"container container--tablet-lg":e.isTabletLg&&!e.isTablet}},[r("ul",{staticClass:"order-details-view__panel-list"},e._l(e.ticketItems,(function(t){return r("order-masterclass-card",{key:t.id,staticClass:"order-details-view__panel-item",attrs:{type:"masterclass",name:t.name,note:t.note,image:t.image,price:t.price,"old-price":t.oldPrice,date:t.dateTime,author:t.author,additions:t.additions,qty:t.qty,"qty-returned":t.qtyReturned,"is-complete":t.isComplete,url:t.url,"download-url":t.downloadUrl,"is-small":e.isTablet}},[r("source",{attrs:{"data-srcset":t.desktopImg.webp,type:"image/webp"}}),e._v(" "),r("source",{attrs:{"data-srcset":t.desktopImg.orig}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})])})),1)])]):e._e()],2)}),[],!1,null,null,null);t.default=Y.exports},SRJT:function(e,t,r){},kTJR:function(e,t,r){}}]);