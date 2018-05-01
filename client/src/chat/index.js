import { AppsWhatClient } from '@shared'

const _LOCATION = 'http://load-balancer:8008'
let _client = null
class ChatClient {
  static login(clientID) {
    _client = new AppsWhatClient(_LOCATION, clientID)
  }

  static get client() {
    return _client
  }
}

ChatClient.plugin = {
  install: (Vue, options) => {
    Vue.prototype.$chat = ChatClient
  }
}

export default ChatClient
