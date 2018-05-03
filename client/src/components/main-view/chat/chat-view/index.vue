<template>
  <b-container fluid class="p-0 m-0 d-flex flex-column h-100">
    <div style="flex: 1; max-height: calc(100vh - 170px);">
      <conversation
      :unread-messages="this.chatData.unreadMessages"
      :messages="this.chatData.messages"
      />
    </div>
    <div style="height: 170px;" class="pt-4 border-top">
      <chat-input
      @chat="this.onChatSubmit"
      />
    </div>
  </b-container>
</template>

<script>
import Conversation from './conversation'
import ChatInput from './chat-input'
export default {
  name: 'ChatView',
  props: ['chatData', 'chatTopic'],
  components: {
    Conversation,
    ChatInput,
  },
  methods: {
    onChatSubmit(msg) {
      try {
        this.$chat.client.publish(this.chatTopic, msg)
      } catch(e) {
        console.log(e)
      }
    }
  },
}
</script>
