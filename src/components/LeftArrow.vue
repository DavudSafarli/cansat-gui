<template>
  <div class="left-arrow arrow">
  </div>
</template>

<script>
export default {
  name: 'DLeftArrow'
}
</script>

<style lang="scss">
.arrow{
  width: 40px;
  height: 60px;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  &::before, &::after{
    transition: 0.2s all;
    top: 50%;
    position: absolute;
    content: '';
    display: block;
    width: 30px;
    height: 2px;
    background: rgba(110, 110, 110, 0.3);
    transform-origin: 100% 50%;
  }
  @media screen and (max-width: 800px){
    width: 30px;
    &::before, &::after{
      width: 20px;
    }
  }
}

.left-arrow{
  left: 0;
  &::before, &::after{
    left: -50%;
  }
  &::before{
    transform: rotate(130deg) translateY(-2px)
  }
  &::after{
    transform: rotate(-130deg) translateY(2px)
  }
  
}
</style>
