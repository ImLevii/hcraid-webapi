<template>
  <div class="uk-container uk-margin">
    <div class="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
      <img class="brand" src="~assets/images/minexd-logo.png" alt="HcRaid" />

      <ul class="leaderboard-links">
        <!-- <li>
          <button
            v-bind:class="{ active: game === 'PRISON' }"
            @click="selectGame('PRISON')"
          >
            <span>Prison</span>
          </button>
        </li> -->
        <li>
          <button
            v-bind:class="{ active: game === 'FACTIONS' }"
            @click="selectGame('FACTIONS')"
          >
            <span>Factions</span>
          </button>
        </li>
        <li>
          <button
            v-bind:class="{ active: game === 'OVERKILL' }"
            @click="selectGame('OVERKILL')"
          >
            <span>OVERKILL</span>
          </button>
        </li>
        <!-- <li>
          <button
            v-bind:class="{ active: game === 'SKYWARS' }"
            @click="selectGame('SKYWARS')"
          >
            <span>Skywars</span>
          </button>
        </li>
        <li>
          <button
            v-bind:class="{ active: game === 'BEDWARS' }"
            @click="selectGame('BEDWARS')"
          >
            <span>Bedwars</span>
          </button>
        </li> -->
      </ul>
    </div>

    <div v-if="leaderboards == null" class="lb-loading">
      <div class=""></div>
    </div>
    <div v-else class="lb-list">
      <template v-if="getStructure.length === 0">
        <div
          class="uk-flex uk-flex-center uk-flex-column"
          style="padding: 100px 0"
        >
          <div uk-spinner></div>
        </div>
      </template>
      <div v-else v-for="row in getStructure" class="uk-grid uk-grid-match">
        <div v-for="leaderboard in row" class="uk-width-1-3@m">
          <div class="leaderboard shiny-border">
            <h1>{{ leaderboard.name }}</h1>

            <div class="lb-body">
              <div
                v-if="leaderboard.entries.length === 0"
                class="lb-entries-empty"
              >
                no entries
              </div>
              <ul v-else class="lb-entries">
                <li
                  v-for="entry in leaderboard.entries"
                  :key="index"
                  class="uk-animation-fade"
                >
                  <span class="lb-entry-rank">{{ entry.position }}.</span>

                  <PlayerAvatar
                    :uuid="entry.uuid"
                    :username="entry.displayName"
                  />
                  <PlayerLink :username="entry.displayName" />

                  <span
                    v-if="leaderboard.id === 'top-tokens'"
                    class="lb-entry-value"
                  >
                    {{ entry.value.toLocaleString() }} ⛃
                  </span>
                  <span
                    v-else-if="leaderboard.id === 'top-kills'"
                    class="lb-entry-value"
                  >
                    {{ entry.value.toLocaleString() }} kills
                  </span>
                  <span
                    v-else-if="leaderboard.id === 'top-rank'"
                    class="lb-entry-value"
                  >
                    rank {{ entry.value.toLocaleString() }}
                  </span>
                  <span
                    v-else-if="leaderboard.id === 'top-play-time'"
                    class="lb-entry-value"
                  >
                    {{ time.formatIntoAbbreviatedString(entry.value) }}
                  </span>
                  <span
                    v-else-if="leaderboard.id === 'top-blocks-mined'"
                    class="lb-entry-value"
                  >
                    {{ entry.value.toLocaleString() }} blocks
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brand {
  width: 300px;
  height: 140px;
  margin: 20px 0 10px 0;
}

.leaderboard-links {
  margin: 0 0 30px 0;
  padding: 0;
  list-style: none;
  display: flex;
}

.leaderboard-links > li {
  margin-right: 10px;
}

.leaderboard-links > li > button {
  position: relative;
  padding: 8px 30px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  color: #fff;
  font-family: "Rajdhani", sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(5, 5, 5, 0.5);
}

