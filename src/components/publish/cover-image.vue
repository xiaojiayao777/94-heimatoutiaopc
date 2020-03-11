<template>
  <div class="cover-image">
     <!-- v-for循环生成谁 就在谁的标签上写 -->
     <div v-for="(item,index) in list" :key="index" class="cover-image-item">
        <!--图片的地址等于item  -->
        <!-- 一开始item是个空字符串 此时应该根据item是否有值来决定来显示默认图片还是item -->
        <!-- item如果没有值就显示 默认图片 -->
        <!-- image如果不是固定地址的话 我们图片应该先转化成变量 -->
         <img :src="item ? item :defaultImg" alt="">
     </div>
  </div>
</template>

<script>
export default {
  // 接受传递的参数
  props: ['list'],
  data () {
    return {
      // 默认图片 需要先转成变量
      defaultImg: require('../../assets/img/13.jpg')
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image{
  display: flex;
  margin: 20px 100px;
  .cover-image-item{
   border: 1px solid #ccc;
   width: 250px;
   height: 250px;
   padding:20px;
   img{
     width: 100%;
     height: 100%;
   }
  }
}

</style>
