<template>
  <div>
    <a href="/Profile" @click.prevent="show">Change password</a>
    <modal
      name="change-password"
      @opened="opened"
      :adaptive="true"
      :classes="['modal-pwd', 'v--modal']"
    >
      <form @submit.prevent="updatePassword" class="change-pwd-form">
        <div class="form-group">
          <label for="oldPassword">Old password</label>
          <input
            type="password"
            class="form-control"
            id="oldPassword"
            v-model="oldPassword"
            ref="oldPassword"
            @keydown.shift.tab.prevent
            required
          />
        </div>
        <div class="form-group">
          <label for="newPassword1">New password</label>
          <input
            type="password"
            class="form-control"
            id="newPassword1"
            v-model="newPassword1"
            @keydown.shift.tab.prevent
            required
          />
        </div>
        <div class="form-group">
          <label for="newPassword2">Re-enter new password</label>
          <input
            type="password"
            class="form-control"
            id="newPassword2"
            v-model="newPassword2"
            required
          />
        </div>
        <div class="feedback-button">
          <div v-if="feedback" class="change-password-feedback">
            {{ feedback }}
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            @keydown.tab.exact.prevent
          >
            Submit
          </button>
        </div>
      </form>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ModalChangePassword',
  props: ['user'],
  data() {
    return {
      oldPassword: null,
      newPassword1: null,
      newPassword2: null,
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
    // async updatePassword2() {
    //   const credential = await firebase.auth.EmailAuthProvider.credential(
    //     await firebase.auth().currentUser.email,
    //     this.$refs.oldPassword.value,
    //   );

    //   try {
    //     await user.reauthenticateWithCredential(credential);
    //     if (this.$refs.newPassword1.value === this.$refs.newPassword2.value) {
    //       await user.updatePassword(this.$refs.newPassword1.value);
    //       this.feedback = null;
    //       this.hide();
    //     } else {
    //       this.feedback = 'Fields are not equal';
    //     }
    //   } catch (error) {
    //     this.feedback = error.message;
    //   }
    // },
    async updatePassword() {
      try {
        await axios.request({
          url: `${process.env.VUE_APP_API_URL}/user`,
          method: "post",
          headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`},
          data: {
            "currentPassword": this.oldPassword,
            "newPassword": this.newPassword1,
            "confirmPassword": this.newPassword2
          }
        });
        this.feedback = 'Password has beed updated';
      } catch (error) {
        if(error.response.data.error){
          this.feedback = error.response.data.error;
          console.log(error.response.data.error);
        } else {
          this.feedback = error.response.data.errors[0];
          console.log(error.response.data.errors[0]);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.modal-pwd {
  height: auto !important;
}

.change-pwd-form {
  width: 80%;
  margin: 20px auto 20px;
  color: $primary-color;
}

.feedback-button {
  display: flex;
  flex-direction: column;
}

.change-password-feedback {
  color: $attention-color;
  min-height: 35px;
  width: 100%;
}
</style>
