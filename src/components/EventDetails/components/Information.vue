<template>
  <div class="section">
    <div class="section-header">Information</div>
    <div class="info-row">
      <span>Title</span>
      <input type="text" v-model="event.title" />
    </div>
    <div class="info-row">
      <span>Event length</span>
      <select v-model="event.lastsOneDay" class="event-duration">
        <option :value="true">One day</option>
        <option :value="false">Several days</option>
      </select>
    </div>
    <div class="info-row">
      <span v-if="event.lastsOneDay === true">Date</span>
      <span v-else>Start date</span>
      <input type="date" v-model="event.from" required />
    </div>
    <div v-if="event.lastsOneDay === false" class="info-row">
      <span>End</span>
      <input type="date" v-model="event.to" required />
    </div>
    <div class="info-row">
      <span>Description</span>
      <textarea
        class="event-description"
        rows="3"
        v-model="event.description"
      ></textarea>
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
.event-duration {
  width: 100%;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  outline: none;
  padding-left: 0;

  &:focus {
    border-bottom-color: $primary-color;
  }

  @media screen and (min-width: $mobile-width) {
    width: 65%;
  }
}

.event-description:focus {
  border-bottom-color: $primary-color;
}
</style>
