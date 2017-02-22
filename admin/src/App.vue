<template>
  <div id="app">
    <admin v-if="hasAccess"></admin>
    <div v-else>
      "Siling, har du stempel?"
      <br/>
      <input type="text" v-model="password" />
      <br/>
      <button v-if="password.length" @click="auth">*viser gjengkort*</button>
      <br/>
      <span id="reply" v-if="reply.length">{{reply}}</span>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#reply {
  color: darkred;
  margin: 10px;
}
</style>

<script>
import Admin from './components/Admin'

const io = require('socket.io-client')
const socket = io(':80/auth')
socket.on('connect', () => console.log('Connected to /auth'))

export default {
  name: 'app',
  data () {
    return {
      hasAccess: false,
      password: '',
      reply: ''
    }
  },
  methods: {
    auth () {
      this.reply = ''
      socket.emit('auth', this.password)
    }
  },
  created () {
    socket.on('message', (message) => {
      if (message === 'Jah Rastafarai') {
        this.hasAccess = true
      } else if (message === 'wrong') {
        console.log('Wrong pass')
        this.reply = '"Ey kis oblatet ditt gikk ut i V15"'
      }
    })
  },
  components: {
    Admin
  }
}
</script>
