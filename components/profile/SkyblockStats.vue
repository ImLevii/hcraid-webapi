<template>
	<ul v-if="profile['stats']['skyblock']" class="stats-list">

	</ul>
	<div v-else class="never-played">
		<span>Never played</span>
		<i class="fas fa-question"></i>
	</div>
</template>

<script>
    export default {
        props: {
            profile: {
                type: Object,
				required: true
			}
		}
	}
</script>