.leaderboard-links > li > button.active {
  position: relative;
  top: -1px;
  transform: scale(1.1);
  border: 2px solid rgba(255, 255, 255, 0.5);
  text-shadow: 0 1px 6px rgba(255, 255, 255, 0.3);
  margin-left: 10px;
  margin-right: 10px;
  transition: text-shadow 0.15s ease, margin-left 0.25s ease,
    margin-right 0.25s ease;
}

.leaderboard-links > li > button:hover {
  border: 2px solid rgba(255, 255, 255, 0.5);
  text-shadow: 0 1px 6px rgba(255, 255, 255, 0.3);
}

.leaderboard-links > li button span {
  opacity: 0.99;
}

@media screen and (max-width: 750px) {
  .lb-list .uk-grid {
    margin-top: 0;
  }

  .leaderboard-links {
    display: block;
  }

  .leaderboard-links > li {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .leaderboard {
    margin-bottom: 20px;
  }

  .leaderboard .lb-entry-value {
    font-size: 14px;
  }
}

/*.leaderboard-links > li button.prison-avatar {*/
/*	background-image: url('~assets/images/games/prison-avatar-desat.png');*/
/*}*/

/*.leaderboard-links > li button.prison-avatar.active {*/
/*	background-image: url('~assets/images/games/prison-avatar-blurred.png');*/
/*}*/

/*.leaderboard-links > li button.skyblock {*/
/*	background-image: url('~assets/images/games/islands-desat.png');*/
/*}*/

/*.leaderboard-links > li button.skyblock.active {*/
/*	background-image: url('~assets/images/games/islands-blurred.png');*/
/*}*/

/*.leaderboard-links > li button.battlegrounds {*/
/*	background-image: url('~assets/images/games/battlegrounds-desat.png');*/
/*}*/

/*.leaderboard-links > li button.battlegrounds.active {*/
/*	background-image: url('~assets/images/games/battlegrounds-blurred.png');*/
/*}*/

/*.leaderboard-links > li button.skywars {*/
/*	background-image: url('~assets/images/games/battlegrounds-desat.png');*/
/*}*/

/*.leaderboard-links > li button.skywars.active {*/
/*	background-image: url('~assets/images/games/battlegrounds-blurred.png');*/
/*}*/

/*.leaderboard-links > li button.bedwars {*/
/*	background-image: url('~assets/images/games/battlegrounds-desat.png');*/
/*}*/

/*.leaderboard-links > li button.bedwars.active {*/
/*	background-image: url('~assets/images/games/battlegrounds-blurred.png');*/
/*}*/

.uk-width-1-3 {
  border-radius: 3px;
}

.leaderboard {
  padding: 14px;
  border-radius: 3px;
  box-shadow: 0 1px 10px 1px rgba(5, 5, 5, 0.5);
  background-image: url("~assets/images/leaderboards-bg.png");
  background-size: cover;
  background-position: 50% 0;
}

.leaderboard h1 {
  margin: 0 0 8px 0;
  padding: 0;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  font-family: "Rajdhani", sans-serif;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(5, 5, 5, 0.3);
  text-align: center;
  line-height: 24px;
  opacity: 0.99;
}

.leaderboard > .lb-body {
  border: 1px solid rgba(5, 5, 5, 0.19);
  border-radius: 0 0 3px 3px;
}

.leaderboard > .lb-body > .lb-entries-empty {
  padding: 6px;
  background: rgba(55, 55, 55, 0.19);
  border: 2px solid rgba(5, 5, 5, 0.3);
  border-radius: 3px;
  margin-bottom: 4px;
  color: rgba(100, 100, 100);
  text-align: center;
  text-transform: lowercase;
}

.leaderboard > .lb-body > .lb-entries {
}

.leaderboard > .lb-body > .lb-entries > li {
  display: flex;
  align-items: center;
  padding: 6px;
  background: rgba(55, 55, 55, 0.19);
  border: 2px solid rgba(5, 5, 5, 0.3);
  border-radius: 3px;
  margin-bottom: 4px;
}

.leaderboard > .lb-body > .lb-entries > li:nth-child(odd) {
  background: rgba(55, 55, 55, 0.19);
}

.leaderboard > .lb-body > .lb-entries > li:nth-child(even) {
  background: rgba(45, 45, 45, 0.19);
}

.leaderboard > .lb-body > .lb-entries > li:last-child {
  margin-bottom: 0;
}

.leaderboard > .lb-body > .lb-entries > li > .lb-entry-rank {
  width: 30px;
  text-align: center;
}

.leaderboard > .lb-body > .lb-entries > li > .lb-entry-value {
  margin-left: auto;
  font-size: 13px;
}
</style>

<style>
@media screen and (max-width: 750px) {
  .leaderboard > .lb-body > .lb-entries > li .player-link {
    font-size: 16px;
  }
}

.leaderboard > .lb-body > .lb-entries > li .player-avatar {
  width: 24px;
  height: 24px;
  margin-right: 6px;
}

.leaderboard > .lb-body > .lb-entries > li .player-link {
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}

.leaderboards {
  padding-bottom: 20px;
  background-size: cover !important;
  background: #191919 url("~assets/images/experiment3.jpg") no-repeat center;
  background-size: 100%;
}

.leaderboards #header {
  background: transparent;
  border-bottom: none;
  box-shadow: none;
}

