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


function parseData(string) {
  dataString = "";


  // parse parse parse
  
  

  
  // parse parse parse


}
