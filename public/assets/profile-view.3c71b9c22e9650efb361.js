(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{"0GyC":function(e,t,n){},"6Ujf":function(e,t,n){},jwZw:function(e,t,n){"use strict";n.r(t);var r=n("NDiG"),a=n("i2Ud"),i=n("ze5i"),o=(n("PZpB"),n("45Ux"),n("obii")),s=n("zfPd"),c=n("lo4X"),u=n("a6oV"),l=n("L2JU"),b=n("55Sm"),m=n("jDKC"),p=n("2JJK");n("0GyC");function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=p.modalName.profile.NAVIGATION,_={name:g,components:{GeneralModal:u.a,NavigationPanel:c.a},props:{groups:{type:Array,default:function(){return[]}}},computed:{isTabletLg:function(){return this.$mq.tabletLg}},methods:v(v({},Object(l.b)(b.b,[m.a])),{},{onClose:function(){this[m.a]({name:g,open:!1})}})},O=n("KHd+"),y=Object(O.a)(_,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("general-modal",{staticClass:"navigation-modal",attrs:{type:"fullscreen","is-mobile":e.isTabletLg},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[n("div",{staticClass:"container navigation-modal__container"},[n("navigation-panel",{staticClass:"navigation-modal__panel",attrs:{groups:e.groups}})],1)]},proxy:!0}])})}),[],!1,null,null,null).exports,h=n("rBTT"),w=n("YPqg"),j=n("GyY8");n("3eXy"),n("48TQ"),n("g0Ed"),n("+in6"),n("6Ujf");function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){$(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function $(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k={name:"profile",components:{VSvg:r.a,VButton:a.a,VSticky:i.a,Breadcrumbs:o.a,BreadcrumbItem:s.a,NavigationPanel:c.a,NavigationModal:y},computed:P(P(P(P(P({},Object(l.d)(h.NAME,[h.BREADCRUMBS])),Object(l.d)(w.c,[w.b,w.f])),Object(l.d)(w.c,$({},w.e,(function(e){return e[w.g]&&e[w.g][w.e]||!1})))),Object(l.d)(b.b,{isNavigationOpen:function(e){return e[b.a][p.modalName.profile.NAVIGATION]&&e[b.a][p.modalName.profile.NAVIGATION].open}})),{},{groups:function(){var e=[{id:1,name:this.$t("profile.groups.profile"),routes:[{name:"Cabinet",exact:!0},{name:"Preferences",exact:!0},{name:"Addresses",exact:!0},{name:"Mess1ages",displayName:"".concat(this.$tc("profile.format.messages"))+(this[w.f]?" (".concat(this[w.f],")"):"")},{name:"Bonuses",exact:!0,hidden:this[w.e]},{name:"Orders"}]}];return this[w.e]&&e.push({id:2,name:this.$t("profile.groups.business"),routes:[{name:"Referal"},{name:"ProPreferences",exact:!0},{name:"Promopage",exact:!0},{name:"Seo"},{name:"Promocodes",exact:!0},{name:"Account"},{name:"Documents",exact:!0}]}),e},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:$({},w.b,(function(e){e||this.$router.replace(j.a.path)})),methods:P(P({},Object(l.b)(b.b,[m.a])),{},{onOpenNavigation:function(){this[m.a]({name:p.modalName.profile.NAVIGATION,open:!0})}})},N=Object(O.a)(k,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section profile-view"},[n("transition",{attrs:{name:"fade-in"}},[e.isTabletLg?n("v-sticky",{staticClass:"profile-view__panel profile-view__container--mobile",scopedSlots:e._u([{key:"sticky",fn:function(){return[n("v-button",{staticClass:"profile-view__panel-btn",on:{click:e.onOpenNavigation}},[e._v("\n                    "+e._s(e.$t("profile.routes."+e.$route.name))),n("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)]},proxy:!0}])},[e._v(" "),n("breadcrumbs",{staticClass:"container"},[n("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e.isTablet?n("v-svg",{attrs:{name:"home",width:"10",height:"10"}}):n("span",[e._v("Главная")])],1),e._v(" "),n("breadcrumb-item",{key:"Cabinet",attrs:{to:{name:"Cabinet"}}},[e._v("\n                    "+e._s(e.$t("profile.routes.Cabinet"))+"\n                ")]),e._v(" "),"Cabinet"!==e.$route.name&&e.breadcrumbs&&0===e.breadcrumbs.length?n("breadcrumb-item",{key:e.$route.name,attrs:{to:e.$route.path}},[e._v("\n                    "+e._s(e.$t("profile.routes."+e.$route.name))+"\n                ")]):e._e(),e._v(" "),e._l(e.breadcrumbs,(function(t){return n("breadcrumb-item",{key:t.name,attrs:{to:t.to}},[e._v("\n                    "+e._s(t.name)+"\n                ")])}))],2),e._v(" "),n("div",{staticClass:"profile-view__main"},[n("transition",{attrs:{name:"fade-absolute"}},[n("router-view",{staticClass:"profile-view__main-view"})],1)],1)],1):n("div",{staticClass:"container profile-view__container--desktop"},[n("breadcrumbs",[n("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e.isTablet?n("v-svg",{attrs:{name:"home",width:"10",height:"10"}}):n("span",[e._v("Главная")])],1),e._v(" "),n("breadcrumb-item",{key:"Cabinet",attrs:{to:{name:"Cabinet"}}},[e._v("\n                    "+e._s(e.$t("profile.routes.Cabinet"))+"\n                ")]),e._v(" "),"Cabinet"!==e.$route.name&&e.breadcrumbs&&0===e.breadcrumbs.length?n("breadcrumb-item",{key:e.$route.name,attrs:{to:e.$route.path}},[e._v("\n                    "+e._s(e.$t("profile.routes."+e.$route.name))+"\n                ")]):e._e(),e._v(" "),e._l(e.breadcrumbs,(function(t){return n("breadcrumb-item",{key:t.name,attrs:{to:t.to}},[e._v("\n                    "+e._s(t.name)+"\n                ")])}))],2),e._v(" "),n("div",{staticClass:"profile-view__grid"},[n("v-sticky",{staticClass:"profile-view__panel",scopedSlots:e._u([{key:"sticky",fn:function(){return[n("navigation-panel",{attrs:{groups:e.groups}})]},proxy:!0}],null,!1,1467984906)}),e._v(" "),n("div",{staticClass:"profile-view__main"},[n("transition",{attrs:{name:"fade-absolute"}},[n("router-view",{staticClass:"profile-view__main-view"})],1)],1)],1)],1)],1),e._v(" "),n("transition",{attrs:{name:"fade-in"}},[e.isNavigationOpen&&e.isTabletLg?n("navigation-modal",{attrs:{groups:e.groups}}):e._e()],1)],1)}),[],!1,null,null,null);t.default=N.exports}}]);