<template>
  <div>
    <a href="#" class="list-group-item list-group-item-action" :class = "event.active">
      <h6 class="mb-1">{{ event.title }}</h6>
      <p class="mb-1 description">{{ event.description }}</p>
      <div class="d-flex w-100 justify-content-between">
        <small class="text-muted">{{ event.location }}</small>
        <small class="text-muted">{{ event.date }}</small>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ListGroupItem',
  props: ['event'],
  data(){
    return {

    }
  }
}
</script>

<style lang="scss">
.list-group-item {
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group-item.active {
  .text-muted {
    color: white !important;
    font-size: 0.7em;
  }
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
</style>