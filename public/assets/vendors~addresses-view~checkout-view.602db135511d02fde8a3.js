(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{"1hJj":function(e,t,r){var n=r("e4Nc"),o=r("ftKO"),a=r("3A9y");function i(e){var t=-1,r=null==e?0:e.length;for(this.__data__=new n;++t<r;)this.add(e[t])}i.prototype.add=i.prototype.push=o,i.prototype.has=a,e.exports=i},"3A9y":function(e,t){e.exports=function(e){return this.__data__.has(e)}},"7fqy":function(e,t){e.exports=function(e){var t=-1,r=Array(e.size);return e.forEach((function(e,n){r[++t]=[n,e]})),r}},"9c6q":function(e,t,r){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=t.options,n=t.callbacks,o=t.map,a=t.useObjectManager,i=t.objectManagerClusterize,s={},c=[];if(e.forEach((function(e){e.clusterName?s[e.clusterName]=s[e.clusterName]?[].concat(function(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(s[e.clusterName]),[e]):[e]:c.push(e)})),Object.keys(s).forEach((function(e){var t=r[e]||{},c=n[e]||{},u=t.layout||"\n      <div>{{ properties.balloonContentHeader }}</div>\n      <div>{{ properties.balloonContentBody }}</div>\n      <div>{{ properties.balloonContentFooter }}</div>\n    ";t.clusterBalloonItemContentLayout=ymaps.templateLayoutFactory.createClass(u);var l=t.clusterBalloonLayout||t.clusterLayout;delete t.clusterBalloonLayout;var p=l?ymaps.templateLayoutFactory.createClass(l):t.clusterBalloonContentLayout||"cluster#balloonTwoColumns";t.clusterBalloonContentLayout=p;var f=t.clusterIconContentLayout;if(t.clusterIconContentLayout=f&&ymaps.templateLayoutFactory.createClass(f),a){var d=new ymaps.ObjectManager(Object.assign({clusterize:i},t));Object.keys(c).forEach((function(e){d.clusters.events.add(e,c[e])})),d.add(s[e]),o.geoObjects.add(d)}else{var m=new ymaps.Clusterer(t);Object.keys(c).forEach((function(e){m.events.add(e,c[e])})),t.createCluster&&(m.createCluster=t.createCluster),m.add(s[e]),o.geoObjects.add(m)}})),c.length){var u=a?new ymaps.ObjectManager({clusterize:!1}):new ymaps.GeoObjectCollection;c.forEach((function(e){return u.add(e)})),o.geoObjects.add(u)}}function s(e){return e.charAt(0).toUpperCase()+e.slice(1)}function c(e){return(e.icon.color||"blue")+(e.icon.glyph?s(e.icon.glyph):e.icon.content?"Stretchy":"")}function u(e){return e.map((function(e){return Array.isArray(e)?u(e):+e}))}function l(e,t){var r=[];return function e(t,o){if(t===o)return!0;if(t instanceof Date&&o instanceof Date)return+t==+o;if("object"!==n(t)||"object"!==n(o))return!1;if(function(e,t){for(var n=r.length;n--;)if(!(r[n][0]!==e&&r[n][0]!==t||r[n][1]!==t&&r[n][1]!==e))return!0;return!1}(t,o))return!0;r.push([t,o]);var a=Object.keys(t),i=a.length;if(Object.keys(o).length!==i)return!1;for(;i--;)if(!e(t[a[i]],o[a[i]]))return!1;return!0}(e,t)}r.d(t,"a",(function(){return O})),r.d(t,"b",(function(){return j}));var p=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.events={},this.ymapReady=!1,this.scriptIsNotAttached=!0}var t,r;return t=e,(r=[{key:"$on",value:function(e,t){var r=this;return this.events[e]||(this.events[e]=[]),this.events[e].push(t),function(){r.events[e]=r.events[e].filter((function(e){return t!==e}))}}},{key:"$emit",value:function(e,t){var r=this.events[e];r&&r.forEach((function(e){return e(t)}))}}])&&o(t.prototype,r),e}()),f=["fullscreenControl","geolocationControl","routeEditor","rulerControl","searchControl","trafficControl","typeSelector","zoomControl","routeButtonControl","routePanelControl"];function d(e){return 0===e.filter((function(e){return![].concat(f,["default"]).includes(e)})).length}function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(t,r){if(window.ymaps||document.getElementById("vue-yandex-maps"))return t();var n=document.createElement("SCRIPT"),o=e.apiKey,a=void 0===o?"":o,i=e.lang,s=void 0===i?"ru_RU":i,c=e.version,u=void 0===c?"2.1":c,l=e.coordorder,f=void 0===l?"latlong":l,d=e.debug,m=void 0!==d&&d?"debug":"release",h="lang=".concat(s).concat(a&&"&apikey=".concat(a),"&mode=").concat(m,"&coordorder=").concat(f),y="https://api-maps.yandex.ru/".concat(u,"/?").concat(h);n.setAttribute("src",y),n.setAttribute("async",""),n.setAttribute("defer",""),n.setAttribute("id","vue-yandex-maps"),document.head.appendChild(n),p.scriptIsNotAttached=!1,n.onload=function(){ymaps.ready((function(){p.ymapReady=!0,p.$emit("scriptIsLoaded"),t()}))},n.onerror=r}))}var h=p,y=["actionend","balloonclose","balloonopen","click","contextmenu","dblclick","destroy","hintclose","hintopen","optionschange","sizechange","typechange"],b={pluginOptions:{},provide:function(){var e,t,r=this,n=[],o=[];return{useObjectManager:this.useObjectManager,addMarker:this.addMarker,deleteMarker:function(t){r.myMap.geoObjects&&(n.push(t),e&&clearTimeout(e),e=setTimeout((function(){r.deleteMarkers(n),n=[]}),0))},compareValues:function(e){var n=e.newVal,a=e.oldVal,i=e.marker;l(n,a)||(o.push(i),t&&clearTimeout(t),t=setTimeout((function(){r.setMarkers(o),o=[]}),0))}}},data:function(){return{ymapId:"yandexMap".concat(Math.round(1e5*Math.random())),myMap:{},style:this.ymapClass?"":"width: 100%; height: 100%;",isReady:!1,debounce:null,markers:[]}},props:{coords:{type:Array,required:!0},zoom:{validator:function(e){return!Number.isNaN(e)},default:18},bounds:Array,clusterOptions:{type:Object,default:function(){return{}}},clusterCallbacks:{type:Object,default:function(){return{}}},behaviors:{type:Array,default:function(){return["default"]}},controls:{type:Array,default:function(){return["default"]},validator:function(e){return d(e)}},detailedControls:{type:Object,validator:function(e){return d(Object.keys(e))}},scrollZoom:{type:Boolean,default:!0},mapType:{type:String,default:"map",validator:function(e){return["map","satellite","hybrid"].includes(e)}},placemarks:{type:Array,default:function(){return[]}},useObjectManager:{type:Boolean,default:!1},objectManagerClusterize:{type:Boolean,default:!0},ymapClass:String,initWithoutMarkers:{type:Boolean,default:!0},debug:{type:Boolean,default:!1},settings:{type:Object,default:function(){return{}}},options:{type:Object,default:function(){return{}}},showAllMarkers:Boolean},computed:{coordinates:function(){return this.coords.map((function(e){return+e}))}},methods:{init:function(){var e=this;window.ymaps&&ymaps.GeoObjectCollection&&(this.initWithoutMarkers||this.$slots.default||this.placemarks.length)&&(this.$emit("map-initialization-started"),this.myMap=new ymaps.Map(this.ymapId,{center:this.coordinates,zoom:+this.zoom,bounds:this.bounds,behaviors:this.behaviors,controls:this.controls,type:"yandex#".concat(this.mapType)},this.options),y.forEach((function(t){return e.myMap.events.add(t,(function(r){return e.$emit(t,r)}))})),this.myMap.events.add("boundschange",(function(t){var r=t.originalEvent,n=r.newZoom,o=r.newCenter,a=r.newBounds;e.$emit("boundschange",t),e.$emit("update:zoom",n),e.$emit("update:coords",o),e.$emit("update:bounds",a)})),this.detailedControls&&Object.keys(this.detailedControls).forEach((function(t){e.myMap.controls.remove(t),e.myMap.controls.add(t,e.detailedControls[t])})),!1===this.scrollZoom&&this.myMap.behaviors.disable("scrollZoom"),this.isReady=!0,this.$emit("map-was-initialized",this.myMap))},addMarker:function(e){var t=this;this.markers.push(e),this.debounce&&clearTimeout(this.debounce),this.debounce=setTimeout((function(){t.setMarkers(t.markers)}),0)},setMarkers:function(e){var t=this,r={options:this.clusterOptions,callbacks:this.clusterCallbacks,map:this.myMap,useObjectManager:this.useObjectManager,objectManagerClusterize:this.objectManagerClusterize};if(this.markers!==e){var n=e.map((function(e){return t.useObjectManager?e.id:e.properties.get("markerId")}));this.deleteMarkers(n),i(e,r),this.$emit("markers-was-change",n)}else i(e,r);this.markers=[],this.showAllMarkers&&this.myMap.setBounds(this.myMap.geoObjects.getBounds())},deleteMarkers:function(e){var t=this;this.myMap.geoObjects.each((function(r){var n=[];if(t.useObjectManager)r.remove(e);else{var o,a=function(t){var r=t.properties.get("markerId");e.includes(r)&&n.push(t)};if(r.each)r.each(a),o=r.getLength();else if(r.getGeoObjects){var i=r.getGeoObjects();i.forEach(a),o=i.length}0===o||o===n.length?t.myMap.geoObjects.remove(r):n.length&&n.forEach((function(e){return r.remove(e)}))}})),this.$emit("markers-was-delete",e)}},watch:{coordinates:function(e){this.myMap.panTo&&this.myMap.getZoom()&&this.myMap.panTo(e,{checkZoomRange:!0})},zoom:function(){this.myMap.setZoom(this.zoom)},bounds:function(e){this.myMap.setBounds&&this.myMap.setBounds(e)}},render:function(e){return e("section",{class:"ymap-container",ref:"mapContainer"},[e("div",{attrs:{id:this.ymapId,class:this.ymapClass,style:this.style}}),this.isReady&&e("div",{ref:"markersContainer",attrs:{class:"ymap-markers"}},[this.$slots.default])])},mounted:function(){var e=this;if(this.$attrs["map-link"]||this.$attrs.mapLink)throw new Error("Vue-yandex-maps: Attribute mapLink is not supported. Use settings.");if(this.placemarks&&this.placemarks.length)throw new Error("Vue-yandex-maps: Attribute placemarks is not supported. Use marker component.");this.mapObserver=new MutationObserver((function(){e.myMap.container&&e.myMap.container.fitToViewport()}));var t=this.$refs.mapContainer;if(this.mapObserver.observe(t,{attributes:!0,childList:!0,characterData:!0,subtree:!1}),h.scriptIsNotAttached){var r=this.debug;m(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){a(e,t,r[t])}))}return e}({},this.$options.pluginOptions,this.settings,{debug:r}))}h.ymapReady?ymaps.ready(this.init):h.$on("scriptIsLoaded",(function(){ymaps.ready(e.init)}))},beforeDestroy:function(){this.myMap.geoObjects&&this.myMap.geoObjects.removeAll()}},v=["placemark","polyline","rectangle","polygon","circle"],g=["balloonclose","balloonopen","click","contextmenu","dblclick","drag","dragend","dragstart","hintclose","hintopen","mouseenter","mouseleave"],k={inject:["useObjectManager","addMarker","deleteMarker","compareValues"],props:{coords:Array,hintContent:String,icon:Object,balloon:Object,markerType:{type:String,validator:function(e){return v.includes(e.toLowerCase())},default:"placemark"},markerFill:Object,markerStroke:Object,clusterName:[String,Number],circleRadius:{validator:function(e){return!Number.isNaN(e)},default:1e3},balloonTemplate:String,markerId:{type:[String,Number],required:!0},properties:Object,options:Object},data:function(){return{unwatchArr:[]}},render:function(e){return this.$slots.balloon&&e("div",{style:"display: none;"},[this.$slots.balloon])},mounted:function(){var e=this;Object.keys(this.$props).forEach((function(t){e.unwatchArr.push(e.$watch(t,(function(t,r){return e.compareValues({newVal:t,oldVal:r,marker:e.defineMarker()})})))})),this.addMarker(this.defineMarker())},methods:{defineMarker:function(){var e=this,t={};this.balloonTemplate&&(t={balloonContentLayout:ymaps.templateLayoutFactory.createClass(this.balloonTemplate)}),this.$slots.balloon&&(t={balloonContentLayout:ymaps.templateLayoutFactory.createClass(this.$slots.balloon[0].elm.outerHTML)});var r={markerId:this.markerId,markerType:this.markerType||"placemark",coords:u(this.coords),hintContent:this.hintContent,markerFill:this.markerFill,circleRadius:+this.circleRadius,clusterName:this.clusterName,markerStroke:this.markerStroke,balloon:this.balloon,properties:this.properties,options:this.options,balloonOptions:t};this.icon&&["default#image","default#imageWithContent"].includes(this.icon.layout)?(r.iconContent=this.icon.content,r.iconLayout=this.icon.layout,r.iconImageHref=this.icon.imageHref,r.iconImageSize=this.icon.imageSize,r.iconImageOffset=this.icon.imageOffset,r.iconContentOffset=this.icon.contentOffset,this.icon.contentLayout&&"string"==typeof this.icon.contentLayout&&(r.iconContentLayout=ymaps.templateLayoutFactory.createClass(this.icon.contentLayout))):r.icon=this.icon;var n=function(e,t){var r=s(e);if(!t)return r;switch(r){case"Placemark":return"Point";case"Polyline":return"LineString";default:return r}}(r.markerType,this.useObjectManager),o={hintContent:r.hintContent,iconContent:r.icon?r.icon.content:r.iconContent,markerId:r.markerId},a=r.balloon?{balloonContentHeader:r.balloon.header,balloonContentBody:r.balloon.body,balloonContentFooter:r.balloon.footer}:{},i=Object.assign(o,a,r.properties),l=r.iconLayout?{iconLayout:r.iconLayout,iconImageHref:r.iconImageHref,iconImageSize:r.iconImageSize,iconImageOffset:r.iconImageOffset,iconContentOffset:r.iconContentOffset,iconContentLayout:r.iconContentLayout}:{preset:r.icon&&"islands#".concat(c(r),"Icon")},p=r.markerStroke?{strokeColor:r.markerStroke.color||"0066ffff",strokeOpacity:parseFloat(r.markerStroke.opacity)>=0?parseFloat(r.markerStroke.opacity):1,strokeStyle:r.markerStroke.style,strokeWidth:parseFloat(r.markerStroke.width)>=0?parseFloat(r.markerStroke.width):1}:{},f=r.markerFill?{fill:r.markerFill.enabled||!0,fillColor:r.markerFill.color||"0066ff99",fillOpacity:parseFloat(r.markerFill.opacity)>=0?parseFloat(r.markerFill.opacity):1,fillImageHref:r.markerFill.imageHref||""}:{},d=Object.assign(l,p,f,r.balloonOptions,r.options);"Circle"===n&&(r.coords=[r.coords,r.circleRadius]);var m=function(e,t){var r=t?{type:"Feature",id:e.properties.markerId,geometry:{type:e.markerType,coordinates:e.coords},properties:e.properties,options:e.options}:new ymaps[e.markerType](e.coords,e.properties,e.options);return r.clusterName=e.clusterName,r}({properties:i,options:d,markerType:n,coords:r.coords,clusterName:r.clusterName},this.useObjectManager,this.$emit);return this.useObjectManager||g.forEach((function(t){return m.events.add(t,(function(r){return e.$emit(t,r)}))})),m}},beforeDestroy:function(){this.unwatchArr.forEach((function(e){return e()})),this.deleteMarker(this.markerId)}};b.install=function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.installed||(e.installed=!0,b.pluginOptions=r,t.component("yandex-map",b),t.component("ymap-marker",k))},"undefined"!=typeof window&&window.Vue&&window.Vue.use(b);var O=b,j=k},HDyB:function(e,t,r){var n=r("nmnc"),o=r("JHRd"),a=r("ljhN"),i=r("or5M"),s=r("7fqy"),c=r("rEGp"),u=n?n.prototype:void 0,l=u?u.valueOf:void 0;e.exports=function(e,t,r,n,u,p,f){switch(r){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return!(e.byteLength!=t.byteLength||!p(new o(e),new o(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return a(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var d=s;case"[object Set]":var m=1&n;if(d||(d=c),e.size!=t.size&&!m)return!1;var h=f.get(e);if(h)return h==t;n|=2,f.set(e,t);var y=i(d(e),d(t),n,u,p,f);return f.delete(e),y;case"[object Symbol]":if(l)return l.call(e)==l.call(t)}return!1}},QoRX:function(e,t){e.exports=function(e,t){for(var r=-1,n=null==e?0:e.length;++r<n;)if(t(e[r],r,e))return!0;return!1}},"Y+p1":function(e,t,r){var n=r("wF/u");e.exports=function(e,t){return n(e,t)}},e5cp:function(e,t,r){var n=r("fmRc"),o=r("or5M"),a=r("HDyB"),i=r("seXi"),s=r("QqLw"),c=r("Z0cm"),u=r("DSRE"),l=r("c6wG"),p="[object Object]",f=Object.prototype.hasOwnProperty;e.exports=function(e,t,r,d,m,h){var y=c(e),b=c(t),v=y?"[object Array]":s(e),g=b?"[object Array]":s(t),k=(v="[object Arguments]"==v?p:v)==p,O=(g="[object Arguments]"==g?p:g)==p,j=v==g;if(j&&u(e)){if(!u(t))return!1;y=!0,k=!1}if(j&&!k)return h||(h=new n),y||l(e)?o(e,t,r,d,m,h):a(e,t,v,r,d,m,h);if(!(1&r)){var w=k&&f.call(e,"__wrapped__"),C=O&&f.call(t,"__wrapped__");if(w||C){var M=w?e.value():e,L=C?t.value():t;return h||(h=new n),m(M,L,r,d,h)}}return!!j&&(h||(h=new n),i(e,t,r,d,m,h))}},ftKO:function(e,t){e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},or5M:function(e,t,r){var n=r("1hJj"),o=r("QoRX"),a=r("xYSL");e.exports=function(e,t,r,i,s,c){var u=1&r,l=e.length,p=t.length;if(l!=p&&!(u&&p>l))return!1;var f=c.get(e),d=c.get(t);if(f&&d)return f==t&&d==e;var m=-1,h=!0,y=2&r?new n:void 0;for(c.set(e,t),c.set(t,e);++m<l;){var b=e[m],v=t[m];if(i)var g=u?i(v,b,m,t,e,c):i(b,v,m,e,t,c);if(void 0!==g){if(g)continue;h=!1;break}if(y){if(!o(t,(function(e,t){if(!a(y,t)&&(b===e||s(b,e,r,i,c)))return y.push(t)}))){h=!1;break}}else if(b!==v&&!s(b,v,r,i,c)){h=!1;break}}return c.delete(e),c.delete(t),h}},rEGp:function(e,t){e.exports=function(e){var t=-1,r=Array(e.size);return e.forEach((function(e){r[++t]=e})),r}},seXi:function(e,t,r){var n=r("qZTm"),o=Object.prototype.hasOwnProperty;e.exports=function(e,t,r,a,i,s){var c=1&r,u=n(e),l=u.length;if(l!=n(t).length&&!c)return!1;for(var p=l;p--;){var f=u[p];if(!(c?f in t:o.call(t,f)))return!1}var d=s.get(e),m=s.get(t);if(d&&m)return d==t&&m==e;var h=!0;s.set(e,t),s.set(t,e);for(var y=c;++p<l;){var b=e[f=u[p]],v=t[f];if(a)var g=c?a(v,b,f,t,e,s):a(b,v,f,e,t,s);if(!(void 0===g?b===v||i(b,v,r,a,s):g)){h=!1;break}y||(y="constructor"==f)}if(h&&!y){var k=e.constructor,O=t.constructor;k==O||!("constructor"in e)||!("constructor"in t)||"function"==typeof k&&k instanceof k&&"function"==typeof O&&O instanceof O||(h=!1)}return s.delete(e),s.delete(t),h}},"wF/u":function(e,t,r){var n=r("e5cp"),o=r("ExA7");e.exports=function e(t,r,a,i,s){return t===r||(null==t||null==r||!o(t)&&!o(r)?t!=t&&r!=r:n(t,r,a,i,e,s))}},xYSL:function(e,t){e.exports=function(e,t){return e.has(t)}}}]);