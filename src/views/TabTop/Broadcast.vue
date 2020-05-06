<template>
  <div class="broadcast">
      <!-- 轮播图 -->
      <CustomSwipe :banners="banners" style="margin:8px 8px 10px 8px"/>
      <!-- 分类 -->
      <CategoryList :categories="categories" @category-click="jumpPage"/>
      <!-- 直播列表 -->
      <div class="comic-box">
        <div class="comic-broadcast">
          <div class="recommend-person"><span class="icon iconfont icon-icon-test1"></span>推荐主播</div>
          <div class="recommend-info">当前有6329个直播，进去看看<span class="icon iconfont icon-icon-test4"></span></div>
        </div>


        <div class="comic-list">
          <div class="comic-item" v-for="(broadcast,index) in broadcasts" :key="index">
            <img class="comic-item-img" :src="broadcast.src">
            <div class="item-box">
              <span class="broadcast-name">{{broadcast.name}}</span>
              <span class="icon iconfont icon-icon-test eye">{{broadcast.number}}万</span>
            </div>
            <p>#{{broadcast.type}}#</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
    import Vue from 'vue';
  import CategoryList from '../../components/CategoryList';
  import CustomSwipe from '../../components/CustomSwipe';

  // const axios = require('axios');
    export default {
  name: 'Home',
  components: {
    CategoryList, CustomSwipe
  },
  data() {
    return {
      categories:[],
      banners:[],
      broadcasts:[],
    }
  },
  methods:{
    getCategoryList(){
        //请求
        this.axios.get('category/all')
          .then((response) => {
            //当请求成功才会触发
            this.categories = response.data
          })
          .catch((error) => {
            // 当请求发生错误，就触发catch，打印出error报错信息
            console.log(error);
          })
          .then(() => {
            // 这代码段不管请求是否成功，都会执行
          });
    },
    getBanner(){
        //请求
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
    getBroadcasts(){
        //请求
        this.axios.get('broadcasts/all')
          .then((response) => {
            //当请求成功才会触发
            this.broadcasts = response.data
          })
          .catch((error) => {
            // 当请求发生错误，就触发catch，打印出error报错信息
            console.log(error);
          })
          .then(() => {
            // 这代码段不管请求是否成功，都会执行
          });
    },
    jumpPage(cid){
      this.$router.push(`/category/${cid}`)
      console.log(cid)
    },
  },
  created(){
    
  },
  mounted(){
    this.getCategoryList()
    this.getBanner()
    this.getBroadcasts()
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
    /* 直播 */
  
  /* 动漫列表 */
  .comic-box{
    margin: 10px 8px 0 8px;
  }
  .comic-broadcast{
    margin-bottom: 10px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }
  .comic-broadcast span{
    font-size: 11px;
  }
  .recommend-person{
    font-size: 11px;
  }
  .recommend-info{
    font-size: 11px;
  }
  .comic-list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

  }
  .comic-item{
    width: 48%;
    margin-bottom: 5px;
    position: relative;
  }
  .comic-item p{
    text-align: left;
    color:#ef5b9c;
    font-weight: bold;
  }
  .comic-item-img{
    width: 100%;
    border-radius: 4px;
  }
  .item-box{
    padding-left: 8px;
    padding-right: 8px;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    color: #FFF;
    display: flex;
    justify-content: space-between;
  }
  .broadcast-name{
    /* float: left; */
    font-size: 9px;
  }
  .eye{
    /* float: right; */
    font-size: 9px;
  }
</style>>