// src/stores/appStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAppStore = defineStore('app', () => {
  // ✅ 菜单收缩状态
  const isMenuCollapsed = ref(false)

  // ✅ 背景色（可由选色器动态设置）
  const themeColor = ref('#001529')

  // ✅ 高亮色（可扩展）
  const activeColor = ref('#409eff')

  // ✅ 切换菜单收缩
  function toggleMenuCollapse() {
    isMenuCollapsed.value = !isMenuCollapsed.value
  }

  return {
    isMenuCollapsed,
    themeColor,
    activeColor,
    toggleMenuCollapse,
  }
})
