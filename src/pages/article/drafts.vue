<template>
    <div id="article-list" v-loading="loading">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="文章名称">
                <el-input v-model="formInline.articleTitle" placeholder="文章名称"></el-input>
            </el-form-item>
            <el-form-item label="文章类别">
                <el-select v-model="formInline.articleType" placeholder="全部">
                <el-option label="编程" value="code"></el-option>
                <el-option label="文章" value="article"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="articleList"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="文章名称"
                prop="articleTitle"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="articleTypeName"
                label="文章类别"
                width="120">
            </el-table-column>
            <el-table-column
                prop="articleCreatedTime"
                label="创建时间"
                width="240">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="300">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="success"
                    @click="handlePublich(scope.row)">发布</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">移至回收站</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

  import { _axios } from '../../middleware/axios'
  const moment = require('moment')
  export default {
    data() {
      return {
        loading: false,
        formInline: {
          articleTitle: '',
          articleType: ''
        },
        pageSize: 10,
        currentPage: 1,
        total: 0,
        articleList: [],
        multipleSelection: []
      }
    },
    created (){
        this.initArticleList()
    },
    methods: {
        initArticleList () {
            this.loading = true
            let params = {
                articleTitle: this.formInline.articleTitle,
                articleType: this.formInline.articleType,
                articleStatus: '0',
                pageSize: this.pageSize,
                currentPage: this.currentPage
            }
            _axios('api/getArticleList', 'GET', params).then(res => {
                let data = res
                this.loading = false
                if (data.code == '000000') {
                    this.articleList = data.data.articleList
                    this.articleList.forEach(item => {
                        item.articleCreatedTime = moment(item.articleCreatedTime).format('YYYY-MM-DD HH:mm:ss')
                    })
                    this.total = data.data.total
                } else {
                    this.$message.error('操作失败')
                }
            })  
        },
        search() {
            this.currentPage = 1
            this.initArticleList()
            console.log(this.formInline)
        },
        reset() {
            this.formInline.articleTitle = ''
            this.formInline.articleType = ''
            this.formInline.timeRange = ''
            this.currentPage = 1
            this.initArticleList()
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
            this.initArticleList()
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.initArticleList()
            console.log(`当前页: ${val}`);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            console.log(this.multipleSelection)
        },
        handlePublich(data) {
            let articleObj = data
            this.$confirm('确认发布？')
            .then(_ => {
                articleObj.articleStatus = '1'
                if (articleObj.articleType == 'code') {
                    articleObj.articleTypeName = '编程'
                } else if (articleObj.articleType == 'article') {
                    articleObj.articleTypeName = '文章'
                }
                _axios('api/updateArticle', 'POST', articleObj).then(res => {
                    let data = res
                    this.loading = false
                    if (data.code == '000000') {
                        this.$message({
                            message: '发布成功',
                            type: 'success'
                        })
                        this.initArticleList()
                    } else {
                        this.$message.error('操作失败')
                    }
                })
            })
            .catch(_ => {})
        },
        handleEdit(data) {
            console.log(data)
        },
        handleDelete(data) {
            let articleObj = data
            this.$confirm('确认移至回收站？')
            .then(_ => {
                articleObj.articleStatus = '2'
                if (articleObj.articleType == 'code') {
                    articleObj.articleTypeName = '编程'
                } else if (articleObj.articleType == 'article') {
                    articleObj.articleTypeName = '文章'
                }
                _axios('api/updateArticle', 'POST', articleObj).then(res => {
                    let data = res
                    this.loading = false
                    if (data.code == '000000') {
                        this.$message({
                            message: '移动成功',
                            type: 'success'
                        })
                        this.initArticleList()
                    } else {
                        this.$message.error('操作失败')
                    }
                })
            })
            .catch(_ => {})
        }
    }
  }
</script>
<style lang='scss'>
@import "@/assets/scss/articles/list.scss";
</style>