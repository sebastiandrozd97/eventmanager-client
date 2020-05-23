<template>
  <div>
    <div class="form-group">
      <label for="event-title">Event title:</label>
      <input
        type="text"
        placeholder="Skiing in Alps"
        class="form-control"
        id="event-title"
        v-model="information.title"
        required
      />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <input
        type="text"
        placeholder="Write something about this event!"
        class="form-control"
        id="description"
        v-model="information.description"
        required
      />
    </div>
    <div class="form-group">
      <label for="location">Date</label>
      <div class="event-date-selection form-group">
        <label for="eventLength">How long the event will last?</label>
        <select
          v-model="information.lastsOneDay"
          name="eventLength"
          id="eventLength"
          required
        >
          <option :value="true">One day</option>
          <option :value="false">Several days</option>
        </select>
      </div>
      <div v-if="information.lastsOneDay != null" class="dates">
        <input
          type="date"
          class="form-control date-from"
          id="dateFrom"
          v-model="information.from"
          required
        />
        <input
          v-if="information.lastsOneDay === false"
          type="date"
          class="form-control date-to"
          id="dateTo"
          v-model="information.to"
          required
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Information',
  props: ['information'],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.dates {
  display: flex;
  width: 100%;

  .date-to {
    margin-left: 10px;
  }
}

.event-date-selection {
  select {
    width: 100%;
    height: 38px;
    padding: 6px 12px 6px 12px;
    border-radius: 5px;
    border: 1px solid #ced4da;
  }
}
</style>
