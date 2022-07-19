<template>
  <div>
    <a-card title="知识库">
      <template #extra>
          <a-input style="width: 200px"></a-input>
          <a-button style="margin-left: 8px">新建知识库</a-button>
      </template>

      <a-table :columns="baseListColumns" :data-source="baseList" rowKey="baseId" >
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getBaseList } from '@/axios/api'

const baseListColumns = [
  { title: '名称', dataIndex: 'baseName', key: 'baseName' },
  { title: '简介', dataIndex: 'baseIntro', key: 'baseIntro', ellipsis: true },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' }
]
export default defineComponent({
  name: 'TeamBaseView',
  setup () {
    const baseList = ref()
    onMounted(() => {
      getBaseList().then(resp => {
        console.log(resp)
        baseList.value = resp.data.records
      })
    })
    return {
      baseListColumns,
      baseList
    }
  }
})
</script>

<style scoped>

</style>
