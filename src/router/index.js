import Vue from 'vue'
import VueRouter from 'vue-router'
// 加载页面
import Loading from '../views/Loading.vue'
import Home from '../views/Home.vue'

// // 首屏
// import First from '../views/First.vue'
// // 过渡页 文字页
// import TransForm from '../views/TransForm.vue'
// // 用户选择信息页
// import Info from '../views/Info.vue'
// import Select from '../views/Select.vue'
// import Transition from '../views/Transition.vue'
// import Share from '../views/Share.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'loading',
    component: Loading
  }, 
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: First
  // },
  // {
  //   path: '/transform',
  //   name: 'transform',
  //   component: TransForm
  // },
  // {
  //   path: '/info',
  //   name: 'info',
  //   component: Info
  // },
  // {
  //   path: '/select',
  //   name: 'select',
  //   component: Select
  // },
  // {
  //   path: '/transition',
  //   name: 'transition',
  //   component: Transition
  // },
  // {
  //   path: '/share',
  //   name: 'share',
  //   component: Share
  // },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})

export default router