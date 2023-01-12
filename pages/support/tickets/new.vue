<template>
	<div class="uk-container uk-margin">
		<ul class="uk-breadcrumb">
			<li>
				<nuxt-link :to="{ name: 'support' }">Support</nuxt-link>
			</li>
			<li class="divider">
				<i class="fas fa-chevron-right"></i>
			</li>
			<li>
				<nuxt-link :to="{ name: 'support-tickets' }">Tickets</nuxt-link>
			</li>
			<li class="divider">
				<i class="fas fa-chevron-right"></i>
			</li>
			<li>
				<nuxt-link :to="{ name: 'support-tickets-new' }">New Ticket</nuxt-link>
			</li>
		</ul>

		<div class="page-section uk-margin">
			<div class="uk-grid uk-flex uk-flex-center">
				<div class="uk-width-3-4">
					<span class="page-title">New Support Ticket</span>

					<p class="uk-p uk-p-blue accent uk-margin-s">When creating a support ticket, please include as much detail as possible about how we can help you. Also allow us adequate time to process your ticket, but we usually respond within 24 hours.</p>

					<form class="ticket-form">
						<!-- Ticket Type Dropdown -->
						<div class="uk-margin">
							<label class="uk-form-label" for="ticket-type">
								What can we help you with?
							</label>

							<div class="uk-form-controls">
								<div class="uk-inline uk-width-1-1">
									<select class="uk-select" id="ticket-type" name="ticket-type" v-model="ticketType">
										<option value="GENERAL_ENQUIRY">General Enquiry</option>
										<option value="PAYMENT_ISSUE">Payment Issue</option>
										<option value="REPORT_PLAYER">Report a Player</option>
										<option value="ACCOUNT_SUSPENSION">Account Suspension</option>
									</select>
								</div>
							</div>
						</div>

						<!-- Title Field -->
						<div class="uk-margin">
							<label class="uk-form-label" for="title">
								The title of your ticket <span class="uk-text-meta">(required)</span>
							</label>

							<div class="form-error" v-if="!$v.title.minLength">The title must have at least {{ $v.title.$params.minLength.min }} characters!</div>
							<div class="form-error" v-if="!$v.title.maxLength">The title can't have more than {{ $v.title.$params.maxLength.max }} characters!</div>

							<div class="uk-form-controls">
								<div class="uk-inline uk-width-1-1">
									<input v-model="title" class="uk-input" id="title" name="title" placeholder="The title of your ticket..." type="text" :class="{ 'uk-form-danger': !$v.title.minLength || !$v.title.maxLength }">
								</div>
							</div>
						</div>

						<!-- Details Field -->
						<div class="uk-margin">
							<label class="uk-form-label" for="details">
								The details of your ticket <span class="uk-text-meta">(required)</span>
							</label>

							<div class="form-error" v-if="!$v.details.minLength">Your ticket must have at least {{ $v.details.$params.minLength.min }} characters!</div>
							<div class="form-error" v-if="!$v.details.maxLength">Your ticket can't have more than {{ $v.details.$params.maxLength.max }} characters!</div>

							<div class="uk-form-controls">
								<div class="uk-inline uk-width-1-1" v-bind:class="{ 'error': !$v.details.minLength || !$v.details.maxLength }">
									<textarea v-model="details" ref="details" class="uk-input" id="details" name="details" placeholder="The details of your ticket..." :class="{ 'uk-form-danger': !$v.details.minLength || !$v.details.maxLength }"/>
								</div>
							</div>
						</div>

						<button class="uk-button uk-btn-green uk-margin" type="submit" @click.prevent.stop="submitTicket()">Create Ticket</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.uk-container {
		padding-bottom: 20px;
	}

	form textarea {
		height: 400px;
		line-height: 20px;
		padding: 10px 10px;
	}

	.page-section {
		padding: 20px;
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
	            title: "",
				details: "",
				ticketType: null,
				error: null
			}
		},
		head() {
			return {
				title: 'New Ticket'
			}
		},
		methods: {
	        submitTicket() {
				// reset the error field
				this.error = null;

				// process form for validation issues and cancel if the form is invalid
				this.$v.$touch();
				if (this.$v.$invalid) {
				    this.error = "The form is invalid!";
					return;
				}

	            this.$axios.post('/user/tickets/create', {
	                'title': this.title,
					'details': this.details,
					'ticket_type': this.ticketType,
				}).then(response => {
				    if (response.status === 201) {
						this.$router.push({ name: 'support-tickets-id', params: { id: response.data.id } });
					}
				}).catch(error => {
				    this.error = error.response.data;
				});
			}
		}
	}
</script>
