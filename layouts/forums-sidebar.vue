<template>
	<div id="layout">
		<Header/>

		<div id="page">
			<div class="uk-container forums uk-margin">
				<div class="uk-grid uk-grid-medium">
					<div class="uk-width-3-4@m uk-margin">
						<nuxt/>
					</div>
					<div class="uk-width-1-4@m uk-margin">
						<Sidebar :slots="1">
							<template slot="slot-1">
								<div class="page-title small" style="margin-bottom: 6px">Recent Posts</div>
								<div class="body">
									<RecentPosts/>
								</div>
							</template>
						</Sidebar>
					</div>
				</div>
			</div>
		</div>

		<Footer/>
	</div>
</template>

<style scoped>
	.uk-container {
		padding-bottom: 20px;
	}
</style>

<script>
    export default {
        name: "App",
    };
</script>
