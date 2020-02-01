<template>
  <div id="login">
    <div class="whole-login">
      <div class="login-form">
        <div class="login-logo">
          <img src="../assets/img/logo-dark.svg" alt="logo">
        </div>
        <div class="login-welcome">
          <h5>Welcome!</h5>
          <small id="emailHelp" class="form-text text-muted">Ready to plan your next event?</small>
        </div>
        <div>
          <form>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="passwird">
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
      <div class="login-photo"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return {
        
      }
    }
  }
</script>

<style lang="scss">
#login {
  width:100vw;
  height: 100vh;
  // background: #f1dbd4;
  padding-top: 10vh;
}

.whole-login {
  width:70vw;
  height: 80vh;
  background: white;
  margin:auto;
  box-shadow: 5px 10px 8px #888888;
  display: flex;
}

.login-form {
  width: 50%;
  height:100%;
  padding-top: 3%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  background: #fcfcfc;

  .login-logo {
    height: 10%;
  }

  .login-welcome {
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

.login-photo {
  width:50%;
  height: 100%;
  background-image: url('../assets/img/party.jpg');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>