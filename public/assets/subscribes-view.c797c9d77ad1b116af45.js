(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{CH7E:function(e,t,n){},yND4:function(e,t,n){"use strict";n.r(t);var s=n("i2Ud"),c=n("dMOp"),a=n("o3vK"),r=n("PZpB"),i=n("L2JU"),o=n("55Sm"),u=n("jDKC"),l=n("rBTT"),b=n("lzke"),v=n("AD2e"),p=n("BkRI"),d=n.n(p),f=n("3eXy"),h=n("2JJK"),m=n("SesW");n("CH7E");function $(e,t,n,s,c,a,r){try{var i=e[a](r),o=i.value}catch(e){return void n(e)}i.done?t(o):Promise.resolve(o).then(s,c)}function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(Object(n),!0).forEach((function(t){O(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w="".concat(l.NAME,"/").concat(b.b),S={name:"subscribes",mixins:[m.b],components:{VButton:s.a,VCheck:a.a,VSpinner:c.a,InfoPanel:r.a},validations:{actualSubscrubes:{channels:{},periodicity:{},topics:{}}},data:function(){return{inProcess:!1,actualSubscrubes:{channels:[],periodicity:1,topics:[]}}},computed:y(y({},Object(i.d)(w,[b.a,b.c])),{},{isDirty:function(){return this.$v.$anyDirty}}),watch:O({},b.c,(function(e){this.setActualSubscribes(e)})),methods:y(y(y({},Object(i.b)(o.b,[u.a])),Object(i.b)(w,[v.c])),{},{setActualSubscribes:function(e){this.actualSubscrubes=d()(e),this.$v.$reset()},onSave:function(){var e,t=this;return(e=regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=t.actualSubscrubes,t.inProcess=!0,e.next=5,t[v.c](n);case 5:t.inProcess=!1,e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),t.inProcess=!1,t[u.a]({name:h.modalName.general.NOTIFICATION,open:!0,state:{title:"Уведомление",message:"Произошла ошибка. Попробуйте ещё раз позже"}});case 12:case"end":return e.stop()}}),e,null,[[0,8]])})),function(){var t=this,n=arguments;return new Promise((function(s,c){var a=e.apply(t,n);function r(e){$(a,s,c,r,i,"next",e)}function i(e){$(a,s,c,r,i,"throw",e)}r(void 0)}))})()}}),beforeRouteEnter:function(e,t,n){var s=f.$context.isServer;if(f.$store.state[l.NAME][b.b].load)return f.$store.dispatch("".concat(w,"/").concat(v.b),!1),n();f.$progress.start(),f.$store.dispatch("".concat(w,"/").concat(v.a),s).then((function(){n((function(e){f.$progress.finish()}))})).catch((function(e){if(f.$progress.fail(),e.status===httpCodes.FORBIDDEN)return f.$store.dispatch("".concat(AUTH_MODULE,"/").concat(CHECK_SESSION),!0),n(!1);n()}))},created:function(){this.setActualSubscribes(this[b.c])}},g=n("KHd+"),P=Object(g.a)(S,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section subscribes-view"},[n("div",{staticClass:"container container--tablet-lg"},[n("h2",{staticClass:"subscribes-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))])]),e._v(" "),n("info-panel",{staticClass:"subscribes-view__panel",attrs:{header:"Что вас интересует?"}},[n("div",{staticClass:"container container--tablet-lg"},e._l(e.content.topics,(function(t){return n("v-check",{key:t.id,attrs:{id:"topic-"+t.id,value:t.id,name:"topics"},model:{value:e.$v.actualSubscrubes.topics.$model,callback:function(t){e.$set(e.$v.actualSubscrubes.topics,"$model",t)},expression:"$v.actualSubscrubes.topics.$model"}},[e._v("\n                "+e._s(t.name)+"\n                ")])})),1)]),e._v(" "),n("info-panel",{staticClass:"subscribes-view__panel",attrs:{header:"Как часто?"}},[n("div",{staticClass:"container container--tablet-lg"},e._l(e.content.periods,(function(t){return n("v-check",{key:t.value,attrs:{id:"period-"+t.value,value:t.value,type:"radio",name:"period"},model:{value:e.$v.actualSubscrubes.periodicity.$model,callback:function(t){e.$set(e.$v.actualSubscrubes.periodicity,"$model",t)},expression:"$v.actualSubscrubes.periodicity.$model"}},[e._v("\n                "+e._s(t.name)+"\n            ")])})),1)]),e._v(" "),n("info-panel",{staticClass:"subscribes-view__panel",attrs:{header:"Предпочитаемый способ связи"}},[n("div",{staticClass:"container container--tablet-lg"},e._l(e.content.channels,(function(t){return n("v-check",{key:t.value,attrs:{id:"channel-"+t.value,value:t.value,name:"channels"},model:{value:e.$v.actualSubscrubes.channels.$model,callback:function(t){e.$set(e.$v.actualSubscrubes.channels,"$model",t)},expression:"$v.actualSubscrubes.channels.$model"}},[e._v("\n                "+e._s(t.name)+"\n            ")])})),1)]),e._v(" "),n("div",{staticClass:"container subscribes-view__submit"},[n("transition",{attrs:{name:"fade-in"}},[e.isDirty?n("v-button",{key:"submit",staticClass:"subscribes-view__submit-btn",class:{"btn--outline ":e.inProcess},attrs:{disabled:e.inProcess},on:{click:e.onSave}},[e.inProcess?n("v-spinner",{attrs:{height:"24",width:"24",show:""}}):[e._v("\n                    Сохранить\n                ")]],2):e._e()],1)],1)],1)}),[],!1,null,null,null);t.default=P.exports}}]);