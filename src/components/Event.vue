<template>
  <div>
    <a href="#" class="list-group-item list-group-item-action">
      <h5 class="mb-1">{{ event.title }}</h5>
      <p class="mb-1">{{ event.description }}</p>
      <div class="d-flex w-100 justify-content-between">
        <small class="text-muted">{{ event.location }}</small>
        <small>{{ event.date }}</small>
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

<style lang="scss" scoped>

</style>