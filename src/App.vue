<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .titleA{
    text-align: left;
    border-bottom: 1px solid #cccc;
    color: #868686;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  .titleB{
    text-align: left;
    color: #ffffff;
    background: #545c64;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  .titleC{
    text-align: center;
    color: #ffffff;
    background: #545c64;
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 10px 10px 0 0;
  }
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
