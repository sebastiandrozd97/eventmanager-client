<template>
  <div class="profile">
    <div class="container">
      <h2>Hello, {{user.Firstname}} {{user.Surname}}</h2>
      <form class="profile-details">
        <div class="form-group row">
          <label for="inputFirstname" class="col-sm-2 col-form-label">Firstname</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputFirstname" :value="user.Firstname">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputSurname" class="col-sm-2 col-form-label">Surname</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputSurname" :value="user.Surname">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail" :value="user.Email" disabled>
          </div>
        </div>
        <div class="form-group row">
          <label for="gender" class="col-sm-2 col-form-label">Gender</label>
          <div class="col-sm-10">
            <select class="form-control" id="gender" :value="user.Gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button @click="saveProfile" class="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
      <ModalChangePassword />
    </div>
  </div>
</template>

<script>
import user from '@/assets/json/user.json'
import ModalChangePassword from '@/components/ModalChangePassword'

export default {
  name: 'Profile',
  components: {
    ModalChangePassword
  },
  data(){
    return {
      user
    }
  },
  methods: {
    saveProfile(){

    }
  }
}
</script>

<style lang="scss">
.container {
  width: 60%;
  color:black;
  margin-top: 30px;
}

.profile-details {
  padding-top: 20px;
}
</style>
