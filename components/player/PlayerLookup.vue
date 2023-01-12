<template>
	<div class="search">
		<form class="uk-search uk-search-default">
			<div class="head-preview">
				<!-- <img src="https://mc-heads.net/avatar/77e8431adfc542ab98e1e018e48a734b/50" /> -->
				<img :src="require('~/assets/images/unknown-player.png')"/>
			</div>
			<input class="uk-search-input" type="search" placeholder="Search..."/>
		</form>
	</div>
</template>

<style scoped>
	.search form {
		display: inline-flex;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}

	.search form,
	.search form > input {
		width: 100%;
	}

	.search form > input {
		display: inline-block;
		width: 100%;
		height: 60px;
		padding: 0 20px;
		background: #f7f7f7;
		border: 1px solid #111;
		border-left: none;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		color: #111;
		font-size: 16px;
		font-stretch: 100%;
	}

	.search form > input:focus {
		background: #f7f7f7;
	}

	.search .head-preview {
		display: inline-block;
		width: 68px;
		height: 60px;
		background: #111111;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	.search .head-preview > img {
		display: block;
		position: relative;
		top: 10px;
		left: 10px;
		width: 40px;
		height: 40px;
		border-radius: 4px;
	}
</style>
