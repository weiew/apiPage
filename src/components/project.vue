<template>
  <div style="text-align: left;padding: 5px 20px; font-size: 12px">
    <el-row :getter="24" type="flex" align="top">
      <el-col :span="20">
        <div class="projectInfo">
          <p>项目名称: <span>{{projectInfo.name}}</span></p>
          <p>项目描述: <span>{{projectInfo.descript}}</span></p>
          <p>创建者: <span>{{projectInfo.ownerId}}</span></p>
          <p>创建时间: <span>{{projectInfo.createTime}}</span></p>
          <p v-show="projectInfo.membersNo">成员人数: <span>{{projectInfo.membersNo}}</span></p>
        </div>
        <div class="titleA">接口列表：
          <el-button size="mini" type="warning" @click="newApi()">新增接口</el-button>
        </div>
        <el-table
          :data="apiList"
          stripe
          size="mini"
          style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="name" label="名称" min-width="120"></el-table-column>
          <el-table-column prop="type" label="类型" width="50"></el-table-column>
          <el-table-column prop="address" label="地址" width="180"></el-table-column>
          <el-table-column prop="editor" label="编辑者" width="80"></el-table-column>
          <el-table-column prop="updateTime" label="编辑时间" width="140" :formatter="VTools.dateTimeFA"></el-table-column>
          <el-table-column prop="version" label="版本号" width="60"></el-table-column>
          <el-table-column prop="status" label="状态" width="60"></el-table-column>
          <el-table-column fixed="right" class-name="mine_smallCell" label="操作" min-width="140" header-align="center" align="center">
            <template scope="scope">
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteApi(scope.row)"></el-button>
              <el-button size="mini" type="warning" icon="el-icon-edit" @click="toApi(scope.row)"></el-button>
              <el-button slot="reference" size="mini" icon="el-icon-document" @click="apiDetail(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
<!--      <el-col :span="10" v-show="apiDetailShow">
        <tree-view :data="apiDetailIn" :options="{maxDepth: 3}"></tree-view>
      </el-col>-->
      <el-col :span="4">
        <div class="titleB">成员</div>
        <ul class="memberUl">
          <li v-for="item in memberList">
            <p><img :src="item.img" alt=""></p>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </el-col>
    </el-row>

    <!--新增接口 -->
    <el-dialog
      title="新增接口"
      :visible.sync="newApiVisible"
      width="500px"
      :before-close="closeNewApi">
      <el-form :model="newApiForm" ref="newApiForm" :rules="newApiFormRules" label-width="80px">
        <el-row>
          <el-col>
            <el-form-item label="接口名称" prop="name">
              <el-input v-model="newApiForm.name" placeholder="接口的简称" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="接口地址" prop="address">
              <el-input v-model="newApiForm.address" placeholder="http://xxx.com/ 域名后面部分" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="接口类型">
              <el-radio v-model="newApiForm.type" label="post">post</el-radio>
              <el-radio v-model="newApiForm.type" label="get">get</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newApiVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewApi">新 增</el-button>
      </div>
    </el-dialog>
    <!--接口参数预览 -->
    <el-dialog
      top="10px"
      :visible.sync="apiDetailShow"
      :width="apiDetailWidth">
      <el-tabs v-model="apiDetailTabs" @tab-click="apiDetailTabsClick" style="margin-top: -28px;">
        <el-tab-pane label="入参" name="in">
          <tree-view :data="apiDetailIn"></tree-view>
        </el-tab-pane>
        <el-tab-pane label="出参" name="out">
          <tree-view :data="apiDetailOut"></tree-view>
        </el-tab-pane>
        <el-tab-pane label="入参+出参" name="inAndOut">
          <el-row :getter="24">
            <el-col :span="12">
              入参：
              <tree-view :data="apiDetailIn" ></tree-view>
            </el-col>
            <el-col :span="12">
              出参：
              <tree-view :data="apiDetailOut"></tree-view>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="apiDetailShow = false">关闭</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  import api from '../api/api';
