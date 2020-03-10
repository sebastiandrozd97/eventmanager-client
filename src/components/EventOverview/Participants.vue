<template>
  <div class="section">
    <div class="section-header">Participants</div>
    <div class="total-cost">
      Cost per one person: {{ calculateEachPayment }}
    </div>
    <div
      v-for="(participant, index) in event.participants"
      :key="index"
      class="payments-row"
    >
      <span>
        <span>{{ participant.name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Participants',
  props: ['event', 'totalExpenses'],
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
