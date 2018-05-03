<template>
  <b-container fluid class="h-100" style="overflow-y: scroll; overflow-x: hidden;" ref="container">
    <div v-if="unreadMessages === null" class="m-3">
      <span>loading history...</span>
      <i class="fas fa-spinner fa-spin fa-pulse"></i>
    </div>

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
