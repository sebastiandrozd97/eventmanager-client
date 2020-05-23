<template>
  <div class="profile">
    <div v-if="user" class="profile-container">
      <h2>Hello, {{ user.firstName }} {{ user.lastName }}</h2>
      <form @submit.prevent="updateProfile" class="profile-details">
        <div class="form-group row">
          <label for="inputFirstname" class="col-sm-2 col-form-label">
            First name
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputFirstname"
              v-model="user.firstName"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputSurname" class="col-sm-2 col-form-label">
            Last name
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputSurname"
              v-model="user.lastName"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              v-model="user.email"
              disabled
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="gender" class="col-sm-2 col-form-label">Gender</label>
          <div class="col-sm-10">
            <select class="form-control" id="gender" v-model="user.gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <small v-if="feedback" class="form-text text-success">
          {{ feedback }}
        </small>
        <ModalChangePassword :user="user" />
        <div class="form-group row">
          <div class="col-sm-10 mt-3">
            <button class="btn btn-primary">Update</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ModalChangePassword from '@/components/ModalChangePassword';
import axios from 'axios';

export default {
  name: 'Profile',
  components: {
    ModalChangePassword,
  },
  data() {
    return {
      user: null,
      feedback: null,
    };
  },
  methods: {
    async getUser() {
      try{
        const user =  await axios.get(`${process.env.VUE_APP_API_URL}/user`, {
          headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`}
        })
        this.user = user.data;
      } catch(error){
        throw new Error(`Problem handling something: ${error}.`); 
      }
    },
    async updateProfile() {
      try {
        await axios.request({
          url: `${process.env.VUE_APP_API_URL}/user`,
          method: "put",
          headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`},
          data: {
            "firstName": this.user.firstName,
            "lastName": this.user.lastName,
            "gender": this.user.gender
          }
        });
        this.feedback = 'Profile has beed updated';
      } catch (error) {
        this.feedback = error.message;
      }
    },
  },
  async created() {
    await this.getUser();
  },
};
</script>

<style lang="scss">
.profile {
  height: calc(100vh - 100px);
  overflow-y: scroll;
}

.profile-container {
  width: 80%;
  color: black;
  margin: 10px auto 0 auto;

  @media screen and (min-width: $mobile-width) {
    width: 60%;
    margin: 30px auto 0 auto;
  }
}

.profile-details {
  padding-top: 20px;
}
</style>
