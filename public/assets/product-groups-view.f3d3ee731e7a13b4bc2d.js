(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{JXwH:function(t,e,r){},fFVf:function(t,e,r){"use strict";r.r(e);var o=r("i2Ud"),s=r("+gqB"),n=r("cpWO"),a=r("obii"),i=r("zfPd"),c=r("v77w"),u=r("5P1y"),p=r("YSwA"),l=r("ENRa"),d=r("eFfy"),h=r("6AGh"),v=r("3eXy"),g=r("L2JU"),b=r("Q2AE"),f=r("4ov0"),_=r("/Ilw"),w=r("aXMN"),m=r("fhPv"),y=r("4mC1"),C=r("48TQ"),O=r("W6hq"),$=r("sEfC"),P=r.n($);r("JXwH");function j(t,e,r,o,s,n,a){try{var i=t[n](a),c=i.value}catch(t){return void r(t)}i.done?e(c):Promise.resolve(c).then(o,s)}function S(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function M(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?S(Object(r),!0).forEach((function(e){x(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function x(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var E={slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"}},k={name:"product-groups",components:{VButton:o.a,VPagination:s.a,VExpander:n.a,VSlider:p.a,BannerCard:l.a,Breadcrumbs:a.a,BreadcrumbItem:i.a,GroupList:c.a,SeparatorSection:u.a,CategoriesSection:d.a,ShowMoreButton:h.a},data:function(){return{showMore:!1}},computed:M(M(M(M({},Object(g.d)([b.b,b.h])),Object(g.d)(f.b,[f.a,f.c])),Object(g.c)(f.b,[_.b,_.a,_.c])),{},{showList:function(){return this[f.c]===m.d.BRANDS},columns:function(){return this.isTablet?2:this.isTabletLg?3:6},sliderOptions:function(){return E},isTablet:function(){return this.$mq.tablet},isTabletLg:function(){return this.$mq.tabletLg}}),methods:M(M({},Object(g.b)(f.b,[w.a])),{},{generateCategoryUrl:function(t){var e=this.type;return Object(O.d)(e,t)},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:M(M({},this.$route.query),{},{page:this.activePage+1})})},onPageChanged:function(t){this.showMore=!1,this.$router.push({path:this.$route.path,query:M(M({},this.$route.query),{},{page:t})})},fetchCatalog:function(t,e,r){var o,s=this;return(o=regeneratorRuntime.mark((function o(){var n,a,i,c,u,p,l,d,h,g;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,t.fullPath,n=t.params.type,a=t.query,i=a.page,c=void 0===i?1:i,u=a.orderField,p=void 0===u?"name":u,l=e.params.type,d=e.query.page,h=void 0===d?1:d,g=n===m.d.BRANDS?void 0:c,s.$progress.start(),o.next=7,s[w.a]({type:n,page:g,orderField:p,showMore:r});case 7:s.$progress.finish(),r||!s[b.h]||n===l&&c===h||window.scrollTo({top:y.d+1,behavior:"smooth"}),r&&setTimeout((function(){return s.showMore=!1}),200),o.next=17;break;case 12:o.prev=12,o.t0=o.catch(0),v.$logger.error(o.t0),s.$progress.fail(),s.$progress.finish();case 17:case"end":return o.stop()}}),o,null,[[0,12]])})),function(){var t=this,e=arguments;return new Promise((function(r,s){var n=o.apply(t,e);function a(t){j(n,r,s,a,i,"next",t)}function i(t){j(n,r,s,a,i,"throw",t)}a(void 0)}))})()}}),beforeRouteEnter:function(t,e,r){var o=t.fullPath,s=t.params.type,n=t.query,a=n.page,i=void 0===a?1:a,c=n.orderField,u=void 0===c?"name":c;Object(C.a)(v.$store,f.b,f.d);var p=v.$store.state[f.b],l=p.loadPath,d=p.type;if(l===o&&d===s)r((function(t){!t.$isServer&&t[b.h]&&window.scrollTo({top:0})}));else{var h=s===m.d.BRANDS?void 0:i;v.$progress.start(),v.$store.dispatch("".concat(f.b,"/").concat(w.a),{type:s,page:h,orderField:u}).then((function(){v.$store.dispatch("".concat(f.b,"/").concat(w.b),o),r((function(t){v.$progress.finish(),!t.$isServer&&t[b.h]&&window.scrollTo({top:0})}))})).catch((function(t){r((function(t){v.$progress.fail(),v.$progress.finish()}))}))}},beforeRouteUpdate:function(t,e,r){this.showMore?this.fetchCatalog(t,e,this.showMore):this.debounce_fetchCatalog(t,e),r()},beforeMount:function(){this.debounce_fetchCatalog=P()(this.fetchCatalog,500)}},q=r("KHd+"),R=Object(q.a)(k,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section product-groups-view"},[r("div",{staticClass:"container product-groups-view__header"},[r("breadcrumbs",{staticClass:"container container--tablet-lg product-groups-view__breadcrumbs"},[r("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t._v("\n                Главная\n            ")]),t._v(" "),r("breadcrumb-item",{key:"sets",attrs:{to:{path:t.$route.path}}},[t._v("\n                "+t._s(t.$t("productGroups.title."+t.type))+"\n            ")])],1)],1),t._v(" "),t.showList?[r("categories-section",{staticClass:"product-groups-view__categories",attrs:{categories:t.categories}}),t._v(" "),r("separator-section",{staticClass:"product-groups-view__separator"}),t._v(" "),r("section",{staticClass:"section product-groups-view__section"},[r("div",{staticClass:"container"},[r("h1",{staticClass:"product-groups-view__section-hl"},[t._v("\n                    "+t._s(t.$t("productGroups.title."+(t.type||"catalog")))+"\n                ")]),t._v(" "),r("group-list",{staticClass:"product-groups-view__brands",attrs:{items:t.brandsCatalog,columns:t.columns}})],1)])]:[r("section",{staticClass:"section product-groups-view__section product-groups-view__sets"},[r("h1",{staticClass:"container product-groups-view__section-hl"},[t._v("\n                "+t._s(t.$t("productGroups.title."+(t.type||"catalog")))+"\n            ")]),t._v(" "),r("div",{staticClass:"container product-groups-view__sets-container"},[r("ul",{staticClass:"product-groups-view__sets-list"},t._l(t.items,(function(e){return r("banner-card",{key:e.id,staticClass:"product-groups-view__sets-list-item",attrs:{tag:"li",title:e.name,image:e.preview_photo,to:t.generateCategoryUrl(e.code),"button-text":"Смотреть товары"}})})),1),t._v(" "),t.pagesCount>1?r("div",{staticClass:"product-groups-view__sets-controls"},[t.activePage<t.pagesCount?r("show-more-button",{attrs:{"btn-class":"btn--outline product-groups-view__sets-controls-btn","show-preloader":t.showMore},on:{click:t.onShowMore}},[t._v("\n                        Показать ещё\n                    ")]):t._e(),t._v(" "),r("v-pagination",{attrs:{value:t.activePage,"page-count":t.pagesCount},on:{input:t.onPageChanged}})],1):t._e()])])],t._v(" "),r("section",{staticClass:"section product-groups-view__section product-groups-view__seo"},[r("div",{staticClass:"container product-groups-view__seo-container"},[r("h2",{staticClass:"product-groups-view__section-hl product-groups-view__seo-hl"},[t._v("Блок SEO текста")]),t._v(" "),r("v-expander",{staticClass:"product-groups-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:t._u([{key:"btn",fn:function(e){var r=e.isExpanded;return[t._v("\n                    "+t._s(r?"Скрыть":"Показать больше")+"\n                ")]}}])},[t._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)])],2)}),[],!1,null,null,null);e.default=R.exports}}]);