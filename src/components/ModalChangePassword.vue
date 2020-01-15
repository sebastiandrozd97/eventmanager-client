<template>
  <div class="change-pwd">
    <a href="/Profile" @click.prevent="show">Change password</a>
    <modal class="change-pwd-modal" name="change-password" @opened="opened" :height="260" :width="400">
      <form class="change-pwd-form">
        <div class="form-group">
          <label for="exampleInputEmail1">New password</label>
          <input type="password" class="form-control" id="password" ref="password" @keydown.shift.tab.prevent="">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Re-enter new password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" @submit.prevent="updatePassword" class="btn btn-primary" @keydown.tab.exact.prevent="">Submit</button>
      </form>
    </modal>
  </div>
</template>

<script>
  export default {
    methods: {
      show() {
        this.$modal.show('change-password');
      },
      opened() {
        this.$refs.password.focus()
      },
      updatePassword() {

      },
      hide() {
        this.$modal.hide('change-password');
      }
    }
  }
</script>

<style lang="scss">
  .change-pwd-form {
    width: 80%;
    margin: auto;
    color: #007bff;
    margin-top: 20px;
  }
</style>