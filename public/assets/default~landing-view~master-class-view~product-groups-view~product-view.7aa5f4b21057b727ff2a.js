(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{ENRa:function(t,e,a){"use strict";var i=a("jYNS"),n=a("i2Ud"),s=a("aXGN"),r=a("2JJK"),c=(a("hZnw"),{name:"banner-card",components:{VButton:n.a,VPicture:i.a},props:{tag:{type:String,default:"div"},bannerId:{type:[Number,String]},title:{type:String},image:{type:[Object,String]},to:{type:[Object,String],default:"/"},buttonText:{type:String,default:"Перейти"}},computed:{desktopImage:function(){if(this.image&&this.image.id)return Object(s.c)(400,240,this.image.id,r.fileExtension.image.WEBP)},defaultImage:function(){if(this.image&&this.image.id)return Object(s.c)(400,240,this.image.id)}}}),d=a("KHd+"),u=Object(d.a)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.tag,{tag:"component",staticClass:"banner-card"},[a("div",{staticClass:"banner-card__img"},[t.image&&t.image.id?a("v-picture",{key:t.image.id},[a("source",{attrs:{"data-srcset":t.desktopImage,type:"image/webp",media:"(min-width: 480px)"}}),t._v(" "),a("img",{staticClass:"blur-up lazyload v-picture__img",attrs:{"data-src":t.defaultImage,alt:""}})]):a("v-picture",{attrs:{image:t.image}}),t._v(" "),a("v-button",{staticClass:"btn--outline banner-card__img-btn",attrs:{to:t.to}},[t._v(t._s(t.buttonText))])],1),t._v(" "),a("div",{staticClass:"banner-card__title"},[t._v(t._s(t.title))])])}),[],!1,null,null,null);e.a=u.exports},hZnw:function(t,e,a){}}]);