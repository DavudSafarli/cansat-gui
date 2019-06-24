import io from 'socket.io-client';

var socket;
export default function(vue) {
    socket = io('localhost:3000');
    socket.on('data', (data) => {
        vue.arr.push(data);
    });
    
}


export {socket}