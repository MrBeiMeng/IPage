<template>
  <div id="homeViewId">

    <div style="height: 100vh;display: flex;flex-wrap: nowrap;align-items: center;flex-direction: row;overflow: scroll;background-color: #f3f6fd;" class="b-back-image">
      <div v-show="!loaded" style="position:relative;top:0;width: 100vw;height: 100vh;overflow: hidden;flex-shrink:0;">

        <!-- 左上角日期标志 -->
        <div style="position:absolute;top: 100px;left: 100px;font-size: 30px;color: #6e158f">
          <span>{{nowMoment.format("YYYY - M")}}</span>

        </div>

        <div style="position:absolute;top: 95px;right: 100px;">
          <nav style="position:relative;display: inline-block;font-size: 30px;padding: 0 30px 0 30px;bottom: 3px">
            <router-link v-show="!$store.getters.name" to="/login" style="position: relative; ">登录</router-link>
            <a v-show="$store.getters.name" @click="logout" style="position: relative;cursor: pointer">{{ $store.getters.name }}</a>
            <router-link v-show="showResumeStatus||$store.getters.name" to="/resumeStatus" style="position: relative;">简历投递</router-link>
            <a href="http://49.232.214.227:9527/swagger-ui/index.html" style="position: relative;">api管理</a>
          </nav>

          <!-- 右上角标志 -->
          <div style="display: inline-block">
            <div style="font-size: 30px;color: gray;cursor: pointer;border-radius: 10px;border: 2px gray solid;display: flex;align-items: center;height: 42px" @click="dayOrNight">
              <span style="font-size: 41px">☀</span><span>/🌙</span>
            </div>
          </div>

        </div>


        <div style="position:absolute;width: 100%;height: 100%;z-index: -1;pointer-events: none;background: #fafafa;"/>

        <div id="midContent" style="position:absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);user-select: none">

          <!--进度条-->
          <div style="width: 100%;background: rgb(223 223 225);height: 5px">
            <!-- 进度条内部分 -->
            <div :style="{width:(process + '%')}" style="transition: width 2s;background: #42b983;border-radius: 5px;height: 7px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);transform: translateY(-20%)">
            </div>
          </div>

          <div style="color: black;font-family: 蒙黑体;font-size: 120px;display: flex;align-items: baseline;min-width: 960px;text-shadow: -7px 14px 20px #adadad;">
            <div style="display: inline-block">
              <div>
                <span style="cursor: pointer;" @click="showComments" @dblclick.capture="changeCommentType">🪧</span><span>深圳之行</span>
              </div>
              <div @click="showResumeStatus = !showResumeStatus" style="font-size: 12px;color: rgb(155 155 155);">
                Trip to Shenzhen
              </div>
            </div>
            <div style="display: inline-block">
              <span style="border-bottom: #ffa644 10px solid;padding-bottom: 16px">第{{ dayPassed }}天</span>
            </div>
          </div>
        </div>

        <div style="position:absolute;bottom: 0;height: 100px;left: 50%;transform: translateX(-50%);margin-bottom: 120px">
          <div style="position:relative;">
            <div v-if="content.length !== 0" style="font-size: 21px;font-weight:bolder;color:#666666;line-height: 30px;position:relative;bottom:0;text-align: center;opacity:0;transform: translateY(100%)" id="comments">
              <span>{{ content[contentIndex].content }}</span><br>
              <span style="font-size: 16px;float: right">-- {{content[contentIndex].author}} <span v-if="content[contentIndex].fromBook">《{{ content[contentIndex].fromBook }}》</span> </span>
            </div>
          </div>
        </div>

        <div style="position:absolute;bottom: 20px;left: 20px;font-size: 20px;color: rgb(155 155 155);;font-family: 蒙黑体">
          Arrive at 2022/7/26 23:20 <span style="cursor:pointer;" @click="changeCommentType">{{commentsType.value === 1?"😋":"👿"}}</span>
        </div>

        <div style="position:absolute;right: 20px;bottom: 20px;">

          <button style="font-size: 20px;color: #636471;font-family: 蒙黑体;padding: 0 10px 0 6px;cursor:pointer;" @click="handleDownload">
            😋 我的简历
          </button>
        </div>
      </div>
      <div v-if="loaded" style="position:relative;top:0;width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center">
        <h1>正在巨力加载。</h1>
      </div>
    </div>

    <div style="width: 100vw;height: 100vh;background: #f3f6fd;">
      热爱可抵岁月漫长。🦜
    </div>


  </div>
