import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    // 如果访问的是斜线,重定向跳转到login
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    // 子路由
    // 重定向,只要访问home组件,就展示welcome
    { path: '/home', component: Home ,
      redirect:'/Welcome',children:[
      {path:'/welcome',component:Welcome},
      {path:'/users',component:Users}
    ]}
  ]
})

// 挂载路由导航守卫 使得只有网页中有登陆成功的token存在时,才可以实现跳转
router.beforeEach((to,from,next) => {
    //  to 将要访问的路径
    //  from 代表从哪个路径跳转而来
    //  next 是一个函数,表示放行
    //  next() 放行 next('/login') 强制跳转 

    // 如果访问的是登陆页,直接跳转
    if(to.path === '/login') return next()

    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    //如果没有token,就跳转到登陆页
    if(!tokenStr) return next('/login')
    // 如果有token,就直接放行跳转
    next()




})




export default router
