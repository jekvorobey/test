(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{YSwA:function(t,i,e){"use strict";var s=e("NDiG"),n=(e("PnIt"),e("Kw5r")),r=e("IgUp");n.default.use(r);e("36R9"),e("knGU");var a={name:"v-slider",components:{VSvg:s.a},serverCacheKey:function(t){return t.name},props:{name:{type:String,required:!0},options:{type:Object,default:function(){return{init:!1,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}}},shouldInitialize:{type:Boolean,default:!0}},watch:{shouldInitialize:function(t){t&&!this.initialized&&this.slider.init()}},methods:{onEndReached:function(){this.$emit("reachEnd")}},mounted:function(){this.slider&&(this.slider.on("reachEnd",this.onEndReached),this.shouldInitialize&&this.slider.init())},beforeDestroy:function(){this.slider&&(this.slider.destroy(!0,!1),this.slider=null)}},o=e("KHd+"),l=Object(o.a)(a,(function(){var t=this.$createElement,i=this._self._c||t;return i("div",{directives:[{name:"swiper",rawName:"v-swiper:slider",value:this.options,expression:"options",arg:"slider"}],staticClass:"v-slider"},[i("div",{staticClass:"swiper-wrapper"},[this._t("default")],2),this._v(" "),i("div",{staticClass:"v-slider__controls"},[i("button",{staticClass:"swiper-button-prev"},[i("v-svg",{attrs:{name:"arrow-small",width:"24",height:"24"}})],1),this._v(" "),i("div",{staticClass:"swiper-pagination"}),this._v(" "),i("button",{staticClass:"swiper-button-next"},[i("v-svg",{attrs:{name:"arrow-small",width:"24",height:"24"}})],1)])])}),[],!1,null,null,null);i.a=l.exports},knGU:function(t,i,e){}}]);