<template>
    <div>
        <div class="margin" v-for="(chaseplay,index) in chaseplays" :key="index">
            <div class="chaseplay-content-top">
                <div class="my-chaseplay"><span class="icon iconfont" :class="chaseplay.iconLeft"></span>{{chaseplay.nameLeft}}</div>
                <div class="view-all">{{chaseplay.nameRight}}<span class="icon iconfont" :class="chaseplay.iconRight"></span></div>
            </div>
            <div class="chaseplay-content-center">
                <div class="chaseplay-content-item" v-for="(item,index1) in chaseplay.items" :key="index1">
                    <img class="chaseplay-item-img" :src="item.src">
                    <span style="margin-right:5px;">{{item.name}}</span>
                    <span>第{{item.part}}季</span>
                    <p style="color: red;">全{{item.total}}话</p>
                    <p style="color: #a1a3a6;">{{item.isLook}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import 'mint-ui/lib/style.css'
    export default {
        name: 'Home',
        props:{
            chaseplays:Array
        },
        components: {
        },
        data() {
            return {
            }
        },
        methods:{
        },
        mounted(){
        }
    }
</script>

<style scoped>
/* 追番的内容 */
  .chaseplay-content-top{
    display: flex;
    justify-content: space-between;
  }
  .chaseplay-content-top div{
    font-size: 11px;
  }
  .my-chaseplay span{
    margin-right: 5px;
    color: #ef5b9c;
    font-size: 11px;
  }
  .view-all span{
    margin-left: 5px;
    font-size: 11px;
  }
  /* 番剧 */
  p{
      margin: 0;
  }
  
  .chaseplay-content-center{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .chaseplay-content-item{
    width: 30%;
    text-align: left;
    margin-top: 5px;
  }
  .chaseplay-content-item span{
    font-size: 9px;
  }
  .chaseplay-content-item p{
    font-size: 8px;
  }
  .chaseplay-item-img{
    width: 100%;
    border-radius: 3px;
  }
  .video-person{
    display: none;
  }
  .margin{
      /* margin: 0 -8px; */
      padding: 6px 8px;
  }
</style>