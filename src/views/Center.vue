<template>
  <div class="container">
        <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type"/>
        <div v-if="isLogin">
            <div class="person-box">
                <div class="person-img-box">
                    <img :src="userSrc" class="person-img">
                </div>
                <div class="person-info">
                    <div class="name-box">
                        <span class="name">{{username}}</span>
                        <span class="ul-style">UL0</span>
                    </div>
                    <span class="gold-melon">金瓜子：0</span>
                    <span class="silver-melon">银瓜子：7000</span>
                </div>
            </div>
            <div class="memory-box" v-for="(items,index) in itemsList" :key="index">
                <div class="text">{{items.type}}</div>
                <div class="item-list">
                    <div class="item" v-for="(item,index1) in items.items" :key="index1" :style="getHeightAndWidth">
                        <span class="icon iconfont" :class="item.icon" :style="{'color':item.color}"></span>
                        <p>{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="instance-zones">
            <div class="text">副本掉落</div>
            <div class="item-list">
                <div class="item" :style="getHeightAndWidth"><span class="icon iconfont icon-icon-test9"></span><p>我的勋章</p></div>
                <div class="item" :style="getHeightAndWidth"><span class="icon iconfont icon-icon-test9"></span><p>我的头衔</p></div>
                <div class="item" :style="getHeightAndWidth"><span class="icon iconfont icon-icon-test8"></span><p>摇蛋机</p></div>
                <div class="item" :style="getHeightAndWidth"><span class="icon iconfont icon-icon-test8"></span><p>获奖记录</p></div>
            </div>
        </div>
        <div class="shop-box">
            <div class="text">氪金商店</div>
            <div class="item-list">
                <div class="item" :style="getHeightAndWidth"><span class="icon iconfont icon-icon-test9"></span><p>我的勋章</p></div>
                <div class="item" :style="getHeightAndWidth"><span class="icon iconfont icon-icon-test9"></span><p>我的头衔</p></div>
                <div class="item" :style="getHeightAndWidth"><span class="icon iconfont icon-icon-test8"></span><p>摇蛋机</p></div>
                <div class="item" :style="getHeightAndWidth"><span class="icon iconfont icon-icon-test8"></span><p>获奖记录</p></div>
            </div>
        </div> -->
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
                tabs:[{name:'直播中心',path:''}],
                value:false,
                type:'back',
                bgColor:'#fb7299',
                itemsList:[
                    {
                        id:1,title:'记忆之扉',
                        items:[
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'},
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'},
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'}
                        ]
                    },
                    {
                        id:1,title:'副本掉落',
                        items:[
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'},
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'},
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'},
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'}
                        ]
                    },
                    {
                        id:1,title:'氪金商店',
                        items:[
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'},
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'},
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'},
                            {icon:'icon-icon-test9',name:'我的直播间',color:'red'}
                        ]
                    }
                ],
                getHeightAndWidth:{
                    width:'',
                    height:'',
                },
                isLogin:window.localStorage.getItem('token')!=null,
                username:'',
                userSrc:''
            }
        },
        methods:{
            getItemsList(){
                this.axios.get('category/items')
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
            this.getHeightAndWidth.height = (window.innerWidth)/4 + 'px';
            this.getHeightAndWidth.width = (window.innerWidth)/4 + 'px';
            this.getItemsList()
            if(this.isLogin){
                this.axios.get('user/info',{
                    headers: {'authorization': window.localStorage.getItem('token')}
                }).then((response) => {
                //当请求成功才会触发
                this.username = response.data[0].username
                this.userSrc = response.data[0].src
                // console.log(response.data[0])
                }).catch((error) => {
                    // 当请求发生错误，就触发catch，打印出error报错信息
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>
    .container{
        background-color: #EFEFEF;
    }
    p{
        margin: 0;
    }
    /* 个人信息 */
    .person-box{
        display: flex;
        margin: 10px 0;
        padding: 6px 8px;
        background-color: #ffffff;
    }
    .person-img-box{
        margin-right: 10px;
        width: 45px;
        height: 45px;
        overflow: hidden;
        border-radius: 50%;
        position: relative;
    }
    .person-img{
        width: 100%;
        height: 100%;
    }
    .person-info{
        text-align: left;
    }
    .name-box{
        margin-bottom: 6px;
        display: flex;
        align-items: center;
    }
    .name{
        margin-right: 8px;
    }
    .ul-style{
        color: #918597;
        border: 1px solid #918597;
        border-radius: 4px;
        font-size: 9px;
        padding: 0 3px;
    }
    .gold-melon{
        font-size: 9px;
        color: #918597;
        margin-right: 20px;
    }
    .silver-melon{
        font-size: 9px;
        color: #918597;
    }
    /* 记忆之扉 */
    .memory-box{
        background-color: #ffffff;
        margin-bottom: 3px;
        border-bottom: 1px solid #EFEFEF;
    }
    .text{
        text-align: left;
        padding: 6px 8px;
        border-bottom: 1px solid #EFEFEF;
    }
    .item-list{
        display: flex;
    }
    .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .item span{
        font-size: 25px;
        margin-bottom: 4px;
    }
    .item p{
        font-size: 9px;
        color: #918597;
    }
    /* 副本掉落 */
    .instance-zones{
        background-color: #ffffff;
        margin-bottom: 10px;
    }
    /* 氪金商店 */
    .shop-box{
        background-color: #ffffff;
        border-bottom: 1px solid #EFEFEF;
    }
</style>