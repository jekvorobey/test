(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"36R9":function(t,e,i){},YSwA:function(t,e,i){"use strict";var s=i("NDiG"),n=(i("PnIt"),i("Kw5r")),r=i("IgUp");n.default.use(r);i("36R9"),i("knGU");var a={name:"v-slider",components:{VSvg:s.a},serverCacheKey:function(t){return t.name},props:{name:{type:String,required:!0},options:{type:Object,default:function(){return{init:!1,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}}},shouldInitialize:{type:Boolean,default:!0},controls:{type:Boolean,default:!0}},watch:{shouldInitialize:function(t){t&&!this.initialized&&this.slider.init()}},methods:{onEndReached:function(){this.$emit("reachEnd")}},mounted:function(){this.slider&&(this.slider.on("reachEnd",this.onEndReached),this.shouldInitialize&&this.slider.init())},beforeDestroy:function(){this.slider&&(this.slider.destroy(!0,!1),this.slider=null)}},o=i("KHd+"),l=Object(o.a)(a,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"swiper",rawName:"v-swiper:slider",value:t.options,expression:"options",arg:"slider"}],staticClass:"v-slider",class:{"v-slider--disabled":!t.controls}},[i("div",{staticClass:"swiper-wrapper"},[t._t("default")],2),t._v(" "),t.controls?i("div",{staticClass:"v-slider__controls"},[i("button",{staticClass:"swiper-button-prev"},[i("v-svg",{attrs:{name:"arrow-small",width:"24",height:"24"}})],1),t._v(" "),i("div",{staticClass:"swiper-pagination"}),t._v(" "),i("button",{staticClass:"swiper-button-next"},[i("v-svg",{attrs:{name:"arrow-small",width:"24",height:"24"}})],1)]):t._e()])}),[],!1,null,null,null);e.a=l.exports},knGU:function(t,e,i){}}]);