var expect = require('expect');
 var {generateMessage,generateLocationMessage} = require('./message');

 describe('generateMessage', () => {
     it('should generate correct message object',() => {
  
     var from = 'jen';
     var text = 'some Message';
     var message = generateMessage(from,text);

     expect(message.createdAt).toBeA('number');
     expect(message).toInclude({from,text});
 });
});

describe('generateLocationMessage', () => {

    it('should return the address',() => {

        var from = 'admin';
        var latitude = '1';
        var longitude = '1';
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var address = generateLocationMessage(from,latitude,longitude);
        expect(address.createdAt).toBeA('number');
        expect(address).toInclude({from,url});
        
    })


})