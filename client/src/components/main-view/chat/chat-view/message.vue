<template>
  <div
  class="mx-5" 
  :class="{'text-right': message.own}"
  >
  <small class="mb-0">{{ message.sender }}</small>
  <br/>
  <small v-if="message.own" class="mx-2">{{ message.timestamp }}</small>
  <b-alert show 
    :variant="message.own ? 'dark' : 'light'" 
    class="mb-2 mt-0 p-0 border rounded d-inline-block"
    >
    <b-media class="py-1 px-3">
      {{ message.message }}
    </b-media>
  </b-alert>
  <small v-if="!message.own" class="mx-2">{{ message.timestamp }}</small>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: ['message']
}
</script>
