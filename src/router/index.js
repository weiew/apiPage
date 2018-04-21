import Vue from 'vue'
import Router from 'vue-router'
import mainWrap from '@/components/mainWrap'
import login from '@/components/login'
import api from '@/components/api'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainWrap',
      component: mainWrap
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      component: mainWrap,
      children: [
        { path: '/api/:id', component: api, name: '接口' }
      ]
    }
  ]
})