</template>

<script>
import moment from "moment";
import anime from "animejs";
import {getComments} from "@/api/bl-server";

export default {
  name: 'homeView',
  data(){
    return{
      commentsDisplay:false,
      arriveMoment:moment("2022/7/26 23:20", "YYYY/MM/DD hh:mm"),
      nowMoment:null,
      dayPassed:0,
      process:0,
      content:[
        {content:"马有千里之程，无骑不能自往；人有冲天之志，非运不能自通。",fromBook:"破窑赋",author:""},
      ],
      contentIndex:0,
      loaded:true,
      showResumeStatus:false,
      commentsType:{
        value:1,
        name:""
      }
    }
  },
  mounted() {
    document.fonts.ready.then(()=> {
      // 字体加载完成后的逻辑
      this.loaded = false
    });
    this.init();
    setInterval(()=>{
      this.init();
      this.process = this.nowMoment.hour() / 24 * 100;
      console.log("A second passed ...")
    },1000)

    getComments(1).then(res=>{
      this.content = res.data.rows;
      setTimeout(()=>this.showComments(),500)
    })

  },
  methods:{
    logout(){
      this.$store.dispatch("user/logout")
    },
    dayOrNight(){
      alert("主题切换功能暂不支持。")
    },
    showComments(){
      if (this.content.length !== 0){
        if (this.commentsDisplay){
          anime({
            targets: '#comments',
            duration: 400,
            opacity:0,
            translateY: '50%',
            easing: 'linear'
          });
        }else{
          this.contentIndex = (this.contentIndex+1)%this.content.length
          anime({
            targets: '#comments',
            duration: 600,
            opacity:1,
            translateY: '0',
            easing: 'linear'
          });
        }

        this.commentsDisplay = !this.commentsDisplay
      }
    },
    changeCommentType(){
      if (this.commentsType.value === 1){
        this.commentsType = {value: 2,name:"消极的"}
        getComments(this.commentsType.value).then(res=>{
          this.content = res.data.rows;
          this.$notify({
            title: `👿Change to NEGATIVE![${this.content.length}]`,
            type: 'warning',
            position: 'top-right'
          });
        })
      }else {
        this.commentsType = {value: 1,name:"positive"}
        getComments(this.commentsType.value).then(res=>{
          this.content = res.data.rows;
          this.$notify({
            title: `🥰Change to POSITIVE![${this.content.length}]`,
            type: 'success',
            position: 'top-left'
          });
        })

      }
    },
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
      let answer = result.join('').replace(/(零[千百十]){1,3}/g, '零').replace(/零{2,}/g, '零').replace(/零([万亿])/g, '$1').replace(/亿万/g, '亿').replace(/零*@/g, '')

      if (answer.indexOf("一十") === 0){
        return answer.replace("一十","十");
      }else
        return answer;

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
  filters:{
    ten(val){
      if (val.indexOf("一十") === 0){
        return val.replace("一十","十");
      }
    }
  }

}
</script>
<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}

@keyframes light {
  from{opacity:1}
  to{opacity:0.80}
}

.b-back-image{
  background-image: linear-gradient(to top, #f3f6fd,#f3f6fd00, rgba(255, 255, 255, 0)), url("../assets/always-grey.png");
  background-repeat: repeat;
  background-size: 40px;
}
</style>