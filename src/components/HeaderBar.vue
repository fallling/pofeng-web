<template>
  <div id="header-wrap">
    <div class="header-logo"></div>
    <div class="header-menu">
      <a-menu
        v-model:openKeys="currentMain"
        v-model:selectKeys="currentMain"
        :style="{ lineHeight: '64px', marginRight: '64px' }"
        mode="horizontal">
        <a-menu-item key="HomeView">工作台</a-menu-item>
        <a-menu-item key="ExploreView">广场</a-menu-item>
        <a-menu-item key="SpaceView">空间</a-menu-item>
      </a-menu>
      <a-auto-complete
        style="width: 200px; margin:auto 0;"
      >
        <a-input-search placeholder="搜索"></a-input-search>
      </a-auto-complete>
    </div>
    <div class="header-avatar">
      <a href="#">
        <a-badge dot>
          <BellOutlined />
        </a-badge>
      </a>
      <span :style="{ margin: '0 10px' }"> 欢迎您，破风 </span>
      <a-dropdown placement="bottomRight">
        <a-avatar>
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:">个人空间</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { BellOutlined, UserOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'HeaderBar',
  components: {
    BellOutlined,
    UserOutlined
  },
  setup () {
    const currentMain = ref<string[]>(['HomeView'])
    return {
      currentMain
    }
  }
})
</script>

<style scoped>
#header-wrap {
  display: flex;
  background-color: white;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}
#header-wrap .header-logo {
  position: absolute;
  width: 200px;
  height: 64px;
  background-color: darkcyan;
  margin-left: 60px;
}
#header-wrap .header-menu {
  margin: auto;
  display: flex;
}
#header-wrap .header-avatar{
  position: absolute;
  right: 100px;
}
</style>
