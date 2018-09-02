<template>
    <div id="article-list" v-loading="loading">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="文章名称">
                <el-input v-model="formInline.articleName" placeholder="文章名称"></el-input>
            </el-form-item>
            <el-form-item label="时间">
                <el-select v-model="formInline.timeRange" placeholder="全部">
                <el-option label="近一周" value="week"></el-option>
                <el-option label="近一个月" value="month"></el-option>
                <el-option label="近三个月" value="threeMonth"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
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
                prop="articleType"
                label="文章类别"
                width="120">
            </el-table-column>
            <el-table-column
                prop="articleCreatedTime"
                label="创建时间"
                width="240">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="200">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
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

  import axios from 'axios'
  export default {
    data() {
      return {
        loading: false,
        currentPage: 1,
        formInline: {
          articleTitle: '',
          timeRange: ''
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
                pageSize: this.pageSize,
                currentPage: this.currentPage
            }
            axios.get('http://localhost:8888/api/getArticleList', {params: params}).then(res => {
                let data = res.data
                this.loading = false
                if (data.code == '000000') {
                    this.articleList = data.data.articleList
                    this.total = data.data.total
                } else {
                    this.$message.error('操作失败')
                }
            })  
        },
        search() {
            this.initArticleList()
            console.log(this.formInline)
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 0
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
        handleEdit(data) {
            console.log(data)
        },
        handleDelete(data) {
            console.log(data)
        }
    }
  }
</script>
<style lang='scss'>
@import "@/assets/scss/articles/list.scss";
</style>