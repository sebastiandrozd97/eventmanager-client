<template>
  <div class="details-section">
    <h2>Location</h2>
    <div class="details-map"></div>
  </div>
</template>

<script>
export default {
  name: 'Location',
  props: ['event'],
};
</script>

<style lang="scss">

.details-map {
  background-image: url('../../../assets/img/map.png');
  background-size: no-repeat;
  background-size: contain;
  width: 100%;
  height: 0;
  padding-top: 57.53%; //height to width ratio
}

</style>