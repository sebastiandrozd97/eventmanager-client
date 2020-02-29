<template>
  <div>
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
        v-model="location.manualAddress"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Location',
    props: ['location'],
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
      initAutocomplete(google){
        const input = document.getElementById('searchForLocation');

        let autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.addListener('place_changed', () => {
          const locationInfo = autocomplete.getPlace();
          this.location.place = locationInfo.name;
          this.location.address = locationInfo.vicinity;
          this.location.latLng = {lat: locationInfo.geometry.location.lat(), lng: locationInfo.geometry.location.lng()}
          this.map.setCenter(this.location.latLng);
          this.setMarker(this.location.latLng);
          this.location.manualLatLng = null;
          this.location.manualAddress = null;
        });
        this.geolocate(google, autocomplete);
      },
      chooseAddressType(){
        if(this.location.manualAddress && this.location.manualLatLng){
          this.location.address = this.location.manualAddress;
          this.location.place = this.location.manualAddress;
          this.location.latLng = this.location.manualLatLng;
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
            map: this.map,
        })
        
        this.map.addListener('click', event => {
          this.setMarker(event.latLng);
        })

        return this.map;
      },
      setMarker(location = { lat: this.event.location.lat, lng: this.event.location.lng}){
        this.marker.setPosition(location);
        this.location.manualLatLng = location;
      },
    },
    async created() {
      this.google = await this.$gmapApiPromiseLazy()
      if(this.google){
        this.renderMap();
      }
      this.initAutocomplete(this.google);
    }
  }
</script>

<style lang="scss" scoped>

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

</style>