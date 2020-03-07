<template>
<!-- el-card 布局 -->
  <el-card>
     <!-- 放置面包屑  将面包屑给到卡片的具名插槽header-->
     <bread-crumb slot="header">
        <!-- 具名插槽 -->
        <template slot="title">
          素材管理
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
