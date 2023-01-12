<template>
	<div id="layout" class="dark">
		<Header/>
		<div id="page">
			<nuxt/>
		</div>
		<Footer/>
	</div>
</template>

<style>
	#layout.dark {
		background: #161a1d;
	}

	#layout.dark #header {
		background: #161a1d !important;
		border-bottom: 1px solid #2F3A40 !important;
	}

	#layout.dark #header .uk-navbar-nav > li > a {
		color: #fff !important;
	}

	#layout.dark #header .menu-button i {
		color: #fff !important;
	}

	#layout.dark #header .username-wrapper .username {
		color: #fff !important;
	}

	#layout.dark #header .username-label {
		color: #666 !important;
		text-shadow: none;
	}

	#layout.dark #header .username {
		color: #fff;
		text-shadow: 1px 0 2px #212121;
	}
</style>

<script>
    export default {
        name: "App",
    };
</script>
