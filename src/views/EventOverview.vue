<template>
  <div class="event-overview event">
    <div v-if="event" class="overview-container">
      <Information :event="event" />
      <Location :event="event" ref="locationComponent" />
      <Expenses :event="event" @total-expenses="totalExpensesComputed" />
      <Participants :event="event" :totalExpenses="totalExpenses" />
    </div>
  </div>
</template>
<script>
import Information from '@/components/EventOverview/Information';
import Location from '@/components/EventOverview/Location';
import Expenses from '@/components/EventOverview/Expenses';
import Participants from '@/components/EventOverview/Participants';
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'EventOverview',
  components: {
    Information,
    Location,
    Expenses,
    Participants,
  },
  data() {
    return {
      event: null,
      totalExpenses: null,
    };
  },
  methods: {
    totalExpensesComputed(val) {
      this.totalExpenses = val;
    },
    async getEvent() {
      try{
        const event =  await axios.get(`${process.env.VUE_APP_API_URL}/events/${this.$route.params.id}`, {
          headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`}
        })
        this.event = event.data;
        this.event.from = moment(this.event.from).format('YYYY-MM-DD');
        this.event.to = moment(this.event.to).format('YYYY-MM-DD');
        console.log(event);
      } catch(error){
        throw new Error(`Problem handling something: ${error}.`); 
      }
    },
  },
  async created() {
    await this.getEvent()
  },
};
</script>

<style lang="scss">
@import '../styles/event.scss';

.event-overview {
  height: 100vh;
  overflow-y: scroll;
}

.overview-container {
  width: 80%;
  margin: 0 auto;

  &:last-child {
    margin-bottom: 3%;
  }

  @media screen and (min-width: $mobile-width) {
    width: 60%;
  }
}
</style>
