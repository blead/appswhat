<template>
  <b-container fluid class="px-0 mt-2 h-100">
    <div class="d-flex flex-column align-items-end h-100">
    <profile 
      :user="this.user"
      @login="this.onLogin"
      @logout="this.onLogout"
    />
    <chat-list
      v-if="this.user.name"
      :chats="this.chats"
      @selectTopic="this.selectTopic"
      @newChat="this.onNewChat"
      @pauseChat="onPauseChat"
      @leaveChat="onLeaveChat"
    />
    <b-container class="mt-auto mb-3 pt-1 border-top">
      <small>
        Advanced Settings
      </small>
      <b-form inline
        @submit="this.onSetHost"
      >
        <label for="customHost" class="mr-1" style="font-size: 0.5em;">Custom Host</label>
        <b-input size="sm" name="customHostName" class="p-1" style="font-size: 0.5em; width: 80%;"></b-input>
        <b-button type="submit" variant="link" class="pl-1 p-0" style="font-size: 0.5em;">set</b-button>
        <span style="font-size: 0.5em">current host: {{ this.client.host }}</span>
      </b-form>
    </b-container>
    </div>
  </b-container>
</template>

<script>
import Profile from './profile'
import ChatList from './chat-list'

export default {
  name: 'Sidebar',
  props: ['user', 'chats', 'client'],
  components: {
    Profile,
    ChatList,
  },
  methods: {
    selectTopic(topic) {
      this.$emit('selectTopic', topic)
    },
    onLogin(username) {
      this.$emit('login', username)
    },
    onLogout() {
      this.$emit('logout')
    },
    onNewChat(topic) {
      console.log(topic)
      this.$emit('newChat', topic)
    },
    onPauseChat(topic) {
      this.$emit('pauseChat', topic)
    },
    onLeaveChat(topic) {
      this.$emit('leaveChat', topic)
    },
    onSetHost(event) {
      event.preventDefault()
      const customHostName = event.target.customHostName.value
      this.$emit('setHost', customHostName)
    }
  }
}
</script>

<style>

</style>
