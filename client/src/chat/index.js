import { AppsWhatClient } from '@shared'

class ChatClient {
  constructor(clientId) {
    /* eslint-disable-next-line */
    this._client = new AppsWhatClient(clientId, 'http://localhost');
  }
}

export default ChatClient
