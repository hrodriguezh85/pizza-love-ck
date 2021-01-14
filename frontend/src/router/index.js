import Vue from 'vue';
import Router from 'vue-router';

// Authentication API
import Auth from '@okta/okta-vue';

// Dashboard (title + 'i love it' (if logged) + Barchart)
import Dashboard from '@/components/Dashboard';


Vue.use(Auth, {
  issuer: 'https://dev-4230559.okta.com/oauth2/default',
  client_id: '0oa3rtevn6CHXXPKH5d6',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scopes: ['openid', 'profile', 'email']
});


let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      props: true,
      // meta: { requiresAuth: true }
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
  ]
})

Vue.use(Router);

// ( https://developer.okta.com/docs/guides/sign-into-spa/vue/require-authentication/ )
// No routes requires Authorization
router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
