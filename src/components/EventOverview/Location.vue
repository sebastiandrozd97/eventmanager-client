<template>
  <div class="section">
    <div class="section-header">Location</div>
    <div
      v-if="event.place !== event.address"
      class="info-row"
    >
      <span>Address</span>
      <input type="text" v-model="event.address" readonly />
    </div>
    <div class="info-row">
      <span>Place</span>
      <input
        placeholder="Location"
        type="text"
        id="searchForLocation"
        v-model="event.place"
        readonly
      />
    </div>
    <div class="map" id="map"></div>
  </div>
</template>
<script>
export default {
  name: 'Location',
  props: ['event'],
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  methods: {
    renderMap() {
      this.map = new this.google.maps.Map(document.getElementById('map'), {
        center: {
          lat: this.event.lat,
          lng: this.event.lng,
        },
        zoom: 15,
        maxZoom: 20,
        minZoom: 5,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      });

      this.marker = new this.google.maps.Marker({
        position: {
          lat: this.event.lat,
          lng: this.event.lng,
        },
        map: this.map,
      });

      return this.map;
    },
  },
  async created() {
    this.google = await this.$gmapApiPromiseLazy();
    if (this.google && this.event) {
      this.renderMap();
    }
  },
};
</script>
