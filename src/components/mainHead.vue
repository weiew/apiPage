<template>
  <div>

    <el-header>
      <el-menu
        class="el-header-menu"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item @click="newProjectVisible = true" index="3">新建项目</el-menu-item>
        <el-menu-item index="2">新建接口</el-menu-item>
        <el-submenu index="1">
          <template slot="title">账号</template>
          <el-menu-item index="4" @click="settingVisible = true">设置</el-menu-item>
          <el-menu-item index="5"><a href="/#/login" class="menuLink">退出</a></el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>

    <el-dialog
      title="创建项目"
      :visible.sync="newProjectVisible"
      width="500px"
      :before-close="handleClose">
      <el-form :model="newProject" label-width="70px">
        <el-row>
          <el-col>
            <el-form-item label="项目名称">
              <el-input v-model="newProject.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目归属">
              <el-select v-model="newProject.belong" style="width:100%;" placeholder="请选择项目归属">
                <el-option label="一级项目" value="levelA"></el-option>
                <el-option label="项目A001" value="project001"></el-option>
                <el-option label="项目A002" value="project002"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目成员">
              <el-select
                style="width:100%;"
                v-model="newProject.memberList"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择项目成员">
                <el-option
                  v-for="item in newProject.memberOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newProjectVisible = false">取 消</el-button>
        <el-button type="primary" @click="newProjectVisible = false">新 增</el-button>
      </div>
    </el-dialog>


    <el-dialog
      :visible.sync="settingVisible"
      width="600px">
      <el-tabs v-model="tabsWrapActive" @tab-click="handleClick" class="tabsWrap">
        <el-tab-pane label="个人信息" name="first">
          <el-form ref="userInfoForm" :model="userInfoForm" label-width="0" class="userInfoForm">
            <el-form-item label="">
              <el-input v-model="userInfoForm.id" prefix-icon="el-icon-star-off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="userInfoForm.email" prefix-icon="el-icon-message" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="userInfoForm.oldPwd" prefix-icon="el-icon-view" type="password" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="userInfoForm.newPwd" prefix-icon="el-icon-view" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="userInfoForm.confirmPwd" prefix-icon="el-icon-view" type="password" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item align="right">
              <el-col :span="6" class="forget">
                <a class="linkText" href="#/login"><i class="el-icon-question"></i>有账号了？</a>
              </el-col>
              <el-col :span="18">
                <el-button type="primary" @click="login()" size="small" style="width: 180px">注册</el-button>
                <a class="linkBtn" href="#/login">登录</a>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="账号密码" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>


    </el-dialog>




  </div>
</template>

<script>
export default {
  name: 'mainHead',
  data () {
    return {
      tabsWrapActive:"first",
      newProjectVisible:false,
      settingVisible:false,
      newProject:{
        name:"",
        belong:"levelA",
        memberOptions:[
          {label:"李仁",value:"liren"},
          {label:"李书明",value:"lishumin"},
          {label:"赵思林",value:"zhaosilin"},
        ],
        memberList:[]
      },
      userInfoForm:{
        id:"",
        email:"",
        oldPwd:"",
        newPwd:"",
        confirmPwd:"",
        verifyCode:"",
      }
    }
  },
  methods: {
    handleClose: function () {
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-header {
    color: #333;
    text-align: right;
    line-height: 30px;
    height: 30px !important;
    background: #545c64;
  }
  .el-header-menu .el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 30px !important;
    line-height: 30px !important;
  }
  .el-header-menu{
    height: 30px !important;
    float: right;
  }
  .el-header-menu .el-menu-item{
    height: 30px !important;
    line-height: 30px !important;
  }
  .el-header-menu{

  }
  .menuLink{
    text-decoration: none;
    color: #ccc;
    display: block;
  }
  .menuLink:hover{
    color: #fff;
  }
</style>
