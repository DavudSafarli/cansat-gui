const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ telemetry: [], picture: []})
  .write()


module.exports = {
  saveTelemetry: (telemetry) => {
    db.get('telemetry')
    .push(telemetry)
    .write()
  },
  saveImage: (pic) => {
    db.get('picture')
    .push(pic)
    .write()
  }
}
