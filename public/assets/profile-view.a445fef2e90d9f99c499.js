(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{"0GyC":function(e,t,n){},"6Ujf":function(e,t,n){},jwZw:function(e,t,n){"use strict";n.r(t);var r=n("NDiG"),a=n("i2Ud"),i=n("ze5i"),o=n("Gqup"),s=(n("PZpB"),n("45Ux"),n("obii")),c=n("zfPd"),l=n("lo4X"),u=n("a6oV"),b=n("L2JU"),m=n("55Sm"),p=n("jDKC"),f=n("2JJK");n("0GyC");function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){g(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _=f.modalName.profile.NAVIGATION,O={name:_,components:{GeneralModal:u.a,NavigationPanel:l.a},props:{groups:{type:Array,default:function(){return[]}}},computed:{isTabletLg:function(){return this.$mq.tabletLg}},methods:v(v({},Object(b.b)(m.b,[p.a])),{},{onClose:function(){this[p.a]({name:_,open:!1})}})},y=n("KHd+"),h=Object(y.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("general-modal",{staticClass:"navigation-modal",attrs:{type:"fullscreen","is-mobile":e.isTabletLg},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[n("div",{staticClass:"container navigation-modal__container"},[n("navigation-panel",{staticClass:"navigation-modal__panel",attrs:{groups:e.groups},on:{"link-click":e.onClose}})],1)]},proxy:!0}])})}),[],!1,null,null,null).exports,w=n("rBTT"),j=n("YPqg"),C=n("GyY8");n("g0Ed"),n("+in6"),n("6Ujf");function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){N(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var T={name:"profile",components:{VSvg:r.a,VButton:a.a,VSticky:i.a,VSidebar:o.a,Breadcrumbs:s.a,BreadcrumbItem:c.a,NavigationPanel:l.a,NavigationModal:h},computed:k(k(k(k(k({},Object(b.d)(w.NAME,[w.BREADCRUMBS])),Object(b.d)(j.c,[j.b,j.g])),Object(b.d)(j.c,N({},j.e,(function(e){return e[j.h]&&e[j.h][j.e]||!1})))),Object(b.d)(m.b,{isNavigationOpen:function(e){return e[m.a][f.modalName.profile.NAVIGATION]&&e[m.a][f.modalName.profile.NAVIGATION].open}})),{},{groups:function(){var e=[{id:1,name:this.$t("profile.groups.profile"),routes:[{name:"Cabinet",exact:!0},{name:"Preferences",exact:!0},{name:"Addresses",exact:!0},{name:"Subscribes",exact:!0},{name:"Messages",displayName:"".concat(this.$tc("profile.format.messages"))+(this[j.g]?" (".concat(this[j.g],")"):"")},{name:"Bonuses",exact:!0,hidden:this[j.e]},{name:"Orders"}]}];return this[j.e]&&e.push({id:2,name:this.$t("profile.groups.business"),routes:[{name:"Referal"},{name:"ProPreferences",exact:!0},{name:"Promopage",exact:!0},{name:"Seo"},{name:"Promocodes"},{name:"Account"},{name:"Documents",exact:!0}]}),e},routeTitle:function(){return this.$t("profile.routes.".concat(this.$route.name))},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:N({},j.b,(function(e){e||this.$router.replace(C.a.path)})),methods:k(k({},Object(b.b)(m.b,[p.a])),{},{onOpenNavigation:function(){this[p.a]({name:f.modalName.profile.NAVIGATION,open:!0})}})},$=Object(y.a)(T,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section profile-view"},[n("transition",{attrs:{name:"fade-in"}},[e.isTabletLg?n("v-sticky",{staticClass:"profile-view__panel profile-view__container--mobile",scopedSlots:e._u([{key:"sticky",fn:function(){return[n("v-button",{staticClass:"profile-view__panel-btn",on:{click:e.onOpenNavigation}},[e._v("\n                    "+e._s(e.routeTitle)),n("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)]},proxy:!0}])},[e._v(" "),n("breadcrumbs",{staticClass:"container"},[n("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e.isTablet?n("v-svg",{attrs:{name:"home",width:"10",height:"10"}}):n("span",[e._v("Главная")])],1),e._v(" "),n("breadcrumb-item",{key:"Cabinet",attrs:{to:{name:"Cabinet"}}},[e._v(e._s(e.$t("profile.routes.Cabinet")))]),e._v(" "),"Cabinet"!==e.$route.name&&e.breadcrumbs&&0===e.breadcrumbs.length?n("breadcrumb-item",{key:e.$route.name,attrs:{to:e.$route.path}},[e._v(e._s(e.routeTitle))]):e._e(),e._v(" "),e._l(e.breadcrumbs,(function(t){return n("breadcrumb-item",{key:t.name,attrs:{to:t.to}},[e._v(e._s(t.name))])}))],2),e._v(" "),n("div",{staticClass:"profile-view__main"},[n("transition",{attrs:{name:"fade-absolute"}},[n("router-view",{staticClass:"profile-view__main-view"})],1)],1)],1):n("div",{staticClass:"container profile-view__container--desktop"},[n("breadcrumbs",[n("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e.isTablet?n("v-svg",{attrs:{name:"home",width:"10",height:"10"}}):n("span",[e._v("Главная")])],1),e._v(" "),n("breadcrumb-item",{key:"Cabinet",attrs:{to:{name:"Cabinet"}}},[e._v(e._s(e.$t("profile.routes.Cabinet"))+"\n                ")]),e._v(" "),"Cabinet"!==e.$route.name&&e.breadcrumbs&&0===e.breadcrumbs.length?n("breadcrumb-item",{key:e.$route.name,attrs:{to:e.$route.path}},[e._v(e._s(e.routeTitle)+"\n                ")]):e._e(),e._v(" "),e._l(e.breadcrumbs,(function(t){return n("breadcrumb-item",{key:t.name,attrs:{to:t.to}},[e._v(e._s(t.name)+"\n                ")])}))],2),e._v(" "),n("div",{staticClass:"profile-view__grid",attrs:{"data-v-sticky-container":""}},[e.isTabletLg?e._e():n("v-sidebar",{staticClass:"profile-view__panel",attrs:{"container-selector":".profile-view__grid",top:"64",bottom:"0"},scopedSlots:e._u([{key:"sticky",fn:function(){return[n("navigation-panel",{attrs:{groups:e.groups}}),e._v(" "),n("br")]},proxy:!0}],null,!1,1610733295)}),e._v(" "),n("div",{staticClass:"profile-view__main"},[n("transition",{attrs:{name:"fade-absolute"}},[n("router-view",{staticClass:"profile-view__main-view"})],1)],1)],1)],1)],1),e._v(" "),n("transition",{attrs:{name:"fade-in"}},[e.isNavigationOpen&&e.isTabletLg?n("navigation-modal",{attrs:{groups:e.groups}}):e._e()],1)],1)}),[],!1,null,null,null);t.default=$.exports}}]);