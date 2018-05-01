<template>
  <chat
  v-if="this.chats[this.currentChat]"
  :user="this.user"
  :chatTopic="this.currentChat"
  :chatData="this.chats[this.currentChat]"
  />
  <blank v-else/>
</template>

<script>
import Chat from './chat'
import Blank from './blank'
export default {
  name: 'MainView',
  components: {
    Chat,
    Blank
  },
  props: ['user', 'chats', 'currentChat']
}
</script>
