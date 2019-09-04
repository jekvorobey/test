(window.webpackJsonp=window.webpackJsonp||[]).push([["item-detail"],{457:function(t,e,n){"use strict";n.r(e);n(473);var i={name:"spinner",props:["show"],serverCacheKey:function(t){return t.show}},s=n(15),r=Object(s.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("transition",[e("svg",{directives:[{name:"show",rawName:"v-show",value:this.show,expression:"show"}],staticClass:"spinner",class:{show:this.show},attrs:{width:"44px",height:"44px",viewBox:"0 0 44 44"}},[e("circle",{staticClass:"path",attrs:{fill:"none","stroke-width":"4","stroke-linecap":"round",cx:"22",cy:"22",r:"20"}})])])},[],!1,null,null,null).exports,o=n(460),a=(n(474),{name:"comment",components:{VButton:o.a},props:["id"],data:function(){return{open:!0}},computed:{comment:function(){return this.$store.state.item_list.items[this.id]}},methods:{pluralize:function(t){return t+(1===t?" reply":" replies")}}}),c=Object(s.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.comment?n("li",{staticClass:"comment"},[n("div",{staticClass:"by"},[n("router-link",{attrs:{to:"/user/"+t.comment.by}},[t._v(t._s(t.comment.by))]),t._v("\n        "+t._s(t._f("timeAgo")(t.comment.time))+" ago\n    ")],1),t._v(" "),n("div",{staticClass:"text",domProps:{innerHTML:t._s(t.comment.text)}}),t._v(" "),t.comment.kids&&t.comment.kids.length?n("v-button",{staticClass:"toggle",class:{open:t.open},on:{click:function(e){t.open=!t.open}}},[t._v("\n        "+t._s(t.open?"[-]":"[+] "+t.pluralize(t.comment.kids.length)+" collapsed")+"\n    ")]):t._e(),t._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"comment-children"},t._l(t.comment.kids,function(t){return n("comment",{key:t,attrs:{id:t}})}),1)],1):t._e()},[],!1,null,null,null).exports,u=n(463),m=n(76);n(476);var l={name:"item-detail",components:{Spinner:r,Comment:c},data:function(){return{loading:!0}},computed:{item:function(){return this.$store.state.item_list?this.$store.state.item_list.items[this.$route.params.id]:null}},beforeRouteEnter:function(t,e,n){!!m.$store._modulesNamespaceMap["".concat(u.a.name,"/")]||m.$store.registerModule(u.a.name,u.a,{preserveState:!!m.$store.state.item_list}),m.$progress.start(),m.$store.state.item_list.items[t.params.id]?n(function(t){return m.$progress.finish()}):m.$store.dispatch("".concat(u.a.name,"/FETCH_ITEMS"),{ids:[t.params.id]}).then(function(){n(function(t){return m.$progress.finish()})})},beforeRouteUpdate:function(t,e,n){var i=this;this.$store.state.item_list.items[t.params.id]?n():(this.$progress.start(),this.fetchItems().then(function(){i.$progress.finish(),n()}))},serverPrefetch:function(){return this.$store.registerModule(u.a.name,u.a),this.fetchItems()},beforeMount:function(){this.fetchComments()},title:function(){return this.item?this.item.title:null},watch:{item:"fetchComments"},methods:{fetchItems:function(){return this.$store.dispatch("".concat(u.a.name,"/FETCH_ITEMS"),{ids:[this.$route.params.id]})},fetchComments:function(){var t=this;this.item&&this.item.kids&&(this.loading=!0,function t(e,n){if(n&&n.kids)return e.dispatch("".concat(u.a.name,"/FETCH_ITEMS"),{ids:n.kids}).then(function(){return Promise.all(n.kids.map(function(n){return t(e,e.state.item_list.items[n])}))})}(this.$store,this.item).then(function(){t.loading=!1}))}}},f=Object(s.a)(l,function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.item?n("section",{staticClass:"section item-view"},[n("div",{staticClass:"container"},[t.item?[n("div",{staticClass:"item-view-header"},[n("a",{attrs:{href:t.item.url,target:"_blank"}},[n("h1",[t._v(t._s(t.item.title))])]),t._v(" "),t.item.url?n("span",{staticClass:"host"},[t._v(" ("+t._s(t._f("host")(t.item.url))+") ")]):t._e(),t._v(" "),n("p",{staticClass:"meta"},[t._v("\n                    "+t._s(t.item.score)+" points | by "),n("router-link",{attrs:{to:"/user/"+t.item.by}},[t._v(t._s(t.item.by))]),t._v("\n                    "+t._s(t._f("timeAgo")(t.item.time))+" ago\n                ")],1)]),t._v(" "),n("div",{staticClass:"item-view-comments"},[n("p",{staticClass:"item-view-comments-header"},[t._v("\n                    "+t._s(t.item.kids?t.item.descendants+" comments":"No comments yet.")+"\n                    "),n("spinner",{attrs:{show:t.loading}})],1),t._v(" "),t.loading?t._e():n("ul",{staticClass:"comment-children"},t._l(t.item.kids,function(t){return n("comment",{key:t,attrs:{id:t}})}),1)])]:t._e()],2)]):t._e()},[],!1,null,null,null);e.default=f.exports},460:function(t,e,n){"use strict";var i=n(33),s=(n(464),["before","after"]),r=["button","reset","submit"],o={name:"v-button",components:{VSvg:i.a},props:{iconName:String,iconModifier:String,type:{type:String,default:"button",validator:function(t){return-1!==r.indexOf(t)}},placement:{type:String,default:"before",validator:function(t){return-1!==s.indexOf(t)}},href:{type:String},to:{type:[String,Object]}},computed:{handlers:function(){var t=this,e=Object.keys(this.$listeners),n={};return e.forEach(function(e){return n[e]=function(n){return t.$emit(e,n)}}),n}}},a=n(15),c=Object(a.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.href?n("a",t._g({staticClass:"btn",attrs:{href:t.href}},t.handlers),[t.iconName&&"before"===t.placement?n("v-svg",{attrs:{name:t.iconName,modifier:t.iconModifier}}):t._e(),t._v(" "),t._t("default"),t._v(" "),t.iconName&&"after"===t.placement?n("v-svg",{attrs:{name:t.iconName,modifier:t.iconModifier}}):t._e()],2):t.to?n("router-link",t._g({staticClass:"btn"},t.handlers),[t.iconName&&"before"===t.placement?n("v-svg",{attrs:{name:t.iconName,modifier:t.iconModifier}}):t._e(),t._v(" "),t._t("default"),t._v(" "),t.iconName&&"after"===t.placement?n("v-svg",{attrs:{name:t.iconName,modifier:t.iconModifier}}):t._e()],2):n("button",t._g({staticClass:"btn",attrs:{type:t.type}},t.handlers),[t.iconName&&"before"===t.placement?n("v-svg",{attrs:{name:t.iconName,modifier:t.iconModifier}}):t._e(),t._v(" "),t._t("default"),t._v(" "),t.iconName&&"after"===t.placement?n("v-svg",{attrs:{name:t.iconName,modifier:t.iconModifier}}):t._e()],2)},[],!1,null,null,null);e.a=c.exports},461:function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return c}),n.d(e,"b",function(){return u}),n.d(e,"c",function(){return m}),n.d(e,"d",function(){return l});var i=n(462),s=n(76),r=!!t.env.DEBUG_API,o=Object(i.a)({version:"/v0",config:{databaseURL:"https://hacker-news.firebaseio.com"}});function a(t){r&&s.$logger.info("fetching ".concat(t,"..."));var e=o.cachedItems;return e&&e.has(t)?(r&&s.$logger.info("cache hit for ".concat(t,".")),Promise.resolve(e.get(t))):new Promise(function(n,i){o.child(t).once("value",function(i){var o=i.val();o&&(o.__lastUpdated=Date.now()),e&&e.set(t,o),r&&s.$logger.info("fetched ".concat(t,".")),n(o)},i)})}function c(t){return o.cachedIds&&o.cachedIds[t]?Promise.resolve(o.cachedIds[t]):a("".concat(t,"stories"))}function u(t){return Promise.all(t.map(function(t){return function(t){return a("item/".concat(t))}(t)}))}function m(t){return a("user/".concat(t))}function l(t,e){var n=!0,i=o.child("".concat(t,"stories")),s=function(t){n?n=!1:e(t.val())};return i.on("value",s),function(){i.off("value",s)}}o.onServer&&function t(){u((o.cachedIds.top||[]).slice(0,30));setTimeout(t,9e5)}()}).call(this,n(121))},462:function(t,e,n){"use strict";n.d(e,"a",function(){return r});var i=n(465),s=n.n(i);n(467);function r(t){var e=t.config,n=t.version;return s.a.initializeApp(e),s.a.database().ref(n)}},463:function(t,e,n){"use strict";var i=n(461),s={FETCH_LIST_DATA:function(t,e){var n=t.commit,s=t.dispatch,r=e.type;return n("SET_ACTIVE_TYPE",{type:r}),Object(i.a)(r).then(function(t){return n("SET_LIST",{type:r,ids:t})}).then(function(){return s("ENSURE_ACTIVE_ITEMS")})},ENSURE_ACTIVE_ITEMS:function(t){return(0,t.dispatch)("FETCH_ITEMS",{ids:t.getters.activeIds})},FETCH_ITEMS:function(t,e){var n=t.commit,s=t.state,r=e.ids,o=Date.now();return(r=r.filter(function(t){var e=s.items[t];return!e||o-e.__lastUpdated>18e4})).length?Object(i.b)(r).then(function(t){return n("SET_ITEMS",{items:t})}):Promise.resolve()},FETCH_USER:function(t,e){var n=t.state,s=t.dispatch,r=e.id;return n.users[r]?Promise.resolve(n.users[r]):Object(i.c)(r).then(function(t){return s("SET_USER",{id:r,user:t})})},SET_USER:function(t,e){var n=t.commit,s=t.state,r=e.id;return s.users[r]?Promise.resolve(s.users[r]):Object(i.c)(r).then(function(t){return n("SET_USER",{id:r,user:t})})}},r=n(13),o={SET_ACTIVE_TYPE:function(t,e){var n=e.type;t.activeType=n},SET_LIST:function(t,e){var n=e.type,i=e.ids;t.lists[n]=i},SET_ITEMS:function(t,e){e.items.forEach(function(e){e&&r.default.set(t.items,e.id,e)})},SET_USER:function(t,e){var n=e.id,i=e.user;r.default.set(t.users,n,i||!1)}},a={activeIds:function(t,e,n){var i=t.activeType,s=t.itemsPerPage,r=t.lists;if(!i)return[];var o=Number(n.route.params.page)||1,a=(o-1)*s,c=o*s;return r[i].slice(a,c)},activeItems:function(t,e){return e.activeIds.map(function(e){return t.items[e]}).filter(function(t){return t})}};e.a={name:"item_list",namespaced:!0,state:{activeType:null,itemsPerPage:20,items:{},users:{},lists:{top:[],new:[],show:[],ask:[],job:[]}},actions:s,mutations:o,getters:a}},464:function(t,e,n){},473:function(t,e,n){},474:function(t,e,n){},476:function(t,e,n){}}]);