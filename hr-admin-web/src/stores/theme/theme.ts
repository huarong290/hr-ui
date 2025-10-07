import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { generateColors } from '@/utils/theme'

interface ThemeState {
  theme: 'light' | 'dark'
  primaryColor: string
  sidebar: {
    backgroundColor: string
    textColor: string
    activeTextColor: string
  }
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'light' | 'dark'>('light')
  const primaryColor = ref('#409EFF')

  const sidebar = ref({
    backgroundColor: '#001529',
    textColor: '#bfcbd9',
    activeTextColor: '#409EFF',
  })

  // 监听主题变化
  watch(
    theme,
    (newTheme) => {
      document.documentElement.setAttribute('data-theme', newTheme)
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    { immediate: true },
  )

  // 监听主色调变化
  watch(
    primaryColor,
    (newColor) => {
      updateElementPlusTheme(newColor)
    },
    { immediate: true },
  )

  // 更新 Element Plus 主题色
  const updateElementPlusTheme = (color: string) => {
    const colors = generateColors(color)
    Object.keys(colors).forEach((key) => {
      document.documentElement.style.setProperty(`--el-color-primary-${key}`, colors[key])
    })
    document.documentElement.style.setProperty('--el-color-primary', color)
  }

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  // 设置主题色
  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
  }

  // 设置侧边栏样式
  const setSidebarStyle = (style: Partial<typeof sidebar.value>) => {
    sidebar.value = { ...sidebar.value, ...style }
  }

  return {
    theme,
    primaryColor,
    sidebar,
    toggleTheme,
    setPrimaryColor,
    setSidebarStyle,
  }
})
