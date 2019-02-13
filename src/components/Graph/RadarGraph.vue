<template>
  <canvas ref="graph3"></canvas>
</template>

<script>
export default {
  name: 'DRadarGraph',
  mounted() {
		const el1 = this.$refs.graph3.getContext('2d');
		const chart1 = new Chart(el1, this.chart);
  },
  data() {
    return {
      chart: {
        type: 'scatter',
        data: {
          datasets: [
            {
              data: [{x: 0.45, y: 0.2},{x: -0.2, y: -0.2},{x: 0.3, y: -0.3}],
              pointBackgroundColor: [/*'rgba(0,0,0,0.1)',*/'#00abab'],
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
                min: -0.5,
                max: 0.5
              },
              gridLines: {
                // color: '#888',
                // drawOnChartArea: false,
              }
            }],
            yAxes: [{
              ticks: {
                min: -1,
                max: 1,
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
