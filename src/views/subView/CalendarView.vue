<template>
  <div id="container">
    <a-row type="flex" :gutter=36>
      <a-col flex="336px">
        <a-calendar :fullscreen="false"/>
      </a-col>

      <a-col flex="auto">
        <div style="padding-top: 11px; text-align: center">
          <a-button style="float:left; margin-left: 10px" >今日</a-button>
          <span style="font-size: 24px; font-weight: bolder; color: black">{{ dataTime }}</span>
          <a-button style="float: right; margin-right: 10px" @click="showScheduleModal">创建日程</a-button>
        </div>
        <a-list :data-source="schedules" item-layout="horizontal" style="text-align: left; margin-top: 20px">
          <template #renderItem="{ item }" >
            <a-list-item class="list-item">
              <a-list-item-meta>
                <template #title>
                  <a>{{ item.calendarTitle }}</a>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-col>
    </a-row>

    <a-modal
      width="480px"
      v-model:visible="scheduleVisible"
      title="创建日程"
      @ok="scheduleOk">
      <a-form
        id="newSchedule"
        v-bind="formItemLayout"
        labelAlign="right"
      >
        <a-form-item label="标题" class="input-wrapper">
          <a-input v-model:value-="newSchedule.calendarTitle"></a-input>
        </a-form-item>
        <a-form-item label="地址" class="input-wrapper">
          <a-input v-model:value-="newSchedule.place"></a-input>
        </a-form-item>
        <a-form-item label="开始时间">
          <a-date-picker style="margin-right: 16px" show-time v-model:value="newSchedule.startTime.date"  />
        </a-form-item>
        <a-form-item label="结束时间">
          <a-date-picker v-model="newSchedule.endTime" show-time />
        </a-form-item>
        <a-form-item label="重复">
          <a-select v-model:value="newSchedule.repeat">
            <a-select-option value="不重复">不重复</a-select-option>
            <a-select-option value="每天">每天</a-select-option>
            <a-select-option value="每周">每周</a-select-option>
            <a-select-option value="每月">每月</a-select-option>
            <a-select-option value="每年">每年</a-select-option>
            <a-select-option value="农历每年">农历每年</a-select-option>
            <a-select-option value="自定义">自定义</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="重要">
          <a-switch v-model:checked="newSchedule.important"></a-switch>
        </a-form-item>
        <a-form-item label="说明">
          <a-textarea
            v-model:value="newSchedule.remark"
            placeholder="添加备注"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-item>

      </a-form>
    </a-modal>

  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'

interface DateTime {
  date: string,
  time: string
}

interface schedule {
  calendarId: string,
  calendarTitle: string,
  place: string,
  startTime: DateTime,
  endTime: DateTime,
  repeat: string,
  important: string,
  remark: string
}

const schedules: schedule[] = [
  {
    calendarId: 'calendarId',
    calendarTitle: 'calendarTitle',
    place: 'place',
    startTime: {
      date: '',
      time: ''
    },
    endTime: {
      date: '',
      time: ''
    },
    repeat: 'string',
    important: 'string',
    remark: 'string'
  }
]

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}
export default defineComponent({
  name: 'CalendarView',
  setup () {
    const newSchedule = reactive<schedule>({
      calendarId: '',
      calendarTitle: '',
      place: '',
      startTime: {
        date: '',
        time: ''
      },
      endTime: {
        date: '',
        time: ''
      },
      repeat: '',
      important: '',
      remark: ''
    })
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
      timer,
      schedules,
      newSchedule,
      formItemLayout
    }
  }
})
</script>

<style scoped>

#container {
  padding: 24px 32px;
}

.list-item {
  width: 100%;
  background-color: #ffffff;
  margin: 8px 0;
  height: 48px;
  padding-left: 24px;
  border-radius: 50px;
}

#newSchedule {
  margin: auto;
}
</style>
