(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{HYl0:function(t,e,s){"use strict";s.r(e);var a,r=s("NDiG"),n=s("7cXU"),i=s("i2Ud"),c=s("kO0/"),o=s("YSwA"),l=s("jYNS"),_=s("wo+G"),m=s("YNzt"),u=(s("M2hw"),{name:"banner-card",components:{VButton:i.a,VPicture:l.a},props:{firstName:{type:String,default:""},lastName:{type:String,default:""},profile:{type:String},nickName:{type:String},image:{type:[Object,String]}},computed:{iconText:function(){return"".concat(this.firstName?this.firstName.slice(0,1):"").concat(this.lastName?this.lastName.slice(0,1):"")}}}),v=s("KHd+"),d=Object(v.a)(u,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"author-card"},[s("div",{staticClass:"author-card__img"},[t.image?s("v-picture",{attrs:{image:t.image}}):s("div",{staticClass:"text-medium author-card__img-empty"},[t._v(t._s(t.iconText))])],1),t._v(" "),s("div",{staticClass:"author-card__title"},[s("span",{staticClass:"text-bold"},[t.firstName?s("span",[t._v(t._s(t.firstName)+" ")]):t._e(),t._v(" "),t.lastName?s("span",[t._v(t._s(t.lastName))]):t._e()]),t._v(" "),s("br"),t._v(" "),s("span",{staticClass:"text-grey"},[t.profile?s("span",[t._v(t._s(t.profile)+" ")]):t._e(),t._v(" "),t.nickName?s("span",[t._v(t._s(t.nickName))]):t._e()])])])}),[],!1,null,null,null).exports,p=s("ENRa"),f=s("eOVz"),b=s("jVOK"),g=s("Z14j"),h=s("obii"),C=s("zfPd"),w=s("BZIu"),E=s("L2JU"),S=s("Q2AE"),T=s("48TQ"),A=s("Nlzp");function O(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var y,j=(O(a={},"SET_MASTERCLASS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.masterClassCode=e.code,t.masterClass=e})),O(a,"SET_FEATURED",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.featured=e})),O(a,"SET_INSTAGRAM_ITEMS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.instagramItems=e})),a);function P(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var M,R=(P(y={},"FETCH_FEATURED",(function(t,e){var s=t.commit;return Object(A.v)(e).then((function(t){return s("SET_FEATURED",t)})).catch((function(t){Object(T.b)("FETCH_FEATURED",!0)(t)}))})),P(y,"FETCH_MASTERCLASS",(function(t,e){var s=t.commit;return Object(A.u)(e).then((function(t){return s("SET_MASTERCLASS",t)})).catch((function(t){Object(T.b)("FETCH_MASTERCLASS",!0)(t)}))})),P(y,"FETCH_INSTAGRAM_ITEMS",(function(t,e){var s=t.commit;return Object(A.t)(e).then((function(t){return s("SET_INSTAGRAM_ITEMS",t.slice(0,4))})).catch((function(t){Object(T.b)("FETCH_INSTAGRAM_ITEMS",!0)(t)}))})),P(y,"FETCH_MASTERCLASS_DATA",(function(t,e){var s=t.dispatch;t.commit;return Promise.all([s("FETCH_MASTERCLASS",e),s("FETCH_INSTAGRAM_ITEMS",e),s("FETCH_FEATURED",e)])})),y);function k(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var x,N="masterclass",L={name:N,namespaced:!0,state:(M={},k(M,"masterClassCode",""),k(M,"masterClass",{}),k(M,"featuredMasterClasses",{items:[],range:0}),k(M,"instagramItems",[]),M),actions:R,mutations:j,getters:{}},B=s("8TZ/"),I=s("0CxO"),V=s("SqwP"),$=s("55Sm"),D=s("jDKC"),H=s("sEfC"),U=s.n(H),F=s("OvCi"),G=s("W6hq"),Y=s("oxRU"),q=s("gRYR"),K=(s("L52N"),s("2+mq"),s("hLqd"),s("NWTo"),s("nhva"),s("CxEY"),s("PnIt"),s("iHux"),s("ijK7"),s("tH0B")),z=s("SRo2");s("AYSG"),s("QudU");function Q(t,e,s,a,r,n,i){try{var c=t[n](i),o=c.value}catch(t){return void s(t)}c.done?e(o):Promise.resolve(o).then(a,r)}function J(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function W(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?J(Object(s),!0).forEach((function(e){Z(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):J(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function Z(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var X={spaceBetween:8,slidesPerView:1.5,slidesOffsetBefore:24,slidesOffsetAfter:24,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:Z({},Y.breakpoints.tablet-1,{slidesPerView:1,spaceBetween:0,slidesOffsetBefore:0,slidesOffsetAfter:0,pagination:{el:".swiper-pagination",type:"bullets"}})},tt={spaceBetween:24,slidesPerView:4,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:(x={},Z(x,Y.breakpoints.tabletLg-1,{slidesPerView:3.5,slidesOffsetBefore:24,slidesOffsetAfter:24}),Z(x,Y.breakpoints.tablet-1,{slidesPerView:2,spaceBetween:12,slidesOffsetBefore:0,slidesOffsetAfter:0}),x)},et={spaceBetween:24,slidesOffsetBefore:24,slidesOffsetAfter:24,slidesPerView:3.5,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:Z({},Y.breakpoints.tablet-1,{slidesPerView:1.5,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16})},st={name:"master-class",components:{VSvg:r.a,VButton:i.a,VLink:n.a,VHtml:c.a,VSlider:o.a,VPicture:l.a,VExpander:_.a,Breadcrumbs:h.a,BreadcrumbItem:C.a,Price:m.a,BannerCard:p.a,AuthorCard:d,InstagramCard:f.a,MasterClassBannerCard:b.a,AttentionPanel:g.a},data:function(){return{isPriceVisible:!0,mockImg:q.a,masterclassBanners:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",author:"Владимир Перельман",image:K.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",author:"Владимир Перельман",image:z.a,code:"code2",price:{value:6e3,currency:"RUB"}}]}},computed:W({},Object(E.d)([S.j]),{},Object(E.d)("route",{code:function(t){return t.params.code}}),{},Object(E.d)(N,["masterClass","featuredMasterClasses","instagramItems"]),{},Object(E.d)(V.a,[V.b]),{},Object(E.d)($.b,{}),{rootUrl:function(){return Object(G.c)(Y.productGroupTypes.MASTERCLASSES)},rootTitle:function(){return this.$t("productGroups.title.".concat(Y.productGroupTypes.MASTERCLASSES))},productGalleryOptions:function(){return X},sliderOptions:function(){return tt},instagramOptions:function(){return et},pricePanelAnimation:function(){return this.isTablet?"slide-bottom":"slide-top"},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:Z({},V.b,(function(t){})),methods:W({},Object(E.b)(N,["FETCH_MASTERCLASS_DATA"]),{},Object(E.b)(B.c,[I.a]),{},Object(E.b)($.b,[D.a]),{generateSourcePath:function(t,e,s,a){return Object(F.a)(t,e,s,a)},generateMasterclassUrl:function(t){return Object(G.c)(Y.productGroupTypes.MASTERCLASSES,t)},onPreview:function(t){this[D.a]({name:QUICK_VIEW_MODAL_NAME,open:!0,state:{code:t}})},onShowGallery:function(){this[D.a]({name:GALLERY_MODAL_NAME,open:!0})},onAddToCart:function(t){this[D.a]({name:ADD_TO_CART_MODAL_NAME,open:!0,state:{offerId:t.id,type:t.type}})},onPriceVisibilityChanged:function(t){this.isPriceVisible=t}}),beforeRouteEnter:function(t,e,s){var a=t.params.code;Object(T.a)(w.$store,N,L),w.$store.state[N].masterClassCode===a?s():(w.$progress.start(),w.$store.dispatch("".concat(N,"/").concat("FETCH_MASTERCLASS_DATA"),{code:a}).then((function(){return s((function(t){return w.$progress.finish()}))})).catch((function(t){w.$progress.fail(),s()})))},beforeRouteUpdate:function(t,e,s){this.selectedCity.fias_id;var a=t.params.code;this.debounce_fetchProduct(a),s()},beforeMount:function(){var t=this;this.debounce_fetchProduct=U()(function(){var e,s=(e=regeneratorRuntime.mark((function e(s){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.masterClassCode===s){e.next=7;break}return t.$progress.start(),e.next=6,t.FETCH_MASTERCLASS_DATA({code:s});case 6:t.$progress.finish();case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),t.$progress.fail(),t.$progress.finish();case 13:case"end":return e.stop()}}),e,null,[[0,9]])})),function(){var t=this,s=arguments;return new Promise((function(a,r){var n=e.apply(t,s);function i(t){Q(n,a,r,i,c,"next",t)}function c(t){Q(n,a,r,i,c,"throw",t)}i(void 0)}))});return function(t){return s.apply(this,arguments)}}(),500)}},at=Object(v.a)(st,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"section master-class-view"},[s("div",{staticClass:"container master-class-view__header"},[s("breadcrumbs",{staticClass:"container container--tablet-lg master-class-view__breadcrumbs"},[s("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t._v("\n                Главная\n            ")]),t._v(" "),s("breadcrumb-item",{key:"root",attrs:{to:t.rootUrl}},[t._v("\n                "+t._s(t.rootTitle)+"\n            ")]),t._v(" "),s("breadcrumb-item",{key:t.masterClass.code,attrs:{to:{path:t.$route.path}}},[t._v("\n                "+t._s(t.masterClass.name)+"\n            ")])],1),t._v(" "),s("master-class-banner-card",{staticClass:"master-class-view__banner",attrs:{image:t.masterClass.image,name:t.masterClass.name,price:t.masterClass.price,"btn-text":"Купить билет","show-btn":""}})],1),t._v(" "),s("section",{staticClass:"section master-class-view__section master-class-view__panel"},[s("div",{staticClass:"container master-class-view__panel-container"},[s("div",{staticClass:"master-class-view__panel-body"},[s("div",{staticClass:"container container--tablet master-class-view__panel-left"},[s("attention-panel",[s("span",[s("strong",[t._v("Внимание!")]),t._v(" Событие проходит в другом городе"),s("br"),t._v("\n                            (г. Москва)\n                        ")])])],1),t._v(" "),s("div",{staticClass:"master-class-view__panel-middle"},[s("p",{staticClass:"container container--tablet text-bold master-class-view__section-hl"},[t._v("\n                        Описание\n                    ")]),t._v(" "),s("v-html",{staticClass:"container container--tablet",domProps:{innerHTML:t._s(t.masterClass.topText)}}),t._v(" "),s("img",{attrs:{src:t.masterClass.detailImage}}),t._v(" "),s("v-html",{staticClass:"container container--tablet",domProps:{innerHTML:t._s(t.masterClass.bottomText)}})],1),t._v(" "),s("div",{staticClass:"container container--tablet master-class-view__panel-right"},[s("div",{staticClass:"master-class-view__panel-right-section"},[s("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Спикеры\n                        ")]),t._v(" "),s("v-expander",{attrs:{"min-height":160},scopedSlots:t._u([{key:"btn",fn:function(e){var s=e.isExpanded;return[t._v("\n                                "+t._s(s?"Скрыть":"Все спикеры")+"\n                            ")]}}])},[t._v(" "),s("ul",t._l(t.masterClass.authors,(function(e){return s("author-card",t._b({key:e.id,staticClass:"master-class-view__panel-right-card"},"author-card",e,!1))})),1)])],1),t._v(" "),s("div",{staticClass:"master-class-view__panel-right-section"},[s("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Дата и время\n                        ")]),t._v(" "),s("p",[t._v(t._s(t.masterClass.date))]),t._v(" "),t._m(0)]),t._v(" "),s("div",{staticClass:"master-class-view__panel-right-section"},[s("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Место проведения\n                        ")]),t._v(" "),s("p",[t._v(t._s(t.masterClass.address))]),t._v(" "),t._m(1)]),t._v(" "),s("div",{staticClass:"master-class-view__panel-right-section"},[s("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Поделиться\n                        ")]),t._v(" "),s("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"instagram-bw",width:"24",height:"24"}})],1)])])])]),t._v(" "),t.masterclassBanners&&t.masterclassBanners.length>0?s("section",{staticClass:"section master-class-view__masterclass"},[s("div",{staticClass:"container master-class-view__masterclass-container"},[s("h2",{staticClass:"master-class-view__section-hl master-class-view__masterclass-hl"},[t._v("\n                "+t._s(t.$t("product.title.masterClasses"))+"\n            ")]),t._v(" "),s("ul",{staticClass:"master-class-view__masterclass-list"},t._l(t.masterclassBanners,(function(e){return s("master-class-banner-card",{key:e.id,staticClass:"master-class-view__masterclass-item",attrs:{name:e.name,image:e.image,price:e.price,author:e.author,description:e.date,to:t.generateMasterclassUrl(e.code)}})})),1),t._v(" "),s("v-button",{staticClass:"btn--outline master-class-view__section-link master-class-view__masterclass-link"},[t._v("\n                "+t._s(t.$t("product.showAll"))+"\n            ")])],1)]):t._e(),t._v(" "),s("section",{staticClass:"section master-class-view__section master-class-view__instagram"},[s("div",{staticClass:"container master-class-view__instagram-container"},[s("h2",{staticClass:"master-class-view__section-hl master-class-view__instagram-hl"},[t._v("\n                INSTABEAUTY Владимира Соколова\n            ")]),t._v(" "),t.isTabletLg?s("v-slider",{staticClass:"master-class-view__instagram-slider",attrs:{name:"instagram",options:t.instagramOptions}},t._l(t.instagramItems,(function(t){return s("instagram-card",{key:t.id,staticClass:"swiper-slide master-class-view__instagram-card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1):t._e(),t._v(" "),t.isTabletLg?t._e():s("div",{staticClass:"master-class-view__instagram-grid master-class-view__instagram-grid--initialized"},t._l(t.instagramItems,(function(t){return s("instagram-card",{key:t.id,staticClass:"master-class-view__instagram-card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1),t._v(" "),s("v-button",{staticClass:"btn--outline master-class-view__section-link master-class-view__instagram-link"},[t._v("\n                "+t._s(t.$t("landing.subscribe"))+"\n            ")])],1)]),t._v(" "),s("transition",{attrs:{name:t.pricePanelAnimation,appear:""}}),t._v(" "),s("transition",{attrs:{name:"fade"}})],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("a",[this._v("Задать вопрос организатору")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("a",[this._v("Задать вопрос организатору")])])}],!1,null,null,null);e.default=at.exports},M2hw:function(t,e,s){},ijK7:function(t,e,s){}}]);