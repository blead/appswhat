<template>
  <b-container fluid>
    <small>chats</small>
    <b-list-group flush>
      <div
        class="d-flex flex-row"
        v-for="(chatdata, chatname) in chats"
        :key="chatname"
      >
        <b-list-group-item 
          href="#"
          @click="onSelectTopic(chatname)"
          class="d-flex justify-content-between align-items-center p-1"
          >
            {{ chatname }}
          <b-badge v-if="chatdata.newTexts >= 0" variant="secondary" class="mr-1">
            {{ chatdata.newTexts }}
          </b-badge>
        </b-list-group-item>
        <div class="d-flex flex-row justify-content-between my-auto p-1" style="width: 30%;">
          <button 
            class="btn btn-outline-secondary border-0 py-0 px-1" 
            style="font-size: 0.75rem"
            @click="onPauseChat(chatname)"
          >
            <i class="fas fa-pause"/>
          </button>
          <button 
            class="btn btn-outline-secondary border-0 py-0 px-1" 
            style="font-size: 0.75rem"
            @click="onLeaveChat(chatname)"
          >
            <i class="fas fa-times"/>
          </button>
        </div>
      </div>
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
    onPauseChat(topic) {
      this.$emit('pauseChat', topic)
    },
    onLeaveChat(topic) {
      this.$emit('leaveChat', topic)
    }
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
