(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{"1ttx":function(t,e,s){},"5P1y":function(t,e,s){"use strict";s("1ttx");var i={name:"separator-section"},a=s("KHd+"),n=Object(a.a)(i,(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"separator-section"},[e("div",{staticClass:"container separator-section__container"})])}],!1,null,null,null);e.a=n.exports},FB7E:function(t,e,s){},eFfy:function(t,e,s){"use strict";var i=s("NDiG"),a=s("jYNS"),n=s("W6hq"),c=s("oxRU"),r=(s("gB8C"),s("FB7E"),{name:"category-card",components:{VSvg:i.a,VPicture:a.a},props:{categoryId:{type:[Number,String]},name:{type:String},image:{type:[Object,String]},code:{type:String}},computed:{url:function(){return Object(n.c)(c.productGroupTypes.CATALOG,null,this.code)}}}),o=s("KHd+"),l=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"category-card"},[e("router-link",{staticClass:"category-card__img",attrs:{to:this.url}},[this.image?e("v-picture",{attrs:{image:this.image,alt:this.name}}):e("v-svg",{attrs:{id:"category-card-empty",name:"logo"}})],1),this._v("\n    "+this._s(this.name)+"\n")],1)}),[],!1,null,null,null).exports,u=(s("vmqp"),{name:"categories-section",components:{CategoryCard:l},props:{categories:{type:Array,default:function(){return[]}}}}),p=Object(o.a)(u,(function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"section categories-section"},[e("div",{staticClass:"container categories-section__container"},[e("div",{staticClass:"categories-section__list"},this._l(this.categories,(function(t){return e("category-card",{key:t.id,staticClass:"categories-section__item",attrs:{name:t.name,image:t.image,code:t.code}})})),1)])])}),[],!1,null,null,null);e.a=p.exports},vmqp:function(t,e,s){}}]);