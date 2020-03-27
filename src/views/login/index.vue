<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 头部login部分 -->
       <div class="title">
        <img src="../../assets/img/x2.jpg" alt />
       </div>
      <!-- 表单容器  要绑定model属性 rules属性(表单验证规则)-->
      <!-- 加上:才会把model看成一个变量 -->
       <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:21px;">
        <!-- 每行都是一个el-form-item -->
          <el-form-item prop="mobile">
          <!-- input标签  双向绑定v-model-->
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号" ></el-input>
          </el-form-item>
          <el-form-item prop="code">
              <el-input v-model="loginForm.code"  placeholder="请输入密码"></el-input>
              <!-- <el-button style="float:right; width:35%" style="width:60%;" plain>发送验证码</el-button> -->
          </el-form-item>
          <el-form-item prop="checked">
              <el-checkbox v-model="loginForm.checked" style="color:#ccc">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" style="width:100%" type="primary" round>登陆</el-button>
          </el-form-item>
       </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个登录表单数据的对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户协议
      },
      // 定义表单的验证规则
      loginRules: {
        // 手机号的验证规则
        mobile: [
          { required: true, message: '您的手机号不能为空' },
          // 正则表达式 以1开头，第二个数字是3-9，后边还有9个数字的格式
          { pattern: /^1[3-9]\d{9}$/, message: '您的手机号格式不正确' }
        ],
        // 验证码的验证规则
        code: [
          { required: true, message: '您的密码不能为空' },
          // 验证码要求六个数字
          { pattern: /^\d{6}$/, message: '密码应该是六位数字' }
        ],
        // 是否勾选的验证规则
        // required不能验证false和true，为true，是必填项
        // 自定义校验 如果value为true则校验成功
        checked: [
          {
            // rule是当前规则 value是当前要校验的值 callback是一个必须执行的函数，成功的时候执行callback，失败的时候执行callback里面的newError
            validator: function (rule, value, callback) {
              // 三元表达式 value为true则成功 如果成功则执行callback（），false则失败，执行callback（new Error（'错误信息'））
              value
                ? callback()
                : callback(new Error('您必须同意我们的霸王条款之后才可以继续'))
            }
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 第一种方法
      // this.$refs.loginForm.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // })
      // 第二种方法
      this.$refs.loginForm.validate().then(() => {
        // 成功之后校验就会到达 .then
        // 通过校验之后，应该调用登陆接口，看看手机号是否正确
        // alert('666')
        this.$axios({
          // 请求地址
          url: '/authorizations',
          // body请求体参数
          data: this.loginForm,
          // 请求类型
          method: 'post'
        })
          .then(result => {
            // 成功之后打印结果
            // console.log(result.data)
            // 把token存于本地缓存，用的时候兜里拿 result.data.data.token 解构之前的代码
            window.localStorage.setItem('user-token', result.data.token)
            // 跳转到主页
            // push和router-link类似to属性可以直接是字符串也可以是对象
            this.$router.push('/home')
          })
          .catch(() => {
            // 第一种用法
            // this.$message({ message: '用户名或者密码错误', type: 'error' })
            // 第二种方法
            this.$message.error('错了哦，这是一条错误消息')
          })
      })
    }
  }
}
</script>

<style lang='less'>
// 如果需要写less 那么就需要在style标签中给lang赋值less
.login {
  background-image: url(../../assets/img/login.jpeg);
  height: 100vh;
  // 完全自适应当前可视区
  // background-size: cover;
  // filter: blur(1px)
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 447px;
    height: 347px;
    background-color: rgba(0, 0, 0, 0.4);
    .title {
      // img是行内元素，所以在外边的块级元素给一个text-align：center可居中
      text-align: center;
      img {
        // width: 50%;
        height: 56px;
      }
    }
  }
}
</style>
