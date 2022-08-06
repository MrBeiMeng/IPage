<template>
  <div style="position:relative;top:0;width: 100vw;height: 100vh;display: flex;justify-content: center;align-items: center;overflow: hidden;flex-shrink:0">
    <!-- 图片遮罩      -->
    <div style="position:absolute;width: 100%;height: 100%;z-index: -1;pointer-events: none;background: #222331;opacity:80%;animation: light 5s;"/>

    <div style="color: white;font-family: 蒙黑体;font-size: 52px;display: flex;align-items: baseline;text-shadow:black -2px 6px 6px;">
      <div style="display: inline-block">
        <div>
          <span style="cursor: pointer">🪧</span><span>深圳之行</span>
        </div>
        <div style="font-size: 10px;color: #636471">
          Trip to Shenzhen
        </div>
      </div>
      <div style="display: inline-block">
        <span style="border-bottom: #fbb427 3px solid;padding-bottom: 5px">第{{ dayPassed }}天</span>。
      </div>
    </div>

    <div style="position:absolute;bottom: 20px;left: 20px;font-size: 20px;color: #636471;font-family: 蒙黑体">
      Arrive at 2022/7/26 23:20
    </div>

    <div style="position:absolute;right: 20px;bottom: 20px;">
      <!--      <button style="font-size: 20px;color: #636471;font-family: 蒙黑体;padding: 0 10px;margin-right: 20px;cursor:pointer;" @click="handleDownload">-->
      <!--        😋 我的github-->
      <!--      </button>-->

      <button style="font-size: 20px;color: #636471;font-family: 蒙黑体;padding: 0 10px 0 6px;cursor:pointer;" @click="handleDownload">
        😋 我的简历
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShenZhenTrip"
}
</script>

<style scoped>

</style>