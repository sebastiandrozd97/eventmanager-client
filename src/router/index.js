import Vue from 'vue';
import VueRouter from 'vue-router';
import NewEvent from '@/views/NewEvent';
import Events from '@/views/Events';
import Profile from '@/views/Profile';
import SignIn from '@/views/SignIn';
import SignUp from '@/views/SignUp';
import EventDetails from '@/components/EventDetails/EventDetails';
import EventOverview from '@/views/EventOverview';
import PageNotFound from '@/views/PageNotFound';
import axios from 'axios';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

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
    path: '/event-overview/:id',
    name: 'EventOverview',
    component: EventOverview,
  },
  {
    path: '/page-not-found',
    name: 'PageNotFound',
    component: PageNotFound,
  },
  {
    path: '/events/*',
    redirect: '/page-not-found'
  },
  {
    path: '*',
    redirect: '/page-not-found'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = false;
  try {
    isLoggedIn = await axios.get(`${process.env.VUE_APP_API_URL}/identity/loggedin`, {
      headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`}
    });
    isLoggedIn = isLoggedIn.data;
  } catch (error) {
    try {
      isLoggedIn = await axios.get(`${process.env.VUE_APP_API_URL}/identity/refresh`, {
        headers: {'Authorization': `bearer ${localStorage.getItem('accessToken')}`},
        data: {
          "token": localStorage.getItem('accessToken'),
          "refreshToken": localStorage.getItem('refreshToken')
        }
      });
      isLoggedIn = isLoggedIn.data;
      localStorage.setItem('accessToken', isLoggedIn.token);
      console.log("Poszedł refresh skubany");
    } catch (error) {
      isLoggedIn = false;
    }
  }
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (isLoggedIn) {
      next();
    } else {
      next({
        name: 'SignIn'
      })
    }
  } else if (to.matched.some(rec => rec.path === "")) {
    if (isLoggedIn) {
      next({
        name: 'Events'
      })
    } else {
      next();
    }
  } else {
    next()
  }
})

export default router