<template>
  <div class="container">
    <HeaderTop :tabs="tabs" :bgColor="bgColor" :isDisplay="false" :isDisplayRight="true"/>
    <div v-if="isLogin">
      <div class="ptn-chaseplay">
        <div class="ptn-chaseplay-content">关注</div>
        <div class="ptn-chaseplay-content">全部<span class="icon iconfont icon-icon-test"></span></div>
      </div>
      <div class="ptn-chaseplay">
        <div class="bdt-content">直播中</div>
        <div class="ptn-chaseplay-content">一个应经关注的主播，进去看看<span class="icon iconfont icon-icon-test"></span></div>
      </div>
      <div class="person">
        <img src="../../assets/images/5.jpg" class="person-img">
      </div>
      <div class="light"></div>
      <div class="video-list">
        <VideoList :recommendList="recommendList" :isDisplay="true" @video-click="viewVideo"/>
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
  import VideoList from '../../components/VideoList';
  import PlsLogin from '../../components/PlsLogin';
  import 'mint-ui/lib/style.css'

  // const axios = require('axios');

  export default {
    name:'',
    components: {
      HeaderTop, VideoList,PlsLogin
    },
    data(){
      return{
        tabs:[{name:'动态',path:''}],
        recommendList:[],
        isLogin: window.localStorage.getItem('token')!=null,
        bgColor:'#fb7299',
      }
    },
    created(){
      if(this.isLogin)
        this.getRecommendList()
    },
    methods:{
      getRecommendList(){
        //请求
        this.axios.get('recommendLogin/all',{
          headers: {'authorization': window.localStorage.getItem('token')}
        })
          .then((response) => {
            //当请求成功才会触发
            this.recommendList = response.data
          })
          .catch((error) => {
            // 当请求发生错误，就触发catch，打印出error报错信息
            console.log(error);
          })
          .then(() => {
            // 这代码段不管请求是否成功，都会执行
          });
      },
      viewVideo(id){
        this.$router.push(`/video/${id}`)
      }
    },
    mounted(){
    }
  }
</script>

<style scoped>
  /* 关注--全部 */
  .ptn-chaseplay{
    display: flex;
    justify-content: space-between;
    padding: 5px 8px;
    border-top: 1px solid #EFEFEF;
  }
  .ptn-chaseplay-content{
    font-size: 9px;
    color:  #a1a3a6;
  }
  .ptn-chaseplay-content span{
    font-size: 9px;
  }
  /* 直播中 */
  .bdt-content{
    background-color: #fb7299;
    padding: 1px 8px;
    border-radius: 3px;
    color: #EFEFEF;
    font-size: 11px;
    line-height: 1.5
  }
  .person{
    padding: 8px;
    width: 40px;
    height: 40px;
  }
  .person-img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  /* 线 */
  .light{
    border-bottom: 1px solid #EFEFEF;
  }
</style>>