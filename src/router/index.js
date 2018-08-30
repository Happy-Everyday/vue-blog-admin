import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login'
import layout from '@/pages/layout'

import home from '@/pages/index'

import articleList from '@/pages/article/list'
import articleDrafts from '@/pages/article/drafts'
import articleRecycle from '@/pages/article/recycle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
        path: '/layout',
        component: layout,
        children: [
            {
                path: '/',
                name: 'home',
                component: home,
            },
            {
                path: '/article-list',
                name: 'articleList',
                component: articleList,
            },
            {
                path: '/article-drafts',
                name: 'articleDrafts',
                component: articleDrafts,
            },
            {
                path: '/article-recycle',
                name: 'articleRecycle',
                component: articleRecycle,
            }
        ] 
    }
  ]
})
