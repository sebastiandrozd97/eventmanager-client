<template>
  <div class="profile">
    <div v-if="user" class="profile-container">
      <h2>Hello, {{ user.firstname }} {{ user.surname }}</h2>
      <form @submit.prevent="updateProfile" class="profile-details">
        <div class="form-group row">
          <label for="inputFirstname" class="col-sm-2 col-form-label">Firstname</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputFirstname" v-model="user.firstname" />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputSurname" class="col-sm-2 col-form-label">Surname</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputSurname" v-model="user.surname" />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail" v-model="user.email" disabled />
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
        <small v-if="feedback" class="form-text text-success">{{ feedback }}</small>
        <ModalChangePassword />
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
import firebase from 'firebase';
import db from '@/firebase/init';

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
    updateProfile() {
      db.collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstname: this.user.firstname,
          surname: this.user.surname,
          gender: this.user.gender,
        })
        .then(() => {
          this.feedback = 'Profile has beed updated';
        })
        .catch(err => {
          this.feedback = err.message;
        });
    },
  },
  async created() {
    const snapshot = await db
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get();
    this.user = snapshot.data();
    this.user.email = firebase.auth().currentUser.email;
    this.userAuth = firebase.auth().currentUser;
  },
};
</script>

<style lang="scss">
.profile-container {
  width: 60%;
  color: black;
  margin: 30px auto 0 auto;
}

.profile-details {
  padding-top: 20px;
}
</style>
