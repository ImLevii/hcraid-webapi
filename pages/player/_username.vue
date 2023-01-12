<template>
	<div class="uk-container uk-container-center profile uk-margin">
		<div class="uk-grid uk-grid-small">
			<div class="uk-width-1-4@s">
				<div class="profile-section">
					<div class="profile-card">
						<PlayerLink class="identity" :user="profile" :color="profile.rank.admin && profile.rank.admin">
							<img v-if="profile.rank.admin" src="~assets/images/admin-crown.png" class="staff-icon" alt="Admin">
							<img v-else-if="profile.rank.admin" src="~assets/images/admin-crown.png" class="staff-icon" alt="Moderator">
							{{ profile.username }}
						</PlayerLink>

						<span class="rank" v-if="!profile.rank.admin && !profile.rank.admin" v-bind:style="{ color: '#' + profile.rank.siteColor }">
							{{ profile.rank.displayName }}
						</span>

						<!-- :uk-tooltip="'title: Last seen ' + timeUtil.getTimeago(this.user.availability.last_seen, this.$timeago)" -->
						<div class="render" ref="render">
							<img :src="'https://visage.surgeplay.com/full/' + profile.uuid" :alt="profile.username">
						</div>

<!--						<div :class="'rank rank-' + profile.rank.id" v-bind:style="{ backgroundColor: '#' + profile.rank.siteColor + ' !important' }">-->
<!--							<span class="name">-->
<!--								<i v-if="profile.rank.staff" class="staff-icon fas fa-crown" v-bind:class="{ 'admin': profile.rank.admin }"></i>-->
<!--								{{ profile.rank.displayName }}-->
<!--							</span>-->
<!--						</div>-->

						<div v-if="hasPresence" class="profile-presence" v-bind:class="{ online: isPlayerOnline, offline: !isPlayerOnline }">
							<span class="presence-state">
								<template v-if="isPlayerOnline">
									Online
								</template>
								<template v-else>
									Offline
								</template>
							</span>

							<p v-if="isPlayerOnline" class="presence-rich">
								Playing {{ profile.presence.server }}
							</p>
							<p v-else class="presence-rich">
								Last seen on {{ profile.presence.server }}
							</p>

							<DateDisplay v-if="!isPlayerOnline" :timestamp="profile.presence.heartbeat" :ago="true" class="presence-heartbeat"/>
						</div>

						<div v-if="isProfileOwner" class="profile-options">
							<nuxt-link :to="{ name: 'user-settings' }" class="uk-button uk-btn-blue">
								<i class="fas fa-user-edit"></i>
								Edit Profile
							</nuxt-link>
						</div>

						<div v-if="this.$store.getters['friendsList/isLoaded'] && this.$auth.loggedIn && !isProfileOwner" class="friend-options">
							<button v-if="isBlocked" class="uk-button uk-btn-red">
								<i class="fas fa-angry"></i>
								Unblock
							</button>
							<template v-else-if="hasRelationship">
								<button v-if="isFriend" @click="removeFriend" class="uk-button uk-btn-green">
									<i class="fas fa-smile"></i>
									Friends
								</button>
								<template v-else-if="isIncomingFriend">
									<button @click="addFriend" class="uk-button uk-btn-grey">Accept</button>
									<button @click="removeFriend" class="uk-button uk-btn-grey">Reject</button>
								</template>
								<template v-else-if="isOutgoingFriend">
									<button @click="removeFriend" class="uk-button uk-btn-purple">
										<i class="fas fa-user-plus"></i>
										Pending
									</button>
								</template>
							</template>
							<template v-else>
								<button @click="addFriend" class="uk-button uk-btn-blue">
									<i class="fas fa-user-plus"></i>
									Add Friend
								</button>
							</template>
						</div>

						<div class="details">
							<div class="simple-container simple-table general">
								<span>General Info</span>
								<table class="table">
									<tbody>
									<tr>
										<td>First Seen</td>
										<td><DateDisplay :timestamp="profile.firstSeen"/></td>
									</tr>
									</tbody>
								</table>
							</div>

							<div class="simple-container simple-table stats">
								<span>Forums Info</span>
								<table class="table">
									<tbody>
									<tr>
										<td>Posts</td>
										<td>{{ getForumsPosts }}</td>
									</tr>
									<tr>
										<td>Upvotes</td>
										<td>{{ getForumsLikes }}</td>
									</tr>
									</tbody>
								</table>
							</div>

							<div class="simple-container simple-table stats">
								<span>Friends</span>

								<ul class="friends-table">
									<li v-for="friend in getFriendsList">
										<PlayerAvatar :uuid="friend['uuid']" :username="friend['username']"/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="uk-width-3-4@s">
				<div class="profile-section">
					<div class="profile-tab">
						<div class="statistics">
							<div class="uk-grid uk-grid-small uk-grid-match uk-flex uk-flex-center">
								<QuickStats :id="'prison'" :title="'Prison'">
									<PrisonStats :profile="profile"/>
								</QuickStats>

								<QuickStats :id="'skyblock'" :title="'Skyblock'">
									<SkyblockStats :profile="profile"/>
								</QuickStats>

								<QuickStats :id="'battlegrounds'" :title="'Battlegrounds'">
									<BattlegroundsStats :profile="profile"/>
								</QuickStats>
							</div>
							<div class="uk-grid uk-grid-small uk-grid-match uk-flex uk-flex-center">
								<QuickStats :id="'skywars'" :title="'Skywars'">
									<SkywarsStats :profile="profile"/>
								</QuickStats>

								<QuickStats :id="'bedwars'" :title="'Bedwars'">
									<BedwarsStats :profile="profile"/>
								</QuickStats>

								<QuickStats :id="'default'" :title="'???'">
									<div class="never-played">
										<span>Never played</span>
										<i class="fas fa-question"></i>
									</div>
								</QuickStats>
							</div>
						</div>
