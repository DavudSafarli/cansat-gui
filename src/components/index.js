import Vue from 'vue';
import LineGraph from './Graph/LineGraph.vue';
import RadarGraph from './Graph/RadarGraph.vue';
import Graph from './Graph.vue';
import Grid from './Grid.vue';
import Visual from './Visual.vue';
import Telemetry from './Telemetry.vue';
import Image from './Image.vue';
import Slider from './Slider.vue';

[
  LineGraph,
  RadarGraph,
  Graph,
  Grid,
  Telemetry,
  Visual,
  Image,
  Slider, 
].forEach((c) => {
  Vue.component(c.name, c);
});
