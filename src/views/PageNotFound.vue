<template>
  <div class="page-not-found">
    <h1>Page not found</h1>
    <h3 v-if="checkAuthentication">
      <router-link :to="{ name: 'Events' }">Go back</router-link>
    </h3>
    <h3 v-else>
      <router-link :to="{ name: 'SignIn' }">Go back</router-link>
    </h3>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
export default {
  name: 'PageNotFound',
  methods: {
    checkAuthentication(){
      const user = firebase.auth().currentUser;
      if(user){
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
.page-not-found {
  margin: 20px;
}
</style>
