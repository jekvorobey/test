(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{"5AnR":function(t,e,r){},"9uh1":function(t,e,r){},jyLG:function(t,e,r){},kQow:function(t,e,r){"use strict";r.r(e);var n=r("NDiG"),c=r("7cXU"),a=r("o3vK"),i=r("i2Ud"),s=r("jYNS"),o=r("3C5o"),u=r("YNzt"),l=r("2JJK"),p=r("aXGN"),d=r("sEfC"),_=r.n(d),v=(r("4eDr"),r("gB8C"),r("5AnR"),{name:"return-panel-product-card",components:{VSvg:n.a,VLink:c.a,VPicture:s.a,VCheck:a.a,VCounter:o.a,Price:u.a},data:function(){return{isSelected:!1}},props:{productId:{type:[String,Number],required:!0},name:{type:String,required:!0},href:{type:String},image:{type:[String,Object]},price:{type:[Object,String]},oldPrice:{type:[Object,String]},count:{type:Number,default:1},description:{type:String,default:""}},computed:{desktopImage:function(){if(this.image&&this.image.id)return Object(p.c)(300,300,this.image.id,l.fileExtension.image.WEBP)},defaultImage:function(){if(this.image&&this.image.id)return Object(p.c)(300,300,this.image.id)},isTablet:function(){return this.$mq.tablet}},methods:{onCountChange:function(t){}},created:function(){this.debounce_countChange=_()(this.onCountChange,200)}}),f=r("KHd+"),m=Object(f.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"return-panel-product-card"},[r("v-check",{attrs:{id:"return-panel-product-card-"+t.productId,name:"return-panel-product-card-item",value:"1"},model:{value:t.isSelected,callback:function(e){t.isSelected=e},expression:"isSelected"}}),t._v(" "),t.href?r("router-link",{staticClass:"return-panel-product-card__img",attrs:{to:t.href}},[t.image&&t.image.id?r("v-picture",{key:t.image.id},[r("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp"}}),t._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage,alt:""}})]):r("v-svg",{attrs:{id:"return-panel-product-card-empty",name:"logo",width:"48",height:"48"}})],1):r("div",{staticClass:"return-panel-product-card__img"},[t.image&&t.image.id?r("v-picture",{key:t.image.id},[r("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp"}}),t._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage,alt:""}})]):r("v-svg",{attrs:{id:"return-panel-product-card-empty",name:"logo",width:"48",height:"48"}})],1),t._v(" "),r("div",{staticClass:"return-panel-product-card__body"},[r("div",{staticClass:"return-panel-product-card__title"},[r("v-link",{staticClass:"return-panel-product-card__info-name",attrs:{to:t.href}},[t._v(t._s(t.name))]),t._v(" "),r("div",{staticClass:"return-panel-product-card__description"},[t._v("\n                "+t._s(t.description)+"\n            ")])],1),t._v(" "),r("div",{staticClass:"return-panel-product-card__counter"},[t.count>1?r("v-counter",{attrs:{value:t.count,min:"1"},on:{input:t.debounce_countChange}}):r("span",{staticClass:"return-panel-product-card__counter-text"},[t._v("1 шт")])],1),t._v(" "),r("div",{staticClass:"return-panel-product-card__info"},[r("div",{staticClass:"return-panel-product-card__info-prices"},[r("price",t._b({staticClass:"text-bold return-panel-product-card__info-price"},"price",t.price,!1)),t._v(" "),t.oldPrice?r("price",t._b({staticClass:"text-grey text-strike return-panel-product-card__info-price return-panel-product-card__info-price--old"},"price",t.oldPrice,!1)):t._e()],1)])])],1)}),[],!1,null,null,null).exports,b=r("L2JU"),g=r("rBTT"),h=r("Pm1D"),C=r("cCdQ"),y=r("W6hq"),O=r("q5Zp");r("9uh1");function j(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function k(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?j(Object(r),!0).forEach((function(e){w(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function w(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var P="".concat(g.NAME,"/").concat(h.a),S={name:"return-product-selection",components:{VCheck:a.a,VButton:i.a,ReturnPanelProductCard:m},data:function(){return{selectAll:null}},computed:k({},Object(b.d)(P,[h.b])),methods:k(k({},Object(b.b)(P,[C.a])),{},{generateItemProductUrl:function(t){if(Array.isArray(t.categoryCodes)){var e=t.categoryCodes[t.categoryCodes.length-1];return Object(y.e)(e,t.code)}},onNextStep:function(){this[C.a](O.h.CHECK)}})},E=Object(f.a)(S,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.products&&t.products.length?r("div",{staticClass:"return-product-selection"},[r("div",{staticClass:"container container--tablet-lg"},[r("h3",{staticClass:"return-product-selection__title"},[t._v("Выберите продукты, которые хотите вернуть")]),t._v(" "),r("v-check",{attrs:{id:"select-all",name:"select-all",value:"selectAll"},model:{value:t.selectAll,callback:function(e){t.selectAll=e},expression:"selectAll"}},[t._v("\n            Выбрать все продукты\n        ")])],1),t._v(" "),r("ul",{staticClass:"return-product-selection__product-list"},t._l(t.products,(function(e){return r("return-panel-product-card",{key:e.id,attrs:{"product-id":e.id,type:e.type,name:e.name,image:e.image,price:e.price,"old-price":e.oldPrice,count:e.stock.qty,description:e.description,href:t.generateItemProductUrl(e)}})})),1),t._v(" "),r("div",{staticClass:"return-product-selection__bottom"},[r("div",{staticClass:"return-product-selection__controls"},[r("v-button",{staticClass:"return-product-selection__next-btn",on:{click:function(e){return e.preventDefault(),t.onNextStep(e)}}},[t._v("Продолжить")]),t._v(" "),r("v-button",{staticClass:"return-product-selection__back-btn btn--transparent"},[t._v("Назад")])],1),t._v(" "),t._m(0)])]):r("div",{staticClass:"return-product-selection"},[t._v("\n    Продуктов для возврата нет\n")])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"return-product-selection__info"},[this._v("\n            Сумма к возрату: "),e("span",{staticClass:"return-product-selection__info-sum"},[this._v("2 189 руб.")])])}],!1,null,null,null).exports,x=(r("jyLG"),"".concat(g.NAME,"/").concat(h.a),{name:"return-product-check"}),A=Object(f.a)(x,(function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"return-product-check"},[this._v("\n    Следующий шаг\n")])}),[],!1,null,null,null).exports;r("oHx4");function D(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function N(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?D(Object(r),!0).forEach((function(e){I(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function I(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var V="".concat(g.NAME,"/").concat(h.a),L={name:"return",components:{VSvg:n.a,VLink:c.a},computed:N(N({},Object(b.d)(V,[h.c])),{},{backUrl:function(){return{name:""}},currentStep:function(){switch(this.step){case O.h.SELECT:return E;case O.h.CHECK:return A;default:return E}}}),methods:N({},Object(b.b)(V,[C.a])),beforeMount:function(){this.step||this[C.a](O.h.SELECT)}},U=Object(f.a)(L,(function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"section return-view"},[e("div",{staticClass:"container container--tablet-lg"},[e("v-link",{staticClass:"return-view__back-link",attrs:{to:this.backUrl}},[e("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),this._v(" Назад\n        ")],1)],1),this._v(" "),e("h2",{staticClass:"return-view__title"},[this._v("Возврат Заказа №124589524")]),this._v(" "),e(this.currentStep,{tag:"component"})],1)}),[],!1,null,null,null);e.default=U.exports},oHx4:function(t,e,r){}}]);