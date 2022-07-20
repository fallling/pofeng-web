<template>
  <div id="container">
    <a-row type="flex" :gutter=36>
      <a-col flex="336px">
        <a-calendar
          class="calendar"
          :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }"
          valueFormat="YYYY-MM-DD"
          @select="selectDate"
          v-model:value="currentDate"
          :fullscreen="false">
          <template #dateCellRender="{ current }">
            <div v-for="item in getListData(current)" :key="item.id"
                 style="align-items: center; ">
              <a-badge :status="item.type" :text="item.content" style="margin: 0 0 0 10px" />
            </div>
          </template>
        </a-calendar>
      </a-col>

      <a-col flex="auto">
        <div style="padding-top: 11px; text-align: center">
          <a-button style="float:left; margin-left: 10px" @click="turnToNow">今日</a-button>
          <span style="font-size: 24px; font-weight: bolder; color: black">{{ now }}</span>
          <a-button style="float: right; margin-right: 10px" @click="showNewScheduleModal">创建日程</a-button>
        </div>
        <a-list :data-source="currentSchedules" item-layout="horizontal" style="text-align: left; margin-top: 20px">
          <template #renderItem="{ item }" >
            <a-list-item class="list-item">
              <a-list-item-meta>
                <template #title>
                  <a @click="showCurrentScheduleModal(item)">{{ item.calendarTitle }}</a>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-col>
    </a-row>

    <a-modal
      width="480px"
      v-model:visible="newScheduleVisible"
      title="创建日程"
      :model="newSchedule"
      @ok="scheduleOk">
      <a-form
        id="newSchedule"
        v-bind="formItemLayout"
        labelAlign="right"
      >
        <a-form-item label="标题" class="input-wrapper">
          <a-input v-model:value="newSchedule.calendarTitle"></a-input>
        </a-form-item>
        <a-form-item label="地址" class="input-wrapper">
          <a-input v-model:value="newSchedule.place"></a-input>
        </a-form-item>
        <a-form-item label="开始时间">
          <a-date-picker
            style="margin-right: 16px"
            show-time
            valueFormat="YYYY-MM-DD HH:mm:ss"
            v-model:value="newSchedule.startTime"  />
        </a-form-item>
        <a-form-item label="结束时间">
          <a-date-picker
            show-time
            valueFormat="YYYY-MM-DD HH:mm:ss"
            v-model:value="newSchedule.endTime" />
        </a-form-item>
        <a-form-item label="重复">
          <a-select v-model:value="newSchedule.calendarRepeat">
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

    <a-modal
      width="480px"
      v-model:visible="currentScheduleVisible"
      title="日程"
      :model="currentSchedule"
      okText="修改"
      @ok="updateSchedule">
      <a-form
        id="newSchedule"
        v-bind="formItemLayout"
        labelAlign="right"
      >
        <a-form-item label="标题" class="input-wrapper">
          <a-input v-model:value="currentSchedule.calendarTitle"></a-input>
        </a-form-item>
        <a-form-item label="地址" class="input-wrapper">
          <a-input v-model:value="currentSchedule.place"></a-input>
        </a-form-item>
        <a-form-item label="开始时间">
          <a-date-picker
            style="margin-right: 16px"
            show-time
            valueFormat="YYYY-MM-DD HH:mm:ss"
            v-model:value="currentSchedule.startTime"  />
        </a-form-item>
        <a-form-item label="结束时间">
          <a-date-picker
            show-time
            valueFormat="YYYY-MM-DD HH:mm:ss"
            v-model:value="currentSchedule.endTime" />
        </a-form-item>
        <a-form-item label="重复">
          <a-select v-model:value="currentSchedule.calendarRepeat">
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
          <a-switch v-model:checked="currentSchedule.important"></a-switch>
        </a-form-item>
        <a-form-item label="说明">
          <a-textarea
            v-model:value="currentSchedule.remark"
            placeholder="添加备注"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-item>

      </a-form>
    </a-modal>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { getSchedules, postSchedule, putSchedule } from '@/axios/api'

