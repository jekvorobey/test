(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{"+RFW":function(t,e,r){},rQy5:function(t,e,r){"use strict";r.r(e);var n=r("pFko"),s=(r("sKG7"),{name:"document-card",props:{type:{type:String},name:{type:String,required:!0},size:{type:String},ext:{type:String},href:{type:String}},computed:{abbreviatedTitle:function(){var t=this.name;return t.length>57&&(t="".concat(t.slice(0,57),"...")),t}}}),i=r("KHd+"),c=Object(i.a)(s,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"document-card"},[r("div",{staticClass:"text-grey text-sm"},[t._v("\n        "+t._s(t.type)+"\n    ")]),t._v(" "),r("div",{staticClass:"document-card__name"},[t._v("\n        "+t._s(t.abbreviatedTitle)+"\n    ")]),t._v(" "),r("div",{staticClass:"document-card__bottom"},[r("a",{staticClass:"document-card__bottom-link",attrs:{href:t.href,download:""}},[t._v("Скачать")]),t._v(" "),r("span",{staticClass:"text-grey text-sm"},[t._v("\n            "+t._s(t.size)+", "),r("span",{staticClass:"text-uppercase"},[t._v(t._s(t.ext))])])])])}),[],!1,null,null,null).exports,o=r("3eXy"),a=r("L2JU"),u=r("rBTT"),l=r("XO+b"),p=r("uj0Q"),d=r("aXGN"),f=Object.freeze({CONTRACT:1,REPORT:2,ACT:3}),y=r("nfjx");r("+RFW");function v(t,e,r,n,s,i,c){try{var o=t[i](c),a=o.value}catch(t){return void r(t)}o.done?e(a):Promise.resolve(a).then(n,s)}function m(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function b(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?m(Object(r),!0).forEach((function(e){h(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function h(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var _="".concat(u.NAME,"/").concat(l.c),T={name:"documents",mixins:[y.a],components:{VSelect:n.a,DocumentCard:c},metaInfo:function(){return{title:this.pageTitle}},data:function(){var t=[{id:1,title:"Все типы"},{id:2,title:"Контракты",field:f.CONTRACT},{id:3,title:"Отчеты",field:f.REPORT},{id:4,title:"Акты",field:f.ACT}];return{selectedSortType:t[0],sortTypes:t}},computed:b(b({},Object(a.d)(_,[l.b,l.a])),{},{documents:function(){var t=this;return(this[l.b]||[]).map((function(e){return{id:e.id,type:t.filters.types[e.type],name:e.name.replace(/\.[\da-z]{1,6}/g,""),ext:e.ext,size:Object(d.a)(e.size),href:Object(d.b)(e.file_id)}}))},pageTitle:function(){return this.$t("profile.routes.".concat(this.$route.name))}}),watch:{selectedSortType:function(t,e){t!==e&&this.$router.replace({path:this.$route.path,query:{sortType:t.field}})}},methods:b(b({},Object(a.b)(_,[p.b,p.a])),{},{setSortType:function(t){var e=Number(t);this.selectedSortType=this.sortTypes.find((function(t){return t.field===e}))||this.sortTypes[0]}}),beforeRouteEnter:function(t,e,r){var n=t.fullPath,s=t.query.sortType,i=o.$store.state[u.NAME][l.c].loadPath;n===i?r((function(t){return t.setSortType(s)})):(o.$progress.start(),o.$store.dispatch("".concat(_,"/").concat(p.b),{type:s}).then((function(){o.$store.dispatch("".concat(_,"/").concat(p.c),n),r((function(t){t.setSortType(s),o.$progress.finish()}))})).catch((function(t){r((function(){return o.$progress.fail()})),o.$logger.error(t)})))},beforeRouteUpdate:function(t,e,r){var n,s=this;return(n=regeneratorRuntime.mark((function e(){var n,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.query.sortType,i=void 0===n?null:n,e.prev=1,s.$progress.start(),e.next=5,s[p.a]({type:i});case 5:s.setSortType(i),s.$progress.finish(),r(),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),s.$progress.fail(),r(!1);case 14:case"end":return e.stop()}}),e,null,[[1,10]])})),function(){var t=this,e=arguments;return new Promise((function(r,s){var i=n.apply(t,e);function c(t){v(i,r,s,c,o,"next",t)}function o(t){v(i,r,s,c,o,"throw",t)}c(void 0)}))})()}},g=Object(i.a)(T,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section documents-view"},[r("div",{staticClass:"container container--tablet-lg"},[r("div",{staticClass:"documents-view__header"},[r("h2",{staticClass:"documents-view__hl"},[t._v("\n                "+t._s(t.pageTitle)+"\n            ")]),t._v(" "),r("v-select",{staticClass:"documents-view__sort",attrs:{label:"title","track-by":"id",options:t.sortTypes,searchable:!1,"show-labels":!1},model:{value:t.selectedSortType,callback:function(e){t.selectedSortType=e},expression:"selectedSortType"}})],1),t._v(" "),r("ul",{staticClass:"documents-view__list"},t._l(t.documents,(function(t){return r("document-card",{key:t.id,staticClass:"documents-view__list-item",attrs:{type:t.type,name:t.name,size:t.size,ext:t.ext,href:t.href}})})),1)])])}),[],!1,null,null,null);e.default=g.exports},sKG7:function(t,e,r){}}]);