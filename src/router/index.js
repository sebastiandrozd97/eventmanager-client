import Vue from 'vue'
import VueRouter from 'vue-router'
import NewEvent from '@/views/NewEvent.vue'
import Events from '@/views/Events.vue'
import Profile from '@/views/Profile.vue'
import Index from '@/views/Index.vue'
import SignUp from '@/views/SignUp.vue'
import Details from '@/components/Details'
import Location from '@/components/Location'
import People from '@/components/People'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/events/:slug',
    name: 'Event',
    component: Events,
    redirect: { name: 'Details'},
    children: [
      {
        path: 'details',
        name: 'Details',
        component: Details,
      }, {
        path: 'location',
        name: 'Location',
        component: Location,
      }, {
        path: 'people',
        name: 'People',
        component: People,
      },
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/new-event',
    name: 'NewEvent',
    component: NewEvent
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
