<template>
  <div class="events">
    <div class="event-selection">
      <EventList :events="events" />
    </div>
    <div class="content" :class="{ 'selected-event': !selectedEvent }">
      <router-view
        :event="event"
        v-on:delete-event="onEventDelete"
        :key="renderKey"
      ></router-view>
    </div>
  </div>
</template>

<script>
import EventList from '@/components/EventList';
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'Events',
  components: {
    EventList,
  },
  data() {
    return {
      renderKey: 0,
      event: null,
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
    async getEvents() {
      try{
        const events =  await axios.get(`${process.env.VUE_APP_API_URL}/events`, {
          headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`}
        })
        this.events = events.data;
        this.events.forEach(event => {
          event.from = moment(event.from).format('YYYY-MM-DD');
          event.to = moment(event.to).format('YYYY-MM-DD');
        })
      } catch(error){
        throw new Error(`Problem handling something: ${error}.`); 
      }
    },
    async onEventDelete(id) {
      if (window.confirm('Delete?')) {
        try {
          await axios.request({
            url: `${process.env.VUE_APP_API_URL}/events/${this.event.id}`,
            method: "delete",
            headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`}
          })
          this.events = this.events.filter(event => event.id != id);
          this.$router.push({ name: 'Events' });
        } catch (error) {
          alert(error.response.data);
        }
      }
    },
  },
  async created() {
    await this.getEvents();
  },
  beforeUpdate() {
    this.event = this.events.find(event => {
      if (event.slug === this.$route.params.slug) {
        return event;
      }
    });
    this.forceEventDetailsRerender();
  },
};
</script>

<style lang="scss">
.events {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media screen and (min-width: $mobile-width) {
    height: calc(100vh - 80px);
  }
}

.event-selection {
  width: 100%;
  height: 100%;

  @media screen and (min-width: $mobile-width) {
    width: 400px;
  }
}

.content {
  position: absolute;
  top: 50px;
  flex-grow: 1;
  background-color: white;
  z-index: 2;
  height: calc(100vh - 100px);

  @media screen and (min-width: $mobile-width) {
    position: static;
    height: 100%;
  }
}

.selected-event {
  background-image: url('../assets/img/event-details-placeholder.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% auto;
}
</style>
