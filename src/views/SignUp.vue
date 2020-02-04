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
          <form>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password">
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

  export default {
    name: 'index',
    data(){
      return {
        login: true,
      }
    }
  }
</script>

<style lang="scss">

</style>