<template>
<div style="display: flex;width: 100vw;height: 100vh;justify-content: center;align-items: center;background: #fafafa">
  <div style="font-weight: bolder;font-size: 30px;padding: 30px;border: rgb(81 229 162) 2px solid;border-radius: 10px;background: white;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
    <div style="margin-bottom: 20px;display: flex;justify-content: start">
      <span>账号：</span>
      <el-input
          placeholder=""
          v-model="authForm.username"
          style="width: 200px;"
          clearable>
      </el-input>
    </div>

    <div style="margin-bottom: 20px;display: flex;justify-content: start">
      <span>密码：</span>
      <el-input
          placeholder=""
          v-model="authForm.password"
          style="width: 200px;"
          show-password
          clearable>
      </el-input>
    </div>

    <div >
      <el-button @click="login" type="primary" style="font-weight: bolder;font-size: 20px;width: 60%;height: 50px">登录</el-button>
    </div>
  </div>

</div>
</template>

<script>
import store from "@/store";

export default {
  name: "LoginView",
  data(){
    return{
      authForm:{
        username:"",
        password:""
      }
    }
  },
  methods:{
    login(){
      this.$store.dispatch('user/login',this.authForm).then(() => {
        store.dispatch('user/getInfo').then(()=>{
          this.$notify({
            title: `登录成功！[${this.$store.getters.name}]`,
            type: 'success',
            position: 'top-right'
          });
          this.$router.push({ path: this.redirect || '/' })
        })

      })
    }

  }
}
</script>

<style scoped>

</style>