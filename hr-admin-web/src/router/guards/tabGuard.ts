// src/router/guards/tabGuard.ts
import type { Router, RouteLocationNormalized } from 'vue-router'

/**
 * 设置标签页路由守卫
 */
export function setupTabGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 只有在需要添加到标签页时才处理
    if (shouldAddTab(to)) {
      // 在导航守卫内部获取 store，确保 Pinia 已初始化
      const { useTabStore } = await import('@/stores/tab/tabStore')
      const tabStore = useTabStore()
      tabStore.addTab(to)
    }

    next()
  })

  router.afterEach(async (to) => {
    // 更新激活的标签页
    if (shouldAddTab(to)) {
      // 在导航守卫内部获取 store
      const { useTabStore } = await import('@/stores/tab/tabStore')
      const tabStore = useTabStore()
      tabStore.activeTab = to.path
    }
  })
}

/**
 * 判断路由是否需要添加到标签页
 */
function shouldAddTab(route: RouteLocationNormalized): boolean {
  // 排除不需要标签页的路由
  const excludeRoutes = ['/login', '/404', '/401']
  if (excludeRoutes.includes(route.path)) {
    return false
  }

  // 通过 meta 标记控制
  if (route.meta?.noTab === true) {
    return false
  }

  // 默认添加到标签页
  return true
}
