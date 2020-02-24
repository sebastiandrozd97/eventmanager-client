<template>
  <div class="new-event">
    <form class="new-event-form" @submit.prevent="addEvent">
      <div class="form-group">
        <label for="event-title">Event title:</label>
        <input
          type="text"
          placeholder="Skiing in Alps"
          class="form-control"
          id="event-title"
          v-model="title"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          placeholder="Write something about this event!"
          class="form-control"
          id="description"
          v-model="description"
          required
        />
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input
          placeholder="Find your location"
          type="text"
          id="searchForLocation"
          class="form-control location-autocomplete"
          autocomplete="new-password"
          onfocus="this.setAttribute('autocomplete', 'new-password');"
        />
        <div class="new-event-map" id="map"></div>
        <input
          type="text"
          placeholder="or place a marker and write the name"
          class="form-control custom-address"
          id="manualAddress"
          v-model="manualAddress"
        />
      </div>
      <div class="form-group">
        <label for="location">Date</label>
        <div class="event-date-selection form-group">
          <label for="eventLength">How long the event will last?</label>
          <select v-model="eventLength" name="eventLength" id="eventLength" required>
            <option value="one">One day</option>
            <option value="several">Several days</option>
          </select>
        </div>
        <div v-if="eventLength" class="dates">
          <input
            type="date"
            class="form-control date-from"
            id="dateFrom"
            v-model="dateFrom"
            required
          />
          <input
            v-if="eventLength == 'several'"
            type="date"
            class="form-control date-to"
            id="dateTo"
            v-model="dateTo"
            required
          />
        </div>
      </div>
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
      <div class="form-group">
        <label for="participants">Expenses and costs</label>
        <div class="form-group row expenses">
          <input
            type="text"
            v-model="expense.name"
            placeholder="Expense's name"
            class="form-control expense-cost"
            id="expense"
            ref="expenseName"
          />
          <input
            type="number"
            @keydown.enter.prevent="addExpense"
            v-model.number="expense.cost"
            placeholder="Cost | Press enter to add"
            class="form-control expense-cost"
            id="cost"
          />
        </div>
        <div
          v-for="(expense, index) in expenses"
          :key="index"
          @click="deleteExpense"
          :data_index="index"
          class="item"
        >
          <small class="form-text">{{ expense.name }}: {{ expense.cost }}</small>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';
import slugify from 'slugify';
import { checkSlugAvailability } from '@/utils/checkSlugAvailability.js';

export default {
  name: 'NewEvent',
  data() {
    return {
      title: null,
      description: null,
      map: null,
      marker: null,
      autocomplete: null,
      address: null,
      place: null,
      latLng: null,
      manualLatLng: null,
      manualAddress: null,
      eventLength: null,
      dateFrom: null,
      dateTo: null,
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
    addParticipant() {
      if (this.participant.name) {
        this.participants.push({ ...this.participant });
        this.participant.name = null;
      }
    },
    deleteParticipant(e) {
      this.participants.splice(e.currentTarget.getAttribute('data_index'), 1);
    },
    addExpense() {
      if (this.expense.name && this.expense.cost) {
        this.expenses.push({ ...this.expense });
        this.expense.name = null;
        this.expense.cost = null;
        this.$refs.expenseName.focus();
      }
    },
    deleteExpense(e) {
      this.expenses.splice(e.currentTarget.getAttribute('data_index'), 1);
    },
    geolocate(google, autocomplete) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle(
              {center: geolocation, radius: position.coords.accuracy});
          autocomplete.setBounds(circle.getBounds());
        });
      }
    },
    initAutocomplete(google){
      const input = document.getElementById('searchForLocation');

      let autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', () => {
        const locationInfo = autocomplete.getPlace();
        this.place = locationInfo.name;
        this.address = locationInfo.vicinity;
        this.latLng = {lat: locationInfo.geometry.location.lat(), lng: locationInfo.geometry.location.lng()}
        this.map.setCenter(this.latLng);
        this.setMarker(this.latLng);
        this.manualLatLng = null;
        this.manualAddress = null;
      });
      this.geolocate(google, autocomplete);
    },
    chooseAddressType(){
      if(this.manualAddress && this.manualLatLng){
        this.address = this.manualAddress;
        this.place = this.manualAddress;
        this.latLng = this.manualLatLng;
      }
    },
    renderMap(){
      this.map = new this.google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 52.2297,
          lng: 21.0122 
        },
        zoom: 8,
        maxZoom: 20,
        minZoom: 5,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      })

      this.marker = new this.google.maps.Marker({
          position: {
            lat: 52.2297,
            lng: 21.0122
          },
          map: this.map,
      })
      
      this.map.addListener('click', event => {
        this.setMarker(event.latLng);
      })

      return this.map;
    },
    setMarker(location = { lat: this.event.location.lat, lng: this.event.location.lng}){
      this.marker.setPosition(location);
      this.manualLatLng = location;
    },
    async addEventDocument(slugTitle) {
      await db.collection('events').add({
        userId: firebase.auth().currentUser.uid,
        title: this.title,
        description: this.description,
        eventLength: this.eventLength,
        dateFrom: Date.parse(this.dateFrom),
        dateTo: Date.parse(this.dateTo),
        location: {
          place: this.place,
          address: this.address,
          lat: this.latLng.lat(),
          lng: this.latLng.lng()
        },
        participants: this.participants,
        expenses: this.expenses,
        slug: slugTitle,
      });
    },
    async addEvent() {
      if ((this.participants || this.participant.name) && this.dateFrom) {
        this.addParticipant();
        this.addExpense();
        this.chooseAddressType();
        console.log(this.place, this.address, this.latLng.lat(), this.latLng.lng());
        if (!this.dateTo) {
          this.dateTo = this.dateFrom;
        }
        const slugTitle = slugify(this.title, {
          replacement: '-',
          remove: /[*+~.()'"!:@]/g,
          lower: true,
        });
        const slugTitleVerified = await checkSlugAvailability(slugTitle);
        debugger;
        await this.addEventDocument(slugTitleVerified);
        this.$router.push({ name: 'Events' });
      }
    },
  },
  async created() {
    this.google = await this.$gmapApiPromiseLazy()
    if(this.google){
      this.renderMap();
    }
    this.initAutocomplete(this.google);
  }
};
</script>

<style lang="scss">
.new-event {
  width: 40vw;
  height: 90vh;
  margin: auto;
}

.new-event-form {
  margin: 3vh 0 3vh 0;

  .event-date-selection {
    select {
      width: 100%;
      height: 38px;
      padding: 6px 12px 6px 12px;
      border-radius: 5px;
      border: 1px solid #ced4da;
    }
  }
}

.location-autocomplete {
  margin-bottom: 20px;
}

.custom-address {
  margin-top: 20px;
}

.new-event-map {
  width: 100%;
  height: 0;
  padding-top: 60%;
  background: black;
}

.dates {
  display: flex;
  width: 100%;

  .date-to {
    margin-left: 10px;
  }
}

.add-participant {
  margin-top: 10px;
}

.item {
  background-color: #dfe4ea;
  border-radius: 2px;
  display: inline-block;
  padding: 2px 6px;
  margin: 10px 5px 0 0;

  &:hover {
    background-color: red;
    color: white;
    cursor: pointer;
  }
}

.expenses {
  width: 100%;
  margin: 0;
  input {
    width: 40%;
    &:focus {
      z-index: 2;
    }
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
      width: 60%;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
