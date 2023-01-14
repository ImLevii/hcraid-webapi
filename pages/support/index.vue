<template>
  <div>
    <div class="uk-container uk-margin">
      <div class="uk-grid uk-grid-match">
        <div class="uk-width-1-2@m">
          <div class="panel support-tickets uk-flex uk-flex-column">
            <div class="panel-background">
              <!--	<img src="~assets/images/minexd-logo.png"></i>-->
            </div>

            <span class="page-title">Support Tickets</span>
            <span class="page-desc"
              >Contact our support team for general enquiries, payment issues,
              account suspensions, and bug reports.</span>

            <div class="panel-content">
              <ul class="ticket-icons uk-margin">
                <li>
                  <i class="fas fa-envelope"></i>
                </li>
                <li>
                  <i class="fas fa-shopping-cart"></i>
                </li>
                <li>
                  <i class="fab fa-creative-commons-by"></i>
                  <!--									<i class="fas fa-user-slash"></i>-->
                </li>
                <li>
                  <i class="fas fa-bug"></i>
                </li>
              </ul>
            </div>

            <div class="panel-footer">
              <template v-if="this.$auth.loggedIn">
                <nuxt-link
                  :to="{ name: 'support-tickets' }"
                  class="uk-button uk-btn-blue"
                  >My Tickets</nuxt-link
                >
                <nuxt-link
                  :to="{ name: 'support-tickets-new' }"
                  class="uk-button uk-btn-blue"
                  >Create Ticket</nuxt-link
                >
              </template>
              <nuxt-link
                v-else
                :to="{ name: 'login' }"
                class="uk-button uk-btn-blue"
              >
                Login
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="uk-width-1-2@m">
          <div class="panel live-chat">
            <div class="panel-background">
              <!-- <img src="~assets/images/minexd-logo.png" /></i>-->
            </div>

            <span class="page-title">Live Chat (via Discord)</span>
            <span class="page-desc"
              >Talk to a member of our staff team in real-time via
              Discord.</span
            >

            <div class="panel-content">
              <a
                href="http://discord.hcraid.net"
                class="uk-margin discord-render"
              >
                <img
                  src="https://discordapp.com/api/guilds/805303622673891340/widget.png?style=banner3"
                  alt=""
                />
              </a>
            </div>

            <div class="panel-footer">
              <a
                class="uk-button uk-btn-green uk-margin"
                href="http://discord.hcraid.net"
                >Start Chatting</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-container uk-margin">
      <div class="page-section">
        <span class="page-title">Frequently Asked Questions</span>

        <ul uk-accordion="multiple: true" class="faq-list">
          <li>
            <a class="uk-accordion-title" @click="$event.preventDefault()">
              How can I register my account?
            </a>
            <div class="uk-accordion-content">
              <p>
                To register your account for website access, login to our
                Minecraft network and type <code>/register &lt;email&gt;</code>.
                An activation link will be sent to your email.
              </p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" @click="$event.preventDefault()">
              What do I do if I registered the wrong email?
            </a>
            <div class="uk-accordion-content">
              <p>
                If you typed the wrong email address when registering, just wait
                5 minutes and try again.
              </p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" @click="$event.preventDefault()">
              How can I appeal an account suspension?
            </a>
            <div class="uk-accordion-content">
              <p>
                Some types of suspensions cannot be appealed. If you are able to
                appeal, you can create a support ticket
                <nuxt-link :to="{ name: 'support-tickets-new' }">here</nuxt-link
                >.
              </p>
            </div>
          </li>
          <li>
            <a class="uk-accordion-title" @click="$event.preventDefault()">
              How can I report a player?
            </a>
            <div class="uk-accordion-content">
              <p>
                If you think a player is breaking the rules, you can report them
                in-game by typing
                <code>/report &lt;player&gt; &lt;reason&gt;</code>, or on our
                website by creating a support ticket.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 960px) {
  .uk-grid > div:first-child {
    margin-bottom: 20px;
  }

  .panel .panel-background img {
    width: 75%;
    height: 75%;
  }
}

.page-section {
  padding: 20px;
}

.panel {
  position: relative;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 0 1px 7px rgba(5, 5, 5, 0.2);
  color: #fff;
  z-index: 997;
}

.panel.support-tickets {
  background: #3a96d5;
  border: 1px solid #2c81ba;
}

.panel.live-chat {
  background: #48cc83;
  border: 1px solid #3dae70;
}

/*.panel .page-title {*/
/*	padding-bottom: 6px;*/
/*}*/

/*.panel.support-tickets .page-title {*/
/*	border-bottom: 2px solid #2C81BA;*/
/*}*/

/*.panel.live-chat .page-title {*/
/*	border-bottom: 2px solid #3DAE70;*/
/*}*/

.panel .page-title {
  color: #fff;
  text-shadow: 0 1px 3px rgba(5, 5, 5, 0.3);
}

.panel .panel-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  z-index: 998;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel .panel-background img {
  width: 100%;
  height: 100%;
}

.panel .panel-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.panel .panel-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel .uk-button {
  padding: 12px 16px;
  margin-right: 10px;
}

.panel .uk-button:last-child {
  margin-right: 0;
}

.panel.support-tickets .ticket-icons {
  list-style: none;
  padding: 0;
  z-index: 999;
}

.panel.support-tickets .ticket-icons li {
  display: inline-block;
  padding: 0 10px;
}

.panel.support-tickets .ticket-icons li i {
  font-size: 34px;
  text-shadow: 0 2px 2px rgba(5, 5, 5, 0.3);
}

.panel.live-chat .discord-render {
  z-index: 999;
}

.panel.live-chat .discord-render a {
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 1px 4px rgba(5, 5, 5, 0.3);
}

.faq-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.faq-list li {
  position: relative;
  margin-top: 10px;
  padding-left: 30px;
}

.faq-list li > a::before {
  position: absolute;
  top: 5px;
  left: -6px;
  background-image: none;
  font-family: "Font Awesome 5 Pro";
  font-size: 15px;
  content: "\f061";
}

.faq-list li.uk-open > a::before {
  content: "\f063";
}

.uk-accordion-content {
  margin-top: 0;
}
</style>

<script>
export default {
  head() {
    return {
      title: "Support",
    };
  },
};
</script>
