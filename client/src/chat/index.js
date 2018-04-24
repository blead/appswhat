import { AppsWhatClient } from '@shared'

let _location = 'http://localhost'
let _client = null
class ChatClient {
  static login(clientID) {
    _client = new AppsWhatClient(_location, clientID)
  }

  static logout() {
    if(_client !== null) {
      _client.end()
      _client = null
    }
  }

  static get location() {
    return _location
  }

  static set location(loc) {
    _location = loc
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
