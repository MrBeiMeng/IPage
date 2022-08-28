<template>
  <div >

    <div style="margin: 100px">
      <h1>项目目前进展</h1>
    </div>

    <div style="display: flex;align-items: center;justify-content: center">
      <div style="position:relative;width: 1679px">
        <el-steps :active="0" finish-status="success" simple style="margin-top: 20px">
          <el-step title="项目启动阶段" ></el-step>
          <el-step title="需求阶段" ></el-step>
          <el-step title="设计阶段" ></el-step>
          <el-step title="开发阶段" ></el-step>
          <el-step title="测试阶段" ></el-step>
          <el-step title="上线" ></el-step>
          <el-step title="维护阶段" ></el-step>
        </el-steps>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "GoA"
}
</script>

<style scoped>

</style>