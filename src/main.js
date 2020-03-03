import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入模块
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// 全局注册，一旦全局注册可在任何地方使用组件
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
