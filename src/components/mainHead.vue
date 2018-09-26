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
        <el-menu-item @click="newApiVisible = true" index="2">新建接口</el-menu-item>
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
      title="新增接口"
      :visible.sync="newApiVisible"
      width="500px"
      :before-close="closeNewApi">
      <el-form :model="newApi" label-width="70px">
        <el-row>
          <el-col>
            <el-form-item label="接口名称">
              <el-input v-model="newApi.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="接口地址">
              <el-input v-model="newApi.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="归属项目">
              <el-cascader
                style="width:100%;"
                :options="newApi.projectOptions"
                change-on-select="true"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="项目成员">
              <el-select
                style="width:100%;"
                v-model="newApi.memberList"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择项目成员">
                <el-option
                  v-for="item in newApi.memberOptions"
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
        <el-button @click="newApiVisible = false">取 消</el-button>
        <el-button type="primary" @click="newApiVisible = false">新 增</el-button>
      </div>
    </el-dialog>



    <el-dialog
      :visible.sync="settingVisible"
      width="600px">
      <el-tabs v-model="tabsWrapActive" @tab-click="handleClick" class="tabsWrap">
        <el-tab-pane label="个人信息" name="first">
          <el-form ref="userInfoForm" :model="userInfoForm" label-width="100px" class="userInfoForm">
            <el-form-item label="头像">
              <img :src="userInfoForm.profilePic" class="profilePic">
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
export default {
  name: 'mainHead',
  data () {
    return {
      tabsWrapActive:"first",
      newProjectVisible:false,
      newApiVisible:false,
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
      newApi:{
        name:"",
        address:"",
        belong:"levelA",
        memberOptions:[
          {label:"李仁",value:"liren"},
          {label:"李书明",value:"lishumin"},
          {label:"赵思林",value:"zhaosilin"},
        ],
        projectOptions:[
          {value: '项目A',label: '项目A',children: [{value: '项目A-1',label: '项目A-1'},{value: '项目A-2',label: '项目A-2'}]},
          {value: '项目B',label: '项目B'},
          {value: '项目C',label: '项目C'}
        ]
      },
      userInfoForm:{
        profilePic :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzBBRUYyMzU0QUYxMTFFODkxQTE4MUQ2QjA4OTlCNzgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzBBRUYyMzQ0QUYxMTFFODkxQTE4MUQ2QjA4OTlCNzgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJCMTA0RUM1MjNGMDk1REYzQzc0NjAwNzAxMzAzNjEyOSIgc3RSZWY6ZG9jdW1lbnRJRD0iQjEwNEVDNTIzRjA5NURGM0M3NDYwMDcwMTMwMzYxMjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4L/WLQAABM9ElEQVR42sR9B2Ac1dXunT7bm1a7WvXe5SLb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",
        userName:"weiew",
        email:"weiew@weiew.com",
        oldPwd:"",
        newPwd:"",
        confirmPwd:"",
        verifyCode:"",
      }
    }
  },
  methods: {
    queryProject: function () {
    },
    handleClick: function () {
    },
    handleClose: function () {
      this.newProjectVisible = false;
    },
    closeNewApi: function () {
      this.newApiVisible = false;
    },
    savePwd: function () {
    },
  },
  created (){
    this.queryProject();
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
