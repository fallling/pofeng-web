<template>
  <div>
    <a-row type="flex">
      <a-col flex="300px">
        <a-calendar :fullscreen="false"/>
      </a-col>

      <a-col flex="auto">
        <div style="padding-top: 11px; text-align: center">
          <a-button style="float:left; margin-left: 10px" >今日</a-button>
          <span style="font-size: 24px; font-weight: bolder; color: black">{{ dataTime }}</span>
          <a-button style="float: right; margin-right: 10px" @click="showScheduleModal">创建日程</a-button>
        </div>
        <a-list item-layout="horizontal" style="text-align: left; margin-top: 20px">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta>
                <template #title>
                  <a>{{ item.title }}</a>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-col>
    </a-row>

    <a-modal v-model:visible="scheduleVisible" title="创建日程" @ok="scheduleOk" okText="确认" cancelText="取消">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'CalendarView',
  setup () {
    const scheduleVisible = ref<boolean>(false)
    const dataTime = ref('')
    const showScheduleModal = () => {
      scheduleVisible.value = true
    }
    const scheduleOk = () => {
      scheduleVisible.value = false
    }
    let timer: number | undefined
    const getNowTime = () => {
      dataTime.value = dayjs().format('YYYY年MM月DD日 HH:mm:ss')
    }
    onMounted(() => {
      getNowTime()
      timer = setInterval(() => {
        getNowTime()
      }, 1000)
    })
    onBeforeMount(() => {
      clearInterval(timer)
    })
    return {
      scheduleVisible,
      showScheduleModal,
      scheduleOk,
      dataTime,
      timer
    }
  }
})
</script>

<style scoped>

#calendar-wrapper {
  width: 300px;
}

</style>
