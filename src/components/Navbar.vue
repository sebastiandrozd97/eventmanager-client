<template>
  <div id="navbar">
    <router-link :to="{ name: 'Events' }" class="logo">
      <img src="@/assets/img/logo-dark.svg" alt="logo" />
    </router-link>
    <nav class="navbar">
      <ul class="navbar-items">
        <li class="navbar-item">
          <router-link class="router-links" :to="{ name: 'NewEvent' }">
            <i class="far fa-plus-square navbar-icon"></i>
            <span class="navbar-text">New event</span>
          </router-link>
        </li>
        <li class="navbar-item">
          <router-link class="router-links" :to="{ name: 'Events' }">
            <i class="fas fa-list navbar-icon"></i>
            <span class="navbar-text">Events</span>
          </router-link>
        </li>
        <li class="navbar-item">
          <router-link class="router-links" :to="{ name: 'Profile' }">
            <i class="far fa-address-card navbar-icon"></i>
            <span class="navbar-text">Profile</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <button @click="logout" class="logout-button">
      <i class="fas fa-sign-out-alt navbar-icon"></i>
      <span class="navbar-text">Logout</span>
    </button>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  name: 'Navbar',
  methods: {
    async logout() {
      await firebase.auth().signOut();
      this.$router.push({ name: 'SignIn' });
    },
  },
};
</script>

<style lang="scss">
#navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;
  height: 50px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid rgba(189, 195, 199, 0.8);

  .navbar-text {
    display: none;
  }

  @media screen and (min-width: $mobile-width) {
    padding: 20px;
    height: 80px;

    .navbar-icon {
      display: none;
    }

    .navbar-text {
      display: inline-block;
    }

    .logout-button {
      background-color: rgb(0, 123, 255);
    }
  }
}

.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 999;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(189, 195, 199, 0.8);

  @media screen and (min-width: $mobile-width) {
    position: static;
    width: auto;
    border: none;
  }

  .navbar-items {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .navbar-item {
    overflow: hidden;

    i {
      color: grey;
      font-size: 1.2em;
      line-height: unset;
    }

    &:first-child {
      i {
        color: rgb(0, 123, 255);
      }
    }
  }

  .router-link-active {
    i {
      color: black;
    }
  }
}

.navbar-item,
.router-links,
.logout-button {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: black;
  text-decoration: none;
}

.logo {
  cursor: pointer;
  margin-right: auto;
  img {
    height: 30px;

    @media screen and (min-width: $mobile-width) {
      height: 40px;
    }
  }
}

.navbar-items {
  padding: 0;
  list-style: none;
  margin: 0;

  .navbar-item {
    display: inline-block;
    padding: 0px 20px;

    .router-links {
      transition: all 0.3s ease 0s;
    }

    .router-links:hover {
      color: rgb(0, 123, 255);
      cursor: pointer;
      text-decoration: none;
    }
  }
}

.logout-button {
  height: 35px;
  margin-left: 20px;
  background: white;
  color: white;
  border: none;
  cursor: pointer;

  @media screen and (min-width: $mobile-width) {
    line-height: 0px;
    padding: 9px 25px;
  }
}

.fas {
  color: rgb(0, 123, 255);
}
</style>
