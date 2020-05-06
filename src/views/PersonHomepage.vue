<template>
  <div class="container">
    <HeaderTop :type="type" style="background-color: none;" />
    <div class="person-homepage-box">
      <div class="img">
        <img src="../assets/images/3.jpg" />
        <div class="person-img">
          <img :src="userSrc" />
        </div>
      </div>
      <div class="ac-box" @click="viewAccountInfo">
        <span class="account-info">账号资料</span>
      </div>
      <div class="person-name-box">
        <div class="name">{{username}}</div>
        <div class="level-box">
          <div class="level">
            <label>Lv4</label>
            <span>7596/</span>
            <span>10800</span>
          </div>
          <div class="progress-bar">
            <div class="left"></div>
            <div class="right"></div>
          </div>
        </div>
      </div>
      <div class="follow-fans">
        <label for>55</label>
        <span>关注</span>
        <label for>2</label>
        <span>2粉丝</span>
      </div>
    </div>
    <div class="other-box">
      <div class="into-home">
        <span class="icon iconfont icon-zhibo"></span>进入我的直播间
      </div>
      <div class="coin">
        <div class="text-box">
          <div class="lately-coin">最近投币1</div>
          <div class="into-look">
            进去看看!
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </div>
        <div class="coin-img">
          <img src="../assets/images/5.jpg" />
        </div>
        <div class="text-item-box">
          <p>xiaopiu原型动态教程-滑动列表</p>
          <div class="bottom-item">
            <div class="item-left">
              <span class="icon iconfont icon-zhibo2"></span>
              <label for>20.9万</label>
            </div>
            <div class="item-right">
              <span class="icon iconfont icon-mirrorlightctrl"></span>
              <label for>1370</label>
            </div>
          </div>
        </div>
      </div>
      <div class="collection">
        <div class="text-box">
          <div class="lately-coin">我的收藏夹1</div>
          <div class="into-look">
            进去看看!
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </div>
        <div class="collection-img">
          <div class="top-img">
            <img src="../assets/images/5.jpg" />
          </div>
          <div class="bottom-img">
            <img src="../assets/images/5.jpg" />
            <img src="../assets/images/5.jpg" />
          </div>
        </div>
      </div>
      <div class="my-chase">
        <div class="text-box">
          <div class="lately-coin">我的追番14</div>
          <div class="into-look">
            进去看看!
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </div>
        <div class="my-chase-content">
          <div class="my-chase-item">
            <img src="../assets/images/11.jpg" />
            <div class="my-chase-text">
              <p>石膏男孩</p>
              <p>全12话</p>
            </div>
          </div>
          <div class="my-chase-item">
            <img src="../assets/images/11.jpg" />
            <div class="my-chase-text">
              <p>石膏男孩</p>
              <p>全12话</p>
            </div>
          </div>
          <div class="my-chase-item">
            <img src="../assets/images/11.jpg" />
            <div class="my-chase-text">
              <p>石膏男孩</p>
              <p>全12话</p>
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
// const axios = require('axios')
export default {
  name: 'Home',
  components: {
    HeaderTop
  },
  data() {
    return {
      type: 'back',
      userSrc: '',
      username: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    viewAccountInfo() {
      this.$router.push('/accountInfo')
    },
    getUserInfo() {
      this.axios
        .get('user/info', {
          headers: { authorization: window.localStorage.getItem('token') }
        })
        .then(response => {
          //当请求成功才会触发
          this.username = response.data[0].username
          this.userSrc = response.data[0].src
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
  mounted() {}
}
</script>

<style scoped>
p {
  margin: 0;
}
.container {
  padding: 0;
}
/* 头部图片 */
.img {
  position: relative;
}
.img img {
  width: 100%;
}
.person-img {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  bottom: -30px;
  left: 10px;
}
.person-img img {
  width: 100%;
  height: 100%;
}
/* 账号资料 */
.ac-box {
  display: flex;
  justify-content: flex-end;
  /* background-color: #fb7299; */
}
.account-info {
  border: 1px solid #fb7299;
  padding: 3px 4px;
  margin: 4px 8px;
  border-radius: 4px;
  color: #fb7299;
}
/* 用户等级 */
.person-name-box {
  display: flex;
  padding: 6px 10px;
  align-items: center;
}
.name {
  margin-right: 8px;
}
.level label {
  color: #ffffff;
  font-weight: bold;
  background-color: orange;
  margin-right: 10px;
  font-size: 9px;
}
.level span {
  font-size: 9px;
}
.progress-bar {
  display: flex;
  margin-top: 1px;
}
.left {
  width: 80%;
  height: 1px;
  background-color: orange;
}
.right {
  background-color: black;
  height: 1px;
  width: 20%;
}
/* 关注和粉丝 */
.follow-fans {
  text-align: left;
  padding: 0 10px;
}
.follow-fans label {
  font-size: 11px;
  margin-right: 3px;
}
.follow-fans span {
  color: darkgray;
  margin-right: 8px;
  font-size: 11px;
}
.other-box {
  background-color: #f5f5f5;
  padding-top: 1px;
}
/* 我的直播间 */
.into-home {
  background-color: #ffffff;
  padding: 10px;
  border-radius: 3px;
  margin: 10px 10px 0 10px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.into-home span {
  color: red;
  font-size: 18px;
  margin-right: 5px;
}
/* 最近投币 */
.coin {
  border-bottom: 1px solid #d3d3d3;
  padding: 10px;
}
.text-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.text-box div {
  font-size: 10px;
}
.into-look {
  color: #6f6d85;
  display: flex;
  justify-content: center;
  align-items: center;
}
.into-look span {
  font-size: 11px;
  margin-left: 5px;
}
.coin-img {
  text-align: left;
}
.coin-img img {
  width: 44%;
  border-radius: 4px;
}
.text-item-box {
  text-align: left;
  width: 38%;
  padding-left: 6px;
}
.text-item-box p {
  font-size: 9px;
}
.bottom-item {
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
}
.item-left {
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.item-left span {
  font-size: 11px;
  margin-right: 4px;
  /* display: block; */
}
.item-left label {
  font-size: 9px;
  /* display: block; */
}
.item-right {
  display: flex;
  align-items: center;
}
.item-right span {
  font-size: 11px;
  margin-right: 4px;
}
.item-right label {
  font-size: 9px;
}
/* 我的收藏夹 */
.collection {
  margin: 10px 0;
  padding: 0 10px 10px 10px;
  text-align: left;
  border-bottom: 1px solid #d3d3d3;
}
.collection-img {
  width: 35%;
}
.top-img img {
  width: 100%;
  border-radius: 3px;
  height: 40px;
}
.bottom-img {
  display: flex;
  justify-content: space-between;
}
.bottom-img img {
  width: 48%;
  height: 40px;
}
.my-chase {
  padding: 0 10px 10px 10px;
}
/* 我的追番 */
.my-chase-content {
  display: flex;
  justify-content: space-between;
}
.my-chase-item {
  position: relative;
  width: 30%;
}
.my-chase-item img {
  width: 100%;
  border-radius: 3px;
}
.my-chase-text {
  position: absolute;
  bottom: 10px;
  color: #ffffff;
  text-align: left;
  padding-left: 4px;
}
.my-chase-text p {
  font-size: 9px;
}
</style>