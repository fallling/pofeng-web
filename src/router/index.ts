import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PofengLogin from '../views/PofengLogin.vue'
import ExploreView from '../views/ExploreView.vue'
import SpaceView from '../views/SpaceView.vue'
import FollowsView from '../views/subView/FollowsView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import HomePageView from '../views/HomePageView.vue'
import DocumentView from '@/views/document/DocumentView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/home',
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
  }, {
    path: '/document',
    name: 'document',
    component: DocumentView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
