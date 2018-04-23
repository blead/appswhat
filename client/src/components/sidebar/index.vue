<template>
  <b-container fluid class="px-0 mt-2">
    <profile 
    :user="this.user"
    @login="this.onLogin"
    />
    <chat-list 
      :chats="this.chats"
      @selectTopic="this.selectTopic"
    />
  </b-container>
</template>

<script>
import Profile from './profile'
import ChatList from './chat-list'

export default {
  name: 'Sidebar',
  props: ['user', 'chats'],
  components: {
    'profile': Profile,
    'chat-list': ChatList,
  },
  methods: {
    selectTopic(topic) {
      this.$emit('selectTopic', topic)
    },
    onLogin(username) {
      this.$emit('login', username)
    }
  }
}
</script>

<style>

</style>
