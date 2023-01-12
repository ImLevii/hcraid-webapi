<template>
	<div class="uk-container uk-margin">
		<ul class="uk-breadcrumb">
			<li>
				<nuxt-link :to="{ name: 'support' }">Support</nuxt-link>
			</li>
			<li class="divider">
				<i class="fas fa-chevron-right"></i>
			</li>
			<li>
				<nuxt-link :to="{ name: 'support-tickets' }">Tickets</nuxt-link>
			</li>
		</ul>

		<div class="page-section uk-margin">
			<div class="uk-flex uk-flex-middle">
				<span class="page-title">My Support Tickets</span>

				<nuxt-link :to="{ name: 'support-tickets-new' }" class="uk-button uk-btn-green" style="margin-left: auto; flex-shrink: 0">
					<i class="fas fa-plus" style="position: relative; top: -1px"></i>
					Create Ticket
				</nuxt-link>
			</div>

			<table class="ticket-table uk-table">
				<thead>
				<tr>
					<th class="ticket-title">Ticket</th>
					<th>Status</th>
					<th>Last Update</th>
					<th>Created</th>
					<th>Assigned To</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="ticket in tickets" class="ticket">
					<td class="ticket-title">
						<SupportTicketLink :ticket="ticket"/>
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
						<nuxt-link :to="{ name: 'support-tickets-id', params: { 'id': ticket.id } }" class="uk-button uk-btn-blue">View</nuxt-link>
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

	@media screen and (max-width: 640px) {
		.page-section {
			overflow-x: scroll;
		}
	}
</style>

<style>
	.ticket-table .ticket .assigned ul li .player-avatar {
		width: 24px;
		height: 24px;
	}
</style>

<script>
    export default {
        middleware: 'authenticated',
		data() {
	        return {
	            tickets: null
			}
		},
	    async asyncData({$axios}) {
	        return await $axios.get('/user/tickets').then(response => {
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
