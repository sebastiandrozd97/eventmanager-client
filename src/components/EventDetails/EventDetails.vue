<template>
  <div ref="details" class="event-details">
    <div v-if="event" class="details-container">
      <Information :event="event" />
      <Location :event="event" />
      <Expenses :event="event" @total-expenses="totalExpensesComputed" />
      <People :event="event" :totalExpenses="totalExpenses" />
      <div class="details-section">
        <h2>Delete event</h2>
        <div class="delete-event">
          <button @click="deleteEvent(); $emit('delete-event', event.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Information from '@/components/EventDetails/components/Information';
import Location from '@/components/EventDetails/components/Location';
import Expenses from '@/components/EventDetails/components/Expenses';
import People from '@/components/EventDetails/components/People';
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
  name: 'EventDetails',
  components: {
    Information,
    Location,
    Expenses,
    People,
  },
  props: ['event'],
  data() {
    return {
      updateDelay: null,
      totalExpenses: null,
    };
  },
  methods: {
    async deleteEvent() {
      await db
        .collection('events')
        .doc(this.event.id)
        .delete();
      this.$router.push({ name: 'Events' });
    },
    totalExpensesComputed(val) {
      this.totalExpenses = val;
    },
    slugifyTitle() {
      return slugify(this.event.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });
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
            if (this.event.eventLength == 'one') {
              this.event.dateTo = this.event.dateFrom;
            }
            await db
              .collection('events')
              .doc(this.event.id)
              .update({
                title: this.event.title,
                slug: this.slugifyTitle(),
                eventLength: this.event.eventLength,
                dateFrom: Date.parse(this.event.dateFrom),
                dateTo: Date.parse(this.event.dateTo),
                description: this.event.description,
                expenses: this.event.expenses.filter(
                  expense => expense.cost > 0
                ),
                participants: this.event.participants.filter(
                  participant => participant.status != 'To delete'
                ),
              });
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
  h2 {
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }
}

.info-row {
  display: flex;
  min-height: 5vh;
  margin-bottom: 10px;

  span:first-child {
    width: 35%;
    font-weight: 700;
  }

  .expense {
    span:hover {
      color: red;
      cursor: pointer;
    }
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

  textarea {
    width: 65%;
    resize: none;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    outline: none;
  }

  select {
    width: 65%;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    outline: none;
    padding-left: 0;

    &:focus {
      border-bottom-color: #007bff;
    }
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

.new-participant {
  input {
    width: 100%;
  }
}

.payments-row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  span:first-child {
    width: 35%;
    font-weight: 700;

    span:hover {
      color: red;
      cursor: pointer;
    }
  }

  .payment-status {
    border: none;
    outline: none;
    cursor: pointer;
  }

  .Not {
    color: #ea2027;
  }
  .Paid {
    color: #009432;
  }
}

.details-map {
  background-image: url('../../assets/img/map.png');
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

.delete-event {
  width: 100%;
  text-align: center;

  button {
    color: white;
    background-color: #007bff;
    border: none;
    width: 30%;
    height: 2.5em;

    &:hover {
      background-color: #0061cc;
    }
  }
}
</style>
