<template>
  <div id="header">
    <div class="uk-container">
      <nav class="uk-navbar-container" id="navbar" uk-navbar>
        <div class="uk-navbar-left">
          <div class="navbar-logo-container">
            <nuxt-link to="/">
              <img
                class="navbar-logo"
                src="~/assets/images/865687973702271096.png"
              />
            </nuxt-link>
          </div>
          <ul class="uk-navbar-nav">
            <li class="uk-nav-icon">
              <!-- <nuxt-link to="/forums/">
                <i class="fas fa-comments"></i>
                <span class="name">Forums</span>
              </nuxt-link> -->
            </li>
            <li class="uk-nav-icon">
              <a href="https://stats.hcraid.net/stats">
                <!--								<i class="fas fa-comments"></i>-->
                <span class="name">Leaderboards</span>
              </nuxt-link>
            </li>
            <li class="uk-nav-icon">
              <nuxt-link to="/support/">
                <!--								<i class="far fa-life-ring"></i>-->
                <span class="name">Support</span>
              </nuxt-link>
            </li>
            <li class="uk-nav-icon">
              <a href="https://hcraid.net/wiki">
                <!--<i class="fas fa-credit-card"></i>-->
                <span class="name">WIKI</span>
              </a>
            </li>
            <li class="uk-nav-icon">
              <a href="https://store.hcraid.net">
                <!--								<i class="fas fa-credit-card"></i>-->
                <span class="name">Store</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="uk-navbar-right">
          <template v-if="this.$auth.loggedIn">
            <UserRender />
            <SearchMenu />
            <NotificationsMenu />
            <FriendsMenu
              :friends="this.$store.getters['friendsList/getFriends']()"
            />
            <UserMenu />
            <StaffMenu v-if="this.$auth.user.rank.staff" />
          </template>
          <template v-else>
            <SearchMenu />
          </template>

          <ul v-if="!this.$auth.loggedIn" class="uk-navbar-nav">
            <!-- <li>
              <nuxt-link :to="{ name: 'login' }">Login</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ name: 'register' }">Register</nuxt-link>
            </li> -->
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<style>
#header .dropdown-pane {
  min-width: 220px;
  z-index: 999;
  position: absolute;
  background: #fff;
  border: 1px solid #d2d4d7;
  border-radius: 3px;
  padding: 0;
}

#header .dropdown-menu .menu-links {
  margin-bottom: 0;
}

#header .dropdown-menu .menu-links li {
  width: 100%;
  padding: 4px 20px;
  border-bottom: 1px solid #f5f8fa;
  box-sizing: border-box;
}

#header .dropdown-menu .menu-links li a {
  color: #6f6f6f;
  font-size: 14px;
}

#header .dropdown-menu .menu-links > li:nth-child(n + 2),
#header .dropdown-menu .menu-links > li > ul {
  margin-top: 0;
}

#header .dropdown-menu .menu-links > li:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

#header .dropdown-menu .menu-links > li:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

@media screen and (max-width: 959px) {
  #header .dropdown-menu {
    display: flex;
    justify-content: center;
  }
}
</style>

<style scoped>
#header {
  width: 100%;
  background: #fff;
  background-size: cover;
  border-bottom: 1px solid #dfe7eb;
  box-shadow: 0 1px 4px rgba(5, 5, 5, 0.1);
  padding: 20px 0;
  z-index: 998;
}

#header .uk-navbar-right > * {
  margin-right: 25px;
}

#header .uk-navbar-right > *:last-child {
  margin-right: 0;
}

#navbar {
  width: 100%;
  height: 60px;
  background: none;
  z-index: 998;
}

#navbar .uk-container {
  min-height: 100%;
}

#navbar .uk-navbar-nav {
  display: flex;
  justify-content: center;
}

/* Controls the spacing between navbar tabs */
#navbar .uk-navbar-nav > li {
  display: flex;
  margin-right: 32px;
}

#navbar .uk-navbar-nav > li:last-child {
  margin-right: 0;
}

#navbar .uk-navbar-nav > li > a {
  height: 32px;
  min-height: unset;
  padding: 0;
  color: #222;
  font-size: 16px;
  font-weight: 800;
  font-family: "Rajdhani", sans-serif;
  text-align: center;
  /*text-shadow: 0 1px 1px rgba(5, 5, 5, 0.19);*/
  letter-spacing: 1px;
  line-height: 16px;
  transition: color ease-in-out 0.15s;
  opacity: 0.75;
}

#navbar .uk-navbar-nav > li > a:hover {
  color: #a6120f;
}

#navbar .uk-navbar-nav > li > a.nuxt-link-active {
  color: #a6120f;
}

#navbar .uk-navbar-nav > li > a > i {
  display: inline-block;
  height: 32px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  color: #fff;
  line-height: 32px;
}

#navbar .navbar-logo-container .navbar-logo {
  width: 50px;
  height: 50px;
  margin-right: 1px;
}

@media screen and (max-width: 540px) {
  #navbar .uk-navbar-nav {
    flex-direction: column;
    align-items: center;
  }

  #navbar .uk-navbar-nav > li {
    margin-right: 0;
  }
}

@media screen and (max-width: 959px) {
  #navbar {
    flex-direction: column;
    height: auto;
  }

  #navbar .navbar-logo {
    display: block;
    margin: 0 auto;
    margin-right: auto !important;
  }

  #navbar .uk-navbar-left,
  #navbar .uk-navbar-right {
    display: block;
    width: 100%;
  }

  #navbar .uk-navbar-left {
    margin-right: 0;
  }

  #navbar .uk-navbar-right {
    margin-left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #navbar .navbar-logo-container {
    display: flex;
    flex-direction: column;
  }
}
</style>

<script>
export default {};
</script>
