(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{"0GyC":function(e,t,n){},"6Ujf":function(e,t,n){},jwZw:function(e,t,n){"use strict";n.r(t);var a=n("NDiG"),r=n("i2Ud"),o=n("ze5i"),i=(n("PZpB"),n("45Ux"),n("obii")),s=n("zfPd"),c=n("lo4X"),u=n("a6oV"),l=n("L2JU"),m=n("55Sm"),b=n("jDKC"),p=n("2JJK");n("0GyC");function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=p.modalName.profile.NAVIGATION,_={name:v,components:{GeneralModal:u.a,NavigationPanel:c.a},props:{groups:{type:Array,default:function(){return[]}}},computed:{isTabletLg:function(){return this.$mq.tabletLg}},methods:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},Object(l.b)(m.b,[b.a]),{onClose:function(){this[b.a]({name:v,open:!1})}})},g=n("KHd+"),y=Object(g.a)(_,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("general-modal",{staticClass:"navigation-modal",attrs:{type:"fullscreen","is-mobile":e.isTabletLg},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[n("div",{staticClass:"container navigation-modal__container"},[n("navigation-panel",{staticClass:"navigation-modal__panel",attrs:{groups:e.groups}})],1)]},proxy:!0}])})}),[],!1,null,null,null).exports,O=n("rBTT"),w=n("YPqg"),C=n("GyY8"),h=(n("3eXy"),n("48TQ"),n("g0Ed"),n("4BeY")),j=n.n(h),P=n("IaFt"),x=n.n(P),$=new j.a({id:"icon-home",use:"icon-home-usage",viewBox:"0 0 16 16",content:'<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="icon-home">\r\n    <path d="M3.35865 7.25458L7.66214 3.30971C7.8533 3.13448 8.1467 3.13448 8.33786 3.30971L12.6414 7.25458C12.8678 7.46212 12.9862 7.76219 12.9627 8.06843L12.6188 12.5383C12.5988 12.7988 12.3816 13 12.1203 13H9.33333C9.05719 13 8.83333 12.7761 8.83333 12.5V10.5C8.83333 10.0398 8.46024 9.66667 8 9.66667C7.53976 9.66667 7.16667 10.0398 7.16667 10.5V12.5C7.16667 12.7761 6.94281 13 6.66667 13H3.87968C3.61841 13 3.40119 12.7988 3.38115 12.5383L3.03731 8.06843C3.01376 7.76219 3.13224 7.46212 3.35865 7.25458Z" />\r\n</symbol>'});x.a.add($),n("6Ujf");function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){A(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var S={name:"profile",components:{VSvg:a.a,VButton:r.a,VSticky:o.a,Breadcrumbs:i.a,BreadcrumbItem:s.a,NavigationPanel:c.a,NavigationModal:y},computed:N({},Object(l.d)(O.NAME,[O.BREADCRUMBS]),{},Object(l.d)(w.c,[w.b]),{},Object(l.d)(w.c,A({},w.e,(function(e){return e[w.f]&&e[w.f][w.e]||!1}))),{},Object(l.d)(m.b,{isNavigationOpen:function(e){return e[m.a][p.modalName.profile.NAVIGATION]&&e[m.a][p.modalName.profile.NAVIGATION].open}}),{groups:function(){var e=[{id:1,name:this.$t("profile.groups.profile"),routes:[{name:"Cabinet",exact:!0},{name:"Preferences",exact:!0},{name:"Addresses",exact:!0},{name:"Payment",exact:!0},{name:"Subscribes",exact:!0},{name:"Messages",displayName:this.$tc("profile.format.messages",5)},{name:"Certificates",exact:!0},{name:"Bonuses",exact:!0},{name:"Orders"}]}];return this[w.e]&&e.push({id:2,name:this.$t("profile.groups.business"),routes:[{name:"Referal",exact:!0},{name:"ProPreferences",exact:!0},{name:"Promopage",exact:!0},{name:"Seo",exact:!0},{name:"Promocodes",exact:!0},{name:"Account",exact:!0},{name:"Documents",exact:!0}]}),e},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:A({},w.b,(function(e){e||this.$router.replace(C.a.path)})),methods:N({},Object(l.b)(m.b,[b.a]),{onOpenNavigation:function(){this[b.a]({name:p.modalName.profile.NAVIGATION,open:!0})}})},T=Object(g.a)(S,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section profile-view"},[n("transition",{attrs:{name:"fade-in"}},[e.isTabletLg?n("v-sticky",{staticClass:"profile-view__panel profile-view__container--mobile",scopedSlots:e._u([{key:"sticky",fn:function(){return[n("v-button",{staticClass:"profile-view__panel-btn",on:{click:e.onOpenNavigation}},[e._v("\n                    "+e._s(e.$t("profile.routes."+e.$route.name))),n("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)]},proxy:!0}])},[e._v(" "),n("breadcrumbs",{staticClass:"container"},[n("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e._v("\n                    Главная\n                    ")]),e._v(" "),n("breadcrumb-item",{key:"Cabinet",attrs:{to:{name:"Cabinet"}}},[e._v("\n                    "+e._s(e.$t("profile.routes.Cabinet"))+"\n                ")]),e._v(" "),"Cabinet"!==e.$route.name&&e.breadcrumbs&&0===e.breadcrumbs.length?n("breadcrumb-item",{key:e.$route.name,attrs:{to:e.$route.path}},[e._v("\n                    "+e._s(e.$t("profile.routes."+e.$route.name))+"\n                ")]):e._e(),e._v(" "),e._l(e.breadcrumbs,(function(t){return n("breadcrumb-item",{key:t.name,attrs:{to:t.to}},[e._v("\n                    "+e._s(t.name)+"\n                ")])}))],2),e._v(" "),n("div",{staticClass:"profile-view__main"},[n("transition",{attrs:{name:"fade-absolute"}},[n("router-view",{staticClass:"profile-view__main-view"})],1)],1)],1):n("div",{staticClass:"container profile-view__container--desktop"},[n("breadcrumbs",[n("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e._v("\n                    Главная\n                ")]),e._v(" "),n("breadcrumb-item",{key:"Cabinet",attrs:{to:{name:"Cabinet"}}},[e._v("\n                    "+e._s(e.$t("profile.routes.Cabinet"))+"\n                ")]),e._v(" "),"Cabinet"!==e.$route.name&&e.breadcrumbs&&0===e.breadcrumbs.length?n("breadcrumb-item",{key:e.$route.name,attrs:{to:e.$route.path}},[e._v("\n                    "+e._s(e.$t("profile.routes."+e.$route.name))+"\n                ")]):e._e(),e._v(" "),e._l(e.breadcrumbs,(function(t){return n("breadcrumb-item",{key:t.name,attrs:{to:t.to}},[e._v("\n                    "+e._s(t.name)+"\n                ")])}))],2),e._v(" "),n("div",{staticClass:"profile-view__grid"},[n("v-sticky",{staticClass:"profile-view__panel",scopedSlots:e._u([{key:"sticky",fn:function(){return[n("navigation-panel",{attrs:{groups:e.groups}})]},proxy:!0}],null,!1,1467984906)}),e._v(" "),n("div",{staticClass:"profile-view__main"},[n("transition",{attrs:{name:"fade-absolute"}},[n("router-view",{staticClass:"profile-view__main-view"})],1)],1)],1)],1)],1),e._v(" "),n("transition",{attrs:{name:"fade-in"}},[e.isNavigationOpen&&e.isTabletLg?n("navigation-modal",{attrs:{groups:e.groups}}):e._e()],1)],1)}),[],!1,null,null,null);t.default=T.exports}}]);