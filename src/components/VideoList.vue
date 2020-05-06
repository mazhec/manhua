<template>
  <div class="recommend-list">
    <div v-for="(recommend,index) in recommendList" :key="index" @click="ckVideo(recommend.id)">
      <div class="video-person" v-if="isDisplay">
        <img :src="recommend.userSrc" class="video-person-img" />
        <span>{{recommend.username}}</span>
        <span style="color: #a1a3a6;">3小时前</span>
      </div>
      <div class="recomment-item">
        <img class="recomment-item-img" :src="recommend.src" />
        <div class="recomment-item-content">
          <div class="recomment-item-content-box">
            <p>{{recommend.title}}</p>
            <p>{{recommend.descr}}</p>
            <span class="icon iconfont icon-icon-test">{{recommend.play}}</span>
            <span style="margin-right: 30px;font-size:9px;">万</span>
            <span class="icon iconfont icon-icon-test16">{{recommend.fabulous}}</span>
          </div>
          <div class="recomment-item-content-bottom">
            <div class="text-box-left">
              <span style="margin-right:20px;">{{recommend.typeLeft}}</span>·
              <span style="margin-left:20px;">{{recommend.typeRight}}</span>
            </div>
            <div class="text-box-right">
              <span class="icon iconfont icon-icon-test12"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const axios = require('axios');
export default {
  name: '',
  props: {
    recommendList: Array,
    isDisplay: Boolean
  },
  data() {
    return {
      isLogin: window.localStorage.getItem('token') != null
    }
  },
  mounted() {},
  methods: {
    ckVideo(id) {
      if (this.isLogin) {
        this.axios
          .get(`history/all/${id}`, {
            headers: { authorization: window.localStorage.getItem('token') }
          })
          .then(response => {
            //当请求成功才会触发
            // this.followList = response.data
            console.log(response.data)
          })
          .catch(error => {
            // 当请求发生错误，就触发catch，打印出error报错信息
            console.log(error)
          })
      }
      this.$emit('video-click', id)
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

/* 视频列表 */
.video-person {
  text-align: left;
  line-height: 30px;
  display: flex;
  align-items: center;
  padding-left: 8px;
}
.video-person span {
  font-size: 9px;
  margin-right: 10px;
}
.video-person-img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}
/* 推荐列表 */
.recomment-item {
  display: flex;
  flex-direction: row;
  /* margin: 0 -8px; */
  padding: 8px;
  border-bottom: 1px solid #efefef;
}
.recomment-item-img {
  width: 40%;
  border-radius: 3px;
}
.recomment-item-content {
  flex: 1;
}
.recomment-item-content-box {
  text-align: left;
  padding-left: 8px;
}
.recomment-item-content-box p {
  margin-bottom: 2px;
}
.recomment-item-content-box span {
  font-size: 10px;
  color: #a1a3a6;
}
.recomment-item-content-bottom {
  display: flex;
  justify-content: space-between;
  padding-left: 3px;
  margin-top: 8px;
}
.recomment-item-content-bottom span {
  font-size: 9px;
  color: #a1a3a6;
}
</style>