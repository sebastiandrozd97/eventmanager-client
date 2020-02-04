import Vue from 'vue'
import VueRouter from 'vue-router'
import NewEvent from '../views/NewEvent.vue'
import Events from '../views/Events.vue'
import Profile from '../views/Profile.vue'
import Index from '../views/Index.vue'
import SignUp from '../views/SignUp.vue'

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
  routes
})

export default router
