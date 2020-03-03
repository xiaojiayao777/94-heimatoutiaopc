<template>
  <div  class="login">
    <!-- 表单 -->
    <el-card class="login-card">
     <!-- 头部login部分 -->
     <div class="title">
       <img src="../../assets/img/logo_index.png" alt="">
     </div>
     <!-- 表单容器 -->
     <el-form  style="margin-top:21px;">
     <!-- 每行都是一个el-form-item -->
     <el-form-item>
       <!-- input标签 -->
       <el-input  placeholder="请输入手机号"></el-input>
     </el-form-item>
     <el-form-item>
       <el-input style="width:60%;" placeholder="请验证码"></el-input>
       <el-button style="float:right; width:35%" plain>发送验证码</el-button>
     </el-form-item>
     <el-form-item >
       <el-checkbox style="color:#ccc">我已阅读并同意用户协议和隐私条款</el-checkbox>
     </el-form-item>
<el-form-item>
  <el-button style="width:100%" type="primary" round>登陆</el-button>
</el-form-item>
     </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>

// 如果需要写less 那么就需要在style标签中给lang赋值less
.login{
  background-image: url(../../assets/img/login.jpeg);
  height: 100vh;
  // 完全自适应当前可视区
  // background-size: cover;
  // filter: blur(1px)
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card{
    width: 447px;
    height: 347px;
    background-color:rgba(0,0,0,0.4);
    .title{
      // img是行内元素，所以在外边的块级元素给一个text-align：center可居中
      text-align: center;
      img{
       height: 56px;
      }
    }
  }
}
</style>
