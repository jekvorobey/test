(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{CS1t:function(e,t,i){},o3vK:function(e,t,i){"use strict";i("CS1t");function n(e){return function(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var a=["checkbox","radio"],c={serverCacheKey:function(e){return"".concat(e.id,"-").concat(e.type,"-").concat(e.name,"-").concat(e.value)},name:"v-check",inheritAttrs:!1,model:{prop:"modelValue",event:"change"},props:{modelValue:{},checked:{},id:{type:[Number,String],required:!0},name:{type:String,required:!0},value:{type:[Number,String]},type:{type:String,default:"checkbox",validator:function(e){return-1!==a.indexOf(e)}},indeterminate:{type:Boolean},isSwitch:{type:Boolean}},data:function(){return{m_checked:void 0}},computed:{shouldBeChecked:function(){return void 0!==this.modelValue?"radio"===this.type?this.modelValue===this.value:this.modelValue instanceof Array?this.modelValue.includes(this.value):"string"==typeof this.modelValue||!!this.modelValue:void 0===this.m_checked?this.m_checked="string"==typeof this.checked||!!this.checked:this.m_checked&&!this.indeterminate}},watch:{checked:function(e,t){var i=this;this.$nextTick((function(){return i.m_checked=e}))},indeterminate:function(e){var t=this.$refs.input;t&&(t.indeterminate=e)}},methods:{updateInput:function(e){if("radio"!==this.type){var t=e.target.checked;if(this.m_checked=t,this.modelValue instanceof Array){var i=n(this.modelValue);t?i.push(this.value):i.splice(i.indexOf(this.value),1),this.$emit("change",i)}else this.$emit("change",t)}else this.$emit("change",this.value)}}},r=i("KHd+"),o=Object(r.a)(c,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"v-check",class:{"is-switch":e.isSwitch}},[i("input",e._b({ref:"input",staticClass:"v-check__input",attrs:{id:e.id,type:e.type,name:e.name},domProps:{checked:e.shouldBeChecked,value:e.value},on:{change:e.updateInput}},"input",e.$attrs,!1)),e._v(" "),i("label",{staticClass:"v-check__label",attrs:{for:e.id}},[e._t("default")],2)])}),[],!1,null,null,null);t.a=o.exports}}]);