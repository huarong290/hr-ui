import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

export const useTabStore = defineStore('tab', () => {
  const tabList = ref<{ title: string; path: string; name?: string }[]>([])
  const activeTab = ref('/dashboard')

  function addTab(route: RouteLocationNormalized) {
    if (!tabList.value.find((tab) => tab.path === route.path)) {
      tabList.value.push({
        title: (route.meta.title as string) || (route.name as string) || '未命名',
        path: route.path,
        name: route.name as string,
      })
    }
    activeTab.value = route.path
  }

  function removeTab(path: string) {
    const index = tabList.value.findIndex((tab) => tab.path === path)
    if (index !== -1) {
      tabList.value.splice(index, 1)
      // 自动跳转到前一个标签
      if (activeTab.value === path) {
        const nextTab = tabList.value[index - 1] || tabList.value[0]
        activeTab.value = nextTab?.path || '/dashboard'
      }
    }
  }
  const cachedViews = computed(() =>
    tabList.value.filter((tab) => !!tab.name).map((tab) => tab.name!),
  )
  function closeOthers(path: string) {
    tabList.value = tabList.value.filter((tab) => tab.path === path)
  }

  function closeAll() {
    tabList.value = []
    activeTab.value = '/dashboard'
  }
  return {
    tabList,
    activeTab,
    cachedViews,
    addTab,
    removeTab,
    closeOthers,
    closeAll,
  }
})
