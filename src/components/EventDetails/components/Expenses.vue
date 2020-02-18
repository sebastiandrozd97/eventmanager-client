<template>
  <div class="details-section">
    <h2>Expenses</h2>
    <div v-for="(expense, index) in event.expenses" :key="index" class="info-row">
      <span class="expense">
        <span @click="deleteExpense" :data_index="index">{{ expense.name }}</span>
      </span>
      <input type="number" v-model="expense.cost" />
    </div>
    <div class="info-row">
      <span>Total</span>
      <span>{{ calculateTotal }}</span>
    </div>
    <div class="info-row new-expense">
      <input placeholder="Expense" ref="expenseName" type="text" v-model="expense.name" />
      <input
        @keydown.enter.prevent="newExpense"
        placeholder="Cost | Press enter to add"
        type="number"
        v-model="expense.cost"
      />
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
    deleteExpense(e) {
      const indexOfExpense = e.currentTarget.getAttribute('data_index');
      this.event.expenses[indexOfExpense].cost = 0;
      this.event.expenses.splice(indexOfExpense, 1);
    },
    newExpense() {
      if (this.expense.name && this.expense.cost) {
        this.event.expenses.push({ ...this.expense });
        this.expense.name = null;
        this.expense.cost = null;
        this.$refs.expenseName.focus();
      }
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
    this.$emit('total-expenses', this.calculateTotal);
  },
  updated() {
    this.$emit('total-expenses', this.calculateTotal);
  },
};
</script>

<style lang="scss">
</style>