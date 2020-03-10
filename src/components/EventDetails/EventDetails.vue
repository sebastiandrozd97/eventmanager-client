<template>
  <div class="event-details event">
    <div v-if="event" class="details-container">
      <Information :event="event" />
      <Location :event="event" ref="locationComponent" />
      <Expenses :event="event" @total-expenses="totalExpensesComputed" />
      <Participants :event="event" :totalExpenses="totalExpenses" />
      <div class="section">
        <div class="section-header">Event</div>
        <div class="share-link">
          <span v-if="eventShareLink">{{ eventShareLink }}</span>
        </div>
        <div class="details-buttons">
          <button
            id="update-button"
            :class="`btn btn-${updateButtonColor}`"
            @click="updateEvent"
          >
            Update
          </button>
          <button class="btn btn-success" @click="generateLink">Share</button>
          <button
            class="btn btn-danger"
            @click="$emit('delete-event', event.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Information from '@/components/EventDetails/components/Information';
import Location from '@/components/EventDetails/components/Location';
import Expenses from '@/components/EventDetails/components/Expenses';
import Participants from '@/components/EventDetails/components/Participants';
import db from '@/firebase/init';
import slugify from 'slugify';
import { checkSlugAvailability } from '@/utils/checkSlugAvailability.js';

export default {
  name: 'EventDetails',
  components: {
    Information,
    Location,
    Expenses,
    Participants,
  },
  props: ['event'],
  data() {
    return {
      updateDelay: null,
      totalExpenses: null,
      initEvent: null,
      eventShareLink: null,
      updateButtonColor: 'primary',
    };
  },
  methods: {
    totalExpensesComputed(val) {
      this.totalExpenses = val;
    },
    async generateLink() {
      this.eventShareLink =
        'http://localhost:8080/event-overview/' + this.event.id;
      await navigator.clipboard.writeText(this.eventShareLink);
    },
    slugifyTitle() {
      return slugify(this.event.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });
    },
    async updateFirebaseCollection(slug) {
      await db
        .collection('events')
        .doc(this.event.id)
        .update({
          title: this.event.title,
          slug,
          location: {
            place: this.event.location.place,
            address: this.event.location.address,
            lat: this.event.location.lat,
            lng: this.event.location.lng,
          },
          eventLength: this.event.eventLength,
          dateFrom: Date.parse(this.event.dateFrom),
          dateTo: Date.parse(this.event.dateTo),
          description: this.event.description,
          expenses: this.event.expenses.filter(expense => expense.cost > 0),
          participants: this.event.participants.filter(
            participant => participant.status != 'To delete',
          ),
        });
    },
    async updateEvent() {
      if (this.event.eventLength === 'one') {
        this.event.dateTo = this.event.dateFrom;
      }
      let verifiedSlug = null;
      if (this.initTitle === this.event.title) {
        verifiedSlug = this.event.slug;
      } else {
        verifiedSlug = await checkSlugAvailability(this.slugifyTitle());
      }
      this.$refs.locationComponent.setAddress();
      this.updateButtonColor = 'secondary';
      try {
        await this.updateFirebaseCollection(verifiedSlug);
        this.updateButtonColor = 'success';
      } catch {
        this.updateButtonColor = 'danger';
      }
      setTimeout(() => {
        this.updateButtonColor = 'primary';
      }, 2000)
    },
  },
  created() {
    if (this.event) {
      this.initTitle = this.event.title;
    }
  },
};
</script>

<style lang="scss">
@import '../../styles/event.scss';

.event-details {
  height: 100%;
  width: 100vw;
  overflow-y: scroll;

  @media screen and (min-width: $mobile-width) {
    width: 100%;
  }
}

.details-container {
  width: 80%;
  margin: 0 auto 3% auto;

  .info-row {
    input:focus {
      border-bottom-color: $primary-color;
    }
  }
}

.share-link {
  width: 100%;
  text-align: center;
  font-size: 0.8em;

  @media screen and (min-width: $mobile-width) {
    font-size: 1.2em;
  }
}

.details-buttons {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  padding-top: 5px;

  button {
    width: 30%;
    height: 2.5em;
    padding: 0;
  }
}
</style>
