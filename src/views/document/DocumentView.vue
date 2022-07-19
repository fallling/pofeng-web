<template>
  <div>
    <a-layout>
      <a-layout-header id="header-wrapper">
        <HeaderBar></HeaderBar>
      </a-layout-header>
      <div id="toolbar"></div>
      <a-layout-content>
        <a-layout style="height: 100%">
          <a-layout-sider
            v-model:collapsed="collapsed"
            :trigger="null"
            collapsible
            collapsedWidth="0"
            width="265px"
            style="background: white; border-right: #eeeeee solid 1px">

            <div class="trigger"
                 @click="() => (collapsed = !collapsed)">
              <RightOutlined v-if="collapsed"/>
              <LeftOutlined v-else/>
            </div>

            <a-menu
              v-model:selectedKeys="selectedKeys"
              :style="{ marginTop: '64px' }"
              mode="inline"
              @click="handleClick"
              theme="light">
              <a-menu-item
                v-for="item in menuList"
                v-bind:key="item.articleId">{{ item.articleTitle }}</a-menu-item>
            </a-menu>
          </a-layout-sider>

          <a-layout-content :style="{width: '100%', background: 'white'}">
            <div id="content-wrapper">
              <a-input
                v-model:value="article.articleTitle"
                :bordered="false"
                placeholder="请输入标题"
                class="title"
                size="large"/>
              <div ref="editorContainer" id="editor"></div>
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import '@textbus/editor/bundles/textbus.min.css'
import { MenuProps, message } from 'ant-design-vue'
import { RightOutlined, LeftOutlined } from '@ant-design/icons-vue'
import {
  createEditor,
  Toolbar,
  historyBackTool,
  historyForwardTool,
  defaultGroupTool,
  componentsTool,
  headingTool,
  boldTool,
  italicTool,
  strikeThroughTool,
  underlineTool,
  olTool,
  ulTool,
  fontSizeTool,
  textIndentTool,
  colorTool,
  textBackgroundTool,
  insertParagraphBeforeTool,
  insertParagraphAfterTool,
  fontFamilyTool,
  linkTool,
  unlinkTool,
  imageTool,
  textAlignTool,
  tableAddTool,
  tableRemoveTool,
  cleanTool,
  UploadConfig, Editor
} from '@textbus/editor'

import HeaderBar from '@/components/HeaderBar.vue'
import { getArticle, getArticles, saveArticle } from '@/axios/api'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'

let editor: Editor
let content: string
export default defineComponent({
  name: 'DocumentView',
  components: {
    HeaderBar,
    RightOutlined,
    LeftOutlined
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const article = ref({
      articleId: '',
      articleTitle: '',
      createUserId: '',
      lastEditTime: '',
      content: '',
      thumbs: '',
      readNum: ''
    })
    const selectedKeys = ref<string[]>([`${route.query.articleId}`])
    const editorContainer = ref()
    const menuList = ref()
    const handleClick: MenuProps['onClick'] = e => {
      console.log('click', e)
      router.push({
        path: 'document',
        query: {
          articleId: e.key
        }
      })
    }

    onMounted(() => {
      getArticles(store.getters.userId).then(resp => {
        console.log('获取菜单', resp)
        menuList.value = resp.data.records
      })

      getArticle(route.query.articleId).then(resp => {
        console.log('获取文章', resp)
        article.value = resp.data
        content = article.value.content
        console.log('文档', article.value.content)
      })

      const toolbar = new Toolbar(
        [
          [historyBackTool, historyForwardTool],
          [defaultGroupTool], [componentsTool],
          [headingTool], [boldTool, italicTool, strikeThroughTool, underlineTool],
          [olTool, ulTool], [fontSizeTool, textIndentTool],
          [colorTool, textBackgroundTool], [insertParagraphBeforeTool, insertParagraphAfterTool],
          [fontFamilyTool], [linkTool, unlinkTool], [imageTool],
          [textAlignTool], [tableAddTool, tableRemoveTool], [cleanTool]
        ],
        document.getElementById('toolbar') as HTMLElement
      )
      const editor = createEditor({
        theme: 'light',
        placeholder: '请输入内容...',
        content: content,
        autoHeight: true,
        uploader (config: UploadConfig) {
          switch (config.uploadType) {
            case 'image': {
              console.log('上传图片')
              return ''
            }
            default : {
              return ''
            }
          }
        },
        onSave () {
          article.value.content = editor.getContents().content.toString()
          saveArticle(article.value).then(resp => {
            console.log('保存文档', resp)
            message.success('保存成功')
          })
        },
        plugins: [
          () => toolbar
        ]
      })
      editor.mount(editorContainer.value)
      editor.onChange.subscribe(() => {
        console.log(editor.getContents())
      })
    })
    return {
      collapsed: ref<boolean>(false),
      menuList,
      editorContainer,
      selectedKeys,
      article,
      handleClick
    }
  }
})
</script>

<style scoped>
.header-logo {
  margin-top: 24px;
  text-align: center;
}
#header-wrapper {
  width: 100%;
  margin: auto;
  background: white;
}
#toolbar {
  text-align: center;
}

#content-wrapper {
  width: 750px;
  margin: auto;
  padding-top: 36px;
}

#editor /deep/ .textbus-ui-middle{
  border: 0;
}

.trigger {
  position: absolute;
  top: 24%;
  right: -12px;
  z-index: 1;
  width: 16px;
  height: 42px;
  font-size: 16px;
  line-height: 42px;
  text-align: center;
  background: #eeeeee;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background 0.3s ease;
}

.title {
  height: 64px;
  font-size: 36px;
  font-weight: bolder;
}

.users-wrapper {
  position: absolute;
  top: 64px;
  right: 120px;
}
</style>
