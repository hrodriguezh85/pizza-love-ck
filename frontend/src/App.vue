<template>
  <div id="app">
    <header>
      <b-navbar id="nav" toggleable="md" type="dark" variant="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand to="/"> <img class="brand-img" alt="Pizza Love" src="./assets/pizza.png" /> </b-navbar-brand>
        <b-collapse is-nav id="nav-collapse">
          <transition name="fade">
            <b-navbar-nav v-show="!loading" >
              <b-nav-item href="#" @click.prevent="login" v-if="!user">Login</b-nav-item>
              <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item>
              <username v-if="user" :user="user" :email="user.email" ></username>
            </b-navbar-nav>
          </transition>
        </b-collapse>
      </b-navbar>
    </header>
    <main>
      <router-view :user="user"></router-view>
    </main>
  </div>
</template>

<script>
import Username from "@/components/Username";

export default {
  name: 'app',
  components: { Username },
  data() {
    return {
      loading: true,
      user: null,
      email: null,
    }
  },

  // Invoke 'refreshUser' everytime component is created
  async created() {
    console.debug(' async created() ');
    await this.refreshUser();
  },

  // Invoke 'OnRouteChange' method everytime route changes
  watch: {
    '$route': 'onRouteChange'
  },

  methods: {

    // Invoke when you want to login. It redirects to oktafor login
    login() {
      console.debug(' login() ');
      // ( https://developer.okta.com/docs/guides/sign-into-spa/vue/add-signin-button/ )
      this.$auth.loginRedirect();
    },

    // Everytime URL changes, invoke this method
    async onRouteChange() {
      console.debug(' onRouteChange() ');
      await this.refreshUser();
      this.loading = false;
    },

    // Invoke to get 'User' updated info (when login, logout, URL changes, etc)
    async refreshUser() {
      console.debug(' refreshUser() ');
      // ( https://developer.okta.com/docs/guides/sign-into-spa/vue/user-info/ )
      this.user = await this.$auth.getUser();
      this.loading = false;
    },

    // Invoke when you want to logout. It redirects to okta for logout.
    async logout() {
      console.debug(' logout() ');
      // ( https://developer.okta.com/docs/guides/sign-users-out/vue/sign-out-of-okta/ )
      await this.$auth.logout();
      await this.refreshUser();
      this.$router.push('/');
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
// Colors taken from 'Cicklum' webpage
$color1: #F05722;
$color2: #111517;
$color3: #ffffff;
$color4: #50468C;
$text-color1: #ffffff;
$text-color2: #F05722;
$text-color3: #111517;
body{
  background-color: #cacaca !important;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color3;

  .brand-img{
    max-height: 40px; 
    width: auto;
  }
}

#nav {
  padding: 10px 30px;

  a {
    font-weight: bold;
    color: $text-color2;

    &.router-link-exact-active, &:hover {
      color: $text-color1;
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
