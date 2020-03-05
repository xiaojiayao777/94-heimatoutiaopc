import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入模块
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入默认样式
import '@/styles/index.less'
// 引入axios
import axios from 'axios'
// 引入
import Components from '@/components'
// 引入权限模块
import '@/permission'

Vue.config.productionTip = false
// 注册开发的自定义组件
Vue.use(Components)
// 全局注册，一旦全局注册可在任何地方使用组件
// vue.use实际上会调用element UI的install方法，并且传入当前的Vue对象
Vue.use(ElementUI)
// 配置axios的baseURL 公共的请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 将axios赋值给vue对象的原型属性
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
