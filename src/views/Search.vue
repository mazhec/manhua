<template>
  <div class="container" :style="{width:width}">
    <div class="top-box">
      <div class="search-box">
        <span class="icon iconfont icon-xiazai6"  @click="$router.go(-1)"></span>
        <input type="text" placeholder="搜索视频、番剧、up主或者AV号">
      </div>
      <div class="content-box">
        <p>大家都在搜</p>
        <div class="content">
          <div class="text">xiaopiu</div>
          <div class="text">优雅高效</div>
          <div class="text">xiaopiu--雪儿</div>
        </div>
        <div class="content">
          <div class="text">xiaopiu</div>
          <div class="text">优雅高效</div>
        </div>
      </div>
      <div class="view-more-box">
        <div class="line"></div>
        <div>查看更多</div>
        <div class="line"></div>
      </div>
    </div>

    <div class="list-box" v-for="(i,index) in itemsList" :key="index">
      <div class="item" v-for="(item,index1) in i.items" :key="index1">
        <span class="icon iconfont" :class="item.icon" :style="{'color':item.color}"></span>
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';
    import HeaderTop from '../components/HeaderTop';
    import 'mint-ui/lib/style.css'
    // const axios = require('axios');
  export default {
    name:'',
          components: {
          HeaderTop
          },
          data(){
              return{
                  itemsList:[
                      {
                          id:1,
                          items:[
                              {icon:'icon-icon-test9',name:'兴趣圈',color:'red'},
                              {icon:'icon-icon-test9',name:'话题中心',color:'green'},
                              {icon:'icon-icon-test9',name:'活动中心',color:'yellow'},
                              {icon:'icon-icon-test9',name:'小黑屋',color:'yellow'}
                          ]
                      },
                      {
                          id:1,
                          items:[
                              {icon:'icon-icon-test9',name:'原创排行榜',color:'red'},
                              {icon:'icon-icon-test9',name:'全区排行榜',color:'blue'},
                          ]
                      },
                      {
                          id:1,
                          items:[
                              {icon:'icon-icon-test9',name:'游戏中心',color:'red'},
                              {icon:'icon-icon-test9',name:'周边商城',color:'blue'},
                          ]
                      }
                  ],
                  width:'',
              }
          },
          methods:{
            getItemsList(){
                this.axios.get('category/search')
                .then((response) => {
                //当请求成功才会触发
                this.itemsList = response.data
                // console.log(response.data)
                }).catch((error) => {
                    // 当请求发生错误，就触发catch，打印出error报错信息
                    console.log(error);
                }).then(() => {
                    // 这代码段不管请求是否成功，都会执行
                });
            }
          },
          mounted(){
            this.getItemsList()
            this.width = window.innerWidth + 'px'
          }
  }
</script>

<style scoped>
  .container{
    padding: 0;
  }
  p{
    margin: 0;
  }
  .top-box{
    background-color: #fb7299;
    padding: 6px 8px;
  }
  /* 搜索框 */
  .search-box{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .search-box span{
    color: #fff;
  }
  .search-box input{
    margin: 0 10px;
    border-radius: 8px;
    border: none;
    padding:5px 5px 5px 30px;
    flex: 1;
    background: url(../assets/images/search.svg) no-repeat 5px center #fff;
  }
  /* 推荐内容 */
  .content-box{
    padding-left: 5px;
  }
  .content-box p{
    font-size: 9px;
    color: #fff;
    text-align: left;
  }
  .content{
    display: flex;
  }
  .text{
    color: #fff;
    background-color: rgba(211,211,211, 0.6);
    margin-right: 6px;
    margin-top: 6px;
    padding: 4px 8px;
    border-radius: 4px;
  }
  /* 查看更多 */
  .view-more-box{
    color: #fff;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .line{
    width: 80px;
    background-color: #EFEFEF;
    height: 1.6px;
    margin: 3px;
    opacity: 0.5;
  }
  /* 兴趣圈 */
  .list-box{
    border-bottom: 5px solid #EFEFEF;
  }
  .list-box{
    padding-left: 8px;
  }
  .item{
    display: flex;
    align-items: center;
    /* border-bottom: 1px solid #EFEFEF; */
    padding: 6px 0;
  }
  .item span{
    font-size: 18px;
    margin-right: 8px;
  }
  .item p{
    font-size: 12px;
  }
</style>