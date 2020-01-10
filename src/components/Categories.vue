<template>
  <div id="categories">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn"><img class="icon" src="@/assets/img/paper.svg"></button>
      <button type="button" class="btn"><img class="compass-icon" src="@/assets/img/compass.svg"></button>
      <button type="button" class="btn"><img class="people-icon" src="@/assets/img/group.svg"></button>
      <button type="button" class="btn"><img class="icon" src="@/assets/img/money.svg"></button>
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