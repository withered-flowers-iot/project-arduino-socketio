var net = require('net');
var five = require('johnny-five');
var firmata = require('firmata');
 
var options = {
  host: '192.168.4.1',  //whatever host
  port: 23  //some port
};
 
 
var client = net.connect(options, function() { //'connect' listener
  console.log('connected to server!');
  
  var socketClient = this;
  var io = new firmata.Board(socketClient);
 
  io.once('ready', function(){
    console.log('io ready');
    io.isReady = true;
 
    var board = new five.Board({io: io, repl: true});
 
    board.on('ready', function(){
      console.log('five ready');
      
      var led = new five.Led(13);
      led.blink(500);
 
    });
  });
 
});
