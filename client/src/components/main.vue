<template>
  <div id="app" style="height: 99vh; overflow: hidden;">
    <b-container fluid class="h-100">
      <b-row class="h-100">
        <b-col lg="2" sm="4" md="3" class="h-100 px-0 border-right d-none d-sm-block">
          <sidebar
            :user="this.user"
            :chats="this.chats"
            :client="this.client"
            @selectTopic="this.selectTopic"
            @login="this.onUserLogin"
            @logout="this.onUserLogout"
            @newChat="this.onNewChat"
            @setHost="this.onUserSetHost"
            @pauseChat="onPauseChat"
            @leaveChat="onLeaveChat"
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
    Sidebar,
    MainView
  },
  methods: {
    login(username) {
      this.$chat.login(username)
      this.user.name = username
    },
    initializeChat() {
      this.chats={}
      this.currentChat=""
      this.$chat.client.on('message', (packet) => {
        const { payload, topic } = packet
        if(this.chats[topic] === undefined) {
          this.$set(this.chats, topic, {
            newTexts: 0,
            paused: false,
            messages: []
          })
          this.$chat.client.subscribe(topic)
        }
        if(this.chats[topic].messages.find(msg => (msg.id === payload.id)) === undefined) {
          this.chats[topic].messages.push({
            ...payload,
            own: payload.senderId === this.user.name
          })
          if(topic !== this.currentChat && !packet.retain) {
            this.chats[topic].newTexts += 1
          }
        }
      })
    },
    selectTopic(topic) {
      this.currentChat = topic
      this.chats[topic].newTexts = 0
    },
    onUserLogin(username) {
      this.login(username)
      this.initializeChat()
    },
    onUserLogout() {
      this.user.name = null
      this.chats = {}
      this.currentChat = null
      this.$chat.logout()
    },
    onNewChat(topic) {
      console.log('newchat', topic)
      if(this.chats[topic] !== undefined) {
        return
      }
      this.$set(this.chats, topic, { newTexts: 0, messages: [], paused: false })
      this.$chat.client.subscribe(topic)
    },
    onLeaveChat(topic) {
      console.log(`leave chat ${topic}`)
    },
    onPauseChat(topic) {
      console.log(`pause chat ${topic}`)
      this.chats[topic].paused = !this.chats[topic].paused
      console.log(this.chats[topic])
    },
    onUserSetHost(hostname) {
      this.client.host = hostname
      if(this.$chat.client !== null) {
        this.onUserLogout()
      }
      this.$chat.location = hostname
    }
  },
  data() {
    return {
      user: {
        name: null
      },
      client: {
        host: this.$chat.location
      },
      chats: {},
      currentChat: null,
    }
  },
}
</script>

<style>

</style>
