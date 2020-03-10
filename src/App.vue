<template>
  <div id="app">
    <Navbar v-if="show" />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    show() {
      return (
        this.$route.path !== '/' &&
        this.$route.path !== '/signup' &&
        this.$route.path !== '/page-not-found' &&
        !this.$route.path.includes('/event-overview/')
      );
    },
  },
};
</script>
