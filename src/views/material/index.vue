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
     <!-- 放置一个上传的组件  布局组件el-row-->
    <el-row type="flex" justify="end">
      <!-- 上传组件要求必须传action属性 不传就会报错 -->
      <el-upload :show-file-list="false" :http-request="uploadImg" action="">
      <!-- 传入一个内容 点击内容就会传出上传文件 -->
         <el-button size="small" type='primary'>上传文件</el-button>
         </el-upload>
    </el-row>

     <!-- 放置标签页 v-model所绑定的值 就是当前所激活的页签-->
     <!-- 切换tabs页签的时候 需要进行事件的监听（点击事件） -->
     <el-tabs v-model="activeName" @tab-click="changeTab" >
        <!--lable表示标签显示的内容  -->
        <el-tab-pane label="全部" name="all">
            <!-- 内容  循环生成全部素材的页面结构-->
            <div class="img-list">
              <!-- 采用v-for对list数据进行循环 循环生成谁就在谁的标签上写v-for-->
              <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
                <!-- 放置图片 并且赋值图片地址-->
                <img :src="item.url" alt="" @click="selectImg(index)">
                <!-- 操作栏 -->
                <el-row class="operate" type="flex" justify="space-around" align="middle">
                   <!--给两个图标注册点击事件 根据数据判断图标的颜色-->
                   <i @click="collectOrCancel(item)" :style="{color:item.is_collected?'red':'black'}" class="el-icon-star-on"></i>
                   <i @click="delMaterial(item)" class="el-icon-delete-solid"></i>

                </el-row>
              </el-card>
            </div>

        </el-tab-pane>
        <el-tab-pane label="收藏" name="collect">
            <!-- 内容 -->
            <div class="img-list">
              <!-- 采用v-for对list数据进行循环 循环生成谁就在谁的标签上写v-for-->
              <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
                <!-- 放置图片 并且赋值图片地址-->
                <img :src="item.url" alt="" @click="selectImg(index)">
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
      <!-- 放置一个el-dialog组件 通过visible 属性进行true/false的设置 -->
      <el-dialog @opened="openEnd" :visible="dialogVisible" @close="dialogVisible=false">
         <!-- 放置走马灯组件 -->
         <el-carousel ref="myCarousel" indicator-position="outside" height="400px">
             <!-- 放置幻灯片的循环项  根据当前页的list循环-->
             <el-carousel-item v-for="item in list" :key="item.id">
                <!-- 放置图片 -->
                <img style="width:100%;height:100%" :src="item.url" alt="">
             </el-carousel-item>
         </el-carousel>
      </el-dialog>
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
        pageSize: 12
      },
      // 来控制显示隐藏 当前不现实弹层
      dialogVisible: false,
      // 点击的索引 设置默认为-1
      clickIndex: -1
    }
  },
  methods: {
    openEnd () {
      // 这个时候已经打开结束 ref已经有值 可以通过ref进行设置
      // 尝试用这种方式调用index
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
    },
    selectImg (index) {
      // 点击图片时调用
      // 将索引赋值
      this.clickIndex = index
      this.dialogVisible = true
    },
    // 定义一个收藏或取消的方法
    collectOrCancel (row) {
      this.$axios({
        // 请求地址
        url: `/user/images/${row.id}`,
        method: 'put',
        data: { collect: !row.is_collected }
      }).then(() => {
        // 成功就要重新加载
        this.getMaterial()
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    // 删除素材的方法
    delMaterial (row) {
      // 删除之前应该友好的问一下是不是要删除  confirm也是promise
      this.$confirm('您确定要删除该图片吗？', '提示').then(() => {
        // 如果确定删除  直接调用接口
        this.$axios({
          url: `/user/images/${row.id}`,
          // 请求类型
          method: 'delete'

        }).then(() => {
          this.getMaterial()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 定义一个方法
    uploadImg (params) {
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
      }).then(() => {
        // 如果成功了 可以重新拉取数据  也可以在前端删除
        this.getMaterial()
      }).catch(() => {
        // 如果失败了显示
        this.$message.error('上传素材失败')
      })
    },
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
    width: 279px;
    height: 340px;
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
