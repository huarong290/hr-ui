<!-- 顶部导航组件 Header.vue -->
<template>
  <header class="app-header">
    <!-- 左侧：菜单折叠 -->
    <el-icon @click="toggleMenuCollapse" class="collapse-icon">
      <Fold v-if="!isMenuCollapsed" />
      <Expand v-else />
    </el-icon>

    <!-- 右侧：操作按钮 + 用户信息 -->
    <div class="header-right">
      <!-- 刷新按钮 -->
      <el-tooltip content="刷新">
        <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
      </el-tooltip>

      <!-- 全屏按钮 -->
      <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
        <el-icon class="icon-btn" @click="toggleFullscreen">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-switch
        v-model="isDarkMode"
        active-text="🌙"
        inactive-text="☀️"
        @change="toggleDarkMode"
      />
      <!-- 消息 -->
      <el-badge :value="12" class="badge">
        <el-tooltip content="消息">
          <el-icon><Bell /></el-icon>
        </el-tooltip>
      </el-badge>
      <!-- 用户信息 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="32" icon="el-icon-user-solid"></el-avatar>
          <span class="username">管理员</span>
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>切换用户</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <el-button text>
        <el-icon><User /></el-icon>
        管理员
      </el-button> -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { Fold, Expand, Refresh, FullScreen, Aim } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app/appStore'
import { onMounted, onUnmounted, ref } from 'vue'

const { isMenuCollapsed, toggleMenuCollapse } = useAppStore()
const isFullscreen = ref(false)

const handleRefresh = () => location.reload()

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 同步全屏状态
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

const appStore = useAppStore()
const { isDarkMode } = storeToRefs(appStore)
const { toggleDarkMode } = appStore
</script>

<style scoped lang="scss">
.app-header {
  height: 60px;
  background-color: var(--header-bg);
  color: var(--color-text);
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid var(--hover-bg); // ✅ 替换 #eee
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

  .collapse-icon {
    cursor: pointer;
    font-size: 20px;
  }

  .header-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 16px;

    .icon-btn {
      cursor: pointer;
      font-size: 20px;
      transition: color 0.3s;
      &:hover {
        color: var(--color-primary); // ✅ 替换 #409eff
      }
    }
  }
}
</style>
