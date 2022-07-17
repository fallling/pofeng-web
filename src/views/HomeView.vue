<template>
  <a-layout>
    <a-layout-header id="header-wrap">
      <HeaderBar></HeaderBar>
    </a-layout-header>

    <a-layout style="background: white">
      <a-layout-sider
        width="256px"
        :style="{ background: '#fff', borderRight: '#eeeeee 1px solid' }">
        <a-menu
          id="side-menu"
          v-model:selectedKeys="sideMenuSelectedKeys"
          @click="sideMenuHandleClick"
        >
          <a-menu-item key="WorkBenchView">
            <template #icon><LaptopOutlined/></template>工作台
          </a-menu-item>
          <a-menu-item key="CalendarView">
            <template #icon><CalendarOutlined/></template>日程表
          </a-menu-item>
          <a-menu-item key="TaskView">
            <template #icon><CarryOutOutlined/></template>任务
          </a-menu-item>
          <a-menu-item key="CollectionView">
            <template #icon><InboxOutlined/></template>收藏
          </a-menu-item>
          <a-menu-item key="KnowledgeBaseView">
            <template #icon><BookOutlined/></template>知识库
          </a-menu-item>
          <a-menu-item key="TeamView">
            <template #icon><TeamOutlined/></template>团队
          </a-menu-item>
          <a-menu-item key="RecycleView">
            <template #icon><DeleteOutlined/></template>回收站
          </a-menu-item>
        </a-menu>
      </a-layout-sider>

      <a-layout class="content-wrapper">
        <a-layout-content class="content">
          <keep-alive>
            <component @turnTo="turnToPage" :arg="arg" v-bind:is="currentTabComponent"></component>
          </keep-alive>
        </a-layout-content>

<!--        <a-layout-footer class="footer" :style="{ background: '' }">
          Pofeng ©2022 Created by Ant UED
        </a-layout-footer>-->
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { BellOutlined, UserOutlined, LaptopOutlined, CalendarOutlined, CarryOutOutlined, TeamOutlined, InboxOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'

import WorkBenchView from '@/views/subView/WorkBenchView.vue'
import CalendarView from '@/views/subView/CalendarView.vue'
import CollectionView from '@/views/subView/CollectionView.vue'
import RecycleView from '@/views/subView/RecycleView.vue'
import TaskView from '@/views/subView/TaskView.vue'
import TeamView from '@/views/subView/TeamView.vue'
import KnowledgeBaseView from '@/views/subView/KnowledgeBaseView.vue'
import HeaderBar from '@/components/HeaderBar.vue'

import TeamHomeView from '@/views/team/TeamHomeView.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderBar,
    WorkBenchView,
    CalendarView,
    CollectionView,
    RecycleView,
    TaskView,
    TeamView,
    KnowledgeBaseView,
    TeamHomeView,
    UserOutlined,
    LaptopOutlined,
    CalendarOutlined,
    CarryOutOutlined,
    TeamOutlined,
    InboxOutlined,
    DeleteOutlined,
    BookOutlined,
    BellOutlined
  },
  setup () {
    const router = useRouter()
    const arg = ref()
    const currentMain = ref<string[]>(['home'])
    const sideMenuSelectedKeys = ref<string[]>(['WorkBenchView'])
    const currentTabComponent = ref<string>('WorkBenchView')
    const headerMenuHandleClick: MenuProps['onClick'] = (e) => {
      console.log('headerMenu click', e)
      router.push({
        name: e.key.toString()
      })
    }
    const sideMenuHandleClick: MenuProps['onClick'] = e => {
      currentTabComponent.value = e.key.toString()
      console.log('sideMenu click', e)
    }

    const turnToPage = (data: any) => {
      console.log('收到消息', data)
      arg.value = data[1]
      currentTabComponent.value = data[0]
    }
    return {
      currentMain,
      headerMenuHandleClick,
      sideMenuHandleClick,
      sideMenuSelectedKeys,
      currentTabComponent,
      turnToPage,
      arg
    }
  }
})
</script>

<style lang="scss" >

#header-wrap {
  display: flex;
  background-color: white;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  border-bottom: #eeeeee 1px solid;
}

#side-menu {
  width: 256px;
  position: fixed;
  top: 60px;
  transform: translateY(60px);
}

.header-search {
  position: absolute;
  right: 300px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
}

.content {
  flex: fit-content;
/*  padding: 24px 32px;*/
  margin: 0;
  height: 100vh;
  background: white;
}

.footer {
  text-align: center;
  width: 100vh;
  bottom: 0;
}
</style>
