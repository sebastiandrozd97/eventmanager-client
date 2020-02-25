<template>
  <div ref="summary" class="event-summary">
    <div v-if="event" class="summary-container">
      <Information :event="event" />
      <Location :event="event" ref="locationComponent" />
      <Expenses :event="event" @total-expenses="totalExpensesComputed" />
      <People :event="event" :totalExpenses="totalExpenses" />
    </div>
  </div>
</template>
<script>
import Information from '@/components/EventSummary/Information';
import Location from '@/components/EventSummary/Location';
import Expenses from '@/components/EventSummary/Expenses';
import People from '@/components/EventSummary/People';
import db from '@/firebase/init';
import moment from 'moment';

export default {
  name: 'EventSummary',
  components: {
    Information,
    Location,
    Expenses,
    People
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
.event-summary {
  height: 100vh;
  overflow-y: scroll;

  .summary-container {
    width: 60%;
    margin: 0 auto;

    &:last-child {
      margin-bottom: 3%;
    }
  }

  .summary-section {
    margin-top: 3%;
    h2 {
      padding-bottom: 10px;
      margin-bottom: 20px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    }
  }

  .info-row {
    display: flex;
    min-height: 5vh;
    margin-bottom: 10px;

    span:first-child {
      width: 35%;
      font-weight: 700;
    }

    input {
      width: 65%;
      border: none;
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      outline: none;
    }

    textarea {
      width: 65%;
      resize: none;
      border: none;
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      outline: none;
    }
  }
}

.event-summary::-webkit-scrollbar {
  width: 14px;
  height: 18px;
}

.event-summary::-webkit-scrollbar-thumb {
  height: 6px;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
    inset 1px 1px 0px rgba(0, 0, 0, 0.05);

  &:active {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.event-summary::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

.event-summary::-webkit-scrollbar-corner {
  background-color: transparent;
}
</style>
