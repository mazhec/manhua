<template>
  <div class="container">
    <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type" :isDisplayRight="true" />
    <!-- <div class="location">
        <img :src="info[0].videoSrc" class="img">
        <div class="bg">
            <span class="icon iconfont icon-icon-test4"></span>
        </div>
        
    </div>-->
    <div class="video-box">
      <iframe
        :src="this.activeVideo.URL"
        frameborder="0"
        allow="autoplay;encrypted-media"
        allowfullscreen
        style="width:100%;height:180px;"
      ></iframe>
    </div>
    <div class="nav">
      <div class="type" v-for="(type,index) in types" :key="index" @click="change(index)">
        <span :class="{'active':activeIndex==index}">{{type}}</span>
      </div>
    </div>

    <transition>
      <div class="introduce" v-if="activeIndex==0">
        <Introduce @video-click="viewVideo"/>
      </div>
    </transition>

    <transition>
      <div v-if="activeIndex==1" style="margin: 170px 0 40px 0;" :style="{width:width}">
        <Comment />
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderTop from '../components/HeaderTop'
import VideoList from '../components/VideoList'
import Introduce from '../components/Introduce'
import Comment from '../components/Comment'
import { Button, MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'

// const axios = require('axios')
Vue.component(Button.name, Button)
export default {
  name: '',
  components: {
    HeaderTop,
    VideoList,
    Introduce,
    Comment
  },
  data() {
    return {
      tabs: [{ name: 'AV7961364', path: '' }],
      type: 'back',
      bgColor: '#fb7299',
      activeIndex: 0,
      types: ['简介', '评论'],
      width: '',
      isLogin: window.localStorage.getItem('token') != null,
      activeVideo: {
        id: 3,
        title: 'test1',
        thumbnail: './../../static/images/headImg.png',
        speaker: 'harry',
        likes: 0,
        views: 0,
        describe: 'good',
        URL: require('../../static/video/1.mp4')
      }
    }
  },
  computed: {},
  created() {
    this.getVideo(this.$route.params.id)
  },
  methods: {
    change(index) {
      this.activeIndex = index
    },
    getVideo(id) {
      this.axios
        .get(`video/${id}`)
        .then(response => {
          //当请求成功才会触发
          // this.commentList = response.data
          // console.log(response.data[0].videoSrc)
          this.activeVideo.URL = response.data[0].videoSrc
        })
        .catch(error => {
          // 当请求发生错误，就触发catch，打印出error报错信息
          console.log(error)
        })
        .then(() => {
          // 这代码段不管请求是否成功，都会执行
        })
    },
    viewVideo(id){
        this.getVideo(id)
        // console.log("id:"+id)
    }
  },
  watch: {
    activeIndex: function(to, from) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  mounted() {
    this.width = window.innerWidth - 1 + 'px'
  },
  destroyed() {}
}
</script>

<style scoped>
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}
.container {
  position: relative;
  /* padding-top: 100px; */
  padding-bottom: 0;
}
.video-box {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 1;
}
.img {
  width: 100%;
}
.bg {
  height: 128px;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom: 7px solid white;
}
.bg span {
  position: absolute;
  right: 6px;
  bottom: 10px;
  font-size: 50px;
  color: #77787b;
}
/* 简介评论 */
.nav {
  position: fixed;
  display: flex;
  justify-content: center;
  /* border-bottom: 7px solid #EFEFEF; */
  padding: 9px 0;
  background-color: white;
  top: 230px;
  left: 0;
  right: 0;
  z-index: 1;
}
.type {
  width: 157.5px;
  text-align: center;
}
.introduce {
  border-top: 7px solid #efefef;
  margin-top: 173px;
}
</style>