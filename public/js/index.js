
var socket = io();

socket.on('connect',() => {
  console.log('Connected to server');

 
  socket.on('newMessage',function (message) {
    console.log('New Message',message);
    var formmatedTime = moment(message.createdAt).format('LT');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formmatedTime}:${message.text}`);

    jQuery('#messages').append(li);
  })
});

socket.on('disconnect', () => {
  console.log('Disconnected from server')
});

  socket.on('newLocationMessage',function (message) {
    var formmatedTime = moment(message.createdAt).format('LT');

    var li  = jQuery('<li></li>');
    var a = jQuery('<a target=""_blank>My Current Location</a>');

    li.text(`${message.from} ${formmatedTime}: `);
    a.attr('href',message.url);
    li.append(a);

    jQuery('#messages').append(li);

  })

// socket.emit('createNewMessage',{
//   from: 'frank',
//   text:'hi'
// }, function(data) {
//   console.log('got it',data)
// });

jQuery('#message-form').on('submit', function (e) {

  e.preventDefault();


  var messageTextbox = jQuery('[name=message]');


  socket.emit('createNewMessage',{
    from:'User',
    text: messageTextbox.val()
  }, function () {
      messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation) {

    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('sending location...');

navigator.geolocation.getCurrentPosition(function (position) {

  locationButton.removeAttr('disabled').text('send location');

  socket.emit('createLocationMessage',{
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });

},function() {
  locationButton.removeAttr('disabled').text('send location');

  alert('Unable to fetch location');
});
});













