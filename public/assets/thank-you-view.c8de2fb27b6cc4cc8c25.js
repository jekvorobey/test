(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{X4eb:function(t,e,a){},"zP/w":function(t,e,a){"use strict";a.r(e);var n=a("7cXU"),r=a("i2Ud"),i=a("ze5i"),s=a("A9YF"),o=a("45Ux"),c=a("PZpB"),u=a("Z14j"),l=(a("XJM6"),a("f5/Z")),d=a("fOuK"),p=a("MM1r"),f=a("L2JU"),v=a("Q2AE"),m=a("YPqg"),_=a("rBTT"),y=a("5GyW"),h=a("4kxs"),g=a("Qchp"),b=a("hFEP"),C=a("8TZ/"),k=a("3eXy"),w=a("2JJK"),O=a("tCqp"),j=a("DpYB"),P=a("fhPv"),I=a("GyY8"),T=a("QmAe"),D=a("aWaK"),S=a("oEqv"),E=a("aXGN"),x=a("W6hq"),M=a("nfjx");a("X4eb");function A(t,e,a,n,r,i,s){try{var o=t[i](s),c=o.value}catch(t){return void a(t)}o.done?e(c):Promise.resolve(c).then(n,r)}function $(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function R(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?$(Object(a),!0).forEach((function(e){U(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):$(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function U(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var L="".concat(_.NAME,"/").concat(y.d),B={name:"thank-you",mixins:[M.a],components:{VLink:n.a,VButton:r.a,VSticky:i.a,VCartHeader:s.a,InfoRow:o.a,InfoPanel:c.a,AttentionPanel:u.a,CartMasterClassCard:p.a,CartProductCard:l.a,CartBundleProductCard:d.a},metaInfo:function(){return{title:this.title}},computed:R(R(R(R(R(R({},Object(f.d)([v.g])),Object(f.d)(m.c,[m.b])),Object(f.d)(C.c,[C.a])),Object(f.d)(g.c,[g.d])),Object(f.d)("route",{id:function(t){return t.params.id}})),{},{canContinuePayment:function(){var t=this.order||{},e=t.payment_status,a=t.payment_url;return e===j.c.NOT_PAID&&a},dates:function(){var t=this,e=this.order.delivery.dates,a=void 0===e?[]:e,n=[],r=[],i=a.map((function(e){var a=e.date,n=e.time,r=Object(T.g)(a),i=n&&n.from&&Object(T.g)("".concat(a," ").concat(n.from)),s=n&&n.to&&Object(T.g)("".concat(a," ").concat(n.to)),o=r.toLocaleDateString(t[v.g],I.b),c=i&&i.toLocaleString(t[v.g],I.d),u=s&&s.toLocaleString(t[v.g],I.d),l=t.$t("weekdays.long.".concat(r.getDay())),d="".concat(o,", ").concat(l).concat(c||u?",":"");return c&&(d+=(u&&c!==u?" с ":" ")+"".concat(c)),u&&c!==u&&(d+=" по ".concat(u)),d}));if(this.isOrderCertificate||this.isMasterClass)return i;for(var s=0;s<i.length;s++){var o=i[s];if(r[o]||0===r[o]){var c=r[o];n[c].count+=1,n[c].suffix=this.getSuffixDelivery(n[c].count)}else{var u=Object.keys(r).length;n[u]={date:o,count:1,suffix:"доставка"},r[o]=u}}return n},items:function(){var t=this,e=this.order,a=this.cartData,n=void 0===a?{}:a;if(!e)return[];switch(e.type){case P.a.PRODUCT:var r=(n[P.a.MASTERCLASS]||{}).items,i=void 0===r?[]:r;return i.map((function(e){var a=e.p,n=new Date("".concat(a.nearestDate," ").concat(a.nearestTimeFrom)),r=n.toLocaleString(t[v.g],I.b),i=n.toLocaleString(t[v.g],I.d),s="".concat(r," (").concat(t.$t("weekdays.short.".concat(n.getDay())),"), ").concat(i),o=Object(x.h)(a.code),c=a.speakers&&a.speakers[0],u=c&&"".concat(c.firstName," ").concat(c.lastName,", ").concat(c.profession),l="".concat(a.name," (").concat(a.ticketTypeName,")"),d=a.image&&Object(E.c)(144,96,a.image.id),p=a.image&&{webp:Object(E.c)(144,96,a.image.id,w.fileExtension.image.WEBP),orig:Object(E.c)(144,96,a.image.id)};return R(R({},e),{},{p:R(R({},a),{},{name:l,url:o,author:u,dateTime:s,desktopImg:p,defaultImg:d})})}));case P.a.MASTERCLASS:var s=(n[P.a.PRODUCT]||{}).items;return(void 0===s?[]:s).map((function(t){var e=t.p,a=e.categoryCodes&&e.categoryCodes[e.categoryCodes.length-1],n=Object(x.j)(a,e.code),r=e.type===P.a.PRODUCT&&e.image,i=r&&Object(E.c)(64,64,e.image.id),s=r&&{webp:Object(E.c)(64,64,e.image.id,w.fileExtension.image.WEBP),orig:Object(E.c)(64,64,e.image.id)};return R(R({},t),{},{p:R(R({},e),{},{href:n,defaultImg:i||void 0,desktopImg:s||void 0})})}));default:return[]}},title:function(){var t=this.order;switch(t&&t.type){case P.a.PRODUCT:return"Заказ успешно оформлен";case P.a.MASTERCLASS:return"Билеты успешно оформлены";default:return"Заказ"}},orderDelivery:function(){return this.isOrderCertificate?this.order.user.email?"E-mail":"SMS":this.$t("deliveryMethod.".concat(this.order.delivery.deliveryMethod))},fullUserInfo:function(){var t=this.order.user,e=t.name,a=t.phone,n=t.email,r=a?"".concat(e,", ").concat(Object(T.f)(a)):"".concat(e);return n&&k.$retailRocket&&k.$retailRocket.setEmail(n),n?"".concat(r,", ").concat(n):r},deliveryAddress:function(){var t=(this[g.d]||{delivery:{}}).delivery,e=t.point,a=t.address,n=null;switch(t.deliveryMethod){case O.f.PICKUP:n=Object(S.b)(e.address);break;default:n=Object(S.a)(a)}return n},isMasterClass:function(){var t=this.order;return t&&t.type===P.a.MASTERCLASS},isOrderCertificate:function(){var t=this.order;return t&&t.type===P.a.CERTIFICATE},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:U({},m.b,(function(t){t||this.$router.replace(I.a.path)})),methods:R(R({},Object(f.b)(L,[h.d])),{},{onContinuePayment:function(){var t,e=this;return(t=regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.order.id,t.next=4,e[h.d]();case 4:case"end":return t.stop()}}),t)})),function(){var e=this,a=arguments;return new Promise((function(n,r){var i=t.apply(e,a);function s(t){A(i,n,r,s,o,"next",t)}function o(t){A(i,n,r,s,o,"throw",t)}s(void 0)}))})()},getSuffixDelivery:function(t){var e=Math.abs(t);return(e%=100)>=5&&e<=20?"доставок":1===(e%=10)?"доставка":e>=2&&e<=4?"доставки":"доставок"}}),beforeRouteEnter:function(t,e,a){var n=t.params.id;function r(){if(k.$store.state[g.c]){var e=k.$store.state[g.c].order;e&&e.id==n?a():(k.$progress.start(),k.$store.dispatch("".concat(g.c,"/").concat(b.q),n).then((function(){a((function(t){k.$progress.finish()}))})).catch((function(e){k.$progress.fail(),e.status===w.httpCodes.NOT_FOUND?a(Object(D.c)(t)):a(new Error(e.message)),k.$progress.finish()})))}}k.$store.state[g.c]?r():k.$store.watch((function(t){return t[g.c]}),(function(t){t&&r()}))},beforeCreate:function(){this.cartItemTypes=P.a}},N=a("KHd+"),q=Object(N.a)(B,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section thank-you-view"},[a("v-cart-header",{attrs:{"hide-city":""}}),t._v(" "),a("div",{staticClass:"container"},[a("h1",{staticClass:"thank-you-view__hl"},[t._v("\n            "+t._s(t.title)+"\n        ")])]),t._v(" "),a("div",{staticClass:"container thank-you-view__container"},[a("v-sticky",{staticClass:"thank-you-view__sticky",scopedSlots:t._u([{key:"sticky",fn:function(){return[a("info-panel",{staticClass:"thank-you-view__panel",attrs:{header:"Информация о заказе","max-lines":t.isTablet?2:1}},[t.order?a("div",{staticClass:"container container--tablet"},[t.isMasterClass?[a("ul",{staticClass:"thank-you-view__panel-list"},[a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Номер заказа",value:t.order.number}}),t._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Получатель",value:t.order.email}})],1),t._v(" "),a("attention-panel",{staticClass:"thank-you-view__panel-attention"},[t._v("\n                                Посмотреть информацию о дате и месте проведения мастер-классов можно в письме,\n                                отправленном на ваш email\n                            ")])]:a("ul",{staticClass:"thank-you-view__panel-list"},[a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Номер заказа",value:t.order.number}}),t._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Получатель",value:t.fullUserInfo}}),t._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Способ получения",value:t.orderDelivery}}),t._v(" "),t.isOrderCertificate?t._e():a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Адрес доставки",value:t.deliveryAddress}}),t._v(" "),a("info-row",{staticClass:"thank-you-view__panel-item",attrs:{name:"Даты доставки"}},[t.isOrderCertificate||t.isMasterClass?a("ul",t._l(t.dates,(function(e){return a("li",{key:e},[t._v("\n                                        "+t._s(e)+"\n                                    ")])})),0):a("ul",t._l(t.dates,(function(e){return e?a("li",{key:e.date},[t._v("\n                                        "+t._s(e.date)+" ("+t._s(e.count)+" "+t._s(e.suffix)+" )\n                                    ")]):t._e()})),0)])],1),t._v(" "),a("div",{staticClass:"thank-you-view__panel-controls"},[t.canContinuePayment?a("v-button",{staticClass:"thank-you-view__panel-btn",attrs:{href:t.order.payment_url}},[t._v("\n                                Оплатить\n                            ")]):t._e(),t._v(" "),a("v-link",{staticClass:"thank-you-view__panel-btn thank-you-view__panel-btn--link",attrs:{to:{name:"Orders"}}},[t._v("\n                                Перейти в мои заказы\n                            ")])],1)],2):t._e()])]},proxy:!0}])}),t._v(" "),t.items&&t.items.length>0?a("v-sticky",{staticClass:"thank-you-view__sticky",scopedSlots:t._u([{key:"sticky",fn:function(){return[a("info-panel",{staticClass:"thank-you-view__panel",attrs:{header:"В корзине остались неоформленные позиции","max-lines":t.isTablet?2:1}},[t.isMasterClass?a("ul",{staticClass:"thank-you-view__panel-list"},[t._l(t.items,(function(e){var n=e.p,r=e.count,i=e.type;return[i===t.cartItemTypes.PRODUCT?a("cart-product-card",{key:n.id,staticClass:"thank-you-view__panel-card",attrs:{"offer-id":n.id,"product-id":n.productId,type:i,name:n.name,image:n.image,price:n.price,"old-price":n.oldPrice,count:r,href:n.url},on:{deleteItem:function(e){return t.onDeleteCartItem(n.id,n.stock.storeId)},"toggle-favorite-item":function(e){return t.onToggleFavorite(n)},countChange:function(e){return t.onAddCartItem(n.id,n.stock.storeId,e.count)}}},[n.desktopImg?[a("source",{attrs:{"data-srcset":n.desktopImg.webp,type:"image/webp"}}),t._v(" "),a("source",{attrs:{"data-srcset":n.desktopImg.orig}})]:t._e(),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":n.defaultImg,alt:""}})],2):i===t.cartItemTypes.BUNDLE_PRODUCT?a("cart-bundle-product-card",{key:n.id,staticClass:"thank-you-view__panel-card",attrs:{"bundle-id":n.id,name:n.name,price:n.price,bonus:n.bonus,"old-price":n.oldPrice,items:n.items,count:r},on:{deleteBundle:t.onDeleteBundle}}):t._e()]}))],2):a("ul",{staticClass:"thank-you-view__panel-list"},t._l(t.items,(function(e){var n=e.id,r=e.p,i=e.type;return a("cart-master-class-card",{key:n,staticClass:"thank-you-view__panel-card",attrs:{type:i,"product-id":r.id,name:r.name,note:r.note,image:r.image,price:r.price,"old-price":r.oldPrice,date:r.dateTime,author:r.author,href:r.url}},[r.desktopImg?[a("source",{attrs:{"data-srcset":r.desktopImg.webp,type:"image/webp"}}),t._v(" "),a("source",{attrs:{"data-srcset":r.desktopImg.orig}})]:t._e(),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":r.defaultImg,alt:""}})],2)})),1),t._v(" "),a("div",{staticClass:"container container--tablet thank-you-view__panel-controls"},[a("v-button",{staticClass:"btn--outline thank-you-view__panel-btn",attrs:{to:{name:"Cart"}}},[t._v("\n                            Перейти к оформлению\n                        ")])],1)])]},proxy:!0}],null,!1,2909896910)}):t._e()],1)],1)}),[],!1,null,null,null);e.default=q.exports}}]);