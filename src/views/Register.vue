<template>
  <div class="container">
      <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type"/>
      <div class="register">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field label="确认密码" placeholder="请输入确认密码" type="password" v-model="password2"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="mobile"></mt-field>
        <mt-button size="large" style="background-color: #fb7299;" type="primary" @click="reg()">注册</mt-button>
      </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Field, Button, Toast  } from 'mint-ui';
  import HeaderTop from '../components/HeaderTop';
  import 'mint-ui/lib/style.css'
//   const axios = require('axios');

  Vue.component(Field.name, Field);
  Vue.component(Button.name, Button);
  export default {
    name:'',
    components: {
        HeaderTop
    },
    data(){
        return{
            tabs:[{name:'注册账号',path:''}],
            bgColor:'#fb7299',
            value:false,
            type:'back',
            username:'',
            width:'',
            password:'',
            password2:'',
            mobile:''
        }
    },
    methods:{
        reg(){
            this.axios.post('register',{
                username:this.username,
                password:this.password,
                password2:this.password2,
                mobile:this.mobile
            }).then((response) => {
                //当请求成功才会触发
                if(response.data.ok){
                    Toast({
                        message: '注册成功'
                    })
                    this.$router.push('/login')
                }else{
                    Toast(response.data.msg)
                }
            }).catch((error) => {
                // 当请求发生错误，就触发catch，打印出error报错信息
                console.log(error);
            }).then(() => {
                // 这代码段不管请求是否成功，都会执行
            });
        }
    },
    mounted(){
    }
  }
</script>

<style scoped>
    .container{
        padding: 50px 8px;
    }
    .register div{
        border-bottom: 1px solid #d3d7d4;
        margin-left: 10px;
        
    }
</style>