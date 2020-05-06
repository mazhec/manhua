<template>
  <div class="container">
          <div class="video-wrap">
            <iframe :src="this.activeVideo.URL" frameborder='0' allow='autoplay;encrypted-media' allowfullscreen style='width:100%;height:200px;'></iframe>
            <h3>{{this.activeVideo.title}}</h3>
       </div> 
  </div>
</template>

<script>
// import VideoPlayer from 'vue-video-player'
export default {
    // components: {
    //     VideoPlayer
    // },
    data() {
        return {
            activeVideo:{
                id:3,title:'test1',thumbnail:'./../../static/images/headImg.png',speaker:'harry', likes:0,views:0,describe:'good',
            URL:require('../../static/video/1.mp4')
            }
        }
    }
}
</script>

<style scoped>
 
</style>