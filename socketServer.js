"use strict";

var socketIO = require('socket.io');

exports.start = function(httpServer) {
  var io = socketIO(httpServer);
  io.serveClient(true);

  return io;
};
