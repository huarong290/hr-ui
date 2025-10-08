// src/router/index.ts
import { setupTabGuard } from './guards/tabGuard'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
// 导出安装守卫的函数，在 main.ts 中调用
export function installRouterGuards() {
  setupTabGuard(router)
}
