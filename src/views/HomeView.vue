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

          <div style="color: black;font-family: 蒙黑体;font-size: 120px;display: flex;align-items: baseline;min-width: 960px;"> <!-- text-shadow: -7px 14px 20px #adadad; -->
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

    <div style="position:relative;width: 100vw;height: 100vh;background: #f3f6fd;display: flex;justify-content: center;align-items: center;overflow: hidden;flex-direction: column">
      <div style="margin: 20px 0;position:absolute;top: 60px;">
        <h1>积累 - 收藏</h1>
        <h3>Accumulation - Collections</h3>
      </div>
      <div style="width: 1280px;height: 500px;background: #42b983;border-radius: 10px;box-shadow: inset grey 3px 3px 16px 0 ,grey -2px -1px 16px 0 inset;;">
        <h1 style="margin: 20px 0;">热爱可抵岁月漫长🦜</h1>
        <div style="width: 1380px;position:relative;left: 50%; transform: translate(-50%);">
          <!-- 使用栅格系统 -->
          <el-row :gutter="50">
            <el-col :span="8">
              <div class="grid-content bg-wheat wow bounceInUp">
                <div style="font-weight: bold;font-size: 20px;padding: 20px 10px 2px 10px;color: #2c3e50">项目：projects</div>
                <span style="display:inline-block;width: 15px;height: 4px;background: #ffa644"></span>
                <!-- 元素列表 -->
                <div>
                  <el-popover
                      placement="right"
                      width="400"
                      trigger="hover">
                    <div>
                      <el-descriptions title="JES邮件服务" :column="1">
                        <el-descriptions-item label="项目描述">一个类似 短信服务 的邮件系统，主要功能是进行 邮件发送 应用场景为 （发送邮件验证码、邮件通知）、用户管理（用户
                          发件量限制）、邮件过滤、账号配置等。其优势相比于普通的springboot整合邮箱，实现了不同平台邮箱配置，也可以对用
                          户发送的邮件进行过滤与控制。系统复杂点在于账号任务分配、最佳线程数量以及发件速度。</el-descriptions-item>
                        <el-descriptions-item label="代码地址"><a
                            href="https://gitee.com/beimengclub/java-email-server">gitee</a> </el-descriptions-item>
                        <el-descriptions-item label="演示网址">暂无</el-descriptions-item>
                        <el-descriptions-item label="技术栈" class="tag-group">
                          <el-tag size="small" >springboot</el-tag>
                          <el-tag size="small">mybatis-plus</el-tag>
                          <el-tag style="margin-right: 3px" size="small">email</el-tag>
                          <el-tag style="margin-right: 3px" size="small">jsp</el-tag>
                          <el-tag style="margin-right: 3px" size="small">logback</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="备注">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
                      </el-descriptions>
                    </div>
                    <!-- 单个元素 -->
                    <div slot="reference">
                      <!-- 内容列表 -->
                      <div style="text-align: left;padding: 10px 20px">
                        <!-- 第一行 -->
                        <div >
                          <span style="font-size: 17px;font-weight: bold">JES邮件服务</span>
                          <span style="position:relative;float: right">22-8 至 22-12</span>
                        </div>
                        <div style="text-align:left;font-size: 14px;font-weight: bolder;padding:10px 15px 0 15px;color: gray">
                          <span style="margin-right: 30px">&lt;/&gt; Java,sql</span>
                          <!--                        <span style="display: inline-block;position:absolute;right: 0;transform: translate(-50%)">邮件式"短信服务"</span>-->
                          <span style="position:absolute;left: 188px">描述： 邮件式"短信服务"</span>
                        </div>
                      </div>
                      <div style="width: 60%;height: 2px;background: rgba(128,128,128,0.45);margin: 0 auto;"></div>
                    </div>
                  </el-popover>


                  <!-- 单个元素 -->
                  <div>
                    <!-- 内容列表 -->
                    <div style="text-align: left;padding: 10px 20px">
                      <!-- 第一行 -->
                      <div >
                        <span style="font-size: 17px;font-weight: bold">吉林省志愿服务平台</span>
                        <span style="position:relative;float: right">22-8 至 22-12</span>
                      </div>
                      <div style="text-align:left;font-size: 14px;font-weight: bolder;padding:10px 15px 0 15px;color: gray">
                        <span style="margin-right: 30px">&lt;/&gt; Java,sql,Js</span>
                        <!--                        <span style="display: inline-block;position:absolute;right: 0;transform: translate(-50%)">邮件式"短信服务"</span>-->
                        <span style="position:absolute;left: 188px">描述： 邮件式"短信服务"</span>
                      </div>
                    </div>
                    <div style="width: 100%;height: 2px;background: rgba(128,128,128,0.45);margin: 0 auto;transition:width 2s"></div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-wheat">
                <div style="font-weight: bold;font-size: 20px;padding: 20px 10px 2px 10px">笔记：notebooks</div>
                <span style="display:inline-block;width: 15px;height: 4px;background: #ffa644"></span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-wheat">
                <div style="font-weight: bold;font-size: 20px;padding: 20px 10px 2px 10px">小工具：other</div>
                <span style="display:inline-block;width: 15px;height: 4px;background: #ffa644"></span>
              </div>
            </el-col>
          </el-row>

        </div>
      </div>

      <div style="margin: 20px 0;position:absolute;bottom: 30px;width: 60vw">
        <div style="height: 13px;background: rgb(102 102 102 / 22%);border-radius: 10px;">
          <div style="height: 13px;background: #7d42b8;border-radius: 10px;width: 60%;margin: 0 auto">
          </div>
        </div>

      </div>
    </div>
    <div style="position:relative;width: 100vw;height: 100vh;background: #f3f6fd;display: flex;justify-content: center;align-items: center;overflow: hidden;flex-direction: column">
      <div style="margin: 20px 0;position:absolute;top: 60px;">
        <h1>知识 - 脉络</h1>
        <h3>Knowledge - venation</h3>
      </div>

      <!-- 侧边连 -->
      <div style="position:absolute;left: 0;top: 50%">
        <div>
          <el-button @click="venationDrawer = !venationDrawer">换</el-button>
        </div>

        <el-drawer
            title="知识分类清单"
            :visible.sync="venationDrawer"
            direction="ltr"
            >
          <el-collapse v-model="venationDrawer_ActiveName">
            <el-collapse-item name="1">
              <template slot="title">
                <h2 style="width: 100%;text-align: left;padding-left: 60px">JAVA分类<i class="header-icon el-icon-info"></i></h2>
              </template>
              <div style="font-size: 18px;font-weight: bold;width: 100%">
                <!-- 内层 -->
                <div style="margin: 0 auto;text-align: left;max-width: 375px;cursor: pointer">
                  <div>
                    <span>1. </span><span>JVM 概览图</span>
                  </div>

                  <div>
                    <span>2. </span><span>String 概览图</span>
                  </div>
                </div>
              </div>
            </el-collapse-item>

            <el-collapse-item name="2">
              <h2 style="text-align: center;width: 100%">操作系统<i class="header-icon el-icon-info"></i></h2>
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>

            <el-collapse-item name="3">
              <template slot="title">
                <h2 style="width: 100%;text-align: left;padding-left: 60px">计算机网络<i class="header-icon el-icon-info"></i></h2>
              </template>
              <div style="font-size: 18px;font-weight: bold;width: 100%">
                <!-- 内层 -->
                <div style="margin: 0 auto;text-align: left;max-width: 375px;cursor: pointer">
                  <div style="color: #42b983">
                    <span>1. </span><span>Ajax 技术</span><span style="color: #42b983;font-weight: bolder;padding-left: 30px"><<<</span>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-drawer>

      </div>

      <div>
        <img src="../assets/AJAXx.jpg" style="" alt="">
      </div>
