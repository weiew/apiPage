<template>
  <el-container>
    <el-header>
      <mainHead></mainHead>
    </el-header>
    <el-container>
      <el-aside width="210px" style="position: fixed;">
        <el-menu
          :default-active='activeNav'
          class="el-aside-menu"
          :router="true"
          background-color="#f7fafb"
          text-color="#606978"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets" style="color: #000"></i>
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
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-container>
        <el-main v-bind:style="{ 'height': mainHeight + 'px'}">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" id="middleContainer" mode="out-in" >
                <router-view>
                </router-view>
              </transition>
            </el-col>
          </div>
        </el-main>
<!--        <el-footer>
          <p>Footer</p>
        </el-footer>-->
      </el-container>
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
      projectList:[],
      activeNav: 'dashboard',
      mainHeight:'',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getMainHeight (){
      this.mainHeight = window.screen.availHeight-70;
    },
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
  mounted() {
    let that = this;
    that.getMainHeight();
    window.onresize = that.getMainHeight;
    this.activeNav = this.$route.path.match(/\/[^\/]*\/([^\/]*)/)[0];
  },
  created() {
    if(!sessionStorage.getItem("account")){
      this.$router.push({path: '/login'});
    }else if(location.hash == "#/"){
      this.$router.push({path: '/dashboard'});
    }
    this.initProject();
  }
}
</script>
<style type="text/scss">
  .el-aside-menu li.el-menu-item{
    width: 80%;
    margin: auto;
    border-radius: 5px;
    margin-bottom: 5px;
    height: 40px;
    line-height: 40px;
  }
  .el-aside-menu li.el-menu-item.is-active{
    background: #24292e !important;
    color: #fff !important;
    box-shadow: 2px 2px 2px #ccc;
  }
  .el-aside-menu .el-submenu__title{
    background: #ededed !important;
    color: #24292e !important;
  }
  .el-aside-menu .el-menu-item-group__title{
    padding: 0;
  }
</style>
<style lang="scss" type="text/scss">
  .el-header{
    position: fixed;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .el-aside {
    text-align: left;
    background: #f7fafb;
    box-shadow: 2px 2px 2px #eee;
    position: absolute;
    z-index: 8;
    top: 60px;
    padding-top: 20px;
    bottom: 0;
  }
  .el-aside-menu{
    border: none;
  }
  .el-aside-menu a{
    color: #606978;
    text-decoration: none;
  }
  .el-main{
    padding: 70px 10px 10px 220px;
    background: #ededed;
  }
  .el-footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0;
    background: #f7fafb;
  }
</style>
