import {socket} from './socket'
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    srcs: [
      'https://via.placeholder.com/480x480',
      'https://via.placeholder.com/480x481',
      'https://via.placeholder.com/481x480',
      'https://via.placeholder.com/481x481',
      'https://via.placeholder.com/482x481',
      'https://via.placeholder.com/482x482',
    ],
    testData: {
      time: 0,
      c: 0,
      h: 0,
      v: 0,
      lon: 0,
      lat: 0,
      pic: 0,
    },
    testStartPoint: {
      time: 0,
      c: 0,
      h: 198,
      v: 12,
      lon: 40.414323,
      lat: 49.883668,
      pic: true,
    },
    altitude: {
      labels: [''],
      data: [],
    },
    speed: {
      labels: [''],
      data: [],
    },
    radar: {
      colors: ['#ff0000', '#00abab'],
      data: [],
    },
    // all data
    tableData: [
    ],
  },
  getters: {
    altitude: state => state.altitude,
    speed: state => state.speed,
    radar: state => state.radar,
    table: state => state.tableData,
    current: state => {
      if(state.tableData.length == 0){
        return state.testData;
      }
      return state.tableData[state.tableData.length - 1];
    },
    srcs: state => state.srcs
  },
  mutations: {
    UPDATE_ALTITUDE(state, { label, data }) {
      const l = state.altitude.labels.length;
      state.altitude.labels[l-1] = label;
      state.altitude.labels.push('');
      state.altitude.data.push(data);
      window.arr[0].update();
    },
    UPDATE_SPEED(state, { label, data }) {
      const l = state.speed.labels.length;
      state.speed.labels[l-1] = label;
      state.speed.labels.push('');
      state.speed.data.push(data);
      window.arr[1].update();
    },
    UPDATE_RADAR(state, data) {
      state.radar.data.push(data);
      let l = state.radar.data.length;
      if(l > 2){
        state.radar.colors[l-1] = state.radar.colors[l - 2]
        state.radar.colors[l - 2] = 'rgba(0,0,0,0.1)'
      }
      
      window.arr[2].update();
    },
    UPDATE_TEST(state, data) {
      state.testStartPoint = data;
    },
    ADD_DATA(state, data) {
      state.tableData.push(data);
    }
  },
  actions: {
    test({ state, commit }) {
      function generate_fake_data() {
        let data = {
          time: state.testStartPoint.time + 1,
          c: state.testStartPoint.c + 1,
          h: parseFloat(state.testStartPoint.h) - 5 - Math.random() * 3,
          v: parseFloat(state.testStartPoint.v) + Math.random() * 4 - 2,
          lon: parseFloat(state.testStartPoint.lon) + Math.random() * 0.001 - 0.0005,
          lat: parseFloat(state.testStartPoint.lat) + Math.random() * 0.001 - 0.0005,
          pic: Math.random() > 0.5 ? true : false,
        }
        if(data.h < 0){
          clearInterval(x)
          return null;
        }
        
        commit('UPDATE_TEST', data)
        console.log(data)
        data.h = data.h.toFixed(2)
        data.v = data.v.toFixed(2)
        data.lon = data.lon.toFixed(4)
        data.lat = data.lat.toFixed(4)
        return data;
      }

      var x = setInterval(() => {
        let data = generate_fake_data();
        if(!data) return;
        commit('ADD_DATA', data);
        commit('UPDATE_ALTITUDE', {
          label: data.c,
          data: data.h,
        })
        commit('UPDATE_SPEED', {
          label: data.c,
          data: data.v,
        })
        commit('UPDATE_RADAR', {
          x: data.lon,
          y: data.lat,
        })
        
      }, 1000);
    },
    reset() {
      console.log(socket.emit)
      socket.emit('reset', true)
    },
    processTelemetry({commit},data) {
      commit('ADD_DATA', data)
      commit('UPDATE_ALTITUDE', {
        label: data.Count,
        data: data.Altitude
      })
      commit('UPDATE_SPEED', {
        label: data.Count,
        data: data.Velocity
      })
    }

  },
});
