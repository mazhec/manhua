<template>
  <div class="chaseplay">
      <div class="chaseplay-box">
        <mt-button type="primary" class="chaseplay-item">番剧</mt-button>
        <mt-button type="danger" class="chaseplay-item">国创</mt-button>
      </div>
      <div class="timeandindex">
        <div class="timetable"><span class="icon iconfont icon-icon-test8"></span>时间表</div>
        <div class="indexs"><span class="icon iconfont icon-icon-test12"></span>索引</div>
      </div>
      <div>
        <FolkOperaList :chaseplays="chaseplays"/>
        <img class="chaseplay-bottom-img" src="../../assets/images/5.jpg" alt="">
      </div>
      <!-- <PlsLogin/> -->
  </div>
</template>

<script>
    import Vue from 'vue';
  import { Button } from 'mint-ui';
  import FolkOperaList from '../../components/FolkOperaList';
  import PlsLogin from '../../components/PlsLogin';
  import 'mint-ui/lib/style.css'

  // const axios = require('axios');
  Vue.component(Button.name, Button);

    export default {
  components: {
    FolkOperaList, PlsLogin
  },
  data() {
    return {
      isLogin: window.localStorage.getItem('token')!=null,
      chaseplays:[
        {id:1,iconLeft:'icon-icon-test11',nameLeft:'我的追番',iconRight:'icon-icon-test',nameRight:'查看更多',
          items:[]
        },
      ],
    }
  },
  methods:{
    getChaseplayList(){
      this.axios.get('chaseplay/all',{
              headers: {'authorization': window.localStorage.getItem('token')}
          }).then((response) => {
          //当请求成功才会触发
          this.chaseplays[0].items = response.data

          // console.log(response.data)
      }).catch((error) => {
          // 当请求发生错误，就触发catch，打印出error报错信息
          console.log(error);
      }).then(() => {
          // 这代码段不管请求是否成功，都会执行
      });
    },
  },
  created(){
    
  },
  mounted(){
    this.getChaseplayList()
  }
}
</script>

<style scoped>
    /* 追番 */
  /* 番剧 国创 */
  .chaseplay-box{
    margin: 8px 0 4px 0;
    padding: 10px 0 15px 0;
    display: flex;
    justify-content: space-evenly;
    color: #FFF;
    border-bottom: 1px solid #EFEFEF;
  }
  .chaseplay-item{
    border-radius: 30px;
    width: 105px;
    height: 36px;
  }
  /* 时间表 索引 */
  .timeandindex{
    display: flex;
    justify-content: space-around;
    padding: 0 0 5px 0;
    /* margin: 0 8px; */
    border-bottom: 10px solid #EFEFEF;
  }
  .timeandindex span{
    margin-right: 10px;
    font-size: 13px;
  }
  .chaseplay-bottom-img{
    margin-top: 15px;
    width: 97%;
    border-radius: 3px;
  }
</style>