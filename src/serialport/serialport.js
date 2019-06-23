var serialport = require("serialport");
const ByteLength = require('@serialport/parser-byte-length')
const onData = require('./onData')
var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
io.origins('*:*')
io.set('origins', '*:*');


const DATA_SIZE = 35
const DATA_L_REDUNDANT_SIZE = 15
const DATA_R_REDUNDANT_SIZE = 5
const DATA_MAX_SIZE = DATA_SIZE + DATA_L_REDUNDANT_SIZE + DATA_R_REDUNDANT_SIZE

app.get('/', function (req, res) {
  res.send('hello world')
})

// DEFINE PORT
let PORT = "COM3";
const Readline = serialport.parsers.Readline
const port = new serialport(PORT)
const parser = port.pipe(new ByteLength({length: 10}))
parser.on('open', onOpen);
// parser.on('data', onData);


function onOpen(){
  console.log('Open connections!');
}


setInterval(() => {
  port.write('x')
}, 1000); 

// io.on('connection', function (socket) {
//   console.log('girdi');
//   // socket.emit('news', { hello: 'world' });
//   // socket.on('my other event', function (data) {
//   //   console.log(data);
//   // });
// });
