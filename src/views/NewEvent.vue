<template>
  <div class="new-event">
    <form @submit.prevent="addEvent">
      <div class="form-group">
        <label for="event-title">Event title:</label>
        <input type="text" placeholder="Skiing in Alps" class="form-control" id="event-title" v-model="title" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" placeholder="Write something about this event!" class="form-control" id="description" v-model="description" required>
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" placeholder="Where are you going to have fun?" class="form-control" id="location" v-model="location" required>
      </div>
      <div class="form-group">
        <label for="participants">Participants</label>
        <input type="text" @keydown.enter.prevent="addParticipant" v-model="participant.name" placeholder="Press tab to add participant" class="form-control" id="participants">
        <div v-for="(participant, index) in this.participants" :key="index" class="participant"><small class="form-text">{{ participant.name }}</small></div>
      </div>
      <div class="form-group">
        <label for="participants">Items and costs</label>
        <div class="form-group row items">
          <input 
            type="text" 
            v-model="item.name" placeholder="Name of item and cost" 
            class="form-control item-cost" 
            id="item"
            ref="itemName">
          <input
            type="number" 
            @keydown.enter.prevent="addItem" 
            v-model.number="item.cost" 
            placeholder="Press tab to add" 
            class="form-control item-cost" 
            id="cost">
        </div>
        <div 
          v-for="(item, index) in items" 
          :key="index" 
          class="participant">
          <small class="form-text">{{ item.name }}: {{ item.cost }}</small></div>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'NewEvent',
  data(){
    return {
      title: null,
      description: null,
      location: null,
      locationId: null,
      participant: {
        name: null,
        status: 'Not paid'
      },
      participants: [],
      item: {
        name: null,
        cost: null
      },
      items: [],
    }
  },
  methods: {
    addParticipant(){
      if(this.participant){
        this.participants.push({...this.participant})
        this.participant.name = null
      }
    },
    addItem(){
      if(this.item.name && this.item.cost){
        this.items.push({...this.item})
        this.item.name = null
        this.item.cost = null
        this.$refs.itemName.focus()
      }
    },
    async addEvent(){
      if(this.participants || this.participant){
        this.addParticipant()
        this.addItem()
        const slugLocation = slugify(this.location, {
          replacement: '-',
          remove: /[*+~.()'"!:@]/g,
          lower: true
        })
        let location = await db.collection('locations').doc(slugLocation).get()
        if(location.exists){
          this.locationId = slugLocation
        } else {
          await db.collection('locations').doc(slugLocation).set({
            location: this.location
          })
          this.locationId = slugLocation
        }
        const slugTitle = slugify(this.title, {
          replacement: '-',
          remove: /[*+~.()'"!:@]/g,
          lower: true
        })
        await db.collection('events').doc(slugTitle).set({
          userId: firebase.auth().currentUser.uid,
          title: this.title,
          description: this.description,
          date: Date.now(),
          locationId: this.locationId,
          participants: this.participants,
          items: this.items
        })
        this.$router.push({ name: 'Events' })
      }
    }
  }
}
</script>

<style lang="scss">
.new-event {
  padding-top: 3vh;
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

.items {
  width: 100%;
  margin: 0;
  input {
    border-radius: 0;
    width: 30%;
    &:focus {
      z-index: 2;
    }
    &:first-child {
      border-right: 0;
      width: 70%;
    }
  }
}
</style>
