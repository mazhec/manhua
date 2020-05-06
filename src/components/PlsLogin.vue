<template>
  <div class="con" :style="{width:width}">
      <p>还未登录请先登录</p>
      <div class="btn-box">
        <button type="button" class="register" @click="register()">注册</button>
        <button type="button" class="login" @click="login()">登录</button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            width:''
        }
    },
    mounted(){
        this.width = window.innerWidth + 'px'
    }
}
</script>

<style scoped>
    /* 请先登录 */
    .btn-box{
        /* margin-top: 10px; */
        display: flex;
        justify-content: space-between;
        padding: 50px 60px;
        background-color: #fb7299;
    }
    .btn-box button{
        /* background-color: #fb7299; */
        border: none;
        padding: 10px 30px;
        border-radius: 4px;
    }
    .register{
        background-color: rgba(255, 255, 255, 0.4);
        color: #fff;
    }
    .login{
        background-color: #fff;
        color: #fb7299;
    }
</style>