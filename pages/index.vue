<template>
  <div class="content">
    <div class="uk-container">
      <div class="brand">
        <img src="~assets/images/minexd-logo.png" />
        <!-- <span class="player-count">
          <span data-playercounter-ip="play.hcraid.net">0</span>
          RAIDERS ONLINE
        </span> -->
        <button
          @click="copyServerAddress()"
          class="copy-ip-btn"
          uk-tooltip="title: Click to copy the server address!"
        >
          <i
            class="fas fa-copy"
            style="position: relative; top: 1px; margin-right: 3px"
          ></i>
          <span>PLAY.HCRAID.NET</span>
          <p class="copy-popup uk-p uk-p-green" ref="copy-popup">
            Server address copied to clipboard!
          </p>
        </button>
        <div class="btn-list">
          <a href="https://discord.hcraid.net" class="icon-btn discord">
            <i class="fab fa-discord"></i>
          </a>

          <a href="https://twitter.com/HCRaidServers" class="icon-btn twitter">
            <i class="fab fa-twitter-square"></i>
          </a>

          <a href="https://www.youtube.com/c/Levix" class="icon-btn twitter">
            <i class="fab fa-youtube-square"></i>
          </a>
        </div>
      </div>

      <div
        class="uk-width-100 uk-flex uk-flex-center"
        style="margin: 40px 0 20px 0"
      >
        <span class="page-title invert" style="width: auto; margin: 0"
          >Check out our games</span
        >
      </div>

      <GameList :servers="servers" :groups="groups" />

      <div
        class="uk-width-100 uk-flex uk-flex-center"
        style="margin: 40px 0 20px 0"
      >
        <span class="page-title invert" style="width: auto; margin: 0"> </span>
      </div>

      <div v-if="announcements != null" class="announcements">
        <div v-for="announcement in announcements" class="announcement">
          <div class="announcement-header">
            <PlayerAvatar :user="announcement.created_by" />

            <div class="announcement-details">
              <ThreadLink class="page-title" :thread="announcement" />

              <span class="announcement-timestamp">
                Posted by <PlayerLink :user="announcement.created_by" /> &bull;
                <DateDisplay :timestamp="announcement.created_at" />
              </span>
            </div>
          </div>

          <hr />

          <div
            class="rendered-post"
            v-html="$md.render(announcement['content'])"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  padding: 50px 0;
  color: #fff;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.brand img {
  width: 220px;
  height: 260px;
}

.brand .player-count {
  margin-top: 10px;
  font-family: "Rajdhani", sans-serif;
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0 1px 1px rgba(5, 5, 5, 0.3);
  line-height: 18px;
}

.brand .player-count strong {
  text-decoration: underline;
}

.brand .copy-ip-btn {
  display: block;
  width: 350px;
  padding: 7px;
  margin-top: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.19);
  border-radius: 7px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  font-family: "Rajdhani", sans-serif;
  text-shadow: 0 1px 1px rgba(5, 5, 5, 0.3);
  transition: background-color 0.25s ease-in-out;
}

.brand .copy-ip-btn:hover {
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.brand .copy-ip-btn .copy-popup {
  position: absolute;
  display: none;
  opacity: 0;
  bottom: -30px;
  z-index: 1000;
  width: 300px;
  padding: 6px;
  font-size: 13px;
  line-height: 12px;
}

.btn-list {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.btn-list .icon-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  opacity: 0.99;
}

.btn-list .icon-btn:last-child {
  margin-right: 0;
}

.btn-list .icon-btn > * {
  display: block;
}

.btn-list .icon-btn i {
  display: flex;
  align-items: center;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  font-size: 48px;
  color: rgb(225, 225, 225);
  text-shadow: 0 1px 3px rgba(5, 5, 5, 0.3);
  transition: color 0.15s ease-in-out;
}

.btn-list .icon-btn i:hover {
  color: rgb(255, 255, 255);
}

.btn-list .icon-btn i.fa-discord {
  position: relative;
  top: 2px;
  font-size: 46px;
}

.btn-list .icon-btn span {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  color: #fff;
  font-family: "Rajdhani", sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(5, 5, 5, 0.2);
  text-align: left;
}

.btn-list .icon-btn span,
.btn-list .icon-btn i {
  transition: background-color 0.15s ease-in-out;
}

.announcements > .announcement {
  padding: 20px;
  background: #fff;
  border: 1px solid #dfe7eb;
  border-radius: 3px;
  box-shadow: 0 1px 10px rgba(5, 5, 5, 0.5);
}

.announcements > .announcement > hr {
  margin: 10px 0;
}

.announcements > .announcement > .announcement-header {
  display: flex;
}

.announcements > .announcement > .announcement-header > .announcement-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 10px;
}

