<template>
  <div class="summary-section">
    <h2>People</h2>
    <div class="total-cost">Each pays {{ calculateEachPayment }}</div>
    <div v-for="(participant, index) in event.participants" :key="index" class="payments-row">
      <span>
        <span>{{ participant.name }}</span>
      </span>
      <span
        class="payment-status"
        :data_index="index"
        :class="participant.status"
      >{{ participant.status }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'People',
  props: ['event', 'totalExpenses'],
  data() {
    return {
      participant: {
        name: null,
        status: 'Not paid',
      },
    };
  },
  computed: {
    calculateEachPayment() {
      if (
        this.event &&
        this.event.participants &&
        this.event.participants.length > 0 &&
        this.totalExpenses
      ) {
        let validParticipants = 0;
        for (let i = 0; i < this.event.participants.length; i++) {
          if (this.event.participants[i].status != 'To delete') {
            validParticipants++;
          }
        }
        return (this.totalExpenses / validParticipants).toFixed(2);
      } else {
        return 0;
      }
    },
  },
};
</script>

<style lang="scss">

.summary-section {
  .payments-row {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    span:first-child {
      width: 35%;
      font-weight: 700;
    }

    .payment-status {
      border: none;
      outline: none;
    }

    .Not {
      color: #ea2027;
    }
    .Paid {
      color: #009432;
    }
  }

  div.total-cost {
    margin-bottom: 10px;
  }
}
</style>