<template>
	<form class="reply-form" @submit.prevent="postReply()">
		<label>
			<textarea v-model="input" class="uk-textarea form-control" rows="3" placeholder="Your reply...."/>
		</label>

		<div v-if="error" class="uk-form-danger">
			<p>{{ error }}</p>
		</div>

		<button class="uk-button uk-btn-green">Reply</button>
	</form>
</template>

<style scoped>
	.form-control {
		margin-bottom: 10px;
	}

	textarea {
		min-width: 200px;
	}
</style>

<script>
	export default {
	    data() {
	        return {
	            input: "",
				error: null
			}
		},
		props: {
			thread: {
			    type: Object,
			    required: true,
			},
			parentId: {
			    type: Number,
				required: false,
			}
		},
	    methods: {
	        postReply() {
                this.error = null;

                if (this.input === "") {
                    this.error = "You need to type a reply first!";
                    return
				}

                if (this.input.length < 3) {
                    this.error = "Your reply must be at least 3 characters long!";
                    return
				}

	            if (this.thread['option_locked']) {
	                this.error = 'You can\'t reply because the thread is locked!';
	                return;
				}

                let data = {
					'reply_content': this.input
				};

                if (this.parentId != null) {
                    data['parent_reply'] = this.parentId
				}

				this.$axios.post('/forums/threads/' + this.thread.id + '/reply', data).then(response => {
					if (response.status === 201) {
						this.$emit('post-reply', response.data);
					}
				}).catch(error => {
				    if (error.response) {
				        this.error = error.response.data;
					}
				})
			},
		}
	}
</script>
