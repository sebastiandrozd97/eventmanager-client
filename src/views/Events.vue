<template>
  <div class="events">
    <div class="container-events">
      <div class="event-selection">
        <EventList />
      </div>
      <div class="content">
        
      </div>
      <div class="categories">
        <Categories />
      </div>
    </div>
  </div>
</template>

<script>
import EventList from '@/components/EventList'
import Categories from '@/components/Categories'

export default {
  name: 'Events',
  components: {
    EventList,
    Categories
  }
}
</script>

<style lang="scss">
.container-events {
  height: 90vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 10fr 1fr;
  grid-template-areas: 
  "selection details"
  "selection categories"
}

.event-selection {
    grid-area: selection;
}

.content {
  border-bottom: 1px solid rgba(189, 195, 199,0.8);
  grid-area: details;
  background-image: url("../assets/img/map.png");
}

.map {
  width:100%;
  max-height:100%;
}
</style>
