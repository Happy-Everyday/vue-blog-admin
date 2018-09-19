<template>
    <div id="editor" v-loading="loading">
        <div class="add-article-form">
            <el-form ref="form" :model="form" label-width="100px" label-position="left">
                <el-form-item label="文章名称：">
                    <el-input v-model="form.articleTitle" placeholder="请输入文章名称"></el-input>
                </el-form-item>
                <el-form-item label="文章类别：">
                    <el-select v-model="form.articleType" placeholder="文章类别">
                        <el-option label="日记" value="diary"></el-option>
                        <el-option label="文章" value="article"></el-option>
                    </el-select>              
                </el-form-item>
            </el-form>
        </div>
        <mavon-editor style="height: 100%" :value='textValue' @change="changeValue"></mavon-editor>
        <div class="button-group">
            <el-button type="success" @click='publich'>发布</el-button>
            <el-button type="primary" @click='save'>保存至草稿箱</el-button>
            <el-button type="danger"  @click='deletAll'>全部重置</el-button>
        </div>
    </div>
</template>
<script>

    import { _axios } from '../../middleware/axios'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {

        components: {
            mavonEditor
        },
        props: {
        },
        data () {
            return {
                loading:false,
                form: {
                    articleTitle: '',
                    articleType: ''
                },
                textValue: '',
                textRender: ''
            }
        },
        created () {
        },
        mounted () {
        },
        methods: {
            changeValue(value, render) {
                this.textValue = value
                this.textRender = render
            },  
            publich() {
                if (this.form.articleTitle == '') {
                    this.$message.error('文章名称不能为空')
                    return
                }
                if (this.form.articleType == '') {
                    this.$message.error('请选择文章类别')
                    return
                }
                if (this.textValue == '') {
                    this.$message.error('文章内容不能为空')
                    return
                }
                this.$confirm('确认发布？')
                .then(_ => {
                    let articleObj = {
                        articleImgUrl: '',
                        articleTitle: this.form.articleTitle,
                        articleType:  this.form.articleType,
                        articleText: this.textValue,
                        articleRender: this.textRender,
                        articleStatus: '1'
                    }
                    if (articleObj.articleType == 'diary') {
                        articleObj.articleTypeName = '日记'
                    } else if (articleObj.articleType == 'article') {
                        articleObj.articleTypeName = '文章'
                    }
                    this.loading = true
                    _axios('api/addArticle', 'post',articleObj).then(res => {
                        let data = res
                        this.loading = false
                        if (data.code == '000000') {
                            this.$message({
                                message: '发布成功！',
                                type: 'success'
                            })
                            this.form.articleTitle = ''
                            this.form.articleType = ''
                            this.textValue = ''
                            this.textRender = ''
                        } else {
                            this.$message.error('操作失败！')
                        }
                        
                    })
                })
                .catch(_ => {})
            },
            save() {
                if (this.form.articleTitle == '') {
                    this.$message.error('文章名称不能为空！')
                    return
                }
                if (this.form.articleType == '') {
                    this.$message.error('请选择文章类别！')
                    return
                }
                if (this.textValue == '') {
                    this.$message.error('文章内容不能为空！')
                    return
                }
                this.$confirm('保存至草稿箱？')
                .then(_ => {
                    let articleObj = {
                        articleImgUrl: '',
                        articleTitle: this.form.articleTitle,
                        articleType:  this.form.articleType,
                        articleText: this.textValue,
                        articleRender: this.textRender,
                        articleStatus: '0'
                    }
                    if (articleObj.articleType == 'code') {
                        articleObj.articleTypeName = '编程'
                    } else if (articleObj.articleType == 'article') {
                        articleObj.articleTypeName = '文章'
                    }
                    this.loading = true
                    _axios('api/addArticle', 'post', articleObj).then(res => {
                        let data = res
                        this.loading = false
                        if (data.code == '000000') {
                            this.$message({
                                message: '成功保存至草稿箱！',
                                type: 'success'
                            })
                            this.form.articleTitle = ''
                            this.form.articleType = ''
                            this.textValue = ''
                            this.textRender = ''
                        } else {
                            this.$message.error('操作失败！')
                        }
                        
                    })
                })
                .catch(_ => {})
            },
            deletAll() {
                this.$confirm('全部重置？')
                .then(_ => {
                    this.form.articleTitle = ''
                    this.form.articleType = ''
                    this.textValue = ''
                    this.textRender = ''
                })
                .catch(_ => {})
            }
        }
    }

</script>
<style lang='scss' scoped>
    @import '@/assets/scss/articles/add.scss';
</style>