<template>
  <el-card>
     <bread-crumb slot="header">
        <template slot="title"></template>
     </bread-crumb>
     <!-- 放置表单容器 -->
     <el-form ref="myForm" label-width="100px" :model="formData" :rules="rules">
        <!-- 表单域 -->
        <el-form-item prop="name" label="用户名">
           <el-input  style="width:30%" v-model="formData.name">
           </el-input>
        </el-form-item>
        <el-form-item label="简介">
           <el-input style="width:30%" v-model="formData.intro">
           </el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
           <el-input style="width:30%" v-model="formData.email">
           </el-input>
        </el-form-item>
        <el-form-item label="手机号">
           <!-- 可以看到 不能改 是登陆标志 -->
           <el-input disabled style="width:30%" v-model="formData.mobile">
           </el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="saveUser">保存</el-button>
        </el-form-item>
     </el-form>
     <!-- 头像 -->
     <img class="head-upload" :src="formData.photo?formData.photo:defaultImg" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
        // min 字符最低 长度 max标识最大长度
          { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }

        ]
      },
      defaultImg: require('../../assets/img/13.jpg') // 头像变量
    }
  },
  methods: {
    // 获取用户个人资料
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        // 将数据赋值给表单数据
        this.formData = result.data
      })
    },
    saveUser () {
      // 保存用户
      // 手动校验
      this.$refs.myForm.validate().then(() => {
        // 成功进入then 保存调用接口
        this.$axios({
          url: '/user/profile',
          method: 'patch', // 类型
          data: this.formData
        }).then(() => {
          this.$message.success('保存用户信息成功')
        }).catch(() => {
          this.$message.error('保存用户信息失败')
        })
      })
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

<style lang="less">
.head-upload{
   position: absolute;
   right: 300px;
   top: 160px;
   width: 200px;
   height: 200px;
   border-radius: 50%;
}

</style>
