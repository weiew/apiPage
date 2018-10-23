<template>
   <div class="shareMain">
     <div class="headTitle">
       <img class="loginLogo" width="200px" src="http://e.weiew.net/images/logo500.png">
       接口文档
     </div>
  <div v-if="$route.params.project">
    <el-row :getter="24" type="flex" align="top">
      <el-col :span="24">
        <div class="info">
          <p>项目名称: <span>{{projectInfo.name}}</span></p>
          <p>项目描述: <span>{{projectInfo.descript}}</span></p>
          <p>创 建 者: <span>{{projectInfo.ownerId}}</span></p>
          <p>创建时间: <span>{{VTools.dateTimeFA(null,null,projectInfo.createTime)}}</span></p>
          <p v-show="projectInfo.membersNo">成员人数: <span>{{projectInfo.membersNo}}</span></p>
        </div>
        <div class="siteTitleA">接口列表</div>
        <div style="margin: 0 20px">
          <el-table
            :data="apiList"
            stripe
            size="mini"
            style="width: 100%;">
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
                <el-button slot="reference" size="mini" icon="el-icon-info" @click="getApiInfo(scope.row.id)"></el-button>
                <el-button slot="reference" size="mini" icon="el-icon-d-arrow-right" @click="toApiPage(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <div class="siteTitleA">README</div>
    <div class="editorContainer"  v-show="projectMDShow">
      <markdown
        :mdValuesP="projectMD"
        :fullPageStatusP="false"
        :editStatusP="false"
        :previewStatusP="true"
        :navStatusP="false"
        :icoStatusP="true"
      ></markdown>
    </div>
  </div>

  <el-row v-if="!$route.params.project">
    <div class="info">
      <p>接口名称: <span>{{apiInfo.name}}</span></p>
      <p>接口类型: <span>{{apiInfo.type}}</span></p>
      <p>接口地址: <span>{{apiInfo.address}}</span></p>
      <p>最后修改: <span>{{VTools.dateTimeFA(null,null,apiInfo.updateTime)}}</span></p>
    </div>
    <div class="siteTitleA">接口入参</div>
    <div class="optionsWrap">
      <div class="optionsHead">
        <p style="min-width: 260px;">字段</p>
        <p style="min-width: 46px;">类型</p>
        <p style="min-width: 46px;">必传</p>
        <p style="min-width: 250px;">案例</p>
        <p style="min-width: 210px;flex: 1;">说明</p>
        <p style="min-width: 130px;">最后修改</p>
      </div>
      <el-tree ref="apiDetailInTree" class="optionsTree"
               :data="apiDetailIn"
               node-key="id"
               draggable
               highlight-current
               :props="defaultProps"
               :optionsWrap-on-click-node="false"
               :render-content="renderContent"></el-tree>
    </div>
    <div class="siteTitleA">接口出参</div>
    <div class="optionsWrap">
      <div class="optionsHead">
        <p style="min-width: 260px;">字段</p>
        <p style="min-width: 46px;">类型</p>
        <p style="min-width: 46px;">必传</p>
        <p style="min-width: 250px;">案例</p>
        <p style="min-width: 210px;flex: 1;">说明</p>
        <p style="min-width: 130px;">最后修改</p>
      </div>
      <el-tree ref="apiDetailOutTree" class="optionsTree"
               :data="apiDetailOut"
               node-key="id"
               draggable
               highlight-current
               :props="defaultProps"
               :optionsWrap-on-click-node="false"
               :render-content="renderContent"></el-tree>
    </div>

    <div class="siteTitleA">README</div>
    <div class="editorContainer"  v-show="apiMDShow">
      <markdown
        :mdValuesP="apiMD"
        :fullPageStatusP="false"
        :editStatusP="false"
        :previewStatusP="true"
        :navStatusP="false"
        :icoStatusP="true"
      ></markdown>
    </div>
  </el-row>
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
  import shareOptionsTree from '@/components/shareOptionsTree'
  import markdown from '@/components/markdown'
