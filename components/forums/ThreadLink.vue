<template>
	<nuxt-link class="thread-link" :to="getRoute()"><slot>{{ truncate(thread.name, charLimit || 999) }}</slot></nuxt-link>
</template>

<style scoped>
	.thread-link {
		transition: color ease-in-out 0.15s;
	}

	.thread-link:hover {
		text-decoration: none;
	}
</style>

<script>
export default {
    data() {
        return {
            truncate: require('~/assets/script/text.js').truncate,
        }
    },
    props: {
        thread: {
            type: Object,
            required: true
        },
        charLimit: {
            type: Number,
            required: false
        },
        targetedReply: {
            type: Number,
            required: false
        }
    },
	methods: {
        getRoute() {
            let data = {
                name: 'forums-thread-slug',
				params: {
					thread: this.thread.id,
					slug: this.thread.slug || 'unknown'
                }
            };

            if (this.page) {
                data['query'] = {
                    'reply': this.targetedReply
                }
			}

            return data;
		}
	}
}
</script>
