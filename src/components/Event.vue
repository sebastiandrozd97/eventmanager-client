<template>
  <div class="single-event">
    <router-link
      class="router-links list-group-item list-group-item-action"
      :to="{ name: 'Event', params: { slug: event.slug } }"
    >
      <h6 class="mb-1">{{ event.title }}</h6>
      <p class="mb-1 description">{{ event.description }}</p>
      <div class="d-flex w-100 justify-content-between">
        <small class="text-muted">{{ event.location.place }}</small>
        <small v-if="event.dateFrom != event.dateTo" class="text-muted">
          {{ event.dateFrom | getDay }}-{{ event.dateTo | dateFormat }}
        </small>
        <small v-else class="text-muted">
          {{ event.dateFrom | dateFormat }}
        </small>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Event',
  props: ['event'],
};
</script>

<style lang="scss">
.list-group-item {
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.description {
  font-size: 0.8em;
}

.list-group-item:first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
}

.list-group-item:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.single-event {
  .text-muted {
    font-size: 0.7em;
  }

  .router-link-active {
    background-color: $primary-color;
    color: white;

    .text-muted {
      color: rgba(255, 255, 255, 0.75) !important;
      font-size: 0.8em;
    }
  }
}
</style>
