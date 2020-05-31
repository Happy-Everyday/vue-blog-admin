import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login'
import layout from '@/pages/layout'

import home from '@/pages/index'

import articleAdd from '@/pages/article/add'
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
                meta: {
                    title: '首页'
                },
                component: home,
            },
            {
                path: '/article-add',
                name: 'articleAdd',
                meta: {
                    title: '首页'
                },
                component: articleAdd,
            },
            {
                path: '/article-list',
                name: 'articleList',
                meta: {
                    title: '文章列表'
                },
                component: articleList,
            },
            {
                path: '/article-drafts',
                name: 'articleDrafts',
                meta: {
                    title: '草稿箱'
                },
                component: articleDrafts,
            },
            {
                path: '/article-recycle',
                name: 'articleRecycle',
                meta: {
                    title: '回收站'
                },
                component: articleRecycle,
            }
        ] 
    }
  ]
})
