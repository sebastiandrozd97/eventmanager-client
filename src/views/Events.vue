<template>
  <div class="events">
    <div class="container-events">
      <div class="event-selection">
        <EventList :events="events" />
      </div>
      <div class="content" :class="{ 'selected-event': !selectedEvent }">
        <router-view :event="event[0]" v-on:delete-event="onEventDelete"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import EventList from '@/components/EventList';
import moment from 'moment';
import db from '@/firebase/init';
import firebase from 'firebase';

export default {
  name: 'Events',
  components: {
    EventList,
  },
  data() {
    return {
      event: [],
      locationsArray: [],
      events: [],
    };
  },
  computed: {
    selectedEvent() {
      return this.$route.path != '/events';
    },
  },
  methods: {
    onEventDelete(id) {
      this.events = this.events.filter(event => event.id != id);
    },
  },
  async created() {
    const eventsSnapshot = await db
      .collection('events')
      .where('userId', '==', firebase.auth().currentUser.uid)
      .orderBy('date', 'asc')
      .get();
    const locations = await db.collection('locations').get();
    eventsSnapshot.forEach(doc => {
      let event = doc.data();
      event.id = doc.id;
      locations.forEach(doc => {
        if (doc.id == event.locationId) {
          event.location = doc.data().location;
        }
      });
      event.date = moment(event.date).format('YYYY-MM-DD');
      this.events.push(event);
    });
  },
  beforeUpdate() {
    this.event = this.events.filter(event => {
      if (event.slug == this.$route.params.slug) {
        return event;
      }
    });
  },
};
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
  background-image: url('../assets/img/event-details-placeholder.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% auto;
}
</style>
