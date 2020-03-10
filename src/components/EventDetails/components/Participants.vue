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
        <span
          class="participant-name"
          @click="deleteParticipant(index)"
        >
          {{ participant.name }}
        </span>
      </span>
      <span
        class="payment-status"
        :class="participant.status"
        @click="changeStatus(index)"
      >
        {{ participant.status }}
      </span>
    </div>
    <div class="info-row new-participant">
      <input
        @keydown.enter.prevent="newParticipant"
        placeholder="Name"
        type="text"
        v-model="participant.name"
      />
    </div>
    <div class="add-pc">
      <div>Press enter to add</div>
    </div>
    <div class="info-row add-mobile">
      <button @click="newParticipant" class="btn btn-primary">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Participants',
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
    deleteParticipant(index) {
      this.event.participants[index].status = 'To delete';
      this.event.participants.splice(index, 1);
    },
    newParticipant() {
      if (this.participant.name) {
        this.event.participants.push({ ...this.participant });
        this.participant.name = null;
      }
    },
    changeStatus(index) {
      if (this.event.participants[index].status === 'Paid') {
        this.event.participants[index].status = 'Not paid';
      } else {
        this.event.participants[index].status = 'Paid';
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
.participant-name:hover {
  color: $attention-color;
  cursor: pointer;
}

.payment-status {
  border: none;
  outline: none;
  cursor: pointer;
}

.Not {
  color: $attention-color;
}
.Paid {
  color: #009432;
}

.new-participant {
  input {
    width: 100% !important;
  }
}

.add-pc {
  div {
    margin-left: none !important;
  }
}
</style>
