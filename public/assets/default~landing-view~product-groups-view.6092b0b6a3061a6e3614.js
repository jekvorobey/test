(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"1ttx":function(t,e,i){},"5P1y":function(t,e,i){"use strict";i("1ttx");var s={name:"separator-section"},a=i("KHd+"),n=Object(a.a)(s,(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"separator-section"},[e("div",{staticClass:"container separator-section__container"})])}],!1,null,null,null);e.a=n.exports},FB7E:function(t,e,i){},eFfy:function(t,e,i){"use strict";var s=i("NDiG"),a=i("jYNS"),n=i("W6hq"),c=i("fhPv"),r=(i("gB8C"),i("FB7E"),{name:"category-card",components:{VSvg:s.a,VPicture:a.a},props:{categoryId:{type:[Number,String]},name:{type:String},image:{type:[Object,String]},code:{type:String}},computed:{url:function(){return Object(n.c)(c.d.CATALOG,null,this.code)}}}),o=i("KHd+"),l=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"category-card"},[e("router-link",{staticClass:"category-card__img",attrs:{to:this.url}},[this.image?e("v-picture",{attrs:{image:this.image,alt:this.name}}):e("v-svg",{attrs:{id:"category-card-empty",name:"logo"}})],1),this._v("\n    "+this._s(this.name)+"\n")],1)}),[],!1,null,null,null).exports,u=(i("vmqp"),{name:"categories-section",components:{CategoryCard:l},props:{categories:{type:Array,default:function(){return[]}}}}),g=Object(o.a)(u,(function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"section categories-section"},[e("div",{staticClass:"container categories-section__container"},[e("div",{staticClass:"categories-section__list"},this._l(this.categories,(function(t){return e("category-card",{key:t.id,staticClass:"categories-section__item",attrs:{name:t.name,image:t.image,code:t.code}})})),1)])])}),[],!1,null,null,null);e.a=g.exports},vmqp:function(t,e,i){}}]);