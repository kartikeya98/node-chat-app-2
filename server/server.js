const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const port = process.env.PORT || 3000;

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

 var app = express();
 var server = http.createServer(app);
   app.use(express.static(publicPath));
var io = socketIO(server);
   io.on('connection',(socket) => {
     console.log('New user connected');

      socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

      socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

     socket.on('createNewMessage',(message,callback) => {
       console.log('createNewMessage',message);
       io.emit('newMessage',generateMessage(message.from,message.text));
       callback('this is from server')
     });
     socket.on('disconnect',(socket) => {
       console.log('The user is disconnected')
     })
   });




 server.listen(port,()=> {
   console.log(`the app is running on ${port}`);
 })