<!--      <div style="width: 80vw;">-->
<!--        <el-carousel :interval="5000" arrow="always" height="600px" indicator-position="outside">-->
<!--          <el-carousel-item >-->
<!--            <div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center">-->
<!--              <img src="../assets/AJAXx.jpg" style="" alt="">-->
<!--            </div>-->
<!--          </el-carousel-item>-->
<!--          <el-carousel-item >-->
<!--            <div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center">-->
<!--              <img src="../assets/AJAXx.jpg" style="" alt="">-->
<!--            </div>-->
<!--          </el-carousel-item>-->
<!--        </el-carousel>-->
<!--      </div>-->
    </div>

    <div style="position:relative;width: 100vw;background: #666666;display: flex;justify-content: center;align-items: center;overflow: hidden;flex-direction: column">
      <div style="width: 1280px;color: #fafafa;padding: 30px">
        <el-row :gutter="20">
          <el-col :span="6">
            <h1>坐而言不如起而行</h1>
          </el-col>
          <el-col :span="18">
            <div style="width: 273px;text-align: left;margin: 0 auto">
              <div>
                <div style="width: 100px;text-align: right;display: inline-block">
                  电话 <i class="el-icon-phone-outline"></i>：
                </div>
                <div style="display: inline-block">
                  <el-popover
                      placement="top-start"
                      title="扫码添加我的电话"
                      width="150"
                      trigger="hover"
                  >
                    <div>
                      <img src="../assets/包龙个人名片.png" alt="">
                    </div>
                    <div slot="reference" style="text-decoration: underline;">
                      18547538016
                    </div>
                  </el-popover>
                </div>
              </div>
              <div>
                <div style="width: 100px;text-align: right;display: inline-block">
                  位置 <i class="el-icon-location-information"></i>：
                </div>
                <div style="display: inline-block">
                  深圳市
                </div>
              </div>
              <div>
                <div style="width: 100px;text-align: right;display: inline-block">
                  邮箱 <i class="el-icon-message"></i>：
                </div>
                <div style="display: inline-block">
                  <el-tooltip content="点击给我发送EMAIL" placement="right" effect="light">
                    <a href="mailto:baolong@baolong.email" style="color: #fafafa">baolong@baolong.email</a>
                  </el-tooltip>
                </div>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 回到顶部 -->
    <el-backtop  :bottom="100">
      <div
          style="{
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        <img src="../assets/火箭.png" alt="">
      </div>
    </el-backtop>
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
      venationDrawer:false,// 脉络抽屉展示
      venationDrawer_ActiveName:['1','2','3','4'],

      commentsDisplay:true,
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
          setTimeout(()=>{
            anime({
              targets: '#comments',
              duration: 600,
              opacity:1,
              translateY: '0',
              easing: 'linear'
            });
            this.contentIndex = (this.contentIndex+1)%this.content.length
          },600)
          anime({
            targets: '#comments',
            duration: 400,
            opacity:0,
            translateY: '50%',
            easing: 'linear'
          });
        }
      }
      // if (this.content.length !== 0){
      //   if (this.commentsDisplay){
      //     anime({
      //       targets: '#comments',
      //       duration: 400,
      //       opacity:0,
      //       translateY: '50%',
      //       easing: 'linear'
      //     });
      //   }else{
      //     this.contentIndex = (this.contentIndex+1)%this.content.length
      //     anime({
      //       targets: '#comments',
      //       duration: 600,
      //       opacity:1,
      //       translateY: '0',
      //       easing: 'linear'
      //     });
      //   }
      //
      //   this.commentsDisplay = !this.commentsDisplay
      // }
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
  background-image: linear-gradient(to top, #f3f6fd,#f3f6fd00, rgba(255, 255, 255, 0)), url("../assets/纹理素材/diagonal-striped-brick.png");
  /*background-image: linear-gradient(to top, #f3f6fd,#f3f6fd00, rgba(255, 255, 255, 0)), url("../assets/纹理素材/food.png");*/
  /*background-image: linear-gradient(to top, #f3f6fd,#f3f6fd00, rgba(255, 255, 255, 0)), url("../assets/纹理素材/always-grey.png");*/
  /*background-image: linear-gradient(to top, #f3f6fd,#f3f6fd00, rgba(255, 255, 255, 0)), url("../assets/纹理素材/cartographer.png");*/
  /*background-image: linear-gradient(to top, #f3f6fd,#f3f6fd00, rgba(255, 255, 255, 0)), url("../assets/纹理素材/cubes.png");*/
  /*background-image: linear-gradient(to top, #f3f6fd,#f3f6fd00, rgba(255, 255, 255, 0)), url("../assets/纹理素材/triangles.png");*/
  /*background-image: linear-gradient(to top, #f3f6fd,#f3f6fd00, rgba(255, 255, 255, 0)), url("../assets/纹理素材/white-tiles.png");*/
  /*background-image: linear-gradient(to top, #f3f6fd,#f3f6fd00, rgba(255, 255, 255, 0)), url("../assets/纹理素材/shattered (1).png");*/
  background-repeat: repeat;
  /*background-size: 40px;*/
}


.bg-purple {
  background: #c965ec;
}

.bg-wheat {
  background: #fafafa;

}
.grid-content {
  border-radius: 10px;
  min-height: 500px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  color: #2c3e50;
}


</style>