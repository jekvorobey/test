(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{UTL2:function(t,e,i){"use strict";i.r(e);var r=i("NDiG"),a=i("7cXU"),s=i("i2Ud"),n=i("ze5i"),c=(i("VHxD"),{name:"v-html",props:["component"]}),o=i("KHd+"),l=Object(o.a)(c,(function(){var t=this.$createElement;return(this._self._c||t)(this.component||"div",{tag:"component",staticClass:"v-html"})}),[],!1,null,null,null).exports,d=i("YSwA"),u=i("jYNS"),p=i("VgBE"),v=i("AlLH"),_=(i("ZC74"),{name:"price",props:{value:{type:Number,required:!0},currency:{type:String,required:!0},type:{type:String}},computed:{currencySymbol:function(){return v.currencySymbol[this.currency]},computedValue:function(){return Object(p.c)(this.value)}}}),f=Object(o.a)(_,(function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"price"},[this._v("\n    "+this._s(this.value)+"\n     "),e("span",{domProps:{innerHTML:this._s(this.currencySymbol)}})])}),[],!1,null,null,null).exports,b=i("ENRa"),m=i("eOVz"),g=i("7bnD"),h=(i("fB3W"),i("/Q9p")),w=(i("LqtR"),i("nhva"),i("CxEY"),i("4BeY")),C=i.n(w),y=i("IaFt"),k=i.n(y),O=new C.a({id:"icon-like",use:"icon-like-usage",viewBox:"0 0 22 21",content:'<symbol viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg" id="icon-like">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 21.0001L16.5701 20.9998L16.6288 21.0001C16.9664 21.0028 17.8103 21.0096 18.6498 20.4918C19.5791 19.9185 20.3155 18.8376 20.6613 17.0201C21.3802 13.2409 21.7532 11.1034 21.912 10.0104C21.9141 9.99579 21.9182 9.97404 21.9235 9.9459C21.9773 9.6585 22.1556 8.70619 21.6659 7.86291C21.0681 6.83333 19.788 6.33335 17.8136 6.33335H14.0817C14.1785 5.9098 14.2975 5.37505 14.377 4.82986C14.4848 4.09057 14.5423 3.20623 14.3395 2.39145C14.1256 1.53181 13.6058 0.711156 12.5849 0.288079C11.8909 0.000464246 11.2082 0.132958 10.684 0.427054C10.1759 0.712113 9.77758 1.16296 9.52221 1.64068C8.42854 3.68653 6.73802 6.42071 5.28637 7.89944C5.25518 7.93121 5.22633 7.96484 5.19991 8.00007H3C1.34315 8.00006 -7.24234e-08 9.34321 0 11.0001L3.0598e-07 18.0001C3.78403e-07 19.6569 1.34315 21.0001 3 21.0001ZM7 18.9996L7 8.99808C8.58105 7.2713 10.2417 4.53714 11.286 2.58356C11.3913 2.38659 11.5386 2.24088 11.6626 2.17127C11.7664 2.11307 11.8036 2.12902 11.8176 2.13503L11.8192 2.13571C12.1269 2.26321 12.3013 2.48303 12.3987 2.8744C12.5073 3.31063 12.4932 3.88783 12.3979 4.54126C12.3246 5.04409 12.2164 5.51729 12.1175 5.94978C12.0887 6.0757 12.0608 6.19818 12.0346 6.31692C11.9833 6.55022 11.9259 6.82695 11.9127 7.05861C11.907 7.15729 11.8986 7.3805 11.9834 7.61577C12.0307 7.74719 12.1267 7.93729 12.3213 8.09527C12.5309 8.26537 12.7748 8.33335 12.9951 8.33335L17.8136 8.33335C19.5697 8.33335 19.8896 8.78675 19.9363 8.86718C20.0342 9.03575 20.0062 9.22561 19.949 9.6124L19.9328 9.72278C19.781 10.7673 19.4157 12.8653 18.6965 16.6463C18.4213 18.0932 17.9142 18.5956 17.5998 18.7895C17.2585 19.0001 16.9217 18.9999 16.5956 18.9998L7 18.9996ZM4.99997 10.0001H3C2.44772 10.0001 2 10.4478 2 11.0001L2 18.0001C2 18.5523 2.44772 19.0001 3 19.0001H4.99997L4.99997 10.0001ZM13.9094 7.17235L13.9098 7.16716C13.9098 7.18253 13.9087 7.18546 13.9094 7.17235Z" />\n</symbol>'}),P=(k.a.add(O),new C.a({id:"icon-dislike",use:"icon-dislike-usage",viewBox:"0 0 22 21",content:'<symbol viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg" id="icon-dislike">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43006 -0.000186344L5.37131 -0.00051822C5.03371 -0.00323045 4.18985 -0.0100092 3.35036 0.507813C2.42104 1.08105 1.68459 2.16196 1.33885 3.97951C0.619972 7.75868 0.246952 9.89619 0.088107 10.9891C0.0859749 11.0038 0.0818902 11.0256 0.0766041 11.0539C0.0228036 11.3413 -0.155432 12.2934 0.33422 13.1367C0.932045 14.1662 2.21208 14.6662 4.18653 14.6662H7.91839C7.82163 15.0898 7.70267 15.6245 7.62317 16.1697C7.51536 16.909 7.45784 17.7934 7.66059 18.6081C7.8745 19.4678 8.3943 20.2884 9.41521 20.7115C10.1092 20.9991 10.792 20.8666 11.3161 20.5725C11.8242 20.2875 12.2225 19.8366 12.4779 19.3589C13.5716 17.313 15.2621 14.5789 16.7138 13.1001C16.7449 13.0684 16.7738 13.0347 16.8002 12.9995H19.0001C20.657 12.9995 22.0001 11.6564 22.0001 9.99951L22.0001 2.99951C22.0001 1.34266 20.657 -0.000490278 19.0001 -0.000490205L5.43006 -0.000186344ZM17.0001 10.9995L17.0002 1.99951H19.0001C19.5524 1.99951 20.0001 2.44723 20.0001 2.99951L20.0001 9.99951C20.0001 10.5518 19.5524 10.9995 19.0001 10.9995L17.0001 10.9995ZM15.0001 1.99994L5.40448 1.99981C5.07841 1.99966 4.74163 1.99951 4.40034 2.21003C4.08594 2.40396 3.57886 2.90633 3.30362 4.35325C2.58438 8.1343 2.21911 10.2323 2.06731 11.2768L2.0511 11.3872C1.99396 11.774 1.96592 11.9638 2.06379 12.1324C2.1105 12.2128 2.4304 12.6662 4.18653 12.6662L9.00505 12.6662C9.22534 12.6662 9.46926 12.7342 9.67879 12.9043C9.87338 13.0623 9.96939 13.2524 10.0168 13.3838C10.1015 13.6191 10.0931 13.8423 10.0875 13.941C10.0743 14.1726 10.0168 14.4494 9.96549 14.6827C9.93937 14.8014 9.91138 14.9239 9.8826 15.0498C9.78373 15.4823 9.67556 15.9555 9.60223 16.4583C9.50695 17.1118 9.49285 17.6889 9.6014 18.1252C9.69879 18.5165 9.87321 18.7364 10.1809 18.8639L10.1825 18.8645C10.1965 18.8706 10.2338 18.8865 10.3375 18.8283C10.4616 18.7587 10.6088 18.613 10.7141 18.416C11.7585 16.4624 13.4191 13.7283 15.0001 12.0015L15.0001 1.99994ZM8.0907 13.8272L8.09035 13.8324C8.0903 13.817 8.09144 13.8141 8.0907 13.8272Z" />\n</symbol>'})),T=(k.a.add(P),i("s8km"),{name:"product-review-card",components:{VSvg:r.a,VLink:a.a,VRating:g.a},props:{tag:{type:String,default:"div"},name:{type:String},date:{type:String},rating:{type:Number},likes:{type:Number},dislikes:{type:Number},advantage:{type:String},disadvantage:{type:String},comment:{type:String},images:{type:Array},options:{type:Array}},data:function(){return{}},computed:{},methods:{}}),S=Object(o.a)(T,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i(t.tag,{tag:"component",staticClass:"product-review-card"},[i("div",{staticClass:"product-review-card__header"},[i("h4",{staticClass:"product-review-card__header-name"},[t._v("\n            "+t._s(t.name)+" "),i("span",{staticClass:"text-grey text-sm product-review-card__header-date"},[t._v(t._s(t.date))])]),t._v(" "),i("v-rating",{staticClass:"product-review-card__header-rating",attrs:{value:t.rating},scopedSlots:t._u([{key:"activeLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-small",width:"12",height:"12"}})]},proxy:!0},{key:"inactiveLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-empty-small",width:"12",height:"12"}})]},proxy:!0}])})],1),t._v(" "),i("div",{staticClass:"product-review-card__body"},[i("div",{staticClass:"product-review-card__body-item"},[i("div",{staticClass:"text-bold product-review-card__body-item-title"},[t._v("Достоинства")]),t._v(" "),i("div",{staticClass:"product-review-card__body-item-value"},[t._v(t._s(t.advantage))])]),t._v(" "),i("div",{staticClass:"product-review-card__body-item"},[i("div",{staticClass:"text-bold product-review-card__body-item-title"},[t._v("Недостатки")]),t._v(" "),i("div",{staticClass:"product-review-card__body-item-value"},[t._v(t._s(t.disadvantage))])])]),t._v(" "),i("div",{staticClass:"product-review-card__controls"},[i("button",{staticClass:"product-review-card__controls-btn"},[i("v-svg",{attrs:{id:"product-review-card-like",name:"like",width:"22",height:"21"}}),t._v("\n             "+t._s(t.likes)+"\n        ")],1),t._v(" "),i("button",{staticClass:"product-review-card__controls-btn"},[i("v-svg",{attrs:{id:"product-review-card-dislike",name:"dislike",width:"22",height:"21"}}),t._v("\n             "+t._s(t.dislikes)+"\n        ")],1)])])}),[],!1,null,null,null).exports,x=i("OvCi"),E=(i("iHux"),i("Z1Mg"),{name:"product-price-panel",components:{VSvg:r.a,VButton:s.a,VPicture:u.a,Price:f},props:{name:{type:String},image:{type:[String,Object]},price:{type:Object},oldPrice:{type:Object},bonus:{type:[String,Number]}},computed:{computedBonus:function(){return Object(p.c)(this.bonus)},isTablet:function(){return this.$mq.tablet}},methods:{generateSourcePath:function(t,e,i,r){return Object(x.a)(t,e,i,r)},onWishlistBtnClick:function(){this.$emit("addWishlist")},onBuyBtnClick:function(){this.$emit("addItem")}}}),A=Object(o.a)(E,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"product-price-panel"},[i("div",{staticClass:"container product-price-panel__container"},[t.image?i("div",{staticClass:"product-price-panel__img"},[i("v-picture",{attrs:{image:t.image,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var r=e.image;e.lazy;return[i("source",{attrs:{"data-srcset":t.generateSourcePath(56,56,r.id,"webp"),type:"image/webp"}})]}},{key:"fallback",fn:function(e){var r=e.image,a=(e.lazy,e.alt);return[i("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(56,56,r.id,r.sourceExt),alt:a}})]}}],null,!1,1125443553)})],1):t._e(),t._v(" "),i("div",{staticClass:"text-medium product-price-panel__name"},[t._v(t._s(t.name))]),t._v(" "),i("div",[i("price",{staticClass:"text-bold product-price-panel__price",attrs:{value:t.price.value,currency:t.price.currency}}),t._v(" "),t.oldPrice?i("price",{staticClass:"text-grey text-sm text-strike product-price-panel__price",attrs:{value:t.oldPrice.value,currency:t.oldPrice.currency}}):t._e(),t._v(" "),t.bonus?i("div",{staticClass:"text-grey text-sm product-price-panel__bonus"},[t._v("\n                + "+t._s(t.computedBonus)+" бонусов\n            ")]):t._e()],1),t._v(" "),i("v-button",{staticClass:"product-price-panel__btn",class:{"btn--outline":!t.isTablet},on:{click:function(e){return e.preventDefault(),t.onBuyBtnClick(e)}}},[t._v("\n            В корзину\n        ")])],1)])}),[],!1,null,null,null).exports,R=i("Kw5r"),$=i("hf7O");R.default.use($);var L,j=i("L2JU"),D=i("Q2AE"),I=i("BZIu"),V=i("Nlzp");function B(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var H,M=(B(L={},"SET_PRODUCT",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.productCode=e.code,t.product=e})),B(L,"SET_BANNERS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.banners=e})),B(L,"SET_FEATURED_PRODUCTS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.featuredProducts=e})),B(L,"SET_INSTAGRAM_ITEMS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.instagramItems=e})),L);function N(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var U,F=(N(H={},"FETCH_PRODUCT",(function(t,e){var i=t.commit;return Object(V.s)(e).then((function(t){return i("SET_PRODUCT",t)})).catch((function(t){return I.$logger.error("".concat("FETCH_PRODUCT"," ").concat(t)),{}}))})),N(H,"FETCH_FEATURED_PRODUCTS",(function(t,e){var i=t.commit;return Object(V.t)(e).then((function(t){return i("SET_FEATURED_PRODUCTS",t)})).catch((function(t){return I.$logger.error("".concat("FETCH_FEATURED_PRODUCTS"," ").concat(t)),{}}))})),N(H,"FETCH_BANNERS",(function(t,e){var i=t.commit;return Object(V.l)(e).then((function(t){return i("SET_BANNERS",t.slice(3,6))})).catch((function(t){return I.$logger.error("".concat("FETCH_BANNERS"," ").concat(t)),[]}))})),N(H,"FETCH_INSTAGRAM_ITEMS",(function(t,e){var i=t.commit;return Object(V.r)(e).then((function(t){return i("SET_INSTAGRAM_ITEMS",t.slice(0,4))})).catch((function(t){return I.$logger.error("".concat("FETCH_INSTAGRAM_ITEMS"," ").concat(t)),[]}))})),N(H,"FETCH_PRODUCT_DATA",(function(t,e){var i=t.dispatch;return Promise.all([i("FETCH_PRODUCT",e),i("FETCH_BANNERS",e),i("FETCH_FEATURED_PRODUCTS",e),i("FETCH_INSTAGRAM_ITEMS",e)])})),H);i("W6hq");function z(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var Z,q="product",G={name:q,namespaced:!0,state:(U={},z(U,"featuredProducts",{items:[],range:0}),z(U,"instagramItems",[]),z(U,"banners",[]),z(U,"product",{}),z(U,"productCode",""),U),actions:F,mutations:M,getters:{}},W=i("8TZ/"),Y=i("0CxO"),J=i("SqwP"),K=i("sEfC"),Q=i.n(K),X=i.p+"images/brandProduct1.31197c0e72e383fdda1a.png";i("L52N"),i("2+mq"),i("hLqd"),i("PnIt"),i("lEig");function tt(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function et(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?tt(Object(i),!0).forEach((function(e){it(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):tt(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function it(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var rt={spaceBetween:8,slidesPerView:1.5,slidesOffsetBefore:24,slidesOffsetAfter:24,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:it({},v.breakpoints.tablet-1,{slidesPerView:1,spaceBetween:0,slidesOffsetBefore:0,slidesOffsetAfter:0,pagination:{el:".swiper-pagination",type:"bullets"}})},at={spaceBetween:24,slidesPerView:4,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:(Z={},it(Z,v.breakpoints.tabletLg-1,{slidesPerView:3.5,slidesOffsetBefore:24,slidesOffsetAfter:24}),it(Z,v.breakpoints.tablet-1,{slidesPerView:2,spaceBetween:12,slidesOffsetBefore:0,slidesOffsetAfter:0}),Z)},st={spaceBetween:24,slidesOffsetBefore:24,slidesOffsetAfter:24,slidesPerView:3.5,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:it({},v.breakpoints.tablet-1,{slidesPerView:1.5,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16})},nt={name:"product",components:{VSvg:r.a,VButton:s.a,VLink:a.a,VRating:g.a,VSticky:n.a,VHtml:l,VSlider:d.a,VPicture:u.a,Price:f,CatalogProductCard:h.a,ProductReviewCard:S,BannerCard:b.a,InstagramCard:m.a,ProductPricePanel:A},data:function(){return{isPriceVisible:!0,mockImg:X}},computed:et({},Object(j.d)([D.d]),{},Object(j.d)("route",{code:function(t){return t.params.code}}),{},Object(j.d)(q,["product","banners","featuredProducts","instagramItems"]),{},Object(j.d)(J.a,[J.b]),{productGalleryOptions:function(){return rt},sliderOptions:function(){return at},instagramOptions:function(){return st},pricePanelAnimation:function(){return this.isTablet?"slide-bottom":"slide-top"},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:it({},J.b,(function(t){this.product.productCode,t.fias_id;this.debounce_fetchProduct(to,from)})),methods:et({},Object(j.b)(q,["FETCH_PRODUCT_DATA"]),{},Object(j.b)(W.c,[Y.a]),{generateSourcePath:function(t,e,i,r){return Object(x.a)(t,e,i,r)},onPriceVisibilityChanged:function(t){this.isPriceVisible=t}}),beforeRouteEnter:function(t,e,i){var r=t.params.code;!!I.$store._modulesNamespaceMap["".concat(G.name,"/")]||I.$store.registerModule(G.name,G,{preserveState:!!I.$store.state.product});var a=I.$store.state.product.productCode,s=I.$store.state.geolocation.selectedCity.fias_id;a===r?i():(I.$progress.start(),I.$store.dispatch("".concat(q,"/").concat("FETCH_PRODUCT_DATA"),{code:r,city:s}).then((function(){return i((function(t){return I.$progress.finish()}))})).catch((function(t){I.$progress.fail(),I.$logger.error(t)})))},beforeRouteUpdate:function(t,e,i){var r=this.selectedCity.fias_id,a=t.params.code;this.debounce_fetchProduct(a,r,i)},beforeMount:function(){var t=this;this.debounce_fetchProduct=Q()((function(e,i,r){var a;return regeneratorRuntime.async((function(s){for(;;)switch(s.prev=s.next){case 0:if(s.prev=0,a=t.product.productCode,t.$progress.start(),a===e){s.next=8;break}return s.next=6,regeneratorRuntime.awrap(t.FETCH_PRODUCT_DATA({code:e,city:i}));case 6:s.next=10;break;case 8:return s.next=10,regeneratorRuntime.awrap(Promise.resolve());case 10:r(),t.$progress.finish(),s.next=19;break;case 14:s.prev=14,s.t0=s.catch(0),I.$logger.error("debounce_fetchProduct",s.t0),r(!1),t.$progress.fail();case 19:case"end":return s.stop()}}),null,null,[[0,14]])}),500)}},ct=Object(o.a)(nt,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"section product-view"},[i("div",{staticClass:"container"},[i("transition-group",{staticClass:"section product-view__breadcrumbs",attrs:{tag:"ol",name:"fade-in"}},[i("li",{key:"main",staticClass:"product-view__breadcrumbs-item"},[i("router-link",{staticClass:"product-view__breadcrumbs-link",attrs:{to:"/"}},[t._v("\n                    Главная\n                ")])],1),t._v(" "),i("li",{key:"all",staticClass:"product-view__breadcrumbs-item"},[i("router-link",{staticClass:"product-view__breadcrumbs-link",attrs:{to:"/catalog"}},[t._v("\n                    Каталог\n                ")])],1),t._v(" "),t._l(t.product.categoryCodes,(function(e){return i("li",{key:e.code,staticClass:"product-view__breadcrumbs-item"},[i("router-link",{staticClass:"product-view__breadcrumbs-link",attrs:{to:"/catalog/"+e.code}},[t._v("\n                    "+t._s(e.name)+"\n                ")])],1)}))],2)],1),t._v(" "),i("section",{staticClass:"section"},[i("div",{staticClass:"container product-view__header"},[i("v-sticky",{staticClass:"product-view__header-sticky",scopedSlots:t._u([{key:"sticky",fn:function(){return[t.isTabletLg?i("v-slider",{staticClass:"product-view__header-gallery",attrs:{name:"gallery",options:t.productGalleryOptions}},t._l(t.product.media,(function(e){return i("div",{key:e.id,staticClass:"swiper-slide product-view__header-gallery-item"},[e&&e.id?i("v-picture",{attrs:{image:e,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var r=e.image;e.lazy;return[i("source",{attrs:{"data-srcset":t.generateSourcePath(300,300,r.id,"webp"),type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),i("source",{attrs:{"data-srcset":t.generateSourcePath(200,200,r.id,"webp"),type:"image/webp",media:"(max-width: 479px)"}})]}},{key:"fallback",fn:function(e){var r=e.image,a=(e.lazy,e.alt);return[i("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(300,300,r.id,r.sourceExt),alt:a}})]}}],null,!0)}):t._e()],1)})),0):i("div",{staticClass:"product-view__header-gallery"},t._l(t.product.media,(function(e){return i("div",{key:e.id,staticClass:"product-view__header-gallery-item"},[e&&e.id?i("v-picture",{attrs:{image:e,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var r=e.image;e.lazy;return[i("source",{attrs:{"data-srcset":t.generateSourcePath(300,300,r.id,"webp"),type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),i("source",{attrs:{"data-srcset":t.generateSourcePath(200,200,r.id,"webp"),type:"image/webp",media:"(max-width: 479px)"}})]}},{key:"fallback",fn:function(e){var r=e.image,a=(e.lazy,e.alt);return[i("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(300,300,r.id,r.sourceExt),alt:a}})]}}],null,!0)}):t._e()],1)})),0)]},proxy:!0}])}),t._v(" "),i("div",{staticClass:"product-view__header-detail"},[i("h1",{staticClass:"product-view__header-detail-hl"},[t._v("\n                    "+t._s(t.product.title)+"\n                ")]),t._v(" "),i("div",{staticClass:"product-view__header-detail-info"},[i("v-rating",{staticClass:"product-view__header-detail-info-rating",attrs:{value:t.product.rating},scopedSlots:t._u([{key:"activeLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-small",width:"12",height:"12"}})]},proxy:!0},{key:"inactiveLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-empty-small",width:"12",height:"12"}})]},proxy:!0}])}),t._v(" "),i("div",{staticClass:"text-grey product-view__header-detail-info-review"},[t._v("\n                        "+t._s(t.$t("product.review",{n:t.product.reviewsCount}))+"\n                    ")]),t._v(" "),i("div",{staticClass:"text-grey product-view__header-detail-info-code"},[t._v("\n                        "+t._s(t.$t("product.vendorCode",{code:t.product.vendorCode}))+"\n                    ")])],1),t._v(" "),i("div",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:t.onPriceVisibilityChanged,expression:"onPriceVisibilityChanged"}],staticClass:"product-view__header-detail-section product-view__header-detail-panels"},[i("div",{staticClass:"product-view__header-detail-price-panel"},[i("div",{staticClass:"product-view__header-detail-price-panel-prices"},[i("price",{staticClass:"text-bold product-view__header-detail-price-panel-current",attrs:{value:t.product.price.value,currency:t.product.price.currency}}),t._v(" "),t.product.oldPrice?i("price",{staticClass:"text-grey text-strike product-view__header-detail-price-panel-old",attrs:{value:t.product.oldPrice.value,currency:t.product.oldPrice.currency}}):t._e()],1),t._v(" "),i("div",{staticClass:"text-grey product-view__header-detail-price-panel-bonus"},[t._v("\n                            +"+t._s(t.$t("product.bonus",{n:t.product.bonus}))+"\n                        ")])]),t._v(" "),i("div",{staticClass:"product-view__header-detail-control-panel"},[i("v-button",{staticClass:"product-view__header-detail-control-panel-btn",on:{click:function(e){return e.preventDefault(),t.ADD_CART_ITEM({offerId:t.product.id})}}},[t._v("\n                            Добавить в корзину\n                        ")]),t._v(" "),i("v-link",{staticClass:"product-view__header-detail-control-panel-wishlist"},[i("v-svg",{attrs:{id:"product-wishlist",name:"wishlist-middle",width:"20",height:"18"}}),t._v("\n                             В избранное\n                        ")],1)],1)]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t.product.brand?i("div",{staticClass:"product-view__header-detail-section"},[i("span",[t.product.brand.image&&t.product.brand.image.id?i("v-picture",{attrs:{image:t.product.brand.image,alt:""},scopedSlots:t._u([{key:"source",fn:function(e){var r=e.image;e.lazy;return[i("source",{attrs:{"data-srcset":t.generateSourcePath(120,24,r.id,"webp"),type:"image/webp"}})]}},{key:"fallback",fn:function(e){var r=e.image,a=(e.lazy,e.alt);return[i("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.generateSourcePath(120,24,r.id,r.sourceExt),alt:a}})]}}],null,!1,2871185697)}):t._e(),t._v(" "),i("router-link",{attrs:{to:{path:"/brand/"+t.product.brand.code}}},[t._v("На страницу бренда")])],1)]):t._e()])],1)]),t._v(" "),i("section",{staticClass:"section product-view__section"},[i("div",{staticClass:"container product-view__socials"},[i("div",{staticClass:"product-view__socials-inner"},[i("span",{staticClass:"text-bold"},[t._v("Поделиться")]),t._v(" \n                "),i("div",[i("v-svg",{attrs:{name:"vkontakte-bw",width:"22",height:"22"}}),t._v(" "),i("v-svg",{attrs:{name:"facebook-bw",width:"22",height:"22"}}),t._v(" "),i("v-svg",{attrs:{name:"instagram-bw",width:"22",height:"22"}})],1)])])]),t._v(" "),t.product.profitable?i("section",{staticClass:"section product-view__section"},[i("div",{staticClass:"container product-view__profitable"},[i("h2",{staticClass:"product-view__section-hl product-view__profitable-hl"},[t._v("\n                "+t._s(t.$t("product.title.profitable"))+"\n            ")]),t._v(" "),i("div",{staticClass:"product-view__profitable-grid"},[i("ul",{staticClass:"product-view__profitable-list"},t._l(t.product.profitable.items,(function(e){return i("li",{key:e.id,staticClass:"product-view__profitable-list-item"},[i("catalog-product-card",{staticClass:"product-view__profitable-card",attrs:{"product-id":e.id,name:e.name,href:"/catalog/"+e.categoryCodes[e.categoryCodes.length-1]+"/"+e.code,image:e.image,price:e.price,"old-price":e.oldPrice,tags:e.tags,rating:e.rating,isSmall:t.isTabletLg}})],1)})),0),t._v(" "),i("div",{staticClass:"product-view__profitable-total"}),t._v(" "),i("div",{staticClass:"product-view__profitable-price-panel"},[i("div",{staticClass:"product-view__profitable-price-panel-prices"},[i("div",{staticClass:"text-bold product-view__profitable-price-panel-price"},[t._v("\n                            "+t._s(t.product.profitable.price)+" ₽\n                        ")]),t._v(" "),i("div",{staticClass:"text-grey text-strike product-view__profitable-price-panel-old"},[t._v("\n                            "+t._s(t.product.profitable.oldPrice)+" ₽\n                        ")])]),t._v(" "),i("div",{staticClass:"text-grey product-view__profitable-price-panel-profit"},[t._v("\n                        Вы сэкономите "+t._s(t.product.profitable.oldPrice-t.product.profitable.price)+" ₽\n                    ")]),t._v(" "),i("v-button",{staticClass:"product-view__profitable-price-panel-btn"},[t._v("Добавить в корзину")])],1)])])]):t._e(),t._v(" "),t.product.description?i("section",{staticClass:"section product-view__section product-view__info"},[i("div",{staticClass:"container product-view__info-container"},[i("div",{staticClass:"product-view__info-header"},[i("h2",{staticClass:"product-view__section-hl"},[t._v(t._s(t.$t("product.title.description")))]),t._v(" "),i("v-html",{staticClass:"product-view__info-text",domProps:{innerHTML:t._s(t.product.description.content)}})],1)])]):t._e(),t._v(" "),t.product.howto?i("section",{staticClass:"section product-view__info"},[i("div",{staticClass:"container product-view__info-container"},[i("div",{staticClass:"product-view__info-header"},[i("h2",{staticClass:"product-view__section-hl"},[t._v(t._s(t.$t("product.title.method")))]),t._v(" "),i("v-html",{staticClass:"product-view__info-text",domProps:{innerHTML:t._s(t.product.howto.content)}})],1)])]):t._e(),t._v(" "),t.product.characteristics&&t.product.characteristics.length>0?i("section",{staticClass:"section product-view__section product-view__characteristics"},[i("div",{staticClass:"container"},[i("h2",{staticClass:"product-view__section-hl"},[t._v(t._s(t.$t("product.title.characteristics")))]),t._v(" "),i("ul",{staticClass:"product-view__characteristics-list"},t._l(t.product.characteristics,(function(e){return i("li",{key:e.id,staticClass:"product-view__characteristics-item"},[i("div",{staticClass:"product-view__characteristics-item-title"},[t._v(t._s(e.title))]),t._v(" "),i("div",{staticClass:"product-view__characteristics-item-value"},[t._v("\n                        "+t._s(Array.isArray(e.value)?e.value.join(", "):e.value)+"\n                    ")])])})),0)])]):t._e(),t._v(" "),t.product.masterClasses&&t.product.masterClasses.length>0?i("section",{staticClass:"section product-view__masterclass"},[i("div",{staticClass:"container product-view__masterclass-container"},[i("h2",{staticClass:"product-view__section-hl product-view__masterclass-hl"},[t._v("\n                "+t._s(t.$t("product.title.masterClasses"))+"\n            ")]),t._v(" "),i("ul",{staticClass:"product-view__masterclass-list"},t._l(t.product.masterClasses,(function(t){return i("li",{key:t.id,staticClass:"product-view__masterclass-item"},[i("img",{staticClass:"blur-up lazyload",attrs:{"data-src":t.image}})])})),0),t._v(" "),i("v-button",{staticClass:"btn--outline product-view__section-link product-view__masterclass-link"},[t._v("\n                "+t._s(t.$t("product.showAll"))+"\n            ")])],1)]):t._e(),t._v(" "),i("section",{staticClass:"section product-view__section"},[i("div",{staticClass:"container product-view__reviews"},[i("div",{staticClass:"product-view__reviews-inner"},[i("div",{staticClass:"product-view__reviews-header"},[i("h2",{staticClass:"product-view__section-hl product-view__reviews-header-hl"},[t._v("\n                        "+t._s(t.$t("product.title.reviews"))+"\n                        "),i("span",{staticClass:"text-grey product-view__reviews-header-hl-count"},[t._v("12")]),t._v(" "),i("v-button",{staticClass:"btn--outline product-view__section-link product-view__reviews-link"},[t._v("\n                            "+t._s(t.$t("product.reviews.makeReview"))+"\n                        ")])],1),t._v(" "),i("div",{staticClass:"product-view__section-header-rating"},[i("span",{staticClass:"product-view__reviews-header-rating-count"},[t._v("\n                            "+t._s(t.$t("product.reviews.averageRating"))+" \n                            "+t._s(t.product.reviews.middleRating)+"\n                        ")]),t._v(" "),i("v-rating",{attrs:{value:t.product.reviews.middleRating},scopedSlots:t._u([{key:"activeLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-small",width:"12",height:"12"}})]},proxy:!0},{key:"inactiveLabel",fn:function(){return[i("v-svg",{attrs:{name:"star-empty-small",width:"12",height:"12"}})]},proxy:!0}])})],1),t._v(" "),i("div",{staticClass:"product-view__reviews-header-sort"},[t._v("\n                        Сначала новые "),i("v-svg",{attrs:{name:"arrow-down",width:"12",height:"12"}})],1)]),t._v(" "),i("ul",{staticClass:"product-view__reviews-list"},t._l(t.product.reviews.items,(function(e){return i("product-review-card",t._b({key:e.id,staticClass:"product-view__reviews-list-item",attrs:{tag:"li"}},"product-review-card",e,!1))})),1),t._v(" "),i("div",{staticClass:"product-view__reviews-show-more"},[i("v-button",{staticClass:"btn--outline product-view__reviews-show-more-btn"},[t._v("\n                        "+t._s(t.$t("product.reviews.showAll"))+"\n                    ")])],1)])])]),t._v(" "),i("section",{staticClass:"section product-view__section product-view__banners"},[i("div",{staticClass:"container product-view__banners-container"},[i("h2",{staticClass:"product-view__section-hl product-view__banners-hl"},[t._v("\n                "+t._s(t.$t("product.title.compilations"))+"\n            ")]),t._v(" "),i("div",{staticClass:"product-view__banners-grid"},t._l(t.banners,(function(t){return i("banner-card",{key:t.id,staticClass:"product-view__banners-card",attrs:{image:t.image,title:t.title,"button-text":t.btnText}})})),1)])]),t._v(" "),i("section",{staticClass:"section product-view__section product-view__like"},[i("div",{staticClass:"container product-view__like-container"},[i("h2",{staticClass:"product-view__section-hl product-view__like-hl"},[t._v(t._s(t.$t("product.title.like")))]),t._v(" "),i("v-slider",{staticClass:"product-view__like-slider",attrs:{name:"also-like",options:t.sliderOptions}},t._l(t.featuredProducts.items,(function(e){return i("catalog-product-card",{key:e.id,staticClass:"swiper-slide product-view__like-card",attrs:{"product-id":e.id,name:e.name,type:e.type,href:"/catalog/"+e.categoryCodes[e.categoryCodes.length-1]+"/"+e.code,image:e.image,price:e.price,"old-price":e.oldPrice,tags:e.tags,rating:e.rating},on:{addItem:function(i){return t.ADD_CART_ITEM({offerId:e.id})}}})})),1)],1)]),t._v(" "),i("section",{staticClass:"section product-view__section product-view__instagram"},[i("div",{staticClass:"container product-view__instagram-container"},[i("h2",{staticClass:"product-view__section-hl product-view__instagram-hl"},[t._v(t._s(t.$t("product.title.instagram")))]),t._v(" "),t.isTabletLg?i("v-slider",{staticClass:"product-view__instagram-slider",attrs:{name:"instagram",options:t.instagramOptions}},t._l(t.instagramItems,(function(t){return i("instagram-card",{key:t.id,staticClass:"swiper-slide product-view__instagram-card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1):t._e(),t._v(" "),t.isTabletLg?t._e():i("div",{staticClass:"product-view__instagram-grid product-view__instagram-grid--initialized"},t._l(t.instagramItems,(function(t){return i("instagram-card",{key:t.id,staticClass:"product-view__instagram-card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1),t._v(" "),i("div",{staticClass:"text-grey product-view__instagram-note"},[t._v("\n                Добавь тег @bessovestnotalantlivy в Instagram и, возможно, мы опубликуем твою фотографию\n            ")]),t._v(" "),i("v-button",{staticClass:"btn--outline product-view__section-link product-view__instagram-link"},[t._v("\n                "+t._s(t.$t("landing.subscribe"))+"\n            ")])],1)]),t._v(" "),i("section",{staticClass:"section product-view__section product-view__history"},[i("div",{staticClass:"container product-view__history-container"},[i("h2",{staticClass:"product-view__section-hl"},[t._v(t._s(t.$t("product.title.history")))]),t._v(" "),i("div",{staticClass:"product-view__history-grid"},t._l(t.featuredProducts.items.slice(0,6),(function(e){return i("catalog-product-card",{key:e.id,staticClass:"product-view__history-card",attrs:{"product-id":e.id,type:e.type,name:e.name,href:"/catalog/"+e.categoryCodes[e.categoryCodes.length-1]+"/"+e.code,image:e.image,price:e.price,"old-price":e.oldPrice,tags:e.tags,rating:e.rating},on:{addItem:function(i){return t.ADD_CART_ITEM({offerId:e.id})}}})})),1)])]),t._v(" "),i("transition",{attrs:{name:t.pricePanelAnimation,appear:""}},[t.scroll&&!t.isPriceVisible||t.isTablet?i("product-price-panel",{staticClass:"product-view__top-panel",attrs:{name:t.product.title,image:t.product.media&&t.product.media.length>0?t.product.media[0]:null,price:t.product.price,"old-price":t.product.oldPrice,bonus:t.product.bonus},on:{addItem:function(e){return t.ADD_CART_ITEM({offerId:t.product.id})}}}):t._e()],1)],1)}),[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"product-view__header-detail-section"},[i("p",[t._v("Получить в "),i("a",{attrs:{href:"#"}},[t._v("г. Москва")])]),t._v(" "),i("p",[t._v("Экспресс доставка курьером — 550 ₽, сегодня, 21 июня")]),t._v(" "),i("p",[t._v("Доставка курьером — 350 ₽, завтра, 22 июня")]),t._v(" "),i("p",[t._v("Из пунктов "),i("a",{attrs:{href:"#"}},[t._v("выдачи")]),t._v(" или "),i("a",{attrs:{href:"#"}},[t._v("постаматов")]),t._v(" — бесплатно, 23 июня")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"product-view__header-detail-section"},[e("p",{staticClass:"text-bold"},[this._v("\n                        Описание и характеристики\n                    ")]),this._v(" "),e("p",[this._v("\n                        Двадцать три насыщенных, ярких оттенка помады воплощают в себе современную интерпретацию\n                        классики от Тома Форда. Редкое экзотическое масло муру-муру из Бразилии и масло цветков\n                        ромашки создают кремовую текстуру и обеспечивают...\n                    ")]),this._v(" "),e("a",{attrs:{href:"#"}},[this._v("Подробнее")])])}],!1,null,null,null);e.default=ct.exports},VHxD:function(t,e,i){},Z1Mg:function(t,e,i){},ZC74:function(t,e,i){},hf7O:function(t,e,i){"use strict";i.r(e),function(t){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}i.d(e,"ObserveVisibility",(function(){return l})),i.d(e,"install",(function(){return d}));var n=function(){function t(e,i,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.observer=null,this.frozen=!1,this.createObserver(i,r)}var e,i,r;return e=t,(i=[{key:"createObserver",value:function(t,e){var i=this;if(this.observer&&this.destroyObserver(),!this.frozen){var r;if(this.options="function"==typeof(r=t)?{callback:r}:r,this.callback=function(t,e){i.options.callback(t,e),t&&i.options.once&&(i.frozen=!0,i.destroyObserver())},this.callback&&this.options.throttle){var a=(this.options.throttleOptions||{}).leading;this.callback=function(t,e){var i,r,a,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=function(c){for(var o=arguments.length,l=new Array(o>1?o-1:0),d=1;d<o;d++)l[d-1]=arguments[d];if(a=l,!i||c!==r){var u=n.leading;"function"==typeof u&&(u=u(c,r)),i&&c===r||!u||t.apply(void 0,[c].concat(s(a))),r=c,clearTimeout(i),i=setTimeout((function(){t.apply(void 0,[c].concat(s(a))),i=0}),e)}};return c._clear=function(){clearTimeout(i),i=null},c}(this.callback,this.options.throttle,{leading:function(t){return"both"===a||"visible"===a&&t||"hidden"===a&&!t}})}this.oldResult=void 0,this.observer=new IntersectionObserver((function(t){var e=t[0];if(t.length>1){var r=t.find((function(t){return t.isIntersecting}));r&&(e=r)}if(i.callback){var a=e.isIntersecting&&e.intersectionRatio>=i.threshold;if(a===i.oldResult)return;i.oldResult=a,i.callback(a,e)}}),this.options.intersection),e.context.$nextTick((function(){i.observer&&i.observer.observe(i.el)}))}}},{key:"destroyObserver",value:function(){this.observer&&(this.observer.disconnect(),this.observer=null),this.callback&&this.callback._clear&&(this.callback._clear(),this.callback=null)}},{key:"threshold",get:function(){return this.options.intersection&&this.options.intersection.threshold||0}}])&&a(e.prototype,i),r&&a(e,r),t}();function c(t,e,i){var r=e.value;if(r)if("undefined"==typeof IntersectionObserver)console.warn("[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill");else{var a=new n(t,r,i);t._vue_visibilityState=a}}function o(t){var e=t._vue_visibilityState;e&&(e.destroyObserver(),delete t._vue_visibilityState)}var l={bind:c,update:function(t,e,i){var a=e.value;if(!function t(e,i){if(e===i)return!0;if("object"===r(e)){for(var a in e)if(!t(e[a],i[a]))return!1;return!0}return!1}(a,e.oldValue)){var s=t._vue_visibilityState;a?s?s.createObserver(a,i):c(t,{value:a},i):o(t)}},unbind:o};function d(t){t.directive("observe-visibility",l)}var u={version:"0.4.6",install:d},p=null;"undefined"!=typeof window?p=window.Vue:void 0!==t&&(p=t.Vue),p&&p.use(u),e.default=u}.call(this,i("yLpj"))},lEig:function(t,e,i){},s8km:function(t,e,i){}}]);