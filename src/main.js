import 'bootstrap'
import '@/assets/scss/app.scss'
require('dotenv').config()
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/route'
import store from '@/store/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

