<template>
  <a-layout>
    <a-layout-header class="header-wrapper">
      <HeaderBar></HeaderBar>
    </a-layout-header>

    <a-layout-content class="content-container">
      <div class="content-header">
        <a-breadcrumb style="float: left; line-height: 32px;margin: auto">
          <a-breadcrumb-item>{{ store.getters.nickName }}</a-breadcrumb-item>
          <a-breadcrumb-item>{{ baseInfo.baseName }}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-button style="float: right">新建</a-button>
      </div>

      <div class="book-info">
        <h1>{{ baseInfo.baseName }}</h1>
        <p>{{ baseInfo.baseIntro }}</p>
      </div>

      <div class="book-list">
        <a-card title="目录" style="width: 1086px;margin: auto" :bordered="false">
          <a-table :columns="DocumentListColumns" :data-source="documentList" rowKey="baseId">
            <template #bodyCell="{ column, text, record }">

              <template v-if="column.key === 'articleTitle'">
                <a style="color: black" @click="turnToArticle(record.articleId)">{{ text }}</a>
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
      </div>
    </a-layout-content>

  </a-layout>
</template>

<script lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { MoreOutlined } from '@ant-design/icons-vue'
import { getArticle, getArticles, getBase } from '@/axios/api'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

interface Document{
  articleId: string,
  articleTitle: string,
  baseId: string,
  baseName: string,
  content: string,
  createUserId: string,
  lastEditTime: string,
  nickName: string,
  readNum: 0,
  thumbs: 0,
  userId: string
}

const DocumentListColumns = [
  { title: '标题', dataIndex: 'articleTitle', key: 'articleTitle' },
  { title: '上次编辑时间', dataIndex: 'lastEditTime' },
  { title: '', key: 'action' }
]

export default defineComponent({
  name: 'DocumentsView',
  components: {
    HeaderBar,
    MoreOutlined
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const baseInfo = ref({
      userName: '',
      baseName: '',
      baseIntro: ''
    })
    const documentList = ref<Document[]>()

    const turnToArticle = (articleId: string) => {
      console.log('turnToArticle', articleId)
      getArticle(articleId).then(resp => {
        console.log(resp)
        const article = resp.data
        console.log(article.content)
        /* router.push(
          {
            path: '/article',
            query: {
              article: article
            }
          }
        ) */
      })
    }
    onMounted(() => {
      const baseId = route.query.baseId

      getBase(baseId).then(resp => {
        console.log(resp)
        baseInfo.value = resp.data
        console.log('baseInfo', baseInfo.value.userName)
        console.log('baseInfo', baseInfo.value.baseName)
      })

      getArticles(store.getters.userId).then(resp => {
        console.log(resp)
        documentList.value = resp.data.records
      })
    })
    return {
      baseInfo,
      store,
      DocumentListColumns,
      documentList,
      turnToArticle
    }
  }
})
</script>

<style scoped>
.header-wrapper {
  background: white;
}

.content-container{
  background-color: white;
  padding-top: 16px;
}

.content-header{
  height: 32px;
  padding-left: 20px;
  width: 1076px;
  margin: auto;
}
.book-info{
  text-align: center;
  height: 80px;
  width: 600px;
  margin: auto;
}

</style>
