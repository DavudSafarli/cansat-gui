import Vue from 'vue';
import Graph from './Graph.vue';
import Grid from './Grid.vue';

[Graph, Grid].forEach(c => {
  Vue.component(c.name, c);
})