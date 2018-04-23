<template>
  <b-container fluid class="p-0 h-100">
    <chat-info></chat-info>
    <hr class="mb-0"/>
    <chat-view></chat-view>
  </b-container>
</template>

<script>
import ChatInfo from './chat-info'
import ChatView from './chat-view'
export default {
  name: 'Chat',
  components: {
    ChatInfo,
    ChatView
  },
  created() {
    document.onkeypress = (event) => {
      if(event.key === "Enter") {
        console.log('select chat')
      }
    }
  }
}
</script>
