<template>
  <div class="container">
    <HeaderTop :tabs="tabs" :bgColor="bgColor" style="color: #FFF;" :isDisplayRight="true"/>
    <!-- 分区列表 -->
    <div class="ptn-box">
      <div class="ptn-item" :style="getHeightAndWidth" v-for="(ptnItem,index) in ptnItems" :key="index">
        <div @click="jumpPage(ptnItem.id, ptnItem.type)">
          <span class="icon iconfont" :class="ptnItem.icon" :style="{'color':ptnItem.color}"></span>
          <p>{{ptnItem.type}}</p>
        </div>
      </div>
    </div>
    <!-- 番剧区 -->
    <div class="ptn-chaseplay">
      <div class="ptn-chaseplay-content"><span class="icon iconfont icon-icon-test4"></span>番剧区</div>
      <div class="ptn-chaseplay-content">更多追番<span class="icon iconfont icon-icon-test"></span></div>
    </div>
    <!-- 轮播图 -->
    <div style="height:150px;margin:8px;">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(banner,index) in banners" :key="index">
          <img :src='banner.src' class="banner-img"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>


    <div class="ptn-img-box">
      <div class="ptn-img-content" v-for="(ptnImage,index) in ptnImages" :key="index">
        <img class="ptn-img" :src="ptnImage.src">
      </div>
    </div>
  </div>
</template>
<script>

  import Vue from 'vue';
  import { Swipe, SwipeItem } from 'mint-ui';
  import HeaderTop from '../../components/HeaderTop';
  import 'mint-ui/lib/style.css'

  // const axios = require('axios');

  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);

export default {
  name: 'Home',
  components: {
    HeaderTop
  },
  data() {
    return {
      tabs:[{name:'分区',path:''}],
       banners:[],
       bgColor:'#fb7299',
       getHeightAndWidth:{
                  width:'',
                  height:''
                },
      ptnItems:[],
      ptnImages:[
        {id:1,src:require('../../assets/images/5.jpg')},
        {id:1,src:require('../../assets/images/5.jpg')},
        {id:1,src:require('../../assets/images/5.jpg')},
        {id:1,src:require('../../assets/images/5.jpg')}
      ]
    }
  },
  methods:{
    getBanner(){
        this.axios.get('banner/all')
          .then((response) => {
            //当请求成功才会触发
            this.banners = response.data
          })
          .catch((error) => {
            // 当请求发生错误，就触发catch，打印出error报错信息
            console.log(error);
          })
          .then(() => {
            // 这代码段不管请求是否成功，都会执行
          });
    },
    getPartitionList(){
      this.axios.get('partition/all')
          .then((response) => {
            //当请求成功才会触发
            this.ptnItems = response.data
          })
          .catch((error) => {
            // 当请求发生错误，就触发catch，打印出error报错信息
            console.log(error);
          })
          .then(() => {
            // 这代码段不管请求是否成功，都会执行
          });
    },
    jumpPage(fid, type){
      
      this.$router.push(`/folkOpera/${fid}/${type}`)
    }
  },
  mounted(){
    this.getBanner()
    this.getPartitionList()
    this.getHeightAndWidth.height = (window.innerWidth-16)/4 + 'px';
    this.getHeightAndWidth.width = (window.innerWidth-20)/4 + 'px';
  }
}
</script>
<style scoped>
  /* 分区元素 */
  .ptn-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .ptn-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .ptn-item span{
    font-size: 30px;
    margin-bottom: 10px;
  }
  .ptn-item p{
    font-size: 10px;
    margin: 0;
  }
  /* 番剧区 */
  .ptn-chaseplay{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 10px;
  }
  .ptn-chaseplay-content{
    font-size: 9px;
  }
  .ptn-chaseplay-content span{
    font-size: 9px;
  }
   /* 轮播图 */
  .banner-img{
    width: 100%;
    height: 100%;
  }
  /* 番剧底部 */
  .ptn-img-box{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 8px;
  }
  .ptn-img-content{
    width: 48.7%;
    margin-bottom: 8px;
    
  }
  .ptn-img{
    width: 100%;
    border-radius: 3px;
  }
</style>