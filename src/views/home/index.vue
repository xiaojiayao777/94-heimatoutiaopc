<template>
<!-- 现在最外层放置一个大容器，因为小容器只能放在大容器里 -->
 <el-container>
   <!-- 左边侧边栏容器 -->
   <!-- style对象语法 -->
   <el-aside :style="{width:collapse?'64px':'230px'}"  style="transition:all 0.7; background:#2e2f32">
      <!-- 使用组件 -->
      <!-- 直接父组件的状态 传给子组件  collapse -->
      <layout-aside :collapse='collapse'></layout-aside>
   </el-aside>
   <!-- 右侧容器 一个大容器 可以再嵌套一个大容器 -->
   <el-container>
      <!-- 头部顶栏容器 -->
      <el-header>
         <layout-header></layout-header>
      </el-header>
      <!-- 主要区域 -->
      <el-main style="padding:0;">
         <!-- 这里应该放置一个二级容器  -->
         <!-- <h1>主要区域</h1> -->
         <router-view></router-view>
      </el-main>
   </el-container>
</el-container>
</template>

<script>
// 将我们的左侧导航组件引用进来
// import LayoutAside from '@/components/home/layout-aside'
// import LayoutHeader from '@/components/home/layout-header'
import eventBus from '@/utils/eventBus.js'
export default {
  // 局部注册
//   components: {
//     'layout-aside': LayoutAside,
//     'layout-header': LayoutHeader
//   }
  data () {
    return {
      collapse: false
    }
  },
  created () {
    // 切换了折叠的状态
    eventBus.$on('changeCollapse', () => {
      //  只要取反 就和头部组件的状态对应上了
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>

</style>
