<template>
  <div id="header">
    <div class="header-logo">
      <img height="64"  style="vertical-align:top;" alt="logo" src="@/assets/pofengLogo.png">
    </div>
    <div class="header-menu">
      <a-menu
        @click="headerMenuHandleClick"
        v-model:selectedKeys="currentMain"
        :style="{ lineHeight: '64px', marginRight: '64px' }"
        mode="horizontal">
        <a-menu-item key="home">工作台</a-menu-item>
        <a-menu-item key="explore">广场</a-menu-item>
        <a-menu-item key="space">空间</a-menu-item>
      </a-menu>
      <a-auto-complete
        style="width: 200px; margin:auto 0;">
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
import { useRouter } from 'vue-router'
import { MenuProps } from 'ant-design-vue'

export default defineComponent({
  name: 'HeaderBar',
  components: {
    BellOutlined,
    UserOutlined
  },
  setup () {
    const router = useRouter()
    const currentMain = ref([router.currentRoute.value.name])
    const headerMenuHandleClick: MenuProps['onClick'] = (e) => {
      console.log('headerMenu click', e)
      router.push({
        name: e.key.toString()
      })
    }
    return {
      currentMain,
      headerMenuHandleClick
    }
  }
})
</script>

<style scoped>
#header {
  display: flex;
  background-color: white;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}
.header-logo {
  position: absolute;
  margin-left: 80px;
}
.header-menu {
  margin: auto;
  display: flex;
}
.header-avatar{
  position: absolute;
  right: 60px;
}
</style>
