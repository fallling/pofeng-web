import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PofengLogin from '../views/PofengLogin.vue'
import ExploreView from '../views/ExploreView.vue'
import SpaceView from '../views/SpaceView.vue'
import FollowsView from '../views/subView/FollowsView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import HomePageView from '../views/HomePageView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }, {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }, {
    path: '/login',
    name: 'login',
    component: PofengLogin
  }, {
    path: '/explore',
    name: 'explore',
    component: ExploreView
  }, {
    path: '/follows',
    component: FollowsView
  }, {
    path: '/space',
    name: 'space',
    component: SpaceView
  }, {
    path: '/notifications',
    name: 'notifications',
    component: NotificationsView
  }, {
    path: '/homepage',
    name: 'homepage',
    component: HomePageView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
