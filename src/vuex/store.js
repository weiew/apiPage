import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)
// 应用初始状态
const state = {
  token: '',
  userInfo:{}
}
// 定义所需的 mutations
const mutations = {
  SETTOKEN(state,payload){
    state.token=payload.token;
  },
  SAVEUSERINFO(state,payload){
    state.userInfo=payload;
  },
  LOGOUT(state){
    state.userInfo={};
    state.token="";
  },
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
