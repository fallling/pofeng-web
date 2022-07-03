<template>
  <div id="container">
    <a-row :gutter="36" type="flex" style="">

      <a-col flex="auto">
        <div class="content-wrapper">
          <a-card title="公告" :bordered="false">
            <p>系统正在开发中，请耐心等待</p>
          </a-card>

          <a-card title="最近" :bordered="false">
            <template #extra>
              <div style="display: flex;">
                <a-dropdown class="dropdown-wrapper" placement=bottom>
                  <p @click.prevent>类型 <DownOutlined /></p>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item><span>所有</span></a-menu-item>
                      <a-menu-item><span>文档</span></a-menu-item>
                      <a-menu-item><span>表格</span></a-menu-item>
                      <a-menu-item><span>画板</span></a-menu-item>
                      <a-menu-item><span>演示文稿</span></a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
                <a-dropdown class="dropdown-wrapper" placement=bottom>
                  <p @click.prevent>归属 <DownOutlined /></p>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item><span>所有</span></a-menu-item>
                      <a-menu-item><span>破风</span></a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
                <a-dropdown class="dropdown-wrapper" placement=bottom>
                  <p @click.prevent>创建者 <DownOutlined /></p>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item><span>所有</span></a-menu-item>
                      <a-menu-item><span>我的</span></a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </template>
            <a-table :showHeader="false" :pagination="false" :columns="columns" :data-source="data">
              <template #bodyCell="{ column, record, text }">

                <template v-if="column.key === 'articleTitle'">
                  <span><a>{{ text }}</a></span>
                </template>

                <template v-if="column.key === 'ascription'">
                  <span><a>{{ record.createUser }}</a> / <a>{{ record.baseName }}</a></span>
                </template>

                <template v-if="column.key === 'action'">
                  <span>
                    <a-dropdown class="dropdown-wrapper" placement=bottom>
                      <p @click.prevent><MoreOutlined/></p>
                      <template #overlay>
                        <a-menu>
                          <a-menu-item><a><EditOutlined/> 编辑</a></a-menu-item>
                          <a-menu-item><a><LinkOutlined/> 设为快捷入口</a></a-menu-item>
                          <a-menu-item><a><DeleteOutlined/> 移除记录</a></a-menu-item>
                        </a-menu>
                      </template>
                  </a-dropdown>
                  </span>
                </template>
              </template>
            </a-table>
          </a-card>

        </div>
      </a-col>
      <a-col flex="300px">
      <div>
        <a-card title="新建" :bordered="false">
          <div style="display: flex">
            <div style="margin: 8px"><a @click=showArticleModal>文档</a></div>
            <div style="margin: 8px"><a @click="showExcelModal">表格</a></div>
            <div style="margin: 8px"><a @click="showDrawModal">画板</a></div>
          </div>
        </a-card>

        <a-card title="快捷入口" :bordered="false">
          <template #extra><a @click="showQuickModal"><PlusOutlined/></a></template>
          <span>在这里<a @click="showQuickModal">添加</a>你的常用链接</span>
        </a-card>
      </div>
    </a-col>
    </a-row>

    <a-modal v-model:visible="ArticleVisible" title="新建文档" @ok="ArticleModalOK" >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    <a-modal v-model:visible="ExcelVisible" title="新建表格" @ok="ExcelModalOK">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    <a-modal v-model:visible="DrawVisible" title="新建画板" @ok="DrawModalOK">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    <a-modal v-model:visible="QuickVisible" title="添加快捷入口" @ok="DrawModalOK">
      <a-form layout="vertical">
        <a-form-item label="标题">
          <a-input placeholder="输入标题，或关键词搜索我的知识库" ></a-input>
        </a-form-item>
        <a-form-item label="URL地址">
          <a-input placeholder="输入团队、知识库、文档等地址" ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PlusOutlined, DownOutlined, MoreOutlined, EditOutlined, LinkOutlined, DeleteOutlined } from '@ant-design/icons-vue'
const columns = [
  { dataIndex: 'articleTitle', key: 'articleTitle' },
  { dataIndex: 'ascription', key: 'ascription' },
  { dataIndex: 'lastEditTime', key: 'lastEditTime' },
  { key: 'action' }
]
const data = [
  { articleId: '1', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' },
  { articleId: '2', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' },
  { articleId: '3', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' },
  { articleId: '4', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' },
  { articleId: '5', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' },
  { articleId: '6', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' },
  { articleId: '6', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' },
  { articleId: '6', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' },
  { articleId: '6', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' },
  { articleId: '6', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' },
  { articleId: '6', articleTitle: '新建文档', createUser: '破风', baseName: '吾有装潢之', lastEditTime: '651896' }
]

export default defineComponent({
  name: 'WorkBench',
  components: {
    PlusOutlined,
    DownOutlined,
    MoreOutlined,
    EditOutlined,
    LinkOutlined,
    DeleteOutlined
  },
  setup () {
    const ArticleVisible = ref<boolean>(false)
    const ExcelVisible = ref<boolean>(false)
    const DrawVisible = ref<boolean>(false)
    const QuickVisible = ref<boolean>(false)

    const showArticleModal = () => {
      ArticleVisible.value = true
    }
    const ArticleModalOK = () => {
      ArticleVisible.value = false
    }
    const showExcelModal = () => {
      ExcelVisible.value = true
    }
    const ExcelModalOK = () => {
      ExcelVisible.value = false
    }
    const showDrawModal = () => {
      DrawVisible.value = true
    }
    const DrawModalOK = () => {
      DrawVisible.value = false
    }
    const showQuickModal = () => {
      QuickVisible.value = true
    }
    const QuickModalOK = () => {
      QuickVisible.value = false
    }
    return {
      data,
      columns,
      ArticleVisible,
      ExcelVisible,
      DrawVisible,
      QuickVisible,
      showArticleModal,
      ArticleModalOK,
      showExcelModal,
      ExcelModalOK,
      showDrawModal,
      DrawModalOK,
      showQuickModal,
      QuickModalOK
    }
  }
})
</script>

<style scoped>
#container {
  padding: 24px 32px;
}

.dropdown-wrapper {
  margin: auto 8px;
}
</style>
