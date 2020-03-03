import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// 用一种简写的方式替换原有的方式
import Home from '@/views/home'

Vue.use(VueRouter)

const routes = [
  {
    // 强制跳转到home页
    path: '/',
    redirect: 'home'

  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
  // {
  //   // 按需加载
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
