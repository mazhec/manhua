<template>
  <div class="container">
      <HeaderTop :tabs="tabs" :bgColor="bgColor" :isDisplay="false" :type="type" :isDisplayRight="true"/>
      <div class="history-box" v-for="(history,index) in historyList" :key="index">
          <div class="day">{{history.day}}</div>
          <div class="video-info" v-for="(item,index1) in history.items" :key="index1" @click="viewVideo(item.id)">
              <img :src="item.src" class="img">
              <div class="info">
                  <h4>{{item.name}}</h4>
                  <span>{{item.part}}</span>
                  <span>{{item.dcr}}</span>
                  <p><span class="date" v-if="history.day!='更早'">{{history.day}}</span>{{formarCreateTime(item.time,history.day)}}</p>
              </div>
          </div>
      </div>
      <!-- <PlsLogin/> -->
  </div>
</template>

<script>
  import Vue from 'vue';
  import HeaderTop from '../components/HeaderTop';
  import PlsLogin from '../components/PlsLogin';
  import 'mint-ui/lib/style.css'
  var common = require('../assets/js/common')

//   const axios = require('axios');
  export default {
    name:'',
    components: {
      HeaderTop,PlsLogin
    },
    data(){
      return{
        tabs:[{name:'历史记录',path:''}],
        type:'back',
        bgColor:'#fb7299',
        isLogin: window.localStorage.getItem('token')!=null,
        historyList:[
            {
                day:'今天',items:[
                    {src:require('../assets/images/5.jpg'),name:'火影忍者',part:20,dcr:'血轮眼少年',time:'今天 20:00'},
                    {src:require('../assets/images/5.jpg'),name:'蜡笔小新',part:5,dcr:'嘤嘤嘤',time:'今天 20:00'},
                    {src:require('../assets/images/5.jpg'),name:'突然喜欢你',part:32,time:'今天 20:00'},
                    {src:require('../assets/images/5.jpg'),name:'舞动青春',part:9,time:'今天 20:00'},
                    {src:require('../assets/images/5.jpg'),name:'地狱少女',part:10,dcr:'零落的碎片',time:'今天 20:00'}
                ]
            },

            {
                day:'昨天',items:[
                    {src:require('../assets/images/5.jpg'),name:'暗芝居',part:20,time:'昨天 20:00'},
                    {src:require('../assets/images/5.jpg'),name:'蜡笔小新',part:5,time:'昨天 20:00'},
                ]
            },

            {
                day:'更早',items:[
                    {src:require('../assets/images/5.jpg'),name:'火影忍者',part:20,dcr:'血轮眼少年',time:'2020-3-15'},
                    {src:require('../assets/images/5.jpg'),name:'蜡笔小新',part:5,dcr:'嘤嘤嘤',time:'2020-3-15'},
                    {src:require('../assets/images/5.jpg'),name:'突然喜欢你',part:32,time:'2020-3-15'},
                ]
            }


        ]
      }
    },
    methods:{
        formarCreateTime(create_time,day){
            if(day=='更早')
                return common.dateFormat("YYYY-mm-dd HH:MM", new Date(create_time))
            else
                return common.dateFormat("HH:MM", new Date(create_time))
        },
        getHistoryList(){
            this.axios.get('history/list',{
                    headers: {'authorization': window.localStorage.getItem('token')}
                }).then((response) => {
                //当请求成功才会触发
                this.historyList = response.data
            }).catch((error) => {
                // 当请求发生错误，就触发catch，打印出error报错信息
                console.log(error);
            }).then(() => {
                // 这代码段不管请求是否成功，都会执行
            });
        },
        viewVideo(id){
            this.$router.push(`/video/${id}`)
            if(this.isLogin){
                this.axios.get(`history/all/${id}`,{
                        headers: {'authorization': window.localStorage.getItem('token')}
                    }).then((response) => {
                    //当请求成功才会触发
                    // this.followList = response.data
                    }).catch((error) => {
                        // 当请求发生错误，就触发catch，打印出error报错信息
                        console.log(error);
                    }).then(() => {
                        // 这代码段不管请求是否成功，都会执行
                    });
                };
        }
    },
    mounted(){
        var This = this;
        if(this.isLogin){
            This.getHistoryList()
        }
    }
  }
</script>

<style scoped>
    .container{
        padding-bottom: 0;
    }
    .history-box{
        padding: 0 8px;
    }
    h4,p{
        margin: 0;
    }
    /* 日期 */
    .day{
        text-align: left;
        padding: 6px 0;
    }
    .video-info{
        display: flex;
        margin-bottom: 8px;
    }
    .img{
        width: 40%;
        border-radius: 2px;
    }
    .info{
        text-align: left;
        margin-left: 10px;
        position: relative;
    }
    .info h4{
        margin: 3px 0 4px 0;
    }
    .info span{
        margin-right: 10px;
        display: inline-block;
    }
    .info p{
        position: absolute;
        font-size: 9px;
        color: #918597;
        bottom: 0;
    }
    .info p .date{
        font-size: 9px;
        margin-right: 3px;
    }
</style>