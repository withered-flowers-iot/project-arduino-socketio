"use strict";

var app = require('express')();
var http = require('http').Server(app);

exports.start = function(port) {
  http.listen(port, function() {
    console.log('listenin on port: ' + port);
  })

  return http;
};

exports.app = function() {
  return app;
}
