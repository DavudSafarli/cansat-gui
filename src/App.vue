<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<script>
// eslint-disable-next-line
import io from 'socket.io-client';
import f from './socket';
// import Chart from 'chart.js/dist/Chart.bundle';

let socket;

export default {
  mounted() {
    f();
  },
  data() {
    return {
      arr: [],
    };
  },
};
</script>

<style lang='scss'>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html{
  overflow-y: auto;
  
}
</style>