export default {
  name: 'project',
  data(){
    return{
      projectId:'',
      projectInfo:{},
      memberList: [
        {img:"http://e.weiew.net/images/194628.jpg", name: "零八二七丶"},
        {img:"http://e.weiew.net/images/76465.jpg", name: "weiew"},
        {img:"http://e.weiew.net/images/205929.jpg", name: "artisan"},
        {img:"http://e.weiew.net/images/252745.jpg", name: "原来是肚脐爸爸"},
        {img:"http://e.weiew.net/images/199809.jpg", name: "橘子暖洋洋"},
        {img:"http://e.weiew.net/images/205929.jpg", name: "hsher"},
      ],
      apiList:[],
      apiDetailShow: false,
      apiDetailTabs: "inAndOut",
      apiDetailIn: [],
      apiDetailOut: [],
      apiDetailWidth:"500px",
      newApiVisible: false,
      newApiForm:{
        name:"",
          address:"",
          belong:"",
          type:"post",
      },
      newApiFormRules: {
        name: [{required: true, message: '请输入接口名称', trigger: 'blur'}],
        address: [{required: true, message: '请输入接口地址', trigger: 'blur'}],
      },
    }
  },
  methods: {
    getProjectInfo (){
      this.projectId = this.$route.params.id;
      api.post('api/project/projectInfo')({projectId: this.projectId}).then((data) => {
        if(data.code == "200"){
          this.projectInfo = data.projectInfo;
          this.apiList = data.apiList;
        }else{
          this.$message({
            message: data.msg || '添加失败',
            type: 'error'
          });
        }
      })
/*        this.apiList = [
          {id: 'A012', name: '账号列表', type: 'post', url:'/api/user/login.json', fieldNo:'201', editor:'weiew', editSession:'2018-10-10 12:20', version:'201810101220', status:'可用'},
          {id: 'A012', name: '账号信息', type: 'get', url:'/api/user/userInfo.json', fieldNo:'201', editor:'weiew', editSession:'2018-10-10 12:20', version:'201810101220', status:'在建'},
          {id: 'A012', name: '项目列表', type: 'post', url:'/api/user/project.json', fieldNo:'2011', editor:'零八二七丶', editSession:'2018-10-10 12:20', version:'201810101220', status:'可用'},
          {id: 'A012', name: '项目信息', type: 'get', url:'/api/user/projectInfo.json', fieldNo:'12', editor:'零八二七丶', editSession:'2018-10-10 12:20', version:'201810101220', status:'在建'},
          {id: 'A012', name: '注册', type: 'post', url:'/api/user/register.json', fieldNo:'3', editor:'weiew', editSession:'2018-10-10 12:20', version:'201810101220', status:'在建'},
          {id: 'A012', name: '通过密码找回账号', type: 'post', url:'/api/user/login.json', fieldNo:'50', editor:'weiew', editSession:'2018-10-10 12:20', version:'201810101220', status:'在建'},
          {id: 'A012', name: '账号列表', type: 'post', url:'/api/user/login.json', fieldNo:'201', editor:'weiew', editSession:'2018-10-10 12:20', version:'201810101220', status:'可用'},
          {id: 'A012', name: '账号信息', type: 'get', url:'/api/user/userInfo.json', fieldNo:'201', editor:'weiew', editSession:'2018-10-10 12:20', version:'201810101220', status:'在建'},
          {id: 'A012', name: '项目列表', type: 'post', url:'/api/user/project.json', fieldNo:'2011', editor:'橘子暖洋洋', editSession:'2018-10-10 12:20', version:'201810101220', status:'可用'},
          {id: 'A012', name: '项目信息', type: 'get', url:'/api/user/projectInfo.json', fieldNo:'12', editor:'橘子暖洋洋', editSession:'2018-10-10 12:20', version:'201810101220', status:'在建'},
          {id: 'A012', name: '注册', type: 'post', url:'/api/user/register.json', fieldNo:'3', editor:'weiew', editSession:'2018-10-10 12:20', version:'201810101220', status:'在建'},
          {id: 'A012', name: '通过密码找回账号', type: 'post', url:'/api/user/login.json', fieldNo:'50', editor:'weiew', editSession:'2018-10-10 12:20', version:'201810101220', status:'在建'},
        ]*/
    },
    newApi (){
      this.newApiVisible = true;
    },
    closeNewApi (){
      this.newApiVisible = true;
    },
    addNewApi (){
      this.$refs.newApiForm.validate((valid) => {
        if(valid){
          let postData = {
            editor: sessionStorage.getItem("account"),
            projectId: this.projectId,
            name: this.newApiForm.name,
            type: this.newApiForm.type,
            address: this.newApiForm.address
          }
          api.post('api/apiData/addApi')(postData).then((data) => {
            if(data.code == "200"){
              this.$message("添加成功");
              this.getProjectInfo();
              this.newApiVisible = false;
            }else{
              this.$message({
                message: data.msg || '添加失败',
                type: 'error'
              });
            }
          })
        }
      })
    },
    apiDetail(row){
      this.apiDetailShow = true;
      api.post('api/apiData/apiDetail')({id: row.id}).then((data) => {
        let {dto} = data;
        if(data.code == "200"){
          if(dto.paramIn){
            this.apiDetailIn = JSON.parse(dto.paramIn);
          }
          if(dto.paramOut){
            this.apiDetailIn = JSON.parse(dto.paramOut);
          }
        }else{
          this.$message({
            message: data.msg || '添加失败',
            type: 'error'
          });
        }
      })
    },
    apiDetailTabsClick (){
      if(this.apiDetailTabs == "inAndOut"){
        this.apiDetailWidth = "800px";
      }else{
        this.apiDetailWidth = "500px";
      }
    },
    toApi (row){
      this.$router.push({path: '/api/'+this.projectId+'/'+row.id});
    },
    deleteApi (){

    },
  },
  mounted(){
  },
  created() {
    this.getProjectInfo();
  },
  watch: {
    '$route' () {
      this.getProjectInfo();
    }
  }
}
</script>
<style>
  .tree-view-item-key {
    color: #666;
  }
  .tree-view-item {
    color: #de8100;
  }
  .tree-view-item-key-with-chevron.opened::before{
    top: 1px;
  }
  .tree-view-item-key-with-chevron::before{
    top: 1px;
    font-size: 6px;
  }
</style>
<style scoped>

  .projectInfo p{
    display: inline-block;
    font-size: 14px;
    color: #bbb;
    margin-right: 20px;
  }
  .projectInfo span{
    color: #409eff;
  }
  .memberUl{
    list-style: none;
    padding: 0;
  }
  .memberUl li{
    margin: 5px;
    vertical-align: top;
    border-bottom: 1px solid #eee;
    padding:0 10px 5px;
    color: #555;
  }
  .memberUl li p{
    border-radius: 30px;
    height: 30px;
    width: 30px;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    margin-right: 10px;
  }
  .memberUl li p img{
    width: 100%;
    height: 100%;
  }
</style>
