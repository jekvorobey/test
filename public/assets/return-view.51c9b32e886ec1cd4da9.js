(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{"5AnR":function(e,t,r){},"8nna":function(e,t,r){},"9uh1":function(e,t,r){},jyLG:function(e,t,r){},kQow:function(e,t,r){"use strict";r.r(t);var n=r("NDiG"),a=r("7cXU"),c=r("o3vK"),o=r("i2Ud"),s=r("YNzt"),i=r("jYNS"),u=r("3C5o"),l=r("aXGN"),d=(r("5AnR"),{name:"return-panel-product-card",components:{VSvg:n.a,VLink:a.a,VPicture:i.a,VCounter:u.a,Price:s.a},props:{product:{type:Object,default:function(){}},href:{type:String,default:"/"},className:{type:String,default:""},type:{type:String},id:{type:Number,required:!0}},data:function(){return{quantity:null}},methods:{generateSourcePath:function(e,t,r,n){return Object(l.c)(e,t,r,n)}},beforeMount:function(){this.quantity=this.product.stock.qty}}),p=r("KHd+"),_=Object(p.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"return-panel-product-card",class:e.className},[r("router-link",{staticClass:"return-panel-product-card__img",attrs:{to:e.href}},[e.product.image?r("v-picture",{attrs:{image:e.product.image,alt:""},scopedSlots:e._u([{key:"source",fn:function(t){var n=t.image;return[r("source",{attrs:{"data-srcset":e.generateSourcePath(64,64,n.id,"webp"),type:"image/webp"}})]}},{key:"fallback",fn:function(t){var n=t.image,a=t.alt;return[r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.generateSourcePath(64,64,n.id),alt:a}})]}}],null,!1,2109703504)}):r("v-svg",{attrs:{id:"return-panel-product-card-empty",name:"logo",width:"48",height:"48"}})],1),e._v(" "),r("div",{staticClass:"return-panel-product-card__body"},[r("v-link",{staticClass:"return-panel-product-card__body-name",attrs:{to:e.href}},[e._v(e._s(e.product.name))]),e._v(" "),1===e.product.stock.qty?r("div",{staticClass:"return-panel-product-card__body-count"},[e._v(e._s(e.quantity)+" шт")]):r("v-counter",{staticClass:"return-panel-product-card__counter",attrs:{min:"1",max:e.product.stock.qty},model:{value:e.quantity,callback:function(t){e.quantity=t},expression:"quantity"}}),e._v(" "),r("div",{staticClass:"return-panel-product-card__body-prices"},[r("price",e._b({staticClass:"text-bold return-panel-product-card__body-price"},"price",e.product.price,!1)),e._v(" "),e.product.oldPrice&&e.product.oldPrice.value!==e.product.price.value?r("price",e._b({staticClass:"text-grey text-strike return-panel-product-card__body-price--old"},"price",e.product.oldPrice,!1)):e._e()],1)],1)],1)}),[],!1,null,null,null).exports,b=r("XJM6"),m=r("L2JU"),f=r("rBTT"),v=r("Pm1D"),h=r("cCdQ"),y=r("W6hq"),g=r("q5Zp");r("9uh1");function O(e){return function(e){if(Array.isArray(e))return k(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return k(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return k(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function C(e,t,r,n,a,c,o){try{var s=e[c](o),i=s.value}catch(e){return void r(e)}s.done?t(i):Promise.resolve(i).then(n,a)}function S(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(Object(r),!0).forEach((function(t){P(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var R="".concat(f.NAME,"/").concat(v.a),w={name:"return-product-selection",components:{VCheck:c.a,VButton:o.a,Price:s.a,ReturnPanelProductCard:_,PackageProductCard:b.a},data:function(){return{checkboxes:[]}},computed:j(j({},Object(m.d)(R,[v.b])),{},{allChecked:function(){return this.checkboxes.length>0&&this.checkboxes.length===this.products.length},indeterminate:function(){return this.checkboxes.length>0&&this.checkboxes.length<this.products.length},totalPrice:function(){return{value:3300,currency:"RUB"}},checkedProducts:function(){var e=this;return this.$refs.products.filter((function(t){return e.isChecked(t.id)})).map((function(e){return j({quantity:e.quantity},e.product)}))},isBtnDisabled:function(){return this.checkboxes.length<1}}),methods:j(j({},Object(m.b)(R,[h.c,h.b])),{},{generateItemProductUrl:function(e){if(Array.isArray(e.categoryCodes)){var t=e.categoryCodes[e.categoryCodes.length-1];return Object(y.f)(t,e.code)}},onNextStep:function(){var e,t=this;return(e=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t[h.b](t.checkedProducts);case 2:t[h.c](g.i.CHECK);case 3:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,a){var c=e.apply(t,r);function o(e){C(c,n,a,o,s,"next",e)}function s(e){C(c,n,a,o,s,"throw",e)}o(void 0)}))})()},onSelectAll:function(){this.checkboxes.length>0?this.checkboxes=[]:this.checkboxes=O(Object.values(this.products.map((function(e){return"".concat(e.id)}))))},isChecked:function(e){return this.checkboxes.includes("".concat(e))}})},x=Object(p.a)(w,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.products&&e.products.length?r("div",{staticClass:"return-product-selection"},[r("div",{staticClass:"container container--tablet-lg"},[r("h3",{staticClass:"return-product-selection__title"},[e._v("Выберите продукты, которые хотите вернуть")]),e._v(" "),r("v-check",{attrs:{id:"checkbox-all",name:"all",value:"all",checked:e.allChecked,indeterminate:e.indeterminate},on:{change:e.onSelectAll}},[e._v("Выбрать все продукты")])],1),e._v(" "),r("ul",{staticClass:"return-product-selection__product-list"},e._l(e.products,(function(t){return r("li",{key:t.id,staticClass:"return-product-selection__product-item"},[r("v-check",{attrs:{id:""+t.id,value:""+t.id,name:"product-checkbox"},model:{value:e.checkboxes,callback:function(t){e.checkboxes=t},expression:"checkboxes"}}),e._v(" "),r("return-panel-product-card",{ref:"products",refInFor:!0,attrs:{product:t,id:t.id,type:t.type,href:e.generateItemProductUrl(t)}})],1)})),0),e._v(" "),r("div",{staticClass:"return-product-selection__bottom"},[r("div",{staticClass:"return-product-selection__controls"},[r("v-button",{staticClass:"return-product-selection__next-btn",attrs:{disabled:e.isBtnDisabled},on:{click:e.onNextStep}},[e._v("Продолжить")]),e._v(" "),r("v-button",{staticClass:"return-product-selection__back-btn btn--transparent"},[e._v("Назад")])],1),e._v(" "),r("div",{staticClass:"return-product-selection__info"},[e._v("\n            Сумма к возрату:\n            "),r("span",{staticClass:"return-product-selection__info-sum"},[r("price",e._b({staticClass:"text-bold return-product-selection__price"},"price",e.totalPrice,!1))],1)])])]):r("div",{staticClass:"return-product-selection"},[e._v("Продуктов для возврата нет")])}),[],!1,null,null,null).exports,E=r("Z14j"),N=(r("m4mT"),{name:"return-product-card",components:{VSvg:n.a,VLink:a.a,VPicture:i.a,VButton:o.a,Price:s.a},props:{className:{type:String,default:""},href:{type:String,default:"/"},type:{type:String},id:{type:Number,required:!0},quantity:{type:Number},image:{type:Object},name:{type:String},price:{type:Object},oldPrice:{type:Object},reason:{type:String,default:""}},methods:{generateSourcePath:function(e,t,r,n){return Object(l.c)(e,t,r,n)},onSelectReason:function(){this.$emit("select-reason",this.id)}}}),D=Object(p.a)(N,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"return-product-card",class:e.className},[r("router-link",{staticClass:"return-product-card__img",attrs:{to:e.href}},[e.image?r("v-picture",{attrs:{image:e.image,alt:""},scopedSlots:e._u([{key:"source",fn:function(t){var n=t.image;return[r("source",{attrs:{"data-srcset":e.generateSourcePath(64,64,n.id,"webp"),type:"image/webp"}})]}},{key:"fallback",fn:function(t){var n=t.image,a=t.alt;return[r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.generateSourcePath(64,64,n.id),alt:a}})]}}],null,!1,2109703504)}):r("v-svg",{attrs:{id:"return-product-card-empty",name:"logo",width:"48",height:"48"}})],1),e._v(" "),r("div",{staticClass:"return-product-card__body"},[r("div",{staticClass:"return-product-card__title"},[r("v-link",{staticClass:"return-product-card__body-name",attrs:{to:e.href}},[e._v(e._s(e.name))]),e._v(" "),e.reason?[r("p",{staticClass:"return-product-card__reason"},[r("a",{staticClass:"return-product-card__link-btn",on:{click:e.onSelectReason}},[e._v("Причина возврата:")]),e._v("\n                    "+e._s(e.reason)+"\n                ")])]:[r("a",{staticClass:"return-product-card__link-btn",on:{click:e.onSelectReason}},[e._v("Укажите причину возврата")])]],2),e._v(" "),r("div",{staticClass:"return-product-card__body-count"},[e._v(e._s(e.quantity)+" шт")]),e._v(" "),r("div",{staticClass:"return-product-card__body-prices"},[r("price",e._b({staticClass:"text-bold return-product-card__body-price"},"price",e.price,!1)),e._v(" "),e.oldPrice&&e.oldPrice.value!==e.price.value?r("price",e._b({staticClass:"text-grey text-strike return-product-card__body-price--old"},"price",e.oldPrice,!1)):e._e()],1)])],1)}),[],!1,null,null,null).exports,A=r("8yoK"),T=r("KQVR"),q=r("a6oV"),I=r("55Sm"),U=r("jDKC"),V=r("2JJK");r("8nna");function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function B(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(Object(r),!0).forEach((function(t){$(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function $(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var G=V.modalName.profile.RETURN_REASON,L="".concat(f.NAME,"/").concat(v.a),H={name:G,components:{VCheck:c.a,VFile:A.a,VInput:T.a,VButton:o.a,GeneralModal:q.a},data:function(){return{reasonSelected:null,reasonDescription:"",reasonDescriptionError:!1}},computed:B(B({},Object(m.d)(I.b,{isOpen:function(e){return e[I.a][V.modalName.profile.RETURN_REASON]&&e[I.a][V.modalName.profile.RETURN_REASON].open},modalState:function(e){return e[I.a][G]&&e[I.a][G].state||{}}})),{},{isTablet:function(){return this.$mq.tablet},fileAcceptedTypes:function(){return[V.mimeType.image.JPEG,V.mimeType.image.PNG,V.mimeType.application.PDF,V.mimeType.application.DOC,V.mimeType.application.DOCX]},isDisabledSubmit:function(){return(!this.reasonSelected||this.reasonSelected===this.returnReasons.OTHER)&&!this.reasonDescription},reason:function(){return this.reasonSelected!==this.returnReasons.OTHER?this.reasonSelected:this.reasonDescription}}),methods:B(B(B({},Object(m.b)(I.b,[U.a])),Object(m.b)(L,[h.a])),{},{onClose:function(){this.$emit("close"),this[U.a]({name:G,open:!1})},onFilesChanged:function(e){this.files=e||[]},onSubmit:function(){this[h.a]({productId:this.modalState.productId,reasonText:this.reason}),this[U.a]({name:G,open:!1})}}),beforeMount:function(){this.returnReasons=V.returnReasons}},K=Object(p.a)(H,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.isOpen?r("general-modal",{staticClass:"return-reason-modal",attrs:{type:"sm",header:"Выберите причину возврата","is-mobile":e.isTablet},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[r("h3",{staticClass:"return-reason-modal__title"},[e._v("Укажите причину возврата")]),e._v(" "),r("ul",{staticClass:"return-reason-modal__list"},[r("li",{staticClass:"return-reason-modal__list-item"},[r("v-check",{attrs:{id:"radio-1",type:"radio",name:"radio-1",value:e.returnReasons.MARRIAGE},model:{value:e.reasonSelected,callback:function(t){e.reasonSelected=t},expression:"reasonSelected"}},[e._v("Брак")])],1),e._v(" "),r("li",{staticClass:"return-reason-modal__list-item"},[r("v-check",{attrs:{id:"radio-2",type:"radio",name:"radio-2",value:e.returnReasons.WRONG},model:{value:e.reasonSelected,callback:function(t){e.reasonSelected=t},expression:"reasonSelected"}},[e._v("Не тот товар в заказе")])],1),e._v(" "),r("li",{staticClass:"return-reason-modal__list-item"},[r("v-check",{attrs:{id:"radio-3",type:"radio",name:"radio-3",value:e.returnReasons.PACKAGE},model:{value:e.reasonSelected,callback:function(t){e.reasonSelected=t},expression:"reasonSelected"}},[e._v("Вскрыта оригинальная упаковка")])],1),e._v(" "),r("li",{staticClass:"return-reason-modal__list-item"},[r("v-check",{attrs:{id:"radio-4",type:"radio",name:"radio-4",value:e.returnReasons.TIME},model:{value:e.reasonSelected,callback:function(t){e.reasonSelected=t},expression:"reasonSelected"}},[e._v("Истекает срок годности товара")])],1),e._v(" "),r("li",{staticClass:"return-reason-modal__list-item"},[r("v-check",{attrs:{id:"radio-5",type:"radio",name:"radio-5",value:e.returnReasons.QUALITY},model:{value:e.reasonSelected,callback:function(t){e.reasonSelected=t},expression:"reasonSelected"}},[e._v("Товар ненадлежащего качества")])],1),e._v(" "),r("li",{staticClass:"return-reason-modal__list-item"},[r("v-check",{attrs:{id:"radio-6",type:"radio",name:"radio-6",value:e.returnReasons.DESCRIPTION},model:{value:e.reasonSelected,callback:function(t){e.reasonSelected=t},expression:"reasonSelected"}},[e._v("Товар не соответствует описанию")])],1),e._v(" "),r("li",{staticClass:"return-reason-modal__list-item"},[r("v-check",{attrs:{id:"radio-7",type:"radio",name:"radio-7",value:e.returnReasons.DECISION},model:{value:e.reasonSelected,callback:function(t){e.reasonSelected=t},expression:"reasonSelected"}},[e._v("Изменил решение о покупке")])],1),e._v(" "),r("li",{staticClass:"return-reason-modal__list-item"},[r("v-check",{attrs:{id:"radio-8",type:"radio",name:"radio-8",value:e.returnReasons.OTHER},model:{value:e.reasonSelected,callback:function(t){e.reasonSelected=t},expression:"reasonSelected"}},[e._v("Другое")]),e._v(" "),r("v-input",{attrs:{error:e.reasonDescriptionError,placeholder:"Опишите проблему"},on:{focus:function(t){e.reasonSelected=e.returnReasons.OTHER}},scopedSlots:e._u([{key:"error",fn:function(t){var n=t.error;return[r("transition",{attrs:{name:"slide-in-bottom",mode:"out-in"}},[n?r("div",{key:n},[e._v(e._s(n))]):e._e()])]}}],null,!1,3034400235),model:{value:e.reasonDescription,callback:function(t){e.reasonDescription=t},expression:"reasonDescription"}})],1)]),e._v(" "),r("div",{staticClass:"return-reason-modal__section"},[r("h4",{staticClass:"return-reason-modal__subtitle"},[e._v("\n                Фото и видео товара\n            ")]),e._v(" "),r("div",{staticClass:"return-reason-modal__description"},[e._v("\n                Не более 10 файлов, jpeg, png, mp4, mov."),r("br"),e._v("\n                Фото не более 5Mb, видео до 15Mb\n            ")]),e._v(" "),r("v-file",{staticClass:"return-reason-modal__files",attrs:{"accepted-types":e.fileAcceptedTypes,"max-file-size":5242880},on:{change:e.onFilesChanged}})],1),e._v(" "),r("v-button",{staticClass:"return-reason-modal__submit",attrs:{disabled:e.isDisabledSubmit},on:{click:e.onSubmit}},[e._v("Подтвердить")])]},proxy:!0}],null,!1,615593341)}):e._e()}),[],!1,null,null,null).exports;r("jyLG");function J(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?J(Object(r),!0).forEach((function(t){z(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):J(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function z(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Q="".concat(f.NAME,"/").concat(v.a),X={name:"return-check-products",components:{VButton:o.a,AttentionPanel:E.a,Price:s.a,ReturnProductCard:D,ReturnReasonModal:K},computed:F(F(F({},Object(m.d)(Q,[v.c])),Object(m.d)(I.b,{isModalOpen:function(e){return e[I.a][V.modalName.profile.RETURN_REASON]&&e[I.a][V.modalName.profile.RETURN_REASON].open}})),{},{totalPrice:function(){return{value:3300,currency:"RUB"}}}),methods:F(F(F({},Object(m.b)(I.b,[U.a])),Object(m.b)(Q,[h.c])),{},{generateItemProductUrl:function(e){if(Array.isArray(e.categoryCodes)){var t=e.categoryCodes[e.categoryCodes.length-1];return Object(y.f)(t,e.code)}},onClickBack:function(){this[h.c](g.i.SELECT)},onSelectReason:function(e){this[U.a]({name:V.modalName.profile.RETURN_REASON,open:!0,state:{productId:e}})}})},Y=Object(p.a)(X,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"return-check-products"},[r("h3",{staticClass:"return-check-products__title"},[e._v("Продукты")]),e._v(" "),e.selectedProducts?r("ul",{staticClass:"return-check-products__list"},e._l(e.selectedProducts,(function(t){return r("li",{key:t.id,staticClass:"return-check-products__list-item"},[r("return-product-card",{attrs:{href:e.generateItemProductUrl(t),type:t.type,id:t.id,quantity:t.quantity,image:t.image,name:t.name,price:t.price,"old-price":t.oldPrice,reason:t.reason},on:{"select-reason":e.onSelectReason}})],1)})),0):e._e(),e._v(" "),r("attention-panel",{staticClass:"return-check-products__attention-panel"},[e._v("После нажатия на кнопку «Продолжить», будет автоматически сформировано заявление на возврат. Вам нужно будет его распечатать и подписать, затем отсканировать подписанное заявление и прикрепить на следующем шаге.")]),e._v(" "),r("div",{staticClass:"return-check-products__bottom"},[r("div",{staticClass:"return-check-products__controls"},[r("v-button",{staticClass:"return-check-products__next-btn"},[e._v("Продолжить")]),e._v(" "),r("v-button",{staticClass:"return-check-products__back-btn btn--transparent",on:{click:e.onClickBack}},[e._v("Назад")])],1),e._v(" "),r("div",{staticClass:"return-check-products__info"},[e._v("\n            Сумма к возрату:\n            "),r("span",{staticClass:"return-check-products__info-sum"},[r("price",e._b({staticClass:"text-bold return-check-products__price"},"price",e.totalPrice,!1))],1)])]),e._v(" "),r("transition",{attrs:{name:"fade"}},[e.isModalOpen?r("return-reason-modal"):e._e()],1)],1)}),[],!1,null,null,null).exports;r("oHx4");function W(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Z(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?W(Object(r),!0).forEach((function(t){ee(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):W(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ee(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var te="".concat(f.NAME,"/").concat(v.a),re={name:"return",components:{VSvg:n.a,VLink:a.a},computed:Z(Z({},Object(m.d)(te,[v.d])),{},{backUrl:function(){return{name:""}},currentStep:function(){switch(this.step){case g.i.SELECT:return x;case g.i.CHECK:return Y;default:return x}}}),methods:Z({},Object(m.b)(te,[h.c])),beforeMount:function(){this.step||this[h.c](g.i.SELECT)}},ne=Object(p.a)(re,(function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"section return-view"},[t("div",{staticClass:"container container--tablet-lg"},[t("v-link",{staticClass:"return-view__back-link",attrs:{to:this.backUrl}},[t("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),this._v(" Назад\n        ")],1)],1),this._v(" "),t("h2",{staticClass:"return-view__title"},[this._v("Возврат Заказа №124589524")]),this._v(" "),t(this.currentStep,{tag:"component"})],1)}),[],!1,null,null,null);t.default=ne.exports},m4mT:function(e,t,r){},oHx4:function(e,t,r){}}]);