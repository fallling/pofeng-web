<template>
  <a-layout>
    <a-layout-header class="header-wrapper">
      <HeaderBar></HeaderBar>
    </a-layout-header>

    <a-layout-content class="content-wrapper">
      <div style="width: 1056px; display: flex;">
        <a-tabs v-model:activeKey="activeKey" tab-position="left">
          <a-tab-pane key="1" tab="全部消息"></a-tab-pane>
          <a-tab-pane key="2" tab="关注"></a-tab-pane>
          <a-tab-pane key="3" tab="点赞"></a-tab-pane>
          <a-tab-pane key="4" tab="@和评论"></a-tab-pane>
          <a-tab-pane key="5" tab="待处理"></a-tab-pane>
          <a-tab-pane key="6" tab="系统通知"></a-tab-pane>
          <template #renderTabBar="{ DefaultTabBar, ...props }">
            <component :is="DefaultTabBar" v-bind="props" :style="{ background: 'white', width: '200px' }" />
          </template>
        </a-tabs>

        <a-card :tab-list="tabList" style="width: 823px; margin: 0 auto">
          <a-list item-layout="horizontal" :data-source="messages">
            <template #renderItem="{ item }">
              <a-list-item>
                <template #title>
                  asd
                </template>

                <a-list-item-meta>

                  <template #avatar>
                    <a-avatar :src="item.fromUserAvatar" />
                  </template>

                  <template #title>
                    <a>{{ item.fromUser }}</a>
                  </template>

                  <template #description>
                    <div>{{ item.message }}</div>
                    <div><a>{{ item.fromWhere }}</a></div>
                  </template>

                </a-list-item-meta>

                <template #actions>
                  {{ item.datetime }}
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'

interface Message {
  id: string,
  fromUserAvatar: string,
  fromUser: string,
  event: string,
  message: string,
  toUser: string,
  fromWhere: string,
  datetime: string
}
const tabList = [
  {
    key: 'unread',
    tab: '未读消息'
  },
  {
    key: 'read',
    tab: '已读消息'
  }
]

const messages: Message[] = [
  {
    id: '1',
    fromUserAvatar: 'https://joeschmoe.io/api/v1/random',
    fromUser: '比小贩',
    event: '评论了你的文档',
    message: '虚拟信用卡的实际发行人中信银行（Citic Bank）表示，其走完了相关程序',
    toUser: '张三',
    fromWhere: 'vhdl具有闹钟功能的电子时钟设计',
    datetime: '2022-07-10 10:20:18'
  }
]

export default defineComponent({
  name: 'NotificationsView',
  components: {
    HeaderBar

  },
  setup () {
    const activeKey = ref('1')
    return {
      activeKey,
      tabList,
      messages
    }
  }
})
</script>

<style scoped>
.header-wrapper {
  background: white;
}

.content-wrapper {
  margin: auto;
  padding: 24px 16px 36px;
}
</style>
