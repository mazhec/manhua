<template>
  <div class="container">
      <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type"/>
      <div v-if="fid==2">
          <!-- 轮播图 -->
          <CustomSwipe :banners="banners" style="margin:8px;height: 125px"/>
          <!-- 番剧列表 -->
          <FolkOperaList :chaseplays="chaseplays"/>
          <div class="other-box" v-for="(other,index) in others" :key="index">
              <div class="top">
                  <div class="left"><span class="icon iconfont" :class="other.leftIcon"></span>{{other.left}}</div>
                  <div class="right">{{other.right}}<span class="icon iconfont" :class="other.right"></span></div>
              </div>
              <div class="bottom">
                  <img :src="other.src" class="img">
                  <p>{{other.dcr}}</p>
                  <span>{{other.type}}</span>
              </div>
          </div>
      </div>
      <div v-else>
          <HeaderTop :tabs="tabs" :type="type"/>
          <h1 style="margin-top:300px">什么都木有</h1>
      </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    import HeaderTop from '../components/HeaderTop';
    import CustomSwipe from '../components/CustomSwipe';
    import FolkOperaList from '../components/FolkOperaList';
    import 'mint-ui/lib/style.css'
    // const axios = require('axios');
    export default {
        name: 'Home',
        components: {
            HeaderTop, CustomSwipe, FolkOperaList
        },
        data() {
            return {
                fid:null,
                tabs:[{name:'番剧',path:''}],
                banners:[],
                bgColor:'#fb7299',
                type:'back',
                width:'',
                chaseplays:[
                    {id:1,iconLeft:'icon-icon-test11',nameLeft:'新番连载',iconRight:'icon-icon-test',nameRight:'时间表',
                        items:[
                            {src:require('../assets/images/11.jpg'),name:'南方公园',part:'十八',total:10,isLook:'尚未观看'},
                            {src:require('../assets/images/11.jpg'),name:'南方公园',part:'十八',total:10,isLook:'尚未观看'},
                            {src:require('../assets/images/11.jpg'),name:'南方公园',part:'十八',total:10,isLook:'尚未观看'},
                            {src:require('../assets/images/11.jpg'),name:'南方公园',part:'十八',total:10,isLook:'尚未观看'},
                            {src:require('../assets/images/11.jpg'),name:'南方公园',part:'十八',total:10,isLook:'尚未观看'},
                            {src:require('../assets/images/11.jpg'),name:'南方公园',part:'十八',total:10,isLook:'尚未观看'},
                        ]
                    },
                    {id:2,iconLeft:'icon-icon-test11',nameLeft:'4月新番',iconRight:'icon-icon-test',nameRight:'分享列表',
                        items:[
                            {src:require('../assets/images/11.jpg'),name:'南方公园',part:'十八',total:10,isLook:'尚未观看'},
                            {src:require('../assets/images/11.jpg'),name:'南方公园',part:'十八',total:10,isLook:'尚未观看'},
                            {src:require('../assets/images/11.jpg'),name:'南方公园',part:'十八',total:10,isLook:'尚未观看'},
                        ]
                    },
                ],
                others:[
                    {id:1,left:'精彩推荐',leftIcon:'icon-dianzan',right:'更多',rightIcon:'icon-jiantou',src:require('../assets/images/5.jpg'),dcr:'xiaopiu优雅高效在线APP原型',type:'超强原型工具'},
                    {id:2,left:'资讯档',leftIcon:'icon-dianzan',right:'更多',rightIcon:'icon-jiantou',src:require('../assets/images/5.jpg'),dcr:'xiaopiu优雅高效在线APP原型',type:'超强原型工具'},
                    {id:3,left:'周末剧场',leftIcon:'icon-dianzan',right:'更多',rightIcon:'icon-jiantou',src:require('../assets/images/5.jpg'),dcr:'xiaopiu优雅高效在线APP原型',type:'超强原型工具'},
                    {id:4,left:'泡面档',leftIcon:'icon-dianzan',right:'更多',rightIcon:'icon-jiantou',src:require('../assets/images/5.jpg'),dcr:'xiaopiu优雅高效在线APP原型',type:'超强原型工具'},
                ]
            }
        },
        methods:{
            getBanner(){
                //请求
                this.axios.get('banner/all')
                .then((response) => {
                    //当请求成功才会触发
                    this.banners = response.data
                })
                .catch((error) => {
                    // 当请求发生错误，就触发catch，打印出error报错信息
                    console.log(error);
                })
                .then(() => {
                    // 这代码段不管请求是否成功，都会执行
                });
            },
        },
        mounted(){
            this.fid = this.$route.params.fid;
            this.tabs[0].name = this.$route.params.type
            this.getBanner()
        }
    }
</script>

<style scoped>
    .container{
        padding-bottom: 0;
    }
    p{
        margin: 0;
    }
    /* 精彩推荐 */
    .other-box{
        padding: 0 8px 10px 8px;
        border-top: 10px solid #EFEFEF;
    }
    .top{
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
    }
    .left{
        font-size: 10px;
    }
    .left span{
        font-size: 14px;
        color: red;
        margin-right: 5px;
    }
    .right{
        font-size: 10px;
    }
    .right span{
        font-size: 11px;
        margin-left: 5px;
    }
    /* 图片 */
    .img{
        width: 100%;
        border-radius: 5px;
    }
    /* 底部 */
    .bottom{
        text-align: left;
        box-shadow: -0.5px 0.5px 2px  #918597;
        border-radius: 4px;
    }
    .bottom p{
        font-size: 10px;
        margin: 4px;
    }
    .bottom span{
        font-size: 9px;
        color: #918597;
        margin-left: 4px;
        display: block;
        padding-bottom: 4px;
    }
</style>