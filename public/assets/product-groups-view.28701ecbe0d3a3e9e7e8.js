(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{JXwH:function(t,e,r){},fFVf:function(t,e,r){"use strict";r.r(e);var n,o=r("i2Ud"),a=r("+gqB"),s=r("wo+G"),i=r("ENRa"),c=r("obii"),u=r("zfPd"),p=r("v77w"),l=r("5P1y"),g=r("eFfy"),f=r("BZIu"),v=r("L2JU"),d=r("Q2AE"),_=r("Nlzp");function b(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function h(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var m,w=(b(n={},"SET_LOAD_PATH",(function(t,e){t.loadPath=e})),b(n,"SET_ITEMS_MORE",(function(t,e){var r,n=e.items,o=e.range;(r=t.items).push.apply(r,h(n)),t.range=o||0})),b(n,"SET_ITEMS",(function(t,e){var r=e.items,n=e.range;t.items=r,t.range=n||0})),b(n,"SET_TYPE",(function(t,e){t.type=e})),n);function y(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var C=(y(m={},"FETCH_ITEMS",(function(t,e){var r=t.commit,n=(t.state,e.type),o=e.page;return Object(_.x)({type:n,page:o}).then((function(t){r("SET_TYPE",n),r("SET_ITEMS",{items:t,range:0})})).catch((function(t){return f.$logger.error("".concat("FETCH_ITEMS"," ").concat(t)),[]}))})),y(m,"SET_TYPE",(function(t,e){(0,t.commit)("SET_TYPE",e)})),y(m,"SET_LOAD_PATH",(function(t,e){(0,t.commit)("SET_LOAD_PATH",e)})),m),E=r("W6hq"),T=r("oxRU");var O,P,S,j,$=(S=function(t){for(var e,r,n,o,a=t.items,s=void 0===a?[]:a,i={},c=0;c<s.length;c++){var u=(e=s[c],r=void 0,n=void 0,o=void 0,r=e.id,n=e.name,o=e.code,{id:r,name:n,to:Object(E.c)(o,null)}),p=u.name.slice(0,1).toUpperCase(),l=i[p];l?l.items.push(u):i[p]={id:p,name:p,items:[u]}}return i},(P="brandsCatalog")in(O={})?Object.defineProperty(O,P,{value:S,enumerable:!0,configurable:!0,writable:!0}):O[P]=S,O);function A(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var M="productGroups",L={name:M,namespaced:!0,state:(j={},A(j,"items",[]),A(j,"loadPath",""),A(j,"type",null),A(j,"range",0),j),actions:C,mutations:w,getters:$},x=r("48TQ"),H=r("sEfC"),I=r.n(H);r("JXwH");function k(t,e,r,n,o,a,s){try{var i=t[a](s),c=i.value}catch(t){return void r(t)}i.done?e(c):Promise.resolve(c).then(n,o)}function R(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function D(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?R(Object(r),!0).forEach((function(e){B(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function B(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var F={name:"product-groups",components:{VButton:o.a,VPagination:a.a,VExpander:s.a,BannerCard:i.a,Breadcrumbs:c.a,BreadcrumbItem:u.a,GroupList:p.a,SeparatorSection:l.a,CategoriesSection:g.a},data:function(){return{activePage:0,pagesCount:10}},computed:D({},Object(v.d)([d.b]),{},Object(v.d)(M,["items","type"]),{},Object(v.c)(M,["brandsCatalog"]),{showList:function(){return this.type===T.productGroupTypes.BRANDS},columns:function(){return this.isTablet?2:this.isTabletLg?3:6},isTablet:function(){return this.$mq.tablet},isTabletLg:function(){return this.$mq.tabletLg}}),methods:D({},Object(v.b)(M,["FETCH_ITEMS"]),{onShowMore:function(){this.activePage+=1},onPageChanged:function(t){this.activePage=t},fetchCatalog:function(t,e,r){var n,o=this;return(n=regeneratorRuntime.mark((function n(){var a,s,i,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,a=t.params,s=a.type,i=a.page,c=e.params.page,o.$progress.start(),n.next=6,o.FETCH_ITEMS({type:s,page:i});case 6:o.$progress.finish(),r||i===c||window.scrollTo({top:MIN_SCROLL_VALUE+1,behavior:"smooth"}),r&&setTimeout((function(){return o.showMore=!1}),200),n.next=17;break;case 11:n.prev=11,n.t0=n.catch(0),o.$progress.fail(),f.$logger.error("debounce_fetchCatalog",n.t0),o.$router.replace({name:"404"}),o.$progress.finish();case 17:case"end":return n.stop()}}),n,null,[[0,11]])})),function(){var t=this,e=arguments;return new Promise((function(r,o){var a=n.apply(t,e);function s(t){k(a,r,o,s,i,"next",t)}function i(t){k(a,r,o,s,i,"throw",t)}s(void 0)}))})()}}),beforeRouteEnter:function(t,e,r){var n=t.fullPath,o=t.params,a=o.type,s=o.page;Object(x.a)(f.$store,M,L);var i=f.$store.state[M],c=i.loadPath,u=i.type;c===n&&u===a?r():(f.$progress.start(),f.$store.dispatch("".concat(M,"/").concat("FETCH_ITEMS"),{type:a,page:s}).then((function(){f.$store.dispatch("".concat(M,"/").concat("SET_LOAD_PATH"),n),r((function(t){f.$progress.finish()}))})).catch((function(t){r((function(t){f.$progress.fail(),f.$progress.finish()}))})))},beforeRouteUpdate:function(t,e,r){this.showMore?this.fetchCatalog(t,e,this.showMore):this.debounce_fetchCatalog(t,e),r()},beforeMount:function(){this.debounce_fetchCatalog=I()(this.fetchCatalog,500)}},G=r("KHd+"),U=Object(G.a)(F,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section product-groups-view"},[r("div",{staticClass:"container"},[r("breadcrumbs",{staticClass:"product-groups-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t._v("\n                Главная\n            ")]),t._v(" "),r("breadcrumb-item",{key:"sets",attrs:{to:{path:t.$route.path}}},[t._v("\n                "+t._s(t.$t("productGroups.title."+t.type))+"\n            ")])],1)],1),t._v(" "),t.showList?[r("categories-section",{staticClass:"brands-view__categories",attrs:{categories:t.categories}}),t._v(" "),r("separator-section",{staticClass:"brands-view__separator"}),t._v(" "),r("section",{staticClass:"section brands-view__section"},[r("div",{staticClass:"container"},[r("h1",{staticClass:"brands-view__section-hl"},[t._v(t._s(t.$t("productGroups.title."+t.type)))]),t._v(" "),r("group-list",{staticClass:"brands-view__brands",attrs:{items:t.brandsCatalog,columns:t.columns}})],1)])]:r("section",{staticClass:"section product-groups-view__section product-groups-view__sets"},[r("h1",{staticClass:"container product-groups-view__section-hl"},[t._v(t._s(t.$t("productGroups.title."+t.type)))]),t._v(" "),r("div",{staticClass:"container product-groups-view__sets-container"},[r("ul",{staticClass:"product-groups-view__sets-list"},t._l(t.items,(function(e){return r("banner-card",{key:e.id,staticClass:"product-groups-view__sets-list-item",attrs:{tag:"li",title:e.name,image:e.image,to:"/"+t.type+"/"+e.code,"button-text":"Смотреть товары"}})})),1),t._v(" "),t.pagesCount>1?r("div",{staticClass:"product-groups-view__sets-controls"},[t.activePage<t.pagesCount?r("v-button",{staticClass:"btn--outline product-groups-view__sets-controls-btn",on:{click:t.onShowMore}},[t._v("\n                    Показать ещё\n                ")]):t._e(),t._v(" "),r("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e()])]),t._v(" "),r("section",{staticClass:"section product-groups-view__section product-groups-view__seo"},[r("div",{staticClass:"container product-groups-view__seo-container"},[r("h2",{staticClass:"product-groups-view__section-hl product-groups-view__seo-hl"},[t._v("Блок SEO текста")]),t._v(" "),r("v-expander",{staticClass:"product-groups-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:t._u([{key:"btn",fn:function(e){var r=e.isExpanded;return[t._v("\n                    "+t._s(r?"Скрыть":"Показать больше")+"\n                ")]}}])},[t._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)])],2)}),[],!1,null,null,null);e.default=U.exports}}]);