.leaderboards #navbar .uk-navbar-nav > li > a {
  color: #fff;
  transition: opacity 0.15s ease-in-out, color 0.15s ease-in-out;
  opacity: 0.85;
}

.leaderboards #navbar .uk-navbar-nav > li > a:hover {
  color: #fff;
  opacity: 1;
}

.leaderboards .username-wrapper .username {
  color: #fff !important;
}

.leaderboards .menu-button,
.leaderboards .menu-button > i.fas {
  color: #fff !important;
  text-shadow: 1px 0 2px #212121;
}

.leaderboards .username-label {
  color: #666 !important;
  text-shadow: none;
}

.leaderboards .username {
  color: #fff;
  text-shadow: 1px 0 2px #212121;
}
</style>

<script>
export default {
  layout: "leaderboard",
  async asyncData({ $axios, route }) {
    const game = route.query.game || "PRISON";
    return await $axios
      .get("/leaderboards?game=" + game)
      .then((response) => {
        if (response.status === 200) {
          return {
            game: game,
            leaderboards: response.data,
          };
        } else {
          return {};
        }
      })
      .catch((error) => {
        console.log(error);
        return {};
      });
  },
  head() {
    return {
      title: this.getGameName + " Leaderboards",
    };
  },
  data() {
    return {
      game: "PRISON",
      leaderboards: null,
      structure: [],
      time: require("~/assets/script/time.js"),
    };
  },
  methods: {
    selectGame(game) {
      this.game = game;
      this.updateURL();
      this.reloadLeaderboards();
    },
    updateURL() {
      this.$router.push({
        path: this.$nuxt.$route.path,
        query: { game: this.game },
      });
    },
    async reloadLeaderboards() {
      this.leaderboards = null;

      await this.$axios
        .get("/leaderboards?game=" + this.game)
        .then((response) => {
          if (response.status === 200) {
            this.leaderboards = response.data;
            this.compileStructure();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    compileStructure() {
      let structure = [];
      let current = [];

      for (let i = 0; i < this.leaderboards.length; i++) {
        let leaderboard = this.leaderboards[i];
        current.push(leaderboard);

        if (current.length >= 3) {
          structure.push(current);
          current = [];
        }
      }

      if (current.length !== 0) {
        structure.push(current);
      }

      this.structure = structure;
    },
  },
  computed: {
    getStructure: function () {
      return this.structure;
    },
    getGameName() {
      switch (this.game) {
        case "PRISON":
          return "Prison";
        case "SKYBLOCK":
          return "Skyblock";
        case "BATTLEGROUNDS":
          return "Battlegrounds";
        case "SKYWARS":
          return "Skywars";
        case "BEDWARS":
          return "Bedwars";
      }
    },
  },
  mounted() {
    this.compileStructure();
  },
};
</script>
