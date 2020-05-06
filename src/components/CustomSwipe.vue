<template>
  <div style="height:135px;">
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(banner,index) in banners" :key="index">
          <img :src='banner.src' class="banner-img"/>
        </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
    import Vue from 'vue';
    import { Swipe, SwipeItem, Header, Button } from 'mint-ui';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: '',
        props:{
            banners:Array
        },
        data(){
            return {

            }
        },
        methods:{
        }
    }
</script>

<style scoped>
  /* 轮播图 */
  .banner-img{
    width: 100%;
    height: 100%;
  }

</style>