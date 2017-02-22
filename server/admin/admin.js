const auth = require('../tokens').admin

const clients = []
const deletedTweets = []

module.exports = function(socketIo, banCallback) {
  const authSocket = socketIo
    .of('/auth')
    .on('connection', function (socket) {
      console.log(`Socket connected to auth with id ${socket.id}`)

      socket.on('auth', (password) => {
        if (password === auth.password) {
          // best_security = obscurity
          socket.send('Jah Rastafarai')
        } else {
          socket.send('wrong')
        }
      })
    })

    const adminSocket = socketIo
    .of('/admin')
    .on('connection', function (socket) {
      console.log(`Socket connected to admin with id ${socket.id}`)
      clients.push(socket)

      socket.on('disconnect', () => {
        console.log(`Socket disconnected from admin with id ${socket.id}`)
        clients.splice(clients.indexOf(socket), 1)
      })

      socket.on('delete', (tweet) => {
        console.log('Deleting ', tweet)
        banCallback(tweet)
      })
    })
    
}
