<template>
  <el-container id="mainWrapContainer">
    <el-aside width="210px">
      <el-menu
        default-active="2"
        class="el-aside-menu"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="/api">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>运营平台</span>
          </template>
          <el-menu-item-group>
            <template slot="title">应收管理</template>
            <el-menu-item index="/api/a0001">待处理流水</el-menu-item>
            <el-menu-item index="/api/a0002">已处理流水</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-menu
          class="el-header-menu"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">我的工作台</el-menu-item>
          <el-submenu index="2">
            <template slot="title">账号</template>
            <el-menu-item index="/login">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" id="middleContainer" mode="out-in" >
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
      <el-footer>
        <p>Footer</p>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'mainWrap',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
  .el-header {
    color: #333;
    text-align: right;
    line-height: 30px;
    height: 30px !important;
    background: #545c64;
  }
  .el-header-menu{
    height: 30px !important;
    float: right;
  }
  .el-header-menu .el-menu-item{
    height: 30px !important;
    line-height: 30px !important;
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
