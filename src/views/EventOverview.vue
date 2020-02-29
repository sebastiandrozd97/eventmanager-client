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
import db from '@/firebase/init';
import moment from 'moment';

export default {
  name: 'EventOverview',
  components: {
    Information,
    Location,
    Expenses,
    Participants
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
  },
  async created() {
    const eventsSnapshot = await db
      .collection('events')
      .doc(this.$route.params.id)
      .get();
    this.event = eventsSnapshot.data();
    this.event.dateFrom = moment(this.event.dateFrom).format('YYYY-MM-DD');
    this.event.dateTo = moment(this.event.dateTo).format('YYYY-MM-DD');
  }
};
</script>

<style lang="scss">
@import "../styles/event.scss";

.event-overview {
  height: 100vh;
  overflow-y: scroll;
}

.overview-container {
  width: 60%;
  margin: 0 auto;

  &:last-child {
    margin-bottom: 3%;
  }
}

</style>
