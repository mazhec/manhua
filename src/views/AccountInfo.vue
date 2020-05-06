<template>
  <div class="container">
      <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type"/>
      <div class="my-room">
          <label>我的直播间</label><span class="icon iconfont icon-jiantou"></span>
      </div>
      <div class="info-box">
          <div class="accunt-info" @click="uploadImg()">
              <label>账号资料</label>
              <div class="accunt-right">
                  <img :src="src">
                  <span class="icon iconfont icon-jiantou"></span>
              </div>
          </div>

          <div class="accunt-info">
              <label>昵称</label>
              <div class="accunt-right">
                  <div class="accunt-name">{{username}}</div>
                  <span class="icon iconfont icon-jiantou"></span>
              </div>
          </div>

          <div class="accunt-info">
              <label>UID</label>
              <div class="accunt-right">
                  <div>6962307</div>
              </div>
          </div>

          <div class="accunt-info">
              <label>二维码名片</label>
              <div class="accunt-right">
                  <span class="icon iconfont icon-jiantou"></span>
              </div>
          </div>

          <div class="accunt-info">
              <label>性别</label>
              <div class="accunt-right">
                  <div>男</div>
                  <span class="icon iconfont icon-jiantou"></span>
              </div>
          </div>

          <div class="accunt-info">
              <label>出生年月日</label>
              <div class="accunt-right">
                  <div>2016-07-28</div>
                  <span class="icon iconfont icon-jiantou"></span>
              </div>
          </div>

          <div class="accunt-info">
              <label>个性签名</label>
              <div class="accunt-right">
                  <div>死肥宅</div>
                  <span class="icon iconfont icon-jiantou"></span>
              </div>
          </div>

      </div> 
      <div class="logout">
        <mt-button size="large" type="danger" @click="logout()">退出登录</mt-button>
      </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    import { Button } from 'mint-ui';
    import HeaderTop from '../components/HeaderTop';
    import 'mint-ui/lib/style.css'
    // const axios = require('axios');
    Vue.component(Button.name, Button);
    export default {
        name: 'Home',
        components: {
            HeaderTop
        },
        data() {
            return {
                tabs:[{name:'账号资料',path:''}],
                type:'back',
                bgColor:'#fb7299',
                width:'',
                username:'',
                src:''
            }
        },
        created(){
            this.getUserInfo()
        },
        methods:{
            uploadImg(){
                this.$router.push('/upload')
            },
            getUserInfo(){
                this.axios.get('user/info',{
                headers: {'authorization': window.localStorage.getItem('token')}
                })
                .then((response) => {
                    //当请求成功才会触发
                this.username = response.data[0].username
                this.src = response.data[0].src
                })
                .catch((error) => {
                    // 当请求发生错误，就触发catch，打印出error报错信息
                    console.log(error);
                })
                .then(() => {
                    // 这代码段不管请求是否成功，都会执行
                });
            },
            logout(){
                window.localStorage.removeItem('token');
                this.$router.push('/login')
            },
        },
        mounted(){
        }
    }
</script>

<style scoped>
/* @import url('../assets/font/iconfont.css'); */
    .container{
        background-color: #F5F5F5;
        padding-top: 50px;
    }
    /* 我的直播间 */
    .my-room{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        padding: 8px;
        background-color: #FFF;
    }
    .my-room span{
        color: #8a8c8e;
    }
    /* 账号资料 */
    .info-box{
        background-color: #FFF;
        margin-bottom: 10px;
    }
    .accunt-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #EFEFEF;
        padding: 8px 8px 8px 0;
        margin-left: 8px;
    }
    .accunt-right{
        display: flex;
        align-items: center;
        line-height: 0;
        /* justify-content: center; */
    }
    .accunt-right img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .accunt-name{
        font-size: 11px;
    }
    .accunt-right span{
        color: #8a8c8e;
        margin-left: 8px;
        font-size: 14px;
    }
    /* 退出登录 */
    .logout{
        margin: 0 4px;
    }
</style>