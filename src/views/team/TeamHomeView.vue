<template>
  <div>
    <a-card :title="team.teamName">
      <a-layout>
        <a-layout-header style="background-color: white; height: fit-content; ">
          <div>
            <a-menu
              v-model:selectedKeys="currentMenuItem"
              mode="horizontal"
              @select="selectMenuItem">
              <a-menu-item key= "TeamStartView">开始</a-menu-item>
              <a-menu-item key= "TeamBaseView">知识库</a-menu-item>
              <a-menu-item key= "TeamMembersView">成员</a-menu-item>
              <a-menu-item key= "TeamRecyclesView">回收站</a-menu-item>
              <a-menu-item key= "TeamSettings">设置</a-menu-item>
            </a-menu>
          </div>
        </a-layout-header>

        <a-layout-content>
          <component :teamId="arg" v-bind:is="currentTabComponent"></component>
        </a-layout-content>
      </a-layout>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import TeamBaseView from '@/views/team/TeamBaseView.vue'
import TeamMembersView from '@/views/team/TeamMembersView.vue'
import TeamRecyclesView from '@/views/team/TeamRecyclesView.vue'
import TeamSettings from '@/views/team/TeamSettings.vue'
import TeamStartView from '@/views/team/TeamStartView.vue'
import { MenuProps } from 'ant-design-vue'
import { getTeam } from '@/axios/api'

export default defineComponent({
  name: 'TeamHomeView',
  props: ['arg'],
  components: {
    TeamBaseView,
    TeamMembersView,
    TeamRecyclesView,
    TeamSettings,
    TeamStartView
  },
  setup (props) {
    const currentMenuItem = ref<string[]>(['TeamStartView'])
    const currentTabComponent = ref<string>('TeamStartView')
    const team = ref({
      teamName: '',
      teamId: '',
      teamIntro: ''
    })
    const selectMenuItem: MenuProps['onClick'] = (e) => {
      console.log('selectMenuItem', e)
      currentTabComponent.value = e.key.toString()
    }
    onMounted(() => {
      getTeam(props.arg).then(resp => {
        console.log('获取团队详情', resp)
        team.value = resp.data
        console.log('team.value', team.value)
      })
    })
    return {
      currentMenuItem,
      currentTabComponent,
      team,
      selectMenuItem
    }
  }
})
</script>

<style scoped>

</style>
