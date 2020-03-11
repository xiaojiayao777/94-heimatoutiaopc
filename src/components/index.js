// 需要使用vue.use的方式去注册
// vue.use会调用对象中install 方法  第一个参数是vue对象
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
import Breadcrumb from './common/bread-crumb'
import VueQuillEditor from 'vue-quill-editor'
import CoverImage from './publish/cover-image'
import SelectImage from './publish/select-image'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install: function (Vue) {
    // alert('666')
    // 注册全局组件 vue 特点是一旦注册在任意位置都能用
    Vue.component('layout-header', LayoutHeader)// 注册头部组件
    Vue.component('layout-aside', LayoutAside)// 注册侧边栏组件
    Vue.component('bread-crumb', Breadcrumb)// 注册一个面包屑组件
    // 注册 富文本编辑
    // 注册完毕 可以在任意位置使用 quill-editor组件了  这个组件应该拿去替换我们的input
    // 支持v-model双向绑定
    Vue.use(VueQuillEditor)
    // 注册封面组件
    Vue.component('cover-image', CoverImage)
    // 注册图片组件
    Vue.component('select-image', SelectImage)
  }
}
