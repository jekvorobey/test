(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{HYl0:function(t,e,a){"use strict";a.r(e);var s=a("9c6q"),i=a("NDiG"),r=a("7cXU"),n=a("i2Ud"),c=a("kO0/"),l=a("YSwA"),o=a("jYNS"),d=a("cpWO"),v=(a("7bnD"),a("MhNv")),m=a("iIgE"),_=a("YNzt"),u=a("3C5o"),p=(a("r/W5"),{name:"ticket-card",components:{VButton:n.a,VCounter:u.a,Price:_.a},data:function(){return{count:1}},props:{name:{type:String,required:!0},description:{type:String},min:{type:Number,default:1},max:{type:Number,default:1},price:{type:Object},oldPrice:{type:Object},disabled:{type:Boolean,default:!1}},computed:{computedPriceValue:function(){return this.count*this.price.value},computedOldPriceValue:function(){return this.count*this.oldPrice.value}},methods:{onBtnClick:function(){this.$emit("btnClick",this.count)}}}),g=a("KHd+"),b=Object(g.a)(p,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"ticket-card"},[a("div",{staticClass:"ticket-card__info"},[a("div",{staticClass:"text-medium ticket-card__name"},[t._v(t._s(t.name))]),t._v(" "),a("div",{staticClass:"text-grey text-sm ticket-card__desc"},[t._v(t._s(t.description))])]),t._v(" "),a("div",{staticClass:"ticket-card__body"},[a("div",{staticClass:"ticket-card__remain"},[t._v("Осталось "+t._s(t.max)+" мест")]),t._v(" "),a("div",{staticClass:"ticket-card__count"},[a("v-counter",{attrs:{min:"1",max:t.max,disabled:t.disabled},model:{value:t.count,callback:function(e){t.count=e},expression:"count"}})],1),t._v(" "),a("div",{staticClass:"ticket-card__prices"},[a("price",{staticClass:"text-bold ticket-card__price",attrs:{value:t.computedPriceValue,currency:t.price.currency}}),t._v(" "),t.oldPrice?a("price",{staticClass:"text-grey text-sm text-strike",attrs:{value:t.computedOldPriceValue,currency:t.price.currency}}):t._e()],1),t._v(" "),a("v-button",{staticClass:"ticket-card__btn",on:{click:t.onBtnClick}},[t._t("default",[t._v("Добавить")])],2)],1)])}),[],!1,null,null,null).exports,f=(a("LZ6J"),a("M2hw"),{name:"banner-card",components:{VSvg:i.a,VPicture:o.a},props:{firstName:{type:String,default:""},lastName:{type:String,default:""},profile:{type:String},nickName:{type:String},image:{type:[Object,String]}},data:function(){return{mounted:!1}},computed:{iconText:function(){return"".concat(this.firstName?this.firstName.slice(0,1):"").concat(this.lastName?this.lastName.slice(0,1):"")}},mounted:function(){this.mounted=!0}}),h=Object(g.a)(f,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"author-card"},[a("div",{staticClass:"author-card__img"},[t.image?a("v-picture",{attrs:{image:t.image}}):a("div",{staticClass:"text-medium author-card__img-empty"},[t._v(t._s(t.iconText))])],1),t._v(" "),a("div",{staticClass:"author-card__title"},[a("div",{staticClass:"text-bold author-card__title-name"},[t._v("\n            "+t._s(t.firstName)+"\n            "+t._s(t.lastName)+"\n            "),t.mounted?a("button",{staticClass:"author-card__title-btn"},[a("v-svg",{attrs:{name:"info-middle",width:"16",height:"16"}})],1):t._e()]),t._v(" "),a("div",{staticClass:"text-grey"},[t.profile?a("span",[t._v(t._s(t.profile)+" ")]):t._e(),t._v(" "),t.nickName?a("span",[t._v(t._s(t.nickName))]):t._e()])])])}),[],!1,null,null,null).exports,w=a("ENRa"),C=a("eOVz"),y=a("jVOK"),k=a("45Ux"),S=a("Z14j"),x=a("obii"),O=a("zfPd"),I=a("X0tV"),P=a("3eXy"),T=a("L2JU"),j=a("Q2AE"),E=a("E8Vg"),A=a("w7VP"),M=a("8TZ/"),N=a("0CxO"),V=a("SqwP"),B=a("55Sm"),R=a("jDKC"),L=a("sEfC"),$=a.n(L),z=(a("48TQ"),a("aXGN"));var D=a("W6hq"),W=a("GyY8"),H=a("2JJK"),U=a("fhPv"),q=(a("L52N"),a("2+mq"),a("XdnV"),a("8ZME"),a("8Hfb"),a("ZTSR"),a("NWTo"),a("nhva"),a("CxEY"),a("PnIt"),a("iHux"),a("+in6"),a("Ffxs")),G=(a("ijK7"),a("tH0B")),Y=a("SRo2");a("AYSG"),a("QudU");function J(t,e,a,s,i,r,n){try{var c=t[r](n),l=c.value}catch(t){return void a(t)}c.done?e(l):Promise.resolve(l).then(s,i)}function K(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function F(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?K(Object(a),!0).forEach((function(e){X(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):K(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function X(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var Z={spaceBetween:24,slidesOffsetBefore:24,slidesOffsetAfter:24,slidesPerView:2.5,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:X({},H.breakpoints.tablet-1,{slidesPerView:1.2,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16})},Q={name:"master-class",components:{yandexMap:s.a,ymapMarker:s.b,VSvg:i.a,VButton:n.a,VLink:r.a,VHtml:c.a,VSlider:l.a,VPicture:o.a,VExpander:d.a,VAccordion:v.a,Breadcrumbs:x.a,BreadcrumbItem:O.a,Price:_.a,InfoRow:k.a,AttentionPanel:S.a,ReviewsPanel:I.a,TicketCard:b,BannerCard:w.a,AuthorCard:h,InstagramCard:C.a,MasterClassBannerCard:y.a,FrisbuyProductContainer:m.a},data:function(){return{showMap:!1,isPanelVisible:!1,markerIcon:{layout:"default#image",imageHref:q.a,imageSize:[24,24],imageOffset:[0,0]},masterclassBanners:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",author:"Владимир Перельман",image:G.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",author:"Владимир Перельман",image:Y.a,code:"code2",price:{value:6e3,currency:"RUB"}}],inCart:[]}},computed:F(F(F(F(F(F({},Object(T.d)([j.i,j.g])),Object(T.d)("route",{code:function(t){return t.params.code}})),Object(T.d)(E.NAME,[E.MASTERCLASS,E.FEATURED_MASTERCLASSES,E.INSTAGRAM_ITEMS])),Object(T.d)(V.a,[V.b])),Object(T.d)(B.b,{})),{},{frisbuyScript:function(){var t=(this[E.MASTERCLASS]||{}).speakers,e=(void 0===t?[]:t).find((function(t){return!!t.instagram}));return e&&"https://www.frisbuy.ru/fb/widget?embed_id=aebd8bf5-9f42-11ea-ba01-0242ac150002&author=".concat(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t.split("/").slice(-1)}(e.instagram))},mapCoords:function(){var t=this.places;return t.length>1?[0,0]:t[0]&&t[0].coords||null},price:function(){var t=this[E.MASTERCLASS]||{},e=t.priceFrom,a=t.priceTo;return a?{value:{from:e.value,to:a.value,currency:e.currency}}:e},bannerImage:function(){var t=(this[E.MASTERCLASS]||{}).detailImage;if(t)return{desktopImg:{webp:Object(z.c)(1224,360,t.id,H.fileExtension.image.WEBP),orig:Object(z.c)(1224,360,t.id)},mobileImg:{webp:Object(z.c)(320,240,t.id,H.fileExtension.image.WEBP),orig:Object(z.c)(320,240,t.id)},defaultImg:Object(z.c)(1224,360,t.id)}},descriptionGallery:function(){var t=(this[E.MASTERCLASS]||{description:{}}).description.gallery;return(void 0===t?[]:t).map((function(t){var e={webp:Object(z.c)(600,320,t.value.id,H.fileExtension.image.WEBP),orig:Object(z.c)(600,320,t.value.id)},a=Object(z.c)(600,320,t.value.id);return F(F({},t),{},{desktopImg:e,defaultImg:a})}))},stages:function(){var t=(this[E.MASTERCLASS]||{}).stages,e=void 0===t?[]:t,a=this.speakers,s=void 0===a?[]:a;return e.map((function(t){var e=s.filter((function(e){return t.speakerIds&&t.speakerIds.includes(e.id)}));return F(F({},t),{},{stageSpeakers:e})}))},dates:function(){var t=this,e=(this[E.MASTERCLASS]||{}).stages;return(void 0===e?[]:e).map((function(e){var a=new Date(e.date),s=new Date("".concat(e.date," ").concat(e.timeFrom)),i=new Date("".concat(e.date," ").concat(e.timeTo));return"".concat(a.toLocaleDateString(t[j.g],W.b),", ").concat(s.toLocaleTimeString(t[j.g],W.d)," - ").concat(i.toLocaleTimeString(t[j.g],W.d))}))},gallery:function(){var t=(this[E.MASTERCLASS]||{}).gallery,e=void 0===t?[]:t;return e.map((function(t){var e={webp:Object(z.c)(500,500,t.value.id,H.fileExtension.image.WEBP),orig:Object(z.c)(500,500,t.value.id)},a=Object(z.c)(500,500,t.value.id);return F(F({},t),{},{desktopImg:e,defaultImg:a})}))},speakers:function(){var t=(this[E.MASTERCLASS]||{}).speakers,e=void 0===t?[]:t;return e.map((function(t){return t.avatar&&(t.avatar.defaultImg=Object(z.c)(null,null,t.avatar.id)),t}))},places:function(){var t=(this[E.MASTERCLASS]||{}).places,e=void 0===t?[]:t;return e.map((function(t){return F(F({},t),{},{coords:[Number(t.latitude),Number(t.longitude)],gallery:t.gallery.map((function(t){var e={webp:Object(z.c)(200,140,t.value.id,H.fileExtension.image.WEBP),orig:Object(z.c)(200,140,t.value.id)},a=Object(z.c)(200,140,t.value.id);return F(F({},t),{},{desktopImg:e,defaultImg:a})}))})}))},productType:function(){return U.a.MASTERCLASS},rootTitle:function(){return this.$t("masterclasses.title")},mapSettings:function(){return F({},W.h)},sliderOptions:function(){return Z},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),methods:F(F(F(F({},Object(T.b)(E.NAME,[A.b])),Object(T.b)(M.c,[N.c])),Object(T.b)(B.b,[R.a])),{},{generateSourcePath:function(t,e,a,s){return Object(z.c)(t,e,a,s)},generateMasterclassUrl:function(t){return Object(D.g)(t)},onAddToCart:function(t,e){this[N.c]({offerId:t,count:e})},isInCart:function(t){return this.inCart.some((function(e){return e.id===t}))},onPanelVisibilityChanged:function(t){this.isPanelVisible=!t},onBuyBtnClick:function(){var t=this.$refs.panel;window.scrollTo({top:t.offsetTop-24,behavior:"smooth"})},onShowMap:function(){var t=this.$refs.map;window.scrollTo({top:t.offsetTop-24,behavior:"smooth"})}}),beforeRouteEnter:function(t,e,a){var s=t.params.code;P.$store.state[E.NAME].masterClassCode===s?a():(P.$progress.start(),P.$store.dispatch("".concat(E.NAME,"/").concat(A.b),{code:s}).then((function(){return a((function(t){return P.$progress.finish()}))})).catch((function(t){P.$progress.fail(),a()})))},beforeRouteUpdate:function(t,e,a){this.selectedCity.fias_id;var s=t.params.code;this.debounce_fetchProduct(s),a()},beforeMount:function(){var t=this;this.debounce_fetchProduct=$()(function(){var e,a=(e=regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.masterClassCode===a){e.next=7;break}return t.$progress.start(),e.next=6,t[A.b]({code:a});case 6:t.$progress.finish();case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),t.$progress.fail(),t.$progress.finish();case 13:case"end":return e.stop()}}),e,null,[[0,9]])})),function(){var t=this,a=arguments;return new Promise((function(s,i){var r=e.apply(t,a);function n(t){J(r,s,i,n,c,"next",t)}function c(t){J(r,s,i,n,c,"throw",t)}n(void 0)}))});return function(t){return a.apply(this,arguments)}}(),500)},mounted:function(){var t=this;setTimeout((function(){return t.showMap=!0}),300)}},tt=Object(g.a)(Q,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section master-class-view"},[a("div",{staticClass:"container master-class-view__header"},[a("breadcrumbs",{staticClass:"container container--tablet-lg master-class-view__breadcrumbs"},[a("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t.isTablet?a("v-svg",{attrs:{name:"home",width:"10",height:"10"}}):a("span",[t._v("Главная")])],1),t._v(" "),a("breadcrumb-item",{key:"root",attrs:{to:"/masterclasses"}},[t._v("\n                "+t._s(t.rootTitle)+"\n            ")]),t._v(" "),a("breadcrumb-item",{key:t.masterClass.code,attrs:{to:{path:t.$route.path}}},[t._v("\n                "+t._s(t.masterClass.title)+"\n            ")])],1),t._v(" "),a("master-class-banner-card",{staticClass:"master-class-view__banner",attrs:{image:t.bannerImage,name:t.masterClass.title,price:t.price,"btn-text":"Купить билет","show-btn":""},on:{btnClick:t.onBuyBtnClick}},[a("source",{attrs:{"data-srcset":t.bannerImage.desktopImg.webp,type:"image/webp",media:"(min-width: 768px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.bannerImage.desktopImg.orig,media:"(min-width: 768px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.bannerImage.mobileImg.webp,type:"image/webp",media:"(min-width: 320px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.bannerImage.mobileImg.orig,media:"(min-width: 320px)"}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.bannerImage.defaultImg,alt:""}})])],1),t._v(" "),a("section",{staticClass:"section master-class-view__section master-class-view__panel"},[a("div",{staticClass:"container master-class-view__panel-container"},[a("div",{staticClass:"master-class-view__panel-body"},[a("div",{staticClass:"container container--tablet master-class-view__panel-left"}),t._v(" "),a("div",{staticClass:"master-class-view__panel-middle"},[a("p",{staticClass:"container container--tablet text-bold master-class-view__section-hl"},[t._v("\n                        Описание\n                    ")]),t._v(" "),a("v-html",{staticClass:"container container--tablet master-class-view__panel-middle-desc",domProps:{innerHTML:t._s(t.masterClass.description.content)}}),t._v(" "),t._l(t.descriptionGallery,(function(e){return a("div",{key:e.value.id},[a("v-picture",[a("source",{attrs:{"data-srcset":e.desktopImg.webp,type:"image/webp"}}),t._v(" "),a("source",{attrs:{"data-srcset":e.desktopImg.orig}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImg,alt:""}})])],1)}))],2),t._v(" "),a("div",{staticClass:"master-class-view__panel-right"},[a("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Спикеры\n                        ")]),t._v(" "),t.speakers&&t.speakers.length>2?a("v-expander",{attrs:{"min-height":160},scopedSlots:t._u([{key:"btn",fn:function(e){var a=e.isExpanded;return[t._v("\n                                "+t._s(a?"Скрыть":"Все спикеры")+"\n                            ")]}}],null,!1,1876039357)},[a("ul",t._l(t.speakers,(function(t){return a("author-card",{key:t.id,staticClass:"master-class-view__panel-right-card",attrs:{"first-name":t.firstName,"last-name":t.lastName,"nick-name":t.profession,image:t.avatar.defaultImg}})})),1)]):a("ul",t._l(t.speakers,(function(t){return a("author-card",{key:t.id,staticClass:"master-class-view__panel-right-card",attrs:{"first-name":t.firstName,"last-name":t.lastName,"nick-name":t.profession,image:t.avatar.defaultImg}})})),1)],1),t._v(" "),a("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Дата и время\n                        ")]),t._v(" "),a("ol",{staticClass:"list"},t._l(t.dates,(function(e){return a("li",{key:e},[a("span",[t._v(t._s(e))])])})),0),t._v(" "),a("a",[t._v("Задать вопрос организатору")])]),t._v(" "),a("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Место проведения\n                        ")]),t._v(" "),a("ol",{staticClass:"list"},t._l(t.places,(function(e){return a("li",{key:e.id},[a("span",[t._v(t._s(e.name)+", "+t._s(e.address))])])})),0),t._v(" "),a("a",{on:{click:t.onShowMap}},[t._v("Посмотреть на карте")])]),t._v(" "),t._m(0),t._v(" "),t.isTablet?t._e():a("div",{staticClass:"container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Поделиться\n                        ")]),t._v(" "),a("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"ok-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"twitter-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"telegram-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"link",width:"24",height:"24"}})],1)])])])]),t._v(" "),a("section",{staticClass:"section master-class-view__section"},[a("div",{staticClass:"container master-class-view__panel-container"},[a("div",{staticClass:"master-class-view__panel"},[a("div",{staticClass:"master-class-view__panel-body master-class-view__panel-body--accordion"},[a("div",{staticClass:"master-class-view__panel-left"}),t._v(" "),a("div",{staticClass:"master-class-view__panel-middle master-class-view__panel-middle--no-padding"},[a("p",{staticClass:"container container--tablet text-bold master-class-view__section-hl"},[t._v("\n                            Программа\n                        ")]),t._v(" "),a("v-accordion",{staticClass:"master-class-view__accordion",attrs:{items:t.stages,"key-field":"id"},scopedSlots:t._u([{key:"header",fn:function(e){var s=e.item,i=e.index;return[a("div",{staticClass:"master-class-view__accordion-header"},[a("div",{staticClass:"master-class-view__accordion-header-info"},[a("h4",{staticClass:"master-class-view__accordion-header-name"},[t._v("\n                                            "+t._s(s.name)+"\n                                        ")]),t._v(" "),a("div",{staticClass:"text-sm text-grey"},[t._v(t._s(t.dates[i]))])]),t._v(" "),a("ul",{staticClass:"master-class-view__accordion-header-speakers"},t._l(s.stageSpeakers,(function(t){return a("author-card",{key:t.id,staticClass:"master-class-view__panel-right-card",attrs:{"first-name":t.firstName,"last-name":t.lastName,"nick-name":t.profession,image:t.avatar.defaultImg}})})),1)])]}},{key:"content",fn:function(e){var s=e.item;return[a("div",{staticClass:"master-class-view__accordion-content"},[a("div",{staticClass:"master-class-view__panel"},[a("div",{staticClass:"container container--tablet master-class-view__panel-body master-class-view__panel-body--accordion"},[a("v-html",{staticClass:"master-class-view__panel-middle",style:{order:0},domProps:{innerHTML:t._s(s.description)}}),t._v(" "),a("div",{staticClass:"master-class-view__panel-right",style:{order:1}},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                                                    Что взять с собой\n                                                ")]),t._v(" "),a("v-html",{domProps:{innerHTML:t._s(s.raider)}})],1)],1)])])]}}])})],1)])])])]),t._v(" "),t.gallery&&t.gallery.length>0?a("section",{staticClass:"section master-class-view__section master-class-view__gallery"},[t.isTablet?a("v-slider",{staticClass:"master-class-view__gallery-slider",attrs:{name:"masterclass-gallery-slider",options:t.sliderOptions}},t._l(t.gallery,(function(e){return a("div",{key:e.value.id,staticClass:"swiper-slide master-class-view__gallery-item"},[a("v-picture",[a("source",{attrs:{"data-srcset":e.desktopImg.webp,type:"image/webp"}}),t._v(" "),a("source",{attrs:{"data-srcset":e.desktopImg.orig}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImg,alt:""}})])],1)})),0):a("div",{staticClass:"container"},[a("ul",{staticClass:"master-class-view__gallery-list"},t._l(t.gallery,(function(e){return a("li",{key:e.value.id,staticClass:"master-class-view__gallery-item"},[a("v-picture",[a("source",{attrs:{"data-srcset":e.desktopImg.webp,type:"image/webp"}}),t._v(" "),a("source",{attrs:{"data-srcset":e.desktopImg.orig}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImg,alt:""}})])],1)})),0)])],1):t._e(),t._v(" "),t.isTablet?a("div",{staticClass:"container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n            Поделиться\n        ")]),t._v(" "),a("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"ok-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"twitter-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"telegram-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"link",width:"24",height:"24"}})],1):t._e(),t._v(" "),a("section",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:t.onPanelVisibilityChanged,expression:"onPanelVisibilityChanged"}],ref:"panel",staticClass:"section master-class-view__section master-class-view__tickets"},[a("div",{staticClass:"container master-class-view__tickets-container"},[a("h2",{staticClass:"container container--tablet master-class-view__section-hl"},[t._v("\n                Билеты на мастер-класс\n            ")]),t._v(" "),a("ul",{staticClass:"master-class-view__tickets-list"},t._l(t.masterClass.ticketTypes,(function(e){return a("ticket-card",{key:e.id,staticClass:"master-class-view__tickets-item",attrs:{name:e.name,description:e.description,max:e.qty,price:e.price,"old-price":e.oldPrice,disabled:t.isInCart(e.offerId)},on:{btnClick:function(a){return t.onAddToCart(e.offerId,a)}}},[t.isTablet?[t._v("\n                        "+t._s(t.isInCart(e.id)?"В корзину":"Добавить")+"\n                    ")]:[t._v("\n                        "+t._s(t.isInCart(e.id)?"Перейти в корзину":"Добавить в корзину")+"\n                    ")]],2)})),1)])]),t._v(" "),a("section",{ref:"map",staticClass:"section master-class-view__section master-class-view__map"},[a("div",{staticClass:"container master-class-view__map-container"},[a("h2",{staticClass:"container container--tablet master-class-view__section-hl"},[t._v("\n                Место проведения\n            ")]),t._v(" "),t._l(t.places,(function(e,s){return a("div",{key:e.id,staticClass:"container container--tablet master-class-view__map-info"},[a("p",{staticClass:"master-class-view__map-desc"},[a("span",{staticClass:"text-bold"},[t._v(t._s(s+1)+". "+t._s(e.name)+", "+t._s(e.address))])]),t._v(" "),a("ul",{staticClass:"master-class-view__map-gallery"},t._l(e.gallery,(function(e){return a("li",{key:e.value.id,staticClass:"master-class-view__map-gallery-item"},[a("v-picture",[a("source",{attrs:{"data-srcset":e.desktopImg.webp,type:"image/webp"}}),t._v(" "),a("source",{attrs:{"data-srcset":e.desktopImg.orig}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImg,alt:""}})])],1)})),0)])})),t._v(" "),t.showMap&&t.mapCoords?a("yandex-map",{attrs:{coords:t.mapCoords,controls:[],options:{yandexMapDisablePoiInteractivity:!0},settings:t.mapSettings,"show-all-markers":t.places&&t.places.length>1}},t._l(t.places,(function(e){return a("ymap-marker",{key:"masterclass-point-"+e.id,attrs:{"marker-id":"masterclass-point-"+e.id,coords:e.coords,icon:t.markerIcon}})})),1):t._e()],2)]),t._v(" "),t.masterClass.organizer?a("section",{staticClass:"section master-class-view__section master-class-view__contacts"},[a("div",{staticClass:"container master-class-view__contacts-container"},[a("h2",{staticClass:"container container--tablet master-class-view__section-hl"},[t._v("\n                Контакты организатора\n            ")]),t._v(" "),a("div",{staticClass:"master-class-view__contacts-panel"},[a("p",{staticClass:"master-class-view__contacts-panel-hl"},[t._v("\n                    По всем вопросам и предложениям обращаться к организатору\n                ")]),t._v(" "),a("p",{staticClass:"text-bold master-class-view__contacts-panel-name"},[t._v("\n                    "+t._s(t.masterClass.organizer.name)+"\n                ")]),t._v(" "),a("p",{staticClass:"text-grey master-class-view__contacts-panel-desc"},[t._v("\n                    "+t._s(t.masterClass.organizer.description)+"\n                ")]),t._v(" "),a("div",{staticClass:"master-class-view__contacts-panel-bottom"},[a("info-row",{staticClass:"master-class-view__contacts-panel-row",attrs:{name:"Телефон",value:t.masterClass.organizer.phone}}),t._v(" "),a("info-row",{staticClass:"master-class-view__contacts-panel-row",attrs:{name:"Email",value:t.masterClass.organizer.email}}),t._v(" "),a("info-row",{staticClass:"master-class-view__contacts-panel-row",attrs:{name:"WhatsApp, Viber, Telegram",value:t.masterClass.organizer.phone}}),t._v(" "),a("info-row",{staticClass:"master-class-view__contacts-panel-row",attrs:{name:"Сайт",value:t.masterClass.organizer.site}}),t._v(" "),a("v-button",{staticClass:"master-class-view__contacts-panel-btn"},[t._v("\n                        Написать\n                    ")])],1)])])]):t._e(),t._v(" "),a("section",{staticClass:"section master-class-view__section master-class-view__instagram"},[a("div",{staticClass:"container master-class-view__instagram-container"},[a("frisbuy-product-container",{attrs:{script:t.frisbuyScript}})],1)]),t._v(" "),a("section",{staticClass:"section product-view__section"},[a("div",{staticClass:"container"},[a("reviews-panel",{attrs:{code:t.masterClass.code,type:t.productType,"can-add":t.masterClass.canWriteReview}})],1)]),t._v(" "),a("transition",{attrs:{name:"slide-bottom",appear:""}},[t.isPanelVisible&&t.isTablet?a("div",{staticClass:"master-class-view__price-panel"},[a("div",{staticClass:"container"},[a("v-button",{staticClass:"master-class-view__price-panel-btn",on:{click:function(e){return e.preventDefault(),t.onBuyBtnClick(e)}}},[t._v("\n                    Купить билет\n                ")])],1)]):t._e()])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[e("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[this._v("\n                            Сертификат\n                        ")]),this._v("\n                        Пример сертификата, который вы получите по окончании мастер-класса, можно посмотреть по\n                        "),e("a",[this._v("ссылке")]),this._v(".\n                    ")])}],!1,null,null,null);e.default=tt.exports},M2hw:function(t,e,a){},ijK7:function(t,e,a){},"r/W5":function(t,e,a){}}]);