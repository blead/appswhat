<template>
  <div id="app" style="height: 99vh; overflow: hidden;">
    <b-container fluid class="h-100">
      <b-row class="h-100">
        <b-col cols="2" class="h-100 px-0 border-right">
          <sidebar
            :user="this.user"
            :chats="this.chats"
            @selectTopic="this.selectTopic"
            @login="this.onUserLogin"
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
    }
  },
  data() {
    return {
      user: {
        name: ''
      },
      chats: {
        'thinc': {
          newTexts: 4,
          messages: [
            {
              senderId: 'someguy101',
              message: 'yo dude',
              own: false,
              timestamp: 1
            }
          ]
        },
        'cp42': {
          newTexts: 0,
          messages: [
            {
              senderId: 'peawyoyoyin',
              message: 'hello world',
              own: true,
              timestamp: 1
            }
          ]
        }
      },
      currentChat: 'thinc',
    }
  },
  created() {
    // this.login('peawyoyoyin')
    // this.$chat.client.on('message', (packet) => {
    //   console.log(packet)
    //   const { payload, topic } = packet
    //   if(this.chats[topic].messages.find(msg => (msg.id === payload.id)) === undefined) {
    //     this.chats[topic].messages.push({
    //       ...payload,
    //       own: payload.senderId === this.user.name
    //     })
    //     console.log('new message')
    //   }
    // })
    // this.$chat.client.on('connect', () => {
    // })
    // console.log(`logged in as ${this.user.name}`)
  }
}
</script>

<style>

</style>
