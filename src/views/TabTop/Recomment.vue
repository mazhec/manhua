<template>
  <div class="recomment">
    <div class="com-box">综合</div>
    <!-- 轮播图 -->
    <CustomSwipe :banners="banners" style="margin: 0 8px" />
    <!-- 视频列表 -->
    <VideoList :recommendList="recommendList" :isDisplay="false" @video-click="viewVideo" />
  </div>
</template>

<script>
import Vue from "vue";
import VideoList from "../..//components/VideoList";
import CustomSwipe from "../../components/CustomSwipe";

// const axios = require("axios");
export default {
  name: "Home",
  components: {
    VideoList,
    CustomSwipe
  },
  data() {
    return {
      banners: [],
      isLogin: window.localStorage.getItem("token") != null,
      recommendList: []
    };
  },
  methods: {
    getBanner() {
      console.log('getBanner')
      //请求
      this.axios
        .get("banner/all")
        .then(response => {
          //当请求成功才会触发
          console.log('banner/all', response);
          this.banners = response.data;
        })
        .catch(error => {
          // 当请求发生错误，就触发catch，打印出error报错信息
          console.log('banner/all', error);
        })
        .then(() => {
          // 这代码段不管请求是否成功，都会执行
        });
    },
    getRecommendList() {
      //请求
      this.axios
        .get("recommend/all")
        .then(response => {
          //当请求成功才会触发
          this.recommendList = response.data;
          console.log(response.data)
        })
        .catch(error => {
          // 当请求发生错误，就触发catch，打印出error报错信息
          console.log(error);
        })
        .then(() => {
          // 这代码段不管请求是否成功，都会执行
        });
    },
    viewVideo(id) {
      this.$router.push(`/video/${id}`);
    }
  },
  created() {},
  mounted() {
    this.getBanner();
    this.getRecommendList();
  }
};
</script>

<style scoped>
.com-box {
  padding: 8px 8px 5px 8px;
  text-align: left;
  border-bottom: 1px solid #efefef;
}
</style>