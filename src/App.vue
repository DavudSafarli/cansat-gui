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
    f(this);
    // const vue = this;
    
    // var socket = io('localhost:3000');
    // console.log(io)
    // socket.on('data', (data) => {
    //   console.log(data);
    //   vue.arr.push(data);
    // });
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
