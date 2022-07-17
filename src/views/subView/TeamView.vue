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

        <template #bodyCell="{ column, text, record }">

          <template v-if="column.key === 'teamName'">
            <a style="color:black" @click="turnToTeamHome(record.teamId)">{{ text }}</a>
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
          <a-input v-model:value="newTeam.teamName" placeholder="如：知识库项目组"></a-input>
        </a-form-item>

        <a-form-item label="简介">
          <a-textarea
            v-model:value="newTeam.teamIntro"
            placeholder="如：知识库项目组成员协作阵地"
            :auto-size="{ minRows: 3, maxRows: 5 }"/>
        </a-form-item>

        <a-form-item label="添加成员">
          <a-select mode="multiple"
                    label-in-value
                    v-model:value="newTeam.members"
                    placeholder="输入用户id搜索"
                    :labelInValue="false"
                    style="width: 100%"
                    :filter-option="false"
                    :not-found-content="fetching ? undefined : null"
                    @search="fetchUser"
                    :options="data"
                    >
            <template v-if="fetching" #notFoundContent>
              <a-spin size="small"/>
            </template>

          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import debounce from 'lodash/debounce'
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { createTeam, getFetchUser, getTeams } from '@/axios/api'
import router from '@/router'
import { useStore } from 'vuex'
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
  setup (props, ctx) {
    const store = useStore()
    const modalVisible = ref<boolean>(false)
    const modalConfirmLoading = ref<boolean>(false)
    const newTeam = reactive({
      teamName: '',
      teamIntro: '',
      members: [],
      createUser: ''
    })

    const state = reactive({
      data: [],
      value: [],
      fetching: false
    })

    const teamList = ref<Team[]>()
    const showModal = () => {
      modalVisible.value = true
    }
    // 创建团队
    const modalOk = async () => {
      newTeam.createUser = store.getters.userId
      await createTeam(newTeam).then(resp => {
        console.log('创建团队', resp)
        modalVisible.value = false
      })
    }
    const modalCancel = () => {
      modalVisible.value = false
    }
    // 跳转到TeamHome
    const turnToTeamHome = (teamId: string) => {
      console.log('turnToTeamHome', teamId)
      ctx.emit('turnTo', ['TeamHomeView', teamId])
    }
    // 搜索用户
    const fetchUser = debounce(value => {
      console.log('搜索用户', value)
      state.data = []
      state.fetching = true
      getFetchUser(value).then(resp => {
        console.log('结果', resp)
        const data = resp.data.records.map(
          (user: any) => ({
            text: `${user.nickName}(${user.username})`,
            value: user.nickName
          }))
        state.data = data
        state.fetching = false
      })
    }, 300)

    // 监听state的变化
    watch(state.value, () => {
      state.data = []
      state.fetching = false
    })

    onMounted(() => {
      getTeams().then(resp => {
        console.log(resp)
        teamList.value = resp.data.records
      })
    })
    return {
      modalVisible,
      modalConfirmLoading,
      showModal,
      modalOk,
      modalCancel,
      turnToTeamHome,
      ...toRefs(state),
      fetchUser,
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
