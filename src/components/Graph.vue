<template>
  <div class="graphs-container">
      <v-layout row wrap>
        <v-flex xs6 class="half-height">
          <div class="canvas-wrap">
            <d-line-graph title="Altitude" :graph="altitude"></d-line-graph>
          </div>
        </v-flex>
        <v-flex xs6 class="half-height">
          <div class="canvas-wrap separator">
            <d-line-graph title="Speed" :graph="speed"></d-line-graph>
          </div>
        </v-flex>
        <v-flex xs6 class="half-height">
          <div class="canvas-wrap">
            <d-radar-graph></d-radar-graph>
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
  mounted() {
    this.$store.dispatch('test') 
  },
  computed: {
    ...mapGetters([
      'altitude',
      'speed',
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
</style>
