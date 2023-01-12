<template>
	<ul v-if="profile['stats']['prison']" class="stats-list">
		<li>
			<span>rank <strong>{{ render.abbreviateNumber(profile['stats']['prison']['rank']) }}</strong></span>
		</li>
		<li>
			<span>
				<strong>{{ render.abbreviateNumber(profile['stats']['prison']['tokenBalance']) }}</strong>
				<i class="fas fa-coin" style="font-size: 13px;"></i>
			</span>
		</li>
		<li>
			<span><strong>{{ render.abbreviateNumber(profile['stats']['prison']['blocksMined']) }}</strong> blocks mined</span>
		</li>
		<li>
			<span><strong>{{ render.abbreviateNumber(profile['stats']['prison']['skillPoints']) }}</strong> skill points</span>
		</li>
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
		},
		data() {
            return {
				render: require('~/util/render'),
			}
		}
	}
</script>
