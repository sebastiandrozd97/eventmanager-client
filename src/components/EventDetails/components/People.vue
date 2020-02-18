<template>
  <div class="details-section">
    <h2>People</h2>
    <div class="total-cost">Each pays {{ calculateEachPayment }}</div>
    <div v-for="(participant, index) in event.participants" :key="index" class="payments-row">
      <span>
        <span @click="deleteParticipant" :data_index="index">{{ participant.name }}</span>
      </span>
      <span
        class="payment-status"
        :data_index="index"
        :class="participant.status"
        @click="changeStatus"
      >{{ participant.status }}</span>
    </div>
    <div class="info-row new-participant">
      <input
        @keydown.enter.prevent="newParticipant"
        placeholder="Name | Press enter to add new participant"
        type="text"
        v-model="participant.name"
      />
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
  methods: {
    deleteParticipant(e) {
      const element = e.currentTarget;
      const indexOfParticipant = element.getAttribute('data_index');
      this.event.participants[indexOfParticipant].status = 'To delete';
      this.event.participants.splice(indexOfParticipant, 1);
    },
    newParticipant() {
      if (this.participant.name) {
        this.event.participants.push({ ...this.participant });
        this.participant.name = null;
      }
    },
    changeStatus(e) {
      const element = e.currentTarget;
      const indexOfParticipant = element.getAttribute('data_index');
      if (this.event.participants[indexOfParticipant].status == 'Paid') {
        this.event.participants[indexOfParticipant].status = 'Not paid';
        element.classList.add('Not');
        element.classList.remove('Paid');
      } else {
        this.event.participants[indexOfParticipant].status = 'Paid';
        element.classList.add('Paid');
        element.classList.remove('Not');
      }
    },
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
div.total-cost {
  margin-bottom: 10px;
}
</style>