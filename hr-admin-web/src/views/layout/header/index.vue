<!-- src/views/layout/header/index.vue -->
<template>
  <div class="layout-header">
    <div class="header-content">
      <el-text tag="b" size="large">管理后台系统</el-text>
      <div class="header-actions">
        <!-- 可以添加用户信息、通知等 -->
        <el-button text>
          <el-icon><User /></el-icon>
          管理员
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.layout-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .header-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
