<template>
	<nuxt-link v-if="user" :to="{ name: 'player-username', params: { username: user.username } }" class="player-avatar-link">
		<img class="player-avatar" :src="'https://visage.surgeplay.com/face/' + size + '/' + user.uuid" :alt="user.username"/>
	</nuxt-link>
	<nuxt-link v-else :to="{ name: 'player-username', params: { username: username } }" class="player-avatar-link">
		<img class="player-avatar" :src="'https://visage.surgeplay.com/face/' + size + '/' + uuid" :alt="username"/>
	</nuxt-link>
</template>

<style scoped>
	.player-avatar {
		border: 1px solid #2C2C2C;
		border-radius: 2px;
	}

	.player-avatar-link {
		flex-shrink: 0;
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
            uuid: {
                type: String,
				required: false,
            },
            size: {
                type: Number,
				required: false,
                default: 32
            }
        }
    }
</script>
