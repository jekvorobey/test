(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{"6Ujf":function(e,t,a){},"70ve":function(e,t,a){},TKdL:function(e,t,a){},jwZw:function(e,t,a){"use strict";a.r(t);var n=a("ze5i"),r=(a("TKdL"),{name:"breadcrumbs"}),i=a("KHd+"),s=Object(i.a)(r,(function(){var e=this.$createElement;return(this._self._c||e)("transition-group",{staticClass:"breadcrumbs",attrs:{tag:"ol",name:"fade-in"}},[this._t("default")],2)}),[],!1,null,null,null).exports,o=(a("k932"),{name:"breadcrumb-item",props:{to:{type:[String,Object],default:"/"}}}),c=Object(i.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"breadcrumb-item"},[t("router-link",{staticClass:"breadcrumb-item__link",attrs:{to:this.to}},[this._t("default")],2)],1)}),[],!1,null,null,null).exports,l=a("7cXU"),u=(a("70ve"),{name:"navigation-panel",components:{VLink:l.a},computed:{groups:function(){return[{id:1,name:this.$t("profile.groups.profile"),routes:[{name:"Cabinet",exact:!0},{name:"Preferences",exact:!0},{name:"Addresses",exact:!0},{name:"Payment",exact:!0},{name:"Subscribes",exact:!0},{name:"Messages",displayName:this.$tc("profile.format.messages",5)},{name:"Certificates",exact:!0},{name:"Bonuses",exact:!0},{name:"Orders"},{name:"ReferalOrders"}]},{id:2,name:this.$t("profile.groups.business"),routes:[{name:"Referal",exact:!0},{name:"ProPreferences",exact:!0},{name:"Promopage",exact:!0},{name:"Seo",exact:!0},{name:"Promocodes",exact:!0},{name:"Account",exact:!0},{name:"Billing",exact:!0},{name:"Documents",exact:!0}]},{id:3,name:this.$t("profile.groups.training"),routes:[{name:"HowItWorks",exact:!0},{name:"Guides"},{name:"Masterclasses",exact:!0},{name:"QnA",exact:!0}]}]}}}),m=Object(i.a)(u,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"navigation-panel"},[e._l(e.groups,(function(t){return a("div",{key:t.id,staticClass:"navigation-panel__group"},[a("p",{staticClass:"text-medium navigation-panel__group-hl"},[e._v(e._s(t.name))]),e._v(" "),a("ul",{staticClass:"navigation-panel__group-list"},e._l(t.routes,(function(t){return a("li",{key:t.name,staticClass:"navigation-panel__group-item"},[a("v-link",{staticClass:"navigation-panel__group-link",attrs:{to:{name:t.name},exact:t.exact}},[e._v("\n                    "+e._s(t.displayName||e.$t("profile.routes."+t.name))+"\n                ")])],1)})),0)])})),e._v(" "),a("br"),e._v(" "),a("v-link",{staticClass:"navigation-panel__group-link",attrs:{to:"/"}},[e._v("Выйти")])],2)}),[],!1,null,null,null).exports,p=a("BZIu"),b=a("L2JU"),f=a("rBTT"),_=a("48TQ");a("6Ujf");function v(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function d(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var g={name:"profile",components:{VSticky:n.a,Breadcrumbs:s,BreadcrumbItem:c,NavigationPanel:m},computed:function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?v(Object(a),!0).forEach((function(t){d(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):v(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},Object(b.d)(f.b,[f.a])),beforeRouteEnter:function(e,t,a){Object(_.a)(p.$store,f.b,f.d),a()}},y=Object(i.a)(g,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"section profile-view"},[a("div",{staticClass:"container"},[a("breadcrumbs",[a("breadcrumb-item",{key:"main",attrs:{to:"/"}},[e._v("\n                Главная\n            ")]),e._v(" "),a("breadcrumb-item",{key:"Cabinet",attrs:{to:{name:"Cabinet"}}},[e._v("\n                "+e._s(e.$t("profile.routes.Cabinet"))+"\n            ")]),e._v(" "),"Cabinet"!==e.$route.name&&0===e.breadcrumbs.length?a("breadcrumb-item",{key:e.$route.name,attrs:{to:e.$route.path}},[e._v("\n                "+e._s(e.$t("profile.routes."+e.$route.name))+"\n            ")]):e._e(),e._v(" "),e._l(e.breadcrumbs,(function(t){return a("breadcrumb-item",{key:t.name,attrs:{to:t.to}},[e._v("\n                "+e._s(t.name)+"\n            ")])}))],2)],1),e._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"profile-view__grid"},[a("v-sticky",{staticClass:"profile-view__panel",scopedSlots:e._u([{key:"sticky",fn:function(){return[a("navigation-panel")]},proxy:!0}])}),e._v(" "),a("div",{staticClass:"profile-view__main"},[a("transition",{attrs:{name:"fade-absolute"}},[a("router-view",{staticClass:"profile-view__main-view"})],1)],1)],1)])])}),[],!1,null,null,null);t.default=y.exports},k932:function(e,t,a){}}]);