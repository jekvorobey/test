(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{JXwH:function(e,t,r){},fFVf:function(e,t,r){"use strict";r.r(t);var a,n=r("i2Ud"),s=r("+gqB"),o=r("wo+G"),i=r("YSwA"),c=r("ENRa"),u=r("YlJd"),p=r("jVOK"),l=r("obii"),d=r("zfPd"),g=r("v77w"),v=r("5P1y"),m=r("eFfy"),_=r("BZIu"),f=r("L2JU"),b=r("Q2AE"),h=r("48TQ"),w=r("Nlzp");function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function C(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var E,O=(y(a={},"SET_LOAD_PATH",(function(e,t){e.loadPath=t})),y(a,"SET_ITEMS_MORE",(function(e,t){var r,a=t.items,n=t.range;(r=e.items).push.apply(r,C(a)),e.range=n||0})),y(a,"SET_ITEMS",(function(e,t){var r=t.items,a=t.range;e.items=r,e.range=a||0})),y(a,"SET_TYPE",(function(e,t){e.type=t})),a);function T(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function S(e,t,r,a,n,s,o){try{var i=e[s](o),c=i.value}catch(e){return void r(e)}i.done?t(c):Promise.resolve(c).then(a,n)}var P=(T(E={},"FETCH_ITEMS",(function(e,t){var r,a=e.commit,n=(e.state,t.type),s=t.page;return(r=regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(w.y)({type:n,page:s});case 3:t=e.sent,a("SET_TYPE",n),a("SET_ITEMS",{items:t,range:0}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),Object(h.b)("FETCH_ITEMS",!0)(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})),function(){var e=this,t=arguments;return new Promise((function(a,n){var s=r.apply(e,t);function o(e){S(s,a,n,o,i,"next",e)}function i(e){S(s,a,n,o,i,"throw",e)}o(void 0)}))})()})),T(E,"SET_TYPE",(function(e,t){(0,e.commit)("SET_TYPE",t)})),T(E,"SET_LOAD_PATH",(function(e,t){(0,e.commit)("SET_LOAD_PATH",t)})),E),j=r("W6hq"),A=r("oxRU");var R,M,B,U,$=(B=function(e){for(var t,r,a,n,s=e.items,o=void 0===s?[]:s,i={},c=0;c<o.length;c++){var u=(t=o[c],r=void 0,a=void 0,n=void 0,r=t.id,a=t.name,n=t.code,{id:r,name:a,to:Object(j.c)(n,null)}),p=u.name.slice(0,1).toUpperCase(),l=i[p];l?l.items.push(u):i[p]={id:p,name:p,items:[u]}}return i},(M="brandsCatalog")in(R={})?Object.defineProperty(R,M,{value:B,enumerable:!0,configurable:!0,writable:!0}):R[M]=B,R);function x(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var L="productGroups",k={name:L,namespaced:!0,state:(U={},x(U,"items",[]),x(U,"loadPath",""),x(U,"type",null),x(U,"range",0),U),actions:P,mutations:O,getters:$},H=r("sEfC"),I=r.n(H),G=(r("JXwH"),r("tH0B")),D=r("SRo2"),V=r("AYSG"),F=r("QudU");function Y(e,t,r,a,n,s,o){try{var i=e[s](o),c=i.value}catch(e){return void r(e)}i.done?t(c):Promise.resolve(c).then(a,n)}function J(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function q(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?J(Object(r),!0).forEach((function(t){N(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):J(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function N(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Q={slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"}},z={name:"product-groups",components:{VButton:n.a,VPagination:s.a,VExpander:o.a,VSlider:i.a,BannerCard:c.a,MasterClassCard:u.a,MasterClassBannerCard:p.a,Breadcrumbs:l.a,BreadcrumbItem:d.a,GroupList:g.a,SeparatorSection:v.a,CategoriesSection:m.a},data:function(){return{activePage:0,pagesCount:10,masterclassBanners:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",author:"Владимир Перельман",image:G.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",author:"Владимир Перельман",image:D.a,code:"code2",price:{value:6e3,currency:"RUB"}},{id:3,name:"Пучки и хвосты",date:"5 сентября (пт), 12:00",author:"Владимир Перельман",image:V.a,code:"code3",price:{value:2e3,currency:"RUB"}},{id:4,name:"Цвет под ключ",date:"8 сентября (пт), 12:00",author:"Владимир Перельман",image:F.a,code:"code4",price:{value:4e3,currency:"RUB"}}],masterclasses:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:G.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:D.a,code:"code2",price:{value:6e3,currency:"RUB"}},{id:3,name:"Пучки и хвосты",date:"5 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:V.a,code:"code3",price:{value:2e3,currency:"RUB"}},{id:4,name:"Цвет под ключ",date:"8 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:F.a,code:"code4",price:{value:4e3,currency:"RUB"}}]}},computed:q({},Object(f.d)([b.b]),{},Object(f.d)(L,["items","type"]),{},Object(f.c)(L,["brandsCatalog"]),{showList:function(){return this.type===A.productGroupTypes.BRANDS},columns:function(){return this.isTablet?2:this.isTabletLg?3:6},sliderOptions:function(){return Q},isTablet:function(){return this.$mq.tablet},isTabletLg:function(){return this.$mq.tabletLg},isMasterClass:function(){return this.type===A.productGroupTypes.MASTERCLASSES}}),methods:q({},Object(f.b)(L,["FETCH_ITEMS"]),{generateCategoryUrl:function(e){var t=this.type;return Object(j.c)(t||A.productGroupTypes.MASTERCLASSES,e)},onShowMore:function(){this.activePage+=1},onPageChanged:function(e){this.activePage=e},fetchCatalog:function(e,t,r){var a,n=this;return(a=regeneratorRuntime.mark((function a(){var s,o,i,c;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,s=e.params,o=s.type,i=s.page,c=t.params.page,n.$progress.start(),a.next=6,n.FETCH_ITEMS({type:o,page:i});case 6:n.$progress.finish(),r||i===c||window.scrollTo({top:MIN_SCROLL_VALUE+1,behavior:"smooth"}),r&&setTimeout((function(){return n.showMore=!1}),200),a.next=15;break;case 11:a.prev=11,a.t0=a.catch(0),n.$progress.fail(),n.$progress.finish();case 15:case"end":return a.stop()}}),a,null,[[0,11]])})),function(){var e=this,t=arguments;return new Promise((function(r,n){var s=a.apply(e,t);function o(e){Y(s,r,n,o,i,"next",e)}function i(e){Y(s,r,n,o,i,"throw",e)}o(void 0)}))})()}}),beforeRouteEnter:function(e,t,r){var a=e.fullPath,n=e.params,s=n.type,o=n.page;Object(h.a)(_.$store,L,k);var i=_.$store.state[L],c=i.loadPath,u=i.type;c===a&&u===s?r():(_.$progress.start(),_.$store.dispatch("".concat(L,"/").concat("FETCH_ITEMS"),{type:s,page:o}).then((function(){_.$store.dispatch("".concat(L,"/").concat("SET_LOAD_PATH"),a),r((function(e){_.$progress.finish()}))})).catch((function(e){r((function(e){_.$progress.fail(),_.$progress.finish()}))})))},beforeRouteUpdate:function(e,t,r){this.showMore?this.fetchCatalog(e,t,this.showMore):this.debounce_fetchCatalog(e,t),r()},beforeMount:function(){this.debounce_fetchCatalog=I()(this.fetchCatalog,500)}},K=r("KHd+"),X=Object(K.a)(z,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"section product-groups-view"},[r("div",{staticClass:"container product-groups-view__header"},[r("breadcrumbs",{staticClass:"container container--tablet-lg product-groups-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e._v("\n                Главная\n            ")]),e._v(" "),r("breadcrumb-item",{key:"sets",attrs:{to:{path:e.$route.path}}},[e._v("\n                "+e._s(e.$t("productGroups.title."+e.type))+"\n            ")])],1),e._v(" "),e.isMasterClass?r("section",{staticClass:"section product-groups-view__banners"},[r("v-slider",{staticClass:"product-groups-view__banners-slider",attrs:{name:"masterClasses",options:e.sliderOptions}},e._l(e.masterclassBanners,(function(t){return r("master-class-banner-card",{key:t.id,staticClass:"swiper-slide product-groups-view__banners-slider-item",attrs:{name:t.name,image:t.image,price:t.price,author:t.author,description:t.date,to:e.generateCategoryUrl(t.code),"show-btn":""}})})),1)],1):e._e()],1),e._v(" "),e.showList?[r("categories-section",{staticClass:"product-groups-view__categories",attrs:{categories:e.categories}}),e._v(" "),r("separator-section",{staticClass:"product-groups-view__separator"}),e._v(" "),r("section",{staticClass:"section product-groups-view__section"},[r("div",{staticClass:"container"},[r("h1",{staticClass:"product-groups-view__section-hl"},[e._v("\n                    "+e._s(e.$t("productGroups.title."+(e.type||"catalog")))+"\n                ")]),e._v(" "),r("group-list",{staticClass:"product-groups-view__brands",attrs:{items:e.brandsCatalog,columns:e.columns}})],1)])]:[r("section",{staticClass:"section product-groups-view__section product-groups-view__sets"},[r("h1",{staticClass:"container product-groups-view__section-hl"},[e._v("\n                "+e._s(e.$t("productGroups.title."+(e.type||"catalog")))+"\n            ")]),e._v(" "),r("div",{staticClass:"container product-groups-view__sets-container"},[e.isMasterClass?r("ul",{staticClass:"product-groups-view__sets-list"},e._l(e.masterclasses,(function(t){return r("master-class-card",e._b({key:t.id,staticClass:"product-groups-view__sets-list-item",attrs:{to:e.generateCategoryUrl(t.code),"is-small":""}},"master-class-card",t,!1))})),1):r("ul",{staticClass:"product-groups-view__sets-list"},e._l(e.items,(function(t){return r("banner-card",{key:t.id,staticClass:"product-groups-view__sets-list-item",attrs:{tag:"li",title:t.name,image:t.image,to:e.generateCategoryUrl(t.code),"button-text":"Смотреть товары"}})})),1),e._v(" "),e.pagesCount>1?r("div",{staticClass:"product-groups-view__sets-controls"},[e.activePage<e.pagesCount?r("v-button",{staticClass:"btn--outline product-groups-view__sets-controls-btn",on:{click:e.onShowMore}},[e._v("\n                        Показать ещё\n                    ")]):e._e(),e._v(" "),r("v-pagination",{attrs:{value:e.activePage,"page-count":e.pagesCount},on:{input:e.onPageChanged}})],1):e._e()])])],e._v(" "),r("section",{staticClass:"section product-groups-view__section product-groups-view__seo"},[r("div",{staticClass:"container product-groups-view__seo-container"},[r("h2",{staticClass:"product-groups-view__section-hl product-groups-view__seo-hl"},[e._v("Блок SEO текста")]),e._v(" "),r("v-expander",{staticClass:"product-groups-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:e._u([{key:"btn",fn:function(t){var r=t.isExpanded;return[e._v("\n                    "+e._s(r?"Скрыть":"Показать больше")+"\n                ")]}}])},[e._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)])],2)}),[],!1,null,null,null);t.default=X.exports}}]);