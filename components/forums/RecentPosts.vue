<template>
	<div>
		<ul v-if="recentPosts != null" class="recent-posts">
			<li v-for="post in recentPosts" class="post" v-bind:class="{ 'fresh-post': isFreshPost(post) }">
				<PlayerAvatar :username="post.post_created_by.username" :uuid="post.post_created_by.uuid"/>

				<div class="details">
					<ThreadLink :thread="post" :charLimit="24" class="name"/>

					<span class="description">
						<PlayerLink :user="post.post_created_by"/>

						<template v-if="post.post_type === 'THREAD'">
							created post
						</template>
						<template v-else>
							replied
						</template>
					</span>

					<DateDisplay :timestamp="post.post_created_at" :ago="true"/>
				</div>
			</li>
		</ul>
		<div v-else class="uk-flex uk-flex-center" style="padding: 100px 0">
			<div uk-spinner></div>
		</div>
	</div>
</template>

<style>
	.recent-posts .post .player-avatar-link {
		flex-shrink: 0;
		margin-right: 10px;
		box-sizing: border-box;
	}

	.recent-posts .post .player-avatar {
		width: 24px;
		height: 24px;
		box-sizing: border-box;
	}
</style>

<style scoped>
	.recent-posts {
		margin: 0;
		padding: 0;
		list-style: none;
		border: 1px solid #E5E6EA;
		border-radius: 2px;
		font-size: 12px;
		line-height: 12px;
	}

	.recent-posts .post {
		position: relative;
		display: flex;
		align-items: center;
		padding: 6px 12px;
		border-bottom: 1px solid #E5E6EA;
	}

	.recent-posts .post:last-child {
		border-bottom: none;
	}

	.recent-posts .post .details {
		display: flex;
		flex-direction: column;
	}

	.recent-posts .post .details .name {
		color: #333;
		font-size: 14px;
		font-weight: bold;
		line-height: 15px;
	}

	.recent-posts .post .details .name:hover {
		color: #0f6ecd;
	}

	.recent-posts .post .details .description {
		font-size: 13px;
		line-height: 14px;
	}
</style>

<script>
	import { gsap } from 'gsap';

    export default {
        data() {
	        return {
	            recentPosts: null,
				freshPosts: []
			}
		},
		async beforeMount() {
            return await this.$axios
                .get('/recent-posts')
                .then(result => {
                    this.recentPosts = result.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
		methods: {
            addPost() {
                this.freshPosts.push(newPost['id']);
                this.recentPosts.push(newPost);

                this.$nextTick(function() {
                    document.querySelectorAll('.fresh-post').forEach(function(element) {
                        gsap.fromTo(element, {height: 0, opacity: 0}, {
                            height: element.scrollHeight - 12,
							duration: 1.0,
							onComplete: function () {
                                gsap.to(element, {opacity: 1.0, duration: 0.5});
                                element.style.height = 'auto';
                                element.classList.remove('fresh-post');
                            }
                        });
                    });
				});
			},
			isFreshPost(post) {
                return this.freshPosts.includes(post['id']);
			}
		}
    }
</script>
