(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{"/Uvh":function(e,t,r){},iFKA:function(e,t,r){"use strict";var n=r("YSwA"),a=r("jYNS"),l=r("a6oV"),o=r("L2JU"),i=r("55Sm"),s=r("jDKC"),c=r("aXGN"),u=r("2JJK");r("/Uvh");function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var f={slidesPerView:1,effect:"fade",grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"}},g=u.modalName.product.GALLERY,y={name:g,components:{VPicture:a.a,VSlider:n.a,GeneralModal:l.a},props:{images:{type:Array,default:function(){return[]}},galleryOptions:{type:Object,default:function(){return f}}},computed:d({},Object(o.d)(i.b,{isOpen:function(e){return e[i.a][g]&&e[i.a][g].open},modalState:function(e){return e[i.a][g]&&e[i.a][g].state||{}}})),methods:d(d({},Object(o.b)(i.b,[s.a])),{},{generateSourcePath:function(e,t,r,n){return Object(c.c)(e,t,r,n)},onClose:function(){this[s.a]({name:g,open:!1})}})},m=r("KHd+"),O=Object(m.a)(y,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.isOpen?r("general-modal",{staticClass:"gallery-modal",attrs:{type:"wide"},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[r("div",{staticClass:"gallery-modal__gallery"},[r("v-slider",{staticClass:"gallery-modal__gallery-slider",attrs:{name:"modal-gallery-slider",options:e.galleryOptions}},e._l(e.images,(function(t){return r("div",{key:t.id,staticClass:"swiper-slide gallery-modal__gallery-item"},[t&&t.id?r("v-picture",{key:t.id},[e._t("image",[r("source",{attrs:{"data-srcset":e.generateSourcePath(null,null,t.id,"webp"),type:"image/webp"}}),e._v(" "),r("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":e.generateSourcePath(null,null,t.id),alt:""}})],{image:t})],2):e._e()],1)})),0)],1)]},proxy:!0}],null,!0)}):e._e()}),[],!1,null,null,null);t.a=O.exports}}]);