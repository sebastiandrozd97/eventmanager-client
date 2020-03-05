<template>
  <div class="section">
    <div class="section-header">Location</div>
    <div class="info-row">
      <span>Place</span>
      <input class="address-info" type="text" v-model="event.location.place" readonly />
    </div>
    <div v-if="event.location.place !== event.location.address" class="info-row">
      <span>Address</span>
      <input class="address-info" type="text" v-model="event.location.address" readonly />
    </div>
    <div class="info-row">
      <span>Place a marker on a map</span>
      <input
        placeholder="and manually name the location"
        type="text"
        v-model="customAddress"
        @focus="clearAutocomplete"
      />
    </div>
    <div class="info-row">
      <span>or find location</span>
      <input
        placeholder="Location"
        type="text"
        id="searchForLocation"
        autocomplete="new-password"
        onfocus="this.setAttribute('autocomplete', 'new-password');"
      />
    </div>
    <div class="map" id="map"></div>
  </div>
</template>
<script>
export default {
  name: 'Location',
  props: ['event'],
  data(){
    return {
      map: null,
      marker: null,
      autocomplete: null,
      address: null,
      place: null,
      latLng: null,
      customLatLng: null,
      customAddress: null,
    }
  },
  methods: {
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
    clearAutocomplete(){
      this.address = null;
      document.getElementById('searchForLocation').value = "";
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
        this.customLatLng = null;
        this.customAddress = null;
      });
      this.geolocate(google, autocomplete);
    },
    setAddress(){
      if(this.address){
        this.event.location.address = this.address;
        this.event.location.place = this.place;
        this.event.location.lat = this.latLng.lat;
        this.event.location.lng = this.latLng.lng;
      } else if(this.customAddress || this.customLatLng) {
        if(this.customAddress){
          this.event.location.address = this.customAddress;
          this.event.location.place = this.customAddress;
        }
        if(this.customLatLng){
          this.event.location.lat = this.customLatLng.lat();
        this.event.location.lng = this.customLatLng.lng();
        }
      }
      
    },
    setMarker(location = { lat: this.event.location.lat, lng: this.event.location.lng}){
      this.marker.setPosition(location);
      this.customLatLng = location;
    },
    renderMap(){
      this.map = new this.google.maps.Map(document.getElementById('map'), {
        center: {
          lat: this.event.location.lat,
          lng: this.event.location.lng 
        },
        zoom: 15,
        maxZoom: 20,
        minZoom: 10,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      })

      this.marker = new this.google.maps.Marker({
          position: {
            lat: this.event.location.lat,
            lng: this.event.location.lng
          },
          map: this.map,
      })
      
      this.map.addListener('click', event => {
        this.setMarker(event.latLng);
      })

      return this.map;
    },
  },
  async created() {
    this.google = await this.$gmapApiPromiseLazy()
    if(this.google && this.event){
      this.renderMap();
    }
    this.initAutocomplete(this.google);
  }
};
</script>

<style lang="scss">

.address-info:focus {
  border-bottom-color: rgba(0, 0, 0, 0.1) !important;
}

</style>