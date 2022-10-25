<template>

  <div>
    <div id="final-leave"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-s-flag"
         style="display: flex;align-items: center;justify-content: center;height: 100vh;background: #000000">
      <div style="font-weight: bold;font-size: 45px;position:absolute;color: #fafafa;display: flex;align-items: center">
        <div style="margin-right: 200px">
          Get rid of here.
        </div>
        <div style="width: 400px;display: flex">

          <div style="text-align: right;margin-right: 10px;width: 250px">
            <span style="font-family: 英文手写体;color: #f20c00">{{lastDayNum}}</span> <br>
            <span style="font-family: 英文手写体;color: #f20c00">{{lastHourNum}}</span> <br>
            <span style="font-family: 英文手写体;color: #f20c00">{{lastSecondNum}}</span> <br>
          </div>

          <div style="text-align: left;">
            <span>days</span> <br>
            <span>hours</span> <br>
            <span>seconds</span>
          </div>

        </div>
      </div>


      <div>
        <video id="final-video" class="final-videos" playsinline="" muted loop>
          <source src="https://ccurj.oss-cn-beijing.aliyuncs.com/final_video/final-video.mp4" type="video/mp4"/>
        </video>
      </div>
    </div>


    <div style="width: 80vw;background: yellow">


    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Final",
  data(){
    return{
      loading: false,
      lastDayNum:0,
      lastHourNum:0,
      lastSecondNum:0,
      nowMoment:moment("2022-11-22"),
      targetDate: moment("2022-11-22"),
      // videoList:['../assets/video/VID_20220825_184620.mp4'],
      videoIndex:0
    }
  },
  mounted() {
    this.init()
    setInterval(()=>{
      this.init()
    },1000)

    this.loading = true
    setTimeout(()=> {
      const videoDuration = this.getVideoDuration();
      const planDuration = this.getPlanDuration(videoDuration);
      this.startPlay(planDuration)
      setTimeout(()=>{
        this.loading = false
      },300)
    },1000)
  },
  methods:{
    getPlanDuration(videoDuration){
      console.log( "当前时间戳：" + this.nowMoment.unix())
      return (this.nowMoment.unix() - 5) % videoDuration
    },
    startPlay(num){
      //设置播放点，续播
      if (num && document.getElementById ('final-video')) {
        let myVideo = document.getElementById ('final-video');
        myVideo.play ();
        myVideo.currentTime = num;
      }
    },
    /**
     * 获取视频播放时长
     */
    getVideoDuration () {
      if (document.getElementById ('final-video')) {
        let videoPlayer = document.getElementById ('final-video');
        console.log(videoPlayer)
        return videoPlayer.duration
      }
    },
    init(){
      this.nowMoment = moment()

      this.lastDayNum = this.targetDate.diff(this.nowMoment,"day")
      this.lastHourNum = this.targetDate.diff(this.nowMoment,"hour")
      this.lastSecondNum = this.targetDate.diff(this.nowMoment,"second")
    },
  }
}
</script>

<style>

.final-videos{
  width: 100vw;
}
</style>