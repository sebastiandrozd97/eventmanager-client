<template>
  <div id="event-list">
    <div class="list-group">
      <input class="list-group-item list-group-item-action" type="text" placeholder="Search...">
      <Event v-for="(event, index) in events" :key="index" :event="event" />
    </div>
  </div>
</template>

<script>
import Event from '@/components/Event'
import events from '@/assets/events.json'

export default {
  name: 'EventList',
  components: {
    Event
  },
  data(){
    return {
      events
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.list-group-item {
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group-item.active {
  .text-muted {
    color: white !important;
  }
}

.list-group-item:first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 0;
}

.list-group-item:last-child {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.list-group {
  height: 90vh;
  overflow-y: scroll;
}

.list-group::-webkit-scrollbar
{
    width: 5px;
    background-color: #F5F5F5;
}

.list-group::-webkit-scrollbar-thumb
{
    background-color: rgba(200, 205, 209, 0.8);
   
    border-radius: 3px;
}
</style>
