<template>
  <div class="list-group">
    <div class="search-bar">
      <input
        v-model="searchText"
        class="list-group-item search"
        type="text"
        placeholder="Search..."
      />
      <input
        v-model="searchDate"
        class="list-group-item search"
        :type="type"
        placeholder="Date"
        onfocus="type='date'"
        onblur="type='text'"
      />
    </div>
    <Event
      v-for="(event, index) in filteredEvents"
      :key="index"
      :event="event"
    />
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
      searchDate: '',
      type: 'text'
    };
  },
  computed: {
    filteredEvents: function() {
      return this.events.filter(event => {
        if (this.searchDate) {
          const dateFrom = new Date(event.from);
          const dateTo = new Date(event.to);
          const date = new Date(this.searchDate);
          return (
            event.title
              .toLowerCase()
              .trim()
              .match(this.searchText.toLowerCase().trim()) &&
            date.getTime() <= dateTo.getTime() &&
            date.getTime() >= dateFrom.getTime()
          );
        } else {
          return event.title
            .toLowerCase()
            .trim()
            .match(this.searchText.toLowerCase().trim());
        }
      });
    },
  },
};
</script>

<style lang="scss">
.list-group {
  height: 100%;
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

.search-bar {
  width: 100%;
  height: 8vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;

  .search {
    width: 60%;
    border: none;
    background-color: #ebebeb;
    height: 100%;
    &:focus {
      outline: none;
    }

    &:last-child {
      width: 40%;
      border-left: 1px solid rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
