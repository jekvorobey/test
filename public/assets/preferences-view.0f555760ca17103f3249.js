(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{"W+R+":function(e,t,n){"use strict";n.r(t);var r=n("NDiG"),i=n("i2Ud"),a=n("o3vK"),s=n("KQVR"),o=n("LeEK"),c=n("a6oV"),l=n("L2JU"),u=n("55Sm"),f=n("jDKC"),p=n("sEfC"),d=n.n(p),h=n("2JJK");n("vXAK");function y(e){return function(e){if(Array.isArray(e))return m(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){_(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=h.modalName.profile.PREFERENCE_EDIT,E={name:g,components:{VSvg:r.a,VButton:i.a,VCheck:a.a,VInput:s.a,VScroll:o.a,GeneralModal:c.a},data:function(){return{filterString:"",selectedEntities:[]}},computed:v(v({},Object(l.d)(u.b,{isOpen:function(e){return e[u.a][g]&&e[u.a][g].open||!1},modalState:function(e){return e[u.a][g]&&e[u.a][g].state||{availableEntities:[],entities:[]}}})),{},{prefType:function(){return this.modalState.prefType},type:function(){return this.modalState.type},data:function(){return this.modalState.data},filteredEntities:function(){var e=this,t=(this.filterString||"").toLowerCase();return this.modalState.availableEntities.filter((function(n){return!e.entities.some((function(e){return e.id===n.id}))&&(n.name||"").toLowerCase().includes(t)}))},entities:function(){return this.modalState.entities},header:function(){switch(this.type){case"brands":return"Добавить бренды";case"categories":return"Добавить категории";default:return"Добавить сущности"}},title:function(){switch(this.type){case"brands":return"Выберите бренды";case"categories":return"Выберите категории";default:return"Выберите сущности"}},isTablet:function(){return this.$mq.tablet}}),methods:v(v({},Object(l.b)(u.b,[f.a])),{},{isChecked:function(e){return this.selectedEntities.some((function(t){return t.id===e}))},onFilterChange:function(e){this.filterString=e},onCheckedChanged:function(e,t){if(e)this.selectedEntities.push(t);else{var n=this.selectedEntities.indexOf(t);-1!==n&&this.selectedEntities.splice(n,1)}},onSubmit:function(){var e=this.type,t=this.prefType,n=[].concat(y(this.entities.map((function(e){return e.id}))),y(this.selectedEntities.map((function(e){return e.id}))));this.$emit("submit",{prefType:t,type:e,items:n}),this.onClose()},onClose:function(){this[f.a]({name:g,open:!1})}}),beforeMount:function(){this.debounce_onFilterChange=d()(this.onFilterChange,300)}},O=n("KHd+"),C=Object(O.a)(E,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isOpen?n("general-modal",{staticClass:"preference-edit-modal",attrs:{type:"sm",header:e.header,"is-scroll-locked":e.isTablet,"is-mobile":e.isTablet},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[n("h3",{staticClass:"preference-edit-modal__hl"},[e._v(e._s(e.header))]),e._v(" "),n("v-input",{staticClass:"preference-edit-modal__input",on:{input:e.debounce_onFilterChange},scopedSlots:e._u([{key:"after",fn:function(){return[n("v-svg",{attrs:{name:"search-middle",width:"24",height:"24"}})]},proxy:!0}],null,!1,3535015113)}),e._v(" "),n("h6",{staticClass:"preference-edit-modal__title"},[e._v(e._s(e.title))]),e._v(" "),n("div",{staticClass:"preference-edit-modal__body"},[e.isTablet?n("ul",{staticClass:"preference-edit-modal__list"},e._l(e.filteredEntities,(function(t){return n("li",{key:t.id,staticClass:"preference-edit-modal__list-item"},[n("v-check",{key:t.id,staticClass:"preference-edit-modal__list-check",attrs:{name:e.type,id:e.type+"-"+t.id,value:t.id,checked:e.isChecked(t.id)},on:{change:function(n){return e.onCheckedChanged(n,t)}}},[e._v("\n                        "+e._s(t.name)+"\n                    ")])],1)})),0):n("v-scroll",{staticClass:"preference-edit-modal__scroll",attrs:{"scroll-lock":""}},[n("ul",{staticClass:"preference-edit-modal__list"},e._l(e.filteredEntities,(function(t){return n("li",{key:t.id,staticClass:"preference-edit-modal__list-item"},[n("v-check",{key:t.id,staticClass:"preference-edit-modal__list-check",attrs:{name:e.type,id:e.type+"-"+t.id,value:t.id,checked:e.isChecked(t.id)},on:{change:function(n){return e.onCheckedChanged(n,t)}}},[e._v("\n                            "+e._s(t.name)+"\n                        ")])],1)})),0)])],1),e._v(" "),n("div",{staticClass:"preference-edit-modal__submit"},[n("v-button",{staticClass:"preference-edit-modal__submit-btn",on:{click:e.onSubmit}},[e._v("Добавить")])],1)]},proxy:!0}],null,!1,2813381704)}):e._e()}),[],!1,null,null,null).exports,S=n("7cXU"),P=n("dMOp"),T=n("PZpB"),w=n("tHOl"),j=n("rBTT"),k=n("karI"),A=n("ABRD"),q=n("q5Zp");n("Jhov"),n("zYMX"),n("LZ6J"),n("uEDR");function D(e){return function(e){if(Array.isArray(e))return x(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||R(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function $(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=R(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,o=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return s=e.done,e},e:function(e){o=!0,a=e},f:function(){try{s||null==n.return||n.return()}finally{if(o)throw a}}}}function R(e,t){if(e){if("string"==typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?x(e,t):void 0}}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach((function(t){M(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function M(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var L="".concat(j.NAME,"/").concat(k.c),F="change-equal",V="delete-all",z="delete",K={name:"preferences-entity-panel",components:{VSvg:r.a,VLink:S.a,VCheck:a.a,VButton:i.a,VSpinner:P.a,InfoPanel:T.a,TagItem:w.a},props:{entityType:{type:String},equalPreferences:{type:Array,default:function(){return[]}},inProcess:{type:Boolean,default:!1}},data:function(){return{actualEntities:[]}},computed:N(N(N({},Object(l.d)(L,[k.a,k.d])),Object(l.c)(L,[A.a])),{},{prefType:function(){return this[k.d]},entities:function(){var e=this.entitiesMap;return this.available[this.entityType].filter((function(t){return!!e[t.id]}))},entitiesMap:function(){var e,t=this.prefType,n=this.entityType,r={},i=$(this[A.a](t)[n]||[]);try{for(i.s();!(e=i.n()).done;){var a=e.value;r[a]=a}}catch(e){i.e(e)}finally{i.f()}return r},entitiesList:function(){return this.actualEntities&&this.actualEntities.map((function(e){return e.name})).join(", ")},equalPreferencesMap:function(){var e,t=this.equalPreferences,n={},r=$(void 0===t?[]:t);try{for(r.s();!(e=r.n()).done;){var i=e.value;n[i]=i}}catch(e){r.e(e)}finally{r.f()}return n},header:function(){var e=this.entityType;return this.$t("profile.preferences.".concat(e,".title"))},disabledControls:function(){var e=this.entityType,t=this.isEqual,n=this.available,r=this.entities,i=this.inProcess,a=n[e];return{add:i||a.length===r.length,delete:i||t||0===r.length,check:i,tags:i}},isEqual:function(){var e=this.equalPreferencesMap,t=this.entityType;return this.prefType===q.f.PROFESSIONAL&&!!e[t]},isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16}}),watch:M({equalPreferences:function(){this.initCollections()},entities:function(){this.initCollections()}},k.d,(function(){this.initHandlers()})),methods:N(N({},Object(l.b)(u.b,[f.a])),{},{onChangeEqual:function(e){this.$emit(F,e)},onDeleteAll:function(){var e=this.prefType,t=this.entityType;this.$emit(V,{prefType:e,type:t})},onDeleteEntity:function(e){this.actualEntities.splice(e,1),this.debounce_updateEntities(this.actualEntities.map((function(e){return e.id})))},onAddEntities:function(){var e=this.prefType,t=this.available,n=this.entityType,r=this.actualEntities,i=t[n]||[],a=r||[];this[f.a]({name:h.modalName.profile.PREFERENCE_EDIT,open:!0,state:{type:n,prefType:e,availableEntities:i,entities:a}})},initCollections:function(){var e=this.entities,t=void 0===e?[]:e;this.actualEntities=D(t)},initHandlers:function(){var e=this,t=this.prefType,n=this.entityType;this.debounce_updateEntities=d()((function(r){return e.$emit(z,{prefType:t,type:n,items:r})}),1e3)}}),created:function(){this.preferenceType=q.f,this.preferenceEntityTypes=q.e,this.initHandlers(),this.initCollections()}},B=Object(O.a)(K,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("info-panel",{staticClass:"preferences-entity-panel",scopedSlots:e._u([{key:"header",fn:function(){return[n("div",{staticClass:"text-bold info-panel__header-hl preferences-entity-panel__hl"},[e._v("\n            "+e._s(e.header)+" "),n("v-spinner",{attrs:{show:e.inProcess,width:"24",height:"24"}})],1)]},proxy:!0},{key:"controls",fn:function(){return[n("div",{staticClass:"preferences-entity-panel__links"},[n("v-link",{staticClass:"preferences-entity-panel__link",attrs:{tag:"button",disabled:e.disabledControls.add},on:{click:e.onAddEntities}},[n("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Добавить")])],1),e._v(" "),n("v-link",{staticClass:"preferences-entity-panel__link",attrs:{tag:"button",disabled:e.disabledControls.delete},on:{click:e.onDeleteAll}},[n("v-svg",{attrs:{name:"cross",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Удалить все")])],1)],1)]},proxy:!0}])},[e._v(" "),e._v(" "),n("div",{staticClass:"container container--tablet-lg"},[e.prefType===e.preferenceType.PROFESSIONAL?n("v-check",{attrs:{checked:e.isEqual,disabled:e.disabledControls.check,id:"pro-preferences-"+e.entityType,name:"pro-preferences-"+e.entityType},on:{change:function(t){return e.onChangeEqual(e.entityType)}}},[e._v("\n            Профессиональные предпочтения совпадают с личными\n        ")]):e._e(),e._v(" "),e.equalPreferencesMap[e.entityType]&&e.prefType===e.preferenceType.PROFESSIONAL?n("div",{staticClass:"preferences-entity-panel__equals"},[e.actualEntities&&e.actualEntities.length>0?n("h3",{staticClass:"preferences-entity-panel__equals-hl"},[e._v("\n                "+e._s(e.$t("profile.preferences."+e.entityType+".choosen"))+"\n            ")]):e._e(),e._v(" "),n("p",{staticClass:"preferences-entity-panel__equals-list"},[e._v("\n                "+e._s(e.entitiesList)+"\n            ")])]):e.actualEntities.length?n("transition-group",{staticClass:"preferences-entity-panel__tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.actualEntities,(function(t,r){return n("tag-item",{key:t.id,staticClass:"preferences-entity-panel__tags-item",attrs:{text:t.name,disabled:e.disabledControls.tags},on:{delete:function(t){return e.onDeleteEntity(r)}}})})),1):n("div",{staticClass:"container container--tablet-lg preferences-entity-panel__empty-container"},[n("v-svg",{attrs:{name:"info-middle",width:"24",height:"24"}}),e._v(" "),n("span",{staticClass:"preferences-entity-panel__empty-text"},[e._v("\n                "+e._s(e.$t("profile.preferences."+e.entityType+".notChoosen"))+"\n            ")]),e._v(" "),n("v-button",{staticClass:"btn--outline",attrs:{disabled:e.disabledControls.add},on:{click:e.onAddEntities}},[e._v("\n                Добавить\n            ")])],1)],1)])}),[],!1,null,null,null).exports,J=n("SDMQ"),U=n("3eXy"),H=n("nfjx");n("xfwz");function X(e,t,n,r,i,a,s){try{var o=e[a](s),c=o.value}catch(e){return void n(e)}o.done?t(c):Promise.resolve(c).then(r,i)}function G(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var a=e.apply(t,n);function s(e){X(a,r,i,s,o,"next",e)}function o(e){X(a,r,i,s,o,"throw",e)}s(void 0)}))}}function Z(e){return function(e){if(Array.isArray(e))return Q(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return Q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Q(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function W(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?W(Object(n),!0).forEach((function(t){ee(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):W(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ee(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var te="".concat(j.NAME,"/").concat(k.c);var ne={name:"preferences",mixins:[H.a],components:{PreferencesEntityPanel:B,PreferenceEditModal:C},metaInfo:function(){return{title:this.pageTitle}},data:function(){var e;return{inProcess:(e={},ee(e,q.e.BRANDS,!1),ee(e,q.e.CATEGORIES,!1),e),actualEqual:[]}},computed:Y(Y(Y(Y({},Object(l.d)(u.b,{isPreferencesOpen:function(e){return e[u.a][h.modalName.profile.PREFERENCE_EDIT]&&e[u.a][h.modalName.profile.PREFERENCE_EDIT].open}})),Object(l.d)(te,[k.b,k.d])),Object(l.c)(te,[A.a])),{},{prefType:function(){return this[k.d]},equalPreferences:function(){var e=this.prefType;return this[A.a](e).equal_preferences},entityTypes:function(){return q.e},pageTitle:function(){return this.$t("profile.routes.".concat(this.$route.name))},isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16}}),watch:{equalPreferences:function(e){e&&(this.actualEqual=Z(e))}},methods:Y(Y(Y({},Object(l.b)(u.b,[f.a])),Object(l.b)(te,[J.e,J.f,J.b,J.d,J.a])),{},{hasEqual:function(e){return this.actualEqual.includes(e)},toggleEqual:function(e){var t=this.actualEqual;return t.includes(e)?t.splice(t.indexOf(e),1):t.push(e),t},onChangeEqual:function(e){var t=this;return G(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.inProcess[e]=!0,r=Z(t.toggleEqual(e)),n.next=4,t[J.f](r);case 4:t.inProcess[e]=!1;case 5:case"end":return n.stop()}}),n)})))()},onDelete:function(e){var t=this;return G(regeneratorRuntime.mark((function n(){var r,i,a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.prefType,i=e.type,a=e.items,n.next=3,t.onSubmit({prefType:r,type:i,items:a});case 3:case"end":return n.stop()}}),n)})))()},onDeleteAll:function(e){var t=this;return G(regeneratorRuntime.mark((function n(){var r,i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.prefType,i=e.type,n.next=3,t.onDelete({prefType:r,type:i,items:[]});case 3:case"end":return n.stop()}}),n)})))()},onSubmit:function(e){var t=this;return G(regeneratorRuntime.mark((function n(){var r,i,a,s,o,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.prefType,i=e.type,a=e.items,s=void 0===a?[]:a,t.inProcess[i]=!0,o=r===q.f.PROFESSIONAL&&t.hasEqual(i),c=o?t.toggleEqual(i):null,n.next=6,t[J.e]({prefType:r,type:i,items:s,equals:c});case 6:t.inProcess[i]=!1;case 7:case"end":return n.stop()}}),n)})))()}}),beforeRouteEnter:function(e,t,n){var r=e.name;if(U.$store.state[j.NAME][k.c].load)return n(),void U.$store.dispatch("".concat(te,"/").concat(J.c),!1);var i=function(e){switch(e){case"Preferences":return q.f.PERSONAL;case"ProPreferences":return q.f.PROFESSIONAL}}(r);U.$progress.start(),Promise.all([U.$store.dispatch("".concat(te,"/").concat(J.a)),U.$store.dispatch("".concat(te,"/").concat(J.b),{prefType:i,isServer:U.$context.isServer})]).then((function(){U.$store.dispatch("".concat(te,"/").concat(J.d),i),n((function(){U.$progress.finish()}))})).catch((function(e){U.$logger.error(e),n((function(){U.$progress.fail()}))}))},created:function(){this.preferenceType=q.f,this.preferenceEntityTypes=q.e,this.actualEqual=Z(this.equalPreferences)}},re=Object(O.a)(ne,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section preferences-view"},[n("h2",{staticClass:"preferences-view__hl"},[e._v("\n        "+e._s(e.pageTitle)+"\n    ")]),e._v(" "),e._l(e.entityTypes,(function(t){return n("preferences-entity-panel",{key:t,attrs:{"entity-type":t,"equal-preferences":e.equalPreferences,"in-process":e.inProcess[t]},on:{"change-equal":e.onChangeEqual,delete:e.onDelete,"delete-all":e.onDeleteAll}})})),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.$isServer||e.isPreferencesOpen?n("preference-edit-modal",{on:{submit:e.onSubmit}}):e._e()],1)],2)}),[],!1,null,null,null);t.default=re.exports},uEDR:function(e,t,n){},vXAK:function(e,t,n){},xfwz:function(e,t,n){}}]);