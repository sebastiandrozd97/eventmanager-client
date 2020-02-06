<template>
  <div id="categories">
    <div class="btn-group" role="group">
      <button type="button" class="btn">Details</button>
      <button type="button" class="btn">Location</button>
      <button type="button" class="btn">People</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Categories'
  }
</script>

<style lang="scss">
#categories {
  width: 100%;
  height: 100%;
}
#categories > div {
  width: 100%;
  height: 100%;
}

#categories > div > .btn {
    border-radius: 0;
    background-color: white;
    color: black;
    border: 0;
}

#categories > .btn-group :nth-child(2) {
    background-color: #007bff;
    color: white;
}

#categories > div > .btn:focus {
    box-shadow: none;
}

.icon {
  height: 30px;
}

.compass-icon {
  height: 30px;
  content: url("../assets/img/compass2.png");
}

.people-icon {
  height: 35px;
}
</style>