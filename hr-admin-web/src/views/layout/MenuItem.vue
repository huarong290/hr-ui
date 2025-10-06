<template>
  <el-sub-menu v-if="hasChildren" :index="fullPath">
    <template #title>
      <component :is="item.meta?.icon" class="menu-icon" />
      <span>{{ item.meta?.title }}</span>
    </template>
    <MenuItem
      v-for="child in visibleChildren"
      :key="child.path"
      :item="child"
      :basePath="fullPath"
    />
  </el-sub-menu>

  <el-menu-item v-else :index="fullPath">
    <component :is="item.meta?.icon" class="menu-icon" />
    <span>{{ item.meta?.title }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'

// ✅ 解构 props，避免 item 未定义错误
const { item, basePath } = defineProps<{
  item: RouteRecordRaw
  basePath: string
}>()

// ✅ 计算完整路径
const fullPath = computed(() =>
  item.path.startsWith('/') ? item.path : `${basePath.replace(/\/$/, '')}/${item.path}`,
)
console.log('fullPath:', fullPath.value)

// ✅ 判断是否有子菜单
const hasChildren = computed(() => item.children?.length)

// ✅ 过滤隐藏菜单项
const visibleChildren = computed(() => item.children?.filter((c) => !c.meta?.hidden) || [])
</script>

<style scoped>
.menu-icon {
  margin-right: 8px;
  color: inherit;
}
</style>
