import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    // 如果访问的是斜线,重定向跳转到login
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
  ]
})

export default router
