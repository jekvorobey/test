(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{nSuw:function(e,t,r){"use strict";r.r(t);var a=r("NDiG"),i=r("7cXU"),s=r("o3vK"),l=r("jYNS"),o=r("YNzt"),d=r("KLyl"),c=r("45Ux"),n=r("L2JU"),_=r("Q2AE"),v=r("rBTT"),f=r("JM0x"),u=r("sJxq"),m=r("iggl"),w=r("2JJK"),b=(r("4mC1"),r("GyY8")),p=r("aXGN"),g=r("3eXy");r("gB8C"),r("PnIt"),r("zkTN");function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function C(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var O="".concat(v.NAME,"/").concat(u.c),k={name:"referal-order-details",components:{VSvg:a.a,VLink:i.a,VCheck:s.a,VPicture:l.a,InfoRow:c.a,FilterButton:d.a,Price:o.a},data:function(){return{referalSource:1,referalSources:[{id:1,value:"all",name:"Все источники"},{id:2,value:"referal",name:"Реферальная ссылка"},{id:3,value:"promo",name:"Промокод"}]}},computed:C(C(C({},Object(n.d)(O,[u.e])),Object(n.d)("route",{referalId:function(e){return e.params&&e.params.referalId}})),{},{orders:function(){var e=this,t=(this[u.e]||{}).orders;return t.map((function(t){var r=t.image&&Object(p.c)(40,40,t.image.id,w.fileExtension.image.WEBP),a=t.image&&Object(p.c)(40,40,t.image.id),i=t.order_date&&new Date(t.order_date).toLocaleDateString(e[_.f],b.b);return C(C({},t),{},{qty:Number(t.qty),date:i,defaultImage:a,desktopImage:r})}))},registerDate:function(){var e=(this[u.e]||{}).register_date;return e?new Date(e).toLocaleDateString(this[_.f],b.c):null},backUrl:function(){return{name:"Referal"}},isTabletLg:function(){return this.$mq.tabletLg}}),methods:C(C({},Object(n.b)(v.NAME,[f.a])),Object(n.b)(O,[m.c])),beforeRouteEnter:function(e,t,r){var a=e.name,i=e.params;g.$store.state[v.NAME][u.c].referralId===i.referalId?r():(g.$progress.start(),g.$store.dispatch("".concat(O,"/").concat(m.c),i.referalId).then((function(){return r((function(e){g.$progress.finish(),e[f.a]([{name:e.$t("profile.routes.Referal"),to:{name:"Referal"}},{name:e.$t("profile.format.referal",{id:i.referalId}),to:{name:a,params:i}}])}))})))},beforeRouteUpdate:function(e,t,r){var a=e.name,i=e.params;this[f.a]([{name:vm.$t("profile.routes.Referal"),to:{name:"Referal"}},{name:vm.$t("profile.format.referal",{id:i.referalId}),to:{name:a,params:i}}]),r()},beforeRouteLeave:function(e,t,r){this[f.a]([]),r()}},j=r("KHd+"),I=Object(j.a)(k,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section referal-order-details-view"},[r("div",{staticClass:"container container--tablet-lg"},[r("v-link",{staticClass:"referal-order-details-view__back-link",attrs:{to:e.backUrl}},[r("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),e._v(" Назад к\n            реферальным заказам\n        ")],1),e._v(" "),r("h2",{staticClass:"referal-order-details-view__hl"},[e._v(e._s(e.$t("profile.format.referal",{id:e.referalId})))]),e._v(" "),r("section",{staticClass:"referal-order-details-view__details"},[r("div",{staticClass:"referal-order-details-view__details-info"},[r("info-row",{staticClass:"referal-order-details-view__details-row",attrs:{name:"Дата привязки реферала",value:e.registerDate}})],1)]),e._v(" "),r("section",{staticClass:"referal-order-details-view__section"},[r("div",{staticClass:"referal-order-details-view__section-header"},[r("h3",{staticClass:"referal-order-details-view__section-hl"},[e._v("История заказов реферала")]),e._v(" "),r("div",{staticClass:"referal-order-details-view__section-sources"},e._l(e.referalSources,(function(t){return r("v-check",{key:t.id,staticClass:"referal-order-details-view__section-check",attrs:{name:"referal-source",type:"radio",id:t.value+"-"+t.id,value:t.id},model:{value:e.referalSource,callback:function(t){e.referalSource=t},expression:"referalSource"}},[e._v("\n                        "+e._s(t.name)+"\n                    ")])})),1)]),e._v(" "),e.isTabletLg?r("filter-button",{staticClass:"referal-orders-view__filter-btn",on:{click:function(t){e.filterModal=!e.filterModal}}},[e._v("\n                Фильтр и сортировка  \n                "),r("span",{staticClass:"text-grey"},[e._v("4")])]):e._e(),e._v(" "),e.isTabletLg?e._e():r("table",{staticClass:"referal-order-details-view__table"},[e._m(0),e._v(" "),e._m(1),e._v(" "),r("transition-group",{staticClass:"referal-order-details-view__table-body",attrs:{tag:"tbody",name:"fade-in",appear:""}},e._l(e.orders,(function(t){return r("tr",{key:t.name,staticClass:"referal-order-details-view__table-tr"},[r("td",{staticClass:"referal-order-details-view__table-td"},[r("div",{staticClass:"referal-order-details-view__table-img",class:{"referal-order-details-view__table-img--empty":!t.image||!t.image.id}},[t.image&&t.image.id?r("v-picture",{key:t.image.id},[r("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp"}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage}})]):r("v-svg",{attrs:{name:"logo",width:"32",height:"32"}})],1),e._v(" "),r("div",{staticClass:"referal-order-details-view__table-title"},[e._v("\n                                "+e._s(t.name)+"\n                            ")])]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[e._v(e._s(t.qty)+" шт")]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[e._v(e._s(t.source))]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[e._v(e._s(t.date))]),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[r("price",e._b({},"price",t.price_product,!1))],1),e._v(" "),r("td",{staticClass:"referal-order-details-view__table-td"},[r("price",e._b({},"price",t.price_commission,!1))],1)])})),0)],1)],1)],1),e._v(" "),e.isTabletLg?r("ul",{staticClass:"referal-order-details-view__list"},e._l(e.orders,(function(t){return r("li",{key:t.id,staticClass:"referal-order-details-view__list-item"},[r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Товар"}},[r("div",{staticClass:"referal-order-details-view__table-img",class:{"referal-order-details-view__table-img--empty":!t.image||!t.image.id}},[t.image&&t.image.id?r("v-picture",{key:t.image.id},[r("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp"}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage}})]):r("v-svg",{attrs:{name:"logo",width:"32",height:"32"}})],1),e._v(" "),r("div",{staticClass:"referal-order-details-view__table-title"},[e._v("\n                    "+e._s(t.name)+"\n                ")])]),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Кол-во"}},[e._v("\n                "+e._s(t.qty)+" шт.\n            ")]),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Источник",value:t.source}}),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Дата заказа",value:t.date}}),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Сумма"}},[r("price",e._b({},"price",t.price_product,!1))],1),e._v(" "),r("info-row",{staticClass:"referal-order-details-view__list-item-row",attrs:{name:"Сумма вознаграждения"}},[r("price",e._b({},"price",t.price_commission,!1))],1)],1)})),0):e._e()])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("colgroup",[t("col",{attrs:{width:"40%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}}),this._v(" "),t("col",{attrs:{width:"12%"}})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("thead",{staticClass:"referal-order-details-view__table-head"},[r("tr",{staticClass:"referal-order-details-view__table-tr referal-order-details-view__table-tr--header"},[r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Товар")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Кол-во")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Источник")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Дата заказа")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Сумма")]),e._v(" "),r("th",{staticClass:"referal-order-details-view__table-th"},[e._v("Сумма вознаграждения")])])])}],!1,null,null,null);t.default=I.exports},zkTN:function(e,t,r){}}]);