<template>
	<div class="uk-container uk-margin">
		<div v-if="settings != null" class="uk-grid">
			<div class="uk-width-2-3@m">
				<div class="page-section">
					<span class="page-title uk-block uk-width-100 uk-text-center">
						<i class="fas fa-cogs"></i>
						Account Settings
					</span>

					<hr/>

					<section class="privacy-settings">
						<span class="page-title small">Privacy settings</span>

						<form class="uk-margin-s">
							<fieldset class="uk-fieldset">
								<div>
									<label>
										Who can see your online presence?

										<select class="uk-select uk-form-small" @change="commitSetting('presence_visibility')" v-model="settings['presence_visibility']">
											<option value="EVERYONE">Everyone</option>
											<option value="FRIENDS">Friends Only</option>
											<option value="NOBODY">Nobody</option>
										</select>
									</label>
								</div>

								<div class="uk-margin-s">
									<label>
										Who can send you friend requests?

										<select class="uk-select uk-form-small" @change="commitSetting('friend_requests')" v-model="settings['friend_requests']">
											<option value="ALLOW">Everyone</option>
											<option value="DENY">Nobody</option>
										</select>
									</label>
								</div>

								<div class="uk-margin-s">
									<label>
										<input class="uk-checkbox" type="checkbox" @change="commitSetting('receive_emails')" v-model="settings['receive_emails']">
										Receive emails for site notifications
									</label>
								</div>
							</fieldset>
						</form>
					</section>

					<hr/>

					<section class="social-media-links">
						<span class="page-title small">Social media links</span>

						<p v-if="savedNotification" class="uk-p uk-p-green uk-margin-s">Your social media links have been updated successfully.</p>

						<form class="uk-margin-s">
							<fieldset class="uk-fieldset">
								<table>
									<tbody>
									<tr>
										<td>
											<i class="fab fa-twitter"></i>
										</td>
										<td>
											<input class="uk-input uk-form-small" :class="{ 'uk-form-danger': fieldHasError('twitter') }" type="text" placeholder="Twitter Profile" v-model="socialLinks['twitter']" @input="fieldChanged('twitter')"/>
										</td>
									</tr>
									<tr>
										<td>
											<i class="fab fa-youtube"></i>
										</td>
										<td>
											<input class="uk-input uk-form-small" :class="{ 'uk-form-danger': fieldHasError('youtube') }" type="text" placeholder="YouTube Channel" v-model="socialLinks['youtube']" @input="fieldChanged('youtube')"/>
										</td>
									</tr>
									<tr>
										<td>
											<i class="fab fa-twitch"></i>
										</td>
										<td>
											<input class="uk-input uk-form-small" :class="{ 'uk-form-danger': fieldHasError('twitch') }" type="text" placeholder="Twitch Channel" v-model="socialLinks['twitch']" @input="fieldChanged('twitch')"/>
										</td>
									</tr>
									<tr>
										<td>
											<i class="fab fa-discord"></i>
										</td>
										<td>
											<input class="uk-input uk-form-small" :class="{ 'uk-form-danger': fieldHasError('discord') }" type="text" placeholder="Discord Username" v-model="socialLinks['discord']" @input="fieldChanged('discord')"/>
										</td>
									</tr>
									<tr>
										<td>
											<i class="fab fa-telegram"></i>
										</td>
										<td>
											<input class="uk-input uk-form-small" :class="{ 'uk-form-danger': fieldHasError('telegram') }" type="text" placeholder="Telegram Link" v-model="socialLinks['telegram']" @input="fieldChanged('telegram')"/>
										</td>
									</tr>
									<tr>
										<td>
											<i class="fab fa-reddit"></i>
										</td>
										<td>
											<input class="uk-input uk-form-small" :class="{ 'uk-form-danger': fieldHasError('reddit') }" type="text" placeholder="Reddit Profile" v-model="socialLinks['reddit']" @input="fieldChanged('reddit')"/>
										</td>
									</tr>
									<tr>
										<td>
											<i class="fab fa-github"></i>
										</td>
										<td>
											<input class="uk-input uk-form-small" :class="{ 'uk-form-danger': fieldHasError('github') }" type="text" placeholder="GitHub Profile" v-model="socialLinks['github']" @input="fieldChanged('github')"/>
										</td>
									</tr>
									</tbody>
								</table>
							</fieldset>

							<button type="submit" class="uk-button uk-btn-green uk-margin-s" @click="saveFields()" v-bind:disabled="!anyFieldsChanged">Save Changes</button>
						</form>
					</section>
				</div>
			</div>
			<div class="uk-width-1-3@m">
				<div class="page-section">
					<ChangePasswordForm/>
				</div>

