(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{RAzk:function(e,t,i){},bEOZ:function(e,t,i){"use strict";var r,s=i("YSwA"),a=i("NDiG"),n=i("7cXU"),d=i("jYNS"),c=i("2JJK"),l=i("aXGN"),o=(i("gB8C"),i("RAzk"),{name:"recently-viewed-product-card",components:{VSvg:a.a,VLink:n.a,VPicture:d.a},props:{offerId:{type:[String,Number]},productId:{type:[String,Number]},name:{type:String},href:{type:[Object,String],default:"/"},image:{type:Object}},computed:{images:function(){var e=this.image;if(e&&e.id)return{desktop:{webp:Object(l.c)(300,300,e.id,c.fileExtension.image.WEBP),orig:Object(l.c)(300,300,e.id)},mobile:{webp:Object(l.c)(200,200,e.id,c.fileExtension.image.WEBP),orig:Object(l.c)(200,200,e.id)},default:Object(l.c)(200,200,e.id)}}}}),p=i("KHd+"),u=Object(p.a)(o,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("router-link",{staticClass:"recently-viewed-product-card",attrs:{tag:"a",to:e.href}},[i("div",{staticClass:"recently-viewed-product-card__img"},[e.images?i("v-picture",{key:e.image.id},[i("source",{attrs:{"data-srcset":e.images.desktop.webp,type:"image/webp",media:"(min-width: 480px)"}}),e._v(" "),i("source",{attrs:{"data-srcset":e.images.desktop.orig,media:"(min-width: 480px)"}}),e._v(" "),i("source",{attrs:{"data-srcset":e.images.mobile.webp,type:"image/webp",media:"(max-width: 479px)"}}),e._v(" "),i("source",{attrs:{"data-srcset":e.images.mobile.orig,media:"(max-width: 479px)"}}),e._v(" "),i("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.images.default,alt:""}})]):i("v-svg",{attrs:{id:"recently-viewed-product-card-empty",name:"logo",width:"48",height:"48"}})],1),e._v(" "),i("div",{staticClass:"recently-viewed-product-card__body"},[i("div",{staticClass:"recently-viewed-product-card__title"},[e._v("\n            "+e._s(e.name)+"\n        ")])])])}),[],!1,null,null,null).exports;i("nv38");function m(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var f={spaceBetween:24,slidesPerView:4,grabCursor:!0,autoHeight:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:(r={},m(r,c.breakpoints.tabletLg-1,{slidesPerView:3.5,slidesOffsetBefore:24,slidesOffsetAfter:24}),m(r,c.breakpoints.tablet-1,{slidesPerView:2,spaceBetween:12,slidesOffsetBefore:0,slidesOffsetAfter:0}),r)},g={name:"history-panel",components:{VSlider:s.a,RecentlyViewedProductCard:u},props:{items:{type:Array,default:function(){return[]}}},computed:{isTabletLg:function(){return this.$mq.tabletLg},sliderOptions:function(){return f}}},b=Object(p.a)(g,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"history-panel"},[this.isTabletLg?t("v-slider",{staticClass:"history-panel__slider",attrs:{name:"history",options:this.sliderOptions}},this._l(this.items,(function(e){return t("recently-viewed-product-card",{key:e.id,staticClass:"swiper-slide",attrs:{"offer-id":e.id,"product-id":e.productId,name:e.name,href:e.url,image:e.image}})})),1):t("div",{staticClass:"history-panel__list"},this._l(this.items,(function(e){return t("recently-viewed-product-card",{key:e.id,staticClass:"history-panel__list-item",attrs:{"offer-id":e.id,"product-id":e.productId,name:e.name,href:e.url,image:e.image}})})),1)],1)}),[],!1,null,null,null);t.a=b.exports},nv38:function(e,t,i){}}]);