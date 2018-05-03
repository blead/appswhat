import { AppsWhatClient } from '@shared';

class ChatClient {
  constructor() {
    this._location = 'http://localhost:8008';
    this._client = null;
  }

  login(clientID) {
    this._client = new AppsWhatClient(this._location, clientID);
  }

  logout() {
    if (this._client !== null && this._client.client) {
      this._client.client.end();
    }
    this._client = null;
  }

  get location() {
    return this._location;
  }

  set location(loc) {
    this._location = loc;
  }

  get client() {
    return this._client;
  }
}

ChatClient.plugin = {
  install: (Vue, options) => {
    Vue.prototype.$chat = new ChatClient();
  }
};

export default ChatClient;
