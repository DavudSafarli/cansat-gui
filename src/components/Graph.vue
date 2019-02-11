<template>
  <div class="graphs-container">
    <div class="canvas-wrap">
      <canvas ref="graph1" id="myChart"></canvas>
    </div>
    <div class="canvas-wrap">
      <canvas ref="graph2" id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DGraph',
  mounted() {
    this.init();
  },
  data() {
    return {
      altitude: {
        data: [10, 9, 8.5, 8.0, 5, 4, 1, 0.5, 0],
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },
      speed: {
        data: [10, 9, 8.5, 8.0, 5, 4, 1, 0.5, 0],
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },
      c: 0,
    };
  },
  methods: {
    addPoint() {
      this.labels.push(`Item ${this.c = this.c + 1}`);
      this.data.push(30 - (Math.random() + 0.2) - this.c);
      myLineChart.update({
        duration: 100,
        easing: 'easeInQuad',
      });
    },
    init() {
      const el1 = this.$refs.graph1.getContext('2d');
      const chart1 = new Chart(el1, {
        type: 'line',
        data: {
          labels: this.altitude.labels,
          datasets: [
            {
              label: 'Measure 1',
              data: this.altitude.data,
              backgroundColor: 'rgba(255,255,255,0)',
            },
          ],
        },
        options: {
          // responsive: false,
          maintainAspectRatio: false,
          aspectRatio: innerWidth / (innerHeight / 3),
          elements: {
            line: {
              tension: 0.15,
            },
          },
          title: {
            display: true,
            text: 'Altitude',
            fontSize: '20'
          },
          legend: {
            display: false,
          }
        },
      });

      const el2 = this.$refs.graph2.getContext('2d');
      const chart2 = new Chart(el2, {
        type: 'line',
        data: {
          labels: this.speed.labels,
          datasets: [
            {
              label: 'Measure 1',
              data: this.speed.data,
              backgroundColor: 'rgba(255,255,255,0)',
            },
          ],
        },
        options: {
          // responsive: false,
          maintainAspectRatio: false,
          aspectRatio: innerWidth / (innerHeight / 3),
          elements: {
            line: {
              tension: 0.15,
            },
          },
          title: {
            display: true,
            text: 'Speed',
            fontSize: '20'
          },
          legend: {
            display: false,
          }
        },
      });

    }
  },
}
</script>

<style lang="scss">
.graphs-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around; 
  .canvas-wrap{
    width: 100%;
    height: 33vh;
  }
}
</style>
