"use strict";

//config_modules
var config        = require('./config');

//node_modules
var firmata       = require('firmata');
var net           = require('net');

//express_modules
var webServer     = require('./webServer');
var http          = webServer.start(3000);
var app           = webServer.app();

//socket_io modules
var socketServer  = require('./socketServer').start(http);

//Express Path
app.get('/arduino/:number', function(req, res) {
  //Kalau bukan 1 atau 2 berarti salah !
  if(req.params.number !== '1' && req.params.number !== '2') {
    res.end('wrong number');
  }

  res.sendFile(__dirname + '/index.html');

  //Pilih arduino yang akan diconnectkan
  var selector;
  if(req.params.number === '1') selector = config.ARDUINO_1;
  else selector = config.ARDUINO_2;

  socketServer.of(selector.nickname).on('connection', function(socket) {
    socketOnConnectHandler(socket, selector, req, res);
  });


});

//SocketIO EventHandler
function socketOnConnectHandler(socket, selector, req, res) {
  console.log('Someone connected to ' + selector.nickname + ' with ID ' + socket.id);

  net.connect(selector, function() {
    console.log('connecting to ' + selector.host);

    var arduinoSerial = this;
    var arduinoClient = new firmata.Board(arduinoSerial);

    arduinoClient.once('ready', function() {
      console.log(selector.nickname + ' connected to socketIO server !');
      arduinoBlinker(req, res, arduinoClient);
    });
  });
}

//Arduino EventHandler
function arduinoBlinker(req, res, arduinoClient) {
  console.log('Arduino ' + req.params.number + ' ready !');
  arduinoClient.isReady = true;

  //LOGIC FOR BLINKING LED
  var ledOn = true;

  arduinoClient.pinMode(13, arduinoClient.MODES.OUTPUT);

  setInterval(function() {
    if (ledOn) {
      console.log("+");
      arduinoClient.digitalWrite(13, arduinoClient.HIGH);
    } else {
      console.log("-");
      arduinoClient.digitalWrite(13, arduinoClient.LOW);
    }
    ledOn = !ledOn;
  }, 500);

  res.end('200 ' + req.params.number);
}



/*
function arduinoMove(req, res, arduinoClient) {
  console.log('Arduino ' + req.params.number + ' is moving to ' + req.params.direction);

  arduinoClient.pinMode(config.ARDUINO_PIN.STBY, arduinoClient.MODES.OUTPUT);
  arduinoClient.pinMode(config.ARDUINO_PIN.AIN1, arduinoClient.MODES.OUTPUT);
  arduinoClient.pinMode(config.ARDUINO_PIN.AIN2, arduinoClient.MODES.OUTPUT);
  arduinoClient.pinMode(config.ARDUINO_PIN.BIN1, arduinoClient.MODES.OUTPUT);
  arduinoClient.pinMode(config.ARDUINO_PIN.BIN2, arduinoClient.MODES.OUTPUT);
  arduinoClient.pinMode(config.ARDUINO_PIN.PWMA, arduinoClient.MODES.PWM);
  arduinoClient.pinMode(config.ARDUINO_PIN.PWMB, arduinoClient.MODES.PWM);

  function moveInit() {
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.LOW);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMA, 255);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMB, 255);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN2, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN1, arduinoClient.HIGH);
  }

  function moveForward() {
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN1, arduinoClient.LOW);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN2, arduinoClient.HIGH);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMA, 255);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.BIN1, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.BIN2, arduinoClient.LOW);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMB, 255);
  }

  function moveBackward() {
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN1, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN2, arduinoClient.LOW);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMA, 255);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.BIN1, arduinoClient.LOW);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.BIN2, arduinoClient.HIGH);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMB, 255);
  }

  function moveLeft() {
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN1, arduinoClient.LOW);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN2, arduinoClient.HIGH);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMA, 255);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.BIN1, arduinoClient.LOW);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.BIN2, arduinoClient.HIGH);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMB, 255);
  }

  function moveRight() {
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN1, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN2, arduinoClient.LOW);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMA, 255);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.BIN1, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.BIN2, arduinoClient.LOW);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMB, 255);
  }

  function moveCease() {
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN1, arduinoClient.LOW);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.AIN2, arduinoClient.LOW);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMA, 255);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.STBY, arduinoClient.HIGH);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.BIN1, arduinoClient.LOW);
    arduinoClient.digitalWrite(config.ARDUINO_PIN.BIN2, arduinoClient.LOW);
    arduinoClient.analogWrite(config.ARDUINO_PIN.PWMB, 255);
  }

  socketServer.on('moveForward', function(socket) {
    moveForward();
    moveCease();
  });
}
*/
