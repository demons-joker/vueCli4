import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import(/* webpackChunkName: "Home" */ '../views/home/Home')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
