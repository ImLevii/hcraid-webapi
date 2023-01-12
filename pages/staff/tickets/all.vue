<template>
	<div class="uk-container uk-margin">
		<ul class="uk-breadcrumb">
			<li>
				<nuxt-link :to="{ name: 'staff-dashboard' }">Staff Dashboard</nuxt-link>
			</li>
			<li class="divider">
				<i class="fas fa-chevron-right"></i>
			</li>
			<li>
				<nuxt-link :to="{ name: 'staff-tickets-all' }">All Tickets</nuxt-link>
			</li>
		</ul>

		<div class="page-section uk-margin">
			<span class="page-title">All Tickets</span>

			<table class="ticket-table uk-table">
				<thead>
				<tr>
					<th class="ticket-title">Ticket</th>
					<th>Status</th>
					<th>Last Update</th>
					<th>Created</th>
					<th>Created By</th>
					<th>Assigned To</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="ticket in tickets" class="ticket">
					<td class="ticket-title">
						<SupportTicketLink :ticket="ticket" :staff="true"/>
					</td>
					<td>
						<span class="uk-label ticket-status" v-bind:class="[ticket.ticket_status.toLowerCase()]">{{ getReadableStatus(ticket.ticket_status) }}</span>
					</td>
					<td>
						<DateDisplay :timestamp="ticket.last_update" :ago="true"/>
					</td>
					<td>
						<DateDisplay :timestamp="ticket.created_at"/>
					</td>
					<td>
						<PlayerAvatar :user="ticket.created_by"/>
						<PlayerLink :user="ticket.created_by"/>
					</td>
					<td class="assigned">
						<ul>
							<li v-if="ticket.assigned_to.length === 0">
								nobody
							</li>
							<li v-else v-for="staff in ticket.assigned_to">
								<PlayerAvatar :user="staff"/>
							</li>
						</ul>
					</td>
					<td>
						<SupportTicketLink :ticket="ticket" :staff="true" class="uk-button uk-btn-blue">View</SupportTicketLink>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style scoped>
	.uk-container {
		padding-bottom: 20px;
	}

	.page-section {
		padding: 20px;
	}

	.ticket-table {
		margin: 10px 0 0 0;
		font-size: 14px;
		line-height: 14px;
	}

	.ticket-table .ticket {
		border-bottom: 1px solid #DFE7EB;
	}

	.ticket-table .ticket:last-child {
		border-bottom: none;
	}

	.ticket-table thead {
		background: #262626;
	}

	.ticket-table thead tr {
		border-bottom: 1px solid #DFE7EB;
	}

	.ticket-table thead tr th:first-child {
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
	}

	.ticket-table thead tr th:last-child {
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}

	.ticket-table thead tr th {
		padding-left: 10px;
		padding-right: 10px;
		color: #fff;
		opacity: 0.85;
	}

	.ticket-table .ticket td {
		padding: 10px;
	}

	.ticket-table .ticket td:last-child {
		text-align: right;
	}

	.ticket-table thead tr th.ticket-title,
	.ticket-table .ticket td.ticket-title {
		margin-right: auto;
	}

	.ticket-table .ticket td.ticket-title {
		font-weight: bold;
	}

	.ticket-table .ticket .assigned ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.ticket-table .ticket .assigned ul li {
		margin-right: 4px;
	}

	.ticket-table .ticket .assigned ul li:last-child {
		margin-right: 0;
	}
</style>

<style>
	.ticket-table .ticket .player-avatar {
		width: 24px;
		height: 24px;
	}
</style>

<script>
	export default {
	    middleware: 'admin',
		data() {
	        return {
	            tickets: null
			}
		},
	    async asyncData({$axios}) {
	        return await $axios.get('/staff/tickets').then(response => {
	            let data = {};

	            if (response.status === 200) {
	                data['tickets'] = response.data;
				}

	            return data;
			}).catch(error => {

			});
		},
		computed: {
            getReadableStatus: function() {
                return (status) => {
                    switch (status) {
                        case "INITIATED":
                            return "Initiated";
						case "ANSWERED":
						    return "Answered";
						case "USER_REPLY":
						    return "User Reply";
						case "CLOSED":
						    return "Closed";
					}
				};
			}
		}
	}
</script>
