import AppsWhatClient from '@shared/appswhat-client' 

const client = new AppsWhatClient('http://localhost:80', 'peaw')
console.log(client)
client.on('message', console.log)
client.subscribe('test')
client.publish('test', 'hello')
console.log('hello from webpack')
