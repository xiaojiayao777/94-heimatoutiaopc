<template>
  <!-- 二级路由的默认组件 -->
  <div class="second-home">
    <!-- 幻灯片 -->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ['http://img.netbian.com/file/2019/0220/52ea84369dd40268d595766c76fda7f3.jpg',
        'http://img.netbian.com/file/2020/0101/ed53728a0593fca90d434019c9b9be23.jpg',
        'http://img0.imgtn.bdimg.com/it/u=3638437088,2703654524&fm=26&gp=0.jpg',
        'http://img4.imgtn.bdimg.com/it/u=2096603689,1889806653&fm=26&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=3956287167,4089297313&fm=26&gp=0.jpg',
        'http://img5.imgtn.bdimg.com/it/u=1617632401,88084066&fm=15&gp=0.jpg',
        'http://img3.imgtn.bdimg.com/it/u=2626933181,578186626&fm=26&gp=0.jpg']
    }
  }
}
</script>

<style>
.second-home {
  /* calc是计算的意思 可在css中计算数值  用法calc（四则运算） 变量之间和运算符之间一定要有空格*/
  height: calc(100vh - 60px);
  background-size: cover;
  background-image: url(https://pic.qqtn.com/up/2019-5/15579893934255491.jpg);
}
</style>
