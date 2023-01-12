<template>
	<section class="change-password">
		<span class="page-title uk-block uk-width-100 uk-text-center">
			<i class="fas fa-lock"></i>
			Change Password
		</span>

		<p v-if="error != null" class="uk-p uk-p-red">{{ error }}</p>
		<p v-if="savedNotification" class="uk-p uk-p-green">Your password has been changed successfully.</p>

		<form>
			<fieldset class="uk-fieldset">
				<div class="uk-margin-s">
					<label>
						<input class="uk-input uk-form-small" type="password" placeholder="Current Password"
							   name="current-password" v-model="currentPassword"/>
					</label>
				</div>
				<div class="uk-margin-s">
					<label>
						<input class="uk-input uk-form-small" type="password" placeholder="New Password"
							   name="new-password" v-model="newPassword"/>
					</label>
				</div>
				<div class="uk-margin-s">
					<label>
						<input class="uk-input uk-form-small" type="password" placeholder="Confirm New Password"
							   name="confirm-new-password" v-model="confirmNewPassword"/>
					</label>
				</div>
			</fieldset>

			<button type="submit" class="uk-button uk-btn-blue uk-margin-s" @click.stop.prevent="submitForm()">Change Password</button>
		</form>
	</section>
</template>

<script>
	export default {
		data() {
		    return {
		        error: null,
				currentPassword: '',
				newPassword: '',
				confirmNewPassword: '',
				savedNotification: false,
			}
		},
		methods: {
		    submitForm() {
		        this.error = null;

		        if (this.newPassword !== this.confirmNewPassword) {
		            this.error = 'Your new passwords don\'t match!';
		            return;
				}

		        let data = {
		            'current_password': this.currentPassword,
					'new_password': this.newPassword,
					'confirm_new_password': this.confirmNewPassword
				};

		        this.$axios.post('/user/change-password', data)
					.then(response => {
					    this.savedNotification = true;

					    let ins = this;
					    setTimeout(function() {
					        ins.savedNotification = false;
						}, 3500);
					})
					.catch(error => {
					    if (error.response) {
					        this.error = error.response.data + '.';
						} else {
					        this.error = 'Client error';
						}
					});
			}
		}
	}
</script>
