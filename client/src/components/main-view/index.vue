<template>
  <chat
  :user="this.user"
  :chatTopic="this.currentChat"
  :chatData="this.chats[this.currentChat]"
  />
</template>

<script>
import Chat from './chat'
export default {
  name: 'MainView',
  components: {
    Chat,
  },
  props: ['user', 'chats', 'currentChat']
}
</script>
