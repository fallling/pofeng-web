<template>
  <a-layout>
    <a-layout-header class="header-wrapper">
      <HeaderBar></HeaderBar>
    </a-layout-header>

    <a-layout-content id="content-wrapper">
      <a-card>
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="user" tab="关注的人">
            <a-table :columns="followUserColumns" :data-source="followUserList">
              <template #bodyCell="{ column }">
                <template v-if="column.key === 'action'">
                  <a-button style="margin: auto">取消关注</a-button>
                </template>
              </template>
            </a-table>
          </a-tab-pane>

          <a-tab-pane key="base" tab="关注的知识库">
            <a-table :columns="followBaseColumns" :data-source="followBaseList">
              <template #bodyCell="{ column }">
                <template v-if="column.key === 'action'">
                  <a-button style="margin: auto">取消关注</a-button>
                </template>
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>

        <template #tabBarExtraContent>
          <a-input-search placeholder="搜索"></a-input-search>
        </template>

      </a-card>
      <br />
      <br />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'

const followUserColumns = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: '简介',
    dataIndex: 'intro',
    key: 'intro'
  }, {
    dataIndex: 'action',
    key: 'action',
    width: '20%'
  }
]

const followUserList = [
  {
    key: '1',
    title: 'John Brown',
    intro: '产品经理，文艺女青年，白天工作，晚上码字。酒里有故'
  }, {
    key: '2',
    title: 'Jim Green',
    intro: '日拱一卒，止于至善'
  }
]

const followBaseColumns = [
  {
    title: '名称',
    dataIndex: 'baseName',
    key: 'baseName'
  }, {
    title: '归属',
    dataIndex: 'ascription',
    key: 'ascription'
  }, {
    title: '简介',
    dataIndex: 'intro',
    key: 'intro'
  },
  {
    dataIndex: 'action',
    key: 'action'
  }
]

const followBaseList = [
  {
    key: '1',
    baseName: '软件测试周刊',
    ascription: '毕小烦',
    intro: '这里记录过去一周我们看到的软件测'
  }, {
    key: '2',
    baseName: '软件测试周刊',
    ascription: '毕小烦',
    intro: '这里记录过去一周我们看到的软件测'
  }
]
export default defineComponent({
  name: 'FollowsView',
  components: {
    HeaderBar
  },
  setup () {
    const activeKey = ref('user')
    return {
      activeKey,
      followUserColumns,
      followUserList,
      followBaseColumns,
      followBaseList
    }
  }
})
</script>

<style scoped>
.header-wrapper {
  display: flex;
  background-color: white;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}
#content-wrapper {
  margin: auto;
  width: 1024px;
  padding: 24px 16px;
}
</style>
