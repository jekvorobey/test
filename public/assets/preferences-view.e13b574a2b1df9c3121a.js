(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{"W+R+":function(e,t,n){"use strict";n.r(t);var r=n("NDiG"),a=n("7cXU"),i=n("o3vK"),s=n("PZpB"),c=n("tHOl"),o=n("DbVC"),u=n("L2JU"),l=n("55Sm"),p=n("jDKC"),f=n("rBTT"),d=n("karI"),v=n("ABRD"),b=n("SDMQ"),h=n("sEfC"),m=n.n(h),g=n("3eXy"),y=n("q5Zp"),_=n("2JJK");n("Jhov"),n("zYMX"),n("xfwz");function w(e){return function(e){if(Array.isArray(e))return E(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return E(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function S(e,t,n,r,a,i,s){try{var c=e[i](s),o=c.value}catch(e){return void n(e)}c.done?t(o):Promise.resolve(o).then(r,a)}function C(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function s(e){S(i,r,a,s,c,"next",e)}function c(e){S(i,r,a,s,c,"throw",e)}s(void 0)}))}}function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){A(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var R="".concat(f.NAME,"/").concat(d.d);var P={name:"preferences",components:{VSvg:r.a,VLink:a.a,VCheck:i.a,InfoPanel:s.a,TagItem:c.a,PreferenceEditModal:o.a},data:function(){return{actualBrands:[],actualCategories:[]}},computed:k({},Object(u.d)(l.b,{isPreferencesOpen:function(e){return e[l.a][_.modalName.profile.PREFERENCE_EDIT]&&e[l.a][_.modalName.profile.PREFERENCE_EDIT].open}}),{},Object(u.d)(R,[d.a,d.b,d.c]),{},Object(u.c)(R,[v.a,v.b]),{preferenceType:function(){var e=this.$route.name;return this.getPreferenceType(e)},type:function(){return y.d},isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16}}),methods:k({},Object(u.b)(l.b,[p.a]),{},Object(u.b)(R,[b.a,b.d,b.c]),{onDeleteEntity:function(e,t){switch(e){case y.d.BRANDS:this.actualBrands.splice(t,1),this.debounce_updateBrands(this.actualBrands.map((function(e){return e.id})));break;case y.d.CATEGORIES:this.actualCategories.splice(t,1),this.debounce_updateCategories(this.actualCategories.map((function(e){return e.id})))}},onDeleteAll:function(e){this.onSubmit({type:e,items:[]})},onSubmit:function(e){var t=this;return C(regeneratorRuntime.mark((function n(){var r,a,i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.type,a=e.items,i=void 0===a?[]:a,n.prev=1,n.next=4,t[b.d]({type:r,items:i});case 4:n.t0=r,n.next=n.t0===y.d.BRANDS?7:n.t0===y.d.CATEGORIES?9:11;break;case 7:return t.actualBrands=w(t[v.a]),n.abrupt("break",11);case 9:return t.actualCategories=w(t[v.b]),n.abrupt("break",11);case 11:n.next=16;break;case 13:n.prev=13,n.t1=n.catch(1),g.$logger.error(n.t1);case 16:case"end":return n.stop()}}),n,null,[[1,13]])})))()},onAddEntities:function(e){var t=this.preferenceType,n=[],r=[];switch(e){case y.d.BRANDS:n=this[d.a],r=this.actualBrands;break;case y.d.CATEGORIES:n=this[d.b],r=this.actualCategories}this[p.a]({name:_.modalName.profile.PREFERENCE_EDIT,open:!0,state:{type:e,preferenceType:t,availableEntities:n,entities:r}})}}),serverPrefetch:function(){var e=this;return C(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e[b.a]({preferenceType:y.e.PERSONAL,isServer:e.$isServer});case 3:e[b.c](e.preferenceType),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),g.$logger.error(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},beforeRouteEnter:function(e,t,n){var r=e.name;if(g.$store.state[f.NAME][d.d].load)return n(),void g.$store.dispatch("".concat(R,"/").concat(b.b),!1);!function(e){switch(e){case"Preferences":return y.e.PERSONAL;case"ProPreferences":y.e.PROFESSIONAL}}(r);g.$progress.start(),g.$store.dispatch("".concat(R,"/").concat(b.a)).then((function(){n((function(e){g.$progress.finish()}))})).catch((function(e){n((function(e){g.$progress.fail()}))}))},beforeMount:function(){var e=this;this.actualBrands=w(this[v.a]),this.actualCategories=w(this[v.b]),this.debounce_updateBrands=m()((function(t){return e[b.d]({type:y.d.BRANDS,items:t})}),1e3),this.debounce_updateCategories=m()((function(t){return e[b.d]({type:y.d.CATEGORIES,items:t})}),1e3)}},D=n("KHd+"),j=Object(D.a)(P,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section preferences-view"},[n("h2",{staticClass:"preferences-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),n("info-panel",{staticClass:"preferences-view__panel",attrs:{header:"Бренды"},scopedSlots:e._u([{key:"controls",fn:function(){return[n("div",{staticClass:"preferences-view__panel-links"},[n("v-link",{staticClass:"preferences-view__panel-link",attrs:{tag:"button",disabled:e.actualBrands.length===e.availableBrands.length},on:{click:function(t){return e.onAddEntities(e.type.BRANDS)}}},[n("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Добавить")])],1),e._v(" "),n("v-link",{staticClass:"preferences-view__panel-link",attrs:{tag:"button",disabled:0===e.actualBrands.length},on:{click:function(t){return e.onDeleteAll(e.type.BRANDS)}}},[n("v-svg",{attrs:{name:"cross",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Удалить все")])],1)],1)]},proxy:!0}])},[e._v(" "),n("div",{staticClass:"container container--tablet-lg"},[n("transition-group",{staticClass:"preferences-view__panel-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.actualBrands,(function(t,r){return n("tag-item",{key:t.id,staticClass:"preferences-view__panel-tags-item",attrs:{text:t.name},on:{delete:function(t){return e.onDeleteEntity(e.type.BRANDS,r)}}})})),1)],1)]),e._v(" "),n("info-panel",{staticClass:"preferences-view__panel",attrs:{header:"Категории"},scopedSlots:e._u([{key:"controls",fn:function(){return[n("div",{staticClass:"preferences-view__panel-links"},[n("v-link",{staticClass:"preferences-view__panel-link",attrs:{tag:"button",disabled:e.actualCategories.length===e.availableCategories.length},on:{click:function(t){return e.onAddEntities(e.type.CATEGORIES)}}},[n("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Добавить")])],1),e._v(" "),n("v-link",{staticClass:"preferences-view__panel-link",attrs:{tag:"button",disabled:0===e.actualCategories.length},on:{click:function(t){return e.onDeleteAll(e.type.CATEGORIES)}}},[n("v-svg",{attrs:{name:"cross",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Удалить все")])],1)],1)]},proxy:!0}])},[e._v(" "),n("div",{staticClass:"container container--tablet-lg"},[n("transition-group",{staticClass:"preferences-view__panel-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.actualCategories,(function(t,r){return n("tag-item",{key:t.id,staticClass:"preferences-view__panel-tags-item",attrs:{text:t.name},on:{delete:function(t){return e.onDeleteEntity(e.type.CATEGORIES,r)}}})})),1)],1)]),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.$isServer||e.isPreferencesOpen?n("preference-edit-modal",{directives:[{name:"show",rawName:"v-show",value:e.isPreferencesOpen,expression:"isPreferencesOpen"}],on:{submit:e.onSubmit}}):e._e()],1)],1)}),[],!1,null,null,null);t.default=j.exports},xfwz:function(e,t,n){}}]);