import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    c: 3,
    chartElements: [],
    altitude: {
      labels: [0, 1, 2, ''],
      data: [200, 50, 40],
    },
    speed: {    
      labels: [0, 1, 2, ''],
      data: [200, 50, 40],
    },
    radar: {
      colors: ['#00abab'],
      data: [{x: 0.45, y: 0.2},{x: -0.2, y: -0.2},{x: 0.3, y: -0.3}],
    },
    tableData: [
      {
        time: '12.5',
        packetCount: 1,
        altitude: 23,
        speed: 123,
        lon: 88,
        lat: 92,
        picIsTaken: true,
      },
      {
        time: '24',
        packetCount: 2,
        altitude: 123,
        speed: 2,
        lon: 23,
        lat: 91,
        picIsTaken: true,
      },
      {
        time: '35',
        packetCount: 3,
        altitude: 312,
        speed: 22,
        lon: 32,
        lat: 91,
        picIsTaken: false,
      }
    ]
  },
  getters: {
    altitude: state => state.altitude,
    speed: state => state.speed,
    table: state => state.tableData,
  },
  mutations: {
    SET_ALTITUDE_CHART_ELEMENTS(state, el) {
      state.chartElements.push(el);
      console.log(el)
    },
    UPDATE_ALTITUDE(state, { label, data }) {
      const l = state.altitude.labels.length;
      state.altitude.labels[l-1] = label;
      state.altitude.labels.push(label);
      state.altitude.data.push(data);
      state.chartElements[0].update();
    },
    UPDATE_SPEED(state, { label, data }) {
      state.speed.labels.push(label);
      state.speed.data.push(data);
    },
    UPDATE_RADAR(state, { label, data }) {
      state.radar.colors.unshift('rgba(0,0,0,0.1)');
      state.radar.data.push(data);
    },
  },
  actions: {
    test({ state, commit }) {
      var x = setInterval(() => {
        commit('UPDATE_ALTITUDE', {label: state.c++, data: Math.random()*50 + 50 })
        // state.altitudeEl.update();
      }, 10);
      setTimeout(() => {
        clearInterval(x)
      }, 3000);
    }
  },
});
