<template>
	<nuxt-link v-if="staff" :to="{ name: 'staff-tickets-id', params: { id: ticket.id } }">
		<slot>{{ truncate(ticket.title, charLimit) }}</slot>
	</nuxt-link>
	<nuxt-link v-else :to="{ name: 'support-tickets-id', params: { id: ticket.id } }">
		<slot>{{ truncate(ticket.title, charLimit) }}</slot>
	</nuxt-link>
</template>

<script>
	export default {
	    data() {
	        return {
	            truncate: require('~/assets/script/text.js').truncate,
			}
		},
	    props: {
			ticket: {
			    type: Object,
				required: true
			},
			charLimit: {
			    type: Number,
				required: false,
				default: 32
			},
			staff: {
			    type: Boolean,
				required: false,
				default: false
			}
		}
	}
</script>
