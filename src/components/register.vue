<template>
  <div class="registBg">
    <div class="regist">
      <div class="title">
        <h3>注册</h3>
      </div>
      <el-form ref="registForm" :model="registForm" status-icon :rules="registRules" label-width="0" class="registForm">
        <el-form-item label="" prop="account">
          <el-input v-model="registForm.account" prefix-icon="el-icon-star-off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="email">
          <el-input v-model="registForm.email" prefix-icon="el-icon-message" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="registForm.password" prefix-icon="el-icon-view" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="" prop="confirmPwd">
          <el-input v-model="registForm.confirmPwd" prefix-icon="el-icon-view" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-col :span="6" class="forget">
            <a class="linkText" href="#/login"><i class="el-icon-question"></i>有账号了？</a>
          </el-col>
          <el-col :span="18">
            <el-button type="primary" @click="register()" size="small" style="width: 180px">注册</el-button>
            <a class="linkBtn" href="#/login">登录</a>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '../api/api';
export default {
  data () {
    let checkConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    };
    return {
      registForm: {
        account: '',
        email: '',
        password: '',
        confirmPwd: '',
        verifyCode: ''
      },
      registRules: {
        account: [
          {required: true, message: '请输入用户名', trigger: ['blur', 'change']},
          {validator: this.VTools.checkAccount, messageText: '用户名'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {validator: this.VTools.checkEmail, messageText: '邮箱地址'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: this.VTools.checkPassword, messageText: '登录密码'}
        ],
        confirmPwd: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: checkConfirmPwd, messageText: '再次确认密码'}
        ]
      }
    }
  },
  methods: {
    register: function () {
      var _this = this;
      this.$refs.registForm.validate((valid) => {
        if (valid) {
          let postData = {
            account: this.registForm.account,
            email: this.registForm.email,
            password: this.registForm.password
          }
          api.post('api/user/register')(postData).then((data) => {
            if(data.code == '200'){
              this.$confirm('注册成功，已发送到验证信息到注册邮箱！', '提示', {
                confirmButtonText: '确定',
                type: 'success',
                showCancelButton: false,
                center: true
              }).then(() => {
                _this.$router.push({path: '/login'});
              });
            }else{
              this.$message({
                message: data.msg || '注册失败',
                type: 'error'
              });
            }
          })
        }else{
          console.log('录入内容格式错误')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .registBg{
    background: url(http://oiy6qbh9k.bkt.clouddn.com/apiPage/register.jpg) no-repeat 100% 100%;
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
  .regist{
    position: absolute;
    top: 25%;
    left: 50%;
    width: 450px;
    margin-left: -225px;
    background: #ffffff;
    opacity: 0.95;
  }
  .regist .title{
    background: #242b31;
    height: 60px;
  }
  .registForm{
    margin: 30px auto;
    width: 80%;
  }
  .regist h3{
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
