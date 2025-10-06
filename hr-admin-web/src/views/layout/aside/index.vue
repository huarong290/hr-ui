<!-- src/layout/aside/index.vue -->
<template>
  <div class="aside-container" :style="{ backgroundColor: themeColor }">
    <div class="logo">
      <span class="logo-text">HR系统</span>
      <el-icon @click="toggleMenuCollapse" class="collapse-icon">
        <Fold v-if="!isMenuCollapsed" />
        <Expand v-else />
      </el-icon>
    </div>
    <AppMenu :isCollapse="isMenuCollapsed" />
  </div>
</template>

<script setup lang="ts">
import AppMenu from '@/views/layout/AppMenu.vue'
import { useAppStore } from '@/stores/app/appStore'

const { isMenuCollapsed, toggleMenuCollapse, themeColor } = useAppStore()
</script>

<style scoped lang="scss">
.aside-container {
  width: 220px;
  min-width: 220px; /* 固定最小宽度 */
  height: 100vh;
  background-color: #001529;
  margin: 0;
  padding: 0;
  flex-shrink: 0; /* 重要：防止侧边栏被压缩 */

  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #002140;

    .logo-text {
      color: white;
      font-size: 18px;
      font-weight: bold;
    }
  }
}

.aside-menu {
  height: calc(100% - 60px);
  border-right: none;
  background-color: #001529;

  /* 深度选择器修改Element Plus组件样式 */
  :deep(.el-menu-item) {
    color: #bfcbd9;
    background-color: #001529;

    &.is-active {
      color: #409eff;
      background-color: #0c2135;
    }

    &:hover {
      background-color: #0c2135;
    }

    .el-icon {
      color: inherit;
    }

    span {
      color: inherit;
    }
  }

  :deep(.el-menu) {
    background-color: #001529;
    border-right: none;
  }
}

// .aside-container {
//   border: 2px solid orange; /* 查看侧边栏边界 */
// }
</style>
