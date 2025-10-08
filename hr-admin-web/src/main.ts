// src/main.ts
import '@/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router, { installRouterGuards } from './router'

const app = createApp(App)
const pinia = createPinia()
// 1. 安装 Pinia
app.use(pinia)

// 2. 安装路由守卫（此时 Pinia 已可用）
installRouterGuards()

// 3. 安装路由
app.use(router)
app.use(ElementPlus)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
