
var socket = io();

function scrollToBottom () {
//selectors
var messages = jQuery('#messages');
var  newMessage = messages.children('li:last-child')
//heights
var clientHeight = messages.prop('clientHeight')
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight =  newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();

if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {

messages.scrollTop(scrollHeight);

}

}


socket.on('connect',() => {
  console.log('Connected to server');
});
socket.on('disconnect', () => {
  console.log('Disconnected from server')
});

socket.on('newMessage',function (message) {
  var formmatedTime = moment(message.createdAt).format('LT');
 var template = jQuery('#message-template').html();
 var html = Mustache.render(template,{
   text: message.text,
   from: message.from,
   createdAt: formmatedTime
 });

 jQuery('#messages').append(html);
 scrollToBottom();

});

  socket.on('newLocationMessage',function (message) {
    var formmatedTime = moment(message.createdAt).format('LT');
  
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
      url:message.url,
      from: message.from,
      createdAt: formmatedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
  });

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
})
})













