(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"6COw":function(t,a,n){},"9MOV":function(t,a,n){"use strict";n.r(a);var e=n("NDiG"),i=n("7cXU"),s=(n("E/K4"),{name:"info-row",props:{name:{},value:{}}}),c=n("KHd+"),o=Object(c.a)(s,(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("li",{staticClass:"info-row"},[n("div",{staticClass:"text-grey info-row__name"},[t._v(t._s(t.name))]),t._v(" "),n("div",{staticClass:"info-row__value"},[t._t("default",[t._v(t._s(t.value||"-"))])],2),t._v(" "),n("div",{staticClass:"info-row__link"},[t._t("link")],2)])}),[],!1,null,null,null).exports,l=n("PZpB"),_=n("i2Ud"),r=n.p+"images/profile.b9995cbba3b21fbb0255.png",u=(n("UyVj"),n("6COw"),{name:"image-picker",components:{VSvg:e.a,VLink:i.a,VButton:_.a},props:{image:{type:[String,Object],default:r},validTypes:{type:Array,default:function(){return["image/jpeg","image/jpg","image/png"]}}},computed:{inputId:function(){return"image-picker-".concat(this._uid)},types:function(){return this.validTypes.join(", ")}},methods:{validFileType:function(t){return this.validTypes.some((function(a){return a===t.type}))},fileChange:function(){var t=this.$refs.imagePicker.files;t.length<1||!this.validFileType(t[0])||this.$emit("fileChanged",t[0])}}}),v=Object(c.a)(u,(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"image-picker"},[a("div",{staticClass:"image-picker__img"},[a("img",{attrs:{src:this.image,alt:""}})]),this._v(" "),a("div",{staticClass:"image-picker__body"},[a("div",{staticClass:"image-picker__body-controls"},[a("v-button",{staticClass:"btn--outline"},[this._v("Загрузить новое фото")]),this._v(" "),a("v-button",{staticClass:"btn--transparent image-picker__body-controls-delete"},[this._v("Удалить")])],1),this._v(" "),a("div",{staticClass:"text-grey"},[this._v("В формате png или jpg, до 1 Мб")])])])}),[],!1,null,null,null).exports,p=(n("eZRa"),n("kAgC"),{name:"account",components:{VSvg:e.a,VLink:i.a,InfoRow:o,InfoPanel:l.a,ImagePicker:v},data:function(){return{}},computed:{},watch:{},methods:{onImageChanged:function(t){}},beforeRouteEnter:function(t,a,n){n()},beforeRouteUpdate:function(t,a,n){n()},beforeMount:function(){}}),m=Object(c.a)(p,(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("section",{staticClass:"section account-view"},[n("h2",{staticClass:"account-view__hl"},[t._v("Профиль")]),t._v(" "),n("image-picker",{staticClass:"account-view__avatar",on:{fileChanged:t.onImageChanged}}),t._v(" "),n("info-panel",{staticClass:"account-view__panel",attrs:{header:"Личные данные"},scopedSlots:t._u([{key:"controls",fn:function(){return[n("v-link",{staticClass:"account-view__panel-link",attrs:{tag:"button"}},[n("v-svg",{attrs:{name:"edit",width:"16",height:"16"}}),t._v("\n                  Изменить\n            ")],1)]},proxy:!0}])},[t._v(" "),n("ul",{staticClass:"account-view__panel-list"},[n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"ФИО",value:"Динис Базгутдинов"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Дата рождения"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Пол",value:"Мужской"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Номер телефона",value:"+7 916 123-45-67"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Email",value:"disbag@gmail.com"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Портфолио"}},[n("ul",[n("li",[n("a",{staticClass:"account-view__panel-item-link"},[t._v("Работы в Инстаграме")])]),t._v(" "),n("li",[n("a",{staticClass:"account-view__panel-item-link"},[t._v("Портфолио «Свадебные прически»")])])])]),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Профиль",value:"Стилист, визажист"}})],1)]),t._v(" "),n("info-panel",{staticClass:"account-view__panel",attrs:{header:"Пароль"},scopedSlots:t._u([{key:"controls",fn:function(){return[n("v-link",{staticClass:"account-view__panel-link",attrs:{tag:"button"}},[n("v-svg",{attrs:{name:"edit",width:"16",height:"16"}}),t._v("\n                  Изменить\n            ")],1)]},proxy:!0}])},[t._v(" "),n("ul",{staticClass:"account-view__panel-list"},[n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Пароль"}},[t._v("\n                • • • • • • • • • • •\n            ")])],1)]),t._v(" "),n("info-panel",{staticClass:"account-view__panel",attrs:{header:"Социальные сети"},scopedSlots:t._u([{key:"controls",fn:function(){return[n("v-link",{staticClass:"account-view__panel-link",attrs:{tag:"button"}},[n("v-svg",{attrs:{name:"edit",width:"16",height:"16"}}),t._v("\n                  Изменить\n            ")],1)]},proxy:!0}])},[t._v(" "),n("ul",{staticClass:"account-view__panel-list"},[n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Vkontakte"},scopedSlots:t._u([{key:"link",fn:function(){return[n("v-link",{staticClass:"account-view__panel-item-link",attrs:{tag:"button"}},[t._v("\n                        Подключить\n                    ")])]},proxy:!0}])}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Facebook",value:"Dinis Bazgutdinov"},scopedSlots:t._u([{key:"link",fn:function(){return[n("v-link",{staticClass:"account-view__panel-item-link account-view__panel-item-link--grey",attrs:{tag:"button"}},[t._v("\n                        Отключить\n                    ")])]},proxy:!0}])}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Instagram",value:"@disbag"},scopedSlots:t._u([{key:"link",fn:function(){return[n("v-link",{staticClass:"account-view__panel-item-link account-view__panel-item-link--grey",attrs:{tag:"button"}},[t._v("\n                        Отключить\n                    ")])]},proxy:!0}])})],1)]),t._v(" "),n("info-panel",{staticClass:"account-view__panel",attrs:{header:"Социальные сети"},scopedSlots:t._u([{key:"controls",fn:function(){return[n("v-link",{staticClass:"account-view__panel-link",attrs:{tag:"button"}},[n("v-svg",{attrs:{name:"edit",width:"16",height:"16"}}),t._v("\n                  Изменить\n            ")],1)]},proxy:!0}])},[t._v(" "),n("ul",{staticClass:"account-view__panel-list"},[n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Наименование ИП",value:"ООО «Соколов»"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"ИНН",value:"471101415706"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Расчетный счет",value:"17600000658470000"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"БИК",value:"1299786"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Банк",value:"Сбербанк"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Корреспондентский счет банка",value:"68000007970000008"}}),t._v(" "),n("info-row",{staticClass:"account-view__panel-item",attrs:{name:"Юридический адрес",value:"Россия, г. Москва, г. Зеленоград, Самый Центральный проспект, к. 305, офис 134"}})],1)]),t._v(" "),n("info-panel",{staticClass:"account-view__panel",attrs:{header:"Пароль"},scopedSlots:t._u([{key:"controls",fn:function(){return[n("v-link",{staticClass:"account-view__panel-link",attrs:{tag:"button"}},[n("v-svg",{attrs:{name:"edit",width:"16",height:"16"}}),t._v("\n                  Изменить\n            ")],1)]},proxy:!0}])},[t._v(" "),n("ul",{staticClass:"account-view__panel-list"},[n("info-row",{staticClass:"text-sm account-view__panel-item account-view__panel-item--dropzone",attrs:{name:"Не более 10 файлов, jpeg, png, mp4, mov. Фото не более 5Mb, видео до 15Mb"}},[n("div",{staticClass:"account-view__panel-dropzone"},[t._v("\n                    Выберите фото\n                ")])])],1)])],1)}),[],!1,null,null,null);a.default=m.exports},"E/K4":function(t,a,n){},kAgC:function(t,a,n){}}]);