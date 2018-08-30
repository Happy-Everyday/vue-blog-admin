import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'

import layout from '@/pages/layout'


import articleList from '@/pages/article/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
        path: '/article',
        component: layout,
        children: [
            {
                path: '/',
                name: 'articleList',
                component: articleList,
            }
        ] 
    }
  ]
})
