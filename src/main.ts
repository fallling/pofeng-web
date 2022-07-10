import Antd from 'ant-design-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'

// 配置请求数据
import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.$axios = axios
axios.defaults.baseURL = '/'
app.use(store)
app.use(router)
app.use(Antd)
app.mount('#app')
