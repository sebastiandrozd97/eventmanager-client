<template>
  <div id="index">
    <div class="whole-index">
      <div class="index-form">
        <div class="index-logo">
          <img src="../assets/img/logo-dark.svg" alt="logo" />
        </div>
        <div class="index-welcome">
          <h5>Welcome!</h5>
          <small id="emailHelp" class="form-text text-muted">Ready to plan your next event?</small>
        </div>
        <div>
          <form @submit.prevent="signin">
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" />
              <small v-if="feedback" id="emailHelp" class="form-text text-danger">{{ feedback }}</small>
              <small class="form-text text-muted">
                Doesn't have an account yet?
                <router-link class="login-register" :to="{ name: 'SignUp' }">Sign up</router-link>
              </small>
              <small class="form-text text-muted modal-pwd-reset">
                <span>
                  <ModalResetPassword />
                </span>?
              </small>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
      <div class="index-photo"></div>
    </div>
  </div>
</template>

<script>
import ModalResetPassword from '@/components/ModalResetPassword';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  name: 'Index',
  components: {
    ModalResetPassword,
  },
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    async signin() {
      if (this.email && this.password) {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password);
          this.$router.push({ name: 'Events' });
        } catch (e) {
          this.feedback = e.message;
        }
      } else {
        this.feedback = 'You must enter all fields';
      }
    },
  },
};
</script>

<style lang="scss">
#index {
  width: 100vw;
  height: 100vh;
  background: #c9c9c9;
  padding-top: 10vh;
}

.whole-index {
  width: 70vw;
  height: 80vh;
  margin: auto;
  box-shadow: 5px 10px 8px #888888;
  display: flex;
}

.index-form {
  width: 50%;
  height: 100%;
  padding-top: 3%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  background: #fcfcfc;

  .index-logo {
    height: 10%;
  }

  .index-welcome {
    margin-top: 5vh;
    span {
      font-size: 0.8em;
    }
    height: 20%;
  }

  form {
    height: 70%;
    width: 70%;
    margin: auto;
    text-align: left;
  }
}

.index-photo {
  width: 50%;
  height: 100%;
  background-image: url('../assets/img/party.jpg');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.modal-pwd-reset {
  display: flex;
  flex-direction: row;
}
</style>