.announcements
  > .announcement
  > .announcement-header
  > .announcement-details
  > .page-title {
  margin-bottom: 2px;
  line-height: 14px;
}

.announcements
  > .announcement
  > .announcement-header
  > .announcement-details
  > .announcement-timestamp {
  display: block;
  color: #666;
  font-size: 13px;
  line-height: 13px;
}

.announcements > .announcement > .rendered-post {
  max-height: 596px;
  overflow: hidden;
}
</style>

<style>
.splash {
  background-size: cover !important;
  background: #191919 url("~assets/images/experiment3.jpg") no-repeat center;
  background-size: 100%;
}

.splash #header {
  background: transparent;
  border-bottom: none;
  box-shadow: none;
}

.splash #navbar .uk-navbar-nav > li > a {
  color: #fff;
  transition: opacity 0.15s ease-in-out, color 0.15s ease-in-out;
  opacity: 0.85;
}

.splash #navbar .uk-navbar-nav > li > a:hover {
  color: #fff;
  opacity: 1;
}

.splash .menu-button,
.splash .menu-button > i.fas {
  color: #fff !important;
  text-shadow: 1px 0 2px #212121;
}

.splash .username-wrapper .username {
  color: #fff !important;
}

.splash .username-label {
  color: #666 !important;
  text-shadow: none;
}

.splash .username {
  color: #fff;
  text-shadow: 1px 0 2px #212121;
}
</style>
<script src="util/counter.js"></script>
<script>
import { gsap } from "gsap";

export default {
  layout: "splash",
  async asyncData({ $axios }) {
    return await $axios
      .get("/announcements")
      .then((response) => {
        return { announcements: response.data };
      })
      .catch((error) => {
        return {};
      });
  },
  head() {
    return {
      title: "HcRaid",
      titleTemplate: "%s",
    };
  },
  data() {
    return {
      announcements: null,
      playerCount: 0,
      servers: {},
      groups: {},
      showTooltip: false,
    };
  },
  created() {
    this.playerCountUpdater = setInterval(() => {
      this.fetchServerInfo();
    }, 15000);
  },
  beforeDestroy() {
    this.destroyed = true;
    clearInterval(this.playerCountUpdater);
  },
  methods: {
    fetchServerInfo() {
      let ins = this;
      this.$axios
        .get("/servers/counts")
        .then((response) => {
          if (response.status === 200) {
            const previousCount = this.playerCount;

            ins.playerCount = response.data["player_count"];
            ins.servers = response.data["servers"];
            ins.groups = response.data["groups"];

            let animationData = { val: previousCount };

            gsap.to(animationData, {
              duration: 3,
              val: ins.playerCount,
              roundProps: "val",
              onUpdate: function () {
                if (ins.destroyed) {
                  return;
                }

                const playerCountElem = ins.$refs["player-count"];
                playerCountElem.innerHTML = animationData.val;
              },
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    },
    copyServerAddress() {
      this.$clipboard("PLAY.HCRAID.NET"); // copy to clipboard

      let element = this.$refs["copy-popup"];
      element.style.display = "block";

      gsap.to(element, {
        opacity: 1.0,
        duration: 1.0,
        onComplete: function () {
          element.style.opacity = 1.0;

          setTimeout(function () {
            gsap.to(element, {
              opacity: 0.0,
              duration: 1.0,
              onComplete: function () {
                element.style.display = "none";
                element.style.opacity = 0.0;
              },
            });
          }, 1000);
        },
      });
    },
  },
  mounted() {
    this.fetchServerInfo();
  },
};
</script>
