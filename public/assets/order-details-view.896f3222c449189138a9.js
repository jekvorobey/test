(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{LUyO:function(e,t,r){"use strict";r.r(t);var a=r("NDiG"),i=r("7cXU"),s=r("i2Ud"),o=r("KQVR"),c=r("45Ux"),n=r("PZpB"),l=r("jYNS"),d=r("YNzt"),u=r("OvCi"),p=(r("wOvY"),{name:"package-product-card",components:{VSvg:a.a,VLink:i.a,VPicture:l.a,Price:d.a},props:{name:{type:String,required:!0},href:{type:String,default:"/"},image:{type:[String,Object]},price:{type:Object},oldPrice:{type:Object},count:{type:Number,default:1}},methods:{generateSourcePath:function(e,t,r,a){return Object(u.a)(e,t,r,a)}}}),v=r("KHd+"),m=Object(v.a)(p,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",{staticClass:"package-product-card"},[r("router-link",{staticClass:"package-product-card__img",attrs:{to:e.href}},[e.image?r("v-picture",{attrs:{image:e.image,alt:""},scopedSlots:e._u([{key:"source",fn:function(t){var a=t.image;return[r("source",{attrs:{"data-srcset":e.generateSourcePath(64,64,a.id,"webp"),type:"image/webp"}})]}},{key:"fallback",fn:function(t){var a=t.image,i=t.alt;return[r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.generateSourcePath(64,64,a.id,a.sourceExt),alt:i}})]}}],null,!1,2843635553)}):r("v-svg",{attrs:{id:"package-product-card-empty",name:"logo",width:"48",height:"48"}})],1),e._v(" "),r("div",{staticClass:"package-product-card__body"},[r("v-link",{staticClass:"package-product-card__body-name",attrs:{to:e.href}},[e._v(e._s(e.name))]),e._v(" "),r("div",{staticClass:"package-product-card__body-count"},[e._v(e._s(e.count)+" шт")]),e._v(" "),r("div",{staticClass:"package-product-card__body-prices"},[r("price",e._b({staticClass:"text-bold package-product-card__body-price"},"price",e.price,!1)),e._v(" "),e.oldPrice?r("price",e._b({staticClass:"text-grey text-strike package-product-card__body-price--old"},"price",e.oldPrice,!1)):e._e()],1)],1)],1)}),[],!1,null,null,null).exports,_=r("L2JU"),f=r("rBTT"),g=r("JM0x"),b=r.p+"images/orderPackageProduct1.d35c81bfbd2e2e1752aa.png",w=r.p+"images/orderPackageProduct2.6bfdab304b48f073e07e.png",y=r.p+"images/orderPackageProduct3.786b7045cf1e3d7e64a3.png",P=r.p+"images/orderPackageProduct4.706ce0a614f4cc50a09f.png";r("PnIt"),r("SRJT");function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function C(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){O(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function O(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var h={name:"order-details",components:{VSvg:a.a,VLink:i.a,VButton:s.a,VInput:o.a,InfoPanel:n.a,InfoRow:c.a,PackageProductCard:m},data:function(){return{cartItems:[{id:1,name:"Губная помада L'Oreal Paris Color Riche by J'Lo's, 103, розовый",description:"Цвет: 27, Bruised Plum",count:1,image:b,price:{value:3900,currency:"RUB"},oldPrice:{value:4600,currency:"RUB"}},{id:2,name:"Matrix Спрей для укладки волос Total results Wonder boost, 250 мл",description:null,count:2,image:w,price:{value:1168,currency:"RUB"}},{id:3,name:"Wella Professionals Koleston Perfect Me+ Deep Browns Краска для волос, 60 мл",description:null,count:1,image:y,price:{value:1899,currency:"RUB"}},{id:4,name:"Matrix кондиционер Total Results Moisture Me Rich, 300 мл",description:null,count:1,image:P,price:{value:599,currency:"RUB"}}],deliveries:[{id:"124589524-1",date:"20 августа 2019",address:"Москва, г. Зеленоград, Центральный проспект, к. 305",items:[{id:1,name:"Губная помада L'Oreal Paris Color Riche by J'Lo's, 103, розовый",description:"Цвет: 27, Bruised Plum",count:1,image:b,price:{value:3900,currency:"RUB"},oldPrice:{value:4600,currency:"RUB"}},{id:2,name:"Matrix Спрей для укладки волос Total results Wonder boost, 250 мл",description:null,count:2,image:w,price:{value:1168,currency:"RUB"}}]},{id:"124589524-2",date:"22 августа 2019",address:"Москва, г. Зеленоград, Центральный проспект, к. 305",items:[{id:3,name:"Wella Professionals Koleston Perfect Me+ Deep Browns Краска для волос, 60 мл",description:null,count:1,image:y,price:{value:1899,currency:"RUB"}},{id:4,name:"Matrix кондиционер Total Results Moisture Me Rich, 300 мл",description:null,count:1,image:P,price:{value:599,currency:"RUB"}}]}]}},computed:C({},Object(_.d)("route",{orderId:function(e){return e.params&&e.params.orderId}}),{backUrl:function(){return{name:"Orders"}}}),methods:C({},Object(_.b)(f.b,[g.b])),beforeRouteEnter:function(e,t,r){var a=e.name,i=e.params;r((function(e){e[g.b]([{name:e.$t("profile.routes.Orders"),to:{name:"Orders"}},{name:e.$t("profile.format.order",{id:i.orderId}),to:{name:a,params:i}}])}))},beforeRouteUpdate:function(e,t,r){var a=e.name,i=e.params;this[g.b]([{name:vm.$t("profile.routes.Orders"),to:{name:"Orders"}},{name:vm.$t("profile.format.order",{id:i.orderId}),to:{name:a,params:i}}]),r()},beforeRouteLeave:function(e,t,r){this[g.b]([]),r()}},R=Object(v.a)(h,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section order-details-view"},[r("div",{staticClass:"container container--tablet-lg"},[r("v-link",{staticClass:"order-details-view__back-link",attrs:{to:e.backUrl}},[r("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),e._v(" Назад ко всем\n            заказам\n        ")],1),e._v(" "),r("h2",{staticClass:"order-details-view__hl"},[e._v(e._s(e.$t("profile.format.order",{id:e.orderId})))]),e._v(" "),r("div",{staticClass:"order-details-view__details"},[r("div",{staticClass:"order-details-view__details-info"},[r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Сумма",value:"15 780 ₽"}}),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Статус заказа",value:"Ожидается оплата"}}),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Дата заказа",value:"18 августа 2019"}}),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Дата доставки",value:"20 августа 2019"}}),e._v(" "),r("info-row",{staticClass:"order-details-view__details-row",attrs:{name:"Адрес доставки",value:"Москва, г. Зеленоград, Центральный проспект, к. 305"}})],1),e._v(" "),r("div",{staticClass:"order-details-view__details-controls"},[r("v-button",{staticClass:"order-details-view__details-controls-btn"},[e._v("Оплатить заказ")]),e._v(" "),r("v-button",{staticClass:"btn--outline order-details-view__details-controls-btn"},[e._v("Повторить заказ")]),e._v(" "),r("v-link",{staticClass:"order-details-view__details-controls-link"},[e._v("Оформить возврат")])],1)])],1),e._v(" "),r("info-panel",{staticClass:"order-details-view__panel",attrs:{header:"Корзина"}},[r("div",{staticClass:"container container--tablet-lg order-details-view__container"},[r("ul",{staticClass:"order-details-view__panel-list"},e._l(e.cartItems,(function(e){return r("package-product-card",{key:e.id,staticClass:"order-details-view__panel-item",attrs:{name:e.name,image:e.image,price:e.price,"old-price":e.oldPrice,count:e.count}})})),1)])]),e._v(" "),e._l(e.deliveries,(function(t){return r("info-panel",{key:t.id,staticClass:"order-details-view__panel",attrs:{header:"Доставка №"+t.id}},[r("div",{staticClass:"container container--tablet-lg"},[r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Дата доставки",value:t.date}}),e._v(" "),r("info-row",{staticClass:"order-details-view__panel-row",attrs:{name:"Адрес доставки",value:t.address}}),e._v(" "),r("ul",{staticClass:"order-details-view__panel-list"},e._l(t.items,(function(e){return r("package-product-card",{key:e.id,staticClass:"order-details-view__panel-item",attrs:{name:e.name,image:e.image,price:e.price,"old-price":e.oldPrice,count:e.count}})})),1)],1)])}))],2)}),[],!1,null,null,null);t.default=R.exports},SRJT:function(e,t,r){},wOvY:function(e,t,r){}}]);