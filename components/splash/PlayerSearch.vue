<template>
	<div class="player-lookup">
		<div class="lookup-title">
			<i class="fas fa-search"></i>
			<h1>Find a player</h1>
		</div>

		<PlayerLookup/>

		<div class="hero__or">or</div>

		<div class="leaders">
			<a class="uk-button uk-btn-yellow lb-button" href><i class="fas fa-trophy"></i> <span>View Leaderboards</span></a>
		</div>
	</div>
</template>

<style scoped>
	.player-lookup {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 75%;
		margin: 0 auto;
	}

	.player-lookup .leaders > a > i {
		margin-right: 3px;
	}

	.player-lookup .search {
		width: 100%;
	}

	.player-lookup .lookup-title {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.player-lookup .lookup-title h1 {
		display: inline-block;
		margin: 0;
		font-size: 44px;
		font-weight: bold;
		font-family: "Rajdhani", sans-serif;
		text-transform: uppercase;
	}

	.player-lookup .lookup-title .fas {
		display: inline-block;
		margin-right: 8px;
		font-size: 25px;
	}

	.player-lookup .lookup-title h1,
	.player-lookup .lookup-title .fas {
		color: #fff;
		text-shadow: 0 1px 3px #000;
		line-height: 44px;
	}

	.hero__or {
		position: relative;
		display: flex;
		width: 100%;
		margin: 1rem 0;
		align-items: center;
		justify-content: center;
		color: hsla(0, 0%, 100%, 0.85);
		font-weight: bold;
		font-family: "Rajdhani", sans-serif;
		text-transform: uppercase;
	}

	.hero__or:before {
		display: block;
		border-top: 1px solid hsla(0, 0%, 100%, 0.25);
		content: "";
		width: 30%;
		margin-right: 1.5rem;
	}

	.hero__or:after {
		display: block;
		border-top: 1px solid hsla(0, 0%, 100%, 0.25);
		content: "";
		width: 30%;
		margin-left: 1.5rem;
	}

	.lb-button {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2px;
		box-shadow: 0 1px 3px #906e00;
		font-size: 14px;
		font-weight: bold;
		text-transform: uppercase;
		text-shadow: 1px 0 2px #212121;
		line-height: 13px;
		padding: 12px 18px;
	}

	.lb-button .fas {
		margin-right: 7px !important;
	}
</style>

<script>
	export default {

	}
</script>
