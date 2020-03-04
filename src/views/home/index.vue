<template>
<!-- 现在最外层放置一个大容器，因为小容器只能放在大容器里 -->
 <el-container>
   <!-- 左边侧边栏容器 -->
   <el-aside>
      <h1>左侧导航区域</h1>
   </el-aside>
   <!-- 右侧容器 一个大容器 可以再嵌套一个大容器 -->
   <el-container>
      <!-- 头部顶栏容器 -->
      <el-header>
         <h1>顶部操作栏</h1>
      </el-header>
      <!-- 主要区域 -->
      <el-main>
         <!-- 这里应该放置一个二级容器  -->
         <h1>主要区域</h1>
         <router-view></router-view>
      </el-main>
   </el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
