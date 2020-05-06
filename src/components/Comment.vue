<template>
  <div class="container">
    <div class="comment-box" v-for="(comment,index) in commentList" :key="index">
      <div class="comment-psn">
        <img :src="comment.src" class="person-img1" />
        <div class="psn-info">
          <p>{{comment.username}}</p>
          <span>{{formarCreateTime(comment.time)}}</span>
        </div>
      </div>
      <div class="comment-info">
        <p>{{comment.comment}}</p>
        <div class="comment-bottom">
          <div class="comment-item">
            <span class="icon iconfont icon-icon-test8"></span>
            <span>21</span>
          </div>
          <div class="comment-item">
            <span class="icon iconfont icon-dianzan1"></span>
            <span>60</span>
          </div>
          <div class="comment-item">
            <span class="icon iconfont icon-jifen"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="send-out-box">
      <input class="text-input" type="text" autocomplete="off" v-model="text" id="text" />
      <input
        class="nodisabled"
        type="button"
        :class="{'disabled':isButtonDisabled}"
        v-bind:disabled="isButtonDisabled"
        value="发送"
        id="sent-out-box"
        @click="sentOut()"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderTop from '../components/HeaderTop'
import Introduce from '../components/Introduce'
import { Button, Toast, MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'

// const axios = require('axios')
Vue.component(Button.name, Button)

var common = require('../assets/js/common')
export default {
  name: '',
  components: {
    HeaderTop
  },
  data() {
    return {
      width: '',
      isLogin: window.localStorage.getItem('token') != null,
      commentList: [
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        },
        {
          src: require('../assets/images/5.jpg'),
          username: '米开朗杰森',
          time: '2小时前',
          comment: '拉斯建档立卡射箭打升到级阿斯加德'
        }
      ],
      text: null,
      isButtonDisabled: true
    }
  },
  computed: {},
  created() {
    this.getCommentList()
  },
  methods: {
    sentOut() {
      if (this.isLogin) {
        this.axios
          .post(
            'send/comment',
            {
              commentContent: this.text,
              videoId: this.$route.params.id
            },
            {
              headers: { authorization: window.localStorage.getItem('token') }
            }
          )
          .then(response => {
            if (response.data.length > 0) {
              Toast({
                message: '评论成功',
                iconClass: 'icon icon-success'
              })
              this.commentList = response.data
              document.body.scrollTop = 0
              document.documentElement.scrollTop = 0
            } else {
              Toast({
                message: '评论失败'
              })
            }
          })
      } else {
        Toast('请先登录')
      }
      this.text = null
    },
    getCommentList() {
      this.axios
        .get(`comment/all/${this.$route.params.id}`)
        .then(response => {
          //当请求成功才会触发
          this.commentList = response.data
        })
        .catch(error => {
          // 当请求发生错误，就触发catch，打印出error报错信息
          console.log(error)
        })
        .then(() => {
          // 这代码段不管请求是否成功，都会执行
        })
    },
    formarCreateTime(create_time) {
      return common.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(create_time))
    }
  },
  watch: {
    text(val, ovl) {
      // console.log(val)
      if (val != null && val != '') this.isButtonDisabled = false
      else this.isButtonDisabled = true
    }
  },
  mounted() {}
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
/* 评论页面 */
.person-img1 {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.comment-box {
  padding: 6px 8px;
  border-bottom: 1px solid #efefef;
}
.comment-psn {
  display: flex;
  /* align-items: center; */
}
.psn-info {
  margin-left: 6px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.psn-info span {
  font-size: 9px;
  color: #a1a3a6;
}
.comment-info {
  text-align: left;
  margin: 4px 0 0 27px;
}
.comment-info p {
  font-size: 11px;
}
.comment-bottom {
  display: flex;
  align-items: center;
  margin: 8px 0 2px 0;
}
.comment-item {
  margin-right: 25px;
  font-size: 11px;
}
.comment-item span {
  font-size: 11px;
  margin-right: 3px;
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
.text-input {
  flex: 8;
  border: none;
  padding: 6px;
  margin-right: 10px;
  border-radius: 25px;
  outline: none;
}
.nodisabled {
  border-radius: 25px;
  /* height: 27px; */
  /* flex: 2; */
  border: none;
  padding: 5px 10px;
  background-color: #d11449;
  color: #fff;
  outline: none;
}
.disabled {
  background-color: rgba(251, 144, 153, 0.9);
}
</style>