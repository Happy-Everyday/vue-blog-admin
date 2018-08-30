<template>
    <div id='login-form'>
        <el-form ref="form" :model="form" label-width="50px">
            <el-form-item label="帐号">
                <el-input v-model="form.account" placeholder="请输入帐号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">立即登录</el-button>
        </el-form>
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
            this.$router.push('/layout')
        }
    }
}

</script>
<style lang='scss' scoped>
   @import '@/assets/scss/login.scss';
</style>
