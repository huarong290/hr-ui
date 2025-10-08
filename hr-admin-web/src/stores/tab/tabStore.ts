// src/stores/tab/tabStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

export interface TabItem {
  title: string
  path: string
  name?: string
  cached?: boolean
  refreshKey?: number
}

export const useTabStore = defineStore('tab', () => {
  // 默认首页路径
  const DEFAULT_TAB = '/dashboard'

  // 标签页列表
  const tabList = ref<TabItem[]>([])

  // 当前激活的标签页路径
  const activeTab = ref(DEFAULT_TAB)

  // 初始化默认标签页
  function initDefaultTab() {
    if (tabList.value.length === 0) {
      tabList.value.push({
        title: '首页',
        path: DEFAULT_TAB,
        name: 'Dashboard',
        cached: true,
      })
      activeTab.value = DEFAULT_TAB
    }
  }

  /**
   * 添加标签页（如果不存在）
   */
  function addTab(route: RouteLocationNormalized) {
    // 排除不需要标签页的路由
    if (route.meta?.noTab === true) {
      return
    }

    const existingTab = tabList.value.find((tab) => tab.path === route.path)

    if (!existingTab) {
      const newTab: TabItem = {
        title: (route.meta.title as string) || (route.name as string) || '未命名',
        path: route.path,
        name: route.name as string,
        cached: route.meta.keepAlive !== false,
        refreshKey: 0,
      }
      tabList.value.push(newTab)
    }

    activeTab.value = route.path
  }

  /**
   * 移除指定标签页
   * @returns 新的激活标签页路径
   */
  function removeTab(path: string): string {
    const index = tabList.value.findIndex((tab) => tab.path === path)
    if (index === -1) return activeTab.value

    tabList.value.splice(index, 1)

    // 如果移除的是当前激活页，则跳转到前一个或默认页
    if (activeTab.value === path) {
      const nextTab = tabList.value[index] || tabList.value[index - 1] || tabList.value[0]
      activeTab.value = nextTab?.path || DEFAULT_TAB
    }

    return activeTab.value
  }

  /**
   * 关闭除指定标签外的所有标签
   */
  function closeOthers(path: string) {
    tabList.value = tabList.value.filter((tab) => tab.path === path)
    activeTab.value = path
  }

  /**
   * 关闭所有标签页并跳转到默认页
   */
  function closeAll() {
    tabList.value = []
    activeTab.value = DEFAULT_TAB
    initDefaultTab()
  }

  /**
   * 拖拽排序后更新标签页顺序
   */
  function updateTabOrder(newOrder: TabItem[]) {
    tabList.value = [...newOrder]
  }

  /**
   * 刷新指定标签页
   */
  function refreshTab(path: string) {
    const tab = tabList.value.find((tab) => tab.path === path)
    if (tab) {
      tab.refreshKey = (tab.refreshKey || 0) + 1
    }
  }

  /**
   * 用于 keep-alive 的缓存视图列表
   */
  const cachedViews = computed(() =>
    tabList.value
      .filter((tab) => tab.cached && !!tab.name)
      .map((tab) => `${tab.name!}${tab.refreshKey || ''}`),
  )

  // 初始化默认标签页
  initDefaultTab()

  return {
    tabList,
    activeTab,
    cachedViews,
    addTab,
    removeTab,
    closeOthers,
    closeAll,
    updateTabOrder,
    refreshTab,
  }
})
