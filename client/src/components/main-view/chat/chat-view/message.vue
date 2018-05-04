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
    v-b-tooltip.click="message.id"
    >
    <b-media class="py-1 px-3" v-if="message.message !== ''">
      <b-media-body class="chat-message" :style="{ color: this.yoda ? 'green' : 'black' }">
      {{ message.message }}
      </b-media-body>
    </b-media>
    <light-saber v-else :color="message.yoda ? 'lawngreen' : colors[message.id.charCodeAt(0)%colors.length]"/>
  </b-alert>
  <small v-if="!message.own" class="mx-2">{{ timestampText }}</small>
  </div>
</template>

<script>
import LightSaber from './lightsaber'
export default {
  name: 'Message',
  props: ['message'],
  components: {
    LightSaber,
  },
  computed: {
    timestampText: function() {
      return new Date(this.message.timestamp).toLocaleTimeString()
    },
    colors: function() {
      return ['red', 'fuchsia', 'yellow', 'orange', 'black', undefined]
    }
  }
}
</script>

<style>
  .chat-message {
    cursor: default;
  }
</style>
