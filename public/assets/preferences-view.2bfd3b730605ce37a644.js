(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{"W+R+":function(e,t,n){"use strict";n.r(t);var r=n("NDiG"),i=n("7cXU"),a=n("o3vK"),s=n("i2Ud"),o=n("KQVR"),c=n("LeEK"),l=n("a6oV"),u=n("L2JU"),f=n("55Sm"),p=n("jDKC"),d=n("sEfC"),h=n.n(d),y=n("2JJK");n("vXAK");function b(e){return function(e){if(Array.isArray(e))return m(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){g(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=y.modalName.profile.PREFERENCE_EDIT,O={name:E,components:{VSvg:r.a,VButton:s.a,VCheck:a.a,VInput:o.a,VScroll:c.a,GeneralModal:l.a},data:function(){return{filterString:"",selectedEntities:[]}},computed:_(_({},Object(u.d)(f.b,{isOpen:function(e){return e[f.a][E]&&e[f.a][E].open||!1},modalState:function(e){return e[f.a][E]&&e[f.a][E].state||{availableEntities:[],entities:[]}}})),{},{prefType:function(){return this.modalState.prefType},type:function(){return this.modalState.type},data:function(){return this.modalState.data},filteredEntities:function(){var e=this,t=(this.filterString||"").toLowerCase();return this.modalState.availableEntities.filter((function(n){return!e.entities.some((function(e){return e.id===n.id}))&&(n.name||"").toLowerCase().includes(t)}))},entities:function(){return this.modalState.entities},header:function(){switch(this.type){case"brands":return"Добавить бренды";case"categories":return"Добавить категории";default:return"Добавить сущности"}},title:function(){switch(this.type){case"brands":return"Выберите бренды";case"categories":return"Выберите категории";default:return"Выберите сущности"}},isTablet:function(){return this.$mq.tablet}}),methods:_(_({},Object(u.b)(f.b,[p.a])),{},{isChecked:function(e){return this.selectedEntities.some((function(t){return t.id===e}))},onFilterChange:function(e){this.filterString=e},onCheckedChanged:function(e,t){if(e)this.selectedEntities.push(t);else{var n=this.selectedEntities.indexOf(t);-1!==n&&this.selectedEntities.splice(n,1)}},onSubmit:function(){var e=this.type,t=this.prefType,n=[].concat(b(this.entities.map((function(e){return e.id}))),b(this.selectedEntities.map((function(e){return e.id}))));this.$emit("submit",{prefType:t,type:e,items:n}),this.onClose()},onClose:function(){this[p.a]({name:E,open:!1})}}),beforeMount:function(){this.debounce_onFilterChange=h()(this.onFilterChange,300)}},C=n("KHd+"),S=Object(C.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isOpen?n("general-modal",{staticClass:"preference-edit-modal",attrs:{type:"sm",header:e.header,"is-scroll-locked":e.isTablet,"is-mobile":e.isTablet},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[n("h3",{staticClass:"preference-edit-modal__hl"},[e._v(e._s(e.header))]),e._v(" "),n("v-input",{staticClass:"preference-edit-modal__input",on:{input:e.debounce_onFilterChange},scopedSlots:e._u([{key:"after",fn:function(){return[n("v-svg",{attrs:{name:"search-middle",width:"24",height:"24"}})]},proxy:!0}],null,!1,3535015113)}),e._v(" "),n("h6",{staticClass:"preference-edit-modal__title"},[e._v(e._s(e.title))]),e._v(" "),n("div",{staticClass:"preference-edit-modal__body"},[e.isTablet?n("ul",{staticClass:"preference-edit-modal__list"},e._l(e.filteredEntities,(function(t){return n("li",{key:t.id,staticClass:"preference-edit-modal__list-item"},[n("v-check",{key:t.id,staticClass:"preference-edit-modal__list-check",attrs:{name:e.type,id:e.type+"-"+t.id,value:t.id,checked:e.isChecked(t.id)},on:{change:function(n){return e.onCheckedChanged(n,t)}}},[e._v("\n                        "+e._s(t.name)+"\n                    ")])],1)})),0):n("v-scroll",{staticClass:"preference-edit-modal__scroll",attrs:{"scroll-lock":""}},[n("ul",{staticClass:"preference-edit-modal__list"},e._l(e.filteredEntities,(function(t){return n("li",{key:t.id,staticClass:"preference-edit-modal__list-item"},[n("v-check",{key:t.id,staticClass:"preference-edit-modal__list-check",attrs:{name:e.type,id:e.type+"-"+t.id,value:t.id,checked:e.isChecked(t.id)},on:{change:function(n){return e.onCheckedChanged(n,t)}}},[e._v("\n                            "+e._s(t.name)+"\n                        ")])],1)})),0)])],1),e._v(" "),n("div",{staticClass:"preference-edit-modal__submit"},[n("v-button",{staticClass:"preference-edit-modal__submit-btn",on:{click:e.onSubmit}},[e._v("\n                Добавить\n            ")])],1)]},proxy:!0}],null,!1,3387637576)}):e._e()}),[],!1,null,null,null).exports,P=n("dMOp"),j=n("PZpB"),w=n("tHOl"),T=n("rBTT"),k=n("karI"),A=n("ABRD"),q=n("SDMQ"),$=n("3eXy"),D=n("q5Zp");n("Jhov"),n("zYMX"),n("LZ6J"),n("uEDR");function R(e){return function(e){if(Array.isArray(e))return N(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||x(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=x(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,o=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return s=e.done,e},e:function(e){o=!0,a=e},f:function(){try{s||null==n.return||n.return()}finally{if(o)throw a}}}}function x(e,t){if(e){if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?N(e,t):void 0}}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function L(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(Object(n),!0).forEach((function(t){F(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function F(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var V="".concat(T.NAME,"/").concat(k.c),z={name:"preferences-entity-panel",components:{VSvg:r.a,VLink:i.a,VCheck:a.a,VButton:s.a,VSpinner:P.a,InfoPanel:j.a,TagItem:w.a},props:{entityType:{type:String},equalPreferences:{type:Array,default:function(){return[]}},inProcess:{type:Boolean,default:!1}},data:function(){return{actualEntities:[]}},computed:L(L(L({},Object(u.d)(V,[k.a,k.d])),Object(u.c)(V,[A.a])),{},{prefType:function(){return this[k.d]},entities:function(){var e=this.entitiesMap;return this.available[this.entityType].filter((function(t){return!!e[t.id]}))},entitiesMap:function(){var e,t=this.prefType,n=this.entityType,r=(this.isEqual,{}),i=I(this[A.a](t)[n]||[]);try{for(i.s();!(e=i.n()).done;){var a=e.value;r[a]=a}}catch(e){i.e(e)}finally{i.f()}return r},entitiesList:function(){return this.actualEntities&&this.actualEntities.map((function(e){return e.name})).join(", ")},equalPreferencesMap:function(){var e,t=this.equalPreferences,n={},r=I(void 0===t?[]:t);try{for(r.s();!(e=r.n()).done;){var i=e.value;n[i]=i}}catch(e){r.e(e)}finally{r.f()}return n},header:function(){var e=this.entityType;return this.$t("profile.preferences.".concat(e,".title"))},disabledControls:function(){var e=this.entityType,t=this.isEqual,n=this.available,r=this.entities,i=this.inProcess,a=n[e];return{add:i||a.length===r.length,delete:i||t||0===r.length,check:i,tags:i}},isEqual:function(){var e=this.equalPreferencesMap,t=this.entityType;return this.prefType===D.f.PROFESSIONAL&&!!e[t]},isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16}}),watch:F({equalPreferences:function(){this.initCollections()},entities:function(){this.initCollections()}},k.d,(function(){this.initHandlers()})),methods:L(L(L({},Object(u.b)(f.b,[p.a])),Object(u.b)(V,[q.e,q.f])),{},{onChangeEqual:function(e){this.$emit("change-equal",e)},onDeleteAll:function(){var e=this.prefType,t=this.entityType;this.$emit("delete-all",{prefType:e,type:t})},onDeleteEntity:function(e){this.actualEntities.splice(e,1),this.debounce_updateEntities(this.actualEntities.map((function(e){return e.id})))},onAddEntities:function(){var e=this.prefType,t=this.available,n=this.entityType,r=this.actualEntities,i=t[n]||[],a=r||[];this[p.a]({name:y.modalName.profile.PREFERENCE_EDIT,open:!0,state:{type:n,prefType:e,availableEntities:i,entities:a}})},initCollections:function(){var e=this.entities,t=void 0===e?[]:e;this.equalPreferences;this.actualEntities=R(t)},initHandlers:function(){var e=this,t=this.prefType,n=this.entityType;this.debounce_updateEntities=h()((function(r){return e[q.e]({prefType:t,type:n,items:r})}),1e3)}}),created:function(){this.preferenceType=D.f,this.preferenceEntityTypes=D.e,this.initHandlers(),this.initCollections()}},K=Object(C.a)(z,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("info-panel",{staticClass:"preferences-entity-panel",scopedSlots:e._u([{key:"header",fn:function(){return[n("div",{staticClass:"text-bold info-panel__header-hl preferences-entity-panel__hl"},[e._v("\n            "+e._s(e.header)+" "),n("v-spinner",{attrs:{show:e.inProcess,width:"24",height:"24"}})],1)]},proxy:!0},{key:"controls",fn:function(){return[n("div",{staticClass:"preferences-entity-panel__links"},[n("v-link",{staticClass:"preferences-entity-panel__link",attrs:{tag:"button",disabled:e.disabledControls.add},on:{click:e.onAddEntities}},[n("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Добавить")])],1),e._v(" "),n("v-link",{staticClass:"preferences-entity-panel__link",attrs:{tag:"button",disabled:e.disabledControls.delete},on:{click:e.onDeleteAll}},[n("v-svg",{attrs:{name:"cross",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Удалить все")])],1)],1)]},proxy:!0}])},[e._v(" "),e._v(" "),n("div",{staticClass:"container container--tablet-lg"},[e.prefType===e.preferenceType.PROFESSIONAL?n("v-check",{attrs:{checked:e.isEqual,disabled:e.disabledControls.check,id:"pro-preferences-"+e.entityType,name:"pro-preferences-"+e.entityType},on:{change:function(t){return e.onChangeEqual(e.entityType)}}},[e._v("\n            Профессиональные предпочтения совпадают с личными\n        ")]):e._e(),e._v(" "),e.equalPreferencesMap[e.entityType]&&e.prefType===e.preferenceType.PROFESSIONAL?n("div",{staticClass:"preferences-entity-panel__equals"},[e.actualEntities&&e.actualEntities.length>0?n("h3",{staticClass:"preferences-entity-panel__equals-hl"},[e._v("\n                "+e._s(e.$t("profile.preferences."+e.entityType+".choosen"))+"\n            ")]):e._e(),e._v(" "),n("p",{staticClass:"preferences-entity-panel__equals-list"},[e._v("\n                "+e._s(e.entitiesList)+"\n            ")])]):e.actualEntities.length?n("transition-group",{staticClass:"preferences-entity-panel__tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.actualEntities,(function(t,r){return n("tag-item",{key:t.id,staticClass:"preferences-entity-panel__tags-item",attrs:{text:t.name,disabled:e.disabledControls.tags},on:{delete:function(t){return e.onDeleteEntity(r)}}})})),1):n("div",{staticClass:"container container--tablet-lg preferences-entity-panel__empty-container"},[n("v-svg",{attrs:{name:"info-middle",width:"24",height:"24"}}),e._v(" "),n("span",{staticClass:"preferences-entity-panel__empty-text"},[e._v("\n                "+e._s(e.$t("profile.preferences."+e.entityType+".notChoosen"))+"\n            ")]),e._v(" "),n("v-button",{staticClass:"btn--outline",attrs:{disabled:e.disabledControls.add},on:{click:e.onAddEntities}},[e._v("\n                Добавить\n            ")])],1)],1)])}),[],!1,null,null,null).exports;n("xfwz");function B(e,t,n,r,i,a,s){try{var o=e[a](s),c=o.value}catch(e){return void n(e)}o.done?t(c):Promise.resolve(c).then(r,i)}function J(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var a=e.apply(t,n);function s(e){B(a,r,i,s,o,"next",e)}function o(e){B(a,r,i,s,o,"throw",e)}s(void 0)}))}}function U(e){return function(e){if(Array.isArray(e))return H(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return H(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function X(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function G(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?X(Object(n),!0).forEach((function(t){Z(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):X(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Q="".concat(T.NAME,"/").concat(k.c);var W={name:"preferences",components:{PreferencesEntityPanel:K,PreferenceEditModal:S},data:function(){var e;return{inProcess:(e={},Z(e,D.e.BRANDS,!1),Z(e,D.e.CATEGORIES,!1),e),actualEqual:[]}},computed:G(G(G(G({},Object(u.d)(f.b,{isPreferencesOpen:function(e){return e[f.a][y.modalName.profile.PREFERENCE_EDIT]&&e[f.a][y.modalName.profile.PREFERENCE_EDIT].open}})),Object(u.d)(Q,[k.b,k.d])),Object(u.c)(Q,[A.a])),{},{prefType:function(){return this[k.d]},equalPreferences:function(){var e=this.prefType;return this[A.a](e).equal_preferences},entityTypes:function(){return D.e},isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16}}),watch:{equalPreferences:function(e){e&&(this.actualEqual=U(e))}},methods:G(G(G({},Object(u.b)(f.b,[p.a])),Object(u.b)(Q,[q.e,q.f,q.b,q.d,q.a])),{},{hasEqual:function(e){return this.actualEqual.includes(e)},toggleEqual:function(e){var t=this.actualEqual;return t.includes(e)?t.splice(t.indexOf(e),1):t.push(e),t},onChangeEqual:function(e){var t=arguments,n=this;return J(regeneratorRuntime.mark((function r(){var i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.length>1&&void 0!==t[1]&&t[1],n.inProcess[e]=!0,i=U(n.toggleEqual(e)),r.next=5,n[q.f](i);case 5:n.inProcess[e]=!1;case 6:case"end":return r.stop()}}),r)})))()},onDeleteAll:function(e){var t=this;return J(regeneratorRuntime.mark((function n(){var r,i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.prefType,i=e.type,n.next=3,t.onSubmit({prefType:r,type:i,items:[]});case 3:case"end":return n.stop()}}),n)})))()},onSubmit:function(e){var t=this;return J(regeneratorRuntime.mark((function n(){var r,i,a,s,o,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.prefType,i=e.type,a=e.items,s=void 0===a?[]:a,t.inProcess[i]=!0,o=r===D.f.PROFESSIONAL&&t.hasEqual(i),c=o?t.toggleEqual(i):null,n.next=6,t[q.e]({prefType:r,type:i,items:s,equals:c});case 6:t.inProcess[i]=!1;case 7:case"end":return n.stop()}}),n)})))()}}),beforeRouteEnter:function(e,t,n){var r=e.name;if($.$store.state[T.NAME][k.c].load)return n(),void $.$store.dispatch("".concat(Q,"/").concat(q.c),!1);var i=function(e){switch(e){case"Preferences":return D.f.PERSONAL;case"ProPreferences":return D.f.PROFESSIONAL}}(r);$.$progress.start(),Promise.all([$.$store.dispatch("".concat(Q,"/").concat(q.a)),$.$store.dispatch("".concat(Q,"/").concat(q.b),{prefType:i,isServer:$.$context.isServer})]).then((function(){$.$store.dispatch("".concat(Q,"/").concat(q.d),i),n((function(e){$.$progress.finish()}))})).catch((function(e){$.$logger.error(e),n((function(e){$.$progress.fail()}))}))},created:function(){this.preferenceType=D.f,this.preferenceEntityTypes=D.e,this.actualEqual=U(this.equalPreferences)}},Y=Object(C.a)(W,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section preferences-view"},[n("h2",{staticClass:"preferences-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),e._l(e.entityTypes,(function(t){return n("preferences-entity-panel",{key:t,attrs:{"entity-type":t,"equal-preferences":e.equalPreferences,"in-process":e.inProcess[t]},on:{"change-equal":e.onChangeEqual,"delete-all":e.onDeleteAll}})})),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.$isServer||e.isPreferencesOpen?n("preference-edit-modal",{on:{submit:e.onSubmit}}):e._e()],1)],2)}),[],!1,null,null,null);t.default=Y.exports},uEDR:function(e,t,n){},vXAK:function(e,t,n){},xfwz:function(e,t,n){}}]);