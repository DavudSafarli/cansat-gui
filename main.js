const express = require('express');
const app     = express();


const PORT = process.env.PORT || 8001;
const server = app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`)
})

const io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
});

















// function createWindow() {
// let mainWindow = new BrowserWindow({
//   width: 1280,
//   height: 910,
//   webPreferences: {
//   nodeIntegration: true,
//   },
// });
// // mainWindow.maximize();
// if(process.env.NODE_ENV == 'production'){
//   mainWindow.loadURL(`http://localhost:${PORT}`);
// }else{
//   mainWindow.loadURL('http://localhost:8080');
// }
// // mainWindow.webContents.openDevTools()
// mainWindow.on('closed', () => {
//     mainWindow = null;
// });
// }


// app.on('ready', createWindow);


