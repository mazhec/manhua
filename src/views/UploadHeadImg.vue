<template>
  <div class="container" :style="{width:width}">
    <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type" />
    <div class="img">
      <img
        ref="aaa"
        :style="{ transform: slideEffect,top:top+'px',left:left+'px' }"
        :src="src"
        alt
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchend"
      />
      <!-- <input type="file" @change="getFile($event)"> -->
      <a v-if="isDisplay" class="input-file input-fileup">
        +
        <input size="100" type="file" name="file" id="file" @change="getFile($event)" />
      </a>
    </div>
    <input class="upload" type="button" value="确定上传" @click="upload()" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'mint-ui'
import HeaderTop from '../components/HeaderTop'
// const axios = require('axios')
export default {
  name: 'HelloWorld',
  components: {
    HeaderTop
  },
  data() {
    return {
      top: 0,
      left: 0,
      startX: 0,
      startY: 0,
      disX: 0,
      disY: 0,
      slideEffect: '',
      flag: false,
      bgColor: '#fb7299',
      tabs: [{ name: '上传头像', path: '' }],
      type: 'back',
      myFormData: null,
      src: '',
      file: '',
      width: '',
      isDisplay: true
    }
  },
  methods: {
    getFile(event) {
      this.isDisplay = false
      this.src = window.URL.createObjectURL(event.target.files[0])
      this.file = event.target.files[0] //获取上传元素信息
      event.preventDefault()
      // 只能通过formData方式来传输文件
    },
    touchStart(ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length == 1) {
        this.startX = ev.touches[0].clientX // 记录开始位置
        this.startY = ev.touches[0].clientY // 记录开始位置
      }
    },
    touchMove(ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length == 1) {
        this.flag = true
        this.disX = ev.touches[0].clientX - this.startX
        this.disY = ev.touches[0].clientY - this.startY
        this.slideEffect =
          'translate(' + this.disX + 'px' + ',' + this.disY + 'px' + ')'
      }
    },
    touchend(ev) {
      if (this.flag) {
        this.slideEffect = ''
        var top = this.top
        var left = this.left
        this.top = top + this.disY
        this.left = left + this.disX
        this.flag = false
      }
    },
    upload() {
      if (!this.isDisplay) {
        var formData = new FormData()
        formData.append('file', this.file)
        this.axios
          .post('upload/img', formData, {
            headers: { authorization: window.localStorage.getItem('token') }
          })
          .then(response => {
            if (response.data.ok) {
              Toast(response.data.msg)
              this.src = ''
              this.isDisplay = true
            }
          })
      } else {
        Toast({ message: '请选择图片' })
      }
    }
  },
  mounted() {
    this.width = window.innerWidth + 'px'
  }
}
</script>

<style scoped>
.img {
  width: 150px;
  height: 150px;
  /* line-height: 150px; */
  text-align: center;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  /* padding: 10px; */
  /* background-color: blueviolet; */
  margin: 0 auto;
  margin-top: 80px;
  border: 1px solid #a1a3a6;
  font-size: 30px;
}
.img img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.input-file {
  display: inline-block;
  position: relative;
  overflow: hidden;
  text-align: center;
  width: 150px;
  /* background-color: #2c7; */
  border: solid 1px #ddd;
  border-radius: 4px;
  /* padding: 5px 10px; */
  font-size: 30px;
  font-weight: normal;
  height: 150px;
  line-height: 150px;
  /* color:#fff; */
  text-decoration: none;
}
.input-file input[type='file'] {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  background-color: #fff;
  transform: translate(-300px, 0px) scale(4);
  height: 40px;
  opacity: 0;
  filter: alpha(opacity=0);
}
.upload {
  background-color: #fb7299;
  border: none;
  color: #fff;
  padding: 4px 6px;
  border-radius: 4px;
  margin-top: 10px;
}
</style>