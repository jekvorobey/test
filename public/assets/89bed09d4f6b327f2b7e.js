(window.webpackJsonp=window.webpackJsonp||[]).push([["item-list"],{449:function(t,e,s){},450:function(t,e,s){},459:function(t,e,s){"use strict";var i=s(449);s.n(i).a},460:function(t,e,s){"use strict";var i=s(450);s.n(i).a},461:function(t,e,s){"use strict";s.r(e);var i=s(439),a=s(116),n={name:"news-item",props:["item"],serverCacheKey:function(t){var e=t.item,s=e.id,i=e.__lastUpdated,n=e.time;return"".concat(s,"::").concat(i,"::").concat(Object(a.timeAgo)(n))}},r=(s(459),s(32)),o={name:"item-list",components:{Item:Object(r.a)(n,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"news-item"},[s("span",{staticClass:"score"},[t._v(t._s(t.item.score))]),t._v(" "),s("span",{staticClass:"title"},[t.item.url?[s("a",{attrs:{href:t.item.url,target:"_blank",rel:"noopener"}},[t._v(t._s(t.item.title))]),t._v(" "),s("span",{staticClass:"host"},[t._v(" ("+t._s(t._f("host")(t.item.url))+")")])]:[s("router-link",{attrs:{to:"/item/"+t.item.id}},[t._v(t._s(t.item.title))])]],2),t._v(" "),s("br"),t._v(" "),s("span",{staticClass:"meta"},["job"!==t.item.type?s("span",{staticClass:"by"},[t._v("\n            by "),s("router-link",{attrs:{to:"/user/"+t.item.by}},[t._v(t._s(t.item.by))])],1):t._e(),t._v(" "),s("span",{staticClass:"time"},[t._v(" "+t._s(t._f("timeAgo")(t.item.time))+" ago ")]),t._v(" "),"job"!==t.item.type?s("span",{staticClass:"comments-link"},[t._v("\n            | "),s("router-link",{attrs:{to:"/item/"+t.item.id}},[t._v(t._s(t.item.descendants)+" comments")])],1):t._e()]),t._v(" "),"story"!==t.item.type?s("span",{staticClass:"label"},[t._v(t._s(t.item.type))]):t._e()])},[],!1,null,null,null).exports},props:{type:String},data:function(){return{transition:"slide-right",displayedPage:Number(this.$route.params.page)||1,displayedItems:this.$store.getters["item_list/activeItems"]}},computed:{page:function(){return Number(this.$route.params.page)||1},maxPage:function(){var t=this.$store.state.item_list,e=t.itemsPerPage,s=t.lists;return Math.ceil(s[this.type].length/e)},hasMore:function(){return this.page<this.maxPage}},watch:{page:function(t,e){this.loadItems(t,e)}},methods:{loadItems:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;this.$progress.start(),this.$store.dispatch("item_list/FETCH_LIST_DATA",{type:this.type}).then(function(){t.page<0||t.page>t.maxPage?t.$router.replace("/".concat(t.type,"/1")):(t.transition=-1===s?null:e>s?"slide-left":"slide-right",t.displayedPage=e,t.displayedItems=t.$store.getters["item_list/activeItems"],t.$progress.finish())})}},beforeMount:function(){var t=this;this.$root._isMounted&&this.loadItems(this.page),this.unwatchList=Object(i.d)(this.type,function(e){t.$store.commit("item_list/SET_LIST",{type:t.type,ids:e}),t.$store.dispatch("item_list/ENSURE_ACTIVE_ITEMS").then(function(){t.displayedItems=t.$store.getters["item_list/activeItems"]})})},beforeDestroy:function(){this.unwatchList()}},l=(s(460),Object(r.a)(o,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"news-view"},[s("div",{staticClass:"container"},[s("div",{staticClass:"news-list-nav"},[t.page>1?s("router-link",{attrs:{to:"/"+t.type+"/"+(t.page-1)}},[t._v("< prev")]):s("a",{staticClass:"disabled"},[t._v("< prev")]),t._v(" "),s("span",[t._v(t._s(t.page)+"/"+t._s(t.maxPage))]),t._v(" "),t.hasMore?s("router-link",{attrs:{to:"/"+t.type+"/"+(t.page+1)}},[t._v("more >")]):s("a",{staticClass:"disabled"},[t._v("more >")])],1),t._v(" "),s("transition",{attrs:{name:t.transition}},[t.displayedPage>0?s("div",{key:t.displayedPage,staticClass:"news-list"},[s("transition-group",{attrs:{tag:"ul",name:"item"}},t._l(t.displayedItems,function(t){return s("item",{key:t.id,attrs:{item:t}})}),1)],1):t._e()])],1)])},[],!1,null,null,null));e.default=l.exports}}]);
//# sourceMappingURL=89bed09d4f6b327f2b7e.js.map