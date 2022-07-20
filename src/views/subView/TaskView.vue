<template>
  <a-layout id="task-wrapper">
    <a-layout style="background: transparent">
      <a-layout-content class="list-wrapper">

        <a-list :data-source="taskList">
         <template #renderItem="{ item }">
            <a-list-item v-if="item.status === '进行中'" class="TaskListItem">
              <a @click="showInfo(item)">{{ item.listTitle }}</a>
            </a-list-item>
         </template>
        </a-list>
        <a-divider orientation="left" style="font-size: 14px">已完成</a-divider>

        <a-list :data-source="taskList">
          <template #renderItem="{ item }">
            <a-list-item v-if="item.status === '已完成'" class="TaskListItem" style="text-decoration: line-through">
              <a @click="showInfo(item)">{{ item.listTitle }}</a>
            </a-list-item>
          </template>
        </a-list>
      </a-layout-content>

      <a-layout-footer style="background-color: transparent; margin: 0 0 20px 0; padding: 0">
        <a-input size="large"
                 ref="userNameInput"
                 v-model:value="newTaskTitle"
                 style="width: 100%;"
                 @pressEnter="addTask"
                 placeholder="添加任务" >
        </a-input>
      </a-layout-footer>
    </a-layout>

    <a-layout-sider
      :collapsed="collapsed"
      collapsedWidth="0"
      width="300px"
      style="background-color: #ffffff; border-radius: 10px; margin-left: 20px; display: block">

      <a-form
        :model="taskInfo"
        onchange=""
        class="taskInfo-wrapper">
        <a-form-item>
          <a-textarea id="infoTitle"
                      :auto-size="{ minRows: 1, maxRows: 3 }"
                      v-model:value="taskInfo.listTitle"
                      placeholder="标题"/>
        </a-form-item>

        <a-form-item>
          <a-date-picker
            valueFormat="YYYY-MM-DD HH:mm:ss"
            v-model:value="taskInfo.alarm"
            show-time
            placeholder="提醒我"/>
        </a-form-item>

        <a-form-item>
          <a-date-picker
            valueFormat="YYYY-MM-DD HH:mm:ss"
            v-model:value="taskInfo.deadline"
            show-time
            placeholder="添加截止日期"/>
        </a-form-item>

        <a-form-item >
          <a-select v-model:value="taskInfo.listRepeat" placeholder="重复" style="width: 120px">
            <a-select-option value="0">不重复</a-select-option>
            <a-select-option value="1">每天</a-select-option>
            <a-select-option value="2">每周</a-select-option>
            <a-select-option value="3">每月</a-select-option>
            <a-select-option value="4">每年</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-upload
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
          </a-upload>
        </a-form-item>
        <a-form-item>
          <a-textarea v-model:value="taskInfo.remark" placeholder="添加备注" :rows="4"/>
        </a-form-item>

        <a-form-item style="margin-top: 25px; text-align: center;">
          <a-button @click="completeTask"> 完成任务 </a-button>
          <a-button shape="circle" style="border: 0; margin-left: 50px">
            <DeleteOutlined />
          </a-button>
        </a-form-item>
      </a-form>
    </a-layout-sider>

  </a-layout>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref } from 'vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { getTasks, postTask, updateTask } from '@/axios/api'

interface Task {
  listId: string,
  listTitle: string,
  alarm: string,
  deadline: string,
  listRepeat: string,
  files: string,
  remark: string,
  status: string
}

export default defineComponent({
  name: 'TaskView',
  components: {
    DeleteOutlined
  },
  setup () {
    const newTaskTitle = ref()
    const taskList = ref<Task[]>()
    const collapsed = ref<boolean>(true)
    const taskInfo = ref<Task>({
      listId: '',
      listTitle: '',
      alarm: '',
      deadline: '',
      listRepeat: '',
      files: '',
      remark: '',
      status: ''
    })
    const showInfo = (item : Task) => {
      console.log('showInfo')
      collapsed.value = false
      taskInfo.value = item
    }

    const completeTask = async () => {
      console.log('completeTask', taskInfo)
      taskInfo.value.status = '已完成'
      await updateTask(taskInfo.value).then(resp => {
        console.log(resp)
        collapsed.value = false
      })
    }
    const addTask = () => {
      console.log('newTask', newTaskTitle)
      const newTask : Task = {
        listId: '',
        listTitle: newTaskTitle.value,
        alarm: '',
        deadline: '',
        listRepeat: '',
        files: '',
        remark: '',
        status: ''
      }
      postTask(newTask).then(resp => {
        console.log('添加任务', resp)
        getTasks(taskInfo.value).then(resp => {
          console.log('添加成功', resp)
          taskList.value = resp.data.records
        })
      })
    }
    onMounted(() => {
      getTasks(taskInfo.value).then(resp => {
        console.log(resp)
        taskList.value = resp.data.records
      })
    })
    return {
      taskList,
      newTaskTitle,
      collapsed,
      taskInfo,
      showInfo,
      completeTask,
      addTask
    }
  }
})
</script>

<style scoped>

#task-wrapper {
  height: 100%;
  background: url('https://s1.ax1x.com/2022/04/23/LfYxtP.jpg') no-repeat bottom center;
  background-size: cover;
  padding: 24px 32px;
}

.taskInfo-wrapper {
  padding: 20px;
  height: 400px;
}

.TaskListItem {
  border-radius: 23px;
  background: white;
  padding-left: 32px;
  margin: 9px auto;
}

#infoTitle{
  height: 50px;
  font-size: 24px;
  color: black;
  font-weight:bold;
  border: none;
  resize:none;
} /depp/ #infoTitle .ant-input:focus {
   border: none;
   border-bottom: 1px solid white !important;
   box-shadow: none;
 }
.ant-divider-horizontal.ant-divider-with-text-left::before {
  top: 50%;
  width: 5%;
  border-color : royalblue;
}
.ant-divider-horizontal.ant-divider-with-text-left::after {
  top: 50%;
  width: 95%;
  border-color : royalblue;
}
</style>
