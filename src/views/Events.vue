<template>
  <div class="events">
    <div class="container-events">
      <div class="event-selection">
        <EventList />
      </div>
      <div class="details">

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
    display: grid;
    grid-template-columns: 35% auto;

    .event-selection {
     
      height: 90vh;
    }
  }
</style>
