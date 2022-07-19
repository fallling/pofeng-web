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
              theme="light">
              <a-menu-item key="1">菜单一</a-menu-item>
            </a-menu>
          </a-layout-sider>

          <a-layout-content :style="{width: '100%', background: 'white'}">
            <div style="position: relative">

              <div id="content-wrapper">
                <a-input
                  v-model:value="article.articleTitle"
                  :bordered="false"
                  placeholder="请输入标题"
                  class="title"
                  size="large"/>
                <div ref="editorContainer" id="editor"></div>
              </div>

              <div class="users-wrapper">
                <a-avatar-group>
                  <a-avatar src="https://joeschmoe.io/api/v1/random"/>
                </a-avatar-group>
                <div id="user-info"></div>
              </div>
            </div>

          </a-layout-content>
        </a-layout>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import '@textbus/editor/bundles/textbus.min.css'
import { MenuProps } from 'ant-design-vue'
import { RightOutlined, LeftOutlined } from '@ant-design/icons-vue'
import {
  TableComponentSelectionAwarenessDelegate, createEditor, Toolbar, historyBackTool, historyForwardTool, defaultGroupTool,
  componentsTool, headingTool, boldTool, italicTool, strikeThroughTool, underlineTool, olTool, ulTool,
  fontSizeTool, textIndentTool, colorTool, textBackgroundTool, insertParagraphBeforeTool, insertParagraphAfterTool,
  fontFamilyTool, linkTool, unlinkTool, imageTool, textAlignTool, tableAddTool, tableRemoveTool, cleanTool, Layout
} from '@textbus/editor'

import {
  Collaborate,
  RemoteSelection,
  collaborateModule,
  CollaborateSelectionAwarenessDelegate,
  CollaborateCursor
} from '@textbus/collaborate'

import { WebsocketProvider } from 'y-websocket'
import { fromEvent, merge } from '@textbus/core'
import HeaderBar from '@/components/HeaderBar.vue'
import { getArticle } from '@/axios/api'
import { useRoute } from 'vue-router'

interface User {
  id: string,
  color: string
  name: string,
  avatar: string
}

export default defineComponent({
  name: 'SharedDocumentView',
  components: {
    HeaderBar,
    RightOutlined,
    LeftOutlined
  },
  setup () {
    const route = useRoute()
    const selectedKeys = ref<string[]>(['1'])
    const editorContainer = ref()
    const article = ref({
      articleId: '',
      articleTitle: '',
      createUserId: '',
      lastEditTime: '',
      content: '',
      thumbs: '',
      readNum: ''
    })
    const userList = ref<User[]>([
      {
        id: '1',
        name: '张三',
        color: 'red',
        avatar: 'https://joeschmoe.io/api/v1/random'
      }, {
        id: '2',
        name: '李四',
        color: 'red',
        avatar: 'https://joeschmoe.io/api/v1/random'
      }, {
        id: '1',
        name: '王五',
        color: 'red',
        avatar: 'https://joeschmoe.io/api/v1/random'
      }, {
        id: '',
        name: '赵六',
        color: 'red',
        avatar: 'https://joeschmoe.io/api/v1/random'
      }, {
        id: '2',
        name: '洪七',
        color: 'red',
        avatar: 'https://joeschmoe.io/api/v1/random'
      }, {
        id: '1',
        name: '唐八',
        color: 'red',
        avatar: 'https://joeschmoe.io/api/v1/random'
      }
    ])
    const user = userList.value[Math.floor(Math.random() * userList.value.length)]
    const handleClick: MenuProps['onClick'] = e => {
      console.log('click', e)
    }

    onMounted(() => {
      getArticle(route.query.articleId).then(resp => {
        console.log('获取文章', resp)
        article.value = resp.data
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
        imports: [
          collaborateModule// 添加协作模块
        ],
        content: '你好',
        providers: [
          {
            provide: CollaborateSelectionAwarenessDelegate, // 提供表格框选协作选区特效支持
            useClass: TableComponentSelectionAwarenessDelegate
          }
        ],
        plugins: [
          () => toolbar
        ],
        setup (starter) {
          const collaborate = starter.get(Collaborate)
          const collaborateCursor = starter.get(CollaborateCursor)
          const layout = starter.get(Layout)
          const provide = new WebsocketProvider('ws://localhost:1234', article.value.articleId, collaborate.yDoc)
          // 设置当前用户信息
          provide.awareness.setLocalStateField('user', user)

          const subscription = collaborate.onSelectionChange.subscribe(paths => {
            const localSelection: RemoteSelection = {
              username: user.name,
              color: user.color,
              paths
            }
            provide.awareness.setLocalStateField('selection', localSelection)
          })

          // 监听远端数据变化
          provide.awareness.on('update', () => {
            const users: User[] = []
            const remoteSelections: RemoteSelection[] = []
            provide.awareness.getStates().forEach(state => {
              if (state.user) {
                users.push(state.user)
              }
              if (state.selection) {
                remoteSelections.push(state.selection)
              }
            })
            // 过滤本地用户信息
            const selections = remoteSelections.filter(i => i.username !== user.name)
            // 绘制远端用户选区
            collaborate.updateRemoteSelection(selections)
            // 更新用户信息
            const header = document.getElementById('user-info') as HTMLElement
            header.innerHTML = users.map(i => {
              return `<span style="color: ${i.color}">${i.name}</span>`
            }).join()
          })
          return new Promise((resolve) => {
            provide.on('sync', (is: boolean) => {
              if (is) {
                subscription.add(merge(fromEvent(document, 'scroll'), fromEvent(layout.scroller, 'scroll')).subscribe(() => {
                  collaborateCursor.refresh()
                }))
                resolve(() => {
                  provide.disconnect()
                  subscription.unsubscribe()
                })
              }
            })
          })
        }
      })

      editor.mount(editorContainer.value)
      editor.onChange.subscribe(() => {
        console.log(editor.getContents())
      })
    })
    return {
      collapsed: ref<boolean>(false),
      editorContainer,
      selectedKeys,
      article,
      userList,
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
