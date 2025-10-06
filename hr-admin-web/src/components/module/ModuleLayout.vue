<template>
  <div class="module-layout">
    <h2 class="module-title">{{ title }}</h2>
    <router-view />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped lang="scss">
.module-layout {
  padding: 20px;
}
.module-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
