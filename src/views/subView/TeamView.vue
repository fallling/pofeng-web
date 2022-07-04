<template>
  <div id="container">
    <a-card title="团队" :bordered="false">
      <template #extra>
        <a-input-search placeholder="搜索" style="width: 200px"/>
        <a-button style="margin: auto 8px" @click="showModal">新建团队</a-button>
      </template>

      <div style="width: 100vh;margin: 10px 0">常用</div>
      <div>
        <a-list :grid="{ gutter: 8, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 }" :data-source="CommonlyUseData">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-button style="width: 200px; height: 50px">{{ item.title }}</a-button>
            </a-list-item>
          </template>
        </a-list>
      </div>

      <a-table :columns="listColumns" :data-source="teamList" rowKey="teamId">

        <template #bodyCell="{ column, text }">

          <template v-if="column.key === 'teamName'">
            <a style="color:black">{{ text }}</a>
          </template>

          <template v-else-if="column.key === 'action'">
            <a>设置</a>
          </template>

        </template>
      </a-table>
    </a-card>

    <a-modal
      title="创建团队" :visible="modalVisible" :confirm-loading="modalConfirmLoading"
      @ok="modalOk" @cancel="modalCancel">
      <a-form :form="newTeam">
        <a-form-item label="名称">
          <a-input v-model="newTeam.teamName" placeholder="如：知识库项目组"></a-input>
        </a-form-item>

        <a-form-item label="简介">
          <a-textarea
            v-model="newTeam.teamIntro"
            placeholder="如：知识库项目组成员协作阵地"
            :auto-size="{ minRows: 3, maxRows: 5 }"/>
        </a-form-item>

        <a-form-item label="添加成员">
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
interface Team {
  teamId: string
  teamName: string
  teamIntro: string
  teamMembers: string
  createUser: string
  createTime: string
}

const CommonlyUseData = [
  { title: '全员团队' }
]
const listColumns = [
  { title: '名称', dataIndex: 'teamName', key: 'teamName' },
  { title: '简介', dataIndex: 'teamIntro', key: 'teamIntro', ellipsis: true },
  { title: '成员', dataIndex: 'members', key: 'members' },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '', key: 'action' }
]
export default defineComponent({
  name: 'TeamView',
  components: {

  },
  setup () {
    const modalVisible = ref<boolean>(false)
    const modalConfirmLoading = ref<boolean>(false)
    const newTeam = reactive({
      teamName: '',
      teamIntro: '',
      members: []
    })
    const teamList: Team[] = [
      {
        teamId: 'teamId',
        teamName: 'teamName',
        teamIntro: 'teamIntro',
        teamMembers: 'teamMembers',
        createUser: 'createUser',
        createTime: 'createTime'
      }
    ]
    const showModal = () => {
      modalVisible.value = true
    }
    const modalOk = () => {
      modalVisible.value = false
    }
    const modalCancel = () => {
      modalVisible.value = false
    }
    return {
      modalVisible,
      modalConfirmLoading,
      showModal,
      modalOk,
      modalCancel,
      newTeam,
      CommonlyUseData,
      listColumns,
      teamList
    }
  }
})
</script>

<style scoped>

#container {
  padding: 24px 32px;
}

</style>
