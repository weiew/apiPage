<template>
  <div style="background: #fff">
    <div class="apiUrlInfo">
      <el-breadcrumb separator="/" class="breadcrumbApi">
        <el-breadcrumb-item :to="'/project/'+projectId">返回</el-breadcrumb-item>
      </el-breadcrumb>
      名称: <el-input v-model="apiName" size="mini" @change="saveApi" style="width: 100px;"></el-input>
      类型: <el-input v-model="apiType" size="mini" @change="saveApi" style="width: 60px;"></el-input>
      地址: <el-input v-model="apiUrl" size="mini" @change="saveApi" style="width: 200px;"></el-input>
<!--      <el-button size="mini">复制</el-button>
      <el-button size="mini">访问</el-button>
     <div class="apiServerList">
        环境列表:
        <el-select v-model="apiServer" size="mini">
          <el-option label="192.168.2.10" value="1">192.168.2.10 <i class="el-icon-check"></i></el-option>
          <el-option label="www.baidu.com" value="2">www.baidu.com <i class="el-icon-close"></i></el-option>
        </el-select>
      </div>-->
    </div>
    <div style="position: relative">
      <el-button size="mini" class="viewJSONTree" @click="viewJSONTree">JSON</el-button>
      <el-button size="mini" class="shareApi" @click="shareApi">分享</el-button>
      <span class="saveApi">自动保存模式</span>
      <el-tabs v-model="optionTabFirst" class="optionTab" style="padding-top: 0px;">
        <el-tab-pane name="first">
          <span slot="label"><i class="el-icon-share" style="margin: 0 3px"></i>接口入参</span>
          <div class="optionsWrap">
            <div class="optionsHead">
              <p style="min-width: 260px;">字段</p>
              <p style="min-width: 46px;">类型</p>
              <p style="min-width: 46px;">必传</p>
              <p style="min-width: 250px;">案例</p>
              <p style="min-width: 210px;flex: 1;">说明</p>
              <p style="min-width: 130px;">最后修改</p>
              <p style="min-width: 90px;">操作</p>
            </div>
            <el-tree ref="optionsWrapMenuList" class="optionsTree"
               v-if="isLoadingTree"
               :data="treeDataIn"
               node-key="id"
               draggable
               highlight-current
               :props="defaultProps"
               :optionsWrap-on-click-node="false"
               :render-content="renderContentIn"
               :default-optionsWraped-keys="defaultoptionsWrapKeys"
               @node-click="handleNodeClick"></el-tree>
            <div>
              <el-form ref="form" :model="newApiKey" label-width="50px" size="mini">
                <el-row>
                  <el-col :span="4">
                    <el-form-item label="名称">
                      <el-input v-model="newApiKey.codeName" auto-complete="off" placeholder="请输入字段名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="类型">
                      <el-select v-model="newApiKey.codeType" size="mini">
                        <el-option
                          v-for="item in codeTypeSelect"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="必传">
                      <el-select v-model="newApiKey.codeNeed" size="mini">
                        <el-option
                          v-for="item in codeNeedSelect"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="案例">
                      <el-input v-model="newApiKey.codeExample" auto-complete="off" placeholder="请输入数据案例"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-form-item label="选项">
                      <span>
                        <el-checkbox v-model="newApiKey.hasCodeValue"></el-checkbox>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="说明">
                      <el-input v-model="newApiKey.codeTips" auto-complete="off" placeholder="请输入描述该字段用处"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                      <el-button type="primary" @click="handleAddTop">添加字段</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">-</el-col>
                  <el-col :span="7">
                    <span class="codeValueEditList" v-if="newApiKey.hasCodeValue" v-for="item,key in newApiKey.codeValue">
                        <el-input class="codeValue_code" size="mini" v-model="item.code"></el-input>
                        -
                        <el-input class="codeValue_value" size="mini" v-model="item.value"></el-input>
                        <i class="el-icon-delete" v-if="newApiKey.codeValue.length>1" @click.stop="newCodeValue('delete',key)"></i>
                        <i class="el-icon-plus" @click.stop="newCodeValue('add',key)"></i>
                      </span>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label"><i class="el-icon-share" style="margin: 0 3px"></i>接口出参</span>
          <div class="optionsWrap">
            <div class="optionsHead">
              <p style="width: 260px;">字段</p>
              <p style="width: 46px;">类型</p>
              <p style="width: 46px;">必传</p>
              <p style="width: 250px;">案例</p>
              <p style="width: 210px;flex: 1;">说明</p>
              <p style="width: 130px;">最后修改</p>
              <p style="width: 90px;">操作</p>
            </div>
            <el-tree ref="optionsWrapMenuList" class="optionsTree"
                     v-if="isLoadingTree"
                     :data="treeDataOut"
                     node-key="id"
                     draggable
                     highlight-current
                     :props="defaultProps"
                     :optionsWrap-on-click-node="false"
                     :render-content="renderContentOut"
                     :default-optionsWraped-keys="defaultoptionsWrapKeys"
                     @node-click="handleNodeClick"></el-tree>
            <div>
              <el-form ref="form" :model="newApiKey" label-width="50px" size="mini">
                <el-row>
                  <el-col :span="4">
                    <el-form-item label="名称">
                      <el-input v-model="newApiKey.codeName" auto-complete="off" placeholder="请输入字段名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="类型">
                      <el-select v-model="newApiKey.codeType" size="mini">
                        <el-option
                          v-for="item in codeTypeSelect"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="必传">
                      <el-select v-model="newApiKey.codeNeed" size="mini">
                        <el-option
                          v-for="item in codeNeedSelect"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="案例">
                      <el-input v-model="newApiKey.codeExample" auto-complete="off" placeholder="请输入数据案例"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-form-item label="选项">
                      <span>
                        <el-checkbox v-model="newApiKey.hasCodeValue"></el-checkbox>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="说明">
                      <el-input v-model="newApiKey.codeTips" auto-complete="off" placeholder="请输入描述该字段用处"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                      <el-button type="primary" @click="handleAddTop">添加字段</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">-</el-col>
                  <el-col :span="7">
                    <span class="codeValueEditList" v-if="newApiKey.hasCodeValue" v-for="item,key in newApiKey.codeValue">
                        <el-input class="codeValue_code" size="mini" v-model="item.code"></el-input>
                        -
                        <el-input class="codeValue_value" size="mini" v-model="item.value"></el-input>
                        <i class="el-icon-delete" v-if="newApiKey.codeValue.length>1" @click.stop="newCodeValue('delete',key)"></i>
                        <i class="el-icon-plus" @click.stop="newCodeValue('add',key)"></i>
                      </span>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="入参+出参" name="third">入参+出参</el-tab-pane>
      </el-tabs>
      <el-button v-show="!markdownShow" size="mini" @click="markdownDiv()" style="margin: 20px;">编写接口说明?</el-button>
      <el-button v-show="markdownShow" size="mini" @click="saveApi('yes')" style="position: absolute;right: 30px;margin-top: 5px;">保存描述</el-button>
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
      <!--接口参数预览 -->
      <el-dialog
        top="10px"
        :visible.sync="viewJSON"
        width="800px">
        <tree-view :data="viewJSONData" ></tree-view>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button @click="viewJSON = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '../api/api';
