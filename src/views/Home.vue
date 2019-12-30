<template>
  <div class="home">
    <Navbar />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
body {
  background: grey;
}
</style>
