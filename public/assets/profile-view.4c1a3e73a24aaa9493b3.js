(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{"0GyC":function(e,t,n){},"6Ujf":function(e,t,n){},jwZw:function(e,t,n){"use strict";n.r(t);var r=n("NDiG"),a=n("i2Ud"),i=n("ze5i"),o=(n("PZpB"),n("45Ux"),n("obii")),s=n("zfPd"),c=n("lo4X"),u=n("a6oV"),l=n("L2JU"),b=n("55Sm"),p=n("jDKC");n("0GyC");function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v="navigation-modal",d={name:v,components:{GeneralModal:u.a,NavigationPanel:c.a},props:{groups:{type:Array,default:function(){return[]}}},computed:{isTabletLg:function(){return this.$mq.tabletLg}},methods:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},Object(l.b)(b.b,[p.a]),{onClose:function(){this[p.a]({name:v,open:!1})}})},_=n("KHd+"),g=Object(_.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("general-modal",{staticClass:"navigation-modal",attrs:{type:"fullscreen","is-mobile":e.isTabletLg},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[n("div",{staticClass:"container navigation-modal__container"},[n("navigation-panel",{staticClass:"navigation-modal__panel",attrs:{groups:e.groups}})],1)]},proxy:!0}])})}),[],!1,null,null,null).exports,y=n("rBTT"),O=n("YPqg"),w=n("GyY8"),j=n("3eXy"),C=n("48TQ"),h=(n("g0Ed"),n("4BeY")),P=n.n(h),k=n("IaFt"),$=n.n(k),x=new P.a({id:"icon-home",use:"icon-home-usage",viewBox:"0 0 16 16",content:'<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="icon-home">\r\n    <path d="M3.35865 7.25458L7.66214 3.30971C7.8533 3.13448 8.1467 3.13448 8.33786 3.30971L12.6414 7.25458C12.8678 7.46212 12.9862 7.76219 12.9627 8.06843L12.6188 12.5383C12.5988 12.7988 12.3816 13 12.1203 13H9.33333C9.05719 13 8.83333 12.7761 8.83333 12.5V10.5C8.83333 10.0398 8.46024 9.66667 8 9.66667C7.53976 9.66667 7.16667 10.0398 7.16667 10.5V12.5C7.16667 12.7761 6.94281 13 6.66667 13H3.87968C3.61841 13 3.40119 12.7988 3.38115 12.5383L3.03731 8.06843C3.01376 7.76219 3.13224 7.46212 3.35865 7.25458Z" />\r\n</symbol>'});$.a.add(x),n("6Ujf");function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){S(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var T={name:"profile",components:{VSvg:r.a,VButton:a.a,VSticky:i.a,Breadcrumbs:o.a,BreadcrumbItem:s.a,NavigationPanel:c.a,NavigationModal:g},computed:D({},Object(l.d)(y.b,[y.a]),{},Object(l.d)(O.c,[O.b]),{},Object(l.d)(O.c,S({},O.e,(function(e){return e[O.f]&&e[O.f][O.e]||!1}))),{},Object(l.d)(b.b,{isNavigationOpen:function(e){return e[b.a][v]&&e[b.a][v].open}}),{groups:function(){var e=[{id:1,name:this.$t("profile.groups.profile"),routes:[{name:"Cabinet",exact:!0},{name:"Preferences",exact:!0},{name:"Addresses",exact:!0},{name:"Payment",exact:!0},{name:"Orders"}]}];return e},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:S({},O.b,(function(e){e||this.$router.replace(w.a.path)})),methods:D({},Object(l.b)(b.b,[p.a]),{onOpenNavigation:function(){this[p.a]({name:v,open:!0})}}),beforeRouteEnter:function(e,t,n){Object(C.a)(j.$store,y.b,y.e),n()}},B=Object(_.a)(T,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section profile-view"},[n("transition",{attrs:{name:"fade-in"}},[e.isTabletLg?n("v-sticky",{staticClass:"profile-view__panel profile-view__container--mobile",scopedSlots:e._u([{key:"sticky",fn:function(){return[n("v-button",{staticClass:"profile-view__panel-btn",on:{click:e.onOpenNavigation}},[e._v("\n                    "+e._s(e.$t("profile.routes."+e.$route.name))),n("v-svg",{attrs:{name:"arrow-updown",width:"16",height:"16"}})],1)]},proxy:!0}])},[e._v(" "),n("breadcrumbs",{staticClass:"container"},[n("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e._v("\n                    Главная\n                    ")]),e._v(" "),n("breadcrumb-item",{key:"Cabinet",attrs:{to:{name:"Cabinet"}}},[e._v("\n                    "+e._s(e.$t("profile.routes.Cabinet"))+"\n                ")]),e._v(" "),"Cabinet"!==e.$route.name&&e.breadcrumbs&&0===e.breadcrumbs.length?n("breadcrumb-item",{key:e.$route.name,attrs:{to:e.$route.path}},[e._v("\n                    "+e._s(e.$t("profile.routes."+e.$route.name))+"\n                ")]):e._e(),e._v(" "),e._l(e.breadcrumbs,(function(t){return n("breadcrumb-item",{key:t.name,attrs:{to:t.to}},[e._v("\n                    "+e._s(t.name)+"\n                ")])}))],2),e._v(" "),n("div",{staticClass:"profile-view__main"},[n("transition",{attrs:{name:"fade-absolute"}},[n("router-view",{staticClass:"profile-view__main-view"})],1)],1)],1):n("div",{staticClass:"container profile-view__container--desktop"},[n("breadcrumbs",[n("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e._v("\n                    Главная\n                ")]),e._v(" "),n("breadcrumb-item",{key:"Cabinet",attrs:{to:{name:"Cabinet"}}},[e._v("\n                    "+e._s(e.$t("profile.routes.Cabinet"))+"\n                ")]),e._v(" "),"Cabinet"!==e.$route.name&&e.breadcrumbs&&0===e.breadcrumbs.length?n("breadcrumb-item",{key:e.$route.name,attrs:{to:e.$route.path}},[e._v("\n                    "+e._s(e.$t("profile.routes."+e.$route.name))+"\n                ")]):e._e(),e._v(" "),e._l(e.breadcrumbs,(function(t){return n("breadcrumb-item",{key:t.name,attrs:{to:t.to}},[e._v("\n                    "+e._s(t.name)+"\n                ")])}))],2),e._v(" "),n("div",{staticClass:"profile-view__grid"},[n("v-sticky",{staticClass:"profile-view__panel",scopedSlots:e._u([{key:"sticky",fn:function(){return[n("navigation-panel",{attrs:{groups:e.groups}})]},proxy:!0}],null,!1,1467984906)}),e._v(" "),n("div",{staticClass:"profile-view__main"},[n("transition",{attrs:{name:"fade-absolute"}},[n("router-view",{staticClass:"profile-view__main-view"})],1)],1)],1)],1)],1),e._v(" "),n("transition",{attrs:{name:"fade-in"}},[e.isNavigationOpen&&e.isTabletLg?n("navigation-modal",{attrs:{groups:e.groups}}):e._e()],1)],1)}),[],!1,null,null,null);t.default=B.exports}}]);