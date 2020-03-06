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
   <!-- 表格组件 -->
   <el-table :data="list">
      <!-- 使用el-table-column作为列 -->
      <!-- prop 表示显示的字段  给el-table-column一个formatter属性 用来格式化内容 因为table表格中用formatter来显示布尔值cellValue-->
      <el-table-column  prop="title" width="600"  label="标题"></el-table-column>
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column  label="操作">
         <!-- y依然可以放组件 -->
         <el-button size="small" type="text">修改</el-button>
         <el-button size="small" type="text">关闭评论</el-button>
      </el-table-column>

   </el-table>
</el-card>

</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //   先定义一个获取评论数据的方法
    getComment () {
      //  用axios调用接口
      this.$axios({
        // 请求地址
        url: '/articles',
        //   qurey参数应该在哪个位置传
        // axios 有两个传参的地方 params传get参数也就是query参数  data传body参数也就是请求体参数
        params: {
          // 此参数是用来控制获取数据类型
          response_type: 'comment'
        }
      }).then(result => {
        // 应该将返回结果中的数组 给list
        this.list = result.data.results
      //   console.log(result)
      })
    },
    //  定义一个格式化布尔值
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    //   在created 钩子函数中直接获取数据
    this.getComment()
  }

}
</script>

<style>

</style>
