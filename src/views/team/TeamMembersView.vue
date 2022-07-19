<template>
  <div>
    <a-card title="成员">
      <template #extra>
        <a-input style="width: 200px"></a-input>
        <a-button style="margin-left: 8px">添加成员</a-button>
      </template>

      <a-table :columns="MembersColumns" :data-source="members">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'roleName'">
            <a-select :default-value="record.roleName" style="width:120px">
              <a-select-option value="管理员">管理员</a-select-option>
              <a-select-option value="成员">成员</a-select-option>
              <a-select-option value="只读成员">只读成员</a-select-option>
            </a-select>
          </template>
          <template v-if="column.key === 'action'">
            <span><a>删除</a></span>
          </template>
        </template>

      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getMembers } from '@/axios/api'

const MembersColumns = [
  { title: '姓名', dataIndex: 'nickName', key: 'nickName' },
  { title: '角色', dataIndex: 'roleName', key: 'roleName' },
  { title: '操作', key: 'action' }
]

export default defineComponent({
  name: 'TeamMembersView',
  props: ['teamId'],
  setup (props) {
    const members = ref()
    onMounted(() => {
      getMembers(props.teamId).then(resp => {
        console.log('teamId', props.teamId)
        console.log('成员', resp)
        members.value = resp.data.records
      })
    })
    return {
      MembersColumns,
      members
    }
  }
})
</script>

<style scoped>

</style>
