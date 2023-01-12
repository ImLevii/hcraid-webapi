<template>
	<ul class="recent-activity">
		<li v-if="this.activity.length < 1" class="activity">{{ user.username }} doesn't have any recent activity.</li>

		<li v-for="activity in this.activity" class="activity">
			<div class="activity-desc">
				<PlayerLink :user="user"/>
				{{ activity.text }}

				<template v-if="activity.action === 'CREATED_THREAD'">
					<ThreadLink :thread="activity.meta.thread"/>
				</template>

				<template v-else-if="activity.action === 'CREATED_THREAD_REPLY'">
					<ThreadLink :thread="activity.meta.thread" :targetedReply="activity.meta.reply.id" />
				</template>

				<template v-else-if="activity.action === 'LIKED_THREAD'">
					<ThreadLink :thread="activity.meta.thread"/>
				</template>

				<template v-else-if="activity.action === 'LIKED_REPLY'">
					<ThreadLink :thread="activity.meta.thread" :targetedReply="activity.meta.reply.id" />
				</template>

				<span v-else>
					{{ activity }}
				</span>
			</div>

			<div class="rendered-post" v-html="$md.render(activity['preview'])"></div>
			<span class="activity-date"><DateDisplay :timestamp="activity.created_at" class="activityDate"/></span>
		</li>
	</ul>
</template>

<style scoped>
	.recent-activity {
		width: 100%;
		border: 1px solid #EFEFEF;
		border-radius: 2px;
		padding: 0;
		margin: 0;
		color: #666;
	}

	.recent-activity li {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 14px;
		border-bottom: 1px solid #EFEFEF;
		box-sizing: border-box;
	}

	.recent-activity li:last-child {
		border-bottom: none;
	}

	.recent-activity li > * {
		margin-bottom: 6px;
	}

	.recent-activity li > *:last-child {
		margin-bottom: 0;
	}

	.recent-activity li > .activity-desc {
		width: 100%;
		line-height: 14px;
		font-size: 13px;
	}

	.recent-activity li > .rendered-post {
		width: 100%;
		max-height: 100px;
		overflow: hidden;
		padding: 10px;
		background: rgba(250, 250, 250, 0.1);
		border: 1px solid rgba(200, 200, 200, 0.15);
		border-radius: 2px;
		box-sizing: border-box;
		font-size: 13px;
		font-style: italic;
		word-wrap: break-word;
	}

	.recent-activity li > .activity-date {
		color: #768E97;
		font-size: 12px;
		line-height: 12px;
	}
</style>

<script>
    const remark = require('remark');
    const strip = require('strip-markdown');

	export default {
		async beforeMount() {
		    this.activity.forEach((activity) => {
				remark().use(strip).process(activity['preview'], function(error, output) {
					if (!error) {
					    activity['rendered_preview'] = output
					}
				})
			});
        },
		props: {
			user: {
				type: Object,
				required: true
			},
			activity: {
				type: Array,
				required: true
			}
		}
	}
</script>
