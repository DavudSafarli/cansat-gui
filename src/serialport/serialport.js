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
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// DEFINE PORT
let PORT = "COM3";
const port = new serialport(PORT)
const parser = port.pipe(new ByteLength({length: 10}))
parser.on('open', onOpen);
parser.on('data', onData);

function onOpen(){
  console.log('Open connections!');
}

const START_CH = "{"
const END_CH = "}"

let dataString = "";
let read = false;
async function onData(data) {
  // get the real data within RECEIVED packet, but it could be just half of the data
  await data.reduce((acc, code) => {
    let char = String.fromCharCode(code)
    // reading the END_CH means you read all data within TRANSMITTED packet sent from xbee
    if(char == END_CH) {
      read = false;
      // now you can parse it
      parseData(dataString)
      dataString = "";
      return acc;
    }
    else if(char == START_CH) {
      read = true;
      return acc;
    }
    if(read){
      acc += char;
      dataString += char;
    }
    return acc;
  }, "")  
}

let keys = ['Team ID', 'UpTime', 'Count', 'Altitude', 'Velocity', 'Latitude', 'Longtitude', 'Image']

// write to db and emit socket
function parseData(string) {
  let values = string.split(',');
  let telemetry = {}
  for(let i = 0; i < keys.length; i++){
    telemetry[keys[i]] = values[i]
  }
  db.saveTelemetry(telemetry)
  io.emit('telemetry', telemetry)
}
