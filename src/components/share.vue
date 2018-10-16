<template>
  <div style="text-align: left;padding: 5px 20px; font-size: 12px">
    <el-row :getter="24" type="flex" align="top" v-if="$route.params.project">
      <el-col :span="20">
        <div class="projectInfo">
          <p>项目名称: <span>{{projectInfo.name}}</span></p>
          <p>项目描述: <span>{{projectInfo.descript}}</span></p>
          <p>创建者: <span>{{projectInfo.ownerId}}</span></p>
          <p>创建时间: <span>{{projectInfo.createTime}}</span></p>
          <p v-show="projectInfo.membersNo">成员人数: <span>{{projectInfo.membersNo}}</span></p>
        </div>
        <div class="titleA">接口列表：</div>
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
              <el-button slot="reference" size="mini" icon="el-icon-document" @click="getApiInfo(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row v-if="!$route.params.project">
      <div>
        api 相关描述
        名称: {{apiInfo.name}}
        类型: {{apiInfo.type}}
        地址: {{apiInfo.address}}
      </div>
      <el-tabs v-model="apiDetailTabs" @tab-click="apiDetailTabsClick">
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
export default {
  name: 'project',
  data(){
    return{
      projectId:'',
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
      apiDetailShow: false,
      apiDetailTabs: "in",
      apiDetailIn: [],
      apiDetailOut: [],
      apiDetailWidth:"80%",
    }
  },
  methods: {
    getProjectInfo (id){
      api.post('api/project/projectInfo')({projectId: id}).then((data) => {
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
    },
    getApiInfo(id){
      if(this.$route.params.project){
        this.apiDetailShow = true;
        this.apiDetailTabs = "in";
      }
      api.post('api/apiData/apiDetail')({id: id}).then((data) => {
        let {dto} = data;
        if(data.code == "200"){
          this.apiInfo = dto;
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
  },
  mounted(){
  },
  created() {
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
