import Vue from 'vue'
import App from './App.vue'
import router from './router'
import titleMixin from './mixins/title_mixin.js'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.mixin(titleMixin)
Vue.use(Chartkick.use(Chart))
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: el => {
    el.focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
