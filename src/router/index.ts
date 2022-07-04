import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PofengLogin from '../views/PofengLogin.vue'
import ExploreView from '../views/ExploreView.vue'
import SpaceView from '../views/SpaceView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: PofengLogin
  },
  {
    path: '/explore',
    name: 'explore',
    component: ExploreView
  },
  {
    path: '/space',
    name: 'space',
    component: SpaceView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
