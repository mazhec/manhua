<template>
  <div class="container">
    <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type" :isDisplayRight="false" />
    <!-- 轮播图 -->
    <CustomSwipe :banners="banners" style="margin:8px 8px 0 8px;height:150px" />
    <div class="text-box">
      <div class="text-left">
        <span class="icon iconfont icon-icon-test1" style="color: #fcaf17;font-size: 20px;"></span>热门推荐
      </div>
      <div class="text-right">
        <span class="icon iconfont icon-icon-test4"></span>排行榜
      </div>
    </div>

    <div class="video-box" v-for="(video,index) in videoList" :key="index">
      <div class="video">
        <img :src="video.videosrc" class="video-img" />
      </div>
      <div class="video-info">
        <div class="video-info-img">
          <img :src="video.usersrc" class="img" />
        </div>
        <div class="info">
          <p>{{video.drc}}</p>
          <p>{{video.type}}</p>
          <div class="bottom-info">
            <span class="name">{{video.username}}</span>
            <div class="playback-volume">
              <span class="icon iconfont icon-icon-test">20.9万</span>
              <span class="icon iconfont icon-icon-test16">1370</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import HeaderTop from '../components/HeaderTop'
import CustomSwipe from '../components/CustomSwipe'
import 'mint-ui/lib/style.css'
// const axios = require('axios');
export default {
  name: '',
  components: {
    HeaderTop,
    CustomSwipe
  },
  data() {
    return {
      tabs: [{ name: '小视频', path: '' }],
      type: 'back',
      banners: [],
      bgColor: '#fb7299',
      videoList: [
        {
          id: 1,
          videosrc: require('../assets/images/5.jpg'),
          usersrc: require('../assets/images/5.jpg'),
          drc: '#科技#xiaopiu,优酷高效的免费在线APP原型',
          type: '工具',
          username: 'xiaopiu雪儿'
        },
        {
          id: 1,
          videosrc: require('../assets/images/5.jpg'),
          usersrc: require('../assets/images/5.jpg'),
          drc: '#科技#斯科拉坚实的拉开基多拉是开局',
          type: '工具',
          username: '王大锤'
        },
        {
          id: 1,
          videosrc: require('../assets/images/5.jpg'),
          usersrc: require('../assets/images/5.jpg'),
          drc: '#游戏#氨基酸的来卡进算了看得静安寺',
          type: '工具',
          username: '葬爱一生丶'
        },
        {
          id: 1,
          videosrc: require('../assets/images/5.jpg'),
          usersrc: require('../assets/images/5.jpg'),
          drc: '#漫画#垃圾啊算了看得骄傲凉快圣诞节啦',
          type: '工具',
          username: '大队长'
        },
        {
          id: 1,
          videosrc: require('../assets/images/5.jpg'),
          usersrc: require('../assets/images/5.jpg'),
          drc: '#交友#按实际了都卡就死了开的骄傲了',
          type: '工具',
          username: '阿贾克斯了肯德'
        }
      ]
    }
  },
  methods: {
    getBanner() {
      this.axios
        .get('banner/all')
        .then(response => {
          //当请求成功才会触发
          this.banners = response.data
        })
        .catch(error => {
          // 当请求发生错误，就触发catch，打印出error报错信息
          console.log(error)
        })
        .then(() => {
          // 这代码段不管请求是否成功，都会执行
        })
    },
    getVideoList() {
      this.axios
        .get('category/video')
        .then(response => {
          //当请求成功才会触发
          this.videoList = response.data
          // console.log(response.data)
        })
        .catch(error => {
          // 当请求发生错误，就触发catch，打印出error报错信息
          console.log(error)
        })
        .then(() => {
          // 这代码段不管请求是否成功，都会执行
        })
    }
  },
  mounted() {
    this.getBanner()
    this.getVideoList()
  }
}
</script>

<style scoped>
.container {
  padding-bottom: 0;
}
p {
  margin: 0;
}
/* 热门推荐 */
.text-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6px 8px;
  padding-right: 2px;
}
.text-box span {
  font-size: 11px;
  margin-right: 5px;
}
.text-left {
  font-size: 10px;
  display: flex;
  align-items: center;
}
.text-right {
  font-size: 10px;
  background-color: #fcaf17;
  color: #fff;
  padding: 2px 4px;
  border-radius: 3px;
}
/* 视频信息 */
.video-box {
  margin: 10px 8px;
  border: 1px solid #efefef;
  box-shadow: 0px 1px 1px black;
}
.video img {
  width: 100%;
}
.img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.video-info {
  display: flex;
  align-items: center;
  padding: 2px 8px;
}
.info {
  padding: 0 8px;
  width: 220px;
}
.info p {
  text-align: left;
}
.bottom-info {
  display: flex;
  justify-content: space-between;
}
.name {
  font-size: 9px;
  color: #918597;
}
.playback-volume span {
  font-size: 9px;
  color: #918597;
  margin-left: 15px;
}
</style>