interface Schedule {
  calendarId: string,
  calendarTitle: string,
  place: string,
  startTime: string,
  endTime: string,
  calendarRepeat: string,
  important: string,
  remark: string
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}
export default defineComponent({
  name: 'CalendarView',
  setup () {
    const currentSchedule = ref<Schedule>({
      calendarId: '',
      calendarTitle: '',
      place: '',
      startTime: '',
      endTime: '',
      calendarRepeat: '',
      important: '',
      remark: ''
    })
    const newSchedule = ref<Schedule>({
      calendarId: '',
      calendarTitle: '',
      place: '',
      startTime: '',
      endTime: '',
      calendarRepeat: '',
      important: '',
      remark: ''
    })
    let timer: number | undefined
    const currentScheduleVisible = ref<boolean>(false)
    const newScheduleVisible = ref<boolean>(false)
    const now = ref()
    const currentDate = ref()
    const schedules = ref<Schedule[]>([])

    // 加载日历徽标
    const getListData = (value: Dayjs) => {
      /*      let res = false
      console.log('vale', value.date())
      schedules.value.forEach((item) => {
        if (dayjs(item.startTime, 'YYYY-MM-DD').date() === value.date()) {
          console.log('return true')
          res = true
        } else {
          console.log('return false')
          res = false
        }
      })
      return res */

      let listData
      schedules.value.forEach((item) => {
        if (dayjs(item.startTime, 'YYYY-MM-DD').date() === value.date()) {
          listData = [
            { type: 'success', content: '' }
          ]
        }
      })
      return listData || []
    }
    // 过滤日程
    const currentSchedules = computed(() => schedules.value.filter(ele => {
      return dayjs(ele.startTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') === dayjs(currentDate.value).format('YYYY-MM-DD')
    }))

    // 选择日期
    const selectDate = (date: Dayjs) => {
      currentDate.value = date.valueOf()
      console.log('currentDate', currentDate.value)
    }

    // 跳转到现在
    const turnToNow = () => {
      currentDate.value = dayjs(now.value).format('YYYY-MM-DD')
    }

    // 显示当前日程modal
    const showCurrentScheduleModal = (item: Schedule) => {
      currentSchedule.value = item
      currentScheduleVisible.value = true
    }

    // 显示创建日程modal
    const showNewScheduleModal = () => {
      newScheduleVisible.value = true
    }

    // 创建日程
    const scheduleOk = async () => {
      console.log('创建日程')
      console.log('newSchedule', newSchedule)
      postSchedule(newSchedule.value).then(resp => {
        if (resp.status === 200) {
          schedules.value.push(newSchedule.value)
          newScheduleVisible.value = false
        }
      })
    }

    // 修改日程
    const updateSchedule = async () => {
      console.log('修改日程')
      console.log('newSchedule', currentSchedule)
      putSchedule(currentSchedule.value).then(resp => {
        if (resp.status === 200) {
          schedules.value.push(currentSchedule.value)
          currentScheduleVisible.value = false
        }
      })
    }

    // 获取当前事件
    const getNowTime = () => {
      now.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }

    onMounted(() => {
      getNowTime()
      timer = setInterval(() => {
        getNowTime()
      }, 1000)

      getSchedules().then(resp => {
        console.log(resp)
        schedules.value = resp.data.records
      })
      console.log('now', dayjs(now.value, 'YYYY-MM-DD HH:mm:ss').toString())
      console.log('currentSchedule', currentSchedules)
    })
    onBeforeMount(() => {
      clearInterval(timer)
    })
    return {
      currentScheduleVisible,
      newScheduleVisible,
      showCurrentScheduleModal,
      showNewScheduleModal,
      scheduleOk,
      updateSchedule,
      turnToNow,
      selectDate,
      getListData,
      now,
      timer,
      schedules,
      newSchedule,
      currentSchedule,
      currentDate,
      currentSchedules,
      formItemLayout
    }
  }
})
</script>

<style scoped>

#container {
  height: 100%;
  background: url('https://s1.ax1x.com/2022/04/23/LfYxtP.jpg') no-repeat bottom center;
  background-size: cover;
  padding: 24px 32px;
}

.calendar-data-cell {
  border-radius: 5px;
  background: #42b983;
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

.calendar :deep .ant-picker-calendar-date-content {
  position: absolute;
}

.calendar >>> .ant-picker-content td {
  height: 50px;
}
</style>
