<template>
  <div id="navbar">
    <img class="logo" src="@/assets/logo.svg" alt="logo">
    <nav class="navbar">
      <ul class="navbar-items">
        <li><a href="#">Events</a></li>
        <li><a href="#">Friends</a></li>
        <li><a href="#">Profile</a></li>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:500&display=swap');

* {
  
}

ul{
  padding: 0;
}

li, a, .logout-button {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}

#navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 5%;
  height: 50px;
  box-sizing: border-box;
  background: #24252A;
}

.logo {
  cursor: pointer;
  height: 40px;
}

.navbar-items {
  list-style: none;
  margin: 0;

  li {
    display: inline-block;
    padding: 0px 20px;

    a {
      transition: all 0.3s ease 0s;
    }

    a:hover {
      color: #0088a9;
    }
  }
}

.logout-button {
  height: 35px;
  line-height: 0px;
  padding: 9px 25px;
  background: rgba(0,136,169,1);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.logout-button:hover {
  background: rgba(0,136,169,0.8);
}

</style>
