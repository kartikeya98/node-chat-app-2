var socket = io();

socket.on('connect',() => {
  console.log('Connected to server');

  socket.emit('createNewMessage',{
    to:'jen@example.com',
    text:'hey. this is andrew'
  });
  socket.on('newMessage',function (message) {
    console.log('New Message',message)
  })
});

socket.on('disconnect', () => {
  console.log('Disconnected from server')
});
