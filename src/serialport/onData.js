const START_CH = "S"
const END_CH = "E"

let dataInPacket = "";
let dataString = "";
let read = false;
async function onData(data) {
  // get the real data within RECEIVED packet, but it could be just half of the data
  dataInPacket = await data.reduce((acc, code) => {
    let char = String.fromCharCode(code)
    
    // reading the END_CH means you read all data within TRANSMITTED packet sent from xbee
    if(char == END_CH) {
      read = false;
      // now you can parse it
      parseData()
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
function parseData() {
  console.log(dataString)
  dataString = "";
}


function Array2(cap) {
  this.capacity = cap;
  this.array = new Array(2)
}
Array2.prototype.add = function(char){
  this.shift()
  this.array[this.capacity-1] = char
}
Array2.prototype.shift = function(){
  for (let i = 1; i < this.capacity; i++) {
    this.array[i-1] = this.array[i]
  }
}
Array2.prototype.toString = function(){
  return this.array.join('')
}
Array2.prototype.clear = function(){
  this.array = new Array(2)
}
module.exports = onData;