import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import moment from 'moment'
import firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(VModal)

Vue.filter('timestampToDate', function (timestamp) {
  if (!timestamp) return ''
  return moment(timestamp).format('DD.MM.YYYY');
})

let app = null

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
