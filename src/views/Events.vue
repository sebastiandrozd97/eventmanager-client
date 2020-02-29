<template>
  <div class="events">
    <div class="container-events">
      <div class="event-selection">
        <EventList :events="events" />
      </div>
      <div class="content" :class="{ 'selected-event': !selectedEvent }">
        <router-view :event="event[0]" v-on:delete-event="onEventDelete" :key="renderKey"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import EventList from '@/components/EventList';
import moment from 'moment';
import db from '@/firebase/init';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  name: 'Events',
  components: {
    EventList,
  },
  data() {
    return {
      renderKey: 0,
      event: [],
      events: [],
    };
  },
  computed: {
    selectedEvent() {
      return this.$route.path !== '/events';
    },
  },
  methods: {
    forceEventDetailsRerender() {
      this.renderKey += 1;
    },
    async onEventDelete(id) {
      this.events = this.events.filter(event => event.id != id);
      await db
        .collection('events')
        .doc(id)
        .delete();
      this.$router.push({ name: 'Events' });
    },
  },
  async created() {
    const eventsSnapshot = await db
      .collection('events')
      .where('userId', '==', firebase.auth().currentUser.uid)
      .orderBy('dateFrom', 'asc')
      .get();
    eventsSnapshot.forEach(doc => {
      let event = doc.data();
      event.id = doc.id;
      event.dateFrom = moment(event.dateFrom).format('YYYY-MM-DD');
      event.dateTo = moment(event.dateTo).format('YYYY-MM-DD');
      this.events.push(event);
    });
  },
  beforeUpdate() {
    this.event = this.events.filter(event => {
      if (event.slug === this.$route.params.slug) {
        return event;
      }
    });
    this.forceEventDetailsRerender();
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
