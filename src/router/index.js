import Vue from 'vue'
import VueRouter from 'vue-router'
import Events from '../views/Events.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
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
