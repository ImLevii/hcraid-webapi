(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{498:function(t,e,c){var content=c(588);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,c(6).default)("dd496aa4",content,!0,{sourceMap:!1})},499:function(t,e,c){var content=c(590);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,c(6).default)("d539b0f8",content,!0,{sourceMap:!1})},587:function(t,e,c){"use strict";c(498)},588:function(t,e,c){(e=c(5)(!1)).push([t.i,".uk-container[data-v-93ccb5e2]{padding-bottom:20px}.page-section[data-v-93ccb5e2]{padding:20px}.ticket-table[data-v-93ccb5e2]{margin:10px 0 0;font-size:14px;line-height:14px}.ticket-table .ticket[data-v-93ccb5e2]{border-bottom:1px solid #dfe7eb}.ticket-table .ticket[data-v-93ccb5e2]:last-child{border-bottom:none}.ticket-table thead[data-v-93ccb5e2]{background:#262626}.ticket-table thead tr[data-v-93ccb5e2]{border-bottom:1px solid #dfe7eb}.ticket-table thead tr th[data-v-93ccb5e2]:first-child{border-top-left-radius:3px;border-bottom-left-radius:3px}.ticket-table thead tr th[data-v-93ccb5e2]:last-child{border-top-right-radius:3px;border-bottom-right-radius:3px}.ticket-table thead tr th[data-v-93ccb5e2]{padding-left:10px;padding-right:10px;color:#fff;opacity:.85}.ticket-table .ticket td[data-v-93ccb5e2]{padding:10px}.ticket-table .ticket td[data-v-93ccb5e2]:last-child{text-align:right}.ticket-table .ticket td.ticket-title[data-v-93ccb5e2],.ticket-table thead tr th.ticket-title[data-v-93ccb5e2]{margin-right:auto}.ticket-table .ticket td.ticket-title[data-v-93ccb5e2]{font-weight:700}.ticket-table .ticket .assigned ul[data-v-93ccb5e2]{display:flex;list-style:none;margin:0;padding:0}.ticket-table .ticket .assigned ul li[data-v-93ccb5e2]{margin-right:4px}.ticket-table .ticket .assigned ul li[data-v-93ccb5e2]:last-child{margin-right:0}",""]),t.exports=e},589:function(t,e,c){"use strict";c(499)},590:function(t,e,c){(e=c(5)(!1)).push([t.i,".ticket-table .ticket .player-avatar{width:24px;height:24px}",""]),t.exports=e},776:function(t,e,c){"use strict";c.r(e);c(21);var r=c(3),n={middleware:"admin",data:function(){return{tickets:null}},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.$axios,e.next=3,c.get("/staff/tickets").then((function(t){var data={};return 200===t.status&&(data.tickets=t.data),data})).catch((function(t){}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))()},computed:{getReadableStatus:function(){return function(t){switch(t){case"INITIATED":return"Initiated";case"ANSWERED":return"Answered";case"USER_REPLY":return"User Reply";case"CLOSED":return"Closed"}}}}},l=(c(587),c(589),c(2)),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"uk-container uk-margin"},[c("ul",{staticClass:"uk-breadcrumb"},[c("li",[c("nuxt-link",{attrs:{to:{name:"staff-dashboard"}}},[t._v("Staff Dashboard")])],1),t._v(" "),t._m(0),t._v(" "),c("li",[c("nuxt-link",{attrs:{to:{name:"staff-tickets-all"}}},[t._v("All Tickets")])],1)]),t._v(" "),c("div",{staticClass:"page-section uk-margin"},[c("span",{staticClass:"page-title"},[t._v("All Tickets")]),t._v(" "),c("table",{staticClass:"ticket-table uk-table"},[t._m(1),t._v(" "),c("tbody",t._l(t.tickets,(function(e){return c("tr",{staticClass:"ticket"},[c("td",{staticClass:"ticket-title"},[c("SupportTicketLink",{attrs:{ticket:e,staff:!0}})],1),t._v(" "),c("td",[c("span",{staticClass:"uk-label ticket-status",class:[e.ticket_status.toLowerCase()]},[t._v(t._s(t.getReadableStatus(e.ticket_status)))])]),t._v(" "),c("td",[c("DateDisplay",{attrs:{timestamp:e.last_update,ago:!0}})],1),t._v(" "),c("td",[c("DateDisplay",{attrs:{timestamp:e.created_at}})],1),t._v(" "),c("td",[c("PlayerAvatar",{attrs:{user:e.created_by}}),t._v(" "),c("PlayerLink",{attrs:{user:e.created_by}})],1),t._v(" "),c("td",{staticClass:"assigned"},[c("ul",[0===e.assigned_to.length?c("li",[t._v("\n\t\t\t\t\t\t\tnobody\n\t\t\t\t\t\t")]):t._l(e.assigned_to,(function(t){return c("li",[c("PlayerAvatar",{attrs:{user:t}})],1)}))],2)]),t._v(" "),c("td",[c("SupportTicketLink",{staticClass:"uk-button uk-btn-blue",attrs:{ticket:e,staff:!0}},[t._v("View")])],1)])})),0)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"divider"},[e("i",{staticClass:"fas fa-chevron-right"})])},function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("thead",[c("tr",[c("th",{staticClass:"ticket-title"},[t._v("Ticket")]),t._v(" "),c("th",[t._v("Status")]),t._v(" "),c("th",[t._v("Last Update")]),t._v(" "),c("th",[t._v("Created")]),t._v(" "),c("th",[t._v("Created By")]),t._v(" "),c("th",[t._v("Assigned To")]),t._v(" "),c("th")])])}],!1,null,"93ccb5e2",null);e.default=component.exports;installComponents(component,{SupportTicketLink:c(203).default,DateDisplay:c(65).default,PlayerAvatar:c(41).default,PlayerLink:c(34).default})}}]);