var serialport  = require("serialport");
var ByteLength  = require('@serialport/parser-byte-length')
var app         = require('express')();
var http        = require('http').createServer(app);
var io          = require('socket.io')(http);
var db          = require("./db");

io.origins('*:*')
io.set('origins', '*:*');

app.get('/', function(req, res){
  res.send('as')
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('reset', function(bool){
    console.log('resetledim ay qa')
    port.write('x')
  });
  setInterval(() => {
      io.emit('telemetry', {altitude: '500 metr'})
  }, 5000);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
