<template>
	<span class="tree-expand">
		<span class="codeName codeNameEdit tree-label" v-show="DATA.isEdit">
			<el-input class="edit" size="mini" autofocus
			v-model="DATA.codeName"
			:ref="'treeInput'+DATA.id"
			@click.stop.native="nodeEditFocus"
			@blur.stop="nodeEditPass(STORE,DATA,NODE)"
			@keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"></el-input>
		</span>
		<span v-show="!DATA.isEdit"
		:class="'codeName ' + [DATA.id > maxexpandId ? 'tree-new tree-label' : 'tree-label']">
			<span>{{DATA.codeName}}</span>
		</span>
    <span class="codeType" v-show="!DATA.isEdit">{{DATA.codeType}}</span>
    <span class="codeType codeTypeEdit" v-show="DATA.isEdit">
      <el-select v-model="DATA.codeType" size="mini">
        <el-option
          v-for="item in codeTypeSelect"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </span>

    <span class="codeNeed" v-show="!DATA.isEdit">{{DATA.codeNeed=='Y'?'是':'否'}}</span>
    <span class="codeNeed codeNeedEdit" v-show="DATA.isEdit">
      <el-select v-model="DATA.codeNeed" size="mini">
        <el-option
          v-for="item in codeNeedSelect"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </span>

    <span class="codeExample" v-show="!DATA.isEdit">{{DATA.codeExample}}</span>
    <span class="codeExample codeExampleEdit tree-label" v-show="DATA.isEdit">
			<el-input class="edit" size="mini" autofocus
                @click.stop.native="nodeEditFocus"
                @blur.stop="nodeEditPass(STORE,DATA,NODE)"
                @keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"
                v-model="DATA.codeExample"></el-input>
		</span>

    <span class="codeValue" v-if="DATA.codeValue && !DATA.children" v-show="!DATA.isEdit">
      <el-dropdown>
        <span class="el-dropdown-link">
          选项值<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  v-for="item in DATA.codeValue">{{item.code}} - {{item.value}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
    <span v-show="DATA.isEdit" style="width: 220px;display: inline-block"></span>
    <span v-show="DATA.isEdit" v-if="!DATA.children"
          @click.stop.native="nodeEditFocus"
          @blur.stop="nodeEditPass(STORE,DATA,NODE)"
          @keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"
          class="codeValueEdit">
      <span>
        选项值配置
        <el-checkbox v-model="DATA.hasCodeValue"
                     @click.stop.native="nodeEditFocus"
                     @blur.stop="nodeEditPass(STORE,DATA,NODE)"
                     @keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)">

        </el-checkbox>
      </span>
      <span class="codeValueEditList" v-for="item in DATA.codeValue">
        <el-input class="codeValue_code" size="mini"
                  @click.stop.native="nodeEditFocus"
                  @blur.stop="nodeEditPass(STORE,DATA,NODE)"
                  @keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"
                  v-model="item.code"></el-input>
        -
        <el-input class="codeValue_value" size="mini"
                  @click.stop.native="nodeEditFocus"
                  @blur.stop="nodeEditPass(STORE,DATA,NODE)"
                  @keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"
                  v-model="item.value"></el-input>
			  <i class="el-icon-delete" @click.stop="codeValueDelete(STORE,DATA,NODE)"></i>
			  <i class="el-icon-plus" @click.stop="codeValueAdd(STORE,DATA,NODE)"></i>
      </span>
    </span>

    <span class="codeTips" v-show="!DATA.isEdit">{{DATA.codeTips}}</span>
    <span class="codeTips codeTipsEdit tree-label" v-show="DATA.isEdit">
			<el-input class="edit" size="mini" autofocus
                @click.stop.native="nodeEditFocus"
                @blur.stop="nodeEditPass(STORE,DATA,NODE)"
                @keyup.enter.stop.native="nodeEditPass(STORE,DATA,NODE)"
                v-model="DATA.codeTips"></el-input>
		</span>
    <span class="lastEditTime">{{DATA.lastEditTime}}</span>
		<span class="tree-btn" v-show="!DATA.isEdit">
			<i class="el-icon-plus" @click.stop="nodeAdd(STORE,DATA,NODE)"></i>
			<i class="el-icon-edit" @click.stop="nodeEdit(STORE,DATA,NODE)"></i>
			<i class="el-icon-delete" @click.stop="nodeDel(STORE,DATA,NODE)"></i>
		</span>
		<span class="tree-btn" v-show="DATA.isEdit">
			<i class="_cancel" @click.stop="nodeEditCancel(STORE,DATA,NODE)">取消</i>
			<i class="_finish" @click.stop="nodeEditFinish(STORE,DATA,NODE)">完成</i>
		</span>
	</span>
