import io from 'socket.io-client'
import uuid from 'uuid/v4'

class Chat {
  constructor(url, options) {
    this.socket = io(url, options)
  }

  close = () => this.socket.close()

  on = (event, callback) => {
    // add function on socket event
    this.socket.on(event, callback)
  }

  setMessageInfo = (author, chatroom) => {
    this.author = author
    this.chatroom = chatroom
  }

  sendMessage = (message, contentType = 'TEXT') => {
    const newMessage = {
      author: this.author,
      chatroom: this.chatroom,
      contentType,
      content: message,
      messageId: uuid().replace(/-/g, ''),
    }

    this.socket.emit('new message', newMessage)
    return newMessage
  }
}

export default Chat
