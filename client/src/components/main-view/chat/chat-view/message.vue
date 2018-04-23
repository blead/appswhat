<template>
  <div
  class="mx-5" 
  :class="{'text-right': message.own}"
  >
  <small class="mb-0">{{ message.senderId }}</small>
  <br/>
  <small v-if="message.own" class="mx-2">{{ timestampText }}</small>
  <b-alert show 
    :variant="message.own ? 'dark' : 'light'" 
    class="mb-2 mt-0 p-0 border rounded d-inline-block"
    v-b-tooltip.click="message.message"
    >
    <b-media class="py-1 px-3">
      <b-media-body class="chat-message">
      {{ message.message }}
      </b-media-body>
    </b-media>
  </b-alert>
  <small v-if="!message.own" class="mx-2">{{ timestampText }}</small>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: ['message'],
  computed: {
    timestampText: function() {
      return new Date(this.message.timestamp).toLocaleTimeString()
    }
  }
}
</script>

<style>
  .chat-message {
    cursor: default;
  }
</style>
