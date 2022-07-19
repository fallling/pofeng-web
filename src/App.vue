<template>
<!--  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>-->
  <a-config-provider :locale="locale">
    <section id="app">
      <router-view :key="route.fullPath" style="height: 100vh"/>
    </section>
  </a-config-provider>
</template>

<script lang="ts">
import locale from 'ant-design-vue/lib/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useRoute } from 'vue-router'

dayjs.locale('zh-cn')

export default {
  name: 'App',
  setup () {
    const route = useRoute()
    return {
      locale,
      route
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
