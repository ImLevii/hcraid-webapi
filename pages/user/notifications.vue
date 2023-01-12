<template>
	<div class="uk-container uk-margin">
		<div class="page-section">
			<span class="page-title uk-block uk-width-100 uk-text-center">Your Notifications</span>

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
</template>

<style scoped>
	.uk-container {
		padding-bottom: 20px;
	}

	.page-section {
		padding: 20px;
	}
</style>

<script>
	export default {
	    middleware: 'authenticated'
	}
</script>
