<template>
  <b-container fluid>
    <b-form action="#" @submit="onChatSubmit">
      <b-form-input size="sm" type="text" name="chatInput" id="" ref="chatInput">
      </b-form-input>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'ChatInput',
  methods: {
    onChatSubmit(event) {
      event.preventDefault()
      const msg = event.target.chatInput.value
      this.$emit('chat', msg)
      event.target.chatInput.value = ""
    }
  }
}
</script>
