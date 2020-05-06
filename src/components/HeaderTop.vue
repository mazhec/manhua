<template>
  <div class="header-box" :style="{'background-color':bgColor}">
    <div class="voice-left" v-if="type=='back'"><span class="icon iconfont icon-xiazai6"  @click="$router.go(-1)"></span></div>
    <div class="tab-list">
      <router-link :to="tab.path" tag='div' class="tab" :class="{'active':path==tab.path}" v-for="(tab,index) in tabs" :key="index" @click="ckTab(index)">{{tab.name}}</router-link>
    </div>
    <div class="search-right" v-if="isDisplayRight"><span class="icon iconfont icon-icon-test3" @click="search"></span></div>
  </div>
</template>

<script>
export default {
    name: '',
    props:{
        tabs:Array,
        activeIndex:Number,
        isDisplay:Boolean,
        isDisplayRight:Boolean,
        type:String,
        bgColor:String,
        path:''
    },
    data(){
      return{
      }
    },
    methods:{
      ckTab(index){
        this.$emit('tab-index', index)
      },
      search(){
        this.$router.push('/search')
    },
      mounted(){
      },
    }
}
</script>

<style scoped>
    /* 头部 */
  .header-box{
    height: 50px;
    line-height: 50px;
    /* background-color: #fb7299; */
    color: #FFFFFF;
    /* margin: 0 -8px 0 -8px; */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .tab-list{
    display: flex;
    justify-content: center;
  }
  .tab{
    margin: 0 15px 0 15px;
    height: 40px;
    /* border-bottom: 2px solid fb7299; */
  }
  /* 声音 */
  .voice-left{
    position: absolute;
    left: 15px;
    top: 0;
  }
  /* 搜索 */
  .search-right{
    position: absolute;
    right: 15px;
    top: 0;
  }
  .active{
    border-bottom: 2px solid #FFFFFF;
    color: #FFF;
  }
  .selected{
    color: #FFF;
  }
</style>