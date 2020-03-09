<template>
  <div class="new-event-container">
    <div class="form-group">
      <label for="participants">Participants</label>
      <input
        type="text"
        @keydown.enter.prevent="addParticipant"
        v-model="participant.name"
        placeholder="Participant name"
        class="form-control"
        id="participants"
      />
      <div
        v-for="(participant, index) in this.participants"
        :key="index"
        @click="deleteParticipant(index)"
        class="item"
      >
        <small class="form-text">{{ participant.name }}</small>
      </div>
      <div class="add-pc">
        <div>Press enter to add</div>
      </div>
      <div class="add-mobile">
        <button @click.prevent="addParticipant" class="btn btn-primary">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Participants',
  props: ['participants', 'participant'],
  methods: {
    addParticipant() {
      if (this.participant.name) {
        this.participants.push({ ...this.participant });
        this.participant.name = null;
      }
    },
    deleteParticipant(index) {
      this.participants.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.new-event-container {
  .add-pc {
    display: none;
  }

  .add-mobile {
    margin-top: 15px;
    width: 100%;
    text-align: right;
  }

  @media screen and (min-width: $mobile-width) {
    .add-pc {
      display: inline-block;
      margin-top: 5px;
    }

    .add-mobile {
      display: none;
    }
  }
}
</style>
