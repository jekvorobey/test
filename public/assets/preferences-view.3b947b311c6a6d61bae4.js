(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{"W+R+":function(e,t,n){"use strict";n.r(t);var r=n("NDiG"),i=n("7cXU"),a=n("o3vK"),s=n("PZpB"),c=n("tHOl"),o=n("i2Ud"),l=n("KQVR"),u=n("a6oV"),p=n("L2JU"),f=n("55Sm"),d=n("jDKC"),h=n("sEfC"),m=n.n(h),b=n("2JJK");n("vXAK");function v(e){return function(e){if(Array.isArray(e))return y(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){S(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O,E=b.modalName.profile.PREFERENCE_EDIT,C={name:E,components:{VSvg:r.a,VButton:o.a,VCheck:a.a,VInput:l.a,GeneralModal:u.a},data:function(){return{filterString:"",selectedEntities:[]}},computed:_(_({},Object(p.d)(f.b,{isOpen:function(e){return e[f.a][E]&&e[f.a][E].open||!1},modalState:function(e){return e[f.a][E]&&e[f.a][E].state||{availableEntities:[],entities:[]}}})),{},{prefType:function(){return this.modalState.prefType},type:function(){return this.modalState.type},data:function(){return this.modalState.data},filteredEntities:function(){var e=this,t=(this.filterString||"").toLowerCase();return this.modalState.availableEntities.filter((function(n){return!e.entities.some((function(e){return e.id===n.id}))&&(n.name||"").toLowerCase().includes(t)}))},entities:function(){return this.modalState.entities},header:function(){switch(this.type){case"brands":return"Добавить бренды";case"categories":return"Добавить категории";default:return"Добавить сущности"}},title:function(){switch(this.type){case"brands":return"Выберите бренды";case"categories":return"Выберите категории";default:return"Выберите сущности"}},isTablet:function(){return this.$mq.tablet}}),methods:_(_({},Object(p.b)(f.b,[d.a])),{},{isChecked:function(e){return this.selectedEntities.some((function(t){return t.id===e}))},onFilterChange:function(e){this.filterString=e},onCheckedChanged:function(e,t){if(e)this.selectedEntities.push(t);else{var n=this.selectedEntities.indexOf(t);-1!==n&&this.selectedEntities.splice(n,1)}},onSubmit:function(){var e=this.type,t=this.prefType,n=[].concat(v(this.entities.map((function(e){return e.id}))),v(this.selectedEntities.map((function(e){return e.id}))));this.$emit("submit",{prefType:t,type:e,items:n}),this.onClose()},onClose:function(){this[d.a]({name:E,open:!1})}}),beforeMount:function(){this.debounce_onFilterChange=m()(this.onFilterChange,300)}},w=n("KHd+"),T=Object(w.a)(C,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isOpen?n("general-modal",{staticClass:"preference-edit-modal",attrs:{type:"sm",header:e.header,"is-mobile":e.isTablet},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[n("h3",{staticClass:"preference-edit-modal__hl"},[e._v(e._s(e.header))]),e._v(" "),n("v-input",{staticClass:"preference-edit-modal__input",on:{input:e.debounce_onFilterChange},scopedSlots:e._u([{key:"after",fn:function(){return[n("v-svg",{attrs:{name:"search-middle",width:"24",height:"24"}})]},proxy:!0}],null,!1,3535015113)}),e._v(" "),n("h6",{staticClass:"preference-edit-modal__title"},[e._v(e._s(e.title))]),e._v(" "),n("ul",{staticClass:"preference-edit-modal__list"},e._l(e.filteredEntities,(function(t){return n("li",{key:t.id,staticClass:"preference-edit-modal__list-item"},[n("v-check",{key:t.id,staticClass:"preference-edit-modal__list-check",attrs:{name:e.type,id:e.type+"-"+t.id,value:t.id,checked:e.isChecked(t.id)},on:{change:function(n){return e.onCheckedChanged(n,t)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")])],1)})),0),e._v(" "),n("div",{staticClass:"preference-edit-modal__submit"},[n("v-button",{staticClass:"preference-edit-modal__submit-btn",on:{click:e.onSubmit}},[e._v("\n                Добавить\n            ")])],1)]},proxy:!0}],null,!1,4016049977)}):e._e()}),[],!1,null,null,null).exports,A=n("rBTT"),k=n("karI"),P=n("ABRD"),R=n("SDMQ"),j=n("3eXy"),I=n("q5Zp");n("Jhov"),n("zYMX"),n("xfwz");function N(e,t,n,r,i,a,s){try{var c=e[a](s),o=c.value}catch(e){return void n(e)}c.done?t(o):Promise.resolve(o).then(r,i)}function D(e){return function(e){if(Array.isArray(e))return B(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return B(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return B(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){x(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var F="".concat(A.NAME,"/").concat(k.d);var z={name:"preferences",components:{VSvg:r.a,VLink:i.a,VCheck:a.a,InfoPanel:s.a,TagItem:c.a,PreferenceEditModal:T},data:function(){return{actualBrands:[],actualCategories:[],brandsSame:!1,categoriesSame:!1}},computed:$($($($({},Object(p.d)(f.b,{isPreferencesOpen:function(e){return e[f.a][b.modalName.profile.PREFERENCE_EDIT]&&e[f.a][b.modalName.profile.PREFERENCE_EDIT].open}})),Object(p.d)(F,[k.a,k.b,k.c,k.e])),Object(p.c)(F,[P.a,P.b,P.c])),{},{prefType:function(){return this[k.e]},isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16},brandList:function(){return this.actualBrands.length?this.actualBrands.map((function(e){return e.name})).join(", "):""},categoryList:function(){return this.actualCategories.length?this.actualCategories.map((function(e){return e.name})).join(", "):""}}),watch:(O={brandsSame:function(e){if(e){var t=(this[P.c](I.f.PERSONAL)||{})[I.e.BRANDS]||[];this[R.d]({prefType:I.f.PROFESSIONAL,type:I.e.BRANDS,items:D(t)})}},categoriesSame:function(e){if(e){var t=(this[P.c](I.f.PERSONAL)||{})[I.e.CATEGORIES]||[];this[R.d]({prefType:I.f.PROFESSIONAL,type:I.e.CATEGORIES,items:D(t)})}}},x(O,P.a,(function(e){this.actualBrands=D(e||[])})),x(O,P.b,(function(e){this.actualCategories=D(e||[])})),x(O,k.e,(function(){this.initHandlers()})),O),methods:$($($({},Object(p.b)(f.b,[d.a])),Object(p.b)(F,[R.a,R.d,R.c])),{},{onDeleteEntity:function(e,t){switch(e){case I.e.BRANDS:this.actualBrands.splice(t,1),this.debounce_updateBrands(this.actualBrands.map((function(e){return e.id})));break;case I.e.CATEGORIES:this.actualCategories.splice(t,1),this.debounce_updateCategories(this.actualCategories.map((function(e){return e.id})))}},onDeleteAll:function(e){var t=this.prefType;this.onSubmit({prefType:t,type:e,items:[]})},onSubmit:function(e){var t,n=this;return(t=regeneratorRuntime.mark((function t(){var r,i,a,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.prefType,i=e.type,a=e.items,s=void 0===a?[]:a,t.prev=1,t.next=4,n[R.d]({prefType:r,type:i,items:s});case 4:t.t0=i,t.next=t.t0===I.e.BRANDS?7:t.t0===I.e.CATEGORIES?9:11;break;case 7:return n.actualBrands=D(n[P.a]),t.abrupt("break",11);case 9:return n.actualCategories=D(n[P.b]),t.abrupt("break",11);case 11:t.next=16;break;case 13:t.prev=13,t.t1=t.catch(1),j.$logger.error(t.t1);case 16:case"end":return t.stop()}}),t,null,[[1,13]])})),function(){var e=this,n=arguments;return new Promise((function(r,i){var a=t.apply(e,n);function s(e){N(a,r,i,s,c,"next",e)}function c(e){N(a,r,i,s,c,"throw",e)}s(void 0)}))})()},onAddEntities:function(e){var t=this.prefType,n=[],r=[];switch(e){case I.e.BRANDS:n=this[k.a],r=this.actualBrands;break;case I.e.CATEGORIES:n=this[k.b],r=this.actualCategories}this[d.a]({name:b.modalName.profile.PREFERENCE_EDIT,open:!0,state:{type:e,prefType:t,availableEntities:n,entities:r}})},initCollections:function(){this.actualBrands=D(this[P.a]),this.actualCategories=D(this[P.b])},initHandlers:function(){var e=this,t=this.prefType;this.debounce_updateBrands=m()((function(n){return e[R.d]({prefType:t,type:I.e.BRANDS,items:n})}),1e3),this.debounce_updateCategories=m()((function(n){return e[R.d]({prefType:t,type:I.e.CATEGORIES,items:n})}),1e3)}}),beforeRouteEnter:function(e,t,n){var r=e.name;if(j.$store.state[A.NAME][k.d].load)return n(),void j.$store.dispatch("".concat(F,"/").concat(R.b),!1);var i=function(e){switch(e){case"Preferences":return I.f.PERSONAL;case"ProPreferences":return I.f.PROFESSIONAL}}(r);j.$progress.start(),j.$store.dispatch("".concat(F,"/").concat(R.a),{prefType:i,isServer:j.$context.isServer}).then((function(){j.$store.dispatch("".concat(F,"/").concat(R.c),i),n((function(e){e.brandsSame=!1,e.categoriesSame=!1,j.$progress.finish()}))})).catch((function(e){j.$logger.error(e),n((function(e){j.$progress.fail()}))}))},created:function(){this.preferenceType=I.f,this.preferenceEntityTypes=I.e},beforeMount:function(){this.initHandlers(),this.initCollections()}},G=Object(w.a)(z,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section preferences-view"},[n("h2",{staticClass:"preferences-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),n("info-panel",{staticClass:"preferences-view__panel",attrs:{header:"Бренды"},scopedSlots:e._u([{key:"controls",fn:function(){return[n("div",{staticClass:"preferences-view__panel-links"},[n("v-link",{staticClass:"preferences-view__panel-link",attrs:{tag:"button",disabled:e.actualBrands.length===e.availableBrands.length||e.brandsSame&&e.prefType===e.preferenceType.PROFESSIONAL},on:{click:function(t){return e.onAddEntities(e.preferenceEntityTypes.BRANDS)}}},[n("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Добавить")])],1),e._v(" "),n("v-link",{staticClass:"preferences-view__panel-link",attrs:{tag:"button",disabled:0===e.actualBrands.length||e.brandsSame&&e.prefType===e.preferenceType.PROFESSIONAL},on:{click:function(t){return e.onDeleteAll(e.preferenceEntityTypes.BRANDS)}}},[n("v-svg",{attrs:{name:"cross",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Удалить все")])],1)],1)]},proxy:!0}])},[e._v(" "),n("div",{staticClass:"container container--tablet-lg"},[e.prefType===e.preferenceType.PROFESSIONAL?n("v-check",{attrs:{id:"pro-preferences-brands",name:"pro-preferences-brands"},model:{value:e.brandsSame,callback:function(t){e.brandsSame=t},expression:"brandsSame"}},[e._v("\n                Профессиональные предпочтения совпадают с личными\n            ")]):e._e(),e._v(" "),e.brandsSame&&e.prefType===e.preferenceType.PROFESSIONAL?n("div",[n("h3",{staticClass:"preferences-view__panel-hl"},[e._v("\n                    Выбранные бренды\n                ")]),e._v(" "),n("p",{staticClass:"preferences-view__panel-list"},[e._v("\n                    "+e._s(e.brandList)+"\n                ")])]):n("transition-group",{staticClass:"preferences-view__panel-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.actualBrands,(function(t,r){return n("tag-item",{key:t.id,staticClass:"preferences-view__panel-tags-item",attrs:{text:t.name},on:{delete:function(t){return e.onDeleteEntity(e.preferenceEntityTypes.BRANDS,r)}}})})),1)],1)]),e._v(" "),n("info-panel",{staticClass:"preferences-view__panel",attrs:{header:"Категории"},scopedSlots:e._u([{key:"controls",fn:function(){return[n("div",{staticClass:"preferences-view__panel-links"},[n("v-link",{staticClass:"preferences-view__panel-link",attrs:{tag:"button",disabled:e.actualCategories.length===e.availableCategories.length||e.categoriesSame&&e.prefType===e.preferenceType.PROFESSIONAL},on:{click:function(t){return e.onAddEntities(e.preferenceEntityTypes.CATEGORIES)}}},[n("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Добавить")])],1),e._v(" "),n("v-link",{staticClass:"preferences-view__panel-link",attrs:{tag:"button",disabled:0===e.actualCategories.length||e.categoriesSame&&e.prefType===e.preferenceType.PROFESSIONAL},on:{click:function(t){return e.onDeleteAll(e.preferenceEntityTypes.CATEGORIES)}}},[n("v-svg",{attrs:{name:"cross",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Удалить все")])],1)],1)]},proxy:!0}])},[e._v(" "),n("div",{staticClass:"container container--tablet-lg"},[e.prefType===e.preferenceType.PROFESSIONAL?n("v-check",{attrs:{id:"pro-preferences-categories",name:"pro-preferences-categories"},model:{value:e.categoriesSame,callback:function(t){e.categoriesSame=t},expression:"categoriesSame"}},[e._v("\n                Профессиональные предпочтения совпадают с личными\n            ")]):e._e(),e._v(" "),e.categoriesSame&&e.prefType===e.preferenceType.PROFESSIONAL?n("div",[n("h3",{staticClass:"preferences-view__panel-hl"},[e._v("\n                    Выбранные категории\n                ")]),e._v(" "),n("p",{staticClass:"preferences-view__panel-list"},[e._v("\n                    "+e._s(e.categoryList)+"\n                ")])]):n("transition-group",{staticClass:"preferences-view__panel-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.actualCategories,(function(t,r){return n("tag-item",{key:t.id,staticClass:"preferences-view__panel-tags-item",attrs:{text:t.name},on:{delete:function(t){return e.onDeleteEntity(e.preferenceEntityTypes.CATEGORIES,r)}}})})),1)],1)]),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.$isServer||e.isPreferencesOpen?n("preference-edit-modal",{on:{submit:e.onSubmit}}):e._e()],1)],1)}),[],!1,null,null,null);t.default=G.exports},vXAK:function(e,t,n){},xfwz:function(e,t,n){}}]);