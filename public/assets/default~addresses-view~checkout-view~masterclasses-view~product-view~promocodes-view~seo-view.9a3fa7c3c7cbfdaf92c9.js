(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{nurM:function(e,t,n){"use strict";var a=n("o3vK"),i=(n("teLX"),{name:"radio-switch",components:{VCheck:a.a},props:{id:{type:[String,Number]},value:{type:[String,Number,Boolean]},name:{type:String,default:"radio-switch",required:!0},items:{type:Array,default:function(){return[]}}},data:function(){return{internalValue:this.value}},watch:{internalValue:function(e){this.$emit("input",e)},value:function(e){this.internalValue=e}}}),r=n("KHd+"),u=Object(r.a)(i,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"radio-switch"},e._l(e.items,(function(t,a){return n("v-check",{key:t.value,staticClass:"radio-switch__radio",attrs:{type:"radio",id:"radio-switch-"+e.id+"-"+a,value:t.value,name:e.name},model:{value:e.internalValue,callback:function(t){e.internalValue=t},expression:"internalValue"}},[e._t("content",[e._v("\n            "+e._s(t.title)+"\n        ")],{item:t,index:a})],2)})),1)}),[],!1,null,null,null);t.a=u.exports},teLX:function(e,t,n){}}]);