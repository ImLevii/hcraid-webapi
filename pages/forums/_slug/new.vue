<template>
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
				<nuxt-link :to="{ name: 'forums-slug-new', params: { slug: this.forum.slug } }">New Post</nuxt-link>
			</li>
		</ul>

		<div class="page-section uk-padding uk-margin">
			<div class="uk-grid uk-flex uk-flex-center">
				<div class="uk-width-3-4">
					<span class="page-title">New Post</span>

					<form v-if="forum != null">
						<!-- Title Field -->
						<div>
							<label class="uk-form-label" for="title">
								The title of your post <span class="uk-text-meta">(required)</span>
							</label>

							<div class="form-error" v-if="!$v.title.minLength">The title must have at least {{ $v.title.$params.minLength.min }} characters!</div>
							<div class="form-error" v-if="!$v.title.maxLength">The title can't have more than {{ $v.title.$params.maxLength.max }} characters!</div>

							<div class="uk-form-controls">
								<div class="uk-inline uk-width-1-1">
									<input v-model="title" class="uk-input" id="title" name="title" placeholder="The title of your post..." type="text" :class="{ 'uk-form-danger': !$v.title.minLength || !$v.title.maxLength }">
								</div>
							</div>
						</div>

						<!-- Details Field -->
						<div class="uk-margin">
							<label class="uk-form-label" for="details">
								The details of your post <span class="uk-text-meta">(required)</span>
							</label>

							<div class="form-error" v-if="!$v.details.minLength">Your post must have at least {{ $v.details.$params.minLength.min }} characters!</div>
							<div class="form-error" v-if="!$v.details.maxLength">Your post can't have more than {{ $v.details.$params.maxLength.max }} characters!</div>

							<div class="uk-form-controls">
								<div class="uk-inline uk-width-1-1" v-bind:class="{ 'error': !$v.details.minLength || !$v.details.maxLength }">
									<textarea ref="details" class="uk-input" id="details" name="details" placeholder="The details of your post..." type="text" :class="{ 'uk-form-danger': !$v.details.minLength || !$v.details.maxLength }"/>
								</div>
							</div>
						</div>

						<button class="uk-button uk-btn-green uk-margin" type="submit" @click.prevent.stop="submitPost()">Create Post</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	form textarea {
		height: 400px;
		line-height: 20px;
		padding: 10px 10px;
	}

	.page-section {
		margin-bottom: 20px;
	}
</style>

<style>
	.form-error {
		display: inline-block;
		color: #f0506e;
		font-size: 12px;
		text-transform: lowercase;
	}

	.error {
    	border: 1px solid #f0506e;
		border-radius: 4px;
	}

	.error .editor-toolbar {
		color: #f0506e;
    	border: none;
	}

	.error .CodeMirror {
    	border: none;
    	border-top: 1px solid #f0506e;
	}

	.editor-toolbar {
		border-top-left-radius: 2px;
		border-top-right-radius: 2px;
	}

	.CodeMirror {
		border-bottom-left-radius: 2px;
		border-bottom-right-radius: 2px;
	}
</style>

<script>
	const {validationMixin, default: Vuelidate} = require('vuelidate');
	const {required, minLength, maxLength} = require('vuelidate/lib/validators');

	export default {
	    middleware: 'authenticated',
		mixins: [validationMixin],
		validations: {
			title: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(60)
			},
			details: {
				required,
				minLength: minLength(10),
				maxLength: maxLength(8000)
			},
		},
	    data() {
	        return {
	            forum: null,
	            title: "",
				details: "",
	            error: null
			}
		},
		head() {
			return {
				title: 'New Post (' + this.forum.name + ')'
			}
		},
		mounted() {
	        // require here because it requires window/navigator which aren't loaded before mount
			const SimpleMDE = require('simplemde');

			// create the text editor with our options
			this.textEditor = new SimpleMDE({
				autofocus: true,
				autosave: {
					enabled: true,
					uniqueId: "NewThread-" + this.forum.slug,
					delay: 5000,
				},
				spellChecker: false,
				status: false,
				renderingConfig: {
					markedOptions: {
						sanitize: true
					}
				},
				element: this.$refs['details']
			});

			// reflect changes from text editor to details field
			// this way we don't have to manually validate the field
			this.textEditor.codemirror.on("change", () => {
				this.details = this.textEditor.value();
			});
        },
		async asyncData({$axios, route}) {
			const forum = route.params.slug;

			return await $axios
				.get('/forums/' + forum + '/')
				.then(result => {
				    if (!result.data.hasOwnProperty('can_post') || !result.data['can_post']) {
				        return this.$nuxt.error({ statusCode: 404, message: 'You can\'t post in that forum!' })
					}

				    return {
				        forum: result.data['forum']
					}
				})
				.catch(error => {
					console.log(error);
				});
    	},
		methods: {
			async submitPost() {
				// reset the error field
				this.error = null;

				// process form for validation issues and cancel if the form is invalid
				this.$v.$touch();
				if (this.$v.$invalid) {
				    this.error = "The form is invalid!";
					return;
				}

				this.$axios.post('/forums/post', {
					'forum_id': this.forum.id,
					'post_title': this.title,
					'post_details': this.details
				}).then(response => {
					if (response.status === 201) {
						this.textEditor.clearAutosavedValue();
						this.$router.push({ name: 'forums-thread-slug', params: { thread: response.data.id, slug: response.data.slug } });
					}
				}).catch(error => {
				    if (error.response) {
                        this.error = error.response.data;
                    }
				});
			},
		}
    }
</script>
