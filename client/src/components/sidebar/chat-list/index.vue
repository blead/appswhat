<template>
  <b-container fluid>
    <small>chats</small>
    <b-list-group flush>
      <b-list-group-item 
        v-for="(chatdata, chatname) in chats"
        :key="chatname"
        href="#"
        @click="onSelectTopic(chatname)"
        class="d-flex justify-content-between align-items-center p-1"
        >
          {{ chatname }}
          <b-badge v-if="chatdata.newTexts > 0" variant="secondary" class="">
            {{ chatdata.newTexts }}
          </b-badge>
      </b-list-group-item>
    </b-list-group>
    <b-button v-b-modal.newchat variant="link" class="mt-1 ml-1 p-0">new chat</b-button>
    <new-chat-modal
      modalID="newchat"
      @newChat="this.onNewChat"
    />
  </b-container>
</template>

<script>
import NewChatModal from './new-chat-modal'

export default {
  name: 'ChatList',
  components: {
    NewChatModal,
  },
  props: ['chats'],
  methods: {
    onSelectTopic(topic) {
      this.$emit('selectTopic', topic)
    },
    onNewChat(topic) {
      this.$emit('newChat', topic)
    },
  }
}
</script>

<style>
  .chat-list {
    list-style: none;
    padding-left: 1em;
  }
  .list-group-item:first-child{
    border-top-width: 0px;
  }
  .chat-list > li {
    margin-bottom: 0.5em;
  }
</style>
