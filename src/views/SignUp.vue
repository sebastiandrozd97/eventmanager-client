<template>
  <div id="index">
    <div class="whole-index">
      <div class="index-form">
        <div class="index-logo">
          <img src="../assets/img/logo-dark.svg" alt="logo">
        </div>
        <div class="index-welcome">
          <h5>Welcome!</h5>
          <small id="emailHelp" class="form-text text-muted">Sign up and organize your first event!</small>
        </div>
        <div>
          <form @submit.prevent="signup">
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password">
              <small v-if="feedback" id="emailHelp" class="form-text text-danger">{{ feedback }}</small>
              <small id="emailHelp" class="form-text text-muted">
                Already have an account? 
                <router-link class="login-register" :to="{ name: 'Index' }">
                  Sign in
                </router-link>
              </small>
            </div>
            <button type="submit" class="btn btn-primary">Sign up</button>
          </form>
        </div>
      </div>
      <div class="index-photo"></div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'index',
  data(){
    return {
      email: null,
      password: null,
      feedback: null,
      slug: null,
    }
  },
  methods: {
  signup(){
    if(this.email && this.password){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .catch(error => {
        console.log(error)
        this.feedback = error.message
      })
      // this.shortEmail = this.email.slice(0, this.email.indexOf('@'))
      // this.slug = slugify(this.shortEmail, {
      //   replacement: '-',
      //   remove: /[$*_+~.()'"!\-:@]/g,
      //   lower: true
      // })
      // console.log(this.slug)
    } else {
      this.feedback = "You must enter all fields"
    }
  }
}
}
</script>

<style lang="scss">

</style>