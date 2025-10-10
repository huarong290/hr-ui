//src/api/request.ts Axios 请求封装
import axios from 'axios'

// 创建 Axios 实例
const request = axios.create({
  baseURL: '/api', // 后端接口基础路径
  timeout: 10000, // 请求超时时间
})

// 请求拦截器：可添加 token 等
request.interceptors.request.use((config) => {
  // config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截器：统一处理响应数据或错误
request.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err),
)

export default request
