<template>
  <b-container fluid class="p-0 h-100">
    <chat-info
    :chatTopic="this.chatTopic"
    />
    <hr class="mb-0"/>
    <chat-view
    :chatData="this.chatData"
    :chatTopic="this.chatTopic"
    :yoda="this.yoda"
    @yoda="onYoda"
    />
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
  props: ['chatTopic', 'chatData', 'yoda'],
  methods: {
    onYoda() {
      this.$emit('yoda')
    }
  }
}
</script>
