(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{nSuw:function(e,t,r){"use strict";r.r(t);var a=r("NDiG"),i=r("7cXU"),s=r("o3vK"),l=r("jYNS"),o=r("YNzt"),c=r("45Ux"),n=r("L2JU"),d=r("Q2AE"),_=r("rBTT"),v=r("JM0x"),f=r("sJxq"),u=r("iggl"),m=r("3eXy"),w=r("2JJK"),b=r("q5Zp"),p=r("GyY8"),g=r("QmAe"),h=r("aXGN"),C=r("W6hq"),O=r("nfjx");r("gB8C"),r("PnIt"),r("zkTN");function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){j(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function j(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var E="".concat(_.NAME,"/").concat(f.c);function $(e,t,r){var a=e.$router.resolve({name:"Referal"}).href,i=e.$router.resolve({name:t,params:r}).href;e[v.a]([{name:e.$t("profile.routes.Referal"),to:a},{name:e.$t("profile.format.referal",{id:r.referalId}),to:i}])}var S={name:"referal-order-details",mixins:[O.a],components:{VSvg:a.a,VLink:i.a,VCheck:s.a,VPicture:l.a,InfoRow:c.a,Price:o.a},metaInfo:function(){return{title:this.pageTitle}},data:function(){return{referralSource:null,referralSources:[{id:1,value:null,name:"Все источники"},{id:2,value:b.h.LINK,name:"Реферальная ссылка"},{id:3,value:b.h.PROMOCODE,name:"Промокод"}]}},computed:k(k(k({},Object(n.d)(E,[f.e])),Object(n.d)("route",{referalId:function(e){return e.params&&e.params.referalId}})),{},{orders:function(){var e=this,t=(this[f.e]||{}).orders,r=void 0===t?[]:t;return r.map((function(t){var r=t.image,a=t.order_date,i=t.source,s=t.category_code,l=t.code,o=t.variantGroup,c=r&&Object(h.c)(40,40,r.id,w.fileExtension.image.WEBP),n=r&&Object(h.c)(40,40,r.id),_=a&&Object(g.g)(a).toLocaleDateString(e[d.g],p.c),v=e.$t("referralSource.".concat(i)),f=Object(C.j)(s,l),u=null;if(o){var m=o.characteristics,b=void 0===m?[]:m,O=o.combinations,y=(void 0===O?[]:O).find((function(e){return e.code===l})).props;u=Object.keys(y).map((function(e){var t=b.find((function(t){return t.code===e})),r=t.options,a=t.name,i=r.find((function(t){return t.value===y[e]}));return"".concat(a,": ").concat(i.name)}))}var j=u&&u.join(", ");return k(k({},t),{},{note:j,qty:Number(t.qty),url:f,sourceString:v,date:_,defaultImage:n,desktopImage:c})}))},filteredOrders:function(){var e=this.referralSource;return this.orders.filter((function(t){return!e||t.source===e}))},registerDate:function(){var e=(this[f.e]||{}).register_date;return e&&Object(g.g)(e).toLocaleDateString(this[d.g],p.e)},backUrl:function(){return{name:"Referal"}},pageTitle:function(){var e=this.referalId;return this.$t("profile.format.referal",{id:e})},isTabletLg:function(){return this.$mq.tabletLg}}),methods:k(k({},Object(n.b)(_.NAME,[v.a])),Object(n.b)(E,[u.c])),beforeRouteEnter:function(e,t,r){function a(){if(m.$store.state[_.NAME]&&m.$store.state[_.NAME][f.c]){var t=e.fullPath,a=e.name,i=e.params,s=e.query,l=s.orderField,o=void 0===l?b.g.ORDER_DATE:l,c=s.orderDirection,n=void 0===c?w.sortDirections.DESC:c,d=m.$store.state[_.NAME][f.c].loadPath;t===d?r((function(e){return $(e,a,i)})):(m.$progress.start(),m.$store.dispatch("".concat(E,"/").concat(u.c),{id:i.referalId,orderField:o,orderDirection:n}).then((function(){m.$store.dispatch("".concat(E,"/").concat(u.d),t),r((function(e){m.$progress.finish(),$(e,a,i)}))})).catch((function(){return r((function(e){m.$progress.fail(),$(e,a,i)}))})))}}m.$store.state[_.NAME]&&m.$store.state[_.NAME][f.c]?a():m.$store.watch((function(e){return e[_.NAME][f.c]}),(function(e){e&&a()}))},beforeRouteLeave:function(e,t,r){this[v.a]([]),r()}},D=r("KHd+"),P=Object(D.a)(S,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section referal-order-details-view"},[r("div",{staticClass:"container container--tablet-lg"},[r("v-link",{staticClass:"referal-order-details-view__back-link",attrs:{to:e.backUrl}},[r("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),e._v(" Назад к\n            реферальным заказам\n        ")],1),e._v(" "),r("h2",{staticClass:"referal-order-details-view__hl"},[e._v("\n            "+e._s(e.pageTitle)+"\n        ")]),e._v(" "),r("section",{staticClass:"referal-order-details-view__details"},[r("div",{staticClass:"referal-order-details-view__details-info"},[r("info-row",{staticClass:"referal-order-details-view__details-row",attrs:{name:"Заказал товаров",value:e.referralOrderDetails.totalCount}}),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__details-row",attrs:{name:"Сумма заказов"}},[r("price",e._b({},"price",e.referralOrderDetails.totalPrice,!1))],1),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__details-row",attrs:{name:"Дата привязки реферала",value:e.registerDate}})],1)]),e._v(" "),r("section",{staticClass:"referal-order-details-view__section"},[r("div",{staticClass:"referal-order-details-view__section-header"},[r("h3",{staticClass:"referal-order-details-view__section-hl"},[e._v("История заказов реферала")]),e._v(" "),r("div",{staticClass:"referal-order-details-view__section-sources"},e._l(e.referralSources,(function(t){return r("v-check",{key:t.value,staticClass:"referal-order-details-view__section-check",attrs:{name:"referal-source",type:"radio",id:t.value+"-"+t.id,value:t.value},model:{value:e.referralSource,callback:function(t){e.referralSource=t},expression:"referralSource"}},[e._v("\n                        "+e._s(t.name)+"\n                    ")])})),1)]),e._v(" "),e.isTabletLg?e._e():r("table",{staticClass:"referal-order-details-view__table"},[e._m(0),e._v(" "),e._m(1),e._v(" "),r("transition-group",{staticClass:"referal-order-details-view__table-body",attrs:{tag:"tbody",name:"fade-in",appear:""}},e._l(e.filteredOrders,(function(t){return r("tr",{key:t.id,staticClass:"referal-order-details-view__table-tr"},[r("td",{staticClass:"referal-order-details-view__table-td"},[r("router-link",{staticClass:"referal-order-details-view__table-link",attrs:{to:t.url}},[r("div",{staticClass:"referal-order-details-view__table-img",class:{"referal-order-details-view__table-img--empty":!t.image||!t.image.id}},[t.image&&t.image.id?r("v-picture",{key:t.image.id},[r("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp"}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage}})]):r("v-svg",{attrs:{name:"logo",width:"32",height:"32"}})],1),e._v(" "),r("div",{staticClass:"referal-order-details-view__table-title"},[r("div",[e._v(e._s(t.name))]),e._v(" "),r("div",{staticClass:"text-grey text-sm"},[e._v(e._s(t.note))])])])],1),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[e._v(e._s(t.qty)+" шт")]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[e._v(e._s(t.sourceString))]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[e._v(e._s(t.date))]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[r("price",e._b({},"price",t.price_product,!1))],1),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[r("price",e._b({},"price",t.price_commission,!1))],1)])})),0)],1)])],1),e._v(" "),e.isTabletLg?r("ul",{staticClass:"referal-order-details-view__list"},e._l(e.filteredOrders,(function(t){return r("li",{key:t.id,staticClass:"referal-order-details-view__list-item"},[r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Товар"}},[r("router-link",{staticClass:"referal-order-details-view__table-link",attrs:{to:t.url}},[r("div",{staticClass:"referal-order-details-view__table-img",class:{"referal-order-details-view__table-img--empty":!t.image||!t.image.id}},[t.image&&t.image.id?r("v-picture",{key:t.image.id},[r("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp"}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage}})]):r("v-svg",{attrs:{name:"logo",width:"32",height:"32"}})],1),e._v(" "),r("div",{staticClass:"referal-order-details-view__table-title"},[r("div",[e._v(e._s(t.name))]),e._v(" "),r("div",{staticClass:"text-grey text-sm"},[e._v(e._s(t.note))])])])],1),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Количество"}},[e._v("\n                "+e._s(t.qty)+" шт.\n            ")]),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Источник",value:t.sourceString}}),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Дата заказа",value:t.date}}),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Сумма"}},[r("price",e._b({},"price",t.price_product,!1))],1),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Сумма вознаграждения"}},[r("price",e._b({},"price",t.price_commission,!1))],1)],1)})),0):e._e()])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("colgroup",[t("col",{attrs:{width:"40%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("thead",{staticClass:"referal-order-details-view__table-head"},[r("tr",{staticClass:"referal-order-details-view__table-tr referal-order-details-view__table-tr--header"},[r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Товар")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Кол-во")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Источник")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Дата заказа")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Сумма")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Сумма вознаграждения")])])])}],!1,null,null,null);t.default=P.exports},zkTN:function(e,t,r){}}]);