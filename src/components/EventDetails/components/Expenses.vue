<template>
  <div class="section">
    <div class="section-header">Expenses</div>
    <div
      v-for="(expense, index) in event.expenses"
      :key="index"
      class="info-row expense-list-item"
    >
      <span class="expense-name">
        <span @click="deleteExpense(index)">
          {{ expense.name }}
        </span>
      </span>
      <input type="number" v-model="expense.cost" />
    </div>
    <div class="info-row expense-list-item">
      <span>Total</span>
      <span>{{ calculateTotal }}</span>
    </div>
    <div class="info-row new-expense">
      <input
        placeholder="Expense"
        ref="expenseName"
        type="text"
        v-model="expense.name"
      />
      <input
        @keydown.enter.prevent="newExpense"
        placeholder="Cost"
        type="number"
        id="new-expense-cost"
        v-model="expense.cost"
      />
    </div>
    <div class="add-expense-pc add-pc">
      <div>Press enter to add</div>
    </div>
    <div class="info-row add-mobile">
      <button @click="newExpense" class="btn btn-primary">Add</button>
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
    deleteExpense(index) {
      this.event.expenses[index].cost = 0;
      this.event.expenses.splice(index, 1);
    },
    newExpense() {
      if (this.expense.name && this.expense.cost) {
        this.event.expenses.push({ ...this.expense });
        this.expense.name = null;
        this.expense.cost = null;
        this.$refs.expenseName.focus();
      }
    },
    emitTotalExpenses() {
      this.$emit('total-expenses', this.calculateTotal);
    },
  },
  computed: {
    calculateTotal() {
      if (this.event && this.event.expenses) {
        return this.event.expenses.reduce(
          (acc, expense) => acc + parseFloat(expense.cost),
          0,
        );
      } else {
        return 0;
      }
    },
  },
  created() {
    this.emitTotalExpenses();
  },
  updated() {
    this.emitTotalExpenses();
  },
};
</script>

<style lang="scss">
.expense-name {
  span:hover {
    color: $attention-color;
    cursor: pointer;
  }
}

.new-expense {
  input:first-child {
    width: 70%;
    margin-right: 5%;
  }

  input:last-child {
    width: 25%;
  }

  @media screen and (min-width: $mobile-width) {
    width: 100%;
  }
}

.add-expense-pc {
  div {
    margin-left: auto;
  }
}

.info-row {
  &.expense-list-item {
    flex-direction: row;
  }

  &.new-expense {
    flex-direction: row;
  }

  button {
    width: 25%;
    margin-left: auto;
  }
}
</style>
