<template>
  <el-container id="mainWrapContainer">
    <el-aside width="210px">
    <img src="http://e.weiew.net/images/logo.png" style="margin-bottom:10px">

      <el-menu
        default-active="2"
        class="el-aside-menu"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>我的项目</span>
          </template>
          <div v-for="(item,key) in projectList">
            <el-menu-item-group v-if="!item.child">
              <el-menu-item :index="'/project/'+item.id">{{item.name}}</el-menu-item>
            </el-menu-item-group>
            <el-submenu :index="item.id" v-if="item.child">
              <template slot="title">
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="(itemChild,keyChild) in item.child" :index="'/project/'+itemChild.id">{{itemChild.name}}</el-menu-item>
            </el-submenu>
          </div>

<!--          <el-submenu index="1-1">
            <template slot="title">
              <span>应收管理</span>
            </template>
            <el-menu-item index="/api/a0001">待处理流水</el-menu-item>
            <el-menu-item index="/api/a0002">已处理流水</el-menu-item>
          </el-submenu>
          <el-submenu index="1-1">
            <template slot="title">
              <span>应收管理2</span>
            </template>
            <el-menu-item index="/api/a0001">待处理流水</el-menu-item>
            <el-menu-item index="/api/a0002">已处理流水</el-menu-item>
          </el-submenu>-->
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-share"></i>
            <span>我的好友</span>
          </template>
          <el-submenu index="2-1">
            <span slot="title">同事</span>
            <el-menu-item index="/team/a0003">李里仁</el-menu-item>
            <el-menu-item index="/team/a0004">赵山伟</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <mainHead :refreshProject="initProject"></mainHead>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" id="middleContainer" mode="out-in" >
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
      <el-footer style="display: none">
        <p>Footer</p>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
  import api from '../api/api';
  import mainHead from '@/components/mainHead'
export default {
  components:{mainHead:mainHead},
  name: 'mainWrap',
  data () {
    return {
      projectList:[]
    }
  },
  methods: {
    initProject(){
      let postData = {
        ownerId: sessionStorage.getItem("account")
      }
      api.post('api/project/list')(postData).then((data) => {
        if(data.code == "200"){
          this.projectList = data.dto;
        }else{
          console.log(data.error);
        }
      })
    },
    codemirrorChange: function () {

    }
  },
  created() {
    if(!sessionStorage.getItem("account")){
      this.$router.push({path: '/login'});
    }
    this.initProject();
  }
}
</script>

<style lang="scss" type="text/scss">
  #mainWrapContainer{
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  #middleContainer{
    padding-bottom: 60px;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 30px !important;
    line-height: 30px !important;
  }
  .el-aside-menu{
    border: none;
  }
  .el-aside {
    text-align: left;
    background: #545c64;
    overflow: hidden;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0;
    background: #f1f1f1;
  }
</style>
