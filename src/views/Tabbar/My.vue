<template>
  <div class="container-my">
    <div class="top-box">
      <div class="set-up">
        <span class="icon iconfont icon-icon-test17"></span>
      </div>
      <div class="person-box" @click="viwePersonHomepage()" v-if="isLogin">
        <div class="person-img-box">
          <img :src="src" class="person-img" />
        </div>
        <div class="person-info">
          <p>{{username}}</p>
          <div class="member">
            <span>正式大会员</span>
          </div>
          <div class="coin">
            <span style="margin-right:25px;font-size:9px;">硬币：233</span>B币：0
          </div>
        </div>
        <div class="person-arrow">
          <span class="icon iconfont icon-jiantou"></span>
        </div>
      </div>
      <div class="btn-box" v-else>
        <button type="button" class="register" @click="register()">注册</button>
        <button type="button" class="login" @click="login()">登录</button>
      </div>
    </div>
    <div v-for="(items1,index) in itemsList" :key="index">
      <div class="personal-center">{{items1.type}}</div>
      <div class="pct-list">
        <div
          class="pct-item"
          v-for="(item,index1) in items1.items"
          :key="index1"
          :style="getHeight"
          @click="viewItem(item.id)"
        >
          <span class="icon iconfont" :class="item.icon" :style="{'color':item.color}"></span>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <div style="padding: 0 8px">
      <mt-button size="large" v-if="isLogin" type="danger" @click="logout()">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast, Button } from 'mint-ui'
import HeaderTop from '../../components/HeaderTop'
import 'mint-ui/lib/style.css'
// const axios = require('axios');
Vue.component(Button.name, Button)

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      getHeight: {
        height: ''
      },
      isLogin: window.localStorage.getItem('token') != null,
      username: '',
      src: '',
      itemsList: []
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    viewItem(id) {
      if (this.isLogin) {
        if (id == 2) {
          this.$router.push(`/item/${id}`)
        }
      } else {
        Toast('请先登录')
      }
    },
    register() {
      this.$router.push('/register')
    },
    login() {
      this.$router.push('/login')
    },
    logout() {
      window.localStorage.removeItem('token')
      this.isLogin = false
      this.username = ''
    },
    viwePersonHomepage() {
      this.$router.push('/personHomepage')
    },
    getUserInfo() {
      if (this.isLogin) {
        this.axios
          .get('user/info', {
            headers: { authorization: window.localStorage.getItem('token') }
          })
          .then(response => {
            //当请求成功才会触发
            this.username = response.data[0].username
            this.src = response.data[0].src
          })
          .catch(error => {
            // 当请求发生错误，就触发catch，打印出error报错信息
            console.log(error)
          })
          .then(() => {
            // 这代码段不管请求是否成功，都会执行
          })
      }
    }
  },
  mounted() {
    this.getHeight.height = window.innerWidth / 4 + 'px'
    this.axios
      .get('items/all')
      .then(response => {
        //当请求成功才会触发
        this.itemsList = response.data
      })
      .catch(error => {
        // 当请求发生错误，就触发catch，打印出error报错信息
        console.log(error)
      })
      .then(() => {
        // 这代码段不管请求是否成功，都会执行
      })
  }
}
</script>

<style scoped>
.container-my {
  padding-bottom: 74px;
}
p {
  margin: 0;
}
/* 顶部个人信息 */
.top-box {
  background-color: #fb7299;
}
/* 设置 */
.set-up {
  text-align: right;
  color: #fff;
  padding: 8px;
}
.set-up span {
  font-size: 20px;
  font-weight: bold;
}
.person-box {
  padding-bottom: 25px;
  margin-left: 25px;
  display: flex;
  align-items: center;
  color: #fff;
}
.person-img-box {
  flex: 1;
}
.person-img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}
.person-info {
  text-align: left;
  margin-left: 15px;
  flex: 4;
}
.person-info p {
  font-size: 14px;
}
.member {
  margin: 4px 0;
}
.member span {
  font-size: 9px;
  border: 1px solid #fff;
  border-radius: 6px;
  padding: 0 6px;
}
.coin {
  font-size: 9px;
  color: #e7e7df;
}
.person-arrow span {
  flex: 1;
  padding-right: 12px;
}
/* 注册登录 */
.btn-box {
  display: flex;
  justify-content: center;
}
.btn-box button {
  margin: 10px 10px 30px 10px;
  font-size: 14px;
  padding: 7px 25px;
  border-radius: 4px;
  border: none;
}
.register {
  background-color: rgba(255, 255, 255, 0.4);
  color: #fff;
}
.login {
  background-color: #fff;
  color: #fb7299;
}
/* 个人中心 */
.personal-center {
  text-align: left;
  padding: 6px 8px;
  border-bottom: 1px solid #efefef;
  border-top: 10px solid #efefef;
  /* margin: 0 -8px; */
}
/* 个人中心列表 */
.pct-list {
  display: flex;
  flex-wrap: wrap;
  /* margin: 0 -8px; */
}
.pct-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pct-item span {
  font-size: 30px;
  margin-bottom: 8px;
}
.pct-item p {
  font-size: 10px;
}
</style>