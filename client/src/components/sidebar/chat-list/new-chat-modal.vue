<template>
  <b-modal :id="this.modalID" title="New Chat" name="name" ref="modal" @shown="this.onShown">
    <b-form id="newchat" @submit="this.onNewChat" autocomplete="off">
      <b-form-input placeholder="enter topic" name="topic" ref="topicInput" v-model="topic"></b-form-input>
    </b-form>
    <template slot="modal-footer">
      <b-button @click="this.closeModal">Cancel</b-button>
      <b-button variant="primary" type="submit" form="newchat" @click="this.onNewChat">OK</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'NewChatModal',
  props: ['modalID'],
  data() {
    return {
      topic: '',
    }
  },
  methods: {
    onOk() {
      alert(this.topic)
    },
    onShown(e) {
      this.$refs.topicInput.focus()
    },
    onNewChat(event) {
      event.preventDefault()
      const topic = this.topic
      this.$emit('newChat', topic)
      this.closeModal()
    },
    closeModal() {
      this.$refs.modal.hide()
    }
  }
}
</script>
