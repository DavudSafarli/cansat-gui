var express = require('express');

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.origins('*:*')
io.set('origins', '*:*');
// app.use(cors());


app.get('/', function (req, res) {
  res.send('hello world')
})

var serialport = require("serialport");
let PORT = "COM3";

var myPort = new serialport(PORT, {
  baudRate: 9600,
  parser: new serialport.parsers.Readline('\r\n')
})


myPort.on('open', onOpen);
myPort.on('data', onData);

function onOpen(){
  console.log('Open connections!');
}

function onData(data){
  console.log('on Data ' + data);
}

io.on('connection', function (socket) {
  console.log('girdi ay qaaaaaaaaaa');
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});

// myPort.write()