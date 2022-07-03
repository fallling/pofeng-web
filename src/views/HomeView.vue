<template>
  <a-layout>
    <a-layout-header id="header-wrap">
      <div class="header-logo"></div>
      <div class="header-menu">
        <a-menu
          :style="{ lineHeight: '64px', marginRight: '64px' }"
          mode="horizontal">
          <a-menu-item key="1">工作台</a-menu-item>
          <a-menu-item key="2">广场</a-menu-item>
          <a-menu-item key="3">空间</a-menu-item>
        </a-menu>
        <a-auto-complete
          style="width: 200px; margin:auto 0;"
        >
          <a-input-search placeholder="搜索"></a-input-search>
        </a-auto-complete>
      </div>
      <div class="header-avatar">
        <a href="#">
          <a-badge dot>
            <BellOutlined />
          </a-badge>
        </a>
        <span :style="{ margin: '0 10px' }"> 欢迎您，破风 </span>
        <a-dropdown placement="bottomRight">
          <a-avatar>
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:">个人空间</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>

    <a-layout>
      <a-layout-sider
        width="256px"
        :style="{ background: '#fff' }"
      >
        <a-menu
          id="side-menu"
          v-model:selectedKeys="selectedKeys"
          @click="handleClick"
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
            <component v-bind:is="currentTabComponent"></component>
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
import type { MenuProps } from 'ant-design-vue'

import WorkBenchView from '@/views/subView/WorkBenchView.vue'
import CalendarView from '@/views/subView/CalendarView.vue'
import CollectionView from '@/views/subView/CollectionView.vue'
import RecycleView from '@/views/subView/RecycleView.vue'
import TaskView from '@/views/subView/TaskView.vue'
import TeamView from '@/views/subView/TeamView.vue'
import KnowledgeBaseView from '@/views/subView/KnowledgeBaseView.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    WorkBenchView,
    CalendarView,
    CollectionView,
    RecycleView,
    TaskView,
    TeamView,
    KnowledgeBaseView,
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
    const selectedKeys = ref<string[]>(['CalendarView'])
    const currentTabComponent = ref<string>('CalendarView')
    const handleClick: MenuProps['onClick'] = e => {
      currentTabComponent.value = e.key.toString()
      console.log('click', e)
    }
    return {
      handleClick,
      selectedKeys,
      currentTabComponent
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
}
#header-wrap .header-logo {
  position: absolute;
  width: 200px;
  height: 64px;
  background-color: darkcyan;
  margin-left: 60px;
}
#header-wrap .header-menu {
  margin: auto;
  display: flex;
}
#header-wrap .header-avatar{
  position: absolute;
  right: 100px;
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
}

.footer {
  text-align: center;
  width: 100vh;
  bottom: 0;
}
</style>
