(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{C600:function(t,e,a){},HYl0:function(t,e,a){"use strict";a.r(e);var s=a("9c6q"),r=a("NDiG"),i=a("7cXU"),n=a("i2Ud"),c=a("kO0/"),o=a("YSwA"),l=a("jYNS"),u=a("cpWO"),d=(a("7bnD"),a("MhNv")),m=a("iIgE"),_=a("YNzt"),v=a("dMOp"),p=a("3C5o"),f=a("XIuL"),b=(a("r/W5"),{name:"ticket-card",components:{VCounter:p.a,VSpinner:v.a,Price:_.a,BuyButton:f.a},data:function(){return{count:1}},props:{name:{type:String,required:!0},description:{type:String},min:{type:Number,default:1},max:{type:Number,default:1},price:{type:Object},oldPrice:{type:Object},showCount:{type:Boolean,default:!0},inProcess:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},computed:{computedPriceValue:function(){return this.count*this.price.value},computedOldPriceValue:function(){return this.count*this.oldPrice.value}},methods:{onBtnClick:function(){this.inProcess||this.$emit("btnClick",this.count)}}}),h=a("KHd+"),g=Object(h.a)(b,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"ticket-card"},[a("div",{staticClass:"ticket-card__info"},[a("div",{staticClass:"text-medium ticket-card__name"},[t._v(t._s(t.name))]),t._v(" "),a("div",{staticClass:"text-grey text-sm ticket-card__desc"},[t._v(t._s(t.description))])]),t._v(" "),a("div",{staticClass:"ticket-card__body"},[a("div",{staticClass:"ticket-card__remain"},[t.showCount?[t._v(" Осталось "+t._s(t.max)+" мест ")]:t._e()],2),t._v(" "),a("div",{staticClass:"ticket-card__count"},[a("v-counter",{attrs:{min:"1",max:t.max,disabled:t.disabled},model:{value:t.count,callback:function(e){t.count=e},expression:"count"}})],1),t._v(" "),a("div",{staticClass:"ticket-card__prices"},[a("price",{staticClass:"text-bold ticket-card__price",attrs:{value:t.computedPriceValue,currency:t.price.currency}}),t._v(" "),t.oldPrice?a("price",{staticClass:"text-grey text-sm text-strike",attrs:{value:t.computedOldPriceValue,currency:t.price.currency}}):t._e()],1),t._v(" "),a("buy-button",{staticClass:"ticket-card__btn",class:{"btn--transparent":t.inProcess},on:{click:t.onBtnClick}},[t.inProcess?a("v-spinner",{attrs:{width:"24",height:"24",show:""}}):t._t("default",[t._v("Добавить")])],2)],1)])}),[],!1,null,null,null).exports,C=(a("LZ6J"),a("M2hw"),{name:"author-card",components:{VSvg:r.a,VPicture:l.a},props:{firstName:{type:String,default:""},lastName:{type:String,default:""},profile:{type:String},nickName:{type:String},image:{type:[Object,String]},description:{type:String}},data:function(){return{mounted:!1}},computed:{iconText:function(){return"".concat(this.firstName?this.firstName.slice(0,1):"").concat(this.lastName?this.lastName.slice(0,1):"")}},methods:{onShow:function(){this.$emit("show")}},mounted:function(){this.mounted=!0}}),w=Object(h.a)(C,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"author-card"},[a("div",{staticClass:"author-card__img"},[t.image?a("v-picture",{attrs:{image:t.image}}):a("div",{staticClass:"text-medium author-card__img-empty"},[t._v(t._s(t.iconText))])],1),t._v(" "),a("div",{staticClass:"author-card__title"},[a("div",{staticClass:"text-bold author-card__title-name"},[t._v("\n            "+t._s(t.firstName)+"\n            "+t._s(t.lastName)+"\n            "),t.description&&t.mounted?a("button",{staticClass:"author-card__title-btn",on:{click:t.onShow}},[a("v-svg",{attrs:{name:"info-middle",width:"16",height:"16"}})],1):t._e()]),t._v(" "),a("div",{staticClass:"text-grey"},[t.profile?a("span",[t._v(t._s(t.profile)+" ")]):t._e(),t._v(" "),t.nickName?a("span",[t._v(t._s(t.nickName))]):t._e()])])])}),[],!1,null,null,null).exports,y=a("ENRa"),k=a("eOVz"),S=a("jVOK"),O=a("45Ux"),T=a("Z14j"),x=a("obii"),j=a("zfPd"),P=a("X0tV"),I=a("P4dj"),A=a("2JJK"),E=a("aXGN"),N=a("QmAe"),M=(a("kWqm"),{name:"masterclass-price-panel",components:{VSvg:r.a,VPicture:l.a,VClamp:I.a,Price:_.a,BuyButton:f.a},props:{name:{type:String},priceTo:{type:Object},priceFrom:{type:Object},disabled:{type:Boolean,default:!1}},computed:{isTablet:function(){return this.$mq.tablet},price:function(){var t=this.priceTo,e=this.priceFrom;return{value:{to:t.value,from:e.value,currency:t.currency}}}},methods:{onBuyBtnClick:function(){this.$emit("add-item")}}}),R=Object(h.a)(M,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"masterclass-price-panel"},[a("div",{staticClass:"container masterclass-price-panel__container"},[t.isTablet?t._e():[a("div",{staticClass:"text-bold masterclass-price-panel__title"},[t._v("Мастер-класс")]),t._v(" "),a("div",{staticClass:"text-medium masterclass-price-panel__name"},[a("v-clamp",{attrs:{"max-lines":2,autoresize:""}},[t._v("\n                    "+t._s(t.name)+"\n                ")])],1),t._v(" "),a("price",t._b({staticClass:"text-bold masterclass-price-panel__price"},"price",t.price,!1))],t._v(" "),a("buy-button",{staticClass:"masterclass-price-panel__btn",class:{"btn--outline":!t.isTablet},attrs:{disabled:t.disabled},on:{click:function(e){return e.preventDefault(),t.onBuyBtnClick(e)}}},[t._t("default")],2)],2)])}),[],!1,null,null,null).exports,V=a("a6oV"),B=a("L2JU"),$=a("55Sm"),L=a("jDKC");a("C600");function U(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function z(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?U(Object(a),!0).forEach((function(e){D(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):U(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function D(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var W=A.modalName.masterclass.AUTHOR,H={name:W,components:{VButton:n.a,AuthorCard:w,GeneralModal:V.a},computed:z(z({},Object(B.d)($.b,{isOpen:function(t){return t[$.a][W]&&t[$.a][W].open||!1},modalState:function(t){return t[$.a][W]&&t[$.a][W].state||{}}})),{},{header:function(){return"О спикере"},author:function(){var t=this.modalState.author;return t},isTablet:function(){return this.$mq.tablet}}),methods:z(z({},Object(B.b)($.b,[L.a])),{},{onClose:function(){this[L.a]({name:W,open:!1})}})},q=Object(h.a)(H,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.isOpen?a("general-modal",{staticClass:"author-modal",attrs:{type:"sm",header:t.header,"is-mobile":t.isTablet},on:{close:t.onClose},scopedSlots:t._u([{key:"content",fn:function(){return[a("div",{staticClass:"container container--tablet author-modal__body"},[a("h3",{staticClass:"author-modal__hl"},[t._v("\n                "+t._s(t.header)+"\n            ")]),t._v(" "),t.author?[a("author-card",{staticClass:"author-modal__card",attrs:{"first-name":t.author.firstName,"last-name":t.author.lastName,"nick-name":t.author.profession,image:t.author.avatar.defaultImg}}),t._v(" "),a("div",{staticClass:"author-modal__desc"},[t._v("\n                    "+t._s(t.author.description)+"\n                ")])]:t._e()],2),t._v(" "),a("div",{staticClass:"container container--tablet author-modal__submit"},[a("v-button",{staticClass:"author-modal__submit-btn",on:{click:function(e){return e.preventDefault(),t.onClose(e)}}},[t._v("\n                Закрыть\n            ")])],1)]},proxy:!0}],null,!1,1473430156)}):t._e()}),[],!1,null,null,null).exports,F=a("3eXy"),G=a("Q2AE"),X=a("E8Vg"),Y=a("w7VP"),J=a("8TZ/"),K=a("oXaW"),Q=a("0CxO"),Z=a("SqwP"),tt=a("sEfC"),et=a.n(tt);a("48TQ");var at=a("W6hq"),st=a("GyY8"),rt=a("fhPv"),it=(a("L52N"),a("2+mq"),a("XdnV"),a("8ZME"),a("8Hfb"),a("ZTSR"),a("NWTo"),a("nhva"),a("CxEY"),a("PnIt"),a("iHux"),a("+in6"),a("Ffxs")),nt=(a("ijK7"),a("tH0B")),ct=a("SRo2");a("AYSG"),a("QudU");function ot(t,e,a,s,r,i,n){try{var c=t[i](n),o=c.value}catch(t){return void a(t)}c.done?e(o):Promise.resolve(o).then(s,r)}function lt(t){return function(){var e=this,a=arguments;return new Promise((function(s,r){var i=t.apply(e,a);function n(t){ot(i,s,r,n,c,"next",t)}function c(t){ot(i,s,r,n,c,"throw",t)}n(void 0)}))}}function ut(t){return function(t){if(Array.isArray(t))return dt(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return dt(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return dt(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function dt(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,s=new Array(e);a<e;a++)s[a]=t[a];return s}function mt(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function _t(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?mt(Object(a),!0).forEach((function(e){vt(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):mt(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function vt(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var pt={spaceBetween:24,slidesOffsetBefore:24,slidesOffsetAfter:24,slidesPerView:2.5,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:vt({},A.breakpoints.tablet-1,{slidesPerView:1.2,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16})},ft={name:"master-class",components:{yandexMap:s.a,ymapMarker:s.b,VSvg:r.a,VButton:n.a,VLink:i.a,VHtml:c.a,VSlider:o.a,VPicture:l.a,VExpander:u.a,VAccordion:d.a,Breadcrumbs:x.a,BreadcrumbItem:j.a,Price:_.a,InfoRow:O.a,AttentionPanel:T.a,ReviewsPanel:P.a,MasterclassPricePanel:R,AuthorModal:q,TicketCard:g,BannerCard:y.a,AuthorCard:w,InstagramCard:k.a,MasterClassBannerCard:S.a,FrisbuyProductContainer:m.a},data:function(){return{showMap:!1,isPanelVisible:!1,inProcess:{},markerIcon:{layout:"default#image",imageHref:it.a,imageSize:[24,24],imageOffset:[0,0]},masterclassBanners:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",author:"Владимир Перельман",image:nt.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",author:"Владимир Перельман",image:ct.a,code:"code2",price:{value:6e3,currency:"RUB"}}]}},computed:_t(_t(_t(_t(_t(_t(_t({},Object(B.d)([G.i,G.g])),Object(B.d)("route",{code:function(t){return t.params.code}})),Object(B.d)(X.NAME,[X.MASTERCLASS,X.FEATURED_MASTERCLASSES,X.INSTAGRAM_ITEMS])),Object(B.d)(Z.a,[Z.b])),Object(B.c)(J.c,[K.e])),Object(B.d)($.b,{isAuthorOpen:function(t){return t[$.a][A.modalName.masterclass.AUTHOR]&&t[$.a][A.modalName.masterclass.AUTHOR].open}})),{},{absoluteUrl:function(){var t=this.code;return t&&Object(at.e)(t)},socialSharing:function(){var t=this.absoluteUrl,e=this.masterClass,a=void 0===e?{}:e,s=a.description,r=void 0===s?{}:s;return{url:t,title:a.title,description:r.content}},documents:function(){var t=(this[X.MASTERCLASS]||{}).documents,e=void 0===t?[]:t;return e.map((function(t){return _t(_t({},t),{},{file:_t(_t({},t.file),{},{url:Object(E.b)(t.file.id)})})}))},pricePanelAnimation:function(){return this.isTablet?"slide-bottom":"slide-top"},buyBtnText:function(){return this.isTablet?"Купить билет":"Купить"},frisbuyScript:function(){var t=(this[X.MASTERCLASS]||{}).speakers,e=(void 0===t?[]:t).find((function(t){return!!t.instagram}));return e&&"https://www.frisbuy.ru/fb/widget?embed_id=aebd8bf5-9f42-11ea-ba01-0242ac150002&author=".concat(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t.replace("@","")}(e.instagram))},mapCoords:function(){var t=this.places;return t.length>1?[0,0]:t[0]&&t[0].coords||null},bannerImage:function(){var t=(this[X.MASTERCLASS]||{}).detailImage;if(t)return{desktopImg:{webp:Object(E.c)(1224,360,t.id,A.fileExtension.image.WEBP),orig:Object(E.c)(1224,360,t.id)},mobileImg:{webp:Object(E.c)(320,240,t.id,A.fileExtension.image.WEBP),orig:Object(E.c)(320,240,t.id)},defaultImg:Object(E.c)(1224,360,t.id)}},descriptionGallery:function(){var t=(this[X.MASTERCLASS]||{description:{}}).description.gallery;return(void 0===t?[]:t).map((function(t){var e={webp:Object(E.c)(600,320,t.value.id,A.fileExtension.image.WEBP),orig:Object(E.c)(600,320,t.value.id)},a=Object(E.c)(600,320,t.value.id);return _t(_t({},t),{},{desktopImg:e,defaultImg:a})}))},stages:function(){var t=(this[X.MASTERCLASS]||{}).stages,e=void 0===t?[]:t,a=this.speakers,s=void 0===a?[]:a,r=this.places,i=void 0===r?[]:r,n=this.dates,c=void 0===n?[]:n;return e.map((function(t,e){var a=s.filter((function(e){return t.speakerIds&&t.speakerIds.includes(e.id)})),r=i.find((function(e){return e.id===t.placeId})),n=c[e];return _t(_t({},t),{},{stageSpeakers:a,date:n,address:r&&r.address})}))},dates:function(){var t=this,e=(this[X.MASTERCLASS]||{}).stages;return(void 0===e?[]:e).map((function(e){var a=Object(N.e)(e.date),s=Object(N.e)("".concat(e.date," ").concat(e.timeFrom)),r=Object(N.e)("".concat(e.date," ").concat(e.timeTo));return"".concat(a.toLocaleDateString(t[G.g],st.b),", ").concat(s.toLocaleTimeString(t[G.g],st.d)," - ").concat(r.toLocaleTimeString(t[G.g],st.d))}))},gallery:function(){var t=(this[X.MASTERCLASS]||{}).gallery,e=void 0===t?[]:t;return e.map((function(t){var e={webp:Object(E.c)(500,500,t.value.id,A.fileExtension.image.WEBP),orig:Object(E.c)(500,500,t.value.id)},a=Object(E.c)(500,500,t.value.id);return _t(_t({},t),{},{desktopImg:e,defaultImg:a})}))},speakers:function(){var t=(this[X.MASTERCLASS]||{}).speakers,e=void 0===t?[]:t;return e.map((function(t){return t.avatar&&(t.avatar.defaultImg=Object(E.c)(null,null,t.avatar.id)),t}))},places:function(){var t=(this[X.MASTERCLASS]||{}).places,e=void 0===t?[]:t;return e.map((function(t){return _t(_t({},t),{},{coords:[Number(t.latitude),Number(t.longitude)],gallery:t.gallery.map((function(t){var e={webp:Object(E.c)(200,140,t.value.id,A.fileExtension.image.WEBP),orig:Object(E.c)(200,140,t.value.id)},a=Object(E.c)(200,140,t.value.id);return _t(_t({},t),{},{desktopImg:e,defaultImg:a})}))})}))},anotherCities:function(){var t=this[Z.b]||{},e=(this[X.MASTERCLASS]||{}).places,a=(void 0===e?[]:e).filter((function(e){return e.fiasId!==t.fias_id})).map((function(t){return t.cityName}));return ut(new Set(a))},productType:function(){return rt.a.MASTERCLASS},rootTitle:function(){return this.$t("masterclasses.title")},mapSettings:function(){return _t({},st.h)},sliderOptions:function(){return pt},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),methods:_t(_t(_t(_t({},Object(B.b)(X.NAME,[Y.b])),Object(B.b)(J.c,[Q.c])),Object(B.b)($.b,[L.a])),{},{generateMasterclassUrl:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){return generateMasterclassUrl(t)})),onCopyToClipboard:function(t){var e=this.absoluteUrl,a=Object(N.l)(e)?"Успешно скопировано":"Не удается скопировать";this[L.a]({name:A.modalName.general.NOTIFICATION,open:!0,state:{message:a}}),t.target.focus()},isInCart:function(t){return this[K.e](rt.a.MASTERCLASS,t)},onAddToCart:function(t,e){var a=this;return lt(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(!a.isInCart(t)){s.next=5;break}a.$router.push({name:"Cart"}),s.next=9;break;case 5:return a.inProcess=_t(_t({},a.inProcess),{},vt({},t,!0)),s.next=8,a[Q.c]({offerId:t,count:e});case 8:a.inProcess[t]=!1;case 9:case"end":return s.stop()}}),s)})))()},onPanelVisibilityChanged:function(t){this.isPanelVisible=t},onScrollTo:function(t){window.scrollTo({top:t.offsetTop-24,behavior:"smooth"})},onShowSpeaker:function(t){this[L.a]({name:A.modalName.masterclass.AUTHOR,open:!0,state:{author:t}})}}),beforeRouteEnter:function(t,e,a){var s=t.params.code;F.$store.state[X.NAME].masterClassCode===s?a():(F.$progress.start(),F.$store.dispatch("".concat(X.NAME,"/").concat(Y.b),{code:s}).then((function(){return a((function(t){return F.$progress.finish()}))})).catch((function(t){F.$progress.fail(),a()})))},beforeRouteUpdate:function(t,e,a){this.selectedCity.fias_id;var s=t.params.code;this.debounce_fetchProduct(s),a()},beforeMount:function(){var t=this;this.debounce_fetchProduct=et()(function(){var e=lt(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.masterClassCode===a){e.next=7;break}return t.$progress.start(),e.next=6,t[Y.b]({code:a});case 6:t.$progress.finish();case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),t.$progress.fail(),t.$progress.finish();case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}(),500)},mounted:function(){var t=this;setTimeout((function(){return t.showMap=!0}),300)}},bt=Object(h.a)(ft,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section master-class-view"},[a("div",{staticClass:"container master-class-view__header"},[a("breadcrumbs",{staticClass:"container container--tablet-lg master-class-view__breadcrumbs"},[a("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t.isTablet?a("v-svg",{attrs:{name:"home",width:"10",height:"10"}}):a("span",[t._v("Главная")])],1),t._v(" "),a("breadcrumb-item",{key:"root",attrs:{to:"/masterclasses"}},[t._v("\n                "+t._s(t.rootTitle)+"\n            ")]),t._v(" "),a("breadcrumb-item",{key:t.masterClass.code,attrs:{to:{path:t.$route.path}}},[t._v("\n                "+t._s(t.masterClass.title)+"\n            ")])],1),t._v(" "),a("master-class-banner-card",{staticClass:"master-class-view__banner",attrs:{image:t.bannerImage,name:t.masterClass.title,price:t.masterClass.price,"btn-text":"Купить билет","show-btn":""},on:{btnClick:function(e){return t.onScrollTo(t.$refs.panel)}}},[a("source",{attrs:{"data-srcset":t.bannerImage.desktopImg.webp,type:"image/webp",media:"(min-width: 768px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.bannerImage.desktopImg.orig,media:"(min-width: 768px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.bannerImage.mobileImg.webp,type:"image/webp",media:"(min-width: 320px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.bannerImage.mobileImg.orig,media:"(min-width: 320px)"}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.bannerImage.defaultImg,alt:""}})])],1),t._v(" "),a("section",{staticClass:"section master-class-view__section master-class-view__panel"},[a("div",{staticClass:"container master-class-view__panel-container"},[a("div",{staticClass:"master-class-view__panel-body"},[a("div",{staticClass:"container container--tablet master-class-view__panel-left"},[t.anotherCities&&t.anotherCities.length>0?a("attention-panel",[a("span",[a("strong",[t._v("Внимание!")]),t._v(" Событие проходит в другом городе"),a("br"),t._v("\n                            ("+t._s(t.anotherCities.join(", "))+")\n                        ")])]):t._e()],1),t._v(" "),a("div",{staticClass:"master-class-view__panel-middle"},[a("p",{staticClass:"container container--tablet text-bold master-class-view__section-hl"},[t._v("\n                        Описание\n                    ")]),t._v(" "),a("v-html",{staticClass:"container container--tablet master-class-view__panel-middle-desc",domProps:{innerHTML:t._s(t.masterClass.description.content)}}),t._v(" "),t._l(t.descriptionGallery,(function(e){return a("div",{key:e.value.id},[a("v-picture",[a("source",{attrs:{"data-srcset":e.desktopImg.webp,type:"image/webp"}}),t._v(" "),a("source",{attrs:{"data-srcset":e.desktopImg.orig}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImg,alt:""}})])],1)}))],2),t._v(" "),a("div",{staticClass:"master-class-view__panel-right"},[a("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Спикеры\n                        ")]),t._v(" "),t.speakers&&t.speakers.length>2?a("v-expander",{attrs:{"min-height":160},scopedSlots:t._u([{key:"btn",fn:function(e){var a=e.isExpanded;return[t._v("\n                                "+t._s(a?"Скрыть":"Все спикеры")+"\n                            ")]}}],null,!1,1876039357)},[a("ul",t._l(t.speakers,(function(e){return a("author-card",{key:e.id,staticClass:"master-class-view__panel-right-card",attrs:{"first-name":e.firstName,"last-name":e.lastName,"nick-name":e.profession,image:e.avatar.defaultImg,description:e.description},on:{show:function(a){return t.onShowSpeaker(e)}}})})),1)]):a("ul",t._l(t.speakers,(function(e){return a("author-card",{key:e.id,staticClass:"master-class-view__panel-right-card",attrs:{"first-name":e.firstName,"last-name":e.lastName,"nick-name":e.profession,image:e.avatar.defaultImg,description:e.description},on:{show:function(a){return t.onShowSpeaker(e)}}})})),1)],1),t._v(" "),a("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Дата и время\n                        ")]),t._v(" "),a("ul",t._l(t.dates,(function(e){return a("li",{key:e},[a("span",[t._v(t._s(e))])])})),0),t._v(" "),a("v-link",{staticClass:"master-class-view__panel-right-link",attrs:{tag:"button"},on:{click:function(e){return t.onScrollTo(t.$refs.contacts)}}},[t._v("\n                            Задать вопрос организатору\n                        ")])],1),t._v(" "),a("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Место проведения\n                        ")]),t._v(" "),a("ol",{class:{list:t.places.length>1}},t._l(t.places,(function(e){return a("li",{key:e.id},[a("span",[t._v(t._s(e.name)+", "+t._s(e.address))])])})),0),t._v(" "),a("v-link",{staticClass:"master-class-view__panel-right-link",attrs:{tag:"button"},on:{click:function(e){return t.onScrollTo(t.$refs.map)}}},[t._v("\n                            Посмотреть на карте\n                        ")])],1),t._v(" "),t._l(t.documents,(function(e){return a("div",{key:e.id,staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            "+t._s(e.name)+"\n                        ")]),t._v(" "),a("div",[t._v(t._s(e.description)+" ("),a("a",{attrs:{href:e.file.url,download:""}},[t._v("ссылка")]),t._v(")")])])})),t._v(" "),t.isTablet?t._e():a("div",{staticClass:"container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Поделиться\n                        ")]),t._v(" "),a("div",{staticClass:"master-class-view__panel-right-social-container"},[a("social-sharing",t._b({inlineTemplate:{render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{style:{display:"flex"}},[e("network",{staticClass:"network",attrs:{network:"vk"}},[e("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}})],1),this._v(" "),e("network",{staticClass:"network",attrs:{network:"facebook"}},[e("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}})],1)],1)},staticRenderFns:[]}},"social-sharing",t.socialSharing,!1)),t._v(" "),a("button",{staticClass:"network",on:{click:t.onCopyToClipboard}},[a("v-svg",{attrs:{name:"link",width:"24",height:"24"}})],1)],1)])],2)])])]),t._v(" "),a("section",{staticClass:"section master-class-view__section"},[a("div",{staticClass:"container master-class-view__panel-container"},[a("div",{staticClass:"master-class-view__panel"},[a("div",{staticClass:"master-class-view__panel-body master-class-view__panel-body--accordion"},[a("div",{staticClass:"master-class-view__panel-left"}),t._v(" "),a("div",{staticClass:"master-class-view__panel-middle master-class-view__panel-middle--no-padding"},[a("p",{staticClass:"container container--tablet text-bold master-class-view__section-hl"},[t._v("\n                            Программа\n                        ")]),t._v(" "),a("v-accordion",{staticClass:"master-class-view__accordion",attrs:{items:t.stages,"key-field":"id"},scopedSlots:t._u([{key:"header",fn:function(e){var s=e.item;return[a("div",{staticClass:"master-class-view__accordion-header"},[a("div",{staticClass:"master-class-view__accordion-header-info"},[a("h4",{staticClass:"master-class-view__accordion-header-name"},[t._v("\n                                            "+t._s(s.name)+"\n                                        ")]),t._v(" "),a("div",{staticClass:"text-sm text-grey"},[t._v(t._s(s.date))]),t._v(" "),a("div",[t._v(t._s(s.address))])]),t._v(" "),a("ul",{staticClass:"master-class-view__accordion-header-speakers"},t._l(s.stageSpeakers,(function(t){return a("author-card",{key:t.id,staticClass:"master-class-view__panel-right-card",attrs:{"first-name":t.firstName,"last-name":t.lastName,"nick-name":t.profession,image:t.avatar.defaultImg}})})),1)])]}},{key:"content",fn:function(e){var s=e.item;return[a("div",{staticClass:"master-class-view__accordion-content"},[a("div",{staticClass:"master-class-view__panel"},[a("div",{staticClass:"container container--tablet master-class-view__panel-body master-class-view__panel-body--accordion"},[a("v-html",{staticClass:"master-class-view__panel-middle",style:{order:0},domProps:{innerHTML:t._s(s.description)}}),t._v(" "),a("div",{staticClass:"master-class-view__panel-right",style:{order:1}},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                                                    Что взять с собой\n                                                ")]),t._v(" "),a("v-html",{domProps:{innerHTML:t._s(s.raider)}})],1)],1)])])]}}])})],1)])])])]),t._v(" "),t.gallery&&t.gallery.length>0?a("section",{staticClass:"section master-class-view__section master-class-view__gallery"},[t.isTablet?a("v-slider",{staticClass:"master-class-view__gallery-slider",attrs:{name:"masterclass-gallery-slider",options:t.sliderOptions}},t._l(t.gallery,(function(e){return a("div",{key:e.value.id,staticClass:"swiper-slide master-class-view__gallery-item"},[a("v-picture",[a("source",{attrs:{"data-srcset":e.desktopImg.webp,type:"image/webp"}}),t._v(" "),a("source",{attrs:{"data-srcset":e.desktopImg.orig}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImg,alt:""}})])],1)})),0):a("div",{staticClass:"container"},[a("ul",{staticClass:"master-class-view__gallery-list"},t._l(t.gallery,(function(e){return a("li",{key:e.value.id,staticClass:"master-class-view__gallery-item"},[a("v-picture",[a("source",{attrs:{"data-srcset":e.desktopImg.webp,type:"image/webp"}}),t._v(" "),a("source",{attrs:{"data-srcset":e.desktopImg.orig}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImg,alt:""}})])],1)})),0)])],1):t._e(),t._v(" "),t.isTablet?a("div",{staticClass:"container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n            Поделиться\n        ")]),t._v(" "),a("div",{staticClass:"master-class-view__panel-right-social-container"},[a("social-sharing",t._b({inlineTemplate:{render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{style:{display:"flex"}},[e("network",{staticClass:"network",attrs:{network:"vk"}},[e("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}})],1),this._v(" "),e("network",{staticClass:"network",attrs:{network:"facebook"}},[e("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}})],1)],1)},staticRenderFns:[]}},"social-sharing",t.socialSharing,!1)),t._v(" "),a("button",{staticClass:"network",on:{click:t.onCopyToClipboard}},[a("v-svg",{attrs:{name:"link",width:"24",height:"24"}})],1)],1)]):t._e(),t._v(" "),a("section",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:t.onPanelVisibilityChanged,expression:"onPanelVisibilityChanged"}],ref:"panel",staticClass:"section master-class-view__section master-class-view__tickets"},[a("div",{staticClass:"container master-class-view__tickets-container"},[a("h2",{staticClass:"container container--tablet master-class-view__section-hl"},[t._v("\n                Билеты на мастер-класс\n            ")]),t._v(" "),a("ul",{staticClass:"master-class-view__tickets-list"},t._l(t.masterClass.ticketTypes,(function(e){return a("ticket-card",{key:e.id,staticClass:"master-class-view__tickets-item",attrs:{name:e.name,description:e.description,max:e.qty-e.qtyOccupied,price:e.price,"old-price":e.oldPrice,disabled:t.isInCart(e.offerId)||t.inProcess[e.offerId],"in-process":!!t.inProcess[e.offerId],"show-count":!t.masterClass.hideTicketTypesQtyFree},on:{btnClick:function(a){return t.onAddToCart(e.offerId,a)}}},[t.isTablet?[t._v("\n                        "+t._s(t.isInCart(e.offerId)?"В корзину":"Добавить")+"\n                    ")]:[t._v("\n                        "+t._s(t.isInCart(e.offerId)?"Перейти в корзину":"Добавить в корзину")+"\n                    ")]],2)})),1)])]),t._v(" "),a("section",{ref:"map",staticClass:"section master-class-view__section master-class-view__map"},[a("div",{staticClass:"container master-class-view__map-container"},[a("h2",{staticClass:"container container--tablet master-class-view__section-hl"},[t._v("\n                Место проведения\n            ")]),t._v(" "),t._l(t.places,(function(e,s){return a("div",{key:e.id,staticClass:"container container--tablet master-class-view__map-info"},[t.isTabletLg?a("div",{staticClass:"master-class-view__map-desc"},[a("div",[t.places.length>1?[t._v(t._s(s+1)+".")]:t._e(),t._v(" "+t._s(e.name)+",\n                        "+t._s(e.address)+"\n                    ")],2)]):[a("div",{staticClass:"master-class-view__map-desc"},[a("div",{class:{"text-bold":t.places.length>1||!!e.address&&e.gallery.length>0}},[t.places.length>1?[t._v(t._s(s+1)+".")]:t._e(),t._v(" "+t._s(e.name)+",\n                            "+t._s(e.address)+"\n                        ")],2),t._v(" "),a("div",[t._v(t._s(e.description))])]),t._v(" "),a("ul",{staticClass:"master-class-view__map-gallery"},t._l(e.gallery,(function(e){return a("li",{key:e.value.id,staticClass:"master-class-view__map-gallery-item"},[a("v-picture",[a("source",{attrs:{"data-srcset":e.desktopImg.webp,type:"image/webp"}}),t._v(" "),a("source",{attrs:{"data-srcset":e.desktopImg.orig}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.defaultImg,alt:""}})])],1)})),0)]],2)})),t._v(" "),t.showMap&&t.mapCoords?a("yandex-map",{attrs:{coords:t.mapCoords,controls:[],options:{yandexMapDisablePoiInteractivity:!0},settings:t.mapSettings,"show-all-markers":t.places&&t.places.length>1}},t._l(t.places,(function(e){return a("ymap-marker",{key:"masterclass-point-"+e.id,attrs:{"marker-id":"masterclass-point-"+e.id,coords:e.coords,icon:t.markerIcon}})})),1):t._e()],2)]),t._v(" "),t.masterClass.organizer?a("section",{ref:"contacts",staticClass:"section master-class-view__section master-class-view__contacts"},[a("div",{staticClass:"container master-class-view__contacts-container"},[a("h2",{staticClass:"container container--tablet master-class-view__section-hl"},[t._v("\n                Контакты организатора\n            ")]),t._v(" "),a("div",{staticClass:"master-class-view__contacts-panel"},[a("p",{staticClass:"master-class-view__contacts-panel-hl"},[t._v("\n                    По всем вопросам и предложениям обращаться к организатору\n                ")]),t._v(" "),a("p",{staticClass:"text-bold master-class-view__contacts-panel-name"},[t._v("\n                    "+t._s(t.masterClass.organizer.name)+"\n                ")]),t._v(" "),a("p",{staticClass:"text-grey master-class-view__contacts-panel-desc"},[t._v("\n                    "+t._s(t.masterClass.organizer.description)+"\n                ")]),t._v(" "),a("div",{staticClass:"master-class-view__contacts-panel-bottom"},[a("info-row",{staticClass:"master-class-view__contacts-panel-row",attrs:{name:"Телефон",value:t.masterClass.organizer.phone}}),t._v(" "),a("info-row",{staticClass:"master-class-view__contacts-panel-row",attrs:{name:"Email",value:t.masterClass.organizer.email}}),t._v(" "),a("info-row",{staticClass:"master-class-view__contacts-panel-row",attrs:{name:"WhatsApp, Viber, Telegram",value:t.masterClass.organizer.phone}}),t._v(" "),a("info-row",{staticClass:"master-class-view__contacts-panel-row",attrs:{name:"Сайт",value:t.masterClass.organizer.site}}),t._v(" "),a("v-button",{staticClass:"master-class-view__contacts-panel-btn",attrs:{href:"mailto:"+t.masterClass.organizer.email}},[t._v("\n                        Написать\n                    ")])],1)])])]):t._e(),t._v(" "),a("section",{staticClass:"section master-class-view__section master-class-view__instagram"},[a("div",{staticClass:"container master-class-view__instagram-container"},[a("frisbuy-product-container",{attrs:{script:t.frisbuyScript}})],1)]),t._v(" "),a("section",{staticClass:"section product-view__section"},[a("div",{staticClass:"container"},[a("reviews-panel",{key:t.masterClass.code,attrs:{code:t.masterClass.code,type:t.productType,"can-add":t.masterClass.canWriteReview}})],1)]),t._v(" "),a("transition",{attrs:{name:t.pricePanelAnimation,appear:""}},[t.scroll&&!t.isPanelVisible||t.isTablet?a("masterclass-price-panel",{staticClass:"master-class-view__top-panel",attrs:{name:t.masterClass.title,"price-to":t.masterClass.priceTo,"price-from":t.masterClass.priceFrom},on:{"add-item":function(e){return t.onScrollTo(t.$refs.panel)}}},[t._v("\n            "+t._s(t.buyBtnText)+"\n        ")]):t._e()],1),t._v(" "),a("transition",{attrs:{name:"fade-in"}},[t.$isServer||t.isAuthorOpen?a("author-modal"):t._e()],1)],1)}),[],!1,null,null,null);e.default=bt.exports},M2hw:function(t,e,a){},ijK7:function(t,e,a){},kWqm:function(t,e,a){},"r/W5":function(t,e,a){}}]);