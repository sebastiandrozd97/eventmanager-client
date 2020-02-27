<template>
  <div class="event-details event">
    <div v-if="event" class="details-container">
      <Information :event="event" />
      <Location :event="event" ref="locationComponent" />
      <Expenses :event="event" @total-expenses="totalExpensesComputed" />
      <People :event="event" :totalExpenses="totalExpenses" />
      <div class="section">
        <h2>Event</h2>
        <div class="share-link">
          <h5 v-if="eventShareLink">{{ eventShareLink }}</h5>
        </div>
        <div class="details-buttons">
          <button id="update-button" @click="updateEvent">Update</button>
          <button @click="generateLink">Generate link</button>
          <button @click="$emit('delete-event', event.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Information from '@/components/EventDetails/components/Information';
import Location from '@/components/EventDetails/components/Location';
import Expenses from '@/components/EventDetails/components/Expenses';
import People from '@/components/EventDetails/components/People';
import db from '@/firebase/init';
import slugify from 'slugify';
import { checkSlugAvailability } from '@/utils/checkSlugAvailability.js';

export default {
  name: 'EventDetails',
  components: {
    Information,
    Location,
    Expenses,
    People,
  },
  props: ['event'],
  data() {
    return {
      updateDelay: null,
      totalExpenses: null,
      initEvent: null,
      eventShareLink: null,
    };
  },
  methods: {
    totalExpensesComputed(val) {
      this.totalExpenses = val;
    },
    generateLink() {
      this.eventShareLink = "http://localhost:8080/event-overview/" + this.event.id;
    },
    slugifyTitle() {
      return slugify(this.event.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });
    },
    async updateFirebaseCollection(slug){
      await db
        .collection('events')
        .doc(this.event.id)
        .update({
          title: this.event.title,
          slug,
          location: {
            place: this.event.location.place,
            address: this.event.location.address,
            lat: this.event.location.lat,
            lng: this.event.location.lng
          },
          eventLength: this.event.eventLength,
          dateFrom: Date.parse(this.event.dateFrom),
          dateTo: Date.parse(this.event.dateTo),
          description: this.event.description,
          expenses: this.event.expenses.filter(
            expense => expense.cost > 0
          ),
          participants: this.event.participants.filter(
            participant => participant.status != 'To delete'
          ),
        });
    },
    async updateEvent() {
      if (this.event.eventLength == 'one') {
        this.event.dateTo = this.event.dateFrom;
      }
      let verifiedSlug = null;
      if(this.initTitle === this.event.title){
        verifiedSlug = this.event.slug;
      } else {
        verifiedSlug = await checkSlugAvailability(this.slugifyTitle());
      }
      this.$refs.locationComponent.setAddress();
      this.updateFirebaseCollection(verifiedSlug);
      document.getElementById("update-button").style.background = "green";
      setTimeout(() => {
        document.getElementById("update-button").style.background = "#007bff";
      }, 1000)
    },
  },
  created() {
    if(this.event){
      this.initTitle = this.event.title;
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/event.scss";

.event-details {
  height: 90vh;
  overflow-y: scroll;
}

.details-container {
  width: 80%;
  margin: 0 auto 3% auto;

  .info-row {
    input:focus {
      border-bottom-color: #007bff;
    }
  }
}

.share-link {
  width: 100%;
  text-align: center;
}

.details-buttons {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-around;


  button {
    color: white;
    background-color: #007bff;
    border: none;
    width: 30%;
    height: 2.5em;

    &:nth-child(2) {
      background-color: #2ecc71;
    }

    &:last-child {
      background-color: #c0392b;
    }
  }
}

</style>
