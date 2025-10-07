<!-- 侧边栏组件 Sidebar.vue -->
<!-- src/components/layout/Sidebar.vue -->
<template>
  <div
    class="app-sidebar"
    :class="{ collapsed: isMenuCollapsed }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!--  Logo 区域：图标 + 文字，折叠时隐藏文字 -->
    <div class="sidebar-logo">
      <el-icon class="logo-icon"><Grid /></el-icon>
      <span class="logo-text" v-show="!isMenuCollapsed">后台系统</span>
    </div>

    <!--  菜单区域：动态渲染路由菜单 -->
    <el-menu
      :collapse="isMenuCollapsed"
      :default-active="activePath"
      class="sidebar-menu"
      router
      background-color="#001529"
      text-color="#bfcbd9"
      active-text-color="#409eff"
    >
      <MenuItem v-for="item in visibleRoutes" :key="item.path" :item="item" :basePath="'/'" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
/**
 * ✅ 引入依赖
 */
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Grid } from '@element-plus/icons-vue'
import routes from '@/router/routes'
import MenuItem from './MenuItem.vue'
import { useAppStore } from '@/stores/app/appStore'

/**
 * ✅ 路由激活项
 */
const route = useRoute()
const activePath = route.path

/**
 * ✅ 状态管理：菜单折叠状态（ref 类型）
 */
const appStore = useAppStore()
const { isMenuCollapsed } = storeToRefs(appStore)

/**
 * ✅ 鼠标悬停展开控制（仅在小屏下）
 */
const isHovered = ref(false)

function handleMouseEnter() {
  if (window.innerWidth < 768 && isMenuCollapsed.value) {
    isHovered.value = true
    isMenuCollapsed.value = false
  }
}

function handleMouseLeave() {
  if (isHovered.value) {
    isMenuCollapsed.value = true
    isHovered.value = false
  }
}

/**
 * ✅ 响应式收缩：根据屏幕宽度自动折叠菜单
 */
function handleResize() {
  isMenuCollapsed.value = window.innerWidth < 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

/**
 * ✅ 获取主布局路由下的可见菜单项（一级）
 */
const layoutRoute = routes.find((r) => r.path === '/' && r.component)
const visibleRoutes = computed(() => layoutRoute?.children?.filter((r) => !r.meta?.hidden) || [])
</script>

<style scoped lang="scss">
/* ✅ 侧边栏容器样式 */
.app-sidebar {
  width: 220px;
  height: 100vh;
  transition: width 0.3s ease;
  background-color: #001529;
  display: flex;
  flex-direction: column;

  &.collapsed {
    width: 64px;
  }

  /* ✅ Logo 区域样式 */
  .sidebar-logo {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .logo-icon {
      font-size: 22px;
      margin-right: 8px;
    }

    .logo-text {
      white-space: nowrap;
    }
  }

  /* ✅ 菜单区域样式 */
  .sidebar-menu {
    flex: 1;
    border-right: none;
  }
}
</style>