<!--						<div class="uk-grid uk-grid-small">-->
<!--							<div class="uk-width-1-2@m">-->
<!--								<span class="page-title">Statistics</span>-->
<!--								<div class="uk-grid uk-grid-small uk-grid-match">-->
<!--									<div class="uk-width-1-2 uk-flex-wrap">-->
<!--										<div class="box-stat">-->
<!--											<span class="stat-name green">Money Balance</span>-->
<!--											<span class="stat-value green">${{ render.abbreviateNumber(profile.statistics.prison.moneyBalance) }}</span>-->
<!--										</div>-->
<!--										<div class="box-stat">-->
<!--											<span class="stat-name yellow">Token Balance</span>-->
<!--											<span class="stat-value yellow">{{ render.abbreviateNumber(profile.statistics.prison.tokenBalance) }}</span>-->
<!--										</div>-->
<!--									</div>-->
<!--									<div class="uk-width-1-2">-->
<!--										<div class="box-stat">-->
<!--											<span class="stat-name red">Blocks Mined</span>-->
<!--											<span class="stat-value red">{{ render.abbreviateNumber(profile.statistics.prison.stats.blocksMined) }}</span>-->
<!--										</div>-->
<!--										<div class="box-stat">-->
<!--											<span class="stat-name aqua">Trades Completed</span>-->
<!--											<span class="stat-value aqua">{{ profile.statistics.prison.stats.tradesCompleted }}</span>-->
<!--										</div>-->
<!--									</div>-->
<!--								</div>-->
<!--							</div>-->
<!--							<div class="uk-width-1-2@m">-->
<!--								<span class="page-title">BattlePass</span>-->
<!--								<div class="battle-pass">-->
<!--									<CircleProgress-->
<!--											:progress="50"-->
<!--											:size="100"-->
<!--											:reverse="false" line-cap="round"-->
<!--											:fill="fill"-->
<!--											empty-fill="rgba(0, 0, 0, .1)"-->
<!--											:animation-start-value="0.0"-->
<!--											:start-angle="0"-->
<!--											insert-mode="append"-->
<!--											:thickness="5"-->
<!--											:show-percent="true"-->
<!--											class="tier-circle"/>-->
<!--								</div>-->
<!--							</div>-->
<!--						</div>-->
<!--						<div class="uk-grid uk-grid-small uk-grid-match">-->
<!--							<div class="uk-width-1-4@m">-->
<!--								<div class="box-icon-stat green" :uk-tooltip="'title: Money Balance'">-->
<!--									<span class="stat-icon"><i class="fas fa-dollar-sign"></i></span>-->
<!--									<span class="stat-value">${{ render.abbreviateNumber(profile.statistics.prison.moneyBalance) }}</span>-->
<!--								</div>-->
<!--								<div class="box-icon-stat yellow" :uk-tooltip="'title: Token Balance'">-->
<!--									<span class="stat-icon"><i class="fas fa-coins"></i></span>-->
<!--									<span class="stat-value">{{ render.abbreviateNumber(profile.statistics.prison.tokenBalance) }}</span>-->
<!--								</div>-->
<!--								<div class="box-icon-stat red" :uk-tooltip="'title: Blocks Mined'">-->
<!--									<span class="stat-icon"><i class="fas fa-cubes"></i></span>-->
<!--									<span class="stat-value">{{ render.abbreviateNumber(getBlocksMined) }}</span>-->
<!--								</div>-->
<!--								<div class="box-icon-stat aqua" :uk-tooltip="'title: Trades Completed'">-->
<!--									<span class="stat-icon"><i class="fas fa-exchange-alt"></i></span>-->
<!--									<span class="stat-value">{{ getTradesCompleted }}</span>-->
<!--								</div>-->
<!--								<div class="box-icon-stat" :uk-tooltip="'title: CoinFlip Wins/Losses'">-->
<!--									<span class="stat-icon"><i class="fas fa-dice-six"></i></span>-->
<!--									<span class="stat-value">{{ getCoinFlipWins }} / {{ getCoinFlipLosses }}</span>-->
<!--								</div>-->
<!--								<div class="box-icon-stat" :uk-tooltip="'title: CoinFlip Net Profit'">-->
<!--									<span class="stat-icon"><i class="fas fa-chart-line"></i></span>-->
<!--									<span class="stat-value">${{ getCoinFlipProfitMoney }} / {{ getCoinFlipProfitTokens }}</span>-->
<!--								</div>-->
<!--							</div>-->
<!--							<div class="uk-width-1-4@m">-->
<!--							</div>-->
<!--							<div class="uk-width-1-4@m">-->
<!--							</div>-->
<!--							<div class="uk-width-1-4@m">-->
<!--							</div>-->
<!--						</div>-->
<!--						<div class="uk-grid uk-grid-small uk-grid-match">-->
<!--							<div class="uk-width-1-4@m">-->
<!--							</div>-->
<!--							<div class="uk-width-1-4@m">-->
<!--							</div>-->
<!--						</div>-->
					</div>
				</div>
				<div class="profile-section">
					<div class="forum-activity">
						<span class="page-title small no-transform">Forums Activity</span>
						<PlayerForumsActivity :user="profile" :activity="getForumsActivity" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.profile .profile-card .friends-table li .player-avatar {
		width: 29px !important;
		height: 29px !important;
	}
