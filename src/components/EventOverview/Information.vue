<template>
  <div class="section">
    <h2>Information</h2>
    <div class="info-row">
      <span>Title</span>
      <input type="text" v-model="event.title" readonly />
    </div>
    <div class="info-row">
      <span v-if="event.eventLength == 'one'">Date</span>
      <span v-else>Start date</span>
      <input type="date" v-model="event.dateFrom" readonly />
    </div>
    <div v-if="event.eventLength == 'several'" class="info-row">
      <span>End</span>
      <input type="date" v-model="event.dateTo" readonly />
    </div>
    <div class="info-row">
      <span>Description</span>
      <textarea rows="3" v-model="event.description" readonly></textarea>
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