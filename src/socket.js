import io from 'socket.io-client';
import store from './store'

var socket;
export default function() {
    socket = io('localhost:3000');
    socket.on('telemetry', (data) => {
        store.dispatch('processTelemetry', data);
    });
}


export {socket}