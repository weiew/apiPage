<template>
  <div style="text-align: left;padding: 5px 20px; font-size: 12px;background: #fff">
    <el-row :getter="24" type="flex" align="top">
      <el-col :span="24">
        <div class="projectInfo">
          <p>项目名称:
            <el-input v-model="projectInfo.name" size="mini" @change="projectSave" style="width: 100px;"></el-input>
          </p>
          <p>项目描述:
            <el-input v-model="projectInfo.descript" size="mini" @change="projectSave" style="width: 100px;"></el-input>
          </p>
          <p>创建者: <span>{{projectInfo.ownerId}}</span></p>
          <p>创建时间: <span>{{VTools.dateTimeFA(null,null,projectInfo.createTime)}}</span></p>
          <p v-show="projectInfo.membersNo">成员人数: <span>{{projectInfo.membersNo}}</span></p>
        </div>
        <div class="titleA">接口列表：
          <el-button size="mini" type="danger" @click="shareProject()">分享项目</el-button>
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
<!--      <el-col :span="4">
        <div class="titleB">成员</div>
        <ul class="memberUl">
          <li v-for="item in memberList">
            <p><img :src="item.img" alt=""></p>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </el-col>-->
    </el-row>
    <el-button v-show="!markdownShow" size="mini" @click="markdownDiv()" style="margin: 20px;">编写项目描述?</el-button>
    <el-button v-show="markdownShow" size="mini" @click="projectSave()" style="position: absolute;right: 50px;margin-top: 24px;">保存描述</el-button>
    <div class="editorContainer"  v-show="markdownShow">
      <markdown
        :mdValuesP="markD.mdValue"
        :fullPageStatusP="false"
        :editStatusP="true"
        :previewStatusP="true"
        :navStatusP="true"
        :icoStatusP="true"
        @childevent="childEventHandler"
      ></markdown>
    </div>
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
  import markdown from '@/components/markdown'
export default {
  name: 'project',
  components: {
    markdown
  },
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
      apiDetailTabs: "in",
      apiDetailIn: [],
      apiDetailOut: [],
      apiDetailWidth:"80%",
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
      markdownShow:false,
      markDShow:false,
      markD:{
        mdValue:''
      }
    }
  },
  methods: {
    getProjectInfo (){
      this.projectId = this.$route.params.id;
      api.post('api/project/projectInfo')({projectId: this.projectId}).then((data) => {
        if(data.code == "200"){
          this.projectInfo = data.projectInfo;
          if(data.projectInfo.descriptionMD){
            this.markD.mdValue = this.projectInfo.descriptionMD;
            this.markdownShow = true;
          }else{
            this.markD.mdValue = "##这里可以编写整体的接口描述，说明等，类似README.md 文件\n\n![weiew](http://e.weiew.net/images/logo.png)";
            this.markdownShow = false;
          }
          this.apiList = data.apiList;
        }else{
          this.$message({
            message: data.msg || '添加失败',
            type: 'error'
          });
        }
      })
    },
    shareProject (){
      this.$alert('复制: http://www.weiew.net/#/share/project/'+this.projectId, '分享地址（该地址只有查看权限)', {
        confirmButtonText: '确定'
      });
    },
    projectSave(){
      let postData = {
        editor: sessionStorage.getItem("account"),
        id: this.projectId,
        name: this.projectInfo.name,
        descript: this.projectInfo.descript,
        descriptionMD: this.markD.mdValue
      }
      api.post('api/project/editProject')(postData).then((data) => {
        if(data.code == "200"){
          this.$message("保存成功");
        }else{
          this.$message({
            message: data.msg || '保存失败',
            type: 'error'
          });
        }
      })
    },
    newApi (){
      this.newApiVisible = true;
    },
    closeNewApi (){
      this.newApiVisible = false;
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
      this.apiDetailTabs = "in";
      api.post('api/apiData/apiDetail')({id: row.id}).then((data) => {
        let {dto} = data;
        if(data.code == "200"){
          if(dto.paramIn){
            this.apiDetailIn = this.jsonViewData(dto.paramIn);
          }
          if(dto.paramOut){
            this.apiDetailOut = this.jsonViewData(dto.paramOut);
          }
          console.log(this.apiDetailIn)
          console.log(this.apiDetailOut)
        }else{
          this.$message({
            message: data.msg || '添加失败',
            type: 'error'
          });
        }
      })
    },
    jsonViewDataFun (obj,saveObj){
      const typeObj = {
        S:'String',
        N:'Number',
        O:'Object',
        A:'Array',
        B:'Boolean'
      }
      if(obj.children && obj.children.length >0){
        saveObj[obj.codeName] = {};
        obj.children.forEach(itemChild =>{
          this.jsonViewDataFun(itemChild,saveObj[obj.codeName]);
        })
      }else if(obj.codeName){
        const need = obj.codeNeed=='Y'?'-必传':'';
        const type = typeObj[obj.codeType];
        saveObj[obj.codeName] = type + need +'-示例:'+obj.codeExample;
        if(obj.codeTips){
          saveObj[obj.codeName] += " 说明:"+obj.codeTips;
        }
      }
    },
    jsonViewData(data){
      typeof data == 'string' && (data= JSON.parse(data));
      let newData = {};
      data.forEach(item=>{
          this.jsonViewDataFun(item,newData);
      });
      return newData;
    },
    apiDetailTabsClick (){
      if(this.apiDetailTabs == "inAndOut"){
        this.apiDetailWidth = "90%";
      }else{
        this.apiDetailWidth = "80%";
      }
    },
    toApi (row){
      this.$router.push({path: '/project/'+this.projectId+'/'+row.id});
    },
    deleteApi (){

    },
    childEventHandler:function(res){
      // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
      this.markD=res;
    },
    markdownDiv (){
      this.markdownShow = true;
    },
    getMdValueFn:function(){
      this.markDShow=this.markD.mdValue;
      this.dilogStatus=true;
    },
    getHtmlValueFn:function(){
      this.markDShow=this.markD.htmlValue;
      this.dilogStatus=true;

    },
    closeMaskFn:function(){
      this.markDShow='';
      this.dilogStatus=false;
    }
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
  .editorContainer {
    width: 98%;
    height: 500px;
    border: 1px solid #ddd;
    margin: 20px auto;
  }
</style>
