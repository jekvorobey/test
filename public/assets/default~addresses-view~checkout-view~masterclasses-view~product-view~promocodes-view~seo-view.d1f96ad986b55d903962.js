(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{nurM:function(e,t,n){"use strict";var i=n("o3vK"),a=(n("teLX"),{name:"radio-switch",components:{VCheck:i.a},props:{id:{type:[String,Number]},keyField:{type:String,default:"value"},value:{type:[String,Number,Boolean]},name:{type:String,default:"radio-switch",required:!0},items:{type:Array,default:function(){return[]}}},data:function(){return{internalValue:this.value}},watch:{internalValue:function(e){this.$emit("input",e)},value:function(e){this.internalValue=e}}}),l=n("KHd+"),r=Object(l.a)(a,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"radio-switch"},e._l(e.items,(function(t,i){return n("v-check",{key:t[e.keyField],staticClass:"radio-switch__radio",attrs:{type:"radio",id:"radio-switch-"+e.id+"-"+i,value:t[e.keyField],name:e.name},model:{value:e.internalValue,callback:function(t){e.internalValue=t},expression:"internalValue"}},[e._t("content",[e._v("\n            "+e._s(t.title)+"\n        ")],{item:t,index:i})],2)})),1)}),[],!1,null,null,null);t.a=r.exports},teLX:function(e,t,n){}}]);