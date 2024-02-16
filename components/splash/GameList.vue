<template>
  <div class="games-list">
    <div class="uk-grid uk-grid-match">
      <div class="uk-width-1-2@m">
        <div class="game factions">
          <div class="content">
            <div class="info">
              <div class="name">
                <h1>Factions</h1>
                <div
                  class="presence"
                  v-bind:class="{ online: isFactionsOnline }"
                >
                  <div class="inner"></div>
                </div>
              </div>
              <div class="details">
                <div class="players">
                  <div v-if="isFactionsOnline">
                    {{ this.servers["factions"]["players"] }}
                    /
                    {{ this.servers["factions"]["slots"] }} Players
                  </div>
                  <!-- <div v-else>Next Map Reset - {{ timer }}</div> -->
                </div>

                <p class="description"></p>
                <!--HcRaid Survival is the perfect server for practicing your PvE
                and PvP skills. -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-width-1-2@m">
        <div class="game overkill">
          <div class="content">
            <div class="info">
              <div class="name">
                <h1>OVERKILL</h1>
                <div
                  class="presence"
                  v-bind:class="{ online: isOverkillOnline }"
                >
                  <div class="inner"></div>
                </div>
              </div>
              <div class="details">
                <div class="players">
                  <div v-if="isOverkillOnline">
                    {{ this.servers["overkill"]["players"] }}
                    /
                    {{ this.servers["overkill"]["slots"] }} Players
                  </div>
                  <!-- <div v-else>Next Map Reset - April 19th @ 3:00PM EST</div> -->
                </div>

                <p class="description">
                  HcRaid Overkill is no place for the weak. To survive, you have
                  to be smart, careful and be ahead of the others. Create your
                  team using "/clan". No land claims, no cannons just good old
                  fashioned PvP and raiding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-grid uk-grid-match">
      <div class="uk-width-1-2@m">
        <div class="game skyblock">
          <div class="content">
            <div class="info">
              <div class="name">
                <h1>Skyblock</h1>
                <div
                  class="presence"
                  v-bind:class="{ online: isSkyblockOnline }">
                  <div class="inner"></div>
                </div>
              </div>
              <div class="details">
                <div class="players">
                  <div v-if="isSkyblockOnline">
                    {{ this.groups["skyblock"]["players"] }}
                    /
                    {{ this.groups["skyblock"]["slots"] }} Players
                  </div>
                  <div v-else> </div>
                </div>

                <p class="description"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-width-1-2@m">
        <div class="game bedwars">
          <div class="content">
            <div class="info">
              <div class="name">
                <h1>COMING SOON</h1>

                <!-- <div
                  class="presence"
                  v-bind:class="{ online: isBedwarsOnline }">
                  <div class="inner"></div>
                </div> -->
              </div>
              <div class="details">
                <div class="players">
                  <div v-if="isBedwarsOnline">
                    {{ this.groups["bedwars"]["players"] }}
                    /
                    {{ this.groups["bedwars"]["slots"] }} Players
                  </div>
                  <div v-else>N/A</div>
                </div>

                <p class="description"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFactionsOnline: false,
      servers: {
        factions: {
          players: 0,
          slots: 100,
        },
      },
      timer: "n/a",
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      const resetTime = new Date("February 24th, 2023 15:00:00 EST");
      const currentTime = new Date();
      const timeDifference = resetTime - currentTime;

      if (timeDifference <= 0) {
        this.isFactionsOnline = true;
        return;
      }

      this.timer = this.formatTime(timeDifference);
      setTimeout(this.startTimer, 1000);
    },
    formatTime(ms) {
      const seconds = Math.floor((ms / 1000) % 60);
      const minutes = Math.floor((ms / 1000 / 60) % 60);
      const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    },
  },
};
</script>
<style scoped>
.games-list .game {
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 400px;
  padding: 14px;
  background-color: #222;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 1px solid #333;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 0 1px 10px rgba(5, 5, 5, 0.5);
}

.games-list .game:last-child {
  margin-bottom: 0;
}

.games-list .game::after {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  content: "";
  border: 2px solid rgba(155, 155, 155, 0.1);
}

.games-list .game.factions {
  background-image: url("~assets/images/games/islands-blurred.png");
  background-position: center;
}

.games-list .game.overkill {
  background-image: url("~assets/images/games/prison-avatar-blurred.png");
}

.games-list .game.skywars {
  background-image: url("~assets/images/games/caves-blurred.png");
}

.games-list .game.bedwars {
  background-image: url("~assets/images/games/caves-blurred.png");
}

.games-list .game > .content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.games-list .game > .content > .uk-grid {
  height: 100%;
}

.games-list .game > .content .info {
  width: 100%;
  padding: 10px;
}

.games-list .game > .content .info .name {
  display: flex;
  align-items: center;
  opacity: 0.99;
}

.games-list .game > .content .info .name > h1 {
  display: inline-block;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  font-family: "Rajdhani", sans-serif;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(5, 5, 5, 0.3);
  line-height: 24px;
  margin: 0;
}

.games-list .game > .content .info .details {
  display: flex;
  flex-direction: column;
  width: calc(100% - 20px);
  text-shadow: 0 1px 1px rgba(5, 5, 5, 0.3);
  line-height: 16px;
  opacity: 0.99;
}

.games-list .game > .content .info .details > div {
  display: flex;
  align-items: center;
}

.games-list .game > .content .info .details > .players {
  opacity: 0.99;
  margin-bottom: 10px;
  color: #f0f0f0;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
}

.games-list .game > .content .info .details > .description {
  opacity: 0.99;
  color: #e3e3e3;
  font-size: 16px;
}

.games-list .game > .content .info .presence {
  /*
  168, 5, 5, 0.5*/
  display: inline-block;
  background: rgba(19, 203, 25, 0.5);
  border-radius: 50%;
  padding: 2px;
  margin-left: 6px;
  margin-top: -2px;
}

.games-list .game > .content .info .presence > .inner {
  /*
  #a80505*/
  background: #13cb19;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.games-list .game > .content .info .presence.online {
  background: rgba(19, 203, 25, 0.5);
}

.games-list .game > .content .info .presence.online > .inner {
  background: #13cb19;
}

@media screen and (max-width: 640px) {
  .games-list > .uk-grid > div {
    margin-bottom: 30px;
  }

  .games-list > .uk-grid > div:last-child {
    margin-bottom: 0;
  }
}
</style>

<script>
export default {
  props: {
    servers: {
      type: Object,
      required: true,
    },
    groups: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isOverkillOnline: function () {
      return (
        this.servers.hasOwnProperty("overkill") &&
        this.servers["overkill"]["online"]
      );
    },
    isSkyblockOnline: function () {
      return (
        this.servers.hasOwnProperty("skyblock") &&
        this.servers["skyblock"]["online"]
      );
    },
    isFactionsOnline: function () {
      return (
        this.servers.hasOwnProperty("factions") &&
        this.servers["factions"]["online"]
      );
    },
    isSkywarsOnline: function () {
      return (
        this.groups.hasOwnProperty("skywars") &&
        this.groups["skywars"]["online"]
      );
    },
    isBedwarsOnline: function () {
      return (
        this.groups.hasOwnProperty("bedwars") &&
        this.groups["bedwars"]["online"]
      );
    },
  },
};
</script>
