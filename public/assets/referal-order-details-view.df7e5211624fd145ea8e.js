(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{nSuw:function(e,t,r){"use strict";r.r(t);var a=r("NDiG"),i=r("7cXU"),s=r("o3vK"),l=r("jYNS"),o=r("YNzt"),c=r("KLyl"),d=r("45Ux"),n=r("L2JU"),_=r("Q2AE"),f=r("rBTT"),v=r("JM0x"),u=r("sJxq"),m=r("iggl"),w=r("3eXy"),b=r("2JJK"),p=r("q5Zp"),g=(r("4mC1"),r("GyY8")),h=r("QmAe"),C=r("aXGN");r("gB8C"),r("PnIt"),r("zkTN");function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){k(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function k(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var j="".concat(f.NAME,"/").concat(u.c),S={name:"referal-order-details",components:{VSvg:a.a,VLink:i.a,VCheck:s.a,VPicture:l.a,InfoRow:d.a,FilterButton:c.a,Price:o.a},data:function(){return{referralSource:null,referralSources:[{id:1,value:null,name:"Все источники"},{id:2,value:p.h.LINK,name:"Реферальная ссылка"},{id:3,value:p.h.PROMOCODE,name:"Промокод"}]}},computed:y(y(y({},Object(n.d)(j,[u.e])),Object(n.d)("route",{referalId:function(e){return e.params&&e.params.referalId}})),{},{orders:function(){var e=this,t=(this[u.e]||{}).orders;return t.map((function(t){var r=t.image&&Object(C.c)(40,40,t.image.id,b.fileExtension.image.WEBP),a=t.image&&Object(C.c)(40,40,t.image.id),i=t.order_date&&Object(h.e)(t.order_date).toLocaleDateString(e[_.g],g.c),s=e.$t("referralSource.".concat(t.source));return y(y({},t),{},{qty:Number(t.qty),sourceString:s,date:i,defaultImage:a,desktopImage:r})}))},filteredOrders:function(){var e=this.referralSource;return this.orders.filter((function(t){return!e||t.source===e}))},registerDate:function(){var e=(this[u.e]||{}).register_date;return e?new Date(e).toLocaleDateString(this[_.g],g.e):null},backUrl:function(){return{name:"Referal"}},isTabletLg:function(){return this.$mq.tabletLg}}),methods:y(y({},Object(n.b)(f.NAME,[v.a])),Object(n.b)(j,[m.c])),beforeRouteEnter:function(e,t,r){var a=e.name,i=e.params;w.$store.state[f.NAME][u.c].referralId===i.referalId?r():(w.$progress.start(),w.$store.dispatch("".concat(j,"/").concat(m.c),i.referalId).then((function(){return r((function(e){w.$progress.finish(),e[v.a]([{name:e.$t("profile.routes.Referal"),to:{name:"Referal"}},{name:e.$t("profile.format.referal",{id:i.referalId}),to:{name:a,params:i}}])}))})))},beforeRouteUpdate:function(e,t,r){var a=e.name,i=e.params;this[v.a]([{name:vm.$t("profile.routes.Referal"),to:{name:"Referal"}},{name:vm.$t("profile.format.referal",{id:i.referalId}),to:{name:a,params:i}}]),r()},beforeRouteLeave:function(e,t,r){this[v.a]([]),r()}},I=r("KHd+"),P=Object(I.a)(S,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section referal-order-details-view"},[r("div",{staticClass:"container container--tablet-lg"},[r("v-link",{staticClass:"referal-order-details-view__back-link",attrs:{to:e.backUrl}},[r("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),e._v(" Назад к\n            реферальным заказам\n        ")],1),e._v(" "),r("h2",{staticClass:"referal-order-details-view__hl"},[e._v(e._s(e.$t("profile.format.referal",{id:e.referalId})))]),e._v(" "),r("section",{staticClass:"referal-order-details-view__details"},[r("div",{staticClass:"referal-order-details-view__details-info"},[r("info-row",{staticClass:"referal-order-details-view__details-row",attrs:{name:"Заказал товаров",value:e.referralOrderDetails.totalCount}}),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__details-row",attrs:{name:"Сумма заказов"}},[r("price",e._b({},"price",e.referralOrderDetails.totalPrice,!1))],1),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__details-row",attrs:{name:"Дата привязки реферала",value:e.registerDate}})],1)]),e._v(" "),r("section",{staticClass:"referal-order-details-view__section"},[r("div",{staticClass:"referal-order-details-view__section-header"},[r("h3",{staticClass:"referal-order-details-view__section-hl"},[e._v("История заказов реферала")]),e._v(" "),r("div",{staticClass:"referal-order-details-view__section-sources"},e._l(e.referralSources,(function(t){return r("v-check",{key:t.value,staticClass:"referal-order-details-view__section-check",attrs:{name:"referal-source",type:"radio",id:t.value+"-"+t.id,value:t.value},model:{value:e.referralSource,callback:function(t){e.referralSource=t},expression:"referralSource"}},[e._v("\n                        "+e._s(t.name)+"\n                    ")])})),1)]),e._v(" "),e.isTabletLg?e._e():r("table",{staticClass:"referal-order-details-view__table"},[e._m(0),e._v(" "),e._m(1),e._v(" "),r("transition-group",{staticClass:"referal-order-details-view__table-body",attrs:{tag:"tbody",name:"fade-in",appear:""}},e._l(e.filteredOrders,(function(t){return r("tr",{key:t.id,staticClass:"referal-order-details-view__table-tr"},[r("td",{staticClass:"referal-order-details-view__table-td"},[r("div",{staticClass:"referal-order-details-view__table-img",class:{"referal-order-details-view__table-img--empty":!t.image||!t.image.id}},[t.image&&t.image.id?r("v-picture",{key:t.image.id},[r("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp"}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage}})]):r("v-svg",{attrs:{name:"logo",width:"32",height:"32"}})],1),e._v(" "),r("div",{staticClass:"referal-order-details-view__table-title"},[e._v("\n                                "+e._s(t.name)+"\n                            ")])]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[e._v(e._s(t.qty)+" шт")]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[e._v(e._s(t.sourceString))]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[e._v(e._s(t.date))]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[r("price",e._b({},"price",t.price_product,!1))],1),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[r("price",e._b({},"price",t.price_commission,!1))],1)])})),0)],1)])],1),e._v(" "),e.isTabletLg?r("ul",{staticClass:"referal-order-details-view__list"},e._l(e.filteredOrders,(function(t){return r("li",{key:t.id,staticClass:"referal-order-details-view__list-item"},[r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Товар"}},[r("div",{staticClass:"referal-order-details-view__table-img",class:{"referal-order-details-view__table-img--empty":!t.image||!t.image.id}},[t.image&&t.image.id?r("v-picture",{key:t.image.id},[r("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp"}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage}})]):r("v-svg",{attrs:{name:"logo",width:"32",height:"32"}})],1),e._v(" "),r("div",{staticClass:"referal-order-details-view__table-title"},[e._v("\n                    "+e._s(t.name)+"\n                ")])]),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Количество"}},[e._v("\n                "+e._s(t.qty)+" шт.\n            ")]),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Источник",value:t.sourceString}}),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Дата заказа",value:t.date}}),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Сумма"}},[r("price",e._b({},"price",t.price_product,!1))],1),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Сумма вознаграждения"}},[r("price",e._b({},"price",t.price_commission,!1))],1)],1)})),0):e._e()])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("colgroup",[t("col",{attrs:{width:"40%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("thead",{staticClass:"referal-order-details-view__table-head"},[r("tr",{staticClass:"referal-order-details-view__table-tr referal-order-details-view__table-tr--header"},[r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Товар")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Количество")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Источник")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Дата заказа")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Сумма")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Сумма вознаграждения")])])])}],!1,null,null,null);t.default=P.exports},zkTN:function(e,t,r){}}]);