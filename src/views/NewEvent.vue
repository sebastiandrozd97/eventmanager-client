<template>
  <div class="new-event">
    <form>
      <div class="form-group">
        <label for="event-name">Event name:</label>
        <input type="text" placeholder="Skiing in Alps" class="form-control" id="event-name">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" placeholder="Write something about this event!" class="form-control" id="description">
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" placeholder="Where are you going to have fun?" class="form-control" id="location">
      </div>
      <div class="form-group">
        <label for="participants">Participants</label>
        <input type="text" @keydown.tab.prevent="addParticipant" v-model="participant" placeholder="Press tab to add participant" class="form-control" id="participants">
        <div v-for="(participant, index) in this.participants" :key="index" class="participant"><small class="form-text">{{ participant }}</small></div>
      </div>
      <button type="button" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'NewEvent',
  data(){
    return {
      participant: null,
      participants: [],
    }
  },
  methods: {
    addParticipant() {
      console.log(this.participant);
      this.participants.push(this.participant);
      this.participant = "";
    }
  }
}
</script>

<style lang="scss">
.new-event {
  padding-top: 5vh;
  width: 40vw;
  height: 90vh;
  margin: auto;
}

.add-participant {
  margin-top: 10px;
}

.participant {
  background-color: #dfe4ea;
  border-radius: 2px;
  display: inline-block;
  padding: 2px 6px;
  margin: 10px 5px 0 0;
}
</style>
