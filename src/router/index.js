import Vue from 'vue'
import VueRouter from 'vue-router'
import NewEvent from '@/views/NewEvent.vue'
import Events from '@/views/Events.vue'
import Profile from '@/views/Profile.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import EventDetails from '@/components/EventDetails/EventDetails'
import PageNotFound from '@/views/PageNotFound.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/events/:slug',
    component: Events,
    meta: {
      requiresAuth: true
    },
    children: [{
      path: '',
      name: 'Event',
      component: EventDetails,
    }]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new-event',
    name: 'NewEvent',
    component: NewEvent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/page-not-found',
    name: 'PageNotFound',
    component: PageNotFound,
  },
  {
    path: '/events/*',
    redirect: '/page-not-found'
  }, {
    path: '*',
    redirect: '/page-not-found'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    const user = firebase.auth().currentUser
    if (user) {
      next();
    } else {
      next({
        name: 'SignIn'
      })
    }
  } else {
    next()
  }
})

export default router