<template>
  <div class="section">
    <div class="section-header">Information</div>
    <div class="info-row">
      <span>Title</span>
      <input type="text" v-model="event.title" readonly />
    </div>
    <div class="info-row">
      <span v-if="event.lastsOneDay === true">Date</span>
      <span v-else>Start date</span>
      <input type="date" v-model="event.from" readonly />
    </div>
    <div v-if="event.lastsOneDay === false" class="info-row">
      <span>End</span>
      <input type="date" v-model="event.to" readonly />
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
