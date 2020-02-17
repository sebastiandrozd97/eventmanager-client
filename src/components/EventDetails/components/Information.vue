<template>
  <div class="details-section">
    <h2>Information</h2>
    <div class="info-row">
      <span>Title</span>
      <input type="text" v-model="event.title" />
    </div>
    <div class="info-row">
      <span>Date</span>
      <input type="date" v-model="event.date" />
    </div>
    <div class="info-row">
      <span>Description</span>
      <textarea rows="3" v-model="event.description"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Information',
  props: ['event'],
};
</script>

<style lang="scss">
</style>