<template>
  <div class="graphs-container">
    <h1>FEDA</h1>
    <p>{{a}}</p>
  </div>
</template>

<script>
export default {
  name: 'DGrid',
  data() {
    return {
      a: 5,
    };
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
    width: 100%;
    height: 33vh;
  }
}
</style>
