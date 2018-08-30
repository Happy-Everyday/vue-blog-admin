<template>
    <div id="layout">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu :default-active="'1'">
                        <el-menu-item index='1'><i class="el-icon-menu"></i>首页</el-menu-item>
                        <!-- <el-submenu index="1" >
                            <template slot="title"><i class="el-icon-menu"></i>首页</template>
                        </el-submenu> -->
                        <el-submenu :key='menu.id' :index="index + 2 + ''" v-for="(menu, index) in menuList">
                            <template slot="title"><i :class="menu.icon"></i>{{menu.title}}</template>
                            <el-menu-item :key='menuChild.id' :index="(index + 2) + '-' + (num + 1)" v-for="(menuChild, num) in menu.children">{{menuChild.title}}</el-menu-item>
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
                menuList: [
                    {
                        id: '1',
                        title: '文章管理',
                        icon: 'el-icon-document',
                        children: [
                            {
                                id: '11',
                                title: '选项1',
                                url: '选项1'
                            },
                            {
                                id: '12',
                                title: '选项2',
                                url: '选项2'
                            }
                        ]
                    }
                ]
            }
        },
        created () {

        },
        mounted () {
        },
        methods: {
        }
    }

</script>
<style lang='scss'>
    @import '@/assets/scss/layout.scss';
</style>