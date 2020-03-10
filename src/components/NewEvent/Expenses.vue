<template>
  <div class="form-group new-event-container">
    <label for="participants">Expenses and costs</label>
    <div class="form-group row expenses">
      <input
        type="text"
        v-model="expense.name"
        placeholder="Expense's name"
        class="form-control expense-cost"
        id="expense"
        ref="expenseName"
      />
      <input
        type="number"
        @keydown.enter.prevent="addExpense"
        v-model.number="expense.cost"
        placeholder="Cost"
        class="form-control expense-cost"
        id="cost"
      />
    </div>
    <div class="add-pc">
      <div>Press enter to add</div>
    </div>
    <div class="add-mobile">
      <button @click.prevent="addExpense" class="btn btn-primary">Add</button>
    </div>
    <div
      v-for="(expense, index) in expenses"
      :key="index"
      @click="deleteExpense(index)"
      class="item"
    >
      <small class="form-text">{{ expense.name }}: {{ expense.cost }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Expenses',
  props: ['expenses', 'expense'],
  methods: {
    addExpense() {
      if (this.expense.name && this.expense.cost) {
        this.expenses.push({ ...this.expense });
        this.expense.name = null;
        this.expense.cost = null;
        this.$refs.expenseName.focus();
      }
    },
    deleteExpense(index) {
      this.expenses.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.expenses {
  width: 100%;
  margin: 0;

  input {
    width: 40%;

    &:focus {
      z-index: 2;
    }

    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
      width: 60%;
    }

    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}

.item {
  background-color: #dfe4ea;
  border-radius: 2px;
  display: inline-block;
  padding: 2px 6px;
  margin: 10px 5px 0 0;
  cursor: pointer;

  &:hover {
    background-color: $attention-color;
    color: white;
  }
}
</style>
