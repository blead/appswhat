<template>
  <b-container fluid class="px-0 mt-2">
    <profile :user="this.user"></profile>
    <chat-list></chat-list>
  </b-container>
</template>

<script>
import Profile from './profile'
import ChatList from './chat-list'

export default {
  name: 'Sidebar',
  props: ['user'],
  components: {
    'profile': Profile,
    'chat-list': ChatList,
  }
}
</script>

<style>

</style>
