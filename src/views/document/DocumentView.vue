<template>
  <div>
    <a-layout style="height: 100%">
      <a-layout-sider
        v-model:collapsed="collapsed"
        collapsible
        collapsedWidth="0"
        width="265px"
        style="background: white">
        <div class="header-logo">
          <img height="64"  style="vertical-align:top;" alt="logo" src="@/assets/pofengLogo.png">
        </div>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          theme="light">
          <a-menu-item key="1">菜单一</a-menu-item>
        </a-menu>
      </a-layout-sider>

      <a-lyaout-content :style="{width: '100%', background: 'white'}">
        <div>
          <div id="header-wrapper">
            <div id="toolbar"></div>

          </div>
          <div id="user-info"></div>
          <div id="content-wrapper">
            <div ref="editorContainer"></div>
          </div>
        </div>

      </a-lyaout-content>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import '@textbus/editor/bundles/textbus.min.css'
import { MenuProps } from 'ant-design-vue'

import {
  TableComponentSelectionAwarenessDelegate,
  createEditor,
  Toolbar,
  historyBackTool, historyForwardTool,
  defaultGroupTool,
  componentsTool,
  headingTool,
  boldTool, italicTool, strikeThroughTool, underlineTool,
  olTool, ulTool,
  fontSizeTool, textIndentTool,
  colorTool, textBackgroundTool,
  insertParagraphBeforeTool, insertParagraphAfterTool,
  fontFamilyTool,
  linkTool, unlinkTool,
  imageTool,
  textAlignTool,
  tableAddTool, tableRemoveTool,
  cleanTool
} from '@textbus/editor'
import { Collaborate, RemoteSelection, collaborateModule, CollaborateSelectionAwarenessDelegate } from '@textbus/collaborate'
import { WebrtcProvider } from 'y-webrtc'
export interface User {
  color: string
  name: string
}

export default defineComponent({
  name: 'DocumentView',
  setup () {
    const selectedKeys = ref<string[]>(['1'])
    const editorContainer = ref()

    const handleClick: MenuProps['onClick'] = e => {
      console.log('click', e)
    }

    onMounted(() => {
      const toolbar = new Toolbar(
        [
          [historyBackTool, historyForwardTool],
          [defaultGroupTool],
          [componentsTool],
          [headingTool],
          [boldTool, italicTool, strikeThroughTool, underlineTool],
          [olTool, ulTool],
          [fontSizeTool, textIndentTool],
          [colorTool, textBackgroundTool],
          [insertParagraphBeforeTool, insertParagraphAfterTool],
          [fontFamilyTool],
          [linkTool, unlinkTool],
          [imageTool],
          [textAlignTool],
          [tableAddTool, tableRemoveTool],
          [cleanTool]
        ],
        document.getElementById('toolbar') as HTMLElement
      )
      const editor = createEditor({
        theme: 'light',
        placeholder: '请输入内容...',
        imports: [
          collaborateModule
        ],
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

          const provide = new WebrtcProvider('4444', collaborate.yDoc)
          console.log(provide)
          // 模拟多用户
          const users: User[] = [
            {
              color: '#f00',
              name: '张三'
            }, {
              color: '#448299',
              name: '李国'
            }, {
              color: '#fe91dd',
              name: '赵功'
            }, {
              color: '#1f2baf',
              name: '载膛'
            }, {
              color: '#2aad30',
              name: '魂牵梦萦'
            }, {
              color: '#c4ee6e',
              name: '杰国'
            }, {
              color: '#00a6ff',
              name: '膛世界杯'
            }]
          // 随机取一个用户
          const user = users[Math.floor(Math.random() * users.length)]

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
            }).join('')
          })
          return () => {
            // 编辑器销毁时，取消连接
            provide.disconnect()
            subscription.unsubscribe()
          }
        }
      })

      editor.mount(editorContainer.value)
      /* editor.onChange.subscribe(() => {
        console.log(editor.getContents())
      }) */
    })
    return {
      collapsed: ref<boolean>(false),
      editorContainer,
      selectedKeys,
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
}
#toolbar {
  text-align: center;
}

#content-wrapper {
  width: 750px;
  margin: auto;
  padding-top: 60px;
}
</style>
