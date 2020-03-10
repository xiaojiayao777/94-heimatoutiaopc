<template>
  <el-card >
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单组件  标题宽度设置于el-form组件-->
    <el-form ref="myForm" :model="publishForm" :rules="publishRules" style="margin-left:50px" label-width="100px">
       <el-form-item label="标题" prop="title">
         <!-- 输入框 -->
          <el-input v-model="publishForm.title" placeholder="请输入您的标题" style="width:60%"></el-input>
       </el-form-item>
       <el-form-item prop="content" label="内容">
         <!-- 多行输入 -->
         <el-input v-model="publishForm.content" placeholder="请输入您的内容" type="textarea" :rows="4"></el-input>
       </el-form-item>
       <el-form-item prop="cover" label="封面">
         <!-- 单选框组 -->
         <!-- 封面单选绑定的是封面cover中的type -->
          <el-radio-group v-model="publishForm.cover.type">
              <!-- 需要给每个el-radio加上lable属性 -->
             <el-radio :label="1">单图</el-radio>
             <el-radio :label="3">三图</el-radio>
             <el-radio :label="0">无图</el-radio>
             <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
       </el-form-item>
       <el-form-item label="频道" prop="channel_id">
         <!-- select选择器 -->
          <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
              <!-- 下拉选项 用v-for循环生成el-option -->
              <!-- lable显示值 和 value保存值 -->
             <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
       </el-form-item>
       <el-form-item label="">
         <!-- 放置两个按钮 -->
         <!-- false和true代表是不是草稿 -->
          <el-button @click="publish(false)" type="primary">发表文章</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
       </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 接收频道数据
      channels: [],
      // 发布表单数据
      publishForm: {
        // 文章标题
        title: '',
        // 文章内容
        content: '',
        //
        cover: {
          // -1是自动  0是无图  1是单图 3是三图
          type: 0,
          images: [
            // 字符串数组 对应type 为1，images中应有一个值 加入为3，images中拥有三个值
          ]
        },
        // 频道id
        channel_id: null
      },
      // 发布表单的校验规则
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur ' }, {
          min: 5, max: 30, message: '标题应该在5-30字符之间', trigger: 'blur'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道内容不能为空' }]
      }
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
    },
    // 发布
    publish (draft) {
      // 通过this.$ref 来获取ef-form实例  调用validate方法
      // 回调形式 和 promise形式
      // this.$refs.myForm.validate()
      // this.$refs.myForm.validate(function (isOk) {
      //   if (isOk) {
      //     // 调用发布接口
      //   }
      // })
      this.$refs.myForm.validate().then(() => {
        // 如果进了then表示校验成功 应该去调用发布接口
        this.$axios({
          url: '/articles',
          // 请求地址
          method: 'post',
          params: {
            // query参数
            draft
          },
          data: this.publishForm // body参数
        }).then(() => {
          this.$message.success('发布成功！')
          // 如果发布成功 跳到文章列表
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('发布失败！')
        })
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
