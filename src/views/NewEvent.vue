<template>
  <div class="new-event">
    <form class="new-event-form" @submit.prevent="addEvent">
      <div class="form-group">
        <label for="event-title">Event title:</label>
        <input
          type="text"
          placeholder="Skiing in Alps"
          class="form-control"
          id="event-title"
          v-model="title"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          placeholder="Write something about this event!"
          class="form-control"
          id="description"
          v-model="description"
          required
        />
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input
          type="text"
          placeholder="Where are you going to have fun?"
          class="form-control"
          id="location"
          v-model="location"
          required
        />
      </div>
      <div class="form-group">
        <label for="location">Date</label>
        <div class="event-date-selection form-group">
          <label for="eventLength">How long the event will last?</label>
          <select v-model="eventLength" name="eventLength" id="eventLength">
            <option value="one">One day</option>
            <option value="several">Several days</option>
          </select>
        </div>
        <div v-if="eventLength" class="dates">
          <input
            type="date"
            class="form-control date-from"
            id="dateFrom"
            v-model="dateFrom"
            required
          />
          <input
            v-if="eventLength == 'several'"
            type="date"
            class="form-control date-to"
            id="dateTo"
            v-model="dateTo"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="participants">Participants</label>
        <input
          type="text"
          @keydown.enter.prevent="addParticipant"
          v-model="participant.name"
          placeholder="Press enter to add participant"
          class="form-control"
          id="participants"
        />
        <div v-for="(participant, index) in this.participants" :key="index" class="participant">
          <small class="form-text">{{ participant.name }}</small>
        </div>
      </div>
      <div class="form-group">
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
            placeholder="Cost | Press enter to add"
            class="form-control expense-cost"
            id="cost"
          />
        </div>
        <div v-for="(expense, index) in expenses" :key="index" class="participant">
          <small class="form-text">{{ expense.name }}: {{ expense.cost }}</small>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
  name: 'NewEvent',
  data() {
    return {
      title: null,
      description: null,
      location: null,
      locationId: null,
      eventLength: null,
      dateFrom: null,
      dateTo: null,
      participant: {
        name: null,
        status: 'Not paid',
      },
      participants: [],
      expense: {
        name: null,
        cost: null,
      },
      expenses: [],
    };
  },
  methods: {
    addParticipant() {
      if (this.participant.name) {
        this.participants.push({ ...this.participant });
        this.participant.name = null;
      }
    },
    addExpense() {
      if (this.expense.name && this.expense.cost) {
        this.expenses.push({ ...this.expense });
        this.expense.name = null;
        this.expense.cost = null;
        this.$refs.expenseName.focus();
      }
    },
    async setLocation() {
      const slugLocation = slugify(this.location, {
        replacement: '-',
        remove: /[*+~.,()'"!:@]/g,
        lower: true,
      });
      let locationDoc = await db
        .collection('locations')
        .doc(slugLocation)
        .get();
      if (!locationDoc.exists) {
        await db
          .collection('locations')
          .doc(slugLocation)
          .set({
            location: this.location,
          });
      }
      this.locationId = slugLocation;
    },
    async addEventDocument(slugTitle) {
      await db.collection('events').add({
        userId: firebase.auth().currentUser.uid,
        title: this.title,
        description: this.description,
        eventLength: this.eventLength,
        dateFrom: Date.parse(this.dateFrom),
        dateTo: Date.parse(this.dateTo),
        locationId: this.locationId,
        participants: this.participants,
        expenses: this.expenses,
        slug: slugTitle,
      });
    },
    async addEvent() {
      if ((this.participants || this.participant.name) && this.dateFrom) {
        this.addParticipant();
        this.addExpense();
        await this.setLocation();
        if (!this.dateTo) {
          this.dateTo = this.dateFrom;
        }
        const slugTitle = slugify(this.title, {
          replacement: '-',
          remove: /[*+~.()'"!:@]/g,
          lower: true,
        });
        await this.addEventDocument(slugTitle);
        this.$router.push({ name: 'Events' });
      }
    },
  },
};
</script>

<style lang="scss">
.new-event {
  width: 40vw;
  height: 90vh;
  margin: auto;
}

.new-event-form {
  margin: 3vh 0 3vh 0;

  .event-date-selection {
    select {
      width: 100%;
      height: 38px;
      padding: 6px 12px 6px 12px;
      border-radius: 5px;
      border: 1px solid #ced4da;
    }
  }
}

.dates {
  display: flex;
  width: 100%;

  .date-to {
    margin-left: 10px;
  }
}

.add-participant {
  margin-top: 10px;
}

.participant {
  background-color: #dfe4ea;
  border-radius: 2px;
  display: inline-block;
  padding: 2px 6px;
  margin: 10px 5px 0 0;
}

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
</style>
