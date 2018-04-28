import Vue from 'vue'
import Router from 'vue-router'
import mainWrap from '@/components/mainWrap'
import login from '@/components/login'
import register from '@/components/register'
import forget from '@/components/forget'
import api from '@/components/api'
import myProject from '@/components/myProject'
import helloWorld from '@/components/helloWorld'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainWrap',
      component: mainWrap
    },
    {
      path: '/helloWorld',
      name: 'helloWorld',
      component: helloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/',
      component: mainWrap,
      children: [
        { path: '/api/:id', component: api, name: '接口' },
        { path: '/myProject', component: myProject, name: '我的项目' }
      ]
    }
  ]
})
