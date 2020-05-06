<template>
  <div class="container" :style="{width:width}">
    <HeaderTop :tabs="tabs" :bgColor="bgColor" :type="type" />
    <div class="register">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-button size="large" style="background-color: #fb7299;" type="primary" @click="login()">登录</mt-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Field, Toast, Button } from "mint-ui";
import HeaderTop from "../components/HeaderTop";
import "mint-ui/lib/style.css";
Vue.component(Button.name, Button);
// const axios = require("axios");

Vue.component(Field.name, Field);
export default {
  name: "",
  components: {
    HeaderTop
  },
  data() {
    return {
      tabs: [{ name: "登录", path: "" }],
      value: false,
      type: "back",
      username: "",
      width: null,
      bgColor: "#fb7299",
      password: ""
    };
  },
  methods: {
    login() {
      this.axios
        .post("login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          //当请求成功才会触发
          if (response.data.ok) {
            Toast({
              message: "登录成功"
            });
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem(
              "username",
              response.data.user.username
            );
            window.localStorage.setItem("userSrc", response.data.user.userSrc);
            this.$router.push("/my");
          } else {
            Toast(response.data.msg);
          }
        })
        .catch(error => {
          // 当请求发生错误，就触发catch，打印出error报错信息
          console.log(error);
        })
        .then(() => {
          // 这代码段不管请求是否成功，都会执行
        });
    }
  },
  mounted() {
    this.width = window.innerWidth - 20 + "px";
  }
};
</script>

<style scoped>
.container {
  padding: 50px 8px;
}
.register div {
  border-bottom: 1px solid #d3d7d4;
  margin-left: 10px;
}
</style>