(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{UTL2:function(t,e,i){"use strict";i.r(e);var r,a=i("NDiG"),s=i("7cXU"),c=i("i2Ud"),n=i("ze5i"),o=(i("VHxD"),{name:"v-html",props:["component"]}),d=i("KHd+"),l=Object(d.a)(o,(function(){var t=this.$createElement;return(this._self._c||t)(this.component||"div",{tag:"component",staticClass:"v-html"})}),[],!1,null,null,null).exports,u=i("YSwA"),_=i("jYNS"),p=i("AlLH"),v=(i("ZC74"),{name:"price",props:{value:{type:Number,required:!0},currency:{type:String,required:!0},type:{type:String}},computed:{currencySymbol:function(){return p.currencySymbol[this.currency]}}}),w=Object(d.a)(v,(function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"price"},[this._v("\n    "+this._s(this.value)+"\n     "),e("span",{domProps:{innerHTML:this._s(this.currencySymbol)}})])}),[],!1,null,null,null).exports,m=i("ENRa"),g=i("eOVz"),C=i("7bnD"),h=(i("fB3W"),i("/Q9p")),f=(i("LqtR"),i("nhva"),i("CxEY"),i("4BeY")),b=i.n(f),y=i("IaFt"),k=i.n(y),P=new b.a({id:"icon-like",use:"icon-like-usage",viewBox:"0 0 22 21",content:'<symbol viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg" id="icon-like">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 21.0001L16.5701 20.9998L16.6288 21.0001C16.9664 21.0028 17.8103 21.0096 18.6498 20.4918C19.5791 19.9185 20.3155 18.8376 20.6613 17.0201C21.3802 13.2409 21.7532 11.1034 21.912 10.0104C21.9141 9.99579 21.9182 9.97404 21.9235 9.9459C21.9773 9.6585 22.1556 8.70619 21.6659 7.86291C21.0681 6.83333 19.788 6.33335 17.8136 6.33335H14.0817C14.1785 5.9098 14.2975 5.37505 14.377 4.82986C14.4848 4.09057 14.5423 3.20623 14.3395 2.39145C14.1256 1.53181 13.6058 0.711156 12.5849 0.288079C11.8909 0.000464246 11.2082 0.132958 10.684 0.427054C10.1759 0.712113 9.77758 1.16296 9.52221 1.64068C8.42854 3.68653 6.73802 6.42071 5.28637 7.89944C5.25518 7.93121 5.22633 7.96484 5.19991 8.00007H3C1.34315 8.00006 -7.24234e-08 9.34321 0 11.0001L3.0598e-07 18.0001C3.78403e-07 19.6569 1.34315 21.0001 3 21.0001ZM7 18.9996L7 8.99808C8.58105 7.2713 10.2417 4.53714 11.286 2.58356C11.3913 2.38659 11.5386 2.24088 11.6626 2.17127C11.7664 2.11307 11.8036 2.12902 11.8176 2.13503L11.8192 2.13571C12.1269 2.26321 12.3013 2.48303 12.3987 2.8744C12.5073 3.31063 12.4932 3.88783 12.3979 4.54126C12.3246 5.04409 12.2164 5.51729 12.1175 5.94978C12.0887 6.0757 12.0608 6.19818 12.0346 6.31692C11.9833 6.55022 11.9259 6.82695 11.9127 7.05861C11.907 7.15729 11.8986 7.3805 11.9834 7.61577C12.0307 7.74719 12.1267 7.93729 12.3213 8.09527C12.5309 8.26537 12.7748 8.33335 12.9951 8.33335L17.8136 8.33335C19.5697 8.33335 19.8896 8.78675 19.9363 8.86718C20.0342 9.03575 20.0062 9.22561 19.949 9.6124L19.9328 9.72278C19.781 10.7673 19.4157 12.8653 18.6965 16.6463C18.4213 18.0932 17.9142 18.5956 17.5998 18.7895C17.2585 19.0001 16.9217 18.9999 16.5956 18.9998L7 18.9996ZM4.99997 10.0001H3C2.44772 10.0001 2 10.4478 2 11.0001L2 18.0001C2 18.5523 2.44772 19.0001 3 19.0001H4.99997L4.99997 10.0001ZM13.9094 7.17235L13.9098 7.16716C13.9098 7.18253 13.9087 7.18546 13.9094 7.17235Z" />\n</symbol>'}),x=(k.a.add(P),new b.a({id:"icon-dislike",use:"icon-dislike-usage",viewBox:"0 0 22 21",content:'<symbol viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg" id="icon-dislike">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43006 -0.000186344L5.37131 -0.00051822C5.03371 -0.00323045 4.18985 -0.0100092 3.35036 0.507813C2.42104 1.08105 1.68459 2.16196 1.33885 3.97951C0.619972 7.75868 0.246952 9.89619 0.088107 10.9891C0.0859749 11.0038 0.0818902 11.0256 0.0766041 11.0539C0.0228036 11.3413 -0.155432 12.2934 0.33422 13.1367C0.932045 14.1662 2.21208 14.6662 4.18653 14.6662H7.91839C7.82163 15.0898 7.70267 15.6245 7.62317 16.1697C7.51536 16.909 7.45784 17.7934 7.66059 18.6081C7.8745 19.4678 8.3943 20.2884 9.41521 20.7115C10.1092 20.9991 10.792 20.8666 11.3161 20.5725C11.8242 20.2875 12.2225 19.8366 12.4779 19.3589C13.5716 17.313 15.2621 14.5789 16.7138 13.1001C16.7449 13.0684 16.7738 13.0347 16.8002 12.9995H19.0001C20.657 12.9995 22.0001 11.6564 22.0001 9.99951L22.0001 2.99951C22.0001 1.34266 20.657 -0.000490278 19.0001 -0.000490205L5.43006 -0.000186344ZM17.0001 10.9995L17.0002 1.99951H19.0001C19.5524 1.99951 20.0001 2.44723 20.0001 2.99951L20.0001 9.99951C20.0001 10.5518 19.5524 10.9995 19.0001 10.9995L17.0001 10.9995ZM15.0001 1.99994L5.40448 1.99981C5.07841 1.99966 4.74163 1.99951 4.40034 2.21003C4.08594 2.40396 3.57886 2.90633 3.30362 4.35325C2.58438 8.1343 2.21911 10.2323 2.06731 11.2768L2.0511 11.3872C1.99396 11.774 1.96592 11.9638 2.06379 12.1324C2.1105 12.2128 2.4304 12.6662 4.18653 12.6662L9.00505 12.6662C9.22534 12.6662 9.46926 12.7342 9.67879 12.9043C9.87338 13.0623 9.96939 13.2524 10.0168 13.3838C10.1015 13.6191 10.0931 13.8423 10.0875 13.941C10.0743 14.1726 10.0168 14.4494 9.96549 14.6827C9.93937 14.8014 9.91138 14.9239 9.8826 15.0498C9.78373 15.4823 9.67556 15.9555 9.60223 16.4583C9.50695 17.1118 9.49285 17.6889 9.6014 18.1252C9.69879 18.5165 9.87321 18.7364 10.1809 18.8639L10.1825 18.8645C10.1965 18.8706 10.2338 18.8865 10.3375 18.8283C10.4616 18.7587 10.6088 18.613 10.7141 18.416C11.7585 16.4624 13.4191 13.7283 15.0001 12.0015L15.0001 1.99994ZM8.0907 13.8272L8.09035 13.8324C8.0903 13.817 8.09144 13.8141 8.0907 13.8272Z" />\n</symbol>'})),S=(k.a.add(x),i("s8km"),{name:"product-review-card",components:{VSvg:a.a,VLink:s.a,VRating:C.a},props:{tag:{type:String,default:"div"},name:{type:String},date:{type:String},rating:{type:Number},likes:{type:Number},dislikes:{type:Number},advantage:{type:String},disadvantage:{type:String},comment:{type:String},images:{type:Array},options:{type:Array}},data:function(){return{}},computed:{},methods:{}}),T=Object(d.a)(S,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i(t.tag,{tag:"component",staticClass:"product-review-card"},[i("div",{staticClass:"product-review-card__header"},[i("h4",{staticClass:"product-review-card__header-name"},[t._v("\n            "+t._s(t.name)+" "),i("span",{staticClass:"text-grey text-sm product-review-card__header-date"},[t._v(t._s(t.date))])]),t._v(" "),i("v-rating",{staticClass:"product-review-card__header-rating",attrs:{value:t.rating},scopedSlots:t._u([{key:"activeLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-small",width:"12",height:"12"}})]},proxy:!0},{key:"inactiveLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-empty-small",width:"12",height:"12"}})]},proxy:!0}])})],1),t._v(" "),i("div",{staticClass:"product-review-card__body"},[i("div",{staticClass:"product-review-card__body-item"},[i("div",{staticClass:"text-bold product-review-card__body-item-title"},[t._v("Достоинства")]),t._v(" "),i("div",{staticClass:"product-review-card__body-item-value"},[t._v(t._s(t.advantage))])]),t._v(" "),i("div",{staticClass:"product-review-card__body-item"},[i("div",{staticClass:"text-bold product-review-card__body-item-title"},[t._v("Недостатки")]),t._v(" "),i("div",{staticClass:"product-review-card__body-item-value"},[t._v(t._s(t.disadvantage))])]),t._v(" "),t.images&&t.images.length>0?i("div",{staticClass:"product-review-card__body-item"},[i("div",{staticClass:"text-bold product-review-card__body-item-title"},[t._v("Фото")]),t._v(" "),i("div",{staticClass:"product-review-card__body-item-value"},t._l(t.images,(function(t){return i("div",{key:t.id,staticClass:"product-review-card__body-item-img"},[i("img",{staticClass:"blur-up lazyload",attrs:{"data-src":t.image,alt:""}})])})),0)]):t._e()]),t._v(" "),i("div",{staticClass:"product-review-card__controls"},[i("button",{staticClass:"product-review-card__controls-btn"},[i("v-svg",{attrs:{id:"product-review-card-like",name:"like",width:"22",height:"21"}}),t._v("\n             "+t._s(t.likes)+"\n        ")],1),t._v(" "),i("button",{staticClass:"product-review-card__controls-btn"},[i("v-svg",{attrs:{id:"product-review-card-dislike",name:"dislike",width:"22",height:"21"}}),t._v("\n             "+t._s(t.dislikes)+"\n        ")],1)])])}),[],!1,null,null,null).exports,E=i("L2JU"),O=i("BZIu"),L=i("Nlzp");function A(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var R,$=(A(r={},"SET_PRODUCT",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.productCode=e.code,t.product=e})),A(r,"SET_BANNERS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.banners=e})),A(r,"SET_FEATURED_PRODUCTS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.featuredProducts=e})),A(r,"SET_INSTAGRAM_ITEMS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.instagramItems=e})),r);function D(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var H,j=(D(R={},"FETCH_PRODUCT",(function(t,e){var i=t.commit;return Object(L.s)(e).then((function(t){return i("SET_PRODUCT",t)})).catch((function(t){return O.$logger.error("".concat("FETCH_PRODUCT"," ").concat(t)),{}}))})),D(R,"FETCH_FEATURED_PRODUCTS",(function(t,e){var i=t.commit;return Object(L.t)(e).then((function(t){return i("SET_FEATURED_PRODUCTS",t)})).catch((function(t){return O.$logger.error("".concat("FETCH_FEATURED_PRODUCTS"," ").concat(t)),{}}))})),D(R,"FETCH_BANNERS",(function(t,e){var i=t.commit;return Object(L.l)(e).then((function(t){return i("SET_BANNERS",t.slice(3,6))})).catch((function(t){return O.$logger.error("".concat("FETCH_BANNERS"," ").concat(t)),[]}))})),D(R,"FETCH_INSTAGRAM_ITEMS",(function(t,e){var i=t.commit;return Object(L.r)(e).then((function(t){return i("SET_INSTAGRAM_ITEMS",t.slice(0,4))})).catch((function(t){return O.$logger.error("".concat("FETCH_INSTAGRAM_ITEMS"," ").concat(t)),[]}))})),D(R,"FETCH_PRODUCT_DATA",(function(t,e){var i=t.dispatch;return Promise.all([i("FETCH_PRODUCT",e),i("FETCH_BANNERS",e),i("FETCH_FEATURED_PRODUCTS",e),i("FETCH_INSTAGRAM_ITEMS",e)])})),R);i("W6hq");function B(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var M,N="product",U={name:N,namespaced:!0,state:(H={},B(H,"featuredProducts",{items:[],range:0}),B(H,"instagramItems",[]),B(H,"banners",[]),B(H,"product",{}),B(H,"productCode",""),H),actions:j,mutations:$,getters:{}},I=i("8TZ/"),F=i("0CxO"),z=i("SqwP"),V=i("sEfC"),Z=i.n(V),q=i("OvCi"),G=i.p+"images/brandProduct1.31197c0e72e383fdda1a.png";i("L52N"),i("2+mq"),i("hLqd"),i("PnIt"),i("iHux"),i("lEig");function Y(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function J(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?Y(Object(i),!0).forEach((function(e){W(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):Y(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function W(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var K={spaceBetween:8,slidesPerView:1.5,slidesOffsetBefore:24,slidesOffsetAfter:24,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:W({},p.breakpoints.tablet-1,{slidesPerView:1,spaceBetween:0,slidesOffsetBefore:0,slidesOffsetAfter:0,pagination:{el:".swiper-pagination",type:"bullets"}})},Q={spaceBetween:24,slidesPerView:4,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:(M={},W(M,p.breakpoints.tabletLg-1,{slidesPerView:3.5,slidesOffsetBefore:24,slidesOffsetAfter:24}),W(M,p.breakpoints.tablet-1,{slidesPerView:2,spaceBetween:12,slidesOffsetBefore:0,slidesOffsetAfter:0}),M)},X={spaceBetween:24,slidesOffsetBefore:24,slidesOffsetAfter:24,slidesPerView:3.5,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:W({},p.breakpoints.tablet-1,{slidesPerView:1.5,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16})},tt={name:"product",components:{VSvg:a.a,VButton:c.a,VLink:s.a,VRating:C.a,VSticky:n.a,VHtml:l,VSlider:u.a,VPicture:_.a,Price:w,CatalogProductCard:h.a,ProductReviewCard:T,BannerCard:m.a,InstagramCard:g.a},data:function(){return{mockImg:G}},computed:J({},Object(E.d)("route",{code:function(t){return t.params.code}}),{},Object(E.d)(N,["product","banners","featuredProducts","instagramItems"]),{},Object(E.d)(z.a,[z.b]),{productGalleryOptions:function(){return K},sliderOptions:function(){return Q},instagramOptions:function(){return X},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:W({},z.b,(function(t){this.product.productCode,t.fias_id;this.debounce_fetchProduct(to,from)})),methods:J({},Object(E.b)(N,["FETCH_PRODUCT_DATA"]),{},Object(E.b)(I.c,[F.a]),{generateSourcePath:function(t,e,i,r){return Object(q.a)(t,e,i,r)}}),beforeRouteEnter:function(t,e,i){var r=t.params.code;!!O.$store._modulesNamespaceMap["".concat(U.name,"/")]||O.$store.registerModule(U.name,U,{preserveState:!!O.$store.state.product});var a=O.$store.state.product.productCode,s=O.$store.state.geolocation.selectedCity.fias_id;a===r?i():(O.$progress.start(),O.$store.dispatch("".concat(N,"/").concat("FETCH_PRODUCT_DATA"),{code:r,city:s}).then((function(){return i((function(t){return O.$progress.finish()}))})).catch((function(t){O.$progress.fail(),O.$logger.error(t)})))},beforeRouteUpdate:function(t,e,i){this.product.productCode;var r=this.selectedCity.fias_id,a=t.params.code;this.debounce_fetchProduct(a,r),i()},beforeMount:function(){var t=this;this.debounce_fetchProduct=Z()((function(e,i){return regeneratorRuntime.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(r.prev=0,t.$progress.start(),productCode===e){r.next=7;break}return r.next=5,regeneratorRuntime.awrap(t.FETCH_PRODUCT_DATA({code:e,city:i}));case 5:r.next=9;break;case 7:return r.next=9,regeneratorRuntime.awrap(Promise.resolve());case 9:t.$progress.finish(),r.next=16;break;case 12:r.prev=12,r.t0=r.catch(0),O.$logger.error("debounce_fetchProduct",r.t0),t.$progress.fail();case 16:case"end":return r.stop()}}),null,null,[[0,12]])}),500)}},et=Object(d.a)(tt,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"section product-view"},[i("div",{staticClass:"container"},[i("transition-group",{staticClass:"section product-view__breadcrumbs",attrs:{tag:"ol",name:"fade-in"}},[i("li",{key:"main",staticClass:"product-view__breadcrumbs-item"},[i("router-link",{staticClass:"product-view__breadcrumbs-link",attrs:{to:"/"}},[t._v("\n                    Главная\n                ")])],1),t._v(" "),i("li",{key:"all",staticClass:"product-view__breadcrumbs-item"},[i("router-link",{staticClass:"product-view__breadcrumbs-link",attrs:{to:"/catalog"}},[t._v("\n                    Каталог\n                ")])],1),t._v(" "),t._l(t.product.categoryCodes,(function(e){return i("li",{key:e.code,staticClass:"product-view__breadcrumbs-item"},[i("router-link",{staticClass:"product-view__breadcrumbs-link",attrs:{to:"/catalog/"+e.code}},[t._v("\n                    "+t._s(e.name)+"\n                ")])],1)}))],2)],1),t._v(" "),i("section",{staticClass:"section"},[i("div",{staticClass:"container product-view__header"},[i("v-sticky",{staticClass:"product-view__header-sticky",scopedSlots:t._u([{key:"sticky",fn:function(){return[t.isTabletLg?i("v-slider",{staticClass:"product-view__header-gallery",attrs:{name:"gallery",options:t.productGalleryOptions}},t._l(t.product.media,(function(e){return i("div",{key:e.id,staticClass:"swiper-slide product-view__header-gallery-item"},[e&&e.id?i("v-picture",{attrs:{image:e,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var r=e.image;e.lazy;return[i("source",{attrs:{"data-srcset":t.generateSourcePath(300,300,r.id,"webp"),type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),i("source",{attrs:{"data-srcset":t.generateSourcePath(200,200,r.id,"webp"),type:"image/webp",media:"(max-width: 479px)"}})]}},{key:"fallback",fn:function(e){var r=e.image,a=(e.lazy,e.alt);return[i("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(300,300,r.id,r.sourceExt),alt:a}})]}}],null,!0)}):t._e()],1)})),0):i("div",{staticClass:"product-view__header-gallery"},t._l(t.product.media,(function(e){return i("div",{key:e.id,staticClass:"product-view__header-gallery-item"},[e&&e.id?i("v-picture",{attrs:{image:e,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var r=e.image;e.lazy;return[i("source",{attrs:{"data-srcset":t.generateSourcePath(300,300,r.id,"webp"),type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),i("source",{attrs:{"data-srcset":t.generateSourcePath(200,200,r.id,"webp"),type:"image/webp",media:"(max-width: 479px)"}})]}},{key:"fallback",fn:function(e){var r=e.image,a=(e.lazy,e.alt);return[i("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(300,300,r.id,r.sourceExt),alt:a}})]}}],null,!0)}):t._e()],1)})),0)]},proxy:!0}])}),t._v(" "),i("div",{staticClass:"product-view__header-detail"},[i("h1",{staticClass:"product-view__header-detail-hl"},[t._v("\n                    "+t._s(t.product.title)+"\n                ")]),t._v(" "),i("div",{staticClass:"product-view__header-detail-info"},[i("v-rating",{staticClass:"product-view__header-detail-info-rating",attrs:{value:t.product.rating},scopedSlots:t._u([{key:"activeLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-small",width:"12",height:"12"}})]},proxy:!0},{key:"inactiveLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-empty-small",width:"12",height:"12"}})]},proxy:!0}])}),t._v(" "),i("div",{staticClass:"text-grey product-view__header-detail-info-review"},[t._v("\n                        "+t._s(t.$t("product.review",{n:t.product.reviewsCount}))+"\n                    ")]),t._v(" "),i("div",{staticClass:"text-grey product-view__header-detail-info-code"},[t._v("\n                        "+t._s(t.$t("product.vendorCode",{code:t.product.vendorCode}))+"\n                    ")])],1),t._v(" "),i("div",{staticClass:"product-view__header-detail-section product-view__header-detail-options"},[i("div",{staticClass:"product-view__header-detail-options-selected"},[i("div",[t._v(t._s(t.product.option.title))]),t._v(" "),i("div",{staticClass:"text-grey text-sm"},[t._v("16 оттенков")])]),t._v(" "),i("div",{staticClass:"product-view__header-detail-options-list"},t._l(t.product.options,(function(e){return i("div",{key:e.id,staticClass:"product-view__header-detail-options-item",class:{"product-view__header-detail-options-item--selected":e.value===t.product.option.value}},[i("div",{staticClass:"product-view__header-detail-options-item-square",style:[{backgroundColor:e.value,outlineColor:e.value}]})])})),0)]),t._v(" "),i("div",{staticClass:"product-view__header-detail-section product-view__header-detail-panels"},[i("div",{staticClass:"product-view__header-detail-price-panel"},[i("div",{staticClass:"product-view__header-detail-price-panel-prices"},[i("price",{staticClass:"text-bold product-view__header-detail-price-panel-current",attrs:{value:t.product.price.value,currency:t.product.price.currency}}),t._v(" "),t.product.oldPrice?i("price",{staticClass:"text-grey text-strike product-view__header-detail-price-panel-old",attrs:{value:t.product.oldPrice.value,currency:t.product.oldPrice.currency}}):t._e()],1),t._v(" "),i("div",{staticClass:"text-grey product-view__header-detail-price-panel-bonus"},[t._v("\n                            +"+t._s(t.$t("product.bonus",{n:t.product.bonus}))+"\n                        ")])]),t._v(" "),i("div",{staticClass:"product-view__header-detail-control-panel"},[i("v-button",{staticClass:"product-view__header-detail-control-panel-btn",on:{click:function(e){return e.preventDefault(),t.ADD_CART_ITEM({offerId:t.product.id})}}},[t._v("\n                            Добавить в корзину\n                        ")]),t._v(" "),i("v-link",{staticClass:"product-view__header-detail-control-panel-wishlist"},[i("v-svg",{attrs:{id:"product-wishlist",name:"wishlist-middle",width:"20",height:"18"}}),t._v("\n                             В избранное\n                        ")],1)],1)]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t.product.brand?i("div",{staticClass:"product-view__header-detail-section"},[i("span",[t.product.brand.image&&t.product.brand.image.id?i("v-picture",{attrs:{image:t.product.brand.image,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var r=e.image;e.lazy;return[i("source",{attrs:{"data-srcset":t.generateSourcePath(120,24,r.id,"webp"),type:"image/webp"}})]}},{key:"fallback",fn:function(e){var r=e.image,a=(e.lazy,e.alt);return[i("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(120,24,r.id,r.sourceExt),alt:a}})]}}],null,!1,2871185697)}):t._e(),t._v(" "),i("router-link",{attrs:{to:{path:"/brand/"+t.product.brand.code}}},[t._v("На страницу бренда")])],1)]):t._e()])],1)]),t._v(" "),i("section",{staticClass:"section product-view__section"},[i("div",{staticClass:"container product-view__socials"},[i("div",{staticClass:"product-view__socials-inner"},[i("span",{staticClass:"text-bold"},[t._v("Поделиться")]),t._v(" \n                "),i("div",[i("v-svg",{attrs:{name:"vkontakte-bw",width:"22",height:"22"}}),t._v(" "),i("v-svg",{attrs:{name:"facebook-bw",width:"22",height:"22"}}),t._v(" "),i("v-svg",{attrs:{name:"instagram-bw",width:"22",height:"22"}})],1)])])]),t._v(" "),t.product.profitable?i("section",{staticClass:"section product-view__section"},[i("div",{staticClass:"container product-view__profitable"},[i("h2",{staticClass:"product-view__section-hl product-view__profitable-hl"},[t._v("\n                "+t._s(t.$t("product.title.profitable"))+"\n            ")]),t._v(" "),i("div",{staticClass:"product-view__profitable-grid"},[i("ul",{staticClass:"product-view__profitable-list"},t._l(t.product.profitable.items,(function(e){return i("li",{key:e.id,staticClass:"product-view__profitable-list-item"},[i("catalog-product-card",{staticClass:"product-view__profitable-card",attrs:{"product-id":e.id,name:e.name,href:"/catalog/"+e.categoryCodes[e.categoryCodes.length-1]+"/"+e.code,image:e.image,price:e.price,"old-price":e.oldPrice,tags:e.tags,rating:e.rating,isSmall:t.isTabletLg}})],1)})),0),t._v(" "),i("div",{staticClass:"product-view__profitable-total"}),t._v(" "),i("div",{staticClass:"product-view__profitable-price-panel"},[i("div",{staticClass:"product-view__profitable-price-panel-prices"},[i("div",{staticClass:"text-bold product-view__profitable-price-panel-price"},[t._v("\n                            "+t._s(t.product.profitable.price)+" ₽\n                        ")]),t._v(" "),i("div",{staticClass:"text-grey text-strike product-view__profitable-price-panel-old"},[t._v("\n                            "+t._s(t.product.profitable.oldPrice)+" ₽\n                        ")])]),t._v(" "),i("div",{staticClass:"text-grey product-view__profitable-price-panel-profit"},[t._v("\n                        Вы сэкономите "+t._s(t.product.profitable.oldPrice-t.product.profitable.price)+" ₽\n                    ")]),t._v(" "),i("v-button",{staticClass:"product-view__profitable-price-panel-btn"},[t._v("Добавить в корзину")])],1)])])]):t._e(),t._v(" "),t.product.description?i("section",{staticClass:"section product-view__section product-view__info"},[i("div",{staticClass:"container product-view__info-container"},[i("div",{staticClass:"product-view__info-header"},[i("h2",{staticClass:"product-view__section-hl"},[t._v(t._s(t.$t("product.title.description")))]),t._v(" "),i("v-html",{staticClass:"product-view__info-text",domProps:{innerHTML:t._s(t.product.description.content)}})],1),t._v(" "),i("div",{staticClass:"product-view__info-media"},[t.product.description.image&&t.product.description.image.id?i("v-picture",{attrs:{image:t.product.description.image,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var r=e.image;e.lazy;return[i("source",{attrs:{"data-srcset":t.generateSourcePath(600,600,r.id,"webp"),type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),i("source",{attrs:{"data-srcset":t.generateSourcePath(200,200,r.id,"webp"),type:"image/webp",media:"(max-width: 479px)"}})]}},{key:"fallback",fn:function(e){var r=e.image,a=(e.lazy,e.alt);return[i("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(600,600,r.id,r.sourceExt),alt:a}})]}}],null,!1,399386964)}):t._e()],1)])]):t._e(),t._v(" "),t.product.howto?i("section",{staticClass:"section product-view__info"},[i("div",{staticClass:"container product-view__info-container"},[i("div",{staticClass:"product-view__info-header"},[i("h2",{staticClass:"product-view__section-hl"},[t._v(t._s(t.$t("product.title.method")))]),t._v(" "),i("v-html",{staticClass:"product-view__info-text",domProps:{innerHTML:t._s(t.product.howto.content)}})],1),t._v(" "),i("div",{staticClass:"product-view__info-media"},[t.product.howto.image&&t.product.howto.image.id?i("v-picture",{attrs:{image:t.product.howto.image,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var r=e.image;e.lazy;return[i("source",{attrs:{"data-srcset":t.generateSourcePath(600,600,r.id,"webp"),type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),i("source",{attrs:{"data-srcset":t.generateSourcePath(200,200,r.id,"webp"),type:"image/webp",media:"(max-width: 479px)"}})]}},{key:"fallback",fn:function(e){var r=e.image,a=(e.lazy,e.alt);return[i("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(600,600,r.id,r.sourceExt),alt:a}})]}}],null,!1,399386964)}):t._e()],1)])]):t._e(),t._v(" "),t.product.characteristics&&t.product.characteristics.length>0?i("section",{staticClass:"section product-view__section product-view__characteristics"},[i("div",{staticClass:"container"},[i("h2",{staticClass:"product-view__section-hl"},[t._v(t._s(t.$t("product.title.characteristics")))]),t._v(" "),i("ul",{staticClass:"product-view__characteristics-list"},t._l(t.product.characteristics,(function(e){return i("li",{key:e.id,staticClass:"product-view__characteristics-item"},[i("div",{staticClass:"product-view__characteristics-item-title"},[t._v(t._s(e.title))]),t._v(" "),i("div",{staticClass:"product-view__characteristics-item-value"},[t._v("\n                        "+t._s(Array.isArray(e.value)?e.value.join(", "):e.value)+"\n                    ")])])})),0)])]):t._e(),t._v(" "),t.product.masterClasses&&t.product.masterClasses.length>0?i("section",{staticClass:"section product-view__masterclass"},[i("div",{staticClass:"container product-view__masterclass-container"},[i("h2",{staticClass:"product-view__section-hl product-view__masterclass-hl"},[t._v("\n                "+t._s(t.$t("product.title.masterClasses"))+"\n            ")]),t._v(" "),i("ul",{staticClass:"product-view__masterclass-list"},t._l(t.product.masterClasses,(function(t){return i("li",{key:t.id,staticClass:"product-view__masterclass-item"},[i("img",{staticClass:"blur-up lazyload",attrs:{"data-src":t.image}})])})),0),t._v(" "),i("v-button",{staticClass:"btn--outline product-view__section-link product-view__masterclass-link"},[t._v("\n                "+t._s(t.$t("product.showAll"))+"\n            ")])],1)]):t._e(),t._v(" "),i("section",{staticClass:"section product-view__section"},[i("div",{staticClass:"container product-view__reviews"},[i("div",{staticClass:"product-view__reviews-inner"},[i("div",{staticClass:"product-view__reviews-header"},[i("h2",{staticClass:"product-view__section-hl product-view__reviews-header-hl"},[t._v("\n                        "+t._s(t.$t("product.title.reviews"))+"\n                        "),i("span",{staticClass:"text-grey product-view__reviews-header-hl-count"},[t._v("12")]),t._v(" "),i("v-button",{staticClass:"btn--outline product-view__section-link product-view__reviews-link"},[t._v("\n                            "+t._s(t.$t("product.reviews.makeReview"))+"\n                        ")])],1),t._v(" "),i("div",{staticClass:"product-view__section-header-rating"},[i("span",{staticClass:"product-view__reviews-header-rating-count"},[t._v("\n                            "+t._s(t.$t("product.reviews.averageRating"))+" \n                            "+t._s(t.product.reviews.middleRating)+"\n                        ")]),t._v(" "),i("v-rating",{attrs:{value:t.product.reviews.middleRating},scopedSlots:t._u([{key:"activeLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-small",width:"12",height:"12"}})]},proxy:!0},{key:"inactiveLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-empty-small",width:"12",height:"12"}})]},proxy:!0}])})],1),t._v(" "),i("div",{staticClass:"product-view__reviews-header-sort"},[t._v("\n                        Сначала новые "),i("v-svg",{attrs:{name:"arrow-down",width:"12",height:"12"}})],1)]),t._v(" "),i("ul",{staticClass:"product-view__reviews-list"},t._l(t.product.reviews.items,(function(e){return i("product-review-card",t._b({key:e.id,staticClass:"product-view__reviews-list-item",attrs:{tag:"li"}},"product-review-card",e,!1))})),1),t._v(" "),i("div",{staticClass:"product-view__reviews-show-more"},[i("v-button",{staticClass:"btn--outline product-view__reviews-show-more-btn"},[t._v("\n                        "+t._s(t.$t("product.reviews.showAll"))+"\n                    ")])],1)])])]),t._v(" "),i("section",{staticClass:"section product-view__section product-view__banners"},[i("div",{staticClass:"container product-view__banners-container"},[i("h2",{staticClass:"product-view__section-hl product-view__banners-hl"},[t._v("\n                "+t._s(t.$t("product.title.compilations"))+"\n            ")]),t._v(" "),i("div",{staticClass:"product-view__banners-grid"},t._l(t.banners,(function(t){return i("banner-card",{key:t.id,staticClass:"product-view__banners-card",attrs:{image:t.image,title:t.title,"button-text":t.btnText}})})),1)])]),t._v(" "),i("section",{staticClass:"section product-view__section product-view__like"},[i("div",{staticClass:"container product-view__like-container"},[i("h2",{staticClass:"product-view__section-hl product-view__like-hl"},[t._v(t._s(t.$t("product.title.like")))]),t._v(" "),i("v-slider",{staticClass:"product-view__like-slider",attrs:{name:"also-like",options:t.sliderOptions}},t._l(t.featuredProducts.items,(function(t){return i("catalog-product-card",{key:t.id,staticClass:"swiper-slide product-view__like-card",attrs:{"product-id":t.id,name:t.name,type:t.type,href:t.href,image:t.image,price:t.price,"old-price":t.oldPrice,tags:t.tags,rating:t.rating}})})),1)],1)]),t._v(" "),i("section",{staticClass:"section product-view__section product-view__instagram"},[i("div",{staticClass:"container product-view__instagram-container"},[i("h2",{staticClass:"product-view__section-hl product-view__instagram-hl"},[t._v(t._s(t.$t("product.title.instagram")))]),t._v(" "),t.isTabletLg?i("v-slider",{staticClass:"product-view__instagram-slider",attrs:{name:"instagram",options:t.instagramOptions}},t._l(t.instagramItems,(function(t){return i("instagram-card",{key:t.id,staticClass:"swiper-slide product-view__instagram-card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1):t._e(),t._v(" "),t.isTabletLg?t._e():i("div",{staticClass:"product-view__instagram-grid product-view__instagram-grid--initialized"},t._l(t.instagramItems,(function(t){return i("instagram-card",{key:t.id,staticClass:"product-view__instagram-card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1),t._v(" "),i("div",{staticClass:"text-grey product-view__instagram-note"},[t._v("\n                Добавь тег @bessovestnotalantlivy в Instagram и, возможно, мы опубликуем твою фотографию\n            ")]),t._v(" "),i("v-button",{staticClass:"btn--outline product-view__section-link product-view__instagram-link"},[t._v("\n                "+t._s(t.$t("landing.subscribe"))+"\n            ")])],1)]),t._v(" "),i("section",{staticClass:"section product-view__section product-view__history"},[i("div",{staticClass:"container product-view__history-container"},[i("h2",{staticClass:"product-view__section-hl"},[t._v(t._s(t.$t("product.title.history")))]),t._v(" "),i("div",{staticClass:"product-view__history-grid"},t._l(t.featuredProducts.items.slice(0,6),(function(t){return i("catalog-product-card",{key:t.id,staticClass:"product-view__history-card",attrs:{"product-id":t.id,type:t.type,name:t.name,href:t.href,image:t.image,price:t.price,"old-price":t.oldPrice,tags:t.tags,rating:t.rating}})})),1)])])])}),[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"product-view__header-detail-section"},[i("p",[t._v("Получить в "),i("a",{attrs:{href:"#"}},[t._v("г. Москва")])]),t._v(" "),i("p",[t._v("Экспресс доставка курьером — 550 ₽, сегодня, 21 июня")]),t._v(" "),i("p",[t._v("Доставка курьером — 350 ₽, завтра, 22 июня")]),t._v(" "),i("p",[t._v("Из пунктов "),i("a",{attrs:{href:"#"}},[t._v("выдачи")]),t._v(" или "),i("a",{attrs:{href:"#"}},[t._v("постаматов")]),t._v(" — бесплатно, 23 июня")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"product-view__header-detail-section"},[e("p",{staticClass:"text-bold"},[this._v("\n                        Описание и характеристики\n                    ")]),this._v(" "),e("p",[this._v("\n                        Двадцать три насыщенных, ярких оттенка помады воплощают в себе современную интерпретацию\n                        классики от Тома Форда. Редкое экзотическое масло муру-муру из Бразилии и масло цветков\n                        ромашки создают кремовую текстуру и обеспечивают...\n                    ")]),this._v(" "),e("a",{attrs:{href:"#"}},[this._v("Подробнее")])])}],!1,null,null,null);e.default=et.exports},VHxD:function(t,e,i){},ZC74:function(t,e,i){},lEig:function(t,e,i){},s8km:function(t,e,i){}}]);