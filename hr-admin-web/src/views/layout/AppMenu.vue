<!-- src/views/layout/AppMenu.vue -->
<template>
  <el-menu
    :default-active="activePath"
    class="app-menu"
    router
    :style="{ backgroundColor: themeColor }"
    :collapse="isCollapse"
  >
    <MenuItem v-for="item in visibleRoutes" :key="item.path" :item="item" :basePath="'/'" />
  </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'
import { computed } from 'vue'
import routes from '@/router/routes'
import { useAppStore } from '@/stores/app/appStore'
const { themeColor } = useAppStore()
defineProps<{ isCollapse?: boolean }>()

const route = useRoute()
const activePath = computed(() => route.path)

const visibleRoutes = computed(
  () => routes.find((r) => r.children)?.children?.filter((r) => !r.meta?.hidden) || [],
)
console.log('visibleRoutes:', visibleRoutes.value)
</script>

<style scoped>
.app-menu {
  height: 100%;
  border-right: none;
}
</style>
