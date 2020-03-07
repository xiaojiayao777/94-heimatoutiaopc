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
        <!-- el-table-column 组件 在插槽中传出了row $index store column -->
        <!-- 插槽-作用域插槽--子组件的数据通过插槽传出 slot-scope接收  row（行数据）$index(索引) -->
         <!-- y依然可以放组件 -->
         <template slot-scope="obj">
            <el-button size="small" type="text">修改</el-button>
            <!-- 文本内容要根据 当前行里面评论状态决定显示还是隐藏   行数据的行状态-->
            <el-button @click="openorClose(obj.row)" size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
         </template>

      </el-table-column>

   </el-table>
   <!-- 放置分页组件  需要动态的数据    total是当前总条数  current_page当前的页码  page-size每页多少条  @current-change监听事件-->
   <el-row style="height:80px" type="flex" align="middle" justify="center">
       <el-pagination background layout='prev,pager,next' :current-page="page.currenPage" :total="page.total" :page-size="page.pageSize" @current-change="changePage"></el-pagination>
   </el-row>

</el-card>

</template>

<script>
export default {
  data () {
    return {
    //  分页参数单独放置一个对象 让数据更清晰
      page: {
        // 默认总条数是0
        total: 0,
        // 默认页码是第一页  决定了当前页码是第几页
        currenPage: 1,
        // 当前页码的条数  当前页码有多少条 默认是10条
        pageSize: 10

      },
      list: []
    }
  },
  methods: {
    // 定义一个页码改变事件  newPage就是点击切换的最新页面  将最新的页码设置给page下的当前页码
    changePage (newPage) {
      this.page.currenPage = newPage
      // 页码已经切换成最新的了 重新拉取数据
      this.getComment()
    },
    //   先定义一个获取评论数据的方法
    getComment () {
      //  用axios调用接口
      this.$axios({
        // 请求地址
        url: '/articles',
        // 接口是可以传分页数据的 如果你不传分页数据 默认查第一页的数据
        //   qurey参数应该在哪个位置传
        // axios 有两个传参的地方 params传get参数也就是query参数  data传body参数也就是请求体参数
        params: {
          // 此参数是用来控制获取数据类型
          response_type: 'comment',
          // 查第一页
          page: this.page.currenPage,
          // 查10条
          per_page: this.page.pageSize
        }
      }).then(result => {
        // 应该将返回结果中的数组 给list
        this.list = result.data.results
        //   console.log(result)
        // 我们需要在获取完数据之后 将总数赋值给total
        this.page.total = result.data.total_count
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
    },
    openorClose (row) {
      // 打开或者关闭逻辑
      const mess = row.comment_status ? '关闭' : '打开'
      // $confirm也支持promise  点击确认之后会进入到.then 点击取消会进入到catch
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        // 调用打开或者关闭接口
        this.$axios({
          // 请求地址
          url: '/comments/status',
          // 请求类型
          method: 'put',
          params: {
            // query参数
            // 要求参数的文章id 将BigNumber类型转化为字符串
            // 前端转字符串到后端 只要和原来的数字一致就行 后端会自动将字符串转成大数字，只需要保证id和传过来的id一致就行
            // 评论会失败就是因为原来给你传了9152 你回传了9200 所以只要保证9152不被转化 就可以使用原来的功能
            article_id: row.id.toString()
          },
          data: {
            // body参数
            // 要求一个是否 评论
            // 是打开还是关闭 此状态和我们评论状态 文章的提示状态相反
            allow_comment: !row.comment_status
          }
        }).then(() => {
          // 成功了 提示一个消息 然后重新的拉取数据
          this.$message.success(`${mess}评论成功`)
          // 重新拉取数据 就是调用getcomment方法
          this.getComment()
        }).catch(() => {
          // 表示失败 失败会进入到catch
          this.$message.error(`${mess}评论失败`)
        })
      })
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
