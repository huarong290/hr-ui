// src/stores/appStore.ts
// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// export const useAppStore = defineStore('app', () => {

//   // ✅ 菜单收缩状态
//   const isMenuCollapsed = ref(false)

//   // ✅ 背景色（可由选色器动态设置）
//   const themeColor = ref('#001529')

//   // ✅ 高亮色（可扩展）
//   const activeColor = ref('#409eff')

//   // ✅ 切换菜单收缩
//   function toggleMenuCollapse() {
//     isMenuCollapsed.value = !isMenuCollapsed.value
//   }

//   return {
//     isMenuCollapsed,
//     themeColor,
//     activeColor,
//     toggleMenuCollapse,
//   }
// })

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isMenuCollapsed: false,
    isDarkMode: localStorage.getItem('theme') === 'dark', // 🆕 新增
  }),
  actions: {
    toggleMenuCollapse() {
      this.isMenuCollapsed = !this.isMenuCollapsed
    },
    toggleDarkMode() {
      // 🆕 新增
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', this.isDarkMode)
    },
    initTheme() {
      // 🆕 新增
      const saved = localStorage.getItem('theme')
      document.documentElement.classList.toggle('dark', saved === 'dark')
    },
  },
})
