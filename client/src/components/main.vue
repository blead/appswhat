<template>
  <div id="app" style="height: 99vh; overflow: hidden;">
    <b-container fluid class="h-100">
      <b-row class="h-100">
        <b-col lg="2" sm="4" class="h-100 px-0 border-right d-none d-sm-block">
          <sidebar
            :user="this.user"
            :chats="this.chats"
            @selectTopic="this.selectTopic"
            @login="this.onUserLogin"
            @newChat="this.onNewChat"
            />
        </b-col>
        <b-col class="h-100 px-0">
          <main-view
            :user="this.user"
            :chats="this.chats"
            :currentChat="this.currentChat"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from './sidebar'
import MainView from './main-view'

export default {
  name: 'Main',
  components: {
    'sidebar': Sidebar,
    'main-view': MainView
  },
  methods: {
    login(username) {
      this.$chat.login(username)
      this.user.name = username
    },
    selectTopic(topic) {
      this.currentChat = topic
    },
    onUserLogin(username) {
      this.chats={}
      this.currentChat=""
      this.login(username)
      this.$chat.client.on('message', (packet) => {
        console.log(packet)
        const { payload, topic } = packet
        if(this.chats[topic] === undefined) {
          console.log('new topic')
          this.$set(this.chats, topic, {
            newTexts: 0,
            messages: []
          })
          console.log(this.chats)
          this.$chat.client.subscribe(topic)
        }
        if(this.chats[topic].messages.find(msg => (msg.id === payload.id)) === undefined) {
          this.chats[topic].messages.push({
            ...payload,
            own: payload.senderId === this.user.name
          })
          console.log('new message')
        }
      })
      this.$chat.client.on('connect', () => {
      })
    },
    onNewChat(topic) {
      if(this.chats[topic] !== undefined) {
        return
      }

      this.$set(this.chats, topic, { newTexts: 0, messages: [] })
      this.$chat.client.subscribe(topic)
    }
  },
  data() {
    return {
      user: {
        name: ''
      },
      chats: {},
      currentChat: 'thinc',
    }
  },
  created() {}
}
</script>

<style>

</style>
