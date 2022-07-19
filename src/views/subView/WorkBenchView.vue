<template>
  <div id="container">
    <a-row type="flex">

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
            <a-table :showHeader="false" :pagination="false" :columns="columns" :data-source="resentData">
              <template #bodyCell="{ column, record, text }">

                <template v-if="column.key === 'articleTitle'">
                  <a @click="turnToArticle(record.articleId)">{{ text }}</a>
                </template>

                <template v-if="column.key === 'ascription'">
                  <a @click="turnToPerson(record.createUser)">{{ record.nickName }}</a> /
                  <a @click="turnToBase(record.baseId)">{{ record.baseName }}</a>
                </template>

                <template v-if="column.key === 'action'">
                  <a-dropdown class="dropdown-wrapper" placement=bottom>
                    <p @click.prevent><MoreOutlined/></p>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item><a> <EditOutlined/> 编辑 </a></a-menu-item>
                        <a-menu-item><a> <LinkOutlined/> 设为快捷入口 </a></a-menu-item>
                        <a-menu-item><a> <DeleteOutlined/> 移除记录 </a></a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
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
            <div style="margin: 8px"><a @click=showArticleModal>共享文档</a></div>
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

    <a-modal v-model:visible="ArticleVisible" title="新建文档" @ok="ArticleModalOK" :footer="null">
      <p>请选择所属库</p>
      <a-list item-layout="horizontal" :data-source="baseData">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                <a>{{ item.baseName }}</a>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-modal>
    <a-modal v-model:visible="ExcelVisible" title="新建表格" @ok="ExcelModalOK" :footer="null">
      <p>请选择所属库</p>
      <a-list item-layout="horizontal" :data-source="baseData">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                <a>{{ item.baseName }}</a>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-modal>
    <a-modal v-model:visible="DrawVisible" title="新建画板" @ok="DrawModalOK" :footer="null">
      <p>请选择所属库</p>
      <a-list item-layout="horizontal" :data-source="baseData">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                <a>{{ item.baseName }}</a>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-modal>
    <a-modal v-model:visible="QuickVisible" title="添加快捷入口" @ok="DrawModalOK" :footer="null">
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
import { defineComponent, onMounted, ref } from 'vue'
import { PlusOutlined, DownOutlined, MoreOutlined, EditOutlined, LinkOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { getArticles, getBaseList } from '@/axios/api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const columns = [
  { dataIndex: 'articleTitle', key: 'articleTitle' },
  { dataIndex: 'ascription', key: 'ascription' },
  { dataIndex: 'lastEditTime', key: 'lastEditTime' },
  { key: 'action' }
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
    const router = useRouter()
    const store = useStore()
    const resentData = ref([])
    const baseData = ref([])
    const ArticleVisible = ref<boolean>(false)
    const ExcelVisible = ref<boolean>(false)
    const DrawVisible = ref<boolean>(false)
    const QuickVisible = ref<boolean>(false)
    const showArticleModal = () => {
      ArticleVisible.value = true
      getBaseList(store.getters.userId).then(resp => {
        console.log(resp)
        baseData.value = resp.data.records
      })
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
    const turnToArticle = (articleId: string) => {
      console.log('turnToArticle', articleId)
      router.push({
        path: 'document',
        query: {
          articleId: articleId
        }
      })
    }
    const turnToSharedArticle = (articleId: string) => {
      console.log('turnToSharedArticle', articleId)
      router.push({
        path: 'sharedDocument',
        query: {
          articleId: articleId
        }
      })
    }
    const turnToPerson = (personId: string) => {
      console.log('turnToPerson', personId)
    }
    const turnToBase = (baseId: string) => {
      console.log('turnToBase', baseId)
    }

    onMounted(() => {
      console.log('mounted')
      getArticles(store.getters.userId).then(resp => {
        console.log(resp)
        resentData.value = resp.data.records
        console.log(resentData)
      })
    })
    return {
      resentData,
      baseData,
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
      QuickModalOK,
      turnToArticle,
      turnToSharedArticle,
      turnToPerson,
      turnToBase
    }
  }
})
</script>

<style scoped>
#container {

}

.dropdown-wrapper {
  margin: auto 8px;
}
</style>
