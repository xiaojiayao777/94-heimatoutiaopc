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
     <!-- 切换tabs页签的时候 需要进行事件的监听（点击事件） -->
     <el-tabs v-model="activeName" @tab-click="changeTab" >
        <!--lable表示标签显示的内容  -->
        <el-tab-pane label="全部" name="all">
            <!-- 内容  循环生成全部素材的页面结构-->
            <div class="img-list">
              <!-- 采用v-for对list数据进行循环 循环生成谁就在谁的标签上写v-for-->
              <el-card class="img-card" v-for="item in list" :key="item.id">
                <!-- 放置图片 并且赋值图片地址-->
                <img :src="item.url" alt="">
                <!-- 操作栏 -->
                <el-row class="operate" type="flex" justify="space-around" align="middle">
                   <i class="el-icon-star-on"></i>
                   <i class="el-icon-delete-solid"></i>

                </el-row>
              </el-card>
            </div>

        </el-tab-pane>
        <el-tab-pane label="收藏" name="collect">
            <!-- 内容 -->
            <div class="img-list">
              <!-- 采用v-for对list数据进行循环 循环生成谁就在谁的标签上写v-for-->
              <el-card class="img-card" v-for="item in list" :key="item.id">
                <!-- 放置图片 并且赋值图片地址-->
                <img :src="item.url" alt="">
                <!-- 操作栏 -->

              </el-card>
            </div>
        </el-tab-pane>
     </el-tabs>
     <!-- 放置一个公共的分页组件 -->
     <el-row type="flex" justify="center" style="height:80px;" align="middle">
       <!-- 放置分页组件  total总条数 current-page当前页码  page-size每页多少条-->
       <el-pagination background :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" layout="prev,pager,next" @current-change="changePage">

       </el-pagination>

     </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 当前激活的页签
      activeName: 'all',
      // 全部素材的数据 承担全部和收藏的数据
      list: [],
      // 一般会在专门的对象中存放分页信息
      page: {
        // 当前页数 默认为1
        currentPage: 1,
        // 当前总数
        total: 0,
        // 当前每页条数
        pageSize: 8
      }
    }
  },
  methods: {
    changePage (newPage) {
      // 定义一个方法 该方法会在页码切换时执行
      // 会传入一个新页
      // 将新页码赋值给页码数据
      this.page.currentPage = newPage
      // 获取数据
      this.getMaterial()
    },
    // 获取素材数据
    getMaterial () {
      this.$axios({
        // 请求地址 默认请求类型为get
        url: '/user/images',
        // method: 'get'
        params: {
          // get参数 也就是query参数
          // 是否是收藏的数据 获取不是收藏的数据（获取全部的数据） 所以用false
          // 这个位置应该根据当前的页签变活
          collect: this.activeName === 'collect',
          //  取页码变量的值 因为只要页码变量一变 获取的数据跟着变
          page: this.page.currentPage,
          // 获取每页数量
          per_page: this.page.pageSize

        },
        data: { // data参数 body参数 也就是响应体参数
        }
      }).then(result => {
        // 需要将返回的数据赋值到data中的数据
        this.list = result.data.results
        // 将总条数赋值给total变量
        // 总数 全部素材的总数  收藏素材的总数 跟随当前的页签的变化而变化
        this.page.total = result.data.total_count
      })
    },
    changeTab () {
      // 将页码在切换页签的时候 重置为第一页 因为分类变了 数据变了
      this.page.currentPage = 1
      // 切换页签事件 来绑定click事件
      // alert(this.activeName)
      // 可以根据当前的activeName来决定当前获取的是哪方面的数据
      // activeName===all就要获取所有的素材
      // activeName===collect就要获取收藏的素材
      this.getMaterial()
    }
  },
  created () {
    // 实例化之后 直接调用获取素材数据
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list{
  // 用flex布局
  display: flex;
  // 换行
  flex-wrap: wrap;
  .img-card{
    width: 220px;
    height: 240px;
    margin: 20px 40px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .operate{
      position: absolute;
      height: 30px;
      // text-align: center;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #f4f5f6;
      i{
        font-size: 21px;
      }
    }
  }
}

</style>
