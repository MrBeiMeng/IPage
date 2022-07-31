<template>
  <div id="homeViewId">

    <div style="z-index:-1;position:absolute;top:0;background: #222331;width: 100vw;height: 100vh;display: flex;justify-content: center;align-items: center;">
      <!-- 图片遮罩      -->
      <img src="../assets/深圳夜景4k壁纸_彼岸图网.jpg" alt="asd" style="position:absolute;width: 100%;opacity:0.23;animation: light 5s;z-index: -2;pointer-events: none">

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

    <div style="width: 100vw;height: 100vh;pointer-events: none">
      <!--      <div style="pointer-events: none">测试文字</div>-->
    </div>


    <div style="width: 100vw;height: 100vh;background: #fafafa">
      HELLO WORLD!
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: 'homeView',
  data(){
    return{
      arriveMoment:moment("2022/7/26 23:20", "YYYY/MM/DD hh:mm"),
      nowMoment:null,
      dayPassed:0,
      opacityNum:0
    }
  },
  mounted() {
    this.init();
    setInterval(()=>{
      this.init();
      console.log("A second passed ...")
    },1000)
  },
  methods:{
    init(){
      this.nowMoment = moment();
      this.dayPassed = this.toChineseBig(this.nowMoment.diff(this.arriveMoment,"days"))
    },
    toChineseBig(num) {
      // 将接收到的num转换为字符串
      let strNum = String(num)
      // 定义单位
      // let unit = ['拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟']
      let unit = ['十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千']
      // 结果中放一个符号，用来解决最后的零去不掉的问题
      let result = ['@']
      // 单位下标
      let unitNo = 0
      // 从后往前遍历接收到的数据，省略结束条件
      for (let i = strNum.length - 1;; i--) {
        // 调用转大写函数，将每一个数字转换成中文大写，一次放入一个到结果数组中
        result.unshift(numToChinese(strNum[i]))
        // 如果不大于0
        if (i <= 0) {
          // 结束循环
          break
        }
        // 放入一个数字，放入一个单位
        result.unshift(unit[unitNo])
        // 单位下标加1
        unitNo++
      }
      // 将结果数组转换成字符串，并使用正则替换一些关键位置，让结果符合语法
      // return result.join('').replace(/(零[仟佰拾]){1,3}/g, '零').replace(/零{2,}/g, '零').replace(/零([万亿])/g, '$1').replace(/亿万/g, '亿').replace(/零*@/g, '')
      return result.join('').replace(/(零[千百十]){1,3}/g, '零').replace(/零{2,}/g, '零').replace(/零([万亿])/g, '$1').replace(/亿万/g, '亿').replace(/零*@/g, '')

      function numToChinese(n) {
        // let chineseBigNum = '零壹贰叁肆伍陆柒捌玖'
        let chineseBigNum = '零一二三四五六七八九'
        return chineseBigNum[n]
      }
    },
    handleDownload(){
      window.location.href="https://ccurj.oss-cn-beijing.aliyuncs.com/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91%20%E5%8C%85%E9%BE%99.pdf"
    }
  },

}
</script>
<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}

@keyframes light {
  from{opacity:0}
  to{opacity:0.23}
}
</style>