<template>
<!-- element布局组件 flex  el-row（行）和el-col（列） -->
  <el-row type="flex" align="middle" class="layout-header">
    <!-- :span是因为“12”本来是字符串，加上：之后就会看成数字 -->
     <el-col class="left" :span="12" >
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
     </el-col>
     <el-col class="right" :span="12">
       <el-row type="flex" justify="end" align="middle">
         <img src="http://img1.imgtn.bdimg.com/it/u=2003328295,1600589916&fm=26&gp=0.jpg" alt="">
         <!-- 下拉菜单 -->
         <el-dropdown trigger="click">
            <!-- 下拉菜单显示内容 -->
            <span>乔鹿的贼船</span>
            <!-- 下拉内容需要做具名插槽dropdown   el-dropdown-menu是专门做下拉内容效果的组件-->
            <el-dropdown-menu slot="dropdown" >
               <!-- 下拉选项 el-dropdown-item是专门做下拉选项的组件 -->
               <el-dropdown-item>个人信息</el-dropdown-item>
               <el-dropdown-item>git地址</el-dropdown-item>
               <el-dropdown-item>退出</el-dropdown-item>

            </el-dropdown-menu>

         </el-dropdown>
      </el-row>

     </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-header{
  height: 60px;
  .left{
    i{
      font-size: 20px;
    }
  }
  .right{
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right:10px;
    }
  }
}
</style>
