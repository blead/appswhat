<template>
  <b-container fluid class="px-0 mt-2">
    <profile :user="this.user"/>
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
      console.log(this.$emit('selectTopic', topic))
    }
  }
}
</script>

<style>

</style>
