(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{414:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"withParams",{enumerable:!0,get:function(){return o.default}}),t.regex=t.ref=t.len=t.req=void 0;var n,o=(n=r(425))&&n.__esModule?n:{default:n};function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var c=function(e){if(Array.isArray(e))return!!e.length;if(null==e)return!1;if(!1===e)return!0;if(e instanceof Date)return!isNaN(e.getTime());if("object"===l(e)){for(var t in e)return!0;return!1}return!!String(e).length};t.req=c;t.len=function(e){return Array.isArray(e)?e.length:"object"===l(e)?Object.keys(e).length:String(e).length};t.ref=function(e,t,r){return"function"==typeof e?e.call(t,r):r[e]};t.regex=function(e,t){return(0,o.default)({type:e},(function(e){return!c(e)||t.test(e)}))}},420:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"alpha",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"alphaNum",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"numeric",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"between",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"email",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"ipAddress",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"macAddress",{enumerable:!0,get:function(){return v.default}}),Object.defineProperty(t,"maxLength",{enumerable:!0,get:function(){return m.default}}),Object.defineProperty(t,"minLength",{enumerable:!0,get:function(){return h.default}}),Object.defineProperty(t,"required",{enumerable:!0,get:function(){return y.default}}),Object.defineProperty(t,"requiredIf",{enumerable:!0,get:function(){return _.default}}),Object.defineProperty(t,"requiredUnless",{enumerable:!0,get:function(){return x.default}}),Object.defineProperty(t,"sameAs",{enumerable:!0,get:function(){return P.default}}),Object.defineProperty(t,"url",{enumerable:!0,get:function(){return k.default}}),Object.defineProperty(t,"or",{enumerable:!0,get:function(){return w.default}}),Object.defineProperty(t,"and",{enumerable:!0,get:function(){return O.default}}),Object.defineProperty(t,"not",{enumerable:!0,get:function(){return j.default}}),Object.defineProperty(t,"minValue",{enumerable:!0,get:function(){return $.default}}),Object.defineProperty(t,"maxValue",{enumerable:!0,get:function(){return C.default}}),Object.defineProperty(t,"integer",{enumerable:!0,get:function(){return M.default}}),Object.defineProperty(t,"decimal",{enumerable:!0,get:function(){return L.default}}),t.helpers=void 0;var n=S(r(424)),o=S(r(427)),l=S(r(428)),c=S(r(429)),f=S(r(430)),d=S(r(431)),v=S(r(432)),m=S(r(433)),h=S(r(434)),y=S(r(435)),_=S(r(436)),x=S(r(437)),P=S(r(438)),k=S(r(439)),w=S(r(440)),O=S(r(441)),j=S(r(442)),$=S(r(443)),C=S(r(444)),M=S(r(445)),L=S(r(446)),A=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};desc.get||desc.set?Object.defineProperty(t,r,desc):t[r]=e[r]}return t.default=e,t}(r(414));function S(e){return e&&e.__esModule?e:{default:e}}t.helpers=A},424:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(414).regex)("alpha",/^[a-zA-Z]*$/);t.default=n},425:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n="web"===e.env.BUILD?r(426).withParams:r(204).withParams;t.default=n}).call(this,r(80))},426:function(e,t,r){"use strict";(function(e){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.withParams=void 0;var n="undefined"!=typeof window?window:void 0!==e?e:{},o=n.vuelidate?n.vuelidate.withParams:function(e,t){return"object"===r(e)&&void 0!==t?t:e((function(){}))};t.withParams=o}).call(this,r(18))},427:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(414).regex)("alphaNum",/^[a-zA-Z0-9]*$/);t.default=n},428:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(414).regex)("numeric",/^[0-9]*$/);t.default=n},429:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(e,t){return(0,n.withParams)({type:"between",min:e,max:t},(function(r){return!(0,n.req)(r)||(!/\s/.test(r)||r instanceof Date)&&+e<=+r&&+t>=+r}))}},430:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(414).regex)("email",/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/);t.default=n},431:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414),o=(0,n.withParams)({type:"ipAddress"},(function(e){if(!(0,n.req)(e))return!0;if("string"!=typeof e)return!1;var t=e.split(".");return 4===t.length&&t.every(l)}));t.default=o;var l=function(e){if(e.length>3||0===e.length)return!1;if("0"===e[0]&&"0"!==e)return!1;if(!e.match(/^\d+$/))return!1;var t=0|+e;return t>=0&&t<=255}},432:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,n.withParams)({type:"macAddress"},(function(t){if(!(0,n.req)(t))return!0;if("string"!=typeof t)return!1;var r="string"==typeof e&&""!==e?t.split(e):12===t.length||16===t.length?t.match(/.{2}/g):null;return null!==r&&(6===r.length||8===r.length)&&r.every(o)}))};var o=function(e){return e.toLowerCase().match(/^[0-9a-f]{2}$/)}},433:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(e){return(0,n.withParams)({type:"maxLength",max:e},(function(t){return!(0,n.req)(t)||(0,n.len)(t)<=e}))}},434:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(e){return(0,n.withParams)({type:"minLength",min:e},(function(t){return!(0,n.req)(t)||(0,n.len)(t)>=e}))}},435:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414),o=(0,n.withParams)({type:"required"},(function(e){return"string"==typeof e?(0,n.req)(e.trim()):(0,n.req)(e)}));t.default=o},436:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(e){return(0,n.withParams)({type:"requiredIf",prop:e},(function(t,r){return!(0,n.ref)(e,this,r)||(0,n.req)(t)}))}},437:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(e){return(0,n.withParams)({type:"requiredUnless",prop:e},(function(t,r){return!!(0,n.ref)(e,this,r)||(0,n.req)(t)}))}},438:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(e){return(0,n.withParams)({type:"sameAs",eq:e},(function(t,r){return t===(0,n.ref)(e,this,r)}))}},439:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(414).regex)("url",/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i);t.default=n},440:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"or"},(function(){for(var e=this,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return t.length>0&&t.reduce((function(t,r){return t||r.apply(e,n)}),!1)}))}},441:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"and"},(function(){for(var e=this,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return t.length>0&&t.reduce((function(t,r){return t&&r.apply(e,n)}),!0)}))}},442:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(e){return(0,n.withParams)({type:"not"},(function(t,r){return!(0,n.req)(t)||!e.call(this,t,r)}))}},443:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(e){return(0,n.withParams)({type:"minValue",min:e},(function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t>=+e}))}},444:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(414);t.default=function(e){return(0,n.withParams)({type:"maxValue",max:e},(function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t<=+e}))}},445:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(414).regex)("integer",/(^[0-9]*$)|(^-[0-9]+$)/);t.default=n},446:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=(0,r(414).regex)("decimal",/^[-]?\d*(\.\d+)?$/);t.default=n},502:function(e,t,r){var content=r(596);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(6).default)("3d386722",content,!0,{sourceMap:!1})},595:function(e,t,r){"use strict";r(502)},596:function(e,t,r){(t=r(5)(!1)).push([e.i,".uk-container[data-v-0a841b8f]{padding-bottom:20px}form textarea[data-v-0a841b8f]{height:400px;line-height:20px;padding:10px}.page-section[data-v-0a841b8f]{padding:20px}",""]),e.exports=t},774:function(e,t,r){"use strict";r.r(t);var n=r(110),o=n.validationMixin,l=(n.default,r(420)),c=l.required,f=l.minLength,d=l.maxLength,v={middleware:"authenticated",mixins:[o],validations:{title:{required:c,minLength:f(3),maxLength:d(60)},details:{required:c,minLength:f(10),maxLength:d(8e3)}},data:function(){return{title:"",details:"",ticketType:null,error:null}},head:function(){return{title:"New Ticket"}},methods:{submitTicket:function(){var e=this;this.error=null,this.$v.$touch(),this.$v.$invalid?this.error="The form is invalid!":this.$axios.post("/user/tickets/create",{title:this.title,details:this.details,ticket_type:this.ticketType}).then((function(t){201===t.status&&e.$router.push({name:"support-tickets-id",params:{id:t.data.id}})})).catch((function(t){e.error=t.response.data}))}}},m=(r(595),r(2)),component=Object(m.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"uk-container uk-margin"},[r("ul",{staticClass:"uk-breadcrumb"},[r("li",[r("nuxt-link",{attrs:{to:{name:"support"}}},[e._v("Support")])],1),e._v(" "),e._m(0),e._v(" "),r("li",[r("nuxt-link",{attrs:{to:{name:"support-tickets"}}},[e._v("Tickets")])],1),e._v(" "),e._m(1),e._v(" "),r("li",[r("nuxt-link",{attrs:{to:{name:"support-tickets-new"}}},[e._v("New Ticket")])],1)]),e._v(" "),r("div",{staticClass:"page-section uk-margin"},[r("div",{staticClass:"uk-grid uk-flex uk-flex-center"},[r("div",{staticClass:"uk-width-3-4"},[r("span",{staticClass:"page-title"},[e._v("New Support Ticket")]),e._v(" "),r("p",{staticClass:"uk-p uk-p-blue accent uk-margin-s"},[e._v("When creating a support ticket, please include as much detail as possible about how we can help you. Also allow us adequate time to process your ticket, but we usually respond within 24 hours.")]),e._v(" "),r("form",{staticClass:"ticket-form"},[r("div",{staticClass:"uk-margin"},[r("label",{staticClass:"uk-form-label",attrs:{for:"ticket-type"}},[e._v("\n\t\t\t\t\t\t\tWhat can we help you with?\n\t\t\t\t\t\t")]),e._v(" "),r("div",{staticClass:"uk-form-controls"},[r("div",{staticClass:"uk-inline uk-width-1-1"},[r("select",{directives:[{name:"model",rawName:"v-model",value:e.ticketType,expression:"ticketType"}],staticClass:"uk-select",attrs:{id:"ticket-type",name:"ticket-type"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.ticketType=t.target.multiple?r:r[0]}}},[r("option",{attrs:{value:"GENERAL_ENQUIRY"}},[e._v("General Enquiry")]),e._v(" "),r("option",{attrs:{value:"PAYMENT_ISSUE"}},[e._v("Payment Issue")]),e._v(" "),r("option",{attrs:{value:"REPORT_PLAYER"}},[e._v("Report a Player")]),e._v(" "),r("option",{attrs:{value:"ACCOUNT_SUSPENSION"}},[e._v("Account Suspension")])])])])]),e._v(" "),r("div",{staticClass:"uk-margin"},[e._m(2),e._v(" "),e.$v.title.minLength?e._e():r("div",{staticClass:"form-error"},[e._v("The title must have at least "+e._s(e.$v.title.$params.minLength.min)+" characters!")]),e._v(" "),e.$v.title.maxLength?e._e():r("div",{staticClass:"form-error"},[e._v("The title can't have more than "+e._s(e.$v.title.$params.maxLength.max)+" characters!")]),e._v(" "),r("div",{staticClass:"uk-form-controls"},[r("div",{staticClass:"uk-inline uk-width-1-1"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"title"}],staticClass:"uk-input",class:{"uk-form-danger":!e.$v.title.minLength||!e.$v.title.maxLength},attrs:{id:"title",name:"title",placeholder:"The title of your ticket...",type:"text"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value)}}})])])]),e._v(" "),r("div",{staticClass:"uk-margin"},[e._m(3),e._v(" "),e.$v.details.minLength?e._e():r("div",{staticClass:"form-error"},[e._v("Your ticket must have at least "+e._s(e.$v.details.$params.minLength.min)+" characters!")]),e._v(" "),e.$v.details.maxLength?e._e():r("div",{staticClass:"form-error"},[e._v("Your ticket can't have more than "+e._s(e.$v.details.$params.maxLength.max)+" characters!")]),e._v(" "),r("div",{staticClass:"uk-form-controls"},[r("div",{staticClass:"uk-inline uk-width-1-1",class:{error:!e.$v.details.minLength||!e.$v.details.maxLength}},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.details,expression:"details"}],ref:"details",staticClass:"uk-input",class:{"uk-form-danger":!e.$v.details.minLength||!e.$v.details.maxLength},attrs:{id:"details",name:"details",placeholder:"The details of your ticket..."},domProps:{value:e.details},on:{input:function(t){t.target.composing||(e.details=t.target.value)}}})])])]),e._v(" "),r("button",{staticClass:"uk-button uk-btn-green uk-margin",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.submitTicket()}}},[e._v("Create Ticket")])])])])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"divider"},[t("i",{staticClass:"fas fa-chevron-right"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"divider"},[t("i",{staticClass:"fas fa-chevron-right"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"uk-form-label",attrs:{for:"title"}},[this._v("\n\t\t\t\t\t\t\tThe title of your ticket "),t("span",{staticClass:"uk-text-meta"},[this._v("(required)")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"uk-form-label",attrs:{for:"details"}},[this._v("\n\t\t\t\t\t\t\tThe details of your ticket "),t("span",{staticClass:"uk-text-meta"},[this._v("(required)")])])}],!1,null,"0a841b8f",null);t.default=component.exports}}]);