<template>
  <b-container fluid>
    <small>chats</small>
    <b-list-group flush>
      <b-list-group-item 
        href="#"
        v-for="chat in chats" 
        :key="chat.name"
        class="d-flex justify-content-between align-items-center p-1"
        >
          {{ chat.name }}
          <b-badge v-if="chat.newTexts > 0" variant="secondary" class="">
            {{ chat.newTexts }}
          </b-badge>
      </b-list-group-item>
    </b-list-group>
    <b-button variant="link" class="mt-1 ml-1 p-0">new chat</b-button>
  </b-container>
</template>

<script>
export default {
  name: 'ChatList',
  data() {
    return {
      chats: [
        { name: 'CP42' },
        { name: 'Thinc.', newTexts: 4 },
        { name: 'TU75' },
      ]
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