import apiOptionsTree from '@/components/apiOptionsTree'
import markdown from '@/components/markdown'
export default {
  name: 'api',
  components: {
    markdown
  },
  data(){
    return{
      projectId:'',
      apiName:"",
      apiUrl:"/get/userInfo/a.json",
      apiType:"POST",
      apiServer:"192.168.2.10",
      optionTabFirst:"first",
      non_maxoptionsWrapId: 96,//最开始节点id(不更改)
      isLoadingTree: false,//是否加载节点树
      treeWrapIdIn: 96,//新增节点开始id
      treeWrapIdOut: 96,//新增节点开始id
      treeDataIn: [],//入参节点树数据
      treeDataOut: [],//出参节点树数据
      viewJSON: false,
      viewJSONData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      codeTypeSelect:[
        {value:'S',label:'String'},
        {value:'N',label:'Number'},
        {value:'O',label:'Object'},
        {value:'A',label:'Array'},
        {value:'B',label:'Boolean'}
      ],
      codeNeedSelect:[
        {value:'Y',label:'是'},
        {value:'N',label:'否'}
      ],
      defaultoptionsWrapKeys: [],//默认展开节点列表
      newApiKey:{
        codeName:"",
        codeType:"S",
        codeNeed:"N",
        codeExample:"",
        codeTips:"",
        hasCodeValue:false,
        codeValue:[
          {code:"",value:""}
        ]

      },
      markdownShow:false,
      markDShow:false,
      markD:{
        mdValue:'##这里可以编写整体的接口描述，说明等，类似README.md 文件\n\n![weiew](http://e.weiew.net/images/logo.png)'
      }
    }
  },
  methods: {
    getApiInfo (){
      this.projectId = this.$route.params.project;
      this.apiId = this.$route.params.id;
      api.post('api/apiData/apiDetail')({id: this.apiId}).then((data) => {
        if(data.code == "200"){
          let {dto} = data;
          this.apiUrl = dto.address;
          this.apiType = dto.type;
          this.apiName = dto.name;
          if(dto.paramIn){
            this.treeDataIn = JSON.parse(dto.paramIn);
            this.treeWrapIdIn = dto.paramMaxIdIn;
            this.viewJSONData = JSON.parse(dto.paramIn);
          }
          if(dto.paramOut){
            this.treeDataOut = JSON.parse(dto.paramOut);
            this.treeWrapIdOut = dto.paramMaxIdOut;
          }
          if(dto.descriptionMD){
            this.markD.mdValue = dto.descriptionMD;
            this.markdownShow = true;
          }
        }else{
          this.$message({
            message: data.msg || '添加失败',
            type: 'error'
          });
        }
      })
    },
    codemirrorChange:function(){

    },
    initoptionsWrap(){
      this.treeDataIn.map((a) => {
        this.defaultoptionsWrapKeys.push(a.id)
      });
      this.isLoadingTree = true;
    },
    handleNodeClick(d,n,s){//点击节点
      // console.log(d,n)
      //d.isEdit = false;//放弃编辑状态
    },
    renderContentIn(h,{node,data,store}){//加载节点
      let that = this;
      return h(apiOptionsTree,{
        props: {
          DATA: data,
          NODE: node,
          STORE: store,
          maxoptionsWrapId: that.treeWrapIdIn,
          saveApi: that.saveApi
        },
        on: {
          nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
          nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
          nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
        }
      });
    },
    renderContentOut(h,{node,data,store}){//加载节点
      let that = this;
      return h(apiOptionsTree,{
        props: {
          DATA: data,
          NODE: node,
          STORE: store,
          maxoptionsWrapId: that.treeWrapIdOut,
          saveApi: that.saveApi
        },
        on: {
          nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
          nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
          nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
        }
      });
    },
    handleAddTop(){
      var newData = {
        ...this.newApiKey
      };
      if(!newData.codeName){
        this.$message.error("字段名称不能为空")
        return
      }
      newData.lastEditTime = new Date().toJSON();
      newData.isEdit = false;
      if(this.optionTabFirst == "first"){
        newData.id = ++this.treeWrapIdIn;
        this.treeDataIn.push(newData);
      }else if(this.optionTabFirst == "second"){
        newData.id = ++this.treeWrapIdOut;
        this.treeDataOut.push(newData);
      }else{
        return
      }
      //清空输入框
      this.newApiKey ={
        codeName:"",
        codeType:"S",
        codeNeed:"N",
        codeExample:"",
        codeTips:"",
        hasCodeValue:false,
        isEdit:false,
        codeValue:[{code:"",value:""}]
      }
      this.saveApi();
      this.$message("添加成功!")
    },
    handleAdd(s,d,n){//增加节点
      if(n.level >=6){
        this.$message.error("最多只支持五级！")
        return false;
      }
      if (!d.children) {
        this.$set(d, 'children', []);
      }
      const newChild = {
        id: this.optionTabFirst == "first"? ++this.treeWrapIdIn:++treeWrapIdOut,
        codeName:"",
        codeExample:"",
        codeType:"",
        hasCodeValue:false,
        codeValue:[],
        codeTips:"",
        lastEditTime:"",
        isEdit: true,
      };
      d.children.push(newChild);
      //展开节点
      if(!n.expanded){
        n.expanded = true;
      }
      this.saveApi();
    },
    handleEdit(s,d,n){//编辑节点
      console.log(s,d,n)
    },
    handleDelete(s,d,n){//删除节点
      console.log(s,d,n)
      let that = this;
      //有子级不删除
      if(d.children && d.children.length !== 0){
        this.$message.error("此节点有子级，不可删除！")
        return false;
      }else{
        //新增节点直接删除，否则要询问是否删除
        let delNode = () => {
          let list = n.parent.data.children || n.parent.data,//节点同级数据
            _index = 99999;//要删除的index
          /*if(!n.parent.data.children){//删除顶级节点，无children
            list = n.parent.data
          }*/
          list.map((c,i) => {
            if(d.id == c.id){
              _index = i;
            }
          })
          let k = list.splice(_index,1);
          //console.log(_index,k)
          this.$message.success("删除成功！")
          this.saveApi();
        }
        let isDel = () => {
          that.$confirm("是否删除此节点？","提示",{
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            delNode()
          }).catch(() => {
            return false;
          })
        }
        //判断是否新增
        d.id > this.non_maxoptionsWrapId ? delNode() : isDel()

      }
    },
    newCodeValue:function (type,key) {
      if(type == "add"){
        if(this.newApiKey.codeValue.length >0){
          this.newApiKey.codeValue.splice(key+1,0,{code:"",value:""})
        }else{
          this.newApiKey.codeValue.push({code:"",value:""})
        }
      }else{
        this.newApiKey.codeValue.splice(key,1)
      }
    },
    viewJSONTree (){
      this.viewJSON = true;
      if(this.optionTabFirst == "first"){
        this.viewJSONData = this.jsonViewData(this.treeDataIn);
      }else if(this.optionTabFirst == "second"){
        this.viewJSONData = this.jsonViewData(this.treeDataOut);
      }else {
        this.viewJSONData = [];
      }
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
    shareApi(){
      this.$alert('复制: http://www.weiew.net/#/share/api/'+this.apiId, '分享地址（该地址只有查看权限)', {
        confirmButtonText: '确定'
      });
    },
    saveApi (msgType) {
      let postData = {
        id: this.apiId,
        type: this.apiType,
        address: this.apiUrl,
        name: this.apiName,
        paramIn: JSON.stringify(this.treeDataIn),
        paramOut: JSON.stringify(this.treeDataOut),
        paramMaxIdIn: this.treeWrapIdIn,
        paramMaxIdOut: this.treeWrapIdOut,
        descriptionMD: this.markD.mdValue,
        editor: sessionStorage.getItem("account")
      }
      api.post('api/apiData/editApi')(postData).then((data) => {
        if(data.code == "200"){
          console.log("保存成功");
          if(msgType== "yes"){
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
          }
        }else{
          this.$message({
            message: data.msg || '保存失败',
            type: 'error'
          });
        }
      })
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
  mounted (){
    this.getApiInfo();
    this.initoptionsWrap();
  }
}
</script>
<style scoped>
  .optionsWrap{
    width:100%;
    height:100%;
  }
  .optionTab{
    margin: 20px;
    box-shadow: 1px 1px 3px #ddd;
  }
  .optionsTree{
    height:85%;
    margin:0px auto 20px;
  }
  .optionsTree.el-tree-node.is-current>.el-tree-node__content{
    background: #ccc !important;
  }
  .optionsTree::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    border-radius:5px;
  }
  .optionsTree::-webkit-scrollbar-thumb{
    background-color:rgba(50, 65, 87, 0.5);
    outline:1px solid slategrey;
    border-radius:5px;
  }
  .optionsTree::-webkit-scrollbar{
    width:10px;
  }
  .optionsTree .el-tree-node.is-current,
  .optionsTree .el-tree-node:hover{
    overflow:hidden;
  }
  .optionsTree .is-current>.el-tree-node__content .tree-btn,
  .optionsTree .el-tree-node__content:hover .tree-btn{
    display:inline-block;
  }
  .optionsTree .is-current>.el-tree-node__content .tree-label{
    font-weight:600;
    white-space:normal;
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
    border-right: 1px dashed #bfbfbf;min-
    vertical-align: middle;
    font-size: 14px;
    margin:0;
    line-height: 18px;
  }
  .optionsHead>p:last-child{
    border: none;
  }
  .apiUrlInfo{
    font-size: 14px;
    text-align: left;
    padding: 5px 10px;
  }
  .apiTypeSpan{
    background: #cc3b23;
    color: #fff;
    padding: 2px 5px;
  }
  .apiUrlSpan{
    padding: 2px 10px;
    margin: 0 20px;
    border: 1px solid #f1f1f1;
  }
  .apiServerList{
    float: right;
  }
  .viewJSONTree{
    position: absolute;
    right:100px;
    top:5px;
    z-index: 10;
  }
  .shareApi{
    position: absolute;
    right:170px;
    top:5px;
    z-index: 10;
  }
  .saveApi{
    position: absolute;
    right: 24px;
    top: 10px;
    z-index: 10;
    font-size: 12px;
  }
  .breadcrumbApi{
    display: inline-block;
    border: 1px solid #ccc;
    padding: 3px 5px;
    vertical-align: middle;
    margin-bottom: 2px;
    cursor: pointer;
    margin-right: 60px;
  }
  .editorContainer {
    width: 98%;
    height: 500px;
    border: 1px solid #ddd;
    margin: auto;
  }
</style>
