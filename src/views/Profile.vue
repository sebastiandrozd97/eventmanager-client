<template>
  <div class="profile">
    
    <div class="container">
      <h2>Hello, {{userFirstname}} {{userSurname}}</h2>
      <form class="profile-details">
        <div class="form-group row">
          <label for="inputFirstname" class="col-sm-2 col-form-label">Firstname</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputFirstname">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputSurname" class="col-sm-2 col-form-label">Surname</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputSurname">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword">
          </div>
        </div>
        <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="Male" checked>
                <label class="form-check-label" for="gridRadios1">
                  Male
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="Female">
                <label class="form-check-label" for="gridRadios2">
                  Female
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div class="form-group row">
          <div class="col-sm-10">
            <button @click="saveProfile" class="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Profile',
  data(){
    return {
      userFirstname: 'Sebastian',
      userSurname: 'Drozd'
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
  color:white;
  padding-top: 20px;
}

.profile-details {
  padding-top: 20px;
}

.btn {
  background: rgba(0,136,169,1);
}
</style>
