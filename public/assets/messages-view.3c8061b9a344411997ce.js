(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{hQDq:function(e,t,s){},hyan:function(e,t,s){"use strict";s.r(t);s("7cXU");var a=s("i2Ud"),n=s("KQVR"),r=(s("+gqB"),s("gd5W")),i=s("uy7R"),o=s("L2JU"),c=s("Q2AE"),u=s("55Sm"),l=s("jDKC"),f=s("rBTT"),m=s("Io6t"),p=s("NqPc"),d=s("3eXy"),b=s("2JJK"),g=s("GyY8");s("hQDq");function h(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,a)}return s}function O(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?h(Object(s),!0).forEach((function(t){v(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):h(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function v(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var w="".concat(f.NAME,"/").concat(m.c),_={name:"messages",components:{VButton:a.a,VInput:n.a,MessageCard:r.a,MessageModal:i.a},computed:O(O(O(O({},Object(o.d)([c.f])),Object(o.d)(w,[m.a])),Object(o.d)(u.b,{isMessageOpen:function(e){return e[u.a][b.modalName.profile.MESSAGE]&&e[u.a][b.modalName.profile.MESSAGE].open}})),{},{chats:function(){var e=this,t=this[m.a]||[];return t.map((function(t){return O(O({},t),{},{date:e.formatDate(t.date)})}))},isTablet:function(){return this.$mq.tablet}}),methods:O(O({},Object(o.b)(u.b,[l.a])),{},{formatDate:function(e){return new Date(e).toLocaleDateString(this[c.f],g.d)},onCreateMessage:function(){this[l.a]({name:b.modalName.profile.MESSAGE,open:!0})},onOpenMessage:function(e){this.$router.push({name:"MessageDetails",params:{chatId:e}})}}),beforeRouteEnter:function(e,t,s){d.$progress.start(),d.$store.dispatch("".concat(w,"/").concat(p.c)).then((function(){return s((function(e){return d.$progress.finish()}))})).catch((function(e){return s((function(e){return d.$progress.fail()}))}))}},y=s("KHd+"),j=Object(y.a)(_,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"section messages-view"},[s("div",{staticClass:"messages-view__header"},[s("h2",{staticClass:"messages-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),s("v-button",{staticClass:"messages-view__btn",on:{click:e.onCreateMessage}},[e._v("Новое сообщение")])],1),e._v(" "),s("ul",{staticClass:"messages-view__list"},e._l(e.chats,(function(t){return s("message-card",{key:t.id,staticClass:"messages-view__list-item",attrs:{tabindex:"0","message-id":t.id,message:t.message,name:t.name,"last-name":t.lastName,title:t.title,date:t.date,"is-system":t.isSystem,"is-read":t.isRead,"use-header-clamp":!e.isTablet,"use-clamp":""},on:{click:function(s){return s.preventDefault(),e.onOpenMessage(t.id)}}})})),1),e._v(" "),s("transition",{attrs:{name:"fade"}},[e.$isServer||e.isMessageOpen?s("message-modal"):e._e()],1)],1)}),[],!1,null,null,null);t.default=j.exports}}]);