export default {
  name: 'project',
  components: {
    markdown
  },
  data(){
    return{
      projectId:'',
      projectMDShow:false,
      projectMD:"",
      projectInfo:{},
      apiInfo:{},
      memberList: [
        {img:"http://e.weiew.net/images/194628.jpg", name: "零八二七丶"},
        {img:"http://e.weiew.net/images/76465.jpg", name: "weiew"},
        {img:"http://e.weiew.net/images/205929.jpg", name: "artisan"},
        {img:"http://e.weiew.net/images/252745.jpg", name: "原来是肚脐爸爸"},
        {img:"http://e.weiew.net/images/199809.jpg", name: "橘子暖洋洋"},
        {img:"http://e.weiew.net/images/205929.jpg", name: "hsher"},
      ],
      apiList:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      apiMDShow:false,
      apiMD:"",
      apiDetailShow: false,
      apiDetailTabs: "in",
      apiDetailIn: [],
      apiDetailOut: [],
      apiDetailWidth:"80%",
    }
  },
  methods: {
    getProjectInfo (id){
      api.post('api/user/shareInfo')({project: id}).then((data) => {
        if(data.code == "200"){
          this.projectInfo = data.projectInfo;
          this.apiList = data.apiList;
          if(data.projectInfo.descriptionMD){
            this.projectMD = data.projectInfo.descriptionMD;
            this.projectMDShow = true;
          }
        }else{
          this.$message({
            message: data.msg || '添加失败',
            type: 'error'
          });
        }
      })
    },
    getApiInfo(id){
      if(this.$route.params.project){
        this.apiDetailShow = true;
        this.apiDetailTabs = "in";
      }
      api.post('api/user/shareInfo')({api: id}).then((data) => {
        let {apiDetail} = data;
        if(data.code == "200"){
          this.apiInfo = apiDetail;
          if(apiDetail.paramIn){
            this.apiDetailIn = JSON.parse(apiDetail.paramIn);
            this.$refs.apiDetailInTree.store.defaultExpandAll = true;
          }
          if(apiDetail.paramOut){
            this.apiDetailOut = JSON.parse(apiDetail.paramOut);
          }
          if(apiDetail.descriptionMD){
            this.apiMDShow = true;
            this.apiMD = apiDetail.descriptionMD;
          }
          console.log(this.apiDetailIn)
          console.log(this.apiDetailOut)
        }else{
          this.$message({
            message: data.msg || '查询失败',
            type: 'error'
          });
        }
      })
    },
    toApiPage (id){
      window.open("/#/share/api/" + id);
    },
    renderContent(h,{node,data,store}){//加载节点
      let that = this;
      return h(shareOptionsTree,{
        props: {
          DATA: data,
          NODE: node,
          STORE: store,
          maxoptionsWrapId: that.non_maxoptionsWrapId,
          saveApi: that.saveApi
        },
        on: {
          nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
          nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
          nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
        }
      });
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
  },
  mounted(){

  },
  created() {
      document.body.style.background = "url(http://e.weiew.net/images/bg-logomini.png) 100% 100%"
      if(this.$route.params.project){
        this.getProjectInfo(this.$route.params.project);
      }else{
        this.getApiInfo(this.$route.params.api);
      }
  },
  watch: {
    '$route' () {
      this.getProjectInfo();
    }
  }
}
</script>
<style scoped>
  .shareMain{
    text-align: left;
    font-size: 12px;
    width: 1024px;
    margin: auto;
    background: #fff;
    box-shadow: 0px 1px 7px #241b25;
    overflow: hidden;
  }
  .headTitle{
    background: #24292e;
    font-size: 60px;
    line-height: 60px;
    color: #fff;
    padding: 5px 0;
    text-align: right;
  }
  .headTitle img{
    vertical-align: middle;
    float: left;
  }
  .siteTitleA{
    color: #ff6440;
    font-size: 40px;
    padding: 10px;
    border: 1px solid #ebeef5;
  }
  .info{
    padding: 5px 20px;
    border-bottom: 1px dashed #000;
  }
  .info p{
    display: inline-block;
    font-size: 18px;
    color: #808080;
    line-height: 35px;
    width: 400px;
  }
  .info span{
    margin-left: 10px;
    display: inline-block;
    color: #ff6440;
  }
  .projectInfo p{
    display: inline-block;
    font-size: 20px;
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
  .optionsWrap{
    box-shadow: 0px 0px 6px #dcd7d7;
  }
  .optionsHead{
    color: #3286dc;
    display: flex;
    border-bottom: 1px solid #acccec;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    padding: 5px 0;
    background: #f1f1f1;
    font-weight: bold;
  }
  .optionsHead>p{
    border-right: 1px dashed #bfbfbf;
    vertical-align: middle;
    font-size: 14px;
    margin:0;
    line-height: 18px;
  }
  .optionsHead>p:last-child{
    border: none;
  }
  .editorContainer {
    width: 98%;
    height: 500px;
    margin: 30px auto;
  }
</style>
