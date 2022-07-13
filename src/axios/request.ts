import axios from './index'
import { Get, Post } from '@/axios/type'

// 封装 get 方法，类型为Get
const get: Get = async (url, config) => {
  const response = await axios.get(url, { ...config })
  return response.data
}

const post: Post = async (url, params, config) => {
  const response = await axios.post(url, params, { ...config })
  return response.data
}

// ... delete 等等

// 使用 request 统一调用
const request = {
  get,
  post
}

export default request
