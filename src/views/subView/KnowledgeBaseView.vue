<template>
  <div id="container">
    <a-card title="我的知识库" :bordered="false">
      <template #extra>
        <a-input-search placeholder="搜索" style="width: 200px"/>
        <a-button style="margin: auto 8px" @click="showModal">新建知识库</a-button>
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

      <div style="margin: 10px 0">
        <span>个人知识库</span>
        <span style="margin-left: 20px">团队知识库</span>
      </div>
      <a-table :columns="baseListColumns" :data-source="baseList" rowKey="baseId">
        <template #bodyCell="{ column, record }">

          <template v-if="column.key === 'baseName'">
            <a style="color: black">{{ record.text }}</a>
          </template>

          <template v-else-if="column.key === 'action'">
            <a-dropdown>
              <MoreOutlined/>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a>设为常用</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a>更多设置</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
      title="创建知识库" :visible="modalVisible" :confirm-loading="createKnobConfirmLoading"
      cancelText="取消" okText="确定" @ok="modalOk" @cancel="modalCancel">
      <div>
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol" style="width: 380px;margin: auto">
          <a-form-item label="知识库名称">
            <a-input v-model="newBase.baseName" placeholder="如：图片存储优化"></a-input>
          </a-form-item>
          <a-form-item label="简介">
            <a-textarea v-model="newBase.baseIntro" placeholder="如：图片存储优化方案" :auto-size="{ minRows: 3}"/>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { MoreOutlined } from '@ant-design/icons-vue'

const labelCol = { xs: { span: 24 }, sm: { span: 5 } }
const wrapperCol = { xs: { span: 24 }, sm: { span: 18 } }
const CommonlyUseData = [
  { title: '知识库一' },
  { title: '图片存储优化' }
]

const baseListColumns = [
  { title: '名称', dataIndex: 'baseName', key: 'baseName' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '', key: 'action' }
]

const baseList = [
  {
    baseName: 'baseName',
    createTime: 'createTime'
  }
]
export default defineComponent({
  name: 'KnowledgeBaseView',
  components: {
    MoreOutlined
  },
  setup () {
    const modalVisible = ref<boolean>(false)
    const createKnobConfirmLoading = ref<boolean>(false)
    const newBase = reactive({
      baseName: 'baseName',
      baseIntro: 'baseIntro'
    })
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
      createKnobConfirmLoading,
      showModal,
      modalOk,
      modalCancel,
      labelCol,
      wrapperCol,
      newBase,
      CommonlyUseData,
      baseListColumns,
      baseList
    }
  }
})
</script>

<style scoped>
#container {
  padding: 24px 32px;
}
</style>
