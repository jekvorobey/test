(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{"9c6q":function(t,e,a){"use strict";function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){for(var a=0;a<e.length;a++){var s=e[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function i(t,e){var a=e.options,s=e.callbacks,r=e.map,n=e.useObjectManager,i=e.objectManagerClusterize,o={},c=[];if(t.forEach((function(t){t.clusterName?o[t.clusterName]=o[t.clusterName]?[].concat(function(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(o[t.clusterName]),[t]):[t]:c.push(t)})),Object.keys(o).forEach((function(t){var e=a[t]||{},c=s[t]||{},l=e.layout||"\n      <div>{{ properties.balloonContentHeader }}</div>\n      <div>{{ properties.balloonContentBody }}</div>\n      <div>{{ properties.balloonContentFooter }}</div>\n    ";e.clusterBalloonItemContentLayout=ymaps.templateLayoutFactory.createClass(l);var u=e.clusterBalloonLayout||e.clusterLayout;delete e.clusterBalloonLayout;var m=u?ymaps.templateLayoutFactory.createClass(u):e.clusterBalloonContentLayout||"cluster#balloonTwoColumns";e.clusterBalloonContentLayout=m;var d=e.clusterIconContentLayout;if(e.clusterIconContentLayout=d&&ymaps.templateLayoutFactory.createClass(d),n){var p=new ymaps.ObjectManager(Object.assign({clusterize:i},e));Object.keys(c).forEach((function(t){p.clusters.events.add(t,c[t])})),p.add(o[t]),r.geoObjects.add(p)}else{var h=new ymaps.Clusterer(e);Object.keys(c).forEach((function(t){h.events.add(t,c[t])})),e.createCluster&&(h.createCluster=e.createCluster),h.add(o[t]),r.geoObjects.add(h)}})),c.length){var l=n?new ymaps.ObjectManager({clusterize:!1}):new ymaps.GeoObjectCollection;c.forEach((function(t){return l.add(t)})),r.geoObjects.add(l)}}function o(t){return t.charAt(0).toUpperCase()+t.slice(1)}function c(t){return(t.icon.color||"blue")+(t.icon.glyph?o(t.icon.glyph):t.icon.content?"Stretchy":"")}function l(t){return t.map((function(t){return Array.isArray(t)?l(t):+t}))}function u(t,e){var a=[];return function t(e,r){if(e===r)return!0;if(e instanceof Date&&r instanceof Date)return+e==+r;if("object"!==s(e)||"object"!==s(r))return!1;if(function(t,e){for(var s=a.length;s--;)if(!(a[s][0]!==t&&a[s][0]!==e||a[s][1]!==e&&a[s][1]!==t))return!0;return!1}(e,r))return!0;a.push([e,r]);var n=Object.keys(e),i=n.length;if(Object.keys(r).length!==i)return!1;for(;i--;)if(!t(e[n[i]],r[n[i]]))return!1;return!0}(t,e)}a.d(e,"a",(function(){return C})),a.d(e,"b",(function(){return w}));var m=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.events={},this.ymapReady=!1,this.scriptIsNotAttached=!0}var e,a;return e=t,(a=[{key:"$on",value:function(t,e){var a=this;return this.events[t]||(this.events[t]=[]),this.events[t].push(e),function(){a.events[t]=a.events[t].filter((function(t){return e!==t}))}}},{key:"$emit",value:function(t,e){var a=this.events[t];a&&a.forEach((function(t){return t(e)}))}}])&&r(e.prototype,a),t}()),d=["fullscreenControl","geolocationControl","routeEditor","rulerControl","searchControl","trafficControl","typeSelector","zoomControl","routePanelControl"];function p(t){return 0===t.filter((function(t){return![].concat(d,["default"]).includes(t)})).length}function h(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(e,a){if(window.ymaps)return e();var s=document.createElement("SCRIPT"),r=t.apiKey,n=void 0===r?"":r,i=t.lang,o=void 0===i?"ru_RU":i,c=t.version,l=void 0===c?"2.1":c,u=t.coordorder,d=void 0===u?"latlong":u,p=t.debug,h=void 0!==p&&p?"debug":"release",v="lang=".concat(o).concat(n&&"&apikey=".concat(n),"&mode=").concat(h,"&coordorder=").concat(d),f="https://api-maps.yandex.ru/".concat(l,"/?").concat(v);s.setAttribute("src",f),s.setAttribute("async",""),s.setAttribute("defer",""),document.body.appendChild(s),m.scriptIsNotAttached=!1,s.onload=function(){ymaps.ready((function(){m.ymapReady=!0,m.$emit("scriptIsLoaded"),e()}))},s.onerror=a}))}var v=m,f=["actionend","balloonclose","balloonopen","click","contextmenu","dblclick","destroy","hintclose","hintopen","optionschange","sizechange","typechange"],b={pluginOptions:{},provide:function(){var t,e,a=this,s=[],r=[];return{useObjectManager:this.useObjectManager,addMarker:this.addMarker,deleteMarker:function(e){a.myMap.geoObjects&&(s.push(e),t&&clearTimeout(t),t=setTimeout((function(){a.deleteMarkers(s),s=[]}),0))},compareValues:function(t){var s=t.newVal,n=t.oldVal,i=t.marker;u(s,n)||(r.push(i),e&&clearTimeout(e),e=setTimeout((function(){a.setMarkers(r),r=[]}),0))}}},data:function(){return{ymapId:"yandexMap".concat(Math.round(1e5*Math.random())),myMap:{},style:this.ymapClass?"":"width: 100%; height: 100%;",isReady:!1,debounce:null,markers:[]}},props:{coords:{type:Array,required:!0},zoom:{validator:function(t){return!Number.isNaN(t)},default:18},bounds:Array,clusterOptions:{type:Object,default:function(){return{}}},clusterCallbacks:{type:Object,default:function(){return{}}},behaviors:{type:Array,default:function(){return["default"]}},controls:{type:Array,default:function(){return["default"]},validator:function(t){return p(t)}},detailedControls:{type:Object,validator:function(t){return p(Object.keys(t))}},scrollZoom:{type:Boolean,default:!0},mapType:{type:String,default:"map",validator:function(t){return["map","satellite","hybrid"].includes(t)}},placemarks:{type:Array,default:function(){return[]}},useObjectManager:{type:Boolean,default:!1},objectManagerClusterize:{type:Boolean,default:!0},ymapClass:String,initWithoutMarkers:{type:Boolean,default:!0},debug:{type:Boolean,default:!1},settings:{type:Object,default:function(){return{}}},options:{type:Object,default:function(){return{}}},showAllMarkers:Boolean},computed:{coordinates:function(){return this.coords.map((function(t){return+t}))}},methods:{init:function(){var t=this;window.ymaps&&ymaps.GeoObjectCollection&&(this.initWithoutMarkers||this.$slots.default||this.placemarks.length)&&(this.$emit("map-initialization-started"),this.myMap=new ymaps.Map(this.ymapId,{center:this.coordinates,zoom:+this.zoom,bounds:this.bounds,behaviors:this.behaviors,controls:this.controls,type:"yandex#".concat(this.mapType)},this.options),f.forEach((function(e){return t.myMap.events.add(e,(function(a){return t.$emit(e,a)}))})),this.myMap.events.add("boundschange",(function(e){var a=e.originalEvent,s=a.newZoom,r=a.newCenter,n=a.newBounds;t.$emit("boundschange",e),t.$emit("update:zoom",s),t.$emit("update:coords",r),t.$emit("update:bounds",n)})),this.detailedControls&&Object.keys(this.detailedControls).forEach((function(e){t.myMap.controls.remove(e),t.myMap.controls.add(e,t.detailedControls[e])})),!1===this.scrollZoom&&this.myMap.behaviors.disable("scrollZoom"),this.isReady=!0,this.$emit("map-was-initialized",this.myMap))},addMarker:function(t){var e=this;this.markers.push(t),this.debounce&&clearTimeout(this.debounce),this.debounce=setTimeout((function(){e.setMarkers(e.markers)}),0)},setMarkers:function(t){var e=this,a={options:this.clusterOptions,callbacks:this.clusterCallbacks,map:this.myMap,useObjectManager:this.useObjectManager,objectManagerClusterize:this.objectManagerClusterize};if(this.markers!==t){var s=t.map((function(t){return e.useObjectManager?t.id:t.properties.get("markerId")}));this.deleteMarkers(s),i(t,a),this.$emit("markers-was-change",s)}else i(t,a);this.markers=[],this.showAllMarkers&&this.myMap.setBounds(this.myMap.geoObjects.getBounds())},deleteMarkers:function(t){var e=this;this.myMap.geoObjects.each((function(a){var s=[];if(e.useObjectManager)a.remove(t);else{var r,n=function(e){var a=e.properties.get("markerId");t.includes(a)&&s.push(e)};if(a.each)a.each(n),r=a.getLength();else if(a.getGeoObjects){var i=a.getGeoObjects();i.forEach(n),r=i.length}0===r||r===s.length?e.myMap.geoObjects.remove(a):s.length&&s.forEach((function(t){return a.remove(t)}))}})),this.$emit("markers-was-delete",t)}},watch:{coordinates:function(t){this.myMap.panTo&&this.myMap.getZoom()&&this.myMap.panTo(t)},zoom:function(){this.myMap.setZoom(this.zoom)},bounds:function(t){this.myMap.setBounds&&this.myMap.setBounds(t)}},render:function(t){return t("section",{class:"ymap-container",ref:"mapContainer"},[t("div",{attrs:{id:this.ymapId,class:this.ymapClass,style:this.style}}),this.isReady&&t("div",{ref:"markersContainer",attrs:{class:"ymap-markers"}},[this.$slots.default])])},mounted:function(){var t=this;if(this.$attrs["map-link"]||this.$attrs.mapLink)throw new Error("Vue-yandex-maps: Attribute mapLink is not supported. Use settings.");if(this.placemarks&&this.placemarks.length)throw new Error("Vue-yandex-maps: Attribute placemarks is not supported. Use marker component.");this.mapObserver=new MutationObserver((function(){t.myMap.container&&t.myMap.container.fitToViewport()}));var e=this.$refs.mapContainer;if(this.mapObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!1}),v.scriptIsNotAttached){var a=this.debug;h(function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},s=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(a).filter((function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable})))),s.forEach((function(e){n(t,e,a[e])}))}return t}({},this.$options.pluginOptions,this.settings,{debug:a}))}v.ymapReady?ymaps.ready(this.init):v.$on("scriptIsLoaded",(function(){ymaps.ready(t.init)}))},beforeDestroy:function(){this.myMap.geoObjects&&this.myMap.geoObjects.removeAll()}},_=["placemark","polyline","rectangle","polygon","circle"],y=["balloonclose","balloonopen","click","contextmenu","dblclick","drag","dragend","dragstart","hintclose","hintopen","mouseenter","mouseleave"],g={inject:["useObjectManager","addMarker","deleteMarker","compareValues"],props:{coords:Array,hintContent:String,icon:Object,balloon:Object,markerType:{type:String,validator:function(t){return _.includes(t.toLowerCase())},default:"placemark"},markerFill:Object,markerStroke:Object,clusterName:[String,Number],circleRadius:{validator:function(t){return!Number.isNaN(t)},default:1e3},balloonTemplate:String,markerId:{type:[String,Number],required:!0},properties:Object,options:Object},data:function(){return{unwatchArr:[]}},render:function(t){return this.$slots.balloon&&t("div",{style:"display: none;"},[this.$slots.balloon])},mounted:function(){var t=this;Object.keys(this.$props).forEach((function(e){t.unwatchArr.push(t.$watch(e,(function(e,a){return t.compareValues({newVal:e,oldVal:a,marker:t.defineMarker()})})))})),this.addMarker(this.defineMarker())},methods:{defineMarker:function(){var t=this,e={};this.balloonTemplate&&(e={balloonContentLayout:ymaps.templateLayoutFactory.createClass(this.balloonTemplate)}),this.$slots.balloon&&(e={balloonContentLayout:ymaps.templateLayoutFactory.createClass(this.$slots.balloon[0].elm.outerHTML)});var a={markerId:this.markerId,markerType:this.markerType||"placemark",coords:l(this.coords),hintContent:this.hintContent,markerFill:this.markerFill,circleRadius:+this.circleRadius,clusterName:this.clusterName,markerStroke:this.markerStroke,balloon:this.balloon,properties:this.properties,options:this.options,balloonOptions:e};this.icon&&["default#image","default#imageWithContent"].includes(this.icon.layout)?(a.iconContent=this.icon.content,a.iconLayout=this.icon.layout,a.iconImageHref=this.icon.imageHref,a.iconImageSize=this.icon.imageSize,a.iconImageOffset=this.icon.imageOffset,a.iconContentOffset=this.icon.contentOffset,this.icon.contentLayout&&"string"==typeof this.icon.contentLayout&&(a.iconContentLayout=ymaps.templateLayoutFactory.createClass(this.icon.contentLayout))):a.icon=this.icon;var s=function(t,e){var a=o(t);if(!e)return a;switch(a){case"Placemark":return"Point";case"Polyline":return"LineString";default:return a}}(a.markerType,this.useObjectManager),r={hintContent:a.hintContent,iconContent:a.icon?a.icon.content:a.iconContent,markerId:a.markerId},n=a.balloon?{balloonContentHeader:a.balloon.header,balloonContentBody:a.balloon.body,balloonContentFooter:a.balloon.footer}:{},i=Object.assign(r,n,a.properties),u=a.iconLayout?{iconLayout:a.iconLayout,iconImageHref:a.iconImageHref,iconImageSize:a.iconImageSize,iconImageOffset:a.iconImageOffset,iconContentOffset:a.iconContentOffset,iconContentLayout:a.iconContentLayout}:{preset:a.icon&&"islands#".concat(c(a),"Icon")},m=a.markerStroke?{strokeColor:a.markerStroke.color||"0066ffff",strokeOpacity:parseFloat(a.markerStroke.opacity)>=0?parseFloat(a.markerStroke.opacity):1,strokeStyle:a.markerStroke.style,strokeWidth:parseFloat(a.markerStroke.width)>=0?parseFloat(a.markerStroke.width):1}:{},d=a.markerFill?{fill:a.markerFill.enabled||!0,fillColor:a.markerFill.color||"0066ff99",fillOpacity:parseFloat(a.markerFill.opacity)>=0?parseFloat(a.markerFill.opacity):1,fillImageHref:a.markerFill.imageHref||""}:{},p=Object.assign(u,m,d,a.balloonOptions,a.options);"Circle"===s&&(a.coords=[a.coords,a.circleRadius]);var h=function(t,e){var a=e?{type:"Feature",id:t.properties.markerId,geometry:{type:t.markerType,coordinates:t.coords},properties:t.properties,options:t.options}:new ymaps[t.markerType](t.coords,t.properties,t.options);return a.clusterName=t.clusterName,a}({properties:i,options:p,markerType:s,coords:a.coords,clusterName:a.clusterName},this.useObjectManager,this.$emit);return this.useObjectManager||y.forEach((function(e){return h.events.add(e,(function(a){return t.$emit(e,a)}))})),h}},beforeDestroy:function(){this.unwatchArr.forEach((function(t){return t()})),this.deleteMarker(this.markerId)}};b.install=function t(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.installed||(t.installed=!0,b.pluginOptions=a,e.component("yandex-map",b),e.component("ymap-marker",g))},"undefined"!=typeof window&&window.Vue&&window.Vue.use(b);var C=b,w=g},HYl0:function(t,e,a){"use strict";a.r(e);var s,r=a("9c6q"),n=a("NDiG"),i=a("7cXU"),o=a("i2Ud"),c=a("kO0/"),l=a("YSwA"),u=a("jYNS"),m=a("wo+G"),d=a("YNzt"),p=(a("M2hw"),{name:"banner-card",components:{VButton:o.a,VPicture:u.a},props:{firstName:{type:String,default:""},lastName:{type:String,default:""},profile:{type:String},nickName:{type:String},image:{type:[Object,String]}},computed:{iconText:function(){return"".concat(this.firstName?this.firstName.slice(0,1):"").concat(this.lastName?this.lastName.slice(0,1):"")}}}),h=a("KHd+"),v=Object(h.a)(p,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"author-card"},[a("div",{staticClass:"author-card__img"},[t.image?a("v-picture",{attrs:{image:t.image}}):a("div",{staticClass:"text-medium author-card__img-empty"},[t._v(t._s(t.iconText))])],1),t._v(" "),a("div",{staticClass:"author-card__title"},[a("span",{staticClass:"text-bold"},[t.firstName?a("span",[t._v(t._s(t.firstName)+" ")]):t._e(),t._v(" "),t.lastName?a("span",[t._v(t._s(t.lastName))]):t._e()]),t._v(" "),a("br"),t._v(" "),a("span",{staticClass:"text-grey"},[t.profile?a("span",[t._v(t._s(t.profile)+" ")]):t._e(),t._v(" "),t.nickName?a("span",[t._v(t._s(t.nickName))]):t._e()])])])}),[],!1,null,null,null).exports,f=a("ENRa"),b=a("eOVz"),_=a("jVOK"),y=a("Z14j"),g=a("obii"),C=a("zfPd"),w=a("BZIu"),k=a("L2JU"),O=a("Q2AE"),S=a("48TQ"),M=a("Nlzp");function T(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var j,A=(T(s={},"SET_MASTERCLASS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.masterClassCode=e.code,t.masterClass=e})),T(s,"SET_FEATURED",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.featured=e})),T(s,"SET_INSTAGRAM_ITEMS",(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.instagramItems=e})),s);function E(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var I,L=(E(j={},"FETCH_FEATURED",(function(t,e){var a=t.commit;return Object(M.v)(e).then((function(t){return a("SET_FEATURED",t)})).catch((function(t){Object(S.b)("FETCH_FEATURED",!0)(t)}))})),E(j,"FETCH_MASTERCLASS",(function(t,e){var a=t.commit;return Object(M.u)(e).then((function(t){return a("SET_MASTERCLASS",t)})).catch((function(t){Object(S.b)("FETCH_MASTERCLASS",!0)(t)}))})),E(j,"FETCH_INSTAGRAM_ITEMS",(function(t,e){var a=t.commit;return Object(M.t)(e).then((function(t){return a("SET_INSTAGRAM_ITEMS",t.slice(0,4))})).catch((function(t){Object(S.b)("FETCH_INSTAGRAM_ITEMS",!0)(t)}))})),E(j,"FETCH_MASTERCLASS_DATA",(function(t,e){var a=t.dispatch;t.commit;return Promise.all([a("FETCH_MASTERCLASS",e),a("FETCH_INSTAGRAM_ITEMS",e),a("FETCH_FEATURED",e)])})),j);function N(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var P="masterclass",R={name:P,namespaced:!0,state:(I={},N(I,"masterClassCode",""),N(I,"masterClass",{}),N(I,"featuredMasterClasses",{items:[],range:0}),N(I,"instagramItems",[]),I),actions:L,mutations:A,getters:{}},$=a("8TZ/"),x=a("0CxO"),F=a("SqwP"),B=a("55Sm"),H=a("jDKC"),V=a("sEfC"),z=a.n(V),D=a("OvCi"),U=a("W6hq"),G=a("oxRU"),Z=a("gRYR"),q=(a("L52N"),a("2+mq"),a("XdnV"),a("8ZME"),a("8Hfb"),a("ZTSR"),a("NWTo"),a("nhva"),a("CxEY"),a("PnIt"),a("iHux"),a("Ffxs")),Y=(a("ijK7"),a("tH0B")),K=a("SRo2");a("AYSG"),a("QudU");function W(t,e,a,s,r,n,i){try{var o=t[n](i),c=o.value}catch(t){return void a(t)}o.done?e(c):Promise.resolve(c).then(s,r)}function J(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function Q(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?J(Object(a),!0).forEach((function(e){X(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):J(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function X(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var tt={spaceBetween:24,slidesOffsetBefore:24,slidesOffsetAfter:24,slidesPerView:2.5,grabCursor:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets"},breakpoints:X({},G.breakpoints.tablet-1,{slidesPerView:1.2,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16})},et={apiKey:"46c69919-a571-416e-8198-189ed26c6a79",lang:"ru_RU",coordorder:"latlong",version:"2.1"},at={name:"master-class",components:{yandexMap:r.a,ymapMarker:r.b,VSvg:n.a,VButton:o.a,VLink:i.a,VHtml:c.a,VSlider:l.a,VPicture:u.a,VExpander:m.a,Breadcrumbs:g.a,BreadcrumbItem:C.a,Price:d.a,BannerCard:f.a,AuthorCard:v,InstagramCard:b.a,MasterClassBannerCard:_.a,AttentionPanel:y.a},data:function(){return{showMap:!1,isPanelVisible:!1,mockImg:Z.a,markerIcon:{layout:"default#image",imageHref:q.a,imageSize:[24,24],imageOffset:[0,0]},masterclassBanners:[{id:1,name:"Свадебный стилист",date:"3 сентября (пт), 12:00",author:"Владимир Перельман",image:Y.a,code:"code1",price:{value:5e3,currency:"RUB"}},{id:2,name:"Модные косы",date:"4 сентября (пт), 12:00",author:"Владимир Перельман",image:K.a,code:"code2",price:{value:6e3,currency:"RUB"}}]}},computed:Q({},Object(k.d)([O.j]),{},Object(k.d)("route",{code:function(t){return t.params.code}}),{},Object(k.d)(P,["masterClass","featuredMasterClasses","instagramItems"]),{},Object(k.d)(F.a,[F.b]),{},Object(k.d)(B.b,{}),{rootUrl:function(){return Object(U.c)(G.productGroupTypes.MASTERCLASSES)},rootTitle:function(){return this.$t("productGroups.title.".concat(G.productGroupTypes.MASTERCLASSES))},mapSettings:function(){return et},sliderOptions:function(){return tt},isTabletLg:function(){return this.$mq.tabletLg},isTablet:function(){return this.$mq.tablet}}),watch:X({},F.b,(function(t){})),methods:Q({},Object(k.b)(P,["FETCH_MASTERCLASS_DATA"]),{},Object(k.b)($.c,[x.a]),{},Object(k.b)(B.b,[H.a]),{generateSourcePath:function(t,e,a,s){return Object(D.a)(t,e,a,s)},generateMasterclassUrl:function(t){return Object(U.c)(G.productGroupTypes.MASTERCLASSES,t)},onAddToCart:function(t){this[H.a]({name:ADD_TO_CART_MODAL_NAME,open:!0,state:{offerId:t.id,type:t.type}})},onPanelVisibilityChanged:function(t){this.isPanelVisible=!t},onBuyBtnClick:function(){var t=this.$refs.panel;window.scrollTo({top:t.offsetTop,behavior:"smooth"})}}),beforeRouteEnter:function(t,e,a){var s=t.params.code;Object(S.a)(w.$store,P,R),w.$store.state[P].masterClassCode===s?a():(w.$progress.start(),w.$store.dispatch("".concat(P,"/").concat("FETCH_MASTERCLASS_DATA"),{code:s}).then((function(){return a((function(t){return w.$progress.finish()}))})).catch((function(t){w.$progress.fail(),a()})))},beforeRouteUpdate:function(t,e,a){this.selectedCity.fias_id;var s=t.params.code;this.debounce_fetchProduct(s),a()},beforeMount:function(){var t=this;this.debounce_fetchProduct=z()(function(){var e,a=(e=regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.masterClassCode===a){e.next=7;break}return t.$progress.start(),e.next=6,t.FETCH_MASTERCLASS_DATA({code:a});case 6:t.$progress.finish();case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),t.$progress.fail(),t.$progress.finish();case 13:case"end":return e.stop()}}),e,null,[[0,9]])})),function(){var t=this,a=arguments;return new Promise((function(s,r){var n=e.apply(t,a);function i(t){W(n,s,r,i,o,"next",t)}function o(t){W(n,s,r,i,o,"throw",t)}i(void 0)}))});return function(t){return a.apply(this,arguments)}}(),500)},mounted:function(){var t=this;setTimeout((function(){return t.showMap=!0}),300)}},st=Object(h.a)(at,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"section master-class-view"},[a("div",{staticClass:"container master-class-view__header"},[a("breadcrumbs",{staticClass:"container container--tablet-lg master-class-view__breadcrumbs"},[a("breadcrumb-item",{key:"main",attrs:{to:"/"}},[t._v("\n                Главная\n            ")]),t._v(" "),a("breadcrumb-item",{key:"root",attrs:{to:t.rootUrl}},[t._v("\n                "+t._s(t.rootTitle)+"\n            ")]),t._v(" "),a("breadcrumb-item",{key:t.masterClass.code,attrs:{to:{path:t.$route.path}}},[t._v("\n                "+t._s(t.masterClass.name)+"\n            ")])],1),t._v(" "),a("master-class-banner-card",{staticClass:"master-class-view__banner",attrs:{image:t.masterClass.image,name:t.masterClass.name,price:t.masterClass.price,"btn-text":"Купить билет","show-btn":""}})],1),t._v(" "),a("section",{staticClass:"section master-class-view__section master-class-view__panel"},[a("div",{staticClass:"container master-class-view__panel-container"},[a("div",{staticClass:"master-class-view__panel-body"},[a("div",{staticClass:"container container--tablet master-class-view__panel-left"},[a("attention-panel",[a("span",[a("strong",[t._v("Внимание!")]),t._v(" Событие проходит в другом городе"),a("br"),t._v("\n                            (г. Москва)\n                        ")])])],1),t._v(" "),a("div",{staticClass:"master-class-view__panel-middle"},[a("p",{staticClass:"container container--tablet text-bold master-class-view__section-hl"},[t._v("\n                        Описание\n                    ")]),t._v(" "),a("v-html",{staticClass:"container container--tablet",domProps:{innerHTML:t._s(t.masterClass.topText)}}),t._v(" "),a("img",{attrs:{src:t.masterClass.detailImage}}),t._v(" "),a("v-html",{staticClass:"container container--tablet",domProps:{innerHTML:t._s(t.masterClass.bottomText)}})],1),t._v(" "),a("div",{staticClass:"master-class-view__panel-right"},[a("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Спикеры\n                        ")]),t._v(" "),a("v-expander",{attrs:{"min-height":160},scopedSlots:t._u([{key:"btn",fn:function(e){var a=e.isExpanded;return[t._v("\n                                "+t._s(a?"Скрыть":"Все спикеры")+"\n                            ")]}}])},[t._v(" "),a("ul",t._l(t.masterClass.authors,(function(e){return a("author-card",t._b({key:e.id,staticClass:"master-class-view__panel-right-card"},"author-card",e,!1))})),1)])],1),t._v(" "),a("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Дата и время\n                        ")]),t._v(" "),a("p",[t._v(t._s(t.masterClass.date))]),t._v(" "),t._m(0)]),t._v(" "),a("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Место проведения\n                        ")]),t._v(" "),a("p",[t._v(t._s(t.masterClass.address.full))]),t._v(" "),t._m(1)]),t._v(" "),t.isTablet?t._e():a("div",{staticClass:"container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Поделиться\n                        ")]),t._v(" "),a("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"ok-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"twitter-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"telegram-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"link",width:"24",height:"24"}})],1)])])])]),t._v(" "),t.masterClass.gallery||t.masterClass.gallery.length>0?a("section",{staticClass:"section master-class-view__section master-class-view__gallery"},[t.isTablet?a("v-slider",{staticClass:"master-class-view__gallery-slider",attrs:{name:"masterclass-gallery-slider",options:t.sliderOptions}},t._l(t.masterClass.gallery,(function(t){return a("div",{key:t,staticClass:"swiper-slide master-class-view__gallery-item"},[a("v-picture",{attrs:{image:t}})],1)})),0):a("div",{staticClass:"container"},[a("ul",{staticClass:"master-class-view__gallery-list"},t._l(t.masterClass.gallery,(function(t){return a("li",{key:t,staticClass:"master-class-view__gallery-item"},[a("v-picture",{attrs:{image:t}})],1)})),0)])],1):t._e(),t._v(" "),a("section",{staticClass:"section master-class-view__section master-class-view__panel master-class-view__panel--reverse"},[a("div",{staticClass:"container master-class-view__panel-container"},[a("div",{staticClass:"master-class-view__panel-body"},[a("div",{staticClass:"container container--tablet master-class-view__panel-left"}),t._v(" "),a("div",{staticClass:"master-class-view__panel-middle"},[a("p",{staticClass:"container container--tablet text-bold master-class-view__section-hl"},[t._v("\n                        Программа\n                    ")]),t._v(" "),a("v-html",{staticClass:"container container--tablet",domProps:{innerHTML:t._s(t.masterClass.program)}})],1),t._v(" "),a("div",{staticClass:"master-class-view__panel-right"},[a("div",{staticClass:"container container--tablet master-class-view__panel-right-section"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Что взять с собой\n                        ")]),t._v(" "),a("v-html",{domProps:{innerHTML:t._s(t.masterClass.requirements)}})],1),t._v(" "),t.isTablet?a("div",{staticClass:"container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"},[a("p",{staticClass:"text-bold master-class-view__panel-right-hl"},[t._v("\n                            Поделиться\n                        ")]),t._v(" "),a("v-svg",{attrs:{name:"facebook-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"vkontakte-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"ok-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"twitter-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"telegram-bw",width:"24",height:"24"}}),t._v(" "),a("v-svg",{attrs:{name:"link",width:"24",height:"24"}})],1):t._e()])])])]),t._v(" "),a("div",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:t.onPanelVisibilityChanged,expression:"onPanelVisibilityChanged"}],ref:"panel"}),t._v(" "),a("section",{staticClass:"section master-class-view__section master-class-view__map"},[a("div",{staticClass:"container"},[a("h2",{staticClass:"master-class-view__section-hl"},[t._v("\n                Место проведения\n            ")]),t._v(" "),a("p",[t._v(t._s(t.masterClass.address.full))]),t._v(" "),a("br"),t._v(" "),a("div",{staticStyle:{height:"400px",width:"100%"}},[t.showMap?a("yandex-map",{attrs:{coords:t.masterClass.address.coords,controls:[],options:{yandexMapDisablePoiInteractivity:!0},settings:t.mapSettings}},[a("ymap-marker",{key:"masterclass-point-"+t.masterClass.address.id,attrs:{"marker-id":"masterclass-point-"+t.masterClass.address.id,coords:t.masterClass.address.coords,icon:t.markerIcon}})],1):t._e()],1)])]),t._v(" "),t.masterclassBanners&&t.masterclassBanners.length>0?a("section",{staticClass:"section master-class-view__masterclass"},[a("div",{staticClass:"container master-class-view__masterclass-container"},[a("h2",{staticClass:"master-class-view__section-hl master-class-view__masterclass-hl"},[t._v("\n                Похожие мастер-классы\n            ")]),t._v(" "),a("ul",{staticClass:"master-class-view__masterclass-list"},t._l(t.masterclassBanners,(function(e){return a("master-class-banner-card",{key:e.id,staticClass:"master-class-view__masterclass-item",attrs:{name:e.name,image:e.image,price:e.price,author:e.author,description:e.date,to:t.generateMasterclassUrl(e.code)}})})),1),t._v(" "),a("v-button",{staticClass:"btn--outline master-class-view__section-link master-class-view__masterclass-link"},[t._v("\n                "+t._s(t.$t("product.showAll"))+"\n            ")])],1)]):t._e(),t._v(" "),a("section",{staticClass:"section master-class-view__section master-class-view__instagram"},[a("div",{staticClass:"container master-class-view__instagram-container"},[a("h2",{staticClass:"master-class-view__section-hl master-class-view__instagram-hl"},[t._v("\n                INSTABEAUTY Владимира Соколова\n            ")]),t._v(" "),t.isTabletLg?a("v-slider",{staticClass:"master-class-view__instagram-slider",attrs:{name:"instagram",options:t.sliderOptions}},t._l(t.instagramItems,(function(t){return a("instagram-card",{key:t.id,staticClass:"swiper-slide master-class-view__instagram-card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1):t._e(),t._v(" "),t.isTabletLg?t._e():a("div",{staticClass:"master-class-view__instagram-grid master-class-view__instagram-grid--initialized"},t._l(t.instagramItems,(function(t){return a("instagram-card",{key:t.id,staticClass:"master-class-view__instagram-card",attrs:{"instagram-card-id":t.id,image:t.image}})})),1)],1)]),t._v(" "),a("transition",{attrs:{name:"slide-bottom",appear:""}},[t.isPanelVisible&&t.isTablet?a("div",{staticClass:"master-class-view__price-panel"},[a("div",{staticClass:"container"},[a("v-button",{staticClass:"master-class-view__price-panel-btn",on:{click:function(e){return e.preventDefault(),t.onBuyBtnClick(e)}}},[t._v("\n                    Купить билет\n                ")])],1)]):t._e()])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("a",[this._v("Задать вопрос организатору")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("a",[this._v("Посмотреть на карте")])])}],!1,null,null,null);e.default=st.exports},M2hw:function(t,e,a){},ijK7:function(t,e,a){}}]);