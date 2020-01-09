<template>
  <div class="events">
    <div class="container-events">
      <div class="event-selection">
        <EventList />
      </div>
      <div class="details">

      </div>
      <div class="categories">
        <div><img class="compass-icon" src="@/assets/img/compass.svg">Location</div>
        <div><img class="compass-icon" src="@/assets/img/paper.svg">Details</div>
        <div><img class="people-icon" src="@/assets/img/group.svg">People</div>  
        <div><img class="people-icon" src="@/assets/img/money.svg">Payments</div> 
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
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 7fr 1fr;
  grid-template-areas: 
  "selection details"
  "selection categories"
}

.event-selection {
    grid-area: selection;
}

.details {
  border-bottom: 1px solid rgba(189, 195, 199,0.8);
  grid-area: details;
}

.categories {
  grid-area: categories;
  display: flex;
  flex-direction: row;
}

.categories > div {
  flex-grow: 1;
  height: 100%;
  text-align: center;
  font-size: 30px;
  box-sizing: border-box;
  border-left: 1px solid rgba(189, 195, 199,0.8);
  color: rgb(128, 128, 128);
  line-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.categories > div * {
  margin: 10px;
}

.categories > div:first-child {
    border: 0;
}

.compass-icon {
  height: 30px;
}

.people-icon {
  height: 45px;
}
</style>
