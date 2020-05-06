<template>
    <div class="container">
        <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type"/>
        <div v-if="!isLogin">
            <PlsLogin/>
        </div>
        
        <div v-else>
            <div class="content">
                <p>消息推送已开启，您将收到已开启消息推送的主播的开播信息。</p>
                <p>主播的关注数超过1w才能开启消息推送功能哦~</p>
            </div>
            <div class="info-push">
                <div class="accept-info">
                    <p>接受消息推送</p>
                    <div class="switch-container ">
                        <input type="checkbox" id="switch" class="switch">
                        <label for="switch"></label>
                    </div>
                </div>
            </div>
            <div class="person-box" v-for="(follow,index) in followList" :key="index">
                <div class="person-info-box" @click="viewChatInfo(follow.myId, follow.followId)">
                    <div class="person-img">
                        <img :src="follow.src" class="person-img">
                    </div>
                    <div class="person-info">
                        <div class="top-box">
                            <span class="person-name">{{follow.name}}</span>
                            <span class="person-wheel">轮播中</span>
                        </div>
                        <div class="concern-number">
                            <span>分区：{{follow.type}}</span>
                            <span>关注数：11.6万</span>
                        </div>
                    </div>
                </div>
                <div class="switch-container ">
                    <input type="checkbox" :id="index" class="switch">
                    <label :for="index"></label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { Toast, } from 'mint-ui';
  import HeaderTop from '../components/HeaderTop';
  import PlsLogin from '../components/PlsLogin';
//   const axios = require('axios');
  export default {
    name:'',
    components: {
        HeaderTop,PlsLogin
    },
    data(){
        return{
            tabs:[{name:'我的关注',path:''}],
            value:false,
            type:'back',
            isLogin: window.localStorage.getItem('token')!=null,
            bgColor:'#fb7299',
            width:'',
            followList:[
                {id:1,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:2,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:3,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:4,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:5,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:6,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:7,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:8,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:9,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:10,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:11,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
                {id:12,src:require('../assets/images/5.jpg'),name:'米开朗杰森',ptn:'单机游戏',followNum:11.6},
            ]
        }
    },
    methods:{
        getFollowList(){
            if(this.isLogin){
                this.axios.get('follow/all',{
                        headers: {'authorization': window.localStorage.getItem('token')}
                    }).then((response) => {
                    //当请求成功才会触发
                    // console.log(response.data)
                    this.followList = response.data
                }).catch((error) => {
                    // 当请求发生错误，就触发catch，打印出error报错信息
                    console.log(error);
                }).then(() => {
                    // 这代码段不管请求是否成功，都会执行
                });
            }else{
                Toast('还未登录 请先登录');
            }
        },
        viewChatInfo(sentId, receiveId){
            this.$router.push(`/chatInfo/${sentId}/${receiveId}`)
        }
    },
    mounted(){
        this.getFollowList()
    }
  }
</script>

<style scoped>
    .container{
        padding-top: 50px;
        padding-bottom: 0;
    }
    p{
        margin: 0;
    }
    /* 消息内容 */
    .content{
        background-color: #EFEFEF;
        padding: 2px 4px;
        text-align: left;
    }
    .content p{
        font-size: 12px;
        color: #918597;
    }
    .accept-info{
        display: flex;
        justify-content: space-between;
        padding: 10px 8px;
        align-items: center;
    }
    /* checkbox按钮 */
    .switch-container{
        height: 24px;
        width:48px;
    }
    .switch{
        display: none;
    }
    .switch-container label{
        display: block;
        background-color: #eee;
        height: 100%;
        width: 100%;
        /* cursor: pointer; */
        border-radius: 25px;
        position: relative;
     }
     .switch-container label:before {
        content: '';
        display: block;
        border-radius: 25px;
        height: 100%;
        width: 24px;
        background-color: white;
        position: absolute;
        left: 0px;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
        -webkit-transition: all 0.5s ease;
        transition: all 0.5s ease;
    }
    .switch:checked~label:before {
        left: 24px;  
    }
    /*选中后label的背景色改变*/
    .switch:checked~label {
        background-color: #fb7299;
    }
    /* 关注的人 */
    .person-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #EFEFEF;
        padding: 5px 8px;
    }
    .person-info-box{
        flex: 1;
        display: flex;
        align-items: center;
    }
    .person-img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 15px;
    }
    .person-info{
        text-align: left;
    }
    .top-box{
        display: flex;
        justify-content: space-between;
    }
    .person-name{
        font-size: 13px;
        margin-right: 10px;
    }
    .person-wheel{
        color: #fff;
        font-size: 9px;
        background-color: orange;
        padding: 1px 5px;
        border-radius: 3px;
    }
    .concern-number{
        padding: 4px 0;
    }
    .concern-number span{
        font-size: 9px;
        color: #918597;
        margin-right: 10px;
    }
    
</style>