<template>
  <a-card title="回收站">
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <a>恢复</a>
          <a style="margin-left: 20px">彻底删除</a>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const columns = [
  { title: '名称', dataIndex: 'articleTitle', key: 'articleTitle' },
  { title: '归属', dataIndex: 'baseName', key: 'baseName' },
  { title: '删除时间', dataIndex: 'deleteTime', key: 'deleteTime' },
  { title: '', key: 'action' }
]

const data = [
  { key: '1', articleTitle: '如何保障需求质量', baseName: '知识库一', deleteTime: '2022-05-12 01:24:32' },
  { key: '2', articleTitle: '选择比努力重要', baseName: '知识库一', deleteTime: '2022-03-28 14:21:09' },
  { key: '3', articleTitle: '自动驾驶', baseName: '知识库一', deleteTime: '2022-02-12 12:32:42' }
]
export default defineComponent({
  name: 'TeamRecyclesView',
  props: ['teamId'],
  setup () {
    return {
      columns,
      data
    }
  }
})
</script>

<style scoped>

</style>
