<template>
	<canvas ref="graph1"></canvas>
</template>

<script>
export default {
	props: ['title', 'graph', 'max'],
	name: 'DLineGraph',
	data() {
		return {
			chart: {
				type: 'line',
				data: {
					labels: this.graph.labels,
					datasets: [
						{
							data: this.graph.data,
							backgroundColor: 'rgba(215,215,215,0.5)',
							pointBackgroundColor: 'rgb(0, 200, 150, 0.6)',
						}
					]
				},
				options: {
					maintainAspectRatio: false,
					scales: {
						yAxes: [
							{
								ticks: {
									max: this.max,
									beginAtZero: true,
									padding: 5,
								}
							},
						],
					},
					elements: {
						line: {
							tension: 0.15,
							borderWidth: 1
						},
						point: {
							radius: 2,
							borderColor: 'transparent',
							// backgroundColor: ,
						}
					},
					title: {
						display: true,
						text: this.title,
						fontSize: '20',
					},
					legend:  false,	
				},
			},
		};
	},
	mounted() {
		const el1 = this.$refs.graph1.getContext('2d');
		const chart = new Chart(el1, this.chart);
		// this.$store.commit('SET_ALTITUDE_CHART_ELEMENTS', chart);
		if(window.arr == undefined){
			window.arr = [];
		}
		arr.push(chart);

	},
};
</script>

<style>

</style>
