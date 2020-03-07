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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 当前激活的页签
      activeName: 'all',
      // 全部素材的数据 承担全部和收藏的数据
      list: []
    }
  },
  methods: {
    // 获取素材数据
    getMaterial () {
      this.$axios({
        // 请求地址 默认请求类型为get
        url: '/user/images',
        // method: 'get'
        params: {
          // 是否是收藏的数据 获取不是收藏的数据（获取全部的数据） 所以用false
          collect: this.activeName === 'collect'// 这个位置应该根据当前的页签变活
        }, // get参数 也就是query参数
        data: { }// data参数 body参数 也就是响应体参数
      }).then(result => {
        // 需要将返回的数据赋值到data中的数据
        this.list = result.data.results
      })
    },
    changeTab () {
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
