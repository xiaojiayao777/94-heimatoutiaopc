<template>
  <el-card class='articles'>
    <bread-crumb slot='header'>
       <template slot='title'>
         文章列表
       </template>
    </bread-crumb>
    <!-- {{channels}} -->
    <!-- 搜索工具栏 筛选 -->
    <!-- 表单容器 -->
    <!-- 如果你不对表单进行校验及其他检查的话  就不需要写model/rules/prop-->
    <el-form style="padding-left:50px">
       <el-form-item label="文章状态：">
         <!-- 放置单选框组 -->
          <el-radio-group v-model="searchForm.status">
             <!-- 放置单选框选项 lable表示该选项对应的值 :lable的意思是后边的数字不会加冒号-->
             <!-- // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部  定义5为全部 -->
             <el-radio :label="5">全部</el-radio>
             <el-radio :label="0">草稿</el-radio>
             <el-radio :label="1">待审核</el-radio>
             <el-radio :label="2">审核通过</el-radio>
             <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
       </el-form-item>
       <el-form-item label="频道类型：">
         <!-- 选择器 -->
         <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
         <!-- 下拉选项 应该通过接口来获取数据 -->
         <!-- el-option是下来选项 label是显示值 value是绑定的值 -->
         <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="日期范围：">
          <!-- 日期范围选择组件 type属性要设置daterange-->
          <el-date-picker type="daterange" v-model="searchForm.dataRange"></el-date-picker>
       </el-form-item>
    </el-form>
    <!-- 文章主体结构 flex布局-->
    <el-row class="total" type="flex" align="middle">
       <span>共找到1000条符合条件的内容</span>
    </el-row>
    <!-- 列表内容 -->
    <!-- article-item作为一个循环项 -->
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
      <!-- 左侧内容 -->
       <div class="left">
         <!-- 设置文章的封面 有的数组有值 有的没值 搞一个默认值 -->
         <!-- 用判断图片不显示 可以先在data中定义一个变量  采用变量的形式赋值-->
          <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
          <div class="info">
              <span>{{item.title}}</span>
              <!-- 改变显示的格式 可以用过滤器 -->
              <!-- 两个过滤器 分别处理 标签类型 和 显示文本 -->
              <el-tag :type="item.status|filterType" class="tag">{{item.status|filterStatus}}</el-tag>
              <span class="data">{{item.pubdate}}</span>
           </div>
       </div>
       <!-- 右侧内容 -->
       <div class="right">
           <span><i class="el-icon-edit"></i>修改</span>
           <span><i class="el-icon-delete"></i>删除</span>
       </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个表单数据对象
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        //  先将 5 定义成 全部  传值的是时候如果是5 就不传
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何的频道
        dataRange: []// 日期范围
      },
      channels: [], // 专门来接受频道的数据
      // 定义一个list数据接收文章列表
      list: [],
      // 地址对应文件变成变量 编译是会被拷贝到对应位置
      defaultImg: require('../../assets/img/13.jpg')
    }
  },
  // 定义一个过滤器 专门处理显示格式的
  filters: {
    // 过滤器的第一个参数 是value 别人传给我的值
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 过滤器除了用在插值表达式中 也可以用在v-bind的表达式中
    filterType (value) {
      // 根据当前状态的值显示不同类型的tag标签
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    getChannels () {
      // 获取频道数据
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获频道接口返回的数据
        this.channels = result.data.channels
      })
    },
    getArticles () {
      // 获取文章列表
      this.$axios({
        // 请求地址
        url: '/articles'
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
    // 手动调用获取文章数据
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
.articles{
  .total{
     height: 60px;
     border-bottom: 1px dashed #ccc;
  }
  // 对文章循环项进行样式编写
  .article-item{
    display: flex;
    // 两头对齐
    justify-content: space-between;
    padding:20px 0;
    border-bottom: 1px solid #ccc;
    .left{
       display: flex;
       img{
         width: 180px;
         height: 100px;
         border-radius: 20px;
       }
       .info{
         display: flex;
        //  变成竖项
         flex-direction: column;
         height: 100px;
        //  竖值间距相等
         justify-content: space-around;
         margin-left: 10px;
         .data{
           color: #999;
           font-size: 12px;
         }
         .tag{
           width: 60px;
           text-align: center;
         }

       }
     }
     .right{
       span{
         font-size: 14px;
         margin-right: 8px;
        //  鼠标放上之后显示
         cursor: pointer;
         user-select:none;
       }
     }
  }
}
</style>
