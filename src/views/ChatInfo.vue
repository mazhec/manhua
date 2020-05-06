<template>
  <div class="container">
    <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type" />

    <div class="chat-info-box">
      <div
        class="chat-box"
        v-for="(chatInfo,index) in chatInfoList"
        :key="index"
        :class="{'reverse': !chatInfo.isMyself,'anther-right': chatInfo.isMyself}"
      >
        <div class="img">
          <img :src="chatInfo.src" alt />
        </div>
        <div class="chat-info">{{chatInfo.content}}</div>
      </div>
    </div>

    <div class="send-out-box">
      <!-- <mt-button type="default">default</mt-button> -->
      <input class="input" type="text" autocomplete="off" v-model="content" id="text" />
      <input
        class="nodisabled"
        type="button"
        :class="{'disabled':isButtonDisabled}"
        v-bind:disabled="isButtonDisabled"
        value="发送"
        id="sent-out-box"
        @click="sentOut()"
      />
      <!-- <input class="nodisabled" type="button" value="发送"> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderTop from '../components/HeaderTop'
import { Toast } from 'mint-ui'
import 'mint-ui/lib/style.css'
// const axios = require('axios')
export default {
  name: '',
  components: {
    HeaderTop
  },
  data() {
    return {
      tabs: [],
      type: 'back',
      bgColor: '#fb7299',
      content: null,
      isButtonDisabled: true,
      chatInfoList: [],
      isLogin: window.localStorage.getItem('token'),
      width: ''
    }
  },
  created() {
    this.getChatInfo()
  },
  methods: {
    getChatInfo() {
      this.axios
        .post(
          'chat/info',
          {
            sentId: this.$route.params.sentId,
            receiveId: this.$route.params.receiveId
          },
          {
            headers: { authorization: window.localStorage.getItem('token') }
          }
        )
        .then(response => {
          var tab = {}
          var arr = []
          tab.name = response.data[0].username
          tab.path = ''
          arr.push(tab)
          this.tabs = arr
          if (response.data[0].isMyself != undefined)
            this.chatInfoList = response.data
        })
    },
    sentOut() {
      if (this.isLogin) {
        this.axios
          .post(
            'chat/create',
            {
              sentId: this.$route.params.sentId,
              receiveId: this.$route.params.receiveId,
              content: this.content
            },
            {
              headers: { authorization: window.localStorage.getItem('token') }
            }
          )
          .then(response => {
            if (response.data.ok) this.getChatInfo()
            document.body.scrollTop = document.body.scrollHeight
            document.documentElement.scrollTop =
              document.documentElement.scrollHeight
          })
        this.content = ''
      } else {
        Toast('请先登录')
      }
    }
  },
  watch: {
    content(val, ovl) {
      // console.log(val)
      if (val != null && val != '') this.isButtonDisabled = false
      else this.isButtonDisabled = true
    }
  },
  mounted() {
    setTimeout(() => {
      document.body.scrollTop = document.body.scrollHeight
      document.documentElement.scrollTop = document.documentElement.scrollHeight
    }, 100)
  }
}
</script>

<style scoped>
.container {
  padding-top: 42px;
}
.chat-box {
  display: flex;
  margin-top: 25px;
}
.reverse {
  flex-direction: row-reverse;
  margin-left: 50px;
}
.anther-right {
  margin-right: 50px;
}
.img {
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 10px;
  width: 30px;
  height: 30px;
}
.img img {
  width: 100%;
  height: 100%;
}
.chat-info {
  background-color: #33a3dc;
  padding: 0 10px;
  border-radius: 4px;
  color: #fff;
  align-self: center;
  padding: 8px 10px;
  text-align: left;
  word-break: break-all;
}
/* 发送 */
.send-out-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
}
.input {
  flex: 1;
  border: none;
  padding: 6px;
  margin-right: 10px;
  border-radius: 25px;
  outline: none;
}
.nodisabled {
  border-radius: 25px;
  /* height: 27px; */
  border: none;
  padding: 5px 10px;
  background-color: #fb7299;
  color: #fff;
  outline: none;
}
.isTouch {
  background-color: rgba(251, 114, 153, 0.8);
}
.disabled {
  background-color: rgba(251, 114, 153, 0.6);
}
</style>