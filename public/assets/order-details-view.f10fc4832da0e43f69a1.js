(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{LUyO:function(t,e,r){"use strict";r.r(e);var a=r("NDiG"),n=r("7cXU"),i=r("i2Ud"),o=r("KQVR"),s=r("YNzt"),c=r("45Ux"),d=r("PZpB"),l=r("jYNS"),u=r("aXGN"),v=(r("wOvY"),{name:"package-product-card",components:{VSvg:a.a,VLink:n.a,VPicture:l.a,Price:s.a},props:{name:{type:String,required:!0},href:{type:String,default:"/"},image:{type:[String,Object]},price:{type:Object},oldPrice:{type:Object},count:{type:[String,Number],default:1}},computed:{quantity:function(){return Number(this.count)}},methods:{generateSourcePath:function(t,e,r,a){return Object(u.c)(t,e,r,a)}}}),f=r("KHd+"),p=Object(f.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"package-product-card"},[r("router-link",{staticClass:"package-product-card__img",attrs:{to:t.href}},[t.image?r("v-picture",{attrs:{image:t.image,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var a=e.image;return[r("source",{attrs:{"data-srcset":t.generateSourcePath(64,64,a.id,"webp"),type:"image/webp"}})]}},{key:"fallback",fn:function(e){var a=e.image,n=e.alt;return[r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(64,64,a.id),alt:n}})]}}],null,!1,2109703504)}):r("v-svg",{attrs:{id:"package-product-card-empty",name:"logo",width:"48",height:"48"}})],1),t._v(" "),r("div",{staticClass:"package-product-card__body"},[r("v-link",{staticClass:"package-product-card__body-name",attrs:{to:t.href}},[t._v(t._s(t.name))]),t._v(" "),r("div",{staticClass:"package-product-card__body-count"},[t._v(t._s(t.quantity)+" шт")]),t._v(" "),r("div",{staticClass:"package-product-card__body-prices"},[r("price",t._b({staticClass:"text-bold package-product-card__body-price"},"price",t.price,!1)),t._v(" "),t.oldPrice?r("price",t._b({staticClass:"text-grey text-strike package-product-card__body-price--old"},"price",t.oldPrice,!1)):t._e()],1)],1)],1)}),[],!1,null,null,null).exports,_=r("3eXy"),m=r("L2JU"),b=r("Q2AE"),h=r("rBTT"),g=r("JM0x"),y=r("5GyW"),w=r("4kxs");function C(t,e,r,a){return e?t+function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:", ";return e?"".concat(t).concat(r):t}(e,r,a):t}var k,O=r("P1RU"),P=r("DpYB"),j=r("zVjp");r("PnIt"),r("SRJT"),r.p,r.p,r.p,r.p;function S(t,e,r,a,n,i,o){try{var s=t[i](o),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(a,n)}function D(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function $(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?D(Object(r),!0).forEach((function(e){x(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function x(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var U="".concat(h.b,"/").concat(y.c);function R(t,e,r,a){t[g.c]([{name:t.$t("profile.routes.Orders"),to:{name:"Orders"}},{name:t.$t("profile.format.order",{id:a}),to:{name:e,params:r}}])}var V={name:"order-details",components:{VSvg:a.a,VLink:n.a,VButton:i.a,VInput:o.a,Price:s.a,InfoPanel:d.a,InfoRow:c.a,PackageProductCard:p},computed:$({},Object(m.d)([b.f]),{},Object(m.d)(U,(k={},x(k,y.d,(function(t){return t[y.f][y.d]||{}})),x(k,y.b,(function(t){return t[y.f][y.b]||[]})),k)),{canPay:function(){var t=this[y.d],e=t.payment_status,r=void 0===e?3:e,a=t.payments,n=void 0===a?[]:a;return r===P.b.NOT_PAID&&0!==n.length},orderStatusClass:function(){return Object(O.b)(this.order.status,this.order.canceled)},deliveryMethod:function(){var t=this[y.b];if(1===t.length){var e=t[0].delivery_method;return this.formatDeliveryMethod(e)}},deliveryDate:function(){var t=this[y.b];if(1===t.length){var e=t[0].delivery_at;return this.formatDate(e)}},deliveryAddress:function(){var t=this[y.b];if(1===t.length)return this.formatAddress(t[0])},orderStatus:function(){var t=this[y.d].status;return this.$t("orderStatus.".concat(t))},backUrl:function(){return{name:"Orders"}}}),methods:$({},Object(m.b)(h.b,[g.c]),{},Object(m.b)(U,[w.b,w.d,w.c]),{onContinuePayment:function(t){var e,r=this;return(e=regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat(document.location.origin,"/thank-you"),e.next=3,r[w.c]({id:t,backUrl:a});case 3:n=e.sent,document.location.href=n;case 5:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(a,n){var i=e.apply(t,r);function o(t){S(i,a,n,o,s,"next",t)}function s(t){S(i,a,n,o,s,"throw",t)}o(void 0)}))})()},getDeliveryStatusClass:function(t){return Object(O.a)(t)},formatDeliveryStatus:function(t){return this.$t("deliveryStatus.".concat(t))},formatAddress:function(t){var e=t.delivery_address,r=t.point_address;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.area,r=t.city,a=(t.flat,t.block),n=(t.floor,t.house),i=(t.porch,t.region),o=t.street,s="";return s=C(s,i),s=C(s,e),s=C(s,r),s=C(s,o),s=C(s,n,a),s=C(s,a,!1)}(e||r)},formatDate:function(t){if("string"==typeof t)return new Date(t.split(" ")[0]).toLocaleDateString(this[b.f],j.b)},formatPackageCount:function(t){return this.$t("profile.format.packageCount",{n:t})},formatDeliveryMethod:function(t){return this.$t("deliveryMethod.".concat(t))}}),beforeRouteEnter:function(t,e,r){var a=t.fullPath,n=t.name,i=t.params,o=_.$store.state[h.b][y.c],s=o.loadPath,c=o.orderDetails;s===a?r((function(t){return R(t,n,i,c.order.number)})):(_.$progress.start(),_.$store.dispatch("".concat(U,"/").concat(w.b),i.orderId).then((function(t){var e=t.number;_.$store.dispatch("".concat(U,"/").concat(w.d),a),r((function(t){_.$progress.finish(),R(t,n,i,e)}))})).catch((function(t){return r((function(t){_.$progress.fail(),R(t,n,i)}))})))},beforeRouteUpdate:function(t,e,r){var a=this,n=t.name,i=t.params;this.$progress.start(),this[w.b](i.orderId).then((function(t){var e=t.number;a.$progress.finish(),R(a,n,i,e)})).catch((function(t){a.$progress.fail(),R(a,n,i)})),r()}},A=Object(f.a)(V,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section order-details-view"},[r("div",{staticClass:"container container--tablet-lg"},[r("v-link",{staticClass:"order-details-view__back-link",attrs:{to:t.backUrl}},[r("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),t._v(" Назад ко всем\n            заказам\n        ")],1),t._v(" "),r("h2",{staticClass:"order-details-view__hl"},[t._v(t._s(t.$t("profile.format.order",{id:t.order.number})))]),t._v(" "),r("div",{staticClass:"order-details-view__details"},[r("div",{staticClass:"order-details-view__details-info"},[r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Сумма"}},[r("price",t._b({staticClass:"text-bold"},"price",t.order.price,!1))],1),t._v(" "),r("info-row",{staticClass:"order-details-view__details-row",class:t.orderStatusClass,attrs:{name:"Статус заказа",value:t.orderStatus}}),t._v(" "),t.deliveryMethod?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Способ доставки",value:t.deliveryMethod}}):t._e(),t._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Дата заказа",value:t.formatDate(t.order.created_at)}}),t._v(" "),t.deliveryDate?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Дата доставки",value:t.deliveryDate}}):t._e(),t._v(" "),t.deliveryAddress?r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Адрес доставки",value:t.deliveryAddress}}):t._e()],1),t._v(" "),r("div",{staticClass:"order-details-view__details-controls"},[t.canPay?t._l(t.order.payments,(function(e){return r("v-button",{key:e.id,staticClass:"order-details-view__details-controls-btn",on:{click:function(r){return t.onContinuePayment(t.order.id,e.id)}}},[t._v("\n                        Оплатить заказ\n                    ")])})):t._e()],2)])],1),t._v(" "),t._l(t.deliveries,(function(e){return r("info-panel",{key:e.number,staticClass:"order-details-view__panel",attrs:{header:"Доставка №"+e.number}},[r("div",{staticClass:"container container--tablet-lg"},[t.deliveries.length>1?[r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Способ доставки",value:t.formatDeliveryMethod(e.delivery_method)}}),t._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Дата доставки",value:t.formatDate(e.delivery_at)}}),t._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",class:t.getDeliveryStatusClass(e.status),attrs:{name:"Статус доставки",value:t.formatDeliveryStatus(e.status)}}),t._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Адрес доставки",value:t.formatAddress(e)}})]:t._e(),t._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Количество коробок",value:t.formatPackageCount(e.package_count)}}),t._v(" "),r("ul",{staticClass:"order-details-view__panel-list"},t._l(e.products,(function(t){return r("package-product-card",{key:t.id,staticClass:"order-details-view__panel-item",attrs:{name:t.name,image:t.image,price:t.price,"old-price":t.cost,count:t.qty}})})),1)],2)])}))],2)}),[],!1,null,null,null);e.default=A.exports},SRJT:function(t,e,r){},wOvY:function(t,e,r){}}]);