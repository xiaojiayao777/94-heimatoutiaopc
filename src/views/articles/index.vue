<template>
  <el-card class="articles">
    <bread-crumb slot="header">
       <template slot="title">
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
         <el-select placeholder="请选择频道" v-model="searchForm.channel_id"></el-select>
         <!-- 下拉选项 应该通过接口来获取数据 -->
         <!-- el-option是下来选项 label是显示值 value是绑定的值 -->
         <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
    <div class="article-item" v-for="item in 100" :key="item">
      <!-- 左侧内容 -->
       <div class="left">
          <img src="http://img3.imgtn.bdimg.com/it/u=2773096519,71996258&fm=26&gp=0.jpg" alt="">
          <div class="info">
              <span>我爱我的祖国</span>
              <el-tag class="tag">已发表</el-tag>
              <span class="data">2020:02</span>
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
      channels: []// 专门来接受频道的数据
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
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
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
