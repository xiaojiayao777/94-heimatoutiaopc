// 需要使用vue.use的方式去注册
// vue.use会调用对象中install 方法  第一个参数是vue对象
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
export default {
  install: function (Vue) {
    // alert('666')
    // 注册全局组件 vue 特点是一旦注册在任意位置都能用
    Vue.component('layout-header', LayoutHeader)// 注册头部组件
    Vue.component('layout-aside', LayoutAside)// 注册侧边栏组件
  }
}
