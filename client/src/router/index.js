import VueRouter from 'vue-router'

import ChatView from '../components/main-view/chat'

const router = new VueRouter({
  routes: [
    { path: '/:topic', component: ChatView }
  ],
})

export default router
