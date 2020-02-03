import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import moment from 'moment'

Vue.use(VModal)

Vue.filter('timestampToDate', function (timestamp) {
  if (!timestamp) return ''
  timestamp = moment(timestamp).subtract(10, 'days').calendar();
  return timestamp
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
