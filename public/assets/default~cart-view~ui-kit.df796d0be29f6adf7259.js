(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{TpRg:function(t,e,a){},YXZs:function(t,e,a){"use strict";a("TpRg");var i=35,n=36,s=37,c=38,r=39,l=40,b=46,o={horizontal:"horizontal",vertical:"vertical"},d={name:"v-tabs",props:{ariaLabel:{type:String},keyField:{type:String},keyValue:{type:String},items:{type:Array,default:[]},activeTab:{type:Number,default:0},orientation:{type:String,default:o.horizontal,validator:function(t){return-1!==Object.values(o).indexOf(t)}}},data:function(){return{internal_active_tab:this.activeTab}},computed:{selectedItem:function(){return this.items.length>0&&!this.items[this.internal_active_tab]&&this.activateTab(0,!0),this.items[this.internal_active_tab]}},watch:{activeTab:function(t){this.activateTab(t,!1)}},methods:{getTab:function(t){return this.$refs["v-tab-".concat(t[this.keyField]||this.items.indexOf(t))][0]},activateTab:function(t,e){if(this.internal_active_tab!==t&&(this.internal_active_tab=t,this.$emit("update:activeTab",this.internal_active_tab)),e){var a=this.getTab(this.selectedItem);a&&a!==document.activeElement&&a.focus()}},onTabClick:function(t){this.activateTab(t,!1)},onTabFocus:function(t,e){var a=t.target;a!==document.activeElement&&setTimeout(this.checkTabFocus,300,a,e)},onTabKeyDown:function(t){switch(t.keyCode){case i:t.preventDefault(),this.activateTab(this.items.length-1);break;case n:t.preventDefault(),this.activateTab(0);break;case c:case l:this.determineOrientation(t)}},onTabKeyUp:function(t){switch(t.keyCode){case s:case r:this.determineOrientation(t);break;case b:this.determineDeletable(t)}},determineOrientation:function(t){var e=t.keyCode,a=!1;if(this.orientation===o.vertical)switch(e){case c:case l:t.preventDefault(),a=!0}else switch(e){case s:case r:a=!0}a&&this.switchTabOnArrowPress(t)},switchTabOnArrowPress:function(t){switch(t.keyCode){case c:case s:if(this.internal_active_tab>0)for(var e=this.internal_active_tab;e>=0;--e)this.items[e].disabled||this.activateTab(e,!0);else this.focusFirstTab();break;case l:case r:if(this.internal_active_tab>this.items.length-1)for(var a=this.internal_active_tab;a<this.items.length;++a)this.items[a].disabled||this.activateTab(a,!0);else this.focusLastTab()}},checkTabFocus:function(t,e){t===document.activeElement&&this.activateTab(e,!1)},focusFirstTab:function(){this.activateTab(0,!0)},focusLastTab:function(){this.activateTab(this.items.length-1,!0)}}},v=a("KHd+"),h=Object(v.a)(d,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"v-tabs"},[a("div",{staticClass:"v-tabs__header",attrs:{role:"tablist","aria-orientation":t.orientation,"aria-label":t.ariaLabel}},t._l(t.items,(function(e,i){return a("button",{key:e[t.keyField]||i,ref:"v-tab-"+(e[t.keyField]||i),refInFor:!0,staticClass:"v-tabs__header-item",class:{"is-active":t.internal_active_tab===i,"is-disabled":!0===e.disabled},attrs:{type:"button",role:"tab","aria-selected":t.internal_active_tab===i,"aria-disabled":!0===e.disabled,"aria-controls":"v-tab-"+(e[t.keyField]||i),id:"v-tab-"+(e[t.keyField]||i),tabindex:t.internal_active_tab===i?0:-1,disabled:!0===e.disabled},on:{click:function(e){return t.onTabClick(i)},keydown:t.onTabKeyDown,keyup:t.onTabKeyUp,focus:function(e){return t.onTabFocus(e,i)}}},[t._t("header",[t._v("\n                "+t._s(e.title)+"\n            ")],{item:e,index:i,active:t.internal_active_tab===i})],2)})),0),t._v(" "),t.selectedItem?a("div",{staticClass:"v-tabs__panel",attrs:{role:"tabpanel",id:"v-tab--panel"+(t.selectedItem[t.keyField]||t.internal_active_tab),"aria-labelledby":"v-tab-"+(t.selectedItem[t.keyField]||t.internal_active_tab)}},[t._t("panel",[t._v("\n            "+t._s(t.selectedItem[t.keyValue])+"\n        ")],{item:t.selectedItem,index:t.internal_active_tab})],2):t._e()])}),[],!1,null,null,null);e.a=h.exports}}]);