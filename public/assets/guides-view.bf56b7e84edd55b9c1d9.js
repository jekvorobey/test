(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{"5VG2":function(e,i,t){},KWAA:function(e,i,t){},cjNu:function(e,i,t){"use strict";t.r(i);var s=t("jYNS"),a=(t("KWAA"),{name:"guide-card",components:{VPicture:s.a},props:{title:{type:String},image:{type:[Object,String]}}}),n=t("KHd+"),u=Object(n.a)(a,(function(){var e=this.$createElement,i=this._self._c||e;return i("li",{staticClass:"guide-card"},[i("div",{staticClass:"guide-card__img"},[i("v-picture",{attrs:{image:this.image}})],1),this._v(" "),i("div",{staticClass:"guide-card__title"},[this._v(this._s(this.title))])])}),[],!1,null,null,null).exports,c=t.p+"images/guide1.560d901dd25fa724214a.png",d=t.p+"images/guide2.5ba6ed909cd1c91bd9d4.png",l=(t("5VG2"),{name:"guides",components:{GuideCard:u},data:function(){return{guides:[{id:1,image:c,code:"shampuni-i-kondicionery",title:"Шампуни и кондиционеры Aveda для вьющихся волос"},{id:2,image:d,code:"masky-r-co",title:"Маски R+Co: секрет увлажнения"}]}},methods:{onOpenGuide:function(e){this.$router.push({name:"GuideDetails",params:{guideId:e}})}}}),r=Object(n.a)(l,(function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("section",{staticClass:"section guides-view"},[t("h2",{staticClass:"guides-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),t("div",{staticClass:"container container--tablet-lg guides-view__container"},[t("ul",{staticClass:"guides-view__list"},e._l(e.guides,(function(i){return t("guide-card",{key:i.id,staticClass:"guides-view__list-item",attrs:{image:i.image,title:i.title},nativeOn:{click:function(t){return e.onOpenGuide(i.code)}}})})),1)])])}),[],!1,null,null,null);i.default=r.exports}}]);