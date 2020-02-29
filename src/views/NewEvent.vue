<template>
  <div class="new-event">
    <form class="new-event-form" @submit.prevent="addEvent">
      <Information :information="information" />
      <Location ref="locationComponent" :location="location" />
      <Participants
        ref="participantsComponent"
        :participant="participant"
        :participants="participants"
      />
      <Expenses ref="expensesComponent" :expenses="expenses" :expense="expense" />
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
import Information from '@/components/NewEvent/Information';
import Location from '@/components/NewEvent/Location';
import Participants from '@/components/NewEvent/Participants';
import Expenses from '@/components/NewEvent/Expenses';
import firebase from 'firebase';
import db from '@/firebase/init';
import slugify from 'slugify';
import { checkSlugAvailability } from '@/utils/checkSlugAvailability.js';

export default {
  name: 'NewEvent',
  components: {
    Information,
    Location,
    Participants,
    Expenses,
  },
  data() {
    return {
      information: {
        title: null,
        description: null,
        eventLength: null,
        dateFrom: null,
        dateTo: null,
      },
      location: {
        map: null,
        marker: null,
        address: null,
        place: null,
        latLng: null,
        manualLatLng: null,
        manualAddress: null,
      },
      participant: {
        name: null,
        status: 'Not paid',
      },
      participants: [],
      expense: {
        name: null,
        cost: null,
      },
      expenses: [],
    };
  },
  methods: {
    async addEventDocument(slugTitle) {
      await db.collection('events').add({
        userId: firebase.auth().currentUser.uid,
        title: this.information.title,
        description: this.information.description,
        eventLength: this.information.eventLength,
        dateFrom: Date.parse(this.information.dateFrom),
        dateTo: Date.parse(this.information.dateTo),
        location: {
          place: this.location.place,
          address: this.location.address,
          lat: this.location.latLng.lat,
          lng: this.location.latLng.lng
        },
        participants: this.participants,
        expenses: this.expenses,
        slug: slugTitle,
      });
    },
    async getSlugTitleVerified() {
      const slugTitle = slugify(this.information.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });
      return await checkSlugAvailability(slugTitle);
    },
    async addEvent() {
      if ((this.participants || this.participant.name) && this.information.dateFrom) {
        this.$refs.participantsComponent.addParticipant();
        this.$refs.expensesComponent.addExpense();
        this.$refs.locationComponent.chooseAddressType();
        if (!this.information.dateTo) {
          this.information.dateTo = this.information.dateFrom;
        }
        await this.addEventDocument(await this.getSlugTitleVerified());
        this.$router.push({ name: 'Events' });
      }
    },
  },
};
</script>

<style lang="scss">

.new-event {
  width: 100%;
  height: 90vh;
  margin: auto;
  overflow-y: scroll;
}

.new-event-form {
  margin: 3vh auto 3vh auto;
  width: 40%;
}

.new-event::-webkit-scrollbar {
  width: 14px;
  height: 18px;
}

.new-event::-webkit-scrollbar-thumb {
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

.new-event::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

.new-event::-webkit-scrollbar-corner {
  background-color: transparent;
}

</style>
