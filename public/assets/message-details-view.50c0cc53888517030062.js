(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{LiGy:function(e,t,a){},bxsf:function(e,t,a){"use strict";a.r(t);var s=a("NDiG"),n=a("7cXU"),r=a("i2Ud"),i=a("KQVR"),c=a("gd5W"),o=a("L2JU"),l=a("Q2AE"),u=a("55Sm"),m=a("jDKC"),d=a("rBTT"),f=a("JM0x"),g=a("Io6t"),b=a("NqPc"),v=a("YPqg"),p=a("3eXy"),h=a("QmAe"),O=a("2JJK"),_=a("nfjx");a("PnIt"),a("LiGy");function w(e,t,a,s,n,r,i){try{var c=e[r](i),o=c.value}catch(e){return void a(e)}c.done?t(o):Promise.resolve(o).then(s,n)}function j(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function y(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?j(Object(a),!0).forEach((function(t){k(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):j(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function k(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var I="".concat(d.NAME,"/").concat(g.c),P={name:"message-details",mixins:[_.a],components:{VSvg:s.a,VLink:n.a,VButton:r.a,VInput:i.a,MessageCard:c.a},metaInfo:function(){return{title:this.title}},data:function(){return{message:"",isBtnDisabled:!1}},computed:y(y(y(y(y({},Object(o.d)([l.g])),Object(o.d)(v.c,[v.h])),Object(o.d)(I,[g.e,g.b])),Object(o.d)("route",{chatId:function(e){return e.params&&e.params.chatId}})),{},{items:function(){var e=this;return(this[g.b]||[]).map((function(t){return y(y({},t),{},{date:e.formatDate(t.date)})}))},backUrl:function(){return{name:"Messages"}}}),methods:y(y(y(y({},Object(o.b)(d.NAME,[f.a])),Object(o.b)(I,[b.b])),Object(o.b)(u.b,[m.a])),{},{formatDate:function(e){return e&&Object(h.g)(e).toLocaleDateString(this[l.g])},getTitle:function(e){if(e.isSystem)return"Команда Бессовестно Талантливый";var t=this[v.h]||{},a=t.firstName,s=t.lastName;return"".concat(a," ").concat(s)},onSendMessage:function(){var e,t=this;return(e=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.isBtnDisabled=!0,e.next=4,t[b.b]({chatId:t.chatId,message:t.message});case 4:t.message="",e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t[m.a]({name:O.modalName.general.NOTIFICATION,open:!0,state:{title:"Ошибка",message:"Не удалось отправить сообщение. Попробуйте ещё раз."}});case 10:t.isBtnDisabled=!1;case 11:case"end":return e.stop()}}),e,null,[[0,7]])})),function(){var t=this,a=arguments;return new Promise((function(s,n){var r=e.apply(t,a);function i(e){w(r,s,n,i,c,"next",e)}function c(e){w(r,s,n,i,c,"throw",e)}i(void 0)}))})()}}),beforeRouteEnter:function(e,t,a){var s=e.name,n=e.params;p.$progress.start(),p.$store.dispatch("".concat(I,"/").concat(b.d),n.chatId).then((function(){return a((function(e){p.$progress.finish(),e[f.a]([{name:e.$t("profile.routes.Messages"),to:{name:"Messages"}},{name:n.chatId,to:{name:s,params:n}}])}))})).catch((function(){return a((function(){return p.$progress.fail()}))}))},beforeRouteLeave:function(e,t,a){this[f.a]([]),a()}},C=a("KHd+"),D=Object(C.a)(P,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"section message-details-view"},[a("div",{staticClass:"container container--tablet-lg"},[a("v-link",{staticClass:"message-details-view__back-link",attrs:{to:e.backUrl}},[a("v-svg",{attrs:{modifier:"icon--rotate-deg90",name:"arrow-small",width:"24",height:"24"}}),e._v(" Назад ко всем\n            сообщениям\n        ")],1),e._v(" "),a("h2",{staticClass:"message-details-view__hl"},[e._v("\n            "+e._s(e.chatId)),a("span",{staticClass:"message-details-view__hl-title"},[e._v(e._s(e.title))])])],1),e._v(" "),a("ul",{staticClass:"message-details-view__list"},e._l(e.items,(function(t){return a("message-card",{key:t.id,staticClass:"message-details-view__list-item",attrs:{tabindex:"0",message:t.message,name:t.name,"last-name":t.lastName,title:e.getTitle(t),date:t.date,"is-system":t.isSystem}})})),1),e._v(" "),a("div",{staticClass:"message-details-view__controls"},[a("v-input",{staticClass:"message-details-view__controls-input",attrs:{tag:"textarea",placeholder:"Написать ответ"},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),e._v(" "),a("v-button",{staticClass:"message-details-view__controls-btn",attrs:{disabled:e.isBtnDisabled&&!e.message.length},on:{click:e.onSendMessage}},[e._v("\n            Отправить\n        ")])],1)])}),[],!1,null,null,null);t.default=D.exports}}]);