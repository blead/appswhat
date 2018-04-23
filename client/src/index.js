import { AppsWhatClient } from '@shared/'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router'

import Main from './components/main'
// const client = new AppsWhatClient('http://localhost:80', 'peaw')
// console.log(client)
// client.on('message', console.log)
// client.subscribe('test')
// client.publish('test', 'hello')
// console.log('hello from webpack')

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)
/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  components: { Main },
  router,
  render(el) {
    return el('Main')
  }
})
