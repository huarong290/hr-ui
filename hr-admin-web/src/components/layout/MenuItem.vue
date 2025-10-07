<template>
  <!-- 子菜单 -->
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

  <!-- 普通菜单项 -->
  <el-menu-item v-else :index="fullPath">
    <component :is="item.meta?.icon" class="menu-icon" />
    <span>{{ item.meta?.title }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'

// ✅ 接收 props
const { item, basePath } = defineProps<{
  item: RouteRecordRaw
  basePath: string
}>()

// ✅ 计算完整路径
const fullPath = computed(() =>
  item.path.startsWith('/') ? item.path : `${basePath.replace(/\/$/, '')}/${item.path}`,
)

// ✅ 判断是否有子菜单
const hasChildren = computed(() => item.children?.length)

// ✅ 过滤隐藏菜单项
const visibleChildren = computed(() => item.children?.filter((c) => !c.meta?.hidden) || [])
</script>

<style scoped lang="scss">
.menu-icon {
  margin-right: 8px;
  color: inherit;
}
</style>
