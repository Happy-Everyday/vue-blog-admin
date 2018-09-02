<template>
    <div id="layout">
        <el-container>
            <el-header><img src="@/assets/logo.png" alt="logo"><span>My Heart, My Words</span></el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu :default-active="defaultActiveMenuIndex" :default-openeds="defaultOpendsMenuIndexs">
                        <el-menu-item index='1' @click='toHome'><i class="el-icon-menu"></i>首页</el-menu-item>
                        <el-submenu :key='menu.id' :index="index + 2 + ''" v-for="(menu, index) in menuList">
                            <template slot="title"><i :class="menu.icon"></i>{{menu.title}}</template>
                            <el-menu-item :key='menuChild.id' :index="(index + 2) + '-' + (num + 1)" v-for="(menuChild, num) in menu.children" @click="goTo(menuChild.url)">{{menuChild.title}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main><router-view/></el-main>
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
                defaultActiveMenuIndex: "1",
                defaultOpendsMenuIndexs: ["1"],
                menuList: [
                    {
                        id: '1',
                        title: '文章管理',
                        icon: 'el-icon-document',
                        children: [
                            {
                                id: '11',
                                title: '写文章',
                                url: '/article-add'
                            },
                            {
                                id: '12',
                                title: '文章列表',
                                url: '/article-list'
                            },
                            {
                                id: '13',
                                title: '草稿箱',
                                url: '/article-drafts'
                            },
                            {
                                id: '14',
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
            let defaultActiveFirstMenuIndex = 0
            let defaultActiveSecondMenuIndex = 0
            if (path === '/layout') {
                this.defaultActiveMenuIndex = '1'
                this.defaultOpendsMenuIndexs = []
            } else {
                this.menuList.forEach((item, index) => {
                    if (item.children.length > 0) {
                        item.children.forEach((ele, num) => {
                            if (ele.url === path) {
                                defaultActiveFirstMenuIndex = index
                                defaultActiveSecondMenuIndex = num
                            }
                        })
                    }
                })
                this.defaultActiveMenuIndex = (defaultActiveFirstMenuIndex + 2) + '-' + (defaultActiveSecondMenuIndex + 1)
                this.defaultOpendsMenuIndexs = [ defaultActiveFirstMenuIndex + 2 + '']
            }
        },
        mounted () {
        },
        methods: {
            toHome() {
                this.$router.push('/layout')
            },
            goTo(route) {
                this.$router.push(route)
            }
        }
    }

</script>
<style lang='scss'>
    @import '@/assets/scss/layout.scss';
</style>