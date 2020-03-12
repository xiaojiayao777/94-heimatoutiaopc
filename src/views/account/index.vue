<template>
  <el-card>
     <bread-crumb slot="header">
        <template slot="title"></template>
     </bread-crumb>
     <!-- 放置表单容器 -->
     <el-form label-width="100px">
        <!-- 表单域 -->
        <el-form-item label="用户名">
           <el-input style="width:30%">
           </el-input>
        </el-form-item>
        <el-form-item label="简介">
           <el-input style="width:30%">
           </el-input>
        </el-form-item>
        <el-form-item label="邮箱">
           <el-input style="width:30%">
           </el-input>
        </el-form-item>
        <el-form-item label="手机号">
           <!-- 可以看到 不能改 是登陆标志 -->
           <el-input disabled style="width:30%">
           </el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary">保存</el-button>
        </el-form-item>
     </el-form>
     <!-- 头像 -->
     <img class="head-upload" src="../../assets/img/13.jpg" alt="">
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="less">
.head-upload{
   position: absolute;
   right: 300px;
   top: 160px;
   width: 200px;
   height: 200px;
   border-radius: 50%;
}

</style>
