<template>
  <div>
    <img src="http://e.weiew.net/images/logo.png" style="position: absolute;left: 0;">
    <el-menu
      class="el-header-menu"
      mode="horizontal"
      background-color="#24292e"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="float: right">
      <el-menu-item @click="newProjectVisible = true" index="3">新建项目</el-menu-item>
      <el-submenu index="1">
        <template slot="title">账号</template>
        <el-menu-item index="4" @click="settingVisible = true">设置</el-menu-item>
        <el-menu-item index="5"><a href="/#/login" class="menuLink">退出</a></el-menu-item>
      </el-submenu>
    </el-menu>
    <!--新增项目 -->
    <el-dialog
      :modal-append-to-body='false'
      title="创建项目"
      :visible.sync="newProjectVisible"
      width="500px"
      :before-close="handleClose">
      <el-form :model="newProject" ref="newProject" :rules="newProjectRules"  label-width="80px">
        <el-row>
          <el-col>
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="newProject.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目归属">
              <el-select v-model="newProject.belong" style="width:100%;" placeholder="请选择项目归属">
                <el-option
                  v-for="item in newProject.projectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item><!--
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
            </el-form-item>-->
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newProjectVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewProject">新 增</el-button>
      </div>
    </el-dialog>



    <!--编辑用户信息 -->
    <el-dialog
      :modal-append-to-body='false'
      :visible.sync="settingVisible"
      width="600px">
      <el-tabs v-model="tabsWrapActive" @tab-click="handleClick" class="tabsWrap">
        <el-tab-pane label="个人信息" name="first">
          <el-form ref="userInfoForm" :model="userInfoForm" label-width="100px" class="userInfoForm">
            <el-form-item label="头像">
              <img src="http://e.weiew.net/images/userAAA.png" class="profilePic">
              <span class="profilePicEdit">修改头像</span>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="userInfoForm.userName" disabled="disabled" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址">
              <el-input v-model="userInfoForm.email" disabled="disabled" ></el-input>
            </el-form-item>
            <div class="lineTips">--- --- 修 改 密 码 --- ---</div>
            <el-form-item label="旧密码">
              <el-input v-model="userInfoForm.oldPwd" prefix-icon="el-icon-view" type="password" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="userInfoForm.newPwd" prefix-icon="el-icon-view" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码">
              <el-input v-model="userInfoForm.confirmPwd" prefix-icon="el-icon-view" type="password" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item align="right">
              <el-col>
                <el-button type="primary" @click="savePwd()" size="small" style="width: 120px">修改密码</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second"><p style="margin: 100px 0">配置功能开发中...</p></el-tab-pane>
      </el-tabs>


    </el-dialog>


  </div>
</template>

<script>
  import api from '../api/api';
export default {
  name: 'mainHead',
  data () {
    return {
      tabsWrapActive:"first",
      newProjectVisible:false,
      settingVisible:false,
      newProject:{
        name:"",
        belong:"0",
        projectOptions:[],
        memberOptions:[
          {label:"李仁",value:"liren"},
          {label:"李书明",value:"lishumin"},
          {label:"赵思林",value:"zhaosilin"},
        ],
        memberList:[]
      },
      newProjectRules: {
        name: [{required: true, message: '请输入项目名称', trigger: 'blur'}],
      },
      userInfoForm:{
        userName:"weiew",
        email:"weiew@weiew.com",
        oldPwd:"",
        newPwd:"",
        confirmPwd:"",
        verifyCode:"",
      }
    }
  },
  props:['refreshProject'],
  methods: {
    queryProject: function () {
      let postData = {
        ownerId: sessionStorage.getItem("account")
      }
      api.post('api/project/selection')(postData).then((data) => {
        if(data.code == "200"){
          this.newProject.projectOptions = data.dto;
        }else{
          console.log(data.error);
        }
      })
    },
    handleClick: function () {
    },
    handleClose: function () {
      this.newProjectVisible = false;
    },
    savePwd: function () {
    },
    addNewProject (){
      this.$refs.newProject.validate((valid) => {
        if(valid){
          let postData = {
            ownerId: sessionStorage.getItem("account"),
            name: this.newProject.name,
            parentId: this.newProject.belong,
            descript: ''
          }
          api.post('api/project/addProject')(postData).then((data) => {
            if(data.code == "200"){
              this.$message("添加成功");
              this.refreshProject();
              this.newProjectVisible = false;
            }else{
              this.$message({
                message: data.msg || '添加失败',
                type: 'error'
              });
            }
          })
        }
      })
    }
  },
  created (){
    this.queryProject();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-header {
    color: #fff;
    background: #24292e;
    box-shadow: 2px 2px 2px #ccc;
    z-index: 20;
  }
  .el-header-menu .el-menu--horizontal>.el-submenu .el-submenu__title{
/*    height: 30px !important;
    line-height: 30px !important;*/
  }
  .el-header-menu{
/*    height: 30px !important;*/
  }
  .el-header-menu .el-menu-item{
/*    height: 30px !important;
    line-height: 30px !important;*/
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
  .userInfoForm{
    width: 70%;
    margin-left: 46px;
  }
  .profilePic{
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    box-shadow: 1px 1px 2px #aaa;
    vertical-align: middle;
  }
  .profilePicEdit{
    display: inline-block;
    margin-left: 20px;
    background: #6e9bf1;
    color: #fff;
    line-height: 18px;
    padding: 2px 10px;
    border-radius: 3px;
    vertical-align: middle;
  }
  .lineTips{
    text-align: center;
    color: #aaa;
    margin-bottom: 10px;
    padding-left: 50px;
  }
</style>
