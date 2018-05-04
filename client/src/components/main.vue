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
    initializeChat() {
      this.chats = {}
      this.currentChat = ''
      this.$chat.client.on('message', packet => {
        const { payload, topic, retain } = packet
        this.addTopicAndSubscribeIfNotExist(topic)
        if (this.checkIfMessageNotExists(topic, payload)) {
          if (retain) {
            this.getUnread(topic, this.chats[topic].lastMessageId, payload.id, payload)
          }
          this.handleMessage(topic, payload, retain)
        }
      })
    },
    addTopicAndSubscribeIfNotExist(topic, isNew) {
      if (this.chats[topic] === undefined) {
        this.$set(this.chats, topic, {
          newTexts: 0,
          messages: [],
          unreadMessages: isNew ? [] : null,
          lastMessageId: null,
          paused: false
        })
        this.$chat.client.subscribe(topic)
      }
    },
    checkIfMessageNotExists(topic, findMsg) {
      const {messages, unreadMessages} = this.chats[topic]
      const result = messages.find(
        msg => msg.id === findMsg.id
      )
      const result2 = unreadMessages ? unreadMessages.find(
        msg => msg.id === findMsg.id
      ) : undefined

      return result === undefined && result2 === undefined
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
      const unreads = payloads.map(this.addOwn).filter(msg => this.checkIfMessageNotExists(topic, msg))
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
      this.$chat.login(username)
      this.$chat.client.on('connect', () => {
        console.log(`connected to ${this.$chat.client.serverUrl}`)
        if (!this.user.name) {
          this.initializeChat()
        }
        this.user.name = username
      })
    },
    onYoda() {
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
      this.addTopicAndSubscribeIfNotExist(topic, true)
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
      console.log(this.chats[topic])
      this.chats[topic].paused = !this.chats[topic].paused
      const {messages}  = this.chats[topic]
      if (this.chats[topic].paused) {
        if (!this.chats[topic].unreadMessages) {
          this.chats[topic].unreadMessages = this.chats[topic].messages
        } else {
          this.chats[topic].unreadMessages.push(...this.chats[topic].messages)
        }
        this.chats[topic].messages = []
        this.$chat.client.unsubscribe(topic)
      } else {
        this.$chat.client.subscribe(topic)
      }
    },
    onUserSetHost(hostname) {
      if (this.$chat.client !== null) {
        this.onUserLogout()
      }
      this.client.host = hostname
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
