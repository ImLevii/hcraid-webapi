<template>
  <footer id="footer">
    <div class="uk-container">
      <div class="footer-content">
        <div class="brand">
          <img
            class="logo"
            :src="require('~/assets/images/865687973702271096.png')"
          />
          <p class="about-us">
            A Minecraft multiplayer network that makes it easy to connect with
            friends and have fun.
          </p>
        </div>
        <div class="uk-grid columns">
          <div class="uk-width-1-4@m">
            <div class="column">
              <div class="column-header">Explore</div>
              <nuxt-link :to="{ name: 'forums' }">Forums</nuxt-link>
              <nuxt-link :to="{ name: 'leaderboards' }">Leaderboards</nuxt-link>
              <a href="https://store.hcraid.net">Store</a>
            </div>
          </div>
          <div class="uk-width-1-4@m">
            <div class="column">
              <div class="column-header">Connect</div>
              <a href="https://www.twitter.com/HCRaidServers">Twitter</a>
              <a href="https://discord.hcraid.net">Discord</a>
              <a href="#">YouTube</a>
              <nuxt-link :to="{ name: 'partners' }">Partners</nuxt-link>
            </div>
          </div>
          <div class="uk-width-1-4@m">
            <div class="column">
              <div class="column-header">Jobs</div>
              <nuxt-link :to="{ name: 'jobs-developers' }"
                >Developers</nuxt-link
              >
              <nuxt-link :to="{ name: 'jobs-support' }">Support Desk</nuxt-link>
              <nuxt-link :to="{ name: 'jobs-artists' }"
                >Graphic Artists</nuxt-link
              >
            </div>
          </div>
          <div class="uk-width-1-4@m">
            <div class="column">
              <div class="column-header">Legal</div>
              <nuxt-link :to="{ name: 'legal-terms' }">Terms</nuxt-link>
              <nuxt-link :to="{ name: 'legal-privacy' }">Privacy</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright">
        &copy; Copyright HcRaid 2023. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
#footer {
  /*position: relative;*/
  bottom: 0;
  left: 0;
  width: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-top: auto;
  background: #060606;
  /*background: url('~assets/images/experiment6.png') 100% 45% no-repeat;*/
  background-size: cover;
  border-top: 2px solid #2f3a40;
}

#footer .uk-container {
  padding: 0 20px;
}

#footer .footer-content {
  display: flex;
}

#footer .footer-content .brand {
  width: 400px;
  margin-right: auto;
}

#footer .footer-content .brand .logo {
  display: block;
  width: 64px;
  height: 64px;
  margin-bottom: 30px;
}

#footer .footer-content .brand .about-us {
  font-size: 15px;
}

#footer .columns {
  flex-grow: 1;
}

#footer .columns > div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#footer .columns .column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#footer .columns .column .column-header {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-bottom: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 16px;
}

#footer .columns a {
  color: #666;
}

#footer .copyright {
  margin-top: 20px;
  font-weight: 300;
}

@media screen and (max-width: 960px) {
  #footer .footer-content {
    flex-direction: column;
  }

  #footer .columns {
    display: grid;
    min-height: 300px;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    margin-top: 20px;
  }

  #footer .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #footer .footer-content .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 0;
  }

  #footer .footer-content .brand .about-us {
    text-align: center;
  }

  #footer .footer-content .uk-grid > div {
    padding: 0 60px;
  }

  .copyright {
    text-align: center;
  }
}
</style>
