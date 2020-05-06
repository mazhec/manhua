<template>
  <div id="app">
    <!-- <HeaderTop :tabs="tabs" v-if="path=='/home'||path=='/partition'||path=='/dynamic'||path=='/info'" :bgColor="bgColor" :activeIndex="activeIndex" :isDisplay="false" :isDisplayRight="true" @tab-index="changeTab"/> -->
    <transition>
      <router-view/>
    </transition>
    
    <div class="tab-bar" v-if="path=='/home/broadcast'||path=='/home/recomment'||path=='/home/chaseplay'||path=='/home'||path=='/partition'||path=='/dynamic'||path=='/info'||path=='/my'">
      <router-link :to="tab.path" tag='div' class="tab-bar-item" v-for="(tab,index) in tabList" :key="index">
        <span class="icon iconfont" :class="tab.icon"></span>
        <p>{{tab.name}}</p>
      </router-link>
    </div>
  </div>
</template>
<script>

  import Vue from 'vue';
  const axios = require('axios');
  import HeaderTop from './components/HeaderTop';
  
    export default {
      name: '',
      components: {
        HeaderTop
      },
      data(){
          return {
            tabs:['直播','推荐','追番'],
            bgColor:'#fb7299',
            index: null,
            tabList:[
              {name:'首页',icon:'icon-home',path:'/home'},
              {name:'分区',icon:'icon-mirrorlightctrl',path:'/partition'},
              {name:'动态',icon:'icon-mark',path:'/dynamic'},
              {name:'消息',icon:'icon-message',path:'/info'},
              {name:'我的',icon:'icon-nickname',path:'/my'}
            ],
            path:'',
          }
      },
      watch:{
        '$route':function(to,from){
　　　　　 document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }

      },
      methods:{
        changeTab(index){
          this.activeIndex = index
          this.$router.push(`/test`)
        },
      },
      
      mounted(){
        
      },
      beforeUpdate(){
        this.path = this.$route.path
      },
    }
</script>
<style>
@import url('./assets/font/iconfont.css');
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active{
    transition: all 0.3s ease;
  }
  .container{
    padding-top: 50px;
    padding-bottom: 54px;
  }
  html,body{
    margin: 0;
    padding: 0;
    /* height: 100%;
    width: 100%; */
    background-color: rgb(248, 247, 247);
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow-x: hidden;
     position: absolute;
     left: 0;
     right: 0;
     
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
  *{
    font-size:12px;
  }
  .tab-bar{
    display: flex;
    position: fixed;
    justify-content: space-between;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color:#FFFFFF;
    border-top: 1px solid #a1a3a6;
    padding: 3px 0;
  }
  .tab-bar-item{
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .tab-bar-item span{
    font-size: 34px;

  }
  .tab-bar-item p{
    margin: 0;
    font-size: 10px;
  }
  .selected{
    color: #ea66a6;
  }
  .mint-swipe{
    border-radius: 4px;
  }
  .margin{
    border-bottom: 10px solid #EFEFEF;
  }
</style>
