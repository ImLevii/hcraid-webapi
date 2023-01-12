<template>
	<div class="reply">
		<div class="reply-gutter">
			<PlayerAvatar :username="reply['created_by'].username" :uuid="reply['created_by'].uuid" :size="24" />
			<div class="line-indent"></div>
		</div>

		<div class="reply-body">
			<div class="reply-details">
				<PlayerLink :user="reply['created_by']" class="username"/>
				<DateDisplay :timestamp="reply['created_at']" class="date-created"/>
			</div>

			<div class="reply-content rendered-post">{{ reply.content }}</div>

			<div class="reply-options">
				<div class="upvotes">
					<button v-if="this.$auth.loggedIn && this.isLiked" class="icon-btn active" @click="destroyLike" v-bind:disabled="!this.$auth.loggedIn">
						<i class="fas fa-arrow-alt-up"></i>
					</button>
					<button v-else class="icon-btn" @click="likePost" v-bind:disabled="!this.$auth.loggedIn">
						<i class="fas fa-arrow-alt-up"></i>
					</button>

					<span class="upvote-count">{{ reply.statistics_likes }}</span>

					<button v-if="this.$auth.loggedIn && this.isDisliked" class="icon-btn active" @click="destroyLike" v-bind:disabled="!this.$auth.loggedIn">
						<i class="fas fa-arrow-alt-down"></i>
					</button>
					<button v-else class="icon-btn" @click="dislikePost" v-bind:disabled="!this.$auth.loggedIn">
						<i class="fas fa-arrow-alt-down"></i>
					</button>
				</div>

				<button v-if="this.$auth.loggedIn" @click="toggleReplyForm" class="icon-text-btn option-btn">
					<i class="fas fa-comment-alt" style="font-size: 13px;"></i>
					reply
				</button>

				<div v-if="this.$auth.loggedIn && canDelete" class="dropdown-menu">
					<button class="dropdown-btn icon-btn option-btn">
						<i class="fas fa-ellipsis-h"></i>
					</button>

					<div uk-dropdown="mode: click; pos: bottom-right" class="more-options" ref="user-menu-dropdown">
						<div class="dropdown-body">
							<ul class="options-list">
								<li>
									<button uk-toggle="target: #delete-reply-modal" type="button">
										<i class="fas fa-trash" style="font-size: 12px;"></i>
										delete
									</button>
								</li>
							</ul>
						</div>
					</div>

					<div id="delete-reply-modal" uk-modal>
						<div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
							<span class="page-title">Delete Reply</span>
							<p>Are you sure?</p>

							<button class="uk-button uk-btn-green uk-margin" @click="destroy()">Delete Reply</button>

							<button class="uk-modal-close" type="button">
								<i class="fas fa-times"></i>
							</button>
						</div>
					</div>
				</div>

				<template v-if="this.$auth.loggedIn && this.canReport">
					<button class="icon-text-btn option-btn" :uk-toggle="'target: #report-reply-modal-' + reply.id" type="button">
						<i class="fas fa-flag-alt" style="font-size: 12px;"></i>
						report
					</button>

					<div :id="'report-reply-modal-' + reply.id" uk-modal>
						<div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
							<span class="page-title">Report Reply</span>

							<button class="uk-modal-close" type="button">
								<i class="fas fa-times"></i>
							</button>
						</div>
					</div>
				</template>
			</div>

			<ReplyForm v-if="isReplying" :thread="thread" :parentId="reply.id" v-on:post-reply="postReply"/>

			<div v-if="hasNestedReplies" class="reply-children">
				<Reply v-for="nestedReply in getSortedReplies" :key="reply.id" :thread="thread" :reply="nestedReply"/>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.reply {
		display: flex;
		width: 100%;
		margin-bottom: 10px;
	}

	.reply:last-child {
		margin-bottom: 0;
	}

	.reply > .reply-body {
		display: flex;
		flex-direction: column;
		height: 100%;
		flex-grow: 1;
	}

	.reply > .reply-body > .reply-content {
		padding: 2px 0;
		font-size: 14px;
	}

	.reply > .reply-body > .reply-details,
	.reply > .reply-body > .reply-details > * {
		display: flex;
		align-items: center;
	}

	.reply > .reply-body > .reply-details > * {
		margin-right: 5px;
	}

	.reply > .reply-body > .reply-details > *:last-child {
		margin-right: 0;
	}

	.reply > .reply-body > .reply-details > .username {
		font-size: 12px;
	}

	.reply > .reply-body > .reply-details > .date-created {
		font-size: 12px;
	}

	.reply > .reply-body > .reply-options {
		display: flex;
		align-items: center;
		flex-flow: row nowrap;
		margin-left: -4px;
		color: #666;
	}

	.reply > .reply-body > .reply-options > * {
		margin-right: 4px;
	}

	.reply > .reply-body > .reply-options .option-btn {
		border-radius: 2px;
		font-size: 12px;
		font-weight: bold;
		line-height: 10px;
		transition: background-color .2s, color .2s;
		color: #666;
	}

	.reply > .reply-body > .reply-options .option-btn:hover {
		background: #d9d9d9;
	}

	.reply > .reply-body > .reply-options .icon-btn {
		padding: 4px;
	}

	.reply > .reply-body > .reply-options .icon-text-btn {
		display: inline-flex;
		align-items: center;
		padding: 4px;
	}

	.reply > .reply-body > .reply-options .icon-text-btn > i.fas {
		margin-right: 4px;
	}

	.reply > .reply-body > .reply-options .icon-btn > i.fas,
	.reply > .reply-body > .reply-options .icon-text-btn > i.fas {
		color: #666;
		font-size: 16px;
	}

	.reply > .reply-body > .reply-options .icon-btn:hover > i.fas {
		color: #0767f8;
	}

	.reply > .reply-body > .reply-options > .upvotes {
		display: flex;
		align-items: center;
	}

	.reply > .reply-body > .reply-options > .upvotes > .icon-btn.active i {
		color: #0767f8;
	}

	.reply > .reply-body > .reply-options > .upvotes > .upvote-count {
		padding: 4px;
		font-size: 12px;
		font-weight: bold;
		line-height: 10px;
	}

	.reply > .reply-body > .reply-options > .upvotes .icon-btn > i.fas {
		position: relative;
		top: 1px;
	}

	.reply > .reply-body > .reply-options .more-options,
	.reply > .reply-body > .reply-options .more-options > .dropdown-body {
		padding: 0;
	}

	.reply > .reply-body > .reply-options .more-options > .dropdown-body {
		border-radius: 3px;
	}

	.reply > .reply-body > .reply-options .more-options > .dropdown-body > .options-list > li {
		padding: 4px 8px;
	}

	.reply > .reply-body > .reply-children {
		flex-grow: 1;
		margin-top: 18px;
	}

	.reply > .reply-gutter {
		position: relative;
		display: flex;
		flex-direction: column;
		margin-right: 8px;
	}

	.reply > .reply-gutter > a::after {
		/* position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: calc(100% - 4px);
		height: calc(100% - 4px);
		content: "";
		border: 2px solid rgba(255, 255, 255, 0.16); */
	}

	.reply > .reply-gutter > .line-indent {
		flex-grow: 1;
		border-right: 2px solid #eeeeee;
		width: 50%;
		margin-top: 6px;
	}

	.reply .children {

	}
