(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"3C5o":function(t,e,n){"use strict";var i=n("NDiG"),s=(n("TzNh"),n("fIfu"),n("6KdU"),"decrement"),r="increment",o=null;"undefined"!=typeof document&&(o=new CustomEvent("pressHold"));var u={name:"v-counter",inheritAttrs:!1,components:{VSvg:i.a},model:{prop:"value",event:"input"},props:{value:{type:[Number,String],default:0},step:{type:[Number,String],default:1},min:{type:[Number,String],default:-999},max:{type:[Number,String],default:999},delay:{type:Number,default:200}},data:function(){var t=this.value<this.max?this.value:this.max;return{pressHoldDuration:20,timerID:null,counter:0,value_internal:Number(t)}},watch:{value:function(t){this.value_internal=Number(t)}},methods:{updateValue:function(t){var e=this.$refs.input;if(e&&t){var n=Number(this.step),i=Number(e.max),o=Number(e.min),u=0;switch(t){case s:(u=this.value_internal-n)>=o&&(this.value_internal=u);break;case r:(u=this.value_internal+n)<=i&&(this.value_internal=u)}this.$emit("input",this.value_internal)}},onChange:function(t){var e=t.currentTarget,n=Number(e.max),i=Number(e.min),s=Number(e.value);this.value_internal=s<=i?i:s>=n?n:s,this.$forceUpdate(),this.$emit("input",this.value_internal)},onBtnClick:function(t,e){this.updateValue(e)},onPressingDown:function(t){requestAnimationFrame(this.timer),this.target=t.target},onNotPressingDown:function(t){cancelAnimationFrame(this.timerID),this.timeout&&clearInterval(this.timeout),this.timeout=null,this.timerID=null,this.counter=0,this.target=null},timer:function(){this.counter<this.pressHoldDuration?(this.timerID=requestAnimationFrame(this.timer),this.counter+=1):this.target&&this.target.dispatchEvent(o)},bindEvents:function(t,e){var n=this;t.addEventListener("mousedown",this.onPressingDown,!1),t.addEventListener("mouseup",this.onNotPressingDown,!1),t.addEventListener("mouseleave",this.onNotPressingDown,!1),t.addEventListener("touchstart",this.onPressingDown,!1),t.addEventListener("touchend",this.onNotPressingDown,!1),t.addEventListener("pressHold",e,!1),this.$once("hook:beforeDestroy",(function(){t.removeEventListener("mousedown",n.onPressingDown),t.removeEventListener("mouseup",n.onNotPressingDown),t.removeEventListener("mouseleave",n.onNotPressingDown),t.removeEventListener("touchstart",n.onPressingDown),t.removeEventListener("touchend",n.onNotPressingDown),t.removeEventListener("pressHold",e)}))},onHold:function(t){this.timeout&&clearInterval(this.timeout),this.timeout=setInterval(this.updateValue.bind(this,t),this.delay)}},mounted:function(){var t=this.$refs,e=t.increment,n=t.decrement;this.bindEvents(e,this.onHold.bind(this,r)),this.bindEvents(n,this.onHold.bind(this,s))},beforeDestroy:function(){cancelAnimationFrame(this.timerID),clearInterval(this.timeout),this.timeout=null,this.timerID=null,this.target=null}},a=n("KHd+"),l=Object(a.a)(u,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"v-counter"},[n("button",{ref:"decrement",staticClass:"v-counter__btn",attrs:{type:"button"},on:{click:function(e){return t.onBtnClick(e,"decrement")}}},[t._t("decrement",[n("v-svg",{attrs:{name:"minus",width:"24",height:"24"}})])],2),t._v(" "),n("input",t._b({ref:"input",staticClass:"v-counter__input",attrs:{type:"number",min:t.min,max:t.max,step:t.step},domProps:{value:t.value_internal},on:{change:t.onChange}},"input",t.$attrs,!1)),t._v(" "),n("button",{ref:"increment",staticClass:"v-counter__btn",attrs:{type:"button"},on:{click:function(e){return t.onBtnClick(e,"increment")}}},[t._t("increment",[n("v-svg",{attrs:{name:"plus",width:"24",height:"24"}})])],2)])}),[],!1,null,null,null);e.a=l.exports},"6KdU":function(t,e,n){},TzNh:function(t,e,n){"use strict";var i=n("4BeY"),s=n.n(i),r=n("IaFt"),o=n.n(r),u=new s.a({id:"icon-minus",use:"icon-minus-usage",viewBox:"0 0 24 24",content:'<symbol viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="icon-minus">\n    <line x1="6" y1="11.5" x2="18" y2="11.5" stroke="#141116" />\n</symbol>'});o.a.add(u)}}]);