<template>
<div>
<!--  上半部分  -->
  <div style="margin: 50px">
    <h1>2022年8- 简历投递情况表  </h1>
    <a href="https://docs.qq.com/sheet/DYXRkRGtmbGV5Z09Y?tab=BB08J2&u=2e60e6cebafb484eb433c60a4d0ac5d3"> 秋招资源💋 </a>
  </div>

<!--  表格部分-->
  <div style="width: 100%;">
    <div style="max-width: 1650px;margin: 0 auto">
      <div style="float: right">
        <el-button v-show="!addingComments" size="small" style="margin: 10px 0" @click="addingComments = !addingComments">上传简历</el-button>

        <div v-show="addingComments">
          <div style="width: 180px;display: inline-block">
            简历名:<el-input style="width: 100px" size="mini" v-model="commentsForm.title" placeholder="请输入内容"></el-input>
          </div>
          <div style="display: inline-block">
            链接:<el-input style="width: 100px" size="mini" v-model="commentsForm.link" placeholder="请输入内容"></el-input>
          </div>
          <el-button type="primary" size="mini" style="margin: 10px 0 10px 10px" @click="handleAddComment">提交</el-button>
        </div>
      </div>
      <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="tableData"
          :row-class-name="tableRowClassName"
          border
          style="width: 100%">
        <el-table-column
            label="序号"
            width="60">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column
            prop="company"
            label="公司"
            width="150">
        </el-table-column>
        <el-table-column
            prop="postSituation"
            label="投递情况"
            width="80">
          <template slot-scope="scope">
            {{scope.row.postSituation === 1?"未投递":scope.row.postSituation === 2?"已投递":"已放弃"}}
          </template>
        </el-table-column>
        <el-table-column
            prop="postDate"
            label="投递日期"
            width="80">
          <template slot-scope="scope">
            {{scope.row.postDate | timeFormat}}
          </template>
        </el-table-column>
        <el-table-column
            prop="positionApplied"
            label="投递岗位"
            width="150">
        </el-table-column>
        <el-table-column
            prop="status"
            label="🔻目前进展🔻"
            width="150">
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注信息"
            width="250">
        </el-table-column>
        <el-table-column
            prop="resume"
            label="📜投递简历"
            width="150">
          <template slot-scope="scope">
            <a v-if="scope.row.resume" :href="scope.row.resume.link">{{scope.row.resume.title}}</a>
          </template>
        </el-table-column>
        <el-table-column
            prop="priority"
            label="优先级"
            width="90">
          <template slot-scope="scope">
            {{scope.row.priority === 1?"一般":(scope.row.priority === 2?"❗重要":"‼️很重要")}}
          </template>
        </el-table-column>
        <el-table-column
            prop="jobData"
            label="面试资料"
            width="150">
          <template slot-scope="scope">
            <a v-if="scope.row.jobData" :href="scope.row.jobData">{{ scope.row.jobData.substring(0, 19) }}...</a>
          </template>
        </el-table-column>

        <el-table-column
            prop="companyAddress"
            label="公司地址"
            width="110">
          <template slot-scope="scope">
            <el-popover
                v-if="scope.row.companyAddress"
                placement="right-start"
                :title="'🔹' + scope.row.company"
                width="200"
                trigger="hover"
                :content="'💼' + scope.row.companyAddress">
              <span slot="reference">{{ scope.row.companyAddress.substring(0, 5) }}...</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
            prop="companyLink"
            label="网址">
          <template slot-scope="scope">
            <a v-if="scope.row.companyLink" :href="scope.row.companyLink">{{ scope.row.companyLink.substring(0, 30) }}...</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</div>
</template>

<script>
import {addResumes, getJobStatus, getResumes} from "@/api/bl-server";
import moment from "moment";

export default {
  name: "ResumeStatusView",
  data(){
    return{
      loading:true,
      addingComments:false,
      commentsForm:{
        title:"",
        link:""
      },
      tableData: [
        {
          id:1,
          company:"中科保泰",
          postSituation:"已投递",
          postDate: "22-8-6",
          positionApplied:"java后端实习生",
          status:"推掉offer",
          remark:"一面线上，二面介绍，就过了(外包)",
          resumeId:"",
          // resume:{
          //   id:"1",
          //   title:"后端开发 包龙",
          //   link:"https://ccurj.oss-cn-beijing.aliyuncs.com/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91%20%E5%8C%85%E9%BE%99.pdf"
          // },
          priority:"1",//1 一般 2 重要 3 很重要
          jobData:"无",
          companyLink:"www.baidu.com",
        }
      ],
      resumeList:[
        {id:"",title:"",link:""}
      ],
      resumeMap:null
    }
  },
  mounted() {
    getResumes().then((res)=>{
      this.resumeMap = new Map();
      res.data.rows.forEach(item => {
        this.resumeMap.set(item.id,item)
      })
      console.log(this.resumeMap)
    }).finally(()=>{
      getJobStatus().then(res =>{
        let arr = res.data.rows
        arr.forEach(item => {
          item.resume = this.resumeMap.get(item.resumeId)
        })

        this.tableData = arr;
      }).finally(()=>{
        this.loading = false
      })
    })

  },
  methods:{
    handleAddComment(){
      addResumes(this.commentsForm).then(res=>{
        // todo 添加成功
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (row.postSituation === 3){
        return 'abandon-row'
      }

      return ''
    }
  },
  filters:{
    timeFormat(time){
      return  moment(time).format("YY-MM-DD")
    }
  }
}
</script>

<style>
.el-table .abandon-row{
  background: #c0c4cc;
}
</style>