(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"58nk":function(t,e,a){},"6COw":function(t,e,a){},IPGE:function(t,e,a){"use strict";a.r(e);var i=a("NDiG"),n=a("7cXU"),s=a("45Ux"),l=a("PZpB"),o=a("i2Ud"),r=a.p+"images/profile.b9995cbba3b21fbb0255.png",c=(a("Jhov"),a("UyVj"),a("6COw"),{name:"image-picker",components:{VSvg:i.a,VLink:n.a,VButton:o.a},props:{image:{type:[String,Object],default:r},validTypes:{type:Array,default:function(){return["image/jpeg","image/jpg","image/png"]}}},computed:{inputId:function(){return"image-picker-".concat(this._uid)},types:function(){return this.validTypes.join(", ")},isTablet:function(){return this.$mq.tablet}},methods:{validFileType:function(t){return this.validTypes.some((function(e){return e===t.type}))},fileChange:function(){var t=this.$refs.imagePicker.files;t.length<1||!this.validFileType(t[0])||this.$emit("fileChanged",t[0])}}}),_=a("KHd+"),v=Object(_.a)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"image-picker"},[a("div",{staticClass:"image-picker__img"},[a("img",{attrs:{src:t.image,alt:""}})]),t._v(" "),a("div",{staticClass:"image-picker__body"},[a("div",{staticClass:"image-picker__body-controls"},[a("v-button",{staticClass:"btn--outline image-picker__body-controls-btn"},[t._v("\n                "+t._s(t.isTablet?"Загрузить другой":"Загрузить новое фото")+"\n            ")]),t._v(" "),a("v-link",{staticClass:"image-picker__body-controls-link",attrs:{tag:"button"}},[t.isTablet?a("v-svg",{attrs:{name:"cross",width:"24",height:"24"}}):[t._v("Удалить")]],2)],1),t._v(" "),a("div",{staticClass:"text-grey image-picker__body-note"},[t._v("В формате png или jpg, до 1 Мб")])])])}),[],!1,null,null,null).exports,u=a("KQVR"),p=a("a6oV"),m=a("SesW"),b=a("L2JU"),f=a("55Sm"),d=a("jDKC");a("58nk");function w(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function g(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var C="details-modal",h={name:C,mixins:[m.a],components:{VButton:o.a,VInput:u.a,GeneralModal:p.a},validations:{},data:function(){return{}},computed:{isTablet:function(){return this.$mq.tablet}},methods:function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?w(Object(a),!0).forEach((function(e){g(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):w(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},Object(b.b)(f.b,[d.a]),{onClose:function(){this[d.a]({name:C,open:!1})}})},y=Object(_.a)(h,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("general-modal",{staticClass:"details-modal",attrs:{header:"Реквизиты","is-mobile":t.isTablet},on:{close:t.onClose},scopedSlots:t._u([{key:"content",fn:function(){return[a("h4",{staticClass:"details-modal__hl"},[t._v("Реквизиты")]),t._v(" "),a("form",{staticClass:"details-modal__form"},[a("div",{staticClass:"details-modal__form-row"},[a("v-input",{staticClass:"details-modal__form-column"},[t._v("Наименование ИП")]),t._v(" "),a("v-input",{staticClass:"details-modal__form-column"},[t._v("Банк")])],1),t._v(" "),a("div",{staticClass:"details-modal__form-row"},[a("v-input",{staticClass:"details-modal__form-column"},[t._v("ИНН")]),t._v(" "),a("v-input",{staticClass:"details-modal__form-column"},[t._v("Корреспондентский счет банка")])],1),t._v(" "),a("div",{staticClass:"details-modal__form-row"},[a("div",{staticClass:"details-modal__form-column"},[a("v-input",[t._v("Расчетный счет")]),t._v(" "),a("v-input",[t._v("БИК")])],1),t._v(" "),a("div",{staticClass:"details-modal__form-column"},[a("v-input",{staticClass:"details-modal__form-textarea",attrs:{tag:"textarea","auto-height":t.isTablet}},[t._v("\n                        Юридический адрес\n                    ")])],1)])]),t._v(" "),a("div",{staticClass:"details-modal__submit"},[a("v-button",{staticClass:"details-modal__submit-btn",on:{click:t.onClose}},[t._v("\n                Сохранить\n            ")])],1)]},proxy:!0}])})}),[],!1,null,null,null).exports;a("BZIu"),a("eZRa"),a("Vr9U");function k(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function O(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?k(Object(a),!0).forEach((function(e){j(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):k(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function j(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var P={name:"cabinet",components:{VSvg:i.a,VLink:n.a,InfoRow:s.a,InfoPanel:l.a,ImagePicker:v,DetailsModal:y},computed:O({},Object(b.d)(f.b,{isDetailsOpen:function(t){return t[f.a][C]&&t[f.a][C].open}}),{isTablet:function(){return this.$mq.tablet}}),methods:O({},Object(b.b)(f.b,[d.a]),{onImageChanged:function(){},onOpenDetailsModal:function(){this[d.a]({name:C,open:!0})}})},x=Object(_.a)(P,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section cabinet-view"},[a("h2",{staticClass:"cabinet-view__hl"},[t._v(t._s(t.$t("profile.routes."+t.$route.name)))]),t._v(" "),a("image-picker",{staticClass:"cabinet-view__avatar",on:{fileChanged:t.onImageChanged}}),t._v(" "),a("info-panel",{staticClass:"cabinet-view__panel",attrs:{header:"Личные данные"},scopedSlots:t._u([{key:"controls",fn:function(){return[a("v-link",{staticClass:"cabinet-view__panel-link",attrs:{tag:"button"}},[a("v-svg",{attrs:{name:"edit",width:"16",height:"16"}}),t._v(" "),t.isTablet?t._e():[t._v("  Изменить")]],2)]},proxy:!0}])},[t._v(" "),a("ul",{staticClass:"cabinet-view__panel-list"},[a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"ФИО",value:"Динис Базгутдинов"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Дата рождения"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Пол",value:"Мужской"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Номер телефона",value:"+7 916 123-45-67"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Email",value:"disbag@gmail.com"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Портфолио"}},[a("ul",[a("li",[a("a",{staticClass:"cabinet-view__panel-item-link"},[t._v("Работы в Инстаграме")])]),t._v(" "),a("li",[a("a",{staticClass:"cabinet-view__panel-item-link"},[t._v("Портфолио «Свадебные прически»")])])])]),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Профиль",value:"Стилист, визажист"}})],1)]),t._v(" "),a("info-panel",{staticClass:"cabinet-view__panel",attrs:{header:"Пароль"},scopedSlots:t._u([{key:"controls",fn:function(){return[a("v-link",{staticClass:"cabinet-view__panel-link",attrs:{tag:"button"}},[a("v-svg",{attrs:{name:"edit",width:"16",height:"16"}}),t._v(" "),t.isTablet?t._e():[t._v("  Изменить")]],2)]},proxy:!0}])},[t._v(" "),a("ul",{staticClass:"cabinet-view__panel-list"},[a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Пароль"}},[t._v("\n                • • • • • • • • • • •\n            ")])],1)]),t._v(" "),a("info-panel",{staticClass:"cabinet-view__panel",attrs:{header:"Социальные сети"},scopedSlots:t._u([{key:"controls",fn:function(){return[a("v-link",{staticClass:"cabinet-view__panel-link",attrs:{tag:"button"}},[a("v-svg",{attrs:{name:"edit",width:"16",height:"16"}}),t._v(" "),t.isTablet?t._e():[t._v("  Изменить")]],2)]},proxy:!0}])},[t._v(" "),a("ul",{staticClass:"cabinet-view__panel-list"},[a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Vkontakte"},scopedSlots:t._u([{key:"link",fn:function(){return[a("v-link",{staticClass:"cabinet-view__panel-item-link",attrs:{tag:"button"}},[t._v("\n                        Подключить\n                    ")])]},proxy:!0}])}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Facebook",value:"Dinis Bazgutdinov"},scopedSlots:t._u([{key:"link",fn:function(){return[a("v-link",{staticClass:"cabinet-view__panel-item-link cabinet-view__panel-item-link--grey",attrs:{tag:"button"}},[t._v("\n                        Отключить\n                    ")])]},proxy:!0}])}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Instagram",value:"@disbag"},scopedSlots:t._u([{key:"link",fn:function(){return[a("v-link",{staticClass:"cabinet-view__panel-item-link cabinet-view__panel-item-link--grey",attrs:{tag:"button"}},[t._v("\n                        Отключить\n                    ")])]},proxy:!0}])})],1)]),t._v(" "),a("info-panel",{staticClass:"cabinet-view__panel",attrs:{header:"Реквизиты"},scopedSlots:t._u([{key:"controls",fn:function(){return[a("v-link",{staticClass:"cabinet-view__panel-link",attrs:{tag:"button"},on:{click:t.onOpenDetailsModal}},[a("v-svg",{attrs:{name:"edit",width:"16",height:"16"}}),t._v(" "),t.isTablet?t._e():[t._v("  Изменить")]],2)]},proxy:!0}])},[t._v(" "),a("ul",{staticClass:"cabinet-view__panel-list"},[a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Наименование ИП",value:"ООО «Соколов»"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"ИНН",value:"471101415706"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Расчетный счет",value:"17600000658470000"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"БИК",value:"1299786"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Банк",value:"Сбербанк"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Корреспондентский счет банка",value:"68000007970000008"}}),t._v(" "),a("info-row",{staticClass:"cabinet-view__panel-item",attrs:{name:"Юридический адрес",value:"Россия, г. Москва, г. Зеленоград, Самый Центральный проспект, к. 305, офис 134"}})],1)]),t._v(" "),a("info-panel",{staticClass:"cabinet-view__panel",attrs:{header:"Сертификаты"},scopedSlots:t._u([{key:"controls",fn:function(){return[a("v-link",{staticClass:"cabinet-view__panel-link",attrs:{tag:"button"}},[a("v-svg",{attrs:{name:"edit",width:"16",height:"16"}}),t._v(" "),t.isTablet?t._e():[t._v("  Изменить")]],2)]},proxy:!0}])},[t._v(" "),a("ul",{staticClass:"cabinet-view__panel-list"},[a("info-row",{staticClass:"text-sm cabinet-view__panel-item cabinet-view__panel-item--dropzone",attrs:{name:"Не более 10 файлов, jpeg, png, mp4, mov. Фото не более 5Mb, видео до 15Mb"}},[a("div",{staticClass:"cabinet-view__panel-dropzone"},[t._v("\n                    Выберите фото\n                ")])])],1)]),t._v(" "),a("transition",{attrs:{name:"fade"}},[t.isDetailsOpen?a("details-modal"):t._e()],1)],1)}),[],!1,null,null,null);e.default=x.exports},Vr9U:function(t,e,a){}}]);