<template>
  <div id="app" style="height: 99vh; overflow: hidden;">
    <b-container fluid class="h-100">
      <b-row class="h-100">
        <b-col cols="2" class="h-100 px-0 border-right">
          <sidebar
            :user="this.user"
            :chats="this.chats"
            @selectTopic="this.selectTopic"
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
              sender: 'someguy101',
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
              sender: 'peawyoyoyin',
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
    this.login('peawyoyoyin')
    console.log(`logged in as ${this.user.name}`)
  }
}
</script>

<style>

</style>
