(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{"5AnR":function(t,e,r){},"9uh1":function(t,e,r){},jyLG:function(t,e,r){},kQow:function(t,e,r){"use strict";r.r(e);var n=r("NDiG"),c=r("7cXU"),a=r("o3vK"),i=r("i2Ud"),o=r("YNzt"),s=r("jYNS"),u=r("3C5o"),l=r("aXGN"),p=(r("5AnR"),{name:"return-panel-product-card",components:{VSvg:n.a,VLink:c.a,VPicture:s.a,VCounter:u.a,Price:o.a},props:{name:{type:String,required:!0},href:{type:String,default:"/"},image:{type:[String,Object]},price:{type:Object},oldPrice:{type:Object},count:{type:[String,Number],default:1},className:{type:String,default:""},id:{type:Number,default:null}},data:function(){return{quantity:null}},methods:{generateSourcePath:function(t,e,r,n){return Object(l.c)(t,e,r,n)}},beforeMount:function(){this.quantity=this.count}}),d=r("KHd+"),b=Object(d.a)(p,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"return-panel-product-card",class:t.className},[r("router-link",{staticClass:"return-panel-product-card__img",attrs:{to:t.href}},[t.image?r("v-picture",{attrs:{image:t.image,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var n=e.image;return[r("source",{attrs:{"data-srcset":t.generateSourcePath(64,64,n.id,"webp"),type:"image/webp"}})]}},{key:"fallback",fn:function(e){var n=e.image,c=e.alt;return[r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(64,64,n.id),alt:c}})]}}],null,!1,2109703504)}):r("v-svg",{attrs:{id:"return-panel-product-card-empty",name:"logo",width:"48",height:"48"}})],1),t._v(" "),r("div",{staticClass:"return-panel-product-card__body"},[r("v-link",{staticClass:"return-panel-product-card__body-name",attrs:{to:t.href}},[t._v(t._s(t.name))]),t._v(" "),1===t.count?r("div",{staticClass:"return-panel-product-card__body-count"},[t._v(t._s(t.quantity)+" шт")]):r("v-counter",{staticClass:"return-panel-product-card__counter",attrs:{min:"1",max:t.count},model:{value:t.quantity,callback:function(e){t.quantity=e},expression:"quantity"}}),t._v(" "),r("div",{staticClass:"return-panel-product-card__body-prices"},[r("price",t._b({staticClass:"text-bold return-panel-product-card__body-price"},"price",t.price,!1)),t._v(" "),t.oldPrice&&t.oldPrice.value!==t.price.value?r("price",t._b({staticClass:"text-grey text-strike return-panel-product-card__body-price--old"},"price",t.oldPrice,!1)):t._e()],1)],1)],1)}),[],!1,null,null,null).exports,f=r("XJM6"),h=r("L2JU"),v=r("rBTT"),_=r("Pm1D"),m=r("cCdQ"),y=r("W6hq"),g=r("q5Zp");r("9uh1");function O(t){return function(t){if(Array.isArray(t))return C(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return C(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return C(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function k(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function j(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?k(Object(r),!0).forEach((function(e){P(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function P(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var w="".concat(v.NAME,"/").concat(_.a),S={name:"return-product-selection",components:{VCheck:a.a,VButton:i.a,Price:o.a,ReturnPanelProductCard:b,PackageProductCard:f.a},computed:j(j({},Object(h.d)(w,[_.b])),{},{allChecked:function(){return this.checkboxes.length>0&&this.checkboxes.length===this.products.length},indeterminate:function(){return this.checkboxes.length>0&&this.checkboxes.length<this.products.length},totalPrice:function(){return{value:3300,currency:"RUB"}}}),data:function(){return{checkboxes:[]}},methods:j(j({},Object(h.b)(w,[m.a,SET_SELECTED_PRODUCTS])),{},{generateItemProductUrl:function(t){if(Array.isArray(t.categoryCodes)){var e=t.categoryCodes[t.categoryCodes.length-1];return Object(y.e)(e,t.code)}},onNextStep:function(){var t=this,e=this.$refs.products.filter((function(e){return t.isChecked(e.id)}));console.log(e),this[m.a](g.i.CHECK)},onSelectAll:function(){this.checkboxes.length>0?this.checkboxes=[]:this.checkboxes=O(Object.values(this.products.map((function(t){return"".concat(t.id)}))))},isChecked:function(t){return this.checkboxes.includes("".concat(t))}})},x=Object(d.a)(S,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.products&&t.products.length?r("div",{staticClass:"return-product-selection"},[r("div",{staticClass:"container container--tablet-lg"},[r("h3",{staticClass:"return-product-selection__title"},[t._v("Выберите продукты, которые хотите вернуть")]),t._v(" "),r("v-check",{attrs:{id:"checkbox-all",name:"all",value:"all",checked:t.allChecked,indeterminate:t.indeterminate},on:{change:t.onSelectAll}},[t._v("\n            Выбрать все продукты\n        ")])],1),t._v(" "),r("ul",{staticClass:"return-product-selection__product-list"},t._l(t.products,(function(e){return r("li",{key:e.id,staticClass:"return-product-selection__product-item"},[r("v-check",{attrs:{id:""+e.id,value:""+e.id,name:"product-checkbox"},model:{value:t.checkboxes,callback:function(e){t.checkboxes=e},expression:"checkboxes"}}),t._v(" "),r("return-panel-product-card",{ref:"products",refInFor:!0,attrs:{id:e.id,type:e.type,name:e.name,image:e.image,price:e.price,"old-price":e.oldPrice,count:e.stock.qty,description:e.description,href:t.generateItemProductUrl(e)}})],1)})),0),t._v(" "),r("div",{staticClass:"return-product-selection__bottom"},[r("div",{staticClass:"return-product-selection__controls"},[r("v-button",{staticClass:"return-product-selection__next-btn",on:{click:t.onNextStep}},[t._v("Продолжить")]),t._v(" "),r("v-button",{staticClass:"return-product-selection__back-btn btn--transparent"},[t._v("Назад")])],1),t._v(" "),r("div",{staticClass:"return-product-selection__info"},[t._v("\n            Сумма к возрату: "),r("span",{staticClass:"return-product-selection__info-sum"},[r("price",t._b({staticClass:"text-bold return-product-selection__price"},"price",t.totalPrice,!1))],1)])])]):r("div",{staticClass:"return-product-selection"},[t._v("\n    Продуктов для возврата нет\n")])}),[],!1,null,null,null).exports,E=(r("jyLG"),"".concat(v.NAME,"/").concat(_.a),{name:"return-product-check"}),A=Object(d.a)(E,(function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"return-product-check"},[this._v("\n    Следующий шаг\n")])}),[],!1,null,null,null).exports;r("oHx4");function N(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function D(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?N(Object(r),!0).forEach((function(e){q(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):N(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function q(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var U="".concat(v.NAME,"/").concat(_.a),L={name:"return",components:{VSvg:n.a,VLink:c.a},computed:D(D({},Object(h.d)(U,[_.c])),{},{backUrl:function(){return{name:""}},currentStep:function(){switch(this.step){case g.i.SELECT:return x;case g.i.CHECK:return A;default:return x}}}),methods:D({},Object(h.b)(U,[m.a])),beforeMount:function(){this.step||this[m.a](g.i.SELECT)}},T=Object(d.a)(L,(function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"section return-view"},[e("div",{staticClass:"container container--tablet-lg"},[e("v-link",{staticClass:"return-view__back-link",attrs:{to:this.backUrl}},[e("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),this._v(" Назад\n        ")],1)],1),this._v(" "),e("h2",{staticClass:"return-view__title"},[this._v("Возврат Заказа №124589524")]),this._v(" "),e(this.currentStep,{tag:"component"})],1)}),[],!1,null,null,null);e.default=T.exports},oHx4:function(t,e,r){}}]);