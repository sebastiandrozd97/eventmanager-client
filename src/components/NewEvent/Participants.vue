<template>
  <div>
    <div class="form-group">
      <label for="participants">Participants</label>
      <input
        type="text"
        @keydown.enter.prevent="addParticipant"
        v-model="participant.name"
        placeholder="Press enter to add participant"
        class="form-control"
        id="participants"
      />
      <div
        v-for="(participant, index) in this.participants"
        :key="index"
        @click="deleteParticipant"
        :data_index="index"
        class="item"
      >
        <small class="form-text">{{ participant.name }}</small>
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
      deleteParticipant(e) {
        this.participants.splice(e.currentTarget.getAttribute('data_index'), 1);
      },
    },
  }
</script>

<style lang="scss" scoped>

.add-participant {
  margin-top: 10px;
}

</style>