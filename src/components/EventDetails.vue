<template>
  <div ref="details" class="event-details">
    <div v-if="event" class="details-container">
      <div class="details-section">
        <h1>Information</h1>
        <div class="info-row">
          <span>Title</span>
          <input type="text" v-model="event.title" />
        </div>
        <div class="info-row">
          <span>Date</span>
          <input type="date" v-model="event.date" />
        </div>
        <div class="info-row">
          <span>Description</span>
          <input type="text" v-model="event.description" />
        </div>
      </div>
      <div class="details-section">
        <h1>Location</h1>
        <div class="details-map"></div>
      </div>
      <div class="details-section">
        <h1>Costs</h1>
        <div
          v-for="(expense, index) in event.expenses"
          :key="index"
          class="info-row"
        >
          <span class="expense" @click="deleteExpense" :data_index="index">
            {{ expense.name }}
          </span>
          <input type="number" v-model="expense.cost" />
        </div>
        <div class="info-row">
          <span>Total</span>
          <span>{{ calculateTotal }}</span>
        </div>
        <div class="info-row new-expense">
          <input
            placeholder="Expense's name"
            type="text"
            v-model="expense.name"
          />
          <input
            @keydown.enter.prevent="newExpense"
            placeholder="Cost | Press enter to add"
            type="number"
            v-model="expense.cost"
          />
        </div>
      </div>
      <div class="details-section">
        <h1>People</h1>
        <div class="total-cost">Each pays {{ calculateEachPayment }}</div>
        <div
          v-for="(participant, index) in event.participants"
          :key="index"
          class="payments-row"
        >
          <span>{{ participant.name }}</span>
          <span class="payment-status" :class="participant.status">
            {{ participant.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'EventDetails',
  props: ['event'],
  data() {
    return {
      updateDelay: null,
      expense: {
        name: null,
        cost: null,
      },
    };
  },
  methods: {
    deleteExpense(e) {
      const element = e.currentTarget;
      const indexOfCost = element.getAttribute('data_index');
      element.parentNode.remove();
      this.event.expenses[indexOfCost].cost = 0;
    },
    newExpense() {
      if (this.expense.name && this.expense.cost) {
        this.event.expenses.push({ ...this.expense });
        this.expense.name = null;
        this.expense.cost = null;
      }
    },
  },
  computed: {
    calculateTotal() {
      if (this.event && this.event.expenses && this.event.date) {
        return this.event.expenses.reduce(
          (acc, expense) => acc + parseFloat(expense.cost),
          0
        );
      } else {
        return 0;
      }
    },
    calculateEachPayment() {
      if (
        this.event &&
        this.event.participants &&
        this.event.participants.length > 0
      ) {
        return this.calculateTotal / this.event.participants.length;
      } else {
        return 0;
      }
    },
  },
  watch: {
    event: {
      handler() {
        if (this.event) {
          if (this.updateDelay) {
            clearTimeout(this.updateDelay);
            this.updateDelay = null;
          }
          this.updateDelay = setTimeout(async () => {
            const element = document.activeElement;
            element.classList.add('loading-animation');
            await db
              .collection('events')
              .doc(this.event.id)
              .update({
                title: this.event.title,
                description: this.event.description,
                date: Date.parse(this.event.date),
                expenses: this.event.expenses.filter(
                  expense => expense.cost > 0
                ),
                participants: this.event.participants.filter(
                  participant => participant.status != 'toDelete'
                ),
              });
            element.classList.remove('loading-animation');
          }, 1000);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.event-details {
  height: 90vh;
  overflow-y: scroll;
}

.event-details::-webkit-scrollbar {
  width: 14px;
  height: 18px;
}

.event-details::-webkit-scrollbar-thumb {
  height: 6px;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
    inset 1px 1px 0px rgba(0, 0, 0, 0.05);

  &:active {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.event-details::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

.event-details::-webkit-scrollbar-corner {
  background-color: transparent;
}

.details-container {
  width: 80%;
  margin: 0 auto;

  &:last-child {
    margin-bottom: 3%;
  }
}

.details-section {
  margin-top: 3%;
  h1 {
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }

  div.total-cost {
    margin-bottom: 10px;
  }
}

.info-row {
  display: flex;
  align-items: center;
  height: 5vh;
  margin-bottom: 10px;

  span:first-child {
    width: 35%;
    font-weight: 700;
  }

  .expense:hover {
    color: red;
    cursor: pointer;
  }

  input {
    width: 65%;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    outline: none;

    &:focus {
      border-bottom-color: #007bff;
    }
  }

  .loading-animation {
    background-color: #fff;
    background-image: url('../assets/img/animation.gif');
    background-size: 25px 25px;
    background-position: right center;
    background-repeat: no-repeat;
  }
}

.new-expense {
  input:first-child {
    width: 30%;
    margin-right: 5%;
  }

  input:last-child {
    width: 65%;
  }
}

.payments-row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  span:first-child {
    width: 30%;
    font-weight: 700;
  }

  .payment-status {
    border: none;
    outline: none;
  }

  .Not {
    color: #ea2027;
  }
  .Paid {
    color: #009432;
  }
}

.details-map {
  background-image: url('../assets/img/map.png');
  background-size: no-repeat;
  background-size: contain;
  width: 100%;
  height: 0;
  padding-top: 57.53%; //height to width ratio
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
