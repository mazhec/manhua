<template>
  <div class="container">
    <!-- 头部 -->
    <HeaderTop :tabs="tabs" :path="this.$route.path" :bgColor="bgColor" :activeIndex="activeIndex" :isDisplay="false" :isDisplayRight="true" @tab-index="changeTab"/>
    <transition>
      <router-view/>
    </transition>
  </div>
</template>
<script>

  import Vue from 'vue';
  import { Button } from 'mint-ui';
  import Broadcast from '../TabTop/Broadcast'
  import Recomment from '../TabTop/Recomment'
  import Chaseplay from '../TabTop/Chaseplay'
  import HeaderTop from '../../components/HeaderTop';
  import 'mint-ui/lib/style.css'

  // const axios = require('axios');
  Vue.component(Button.name, Button);

export default {
  name: 'Home',
  components: {
    HeaderTop, Broadcast, Recomment, Chaseplay
  },
  data() {
    return {
      tabs:[{name:'直播',path:'/home/broadcast'},{name:'推荐',path:'/home/recomment'},{name:'追番',path:'/home/chaseplay'}],
      activeIndex: 1,
      bgColor:'#fb7299',
      isLogin: window.localStorage.getItem('token')!=null,
    }
  },
  methods:{
    changeTab(index){
      // this.activeIndex = index
      // window.localStorage.setItem('activeIndex', this.activeIndex)//把当前选中的标签索引存到本地存储
    },
  },
  created(){
    
  },
  mounted(){
  }
}
</script>
<style scoped>
.v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active{
    transition: all 0.4s ease;
  }

 
</style>
