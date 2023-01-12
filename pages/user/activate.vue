<template>

</template>

<script>
	export default {
	    middleware: 'guest',
	    head() {
	        return {
	            title: "Confirm Registration"
			}
		},
	    data() {
	        return {

			}
		},
	    async asyncData({$axios, route, error}) {
	        if (!route.query.hasOwnProperty("code")) {
                error({ statusCode: 404 });
			}

	        const code = route.query.code;

	        return await $axios
				.post('/register/complete?code=' + code)
				.then(response => {
				    
				}).catch(error => {
                    if (error.response) {
                        console.log(error.response);
                    }
                });
		}
    }
</script>
