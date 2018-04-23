<template>
  <b-container class="pt-3">
    <h1>{{ this.chatTopic }}</h1>
  </b-container>
</template>

<script>
export default {
  name: 'ChatInfo',
  props: ['chatTopic']
}
</script>

