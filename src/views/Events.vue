<template>
  <div class="events">
    <div class="container-events">
      <div class="event-selection">
        <EventList />
      </div>
      <div class="categories">
        <Categories />
      </div>
      <div class="content">
        <router-view>
          
        </router-view>
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
  grid-template-rows: 1fr 10fr;
  grid-template-areas: 
  "selection categories"
  "selection details"
}

.event-selection {
    grid-area: selection;
}

.content {
  border-top: 1px solid rgba(189, 195, 199,0.8);
  grid-area: details;
}

.map {
  width:100%;
  max-height:100%;
}
</style>
