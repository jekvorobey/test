(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"9KNI":function(t,n,c){},muNP:function(t,n,c){"use strict";var e=c("4BeY"),o=c.n(e),a=c("IaFt"),i=c.n(a),s=new o.a({id:"icon-check-small",use:"icon-check-small-usage",viewBox:"0 0 10 8",content:'<symbol viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" id="icon-check-small">\r\n    <path d="M1 4.5L4 7L9 1" stroke="#141116" />\r\n</symbol>'});i.a.add(s)},qjh8:function(t,n,c){"use strict";var e=c("NDiG"),o=c("7cXU"),a=(c("muNP"),c("9KNI"),{name:"checkout-option-card",components:{VSvg:e.a,VLink:o.a},props:{readonly:{type:Boolean,default:!1},selected:{type:Boolean,default:!1},btnText:{type:String,default:"Изменить"},showCheck:{type:Boolean,default:!0}},methods:{onCardClick:function(){this.$emit("cardClick")},onBtnClick:function(){this.$emit("btnClick")}}}),i=c("KHd+"),s=Object(i.a)(a,(function(){var t=this,n=t.$createElement,c=t._self._c||n;return c("li",{staticClass:"checkout-option-card",class:{"checkout-option-card--selected":t.selected},on:{click:function(n){return n.stopPropagation(),t.onCardClick(n)}}},[c("div",{staticClass:"checkout-option-card__left"},[t._t("default")],2),t._v(" "),c("div",{staticClass:"checkout-option-card__right"},[t.showCheck?c("v-svg",{staticClass:"checkout-option-card__right-selected",attrs:{name:"check-small",width:"24",height:"24"}}):t._e(),t._v(" "),t._t("controls",[t.readonly?t._e():c("v-link",{staticClass:"checkout-option-card__right-link",attrs:{tag:"button"},on:{click:function(n){return n.stopPropagation(),t.onBtnClick(n)}}},[t._v("\n                "+t._s(t.btnText)+"\n            ")])])],2)])}),[],!1,null,null,null);n.a=s.exports}}]);