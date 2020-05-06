import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Tabbar/Home.vue'),
    children:[
      {
        path: '/home',
        redirect: '/home/recomment'
      },
      {
        path: '/home/chaseplay',
        name: 'Chaseplay',
        component: () => import('../views/TabTop/Chaseplay.vue')
      },
      {
        path: '/home/recomment',
        name: 'Recomment',
        component: () => import('../views/TabTop/Recomment.vue')
      },
      {
        path: '/home/broadcast',
        name: 'Broadcast',
        component: () => import('../views/TabTop/Broadcast.vue')
      }
    ]
  },
  {
    path: '/partition',
    name: 'Partition',
    component: () => import('../views/Tabbar/Partition.vue')
  },
  {
    path: '/dynamic',
    name: 'Dynamic',
    component: () => import('../views/Tabbar/Dynamic.vue')
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('../views/Tabbar/Info.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('../views/Tabbar/My.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/category/1',
    name: 'Follow',
    component: () => import('../views/Follow.vue')
  },
  {
    path: '/category/2',
    name: 'Center',
    component: () => import('../views/Center.vue')
  },
  {
    path: '/category/3',
    name: 'SmallVideo',
    component: () => import('../views/SmallVideo.vue')
  },
  {
    path: '/category/4',
    name: 'SearchBtn',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/category/5',
    name: 'Category',
    component: () => import('../views/Category.vue')
  },
  {
    path: '/folkOpera/:fid/:type',
    name: 'FolkOpera',
    component: () => import('../views/FolkOpera.vue')
  },
  {
    path: '/video/:id',
    name: 'videoDetail',
    component: () => import('../views/videoDetail.vue'),
    // children:[
    //   {
    //     path: '/home',
    //     redirect: '/home/recomment'
    //   },
    //   {
    //     path: '/home/chaseplay',
    //     name: 'Chaseplay',
    //     component: () => import('../views/TabTop/Chaseplay.vue')
    //   },
    //   {
    //     path: '/home/recomment',
    //     name: 'Recomment',
    //     component: () => import('../views/TabTop/Recomment.vue')
    //   },
    //   {
    //     path: '/home/broadcast',
    //     name: 'Broadcast',
    //     component: () => import('../views/TabTop/Broadcast.vue')
    //   }
    // ]
  },
  {
    path: '/item/2',
    name: 'HistoricalRecord',
    component: () => import('../views/HistoricalRecord.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/personHomepage',
    name: 'PersonHomepage',
    component: () => import('../views/PersonHomepage.vue')
  },
  {
    path: '/accountInfo',
    name: 'AccountInfo',
    component: () => import('../views/AccountInfo.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/UploadHeadImg.vue')
  },
  {
    path: '/chatInfo/:sentId/:receiveId',
    name: 'ChatInfo',
    component: () => import('../views/ChatInfo.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:'selected'
})

export default router
