(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{K4hc:function(t,e,n){},xlhh:function(t,e,n){"use strict";n.r(e);var a=n("NDiG"),r=n("7cXU"),o=n("PZpB"),i=n("/Q9p"),s=n("BZIu"),c=n("rBTT"),p=n("JM0x"),l=n("8TZ/"),u=n("0CxO"),d=(n("Jhov"),n("Mii2"),n("eZRa"),n("ZTSR"),n("4BeY")),g=n.n(d),v=n("IaFt"),C=n.n(v),h=new g.a({id:"icon-link-add",use:"icon-link-add-usage",viewBox:"0 0 16 16",content:'<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="icon-link-add">\r\n    <path d="M8.00034 3.18893C7.73463 3.45464 7.73463 3.88544 8.00034 4.15115C8.26605 4.41686 8.69685 4.41686 8.96256 4.15115L10.887 2.22672C11.1527 1.96101 11.5835 1.96101 11.8492 2.22672L13.7736 4.15115C14.0393 4.41686 14.0393 4.84766 13.7736 5.11336L9.44366 9.44333C9.17796 9.70904 8.74716 9.70904 8.48145 9.44333L7.27868 8.24056C7.01297 7.97486 6.58217 7.97486 6.31646 8.24056C6.05075 8.50627 6.05075 8.93707 6.31646 9.20278L7.51923 10.4056C8.31636 11.2027 9.60876 11.2027 10.4059 10.4056L14.7359 6.07558C15.533 5.27845 15.533 3.98606 14.7359 3.18893L12.8114 1.2645C12.0143 0.467375 10.7219 0.467375 9.92477 1.2645L8.00034 3.18893Z" />\r\n    <path d="M1.26484 9.92439C0.467711 10.7215 0.467711 12.0139 1.26484 12.811L3.18927 14.7355C3.98639 15.5326 5.27879 15.5326 6.07591 14.7355L8.00035 12.811C8.26605 12.5453 8.26606 12.1145 8.00035 11.8488C7.73464 11.5831 7.30384 11.5831 7.03813 11.8488L5.1137 13.7733C4.84799 14.039 4.41719 14.039 4.15148 13.7733L2.22705 11.8488C1.96134 11.5831 1.96134 11.1523 2.22705 10.8866L6.55702 6.55664C6.82273 6.29093 7.25353 6.29093 7.51924 6.55664L8.72201 7.75941C8.98772 8.02512 9.41852 8.02512 9.68422 7.75941C9.94993 7.4937 9.94993 7.0629 9.68422 6.79719L8.48145 5.59442C7.68433 4.7973 6.39193 4.7973 5.59481 5.59442L1.26484 9.92439Z" />\r\n    <path d="M13.3337 10.6667C13.7018 10.6667 14.0003 10.9651 14.0003 11.3333V12.6667H15.3337C15.7018 12.6667 16.0003 12.9651 16.0003 13.3333C16.0003 13.7015 15.7018 14 15.3337 14H14.0003V15.3333C14.0003 15.7015 13.7018 16 13.3337 16C12.9655 16 12.667 15.7015 12.667 15.3333V14H11.3337C10.9655 14 10.667 13.7015 10.667 13.3333C10.667 12.9651 10.9655 12.6667 11.3337 12.6667H12.667V11.3333C12.667 10.9651 12.9655 10.6667 13.3337 10.6667Z" />\r\n</symbol>'}),f=(C.a.add(h),n("zYMX"),n("K4hc"),n("L2JU"));function _(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?_(Object(n),!0).forEach((function(e){w(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function w(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var b={name:"promopage",components:{VSvg:a.a,VLink:r.a,InfoPanel:o.a,CatalogProductCard:i.a},data:function(){return{headerText:"Я рекомендую"}},computed:m({},Object(f.d)(c.a,{products:function(t){return t[c.b]?t[c.b].products:[]}})),methods:m({},Object(f.b)(l.c,[u.a])),beforeRouteEnter:function(t,e,n){s.$store.state.profile.promoData?n():(s.$progress.start(),s.$store.dispatch("".concat(c.a,"/").concat(p.a)).then((function(){n((function(t){return s.$progress.finish()}))})).catch((function(t){n((function(t){return s.$progress.fail()})),s.$logger.error(t)})))},beforeMount:function(){}},y=n("KHd+"),O=Object(y.a)(b,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section promopage-view"},[n("div",{staticClass:"promopage-view__header"},[n("h2",{staticClass:"promopage-view__hl"},[t._v("\n            Моя промостраница\n        ")]),t._v(" "),n("span",{staticClass:"text-grey text-sm"},[t._v(t._s(t.products.length)+" продуктов")])]),t._v(" "),n("info-panel",{staticClass:"promopage-view__panel",attrs:{header:t.headerText},scopedSlots:t._u([{key:"controls",fn:function(){return[n("v-link",{staticClass:"promopage-view__panel-link",attrs:{tag:"button"}},[n("v-svg",{attrs:{name:"edit",width:"16",height:"16"}})],1),t._v(" "),n("v-link",{staticClass:"promopage-view__panel-link",attrs:{tag:"button"}},[n("v-svg",{attrs:{name:"plus-small",width:"16",height:"16"}}),t._v("\n                  Добавить\n            ")],1),t._v(" "),n("v-link",{staticClass:"promopage-view__panel-link",attrs:{tag:"button"}},[n("v-svg",{attrs:{name:"link-add",width:"16",height:"16"}}),t._v("\n                  Добавить по ссылке\n            ")],1),t._v(" "),n("v-link",{staticClass:"promopage-view__panel-link",attrs:{tag:"button"}},[n("v-svg",{attrs:{name:"link",width:"16",height:"16"}}),t._v("\n                  Скопировать ссылку\n            ")],1)]},proxy:!0}])},[t._v(" "),n("ul",{staticClass:"promopage-view__panel-list"},t._l(t.products,(function(e){return n("li",{key:e.id,staticClass:"promopage-view__panel-item"},[n("catalog-product-card",{staticClass:"promopage-view__panel-card",attrs:{"product-id":e.id,name:e.name,type:e.type,href:"/catalog/"+e.categoryCodes[e.categoryCodes.length-1]+"/"+e.code,image:e.image,price:e.price,"old-price":e.oldPrice,tags:e.tags,rating:e.rating,"show-wishlist-btn":!1},on:{addItem:function(n){return t.ADD_CART_ITEM({offerId:e.id})}}}),t._v(" "),n("button",{staticClass:"promopage-view__panel-item-btn",on:{click:function(t){t.preventDefault()}}},[n("v-svg",{attrs:{name:"cross",width:"24",height:"24"}})],1)],1)})),0)])],1)}),[],!1,null,null,null);e.default=O.exports}}]);