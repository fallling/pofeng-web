<template>
  <a-layout>
    <a-layout-header class="header-wrapper">
      <HeaderBar></HeaderBar>
    </a-layout-header>
  </a-layout>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
export default {
  name: 'SpaceView',
  components: { HeaderBar }
}
</script>

<style scoped>
.header-wrapper {
  display: flex;
  background-color: white;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}
</style>
