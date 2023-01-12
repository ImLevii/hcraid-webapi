<template>
	<PlayerLink :user="this.$auth.user" class="user-render dropdown-btn">
		<PlayerAvatar :user="this.$auth.user" :size="24"/>

		<div class="username-wrapper">
			<span class="username">
				{{ this.$auth.user.username }}
			</span>
		</div>
	</PlayerLink>
</template>

<style>
	.user-render .player-avatar {
		width: 24px;
		height: 24px;
		border-radius: 3px;
		margin-right: 6px;
	}
</style>

<style scoped>
	.user-render > .username-wrapper > .username-label {
		color: #666;
		font-size: 9px;
		font-weight: bold;
	}

	.user-render .username-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		line-height: 11px;
	}

	.user-render > .username-wrapper:hover > .username {
		color: #0f6ecd;
		opacity: 1.0;
	}

	.user-render > .username-wrapper > .username {
		color: #222;
		font-size: 14px;
		font-weight: bold;
		transition: opacity 0.15s ease-in-out, color 0.15s ease-in-out;
		opacity: 0.85;
	}
</style>