</style>

<style>
	.reply > .reply-gutter .player-avatar {
		width: 24px !important;
		height: 24px !important;
		border: 1px solid #2C2C2C;
		border-radius: 2px;
	}

	.reply > .reply-body > .reply-form {
		margin-top: 10px;
	}
</style>

<script>
	export default {
	    data() {
	        return {
				replyFormOpened: false
			}
		},
	    props: {
	        thread: {
	            type: Object,
				required: true
			},
	        reply: {
	            type: Object,
				required: true
			}
		},
		methods: {
			toggleReplyForm() {
                this.replyFormOpened = !this.replyFormOpened;
			},
			postReply(newReply) {
			    if (!this.reply.hasOwnProperty('nested_replies')) {
                    this.$set(this.reply, 'nested_replies', []);
                }
			    this.replyFormOpened = false;
				this.reply['nested_replies'].push(newReply);
			},
            likePost() {
                if (!this.$auth.loggedIn) {
                    return;
				}

                this.$axios.post('/forums/threads/' + this.thread.id + '/replies/' + this.reply.id + '/likes/create?type=LIKE').then(response => {
                    if (response.status === 201) {
                        let mod = 1;
                        if (this.reply.hasOwnProperty('like_type') && this.reply['like_type'] === 'DISLIKE') {
                            mod = 2;
						}

                        this.reply['statistics_likes'] = this.reply['statistics_likes'] + mod;
                        this.reply['like_type'] = 'LIKE';
					}
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
					}
				});
			},
			dislikePost() {
                if (!this.$auth.loggedIn) {
                    return;
				}

                this.$axios.post('/forums/threads/' + this.thread.id + '/replies/' + this.reply.id + '/likes/create?type=DISLIKE').then(response => {
                    if (response.status === 201) {
                        let mod = 1;
                        if (this.reply.hasOwnProperty('like_type') && this.reply['like_type'] === 'LIKE') {
                            mod = 2;
						}

                        this.reply['statistics_likes'] = this.reply['statistics_likes'] - mod;
                        this.reply['like_type'] = 'DISLIKE';
					}
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
					}
				});
			},
			destroyLike() {
                if (!this.$auth.loggedIn) {
                    return;
				}

                this.$axios.post('/forums/threads/' + this.thread.id + '/replies/' + this.reply.id + '/likes/destroy').then(response => {
                    if (response.status === 200) {
                		this.reply['like_type'] = 'NONE';

                        if (response.data['like_type'] === 'LIKE') {
                            this.reply['statistics_likes'] = this.reply['statistics_likes'] - 1;
                        } else if (response.data['like_type'] === 'DISLIKE') {
                            this.reply['statistics_likes'] = this.reply['statistics_likes'] + 1;
						}
					}
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
					}
				});
			},
			report() {

			},
			destroy() {
			    if (!this.$auth.loggedIn) {
                    return;
				}

                this.$axios.post('/forums/threads/' + this.thread.id + '/replies/' + this.reply.id + '/destroy', {'deleted_reason': 'Unspecified'}).then(response => {
                    if (response.status === 200) {
                		this.$emit('reply-deleted');
					}
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
					}
				});
			}
		},
		computed: {
            isCreatorOfReply() {
                return this.$auth.loggedIn && this.$auth.user.uuid === this.reply['created_by'].uuid;
			},
	        hasNestedReplies() {
	            return this.reply.hasOwnProperty('nested_replies');
			},
            getSortedReplies: function () {
                return this.reply['nested_replies'].sort((a, b) => new Date(a['created_at']) - new Date(b['created_at']));
            },
			canEdit() {
	            return this.reply.hasOwnProperty('user_options') && this.reply['user_options'].includes('EDIT');
			},
			canDelete() {
	            return this.reply.hasOwnProperty('user_options') && this.reply['user_options'].includes('DELETE');
			},
			canReport() {
	            return this.reply.hasOwnProperty('user_options') && this.reply['user_options'].includes('REPORT');
			},
			isReplying() {
	            return this.replyFormOpened;
			},
            isLiked: function() {
                return this.reply.hasOwnProperty('like_type') && this.reply['like_type'] === 'LIKE';
			},
			isDisliked: function() {
                return this.reply.hasOwnProperty('like_type') && this.reply['like_type'] === 'DISLIKE';
			},
		}
	}
</script>
