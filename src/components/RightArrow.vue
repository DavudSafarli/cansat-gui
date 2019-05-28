<template>
  <div class="right-arrow arrow">
  </div>
</template>

<script>
export default {
  name: 'DRightArrow'
}
</script>

<style lang="scss">
.right-arrow{
  right: 0;
  &::before, &::after{
    left: 0;
  }
  &::before{
    transform: rotate(-50deg) translateY(-2px)
  }
  &::after{
    transform: rotate(50deg) translateY(2px)
  }
  
}
</style>
