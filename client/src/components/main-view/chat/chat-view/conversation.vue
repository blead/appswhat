<template>
  <b-container fluid class="h-100" style="overflow-y: scroll; overflow-x: hidden;">
    <message v-for="message in messages" :message="message" :key="message.timestamp"/>
  </b-container>
</template>

<script>
import Message from './message'
export default {
  name: 'Conversation',
  components: {
    Message,
  },
  data() {
    return {
      messages: [
        {
          sender: 'Jorn Slow',
          message: 'hello',
          timestamp: 0
        },
        {
          sender: 'Jorn Slow',
          message: 'how are you?',
          timestamp: 1
        },
        {
          sender: 'peawyoyoyin',
          message: 'i\'m fine',
          timestamp: 2,
          own: true
        },
        {
          sender: 'Jorn Slow',
          message: 'ayy',
          timestamp: 3,
        },
        {
          sender: 'peawyoyoyin',
          message: 'sup',
          timestamp: 4,
          own: true
        },
        {
          sender: 'peawyoyoyin',
          message: 'dota',
          timestamp: 5,
          own: true
        }
      ]
    }
  }
}
</script>
