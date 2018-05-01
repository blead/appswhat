<template>
  <b-modal :id="this.modalID" title="New Chat" name="name" ref="modal">
    <b-form id="newchat" @submit="this.onNewChat" autocomplete="off">
      <b-form-input placeholder="enter topic" name="topic"></b-form-input>
    </b-form>
    <template slot="modal-footer">
      <b-button @click="this.closeModal">Cancel</b-button>
      <b-button variant="primary" type="submit" form="newchat">OK</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'NewChatModal',
  props: ['modalID'],
  methods: {
    onNewChat(event) {
      event.preventDefault()
      const topic = event.target.topic.value
      console.log(topic)
      this.$emit('newChat', topic)
      this.closeModal()
    },
    closeModal() {
      this.$refs.modal.hide()
    }
  }
}
</script>