</template>

<script>
	export default{
		name: 'treeExpand',
    data (){
      return {
        codeTypeData:{
          S:'字符串',
          N:'数字',
          A:'数组',
          O:'对象',
          B:'布尔型'
        },
        codeTypeSelect:[
          {value:'S',label:'String-字符串'},
          {value:'N',label:'Number-数字'},
          {value:'O',label:'Object-对象'},
          {value:'A',label:'Array-数组'},
          {value:'B',label:'Boolean-布尔型'}
        ],
        codeNeedSelect:[
          {value:'Y',label:'是'},
          {value:'N',label:'否'}
        ]
      }
    },
		props: ['NODE', 'DATA', 'STORE', 'maxexpandId'],
		methods: {
			nodeAdd(s,d,n){//新增
				this.$emit('nodeAdd',s,d,n)
			},
			nodeEdit(s,d,n){//编辑
				d.isEdit = true;
				this.$nextTick(() => {
					this.$refs['treeInput'+d.id].$refs.input.focus()
				})
				this.$emit('nodeEdit',s,d,n)
			},
			nodeDel(s,d,n){//删除
				this.$emit('nodeDel',s,d,n)
			},
			nodeEditPass(s,d,n){//焦点移出，编辑自动取消
				//d.isEdit = false;
			},
      nodeEditCancel(s,d,n){//编辑取消
				d.isEdit = false;
        this.$message({message: "你要为自己的行为负责任,这个取消无效的，我笑了，哈哈"});
			},
			nodeEditFinish(s,d,n){//编辑完成
				d.isEdit = false;
			},
			nodeEditFocus(){
				//阻止点击节点的事件冒泡
			},
      codeValueAdd(){
				//添加codeValue
			},
      codeValueDelete(){
        //删除codeValue
			},
		}
	}
</script>

<style>
  .el-tree--highlight-current .el-tree-node.is-current{
    background: #fffaeb;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background: #fffaeb;
  }
  .el-tree--highlight-current .el-tree-node.is-current :hover{
    background: #fffaeb;
  }
  .el-tree-node>.el-tree-node__children{
    overflow: visible;
  }
  .el-tree-node__content:hover{
    background: none;
  }
  .el-tree-node{
    background: #fff;
    padding: 6px 0;
    border-top: 1px solid #f6f7f8;
    font-size: 14px;
  }
	.tree-expand{
    position: relative;
    width: 100%;
    text-align: left;
    line-height: 26px;
	}
	.tree-expand .tree-label.tree-new{
		font-weight:600;
	}
	.tree-expand .tree-label{
		font-size:0.9em;
	}
	.tree-expand .tree-label .edit{
		width:80%;
	}
	.tree-expand .tree-btn{
    margin-right: 20px;
    position: absolute;
    right: 0;
	}
	.tree-expand .tree-btn i{
		color:#8492a6;
		font-size:0.9em;
		margin-right:3px;
	}
  .codeName,.codeExample,.codeType,.codeNeed,.codeValue,.codeTips,.lastEditTime{
    display: inline-block;
  }
  .codeName{
    width: 250px;
  }
  .codeNameEdit{
    width: 200px;
  }
  .codeExample{
    width: 150px;
    padding-left: 10px;
  }
  .codeType{
    border-right: 1px dashed #e0e0e0;
    padding-right: 5px;
  }
  .codeTypeEdit{
    position: relative;
    z-index: 1000;
    width: 130px;
  }
  .codeTypeSelect b{
    color: #068bec !important;
  }
  .codeNeed{
    padding-right: 5px;
  }
  .codeNeedEdit{
    width: 60px;
  }
  .codeValue{

  }
  .codeValueEdit{
    width: 220px;
    display: inline-block;
    position: absolute;
    margin-left: -240px;
    background: #f1f1f1;
    padding: 10px;
    top: 0;
    z-index: 1000;
  }
  .codeValueEditList{
    width: 100%;
    display: block;
    margin-bottom: 5px;
  }
  .codeValue_code{
    width: 40%;
  }
  .codeValue_value{
    width: 40%;
  }
  .codeTips{
    width: 100px;
    padding-left: 10px;
  }
  .lastEditTime{
    position: absolute;
    right: 100px;
    font-size: 12px;
    color: #999999;
  }
  ._cancel{
    font-size: 12px !important;
    color: #ccc !important;
    font-style: normal;
  }
  ._finish{
    font-size: 12px !important;
    color: #1886fb !important;
    font-style: normal;
  }
</style>
