(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{"/4sP":function(e,t,s){},"7hZf":function(e,t,s){"use strict";s.r(t);var a=s("YlJd"),r=s("tH0B"),n=s("SRo2"),i=s("AYSG"),c=s("QudU"),l=(s("whRQ"),{name:"masterclasses",components:{MasterClassCard:a.a},data:function(){return{masterclasses:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:r.a,price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:n.a,price:{value:6e3,currency:"RUB"}},{id:3,name:"Пучки и хвосты",date:"5 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:i.a,price:{value:2e3,currency:"RUB"}},{id:4,name:"Цвет под ключ",date:"8 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:c.a,price:{value:4e3,currency:"RUB"}}]}}}),o=s("KHd+"),u=Object(o.a)(l,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"section masterclasses-view"},[s("h2",{staticClass:"masterclasses-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),s("div",{staticClass:"container container--tablet-lg masterclasses-view__container"},[s("ul",{staticClass:"masterclasses-view__list"},e._l(e.masterclasses,(function(t){return s("master-class-card",e._b({key:t.id,staticClass:"masterclasses-view__list-item",attrs:{to:"/"}},"master-class-card",t,!1))})),1)])])}),[],!1,null,null,null);t.default=u.exports},MjOs:function(e,t,s){"use strict";s.r(t);var a=s("i2Ud"),r=s("+gqB"),n=s("cpWO"),i=s("pFko"),c=s("o3vK"),l=(s("/4sP"),{name:"select-panel",components:{VCheck:c.a},props:{id:{type:[String,Number]},value:{type:[String,Number,Boolean]},name:{type:String,default:"select-panel",required:!0},items:{type:Array,default:function(){return[]}}},data:function(){return{internalValue:this.value}},watch:{internalValue:function(e){this.$emit("input",e)},value:function(e){this.internalValue=e}}}),o=s("KHd+"),u=Object(o.a)(l,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"select-panel"},e._l(e.items,(function(t,a){return s("v-check",{key:t.value,staticClass:"select-panel__radio",attrs:{type:"radio",id:"select-panel-"+e.id+"-"+a,value:t.value,name:e.name},model:{value:e.internalValue,callback:function(t){e.internalValue=t},expression:"internalValue"}},[e._t("content",[e._v("\n            "+e._s(t.title)+"\n        ")],{item:t,index:a})],2)})),1)}),[],!1,null,null,null).exports,d=s("nurM"),m=s("YlJd"),v=s("jVOK"),p=s("obii"),_=s("zfPd"),h=s("5P1y"),w=s("YSwA"),f=s("eFfy"),b=s("6AGh"),g=(s("3eXy"),s("L2JU")),y=s("Q2AE"),C=(s("4mC1"),s("48TQ"),s("W6hq")),O=(s("sEfC"),s("hNIU"),s("tH0B")),S=s("SRo2"),P=s("AYSG"),B=s("QudU");s("+in6");function R(e,t,s,a,r,n,i){try{var c=e[n](i),l=c.value}catch(e){return void s(e)}c.done?t(l):Promise.resolve(l).then(a,r)}function U(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,a)}return s}function j(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?U(Object(s),!0).forEach((function(t){k(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):U(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function k(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var $={slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"}},M=[{value:0,title:"Будущие события"},{value:1,title:"Прошедшие"}],x=[{value:0,title:"Все темы"},{value:1,title:"Парикмахерам"},{value:2,title:"Визажистам"},{value:3,title:"Нейл-мастерам"},{value:4,title:"Фотографам"},{value:5,title:"Стилистам"}],A={name:"product-groups",components:{VButton:a.a,VPagination:r.a,VExpander:n.a,VSlider:w.a,VSelect:i.a,RadioSwitch:d.a,SelectPanel:u,ShowMoreButton:b.a,MasterClassCard:m.a,MasterClassBannerCard:v.a,Breadcrumbs:p.a,BreadcrumbItem:_.a,SeparatorSection:h.a,CategoriesSection:f.a},data:function(){return{showMore:!1,activePage:1,pagesCount:3,masterclassStatus:M,selectedStatus:M[0].value,topics:x,selectedTopic:x[0].value,masterclassBanners:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",author:"Владимир Перельман",image:O.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",author:"Владимир Перельман",image:S.a,code:"code2",price:{value:6e3,currency:"RUB"}},{id:3,name:"Пучки и хвосты",date:"5 сентября (пт), 12:00",author:"Владимир Перельман",image:P.a,code:"code3",price:{value:2e3,currency:"RUB"}},{id:4,name:"Цвет под ключ",date:"8 сентября (пт), 12:00",author:"Владимир Перельман",image:B.a,code:"code4",price:{value:4e3,currency:"RUB"}}],masterclasses:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:O.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:S.a,code:"code2",price:{value:6e3,currency:"RUB"}},{id:3,name:"Пучки и хвосты",date:"5 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:P.a,code:"code3",price:{value:2e3,currency:"RUB"}},{id:4,name:"Цвет под ключ",date:"8 сентября (пт), 12:00",address:"Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1",image:B.a,code:"code4",price:{value:4e3,currency:"RUB"}}]}},computed:j(j({},Object(g.d)([y.b,y.h])),{},{sliderOptions:function(){return $},isTablet:function(){return this.$mq.tablet},isTabletLg:function(){return this.$mq.tabletLg}}),methods:{generateMasterclassUrl:function(e){return Object(C.e)(e)},onShowMore:function(){this.showMore=!0,this.$router.replace({path:this.$route.path,query:j(j({},this.$route.query),{},{page:this.activePage+1})})},onPageChanged:function(e){this.showMore=!1,this.$router.push({path:this.$route.path,query:j(j({},this.$route.query),{},{page:e})})},fetchCatalog:function(e,t,s){return(a=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})),function(){var e=this,t=arguments;return new Promise((function(s,r){var n=a.apply(e,t);function i(e){R(n,s,r,i,c,"next",e)}function c(e){R(n,s,r,i,c,"throw",e)}i(void 0)}))})();var a}},beforeRouteEnter:function(e,t,s){s()},beforeRouteUpdate:function(e,t,s){s()},beforeMount:function(){}},V=Object(o.a)(A,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"section masterclasses-view"},[s("div",{staticClass:"container masterclasses-view__header"},[s("breadcrumbs",{staticClass:"container container--tablet-lg masterclasses-view__breadcrumbs"},[s("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e.isTablet?s("v-svg",{attrs:{name:"home",width:"10",height:"10"}}):s("span",[e._v("Главная")])],1),e._v(" "),s("breadcrumb-item",{key:"masterclasses",attrs:{to:{path:e.$route.path}}},[e._v("\n                "+e._s(e.$t("masterclasses.title"))+"\n            ")])],1),e._v(" "),s("section",{staticClass:"section masterclasses-view__banners"},[s("v-slider",{staticClass:"masterclasses-view__banners-slider",attrs:{name:"masterClasses",options:e.sliderOptions}},e._l(e.masterclassBanners,(function(t){return s("master-class-banner-card",{key:t.id,staticClass:"swiper-slide masterclasses-view__banners-slider-item",attrs:{name:t.name,image:t.image,price:t.price,author:t.author,description:t.date,to:e.generateMasterclassUrl(t.code),"show-btn":""}})})),1)],1)],1),e._v(" "),s("section",{staticClass:"section masterclasses-view__section masterclasses-view__sets"},[s("div",{staticClass:"container masterclasses-view__header"},[s("div",{staticClass:"masterclasses-view__header-top"},[s("h1",{staticClass:"masterclasses-view__section-hl masterclasses-view__header-hl"},[e._v("\n                    "+e._s(e.$t("masterclasses.title"))+"\n                ")]),e._v(" "),s("div",{staticClass:"masterclasses-view__header-top-controls"},[s("v-select",{staticClass:"masterclasses-view__header-select",attrs:{options:[]}}),e._v(" "),s("v-select",{staticClass:"masterclasses-view__header-select",attrs:{options:[]}})],1)]),e._v(" "),s("div",{staticClass:"masterclasses-view__header-bottom"},[s("radio-switch",{staticClass:"masterclasses-view__header-switch",attrs:{name:"status",id:"status",items:e.masterclassStatus},model:{value:e.selectedStatus,callback:function(t){e.selectedStatus=t},expression:"selectedStatus"}}),e._v(" "),s("select-panel",{staticClass:"masterclasses-view__header-panel",attrs:{name:"topic",id:"topic",items:e.topics}})],1)]),e._v(" "),s("div",{staticClass:"container masterclasses-view__sets-container"},[s("ul",{staticClass:"masterclasses-view__sets-list"},e._l(e.masterclasses,(function(t){return s("master-class-card",e._b({key:t.id,staticClass:"masterclasses-view__sets-list-item",attrs:{to:e.generateMasterclassUrl(t.code),"is-small":""}},"master-class-card",t,!1))})),1),e._v(" "),e.pagesCount>1?s("div",{staticClass:"masterclasses-view__sets-controls"},[e.activePage<e.pagesCount?s("show-more-button",{attrs:{"btn-class":"btn--outline masterclasses-view__sets-controls-btn","show-preloader":e.showMore},on:{click:e.onShowMore}},[e._v("\n                    Показать ещё\n                ")]):e._e(),e._v(" "),s("v-pagination",{attrs:{value:e.activePage,"page-count":e.pagesCount},on:{input:e.onPageChanged}})],1):e._e()])]),e._v(" "),s("section",{staticClass:"section masterclasses-view__section masterclasses-view__seo"},[s("div",{staticClass:"container masterclasses-view__seo-container"},[s("h2",{staticClass:"masterclasses-view__section-hl masterclasses-view__seo-hl"},[e._v("Блок SEO текста")]),e._v(" "),s("v-expander",{staticClass:"masterclasses-view__seo-text",attrs:{"min-height":80,"has-mask":""},scopedSlots:e._u([{key:"btn",fn:function(t){var s=t.isExpanded;return[e._v("\n                    "+e._s(s?"Скрыть":"Показать больше")+"\n                ")]}}])},[e._v("\n                Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,\n                который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта\n                помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в\n                этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?\n                Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки\n                на популярные товары самых разных категорий.\n\n                ")])],1)])])}),[],!1,null,null,null);t.default=V.exports},hNIU:function(e,t,s){},whRQ:function(e,t,s){}}]);