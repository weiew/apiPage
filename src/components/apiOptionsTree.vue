<template>
	<span class="tree-expand">
		<span class="codeName tree-label" v-show="DATA.isEdit">
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
    <span class="codeType">{{DATA.codeType}}</span>
    <span class="codeNeed">{{DATA.codeNeed=='Y'?'是':'否'}}</span>
    <span class="codeExample">{{DATA.codeExample}}</span>
    <span class="codeValue" v-if="DATA.codeValue">
      <el-dropdown>
        <span class="el-dropdown-link">
          选项值<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  v-for="item in DATA.codeValue">{{item.code}} - {{item.value}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
    <span class="codeTips">{{DATA.codeTips}}</span>
    <span class="lastEditTime">{{DATA.lastEditTime}}</span>
		<span class="tree-btn" v-show="!DATA.isEdit">
			<i class="el-icon-plus" @click.stop="nodeAdd(STORE,DATA,NODE)"></i>
			<i class="el-icon-edit" @click.stop="nodeEdit(STORE,DATA,NODE)"></i>
			<i class="el-icon-delete" @click.stop="nodeDel(STORE,DATA,NODE)"></i>
		</span>
	</span>
</template>

<script>
	export default{
		name: 'treeExpand',
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
			nodeEditPass(s,d,n){//编辑完成
				d.isEdit = false;
			},
			nodeEditFocus(){
				//阻止点击节点的事件冒泡
			},
		}
	}
</script>

<style>
  .el-tree-node{
    background: #fff;
    padding: 6px 0;
    border-top: 1px solid #f6f7f8;
    font-size: 14px;
  }
	.tree-expand{
		overflow:hidden;
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
  .codeExample{
    width: 150px;
    padding-left: 10px;
  }
  .codeType{
      border-right: 1px dashed #e0e0e0;
    padding-right: 5px;
  }
  .codeNeed{
    padding-right: 5px;
  }
  .codeValue{

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
</style>
