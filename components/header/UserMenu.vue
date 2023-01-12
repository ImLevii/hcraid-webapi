<template>
	<div id="user-menu" class="dropdown-menu" ref="user-menu">
		<a class="dropdown-btn menu-button">
			<i class="fas fa-ellipsis-h"></i>
		</a>

		<div uk-dropdown="mode: click; pos: bottom-right" class="dropdown-pane" ref="user-menu-dropdown">
			<div class="dropdown-body">
				<ul class="uk-list menu-links">
					<li>
						<PlayerLink :username="this.$auth.user.username" @click.native="closeMenu()">My profile</PlayerLink>
					</li>
					<li>
						<nuxt-link :to="{ name: 'user-settings' }" @click.native="closeMenu()">Settings & privacy</nuxt-link>
					</li>
					<li>
						<nuxt-link :to="{ name: 'support-tickets' }" @click.native="closeMenu()">My tickets</nuxt-link>
					</li>
					<li>
						<a type="button" @click.stop.prevent="logout()">Logout</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>

<script>
    export default {
        data() {
			return {

			}
		},
		methods: {
			async logout() {
				await this.$auth.logout();
				window.location.href = '/'
			},
			closeMenu() {
			    if (this.$refs['user-menu-dropdown'] !== undefined) {
                    window.UIkit.dropdown(this.$refs['user-menu-dropdown']).hide();
                }
			}
		},
		mounted() {
			window.addEventListener('click', event => {
			    if (this.$refs['user-menu'] !== undefined) {
					if (!this.$refs['user-menu'].contains(event.target)) {
						window.UIkit.dropdown(this.$refs['user-menu-dropdown']).hide();
					}
				}
			});
		}
	}
</script>
