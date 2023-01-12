<template>
	<div v-if="forum != null && thread != null">
		<div class="uk-container">
			<ul class="uk-breadcrumb uk-margin">
				<li>
					<nuxt-link :to="{ name: 'forums' }">Forums</nuxt-link>
				</li>
				<li class="divider">
					<i class="fas fa-chevron-right"></i>
				</li>
				<li>
					<ForumLink :forum="this.forum"/>
				</li>
				<li class="divider">
					<i class="fas fa-chevron-right"></i>
				</li>
				<li>
					<ThreadLink :thread="this.thread"/>
				</li>
			</ul>

			<div class="thread-layout page-section uk-margin">
				<ThreadPlayerCard :player="thread.created_by" class="author"/>

				<div class="layout">
					<div class="likes">
						<button v-if="this.isLiked" class="like-btn active" @click="destroyLike">
							<i class="fas fa-arrow-alt-up"></i>
						</button>
						<button v-else class="like-btn" @click="likePost">
							<i class="fas fa-arrow-alt-up"></i>
						</button>

						<span class="likes-count">{{ thread.statistics_likes }}</span>

						<button v-if="this.isDisliked" class="dislike-btn active" @click="destroyLike">
							<i class="fas fa-arrow-alt-down"></i>
						</button>
						<button v-else class="dislike-btn" @click="dislikePost">
							<i class="fas fa-arrow-alt-down"></i>
						</button>
					</div>

					<div class="content">
						<p v-if="isShowingEditSuccess" class="uk-p uk-p-green" style="margin-bottom: 20px;">Your changes have been saved!</p>

						<div class="created">
							<ThreadLink class="name" :thread="this.thread"/>

							<span class="timestamp">
								Posted <DateDisplay :timestamp="thread.created_at"/>
							</span>
						</div>

						<hr/>

						<div class="rendered-post" v-html="$md.render(thread.content)"></div>

						<div v-if="this.$auth.loggedIn" class="thread-options">
							<template v-if="canEdit">
								<button class="icon-text-btn option-btn" uk-toggle="target: #edit-thread-modal" type="button" @click="initiateThreadEditor()">
									<i class="fas fa-edit"></i>
									Edit
								</button>

								<div id="edit-thread-modal" ref="edit-thread-modal" uk-modal>
									<div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body" style="width: 80%; height: 80%; overflow-y: scroll;">
										<span class="page-title">Edit Thread</span>

										<button class="uk-modal-close" type="button">
											<i class="fas fa-times"></i>
										</button>

										<form>
											<p v-if="editorError != null" class="uk-p uk-p-red uk-margin">{{ editorError }}</p>

											<!-- Details Field -->
											<div class="uk-margin">
												<label class="uk-form-label" for="editorData">The details of your post</label>

												<div class="form-error" v-if="!$v.editorData.minLength">Your post must have at least {{ $v.editorData.$params.minLength.min }} characters!</div>
												<div class="form-error" v-if="!$v.editorData.maxLength">Your post can't have more than {{ $v.editorData.$params.maxLength.max }} characters!</div>

												<div class="uk-form-controls">
													<div class="uk-inline uk-width-1-1" v-bind:class="{ 'error': !$v.editorData.minLength || !$v.editorData.maxLength }">
														<textarea ref="editorData" class="uk-input" id="editorData" name="editorData" placeholder="The details of your post..." type="text" :class="{ 'uk-form-danger': !$v.editorData.minLength || !$v.editorData.maxLength }"/>
													</div>
												</div>
											</div>

											<button class="uk-button uk-btn-green uk-margin" type="submit" @click.prevent.stop="submitEditedThread()">Edit Post</button>
										</form>
									</div>
								</div>
							</template>

							<template v-if="canDelete">
								<button class="icon-text-btn option-btn" uk-toggle="target: #delete-thread-modal" type="button">
								<i class="fas fa-trash-alt"></i>
									Delete
								</button>

								<div id="delete-thread-modal" uk-modal>
									<div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
										<button class="uk-modal-close" type="button">
											<i class="fas fa-times"></i>
										</button>

										<span class="page-title">Delete Thread</span>

										<form>
											<p v-if="deleteError != null" class="uk-p uk-p-red uk-margin">{{ deleteError }}</p>

											<!-- Details Field -->
											<div class="uk-margin">
												<label class="uk-form-label" for="deleteReason">Please provide a reason for deleting this thread</label>

												<div class="form-error" v-if="!$v.deleteReason.minLength">Your post must have at least {{ $v.deleteReason.$params.minLength.min }} characters!</div>
												<div class="form-error" v-if="!$v.deleteReason.maxLength">Your post can't have more than {{ $v.deleteReason.$params.maxLength.max }} characters!</div>

												<div class="uk-form-controls uk-margin">
													<div class="uk-inline uk-width-1-1" v-bind:class="{ 'error': !$v.deleteReason.minLength || !$v.deleteReason.maxLength }">
														<textarea id="deleteReason" name="deleteReason" v-model="deleteReason" class="uk-textarea form-control" rows="3" placeholder="Reason..." :class="{ 'uk-form-danger': !$v.deleteReason.minLength || !$v.deleteReason.maxLength }"/>
													</div>
												</div>
											</div>

											<button class="uk-button uk-btn-red uk-margin" type="submit" @click.prevent.stop="deleteThread()">Delete Thread</button>
										</form>
									</div>
								</div>
							</template>

							<template v-if="canReport">
								<button class="icon-text-btn option-btn" uk-toggle="target: #report-thread-modal" type="button">
									<i class="fas fa-flag"></i>
									Report
								</button>

								<div id="report-thread-modal" uk-modal>
									<div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">
										<button class="uk-modal-close" type="button">
											<i class="fas fa-times"></i>
										</button>

										<span class="page-title">Report Thread</span>

										<p>Please provide all of the necessary details about why you're reporting this thread.</p>
									</div>
								</div>
							</template>

							<form>
								<label v-if="canAnnounce">
									<input type="checkbox" class="uk-checkbox uk-form-small" v-model="thread['option_announcement']" @change="commitAnnouncementOption()">
									Announcement
								</label>
							</form>

							<form>
								<label v-if="canPin">
									<input type="checkbox" class="uk-checkbox uk-form-small" v-model="thread['option_pinned']" @change="commitPinnedOption()">
									Pinned
								</label>
							</form>

							<form v-if="canLock">
								<label>
									<input type="checkbox" class="uk-checkbox uk-form-small" v-model="thread['option_locked']" @change="commitLockedOption()">
									Locked
								</label>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div class="page-section uk-padding uk-margin">
				<span class="page-title">Post a reply</span>

				<div v-if="this.thread['option_locked']" class="uk-p-red">This thread has been locked!</div>

				<ReplyForm v-else-if="this.$auth.loggedIn && canReply" :thread="thread" v-on:post-reply="postReply"/>

				<div v-else class="uk-p uk-p-red uk-margin">
					<p>You need to <LoginLink>login</LoginLink> to post a reply...</p>
				</div>

				<div v-if="thread['replies'].length > 0" class="replies">
					<Reply v-for="reply in getSortedReplies" :key="reply.id" :thread="thread" :reply="reply"/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.uk-container {
		padding-bottom: 20px;
	}

	.thread-layout {
		display: flex;
	}

	.thread-layout > div {
		padding: 20px;
	}

	.thread-layout > div:first-child {
		border-right: 1px solid #DFE7EB;
	}

	.thread-layout > div:nth-child(2) {
		padding-left: 12px;
	}

	.thread-layout .author {
		min-width: 200px;
	}

	.thread-layout .layout {
		flex-grow: 1;
	}

	@media screen and (max-width: 639px) {
		.thread-layout {
			flex-direction: column;
		}

		.thread-layout > .layout {
			padding-top: 0;
		}

		.thread-layout > div {
			width: 100% !important;
			box-sizing: border-box;
		}

		.thread-layout > div:first-child {
			border-right: none;
		}
	}

	.player-card.author > .avatar {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.player-card.author > .avatar > .bust > img {
		position: relative;
		top: 10px;
		width: 170px;
		height: 170px;
	}

	.player-card.author > .avatar > .rank {
		position: absolute;
		bottom: 0;
		min-width: 170px;
		padding: 4px 10px;
		background: #F4F4F4;
		border: 1px solid #ccc;
		border-radius: 2px;
		color: #333;
		font-size: 14px;
		font-weight: bold;
		text-align: center;
	}

	.layout {
		display: flex;
		align-items: flex-start;
	}

	.layout > .likes {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 12px;
	}

	.layout > .likes > .likes-count {
		color: #666;
		font-size: 13px;
		font-weight: bold;
	}

	.layout > .likes > button {
		height: 20px;
	}

	.layout > .likes > button > i.fas {
		color: #666;
		font-size: 20px;
	}

	.layout > .likes > button:hover > i.fas {
		color: #0767f8;
	}

	.content {
		flex-grow: 1;
		position: relative;
		min-height: 100%;
	}

	.content > .created {
		margin-bottom: 10px;
	}

	.content > .created > .name {
		color: #333333;
		line-height: 21px;
		font-size: 24px;
		font-weight: bold;
	}

	.content > .created > .name:hover {
		color: #0f6ecd;
	}

	.content > .created > hr {
		margin: 6px 0;
	}

	.content > .created > .timestamp {
		display: block;
		color: #666;
		font-size: 13px;
		line-height: 13px;
	}

	.content > .rendered-post {
		margin-bottom: auto;
		padding-bottom: 40px;
	}

	.content > .thread-options {
		width: 100%;
		position: absolute;
		bottom: 0;
		display: flex;
		border-top: 1px solid #DFE7EB;
		padding-top: 20px;
		font-family: 'Rajdhani', sans-serif;
		font-size: 12px;
		font-weight: bold;
		text-transform: uppercase;
	}

	.content > .thread-options > button {
		margin-right: 9px;
		color: #666;
		text-transform: uppercase;
	}

	.content > .thread-options > button:hover {
		color: #0767f8;
		text-decoration: underline;
	}

	.content > .thread-options > form {
		margin-right: 8px;
	}

	.content > .thread-options > form input[type="checkbox"] {
		width: 16px;
		height: 16px;
		padding: 0;
		margin-right: 1px;
	}

	.replies {
		display: flex;
		flex-direction: column;
		padding: 14px;
		margin-top: 20px;
		border: 1px solid #DFE7EB;
		border-radius: 2px;
	}

	.like-btn.active i {
		color: #0767f8 !important;
	}

	.dislike-btn.active i {
		color: #0767f8 !important;
	}
</style>

<script>
	const {validationMixin, default: Vuelidate} = require('vuelidate');
	const {required, minLength, maxLength} = require('vuelidate/lib/validators');

	export default {
		mixins: [validationMixin],
		validations: {
			editorData: {
				required,
				minLength: minLength(10),
				maxLength: maxLength(8000)
			},
			deleteReason: {
				required,
				minLength: minLength(10),
				maxLength: maxLength(8000)
			},
		},
        async asyncData({$axios, route}) {
            const thread = route.params.id || route.params.thread;
            const data = {};

            await $axios
                .get('/forums/threads/' + thread)
                .then(result => {
                    data['thread'] = result.data;
                })
                .catch(error => {
                    let message;
                    if (error.response.statusCode === 404) {
                        message = 'That page doesn\'t exist!';
					} else {
                        message = error.response.data;
					}

                    this.$nuxt.error({statusCode: error.response.data, message: message});
                });

            await $axios
                .get('/forums/' + data['thread']['forum'] + '/')
                .then(result => {
                    data['forum'] = result.data['forum'];
                })
                .catch(error => {
                    let message;
                    if (error.response.statusCode === 404) {
                        message = 'That page doesn\'t exist!';
					} else {
                        message = error.response.data;
					}

                    this.$nuxt.error({statusCode: error.response.data, message: message});
                });

            return data;
        },
        data() {
            return {
				forum: null,
                thread: null,
				textEditor: null,
				editorData: null,
				editorError: null,
				editSuccess: null,
				deleteError: null,
				deleteReason: "",
				lockError: null,
				lockReason: "",
                truncate: require('~/assets/script/text.js').truncate
            }
        },
        head() {
            return {
                title: this.thread.name || "Loading..."
            }
        },
		methods: {
            likePost() {
                if (!this.$auth.loggedIn) {
                    return;
				}

                this.$axios.post('/forums/threads/' + this.thread.id + '/likes/create?type=LIKE').then(response => {
                    if (response.status === 201) {
                        let mod = 1;
                        if (this.thread.hasOwnProperty('like_type') && this.thread['like_type'] === 'DISLIKE') {
                            mod = 2;
						}

                        this.thread['statistics_likes'] = this.thread['statistics_likes'] + mod;
                        this.thread['like_type'] = 'LIKE';
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

                this.$axios.post('/forums/threads/' + this.thread.id + '/likes/create?type=DISLIKE').then(response => {
                    if (response.status === 201) {
                        let mod = 1;
                        if (this.thread.hasOwnProperty('like_type') && this.thread['like_type'] === 'LIKE') {
                            mod = 2;
						}

                        this.thread['statistics_likes'] = this.thread['statistics_likes'] - mod;
                        this.thread['like_type'] = 'DISLIKE';
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

                this.$axios.post('/forums/threads/' + this.thread.id + '/likes/destroy').then(response => {
                    if (response.status === 200) {
                		this.thread['like_type'] = 'NONE';

                        if (response.data['like_type'] === 'LIKE') {
                            this.thread['statistics_likes'] = this.thread['statistics_likes'] - 1;
                        } else if (response.data['like_type'] === 'DISLIKE') {
                            this.thread['statistics_likes'] = this.thread['statistics_likes'] + 1;
						}
					}
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
					}
				});
			},
			postReply(newReply) {
				this.thread['replies'].push(newReply);
			},
			initiateThreadEditor() {
                if (this.thread == null) {
                    return;
				}

                if (this.textEditor != null) {
                    return;
				}

                this.editorData = this.thread['content'];

                // require here because it requires window/navigator which aren't loaded before mount
				const SimpleMDE = require('simplemde');

				// create the text editor with our options
				this.textEditor = new SimpleMDE({
					autofocus: true,
					autosave: {
						enabled: true,
						uniqueId: "EditThread-" + this.thread.id,
						delay: 5000,
					},
					spellChecker: false,
					status: false,
					renderingConfig: {
						markedOptions: {
							sanitize: true
						}
					},
					element: this.$refs['editorData']
				});

				this.textEditor.value(this.editorData);

				// reflect changes from text editor to details field
				// this way we don't have to manually validate the field
				this.textEditor.codemirror.on("change", () => {
					this.editorData = this.textEditor.value();
				});
			},
			submitEditedThread() {
                // reset the error field
				this.editorError = null;

				// process form for validation issues and cancel if the form is invalid
				this.$v.editorData.$touch();
                if (this.$v.editorData.$invalid) {
				    this.editorError = "The form is invalid!";
					return;
				}

				this.$axios.post('/forums/threads/' + this.thread.id + '/update', {'edit': this.editorData})
					.then(response => {
						if (response.status === 200) {
					    	this.thread['content'] = this.editorData;
							this.textEditor.clearAutosavedValue();

							window.UIkit.modal(this.$refs['edit-thread-modal']).hide();

							this.editSuccess = new Date().getMilliseconds();
						}
					})
					.catch(error => {
						if (error.response) {
							this.editorError = error.response.data;
						}
					});
			},
			deleteThread() {
                this.$axios.post('/forums/threads/' + this.thread.id + '/delete', {'deleted_reason': this.deleteReason})
					.then(response => {
					    this.thread['deleted'] = true;
					    this.thread['deleted_by'] = {
					        'uuid': this.$auth.user['uuid'],
					        'username': this.$auth.user['username'],
						};
					    this.thread['deleted_reason'] = this.deleteReason;
					    this.thread['date_deleted'] = new Date().getTime();

						this.$router.push({ name: 'forums-slug', params: { slug: this.thread['forum'] } });
					})
					.catch(error => {
						if (error.response) {
							this.deleteError = error.response.data;
						}
					});
			},
			commitLockedOption() {
                let data = {'locked': this.thread['option_locked']};

                this.$axios.post('/forums/threads/' + this.thread.id + '/update', data)
                    .then(response => {

                    })
					.catch(error => {
                        this.thread['option_locked'] = !this.thread['option_locked'];
					});
			},
			commitAnnouncementOption() {
                let data = {'announce': this.thread['option_announcement']};

                this.$axios.post('/forums/threads/' + this.thread.id + '/update', data)
                    .then(response => {

                    })
					.catch(error => {
                        this.thread['option_announcement'] = !this.thread['option_announcement'];
					});
			},
			commitPinnedOption() {
				let data = {'pinned': this.thread['option_pinned']};

                this.$axios.post('/forums/threads/' + this.thread.id + '/update', data)
                    .then(response => {

                    })
					.catch(error => {
                        this.thread['option_pinned'] = !this.thread['option_pinned'];
					});
			}
		},
        computed: {
		    isShowingEditSuccess: function() {
		        return this.editSuccess != null && new Date().getMilliseconds() < this.editSuccess + 5000;
			},
            canDelete: function() {
                return this.thread.hasOwnProperty('user_options') && this.thread['user_options'].includes('DELETE');
			},
			canLock() {
	            return this.thread.hasOwnProperty('user_options') && this.thread['user_options'].includes('LOCK');
			},
			canEdit: function() {
                return this.thread.hasOwnProperty('user_options') && this.thread['user_options'].includes('EDIT');
			},
			canReply: function() {
                return !this.thread['option_locked'] && !this.thread['deleted'];
			},
			canReport: function() {
                return this.thread.hasOwnProperty('user_options') && this.thread['user_options'].includes('REPORT');
			},
            canAnnounce: function() {
                return this.thread.hasOwnProperty('user_options') && this.thread['user_options'].includes('ANNOUNCE');
			},
            canPin: function() {
                return this.thread.hasOwnProperty('user_options') && this.thread['user_options'].includes('PIN');
			},
			isAnnouncement: function() {
                return this.thread['option_announcement'];
			},
            isLiked: function() {
                return this.thread.hasOwnProperty('like_type') && this.thread['like_type'] === 'LIKE';
			},
			isDisliked: function() {
                return this.thread.hasOwnProperty('like_type') && this.thread['like_type'] === 'DISLIKE';
			},
            getSortedReplies: function () {
                return this.thread['replies'].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            }
        }
    }
</script>
