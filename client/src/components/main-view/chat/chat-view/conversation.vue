<template>
  <b-container fluid class="h-100" style="overflow-y: scroll; overflow-x: hidden;">
    <message v-for="message in messages" :message="message" :key="message.timestamp"/>
  </b-container>
</template>

<script>
import Message from './message'
export default {
  name: 'Conversation',
  props: ['messages'],
  components: {
    Message,
  },
}
</script>
