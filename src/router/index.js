import Vue from 'vue'
import VueRouter from 'vue-router'
import Loading from '../views/Loading.vue'
import First from '../views/First.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'loading',
    component: Loading
  },
  {
    path: '/home',
    name: 'home',
    component: First
  },
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
  mode:'history',
  base: process.env.BASE_URL,
})

export default router