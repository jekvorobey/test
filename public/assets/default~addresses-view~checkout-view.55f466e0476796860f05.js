(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{VKYi:function(e,t,s){"use strict";var r=s("9c6q"),a=s("NDiG"),n=s("i2Ud"),o=(s("sEfC"),s("tfXw"),{name:"v-suggestion",inheritAttributes:!0,props:{options:{type:Object,default:function(){return{}}},items:{type:Array,default:function(){return[]}},value:{type:String,default:""},sync:{type:Boolean,default:!0},keyField:{type:String},error:String},data:function(){return{extendedOptions:Object.assign({},{debounce:0,placeholder:"",inputClass:"input"},this.options),query:this.value,lastSetQuery:null,activeItemIndex:-1,showItems:!1}},watch:{query:function(e,t){e!==this.lastSetQuery?this.$emit("input",e):this.lastSetQuery=null},value:function(e,t){this.setInputQuery(e)},items:function(){this.activeItemIndex=-1,this.showItems=!0}},methods:{hideItems:function(){var e=this;setTimeout((function(){e.showItems=!1,e.sync&&e.setInputQuery(e.value)}),0)},showResults:function(){this.showItems=!0},setInputQuery:function(e){this.lastSetQuery=e,this.query=e},onKeyDown:function(e){switch(this.$emit("keyDown",e.keyCode),e.keyCode){case 40:this.highlightItem("down"),e.preventDefault();break;case 38:this.highlightItem("up"),e.preventDefault();break;case 13:this.selectItem(),e.preventDefault();break;case 27:this.showItems=!1,e.preventDefault();break;default:return!0}},selectItem:function(e){var t=null;if(void 0===e){if(-1===this.activeItemIndex)return;t=this.items[this.activeItemIndex]}else t=this.items[e];t&&(this.$emit("selected",t),this.hideItems())},highlightItem:function(e){var t=this;if(0!==this.items.length){var s=this.items.findIndex((function(e,s){return s===t.activeItemIndex}));-1===s?s="down"===e?0:this.items.length-1:(this.activeIndexItem=0,"down"===e?(s+=1)===this.items.length&&(s=0):(s-=1)<0&&(s=this.items.length-1)),this.activeItemIndex=s;var r=this.$refs.item[this.activeItemIndex];r&&r.scrollIntoView()}},onSuggestionClick:function(){var e=this;this.showItems=!0,this.$nextTick((function(){return e.$refs.input.focus()}))}},beforeMount:function(){}}),i=s("KHd+"),d=Object(i.a)(o,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"v-suggestions",class:{"v-suggestions--invalid":e.error}},[s("label",{staticClass:"v-suggestions__label"},[e._t("default")],2),e._v(" "),s("input",e._b({directives:[{name:"model",rawName:"v-model",value:e.query,expression:"query"}],ref:"input",staticClass:"v-suggestions__input",class:e.extendedOptions.inputClass,attrs:{type:"text",autocomplete:"false",placeholder:e.extendedOptions.placeholder},domProps:{value:e.query},on:{keydown:e.onKeyDown,blur:e.hideItems,focus:function(t){e.showItems=!0},input:function(t){t.target.composing||(e.query=t.target.value)}}},"input",e.$attrs,!1)),e._v(" "),s("div",{staticClass:"error-message error",attrs:{role:"alert"}},[e._t("error",[e._v("\n            "+e._s(e.error)+"\n        ")],{error:e.error})],2),e._v(" "),e.items&&e.items.length>0&&!0===e.showItems?s("div",{staticClass:"suggestions",on:{mousedown:function(e){e.preventDefault()}}},[s("ul",{staticClass:"items"},e._l(e.items,(function(t,r){return s("li",{key:t[e.keyField]||r,ref:"item",refInFor:!0,staticClass:"item",class:{"is-active":r===e.activeItemIndex},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.selectItem(r)}}},[e._t("item",[e._v("\n                    "+e._s(t)+"\n                ")],{item:t})],2)})),0)]):e._e()])}),[],!1,null,null,null).exports,c=s("KQVR"),u=s("nurM"),l=s("a6oV"),m=s("L2JU"),h=s("55Sm"),f=s("jDKC"),p=s("SqwP"),_=s("J3J1"),v=(s("9roy"),s("SesW")),g=s("3eXy"),y=s("GyY8"),b=s("2JJK"),w=s("8/qD"),k=s("Ffxs");s("WW/F"),s("wASK"),s("xtKy");function x(e,t,s,r,a,n,o){try{var i=e[n](o),d=i.value}catch(e){return void s(e)}i.done?t(d):Promise.resolve(d).then(r,a)}function I(e){return function(){var t=this,s=arguments;return new Promise((function(r,a){var n=e.apply(t,s);function o(e){x(n,r,a,o,i,"next",e)}function i(e){x(n,r,a,o,i,"throw",e)}o(void 0)}))}}function S(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,r)}return s}function C(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?S(Object(s),!0).forEach((function(t){O(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):S(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function O(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var $=b.modalName.profile.ADDRESS_EDIT,A={name:$,mixins:[v.b],components:{VSvg:a.a,VButton:n.a,VInput:c.a,VSuggestion:d,GeneralModal:l.a,RadioSwitch:u.a,yandexMap:r.a,ymapMarker:r.b},validations:{address:{city:{required:v.h},house:{required:v.h},post_index:{required:v.h}}},data:function(){return{address:{country_code:"",post_index:"",region:"",region_guid:"",area:"",area_guid:"",city:"",city_guid:"",street:"",house:"",block:"",flat:"",floor:"",porch:"",intercom:"",comment:"",geo_lat:"",geo_lon:""},zoom:null,coords:null,cities:[],addresses:[],options:{debounce:500},showMap:!1,selectedSwitch:"list",switchItems:[{value:"list",title:"Форма"},{value:"map",title:"Карта"}],markerIcon:{layout:"default#image",imageHref:k.a,imageSize:[24,24],imageOffset:[0,0]}}},computed:C(C(C({},Object(m.d)(h.b,{modalState:function(e){return e[h.a][$]&&e[h.a][$].state||{}}})),Object(m.c)(p.a,[_.a])),{},{computedCoords:function(){return this.coords||this[_.a]},selectedFormatAddress:function(){var e="";return this.address.street&&(e+=this.address.street+" "),this.address.house&&(e+=this.address.house+" "),this.address.block&&(e+=this.address.block),e},mapSettings:function(){return C({},y.h)},cityError:function(){if(this.$v.address.city.$dirty&&!this.$v.address.city.required)return"Обязательное поле"},houseError:function(){if(this.$v.address.house.$dirty&&!this.$v.address.house.required)return"Обязательное поле"},indexError:function(){if(this.$v.address.post_index.$dirty&&!this.$v.address.post_index.required)return"Обязательное поле"},isTabletLg:function(){return this.$mq.tabletLg},isMap:function(){return"map"===this.selectedSwitch}}),methods:C(C({},Object(m.b)(h.b,[f.a])),{},{findAddress:function(e,t,s,r){var a,n={value:e};switch(e){case w.a.REGION:a={value:w.a.AREA};break;case w.a.CITY:a={value:w.a.SETTLEMENT};break;case w.a.STREET:a={value:w.a.STREET};break;case w.a.HOUSE:break;default:a={value:e}}return g.$dadata.post("/suggest/address",{query:t,count:s,locations:r,from_bound:n,to_bound:a})},onCitySelected:function(e){var t=this;return I(regeneratorRuntime.mark((function s(){var r,a;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.findAddress(w.a.CITY,e.unrestricted_value,1);case 3:r=s.sent,a=r.suggestions,t.zoom=11,setTimeout((function(){t.onApplyAddress(a[0])}),0),s.next=12;break;case 9:s.prev=9,s.t0=s.catch(0),console.log(s.t0);case 12:case"end":return s.stop()}}),s,null,[[0,9]])})))()},onCityInputChange:function(e){var t=this;return I(regeneratorRuntime.mark((function s(){var r,a;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.findAddress(w.a.CITY,e||t.address.value,20);case 3:r=s.sent,a=r.suggestions,t.cities=a,s.next=12;break;case 8:return s.prev=8,s.t0=s.catch(0),console.log(s.t0),s.abrupt("return",null);case 12:case"end":return s.stop()}}),s,null,[[0,8]])})))()},onAddressSelected:function(e){var t=this;return I(regeneratorRuntime.mark((function s(){var r,a;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.findAddress(w.a.HOUSE,e.unrestricted_value,1);case 3:r=s.sent,a=r.suggestions,t.zoom=17,setTimeout((function(){t.onApplyAddress(a[0])}),0),s.next=12;break;case 9:s.prev=9,s.t0=s.catch(0),console.log(s.t0);case 12:case"end":return s.stop()}}),s,null,[[0,9]])})))()},onAddressInputChange:function(){var e=arguments,t=this;return I(regeneratorRuntime.mark((function s(){var r,a,n,o;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return r=e.length>0&&void 0!==e[0]?e[0]:"",s.prev=1,a=[],t.address&&t.address.city_guid&&a.push({city_fias_id:t.address.city_guid}),s.next=6,t.findAddress(w.a.HOUSE,"".concat(t.address.city||""," ").concat(r),20,a);case 6:n=s.sent,o=n.suggestions,t.addresses=o,s.next=15;break;case 11:return s.prev=11,s.t0=s.catch(1),console.log(s.t0),s.abrupt("return",null);case 15:case"end":return s.stop()}}),s,null,[[1,11]])})))()},onMapClick:function(e){var t=this;return I(regeneratorRuntime.mark((function s(){var r,a,n,o;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return r=e.get("coords"),s.next=3,g.$dadata.post("/geolocate/address",{lat:r[0],lon:r[1],radius_meters:1e3});case 3:a=s.sent,n=a.suggestions,o=n.find((function(e){return e.data.house})),t.onApplyAddress(o);case 7:case"end":return s.stop()}}),s)})))()},formatAddress:function(e){return"".concat(e.data.street_with_type||e.data.city_district_with_type||e.data.settlement_with_type||""," ").concat(e.data.house_type," ").concat(e.data.house," ").concat(e.data.block?"".concat(e.data.block_type," ").concat(e.data.block):"")},onApplyAddress:function(e){var t=C({},this.address);e&&(t.country_code=e.data.country_iso_code,e.data.postal_code&&(t.post_index=e.data.postal_code),t.region=e.data.region_with_type||e.data.region,t.region_guid=e.data.region_fias_id,t.area=e.data.area_with_type||e.data.area,t.area_guid=e.data.area_fias_id,t.city=e.data.city_with_type||e.data.city||e.data.settlement_with_type||e.data.settlement,t.city_guid=e.data.city_fias_id||e.data.settlement_fias_id,t.street=e.data.street_with_type||e.data.street,t.house=e.data.house_type?"".concat(e.data.house_type," ").concat(e.data.house):e.data.house,t.block=e.data.block_type?"".concat(e.data.block_type," ").concat(e.data.block):e.data.block,e.data.geo_lat&&e.data.geo_lon&&(t.geo_lat=e.data.geo_lat,t.geo_lon=e.data.geo_lon),this.coords=[Number(e.data.geo_lat),Number(e.data.geo_lon)]||!1,this.address=t)},onSubmit:function(){if(this.$v.$touch(),!this.$v.$invalid){var e=C(C({},this.address),{},{porch:String(this.address.porch),floor:String(this.address.floor),flat:String(this.address.flat),post_index:String(this.address.post_index)});this.$emit("save",e),this.onClose()}},onClose:function(){this.$emit("close"),this[f.a]({name:$,open:!1,state:{address:null,onSave:null}})},init:function(){this.modalState.address&&(this.modalState.address.geo_lat&&this.modalState.address.geo_lon?(this.zoom=17,this.coords=[Number(this.modalState.address.geo_lat),Number(this.modalState.address.geo_lon)]):this.zoom=11,this.address=C({},this.modalState.address))}}),beforeMount:function(){this.init()},mounted:function(){var e=this;setTimeout((function(){return e.showMap=!0}),300)}},E=Object(i.a)(A,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("general-modal",{staticClass:"address-edit-modal",attrs:{type:e.isTabletLg?"fullscreen":"wide",header:"Выбор пункта выдачи","is-mobile":e.isTabletLg},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[e.isTabletLg?s("radio-switch",{staticClass:"address-edit-modal__switch",attrs:{name:"map-switch",items:e.switchItems},scopedSlots:e._u([{key:"content",fn:function(t){var r=t.item;return[s("v-svg",{attrs:{name:r.value,width:"24",height:"24"}}),e._v("  "+e._s(r.title)+"\n            ")]}}],null,!1,4253381989),model:{value:e.selectedSwitch,callback:function(t){e.selectedSwitch=t},expression:"selectedSwitch"}}):e._e(),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.isTabletLg||e.isMap,expression:"!isTabletLg || isMap"}],staticClass:"address-edit-modal__map"},[e.showMap?s("yandex-map",{attrs:{zoom:e.zoom,settings:e.mapSettings,coords:e.computedCoords,controls:[],options:{yandexMapDisablePoiInteractivity:!0}},on:{click:e.onMapClick}},[e.coords?s("ymap-marker",{attrs:{"marker-id":"marker-id",coords:e.computedCoords,icon:e.markerIcon}}):e._e()],1):e._e()],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.isTabletLg||!e.isMap,expression:"!isTabletLg || !isMap"}],staticClass:"address-edit-modal__form"},[s("div",{staticClass:"address-edit-modal__form-header"},[s("h3",{staticClass:"address-edit-modal__form-header-hl"},[e._v("Адрес доставки")]),e._v(" "),s("span",{staticClass:"text-grey text-sm"},[e._v("Укажите на карте или введите вручную")])]),e._v(" "),s("div",{staticClass:"address-edit-modal__form-row"},[s("v-suggestion",{staticClass:"address-edit-modal__form-column",attrs:{value:e.address.city,options:e.options,items:e.cities,error:e.cityError},on:{input:e.onCityInputChange,selected:e.onCitySelected},scopedSlots:e._u([{key:"item",fn:function(t){var s=t.item;return[e._v("\n                        "+e._s(s.value)+"\n                    ")]}},{key:"error",fn:function(t){var r=t.error;return[s("transition",{attrs:{name:"slide-in-bottom",mode:"out-in"}},[r?s("div",{key:r},[e._v(e._s(r))]):e._e()])]}}])},[e._v("\n                    Ваш населенный пункт\n                    ")]),e._v(" "),s("v-input",{staticClass:"address-edit-modal__form-column address-edit-modal__form-column--30",attrs:{type:"number",maxlength:"6",min:"1",error:e.indexError},scopedSlots:e._u([{key:"error",fn:function(t){var r=t.error;return[s("transition",{attrs:{name:"slide-in-bottom",mode:"out-in"}},[r?s("div",{key:r},[e._v(e._s(r))]):e._e()])]}}]),model:{value:e.address.post_index,callback:function(t){e.$set(e.address,"post_index",t)},expression:"address.post_index"}},[e._v("\n                    Индекс\n                    ")])],1),e._v(" "),s("div",{staticClass:"address-edit-modal__form-row"},[s("v-suggestion",{staticClass:"address-edit-modal__form-column",attrs:{value:e.selectedFormatAddress,options:e.options,items:e.addresses,error:e.houseError},on:{input:e.onAddressInputChange,selected:e.onAddressSelected},scopedSlots:e._u([{key:"item",fn:function(t){var s=t.item;return[e._v("\n                        "+e._s(e.formatAddress(s))+"\n                    ")]}},{key:"error",fn:function(t){var r=t.error;return[s("transition",{attrs:{name:"slide-in-bottom",mode:"out-in"}},[r?s("div",{key:r},[e._v(e._s(r))]):e._e()])]}}])},[e._v("\n                    Улица, дом, корпус\n                    ")]),e._v(" "),s("v-input",{staticClass:"address-edit-modal__form-column address-edit-modal__form-column--30 address-edit-modal__form-column--50",model:{value:e.address.flat,callback:function(t){e.$set(e.address,"flat",t)},expression:"address.flat"}},[e._v("\n                    Квартира/офис\n                ")]),e._v(" "),s("v-input",{staticClass:"address-edit-modal__form-column address-edit-modal__form-column--30 address-edit-modal__form-column--50",attrs:{type:"number",min:"1"},model:{value:e.address.floor,callback:function(t){e.$set(e.address,"floor",t)},expression:"address.floor"}},[e._v("\n                    Этаж\n                ")]),e._v(" "),s("v-input",{staticClass:"address-edit-modal__form-column address-edit-modal__form-column--30 address-edit-modal__form-column--50",attrs:{type:"number",min:"1"},model:{value:e.address.porch,callback:function(t){e.$set(e.address,"porch",t)},expression:"address.porch"}},[e._v("\n                    Подъезд\n                ")]),e._v(" "),s("v-input",{staticClass:"address-edit-modal__form-column address-edit-modal__form-column--30 address-edit-modal__form-column--50",attrs:{min:"1"},model:{value:e.address.intercom,callback:function(t){e.$set(e.address,"intercom",t)},expression:"address.intercom"}},[e._v("\n                    Домофон\n                ")])],1),e._v(" "),s("v-input",{attrs:{tag:"textarea",rows:"3",maxHeight:"100"},model:{value:e.address.comment,callback:function(t){e.$set(e.address,"comment",t)},expression:"address.comment"}},[e._v("\n                Комментарий курьеру\n            ")]),e._v(" "),s("div",{staticClass:"address-edit-modal__form-submit"},[s("v-button",{staticClass:"address-edit-modal__form-submit-btn",on:{click:function(t){return t.preventDefault(),e.onSubmit(t)}}},[e._v("\n                    Привезти сюда\n                ")])],1)],1)]},proxy:!0}])})}),[],!1,null,null,null);t.a=E.exports},tfXw:function(e,t,s){},xtKy:function(e,t,s){}}]);