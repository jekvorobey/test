(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{"7hZf":function(e,t,s){"use strict";s.r(t);var a=s("YlJd"),r=s("tH0B"),n=s("SRo2"),i=s("AYSG"),c=s("QudU"),o=(s("whRQ"),{name:"masterclasses",components:{MasterClassCard:a.a},data:function(){return{masterclasses:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:r.a,price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:n.a,price:{value:6e3,currency:"RUB"}},{id:3,name:"Пучки и хвосты",date:"5 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:i.a,price:{value:2e3,currency:"RUB"}},{id:4,name:"Цвет под ключ",date:"8 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:c.a,price:{value:4e3,currency:"RUB"}}]}}}),l=s("KHd+"),u=Object(l.a)(o,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"section masterclasses-view"},[s("h2",{staticClass:"masterclasses-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),s("div",{staticClass:"container container--tablet-lg masterclasses-view__container"},[s("ul",{staticClass:"masterclasses-view__list"},e._l(e.masterclasses,(function(t){return s("master-class-card",e._b({key:t.id,staticClass:"masterclasses-view__list-item",attrs:{to:"/"}},"master-class-card",t,!1))})),1)])])}),[],!1,null,null,null);t.default=u.exports},MjOs:function(e,t,s){"use strict";s.r(t);var a=s("i2Ud"),r=s("+gqB"),n=s("cpWO"),i=s("YlJd"),c=s("jVOK"),o=s("obii"),l=s("zfPd"),u=s("5P1y"),d=s("YSwA"),p=s("eFfy"),m=s("6AGh"),v=s("3eXy"),h=s("L2JU"),_=s("Q2AE"),b=s("4ov0"),f=s("/Ilw"),g=s("aXMN"),w=s("fhPv"),y=s("4mC1"),C=s("48TQ"),O=s("W6hq"),$=s("sEfC"),P=s.n($),B=(s("hNIU"),s("tH0B")),R=s("SRo2"),j=s("AYSG"),U=s("QudU");function M(e,t,s,a,r,n,i){try{var c=e[n](i),o=c.value}catch(e){return void s(e)}c.done?t(o):Promise.resolve(o).then(a,r)}function S(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,a)}return s}function A(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?S(Object(s),!0).forEach((function(t){k(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):S(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function k(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var x={slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"}},E={name:"product-groups",components:{VButton:a.a,VPagination:r.a,VExpander:n.a,VSlider:d.a,MasterClassCard:i.a,MasterClassBannerCard:c.a,Breadcrumbs:o.a,BreadcrumbItem:l.a,SeparatorSection:u.a,CategoriesSection:p.a,ShowMoreButton:m.a},data:function(){return{showMore:!1,masterclassBanners:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",author:"Владимир Перельман",image:B.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",author:"Владимир Перельман",image:R.a,code:"code2",price:{value:6e3,currency:"RUB"}},{id:3,name:"Пучки и хвосты",date:"5 сентября (пт), 12:00",author:"Владимир Перельман",image:j.a,code:"code3",price:{value:2e3,currency:"RUB"}},{id:4,name:"Цвет под ключ",date:"8 сентября (пт), 12:00",author:"Владимир Перельман",image:U.a,code:"code4",price:{value:4e3,currency:"RUB"}}],masterclasses:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:B.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:R.a,code:"code2",price:{value:6e3,currency:"RUB"}},{id:3,name:"Пучки и хвосты",date:"5 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:j.a,code:"code3",price:{value:2e3,currency:"RUB"}},{id:4,name:"Цвет под ключ",date:"8 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:U.a,code:"code4",price:{value:4e3,currency:"RUB"}}]}},computed:A(A(A(A({},Object(h.d)([_.b,_.h])),Object(h.d)(b.b,[b.a,b.c])),Object(h.c)(b.b,[f.b,f.a,f.c])),{},{columns:function(){return this.isTablet?2:this.isTabletLg?3:6},sliderOptions:function(){return x},isTablet:function(){return this.$mq.tablet},isTabletLg:function(){return this.$mq.tabletLg}}),methods:A(A({},Object(h.b)(b.b,[g.a])),{},{generateMasterclassUrl:function(e){return Object(O.e)(e)},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:A(A({},this.$route.query),{},{page:this.activePage+1})})},onPageChanged:function(e){this.showMore=!1,this.$router.push({path:this.$route.path,query:A(A({},this.$route.query),{},{page:e})})},fetchCatalog:function(e,t,s){var a,r=this;return(a=regeneratorRuntime.mark((function a(){var n,i,c,o,l,u,d,p,m,h;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,e.fullPath,n=e.params.type,i=e.query,c=i.page,o=void 0===c?1:c,l=i.orderField,u=void 0===l?"name":l,d=t.params.type,p=t.query.page,m=void 0===p?1:p,h=n===w.d.BRANDS?void 0:o,r.$progress.start(),a.next=7,r[g.a]({type:n,page:h,orderField:u,showMore:s});case 7:r.$progress.finish(),s||!r[_.h]||n===d&&o===m||window.scrollTo({top:y.d+1,behavior:"smooth"}),s&&setTimeout((function(){return r.showMore=!1}),200),a.next=17;break;case 12:a.prev=12,a.t0=a.catch(0),v.$logger.error(a.t0),r.$progress.fail(),r.$progress.finish();case 17:case"end":return a.stop()}}),a,null,[[0,12]])})),function(){var e=this,t=arguments;return new Promise((function(s,r){var n=a.apply(e,t);function i(e){M(n,s,r,i,c,"next",e)}function c(e){M(n,s,r,i,c,"throw",e)}i(void 0)}))})()}}),beforeRouteEnter:function(e,t,s){var a=e.fullPath,r=e.params.type,n=e.query,i=n.page,c=void 0===i?1:i,o=n.orderField,l=void 0===o?"name":o;Object(C.a)(v.$store,b.b,b.d);var u=v.$store.state[b.b],d=u.loadPath,p=u.type;if(d===a&&p===r)s((function(e){!e.$isServer&&e[_.h]&&window.scrollTo({top:0})}));else{var m=r===w.d.BRANDS?void 0:c;v.$progress.start(),v.$store.dispatch("".concat(b.b,"/").concat(g.a),{type:r,page:m,orderField:l}).then((function(){v.$store.dispatch("".concat(b.b,"/").concat(g.b),a),s((function(e){v.$progress.finish(),!e.$isServer&&e[_.h]&&window.scrollTo({top:0})}))})).catch((function(e){s((function(e){v.$progress.fail(),v.$progress.finish()}))}))}},beforeRouteUpdate:function(e,t,s){this.showMore?this.fetchCatalog(e,t,this.showMore):this.debounce_fetchCatalog(e,t),s()},beforeMount:function(){this.debounce_fetchCatalog=P()(this.fetchCatalog,500)}},q=s("KHd+"),T=Object(q.a)(E,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"section masterclasses-view"},[s("div",{staticClass:"container masterclasses-view__header"},[s("breadcrumbs",{staticClass:"container container--tablet-lg masterclasses-view__breadcrumbs"},[s("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e._v("\n                Главная\n            ")]),e._v(" "),s("breadcrumb-item",{key:"masterclasses",attrs:{to:{path:e.$route.path}}},[e._v("\n                "+e._s(e.$t("masterclasses.title"))+"\n            ")])],1),e._v(" "),s("section",{staticClass:"section masterclasses-view__banners"},[s("v-slider",{staticClass:"masterclasses-view__banners-slider",attrs:{name:"masterClasses",options:e.sliderOptions}},e._l(e.masterclassBanners,(function(t){return s("master-class-banner-card",{key:t.id,staticClass:"swiper-slide masterclasses-view__banners-slider-item",attrs:{name:t.name,image:t.image,price:t.price,author:t.author,description:t.date,to:e.generateMasterclassUrl(t.code),"show-btn":""}})})),1)],1)],1),e._v(" "),s("section",{staticClass:"section masterclasses-view__section masterclasses-view__sets"},[s("h1",{staticClass:"container masterclasses-view__section-hl"},[e._v("\n            "+e._s(e.$t("masterclasses.title"))+"\n        ")]),e._v(" "),s("div",{staticClass:"container masterclasses-view__sets-container"},[s("ul",{staticClass:"masterclasses-view__sets-list"},e._l(e.masterclasses,(function(t){return s("master-class-card",e._b({key:t.id,staticClass:"masterclasses-view__sets-list-item",attrs:{to:e.generateMasterclassUrl(t.code),"is-small":""}},"master-class-card",t,!1))})),1),e._v(" "),e.pagesCount>1?s("div",{staticClass:"masterclasses-view__sets-controls"},[e.activePage<e.pagesCount?s("show-more-button",{attrs:{"btn-class":"btn--outline masterclasses-view__sets-controls-btn","show-preloader":e.showMore},on:{click:e.onShowMore}},[e._v("\n                    Показать ещё\n                ")]):e._e(),e._v(" "),s("v-pagination",{attrs:{value:e.activePage,"page-count":e.pagesCount},on:{input:e.onPageChanged}})],1):e._e()])]),e._v(" "),s("section",{staticClass:"section masterclasses-view__section masterclasses-view__seo"},[s("div",{staticClass:"container masterclasses-view__seo-container"},[s("h2",{staticClass:"masterclasses-view__section-hl masterclasses-view__seo-hl"},[e._v("Блок SEO текста")]),e._v(" "),s("v-expander",{staticClass:"masterclasses-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:e._u([{key:"btn",fn:function(t){var s=t.isExpanded;return[e._v("\n                    "+e._s(s?"Скрыть":"Показать больше")+"\n                ")]}}])},[e._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)])])}),[],!1,null,null,null);t.default=T.exports},hNIU:function(e,t,s){},whRQ:function(e,t,s){}}]);