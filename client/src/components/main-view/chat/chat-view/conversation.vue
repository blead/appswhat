<template>
  <b-container fluid class="h-100" style="overflow-y: scroll; overflow-x: hidden;" ref="container">

    <h4 v-if="!unreadMessages">loading history...</h4>
    <message v-if="unreadMessages" v-for="message in unreadMessages" :message="message" :key="message.id"/>
    <message v-for="message in messages" :message="message" :key="message.id"/>
  </b-container>
</template>

<script>
import Message from './message'
export default {
  name: 'Conversation',
  props: ['messages', 'unreadMessages'],
  components: {
    Message,
  },
  updated() {
    this.$refs.container.scrollTop = this.$refs.container.scrollHeight
  }
}
</script>
