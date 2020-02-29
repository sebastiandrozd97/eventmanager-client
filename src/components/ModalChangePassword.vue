<template>
  <div>
    <a href="/Profile" @click.prevent="show">Change password</a>
    <modal name="change-password" @opened="opened" :height="380" :width="400">
      <form @submit.prevent="updatePassword" class="change-pwd-form">
        <div class="form-group">
          <label for="oldPassword">Old password</label>
          <input
            type="password"
            class="form-control"
            id="oldPassword"
            ref="oldPassword"
            @keydown.shift.tab.prevent
          />
        </div>
        <div class="form-group">
          <label for="newPassword1">New password</label>
          <input
            type="password"
            class="form-control"
            id="newPassword1"
            ref="newPassword1"
            @keydown.shift.tab.prevent
          />
        </div>
        <div class="form-group">
          <label for="newPassword2">Re-enter new password</label>
          <input type="password" class="form-control" id="newPassword2" ref="newPassword2" />
        </div>
        <div class="feedback-button">
          <div v-if="feedback" class="change-password-feedback">{{ feedback }}</div>
          <button type="submit" class="btn btn-primary" @keydown.tab.exact.prevent>Submit</button>
        </div>
      </form>
    </modal>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'ModalChangePassword',
  data() {
    return {
      feedback: null,
    };
  },
  methods: {
    show() {
      this.$modal.show('change-password');
    },
    hide() {
      this.$modal.hide('change-password');
    },
    opened() {
      this.$refs.oldPassword.focus();
    },
    async updatePassword() {
      const user = await firebase.auth().currentUser;
      const credential = await firebase.auth.EmailAuthProvider.credential(
        await firebase.auth().currentUser.email,
        this.$refs.oldPassword.value
      );

      try {
        await user.reauthenticateWithCredential(credential);
        if (this.$refs.newPassword1.value === this.$refs.newPassword2.value) {
          await user.updatePassword(this.$refs.newPassword1.value);
          this.feedback = null;
          this.hide();
        } else {
          this.feedback = 'Fields are not equal';
        }
      } catch (error) {
        this.feedback = error.message;
      }
    },
  },
};
</script>

<style lang="scss">
.change-pwd-form {
  width: 80%;
  margin: auto;
  color: #007bff;
  margin-top: 20px;
}

.feedback-button {
  display: flex;
  flex-direction: column;
}

.change-password-feedback {
  color: red;
  min-height: 35px;
  width: 100%;
}
</style>
