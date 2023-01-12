<template>
  <div class="uk-container uk-animation-slide-top uk-margin">
    <div class="uk-flex uk-flex-center uk-width-100">
      <div class="login">
        <div class="login-header">
          <img src="~assets/images/minexd-logo.png" alt="HcRaid" />
        </div>
        <div class="login-body">
          <h2 class="page-title">Login</h2>

          <form class="login-form">
            <fieldset class="uk-fieldset">
              <p v-if="this.error" class="uk-p uk-p-red uk-margin">
                {{ this.error }}
              </p>

              <div>
                <input
                  class="uk-input"
                  :class="{ 'uk-form-danger': this.errors.username }"
                  type="text"
                  name="username"
                  placeholder="Username / Email"
                  v-model="username"
                  autocomplete="on"
                />
              </div>

              <div class="uk-margin-s">
                <input
                  class="uk-input"
                  :class="{ 'uk-form-danger': this.errors.password }"
                  type="password"
                  name="password"
                  placeholder="Password"
                  v-model="password"
                  autocomplete="on"
                />
              </div>

              <div class="uk-margin-s">
                <vue-recaptcha
                  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  size="normal"
                  sitekey="6LduaOgjAAAAAFnnNaF8w6E_rmzguVNSx-eL2Q49"
                  class="g-recaptcha"
                />
              </div>

              <div class="uk-margin-s">
                <button
                  type="submit"
                  class="uk-button uk-btn-blue"
                  @click.stop.prevent="submit()"
                >
                  Login
                </button>
              </div>
            </fieldset>
          </form>
          <div class="form-options">
            <nuxt-link :to="{ name: 'register' }">Register</nuxt-link>
            <span class="link-divider">&bull;</span>
            <nuxt-link :to="{ name: 'user-forgot-password' }"
              >Forgot Password</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  min-width: 400px;
  padding: 30px 0;
  box-sizing: border-box;
}

.login .login-header {
  position: relative;
  width: calc(100% - 80px);
  padding: 20px 40px;
  background-image: url("~assets/images/flame-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px 4px 0 0;
}

.login .login-header::after {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  content: "";
  border: 2px solid rgba(255, 255, 255, 0.16);
}

.login .login-header img {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.login .login-body {
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  background: #fff;
  border: 1px solid #dfe7eb;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.login .login-form {
  width: 304px;
  margin-bottom: 0;
}

.login .login-form .uk-margin {
  margin-bottom: 10px !important;
}

.login .login-form .uk-margin:last-child {
  margin-bottom: 0 !important;
}

.login .login-form * + .uk-margin {
  margin-top: 10px !important;
}

.login .login-form input {
  border-radius: 3px;
  font-size: 14px;
}

.login .login-form button[type="submit"] {
  display: block;
  width: 100%;
}

.login .form-options {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.login .form-options a {
  font-size: 15px;
  line-height: 13px;
  text-transform: lowercase;
}

.login .form-options .link-divider {
  padding: 0 10px;
  color: #7d7d7d;
  line-height: 15px;
}

.login .uk-grid {
  margin-left: 0 !important;
}

@media screen and (max-width: 767px) {
  .login {
    width: 100%;
    padding: 0;
  }

  .uk-container .uk-flex {
    margin-left: 0 !important;
  }
}

.login-body .page-title {
  margin-bottom: 10px;
  text-align: center;
}
</style>

<script>
import VueRecaptcha from "vue-recaptcha";

export default {
  components: { VueRecaptcha },
  middleware: "guest",
  head() {
    return {
      title: "Login",
    };
  },
  data() {
    return {
      username: "",
      password: "",
      recaptchaToken: null,
      error: null,
      errors: {
        username: false,
        password: false,
      },
    };
  },
  methods: {
    async submit() {
      this.error = null;

      if (this.recaptchaToken == null) {
        this.error = "You need to complete the reCAPTCHA!";
        return;
      }

      await this.$auth
        .loginWith("local", {
          data: {
            email: this.username,
            password: this.password,
            recaptchaToken: this.recaptchaToken,
          },
        })
        .then(() => {
          this.$refs.recaptcha.reset();
          // window.location.href = '/'
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            this.error = error.response.data;
          } else {
            this.error = "Client error";
          }

          this.$refs.recaptcha.reset();
        });
    },
    async onCaptchaVerified(recaptchaToken) {
      this.recaptchaToken = recaptchaToken;
    },
    onCaptchaExpired: function () {
      this.recaptchaToken = null;
      this.$refs.recaptcha.reset();
    },
  },
};
</script>
