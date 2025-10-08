<!-- src/components/layout/AppLayout.vue -->
<template>
  <div class="app-layout">
    <AppSidebar />
    <div class="app-main">
      <Header />
      <Breadcrumb />
      <AppTab /><!-- 标签页组件只负责导航 -->
      <div class="app-content">
        <!-- 统一的内容渲染区域 -->
        <router-view v-slot="{ Component, route }">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import Header from './AppHeader.vue'
import AppSidebar from './AppSideBar.vue'
import Breadcrumb from './Breadcrumb.vue'
import AppTab from './AppTab.vue'
import { useTabStore } from '@/stores/tab/tabStore'

const route = useRoute()
const tabStore = useTabStore()
const { cachedViews } = storeToRefs(tabStore)

// 监听路由变化，添加标签页
watch(
  () => route.fullPath,
  () => {
    // 确保路由有标题时才添加到标签页
    if (route.meta?.title) {
      tabStore.addTab(route)
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.app-layout {
  display: flex;
  height: 100vh;
  width: 100%;
}

.app-sidebar {
  width: 220px;
  flex-shrink: 0;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f5f7fa;
}
</style>
