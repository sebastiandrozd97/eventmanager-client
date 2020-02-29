<template>
  <div id="signin">
    <div class="whole-signin">
      <div class="signin-form">
        <div class="signin-logo">
          <img src="../assets/img/logo-dark.svg" alt="logo" />
        </div>
        <div class="signin-welcome">
          <h5>Welcome!</h5>
          <small class="form-text text-muted">Sign up and organize your first event!</small>
        </div>
        <div>
          <form @submit.prevent="signup">
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" />
              <small v-if="feedback" class="form-text text-danger">{{ feedback }}</small>
              <small id="emailHelp" class="form-text text-muted">
                Already have an account?
                <router-link :to="{ name: 'SignIn' }">Sign in</router-link>
              </small>
            </div>
            <button type="submit" class="btn btn-primary">Sign up</button>
          </form>
        </div>
      </div>
      <div class="signin-photo"></div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/init';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  name: 'SignUp',
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      slug: null,
    };
  },
  methods: {
    signup() {
      if (this.email && this.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            db.collection('users')
              .doc(cred.user.uid)
              .set({
                gender: null,
                firstname: 'user',
                surname: '',
              })
              .then(() => {
                this.$router.push({ name: 'Events' });
              });
          })
          .catch(error => {
            this.feedback = error.message;
          });
      } else {
        this.feedback = 'You must enter all fields';
      }
    },
  },
};
</script>

<style lang="scss">

@import "../styles/signInAndOut.scss";

</style>
