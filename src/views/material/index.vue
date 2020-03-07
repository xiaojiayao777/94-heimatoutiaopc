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
     <!-- 放置标签页 v-model所绑定的值 就是当前所激活的页签-->
     <el-tabs v-model="activeName">
        <!--lable表示标签显示的内容  -->
        <el-tab-pane label="全部" name="all">
            <!-- 内容 -->
        </el-tab-pane>
        <el-tab-pane label="收藏" name="collect">
            <!-- 内容 -->

        </el-tab-pane>
     </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 当前激活的页签
      activeName: 'all'
    }
  }
}
</script>

<style>

</style>
