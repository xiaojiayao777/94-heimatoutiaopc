<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单组件  标题宽度设置于el-form组件-->
    <el-form style="margin-left:50px" label-width="100px">
       <el-form-item label="标题">
         <!-- 输入框 -->
          <el-input placeholder="请输入您的标题" style="width:60%"></el-input>
       </el-form-item>
       <el-form-item label="内容">
         <!-- 多行输入 -->
         <el-input placeholder="请输入您的内容" type="textarea" :rows="4"></el-input>
       </el-form-item>
       <el-form-item label="封面">
         <!-- 单选框组 -->
          <el-radio-group>
             <el-radio>单图</el-radio>
             <el-radio>三图</el-radio>
             <el-radio>无图</el-radio>
             <el-radio>自动</el-radio>
          </el-radio-group>
       </el-form-item>
       <el-form-item label="频道">
         <!-- select选择器 -->
          <el-select placeholder="请选择频道">
              <!-- 下拉选项 用v-for循环生成el-option -->
              <!-- lable显示值 和 value保存值 -->
             <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
       </el-form-item>
       <el-form-item label="">
         <!-- 放置两个按钮 -->
          <el-button type="primary">发表文章</el-button>
          <el-button>存入草稿</el-button>
       </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 接收频道数据
      channels: []
    }
  },
  methods: {
    // 获取频道数据
    getChannels () {
      this.$axios({
        // 获取频道数据
        url: '/channels'
      }).then(result => {
        // 将频道数据赋值给本地数据
        this.channels = result.data.channels
      })
    }
  },
  created () {
    // 调用获取频道数据的方法
    this.getChannels()
  }

}
</script>

<style>

</style>
