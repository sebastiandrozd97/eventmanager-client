<template>
  <div id="event-list">
    <div class="list-group">
      <input
        v-model="searchText"
        class="list-group-item search"
        type="text"
        placeholder="Search..."
      />
      <Event
        v-for="(event, index) in filteredEvents"
        :key="index"
        :event="event"
      />
    </div>
  </div>
</template>

<script>
import Event from '@/components/Event';

export default {
  name: 'EventList',
  components: {
    Event,
  },
  props: ['events'],
  data() {
    return {
      event,
      searchText: '',
    };
  },
  computed: {
    filteredEvents: function() {
      return this.events.filter(event => {
        return event.title
          .toLowerCase()
          .trim()
          .match(this.searchText.toLowerCase().trim());
      });
    },
  },
};
</script>

<style lang="scss">
.list-group {
  height: 90vh;
  overflow-y: scroll;
}

.list-group::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.list-group::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 3px;

  &:active {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.search {
  background: #f6f6f6;
}
</style>
