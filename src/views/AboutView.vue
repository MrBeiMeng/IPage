<template>
  <div class="about">
    <div style="position:fixed;">
      <button style="cursor:pointer;" @click="handleClick()">测试哇</button>
    </div>
    <div style="width: 100vw;height: 100vh;background: #636471;opacity: 0.2;pointer-events: none">

    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },methods:{
    handleClick(){
      alert('我被点击')
    }
  }
}
</script>
