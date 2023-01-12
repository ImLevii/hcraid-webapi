<template>
	<div id="friends-menu" class="dropdown-menu" ref="friends-menu">
		<a class="dropdown-btn menu-button">
			<i class="fas fa-users"></i>
		</a>

		<div uk-dropdown="mode: click; pos: bottom-right" class="dropdown-pane" ref="friends-menu-dropdown">
			<div class="dropdown-body">
				<div class="dropdown-header">
					<span class="page-title small">Friends</span>
				</div>

				<template v-if="isFriendsLoaded">
					<ul class="friends-list">
						<li v-for="friend in getFriends">
							<PlayerAvatar :uuid="friend.uuid" :username="friend.username"/>

							<div class="details">
								<div class="name">
									<PlayerLink :username="friend.username"/>

									<template v-if="friend.presence !== undefined && friend.presence !== null">
										<div class="presence-dot" v-bind:class="{ online: isFriendOnline(friend), offline: !isFriendOnline(friend) }"></div>
										<span v-if="isFriendOnline(friend)" class="presence-status">Online</span>
										<span v-else class="presence-status">Offline</span>
									</template>
								</div>

								<span v-if="friend.presence === undefined || friend.presence === null" class="presence">
									<template v-if="friend.type === 'PENDING'">
										Friend request pending...
									</template>
									<template v-else>
										Hidden
									</template>
								</span>
								<span v-else-if="isFriendOnline(friend)" class="presence">Playing {{ friend.presence.server }}</span>
								<span v-else class="presence">Last seen playing {{ friend.presence.server }} <DateDisplay :timestamp="friend.presence.heartbeat" :ago="true"/></span>
							</div>
						</li>
					</ul>
					<div class="friends-options">
						<nuxt-link :to="{ name: 'user-friends' }">all friends</nuxt-link>
						<nuxt-link :to="{ name: 'user-friends-requests' }">friend requests</nuxt-link>
					</div>
				</template>
				<div v-else class="uk-flex uk-flex-center" style="padding: 30px 0;">
					<div uk-spinner></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.dropdown-body {
		min-width: 300px;
	}

	.friends-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.friends-list > li {
		display: flex;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid #DFE7EB;
	}

	.friends-list > li > .details {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.friends-list > li > .details > .name {
		display: flex;
		align-items: center;
	}

	.friends-list > li > .details > .name > * {
		margin-right: 6px;
	}

	.friends-list > li > .details .presence-status {
		font-size: 11px;
		text-transform: uppercase;
	}

	.friends-list > li > .details .presence-dot {
		background: rgba(61, 61, 61, 0.15);
		border-radius: 50%;
		padding: 3px;
		margin-right: 4px;
	}

	.friends-list > li > .details .presence-dot.online {
		background: #13cb19;
	}

	.friends-list > li > .details .presence-dot.offline {
		background: #cb0b07;
	}

	.friends-list > li > .details > .presence {
		font-size: 12px;
		line-height: 12px;
	}

	.friends-options {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.friends-options a,
	.friends-options button {
		padding: 4px 8px;
		color: #666;
		font-size: 13px;
		font-weight: bold;
		text-transform: lowercase;
	}

	.friends-options a:hover,
	.friends-options button:hover {
		color: #1e87f0;
	}
</style>

<style>
	.friends-list > li .player-link {
		font-size: 13px;
		font-weight: bold;
		line-height: 13px;
	}

	.friends-list > li .player-avatar {
		width: 24px;
		height: 24px;
		margin-right: 6px;
	}
</style>

<script>
    export default {
        props: {
	        friends: {
	            type: Array,
				required: true
			}
		},
		methods: {
			closeMenu() {
			    if (this.$refs['friends-menu-dropdown'] !== undefined) {
                    window.UIkit.dropdown(this.$refs['friends-menu-dropdown']).hide();
                }
			}
		},
		computed: {
	        isFriendsLoaded: function() {
	            return this.$store.getters['friendsList/isLoaded'];
			},
			isFriendOnline: function() {
	            return (friend) => this.$store.getters['friendsList/isFriendOnline'](friend);
			},
			getFriends: function() {
	            return this.$store.getters['friendsList/getFriends']().splice(0, 10);
			},
	        getOnlineFriends: function () {

            },
			getOnlineFriendsCount: function () {
	            let i = 0;
	            for (const [key, value] in Object.entries(this.friends)) {
	                if (value['online'] === true) {
	                    i++;
					}
				}
	            return i;
            }
		},
		mounted() {
	        this.$store.dispatch('friendsList/fetchFriends');

			window.addEventListener('click', event => {
			    if (this.$refs['friends-menu'] !== undefined) {
                    if (!this.$refs['friends-menu'].contains(event.target)) {
                        window.UIkit.dropdown(this.$refs['friends-menu-dropdown']).hide();
                    }
                }
			});
		}
	}
</script>
