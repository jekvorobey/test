(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{"B/pr":function(e,t,s){},o1PI:function(e,t,s){"use strict";s.r(t);var a=s("NDiG"),n=s("7cXU"),r=s("PZpB"),o=s("qjh8"),i=s("9c6q"),d=s("i2Ud"),c=s("0hM7"),u=s("KQVR"),l=s("nurM"),p=s("a6oV"),m=s("L2JU"),f=s("55Sm"),v=s("jDKC"),_=s("SqwP"),g=s("J3J1"),h=(s("9roy"),s("SesW")),b=s("oxRU"),y=s("BZIu"),w=s("4BeY"),C=s.n(w),k=s("IaFt"),x=s.n(k),S=new C.a({id:"icon-list",use:"icon-list-usage",viewBox:"0 0 24 24",content:'<symbol viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="icon-list">\n    <path d="M3 6C2.44772 6 2 6.44772 2 7C2 7.55228 2.44772 8 3 8H4C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6H3Z" />\n    <path d="M9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8H21C21.5523 8 22 7.55228 22 7C22 6.44772 21.5523 6 21 6H9Z" />\n    <path d="M9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H9Z" />\n    <path d="M8 17C8 16.4477 8.44772 16 9 16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H9C8.44772 18 8 17.5523 8 17Z" />\n    <path d="M2 12C2 11.4477 2.44772 11 3 11H4C4.55228 11 5 11.4477 5 12C5 12.5523 4.55228 13 4 13H3C2.44772 13 2 12.5523 2 12Z" />\n    <path d="M3 16C2.44772 16 2 16.4477 2 17C2 17.5523 2.44772 18 3 18H4C4.55228 18 5 17.5523 5 17C5 16.4477 4.55228 16 4 16H3Z" />\n</symbol>'}),O=(x.a.add(S),new C.a({id:"icon-map",use:"icon-map-usage",viewBox:"0 0 24 24",content:'<symbol viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="icon-map">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.9834 2.00102C7.89323 2.00183 7.80156 2.01526 7.71044 2.04282L0.71044 4.16047C0.288569 4.28809 -1.92659e-08 4.67688 0 5.11763L6.9424e-07 21C7.23086e-07 21.6599 0.657908 22.1482 1.28956 21.9571L8.01822 19.9216L15.7351 21.9643C15.9146 22.0136 16.1067 22.0125 16.2896 21.9572L23.2896 19.8395C23.7114 19.7119 24 19.3231 24 18.8824V3.00001C24 2.6835 23.8502 2.38567 23.596 2.19703C23.3418 2.00838 23.0134 1.9512 22.7104 2.04285L15.9819 4.07838L8.25589 2.03326C8.16455 2.00908 8.07305 1.99885 7.9834 2.00102ZM7 18.1401V4.34726L2 5.85987L2 19.6527L7 18.1401ZM9 4.29911V18.1126L15 19.7008V5.88735L9 4.29911ZM17 5.85989V19.6527L22 18.1401V4.34729L17 5.85989Z" />\n</symbol>'})),A=(x.a.add(O),s("Ffxs"));s("xtKy");function j(e,t,s,a,n,r,o){try{var i=e[r](o),d=i.value}catch(e){return void s(e)}i.done?t(d):Promise.resolve(d).then(a,n)}function T(e){return function(){var t=this,s=arguments;return new Promise((function(a,n){var r=e.apply(t,s);function o(e){j(r,a,n,o,i,"next",e)}function i(e){j(r,a,n,o,i,"throw",e)}o(void 0)}))}}function M(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,a)}return s}function E(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?M(Object(s),!0).forEach((function(t){L(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):M(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function L(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var P="address-edit-modal",R={apiKey:"46c69919-a571-416e-8198-189ed26c6a79",lang:"ru_RU",coordorder:"latlong",version:"2.1"},H={name:P,mixins:[h.b],components:{VSvg:a.a,VButton:d.a,VInput:u.a,VSuggestion:c.a,GeneralModal:p.a,RadioSwitch:l.a,yandexMap:i.a,ymapMarker:i.b},validations:{address:{post_index:{required:h.g},flat:{required:h.g},floor:{required:h.g},porch:{required:h.g}}},data:function(){return{address:{country_code:"",post_index:"",region:"",region_guid:"",area:"",area_guid:"",city:"",city_guid:"",street:"",house:"",block:"",flat:"",floor:"",porch:"",intercom:"",comment:""},coords:null,cities:[],addresses:[],options:{debounce:500},showMap:!1,selectedSwitch:"list",switchItems:[{value:"list",title:"Форма"},{value:"map",title:"Карта"}],markerIcon:{layout:"default#image",imageHref:A.a,imageSize:[24,24],imageOffset:[0,0]}}},computed:E({},Object(m.d)(f.b,{modalState:function(e){return e[f.a][P]&&e[f.a][P].state||{}}}),{},Object(m.c)(_.a,[g.a]),{isTabletLg:function(){return this.$mq.tabletLg},computedCoords:function(){return this.coords||this[g.a]},selectedFormatAddress:function(){var e="";return this.address.area&&(e+=this.address.area+" "),this.address.street&&(e+=this.address.street+" "),this.address.house&&(e+=this.address.house+" "),this.address.block&&(e+=this.address.block),e},mapSettings:function(){return R},isMap:function(){return"map"===this.selectedSwitch}}),methods:E({},Object(m.b)(f.b,[v.a]),{findAddress:function(e,t,s,a){var n,r={value:e};switch(e){case b.suggestionTypes.REGION:n={value:b.suggestionTypes.AREA};break;case b.suggestionTypes.CITY:n={value:b.suggestionTypes.SETTLEMENT};break;case b.suggestionTypes.STREET:n={value:b.suggestionTypes.STREET};break;case b.suggestionTypes.HOUSE:break;default:n={value:e}}return y.$dadata.post("/suggest/address",{query:t,count:s,locations:a,from_bound:r,to_bound:n})},onCitySelected:function(e){var t=this;return T(regeneratorRuntime.mark((function s(){var a,n;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.findAddress(b.suggestionTypes.CITY,e.unrestricted_value,1);case 3:a=s.sent,n=a.suggestions,t.onApplyAddress(n[0]),s.next=11;break;case 8:s.prev=8,s.t0=s.catch(0),console.log(s.t0);case 11:case"end":return s.stop()}}),s,null,[[0,8]])})))()},onCityInputChange:function(e){var t=this;return T(regeneratorRuntime.mark((function s(){var a,n;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.findAddress(b.suggestionTypes.CITY,e||t.address.value,20);case 3:a=s.sent,n=a.suggestions,t.cities=n,s.next=12;break;case 8:return s.prev=8,s.t0=s.catch(0),console.log(s.t0),s.abrupt("return",null);case 12:case"end":return s.stop()}}),s,null,[[0,8]])})))()},onAddressSelected:function(e){var t=this;return T(regeneratorRuntime.mark((function s(){var a,n;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.findAddress(b.suggestionTypes.HOUSE,e.unrestricted_value,1);case 3:a=s.sent,n=a.suggestions,t.onApplyAddress(n[0]),s.next=11;break;case 8:s.prev=8,s.t0=s.catch(0),console.log(s.t0);case 11:case"end":return s.stop()}}),s,null,[[0,8]])})))()},onAddressInputChange:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return T(regeneratorRuntime.mark((function s(){var a,n,r;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,a=[],e.selectedAddress&&e.selectedAddress.data.city_fias_id&&a.push({city_fias_id:e.selectedAddress.data.city_fias_id}),s.next=5,e.findAddress(b.suggestionTypes.HOUSE,"".concat(e.address.city||""," ").concat(t),20,a);case 5:n=s.sent,r=n.suggestions,e.addresses=r,s.next=14;break;case 10:return s.prev=10,s.t0=s.catch(0),console.log(s.t0),s.abrupt("return",null);case 14:case"end":return s.stop()}}),s,null,[[0,10]])})))()},onMapClick:function(e){var t=this;return T(regeneratorRuntime.mark((function s(){var a,n,r,o;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return a=e.get("coords"),s.next=3,y.$dadata.post("/geolocate/address",{lat:a[0],lon:a[1],radius_meters:1e3});case 3:n=s.sent,r=n.suggestions,o=r.find((function(e){return e.data.house})),t.onApplyAddress(o);case 7:case"end":return s.stop()}}),s)})))()},formatAddress:function(e){return"".concat(e.data.street_with_type||e.data.city_district_with_type||e.data.settlement_with_type||""," ").concat(e.data.house_type," ").concat(e.data.house," ").concat(e.data.block?"".concat(e.data.block_type," ").concat(e.data.block):"")},onApplyAddress:function(e){var t=E({},this.address);e&&(t.value=e.value,t.country_code=e.data.country_iso_code,e.data.postal_code&&(t.post_index=e.data.postal_code),t.region=e.data.region_with_type||e.data.region,t.region_guid=e.data.region_fias_id,t.area=e.data.area_with_type||e.data.area,t.area_guid=e.data.area_fias_id,t.city=e.data.city_with_type||e.data.city,t.city_guid=e.data.city_fias_id,t.street=e.data.street_with_type||e.data.street,t.house=e.data.house_type?"".concat(e.data.house_type," ").concat(e.data.house):e.data.house,t.block=e.data.block_type?"".concat(e.data.block_type," ").concat(e.data.block):e.data.block,e.data.geo_lat&&e.data.geo_lon&&(this.coords=[Number(e.data.geo_lat),Number(e.data.geo_lon)]||!1),this.address=t)},onSubmit:function(){if(this.$v.$touch(),!this.$v.$invalid){var e=E({},this.address);this.modalState.onSave&&this.modalState.onSave(e),this.onClose()}},onClose:function(){this.CHANGE_MODAL_STATE({name:P,open:!1,state:{address:null,onSave:null}})},init:function(){var e=this;return T(regeneratorRuntime.mark((function t(){var s,a,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.modalState.address){t.next=8;break}return e.address=E({},e.modalState.address),t.next=4,e.findAddress(b.suggestionTypes.HOUSE,e.address.value,1);case 4:s=t.sent,a=s.suggestions,(n=a[0])&&(e.coords=[Number(n.data.geo_lat),Number(n.data.geo_lon)]);case 8:case"end":return t.stop()}}),t)})))()}}),beforeMount:function(){this.init()},mounted:function(){var e=this;setTimeout((function(){return e.showMap=!0}),300)}},$=s("KHd+"),I=Object($.a)(H,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("general-modal",{staticClass:"address-edit-modal",attrs:{type:e.isTabletLg?"fullscreen":"wide","is-mobile":e.isTabletLg},on:{close:e.onClose},scopedSlots:e._u([{key:"content",fn:function(){return[e.isTabletLg?s("radio-switch",{staticClass:"address-edit-modal__switch",attrs:{name:"map-switch",items:e.switchItems},scopedSlots:e._u([{key:"content",fn:function(t){var a=t.item;return[s("v-svg",{attrs:{name:a.value,width:"24",height:"24"}}),e._v("  "+e._s(a.title)+"\n            ")]}}],null,!1,4253381989),model:{value:e.selectedSwitch,callback:function(t){e.selectedSwitch=t},expression:"selectedSwitch"}}):e._e(),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.isTabletLg||e.isMap,expression:"!isTabletLg || isMap"}],staticClass:"address-edit-modal__map"},[e.showMap?s("yandex-map",{attrs:{settings:e.mapSettings,coords:e.computedCoords,controls:[],options:{yandexMapDisablePoiInteractivity:!0}},on:{click:e.onMapClick}},[e.coords?s("ymap-marker",{attrs:{"marker-id":"marker-id",coords:e.computedCoords,icon:e.markerIcon}}):e._e()],1):e._e()],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.isTabletLg||!e.isMap,expression:"!isTabletLg || !isMap"}],staticClass:"address-edit-modal__form"},[s("div",{staticClass:"address-edit-modal__form-header"},[s("h3",{staticClass:"address-edit-modal__form-header-hl"},[e._v("Адрес доставки")]),e._v(" "),s("span",{staticClass:"text-grey text-sm"},[e._v("Укажите на карте или введите вручную")])]),e._v(" "),s("div",{staticClass:"address-edit-modal__form-row"},[s("v-suggestion",{staticClass:"address-edit-modal__form-column",attrs:{value:e.address.city,options:e.options,items:e.cities},on:{input:e.onCityInputChange,selected:e.onCitySelected},scopedSlots:e._u([{key:"item",fn:function(t){var s=t.item;return[e._v("\n                        "+e._s(s.value)+"\n                    ")]}}])},[e._v("\n                    Ваш населенный пункт\n                    ")]),e._v(" "),s("v-input",{staticClass:"address-edit-modal__form-column address-edit-modal__form-column--30",attrs:{type:"number",maxlength:"6",min:"1"},model:{value:e.address.post_index,callback:function(t){e.$set(e.address,"post_index",t)},expression:"address.post_index"}},[e._v("\n                    Индекс\n                ")])],1),e._v(" "),s("div",{staticClass:"address-edit-modal__form-row"},[s("v-suggestion",{staticClass:"address-edit-modal__form-column",attrs:{value:e.selectedFormatAddress,options:e.options,items:e.addresses},on:{input:e.onAddressInputChange,selected:e.onAddressSelected},scopedSlots:e._u([{key:"item",fn:function(t){var s=t.item;return[e._v("\n                        "+e._s(e.formatAddress(s))+"\n                    ")]}}])},[e._v("\n                    Улица, дом, корпус\n                    ")]),e._v(" "),s("v-input",{staticClass:"address-edit-modal__form-column address-edit-modal__form-column--30",attrs:{type:"number",min:"1"},model:{value:e.address.flat,callback:function(t){e.$set(e.address,"flat",t)},expression:"address.flat"}},[e._v("\n                    Квартира/офис\n                ")])],1),e._v(" "),s("div",{staticClass:"address-edit-modal__form-row"},[s("v-input",{staticClass:"address-edit-modal__form-column address-edit-modal__form-column--30",attrs:{type:"number",min:"1"},model:{value:e.address.floor,callback:function(t){e.$set(e.address,"floor",t)},expression:"address.floor"}},[e._v("\n                    Этаж\n                ")]),e._v(" "),s("v-input",{staticClass:"address-edit-modal__form-column address-edit-modal__form-column--30",attrs:{type:"number",min:"1"},model:{value:e.address.porch,callback:function(t){e.$set(e.address,"porch",t)},expression:"address.porch"}},[e._v("\n                    Подъезд\n                ")]),e._v(" "),s("v-input",{staticClass:"address-edit-modal__form-column address-edit-modal__form-column--30",attrs:{min:"1"},model:{value:e.address.intercom,callback:function(t){e.$set(e.address,"intercom",t)},expression:"address.intercom"}},[e._v("\n                    Домофон\n                ")])],1),e._v(" "),s("v-input",{attrs:{tag:"textarea",rows:"3",maxHeight:"100"},model:{value:e.address.comment,callback:function(t){e.$set(e.address,"comment",t)},expression:"address.comment"}},[e._v("\n                Комментарий курьеру\n            ")]),e._v(" "),s("div",[s("v-button",{staticClass:"address-edit-modal__form-submit",on:{click:function(t){return t.preventDefault(),e.onSubmit(t)}}},[e._v("\n                    Сохранить\n                ")])],1)],1)]},proxy:!0}])})}),[],!1,null,null,null).exports,V=(s("BkRI"),s("Y+p1")),q=s.n(V),D=(s("zYMX"),s("B/pr"),s("VgBE"));function B(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,a)}return s}function Z(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?B(Object(s),!0).forEach((function(t){N(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):B(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function N(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var U={name:"addresses",components:{VSvg:a.a,VLink:n.a,InfoPanel:r.a,CheckoutOptionCard:o.a,AddressEditModal:I},data:function(){var e={id:"1",value:"г Москва, г Зеленоград, к 1134",country_code:"RU",post_index:"124460",region:"г Москва",region_guid:"0c5b2444-70a0-4932-980c-b4dc0d3f02b5",area:null,area_guid:null,city:"г Зеленоград",city_guid:"ec44c0ee-bf24-41c8-9e1c-76136ab05cbf",street:null,house:"к 1134",block:null,flat:110,floor:14,porch:1,intercom:"110",comment:"лалала"};return{mounted:!1,selectedAddress:e,addresses:[e]}},computed:Z({},Object(m.d)(f.b,{isAddressEditOpen:function(e){return e[f.a][P]&&e[f.a][P].open}}),{isTablet:function(){return this.$mq.tablet},iconSize:function(){return this.$mq.tablet?24:16}}),methods:Z({},Object(m.b)(f.b,[v.a]),{isEqualAddress:function(e,t){return q()(e,t)},onSetSelectedAddress:function(e){this.selectedAddress=e},onSave:function(e){if(e.id){var t=this.addresses.find((function(t){return e.id===t.id}));if(t){var s=this.addresses.indexOf(t);this.addresses[s]=e}}else e.id=Object(D.d)(0,1e6),this.addresses.push(e)},onAddAddress:function(){this[v.a]({name:P,open:!0,state:{address:{},onSave:this.onSave}})},onChangeAddress:function(e){this[v.a]({name:P,open:!0,state:{address:Z({},e),onSave:this.onSave}})}})},K=Object($.a)(U,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"section addresses-view"},[s("h2",{staticClass:"addresses-view__hl"},[e._v(e._s(e.$t("profile.routes."+e.$route.name)))]),e._v(" "),s("info-panel",{staticClass:"addresses-view__panel",attrs:{header:"Сохраненные адреса"},scopedSlots:e._u([{key:"controls",fn:function(){return[s("v-link",{staticClass:"addresses-view__panel-link",attrs:{tag:"button"},on:{click:e.onAddAddress}},[s("v-svg",{attrs:{name:"plus-small",width:e.iconSize,height:e.iconSize}}),e._v(" "),s("span",[e._v("  Добавить новый адрес")])],1)]},proxy:!0}])},[e._v(" "),s("div",{staticClass:"container container--tablet-lg"},[s("ul",{staticClass:"addresses-view__panel-list"},e._l(e.addresses,(function(t){return s("checkout-option-card",{key:t.region_guid+"-"+(t.city_guid||t.settlment_guid)+"-"+t.house,staticClass:"addresses-view__panel-item",attrs:{selected:e.isEqualAddress(t,e.selectedAddress)},on:{cardClick:function(s){return e.onSetSelectedAddress(t)},btnClick:function(s){return e.onChangeAddress(t)}}},[e._v("\n                    "+e._s((t.city||t.settlement)+", "+(t.area||t.street?(t.area||t.street)+", ":"")+t.house+" "+(t.block||"")+", "+t.post_index)+"\n                ")])})),1)])]),e._v(" "),s("transition",{attrs:{name:"fade"}},[e.$isServer||e.isAddressEditOpen?s("address-edit-modal",{directives:[{name:"show",rawName:"v-show",value:e.isAddressEditOpen,expression:"isAddressEditOpen"}]}):e._e()],1)],1)}),[],!1,null,null,null);t.default=K.exports},xtKy:function(e,t,s){}}]);