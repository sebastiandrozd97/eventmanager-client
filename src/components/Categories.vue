<template>
  <div v-if="this.$route.params.slug" id="categories">
    <div class="btn-group categories-group" role="group">
      <router-link class="categories-link" :to="{ name: 'Details' }">
        <button type="button" class="btn">
          Details
        </button>
      </router-link>
      <router-link class="categories-link" :to="{ name: 'Location' }">
        <button type="button" class="btn">
          Location
        </button>
      </router-link>
      <router-link class="categories-link" :to="{ name: 'People' }">
        <button type="button" class="btn">
          People
        </button>
      </router-link>
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
    color: white;
}

#categories > div > .btn:focus {
    box-shadow: none;
}

.categories-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .categories-link {
    width: calc(100% / 3);
    text-align: center;
  }

  .router-link-active{
  background:#007bff;
}

  button {
    height: 100%;
    width: 100%;
    border-radius: 0;
  }
}

</style>