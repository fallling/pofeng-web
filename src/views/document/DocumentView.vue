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
        <div id="header-wrapper">
          <div id="toolbar"></div>
        </div>

        <div id="content-wrapper">
          <div ref="editorContainer"></div>
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
