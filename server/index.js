const express = require('express')
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path');

const twitter = require('./twitter/twitter')
const instagram = require('./instagram/instagram')
const admin = require('./admin/admin')

const banCallback = twitter(io)
admin(io, banCallback)
//instagram()

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'))
})

app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'admin.html'))
})

const PORT = 80
server.listen(PORT)
console.log('Listening on port ' + PORT)


///
/*const Insta = require('./data/insta')

const instagramSocket = io
  .of('/instagram')
  .on('connection', function (socket) {
    socket.emit('new', new Insta());
  });*/
