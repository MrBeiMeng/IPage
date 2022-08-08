<template>
<div style="width: 100%;height: 100%;position:fixed;background:#fafafa;display: flex;align-items: center;justify-content: center">
  <div style="width: 80vw;height: 200px;">
    <div v-for="item in 10" :id="'target' + item" :key="item" style="border-radius: 50%;position:absolute;width: 30px;height: 30px;background: #42b983;margin-top: 70px;margin-left: 30px">
    </div>
  </div>
</div>
</template>

<script>
import anime from "animejs";

export default {
  name: "Loading",
  mounted() {
    for (let i = 1; i <= 10; i++) {
      anime({
        targets: '#target' + i,
        keyframes: [
          {translateX: 0,width:30,height:30},
          // {translateX: 240,width:100,height:100},
          {translateX: '74vw',width:30,height:30,rotate: '1turn',},
        ],
        backgroundColor: '#42b983',
        direction:'alternate',
        loop:true,
        delay:i*100,
        duration:4000,
        // easing: 'easeInOutElastic(1, .6)'
        // easing: 'easeInOutExpo'
        // easing: 'easeOutInElastic(1, .6)'
        easing: 'cubicBezier(.5, .05, .1, .3)'
        // easing: 'linear'
      });
    }
  }
}
</script>

<style scoped>

</style>