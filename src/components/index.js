import Vue from 'vue';
import LineGraph from './Graph/LineGraph.vue';
import RadarGraph from './Graph/RadarGraph.vue';
import Graph from './Graph.vue';
import Grid from './Grid.vue';
import Telemetry from './Telemetry.vue';

[
  LineGraph,
  RadarGraph,
  Graph,
  Grid,
  Telemetry
].forEach((c) => {
  Vue.component(c.name, c);
});
