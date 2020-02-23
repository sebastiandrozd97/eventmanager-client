<template>
  <div class="details-section">
    <h2>Location</h2>
    <div class="info-row">
      <span>Place a marker on a map</span>
      <input placeholder="and manually name the location" type="text" v-model="manualAddress" />
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
    <div class="details-map" id="map"></div>
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
      manualLatLng: null,
      manualAddress: null,
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
    getAddr(){
      if(this.address){
        this.event.location.address = this.address;
        this.event.location.place = this.place;
        this.event.location.lat = this.latLng.lat;
        this.event.location.lng = this.latLng.lng;
      } else if(this.manualAddress || this.manualLatLng) {
        if(this.manualAddress){
          this.event.location.address = this.manualAddress;
          this.event.location.place = this.manualAddress;
        }
        if(this.manualLatLng){
          this.event.location.lat = this.manualLatLng.lat();
        this.event.location.lng = this.manualLatLng.lng();
        }
      }
      
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
    setMarker(location = { lat: this.event.location.lat, lng: this.event.location.lng}){
      this.marker.setPosition(location);
      this.manualLatLng = location;
    },
  },
  async created() {
    this.$emit('getAddr')
    this.google = await this.$gmapApiPromiseLazy()
    if(this.google && this.event){
      this.renderMap();
    }

    const input = document.getElementById('searchForLocation');
    const options = {
      types: ['establishment'],
    };

    let autocomplete = new this.google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', () => {
      const placee = autocomplete.getPlace();
      this.place = placee.name;
      this.address = placee.vicinity;
      this.latLng = {lat: placee.geometry.location.lat(), lng: placee.geometry.location.lng()}
      this.map.setCenter(this.latLng);
      this.setMarker(this.latLng);
      this.manualLatLng = null;
      this.manualAddress = null;
    });
    this.geolocate(this.google, autocomplete);
  }
};
</script>

<style lang="scss">

.details-map {
  background-size: no-repeat;
  background-size: contain;
  width: 100%;
  height: 0;
  padding-top: 57.53%; //height to width ratio
}
</style>