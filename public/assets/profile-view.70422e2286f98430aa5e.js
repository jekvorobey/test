(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{"6Ujf":function(e,t,n){},"70ve":function(e,t,n){},TKdL:function(e,t,n){},jwZw:function(e,t,n){"use strict";n.r(t);var a=n("ze5i"),r=(n("TKdL"),{name:"breadcrumbs"}),s=n("KHd+"),i=Object(s.a)(r,(function(){var e=this.$createElement;return(this._self._c||e)("transition-group",{staticClass:"breadcrumbs",attrs:{tag:"ol",name:"fade-in"}},[this._t("default")],2)}),[],!1,null,null,null).exports,o=(n("k932"),{name:"breadcrumb-item",props:{to:{type:[String,Object],default:"/"}}}),c=Object(s.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"breadcrumb-item"},[t("router-link",{staticClass:"breadcrumb-item__link",attrs:{to:this.to}},[this._t("default")],2)],1)}),[],!1,null,null,null).exports,l=n("7cXU"),u=(n("70ve"),{name:"navigation-panel",components:{VLink:l.a},computed:{groups:function(){return[{id:1,name:this.$t("profile.groups.profile"),routes:[{name:"Account",exact:!0},{name:"Preferences",exact:!0},{name:"Addresses",exact:!0},{name:"Payment",exact:!0},{name:"Subscribes",exact:!0},{name:"Messages",displayName:this.$tc("profile.format.messages",5)},{name:"Certificates",exact:!0},{name:"Bonuses",exact:!0},{name:"Orders"}]},{id:2,name:this.$t("profile.groups.business"),routes:[{name:"Referal",exact:!0},{name:"ProPreferences",exact:!0},{name:"Promopage",exact:!0},{name:"Seo",exact:!0},{name:"Promocodes",exact:!0}]}]}}}),m=Object(s.a)(u,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"navigation-panel"},[e._l(e.groups,(function(t){return n("div",{key:t.id,staticClass:"navigation-panel__group"},[n("p",{staticClass:"text-medium navigation-panel__group-hl"},[e._v(e._s(t.name))]),e._v(" "),n("ul",{staticClass:"navigation-panel__group-list"},e._l(t.routes,(function(t){return n("li",{key:t.name,staticClass:"navigation-panel__group-item"},[n("v-link",{staticClass:"navigation-panel__group-link",attrs:{to:{name:t.name},exact:t.exact}},[e._v("\n                    "+e._s(t.displayName||e.$t("profile.routes."+t.name))+"\n                ")])],1)})),0)])})),e._v(" "),n("br"),e._v(" "),n("v-link",{staticClass:"navigation-panel__group-link",attrs:{to:"/"}},[e._v("Выйти")])],2)}),[],!1,null,null,null).exports,p=n("BZIu"),f=n("L2JU"),b=n("rBTT");n("6Ujf");function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d={name:"profile",components:{VSticky:a.a,Breadcrumbs:i,BreadcrumbItem:c,NavigationPanel:m},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(Object(n),!0).forEach((function(t){v(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},Object(f.d)(b.b,[b.a])),beforeRouteEnter:function(e,t,n){!!p.$store._modulesNamespaceMap["".concat(b.b,"/")]||p.$store.registerModule(b.b,b.d,{preserveState:!!p.$store.state.profile}),n()}},g=Object(s.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section profile-view"},[n("div",{staticClass:"container"},[n("breadcrumbs",[n("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e._v("\n                Главная\n            ")]),e._v(" "),n("breadcrumb-item",{key:"account",attrs:{to:{name:"Account"}}},[e._v("\n                "+e._s(e.$t("profile.routes.Account"))+"\n            ")]),e._v(" "),"Account"!==e.$route.name&&0===e.breadcrumbs.length?n("breadcrumb-item",{key:e.$route.name,attrs:{to:e.$route.path}},[e._v("\n                "+e._s(e.$t("profile.routes."+e.$route.name))+"\n            ")]):e._e(),e._v(" "),e._l(e.breadcrumbs,(function(t){return n("breadcrumb-item",{key:t.name,attrs:{to:t.to}},[e._v("\n                "+e._s(t.name)+"\n            ")])}))],2)],1),e._v(" "),n("div",{staticClass:"container"},[n("div",{staticClass:"profile-view__grid"},[n("v-sticky",{staticClass:"profile-view__panel",scopedSlots:e._u([{key:"sticky",fn:function(){return[n("navigation-panel")]},proxy:!0}])}),e._v(" "),n("div",{staticClass:"profile-view__main"},[n("transition",{attrs:{name:"fade-absolute"}},[n("router-view",{staticClass:"profile-view__main-view"})],1)],1)],1)])])}),[],!1,null,null,null);t.default=g.exports},k932:function(e,t,n){}}]);