<template>
  <div id="event-list">
    <div class="list-group">
      <input v-model="searchText" class="list-group-item list-group-item-action" type="text" placeholder="Search...">
      <Event v-for="(event, index) in filteredEvents" :key="index" :event="event" />
    </div>
  </div>
</template>

<script>
import Event from '@/components/Event'
import db from '@/firebase/init'

export default {
  name: 'EventList',
  components: {
    Event
  },
  data(){
    return {
      event,
      events: [],
      searchText: ''
    }
  },
  methods: {
    
  },
  computed: {
    filteredEvents: function(){
      return this.events.filter(event => {
        return event.title.toLowerCase().trim().match(this.searchText.toLowerCase().trim())
      })
    }
  },
  async created() {
      const eventsSnapshot = await db.collection('events').get()
      eventsSnapshot.forEach(async doc => {
        let event = doc.data()
        event.id = doc.id
        const location = await db.collection('locations').doc(event.locationId).get()
        event.location = location.data().city
        this.events.push(event)
      })
    }
}   
</script>

<style lang="scss">
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
