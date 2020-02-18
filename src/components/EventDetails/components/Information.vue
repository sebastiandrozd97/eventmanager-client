<template>
  <div class="details-section">
    <h2>Information</h2>
    <div class="info-row">
      <span>Title</span>
      <input type="text" v-model="event.title" />
    </div>
    <div class="event-date-selection form-group">
      <label for="eventLength">How long the event will last?</label>
      <select v-model="event.eventLength" name="eventLength" id="eventLength">
        <option value="one">One day</option>
        <option value="several">Several days</option>
      </select>
    </div>
    <div class="info-row">
      <span>Date from</span>
      <input type="date" v-model="event.dateFrom" />
    </div>
    <div class="info-row">
      <span>Date to</span>
      <input type="date" v-model="event.dateTo" />
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