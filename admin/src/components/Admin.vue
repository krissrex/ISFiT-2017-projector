<template>
  <div class="admin">
    Gz du er admin
    <br/>
    <twitter></twitter>
  </div>
</template>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

<script>
const Twitter = require('./Twitter')
const io = require('socket.io-client')

const adminSocket = io(':80/admin')
adminSocket.on('connect', () => console.log('Connected to /admin'))

// naughty but w/e
window.banTweet = function (tweet) {
  adminSocket.emit('delete', tweet)
}

export default {
  name: 'admin',
  created () {
  },
  data () {
    return {
      tweets: []
    }
  },
  components: {
    Twitter
  }
}
</script>
