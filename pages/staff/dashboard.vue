<template>
	<div class="uk-container uk-margin">
		<div class="page-section">
			<span class="page-title">Staff Dashboard</span>
			<nuxt-link :to="{ name: 'staff-tickets-all' }">All Tickets</nuxt-link>
			<nuxt-link :to="{ name: 'staff-tickets-assigned' }">Assigned Tickets</nuxt-link>
		</div>
	</div>
</template>

<style scoped>
	.page-section {
		padding: 20px;
	}
</style>

<script>
	export default {
	    middleware: 'staff',
		data() {
	        return {

			}
		},
	    // async asyncData({$axios}) {
	    //     return await $axios.get('').then(response => {
	    //         let data = {};
	    //
	    //
		//
	    //         return data;
		// 	}).catch(error => {
		//
		// 	});
		// },
		computed: {

		}
	}
</script>
