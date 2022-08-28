<template>
<div style="display: flex;align-items: center;justify-content: center">
  <div style="margin: 30px">
    <el-timeline style="text-align: left">
      <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp">
        <div v-if="activity.size === 'large'" style="font-size: 20px;font-weight: bold">
          {{activity.content}}
        </div>
        <div v-else>
          {{activity.content}}
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</div>
</template>

<script>
export default {
  name: "UpdateLog",
  data(){
    return{
      activities: [
        {
          content: '网站备案成功',
          timestamp: '2022/8/19 17：33',
          type: 'success', // primary / success / warning / danger / info
          icon: 'el-icon-check',
        },
        {
          content: '首页重大更新，更换背景纹理。添加知识-脉络、积累-收藏页面',
          timestamp: '2022/8/15 17：39',
          type: 'success', // primary / success / warning / danger / info
          icon: 'el-icon-check',
        },
        {
          content: '修改了登录逻辑，jwt + shiro整合方案。',
          timestamp: '2022/8/10 17：30',
          type: 'warning', // primary / success / warning / danger / info
          icon: 'el-icon-check',
        },
        {
          content: '添加登录后简历投递记录表',
          timestamp: '2022/8/10 0：23',
          type: 'success', // primary / success / warning / danger / info
          icon: 'el-icon-check',
        },
        {
          content: '升级首页第一页，替换了原有风格',
          timestamp: '2022/8/6 17：46',
          type: 'warning', // primary / success / warning / danger / info
          icon: 'el-icon-check',
        },
        {
          content: '项目展开 • 原型上线',
          timestamp: '2022/7/30 14：23',
          size: 'large',
          type: 'success', // primary / success / warning / danger / info
          icon: 'el-icon-check',
          color: '#0bbd87' // hsl / hsv / hex / rgb
        }
        // { // example
        //   content: '支持使用图标',
        //   timestamp: '2018-04-12 20:46',
        //   size: 'large',
        //   type: 'success', // primary / success / warning / danger / info
        //   icon: 'el-icon-more',
        //   color: 'hsl' // hsl / hsv / hex / rgb
        // }
      ]
    }
  }
}
</script>

<style scoped>

</style>