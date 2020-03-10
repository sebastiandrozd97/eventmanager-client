import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import moment from 'moment'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false;

Vue.use(VModal);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places',
  }
})

Vue.filter('getDay', function (date) {
  if (!date) return ''
  return moment(date).format('DD.MM');
})

Vue.filter('dateFormat', function (date) {
  if (!date) return ''
  return moment(date).format('DD.MM.YYYY');
})

let app = null

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})