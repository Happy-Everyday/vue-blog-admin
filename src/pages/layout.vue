<template>
    <div id="layout">
        <el-container>
            <el-header>
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">文章管理</template>
                        <el-menu-item index="2-1">文章列表</el-menu-item>
                        <el-menu-item index="2-2">写文章</el-menu-item>
                        <el-menu-item index="2-3">草稿箱</el-menu-item>
                        <el-menu-item index="2-4">回收站</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3" disabled>消息中心</el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-main>
                    <div v-if="pageHeaderTitle != '首页'">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>{{pageHeaderTitle}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>

    export default {

        components: {
        },
        props: {
        },
        data () {
            return {
                activeIndex: '1',
                pageHeaderTitle: '首页',
                menuList: [
                    {
                        id: '2',
                        title: '文章管理',
                        icon: 'el-icon-document',
                        children: [
                            {
                                id: '2-1',
                                title: '文章列表',
                                url: '/article-list'
                            },
                            {
                                id: '2-2',
                                title: '写文章',
                                url: '/article-add'
                            },
                            {
                                id: '2-3',
                                title: '草稿箱',
                                url: '/article-drafts'
                            },
                            {
                                id: '2-4',
                                title: '回收站',
                                url: '/article-recycle'
                            }
                        ]
                    }
                ]
            }
        },
        created () {
            let path = this.$route.path
            let activeIndex = '1'
            let pageHeaderTitle = '首页'
            if (path === '/layout') {
                this.activeIndex = '1'
            } else {
                this.menuList.forEach((item, index) => {
                    if (item.children.length > 0) {
                        item.children.forEach((ele, num) => {
                            if (ele.url == path) {
                                activeIndex = ele.id
                                pageHeaderTitle = this.$route.meta.title
                            }
                        })
                    }
                })
            }
            this.activeIndex = activeIndex
            this.pageHeaderTitle = pageHeaderTitle
        },
        mounted () {
        },
        methods: {
            handleSelect(key, keyPath) {
                switch (key) {
                    case '1':
                        this.$router.push('/layout')
                        this.pageHeaderTitle = '首页'
                        break;
                    case '2-1':
                        this.$router.push('/article-list')
                        this.pageHeaderTitle = '文章列表'
                        break;
                    case '2-2':
                        this.$router.push('/article-add')
                        this.pageHeaderTitle = '写文章'
                        break;
                    case '2-3':
                        this.$router.push('/article-drafts')
                        this.pageHeaderTitle = '草稿箱'
                        break;
                    case '2-4':
                        this.$router.push('/article-recycle')
                        this.pageHeaderTitle = '回收站'
                        break;
                    case '3':
                        this.$message({
                            showClose: true,
                            message: '消息功能暂未开放，敬请期待！',
                            type: 'warning'
                        });
                        break;
                }
            },
            goBack () {}
        }
    }

</script>
<style lang='scss'>
    @import '@/assets/scss/layout.scss';
</style>