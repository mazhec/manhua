<template>
  <div class="container">
    <div class="top-box">
      <div class="title">{{info[0].title}}</div>
      <div class="item">
        <span class="icon iconfont icon-icon-test4">20.9万</span>
        <span class="icon iconfont icon-dianzan1">1370</span>
      </div>
      <div class="text">{{info[0].text}}</div>
    </div>
    <div class="item-bottom">
      <div class="item-bottom-box">
        <span style="color: #7fb80e;font-size: 13px" class="icon iconfont icon-fenxiang"></span>
        <span style="color: #7fb80e;">33万</span>
      </div>
      <div class="item-bottom-box">
        <span style="color: #f58220;font-size: 13px" class="icon iconfont icon-gio"></span>
        <span style="color: #f58220;">4.9万</span>
      </div>
      <div class="item-bottom-box">
        <span style="color: #f15b6c;font-size: 13px" class="icon iconfont icon-ego-favoritefull"></span>
        <span style="color: #f15b6c;">20万</span>
      </div>
      <div class="item-bottom-box">
        <span style="color: #2a5caa;font-size: 13px" class="icon iconfont icon-huancun"></span>
        <span style="color: #2a5caa;">缓存</span>
      </div>
    </div>
    <div class="person-info">
      <div class="person">
        <img :src="info[0].userSrc" class="person-img" />
        <div class="info-box">
          <p>{{info[0].username}}</p>
          <span>五个月前投递</span>
        </div>
      </div>
      <div v-if="isLogin" class="follow" @click="cancelOrDetermineFollow(info[0].id)">
        <span v-if="info[0].status>0">已关注</span>
        <span v-if="info[0].status==0">关注</span>
      </div>
    </div>
    <div class="relevant-info">
      <p>标签相关</p>
      <span>设计</span>
      <span>学习</span>
      <span>教程</span>
      <span>公开课</span>
    </div>
    <div class="relevant-video">相关视频</div>
    <VideoList :recommendList="recommendList" :isDisplay="false" @video-click="viewVideo" />
  </div>
</template>

<script>
import Vue from 'vue'
import VideoList from '../components/VideoList'
import { Button, Toast, MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'

// const axios = require('axios')
Vue.component(Button.name, Button)

var common = require('../assets/js/common')
export default {
  name: '',
  components: {
    VideoList
  },
  data() {
    return {
      recommendList: [],
      states: null,
      info: [
        {
          videoSrc: require('../assets/images/5.jpg'),
          title: 'xiaopiu原型动态教程-滑动列表',
          text:
            '了卡了史黛拉三打哈三打哈德了肯定街坊邻居暗杀的六块腹肌啊辣椒水掉落氪金暗杀的凯撒奖来卡建档立卡射箭打哈师大来卡进算了看得静安寺拉科射箭打哈市大理石拉三季度拉会受到哈师大快捷键拉萨的哈老实交代卡拉及时点垃圾是的哈射箭打',
          userSrc: require('../assets/images/5.jpg')
        }
      ],
      width: '',
      isLogin: window.localStorage.getItem('token') != null,
      getWidth: {
        width: ''
      }
    }
  },
  computed: {},
  created() {
    this.getRecommendList()
    this.getInfo()
  },
  methods: {
    getRecommendList() {
      //请求
      this.axios
        .get('recommend/all')
        .then(response => {
          //当请求成功才会触发
          this.recommendList = response.data
        })
        .catch(error => {
          // 当请求发生错误，就触发catch，打印出error报错信息
          console.log(error)
        })
        .then(() => {
          // 这代码段不管请求是否成功，都会执行
        })
    },
    getInfo() {
      if (this.isLogin) {
        this.axios
          .get(`info1/all/${this.$route.params.id}`, {
            headers: { authorization: window.localStorage.getItem('token') }
          })
          .then(response => {
            //当请求成功才会触发
            this.info = response.data
          })
          .catch(error => {
            // 当请求发生错误，就触发catch，打印出error报错信息
            console.log(error)
          })
          .then(() => {
            // 这代码段不管请求是否成功，都会执行
          })
      } else {
        this.axios
          .get(`info/all/${this.$route.params.id}`)
          .then(response => {
            //当请求成功才会触发
            this.info = response.data
            console.log(response.data)
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
    cancelOrDetermineFollow(id) {
      if (this.isLogin && this.info[0].status === 0) {
        this.axios
          .get(`follow/create/${id}`, {
            headers: { authorization: window.localStorage.getItem('token') }
          })
          .then(response => {
            //当请求成功才会触发
            // this.commentList = response.data
            Toast(response.data.msg)
            this.getInfo()
          })
      } else if (this.isLogin && this.info[0].status > 0) {
        MessageBox.confirm('确定取消关注他么?')
          .then(action => {
            this.axios
              .get(`follow/delete/${id}`, {
                headers: { authorization: window.localStorage.getItem('token') }
              })
              .then(response => {
                //当请求成功才会触发
                // this.commentList = response.data
                Toast(response.data.msg)
                this.getInfo()
              })
          })
          .catch(error => {})
      } else {
        Toast('请先登录')
      }
    },
    viewVideo(id) {
      // this.$router.push(`/video/${id}`)
      this.$emit('video-click', id)
    }
  },
  mounted() {
    this.width = window.innerWidth - 1 + 'px'
  }
}
</script>

<style scoped>
.container {
  padding-top: 34px;
}
p {
  margin: 0;
  padding: 0;
}
.top-box {
  text-align: left;
  padding: 6px 8px;
  border-bottom: 1px solid #efefef;
}
.title {
  margin-bottom: 6px;
  font-size: 11px;
}
.item {
  font-size: 11px;
  margin-bottom: 6px;
}
.item span {
  font-size: 11px;
  margin-right: 10px;
}
.text {
  font-size: 9px;
}
.active {
  color: #fb7299;
  border-bottom: 2px solid #fb7299;
  padding-bottom: 4px;
}
.item-bottom {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 7px solid #efefef;
}
.item-bottom span {
  text-align: center;
  font-size: 11px;
  margin-right: 4px;
}
/* up主信息 */
.person-info {
  display: flex;
  justify-content: space-between;
  padding: 6px 8px;
  align-items: center;
}
.person {
  display: flex;
  align-items: center;
}
.person-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.info-box {
  text-align: left;
  margin-left: 8px;
}
.info-box p {
  font-size: 13px;
}
.info-box span {
  font-size: 9px;
  color: #8a8c8e;
}
.follow {
  color: #fb7299;
  border: 1.5px solid #fb7299;
  padding: 1px 4px;
  border-radius: 4px;
}
/* 相关标签 */
.relevant-info {
  text-align: left;
  padding: 4px 8px 12px 8px;
  border-bottom: 7px solid #efefef;
}
.relevant-info p {
  font-weight: bold;
  margin-bottom: 6px;
}
.relevant-info span {
  border: 1px solid #a1a3a6;
  padding: 3px 8px;
  border-radius: 30px;
  margin-right: 10px;
}
/* 相关视频 */
.relevant-video {
  text-align: left;
  padding: 6px 8px 0 8px;
  font-weight: bold;
}
</style>