<template>
  <div id="dashboard">

    <h1 class="h1"> Celebrate your love for pizza, vote for it!</h1>
    <b-alert :show="error.length === 0 && !isLogged && !loading" variant="warning">Please login to share your love for pizzas with the world.</b-alert>
    <b-alert :show="error.length > 0" variant="danger">{{ error }}</b-alert>
    <!-- <b-alert :show="loading" variant="info">Loading...</b-alert> -->

    <div class="main">
      <b-container>
        <b-row align-h="center">
          <votes-chart :data="pizzaLovers"></votes-chart>
        </b-row >
        <b-row align-h="center">
          <transition name="fade">
            <b-btn v-show="!loading && isLogged" type="submit" 
                  @click.prevent="addVote(loggedInUser.email)">
              I love it
            </b-btn>
          </transition>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import api from '@/PizzaVotesApiService';
import VotesChart from '@/components/VotesChart';

export default {
  components: { VotesChart },
  props: { user: Object },

  // When 'user' changes, update 'user' relative data
  watch: {
    user: async function(newVal) {
      console.debug('Watch user',newVal);
      if (newVal) {
        this.loggedInUser = newVal;
        this.userRecords = await this.getById(newVal.email);
      }
    }
  },

  data() {
    return {
      loading: true,
      userRecords: {},
      error: "",
      isLogged: false,
      loggedInUser: this.user,
      pizzaLovers: []
    }
  },

  // Update bar-chart data everytime component is created
  async created() {
    this.pizzaLovers = await api.getAll();
  },

  methods: {

    // Invoke (or try to) 'getById' from API to get user votes (by email)
    async getById(id) {
      this.loading = true;
      try {
        this.isLogged = true;
        return await api.getById(id);
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          this.isLogged = false;
        } else {
          this.error = error.message;
        }
      } finally {
        this.loading = false;
      }
    },

    // Sums 1 votes to user
    async addVote(id) {
      const value = 1;
      const isUpdating = this.userRecords.id === this.loggedInUser.email;
      const data = {
        id,
        Value: isUpdating ? this.userRecords.value + value : value,
        dateTime: new Date(Date.now())
      }

      try {
        // If there is no any records for the logged in user yet - create, otherwise - update
        this.loading = true;
        if (isUpdating) {
          await api.update('hrodriguezh85@gmail.com', data);
        } else {
          await api.create(data);
        }
        // Update votes count for user
        this.userRecords = await this.getById(id);
        // Refresh Dashboard
        this.pizzaLovers = await api.getAll();
        this.loading = false;
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          this.isLogged = false
        } else {
          this.error = error.message
        }
      }
    }
  }
}
</script>


<style lang="scss">
$color1: #F05722;
$color2: #111517;
$color3: #ffffff;
$text-color1: #ffffff;
$text-color2: #F05722;
$text-color3: #111517;

.main {
  display: flex;
  align-items: center;
  justify-content: center;

  .count {
    margin: 1em;
  }

  button{
    background-color: $color1;
    color: $text-color1;
    border-color: $color3;

    &:hover, &:active, &:focus{
      background-color: $color1 !important;
      color: $text-color1 !important;
      border-color: $color3 !important;
    }
  }
}
// Tansition effecto for loading elements
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>