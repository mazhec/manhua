<template>
  <div class="container">
    <HeaderTop :tabs="tabs" :bgColor="bgColor" :isDisplayRight="true"/>
    <div v-if="isLogin">
      <div class="list-box">
      <div class="list-item" style="color: #45b97c" :style="getHeightAndWidth"><span class="icon iconfont icon-pinglun"></span><strong>回复我的</strong></div>
      <div class="list-item" style="color: #dea32c" :style="getHeightAndWidth"><span class="icon iconfont icon-wode"></span><strong>@我</strong></div>
      <div class="list-item" style="color: #ef4136" :style="getHeightAndWidth"><span class="icon iconfont icon-dianzan"></span><strong>收到的赞</strong></div>
      <div class="list-item" style="color: #33a3dc" :style="getHeightAndWidth"><span class="icon iconfont icon-shengyin"></span><strong>系统通知</strong></div>
    </div>
    <div class="chat-list">
      <div class="text">聊天列表</div>

      <div class="chat-item" v-for="(chatList,index) in chatLists" :key="index" @click="viewChatInfo(chatList.sentId, chatList.receiveId)">
        <div class="img">
          <img :src="chatList.src">
        </div>
        <div class="chat-info">
          <div class="name">
            <label>{{chatList.name}}</label>
            <span>LV6</span>
          </div>
          <div class="info">{{chatList.chatInfoLast}}</div>
        </div>
      </div>
    </div>
    </div>
    <div v-else>
      <PlsLogin/>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import HeaderTop from '../../components/HeaderTop';
  import PlsLogin from '../../components/PlsLogin';
  import 'mint-ui/lib/style.css'

  const axios = require('axios');
  export default {
    name:'',
    components: {
      HeaderTop,PlsLogin
    },
    data(){
      return{
        tabs:[{name:'消息',path:''}],
          width:'',
        bgColor:'#fb7299',
        chatLists:[],
        isLogin: window.localStorage.getItem('token')!=null,
        getHeightAndWidth:{
          width:'',
          height:''
        },
      }
    },
    created(){
      if(this.isLogin)
        this.getChatList()
    },
    methods:{
        getChatList(id){
             this.axios.get('chat/all',{
                    headers: {'authorization': window.localStorage.getItem('token')}
                }).then((response) => {
                //当请求成功才会触发
                this.chatLists = response.data

                // console.log(response.data)
            }).catch((error) => {
                // 当请求发生错误，就触发catch，打印出error报错信息
                console.log(error);
            }).then(() => {
                // 这代码段不管请求是否成功，都会执行
            });
        },
        viewChatInfo(sentId, receiveId){
          this.$router.push(`/chatInfo/${sentId}/${receiveId}`)
        }
    },
    mounted(){
      this.getHeightAndWidth.height = parseInt((window.innerWidth)/4) + 'px';
      this.getHeightAndWidth.width = parseInt((window.innerWidth)/4) + 'px';
      
    }
  }
</script>

<style scoped>
  /* 评论回复按钮 */
  .list-box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 10px solid #EFEFEF;
  }
  .list-item{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .list-item span{
    font-size: 30px;
    margin-bottom: 4px;
  }
  .list-item strong{
    color: #000;
    font-weight: normal;
    font-size: 10px;
  }
  /* 聊天列表 */
  .text{
    padding: 5px 8px;
    text-align: left;
    font-size: 10px;
    border-bottom: 1px solid #EFEFEF;
  }
  .chat-item{
    display: flex;
    align-items: center;
    margin: 0 8px;
  }
  .img{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 10px;
      overflow: hidden;
  }
  .img img{
    width: 100%;
    height: 100%;
  }
  .chat-info{
    flex: 1;
    text-align: left;
    border-bottom: 1px solid #EFEFEF;
    padding: 8px 8px 8px 0;
  }
  .name{
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  .name label{
    color: #fb7299;
    margin-right: 8px;
  }
  .name span{
    background-color: red;
    color: #FFF;
    font-size: 9px;
    font-weight: bold;
    padding: 1px 4px;
  }
  .info{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 10px;
    color: #918597;
    word-break: break-all;
  }
</style>