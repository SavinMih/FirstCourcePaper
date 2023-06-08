<template>
  <div class="chat">
      <div class="chat-messages">
        <div class="text-light chat-message" v-for="(message, index) in messages" :key="index">
          <b>{{ message.id != id ? message.name + "@" + message.id : "Вы" }}:</b> {{ message.message }}
        </div>
      </div>
      <div class="chat-input">
        <input class="me-3" type="text" v-model="messageText" @keyup.enter="sendMessage" placeholder="Напишите своё сообщение здесь...">
        <button type="button" class="btn btn-outline-light me-2" @click="sendMessage">Отправить</button>
      </div>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  const socket = io('http://localhost:3000');
  export default {
    name: 'chat-vue',
    data() {
      return {
        id: 0,
        name: "",
        messages: [],
        messageText: '',
      };
    },
    async created() {
      this.id = localStorage.getItem("userId") ? localStorage.getItem("userId") : Math.floor(Math.random() * 500000)
      localStorage.setItem("userId", this.id)
      this.name = localStorage.getItem("userName")

      socket.once('history', (messages) => {
        for (let message of messages) {
          this.messages.push(message);
        }

      });

      socket.on('message', (message) => {
        if (message.id != this.id) {
          this.messages.push(message);
        }
      });
    },
    methods: {
      sendMessage() {
        if (this.messageText) {
          localStorage.setItem("userName", this.name)
          const messageObject = {
            id: this.id,
            name: this.name ? this.name != "" ? this.name : "Гость" : "Гость", 
            message: this.messageText
          }

          socket.emit('message', messageObject);
          this.messages.push(messageObject);

          this.messageText = '';
        }
      }
    },
  };
  </script>
  
  <style>
  .chat {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
  }
  .chat-messages {
    height: 800px;
    overflow-y: scroll;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .chat-message {
    margin-bottom: 5px;
  }
  .chat-input input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  input {
    margin: 5px;
    width: 87%;
  }
  .blue {
    color: blue;
  }

  button {
    user-select: none;
  }
  </style>