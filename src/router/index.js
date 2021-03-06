import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'  //typescript支持 先注释 以防未使用报错

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/signature'
  },
  {
    // 配置登录组件路由
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue') //  懒加载组件
  },
  {
    path: '/signature',
    name: 'Signature',
    component: () => import('../views/Signature/Signature.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/elementUI',
    name: '/elementUi',
    component: () => import('../views/elementUI.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
