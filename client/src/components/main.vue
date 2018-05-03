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
            :yoda="this.yoda"
            @yoda="onYoda"
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
      this.chats = {}
      this.currentChat = ''
      this.$chat.client.on('message', packet => {
        const { payload, topic, retain } = packet
        this.addTopicAndSubscribeIfNotExist(topic)
        if (this.checkIfMessageExists(topic, payload)) {
          if (retain) {
            this.getUnread(topic, this.chats[topic].lastMessageId, payload.id, payload)
          }
          this.handleMessage(topic, payload, retain)
        }
      })
    },
    addTopicAndSubscribeIfNotExist(topic) {
      if (this.chats[topic] === undefined) {
        this.$set(this.chats, topic, {
          newTexts: 0,
          messages: [],
          unreadMessages: null,
          lastMessageId: null,
          paused: false
        })
        this.$chat.client.subscribe(topic)
      }
    },
    checkIfMessageExists(topic, findMsg) {
      const result = this.chats[topic].messages.find(
        msg => msg.id === findMsg.id
      )
      return result === undefined
    },
    addOwn(payload) {
      return {
        ...payload,
        own: this.user.name === payload.senderId
      }
    },
    getUnread(topic, start, end, retainPayload) {
        console.log(start, end)
      this.$chat.client.getUnread(topic, {id: start}, {id: end}, null)
        .then(payloads => this.handleUnreads(topic, payloads))
        .catch(err => console.error(err))
    },
    handleUnreads(topic, payloads) {
      console.log('payloads', payloads)
      const {unreadMessages, messages} = this.chats[topic]
      const unreads = payloads.map(this.addOwn)
      console.log(unreadMessages)
      if(unreadMessages === null || unreadMessages === undefined) {
        console.log(this.chats[topic])
        this.chats[topic].unreadMessages = unreads
      } else {
        this.chats[topic].unreadMessages.push(...unreads)
      }
    }
    ,
    handleMessage(topic, payload, retain) {
      this.chats[topic].messages.push(this.addOwn(payload))
      this.updateNewTexts(topic, retain)
      this.chats[topic].lastMessageId = payload.id
    },
    updateNewTexts(topic, retain) {
      if (topic !== this.currentChat && !retain) {
        this.chats[topic].newTexts += 1
      }
    },
    selectTopic(topic) {
      this.currentChat = topic
      this.chats[topic].newTexts = 0
    },
    onUserLogin(username) {
      this.login(username)
      this.initializeChat()
    },
    onYoda() {
      console.log('toggle yoda')
      this.yoda = !this.yoda
    },
    onUserLogout() {
      this.user.name = null
      this.chats = {}
      this.currentChat = null
      this.$chat.logout()
    },
    onNewChat(topic) {
      console.log('newchat', topic)
      if (this.chats[topic] !== undefined) {
        return
      }
      this.addTopicAndSubscribeIfNotExist(topic)
      this.currentChat = topic
      this.$chat.client.subscribe(topic)
      if (this.currentChat === null) {
        this.selectTopic(topic)
      }
    },
    onLeaveChat(topic) {
      console.log(`leave chat ${topic}`)
      this.$delete(this.chats, topic)
      this.$chat.client.unsubscribe(topic)
    },
    onPauseChat(topic) {
      console.log(`pause chat ${topic}`)
      if(this.chats[topic].paused) {
        // unpause
      } else {
        // pause
      }
      this.chats[topic].paused = !this.chats[topic].paused
      const {messages}  = this.chats[topic]
      if (this.chats[topic].paused) {
        this.chats[topic].unreadMessages.push(...this.chats[topic].messages)
        this.chats[topic].messages = []
        this.$chat.client.unsubscribe(topic)
      } else {
        this.$chat.client.subscribe(topic)
      }

      console.log(this.chats[topic])
    },
    onUserSetHost(hostname) {
      this.client.host = hostname
      if (this.$chat.client !== null) {
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
      yoda: false,
    }
  }
}
</script>

<style>

</style>
