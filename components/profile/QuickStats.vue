<template>
	<div class="uk-width-1-3@m">
		<div :class="'game-stats shiny-border ' + id">
			<span class="page-title">{{ title }}</span>

			<slot/>
		</div>
	</div>
</template>

<script>
    export default {
        props: {
			id: {
                type: String,
				required: true
			},
            title: {
                type: String,
				required: true
			},
		}
	}
</script>
