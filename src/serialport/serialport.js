var serialport = require("serialport");
const ByteLength = require('@serialport/parser-byte-length')
const onData = require('./onData')

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});

// io.on('connection', function (socket) {
//   console.log('girdi');
//   // socket.emit('news', { hello: 'world' });
//   // socket.on('my other event', function (data) {
//   //   console.log(data);
//   // });
// });


// DEFINE PORT
// let PORT = "COM3";
// const Readline = serialport.parsers.Readline
// const port = new serialport(PORT)
// const parser = port.pipe(new ByteLength({length: 10}))
// parser.on('open', onOpen);
// parser.on('data', onData);


// function onOpen(){
//   console.log('Open connections!');
// }


// setInterval(() => {
//   port.write('x')
// }, 1000); 
