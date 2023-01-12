<template>
	<div class="uk-container uk-margin">
		<template v-if="ticket != null">
			<ul class="uk-breadcrumb">
				<li>
					<nuxt-link :to="{ name: 'staff-dashboard' }">Staff Dashboard</nuxt-link>
				</li>
				<li class="divider">
					<i class="fas fa-chevron-right"></i>
				</li>
				<li>
					<nuxt-link :to="{ name: 'staff-tickets-assigned' }">Tickets</nuxt-link>
				</li>
				<li class="divider">
					<i class="fas fa-chevron-right"></i>
				</li>
				<li>
					<SupportTicketLink :ticket="ticket" :staff="true"/>
				</li>
			</ul>

			<div class="uk-grid uk-grid-small uk-grid-match uk-margin">
				<div class="uk-width-3-4@m">
					<div class="page-section">
						<div class="ticket">
							<PlayerAvatar :user="ticket.created_by"/>

							<div class="ticket-body">
								<div class="ticket-details">
									<SupportTicketLink :ticket="ticket" :staff="true" class="page-title ticket-title"/>

									<span class="ticket-created-at">
										Created by
										<PlayerLink :user="ticket.created_by"/>
										&bull;
										<DateDisplay :timestamp="ticket.created_at" :ago="true"/>
									</span>
								</div>

								<p class="rendered-post">{{ ticket.content }}</p>
							</div>
						</div>

						<div v-if="ticket.feed.length > 0" class="ticket-feed">
							<template v-for="feedEntity in ticket.feed">
								<div v-if="feedEntity.entity_type === 'REPLY'" class="feed-item ticket-reply">
									<PlayerAvatar :user="feedEntity.created_by"/>

									<div class="reply-details">
										<span class="reply-created-at">
											reply from
											<PlayerLink :user="ticket.created_by"/>
											&bull;
											<DateDisplay :timestamp="ticket.created_at" :ago="true"/>
										</span>

										<p class="rendered-post">{{ feedEntity.content }}</p>
									</div>
								</div>
								<div v-else-if="feedEntity.entity_type === 'STAFF_ASSIGNMENT'" class="feed-item new-assignment">
									<span v-if="feedEntity.meta.length === 1" class="text">Ticket assigned to a staff member</span>
									<span v-else class="text">Ticket assigned to staff members</span>

									<DateDisplay :timestamp="feedEntity.created_at" :ago="true" class="time"/>

									<ul class="assigned">
										<li v-for="user in feedEntity.meta">
											<PlayerAvatar :user="user"/>
										</li>
									</ul>
								</div>
								<div v-else>
									{{ feedEntity }}
								</div>
							</template>
						</div>
					</div>
				</div>
				<div class="uk-width-1-4@m">
					<div class="page-section ticket-sidebar">
						<div class="sidebar-section">
							<span class="page-title">Ticket Info</span>
							<table class="uk-table">
								<tbody>
								<tr>
									<td>ID</td>
									<td>
										{{ ticket.id }}
									</td>
								</tr>
								<tr>
									<td>
										Status
									</td>
									<td>
										<span class="uk-label ticket-status" v-bind:class="[ticket.ticket_status.toLowerCase()]">
											{{ getReadableStatus(ticket.ticket_status) }}
										</span>
									</td>
								</tr>
								<tr>
									<td>
										Assigned to
									</td>
									<td class="assigned">
										<ul>
											<li v-for="user in ticket.assigned_to">
												<PlayerAvatar :user="user"/>
											</li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>
										Last Update
									</td>
									<td>
										<DateDisplay :timestamp="ticket.last_update" :ago="true"/>
									</td>
								</tr>
								<tr>
									<td>
										Created
									</td>
									<td>
										<DateDisplay :timestamp="ticket.created_at" :ago="true"/>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
						<div class="sidebar-section ticket-actions">
							<span class="page-title">Ticket Actions</span>

							<div class="btn-list">
								<button v-if="this.$auth.user.rank.admin" class="assign-btn" uk-toggle="target: #assign-ticket-modal" type="button">
									Re-assign Ticket
								</button>

								<button v-if="ticket.ticket_status !== 'CLOSED'" class="close-btn" uk-toggle="target: #close-ticket-modal" type="button">
									Close Ticket
								</button>
							</div>

							<div id="assign-ticket-modal" uk-modal>
								<div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
									<span class="page-title">Re-assign Ticket</span>

									<button class="uk-modal-close" type="button">
										<i class="fas fa-times"></i>
									</button>
								</div>
							</div>

							<div id="close-ticket-modal" uk-modal>
								<div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
									<span class="page-title">Close Ticket</span>

									<button class="uk-modal-close" type="button">
										<i class="fas fa-times"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="page-section uk-margin">
				<span class="page-title">Reply to ticket</span>

				<p v-if="isTicketClosed" class="uk-p uk-p-red">This ticket is closed, so you can't reply to it.</p>
				<p v-if="replyError != null" class="uk-p uk-p-red">{{ replyError }}</p>

				<form v-if="!isTicketClosed" class="reply-form">
					<!-- Details Field -->
					<div class="form-error" v-if="!$v.replyInput.minLength">Your reply must have at least {{ $v.replyInput.$params.minLength.min }} characters!</div>
					<div class="form-error" v-if="!$v.replyInput.maxLength">Your reply can't have more than {{ $v.replyInput.$params.maxLength.max }} characters!</div>

					<div class="uk-form-controls">
						<div class="uk-inline uk-width-1-1"
							 v-bind:class="{ 'error': !$v.replyInput.minLength || !$v.replyInput.maxLength }">
							<textarea v-model="replyInput" ref="details" class="uk-input" id="details" name="details" placeholder="Your reply..." :class="{ 'uk-form-danger': !$v.replyInput.minLength || !$v.replyInput.maxLength }"/>
						</div>
					</div>

					<button class="uk-button uk-btn-green" type="submit" @click.prevent.stop="submitReply()">Post Reply</button>
				</form>
			</div>
		</template>

		<div v-else class="page-section uk-flex uk-flex-center" style="padding: 100px 0;">
			<div uk-spinner></div>
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

	.rendered-post {
		width: 100%;
		padding: 10px;
		background: #fcfdff;
		border-radius: 3px;
		border: 1px solid #DFE7EB;
		box-sizing: border-box;
		font-size: 15px;
		line-height: 14px;
	}

	.ticket {
		position: relative;
		display: flex;
	}

	.ticket .ticket-body {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.ticket .ticket-details {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 34px;
		margin-bottom: 10px;
	}

	.ticket .ticket-details .ticket-title {
		width: auto;
		margin: 0;
		line-height: 15px;
	}

	.ticket .ticket-created-at {
		font-size: 13px;
		line-height: 14px;
	}

	.ticket .ticket-body .rendered-post {
		margin-bottom: 30px;
	}

	.ticket-feed {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.ticket-feed .feed-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
	}

	.ticket-feed .feed-item:last-child {
		padding-bottom: 0;
	}

	.ticket-feed .ticket-reply {
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		padding-bottom: 20px;
	}

	.ticket-feed .ticket-reply .reply-details {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.ticket-feed .ticket-reply .reply-created-at {
		font-size: 13px;
		line-height: 12px;
		margin-bottom: 6px;
	}

	.ticket-feed .feed-item:first-child.new-assignment {
		margin-top: 0;
	}

	.ticket-feed .new-assignment {
		position: relative;
		left: 22px;
		width: calc(100% - 46px);
		padding: 30px 0 30px 0;
		background: #FCFDFF;
		border: 1px solid #DFE7EB;
		margin: 30px 0;
	}

	.ticket-feed .new-assignment .text {
		font-family: 'Rajdhani', sans-serif;
		font-size: 16px;
		font-weight: bold;
		line-height: 14px;
		text-transform: uppercase;
	}

	.ticket-feed .new-assignment .time {
		font-size: 12px;
		line-height: 12px;
	}

	.ticket-feed .new-assignment .assigned {
		display: flex;
		list-style: none;
		margin: 10px 0 0 0;
		padding: 0;
	}

	.ticket-feed .new-assignment .assigned li {
		margin-right: 4px;
	}

	.ticket-feed .new-assignment .assigned li:last-child {
		margin-right: 0;
	}

	.ticket-updated .text {
		color: #81878b;
		font-size: 13px;
		text-transform: uppercase;
	}

	.ticket-sidebar > .sidebar-section {
		margin-bottom: 14px;
	}

	.ticket-sidebar > .sidebar-section:last-child {
		margin-bottom: 0;
	}

	.ticket-sidebar > .sidebar-section.ticket-actions > .btn-list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.ticket-sidebar > .sidebar-section.ticket-actions > .btn-list > button {
		font-size: 14px;
		font-weight: bold;
		text-transform: lowercase;
		line-height: 15px;
	}

	.ticket-sidebar tbody tr {
		border-bottom: 1px solid #DFE7EB;
	}

	.ticket-sidebar tbody tr:last-child {
		border-bottom: none;
	}

	.ticket-sidebar tbody tr td {
		padding: 6px 0;
		font-size: 14px;
		vertical-align: middle;
	}

	.ticket-sidebar table tbody tr td:nth-child(2) {
		text-align: right;
	}

	.ticket-sidebar .assigned ul {
		display: flex;
		justify-content: flex-end;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.ticket-sidebar .assigned ul li {
		margin-right: 4px;
	}

	.ticket-sidebar .assigned ul li:last-child {
		margin-right: 0;
	}

	.reply-form textarea {
		min-height: 150px;
	}

	.reply-form .uk-button {
		margin-top: 10px;
	}

	@media screen and (max-width: 640px) {
		.ticket-sidebar {
			margin-top: 20px;
		}
	}
</style>

<style>
	.ticket > .player-avatar-link > .player-avatar {
		margin-right: 10px;
	}

	.ticket-feed .ticket-reply > .player-avatar-link > .player-avatar {
		margin-right: 10px;
	}

	.ticket-sidebar .assigned ul li .player-avatar {
		width: 24px;
		height: 24px;
	}

	.ticket-feed .new-assignment .assigned li .player-avatar {
		width: 24px;
		height: 24px;
	}
</style>

<script>
    const {validationMixin, default: Vuelidate} = require('vuelidate');
    const {required, minLength, maxLength} = require('vuelidate/lib/validators');

    export default {
        middleware: 'authenticated',
        mixins: [validationMixin],
        validations: {
            replyInput: {
                required,
                minLength: minLength(10),
                maxLength: maxLength(8000)
            },
        },
        data() {
            return {
                ticket: null,
                replyInput: "",
                replyError: null,
				truncate: require('~/assets/script/text.js').truncate,
            }
        },
        async asyncData({$axios, route, error}) {
            const id = route.params.id;
            return await $axios.get('/staff/ticket/' + id).then(response => {
                if (response.status === 200) {
                    return {
                        ticket: response.data
                    }
                } else {
                    throw new Error('Request failed');
                }
            }).catch(err => {
                if (err.response) {
                    if (err.response.status === 404) {
                        error({statusCode: 404, message: 'Couldn\'t find that ticket'});
                    } else {
                        error({statusCode: err.response.statusCode, message: err.response.data || 'Server error'})
                    }
                }
            });
        },
		methods: {
            submitReply() {
                // reset the error field
                this.error = null;

                // process form for validation issues and cancel if the form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.error = "The form is invalid!";
                    return;
                }

                this.$axios.post('/staff/tickets/reply', {
                    'ticket_id': this.ticket.id,
                    'details': this.replyInput,
                }).then(response => {
                    if (response.status === 201) {
                        this.replyInput = "";
                        this.ticket['ticket_status'] = 'ANSWERED';

                        let feedEntity = response.data;
                        feedEntity['entity_type'] = 'REPLY';

                        this.ticket.feed.push(feedEntity);
                    }
                }).catch(error => {
                    this.error = error.response.data;
                });
            },
			closeTicket() {

			},
			reassignTicket() {

			}
		},
        computed: {
            isTicketClosed: function () {
                return this.ticket['ticket_status'] === 'CLOSED';
            },
            getReadableStatus: function () {
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
