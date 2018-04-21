import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import login from '@/components/login'
import api from '@/components/api'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      hidden: true,
      component: main,
      children: [
        { path: '/api/:id',component: api, name: '接口' }
      ]
    },
  ]
})
