(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{FIks:function(t,e,a){},NkcL:function(t,e,a){"use strict";var i=a("i2Ud"),r=a("jYNS"),n=a("aXGN"),s=a("2JJK"),o=(a("hqjE"),Object.freeze({WHITE:"white",BLACK:"black",OUTLINE_BLACK:"outline_black",OUTLINE_WHITE:"outline_white"})),c=Object.freeze({TOP:"top",BOTTOM:"bottom",LEFT:"left",RIGHT:"right",TOP_LEFT:"top_left",TOP_RIGHT:"top_right",BOTTOM_LEFT:"bottom_left",BOTTOM_RIGHT:"bottom_right"}),l={name:"catalog-banner-list-card",components:{VButton:i.a,VPicture:r.a},props:{item:{type:Object,default:function(){return{}}}},computed:{mobileImg:function(){var t=this.item.mobileImage||this.item.tabletImage||this.item.desktopImage;return Object(n.c)(320,320,t.id)},mobileWebpImg:function(){var t=this.item.mobileImage||this.item.tabletImage||this.item.desktopImage;return Object(n.c)(320,320,t.id,s.fileExtension.image.WEBP)},tabletImg:function(){var t=this.item.tabletImage||this.item.desktopImage;return Object(n.c)(472,360,t.id)},tabletWebpImg:function(){var t=this.item.tabletImage||this.item.desktopImage;return Object(n.c)(472,360,t.id,s.fileExtension.image.WEBP)},desktopImg:function(){var t=this.item.desktopImage||this.item.tabletImage;return Object(n.c)(600,432,t.id)},desktopWebpImg:function(){var t=this.item.desktopImage||this.item.tabletImage;return Object(n.c)(600,432,t.id,s.fileExtension.image.WEBP)},defaultImg:function(){var t=this.item.desktopImage||this.item.tabletImage||this.item.mobileImage.id;return Object(n.c)(600,432,t.id)},btnClasses:function(){var t=[];switch(this.item.button.type){case o.WHITE:t.push("btn--white");break;case o.OUTLINE_WHITE:t.push("btn--white"),t.push("btn--outline");break;case o.OUTLINE_BLACK:t.push("btn--outline")}return t},panelClasses:function(){var t=[];switch(this.item.button.location){case c.LEFT:t.push("catalog-banner-list-card__panel--left");break;case c.RIGHT:t.push("catalog-banner-list-card__panel--right");break;case c.TOP:t.push("catalog-banner-list-card__panel--top");break;case c.TOP_LEFT:t.push("catalog-banner-list-card__panel--top-left");break;case c.TOP_RIGHT:t.push("catalog-banner-list-card__panel--top-right");break;case c.BOTTOM:t.push("catalog-banner-list-card__panel--bottom");break;case c.BOTTOM_LEFT:t.push("catalog-banner-list-card__panel--bottom-left");break;case c.BOTTOM_RIGHT:t.push("catalog-banner-list-card__panel--bottom-right")}return t}}},u=a("KHd+"),m=Object(u.a)(l,(function(){var t=this.$createElement;return(this._self._c||t)("li",{staticClass:"catalog-banner-list-card"},[this._m(0),this._v(" "),this.item.button?this._m(1):this._e()])}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"catalog-banner-list-card__img"},[a("v-picture",[a("source",{attrs:{"data-srcset":t.desktopWebpImg,type:"image/webp",media:"(min-width: 1024px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.desktopImg,media:"(min-width: 1024px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.tabletWebpImg,type:"image/webp",media:"(min-width: 768px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.tabletImg,media:"(min-width: 768px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.mobileWebpImg,type:"image/webp",media:"(min-width: 320px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.mobileImg,media:"(min-width: 320px)"}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})])],1)},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"catalog-banner-list-card__panel",class:this.panelClasses},[e("v-button",{staticClass:"catalog-banner-list-card__panel-btn",class:this.btnClasses,attrs:{to:this.item.button.url||"/"}},[this._v("\n            "+this._s(this.item.button.text)+"\n        ")])],1)}],!1,null,null,null).exports,d=a("NDiG"),p=a("7cXU"),g=a("7bnD"),b=a("fB3W"),f=a("YNzt"),_=a("XIuL"),h=a("6Qq0"),v=a("L2JU"),y=a("Cv2f"),O=a("xm1V"),I=a("W6hq");a("nhva"),a("CxEY"),a("gB8C"),a("FIks");function C(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function w(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var T={name:"catalog-product-list-card",components:{VSvg:d.a,VLink:p.a,VRating:g.a,VPicture:r.a,Tag:b.a,Price:f.a,BuyButton:_.a,FavoritesButton:h.a},props:{item:{type:Object,default:function(){return{categoryCodes:[],tags:[],stocks:{qty:0}}}},isSmall:{type:Boolean,default:!1},showWishlistBtn:{type:Boolean,default:!0}},computed:function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?C(Object(a),!0).forEach((function(e){w(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):C(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},Object(v.c)(y.f,[O.b]),{inFavorites:function(){return this[O.b](this.item.productId)},showBuyBtn:function(){var t=this.item.stock,e=(t=void 0===t?{qty:0}:t).qty;return(void 0===e?0:e)>0},bigImg:function(){return Object(n.c)(300,300,this.item.image.id,s.fileExtension.image.WEBP)},smallImg:function(){return Object(n.c)(200,200,this.item.image.id,s.fileExtension.image.WEBP)},defaultImg:function(){return Object(n.c)(200,200,this.item.image.id)},href:function(){return Object(I.e)(this.item.categoryCodes[this.item.categoryCodes.length-1],this.item.code)}}),methods:{onBuyButtonClick:function(){this.$emit("add-item",{id:this.item.id,storeId:this.item.stock.storeId,type:this.item.type})},onToggleFavorite:function(){this.$emit("toggle-favorite-item",{productId:this.item.productId})},onPreview:function(){this.$emit("preview",{id:this.item.id,type:this.item.type})}}},k=Object(u.a)(T,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("router-link",{staticClass:"catalog-product-list-card",class:{"catalog-product-list-card--small":t.isSmall},attrs:{tag:"li",to:t.href}},[t._m(0),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),a("favorites-button",{staticClass:"catalog-product-list-card__wishlist-btn",class:{"catalog-product-list-card__wishlist-btn--active":t.inFavorites},attrs:{"is-active":t.inFavorites},on:{click:t.onToggleFavorite}})],1)}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"catalog-product-list-card__img"},[t.item.image&&t.item.image.id?a("v-picture",[a("source",{attrs:{"data-srcset":t.bigImg,type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),a("source",{attrs:{"data-srcset":t.smallImg,type:"image/webp",media:"(max-width: 479px)"}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImg,alt:""}})]):a("v-svg",{attrs:{id:"catalog-product-list-card-empty",name:"logo",width:"48",height:"48"}}),t._v(" "),a("div",{staticClass:"catalog-product-list-card__controls"},[t.showBuyBtn?a("buy-button",{staticClass:"btn--outline catalog-product-list-card__controls-btn",on:{click:function(e){return e.preventDefault(),t.onBuyButtonClick(e)}}},[t._v("\n                Купить\n            ")]):t._e(),t._v(" "),a("v-link",{staticClass:"catalog-product-list-card__controls-link",attrs:{tag:"button"},on:{click:function(e){return e.preventDefault(),t.onPreview(e)}}},[t._v("\n                Быстрый просмотр\n            ")])],1)],1)},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"catalog-product-list-card__rating"},t._l(5,(function(e){return a("span",{key:e,staticClass:"catalog-product-list-card__rating-star",class:{"catalog-product-list-card__rating-star--empty":e>t.item.rating}})})),0)},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"catalog-product-list-card__body"},[a("div",{staticClass:"catalog-product-list-card__prices"},[t.item.price?a("price",t._b({staticClass:"text-bold catalog-product-list-card__price"},"price",t.item.price,!1)):t._e(),t._v(" "),t.item.oldPrice?a("price",t._b({staticClass:"text-sm text-grey text-strike catalog-product-list-card__price"},"price",t.item.oldPrice,!1)):t._e()],1),t._v(" "),a("div",{staticClass:"link--sm catalog-product-list-card__link"},[t._v(t._s(t.item.name))]),t._v(" "),t._m(1)])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"catalog-product-list-card__tags"},this._l(this.item.tags,(function(t){return e("tag",{key:t.id,staticClass:"catalog-product-list-card__tags-item",attrs:{text:t.name}})})),1)}],!1,null,null,null).exports,E=a("55Sm"),j=a("jDKC"),P=a("LCOE"),B=a("fhPv");a("bhYy");function x(t,e,a,i,r,n,s){try{var o=t[n](s),c=o.value}catch(t){return void a(t)}o.done?e(c):Promise.resolve(c).then(i,r)}function L(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function F(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var W=0,A={name:"catalog-product-list",props:{items:{type:Array,default:function(){return[]}},referralCode:{type:String},animation:{type:Boolean,default:!0},fullscreen:{type:Boolean,default:!1}},components:{CatalogBannerListCard:m,CatalogProductListCard:k},methods:function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?L(Object(a),!0).forEach((function(e){F(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):L(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},Object(v.b)(E.b,[j.a]),{},Object(v.b)(y.f,[P.e]),{getComponent:function(t){switch(t){case B.b.PRODUCT:return k.name;case B.b.BANNER:return m.name}},getClass:function(t){return{"catalog-product-list__item--banner":t===B.b.BANNER}},onBeforeEnterItems:function(t){t.dataset.index=W,W+=1,t.style.opacity=0},itemAnimation:function(t,e){return new Promise((function(a,i){try{setTimeout((function(){requestAnimationFrame((function(){t.style.opacity=1,a()}))}),e)}catch(t){i(t)}}))},onEnterItems:function(t,e){var a,i=this;return(a=regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r=100*t.dataset.index,a.next=3,i.itemAnimation(t,r);case 3:e();case 4:case"end":return a.stop()}}),a)})),function(){var t=this,e=arguments;return new Promise((function(i,r){var n=a.apply(t,e);function s(t){x(n,i,r,s,o,"next",t)}function o(t){x(n,i,r,s,o,"throw",t)}s(void 0)}))})()},onAfterEnterItems:function(t){delete t.dataset.index,W=0},onLeaveItems:function(t,e){requestAnimationFrame((function(){t.style.opacity=0,e()}))},onToggleFavorite:function(t){this[P.e](t)},onPreview:function(t){this[j.a]({name:s.modalName.general.QUICK_VIEW,open:!0,state:{code:t,referralCode:this.referralCode}})},onAddToCart:function(t){this[j.a]({name:s.modalName.general.ADD_TO_CART,open:!0,state:{offerId:t.id,storeId:t.stock.storeId,type:t.type,referralCode:this.referralCode}})}})},D=Object(u.a)(A,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.animation?a("transition-group",{staticClass:"catalog-product-list",class:{"catalog-product-list--fullscreen":t.fullscreen},attrs:{tag:"ul",name:"catalog-item"},on:{"before-enter":t.onBeforeEnterItems,enter:t.onEnterItems,"after-enter":t.onAfterEnterItems,leave:t.onLeaveItems}},t._l(t.items,(function(e){return a(t.getComponent(e.type),{key:e.id,tag:"component",staticClass:"catalog-product-list__item",class:t.getClass(e.type),attrs:{item:e},on:{"add-item":function(a){return t.onAddToCart(e)},preview:function(a){return t.onPreview(e.code)},"toggle-favorite-item":function(a){return t.onToggleFavorite(e.productId)}}})})),1):a("ul",{staticClass:"catalog-product-list"},t._l(t.items,(function(e){return a(t.getComponent(e.type),{key:e.id,tag:"component",staticClass:"catalog-product-list__item",class:t.getClass(e.type),attrs:{item:e},on:{"add-item":function(a){return t.onAddToCart(e)},preview:function(a){return t.onPreview(e.code)},"toggle-favorite-item":function(a){return t.onToggleFavorite(e.productId)}}})})),1)}),[],!1,null,null,null);e.a=D.exports},bhYy:function(t,e,a){},hqjE:function(t,e,a){}}]);