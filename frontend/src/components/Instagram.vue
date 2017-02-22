<template>
    <div>
    </div>
</template>

<style scoped>
    div {
        background: red;
        opacity: 0.6;
        position: relative;
    }
</style>

<script>
const io = require('socket.io-client')

export default {
  name: 'instagram',
  created () {
    let socket = io(':80/instagram')
    socket.on('connect', () => console.log('Connected to /instagram'))
  },
  data () {
    return {
      instas: []
    }
  },
  components: {
  }
}
</script>
