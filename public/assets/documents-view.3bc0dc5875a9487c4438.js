(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{"+RFW":function(e,t,r){},rQy5:function(e,t,r){"use strict";r.r(t);var n=r("pFko"),s=r("7cXU"),c=(r("sKG7"),{name:"document-card",props:{type:{type:String},name:{type:String,required:!0},size:{type:String},ext:{type:String},href:{type:String}},components:{VLink:s.a}}),o=r("KHd+"),i=Object(o.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",{staticClass:"document-card"},[r("div",{staticClass:"text-grey text-sm"},[e._v("\n        "+e._s(e.type)+"\n    ")]),e._v(" "),r("div",{staticClass:"document-card__name"},[e._v("\n        "+e._s(e.name)+"\n    ")]),e._v(" "),r("div",{staticClass:"document-card__bottom"},[r("a",{staticClass:"document-card__bottom-link",attrs:{href:e.href,download:""}},[e._v("Скачать")]),e._v(" "),r("span",{staticClass:"text-grey text-sm"},[e._v("\n            "+e._s(e.size)+", "),r("span",{staticClass:"text-uppercase"},[e._v(e._s(e.ext))])])])])}),[],!1,null,null,null).exports,a=r("3eXy"),u=r("L2JU"),l=r("rBTT"),p=r("XO+b"),d=r("uj0Q"),f=r("aXGN"),y=Object.freeze({CONTRACT:1,REPORT:2,ACT:3});r("+RFW");function m(e,t,r,n,s,c,o){try{var i=e[c](o),a=i.value}catch(e){return void r(e)}i.done?t(a):Promise.resolve(a).then(n,s)}function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){h(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function h(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var _="".concat(l.NAME,"/").concat(p.c),O={name:"documents",components:{VSelect:n.a,DocumentCard:i},data:function(){var e=[{id:1,title:"Все типы"},{id:2,title:"Контракты",field:y.CONTRACT},{id:3,title:"Отчеты",field:y.REPORT},{id:4,title:"Акты",field:y.ACT}];return{selectedSortType:e[0],sortTypes:e}},computed:b(b({},Object(u.d)(_,[p.b,p.a])),{},{documents:function(){var e=this;return this.items.map((function(t){return{id:t.id,type:e.filters.types[t.type],name:t.name.replace(/\.[0-9a-z]{1,6}/g,""),ext:t.ext,size:Object(f.a)(t.size),href:Object(f.b)(t.file_id)}}))}}),watch:{selectedSortType:function(e,t){e!==t&&this.$router.replace({path:this.$route.path,query:{sortType:e.field}})}},methods:b(b({},Object(u.b)(_,[d.b,d.a])),{},{setSortType:function(e){var t=Number(e);this.selectedSortType=this.sortTypes.find((function(e){return e.field===t}))||this.sortTypes[0]}}),beforeRouteEnter:function(e,t,r){var n=e.fullPath,s=e.query.sortType,c=a.$store.state[l.NAME][p.c].loadPath;n===c?r((function(e){return e.setSortType(s)})):(a.$progress.start(),a.$store.dispatch("".concat(_,"/").concat(d.b),{type:s}).then((function(){a.$store.dispatch("".concat(_,"/").concat(d.c),n),r((function(e){e.setSortType(s),a.$progress.finish()}))})).catch((function(e){r((function(e){return a.$progress.fail()})),a.$logger.error(e)})))},beforeRouteUpdate:function(e,t,r){var n,s=this;return(n=regeneratorRuntime.mark((function t(){var n,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.query.sortType,c=void 0===n?null:n,t.prev=1,s.$progress.start(),t.next=5,s[d.a]({type:c});case 5:s.setSortType(c),s.$progress.finish(),r(),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(1),s.$progress.fail(),r(!1);case 14:case"end":return t.stop()}}),t,null,[[1,10]])})),function(){var e=this,t=arguments;return new Promise((function(r,s){var c=n.apply(e,t);function o(e){m(c,r,s,o,i,"next",e)}function i(e){m(c,r,s,o,i,"throw",e)}o(void 0)}))})()}},g=Object(o.a)(O,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section documents-view"},[r("div",{staticClass:"container container--tablet-lg"},[r("div",{staticClass:"documents-view__header"},[r("h2",{staticClass:"documents-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),r("v-select",{staticClass:"documents-view__sort",attrs:{label:"title","track-by":"id",options:e.sortTypes,searchable:!1,"show-labels":!1},model:{value:e.selectedSortType,callback:function(t){e.selectedSortType=t},expression:"selectedSortType"}})],1),e._v(" "),r("ul",{staticClass:"documents-view__list"},e._l(e.documents,(function(e){return r("document-card",{key:e.id,staticClass:"documents-view__list-item",attrs:{type:e.type,name:e.name,size:e.size,ext:e.ext,href:e.href}})})),1)])])}),[],!1,null,null,null);t.default=g.exports},sKG7:function(e,t,r){}}]);