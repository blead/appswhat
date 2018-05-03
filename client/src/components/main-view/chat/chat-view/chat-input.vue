<template>
  <b-container fluid>
    <div class="d-flex flex-row">
      <b-form action="#" id="chat-input" @submit="onChatSubmit" autocomplete="off" style="width: 90%;">
        <b-form-input size="sm" type="text" name="chatInput" id="" v-model="message">
        </b-form-input>
      </b-form>
      <button
        class="btn btn-link p-0 bg-transparent"
        @click="onYoda"
      >
        <yoda class="yoda-icon" :style="{fill: this.yoda ? 'green' : 'black'}"/>
      </button>
      <button type="submit" form="chat-input" class="btn btn-link pt-0">send</button>
    </div>
  </b-container>
</template>

<script>
import Yoda from './yoda.svg'
export default {
  name: 'ChatInput',
  props: ['yoda'],
  data() {
    return {
      message: ''
    }
  },
  methods: {
    onChatSubmit(event) {
      event.preventDefault()
      const msg = this.message
      this.$emit('chat', msg)
      this.message = ''
    },
    onYoda() {
      this.$emit('yoda')
      console.log('yoda', this.yoda)
    }
  },
  components: {
    Yoda,
  }
}
</script>

<style scoped>
  .yoda-icon {
    height: 3rem;
    width: 3rem;
    margin-top: -0.5rem;
    flex: 1;
    transition: fill 0.2s;
  }
</style>
