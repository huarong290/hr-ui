// src/main.ts  应用入口文件
import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/index.scss'

import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
// 引入 Element Plus UI 库样式
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css' // ✅ 新增

import router, { installRouterGuards } from './router'

const app = createApp(App)
const pinia = createPinia()
// 1. 挂载 Pinia 状态管理
app.use(pinia)

// 2. 安装路由守卫（此时 Pinia 已可用）
installRouterGuards()

// 3. 挂载 Vue Router
app.use(router)
app.use(ElementPlus)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import { useAppStore } from '@/stores/app/appStore'
useAppStore(pinia).initTheme() // 🆕 初始化暗黑模式
// 挂载应用
app.mount('#app')
