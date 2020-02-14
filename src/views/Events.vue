<template>
  <div class="events">
    <div class="container-events">
      <div class="event-selection">
        <EventList :events="events" />
      </div>
      <div class="content" :class="{ 'selected-event': !selectedEvent }">
        <router-view :event="event[0]"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import EventList from '@/components/EventList'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'Events',
  components: {
    EventList,
  },
  data(){
    return {
      event: ['empty'],
      events: [],
    }
  },
  computed: {
    selectedEvent(){
      return this.$route.path != '/events';
    }
  },
  async created(){
    let eventsSnapshot = await db.collection('events')
      .where('userId', '==', firebase.auth().currentUser.uid)
      .orderBy('date', 'asc')
      .get()
    eventsSnapshot.forEach(async doc => {
      let event = doc.data()
      event.id = doc.id
      const location = await db.collection('locations').doc(event.locationId).get()
      event.location = location.data().location
      this.events.push(event)
    })
  },
  beforeUpdate(){
    this.event = this.events.filter( event => {
      if(event.id == this.$route.params.slug){
        //console.log(this.event[0].id)
        return event
      }
    })
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

.selected-event {
  background-image: url("../assets/img/event-details-placeholder.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% auto;
}


</style>
