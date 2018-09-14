<template>
    <div id='login-form'>
        <el-form ref="form" :model="form" label-width="50px">
            <el-form-item label="帐号">
                <el-input v-model="form.account" placeholder="请输入帐号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form>
    </div>
</template>
<script>

import { _axios } from '../middleware/axios'

export default {

    components: {
    },
    props: {
    },
    data () {
        return {
            form: {
                account: '',
                password: ''
            }
        }
    },
    created () {},
    mounted () {},
    methods: {
        onSubmit() {
            _axios('api/loginin', 'POST', {
                account: this.form.account,
                password: this.form.password
            }).then(res => {
                if (res.code != '000000') {
                    this.$message.error(res.msg)
                    return
                }
                this.$router.push('/layout')
            })
        }
    }
}

</script>
<style lang='scss' scoped>
   @import '@/assets/scss/login.scss';
</style>
