(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{nuHk:function(t,n,e){"use strict";var i=e("6foH"),a=e.n(i),s=(e("xrSz"),e("URgk")),u=e("sEfC"),r=e.n(u),o={name:"v-range",props:{initialValue:{type:Array},value:{type:Array},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},format:{type:Object,default:function(){}},name:{type:String,default:void 0}},data:function(){var t=this.value||this.initialValue||[],n=t.length<2;return{isSingle:n,value_internal:null,options:{start:t,connect:!n||"lower",step:this.step,range:{min:this.min,max:this.max},format:this.format}}},watch:{value:function(){for(var t=0;t<this.value.length;t++)if(this.value_internal[t]!==this.value[t])return this.value_internal=this.value,void this.slider.set(this.value_internal)},min:function(t){this.options.range.min=t},max:function(t){this.options.range.max=t},step:function(t){this.options.step=t},format:function(t){this.options.format=t},options:{handler:function(t){this.slider.updateOptions(this.value,!0)},deep:!0}},methods:{maxLength:function(t){var n=this.value[1].toString().length,e=this.max.toString().length;return 1==t?e:Math.min(n<this.min.toString().length?e:n,e)},isInputCompleted:function(t,n){var e=Number(t.target.value);return e>this.min&&(1!=n||e>=this.value[0])},onInputChange:function(t,n){this.debounce_onInput&&this.debounce_onInput.cancel(),this.value_internal[n]=Number(t.target.value),this.slider.set(this.value_internal),this.$emit("input",this.value_internal)},onInput:function(t,n){this.debounce_onInput&&this.debounce_onInput.cancel(),0==n&&this.value[1]>=this.min&&(t.target.value=Math.min(Number(t.target.value),Math.min(this.value[1],this.max)).toString()),Number(t.target.value).toString().length>this.maxLength(n)&&(t.target.value=Number(t.target.value).toString().slice(0,this.maxLength(n))),this.debounce_onInput=r()((function(t,n){this.isInputCompleted(t,n)&&(this.value_internal[n]=Number(t.target.value),this.slider.set(this.value_internal),this.$emit("input",this.value_internal))}),500),this.debounce_onInput(t,n)},onUpdate:function(t,n,e,i,a){this.value_internal=t},onChange:function(t,n,e,i,a){this.debounce_onInput&&this.debounce_onInput.cancel(),this.debounce_onInput=r()((function(t){this.value_internal=t,this.$emit("input",this.value_internal)}),500),this.debounce_onInput(t)}},mounted:function(){var t=this.$refs.body;this.slider=a.a.create(t,this.options),this.slider.on("update",this.onUpdate),this.slider.on("change",this.onChange)},beforeDestroy:function(){this.slider&&this.slider.off()},destroyed:function(){var t=this;Object(s.setTimeout)((function(){t.slider&&(t.slider.destroy(),t.slider=null)}),250)}},l=e("KHd+"),h=Object(l.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"v-range"},[e("div",{ref:"body",staticClass:"v-range__body"}),t._v(" "),e("div",{staticClass:"v-range__container"},t._l(t.value_internal,(function(n,i){return e("span",{key:i},[e("label",{staticClass:"v-range__label"},[t._t("label",[t._v(t._s(t.isSingle?"":0===i?"от":"до"))],{index:i})],2),t._v(" "),e("input",{staticClass:"v-range__input",attrs:{type:"number",name:t.name},domProps:{value:n},on:{change:function(n){return t.onInputChange(n,i)},input:function(n){return t.onInput(n,i)}}})])})),0)])}),[],!1,null,null,null);n.a=h.exports},xrSz:function(t,n,e){}}]);