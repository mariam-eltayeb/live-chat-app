const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 7000

const server = app.listen(PORT, () => console.log(`💬 server on port ${PORT}`))
// create link between sokcet io and our server
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
// variable to sabe a set of socket ids created
let socketsConected = new Set()
// defining conection of socket io is connected or disconnected

io.on('connection', onConnected)

function onConnected(socket) {
    // console retrieve  the id of web page load 
//   console.log('Socket connected', socket.id)
  socketsConected.add(socket.id)    

//   io.emit('clients-total', socketsConected.size)
//when web is disconnected remov ids id 
  socket.on('disconnect', () => {
    // console.log('Socket disconnected', socket.id)
    socketsConected.delete(socket.id)
    // used to pass data  data 
    // io.emit('clients-total', socketsConected.size)
  })

  socket.on('message', (data) => {
    // console.log(data)
    //listen to the message typed to send 
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })
}

