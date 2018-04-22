import { AppsWhatClient } from '@shared/'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Main from './components/main'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// const client = new AppsWhatClient('http://localhost:80', 'peaw')
// console.log(client)
// client.on('message', console.log)
// client.subscribe('test')
// client.publish('test', 'hello')
// console.log('hello from webpack')

Vue.config.productionTip = false
Vue.use(BootstrapVue)
/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  components: { Main },
  render(el) {
    return el('Main')
  }
})
