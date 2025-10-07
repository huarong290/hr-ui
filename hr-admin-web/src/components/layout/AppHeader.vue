<!-- 顶部导航组件 Header.vue -->
<template>
  <header class="app-header">
    <el-icon @click="toggleMenuCollapse" class="collapse-icon">
      <Fold v-if="!isMenuCollapsed" />
      <Expand v-else />
    </el-icon>
    <!-- 刷新按钮 -->
    <div class="refresh-btn" @click="handleRefresh">
      <el-tooltip content="刷新">
        <el-icon><Refresh /></el-icon>
      </el-tooltip>
    </div>
    <!-- 全屏 -->
    <div class="header-action" @click="toggleFullscreen">
      <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
        <el-icon>
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="actions">
      <el-button text>
        <el-icon><User /></el-icon>
        管理员
      </el-button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Fold, Expand, User } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app/appStore'

const isFullscreen = ref(false)
// 刷新页面
const handleRefresh = () => {
  location.reload()
}

// 切换全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const { isMenuCollapsed, toggleMenuCollapse } = useAppStore()
</script>

<style scoped lang="scss">
.app-header {
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

  .collapse-icon {
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
