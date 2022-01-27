<template>
  <div class="container">
    <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type" />
    <div class="category-list">
      <div
        class="category-item"
        :style="getHeightAndWidth"
        v-for="(category,index) in categoryList"
        :key="index"
      >
        <span class="icon iconfont" :class="category.icon" :style="{'color':category.color}"></span>
        <p>{{category.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderTop from '../components/HeaderTop'
import 'mint-ui/lib/style.css'
// const axios = require('axios');
export default {
  name: '',
  components: {
    HeaderTop
  },
  data() {
    return {
      tabs: [{ name: '全部分类', path: '' }],
      type: 'back',
      bgColor: '#fb7299',
      getHeightAndWidth: {
        width: '',
        height: ''
      },
      categoryList: [
        { id: 1, icon: 'icon-icon-test17', name: '手游直播', color: 'red' },
        { id: 2, icon: 'icon-icon-test17', name: '嗨宅推荐', color: 'blue' },
        { id: 3, icon: 'icon-icon-test17', name: '绘画专区', color: 'prink' },
        { id: 4, icon: 'icon-icon-test17', name: '网络游戏', color: 'red' },
        { id: 5, icon: 'icon-icon-test17', name: '单机联机', color: 'green' },
        { id: 6, icon: 'icon-icon-test17', name: '电子竞技', color: 'red' },
        { id: 7, icon: 'icon-icon-test17', name: '唱见舞见', color: 'blue' },
        { id: 8, icon: 'icon-icon-test17', name: '生活娱乐', color: 'red' },
        { id: 9, icon: 'icon-icon-test17', name: '御宅文化', color: 'prink' },
        { id: 10, icon: 'icon-icon-test17', name: '放映厅', color: 'red' },
        { id: 11, icon: 'icon-icon-test17', name: '精彩轮播', color: 'yellow' }
      ]
    }
  },
  methods: {
    getCategoryItem() {
      this.axios
        .get('category/item')
        .then(response => {
          //当请求成功才会触发
          this.categoryList = response.data
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
    this.getHeightAndWidth.height = parseInt((window.innerWidth - 16) / 3) + 'px'
    this.getHeightAndWidth.width = parseInt((window.innerWidth - 16) / 3) + 'px'
    this.getCategoryItem()
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
.category-list {
  display: flex;
  /* justify-content: flex-start; */
  flex-wrap: wrap;
}
.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.category-item span {
  font-size: 40px;
}
.category-item p {
  font-size: 10px;
}
</style>