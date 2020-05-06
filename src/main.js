import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
