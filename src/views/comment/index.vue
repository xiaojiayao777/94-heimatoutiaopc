<template>
<!-- 用一个el-card组件作主页面 -->
<el-card>
<!-- 使用面包屑 谁用面包屑谁填坑 放置一个面包屑 slot="header"表示面包屑会作为具名插槽给card的header部分-->
   <bread-crumb slot="header">
   <!-- slot="title"表示评论管理给面包屑的插槽 -->
      <template slot="title">
        评论管理
      </template>
   </bread-crumb>
</el-card>

</template>

<script>
export default {

}
</script>

<style>

</style>
