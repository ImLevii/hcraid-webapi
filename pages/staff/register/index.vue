<template>
  <div class="uk-container register uk-margin">
    <h2 class="page-title">Make an account</h2>

    <div class="guide">
      <div class="ui-steps">
        <div class="step">
          <i class="fas fa-sign-in-alt step-icon"></i>

          <div class="step-info">
            <span class="title">Connect</span>
            <span class="description">Connect to our server</span>
          </div>
        </div>

        <div class="step">
          <i class="fas fa-link step-icon"></i>

          <div class="step-info">
            <span class="title">Link MC Account</span>
            <span class="description"
              >Type the <code>/register</code> command</span
            >
          </div>
        </div>

        <div class="step">
          <i class="fas fa-envelope step-icon"></i>

          <div class="step-info">
            <span class="title">Activate Account</span>
            <span class="description"
              >Check your email to complete registration</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="content">
        <ul
          class="uk-subnav uk-subnav-pill"
          uk-switcher="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium"
          style="display: none"
        >
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
        </ul>
        <ul id="steps-tab" class="tab-wrapper uk-switcher" ref="tab-switcher">
          <li>
            <div class="uk-flex uk-flex-center uk-grid uk-width-100">
              <div class="uk-width-1-2@m v-margin">
                <h3 class="tab-title">Connect to HcRaid</h3>
                <p>
                  Creating an account is super simple and super fast, and only
                  requires a premium Minecraft account, and a working email
                  address.
                </p>
                <p>
                  To start the registration process, please connect to our
                  server using the address below. Go to the next step when
                  connected.
                </p>

                <code class="focused-code">play.hcraid.net</code>

                <a class="uk-button uk-btn-green" uk-switcher-item="next"
                  >Next Step</a
                >
              </div>
            </div>
          </li>
          <li>
            <div class="uk-flex uk-flex-center uk-grid uk-width-100">
              <div class="uk-width-1-2@m v-margin">
                <h3 class="tab-title">Link Your Minecraft Account</h3>
                <p>
                  The next step is to link your in-game account by registering
                  your email address. You can only link one email address to an
                  in-game account, and vice versa.
                </p>
                <p>
                  To register your email address, run the command below, but
                  replace <code>&lt;email&gt;</code> with your email address. Go
                  to the next step when completed.
                </p>
                <p>
                  If you registered the wrong email address, just wait a few
                  minutes and run the command again.
                </p>

                <code class="focused-code">/register &lt;email&gt;</code>

                <div class="buttons">
                  <a class="uk-button uk-btn-blue" uk-switcher-item="previous"
                    >Previous Step</a
                  >
                  <a class="uk-button uk-btn-green" uk-switcher-item="next"
                    >Next Step</a
                  >
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="uk-flex uk-flex-center uk-grid uk-width-100">
              <div class="uk-width-1-2@m v-margin">
                <h3 class="tab-title">Activate Account</h3>
                <p>
                  The next step is to activate your account by clicking on the
                  link in the email we just sent you.
                </p>
                <p>
                  If you didn't receive an email from us, make sure you check
                  your "Spam" inbox, and make sure you typed your email address
                  correctly.
                </p>

                <div class="buttons">
                  <a class="uk-button uk-btn-blue" uk-switcher-item="previous"
                    >Previous Step</a
                  >
                  <router-link
                    :to="{ name: 'login' }"
                    class="uk-button uk-btn-green"
                    >Login</router-link
                  >
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");

.register {
  margin-top: 10px;
  font-family: "Noto Sans", sans-serif;
}

.register .page-title {
  margin-bottom: 10px;
}

.register .guide {
  width: 100%;
}

.register > .content-wrapper {
  width: 100%;
}

.register > .content-wrapper .tab-title {
  margin: 0 0 10px;
  color: #333;
  font-size: 24px;
  font-weight: bold;
  line-height: 24px;
}

.register > .content-wrapper .buttons {
  display: flex;
}

.register > .content-wrapper .buttons > * {
  margin-right: 6px;
}

.register > .content-wrapper .buttons > *:last-child {
  margin-right: 0;
}

.register > .content-wrapper p {
  font-size: 17px;
  margin: 0 0 10px;
}

.register > .content-wrapper > .content {
  margin-bottom: 20px;
  padding: 40px;
  background: #fff;
  border: 1px solid #dfe7eb;
  border-radius: 0 0 4px 4px;
}

.register > .content-wrapper > .content .focused-code {
  display: block;
  margin: 0 auto;
  padding: 6px 7px;
  background: #212121;
  border-radius: 3px;
  color: #d13a28;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 1px 3px #000;
}
</style>

<script>
export default {
  middleware: "guest",
  head() {
    return {
      title: "Register",
    };
  },
};
</script>
