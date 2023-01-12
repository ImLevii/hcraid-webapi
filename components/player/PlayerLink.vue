<template>
	<nuxt-link v-if="user && user.rank && color" class="player-link" :to="{ name: 'player-username', params: { username: user.username } }" v-bind:class="['rank-text-' + user.rank.id]" v-bind:style="{ color: '#' + user.rank.siteColor }">
		<slot>{{ user.username }}</slot>
	</nuxt-link>
	<nuxt-link v-else-if="user" class="player-link" :to="{ name: 'player-username', params: { username: user.username } }">
		<slot>{{ user.username }}</slot>
	</nuxt-link>
    <nuxt-link v-else class="player-link" :to="{ name: 'player-username', params: { username: username } }" v-bind:style="{ color: color }">
        <slot>{{ username }}</slot>
    </nuxt-link>
</template>

<style scoped>
	.player-link {
		transition: color ease-in-out 0.15s;
	}

	.player-link:hover {
		text-decoration: none;
	}
</style>

<script>
export default {
    props: {
        user: {
            type: Object,
			required: false,
		},
        username: {
            type: String,
            required: false,
        },
		color: {
            type: Boolean,
			required: false,
			default: true,
		}
    }
}
</script>
