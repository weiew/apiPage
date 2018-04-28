<template>
  <div class="loginBg">
    <div class="login">
      <div class="title">
        <h3>登录</h3>
      </div>
      <el-form ref="loginForm" :model="loginForm" label-width="0" class="loginForm">
        <el-form-item label="">
          <el-input v-model="loginForm.id" prefix-icon="el-icon-message" placeholder="请输入用户名/邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="loginForm.pwd" prefix-icon="el-icon-view" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-col :span="6" class="forget">
            <a class="linkText" href="#/forget"><i class="el-icon-question"></i>忘记密码？</a>
          </el-col>
          <el-col :span="18">
            <el-button type="primary" @click="login()" size="small" style="width: 180px">登录</el-button>
            <a class="linkBtn" href="#/register">注册</a>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm:{
        id:"",
        pwd:""
      }
    }
  },
  methods:{
    login:function () {

    },
    register:function () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginBg{
  background: url(http://oiy6qbh9k.bkt.clouddn.com/apiPage/loginBg.jpg) no-repeat 100% 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  display: block;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.linkBtn{
  border-radius: 3px;
  padding: 9px 10px;
  background: #dedede;
  color: #2f363c;
  text-decoration: none;
  font-size: 12px;
}
.linkText{
  color: #525252;
  text-decoration: none;
  font-size: 12px;
}
.login{
  position: absolute;
  top: 30%;
  left: 50%;
  width: 450px;
  margin-left: -225px;
  background: #ffffff;
  opacity: 0.95;
}
.login .title{
  background: #242b31;
  height: 60px;
}
.loginForm{
  margin: 30px auto;
  width: 80%;
}
.login h3{
  color: #c9b89a;
  line-height: 60px;
  margin: 0;
  text-align: left;
  padding-left: 15px;
  font-weight: normal;
  font-size: 33px;
}
.forget{
  font-size: 12px;
  color: #5d6de2;
  text-align: left;
}
</style>
