<template>
  <div id="navbar">
    <router-link :to="{ name: 'Events' }" class="logo"><img src="@/assets/img/logo-dark.svg" alt="logo"></router-link>
    <nav class="navbar">
      <ul class="navbar-items">
        <li class="navbar-item"><router-link class="router-links" :to="{ name: 'NewEvent' }">New event</router-link></li>
        <li class="navbar-item"><router-link class="router-links" :to="{ name: 'Events' }">Events</router-link></li>
        <li class="navbar-item"><router-link class="router-links" :to="{ name: 'Profile' }">Profile</router-link></li>
      </ul>
    </nav>
    <button class="logout-button">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {
      
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:500&display=swap');

#navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 1%;
  height: 10vh;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid rgba(189, 195, 199,0.8)
}

.navbar-item, .router-links, .logout-button {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: black;
  text-decoration: none;
}

.logo {
  cursor: pointer;
  margin-right: auto;
  img {
    height: 40px;
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
  line-height: 0px;
  padding: 9px 25px;
  margin-left: 20px;
  background: rgb(0, 123, 255);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.logout-button:hover {
  background: rgb(0, 104, 216);
}

</style>
