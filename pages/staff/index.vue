<template>
    <div class="uk-container uk-margin">
        <div class="page-section">
            <span class="page-title">Staff</span>

			<div v-if="staff != null" class="staff page-section">
				<div v-for="rank in staff" class="rank-group">
					<h3 class="rank-title" :style="{ color: convertGameColor(rank.meta.displayColor) }">{{ rank.meta.displayName }}</h3>
					<div class="rank-members" :style="{ 'border-top-color': convertGameColor(rank.meta.displayColor) }">
						<div v-for="entry in rank.entries" class="entry">
							<img :src="'https://visage.surgeplay.com/full/' + entry.uuid + '?tilt=0'" :alt="entry.name" />
							<span class="username">{{ entry.name }}</span>
							<span class="player-tag" :style="{ 'background-color': convertGameColor(rank.meta.displayColor) }">{{ rank.meta.displayName }}</span>
						</div>
					</div>
				</div>
			</div>
        </div>
	</div>
</template>

<style scoped>
	.page-section {
		padding: 20px;
	}

	.staff .rank-group {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-bottom: 30px;
	}

	.staff .rank-group:last-child {
		margin-bottom: 0;
	}

	.staff .rank-group .rank-title {
		display: block;
		padding: 10px 16px 6px 0;
		font-size: 24px;
		line-height: 26px;
		text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8) !important;
	}

	.staff .rank-group .rank-members {
		padding: 20px;
		background: #0E0E0E;
		border: 1px solid #0c0c0c;
		border-top: 2px solid;
	}

	.staff .rank-group .rank-members .entry {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		width: 150px;
		margin-right: 50px;
	}

	.staff .rank-group .rank-members .entry > * {
		display: block;
	}

	.staff .rank-group .rank-members .entry > img {
		width: 95px;
		height: 154px;
	}

	.staff .rank-group .rank-members .entry > .username {
		margin-top: 6px;
		font-size: 20px;
		text-align: center;
	}

	.staff .rank-group .rank-members .entry > .player-tag {
		display: inline-block;
	}
</style>

<script>
    const colorMap = {
        "a": "#55FF55",
        "b": "#55FFFF",
        "c": "#FF5555",
        "d": "#FF55FF",
        "e": "#FFFF55",
        "f": "#FFFFFF",
        "0": "#000000",
        "1": "#0000AA",
        "2": "#00AA00",
        "3": "#00AAAA",
        "4": "#AA0000",
        "5": "#AA00AA",
        "6": "#FFAA00",
        "7": "#AAAAAA",
        "8": "#555555",
        "9": "#5555FF",
	};

	function convertGameColor(gameColor) {
		return colorMap[gameColor[1]];
	}

	export default {
	    async asyncData({$axios}) {

        return await $axios
            .get('/staff/')
            .then(result => {
                console.log(result.data);
                return {
                    staff: result.data
                };
            })
            .catch(error => {
                console.log(error);
            });
		},
		data() {
			return {
				staff: null
			}
		},
		head() {
			return {
				title: "Staff"
			}
		},
		methods: {
	        convertGameColor(gameColor) {
	            return convertGameColor(gameColor)
			}
		}
	}
</script>
