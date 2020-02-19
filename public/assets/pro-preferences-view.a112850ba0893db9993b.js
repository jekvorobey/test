(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{"2QQi":function(e,t,n){},N8l6:function(e,t,n){"use strict";n.r(t);var r,a=n("NDiG"),i=n("7cXU"),s=n("o3vK"),o=n("PZpB"),c=n("tHOl"),l=n("DbVC"),p=n("L2JU"),u=n("55Sm"),f=n("jDKC"),v=n("rBTT"),d=n("JM0x");n("Jhov"),n("zYMX"),n("2QQi");function b(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){_(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h={BRANDS:"brands",CATEGORIES:"categories"},S={name:"pro-preferences",components:{VSvg:a.a,VLink:i.a,VCheck:s.a,InfoPanel:o.a,TagItem:c.a,PreferenceEditModal:l.b},data:function(){return{brandsSame:!1,categoriesSame:!1}},computed:m({},Object(p.d)(u.b,{isPreferencesOpen:function(e){return e[u.a][l.a]&&e[u.a][l.a].open}}),{},Object(p.d)(v.d,(r={},_(r,h.BRANDS,(function(e){return e[v.g]&&e[v.g][h.BRANDS]||[]})),_(r,h.CATEGORIES,(function(e){return e[v.g]&&e[v.g][h.CATEGORIES]||[]})),_(r,"preferencesBrands",(function(e){return e[v.e]&&e[v.e][h.BRANDS]||[]})),_(r,"preferencesCategories",(function(e){return e[v.e]&&e[v.e][h.CATEGORIES]||[]})),_(r,"availableBrands",(function(e){return e&&e.availableBrands||[]})),_(r,"availableCategories",(function(e){return e&&e.availableCategories||[]})),r)),{type:function(){return h},isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16}}),watch:{brandsSame:function(e){e&&this[d.e]({type:h.BRANDS,items:b(this.preferencesBrands),data:v.g})},categoriesSame:function(e){e&&this[d.e]({type:h.CATEGORIES,items:b(this.preferencesCategories),data:v.g})}},methods:m({},Object(p.b)(u.b,[f.a]),{},Object(p.b)(v.d,[d.b,d.a,d.e]),{onDeleteEntity:function(e,t){this[d.b]({type:e,index:t,data:v.g})},onDeleteAll:function(e){this[d.a]({type:e,data:v.g})},onAddEntities:function(e){var t=[],n=[];switch(e){case h.BRANDS:t=this.availableBrands,n=this[e];break;case h.CATEGORIES:t=this.availableCategories,n=this[e]}this[f.a]({name:l.a,open:!0,state:{type:e,availableEntities:t,entities:n,data:v.g}})}})},y=n("KHd+"),w=Object(y.a)(S,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section pro-preferences-view"},[n("h2",{staticClass:"pro-preferences-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),n("info-panel",{staticClass:"pro-preferences-view__panel",attrs:{header:"Бренды"},scopedSlots:e._u([{key:"controls",fn:function(){return[n("div",{staticClass:"pro-preferences-view__panel-links"},[n("v-link",{staticClass:"pro-preferences-view__panel-link",attrs:{tag:"button"},on:{click:function(t){return e.onAddEntities(e.type.BRANDS)}}},[n("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Добавить")])],1),e._v(" "),n("v-link",{staticClass:"link--grey pro-preferences-view__panel-link",attrs:{tag:"button"},on:{click:function(t){return e.onDeleteAll(e.type.BRANDS)}}},[n("v-svg",{attrs:{name:"cross",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Удалить все")])],1)],1)]},proxy:!0}])},[e._v(" "),n("div",{staticClass:"container container--tablet-lg"},[n("v-check",{attrs:{id:"pro-preferences-brands",name:"pro-preferences-brands"},model:{value:e.brandsSame,callback:function(t){e.brandsSame=t},expression:"brandsSame"}},[e._v("\n                Профессиональные предпочтения совпадают с личными\n            ")]),e._v(" "),n("transition-group",{staticClass:"pro-preferences-view__panel-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.brands,(function(t,r){return n("tag-item",{key:t.id,staticClass:"pro-preferences-view__panel-tags-item",attrs:{text:t.name},on:{delete:function(t){return e.onDeleteEntity(e.type.BRANDS,r)}}})})),1)],1)]),e._v(" "),n("info-panel",{staticClass:"pro-preferences-view__panel",attrs:{header:"Категории"},scopedSlots:e._u([{key:"controls",fn:function(){return[n("div",{staticClass:"pro-preferences-view__panel-links"},[n("v-link",{staticClass:"pro-preferences-view__panel-link",attrs:{tag:"button"},on:{click:function(t){return e.onAddEntities(e.type.CATEGORIES)}}},[n("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Добавить")])],1),e._v(" "),n("v-link",{staticClass:"link--grey pro-preferences-view__panel-link",attrs:{tag:"button"},on:{click:function(t){return e.onDeleteAll(e.type.CATEGORIES)}}},[n("v-svg",{attrs:{name:"cross",width:e.iconSize,height:e.iconSize}}),e._v(" "),n("span",[e._v("  Удалить все")])],1)],1)]},proxy:!0}])},[e._v(" "),n("div",{staticClass:"container container--tablet-lg"},[n("v-check",{attrs:{id:"pro-preferences-categories",name:"pro-preferences-categories"},model:{value:e.categoriesSame,callback:function(t){e.categoriesSame=t},expression:"categoriesSame"}},[e._v("\n                Профессиональные предпочтения совпадают с личными\n            ")]),e._v(" "),n("transition-group",{staticClass:"pro-preferences-view__panel-tags",attrs:{tag:"ul",name:"tag-item"}},e._l(e.categories,(function(t,r){return n("tag-item",{key:t.id,staticClass:"pro-preferences-view__panel-tags-item",attrs:{text:t.name},on:{delete:function(t){return e.onDeleteEntity(e.type.CATEGORIES,r)}}})})),1)],1)]),e._v(" "),n("transition",{attrs:{name:"fade"}},[e.$isServer||e.isPreferencesOpen?n("preference-edit-modal",{directives:[{name:"show",rawName:"v-show",value:e.isPreferencesOpen,expression:"isPreferencesOpen"}]}):e._e()],1)],1)}),[],!1,null,null,null);t.default=w.exports}}]);