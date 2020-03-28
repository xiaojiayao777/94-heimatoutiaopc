<template>
<!-- element布局组件 flex  el-row（行）和el-col（列） -->
  <el-row type="flex" align="middle" class="layout-header">
    <!-- :span是因为“12”本来是字符串，加上：之后就会看成数字 -->
     <el-col class="left" :span="12" >
        <i class="el-icon-s-fold"></i>
        <span>博客管理系统</span>
     </el-col>
     <el-col class="right" :span="12">
       <el-row type="flex" justify="end" align="middle">
         <img :src="userInfo.photo" alt="">
         <!-- 下拉菜单 点击菜单项出发command事件-->
         <el-dropdown trigger="click" @command="clickMenu">
            <!-- 下拉菜单显示内容 -->
            <span>{{userInfo.name}}</span>
            <!-- 下拉内容需要做具名插槽dropdown   el-dropdown-menu是专门做下拉内容效果的组件-->
            <el-dropdown-menu slot="dropdown" >
               <!-- 下拉选项 el-dropdown-item是专门做下拉选项的组件  给每一个选项一个command属性-->
               <el-dropdown-item  command="info">个人信息</el-dropdown-item>
               <el-dropdown-item command="git">git地址</el-dropdown-item>
               <el-dropdown-item command="lgout">退出</el-dropdown-item>

            </el-dropdown-menu>

         </el-dropdown>
      </el-row>

     </el-col>
  </el-row>
</template>

<script>
import eventBus from '@/utils/eventBus.js'
export default {
  data () {
    return {
      // y用户个人信息
      userInfo: {
        // name: '22',
        // photo: 'http://img1.imgtn.bdimg.com/it/u=2003328295,1600589916&fm=26&gp=0.jpg'
      }
    }
  },
  methods: {
    clickMenu (command) {
      // alert('22' + command)
      // 需要处理三种情况
      if (command === 'info') {
        // 点击了个人信息
      } else if (command === 'git') {
        // 点击了git地址就跳转到git仓库 改变当前项目地址
        window.location.href = 'https://github.com/xiaojiayao777/94-heimatoutiaoPC'
      } else {
        // 退出系统 删除token 跳转回登陆页
        // 删除localStorage中的某个选项缓存
        window.localStorage.removeItem('user-token')
        // 跳回登录页面 编程式导航
        this.$router.push('/login')
      }
    },
    getUserInfo () {
      // 从兜里拿钥匙===从缓存中取token
    // const token = localStorage.getItem('user-token')
      this.$axios({
      // 请求地址
        url: '/user/profile'
      // //  放置请求头参数
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
      }).then(result => {
      // 如果加载成功了，把数据给useInfo
        this.userInfo = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
    eventBus.$on('updateUser', () => {
      // 监听 updateUser  改变之后，重新拉取数据
      this.getUserInfo()
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header{
  height: 60px;
  .left{
    i{
      font-size: 20px;
    }
  }
  .right{
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right:10px;
    }
  }
}
</style>
