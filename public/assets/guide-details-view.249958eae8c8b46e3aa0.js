(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{"Z/2U":function(e,t,i){},bGTM:function(e,t,i){"use strict";i.r(t);var a=i("NDiG"),r=i("7cXU"),n=i("kO0/"),o=i("/Q9p"),s=i("L2JU"),c=i("Q2AE"),d=i("rBTT"),l=i("JM0x");i("PnIt"),i("Z/2U");function u(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function p(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?u(Object(i),!0).forEach((function(t){g(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):u(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function g(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var m={name:"guide-details",components:{VSvg:a.a,VLink:r.a,VHtml:n.a,CatalogProductCard:o.a},data:function(){return{guides:[{id:1,product:{id:413,name:"Фен для волос La Ric, индиго",code:"fen-dlya-volos-la-ric-indigo",categoryCodes:["dlya_uhoda_za_kozhey","lico","uvlazhnenie_i_pitanie"],price:"9 818 ₽",oldPrice:"",tags:[],type:"product",rating:5,image:{id:64,sourceExt:"jpg"}},desc:"<p><strong>ЧТО</strong> Шампунь для вьющихся волос, подчеркивает текстуру натуральных кудрей. Подходит для ежедневного применения.</p>\n                    <p><strong>ПРЕИМУЩЕСТВА </strong> Гидролизованный протеин сои поддерживает и выделяет натуральный завиток.</p>\n                    <p><strong>ЧЕГО ОЖИДАТЬ </strong> Шампунь с кремовой текстурой. Аромат лайма, лимона, бергамота.</p>"},{id:2,product:{id:413,name:"Фен для волос La Ric, индиго",code:"fen-dlya-volos-la-ric-indigo",categoryCodes:["dlya_uhoda_za_kozhey","lico","uvlazhnenie_i_pitanie"],price:"9 818 ₽",oldPrice:"",tags:[],type:"product",rating:5,image:{id:64,sourceExt:"jpg"}},desc:"<p><strong>ЧТО</strong> Шампунь для вьющихся волос, подчеркивает текстуру натуральных кудрей. Подходит для ежедневного применения.</p>\n                    <p><strong>ПРЕИМУЩЕСТВА </strong> Гидролизованный протеин сои поддерживает и выделяет натуральный завиток.</p>\n                    <p><strong>ЧЕГО ОЖИДАТЬ </strong> Шампунь с кремовой текстурой. Аромат лайма, лимона, бергамота.</p>"}]}},computed:p({},Object(s.d)([c.h]),{},Object(s.d)("route",{guideId:function(e){return e.params&&e.params.guideId}}),{backUrl:function(){return{name:"Guides"}},isTablet:function(){return this.$mq.tablet}}),methods:p({},Object(s.b)(d.d,[l.d])),beforeRouteEnter:function(e,t,i){var a=e.name,r=e.params;i((function(e){e[l.d]([{name:e.$t("profile.routes.Guides"),to:{name:"Guides"}},{name:"ШАМПУНИ И КОНДИЦИОНЕРЫ AVEDA ДЛЯ ВЬЮЩИХСЯ ВОЛОС",to:{name:a,params:r}}])}))},beforeRouteUpdate:function(e,t,i){var a=e.name,r=e.params;this[l.d]([{name:vm.$t("profile.routes.Guides"),to:{name:"Guides"}},{name:"ШАМПУНИ И КОНДИЦИОНЕРЫ AVEDA ДЛЯ ВЬЮЩИХСЯ ВОЛОС",to:{name:a,params:r}}]),i()},beforeRouteLeave:function(e,t,i){this[l.d]([]),i()}},b=i("KHd+"),f=Object(b.a)(m,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"section guide-details-view"},[i("div",{staticClass:"container container--tablet-lg"},[i("v-link",{staticClass:"guide-details-view__back-link",attrs:{to:e.backUrl}},[i("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),e._v(" Назад ко всем\n            гайдам\n        ")],1),e._v(" "),i("h2",{staticClass:"guide-details-view__hl"},[e._v("Шампуни и кондиционеры Aveda для вьющихся волос")])],1),e._v(" "),i("div",{staticClass:"container container--tablet-lg guide-details-view__container"},[i("ul",{staticClass:"guide-details-view__list"},e._l(e.guides,(function(t){var a=t.product,r=t.desc;return i("li",{key:a.id,staticClass:"guide-details-view__list-item"},[i("catalog-product-card",{staticClass:"guide-details-view__list-card",attrs:{"product-id":a.id,name:a.name,type:a.type,href:"/catalog/"+a.categoryCodes[a.categoryCodes.length-1]+"/"+a.code,image:a.image,price:a.price,"old-price":a.oldPrice,tags:a.tags,rating:a.rating,"is-small":e.isTablet}}),e._v(" "),i("v-html",{staticClass:"container container--tablet guide-details-view__list-desc",domProps:{innerHTML:e._s(r)}})],1)})),0)])])}),[],!1,null,null,null);t.default=f.exports}}]);