<!--				<div class="page-section">-->
<!--					<section class="two-factor-auth">-->
<!--						<span class="page-title uk-block uk-width-100 uk-text-center">-->
<!--							<i class="far fa-qrcode"></i>-->
<!--							Two factor auth-->
<!--						</span>-->

<!--						<form>-->
<!--							<button type="submit" class="uk-button uk-btn-green uk-margin-s">Enable 2FA</button>-->
<!--						</form>-->
<!--					</section>-->
<!--				</div>-->
			</div>
		</div>
		<div v-else class="page-section">
			<div class="uk-block uk-width-100 uk-text-center">
				<div uk-spinner></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.page-title {
		margin-bottom: 0;
	}

	.page-section {
		padding: 20px;
	}

	.uk-grid {
		padding-bottom: 20px;
	}

	section {
		margin-bottom: 20px;
	}

	section:last-child {
		margin-bottom: 0;
	}

	.privacy-settings form {
		max-width: 400px;
	}

	.social-media-links table {
		min-width: 400px;
	}

	.social-media-links table tr > td:first-child {
		width: 20px;
	}

	.social-media-links input[type="text"] {
		width: 100%;
	}
</style>

<script>
	export default {
	    head() {
	        return {
				title: "Account Settings"
			}
		},
		async asyncData({$axios}) {
	        return await $axios
				.get('/user/settings')
				.then(response => {
				    if (response.status === 200) {
				        let data = response.data;
				        data['settings'] = response.data['settings'];
				        data['originalSettings'] = response.data['settings'];
				        data['socialLinks'] = response.data['social_links'];
				        return data;
					} else {
				        return {};
					}
				})
				.catch(error => {
				    return {};
				});
		},
		data() {
	        return {
	            settings: null,
	            originalSettings: null,
				socialLinks: null,
				changedFields: [],
				errorFields: [],
				savedNotification: false,
			}
		},
		methods: {
	        commitSetting(setting) {
	            let data = {};
	            data[setting] = this.settings[setting];

	            this.$axios.post('/user/settings/update', data)
					.then(response => {
					    if (response.status === 200) {
					        this.originalSettings[setting] = this.settings[setting];
					    } else {
					        this.settings[setting] = this.originalSettings[setting];
					    }
					})
					.catch(error => {
					    this.settings[setting] = this.originalSettings[setting];
					});
			},
			fieldChanged(field) {
	            if (!this.changedFields.includes(field)) {
	                this.changedFields.push(field);
				}
			},
			saveFields() {
	            let mappedLinks = {};

	            for (let i = 0; i < this.changedFields.length; i++) {
	                let field = this.changedFields[i];
	                mappedLinks[field] = this.socialLinks[field];
				}

	            this.changedFields = [];

				this.$axios.post('/user/settings/update', {'social_links': mappedLinks})
					.then(response => {
					    this.savedNotification = true;

					    let ins = this;
					    setTimeout(function() {
					        ins.savedNotification = false;
						}, 3500)
					})
					.catch(error => {
					    if (error.response) {
                            let response = error.response;
                            if (response.data && response.data['social_links']) {
								for (let key in response.data['social_links']) {
									this.changedFields.push(key);
									this.errorFields.push(key);
								}
                            }
                        }
					});
			}
		},
		computed: {
	        anyFieldsChanged: function () {
	            return this.changedFields.length > 0;
            },
			fieldHasError: function() {
	            let ins = this;
	            return (field) => {
					return ins.errorFields.includes(field);
				}
			}
		}
	}
</script>
