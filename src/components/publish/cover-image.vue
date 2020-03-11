<template>
  <div class="cover-image">
     <!-- v-for循环生成谁 就在谁的标签上写 -->
     <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-image-item">
        <!--图片的地址等于item  -->
        <!-- 一开始item是个空字符串 此时应该根据item是否有值来决定来显示默认图片还是item -->
        <!-- item如果没有值就显示 默认图片 -->
        <!-- image如果不是固定地址的话 我们图片应该先转化成变量 -->
         <img :src="item ? item :defaultImg" alt="">
     </div>
     <!-- // 采用elementui的弹层组件 -->
     <!-- @事件可以直接等于逻辑 -->
     <el-dialog :visible="dialogVisible"  @close="dialogVisible = false">
       <!-- 再次封装一个组件  选择图片的组件-->
       <!-- 监听谁的自定义事件 就在谁的标签上写v-on @/ -->
       <select-image @selectOneImg="receiveImg">

       </select-image>
     </el-dialog>
  </div>
</template>

<script>
export default {
  // 接受传递的参数
  props: ['list'],
  data () {
    return {
      // 默认图片 需要先转成变量
      defaultImg: require('../../assets/img/13.jpg'),
      // 控制弹层的显示或隐藏
      dialogVisible: false,
      // 用来记录当前点击了哪个索引
      selectIndex: -1
    }
  },
  methods: {
    // 点击图片时 弹出一个层
    openDialog (index) {
      // 显示弹层
      this.dialogVisible = true
      // 记录了你点击了那一张图片
      this.selectIndex = index
    },
    receiveImg (url) {
      // 接受传递的地址
      // 拿到地址之后 应该给src
      // props属性不能直接修改 只能读取  再此传递给父组件 让父组件去修改
      this.$emit('selectTwoImg', url, this.selectIndex)
      // 关闭弹窗
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image{
  display: flex;
  margin: 20px 100px;
  .cover-image-item{
   border: 1px solid #ccc;
   width: 250px;
   height: 250px;
   padding:20px;
   img{
     width: 100%;
     height: 100%;
   }
  }
}

</style>