</style>

<style scoped>
	.uk-container {
		padding-bottom: 20px;
	}

	.profile .profile-section {
		margin-bottom: 15px;
		background: #fff;
		border: 1px solid #DFE7EB;
		border-radius: 3px;
	}

	.profile .profile-section:last-child {
		margin-bottom: 0;
	}

	.profile .profile-section > div {
		padding: 20px;
		box-sizing: border-box;
	}

	.profile .profile-card {
		width: 100%;
	}

	.profile .profile-card > .identity {
		display: block;
		color: #333;
		font-family: 'Rajdhani', sans-serif;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		line-height: 18px;
		transition: color ease-in-out 0.15s;
	}

	.profile .profile-card > .identity:hover {
		color: #0f6ecd;
		text-decoration: none;
	}

	.profile .profile-card > .rank {
		display: block;
		margin-top: 3px;
    	color: #333;
		font-family: "Rajdhani",sans-serif;
		font-size: 17px;
		font-weight: bold;
		text-align: center;
		text-transform: uppercase;
		line-height: 14px;
		transition: color .15s ease-in-out;
	}

	.profile .profile-card > .render {
		z-index: 990;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 10px 0;
		margin: 10px 0;
		border: 1px solid #E5E6EA;
		background: #fff url('~assets/images/player-render-background2.png');
		box-sizing: border-box;
	}

	.profile .profile-card > .render::after {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: calc(100% - 4px);
		height: calc(100% - 4px);
		content: "";
		/* border: 2px solid rgba(255, 255, 255, 0.16); */
	}

	.profile .profile-card > .render > img {
		position: relative;
		display: block;
		margin: 0 auto;
	}

	.profile .profile-card > .profile-options {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10px 0;
	}

	.profile .profile-card > .profile-options > a {
		flex-grow: 1;
	}

	.profile .profile-card > .profile-presence {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px;
		border-radius: 3px;
		border: 1px solid rgba(5, 5, 5, 0.19);
		margin-bottom: 10px;
		color: #fff;
		font-family: 'Rajdhani', sans-serif;
		text-transform: uppercase;
		text-shadow: 0 1px 1px rgba(5, 5, 5, 0.3);
	}

	/* Applies a shiny border effect */
	.profile .profile-card > .profile-presence::after {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: calc(100% - 4px);
		height: calc(100% - 4px);
		content: "";
		border: 2px solid rgba(155, 155, 155, 0.1);
	}

	.profile .profile-card > .profile-banned {
		background: linear-gradient(to bottom, #d31e20 0%, #ad1d1f 100%);
	}

	.profile .profile-card > .profile-presence.online {
		background: linear-gradient(to bottom, #64cb43 0%, #55ad39 100%);
	}

	.profile .profile-card > .profile-presence.offline {
		background: linear-gradient(to bottom, #d34a41 0%, #ad3437 100%);
	}

	.profile .profile-card > .profile-presence > * {
		opacity: 0.99;
	}

	.profile .profile-card > .profile-presence > .presence-state {
		font-size: 19px;
		font-weight: bold;
		line-height: 17px;
		text-shadow: 0 1px 1px rgba(5, 5, 5, 0.4);
	}

	.profile .profile-card > .profile-presence > .presence-rich {
		font-size: 15px;
		line-height: 15px;
		text-align: center;
	}

	.profile .profile-card > .profile-presence > .presence-heartbeat {
		font-size: 12px;
		line-height: 11px;
		letter-spacing: 1px;
	}

	.profile .profile-card > .friend-options {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10px 0;
	}

	.profile .profile-card > .friend-options > button {
		padding: 10px 14px;
		flex-grow: 1;
	}

	/*.profile .profile-card > .rank {*/
	/*	padding: 8px 16px;*/
	/*	margin-bottom: 10px;*/
	/*	border: 1px solid rgba(5, 5, 5, 0.19) !important;*/
	/*	border-radius: 3px;*/
	/*	box-shadow: 0 0 1px 1px rgba(255, 255, 255, .3) inset;*/
	/*}*/

	/*.profile .profile-card > .rank > .name {*/
	/*	display: block;*/
	/*	color: #FFF;*/
	/*	line-height: 15px;*/
	/*	font-size: 15px;*/
	/*	font-weight: bold;*/
	/*	font-family: 'Rajdhani', sans-serif;*/
	/*	text-align: center;*/
	/*	text-transform: uppercase;*/
	/*	text-shadow: 1px 1px 1px #010101;*/
	/*	opacity: 0.99;*/
	/*}*/

	.profile .profile-card .staff-icon {
		position: relative;
		top: -3px;
		width: 20px;
		height: 20px;
	}

	.profile .profile-card .friends-table {
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.profile .profile-card .friends-table li {
		padding: 2px;
	}

	.profile .profile-tab {

	}

	.profile .profile-tab .box-icon-stat {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-bottom: 4px;
		line-height: 20px;
		font-size: 20px;
		font-weight: 700;
	}

	.profile .profile-tab .box-icon-stat:last-child {
		margin-bottom: 0;
	}

	.profile .profile-tab .box-icon-stat > span {
		background: #333;
		border: 1px solid #222;
		box-shadow: 0 0 1px 1px rgba(255, 255, 255, .3) inset;
	}

	.profile .profile-tab .box-icon-stat > .stat-icon {
		padding: 6px 10px;
		margin-bottom: 2px;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
		color: #fff;
	}

	.profile .profile-tab .box-icon-stat > .stat-icon .fas {
		width: 20px;
		height: 20px;
		text-align: center;
	}

	.profile .profile-tab .box-icon-stat > .stat-value {
		flex-grow: 1;
		padding: 6px 10px;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
		color: #fff;
		text-transform: uppercase;
	}

	.profile .profile-tab .box-icon-stat.green > span { background: #00D54B; border-color: #00D54B; }
	.profile .profile-tab .box-icon-stat.yellow > span { background: #ffc500; border-color: #ffc500; }
	.profile .profile-tab .box-icon-stat.red > span { background: #e72123; border-color: #e72123; }
	.profile .profile-tab .box-icon-stat.aqua > span { background: #00C1DF; border-color: #00C1DF; }

	.profile .profile-tab .box-stat {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		padding: 10px 20px;
		margin-bottom: 10px;
		background: #FAFAFA url('~assets/images/stat-bg-1.png') no-repeat;
		background-position: 50% 55%;
		background-size: 200%;
		border: 1px solid #868686;
		border-radius: 3px;
		box-shadow: 0 0 1px 1px rgba(255, 255, 255, .3) inset;
	}

	.profile .profile-tab .box-stat:last-child {
		margin-bottom: 0;
	}

	.profile .profile-tab .box-stat > span {
		display: block;
		width: 100%;
		font-family: 'Rajdhani', sans-serif;
		text-align: left;
		text-transform: uppercase;
	}

	.profile .profile-tab .box-stat > .stat-name {
		margin-bottom: 2px;
		color: #FFF;
		line-height: 11px;
		font-size: 11px;
		font-weight: 700;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
	}

	.profile .profile-tab .box-stat > .stat-value {
		line-height: 20px;
		font-size: 24px;
		font-weight: 700;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
		color: #fff;
	}

	.profile .profile-tab .battle-pass {
		width: 100%;
		padding: 10px 20px;
		background: #222 url('~assets/images/flame-bg.png') center no-repeat;
		border: 1px solid #333;
		border-radius: 2px;
		box-shadow: 0 0 1px 1px rgba(255, 255, 255, .3) inset;
		box-sizing: border-box;
	}

	.profile .profile-tab .battle-pass .tier-circle {
		color: #fff;
		font-weight: bold;
	}

	/*.profile .profile-tab .box-stat > .stat-name.yellow { color: #FFC816; }*/
	/*.profile .profile-tab .box-stat > .stat-name.green { color: #37be1b; }*/
	/*.profile .profile-tab .box-stat > .stat-name.red { color: #c40b0b; }*/
	/*.profile .profile-tab .box-stat > .stat-name.aqua { color: #12c7e2; }*/

	.profile .profile-tab .box-stat > .stat-value.yellow { color: #ffc500; }
	.profile .profile-tab .box-stat > .stat-value.green { color: #00D54B; }
	.profile .profile-tab .box-stat > .stat-value.red { color: #e72123; }
	.profile .profile-tab .box-stat > .stat-value.aqua { color: #00C1DF; }

	@media screen and (max-width: 959px) {
		.profile .uk-grid > div {
			margin-bottom: 20px;
		}

		.profile .uk-grid > div:last-child {
			margin-bottom: 0;
		}
	}
</style>

<style>
	.profile .profile-tab > .statistics {
		font-family: 'Rajdhani', sans-serif;
	}

	.profile .profile-tab > .statistics .game-stats {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		min-height: 220px;
		padding: 20px 26px;
		background: no-repeat center;
		background-size: cover;
		border: 1px solid rgba(5, 5, 5, 0.19);
		border-radius: 3px;
		box-sizing: border-box;
	}

	.profile .profile-tab > .statistics .game-stats.default {
		background-image: url('~assets/images/games/caves-blurred.png');
	}

	.profile .profile-tab > .statistics .game-stats.battlegrounds {
		background-image: url('~assets/images/games/battlegrounds-blurred.png');
	}

	.profile .profile-tab > .statistics .game-stats.prison {
		background-image: url('~assets/images/games/prison-avatar-blurred.png');
	}

	.profile .profile-tab > .statistics .game-stats.skyblock {
		background-image: url('~assets/images/games/islands-blurred.png');
	}

	.profile .profile-tab > .statistics .game-stats.skywars {
		background-image: url('~assets/images/games/caves-blurred.png');
	}

	.profile .profile-tab > .statistics .game-stats.bedwars {
		background-image: url('~assets/images/games/caves-blurred.png');
	}

	.profile .profile-tab > .statistics .game-stats > .page-title {
		width: auto;
		color: #fff;
		opacity: 0.99;
		text-shadow: 0 1px 1px rgba(5, 5, 5, 0.3);
	}

	.profile .profile-tab > .statistics .game-stats .never-played {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		text-shadow: 0 1px 1px rgba(5, 5, 5, 0.19);
	}

	.profile .profile-tab > .statistics .game-stats .never-played > i {
		padding: 34px 0;
		font-size: 30px;
		color: #fff;
		opacity: 0.99;
	}

	.profile .profile-tab > .statistics .game-stats .never-played > span {
		color: #fff;
		font-size: 18px;
		text-transform: uppercase;
		line-height: 16px;
		opacity: 0.99;
	}

	.profile .profile-tab > .statistics .game-stats .stats-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin: 12px 0 0 0;
		list-style: none;
		padding: 0;
	}

	.profile .profile-tab > .statistics .game-stats .stats-list li {
		width: 100%;
		padding: 4px 8px;
		margin-bottom: 6px;
		background: rgba(0, 0, 0, 0.6);
		border: 1px solid rgba(55, 55, 55, 0.7);
		border-radius: 3px;
		box-sizing: border-box;
		color: #fff;
		text-align: center;
	}

	.profile .profile-tab > .statistics .game-stats .stats-list li:last-child {
		margin-bottom: 0;
	}

	.profile .profile-tab > .statistics .game-stats .stats-list li > span {
		opacity: 0.99;
	}
</style>

<script>
    export default {
        async asyncData({$axios, route, error}) {
            const username = route.params.username;

            return await $axios
                .get('/users/' + username + '/')
                .then(result => {
                    let profile = result.data;

                    if ('forums' in profile) {
                        let recentActivity = profile['activity'];

                        // strip preview content of markdown
                        for (let i in recentActivity) {
                            recentActivity[i]['preview'] = removeMd(recentActivity[i]['preview']);
                        }
                    }

                    return {
                        profile: profile
                    };
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 404) {
                            error({ statusCode: 404, message: 'Couldn\'t find that player' });
                        } else {
                            error({ statusCode: err.response.statusCode, message: err.response.data || 'Server error' })
						}
					}
                });
        },
        data() {
            return {
                loaded: false,
                profile: null,
				render: require('~/util/render'),
            }
        },
        head() {
            return {
                title: this.profile.username + '\'s Profile'
            }
        },
		methods: {
            addFriend() {
                this.$store.dispatch('friendsList/createFriendship', this.profile.uuid)
			},
			removeFriend() {
                this.$store.dispatch('friendsList/destroyFriendship', this.profile.uuid)
			}
		},
		computed: {
            isProfileOwner: function() {
                return this.$auth.loggedIn && this.$auth.user.uuid === this.profile.uuid;
			},
			hasPresence: function() {
                return this.profile.hasOwnProperty('presence') && this.profile['presence'] != null;
			},
			isPlayerOnline: function() {
                return this.profile.presence.state === 'ONLINE' && (new Date().getTime() - this.profile.presence.heartbeat) <= 30_000;
			},
            getForumsPosts: function() {
                if ('forums' in this.profile) {
                    return this.profile.forums.statistics_posts
                } else {
                    return 0
				}
			},
            getForumsLikes: function() {
                if ('forums' in this.profile) {
                    return this.profile.forums.statistics_likes
                } else {
                    return 0
				}
			},
			getForumsActivity: function() {
                if (this.profile.hasOwnProperty('forums')) {
                    return this.profile['forums']['activity'];
				} else {
                    return [];
                }
			},
			getFriendsList: function() {
                if (this.profile.hasOwnProperty('friends')) {
                    return this.profile['friends'];
				} else {
                    return [];
				}
			},
			hasRelationship: function() {
				return this.$store.getters['friendsList/hasRelationship'](this.profile.uuid)
			},
			isFriend: function() {
				return this.$store.getters['friendsList/getFriendType'](this.profile.uuid) === 'FRIENDS'
			},
			isIncomingFriend: function() {
				return this.$store.getters['friendsList/getFriendType'](this.profile.uuid) === 'INCOMING'
			},
			isOutgoingFriend: function() {
				return this.$store.getters['friendsList/getFriendType'](this.profile.uuid) === 'OUTGOING'
			},
			isBlocked: function() {
				return this.$store.getters['friendsList/isBlocked'](this.profile.uuid)
			},
			isBlockedBy: function() {

			},
			getFriendType: function() {
				return this.$store.getters['friendsList/getFriendType'](this.profile.uuid)
			}
		},
    }
</script>
