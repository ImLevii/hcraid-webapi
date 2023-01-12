<template>
  <div class="uk-container uk-animation-slide-top uk-margin">
    <div class="uk-flex uk-flex-center uk-width-100">
      <div class="register">
        <div class="register-header">
          <img src="~assets/images/minexd-logo.png" alt="HcRaid" />
        </div>
        <div class="register-body">
          <h2 class="page-title">Complete Registration</h2>

          <form class="register-form">
            <fieldset class="uk-fieldset">
              <p
                v-if="this.error"
                class="uk-p uk-p-red"
                style="margin-bottom: 10px"
              >
                {{ this.error }}
              </p>

              <div>
                <input
                  class="uk-input"
                  :class="{ 'uk-form-danger': this.errors.code }"
                  type="text"
                  name="code"
                  placeholder="Confirmation Code"
                  v-model="code"
                  autocomplete="off"
                />
              </div>

              <div class="uk-margin-s">
                <input
                  class="uk-input"
                  :class="{ 'uk-form-danger': this.errors.email }"
                  type="email"
                  name="email"
                  placeholder="Email"
                  v-model="email"
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
                <input
                  class="uk-input"
                  :class="{ 'uk-form-danger': this.errors.confirmPassword }"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  v-model="confirmPassword"
                  autocomplete="on"
                />
              </div>

              <div class="uk-margin-s">
                <label
                  ><input
                    class="uk-checkbox"
                    type="checkbox"
                    v-model="acceptedTerms"
                  />
                  I agree to the
                  <nuxt-link :to="{ name: 'legal-terms' }">terms</nuxt-link> and
                  <nuxt-link :to="{ name: 'legal-privacy' }"
                    >privacy policy</nuxt-link
                  >.</label
                >
              </div>

              <div class="uk-margin-s">
                <vue-recaptcha
                  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  size="normal"
                  sitekey="6LfBhOcjAAAAAFwDzcQ-DV_aaH2f30mdcLXiU_Uj"
                  class="g-recaptcha"
                />
              </div>

              <div class="uk-margin-s">
                <button
                  type="submit"
                  class="uk-button uk-btn-blue"
                  @click.stop.prevent="submit()"
                >
                  Complete Registration
                </button>
              </div>
            </fieldset>
          </form>
          <div class="form-options">
            <nuxt-link :to="{ name: 'login' }">Login</nuxt-link>
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");

.register {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  padding: 30px 0;
  font-family: "Noto Sans", sans-serif;
}

.register-header {
  position: relative;
  width: calc(100% - 80px);
  padding: 20px 40px;
  background-image: url("~assets/images/flame-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px 4px 0 0;
}

.register-header::after {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  content: "";
  border: 2px solid rgba(255, 255, 255, 0.16);
}

.register-header img {
  display: block;
  width: 160px;
  height: 80px;
  margin: 0 auto;
}

.register-body {
  min-width: 400px;
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

.register-body .register-form {
  min-width: 300px;
}

.register-body .register-form .uk-p-red {
  max-width: 300px;
}

.register-body .register-form button[type="submit"] {
  display: block;
  width: 100%;
}

.register-body .form-options {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.register-body .form-options a {
  font-size: 15px;
  line-height: 13px;
  text-transform: lowercase;
}

.register-body .form-options .link-divider {
  padding: 0 10px;
  color: #7d7d7d;
  line-height: 15px;
}

.register-body .page-title {
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
      title: "Register",
    };
  },
  async asyncData({ route }) {
    return {
      code: route.query.code || "",
    };
  },
  data() {
    return {
      code: "",
      email: "",
      password: "",
      confirmPassword: "",
      recaptchaToken: null,
      acceptedTerms: false,
      error: null,
      errors: {
        code: false,
        password: false,
        confirmPassword: false,
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

      if (!this.acceptedTerms) {
        this.error =
          "You need to accept the terms of service and privacy policy!";
        return;
      }

      this.$axios
        .post("/register/complete", {
          code: this.code,
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword,
          recaptchaToken: this.recaptchaToken,
        })
        .then((response) => {
          this.$refs.recaptcha.reset();

          if (response.status === 200) {
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          if (error.response) {
            switch (error.response.data) {
              case "PASSWORD_MISMATCH":
                this.error = "Your passwords don't match!";
                break;
              case "EMAIL_MISMATCH":
                this.error =
                  "The email you provided is not the email we sent the confirmation code to!";
                break;
              case "EMAIL_TAKEN":
                this.error =
                  "That email has already been registered to another account!";
                break;
              case "CODE_INVALID":
                this.error =
                  "That confirmation code is invalid! Make sure you've entered the correct code and try again.";
                break;
              case "CODE_EXPIRED":
                this.error =
                  "That confirmation code has expired! You can try again by going in-game and typing /register.";
                break;
              default:
                this.error = error.response.data;
                break;
            }
          } else {
            this.error = "Client error";
          }

          // this.$refs.recaptcha.reset();
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
