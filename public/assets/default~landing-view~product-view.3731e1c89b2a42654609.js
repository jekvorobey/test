(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"6IRk":function(t,i,e){},ENRa:function(t,i,e){"use strict";var n=e("jYNS"),s=e("i2Ud"),a=(e("hZnw"),{name:"banner-card",components:{VButton:s.a,VPicture:n.a},props:{bannerId:{type:[Number,String]},title:{type:String},image:{type:[Object,String]},buttonText:{type:String}}}),r=e("KHd+"),l=Object(r.a)(a,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"banner-card"},[e("div",{staticClass:"banner-card__img"},[e("v-picture",{attrs:{image:t.image}}),t._v(" "),e("v-button",{staticClass:"btn--outline banner-card__img-btn",attrs:{to:""}},[t._v(t._s(t.buttonText||"Перейти"))])],1),t._v(" "),e("div",{staticClass:"banner-card__title"},[t._v(t._s(t.title))])])}),[],!1,null,null,null);i.a=l.exports},YSwA:function(t,i,e){"use strict";var n=e("NDiG"),s=(e("PnIt"),e("Kw5r")),a=e("IgUp");s.default.use(a);e("36R9"),e("knGU");var r={name:"v-slider",components:{VSvg:n.a},serverCacheKey:function(t){return t.name},props:{name:{type:String,required:!0},options:{type:Object,default:function(){return{init:!1,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}}},shouldInitialize:{type:Boolean,default:!0}},watch:{shouldInitialize:function(t){t&&!this.initialized&&this.slider.init()}},methods:{onEndReached:function(){this.$emit("reachEnd")}},mounted:function(){this.slider&&(this.slider.on("reachEnd",this.onEndReached),this.shouldInitialize&&this.slider.init())},beforeDestroy:function(){this.slider&&(this.slider.destroy(!0,!1),this.slider=null)}},l=e("KHd+"),o=Object(l.a)(r,(function(){var t=this.$createElement,i=this._self._c||t;return i("div",{directives:[{name:"swiper",rawName:"v-swiper:slider",value:this.options,expression:"options",arg:"slider"}],staticClass:"v-slider"},[i("div",{staticClass:"swiper-wrapper"},[this._t("default")],2),this._v(" "),i("div",{staticClass:"v-slider__controls"},[i("button",{staticClass:"swiper-button-prev"},[i("v-svg",{attrs:{name:"arrow-small",width:"24",height:"24"}})],1),this._v(" "),i("div",{staticClass:"swiper-pagination"}),this._v(" "),i("button",{staticClass:"swiper-button-next"},[i("v-svg",{attrs:{name:"arrow-small",width:"24",height:"24"}})],1)])])}),[],!1,null,null,null);i.a=o.exports},eOVz:function(t,i,e){"use strict";var n=e("jYNS"),s=(e("6IRk"),{name:"instagram-card",components:{VPicture:n.a},props:{instagramCardId:{type:[Number,String]},image:{type:[Object,String]}}}),a=e("KHd+"),r=Object(a.a)(s,(function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"instagram-card"},[i("div",{staticClass:"instagram-card__img"},[i("v-picture",{attrs:{image:this.image}})],1)])}),[],!1,null,null,null);i.a=r.exports},hZnw:function(t,i,e){},knGU:function(t,i,e){}}]);