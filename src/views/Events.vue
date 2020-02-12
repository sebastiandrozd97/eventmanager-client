<template>
  <div class="events">
    <div class="container-events">
      <div class="event-selection">
        <EventList />
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import EventList from '@/components/EventList'

export default {
  name: 'Events',
  components: {
    EventList,
  }
}
</script>

<style lang="scss">
.container-events {
  height: 90vh;
  display: flex;
  flex-direction: row;
}

.event-selection {
  width: 35vw;
}

.content {
  width: 65vw;
}


</style>
