(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{JXwH:function(e,t,r){},fFVf:function(e,t,r){"use strict";r.r(t);var a,n=r("i2Ud"),o=r("+gqB"),s=r("cpWO"),i=r("YlJd"),c=r("jVOK"),u=r("obii"),p=r("zfPd"),l=r("v77w"),d=r("5P1y"),v=r("YSwA"),g=r("ENRa"),f=r("eFfy"),m=r("3eXy"),h=r("L2JU"),_=r("Q2AE"),b=r("48TQ"),y=r("Nlzp"),w=r("fhPv");function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function S(e){return function(e){if(Array.isArray(e))return E(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return E(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return E(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var O,T=(C(a={},"SET_LOAD_PATH",(function(e,t){e.loadPath=t})),C(a,"SET_ITEMS_MORE",(function(e,t){var r,a=t.items,n=t.range;(r=e.items).push.apply(r,S(a)),e.range=n||0})),C(a,"SET_ITEMS",(function(e,t){var r=t.items,a=t.range;e.items=r,e.range=a||0})),C(a,"SET_TYPE",(function(e,t){e.type=t})),a);function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function j(e,t,r,a,n,o,s){try{var i=e[o](s),c=i.value}catch(e){return void r(e)}i.done?t(c):Promise.resolve(c).then(a,n)}var M,A=(P(O={},"FETCH_ITEMS",(function(e,t){return(r=regeneratorRuntime.mark((function r(){var a,n,o,s,i,c,u,p;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a=e.commit,e.state,n=t.type,o=t.page,s=t.orderField,i=t.showMore,r.prev=2,r.next=5,Object(y.R)(n,o,s);case 5:c=r.sent,u=c.items,p=c.range,a(i?"SET_ITEMS_MORE":"SET_ITEMS",{items:u,range:p}),a("SET_TYPE",n),r.next=15;break;case 12:r.prev=12,r.t0=r.catch(2),Object(b.b)("FETCH_ITEMS",!0)(r.t0);case 15:case"end":return r.stop()}}),r,null,[[2,12]])})),function(){var e=this,t=arguments;return new Promise((function(a,n){var o=r.apply(e,t);function s(e){j(o,a,n,s,i,"next",e)}function i(e){j(o,a,n,s,i,"throw",e)}s(void 0)}))})();var r})),P(O,"SET_TYPE",(function(e,t){(0,e.commit)("SET_TYPE",t)})),P(O,"SET_LOAD_PATH",(function(e,t){(0,e.commit)("SET_LOAD_PATH",t)})),O),$=r("W6hq");function R(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var B=(R(M={},"brandsCatalog",(function(e){for(var t,r,a,n,o=e.items,s=void 0===o?[]:o,i={},c=0;c<s.length;c++){var u=(t=s[c],r=void 0,a=void 0,n=void 0,r=t.id,a=t.name,n=t.code,{id:r,name:a,to:Object($.d)(w.d.BRANDS,n,null)}),p=u.name.slice(0,1).toUpperCase(),l=i[p];l?l.items.push(u):i[p]={id:p,name:p,items:[u]}}return i})),R(M,"activePage",(function(e,t,r){var a=r.route;return a.query.page?Number(a.query.page):1})),R(M,"pagesCount",(function(e){return Math.ceil(e.range/12)})),M);function U(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var x="productGroups";function k(){var e;return{name:x,namespaced:!0,state:(e={},U(e,"items",[]),U(e,"loadPath",""),U(e,"type",null),U(e,"range",0),e),actions:A,mutations:T,getters:B}}var L=r("4mC1"),q=r("sEfC"),H=r.n(q),I=(r("JXwH"),r("tH0B")),D=r("SRo2"),F=r("AYSG"),N=r("QudU");function V(e,t,r,a,n,o,s){try{var i=e[o](s),c=i.value}catch(e){return void r(e)}i.done?t(c):Promise.resolve(c).then(a,n)}function Y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function G(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(r),!0).forEach((function(t){J(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function J(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Q={slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"}},X={name:"product-groups",components:{VButton:n.a,VPagination:o.a,VExpander:s.a,VSlider:v.a,BannerCard:g.a,MasterClassCard:i.a,MasterClassBannerCard:c.a,Breadcrumbs:u.a,BreadcrumbItem:p.a,GroupList:l.a,SeparatorSection:d.a,CategoriesSection:f.a},data:function(){return{showMore:!1,masterclassBanners:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",author:"Владимир Перельман",image:I.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",author:"Владимир Перельман",image:D.a,code:"code2",price:{value:6e3,currency:"RUB"}},{id:3,name:"Пучки и хвосты",date:"5 сентября (пт), 12:00",author:"Владимир Перельман",image:F.a,code:"code3",price:{value:2e3,currency:"RUB"}},{id:4,name:"Цвет под ключ",date:"8 сентября (пт), 12:00",author:"Владимир Перельман",image:N.a,code:"code4",price:{value:4e3,currency:"RUB"}}],masterclasses:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:I.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:D.a,code:"code2",price:{value:6e3,currency:"RUB"}},{id:3,name:"Пучки и хвосты",date:"5 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:F.a,code:"code3",price:{value:2e3,currency:"RUB"}},{id:4,name:"Цвет под ключ",date:"8 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:N.a,code:"code4",price:{value:4e3,currency:"RUB"}}]}},computed:G({},Object(h.d)([_.b,_.h]),{},Object(h.d)(x,["items","type"]),{},Object(h.c)(x,["brandsCatalog","activePage","pagesCount"]),{showList:function(){return this.type===w.d.BRANDS},columns:function(){return this.isTablet?2:this.isTabletLg?3:6},sliderOptions:function(){return Q},isTablet:function(){return this.$mq.tablet},isTabletLg:function(){return this.$mq.tabletLg},isMasterClass:function(){return this.type===w.d.MASTERCLASSES}}),methods:G({},Object(h.b)(x,["FETCH_ITEMS"]),{generateCategoryUrl:function(e){var t=this.type;return Object($.d)(t||w.d.MASTERCLASSES,e)},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:G({},this.$route.query,{page:this.activePage+1})})},onPageChanged:function(e){this.showMore=!1,this.$router.push({path:this.$route.path,query:G({},this.$route.query,{page:e})})},fetchCatalog:function(e,t,r){var a,n=this;return(a=regeneratorRuntime.mark((function a(){var o,s,i,c,u,p,l,d,v,g;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,e.fullPath,o=e.params.type,s=e.query,i=s.page,c=void 0===i?1:i,u=s.orderField,p=void 0===u?"name":u,l=t.params.type,d=t.query.page,v=void 0===d?1:d,g=o===w.d.BRANDS?void 0:c,n.$progress.start(),a.next=7,n.FETCH_ITEMS({type:o,page:g,orderField:p,showMore:r});case 7:n.$progress.finish(),r||!n[_.h]||o===l&&c===v||window.scrollTo({top:L.c+1,behavior:"smooth"}),r&&setTimeout((function(){return n.showMore=!1}),200),a.next=17;break;case 12:a.prev=12,a.t0=a.catch(0),m.$logger.error(a.t0),n.$progress.fail(),n.$progress.finish();case 17:case"end":return a.stop()}}),a,null,[[0,12]])})),function(){var e=this,t=arguments;return new Promise((function(r,n){var o=a.apply(e,t);function s(e){V(o,r,n,s,i,"next",e)}function i(e){V(o,r,n,s,i,"throw",e)}s(void 0)}))})()}}),beforeRouteEnter:function(e,t,r){var a=e.fullPath,n=e.params.type,o=e.query,s=o.page,i=void 0===s?1:s,c=o.orderField,u=void 0===c?"name":c;Object(b.a)(m.$store,x,k);var p=m.$store.state[x],l=p.loadPath,d=p.type;if(l===a&&d===n)r((function(e){!e.$isServer&&e[_.h]&&window.scrollTo({top:0})}));else{var v=n===w.d.BRANDS?void 0:i;m.$progress.start(),m.$store.dispatch("".concat(x,"/").concat("FETCH_ITEMS"),{type:n,page:v,orderField:u}).then((function(){m.$store.dispatch("".concat(x,"/").concat("SET_LOAD_PATH"),a),r((function(e){m.$progress.finish(),!e.$isServer&&e[_.h]&&window.scrollTo({top:0})}))})).catch((function(e){r((function(e){m.$progress.fail(),m.$progress.finish()}))}))}},beforeRouteUpdate:function(e,t,r){this.showMore?this.fetchCatalog(e,t,this.showMore):this.debounce_fetchCatalog(e,t),r()},beforeMount:function(){this.debounce_fetchCatalog=H()(this.fetchCatalog,500)}},z=r("KHd+"),K=Object(z.a)(X,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section product-groups-view"},[r("div",{staticClass:"container product-groups-view__header"},[r("breadcrumbs",{staticClass:"container container--tablet-lg product-groups-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e._v("\n                Главная\n            ")]),e._v(" "),r("breadcrumb-item",{key:"sets",attrs:{to:{path:e.$route.path}}},[e._v("\n                "+e._s(e.$t("productGroups.title."+e.type))+"\n            ")])],1),e._v(" "),e.isMasterClass?r("section",{staticClass:"section product-groups-view__banners"},[r("v-slider",{staticClass:"product-groups-view__banners-slider",attrs:{name:"masterClasses",options:e.sliderOptions}},e._l(e.masterclassBanners,(function(t){return r("master-class-banner-card",{key:t.id,staticClass:"swiper-slide product-groups-view__banners-slider-item",attrs:{name:t.name,image:t.image,price:t.price,author:t.author,description:t.date,to:e.generateCategoryUrl(t.code),"show-btn":""}})})),1)],1):e._e()],1),e._v(" "),e.showList?[r("categories-section",{staticClass:"product-groups-view__categories",attrs:{categories:e.categories}}),e._v(" "),r("separator-section",{staticClass:"product-groups-view__separator"}),e._v(" "),r("section",{staticClass:"section product-groups-view__section"},[r("div",{staticClass:"container"},[r("h1",{staticClass:"product-groups-view__section-hl"},[e._v("\n                    "+e._s(e.$t("productGroups.title."+(e.type||"catalog")))+"\n                ")]),e._v(" "),r("group-list",{staticClass:"product-groups-view__brands",attrs:{items:e.brandsCatalog,columns:e.columns}})],1)])]:[r("section",{staticClass:"section product-groups-view__section product-groups-view__sets"},[r("h1",{staticClass:"container product-groups-view__section-hl"},[e._v("\n                "+e._s(e.$t("productGroups.title."+(e.type||"catalog")))+"\n            ")]),e._v(" "),r("div",{staticClass:"container product-groups-view__sets-container"},[e.isMasterClass?r("ul",{staticClass:"product-groups-view__sets-list"},e._l(e.masterclasses,(function(t){return r("master-class-card",e._b({key:t.id,staticClass:"product-groups-view__sets-list-item",attrs:{to:e.generateCategoryUrl(t.code),"is-small":""}},"master-class-card",t,!1))})),1):r("ul",{staticClass:"product-groups-view__sets-list"},e._l(e.items,(function(t){return r("banner-card",{key:t.id,staticClass:"product-groups-view__sets-list-item",attrs:{tag:"li",title:t.name,image:t.preview_photo,to:e.generateCategoryUrl(t.code),"button-text":"Смотреть товары"}})})),1),e._v(" "),e.pagesCount>1?r("div",{staticClass:"product-groups-view__sets-controls"},[e.activePage<e.pagesCount?r("v-button",{staticClass:"btn--outline product-groups-view__sets-controls-btn",on:{click:e.onShowMore}},[e._v("\n                        Показать ещё\n                    ")]):e._e(),e._v(" "),r("v-pagination",{attrs:{value:e.activePage,"page-count":e.pagesCount},on:{input:e.onPageChanged}})],1):e._e()])])],e._v(" "),r("section",{staticClass:"section product-groups-view__section product-groups-view__seo"},[r("div",{staticClass:"container product-groups-view__seo-container"},[r("h2",{staticClass:"product-groups-view__section-hl product-groups-view__seo-hl"},[e._v("Блок SEO текста")]),e._v(" "),r("v-expander",{staticClass:"product-groups-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:e._u([{key:"btn",fn:function(t){var r=t.isExpanded;return[e._v("\n                    "+e._s(r?"Скрыть":"Показать больше")+"\n                ")]}}])},[e._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)])],2)}),[],!1,null,null,null);t.default=K.exports}}]);