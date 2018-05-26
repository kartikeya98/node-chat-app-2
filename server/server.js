const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

 var app = express();
 var server = http.createServer(app);
   app.use(express.static(publicPath));
var io = socketIO(server);
   io.on('connection',(socket) => {
     console.log('New user connected');

      socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to the chat app'
      });
      socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New user joined'
      });

     socket.on('createNewMessage',(message) => {
       console.log('createNewMessage',message);
       io.emit('newMessage',{
         from: message.from,
         text: message.text,
         createdAt:new Date().getTime()
       });
     });
     socket.on('disconnect',(socket) => {
       console.log('The user is disconnected')
     })
   });




 server.listen(port,()=> {
   console.log(`the app is running on ${port}`);
 })
