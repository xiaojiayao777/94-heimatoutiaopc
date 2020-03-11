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

</style>
