import { AppsWhatClient } from '@shared'

let _location = 'http://localhost:8008'
let _client = null
class ChatClient {
  login(clientID) {
    _client = new AppsWhatClient(_location, clientID)
  }

  logout() {
    if(_client !== null) {
      _client.client.end()
      _client = null
    }
  }

  get location() {
    return _location
  }

  set location(loc) {
    _location = loc
  }

  get client() {
    return _client
  }
}

ChatClient.plugin = {
  install: (Vue, options) => {
    Vue.prototype.$chat = new ChatClient()
  }
}

export default ChatClient
