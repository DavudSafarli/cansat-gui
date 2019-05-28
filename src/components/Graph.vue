<template>
  <div class="graphs-container">
      <v-layout row wrap>
        <v-flex xs6 class="half-height">
          <div class="canvas-wrap">
            <d-line-graph title="Altitude" :max="220" :graph="altitude"></d-line-graph>
          </div>
        </v-flex>
        <v-flex xs6 class="half-height">
          <div class="canvas-wrap separator">
            <d-line-graph title="Speed" :max="40" :graph="speed"></d-line-graph>
          </div>
        </v-flex>
        <v-flex xs6 class="half-height">
          <div class="canvas-wrap">
            <d-radar-graph :graph="radar"></d-radar-graph>
          </div>
        </v-flex>
        <v-flex xs6 class="half-height">
          <div class="canvas-wrap">
            <d-slider :srcs="srcs" :graph="radar"></d-slider>
          </div>
        </v-flex>
      </v-layout>
      
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex';

export default {
  name: 'DGraph',
  computed: {
    ...mapGetters([
      'altitude',
      'speed',
      'radar',
      'srcs',
    ])
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.graphs-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .canvas-wrap{
    height: 100%;
    box-sizing: border-box; 
    padding: 10px;
    @media screen and (max-width: 1600px){
      // make responsive
      // height: 40%;
    }
    &.separator{
      border-left: 1px solid rgba(0,0,0,0.1);
      margin-left: 10px;
    }
  }
  .half-height{
    height: 50%;
  }
}
.v-window__container{
  transition: none;
}
</style>
