<template>
  <canvas ref="graph"></canvas>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DRadarGraph',
  props: ['graph'],
  mounted() {
		const el = this.$refs.graph.getContext('2d');
    const chart = new Chart(el, this.chart);
    // this.$store.commit('SET_ALTITUDE_CHART_ELEMENTS', chart);
    if(window.arr == undefined){
			window.arr = [];
		}
		arr.push(chart);
  },
  data() {
    return {
      chart: {
        type: 'scatter',
        data: {
          datasets: [
            {
              data: this.graph.data,
              pointBackgroundColor: this.graph.colors,
              pointBorderColor: 'transparent',
              pointRadius: 3,
              borderColor: 'rgba(0, 200, 200, 0.3)',
              borderWidth: 1,
              fill: false,
              tension: 0.3,
              showLine: true,
            }
          ],
        },
        options: {
          maintainAspectRatio: false,
          legend: false,
          title: {
						display: true,
						text: 'GPS Location',
						fontSize: '20',
					},
          tooltips: false,
          scales: {
            xAxes: [{
              ticks: {
                // min: 49.005,
                // max: 49.010,
              },
              gridLines: {
                // color: '#888',
                // drawOnChartArea: false,
              }
            }],
            yAxes: [{
              ticks: {
                // min: -0.005,
                // max: 0.005,
                padding: 5
              },
              gridLines: {
                // color: '#888',
                // drawOnChartArea: false
              }
            }]
          },
        },
      }
    };
  },
  
};
</script>

<style>

</style>
