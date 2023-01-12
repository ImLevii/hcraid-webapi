<template>
	<div class="search-menu">
		<label v-if="searchEnabled" ref="search-input">
			<i class="fas fa-search search-icon"></i>

			<input v-model="searchInput" v-on:input="onInputChange" type="text" class="uk-animation-fade" placeholder="Search players"/>

			<button class="close-icon" @click="toggleSearch">
				<i class="fas fa-times"></i>
			</button>
		</label>

		<button v-if="!searchEnabled" ref="search-button" class="menu-button search-button" @click="toggleSearch">
			<i class="fas fa-search" style="position: relative; top: 2px"></i>
		</button>

		<div v-if="searchEnabled && searchResults" ref="search-results" class="search-results">
			<ul>
				<li v-for="result in searchResults">
					<PlayerAvatar :uuid="result.uuid" :username="result.username"/>
					<PlayerLink :uuid="result.uuid" :username="result.username"/>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
	.search-menu {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search-menu .search-button > i.fas {
		color: #666;
		font-size: 18px !important;
	}

	.search-menu > label {
		position: relative;
	}

	.search-menu > label > input {
		height: 24px;
		border: 1px solid #a9b1b5;
		border-radius: 3px;
		padding: 0 10px 0 30px;
	}

	.search-menu > label > input::-webkit-input-placeholder {
		font-size: 13px;
		font-style: italic;
	}
	.search-menu > label > input:-moz-placeholder {
		font-size: 13px;
		font-style: italic;
	}
	.search-menu > label > input::-moz-placeholder {
		font-size: 13px;
		font-style: italic;
	}
	.search-menu > label > input:-ms-input-placeholder {
		font-size: 13px;
		font-style: italic;
	}

	.search-menu > label > .search-icon,
	.search-menu > label > .close-icon {
		position: absolute;
		z-index: 999;
		color: #666;
	}

	.search-menu > label > .search-icon {
		top: calc(50% - 6px); /* 50% - (height of div + offset for alignment) */
		left: 8px;
		font-size: 13px;
	}

	.search-menu > label > .close-icon {
		top: calc(50% - 12px); /* 50% - (height of div + offset for alignment) */
		right: 8px;
	}

	.search-menu > label > .close-icon > i.fas {
		font-size: 13px;
	}

	.search-menu > .search-results {
		position: absolute;
		top: 30px;
		left: 0;
		width: 100%; /* borders maybe? */
		background: #fff;
		border: 1px solid #a9b1b5;
		border-radius: 2px;
		box-sizing: border-box;
    	box-shadow: 0 1px 1px rgba(5, 5, 5, .19);
	}

	.search-menu > .search-results > ul {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.search-menu > .search-results > ul > li {
		display: flex;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid #DFE7EB;
	}

	.search-menu > .search-results > ul > li:last-child {
		border-bottom: none;
	}

	.search-menu > .search-results > ul > li > a {
		font-size: 13px;
		font-weight: bold;
		line-height: 12px;
	}
</style>

<style>
	.search-menu > .search-results > ul > li .player-avatar {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}
</style>

<script>
    export default {
        data() {
            return {
                searchEnabled: false,
				searchInput: "",
				searchResults: null,
				lastFetch: null
			}
		},
		methods: {
            fetchResults() {
                const now = new Date().getTime();
				if (this.lastFetch == null || now >= this.lastFetch + 1000) {
					this.lastFetch = now;

					this.$axios.get('/player-search?query=' + this.searchInput).then(response => {
						if (response.status === 200) {
							this.searchResults = response.data;
						}
					}).catch(error => {
						if (error.response) {
							console.log(error.response);
						}
					});
				}
			},
            onInputChange() {
                if (this.searchInput.length >= 3) {
                    this.fetchResults();
				}
			},
            toggleSearch() {
                this.searchEnabled = !this.searchEnabled;
			}
		},
		mounted() {
			window.addEventListener('click', event => {

			});
        }
    }
</script>
