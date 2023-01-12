<template>
	<div id="notifications-menu" class="dropdown-menu" ref="notifications-menu">
		<a class="dropdown-btn menu-button">
			<i class="fas fa-bell"></i>
			<span v-if="getUnreadNotificationsCount > 0" class="uk-badge">{{ getUnreadNotificationsCount }}</span>
		</a>

		<div uk-dropdown="mode: click; pos: bottom-right" class="dropdown-pane" ref="notifications-menu-dropdown">
			<div class="dropdown-body">
				<div class="dropdown-header">
					<span class="page-title small">Notifications</span>
				</div>

				<template v-if="$store.getters['notifications/isLoaded']">
					<template v-if="$store.getters['notifications/hasNotifications']">
						<ul class="notifications-list">
							<li v-for="notification in $store.getters['notifications/getNotifications']" v-bind:class="{ 'unread': !notification.read }">
								<template v-if="notification.n_type === 'REPLY_TO_THREAD'">
									<PlayerAvatar :uuid="notification.n_meta.reply.created_by.uuid" :username="notification.n_meta.reply.created_by.username"/>

									<div class="details">
										<span>
											<PlayerLink :uuid="notification.n_meta.reply.created_by.uuid" :username="notification.n_meta.reply.created_by.username"/>
											replied to your thread
										</span>

										<ThreadLink :thread="notification.n_meta.thread" :charLimit="32" @click.native="closeMenu()"/>

										<DateDisplay :timestamp="notification.created_at" :ago="true" class="time"/>
									</div>
								</template>
								<template v-else-if="notification.n_type === 'REPLY_TO_POST'">
									<PlayerAvatar :uuid="notification.n_meta.reply.created_by.uuid" :username="notification.n_meta.reply.created_by.username"/>

									<div class="details">
										<span>
											<PlayerLink :uuid="notification.n_meta.reply.created_by.uuid" :username="notification.n_meta.reply.created_by.username"/>
											replied to your post in
										</span>

										<ThreadLink :thread="notification.n_meta.thread" :charLimit="32" @click.native="closeMenu()"/>

										<DateDisplay :timestamp="notification.created_at" :ago="true" class="time"/>
									</div>
								</template>
								<template v-else-if="notification.n_type === 'TICKET_ANSWERED'">
									<i class="fas fa-check-circle ticket-icon"></i>

									<div class="details">
										<span>
											Your ticket has been answered
										</span>

										<SupportTicketLink :ticket="notification.n_meta.ticket" :charLimit="48" @click.native="closeMenu()"/>

										<DateDisplay :timestamp="notification.created_at" :ago="true" class="time"/>
									</div>
								</template>
								<template v-else>

								</template>
							</li>
						</ul>
						<div class="notifications-options">
							<nuxt-link :to="{ name: 'user-notifications' }">View All</nuxt-link>
							<button @click="readAllNotifications()">mark all as read</button>
						</div>
					</template>
					<div v-else class="empty-notifications">
						<i class="fas fa-bells"></i>
						no notifications
					</div>
				</template>
				<template v-else>

				</template>
			</div>
		</div>
	</div>
</template>

<style>
	.notifications-list li .player-avatar {
		width: 20px;
		height: 20px;
		margin-right: 8px;
	}
</style>

<style scoped>
	.dropdown-body {
		min-width: 300px;
		max-width: 300px;
	}

	.menu-button {
		position: relative;
	}

	.menu-button .uk-badge {
		position: absolute;
		top: -8px;
		right: -11px;
		font-size: 12px;
		font-weight: bold;
		font-family: 'Rajdhani', sans-serif;
		width: 16px;
		min-width: 16px;
		height: 16px;
	}

	.empty-notifications {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px;
		box-sizing: border-box;
		text-transform: lowercase;
	}

	.notifications-list {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.notifications-list li {
		display: flex;
		padding: 10px;
		border-bottom: 1px solid #DFE7EB;
		color: #666;
		font-size: 13px;
		line-height: 12px;
	}

	.notifications-list li.unread {
		background: #f9fff9;
	}

	.notifications-list li > .details {
		display: flex;
		flex-direction: column;
	}

	.notifications-list li > .details > .time {
		margin-top: 2px;
		font-size: 11px;
	}

	.notifications-list li > .ticket-icon {
		color: #262626;
		font-size: 16px;
		opacity: 0.99;
		margin-right: 6px;
	}

	.notifications-options {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.notifications-options a,
	.notifications-options button {
		padding: 4px 8px;
		color: #666;
		font-size: 13px;
		font-weight: bold;
		text-transform: lowercase;
	}

	.notifications-options a:hover,
	.notifications-options button:hover {
		color: #1e87f0;
	}
</style>

<script>
    export default {
		methods: {
			closeMenu() {
			    if (this.$refs['notifications-menu-dropdown'] != null) {
                    window.UIkit.dropdown(this.$refs['notifications-menu-dropdown']).hide();
                }
			},
			readNotification(id) {
	        	this.$store.dispatch('notifications/readNotification', id);
			},
			readAllNotifications() {
			    let unreadIds = [];

		        let notifications = this.$store.getters['notifications/getNotifications'];
		        for (let key in Object.keys(notifications)) {
					let notification = notifications[key];
					if (!notification.read) {
						unreadIds.push(notification.id);
					}
				}

	        	this.$store.dispatch('notifications/readAllNotifications', unreadIds);
			},
		},
		computed: {
		    getUnreadNotificationsCount: function() {
		        let i = 0;
		        let notifications = this.$store.getters['notifications/getNotifications'];
		        for (let key in notifications) {
		            if (notifications[key]['read'] === false) {
		                i++;
					}
				}
		        return i;
			}
		},
		mounted() {
	        this.$store.dispatch('notifications/fetchNotifications');

			window.addEventListener('click', event => {
				if (this.$refs['notifications-menu'] !== undefined) {
					if (!this.$refs['notifications-menu'].contains(event.target)) {
						window.UIkit.dropdown(this.$refs['notifications-menu-dropdown']).hide();
					}
				}
			});
		}
	}
</script>
