(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{HYl0:function(t,e,s){"use strict";s.r(e);var a,i=s("9c6q"),n=s("NDiG"),r=s("7cXU"),c=s("i2Ud"),l=s("kO0/"),o=s("YSwA"),_=s("jYNS"),m=s("cpWO"),v=s("YNzt"),d=s("3C5o"),u=(s("r/W5"),{name:"ticket-card",components:{VButton:c.a,VCounter:d.a,Price:v.a},data:function(){return{count:1}},props:{name:{type:String,required:!0},description:{type:String},min:{type:Number,default:1},max:{type:Number,default:1},price:{type:Object},disabled:{type:Boolean,default:!1}},computed:{computedPriceValue:function(){return this.count*this.price.value}},methods:{onBtnClick:function(){this.$emit("btnClick",this.count)}}}),p=s("KHd+"),b=Object(p.a)(u,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"ticket-card"},[s("div",{staticClass:"ticket-card__info"},[s("div",{staticClass:"text-medium ticket-card__name"},[t._v(t._s(t.name))]),t._v(" "),s("div",{staticClass:"text-grey text-sm ticket-card__desc"},[t._v(t._s(t.description))])]),t._v(" "),s("div",{staticClass:"ticket-card__body"},[s("div",{staticClass:"ticket-card__remain"},[t._v("Осталось "+t._s(t.max)+" мест")]),t._v(" "),s("div",{staticClass:"ticket-card__count"},[s("v-counter",{attrs:{min:"1",max:t.max,disabled:t.disabled},model:{value:t.count,callback:function(e){t.count=e},expression:"count"}})],1),t._v(" "),s("price",{staticClass:"text-bold ticket-card__price",attrs:{value:t.computedPriceValue,currency:t.price.currency}}),t._v(" "),s("v-button",{staticClass:"ticket-card__btn",on:{click:t.onBtnClick}},[t._t("default",[t._v("Добавить")])],2)],1)])}),[],!1,null,null,null).exports,C=(s("M2hw"),{name:"banner-card",components:{VButton:c.a,VPicture:_.a},props:{firstName:{type:String,default:""},lastName:{type:String,default:""},profile:{type:String},nickName:{type:String},image:{type:[Object,String]}},computed:{iconText:function(){return"".concat(this.firstName?this.firstName.slice(0,1):"").concat(this.lastName?this.lastName.slice(0,1):"")}}}),h=Object(p.a)(C,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"author-card"},[s("div",{staticClass:"author-card__img"},[t.image?s("v-picture",{attrs:{image:t.image}}):s("div",{staticClass:"text-medium author-card__img-empty"},[t._v(t._s(t.iconText))])],1),t._v(" "),s("div",{staticClass:"author-card__title"},[s("span",{staticClass:"text-bold"},[t.firstName?s("span",[t._v(t._s(t.firstName)+" ")]):t._e(),t._v(" "),t.lastName?s("span",[t._v(t._s(t.lastName))]):t._e()]),t._v(" "),s("br"),t._v(" "),s("span",{staticClass:"text-grey"},[t.profile?s("span",[t._v(t._s(t.profile)+" ")]):t._e(),t._v(" "),t.nickName?s("span",[t._v(t._s(t.nickName))]):t._e()])])])}),[],!1,null,null,null).exports,f=s("ENRa"),g=s("eOVz"),w=s("jVOK"),T=s("Z14j"),y=s("obii"),S=s("zfPd"),k=s("3eXy"),E=s("L2JU"),A=s("Q2AE"),O=s("48TQ"),x=s("Nlzp");function j(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var M,P=(j(a={},"SET_MASTERCLASS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.masterClassCode=e.code,t.masterClass=e})),j(a,"SET_FEATURED",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.featured=e})),j(a,"SET_INSTAGRAM_ITEMS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.instagramItems=e})),a);function R(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var N=(R(M={},"FETCH_FEATURED",(function(t,e){var s=t.commit;return Object(x.V)(e).then((function(t){return s("SET_FEATURED",t)})).catch((function(t){Object(O.b)("FETCH_FEATURED",!0)(t)}))})),R(M,"FETCH_MASTERCLASS",(function(t,e){var s=t.commit;return Object(x.U)(e).then((function(t){return s("SET_MASTERCLASS",t)})).catch((function(t){Object(O.b)("FETCH_MASTERCLASS",!0)(t)}))})),R(M,"FETCH_INSTAGRAM_ITEMS",(function(t,e){var s=t.commit;return Object(x.T)(e).then((function(t){return s("SET_INSTAGRAM_ITEMS",t.slice(0,4))})).catch((function(t){Object(O.b)("FETCH_INSTAGRAM_ITEMS",!0)(t)}))})),R(M,"FETCH_MASTERCLASS_DATA",(function(t,e){var s=t.dispatch;t.commit;return Promise.all([s("FETCH_MASTERCLASS",e),s("FETCH_INSTAGRAM_ITEMS",e),s("FETCH_FEATURED",e)])})),M),B={};function I(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var V="masterclass";function H(){var t;return{name:V,namespaced:!0,state:(t={},I(t,"masterClassCode",""),I(t,"masterClass",{}),I(t,"featuredMasterClasses",{items:[],range:0}),I(t,"instagramItems",[]),t),actions:N,mutations:P,getters:B}}var L=s("8TZ/"),$=s("0CxO"),F=s("SqwP"),U=s("55Sm"),D=s("jDKC"),G=s("sEfC"),q=s.n(G),Y=s("aXGN"),z=s("W6hq"),K=s("GyY8"),J=s("2JJK"),W=s("fhPv"),X=(s("L52N"),s("2+mq"),s("XdnV"),s("8ZME"),s("8Hfb"),s("ZTSR"),s("NWTo"),s("nhva"),s("CxEY"),s("PnIt"),s("iHux"),s("Ffxs")),Z=(s("ijK7"),s("tH0B")),Q=s("SRo2");s("AYSG"),s("QudU");function tt(t,e,s,a,i,n,r){try{var c=t[n](r),l=c.value}catch(t){return void s(t)}c.done?e(l):Promise.resolve(l).then(a,i)}function et(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function st(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?et(Object(s),!0).forEach((function(e){at(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):et(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function at(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var it={spaceBetween:24,slidesOffsetBefore:24,slidesOffsetAfter:24,slidesPerView:2.5,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:at({},J.breakpoints.tablet-1,{slidesPerView:1.2,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16})},nt={name:"master-class",components:{yandexMap:i.a,ymapMarker:i.b,VSvg:n.a,VButton:c.a,VLink:r.a,VHtml:l.a,VSlider:o.a,VPicture:_.a,VExpander:m.a,Breadcrumbs:y.a,BreadcrumbItem:S.a,Price:v.a,TicketCard:b,BannerCard:f.a,AuthorCard:h,InstagramCard:g.a,MasterClassBannerCard:w.a,AttentionPanel:T.a},data:function(){return{showMap:!1,isPanelVisible:!1,markerIcon:{layout:"default#image",imageHref:X.a,imageSize:[24,24],imageOffset:[0,0]},masterclassBanners:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",author:"Владимир Перельман",image:Z.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",author:"Владимир Перельман",image:Q.a,code:"code2",price:{value:6e3,currency:"RUB"}}],inCart:[]}},computed:st({},Object(E.d)([A.h]),{},Object(E.d)("route",{code:function(t){return t.params.code}}),{},Object(E.d)(V,["masterClass","featuredMasterClasses","instagramItems"]),{},Object(E.d)(F.a,[F.b]),{},Object(E.d)(U.b,{}),{rootUrl:function(){return Object(z.d)(W.d.MASTERCLASSES)},rootTitle:function(){return this.$t("productGroups.title.".concat(W.d.MASTERCLASSES))},mapSettings:function(){return st({},K.c)},sliderOptions:function(){return it},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),methods:st({},Object(E.b)(V,["FETCH_MASTERCLASS_DATA"]),{},Object(E.b)(L.c,[$.a]),{},Object(E.b)(U.b,[D.a]),{generateSourcePath:function(t,e,s,a){return Object(Y.c)(t,e,s,a)},generateMasterclassUrl:function(t){return Object(z.d)(W.d.MASTERCLASSES,t)},onAddToCart:function(t,e){this.inCart.some((function(e){return e.id===t}))||this.inCart.push({id:t,count:e})},isInCart:function(t){return this.inCart.some((function(e){return e.id===t}))},onPanelVisibilityChanged:function(t){this.isPanelVisible=!t},onBuyBtnClick:function(){var t=this.$refs.panel;window.scrollTo({top:t.offsetTop-24,behavior:"smooth"})},onShowMap:function(){var t=this.$refs.map;window.scrollTo({top:t.offsetTop-24,behavior:"smooth"})}}),beforeRouteEnter:function(t,e,s){var a=t.params.code;Object(O.a)(k.$store,V,H),k.$store.state[V].masterClassCode===a?s():(k.$progress.start(),k.$store.dispatch("".concat(V,"/").concat("FETCH_MASTERCLASS_DATA"),{code:a}).then((function(){return s((function(t){return k.$progress.finish()}))})).catch((function(t){k.$progress.fail(),s()})))},beforeRouteUpdate:function(t,e,s){this.selectedCity.fias_id;var a=t.params.code;this.debounce_fetchProduct(a),s()},beforeMount:function(){var t=this;this.debounce_fetchProduct=q()(function(){var e,s=(e=regeneratorRuntime.mark((function e(s){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.masterClassCode===s){e.next=7;break}return t.$progress.start(),e.next=6,t.FETCH_MASTERCLASS_DATA({code:s});case 6:t.$progress.finish();case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),t.$progress.fail(),t.$progress.finish();case 13:case"end":return e.stop()}}),e,null,[[0,9]])})),function(){var t=this,s=arguments;return new Promise((function(a,i){var n=e.apply(t,s);function r(t){tt(n,a,i,r,c,"next",t)}function c(t){tt(n,a,i,r,c,"throw",t)}r(void 0)}))});return function(t){return s.apply(this,arguments)}}(),500)},mounted:function(){var t=this;setTimeout((function(){return t.showMap=!0}),300)}},rt=Object(p.a)(nt,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"section master-class-view"},[s("div",{staticClass:"container master-class-view__header"},[s("breadcrumbs",{staticClass:"container container--tablet-lg master-class-view__breadcrumbs"},[s("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t._v("\n                Главная\n            ")]),t._v(" "),s("breadcrumb-item",{key:"root",attrs:{to:t.rootUrl}},[t._v("\n                "+t._s(t.rootTitle)+"\n            ")]),t._v(" "),s("breadcrumb-item",{key:t.masterClass.code,attrs:{to:{path:t.$route.path}}},[t._v("\n                "+t._s(t.masterClass.name)+"\n            ")])],1),t._v(" "),s("master-class-banner-card",{staticClass:"master-class-view__banner",attrs:{image:t.masterClass.image,name:t.masterClass.name,price:t.masterClass.price,"btn-text":"Купить билет","show-btn":""},on:{btnClick:t.onBuyBtnClick}})],1),t._v(" "),s("section",{staticClass:"section master-class-view__section master-class-view__panel"},[s("div",{staticClass:"container master-class-view__panel-container"},[s("div",{staticClass:"master-class-view__panel-body"},[s("div",{staticClass:"container container--tablet master-class-view__panel-left"},[s("attention-panel",[s("span",[s("strong",[t._v("Внимание!")]),t._v(" Событие проходит в другом городе"),s("br"),t._v("\n                            (г. Москва)\n                        ")])])],1),t._v(" "),s("div",{staticClass:"master-class-view__panel-middle"},[s("p",{staticClass:"container container--tablet text-bold master-class-view__section-hl"},[t._v("\n                        Описание\n                    ")]),t._v(" "),s("v-html",{staticClass:"container container--tablet",domProps:{innerHTML:t._s(t.masterClass.topText)}}),t._v(" "),s("img",{attrs:{src:t.masterClass.detailImage}}),t._v(" "),s("v-html",{staticClass:"container container--tablet",domProps:{innerHTML:t._s(t.masterClass.bottomText)}})],1),t._v(" "),s("div",{staticClass:"master-class-view__panel-right"},[s("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[s("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Спикеры\n                        ")]),t._v(" "),s("v-expander",{attrs:{"min-height":160},scopedSlots:t._u([{key:"btn",fn:function(e){var s=e.isExpanded;return[t._v("\n                                "+t._s(s?"Скрыть":"Все спикеры")+"\n                            ")]}}])},[t._v(" "),s("ul",t._l(t.masterClass.authors,(function(e){return s("author-card",t._b({key:e.id,staticClass:"master-class-view__panel-right-card"},"author-card",e,!1))})),1)])],1),t._v(" "),s("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[s("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Дата и время\n                        ")]),t._v(" "),s("p",[t._v(t._s(t.masterClass.date))]),t._v(" "),t._m(0)]),t._v(" "),s("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[s("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Место проведения\n                        ")]),t._v(" "),s("p",[t._v(t._s(t.masterClass.address.full))]),t._v(" "),s("p",[s("a",{on:{click:t.onShowMap}},[t._v("Посмотреть на карте")])])]),t._v(" "),t.isTablet?t._e():s("div",{staticClass:"container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"},[s("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Поделиться\n                        ")]),t._v(" "),s("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"ok-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"twitter-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"telegram-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"link",width:"24",height:"24"}})],1)])])])]),t._v(" "),t.masterClass.gallery||t.masterClass.gallery.length>0?s("section",{staticClass:"section master-class-view__section master-class-view__gallery"},[t.isTablet?s("v-slider",{staticClass:"master-class-view__gallery-slider",attrs:{name:"masterclass-gallery-slider",options:t.sliderOptions}},t._l(t.masterClass.gallery,(function(t){return s("div",{key:t,staticClass:"swiper-slide master-class-view__gallery-item"},[s("v-picture",{attrs:{image:t}})],1)})),0):s("div",{staticClass:"container"},[s("ul",{staticClass:"master-class-view__gallery-list"},t._l(t.masterClass.gallery,(function(t){return s("li",{key:t,staticClass:"master-class-view__gallery-item"},[s("v-picture",{attrs:{image:t}})],1)})),0)])],1):t._e(),t._v(" "),s("section",{staticClass:"section master-class-view__section master-class-view__panel"},[s("div",{staticClass:"container master-class-view__panel-container"},[s("div",{staticClass:"master-class-view__panel-body"},[s("div",{staticClass:"container container--tablet master-class-view__panel-left"}),t._v(" "),s("div",{staticClass:"master-class-view__panel-middle"},[s("p",{staticClass:"container container--tablet text-bold master-class-view__section-hl"},[t._v("\n                        Программа\n                    ")]),t._v(" "),s("v-html",{staticClass:"container container--tablet",domProps:{innerHTML:t._s(t.masterClass.program)}})],1),t._v(" "),s("div",{staticClass:"master-class-view__panel-right"},[s("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[s("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Что взять с собой\n                        ")]),t._v(" "),s("v-html",{domProps:{innerHTML:t._s(t.masterClass.requirements)}})],1),t._v(" "),t.isTablet?s("div",{staticClass:"container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"},[s("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Поделиться\n                        ")]),t._v(" "),s("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"ok-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"twitter-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"telegram-bw",width:"24",height:"24"}}),t._v(" "),s("v-svg",{attrs:{name:"link",width:"24",height:"24"}})],1):t._e()])])])]),t._v(" "),s("section",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:t.onPanelVisibilityChanged,expression:"onPanelVisibilityChanged"}],ref:"panel",staticClass:"section master-class-view__section master-class-view__tickets"},[s("div",{staticClass:"container master-class-view__tickets-container"},[s("h2",{staticClass:"container container--tablet master-class-view__section-hl"},[t._v("\n                Билеты на мастер-класс\n            ")]),t._v(" "),s("ul",{staticClass:"master-class-view__tickets-list"},t._l(t.masterClass.tickets,(function(e){return s("ticket-card",{key:e.id,staticClass:"master-class-view__tickets-item",attrs:{name:e.name,description:e.description,max:e.remain,price:e.price,disabled:t.isInCart(e.id)},on:{btnClick:function(s){return t.onAddToCart(e.id,s)}}},[t.isTablet?[t._v("\n                        "+t._s(t.isInCart(e.id)?"В корзину":"Добавить")+"\n                    ")]:[t._v("\n                        "+t._s(t.isInCart(e.id)?"Перейти в корзину":"Добавить в корзину")+"\n                    ")]],2)})),1)])]),t._v(" "),s("section",{ref:"map",staticClass:"section master-class-view__section master-class-view__map"},[s("div",{staticClass:"container master-class-view__map-container"},[s("h2",{staticClass:"container container--tablet master-class-view__section-hl"},[t._v("\n                Место проведения\n            ")]),t._v(" "),s("p",{staticClass:"container container--tablet master-class-view__map-desc"},[t._v("\n                "+t._s(t.masterClass.address.full)+"\n            ")]),t._v(" "),t.showMap?s("yandex-map",{attrs:{coords:t.masterClass.address.coords,controls:[],options:{yandexMapDisablePoiInteractivity:!0},settings:t.mapSettings}},[s("ymap-marker",{key:"masterclass-point-"+t.masterClass.address.id,attrs:{"marker-id":"masterclass-point-"+t.masterClass.address.id,coords:t.masterClass.address.coords,icon:t.markerIcon}})],1):t._e()],1)]),t._v(" "),t.masterClass.contacts?s("section",{staticClass:"section master-class-view__section master-class-view__contacts"},[s("div",{staticClass:"container master-class-view__contacts-container"},[s("h2",{staticClass:"container container--tablet master-class-view__section-hl"},[t._v("\n                Контакты организатора\n            ")]),t._v(" "),s("div",{staticClass:"master-class-view__contacts-panel"},[s("p",{staticClass:"master-class-view__contacts-panel-hl"},[t._v("\n                    По всем вопросам и предложениям обращаться к организатору\n                ")]),t._v(" "),s("p",{staticClass:"text-bold master-class-view__contacts-panel-name"},[t._v("\n                    "+t._s(t.masterClass.contacts.name)+"\n                ")]),t._v(" "),s("p",{staticClass:"text-grey master-class-view__contacts-panel-desc"},[t._v("\n                    "+t._s(t.masterClass.contacts.description)+"\n                ")]),t._v(" "),s("div",{staticClass:"master-class-view__contacts-panel-bottom"},[s("div",{staticClass:"master-class-view__contacts-panel-phone"},[t._v("\n                        Телефон: "+t._s(t.masterClass.contacts.phone)+"\n                    ")]),t._v(" "),s("div",{staticClass:"master-class-view__contacts-panel-email"},[t._v("\n                        Email: "+t._s(t.masterClass.contacts.email)+"\n                    ")]),t._v(" "),s("v-button",{staticClass:"master-class-view__contacts-panel-btn"},[t._v("\n                        Написать\n                    ")])],1)])])]):t._e(),t._v(" "),t.masterclassBanners&&t.masterclassBanners.length>0?s("section",{staticClass:"section master-class-view__masterclass"},[s("div",{staticClass:"container master-class-view__masterclass-container"},[s("h2",{staticClass:"master-class-view__section-hl master-class-view__masterclass-hl"},[t._v("\n                Похожие мастер-классы\n            ")]),t._v(" "),s("ul",{staticClass:"master-class-view__masterclass-list"},t._l(t.masterclassBanners,(function(e){return s("master-class-banner-card",{key:e.id,staticClass:"master-class-view__masterclass-item",attrs:{name:e.name,image:e.image,price:e.price,author:e.author,description:e.date,to:t.generateMasterclassUrl(e.code)}})})),1),t._v(" "),s("v-button",{staticClass:"btn--outline master-class-view__section-link master-class-view__masterclass-link"},[t._v("\n                "+t._s(t.$t("product.showAll"))+"\n            ")])],1)]):t._e(),t._v(" "),s("section",{staticClass:"section master-class-view__section master-class-view__instagram"},[s("div",{staticClass:"container master-class-view__instagram-container"},[s("h2",{staticClass:"master-class-view__section-hl master-class-view__instagram-hl"},[t._v("\n                INSTABEAUTY Владимира Соколова\n            ")]),t._v(" "),t.isTabletLg?s("v-slider",{staticClass:"master-class-view__instagram-slider",attrs:{name:"instagram",options:t.sliderOptions}},t._l(t.instagramItems,(function(t){return s("instagram-card",{key:t.id,staticClass:"swiper-slide master-class-view__instagram-card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1):t._e(),t._v(" "),t.isTabletLg?t._e():s("div",{staticClass:"master-class-view__instagram-grid master-class-view__instagram-grid--initialized"},t._l(t.instagramItems,(function(t){return s("instagram-card",{key:t.id,staticClass:"master-class-view__instagram-card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1)],1)]),t._v(" "),s("transition",{attrs:{name:"slide-bottom",appear:""}},[t.isPanelVisible&&t.isTablet?s("div",{staticClass:"master-class-view__price-panel"},[s("div",{staticClass:"container"},[s("v-button",{staticClass:"master-class-view__price-panel-btn",on:{click:function(e){return e.preventDefault(),t.onBuyBtnClick(e)}}},[t._v("\n                    Купить билет\n                ")])],1)]):t._e()])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("a",[this._v("Задать вопрос организатору")])])}],!1,null,null,null);e.default=rt.exports},M2hw:function(t,e,s){},ijK7:function(t,e,s){},"r/W5":function(t,e,s){}}]);