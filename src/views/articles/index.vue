<template>
  <el-card>
    <bread-crumb slot="header">
       <template slot="title">
         文章列表
       </template>
    </bread-crumb>
    <!-- 搜索工具栏 筛选 -->
    <!-- 表单容器 -->
    <!-- 如果你不对表单进行校验及其他检查的话  就不需要写model/rules/prop-->
    <el-form style="padding-left:50px">
       <el-form-item label="文章状态：">
         <!-- 放置单选框组 -->
          <el-radio-group >
             <!-- 放置单选框选项 -->
             <el-radio >全部</el-radio>
             <el-radio >草稿</el-radio>
             <el-radio >待审核</el-radio>
             <el-radio >审核通过</el-radio>
             <el-radio >审核失败</el-radio>
          </el-radio-group>
       </el-form-item>
       <el-form-item label="频道类型：">
         <!-- 选择器 -->
         <el-select placeholder="请选择频道"></el-select>
       </el-form-item>
       <el-form-item label="日期范围：">
          <!-- 日期范围选择组件 type属性要设置daterange-->
          <el-date-picker type="daterange"></el-date-picker>
       </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      value: '2'
    }
  }
}
</script>

<style>

</style>
