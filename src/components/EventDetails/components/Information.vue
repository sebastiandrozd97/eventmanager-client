<template>
  <div class="details-section">
    <h2>Information</h2>
    <div class="info-row">
      <span>Title</span>
      <input type="text" v-model="event.title" />
    </div>
    <div class="info-row event-date-selection">
      <span>Event length</span>
      <select v-model="event.eventLength" name="eventLength" id="eventLength">
        <option value="one">One day</option>
        <option value="several">Several days</option>
      </select>
    </div>
    <div class="info-row">
      <span v-if="event.eventLength == 'one'">Date</span>
      <span v-else>Start date</span>
      <input type="date" v-model="event.dateFrom" required />
    </div>
    <div v-if="event.eventLength == 'several'" class="info-row">
      <span>End</span>
      <input type="date" v-model="event.dateTo" required />
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