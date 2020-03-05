<template>
<!-- 使用elementUI的面包屑 设置一下分隔符-->
  <el-breadcrumb separator="">
    <!-- el-breadcrumb-item相当于router-link -->
     <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
     <!-- 第二个选项是动态的 需要通过传值的方式传进来 props传值 slot插槽 -->
     <!-- 内容是动态的 -->
     <el-breadcrumb-item>
       <!-- 定义一个具名插槽 -->
       <slot name="title"></slot>
     </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
