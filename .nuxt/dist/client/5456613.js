(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{476:function(t,e,r){var content=r(551);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(6).default)("aac3c57c",content,!0,{sourceMap:!1})},550:function(t,e,r){"use strict";r(476)},551:function(t,e,r){(e=r(5)(!1)).push([t.i,".page-section[data-v-210e033c]{padding:20px}.staff .rank-group[data-v-210e033c]{display:flex;flex-direction:column;width:100%;margin-bottom:30px}.staff .rank-group[data-v-210e033c]:last-child{margin-bottom:0}.staff .rank-group .rank-title[data-v-210e033c]{display:block;padding:10px 16px 6px 0;font-size:24px;line-height:26px;text-shadow:2px 2px 0 rgba(0,0,0,.8)!important}.staff .rank-group .rank-members[data-v-210e033c]{padding:20px;background:#0e0e0e;border:1px solid #0c0c0c;border-top:2px solid}.staff .rank-group .rank-members .entry[data-v-210e033c]{display:inline-flex;flex-direction:column;align-items:center;width:150px;margin-right:50px}.staff .rank-group .rank-members .entry>*[data-v-210e033c]{display:block}.staff .rank-group .rank-members .entry>img[data-v-210e033c]{width:95px;height:154px}.staff .rank-group .rank-members .entry>.username[data-v-210e033c]{margin-top:6px;font-size:20px;text-align:center}.staff .rank-group .rank-members .entry>.player-tag[data-v-210e033c]{display:inline-block}",""]),t.exports=e},763:function(t,e,r){"use strict";r.r(e);r(21);var n=r(3),o={a:"#55FF55",b:"#55FFFF",c:"#FF5555",d:"#FF55FF",e:"#FFFF55",f:"#FFFFFF",0:"#000000",1:"#0000AA",2:"#00AA00",3:"#00AAAA",4:"#AA0000",5:"#AA00AA",6:"#FFAA00",7:"#AAAAAA",8:"#555555",9:"#5555FF"};var c={asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$axios,e.next=3,r.get("/staff/").then((function(t){return console.log(t.data),{staff:t.data}})).catch((function(t){console.log(t)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))()},data:function(){return{staff:null}},head:function(){return{title:"Staff"}},methods:{convertGameColor:function(t){return function(t){return o[t[1]]}(t)}}},l=(r(550),r(2)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"uk-container uk-margin"},[r("div",{staticClass:"page-section"},[r("span",{staticClass:"page-title"},[t._v("Staff")]),t._v(" "),null!=t.staff?r("div",{staticClass:"staff page-section"},t._l(t.staff,(function(e){return r("div",{staticClass:"rank-group"},[r("h3",{staticClass:"rank-title",style:{color:t.convertGameColor(e.meta.displayColor)}},[t._v(t._s(e.meta.displayName))]),t._v(" "),r("div",{staticClass:"rank-members",style:{"border-top-color":t.convertGameColor(e.meta.displayColor)}},t._l(e.entries,(function(n){return r("div",{staticClass:"entry"},[r("img",{attrs:{src:"https://visage.surgeplay.com/full/"+n.uuid+"?tilt=0",alt:n.name}}),t._v(" "),r("span",{staticClass:"username"},[t._v(t._s(n.name))]),t._v(" "),r("span",{staticClass:"player-tag",style:{"background-color":t.convertGameColor(e.meta.displayColor)}},[t._v(t._s(e.meta.displayName))])])})),0)])})),0):t._e()])])}),[],!1,null,"210e033c",null);e.default=component.exports}}]);