<template>
  <div id="signin">
    <div class="whole-signin">
      <div class="signin-form">
        <div class="signin-logo">
          <img src="../assets/img/logo-dark.svg" alt="logo" />
        </div>
        <div class="signin-welcome">
          <h5>Welcome!</h5>
          <small class="form-text text-muted">
            Ready to plan your next event?
          </small>
        </div>
        <div>
          <form @submit.prevent="signIn">
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
              />
              <small v-if="feedback" class="form-text text-danger">
                {{ feedback }}
              </small>
              <small class="form-text text-muted">
                Doesn't have an account yet?
                <router-link :to="{ name: 'SignUp' }">Sign up</router-link>
              </small>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
      <div class="signin-photo"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'signin',
  data() {
    return {
      email: null,
      password: null,
      feedback: '',
      token: null,
    };
  },
  methods: {
    async signIn() {
      if (this.email && this.password) {
        axios.request({
          url: `${process.env.VUE_APP_API_URL}/identity/login`,
          method: "post",
          data: {
            "email": this.email,
            "password": this.password
          }
        }).then(respose => {
          localStorage.setItem('accessToken', respose.data.token);
          this.$router.push({ name: 'Events' });
        }).catch(error => {
          error.response.data.errors.forEach(error => {
            this.feedback += error;
          });
        });
      } else {
        this.feedback = 'You must enter all fields';
      }
    },
  },
};
</script>

<style lang="scss">
@import '../styles/auth.scss';

.modal-pwd-reset {
  display: flex;
  flex-direction: row;
}
</style>
