<template>
  <b-container fluid class="p-0 m-0 d-flex flex-column h-100">
    <div style="flex: 1; max-height: calc(100vh - 170px);">
      <conversation/>
    </div>
    <div style="height: 170px;" class="pt-4 border-top">
      <b-container fluid>
          <b-form action="#" @submit="onChatSubmit">
            <b-form-input size="sm" type="text" name="chatInput" id="" ref="chatInput">
            </b-form-input>
          </b-form>
      </b-container>
    </div>
  </b-container>
</template>

<script>
import Conversation from './conversation'
export default {
  name: 'ChatView',
  components: {
    Conversation,
  },
  methods: {
    onChatSubmit(event) {
      event.preventDefault()
      console.log(event.target.chatInput.value)
    }
  },
  created() {
    this.oldDocumentOnKeypressHandler = document.onkeypress
    document.onkeypress = (event) => {
      if(event.key === "Enter") {
        this.$refs.chatInput.focus()
      }
    }
  },
  beforeDestroy() {
    document.onkeypress = this.oldDocumentOnKeypressHandler
  }
}
</script>
