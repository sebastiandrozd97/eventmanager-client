<template>
  <div class="new-event">
    <form class="new-event-form" @submit.prevent="addEvent">
      <Information :information="information" />
      <Location ref="locationComponent" :location="location" />
      <Participants
        ref="participantsComponent"
        :participant="participant"
        :participants="participants"
      />
      <Expenses
        ref="expensesComponent"
        :expenses="expenses"
        :expense="expense"
      />
      <div class="create-event">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import Information from '@/components/NewEvent/Information';
import Location from '@/components/NewEvent/Location';
import Participants from '@/components/NewEvent/Participants';
import Expenses from '@/components/NewEvent/Expenses';
import slugify from 'slugify';
import { checkSlugAvailability } from '@/utils/checkSlugAvailability.js';
import axios from 'axios';

export default {
  name: 'NewEvent',
  components: {
    Information,
    Location,
    Participants,
    Expenses,
  },
  data() {
    return {
      information: {
        title: null,
        description: null,
        lastsOneDay: null,
        from: null,
        to: null,
      },
      location: {
        map: null,
        marker: null,
        address: null,
        place: null,
        latLng: null,
        manualLatLng: null,
        manualAddress: null,
      },
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
    async addEventDocument(slugTitle) {
      try {
        await axios.request({
          url: `${process.env.VUE_APP_API_URL}/events`,
          method: "post",
          headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`},
          data: {
            "title": this.information.title,
            "slug": slugTitle,
            "description": this.information.description,
            "from": this.information.from,
            "to": this.information.to,
            "lastsOneDay": this.information.lastsOneDay,
            "address": this.location.address,
            "place": this.location.place,
            "lat": this.location.latLng.lat,
            "lng": this.location.latLng.lng,
            "expenses": this.expenses,
            "participants": this.participants
          }
        })
      } catch (error) {
        console.log(error.response);
      }
    },
    async getSlugTitleVerified() {
      const slugTitle = slugify(this.information.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });
      return await checkSlugAvailability(slugTitle);
    },
    async addEvent() {
      if (
        (this.participants || this.participant.name) &&
        this.information.from
      ) {
        this.$refs.participantsComponent.addParticipant();
        this.$refs.expensesComponent.addExpense();
        this.$refs.locationComponent.chooseAddressType();
        if (this.information.lastsOneDay) {
          this.information.to = this.information.from;
        }
        await this.addEventDocument(await this.getSlugTitleVerified());
        try {
          this.$router.push({ name: 'Events' });
        } catch (error) {
          throw new Error(`Problem handling something: ${error}.`); 
        }
      }
    },
  },
};
</script>

<style lang="scss">
.new-event {
  width: 100%;
  height: calc(100vh - 100px);
  margin: auto;
  overflow-y: scroll;

  @media screen and (min-width: $mobile-width) {
    height: calc(100vh - 80px);

    .new-event-form {
      width: 55%;
    }
  }

  .create-event {
    width: 100%;
    text-align: left;

    button {
      width: 40%;
    }

    @media screen and (min-width: $mobile-width) {
      button {
        width: 25%;
      }
    }
  }
}

.new-event-form {
  margin: 3vh auto 3vh auto;
  width: 80%;
}

.new-event::-webkit-scrollbar {
  width: 14px;
  height: 18px;
}

.new-event::-webkit-scrollbar-thumb {
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

.new-event::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

.new-event::-webkit-scrollbar-corner {
  background-color: transparent;
}
</style>
