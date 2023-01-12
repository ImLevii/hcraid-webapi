<template>
	<div class="player-card">
		<div class="mast-pane no-style">
			<PlayerLink class="username" :user="player" :color="player.rank.admin && player.rank">
				<img v-if="player.rank.admin" src="~assets/images/admin-crown.png" class="staff-icon" alt="Admin">
				<img v-else-if="player.rank.admin" src="~assets/images/admin-crown.png" class="staff-icon" alt="Moderator">
				{{ player.username }}
			</PlayerLink>

			<span class="rank" v-if="!player.rank.admin && !player.rank.admin" v-bind:style="{ color: '#' + player.rank.siteColor }">
				{{ player.rank.displayName }}
			</span>

			<!-- Avatar Section -->
			<div class="avatar">

				<!-- 3D Render -->
				<img :src="'https://visage.surgeplay.com/bust/' + player.uuid"/>

				<!-- Injected Avatar Components -->
				<slot name="avatar"/>

			</div>

		</div>

		<div class="simple-container simple-table general">
			<span>General Info</span>
			<table class="table">
				<tbody>
				<tr>
					<td>First Seen</td>
					<td><DateDisplay :timestamp="player.firstSeen"/></td>
				</tr>
				</tbody>
			</table>
		</div>

		<div class="simple-container simple-table">
			<span>Forums Info</span>
			<table class="table">
				<tbody>
				<tr>
					<td>Posts</td>
					<td>{{ player.statistics_posts }}</td>
				</tr>
				<tr>
					<td>Upvotes</td>
					<td>{{ player.statistics_likes }}</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style>
	.player-card > .mast-pane {
		position: relative;
		margin-top: 20px;
		padding: 14px;
		border: 1px solid #DFE7EB;
		border-radius: 2px;
	}

	.player-card > .mast-pane:first-child {
		margin-top: 0;
	}

	.player-card > .mast-pane.no-style {
		border: none;
		padding: 0;
	}

	.player-card > .mast-pane > .empty-table {
		color: #65666d;
		font-size: 12px;
	}

	.player-card > .mast-pane span {
		display: block;
	}

	.player-card > .mast-pane > .table-header {
		/* color: #47484f; */
		position: absolute;
		top: -8px;
		display: block;
		padding: 0 10px;
		background: #fff;
		color: #333333;
		font-size: 13px;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		line-height: 13px;
	}

	.player-card > .mast-pane > .table {
		width: 100%;
		background: none;
		border: none;
		border-collapse: collapse;
		font-size: 13px;
	}

	.player-card > .mast-pane > .table tbody tr td {
		font-size: 12px;
		line-height: 12px;
	}

	.player-card > .mast-pane > .table tbody tr td:nth-child(1) {
		text-align: left;
	}

	.player-card > .mast-pane > .table tbody tr td:nth-child(2) {
		text-align: right;
	}

	.player-card > .mast-pane > .table tbody tr td:nth-child(3) {
		width: 13px;
	}

	.player-card > .mast-pane > .table .uk-icon {
		width: 13px;
		height: 13px;
	}

	.player-card .avatar {
		z-index: 990;
		position: relative;
		display: block;
		width: calc(100% - 2px);
		padding-bottom: 20px;
		margin: 10px 0;
		border: 1px solid #E5E6EA;
		border-radius: 3px;
		background: #fff url('~assets/images/player-render-background2.png');
		box-sizing: border-box;
	}

	.player-card .avatar::after {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: calc(100% - 4px);
		height: calc(100% - 4px);
		content: "";
		/* border: 2px solid rgba(255, 255, 255, 0.16); */
	}

	.player-card .avatar > img {
		position: relative;
		top: 20px;
		display: block;
		width: 150px;
		height: 150px;
		margin: 0 auto;
	}

	.player-card > .mast-pane > .username {
		display: block;
		color: #333;
		font-family: 'Rajdhani', sans-serif;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		line-height: 18px;
		transition: color ease-in-out 0.15s;
	}

	.player-card > .mast-pane > .username:hover {
		color: #0f6ecd;
		text-decoration: none;
	}

	.player-card > .mast-pane > .rank {
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

	.player-card .staff-icon {
		position: relative;
		top: -3px;
		width: 20px;
		height: 20px;
	}
</style>

<script>
    export default {
        data() {
            return {
                time: require("~/assets/script/time.js")
            }
        },
        props: {
            player: {
                type: Object,
                required: true
            }
        },
        computed: {
            isOnline() {
                return false
                // return new Date().getTime() - this.user.presence.last_seen < 300000
            }
        }
    }
</script>
