<template>
  <!-- 处理上传素材和选择素材 -->
  <!-- 通过页签的形式来显示 el-tabs-->
  <!-- name不能重复表示当前标签页的标识 -->
  <el-tabs v-model="activeName">
     <el-tab-pane label="素材库" name="material">
       <!-- 查询全部的素材 -->
       <!-- v-for循环遍历数据俩list数据 -->
       <div class="select-image-list">
         <!-- 循环 -->
         <el-card v-for="item in list" :key="item.id" class="img-card">
           <!-- 显示我的素材图片 -->
            <img @click="clickImg(item.url)" :src="item.url" alt="">
         </el-card>
       </div>
           <!-- 分页 -->
           <el-row type="flex" justify="center" align="middle" style="height:80px">
             <!-- 分也组件 -->
             <el-pagination background layout="prev,pager,next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" @current-change="changePage">

             </el-pagination>
           </el-row>
     </el-tab-pane>
     <el-tab-pane label="上传素材" name="upload">
         <!-- 放置一个上传组件 upload中的action必须给 不然报错 可以给成空的-->
         <!--  :http-request=""自定义上传 -->
         <el-upload action="" class="upload-img" :http-request="uploadImg">
            <!-- 放置一个元素 用来点击上传 -->
            <i class="el-icon-plus"></i>
         </el-upload>
     </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
    // 当前激活的变量
      activeName: 'meterial',
      // 素材列表的数据
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }

    }
  },
  methods: {
    uploadImg (params) {
      // 上传素材
      // 调用上传接口
      //  params.file就是需要上传的图片文件
      // 接口的参数类型要求是formData  首先实例化一个formData对象
      const data = new FormData()
      // 加入文件参数
      data.append('image', params.file)
      // 开始发送上传请求
      this.$axios({
        // 请求地址
        url: '/user/images',
        // 上传或者新增一般都是post类型
        method: 'post',
        // data: data 属性名和变量名一样可以只写一个 es6简写 如
        data
      }).then(result => {
        // 如果成功了 我们的借口会返回一个上传成功的图片地址
        // 拿到了返回的url地址 应该往外传
        this.$emit('selectOneImg', result.data.url)
      }).catch(() => {
        // 如果失败了显示
        this.$message.error('上传素材失败')
      })
    },
    // 点击图片时触发
    clickImg (url) {
      // 将URL参数传递给上层组件
      // 在脚手架中 自定义事件名可以随便大小写 不用纯小写了
      this.$emit('selectOneImg', url)
    },
    // 监听页码等改变事件
    changePage (newPage) {
      // 赋值新页码
      this.page.currentPage = newPage
      this.getAllImg()
    },
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          // 查询全部的素材 这里给一个false
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        // result.data.results 获取全部素材的数据
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    // 获取全部素材的数据
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-image-list{
  display: flex;
  flex-wrap: wrap;
justify-content: space-around;
  .img-card{
    width: 150px;
    height: 150px;
    margin: 20px 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.upload-img{
  display: flex;
  justify-content: center;
  i{
    font-size: 50px;
    padding: 50px;
    border:2px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
