(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{LiGy:function(e,t,a){},bxsf:function(e,t,a){"use strict";a.r(t);var s=a("NDiG"),n=a("7cXU"),r=a("i2Ud"),i=a("KQVR"),c=a("gd5W"),o=a("L2JU"),u=a("Q2AE"),l=a("rBTT"),m=a("JM0x"),d=a("Io6t"),f=a("NqPc"),g=a("YPqg"),b=a("3eXy");a("PnIt"),a("LiGy");function p(e,t,a,s,n,r,i){try{var c=e[r](i),o=c.value}catch(e){return void a(e)}c.done?t(o):Promise.resolve(o).then(s,n)}function v(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function h(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?v(Object(a),!0).forEach((function(t){w(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):v(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function w(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var O="".concat(l.NAME,"/").concat(d.c),_={name:"message-details",components:{VSvg:s.a,VLink:n.a,VButton:r.a,VInput:i.a,MessageCard:c.a},data:function(){return{message:"",isBtnDisabled:!1}},computed:h(h(h(h(h({},Object(o.d)(g.c,[g.g])),Object(o.d)([u.f])),Object(o.d)(O,[d.b])),Object(o.d)("route",{chatId:function(e){return e.params&&e.params.chatId}})),{},{items:function(){var e=this;return(this[d.b]||[]).map((function(t){return h(h({},t),{},{date:e.formatDate(t.date)})}))},backUrl:function(){return{name:"Messages"}}}),methods:h(h(h({},Object(o.b)(l.NAME,[m.a])),Object(o.b)(O,[f.b])),{},{formatDate:function(e){return new Date(e).toLocaleDateString(this[u.f])},getTitle:function(e){return e.isSystem?"Команда Бессовестно Талантливый":"".concat(this[g.g].firstName," ").concat(this[g.g].lastName)},onSendMessage:function(){var e,t=this;return(e=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.isBtnDisabled=!0,e.next=3,t[f.b]({chatId:t.chatId,message:t.message});case 3:t.message="",t.isBtnDisabled=!1;case 5:case"end":return e.stop()}}),e)})),function(){var t=this,a=arguments;return new Promise((function(s,n){var r=e.apply(t,a);function i(e){p(r,s,n,i,c,"next",e)}function c(e){p(r,s,n,i,c,"throw",e)}i(void 0)}))})()}}),beforeRouteEnter:function(e,t,a){var s=e.name,n=e.params;b.$progress.start(),b.$store.dispatch("".concat(O,"/").concat(f.d),n.chatId).then((function(){return a((function(e){b.$progress.finish(),e[m.a]([{name:e.$t("profile.routes.Messages"),to:{name:"Messages"}},{name:n.chatId,to:{name:s,params:n}}])}))})).catch((function(e){return a((function(e){return b.$progress.fail()}))}))},beforeRouteLeave:function(e,t,a){this[m.a]([]),a()}},y=a("KHd+"),j=Object(y.a)(_,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"section message-details-view"},[a("div",{staticClass:"container container--tablet-lg"},[a("v-link",{staticClass:"message-details-view__back-link",attrs:{to:e.backUrl}},[a("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),e._v(" Назад ко всем\n            сообщениям\n        ")],1),e._v(" "),a("h2",{staticClass:"message-details-view__hl"},[e._v(e._s(e.chatId)+" Доставка в Зеленоград")])],1),e._v(" "),a("ul",{staticClass:"message-details-view__list"},e._l(e.items,(function(t){return a("message-card",{key:t.id,staticClass:"message-details-view__list-item",attrs:{tabindex:"0",message:t.message,name:t.name,"last-name":t.lastName,title:e.getTitle(t),date:t.date,"is-system":t.isSystem}})})),1),e._v(" "),a("div",{staticClass:"message-details-view__controls"},[a("v-input",{staticClass:"message-details-view__controls-input",attrs:{tag:"textarea",placeholder:"Написать ответ"},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),e._v(" "),a("v-button",{staticClass:"message-details-view__controls-btn",attrs:{disabled:e.isBtnDisabled&&!e.message.length},on:{click:e.onSendMessage}},[e._v("Отправить")])],1)])}),[],!1,null,null,null);t.default=j.exports}}]);