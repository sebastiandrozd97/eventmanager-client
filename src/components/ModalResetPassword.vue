<template>
  <div class="reset-pwd">
    <a href="/Profile" @click.prevent="show">Forgot password</a>
    ?
    <modal
      name="reset-password"
      @opened="opened"
      :width="400"
      :adaptive="true"
      :classes="['modal-pwd', 'v--modal']"
    >
      <form @submit.prevent="resetPassword" class="reset-pwd-form">
        <div class="form-group">
          <h3>Email</h3>
          <input
            type="email"
            class="form-control"
            id="email"
            ref="email"
            @keydown.shift.tab.prevent
          />
        </div>
        <div class="feedback-button">
          <div v-if="feedback" class="reset-password-feedback">
            {{ feedback }}
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            @keydown.tab.exact.prevent
          >
            Reset password
          </button>
        </div>
      </form>
    </modal>
  </div>
</template>

<script>
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

export default {
  name: 'ModalResetPassword',
  data() {
    return {
      feedback: null,
    };
  },
  methods: {
    show() {
      this.$modal.show('reset-password');
    },
    hide() {
      this.$modal.hide('reset-password');
    },
    opened() {
      this.$refs.email.focus();
    },
//     async resetPassword() {
//       const email = this.$refs.email.value;
//       try {
//         await firebase.auth().sendPasswordResetEmail(email);
//         this.feedback = 'Check your mailbox';
//       } catch (error) {
//         this.feedback = error.message;
//       }
    },
//   },
};
</script>

<style lang="scss">
.modal-pwd {
  height: auto !important;
  padding: 20px 0 20px !important;
}

.reset-pwd-form {
  width: 80%;
  margin: auto;
  color: $primary-color;
}

.feedback-button {
  display: flex;
  flex-direction: column;
}

.reset-password-feedback {
  color: $primary-color;
  min-height: 35px;
  width: 100%;
  margin-bottom: 10px;
}
</style>
