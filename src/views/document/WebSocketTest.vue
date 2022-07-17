<template>
  <div>
      <a-button>发消息</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'WebSocketTest',
  setup () {
    onMounted(() => {
      const ws = new WebSocket('ws://localhost:8082/ws')
      ws.onopen = () => {
        ws.send('已连接')
        console.log('已连接')
      }
      ws.onmessage = (resp) => {
        console.log(resp)
      }
      ws.onclose = () => {
        console.log('断开拦截')
      }
      ws.onerror = () => {
        console.log('发生错误')
      }
    })
    return {
    }
  }
})
</script>

<style scoped>

</style>
