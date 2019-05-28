var serialport = require("serialport");
var xbee_api = require('xbee-api');

var C = xbee_api.constants;
var xbeeAPI = new xbee_api.XBeeAPI();
let PORT = "COM3";

var frame_obj = {
  type: C.FRAME_TYPE.AT_COMMAND,
  command: "NI",
  commandParameter: [],
};
console.log(xbeeAPI.buildFrame(frame_obj));

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