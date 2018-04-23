<template>
  <b-container fluid>
    <small>chats</small>
    <b-list-group flush>
      <b-list-group-item v-for="chat in chats" :key="chat.name" class="p-1">
        <span>
          {{ chat.name }}
          <b-badge v-if="chat.newTexts > 0" variant="danger" class="">
            {{ chat.newTexts }}
          </b-badge>
        </span>
      </b-list-group-item>
    </b-list-group>
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
