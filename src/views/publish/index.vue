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
         <!-- 将el-input换成quill-editor -->
         <quill-editor v-model="publishForm.content" style="height:300px">

         </quill-editor>
       </el-form-item>
       <el-form-item prop="cover" label="封面" style="margin-top:120px">
         <!-- 单选框组 -->
         <!-- 封面单选绑定的是封面cover中的type -->
          <el-radio-group v-model="publishForm.cover.type" @change="changeType">
              <!-- 需要给每个el-radio加上lable属性 -->
             <el-radio :label="1">单图</el-radio>
             <el-radio :label="3">三图</el-radio>
             <el-radio :label="0">无图</el-radio>
             <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
       </el-form-item>
       <!-- 放置封面组件 -->
       <!-- 父传子  把封面组件传递给子组件 -->
       <cover-image :list="this.publishForm.cover.images"></cover-image>

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
    // 改变类型事件
    changeType () {
      //  我们应该根据type 的值 对images进行控制
      if (this.publishForm.cover.type === 1) {
        // 单图模式  此时还没有选择图片 所以给一个空字符串
        this.publishForm.cover.images = ['']
      } else if (this.publishForm.cover.type === 3) {
        // 此时还没有选择图片 所以给 3 个空字符串
        this.publishForm.cover.images = ['', '', '']
      } else {
        // 无图或自动时 给一个空数组
        this.publishForm.cover.images = []
      }
    },

    // 根据id获取文章详情数据
    getArticleById (id) {
      // 获取数据
      this.$axios({
        // 请求地址
        url: `/articles/${id}`
      }).then(result => {
        // 将数据赋值给表单数据
        this.publishForm = result.data
      })
    },
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
        // 如果id不为空 就是修改  如果为空就是发布新文章
        //
        const { articleId } = this.$route.params
        this.$axios({
          // 根据场景 id 决定用什么地址
          url: articleId ? `/articles/${articleId}` : 'articles',
          // 根据场景 id 决定用什么类型
          method: articleId ? 'put' : 'post',
          params: { draft },
          data: this.publishForm
        }).then(() => {
          // 如果发布成功
          this.$message.success('操作成功！')
          // 跳到文章列表
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('操作失败！')
        })
      //   if (articleId) {
      //     // 修改
      //     this.$axios({
      //       // 修改地址
      //       url: `/articles/${articleId}`,
      //       method: 'put',
      //       params: { draft },
      //       data: this.publishForm
      //     }).then(() => {
      //       // 如果发布成功
      //       this.$message.success('发布成功！')
      //     }).catch(() => {
      //       this.$message.error('发布失败！')
      //     })
      //   } else {
      //     // 如果进了then表示校验成功 应该去调用发布接口
      //     this.$axios({
      //       url: '/articles',
      //       // 请求地址
      //       method: 'post',
      //       params: { draft// query参数
      //       },
      //       data: this.publishForm // body参数
      //     }).then(() => {
      //       this.$message.success('发布成功！')
      //       // 如果发布成功 跳到文章列表
      //       this.$router.push('/home/articles')
      //     }).catch(() => {
      //       this.$message.error('发布失败！')
      //     })
      //   }
      })
    }
  },
  // 在钩子函数中判断是否存在 文章id 如果存在 获取数据
  created () {
    // 调用获取频道数据的方法
    this.getChannels()
    // articleId是在路由参数中定义的
    const { articleId } = this.$route.params
    // 另一种方法 &&运算符 如果前面为true 才会执行后边的代码
    articleId && this.getArticleById(articleId)
    // if (articleId) {
    //   // 获取文章数据
    //   this.getArticleById(articleId)
    // }
  }

}
</script>

<style>

</style>
