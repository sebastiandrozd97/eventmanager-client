<template>
  <div class="section">
    <h2>Expenses</h2>
    <div v-for="(expense, index) in event.expenses" :key="index" class="info-row">
      <span>
        <span>{{ expense.name }}</span>
      </span>
      <input type="number" v-model="expense.cost" readonly />
    </div>
    <div class="info-row">
      <span>Total</span>
      <span>{{ calculateTotal }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Expenses',
  props: ['event'],
  data() {
    return {
      expense: {
        name: null,
        cost: null,
      },
    };
  },
  methods: {
    emitTotalExpenses() {
      this.$emit('total-expenses', this.calculateTotal);
    },
  },
  computed: {
    calculateTotal() {
      if (this.event && this.event.expenses) {
        return this.event.expenses.reduce(
          (acc, expense) => acc + parseFloat(expense.cost),
          0
        );
      } else {
        return 0;
      }
    },
  },
  created() {
    this.emitTotalExpenses();
  },
};
</script>

<style lang="scss">
</style>