(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"8yoK":function(e,t,i){"use strict";var n=i("NDiG"),r=i("2JJK"),a=i("nVXW"),l=i("4BeY"),s=i.n(l),o=i("IaFt"),f=i.n(o),c=new s.a({id:"icon-trash",use:"icon-trash-usage",viewBox:"0 0 24 24",content:'<symbol viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="icon-trash">\r\n    <path d="M10 8C10.5523 8 11 8.44772 11 9V18C11 18.5523 10.5523 19 10 19C9.44772 19 9 18.5523 9 18V9C9 8.44772 9.44772 8 10 8Z" />\r\n    <path d="M15 9C15 8.44772 14.5523 8 14 8C13.4477 8 13 8.44772 13 9V18C13 18.5523 13.4477 19 14 19C14.5523 19 15 18.5523 15 18V9Z" />\r\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.44772 1 9 1.44772 9 2V4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6H4.52898L5.00043 22.0294C5.01633 22.57 5.45916 23 6 23H18C18.5408 23 18.9837 22.57 18.9996 22.0294L19.471 6H20C20.5523 6 21 5.55228 21 5C21 4.44772 20.5523 4 20 4H15V2C15 1.44772 14.5523 1 14 1H10ZM13 4V3H11V4H13ZM6.97102 21L6.52984 6H17.4702L17.029 21H6.97102Z" />\r\n</symbol>'}),u=(f.a.add(c),i("d5PU"),{name:"v-file-item",inject:["deleteFile"],components:{VSvg:n.a},props:{file:{default:null}},data:function(){return{preloader:a.a,load:!1,name:null,src:null}},methods:{onDeleteItem:function(){this.deleteFile(this.file)}},beforeMount:function(){var e=this,t=new FileReader;this.file.type===r.mimeType.image.JPEG||this.file.type===r.mimeType.image.PNG?(t.readAsDataURL(this.file),t.onloadend=function(){e.src=t.result,t.onloadend=null,setTimeout((function(){return e.load=!0}),r.interval.SECOND)}):(this.name=this.file.name,setTimeout((function(){return e.load=!0}),r.interval.SECOND))}}),d=i("KHd+"),m=Object(d.a)(u,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"v-file-item",on:{click:function(t){return t.stopPropagation(),e.onDeleteItem(t)}}},[i("transition",{attrs:{name:"fade",mode:"out-in"}},[e.load?e.src?i("img",{key:"img",staticClass:"v-file-item__img",attrs:{src:e.src}}):i("div",{key:"name",staticClass:"v-file-item__container"},[e._v(e._s(e.name))]):i("img",{key:"preloader",attrs:{src:e.preloader,width:"30",height:"30"}})]),e._v(" "),i("div",{staticClass:"v-file-item__mask"},[i("div",{staticClass:"v-file-item__mask-inner"}),e._v(" "),i("v-svg",{staticClass:"v-file-item__mask-icon",attrs:{name:"trash",width:"24",height:"24"}})],1)],1)}),[],!1,null,null,null).exports;i("ZHy4");function p(e){return function(e){if(Array.isArray(e))return h(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return h(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var v={name:"v-file",provide:function(){return{deleteFile:this.deleteFile}},components:{VFileItem:m},props:{acceptedTypes:{type:Array,default:function(){return[]}},maxFileSize:{type:Number},filter:{type:Function,default:null},maxFiles:{type:Number,default:10}},data:function(){return{inputId:0,files:[]}},computed:{acceptedTypesString:function(){return this.acceptedTypes.join(",")},isEmpty:function(){return!this.files||0===this.files.length}},watch:{files:function(){this.$emit("change",p(this.files))}},methods:{isAccepted:function(e){if(this.filter)return this.filter(e);var t=this.acceptedTypes&&(0===this.acceptedTypes.length||this.acceptedTypes.includes(e.type)),i=this.maxFileSize&&e.size<this.maxFileSize;return t&&i},deleteFile:function(e){this.files=this.files.filter((function(t){return t!==e}))},handleFiles:function(e){var t,i=this,n=p(e).slice(0,this.maxFiles-this.files.length).filter((function(e){return!i.files.some((function(t){return t.name===e.name}))&&i.isAccepted(e)}));(t=this.files).push.apply(t,p(n)),this.inputId+=1},handleDrop:function(e){var t=e.dataTransfer&&e.dataTransfer.files||[];this.handleFiles(t)}}},y=Object(d.a)(v,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"v-file",attrs:{id:"drop-area"}},[e._l(e.files,(function(t,n){return[e._t("file",[i("v-file-item",{key:t.name,staticClass:"v-file__item",attrs:{file:t}})],{file:t,index:n})]})),e._v(" "),e.files.length<e.maxFiles?i("form",{staticClass:"v-file__item v-file__form",class:{"v-file__form--empty":e.isEmpty},on:{dragenter:function(e){e.preventDefault()},dragover:function(e){e.preventDefault()},dragleave:function(e){e.preventDefault()},drop:function(t){return t.preventDefault(),e.handleDrop(t)}}},[i("label",{staticClass:"v-file__form-label",attrs:{for:"fileInput"}},[e._t("default",[i("div",{staticClass:"text-medium v-file__form-label-title"},[e._v("Выберите файл ")]),e._v(" "),i("div",{staticClass:"text-sm text-grey"},[e._v("или перетащите сюда")])])],2),e._v(" "),i("input",{key:e.inputId,staticClass:"v-file__form-input",attrs:{id:"fileInput",type:"file",multiple:"",accept:e.acceptedTypes},on:{change:function(t){return e.handleFiles(t.target.files)}}})]):e._e()],2)}),[],!1,null,null,null);t.a=y.exports},ZHy4:function(e,t,i){},d5PU:function(e,t,i){}}]);