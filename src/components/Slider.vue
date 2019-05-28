<template>
  <div class="slider">
    <div class="holder">
      <img ref="main" class="main" src="https://via.placeholder.com/1000x600" alt="website image">
      <img @load="onload()" ref="loader" class="loader" aria-hidden="true">
    </div>
    <div @click="prev()" class="button left">
      <v-left-arrow></v-left-arrow>
    </div>
    <div @click="next()" class="button right">
      <v-right-arrow></v-right-arrow>
    </div>
  </div>
</template>

<script>
import LeftArrow from './LeftArrow.vue';
import RightArrow from './RightArrow.vue';

export default {
  name: 'DSlider',
  components: {
    'VLeftArrow': LeftArrow,
    'VRightArrow': RightArrow,
  },
  props:['srcs'],
  mounted() {
    this.$refs.loader.addEventListener('animationend', () => {
      this.$refs['main'].src       = this.srcs[this.c];
      this.$refs.loader.classList.remove(this.animation, 'noanimation')
      this.lock = false;
      this.animation = 'noanimation';
    })
    this.$refs['main'].src       = this.srcs[this.c];
  },
  data() {
    return{
      lock: false,
      c: 0,
      animation: 'leftIn',
      src_array_name: 'srcs'
    };
  },
  methods: {
    onload() {
      if(!this.lock) return;
      this.$refs.loader.classList.add(this.animation);
    },
    next() {
      console.log('next')
      if(this.lock) return;

      this.lock = true;

      this.c++;
      if(this.c == this.srcs.length)
        this.c = 0;

      this.animation = 'leftIn'
      
      this.setImage();
    },
    prev() {
      console.log('prev')
      if(this.lock) return;

      this.lock = true;

      if(this.c == 0)
        this.c = this.srcs.length
      this.c--;

      this.animation = 'rightIn'
      this.setImage();
    },
    setImage() {
      console.log('setImage')
      this.$refs['loader'].src       = this.srcs[this.c];
    }
  }
}
</script>

<style lang="scss">
.slider{
  height: 100%;
  position: relative;
  .button{
    cursor: pointer;
    height: 100%;
    width: 30%;
    position: absolute;
    top: 0;
    &:hover{
      .arrow{
        &::before, &::after{
          background: rgba(110, 110, 110, 0.7);
        }
      }
      .left-arrow{
        &::before{
          transform: rotate(115deg) translateY(-2px)
        }
        &::after{
          transform: rotate(-115deg) translateY(2px)
        }
      }
      .right-arrow{
        &::before{
          transform: rotate(-65deg) translateY(-2px)
        }
        &::after{
          transform: rotate(65deg) translateY(2px)
        }
      }
    }
    &.left{
      background: linear-gradient(90deg, rgba(0, 0, 0, 0.4), rgba(0,0,0,0));
      left: 0;
      transition: 0.2s ease-in all;
      opacity: 0.4;
      &:hover{
        opacity: 0.8;
      }
    }
    &.right{
      background: linear-gradient(270deg, rgba(0, 0, 0, 0.4), rgba(0,0,0,0));
      right: 0;
      transition: 0.2s ease-in all;
      opacity: 0.4;
      &:hover{
        opacity: 0.8;
      }
    }
  }
}
.holder{
  overflow: hidden;
  position: relative;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
  }
  .loader{
    left: 100%;
    &.leftIn{
      animation: leftIn 0.4s ease-out;
    }
    &.rightIn{  
      animation: rightIn 0.4s ease-out;
    }
    @keyframes leftIn{
      from{
        left: 100%;
      }to{
        left: 0;
      }
    }
    @keyframes rightIn{
      from{
        left: -100%;
      }to{
        left: 0;
      }
    }
  }
}


.fade-enter-active, .fade-leave-active {
 transition: 0.8s all;
 opacity: 1;
}
.fade-enter, .fade-leave-to {
 opacity: 0;
}
</style>
