<!-- src/components/layout/AppLayout.vue 主布局搭建 -->
<template>
  <div class="app-layout">
    <AppSidebar />
    <div class="app-main">
      <Header />
      <Breadcrumb />
      <AppTab /><!--  新增标签页组件 -->
      <div class="app-content">
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
import Header from './AppHeader.vue'
import AppSidebar from './AppSideBar.vue'
import Breadcrumb from './Breadcrumb.vue'
import AppTab from './AppTab.vue'
import { useTabStore } from '@/stores/tab/tabStore'

const route = useRoute()
const tabStore = useTabStore()
const { cachedViews } = storeToRefs(tabStore)
watch(
  () => route.fullPath,
  () => {
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
