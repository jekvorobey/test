(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{"2QQi":function(e,t,n){},N8l6:function(e,t,n){"use strict";n.r(t);var r,a=n("NDiG"),i=n("7cXU"),s=n("o3vK"),o=n("PZpB"),c=n("tHOl"),l=n("DbVC"),p=n("L2JU"),u=n("55Sm"),f=n("jDKC"),d=n("rBTT"),v=n("JM0x");n("Jhov"),n("zYMX"),n("2QQi");function b(e){return function(e){if(Array.isArray(e))return m(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){h(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y={BRANDS:"brands",CATEGORIES:"categories"},S={name:"pro-preferences",components:{VSvg:a.a,VLink:i.a,VCheck:s.a,InfoPanel:o.a,TagItem:c.a,PreferenceEditModal:l.b},data:function(){return{brandsSame:!1,categoriesSame:!1}},computed:_({},Object(p.d)(u.b,{isPreferencesOpen:function(e){return e[u.a][l.a]&&e[u.a][l.a].open}}),{},Object(p.d)(d.b,(r={},h(r,y.BRANDS,(function(e){return e[d.d]&&e[d.d][y.BRANDS]||[]})),h(r,y.CATEGORIES,(function(e){return e[d.d]&&e[d.d][y.CATEGORIES]||[]})),h(r,"preferencesBrands",(function(e){return e[d.c]&&e[d.c][y.BRANDS]||[]})),h(r,"preferencesCategories",(function(e){return e[d.c]&&e[d.c][y.CATEGORIES]||[]})),h(r,"availableBrands",(function(e){return e&&e.availableBrands||[]})),h(r,"availableCategories",(function(e){return e&&e.availableCategories||[]})),r)),{type:function(){return y},isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16}}),watch:{brandsSame:function(e){e&&this[v.d]({type:y.BRANDS,items:b(this.preferencesBrands),data:d.d})},categoriesSame:function(e){e&&this[v.d]({type:y.CATEGORIES,items:b(this.preferencesCategories),data:d.d})}},methods:_({},Object(p.b)(u.b,[f.a]),{},Object(p.b)(d.b,[v.b,v.a,v.d]),{onDeleteEntity:function(e,t){this[v.b]({type:e,index:t,data:d.d})},onDeleteAll:function(e){this[v.a]({type:e,data:d.d})},onAddEntities:function(e){var t=[],n=[];switch(e){case y.BRANDS:t=this.availableBrands,n=this[e];break;case y.CATEGORIES:t=this.availableCategories,n=this[e]}this[f.a]({name:l.a,open:!0,state:{type:e,availableEntities:t,entities:n,data:d.d}})}})},O=n("KHd+"),w=Object(O.a)(S,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section pro-preferences-view"},[n("h2",{staticClass:"pro-preferences-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),n("info-panel",{staticClass:"pro-preferences-view__panel",attrs:{header:"Бренды"},scopedSlots:e._u([{key:"controls",fn:function(){return[n("div",{staticClass:"pro-preferences-view__panel-links"},[n("v-link",{staticClass:"pro-preferences-view__panel-link",attrs:{tag:"button"},on:{click:function(t){return e.onAddEntities(e.type.BRANDS)}}},[n("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Добавить")])],1),e._v(" "),n("v-link",{staticClass:"link--grey pro-preferences-view__panel-link",attrs:{tag:"button"},on:{click:function(t){return e.onDeleteAll(e.type.BRANDS)}}},[n("v-svg",{attrs:{name:"cross",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Удалить все")])],1)],1)]},proxy:!0}])},[e._v(" "),n("div",{staticClass:"container container--tablet-lg"},[n("v-check",{attrs:{id:"pro-preferences-brands",name:"pro-preferences-brands"},model:{value:e.brandsSame,callback:function(t){e.brandsSame=t},expression:"brandsSame"}},[e._v("\n                Профессиональные предпочтения совпадают с личными\n            ")]),e._v(" "),n("transition-group",{staticClass:"pro-preferences-view__panel-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.brands,(function(t,r){return n("tag-item",{key:t.id,staticClass:"pro-preferences-view__panel-tags-item",attrs:{text:t.name},on:{delete:function(t){return e.onDeleteEntity(e.type.BRANDS,r)}}})})),1)],1)]),e._v(" "),n("info-panel",{staticClass:"pro-preferences-view__panel",attrs:{header:"Категории"},scopedSlots:e._u([{key:"controls",fn:function(){return[n("div",{staticClass:"pro-preferences-view__panel-links"},[n("v-link",{staticClass:"pro-preferences-view__panel-link",attrs:{tag:"button"},on:{click:function(t){return e.onAddEntities(e.type.CATEGORIES)}}},[n("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Добавить")])],1),e._v(" "),n("v-link",{staticClass:"link--grey pro-preferences-view__panel-link",attrs:{tag:"button"},on:{click:function(t){return e.onDeleteAll(e.type.CATEGORIES)}}},[n("v-svg",{attrs:{name:"cross",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Удалить все")])],1)],1)]},proxy:!0}])},[e._v(" "),n("div",{staticClass:"container container--tablet-lg"},[n("v-check",{attrs:{id:"pro-preferences-categories",name:"pro-preferences-categories"},model:{value:e.categoriesSame,callback:function(t){e.categoriesSame=t},expression:"categoriesSame"}},[e._v("\n                Профессиональные предпочтения совпадают с личными\n            ")]),e._v(" "),n("transition-group",{staticClass:"pro-preferences-view__panel-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.categories,(function(t,r){return n("tag-item",{key:t.id,staticClass:"pro-preferences-view__panel-tags-item",attrs:{text:t.name},on:{delete:function(t){return e.onDeleteEntity(e.type.CATEGORIES,r)}}})})),1)],1)]),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.$isServer||e.isPreferencesOpen?n("preference-edit-modal",{directives:[{name:"show",rawName:"v-show",value:e.isPreferencesOpen,expression:"isPreferencesOpen"}]}):e._e()],1)],1)}),[],!1,null,null,null);t.default=w.exports}}]);