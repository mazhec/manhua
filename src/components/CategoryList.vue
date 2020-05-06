<template>
  <div class="category-box">
      <div class="category" v-for="(category,index) in categories" :key="index" @click="ckCate(category.id)">
        <div class="category-icon"><span class="icon iconfont" :class="category.icon" :style="{'color':category.color}"></span></div>
        {{category.name}}
      </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props:{
            categories:Array
        },
        data(){
            return {

            }
        },
        methods:{
          ckCate(id){
            this.$emit('category-click', id)
          }
        }
    }
</script>

<style scoped>
  

  .category-box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15px;
  }
  .category-icon span{
    font-size: 27px;
  }
</style>